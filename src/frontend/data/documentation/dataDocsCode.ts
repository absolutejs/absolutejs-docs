export const dataFetchingServer = `\
// Data fetching happens on the server in your route handlers
// The data is passed to components as props - fully typed

.get('/posts', async () => {
  // Fetch data on the server
  const posts = await db.query.posts.findMany({
    with: { author: true }
  });

  // TypeScript knows posts is Post[] with author relation
  return handleReactPageRequest(
    PostList,
    asset(manifest, 'PostListIndex'),
    { posts }  // Type-safe: PostListProps['posts'] must match
  );
})`;

export const dataFetchingTyped = `\
// Types flow from database schema to components

// 1. Database schema (Drizzle)
const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id)
});

// 2. Inferred types
type Post = typeof posts.\$inferSelect;
// { id: number; title: string; content: string; authorId: number | null }

// 3. Props type
type PostPageProps = {
  post: Post;
  author: User;
};

// 4. Component receives correctly typed data
export const PostPage = ({ post, author }: PostPageProps) => (
  <article>
    <h1>{post.title}</h1>
    <p>By {author.name}</p>
    <div>{post.content}</div>
  </article>
);`;

export const dataFetchingError = `\
// Status responses are also type-safe with Elysia

.get('/posts/:id', async ({ params, status }) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, Number(params.id))
  });

  // Return status with code and message string
  if (!post) {
    return status(404, 'Post not found');
  }

  return handleReactPageRequest(PostPage, indexPath, { post });
}, {
  params: t.Object({ id: t.String() })
})`;

export const stateBasicUsage = `\
// State is a global mutable object shared across the Elysia app
// Values assigned via .state() are added to the store property

import { Elysia } from 'elysia';

new Elysia()
  .state('version', 1)
  .state('counter', 0)
  .get('/version', ({ store: { version } }) => version)
  .get('/store', ({ store }) => store)
  .get('/increment', ({ store }) => {
    store.counter++;
    return store.counter;
  })
  .listen(3000);`;

export const stateTypeSafety = `\
// Elysia automatically infers types from .state() calls
// No explicit generics needed - TypeScript knows the shape

new Elysia()
  .state('count', 0)
  .state('name', 'app')
  .get('/', ({ store }) => {
    // store.count is number
    // store.name is string
    // store.unknown would be a TypeScript error
    return { count: store.count, name: store.name };
  });`;

export const stateMutationGotcha = `\
// ⚠️ IMPORTANT: Destructuring primitives breaks the reference!

new Elysia()
  .state('counter', 0)

  // ✅ Correct - maintains reference to store
  .get('/increment', ({ store }) => {
    store.counter++;
    return store.counter;
  })

  // ❌ Wrong - destructuring creates a copy of the primitive
  .get('/broken', ({ store: { counter } }) => {
    counter++;  // This only mutates the local copy!
    return counter;  // Returns incremented value but store is unchanged
  });`;

export const stateVsDecorate = `\
// Use .state() for primitives you need to mutate
// Use .decorate() for non-primitive objects and classes

new Elysia()
  // State: mutable primitives shared across routes
  .state('requestCount', 0)
  .state('isMaintenanceMode', false)

  // Decorate: objects, classes, utilities
  .decorate('db', database)
  .decorate('logger', new Logger())

  .get('/stats', ({ store, db, logger }) => {
    store.requestCount++;
    logger.info('Stats requested');
    return db.query.stats.findFirst();
  });`;

export const edenTreatySetup = `\
// src/frontend/eden/treaty.ts
import { treaty } from '@elysiajs/eden';
import type { Server } from '../../backend/server';

const serverUrl =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000';

// The Server type comes from your Elysia server export
export const server = treaty<Server>(serverUrl);`;

export const edenTreatyServerExport = `\
// src/backend/server.ts
const app = new Elysia()
  .get('/api/posts', async () => {
    const posts = await db.query.posts.findMany();
    return posts;
  })
  .get('/api/posts/:id', async ({ params }) => {
    return db.query.posts.findFirst({
      where: eq(posts.id, Number(params.id))
    });
  })
  .post('/api/posts', async ({ body }) => {
    return db.insert(posts).values(body).returning();
  }, {
    body: t.Object({
      title: t.String(),
      content: t.String()
    })
  });

// Export the type for Eden Treaty
export type Server = typeof app;`;

export const edenTreatyUsage = `\
// Client-side usage - fully type-safe!
import { server } from '../eden/treaty';

// TypeScript knows this route exists and returns Post[]
const { data: posts, error } = await server.api.posts.get();

// error is typed based on your server's status responses
if (error) {
  // error.value contains the error message from the server
  console.error(error.value);
  return;
}

// Route params are type-checked
const { data: post } = await server.api.posts({ id: '123' }).get();

// Request body is validated at compile time
// TypeScript error if title or content is missing!
const { data: newPost } = await server.api.posts.post({
  title: 'Hello World',
  content: 'My first post'
});

// This would be a TypeScript error - route doesn't exist:
// server.api.nonexistent.get()  ❌`;

export const edenTreatyBenefits = `\
// Eden Treaty prevents common API mistakes at compile time

// ❌ TypeScript Error: Property 'users' does not exist
server.api.users.get();

// ❌ TypeScript Error: Property 'name' is missing
server.api.posts.post({ title: 'Hello' });

// ❌ TypeScript Error: Argument of type 'number' is not assignable
server.api.posts({ id: 123 }).get();  // id must be string

// ✅ All correct - TypeScript is happy
const { data, error } = await server.api.posts.get();
if (error) {
  console.error(error);
  return;
}
// data is typed as Post[]
console.log(data);`;
