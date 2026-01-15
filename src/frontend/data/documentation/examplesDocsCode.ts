// 1. Database Schema - Types originate here
export const drizzleSchema = `\
// File: db/schema.ts
// Types originate here and flow through your entire application

import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

// Define relations for type-safe queries with 'with'
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}));

// Export inferred types for use throughout the app
export type User = typeof users.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type PostWithAuthor = Post & { author: User };`;

// 2. React Components - Import types from schema
export const fullStackReactComponents = `\
// File: src/frontend/pages/HomePage.tsx
// Import types from the database schema - single source of truth

import type { PostWithAuthor } from '../../../db/schema';

type HomePageProps = {
  posts: PostWithAuthor[];
};

export const HomePage = ({ posts }: HomePageProps) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.id} className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">
            <a href={\`/posts/\${post.id}\`} className="hover:text-blue-600">
              {post.title}
            </a>
          </h2>
          <p className="text-gray-600 mb-4">{post.content.slice(0, 200)}...</p>
          <p className="text-sm text-gray-500">By {post.author.name}</p>
        </article>
      ))}
    </div>
  </div>
);`;

export const fullStackReactPageTwo = `\
// File: src/frontend/pages/PostPage.tsx

import type { Post, User } from '../../../db/schema';

type PostPageProps = {
  post: Post;
  author: User;
};

export const PostPage = ({ post, author }: PostPageProps) => (
  <article className="container mx-auto px-4 py-8 max-w-3xl">
    <a href="/" className="text-blue-600 hover:underline mb-4 inline-block">
      ← Back to posts
    </a>
    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
    <p className="text-gray-600 mb-8">By {author.name}</p>
    <div className="prose prose-lg">{post.content}</div>
  </article>
);`;

// 3. Server - Import and use everything together
export const fullStackReactApp = `\
// File: src/backend/server.ts
// Import schema, types, and components - everything comes together here

import { Elysia, t } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { build, asset, handleReactPageRequest, networking } from '@absolutejs/absolute';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { posts, type PostWithAuthor, type Post, type User } from '../../db/schema';
import { HomePage } from '../frontend/pages/HomePage';
import { PostPage } from '../frontend/pages/PostPage';

const manifest = await build();

const app = new Elysia()
  .use(networking())
  .use(staticPlugin({ assets: 'dist', prefix: '/assets' }))

  // Home page - list all posts
  .get('/', async () => {
    const allPosts = await db.query.posts.findMany({
      with: { author: true }
    });

    return handleReactPageRequest<{ posts: PostWithAuthor[] }>(
      HomePage,
      asset(manifest, 'HomePageIndex'),
      { posts: allPosts }
    );
  })

  // Individual post page
  .get('/posts/:id', async ({ params, status }) => {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, Number(params.id)),
      with: { author: true }
    });

    if (!post) {
      return status(404, 'Post not found');
    }

    return handleReactPageRequest<{ post: Post; author: User }>(
      PostPage,
      asset(manifest, 'PostPageIndex'),
      { post, author: post.author }
    );
  }, {
    params: t.Object({ id: t.String() })
  })

  .listen(3000);`;

export const authExample = `\
// Authentication with @absolutejs/auth

import { Elysia } from 'elysia';
import { handleReactPageRequest, asset, getEnv } from '@absolutejs/absolute';
import { absoluteAuth, instantiateUserSession } from '@absolutejs/auth';
import { db } from '../../db';
import { users, type User } from '../../db/schema';
import { eq } from 'drizzle-orm';

const app = new Elysia()
  .use(absoluteAuth<User>({
    providersConfiguration: {
      google: {
        credentials: {
          clientId: getEnv('GOOGLE_CLIENT_ID'),
          clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
          redirectUri: getEnv('OAUTH2_CALLBACK_URI')
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
        getUser: async (userIdentity) => {
          // Find existing user by auth sub
          return db.query.users.findFirst({
            where: eq(users.authSub, userIdentity.sub)
          });
        },
        onNewUser: async (userIdentity) => {
          // Create new user in database
          const [newUser] = await db.insert(users).values({
            authSub: userIdentity.sub,
            email: userIdentity.email,
            name: userIdentity.name
          }).returning();
          return newUser;
        }
      })
  }))

  // Protected route - user is provided in the first callback
  .get('/dashboard', ({ status, protectRoute }) =>
    protectRoute(
      (user) => {
        // user is fully typed as User from your schema
        return handleReactPageRequest(
          Dashboard,
          asset(manifest, 'DashboardIndex'),
          { user }
        );
      },
      (error) => status(error.code, error.message)
    )
  )

  // Public route - use getStatus to check if user is logged in
  .get('/', async ({ getStatus }) => {
    const { data: user, error } = await getStatus();

    // user is User if logged in, null if not
    return handleReactPageRequest(
      HomePage,
      asset(manifest, 'HomePageIndex'),
      { user }
    );
  });`;

export const apiEndpoints = `\
// Building a REST API alongside your pages

const app = new Elysia()
  .group('/api', (api) =>
    api
      // List resources
      .get('/posts', async () => {
        const posts = await db.query.posts.findMany();
        return posts;
      })

      // Get single resource
      .get('/posts/:id', async ({ params, status }) => {
        const post = await db.query.posts.findFirst({
          where: eq(posts.id, Number(params.id))
        });

        if (!post) {
          return status(404, 'Not found');
        }

        return post;
      }, {
        params: t.Object({ id: t.String() })
      })

      // Create resource with validation
      .post('/posts', async ({ body }) => {
        const [post] = await db.insert(posts)
          .values(body)
          .returning();

        return post;
      }, {
        body: t.Object({
          title: t.String({ minLength: 1 }),
          content: t.String(),
          authorId: t.Number()
        })
      })

      // Update resource
      .patch('/posts/:id', async ({ params, body, status }) => {
        const [post] = await db.update(posts)
          .set(body)
          .where(eq(posts.id, Number(params.id)))
          .returning();

        if (!post) {
          return status(404, 'Not found');
        }

        return post;
      }, {
        params: t.Object({ id: t.String() }),
        body: t.Object({
          title: t.Optional(t.String()),
          content: t.Optional(t.String())
        })
      })

      // Delete resource
      .delete('/posts/:id', async ({ params, status }) => {
        const [deleted] = await db.delete(posts)
          .where(eq(posts.id, Number(params.id)))
          .returning();

        if (!deleted) {
          return status(404, 'Not found');
        }

        return status(204);
      }, {
        params: t.Object({ id: t.String() })
      })
  );`;

export const formHandling = `\
// Server-side form handling with validation

const app = new Elysia()
  // Display form
  .get('/contact', () => {
    return handleReactPageRequest(
      ContactForm,
      asset(manifest, 'ContactFormIndex'),
      { error: null }
    );
  })

  // Handle form submission
  .post('/contact', async ({ body, redirect, status }) => {
    // Validate and process
    try {
      await sendEmail({
        to: 'support@example.com',
        subject: \`Contact from \${body.name}\`,
        body: body.message
      });

      // Redirect on success
      return redirect('/contact/success');
    } catch (e) {
      // Return error status - don't re-render page
      return status(500, 'Failed to send message. Please try again.');
    }
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: 'email' }),
      message: t.String({ minLength: 10 })
    })
  });`;
