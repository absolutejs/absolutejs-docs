/**
 * Content for the @absolutejs/queue docs page. Background-job queue
 * for Bun + Elysia. Define jobs once via TypeBox schemas, validate at
 * the boundary, dispatch by kind, run with pluggable stores
 * (in-memory / Postgres / Redis).
 */

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

export const queueDefineJobs = `# defineJobs — one definition, full type safety

  defineJobs takes a kind → TypeBox-schema map. The result is the
  single source of truth for:

  - inferred payload types — \`Jobs[kind]\` is auto-typed at every
    \`enqueue(kind, payload)\` and every handler.
  - runtime validation — payloads are validated against the schema
    before persistence, so a buggy caller can't push junk into the
    durable store and break the worker on dequeue.

  The package re-exports TypeBox's \`t\` so every schema shares ONE
  TypeBox instance (mixing versions silently breaks type narrowing):

    import { defineJobs, t } from '@absolutejs/queue';

    const jobs = defineJobs({
      sendEmail: t.Object({
        to: t.String({ format: 'email' }),
        subject: t.String(),
        body: t.String(),
        attachments: t.Optional(t.Array(t.Object({ name: t.String(), url: t.String() }))),
      }),
    });

  Then \`type Jobs = typeof jobs\` is what propagates through every
  store / handler / queue.enqueue() in the rest of the app.`;

export const queueRegistry = `# Handlers + registry

  createJobRegistry(jobs) is a fluent registry — chain .on(kind, handler)
  per kind. Each handler receives the typed payload + a JobContext:

    createJobRegistry(jobs)
      .on('sendEmail', async (payload, ctx) => {
        // payload: { to, subject, body, attachments? }
        // ctx: { id, kind, attempts, maxAttempts, signal }
        if (ctx.signal.aborted) return;       // worker draining
        await sendEmail(payload);
      })
      .on('resizeImage', async (payload, ctx) => { /* … */ });

  JobContext.signal is the worker's drain signal — abort it long
  enough to cancel in-flight HTTP calls when the host is shutting
  down. Honor it on cooperative paths so SIGTERM doesn't leave jobs
  half-applied.

  ctx.attempts / ctx.maxAttempts let a handler change behavior on
  the final attempt (e.g. send a summary to ops instead of throwing
  one more time).

  Throwing from a handler triggers the worker's retry policy:
  exponential backoff (configurable via \`backoff\`), up to
  \`maxAttempts\` (set per-job via enqueue or default 5). After the
  final attempt the job moves to \`dead\` — surfaced separately in
  metrics + listable via \`store.listByKind\`.`;

export const queueStores = `# JobStore contract + adapters

  The worker contract is small — claim due jobs, complete, fail
  (with retry or dead-letter), reap stuck leases. Optional methods
  power admin tooling (cancel, retry, list, get, countByStatus).

    JobStore<Jobs> {
      enqueue(input): Promise<JobId>
      claimDue(options): Promise<Job[]>
      complete(id): Promise<void>
      fail(id, options): Promise<void>          // retryAt OR dead
      reapStuck(options): Promise<number>       // expired leases → pending
      // optional — admin tooling
      cancel?(id), retry?(id), get?(id),
      list?(options), listByKind?(kind, options),
      countByStatus?()
    }

  Bundled stores:

    createInMemoryJobStore({ jobs })
      → in-process. snapshot()/restore() round-trips state so the
        host can persist on SIGTERM and rehydrate on restart.

    @absolutejs/queue-postgres   → createPostgresJobStore
                                   (drizzle + postgres.js)
                                 → createNeonJobStore
                                   (HTTP driver for serverless)

    @absolutejs/queue-redis      → createRedisJobStore
                                   (ioredis / node-redis; atomic Lua)

  Pick by deployment model — Postgres for shared-DB simplicity,
  Redis for high-throughput / low-latency claim, in-memory for
  tests + single-process workloads.`;

export const queueWorker = `# createQueueWorker — outside the plugin

  The Elysia \`queue()\` plugin runs a worker by default. Pass
  \`runWorker: false\` if you want the enqueue surface in your HTTP
  layer but the worker process separate (the recommended split for
  prod: one HTTP fleet, one worker fleet, both share the durable
  store).

    import { createQueueWorker, runQueueWorker } from '@absolutejs/queue';

    const worker = createQueueWorker({
      store,
      registry,
      concurrency: 8,         // default 1
      leaseMs: 30_000,        // default 30s lock for stuck-reap
      pollIntervalMs: 250,    // default 250ms between ticks
      backoff: exponentialBackoff({ baseMs: 1000, maxMs: 60_000 }),
      onError: (err, job) => {
        console.error('[queue]', job?.id, job?.kind, err);
      },
      tracerProvider,         // optional — OTel spans
    });

    worker.start();           // begin polling
    await worker.drain();     // stop accepting new claims; finish in-flight
    await worker.stop();      // halt the poll loop

  runQueueWorker(options) is the standalone-binary wrapper — wires
  SIGTERM → drain → stop and exits cleanly.`;

export const queueMetrics = `# Metrics + drain — operator surface

  worker.metrics() returns a point-in-time snapshot plus cumulative
  counters since createQueueWorker():

    {
      active:       number,   // currently-running handlers
      capacity:     number,   // configured concurrency
      draining:     boolean,
      runs:         number,   // total handlers invoked
      completed:    number,
      failed:       number,
      retried:      number,
      deadLettered: number,   // exhausted maxAttempts
      polls:        number,   // tick() invocations
      reaped:       number,   // stuck-lease reaps
      lastTickMs:   number,   // last tick wall-clock
    }

  Scrape on a 30s interval and feed to @absolutejs/metering for
  per-worker cost / throughput attribution.

  A climbing \`lastTickMs\` is the operator's signal that the store
  is slowing down — PG locking, network jitter, Redis CPU pressure.
  Pair with the queue's OTel spans (\`queue.runJob\` per handler) to
  see where the time actually went.

  \`drain()\` and \`stop()\` are SYMMETRIC with @absolutejs/runtime's
  drain() and @absolutejs/isolated-jsc's pool drain() — the same
  shutdown protocol across the substrate.`;

export const queueRoutes = `# Admin routes — list + cancel + retry

  createQueueRoutes(store, options?) returns an Elysia plugin
  exposing the optional JobStore methods as HTTP endpoints, gated
  by an authorize callback. Useful for an internal admin shell.

    import { createQueueRoutes } from '@absolutejs/queue';

    const adminQueue = createQueueRoutes({
      store,
      authorize: ({ headers }) => headers.cookie?.includes('admin'),
    });

    new Elysia().use(adminQueue);

    // GET  /queue/jobs?kind=sendEmail&status=dead&limit=50
    // GET  /queue/jobs/:id
    // POST /queue/jobs/:id/retry
    // POST /queue/jobs/:id/cancel
    // GET  /queue/jobs/count

  Each method is optional — the routes call only what the store
  implements. The in-memory store implements everything; the
  Postgres adapter implements the full set; the Redis adapter
  implements the worker contract + list / get / cancel / retry.`;

export const queueObservability = `# Observability — OTel via @absolutejs/telemetry

  Pass a \`tracerProvider\` and every job run is wrapped in a
  queue.runJob span carrying these ABS_ATTRS attributes:

    abs.job.id           → JobId
    abs.job.kind         → kind string
    abs.job.attempt      → current attempt
    abs.job.max_attempts → ceiling
    abs.worker.id        → worker id (from createQueueWorker)

  Errors are recorded on the span; the status becomes ERROR. Spans
  on retries thread their parent so a job's full attempt history
  shows as one trace tree.

  Provider absent → zero-allocation noop. Same pattern as the rest
  of the substrate (see @absolutejs/telemetry).

  Pair with @absolutejs/audit's recordQueueError helper for an
  audit-log trail of every failed job:

    createQueueWorker({
      store, registry,
      onError: recordQueueError(audit),
    });
    // → 'queue.error' event with jobKind + attempts in metadata`;

export const queuePostgresAdapter = `# @absolutejs/queue-postgres

  Drizzle + postgres.js implementation of JobStore. Pass an existing
  postgres.js client to share its connection pool, or a connection
  string to let the adapter open its own.

  import { createPostgresJobStore } from '@absolutejs/queue-postgres';

  const store = createPostgresJobStore({
    jobs,                                       // your defineJobs map
    connectionString: process.env.DATABASE_URL!,
  });

  // OR share a connection pool with your existing app:
  const store = createPostgresJobStore({ jobs, client: pg });

  Serverless variant — Neon's HTTP driver (single-shot queries, no
  pool to leak in /api routes):

    import { createNeonJobStore } from '@absolutejs/queue-postgres';
    const store = createNeonJobStore({
      jobs,
      connectionString: process.env.NEON_DB_URL!,
    });

  Implements the full JobStore + every optional method (cancel /
  retry / list / get / listByKind / countByStatus) so admin routes
  light up automatically. The schema is exported as
  \`queueJobsTable\` if you want to manage migrations alongside
  your own.`;

export const queueRedisAdapter = `# @absolutejs/queue-redis

  Redis-backed JobStore. Atomic claim + reap via Lua scripts so two
  workers can't race-claim the same job. Narrow RedisCommandClient
  contract — ioredis and node-redis v4+ both satisfy it.

  import { createRedisJobStore } from '@absolutejs/queue-redis';
  import Redis from 'ioredis';

  const store = createRedisJobStore({
    client: new Redis(process.env.REDIS_URL!),
    keyPrefix: 'absolutejs:queue:',     // default
    jobs,
  });

  Storage layout:

    <prefix>job:<id>           → HASH per job
    <prefix>due                → ZSET keyed by runAt
    <prefix>claimed            → ZSET keyed by lockedAt + leaseMs
    <prefix>idem:<key>         → STRING for idempotencyKey dedup

  Why Redis: high-throughput claims (Lua keeps the critical
  section to one round-trip), low-latency dispatch, pairs naturally
  with @absolutejs/sync-bus-redis if you're already running Redis
  for cluster bus.

  Why NOT Redis: durability is at-most-once on subscription gaps
  (same caveat as the cluster bus). Pair with periodic snapshots
  if your jobs are not safely retryable.`;
