export const runtimeBackoff = `\
// A spawn that fails (the spawn fn threw, or readiness timed out) records
// a per-key { attempt, retryAt, lastError } and the next ensure(key) throws
// fast until retryAt. After maxFailures consecutive failures, the key stays
// refused until clearBackoff(key). Without this, one broken tenant thrashes
// the host with rapid spawn retries.
const runtime = createRuntime({
  source: { kind: 'directory', root: '/srv/tenants' },
  backoff: {
    baseMs:      1_000,       // first retry waits 1s
    maxMs:       60_000,      // cap at 1 min
    maxFailures: 10,          // refuse outright after 10
  },
});

await runtime.ensure('broken-tenant'); // fails, records backoff
// Immediate retry refused without invoking spawn — no thrash.
await runtime.ensure('broken-tenant'); // throws 'backing off after 1 failure(s)'

// Operator fixes the underlying issue, then:
runtime.clearBackoff('broken-tenant');
await runtime.ensure('broken-tenant'); // retries now`;
export const runtimeHibernation = `\
// v0.1.0 hibernation strategy: idle-kill at the process layer.
//
// Bun has no shipped process-level snapshot/resume primitive as of 2026.
// The trade-off the default makes explicit: first call after idle pays a
// full Bun cold spawn (~50-200ms). For multi-tenant economics with mostly-
// idle tenants, that's the right default.
//
// JSC-context hibernation comes for free if the customer's process runs
// sandboxed handlers via @absolutejs/isolated-jsc — that layer hibernates
// per-context, not per-process, and the runtime gates the surrounding
// process at a coarser grain.
//
// If wake latency matters for your workload, disable idle-kill and rely
// on LRU eviction at maxConcurrent:
const runtime = createRuntime({
  source: { kind: 'directory', root: '/srv/tenants' },
  idleAfterMs: 0,             // disabled — only LRU + explicit kill shed
  maxConcurrent: 50,
});`;
export const runtimeObservation = `\
// Linux /proc-derived CPU + RSS observation (the data @absolutejs/metering
// needs to attribute idle hibernation cost precisely).
const runtime = createRuntime({
  source: { kind: 'directory', root: '/srv/tenants' },
  observeIntervalMs: 30_000,     // every 30s, default
  onMetrics: (event) => {
    if (event.type === 'observation') {
      // event = { type, key, pid, cpuMs, rssBytes, at }
      meter.record({
        type: 'observation',
        tenant: event.key,
        cpuMs: event.cpuMs,
        rssBytes: event.rssBytes,
        at: event.at,
      });
    }
  },
});

// cpuMs is CUMULATIVE since spawn — the meter charges the delta from the
// previous observation. A spawn/exit transition resets the baseline so a
// fresh process doesn't double-charge. Linux-only; the sweeper silently
// skips on macOS / Windows.`;
export const runtimeQuickStart = `\
import { createRuntime } from '@absolutejs/runtime';

const runtime = createRuntime({
  source: { kind: 'directory', root: '/srv/tenants' },
  idleAfterMs: 5 * 60 * 1000,                  // kill processes idle 5 min
  maxConcurrent: 100,                          // LRU-evict past 100 running
  onMetrics: (event) => prometheus.observe(event),
  onLog: (event) => loki.write(event),
  onTransition: (event) => audit.write(event),
});

// First call: spawns 'bun run start' in /srv/tenants/tenant-42, injects
// PORT, waits for readiness, returns the bound port.
const tenant = await runtime.ensure('tenant-42');
await fetch(\`http://127.0.0.1:\${tenant.port}/\`);

// Subsequent calls reuse the running process; touch() defers idle-kill.
runtime.touch('tenant-42');

runtime.stats();             // { running, total, draining, backoff }
await runtime.dispose();     // kill all + stop the sweep`;
export const runtimeRestartDrain = `\
// restart(key) — kill + spawn fresh in one call. Used by deploys to swap
// to a new release after the 'current' symlink moves.
const fresh = await runtime.restart('tenant-42');

// drain() — refuse new ensure() spawns; existing tenants keep running.
// Used for graceful shard shutdown before a host reboot.
runtime.drain();
runtime.stats().draining;     // true
// Operator waits for stats().running to reach 0, then dispose().

// Structured exit reasons surface on the 'exit' transition event:
//   crashed | exited-clean | idle-killed | lru-evicted | killed |
//   readiness-timeout | disposed | restarted
//
// The meter / control plane decides whether to charge (clean), retry
// (crash), or alert (readiness-timeout) based on this field.`;
