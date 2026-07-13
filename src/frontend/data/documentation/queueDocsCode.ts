/**
 * Code samples for the @absolutejs/queue docs page. Queue is a durable
 * typed job queue for Bun + Elysia — define jobs once via TypeBox
 * schemas, validate at the boundary, dispatch by kind, and run with
 * pluggable stores (in-memory / Postgres / Redis).
 */

export const queueAuditWiring = `import { recordQueueError } from '@absolutejs/audit';

createQueueWorker({
  store,
  registry,
  onError: recordQueueError(audit),
});
// → 'queue.error' event with jobKind + attempts in metadata`;
export const queueDefineJobs = `import { defineJobs, t } from '@absolutejs/queue';

const jobs = defineJobs({
  sendEmail: t.Object({
    to: t.String({ format: 'email' }),
    subject: t.String(),
    body: t.String(),
    attachments: t.Optional(
      t.Array(t.Object({ name: t.String(), url: t.String() })),
    ),
  }),
});

// \`typeof jobs\` propagates through every store, handler, and
// queue.enqueue() in the rest of the app.
type Jobs = typeof jobs;`;
export const queuePostgresAdapter = `import { createPostgresJobStore } from '@absolutejs/queue-postgres';

const store = createPostgresJobStore({
  jobs, // your defineJobs map
  connectionString: process.env.DATABASE_URL!,
});

// OR share a connection pool with your existing app:
const pooled = createPostgresJobStore({ jobs, client: pg });

// Serverless variant — Neon's HTTP driver (single-shot queries,
// no pool to leak in /api routes):
import { createNeonJobStore } from '@absolutejs/queue-postgres';

const serverless = createNeonJobStore({
  jobs,
  connectionString: process.env.NEON_DB_URL!,
});`;
export const queueQuickStart = `import { Elysia } from 'elysia';
import {
  defineJobs, t,
  createJobRegistry, createInMemoryJobStore, queue
} from '@absolutejs/queue';

// 1. Define jobs once — the single source of truth for payload types
//    AND runtime validation.
const jobs = defineJobs({
  sendEmail: t.Object({
    to: t.String({ format: 'email' }),
    subject: t.String(),
    body: t.String(),
  }),
  resizeImage: t.Object({
    src: t.String({ format: 'uri' }),
    width: t.Number({ minimum: 1 }),
  }),
});

// 2. Register handlers by kind.
const registry = createJobRegistry(jobs)
  .on('sendEmail', async (payload, ctx) => {
    await dispatch.email(payload);
  })
  .on('resizeImage', async (payload, ctx) => {
    if (ctx.signal.aborted) return;
    await resize(payload.src, payload.width);
  });

// 3. Pick a store + wire the Elysia plugin.
const store = createInMemoryJobStore({ jobs });
const app = new Elysia().use(queue({ store, registry }));

// 4. Enqueue from any route.
app.post('/send', async ({ queue }) => {
  return queue.enqueue('sendEmail', {
    to: 'user@example.com',
    subject: 'hi',
    body: 'hi',
  });
});`;
export const queueRedisAdapter = `import { createRedisJobStore } from '@absolutejs/queue-redis';
import Redis from 'ioredis';

const store = createRedisJobStore({
  client: new Redis(process.env.REDIS_URL!),
  keyPrefix: 'absolutejs:queue:', // default
  jobs,
});`;
export const queueRegistry = `createJobRegistry(jobs)
  .on('sendEmail', async (payload, ctx) => {
    // payload: { to, subject, body, attachments? }
    // ctx: { id, kind, attempts, maxAttempts, signal }
    if (ctx.signal.aborted) return; // worker draining
    await sendEmail(payload);
  })
  .on('resizeImage', async (payload, ctx) => {
    /* … */
  });`;
export const queueRoutes = `import { createQueueRoutes } from '@absolutejs/queue';

const adminQueue = createQueueRoutes({
  store,
  authorize: ({ headers }) => headers.cookie?.includes('admin'),
});

new Elysia().use(adminQueue);`;
export const queueStoreContract = `type JobStore<Jobs> = {
  enqueue(input): Promise<JobId>;
  claimDue(options): Promise<Job[]>;
  complete(id): Promise<void>;
  fail(id, options): Promise<void>;    // retryAt OR dead
  reapStuck(options): Promise<number>; // expired leases → pending

  // Optional — powers the admin routes:
  cancel?(id); retry?(id); get?(id);
  list?(options); listByKind?(kind, options);
  countByStatus?();
};`;
export const queueWorker = `import { createQueueWorker, runQueueWorker } from '@absolutejs/queue';

const worker = createQueueWorker({
  store,
  registry,
  concurrency: 8,      // default 1
  leaseMs: 30_000,     // default 30s lock for stuck-reap
  pollIntervalMs: 250, // default 250ms between ticks
  backoff: exponentialBackoff({ baseMs: 1000, maxMs: 60_000 }),
  onError: (err, job) => {
    console.error('[queue]', job?.id, job?.kind, err);
  },
  tracerProvider,      // optional — OTel spans
});

worker.start();       // begin polling
await worker.drain(); // stop accepting new claims; finish in-flight
await worker.stop();  // halt the poll loop`;
