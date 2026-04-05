export const corsBasic = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(cors())
  .get('/api/ping', () => 'pong');`;
export const corsDynamicOrigin = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const allowlist = new Set([
  'https://app.example.com',
  'https://staging.example.com'
]);

new Elysia()
  .use(
    cors({
      origin: (origin) => !origin || allowlist.has(origin),
      credentials: true
    })
  );`;
export const corsInstall = `\
bun add @elysiajs/cors`;
export const corsPerGroup = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

new Elysia()
  .group('/api/public', (app) =>
    app
      .use(cors())
      .get('/status', () => ({ ok: true }))
  )
  .group('/api/internal', (app) =>
    app
      .use(cors({ origin: ['https://ops.example.com'] }))
      .get('/metrics', () => getMetrics())
  );`;
export const corsRestrictedOrigins = `\
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(
    cors({
      origin: ['https://app.example.com', 'https://admin.example.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  );`;
