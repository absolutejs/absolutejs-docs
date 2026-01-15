export const basicRouting = `\
import { Elysia } from 'elysia';
import { build, handleReactPageRequest, asset } from '@absolutejs/absolute';

const manifest = await build({ reactDirectory: 'src/frontend' });

new Elysia()
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .get('/about', () => handleReactPageRequest(About, asset(manifest, 'AboutIndex')))
  .get('/contact', () => handleReactPageRequest(Contact, asset(manifest, 'ContactIndex')))
  .listen(3000);`;

export const routeParams = `\
// Dynamic route parameters
.get('/users/:id', ({ params: { id } }) =>
  handleReactPageRequest(UserProfile, asset(manifest, 'UserProfileIndex'), { userId: id })
)

// Multiple parameters
.get('/posts/:category/:slug', ({ params: { category, slug } }) =>
  handleReactPageRequest(Post, asset(manifest, 'PostIndex'), { category, slug })
)`;

export const queryParams = `\
// Query string parameters
.get('/search', ({ query: { q, page } }) =>
  handleReactPageRequest(Search, asset(manifest, 'SearchIndex'), {
    searchTerm: q,
    currentPage: Number(page) || 1
  })
)

// URL: /search?q=hello&page=2`;

export const cookiesAndHeaders = `\
// Access cookies and headers
.get('/dashboard', async ({ cookie, headers }) => {
  const session = cookie.session?.value;
  const authHeader = headers.authorization;

  const user = await validateSession(session);

  return handleReactPageRequest(
    Dashboard,
    asset(manifest, 'DashboardIndex'),
    { user }
  );
})`;

export const elysiaRouting = `\
// AbsoluteJS uses Elysia routing - all Elysia patterns work
new Elysia()
  // Route groups
  .group('/api', (app) =>
    app
      .get('/users', getUsers)
      .post('/users', createUser)
  )
  // Guards and middleware
  .derive(({ cookie }) => ({
    user: validateCookie(cookie)
  }))
  // Type-safe route parameters with schema
  .get('/users/:id', ({ params }) => getUser(params.id), {
    params: t.Object({ id: t.String() })
  })`;

export const pageHandlerPattern = `\
// All page handlers follow this pattern:
handleReactPageRequest(Component, indexPath, props?)
handleSveltePageRequest(Component, pagePath, indexPath, props?)
handleVuePageRequest(Component, pagePath, indexPath, headTag?, props?)
handleHTMLPageRequest(htmlPath)
handleHTMXPageRequest(htmxPath)`;
