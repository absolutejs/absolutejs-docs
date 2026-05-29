export const meteringQuickStart = `\
import { createMeter, consoleSink } from '@absolutejs/metering';

const meter = createMeter({
  sinks: [consoleSink, influxSink],
  budgets: {
    '*':         { cpuMs: 60_000, requests: 10_000 },         // free-tier default
    'acme-prod': { cpuMs: 600_000, requests: 1_000_000 },     // paid override
  },
  onBreach: ({ tenant, dimension, observed, limit }) => {
    suspendAtRouter(tenant, { dimension, observed, limit });
  },
});

// Wire @absolutejs/sync's handlerMetrics:
syncEngine.handlerMetrics = (record) => {
  meter.record({
    type: 'handler',
    tenant: currentTenantId(),
    mutationName: record.mutationName,
    durationMs: record.durationMs,
    cpuMs: record.cpuMs,
    ok: record.ok,
  });
};

// Wire @absolutejs/runtime's observation + transitions:
runtime.options.onMetrics = (event) => {
  if (event.type !== 'observation') return;
  meter.record({
    type: 'observation',
    tenant: event.key,
    cpuMs: event.cpuMs,
    rssBytes: event.rssBytes,
  });
};

// Gate at the router:
if (!meter.allow(tenantId)) return new Response('Quota exceeded', { status: 429 });`;

export const meteringRolling = `\
// Cumulative budgets stick until reset(). Rolling-window budgets re-close
// automatically as events drain. Both can apply to the same tenant.
const meter = createMeter({
  budgets: {
    'acme': { cpuMs: 3_600_000 },          // 1 hour CPU/month, sticky
  },
  rollingBudgets: {
    '*': [
      { dimension: 'errors',   windowMs: 5  * 60_000, limit: 50 },
      { dimension: 'requests', windowMs: 1  * 60_000, limit: 1_000 },
    ],
  },
});

// Customer-facing 'N requests left in this window' display:
const left = meter.rollingSum('acme', 'requests', 60_000);

// After a rolling breach, the breaker auto-clears once the window drains.
// No reset() needed — that's the difference from cumulative.`;

export const meteringSinks = `\
// Sinks can be a function (0.0.1 shape) OR an object with optional
// flush() / close(). dispose() awaits flush, then close, in order across
// every sink. A throwing flush is logged + swallowed; later sinks still
// flush. That's what batched adapters (Stripe, Influx, ClickHouse) need
// to not drop the last few events on shard shutdown.
const meter = createMeter({
  sinks: [
    consoleSink,
    {
      ingest: (event) => stripeMeter.report(event),
      flush:  () => stripeMeter.flush(),
      close:  () => stripeMeter.close(),
    },
  ],
});

// On shard shutdown:
await meter.dispose();   // every sink's flush(), then close()`;

export const meteringSnapshot = `\
// Survive shard restarts — the bill doesn't reset to zero.
const snap = meter.snapshot();
await Bun.write('/var/lib/meter/state.json', JSON.stringify(snap));

// After shard restart:
const restored = createMeter({ /* same config */ });
restored.restore(JSON.parse(await Bun.file('/var/lib/meter/state.json').text()));

// Captures usage, tripped state, rolling-window state, and the last
// observation cpuMs baseline so the next observation charges a delta
// (not the cumulative-since-process-start value).`;
