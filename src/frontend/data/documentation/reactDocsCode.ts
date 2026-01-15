export const reactBuild = `\
const manifest = await build({
  reactDirectory: 'src/frontend'
});`;

export const reactHandler = `\
// backend/server.ts
import { handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Home } from '../frontend/pages/Home';

new Elysia()
  .get('/', () =>
    handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
  )
  .get('/about', () =>
    handleReactPageRequest(About, asset(manifest, 'AboutIndex'))
  )`;

export const reactPageComponent = `type HomeProps = {
  user: User | null;
  posts: Post[];
};

export const Home = ({ user, posts }: HomeProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Home | My App</title>
      <link rel="stylesheet" href="/styles/global.css" />
    </head>
    <body>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          {user ? (
            <span>Welcome, {user.name}</span>
          ) : (
            <a href="/auth/login">Login</a>
          )}
        </nav>
      </header>
      <main>
        <h1>Latest Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={\`/posts/\${post.slug}\`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </body>
  </html>
);`;

export const reactTypeSafetyTypes = `\
// db/schema.ts
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique()
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// types/databaseTypes.ts
// Infer types directly from your table definitions
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;`;

export const reactTypeSafetyServer = `\
// backend/server.ts
import { User, Notification } from '../types/databaseTypes';
import { Dashboard } from '../frontend/pages/Dashboard';

type DashboardProps = {
  user: User;
  notifications: Notification[];
  unreadCount: number;
};

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getAuthenticatedUser(cookie);
    const notifications = await getNotifications(user.id);

    // Type error if props don't match DashboardProps!
    return handleReactPageRequest(
      Dashboard,
      asset(manifest, 'DashboardIndex'),
      {
        user,
        notifications,
        unreadCount: notifications.filter(n => !n.read).length
      }
    );
  })`;

export const reactHydration = `\
// Client-side hydration happens automatically
// Your component receives the same props on both server and client

// 1. Server renders HTML with props
// 2. Props are serialized to window.__INITIAL_PROPS__
// 3. Client hydrates and receives identical props
// 4. React attaches event handlers and makes page interactive

export const Counter = ({ initialCount }: { initialCount: number }) => {
  // useState works - hydration preserves server-rendered HTML
  const [count, setCount] = useState(initialCount);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
};`;

export const reactIndexFile = `\
// Auto-generated index file (you don't write this!)
// Generated at: src/frontend/indexes/HomeIndex.tsx

import { hydrateRoot } from 'react-dom/client';
import type { ComponentType } from 'react';
import { Home } from '../pages/Home';

type PropsOf<C> = C extends ComponentType<infer P> ? P : never;

declare global {
  interface Window {
    __INITIAL_PROPS__: PropsOf<typeof Home>;
  }
}

hydrateRoot(document, <Home {...window.__INITIAL_PROPS__} />);`;

export const reactPreserveFiles = `\
// To inspect generated index files, enable preserveIntermediateFiles
const manifest = await build({
  reactDirectory: 'src/frontend',
  options: {
    preserveIntermediateFiles: true  // Index files won't be deleted
  }
});`;

export const reactStreaming = `\
// AbsoluteJS uses React's streaming SSR for optimal performance
// Content is sent to the browser progressively

// Benefits:
// - First byte arrives faster (Time to First Byte)
// - Content appears progressively (First Contentful Paint)
// - Suspense boundaries stream independently

export const Page = ({ data }: Props) => (
  <html>
    <body>
      {/* This renders immediately */}
      <Header />

      {/* This streams when ready */}
      <Suspense fallback={<Loading />}>
        <AsyncContent data={data} />
      </Suspense>
    </body>
  </html>
);`;
