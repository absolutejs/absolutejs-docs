export const pluginCompositionBasic = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { staticPlugin } from '@elysiajs/static';

new Elysia()
  .use(cors())
  .use(swagger())
  .use(staticPlugin({ assets: './public' }));`;
export const pluginCompositionEncapsulation = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { cron } from '@elysiajs/cron';

const apiPlugin = new Elysia({ prefix: '/api' })
  .use(cors({ origin: ['https://app.example.com'] }))
  .get('/health', () => ({ ok: true }));

const jobsPlugin = new Elysia({ prefix: '/jobs' })
  .use(
    cron({
      name: 'heartbeat',
      pattern: '*/30 * * * * *',
      run() {
        console.log('background heartbeat');
      }
    })
  );

new Elysia()
  .use(apiPlugin)
  .use(jobsPlugin);`;
export const pluginCompositionOrder = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

new Elysia()
  .use(cors())
  .use(swagger())
  // register routes after plugins/hooks you want applied
  .get('/api/users', () => [])
  .listen(3000);`;
export const pluginCompositionScopedHooks = `\
import { Elysia } from 'elysia';

const authPlugin = new Elysia({ prefix: '/app' })
  .onBeforeHandle(({ cookie, status }) => {
    if (!cookie.session?.value) {
      return status(401, 'Unauthorized');
    }
  })
  .get('/dashboard', () => 'private');

new Elysia()
  .get('/', () => 'public')
  .use(authPlugin);`;
