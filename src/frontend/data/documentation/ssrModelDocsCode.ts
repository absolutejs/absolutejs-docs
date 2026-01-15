export const ssrFlow = `\
// 1. Request comes in
// 2. Server runs build() once at startup to create manifest
// 3. Route handler calls page handler (handleReactPageRequest, etc.)
// 4. Page handler renders component to HTML stream
// 5. HTML is sent to client with hydration scripts
// 6. Client hydrates the page for interactivity`;

export const buildOnce = `\
// build() runs ONCE at server startup
const manifest = await build({
  reactDirectory: './src/frontend'
});

// manifest maps component names to their bundled assets
// { "HomeIndex": "/build/HomeIndex-a3f2.js", ... }`;

export const renderToStream = `\
// React components are rendered to a readable stream
// This enables progressive HTML delivery
.get('/', () =>
  handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
)`;

export const hydrationExample = `\
// The page handler injects:
// 1. The rendered HTML
// 2. Initial props via window.__INITIAL_PROPS__
// 3. Client-side JavaScript for hydration

// Your component receives props on both server and client
type HomeProps = {
  user: User | null;
};

export const Home = ({ user }: HomeProps) => (
  <html>
    <body>
      <h1>Welcome, {user?.name ?? 'Guest'}</h1>
    </body>
  </html>
);`;

export const propsInjection = `\
// Props are serialized and injected into the HTML
.get('/', async ({ cookie }) => {
  const user = await getUser(cookie);

  return handleReactPageRequest(
    Home,
    asset(manifest, 'HomeIndex'),
    { user }  // These props are available on server AND client
  );
})`;
