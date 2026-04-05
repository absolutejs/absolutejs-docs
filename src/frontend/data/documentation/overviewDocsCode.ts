export const ecosystemOverview = `\
# The AbsoluteJS ecosystem
@absolutejs/absolute     # Core framework : SSR, HMR, bundling
@absolutejs/auth         # 66+ OAuth providers, session management, PKCE
@absolutejs/eslint       # 20+ opinionated lint rules
elysia-scoped-state      # Per-user server state (great for HTMX)
create-absolutejs        # Project scaffolding CLI
absolute-studio          # Visual page builder : no code required`;
export const hmrExample = `\
# HMR works across all frameworks out of the box
# Edit a React component → instant update, state preserved
# Edit a Svelte component → CSS-only or full reload as needed
# Edit an Angular component → JIT recompile, DOM state preserved
# Edit an HTML file → granular script/style reload

# No configuration needed : just run:
absolute dev src/backend/server.ts`;
export const installCommand = `\
bun create absolutejs my-app`;
export const multiFrameworkExample = `\
// absolute.config.ts : mix frameworks in one app
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/react',
  angularDirectory: './src/angular',
  svelteDirectory: './src/svelte',
  htmxDirectory: './src/htmx'
});`;
export const multiFrameworkServer = `\
// Each route can use a different framework
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleHTMXPageRequest } from '@absolutejs/absolute';

new Elysia()
  .use(absolutejs)
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .get('/admin', () => handleAngularPageRequest(adminImporter, adminPage, adminIndex))
  .get('/dashboard', () => handleSveltePageRequest(Dashboard, dashPage, dashIndex))
  .get('/widget', () => handleHTMXPageRequest('./build/pages/widget.html'))
  .use(networking);`;
export const simpleExample = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend'
});`;
export const simpleServerExample = `\
// src/backend/server.ts
import { prepare, asset, networking } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

const { absolutejs, manifest } = await prepare();

new Elysia()
  .use(absolutejs)
  .get('/', () =>
    handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
  )
  .use(networking);`;
export const typeSafetyFlow = `\
// Types flow from database → server → client automatically

// 1. Define schema once
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  authorId: integer('author_id').references(() => users.id)
});
export type Post = typeof posts.$inferSelect;

// 2. Server handler : TypeScript enforces the props match
.get('/posts/:id', async ({ params }) => {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, params.id) });
  return handleReactPageRequest(PostPage, asset(manifest, 'PostPageIndex'), { post });
})

// 3. Component receives typed props : no manual type wiring
export const PostPage = ({ post }: { post: Post }) => (
  <h1>{post.title}</h1>  // Full autocomplete, compile-time errors
);`;
