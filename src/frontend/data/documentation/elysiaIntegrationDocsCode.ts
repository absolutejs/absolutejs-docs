export const elysiaServer = `\
// Your AbsoluteJS server IS an Elysia server
// Everything you know about Elysia works here

import { Elysia } from 'elysia';
import { build, handleReactPageRequest, asset, networking } from '@absolutejs/absolute';

const manifest = await build({ reactDirectory: 'src/frontend' });

new Elysia()
  // Use any Elysia plugin
  .use(cors())
  .use(swagger())

  // Page routes
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  
  // API routes - just regular Elysia
  .get('/api/users', () => getUsers())
  .post('/api/users', ({ body }) => createUser(body))
  
  // AbsoluteJS networking plugin
  .use(networking)`;

export const elysiaTypeSafety = `\
// Elysia's type system is FULLY integrated with AbsoluteJS
// Types flow from database through API to client

import { Elysia, t } from 'elysia';

new Elysia()
  // Schema validation with automatic TypeScript inference
  .post('/api/users', async ({ body }) => {
    // body is typed as { name: string; email: string }
    const user = await db.insert(users).values(body).returning();

    return user;  // Return directly - Elysia infers types
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' })
    })
  })

  // Status responses are also typed
  .get('/api/users/:id', async ({ params, status }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, params.id)
    });

    if (!user) {
      return status(404, 'User not found');
    }

    return user;  // Return directly - Elysia infers types
  }, {
    params: t.Object({ id: t.String() })
  })`;

export const elysiaPlugins = `\
// Use any Elysia plugin with AbsoluteJS
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { staticPlugin } from '@elysiajs/static';
import { absoluteAuth } from '@absolutejs/auth';

new Elysia()
  .use(cors())
  .use(swagger())
  .use(staticPlugin({ assets: './public' }))
  .use(absoluteAuth(config))
  // Your routes...`;

export const elysiaDerive = `\
// Use derive for dependency injection
// Derived values are available in all route handlers

new Elysia()
  .derive(async ({ cookie }) => {
    const session = cookie.session?.value;
    const user = session ? await validateSession(session) : null;

    return { user };
  })
  .get('/dashboard', ({ user, status }) => {
    // user is available here with correct types!
    if (!user) {
      return status(401, 'Unauthorized');
    }

    return handleReactPageRequest(Dashboard, indexPath, { user });
  })`;

export const elysiaGroups = `\
// Group routes for organization and shared middleware

new Elysia()
  // Public routes
  .get('/', () => handleReactPageRequest(Home, indexPath))
  .get('/about', () => handleReactPageRequest(About, indexPath))

  // API group with shared prefix
  .group('/api', (app) =>
    app
      .get('/health', () => ({ status: 'ok' }))
      .get('/version', () => ({ version: '1.0.0' }))
  )

  // Protected routes with auth check
  .group('/app', (app) =>
    app
      .derive(requireAuth)
      .get('/dashboard', ({ user }) =>
        handleReactPageRequest(Dashboard, indexPath, { user })
      )
      .get('/settings', ({ user }) =>
        handleReactPageRequest(Settings, indexPath, { user })
      )
  )`;
