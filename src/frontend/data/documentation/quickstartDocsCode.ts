export const createCommand = `\
bun create absolutejs my-blog --react --db postgresql --orm drizzle --auth abs --abs-provider google --tailwind --install --skip
cd my-blog`;

export const runDev = `\
bun run dev`;

export const envSetup = `\
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`;

export const configWithDb = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  tailwind: {
    input: './src/styles/globals.css',
    output: './build/styles.css'
  }
});`;

export const schemaSetup = `\
// db/schema.ts
import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  authSub: varchar('auth_sub', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: serial('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow()
});

// Types are inferred directly from the table — no codegen
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;`;

export const serverWithAuth = `\
// src/backend/server.ts
import { prepare, asset, getEnv, networking } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { absoluteAuth, instantiateUserSession } from '@absolutejs/auth';
import { Elysia, t } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { users, posts, type User, type Post } from '../../db/schema';
import { Home } from '../frontend/pages/Home';
import { Dashboard } from '../frontend/pages/Dashboard';

const { absolutejs, manifest } = await prepare();

const app = new Elysia()
  .use(absolutejs)
  .use(staticPlugin({ assets: './build', prefix: '' }))

  // Auth — one .use() call for Google OAuth with user management
  .use(absoluteAuth<User>({
    providersConfiguration: {
      google: {
        credentials: {
          clientId: getEnv('GOOGLE_CLIENT_ID'),
          clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
          redirectUri: 'http://localhost:3000/oauth2/callback'
        },
        scope: ['openid', 'profile', 'email']
      }
    },
    onCallbackSuccess: async ({ authProvider, tokenResponse, session, userSessionId }) =>
      instantiateUserSession({
        authProvider,
        tokenResponse,
        session,
        userSessionId,
        getUser: async (userIdentity) =>
          db.query.users.findFirst({
            where: eq(users.authSub, userIdentity.sub)
          }),
        onNewUser: async (userIdentity) => {
          const [newUser] = await db.insert(users).values({
            authSub: userIdentity.sub,
            name: userIdentity.name ?? '',
            email: userIdentity.email ?? ''
          }).returning();
          return newUser;
        }
      })
  }))

  // Public home page
  .get('/', async ({ getStatus }) => {
    const { data: user } = await getStatus();
    const allPosts = await db.query.posts.findMany();
    return handleReactPageRequest(Home, asset(manifest, 'HomeIndex'), {
      posts: allPosts,
      user
    });
  })

  // Protected dashboard — user is typed as User from your schema
  .get('/dashboard', ({ status, protectRoute }) =>
    protectRoute(
      (user) => handleReactPageRequest(
        Dashboard, asset(manifest, 'DashboardIndex'), { user }
      ),
      (error) => status(error.code, error.message)
    )
  )

  // JSON API with validation
  .post('/api/posts', async ({ body }) => {
    const [post] = await db.insert(posts).values(body).returning();
    return post;
  }, {
    body: t.Object({
      title: t.String({ minLength: 1 }),
      content: t.String(),
      authorId: t.Number()
    })
  })

  .use(networking);

export type App = typeof app;`;

export const homePageComponent = `\
// src/frontend/pages/Home.tsx
import type { Post, User } from '../../../db/schema';

type HomeProps = {
  posts: Post[];
  user: User | null;
};

export const Home = ({ posts, user }: HomeProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>My Blog</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <a href="/dashboard">Dashboard</a>
          </>
        ) : (
          <a href="/oauth2/google/authorization">Sign in with Google</a>
        )}
      </nav>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 150)}...</p>
        </article>
      ))}
    </body>
  </html>
);`;

export const dashboardComponent = `\
// src/frontend/pages/Dashboard.tsx
import type { User } from '../../../db/schema';

type DashboardProps = {
  user: User;
};

export const Dashboard = ({ user }: DashboardProps) => (
  <html lang="en">
    <head>
      <title>Dashboard | {user.name}</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <h1>Dashboard</h1>
      <p>Signed in as {user.email}</p>
      <p>Member since {user.createdAt}</p>
      <a href="/">← Home</a>
    </body>
  </html>
);`;

export const edenTreatySetup = `\
// src/frontend/eden/treaty.ts
import { treaty } from '@elysiajs/eden';
import type { App } from '../../backend/server';

const url = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
export const api = treaty<App>(url);`;

export const edenUsage = `\
// Use the treaty anywhere on the client — fully typed
import { api } from '../eden/treaty';

// POST /api/posts — body is type-checked at compile time
const { data: newPost } = await api.api.posts.post({
  title: 'Hello World',
  content: 'My first post',
  authorId: 1
});

// Check auth status — returns your User type or error
const { data: authStatus, error } = await api.oauth2.status.get();
if (!error) {
  console.log('Logged in as:', authStatus.user.name);
}`;

export const devCommand = `\
absolute dev src/backend/server.ts`;
