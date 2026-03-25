export const manifestType = `\
// The Manifest type returned by prepare()
// Currently a simple Record - type-safe manifest keys are in development
type Manifest = Record<string, string>;

// Example usage
const { absolutejs, manifest } = await prepare();

// Access asset paths by entry name
const homePath = manifest['HomePageIndex'];
// Returns: '/assets/HomePage-a1b2c3d4.js'

const postPath = manifest['PostPageIndex'];
// Returns: '/assets/PostPage-m3n4o5p6.js'`;

export const buildOptionsType = `\
// Configuration for absolute.config.ts
type BuildConfig = {
  buildDirectory?: string;
  assetsDirectory?: string;
  publicDirectory?: string;
  reactDirectory?: string;
  vueDirectory?: string;
  angularDirectory?: string;
  svelteDirectory?: string;
  htmlDirectory?: string;
  htmxDirectory?: string;
  tailwind?: {
    input: string;
    output: string;
  };
  options?: BuildOptions;
  mode?: 'production' | 'development';
};

type BuildOptions = {
  preserveIntermediateFiles?: boolean;
  throwOnError?: boolean;
  injectHMR?: boolean;
  hmr?: {
    debounceMs?: number;
  };
};

// Usage in absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/pages',
  assetsDirectory: 'src/assets',
  tailwind: {
    input: './src/styles/globals.css',
    output: './dist/styles.css'
  }
});`;

export const pageHandlerTypes = `\
// React page handler - import from '@absolutejs/absolute/react'
function handleReactPageRequest<TProps extends Record<string, unknown>>(
  Component: React.ComponentType<TProps>,
  scriptPath: string,
  ...props: keyof TProps extends never ? [] : [props: TProps]
): Promise<Response>;

// Svelte page handler - import from '@absolutejs/absolute/svelte'
function handleSveltePageRequest<TProps extends Record<string, unknown>>(
  Component: SvelteComponent,
  pagePath: string,
  scriptPath: string,
  props?: TProps
): Promise<Response>;

// Vue page handler - import from '@absolutejs/absolute/vue'
function handleVuePageRequest<TProps extends Record<string, unknown>>(
  Component: VueComponent,
  pagePath: string,
  scriptPath: string,
  headTag?: string,
  ...props: keyof TProps extends never ? [] : [props: TProps]
): Promise<Response>;

// Angular page handler - import from '@absolutejs/absolute/angular'
function handleAngularPageRequest<TProps extends Record<string, unknown>>(
  importer: () => Promise<{ factory: (props: TProps) => unknown }>,
  pagePath: string,
  scriptPath: string,
  headTag?: string,
  ...props: keyof TProps extends never ? [] : [props: TProps]
): Promise<Response>;

// HTML page handler - import from '@absolutejs/absolute'
function handleHTMLPageRequest(pagePath: string): BunFile;

// HTMX page handler - import from '@absolutejs/absolute'
function handleHTMXPageRequest(pagePath: string): BunFile;`;

export const elysiaIntegration = `\
// AbsoluteJS integrates seamlessly with Elysia's type system

// Elysia's Context type is extended with derived values
type Context = {
  // Request data
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  headers: Record<string, string>;
  cookie: Record<string, Cookie>;

  // Response helpers
  status: (code: number, body?: unknown) => Response;
  redirect: (url: string, status?: number) => Response;

  // Your derived values
  user?: User | null;
  // ... other derived context
};

// Type-safe route parameters
.get('/posts/:id', ({ params }) => {
  // params.id is typed as string
  const id = Number(params.id);
})

// Type-safe request body
.post('/posts', ({ body }) => {
  // body is typed based on your schema
  return db.insert(posts).values(body);
}, {
  body: t.Object({
    title: t.String(),
    content: t.String()
  })
})

// Type-safe status responses
.get('/posts/:id', async ({ params, status }) => {
  const post = await getPost(params.id);

  // status() returns a typed response
  if (!post) {
    return status(404, 'Not found');
  }

  return post;
});`;
