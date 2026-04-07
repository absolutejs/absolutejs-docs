export const authGuardManual = `\
// Manual auth pattern using guard + resolve
// resolve runs AFTER validation, so types are guaranteed

new Elysia()
  .guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral('Bearer \${string}')
      }),
      beforeHandle({ headers, status }) {
        if (!headers.authorization) return status(401, 'Missing token');
      }
    },
    (app) => app
      // resolve extracts typed context for all guarded routes
      .resolve(({ headers }) => ({
        userId: decodeToken(headers.authorization.slice(7))
      }))
      .get('/profile', ({ userId }) => getUserProfile(userId))
      .get('/settings', ({ userId }) => getUserSettings(userId))
  )

  // Routes outside the guard have no auth requirement
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))`;
export const authGuardProtectRoute = `\
// Using @absolutejs/auth : the built-in solution
import { absoluteAuth } from '@absolutejs/auth';

new Elysia()
  .use(absoluteAuth<User>(authConfig))

  // protectRoute is available on all routes after .use(absoluteAuth)
  .get('/dashboard', ({ protectRoute }) =>
    protectRoute(
      // Authenticated : render the page
      () => handleReactPageRequest(Dashboard, asset(manifest, 'DashboardIndex')),
      // Not authenticated : render fallback
      () => handleReactPageRequest(SignIn, asset(manifest, 'SignInIndex'))
    )
  )`;
export const corsHeaders = `\
// Option 1: Use the @elysiajs/cors plugin (recommended)
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(cors())                      // sensible defaults
  .use(cors({                       // or configure it
    origin: 'https://myapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))

// Option 2: Manual CORS via onRequest (for custom logic)
new Elysia()
  .onRequest(({ set, request }) => {
    const origin = request.headers.get('origin');

    if (origin && allowedOrigins.includes(origin)) {
      set.headers['Access-Control-Allow-Origin'] = origin;
      set.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      set.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      set.headers['Access-Control-Allow-Credentials'] = 'true';
    }

    // Handle preflight
    if (request.method === 'OPTIONS') {
      set.headers['Access-Control-Max-Age'] = '86400';
      return new Response(null, { status: 204 });
    }
  })`;
export const lifecycleOverview = `\
// Elysia Request Lifecycle (in order)
// ═══════════════════════════════════

// 1. onRequest       : Earliest hook. Minimal context. Always global.
//                       Best for: rate limiting, analytics, custom headers

// 2. onParse         : Body parsing (JSON, form data, etc.)

// 3. onTransform     : Mutate context before validation
//    └── derive()    : Create per-request context values (pre-validation)

// ── Validation ──   : Schema validation runs here

// 4. onBeforeHandle  : After validation, before handler
//    └── resolve()   : Like derive() but type-safe (post-validation)
//                       Best for: auth checks, access control, redirects

// 5. Route Handler   : Your actual route logic

// 6. onAfterHandle   : Transform or inspect the response

// 7. mapResponse     : Convert to Web Standard Response (compression, etc.)

// 8. onError         : Catches thrown errors from any phase

// 9. onAfterResponse : After response sent. Best for: cleanup, logging`;
export const middlewareComparison = `\
// Next.js middleware pattern:
// └── middleware.ts (single file, runs before every request)

// AbsoluteJS / Elysia equivalent:
// └── Lifecycle hooks : more granular, more powerful

new Elysia()
  // onRequest : runs on EVERY request (like Next.js middleware)
  .onRequest(({ set }) => {
    set.headers['X-Powered-By'] = 'AbsoluteJS';
  })

  // onBeforeHandle : runs after validation, before handler
  // This is where auth checks, redirects, and access control go
  .onBeforeHandle(({ cookie, status }) => {
    if (!cookie.session.value) return status(401);
  })

  // guard : scope hooks to specific route groups
  .guard(
    { beforeHandle: requireAuth },
    (app) => app
      .get('/dashboard', () => 'protected')
      .get('/settings', () => 'protected')
  )

  // Any route outside the guard is NOT protected
  .get('/', () => 'public')`;
export const rateLimiting = `\
// Simple rate limiter using onRequest + state

const rateLimiter = new Elysia({ name: 'rate-limiter' })
  .state('requests', new Map<string, { count: number; resetAt: number }>())

  .onRequest(({ store, request, server, status }) => {
    const ip = server?.requestIP(request)?.address ?? 'unknown';
    const now = Date.now();
    const window = 60_000;  // 1 minute
    const limit = 100;      // requests per window

    const record = store.requests.get(ip);

    if (!record || now > record.resetAt) {
      store.requests.set(ip, { count: 1, resetAt: now + window });
      return;
    }

    record.count++;

    if (record.count > limit) {
      return status(429, 'Too many requests');
    }
  })
  .as('global');

// Usage
new Elysia()
  .use(rateLimiter)
  .get('/', () => 'Hello')
  .listen(3000);`;
export const redirects = `\
// Redirects using set.redirect in onBeforeHandle

new Elysia()
  .onBeforeHandle(({ set, request }) => {
    const url = new URL(request.url);

    // Redirect HTTP to HTTPS
    if (url.protocol === 'http:') {
      set.redirect = \`https://\${url.host}\${url.pathname}\`;
      return;  // early return skips the handler
    }
  })

  // Redirect old URLs to new ones
  .get('/old-page', ({ set }) => {
    set.redirect = '/new-page';
  })

  // Auth redirect : send unauthenticated users to login
  .get('/dashboard', ({ cookie, set }) => {
    if (!cookie.session.value) {
      set.redirect = '/login';
      return;
    }
    return handleReactPageRequest(Dashboard, asset(manifest, 'DashboardIndex'));
  })`;
export const registrationOrder = `\
// IMPORTANT: Hooks only apply to routes registered AFTER them
// (except onRequest, which is always global)

new Elysia()
  .onBeforeHandle(() => console.log('auth check'))

  .get('/protected', () => 'has auth check')    // ✓ hook applies

  .onBeforeHandle(() => console.log('logging'))

  .get('/both', () => 'has both hooks')          // ✓ both hooks apply
  .listen(3000);`;
export const scopingMiddleware = `\
// Elysia hooks are ISOLATED by default (local scope)
// Three scope levels control where hooks apply:

// local (default) : only the current plugin instance
// scoped          : current instance + one parent level
// global          : all instances everywhere

// ── Inline scope ──
new Elysia()
  .derive({ as: 'scoped' }, ({ headers }) => ({
    bearer: headers.authorization?.slice(7) ?? null
  }))

// ── Guard scope ──
new Elysia()
  .guard({
    as: 'global',
    beforeHandle({ cookie, status }) {
      if (!cookie.session.value) return status(401);
    }
  })

// ── Plugin instance scope ──
const authPlugin = new Elysia({ name: 'auth' })
  .derive(({ headers }) => ({
    bearer: headers.authorization?.slice(7) ?? null
  }))
  .as('scoped');  // lifts ALL hooks to parent

new Elysia()
  .use(authPlugin)
  .get('/', ({ bearer }) => bearer)  // bearer is available here`;
