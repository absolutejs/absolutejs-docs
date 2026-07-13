/**
 * Code samples for the @absolutejs/queue docs pages (Overview, Jobs,
 * Operations). Queue is a durable typed job queue for Bun + Elysia —
 * define jobs once via TypeBox schemas, validate at the boundary,
 * dispatch by kind, and run with pluggable stores (in-memory /
 * Postgres / Redis).
 */

export const queueAuditWiring = `import { recordQueueError } from '@absolutejs/audit';

createQueueWorker({
  onError: recordQueueError(audit),
  registry,
  store,
});
// → 'queue.error' events with jobKind, attempts, and maxAttempts in
//   metadata and the job id as the audit target`;
export const queueDefineJobs = `import { defineJobs, t } from '@absolutejs/queue';

const jobs = defineJobs({
  'email.send': t.Object({
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
export const queueHandlerTimeout = `createQueueWorker({
  // Wall-clock budget per handler. A number applies to every kind; a
  // function sets one per kind — return undefined for no limit on that
  // kind. Unset = no timeout.
  handlerTimeoutMs: (kind) =>
    kind === 'ai.synthesize' ? 300_000 : 15_000,
  registry,
  store,
});

registry.on('ai.synthesize', async (payload, { signal }) => {
  // On timeout the worker aborts \`signal\` and fails the job through
  // the normal retry / dead-letter path. Pass it to in-flight I/O so
  // the work actually stops — the timeout only bounds how long the
  // WORKER waits.
  await fetch(payload.url, { signal });
});`;
export const queueOneShot = `// Delayed one-shot — deliver the webhook in one hour. The job is
// persisted immediately and claimed once runAt is due.
app.post('/notify', ({ body, queue }) =>
  queue.enqueue(
    'webhook.deliver',
    { body, url: 'https://example.com/hook' },
    { runAt: Date.now() + 60 * 60 * 1000 },
  ),
);`;
export const queuePostgresAdapter = `import { createPostgresJobStore } from '@absolutejs/queue-postgres/postgres';
import postgres from 'postgres';

// Share your app's existing postgres.js client (one pool)…
const client = postgres(process.env.DATABASE_URL, { prepare: false });
const store = createPostgresJobStore({ client, jobs });

// …or let the adapter open its own connection:
// const store = createPostgresJobStore({ connectionString: url, jobs });

// Neon — WebSocket Pool driver. claimDue opens a transaction and
// selects FOR UPDATE SKIP LOCKED; neon-http is single-statement and
// can't do row-level locks, so the queue uses the Pool. Your app's
// other code can keep using the HTTP driver — they're independent.
import { createNeonJobStore } from '@absolutejs/queue-postgres/neon';

const serverless = createNeonJobStore({
  connectionString: process.env.NEON_DB_URL,
  jobs,
});`;
export const queueQuickStart = `import { Elysia } from 'elysia';
import {
  createInMemoryJobStore, createJobRegistry,
  defineJobs, queue, t
} from '@absolutejs/queue';

// 1. Define jobs once — the single source of truth for payload types
//    AND runtime validation.
const jobs = defineJobs({
  'email.send': t.Object({
    to: t.String({ format: 'email' }),
    subject: t.String(),
    body: t.String(),
  }),
  'image.resize': t.Object({
    src: t.String({ format: 'uri' }),
    width: t.Number({ minimum: 1 }),
  }),
});

// 2. Register handlers by kind — payloads are inferred from the schema.
const registry = createJobRegistry(jobs)
  .on('email.send', async (payload) => {
    await dispatchEmail(payload);
  })
  .on('image.resize', async ({ src, width }) => {
    await resize(src, width);
  });

// 3. Pick a store + wire the Elysia plugin (in-process worker
//    auto-starts).
const store = createInMemoryJobStore(jobs);
const app = new Elysia().use(queue({ registry, store }));

// 4. Enqueue from any route.
app.post('/send', ({ queue }) =>
  queue.enqueue('email.send', {
    to: 'user@example.com',
    subject: 'hi',
    body: 'hi',
  }),
);`;
export const queueRecurringCron = `// src/jobs/index.ts — module-scoped store so the cron trigger and the
// queue plugin's worker share the same backing state (the cron run
// callback has no Elysia Context, so it closes over the store).
import { cron } from '@elysiajs/cron';

export const store = createInMemoryJobStore(jobs);
export const registry = createJobRegistry(jobs).on(
  'email.send',
  async (payload) => {
    await sendDigest(payload);
  },
);

export const backgroundJobs = new Elysia({ name: 'background-jobs' })
  .use(queue({ registry, store }))
  .use(
    cron({
      name: 'weekly-digest',
      pattern: '0 8 * * 1', // Mondays at 08:00
      run: () =>
        store.enqueue({
          idempotencyKey: \`weekly-digest:\${new Date()
            .toISOString()
            .slice(0, 10)}\`,
          kind: 'email.send',
          payload: {
            subject: 'Weekly digest',
            to: 'team@example.com',
          },
        }),
    }),
  );`;
export const queueRedisAdapter = `import type { JobMapFromDefinition } from '@absolutejs/queue';
import { createRedisJobStore } from '@absolutejs/queue-redis';
import { Redis } from 'ioredis';

// No client peer dep — ioredis and node-redis v4+ both structurally
// satisfy the narrow RedisCommandClient contract.
const store = createRedisJobStore<JobMapFromDefinition<typeof jobs>>({
  client: new Redis(process.env.REDIS_URL),
  keyPrefix: 'myapp:queue:', // default 'absolutejs:queue:'
});`;
export const queueRegistry = `const registry = createJobRegistry(jobs)
  .on('email.send', async (payload, ctx) => {
    // payload: { to, subject, body } — inferred from the schema
    // ctx: { id, kind, attempts, maxAttempts, signal }
    await sendEmail(payload);
  })
  .on('image.resize', async ({ src, width }, { attempts }) => {
    // attempts — which try this is
    await resize(src, width);
  });`;
export const queueRetryPolicy = `import { exponentialBackoff } from '@absolutejs/queue';

// The attempt ceiling is per job — set it at enqueue (default 5):
await queue.enqueue('webhook.deliver', payload, { maxAttempts: 8 });

// The delay between retries comes from the worker's backoff strategy.
// Default: exponentialBackoff() → 1s, 2s, 4s, … capped at 5 minutes.
createQueueWorker({
  backoff: exponentialBackoff({ baseMs: 500, factor: 2, maxMs: 60_000 }),
  registry,
  store,
});

// ctx.attempts / ctx.maxAttempts — change behavior on the last try:
registry.on('webhook.deliver', async (payload, ctx) => {
  try {
    await deliver(payload);
  } catch (error) {
    if (ctx.attempts >= ctx.maxAttempts - 1) {
      await alertOps(payload, error);
    }
    throw error; // rethrow — the worker schedules retry / dead-letter
  }
});`;
export const queueRoutes = `import { createQueueRoutes } from '@absolutejs/queue';

const adminQueue = createQueueRoutes({ prefix: '/queue', store });

// The routes ship with no built-in auth — mount them behind your own
// guard (or keep them off the public listener entirely):
new Elysia()
  .onBeforeHandle(({ headers, status }) => {
    if (!isAdmin(headers)) return status(401);
  })
  .use(adminQueue);`;
export const queueRunHandlerOnce = `// scripts/runWeeklyDigest.ts — invoke a handler directly: no worker,
// no store writes. The payload is validated through the registry's
// schema and a JobContext is synthesized for you.
import { runHandlerOnce } from '@absolutejs/queue';
import { registry } from '../src/jobs/registry';

await runHandlerOnce(registry, 'email.send', {
  subject: 'Weekly digest (manual trigger)',
  to: 'team@example.com',
});

// Overrides: options.context ({ attempts, maxAttempts, id, … }) and
// options.validators — false to skip validation, or pre-compiled
// JobValidators for hot loops.`;
export const queueStoreContract = `type JobStore<Jobs> = {
  enqueue(input): Promise<JobId>;      // validates; idempotencyKey dedup
  claimDue(options): Promise<Job[]>;   // atomic multi-worker claim
  complete(id): Promise<void>;
  fail(id, options): Promise<void>;    // retryAt OR dead
  reapStuck(options): Promise<number>; // expired leases → pending

  // Optional — powers the admin routes (501 when missing):
  cancel?(id); retry?(id); get?(id);
  list?(options); listByKind?(kind, options);
  countByStatus?();
};`;
export const queueWorker = `import { createQueueWorker } from '@absolutejs/queue';

const worker = createQueueWorker({
  concurrency: 8,       // default 5
  leaseMs: 30_000,      // default 30s — stuck-lease reap window
  onError: (error, job) => {
    console.error('[queue]', job?.id, job?.kind, error);
  },
  pollIntervalMs: 1000, // default 1s between ticks
  registry,
  store,
  tracerProvider,       // optional — one OTel span per run
  workerId: 'worker-1', // default crypto.randomUUID()
});

worker.start();         // begin polling
await worker.runOnce(); // or drive a single tick yourself (tests, cron)
worker.drain();         // refuse new claims; in-flight handlers finish
await worker.stop();    // halt the loop; waits for active handlers`;
export const queueWorkerSplit = `// http.ts — HTTP fleet: enqueue surface only, no in-process worker.
const app = new Elysia().use(queue({ registry, runWorker: false, store }));

// worker.ts — worker fleet, scaled separately: bun run worker.ts
import { runQueueWorker } from '@absolutejs/queue';

runQueueWorker({
  registry,
  signals: ['SIGINT', 'SIGTERM'], // default — each wires stop() → exit(0)
  store,
});`;
