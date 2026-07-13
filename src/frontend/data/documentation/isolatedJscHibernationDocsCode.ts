export const isolatedJscHibernationBasic = `\
// @absolutejs/isolated-jsc — createHibernatingIsolatePool (0.9.0+).
import { createHibernatingIsolatePool } from '@absolutejs/isolated-jsc';

const pool = createHibernatingIsolatePool({
  isolate: { backend: 'worker' },
  maxSize: 1000,            // up to 1000 (active OR hibernated) keys
  hibernateAfterMs: 30_000, // idle 30s → hibernate
});

// First call to a key spawns a fresh isolate + context.
const initial = await pool.run('tenant-42', async (context) => {
  const fn = await context.compileCallable(\`(args) => {
    this.count = (this.count || 0) + args.delta;
    return this.count;
  }\`);
  return await fn.call([{ delta: 1 }]);
});
// initial === 1

// 30 seconds later (with no calls in between), the sweep checkpoints
// the context's data ({ count: 1 }) and disposes the isolate. The next
// call wakes from the checkpoint — \`this.count\` is restored to 1.
const resumed = await pool.run('tenant-42', async (context) => {
  const fn = await context.compileCallable(
    \`(args) => this.count + args.delta\`,
  );
  return await fn.call([{ delta: 1 }]);
});
// resumed === 2

pool.stats(); // { active: 1, hibernated: 0, total: 1 }`;
export const isolatedJscHibernationBoundary = `\
// What hibernation captures vs. what it doesn't.
//
// The pool calls \`context.checkpoint(options?)\` to serialize the
// CONTEXT'S DATA HALF — every structured-cloneable own property on the
// context's globalThis. On wake, the next call gets a fresh isolate
// whose context is seeded with that data via \`createContext({ checkpoint })\`.
//
// What it CAN restore:
//   - Plain JS values: numbers, strings, booleans, dates, arrays, maps,
//     sets, typed arrays, deeply nested objects.
//   - Anything that crosses structured-clone (the same rules postMessage
//     uses).
//
// What it CANNOT restore:
//   - Compiled callables, Script objects, References — code lives in
//     JIT'd machine state that doesn't survive isolate death. Your fn
//     RECOMPILES on wake (same as a fresh spawn).
//   - Pending promises, closure graphs, the call stack — anything that
//     references live JSC heap objects. SNAPSHOT_RESEARCH.md documents
//     this in detail: the public JSC C API doesn't expose a stable
//     heap pause/resume primitive.
//   - Host \`Reference\` callbacks installed via setGlobal — the host
//     side of the Reference still exists in your process, but the
//     sandbox-side binding is gone on the fresh isolate. Reinstall.
//
// The data/code split is the same model AWS Lambda uses for
// "init code runs once per cold start." Hibernation = fast cold start
// because the data is already there.`;
export const isolatedJscHibernationConcurrency = `\
// Single-flight wake. N concurrent calls to a hibernated key share one
// spawn — you don't get N isolates racing to restore the same
// checkpoint.
await Promise.all([
  pool.run('tenant-42', readAndBumpCounter),
  pool.run('tenant-42', readAndBumpCounter),
  pool.run('tenant-42', readAndBumpCounter),
]);
// All three calls saw the SAME context. The pool only allocated one
// isolate. Order of finally-block updates is non-deterministic, but
// each call sees a coherent snapshot of \`this.*\`.

// Atomic in-flight claim. A concurrent \`pool.hibernate(key)\` cannot
// race in between \`run()\` resolving the active entry and the body
// touching the context — the pool bumps an in-flight counter
// atomically as part of resolution. The hibernate call waits for
// in-flight to settle before checkpointing.
const work = pool.run('tenant-42', longRunningJob);
const hibernation = pool.hibernate('tenant-42');
// 'hibernation' resolves AFTER 'work' — checkpoint includes the final
// state from longRunningJob.`;
export const isolatedJscHibernationObservability = `\
// Observability hook. Useful when you want to ship hibernate/wake
// events to your metrics sink (Prometheus, Datadog, OTLP, …).
import type { HibernationEvent } from '@absolutejs/isolated-jsc';

const pool = createHibernatingIsolatePool({
  hibernateAfterMs: 60_000,
  onTransition: (event: HibernationEvent) => {
    switch (event.type) {
      case 'hibernate':
        metrics.observe('hibernate_byte_length', event.byteLength);
        metrics.increment('hibernate_count', { key: event.key });
        break;
      case 'wake':
        metrics.increment('wake_count', { key: event.key });
        break;
      case 'evict':
        metrics.increment('evict_count', {
          key: event.key,
          from: event.from, // 'active' | 'hibernated'
        });
        break;
    }
  },
});

// pool.stats() — synchronous snapshot, cheap to read.
const { active, hibernated, total } = pool.stats();
//
// total <= maxSize at all times. LRU eviction drops hibernated entries
// before active ones, so you usually shed cheap state (checkpoints in
// the store) before expensive state (live isolates).`;
export const isolatedJscHibernationStorage = `\
// Pluggable storage. The default is in-memory (one process). For
// production you typically want a persistent store so warm contexts
// survive a deploy.
import type { HibernationStore, ContextCheckpoint } from '@absolutejs/isolated-jsc';

const redisStore: HibernationStore = {
  get: async (key) => {
    const raw = await redis.get(\`isolated:\${key}\`);
    return raw === null ? undefined : JSON.parse(raw) as ContextCheckpoint;
  },
  put: async (key, checkpoint) => {
    await redis.set(\`isolated:\${key}\`, JSON.stringify(checkpoint), 'EX', 86_400);
  },
  delete: async (key) => {
    await redis.del(\`isolated:\${key}\`);
  },
};

const pool = createHibernatingIsolatePool({
  hibernateAfterMs: 30_000,
  hibernationStore: redisStore,
});

// \`pool.dispose()\` does NOT delete hibernated checkpoints from the
// store — the store may be shared with other processes. To purge,
// iterate through your store externally.

// If your store loses the checkpoint between hibernate and wake (TTL
// expiry, manual eviction, network partition), the pool falls back to
// fresh-spawn instead of throwing. The key is treated as new.`;
