export const manifestType = `\
// The Manifest type returned by build()
// Currently a simple Record - type-safe manifest keys are in development
type Manifest = Record<string, string>;

// Example usage
const manifest = await build();

// Access asset paths by entry name
const homePath = manifest['HomePageIndex'];
// Returns: '/assets/HomePage-a1b2c3d4.js'

const postPath = manifest['PostPageIndex'];
// Returns: '/assets/PostPage-m3n4o5p6.js'`;

export const buildOptionsType = `\
// Configuration for the build() function
type BuildConfig = {
  buildDirectory?: string;
  assetsDirectory?: string;
  reactDirectory?: string;
  vueDirectory?: string;
  angularDirectory?: string;
  astroDirectory?: string;
  svelteDirectory?: string;
  htmlDirectory?: string;
  htmxDirectory?: string;
  tailwind?: {
    input: string;
    output: string;
  };
  options?: BuildOptions;
};

// Usage
const manifest = await build({
  reactDirectory: 'src/frontend/pages',
  assetsDirectory: 'src/assets',
  tailwind: {
    input: './src/styles/globals.css',
    output: './dist/styles.css'
  }
});`;

export const pageHandlerTypes = `\
// React page handler
function handleReactPageRequest<TProps extends object>(
  Component: React.ComponentType<TProps>,
  scriptPath: string,
  props: TProps
): Response;

// Svelte page handler
function handleSveltePageRequest<TProps extends Record<string, unknown>>(
  Component: SvelteComponent,
  pagePath: string,
  scriptPath: string,
  props: TProps
): Response;

// Vue page handler
function handleVuePageRequest<TProps extends object>(
  Component: VueComponent,
  pagePath: string,
  scriptPath: string,
  headTag: string,
  props: TProps
): Response;

// HTML page handler
function handleHtmlPageRequest(
  pagePath: string,
  scriptPath: string
): Response;

// HTMX page handler
function handleHtmxPageRequest(
  pagePath: string,
  scriptPath: string
): Response;`;

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
