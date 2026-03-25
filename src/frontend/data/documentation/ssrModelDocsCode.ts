export const ssrFlow = `\
// 1. Request comes in
// 2. Server runs prepare() once at startup to build and create manifest
// 3. Route handler calls page handler (handleReactPageRequest, etc.)
// 4. Page handler renders component to HTML stream
// 5. HTML is sent to client with hydration scripts
// 6. Client hydrates the page for interactivity`;

export const buildOnce = `\
const { absolutejs, manifest } = await prepare();

// manifest maps component names to their bundled assets
// { "HomeIndex": "/build/HomeIndex-a3f2.js", ... }`;

export const renderToStream = `\
.get('/', () =>
  handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
)`;

export const hydrationExample = `\
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
.get('/', async ({ cookie }) => {
  const user = await getUser(cookie);

  return handleReactPageRequest(
    Home,
    asset(manifest, 'HomeIndex'),
    { user } // available on server AND client
  );
})`;
