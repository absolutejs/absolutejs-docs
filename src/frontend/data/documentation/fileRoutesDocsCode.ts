export const fileRoutesConfig = `// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/react',
  svelteDirectory: 'src/frontend/svelte',
  fileRoutes: true
});`;

export const fileRoutesConfigOptions = `fileRoutes: {
  // Folder inside each framework directory. Default 'routes'.
  directory: 'routes',
  // Where the generated route module is written. Default 'src/routes.gen.ts'.
  output: 'src/routes.gen.ts'
}`;

export const fileRoutesGenerated = `// src/routes.gen.ts (generated, do not edit)
import type { FileRouteDefinition } from '@absolutejs/absolute';
import { reactFileRoute } from '@absolutejs/absolute/react/server';
import { svelteFileRoute } from '@absolutejs/absolute/svelte/server';

export const routeTree: readonly FileRouteDefinition[] = [
  reactFileRoute<
    '/blog/:slug',
    typeof import('./frontend/react/routes/blog/[slug]'),
    typeof import('./frontend/react/routes/blog/[slug].server')
  >({
    name: 'RouteBlogSlugej2ms2',
    page: () => import('./frontend/react/routes/blog/[slug]'),
    path: '/blog/:slug',
    server: () => import('./frontend/react/routes/blog/[slug].server'),
    source: 'src/frontend/react/routes/blog/[slug].tsx'
  }),
  svelteFileRoute<
    '/notes/:id',
    typeof import('./frontend/svelte/routes/notes/[id].svelte'),
    typeof import('./frontend/svelte/routes/notes/[id].server')
  >({
    name: 'RouteNotesId6kfe7t',
    path: '/notes/:id',
    server: () => import('./frontend/svelte/routes/notes/[id].server'),
    source: 'src/frontend/svelte/routes/notes/[id].svelte'
  })
];`;

export const fileRoutesPrecedence = `export const server = new Elysia()
  .use(absolutejs)
  // This explicit route answers GET /, so routes/index.tsx is not served.
  .get('/', () => handleHTMLPageRequest(asset(manifest, 'Home')))
  .use(fileRoutes(routeTree, manifest));

// Startup warning:
// File route src/frontend/react/routes/index.tsx is not served:
// an explicit route already handles GET /.`;

export const fileRoutesReactPage = `// src/frontend/react/routes/blog/[slug].tsx
import { PostBody } from './_components/PostBody';

type PostPageProps = {
  post: { body: string; title: string };
};

const PostPage = ({ post }: PostPageProps) => (
  <html lang="en">
    <head>
      <title>{post.title}</title>
    </head>
    <body>
      <h1>{post.title}</h1>
      <PostBody body={post.body} />
    </body>
  </html>
);

export default PostPage;`;

export const fileRoutesReactServer = `// src/frontend/react/routes/blog/[slug].server.ts
import type { FileRouteContext } from '@absolutejs/absolute';
import { NotFound } from 'elysia';
import { findPost } from '../../../../db/posts';

export const beforeHandle = ({
  headers,
  redirect
}: FileRouteContext<'/blog/:slug'>) =>
  headers.cookie?.includes('session=') ? undefined : redirect('/login');

export const load = async ({ params }: FileRouteContext<'/blog/:slug'>) => {
  const post = await findPost(params.slug);
  if (!post) throw new NotFound();

  return { post };
};`;

export const fileRoutesServer = `// src/backend/server.ts
import { fileRoutes, prepare } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { routeTree } from '../routes.gen';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(absolutejs)
  .use(fileRoutes(routeTree, manifest))
  .get('/api/health', () => 'ok');`;

export const fileRoutesSveltePage = `<!-- src/frontend/svelte/routes/notes/[id].svelte -->
<script lang="ts">
  type Props = { note: { id: string; text: string } };

  let { note }: Props = $props();
</script>

<svelte:head>
  <title>Note {note.id}</title>
</svelte:head>

<h1>{note.text}</h1>`;

export const fileRoutesSvelteServer = `// src/frontend/svelte/routes/notes/[id].server.ts
import type { FileRouteContext } from '@absolutejs/absolute';

export const load = ({ params }: FileRouteContext<'/notes/:id'>) => ({
  note: { id: params.id, text: \`Note number \${params.id}\` }
});`;

export const fileRoutesTree = `src/frontend/react/routes/
├── index.tsx                  →  /
├── about.tsx                  →  /about
├── blog/
│   ├── index.tsx              →  /blog
│   ├── [slug].tsx             →  /blog/:slug
│   ├── [slug].server.ts       →  load and beforeHandle for /blog/:slug
│   └── _components/
│       └── PostBody.tsx       →  private, not a route
└── [org]/[repo]/issues.tsx    →  /:org/:repo/issues

src/frontend/svelte/routes/
└── notes/
    ├── [id].svelte            →  /notes/:id
    └── [id].server.ts         →  load for /notes/:id`;

export const fileRoutesTypeError = `// [slug].server.ts returns the wrong shape:
export const load = ({ params }: FileRouteContext<'/blog/:slug'>) => ({
  article: { body: '', title: params.slug }
});

// absolute typecheck:
// src/routes.gen.ts: TS2344
//   The types returned by 'load(...)' are incompatible between these types.
//   Type '{ article: { body: string; title: string; }; }' is not assignable
//   to type 'MaybePromise<FileRouteLoadProps<PostPageProps> | Response>'.`;
