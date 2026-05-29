export const routerQuickStart = `\
import { createRouter } from '@absolutejs/router';

const router = createRouter({
  shards: [
    { id: 'engine-1', url: 'ws://10.0.0.11:3000' },
    { id: 'engine-2', url: 'ws://10.0.0.12:3000' },
  ],
  hashStrategy: 'jump',                    // default — exact 1/N movement
  perTenantConnectionCap: 100,
  perTenantRateLimit: { tokens: 100, refillPerSecond: 10 },
});

// In your WS upgrade handler:
const decision = router.route({ tenantId, channelId });
if (decision.decision !== 'allow') {
  return new Response(decision.decision, { status: 429 });
}
const handle = router.acquire(tenantId);
// ...proxy WS frames to decision.shard.url; call handle.release() on close.`;

export const routerStrategies = `\
// jump (default) — Lamping & Veach 2014. O(log n), no memory, exactly
// 1/N keys move when shards are added at the tail.  Ignores weight.
createRouter({ shards, hashStrategy: 'jump' });

// rendezvous — HRW hash. Supports per-shard weight for heterogeneous
// engine sizes. O(N) per lookup. Also accepts a load() hook biasing
// AWAY from overloaded shards: effectiveWeight = weight / load(id).
createRouter({
  shards: [
    { id: 'big',   url: 'ws://...', weight: 8 },
    { id: 'small', url: 'ws://...', weight: 1 },
  ],
  hashStrategy: 'rendezvous',
  load: (id) => runtimeRoster.get(id)?.activeTenants ?? 1,
});

// Custom strategy: (key, healthyShards) => index
createRouter({
  shards,
  hashStrategy: (key, shards) => fnv1a32(key) % shards.length,
});`;

export const routerDrain = `\
// drainShard(id) excludes a shard from new routing without marking it
// broken. Existing acquires keep running. For planned shard rotation:
router.drainShard('engine-1');
// Wait for the runtime to report 0 active tenants on that shard, then:
router.removeShard('engine-1');

// markUnhealthy(id) is the failure variant — tenants rehash to a
// healthy shard immediately.  markHealthy(id) clears BOTH states.`;

export const routerLimits = `\
// Per-tenant connection cap counted via acquire() / release().
// When reached, route() returns { decision: 'capped' }.
const router = createRouter({
  shards,
  perTenantConnectionCap: 100,
  perTenantRateLimit: { tokens: 100, refillPerSecond: 10 },

  // Per-route limits layered on top — atomic two-bucket commit. A failed
  // route bucket does NOT consume the tenant bucket.
  perRouteRateLimits: {
    upload: { tokens: 5, refillPerSecond: 0.083 },     // 5/min
  },
});

router.route({ tenantId: 'acme', route: 'upload' });
// → { decision: 'rate-limited', emptiedBucket: 'upload' } after 5 calls`;

export const routerMeterAllow = `\
import { createMeter } from '@absolutejs/metering';
import { createRouter } from '@absolutejs/router';

const meter = createMeter({ /* ... */ });

// The allow hook is the meter+router wire-up in one line.
const router = createRouter({
  shards,
  allow: meter.allow,   // refuse routes for over-quota tenants at the edge
  load: (id) => roster.load(id),
});

// route() now returns { decision: 'denied', shard: null } when meter.allow
// returns false. The gateway can surface a 'quota exceeded' page without
// paying for the upstream hop.`;

export const routerSnapshot = `\
// Preserve rate-limit tokens across edge restarts. Without this, a deploy
// hands every tenant a fresh full bucket — instant rate-limit bypass for
// anyone watching the deploy times.
const snap = router.snapshot();
await Bun.write('/var/lib/router/state.json', JSON.stringify(snap));

// On edge restart:
const restored = createRouter({ /* ... same config ... */ });
restored.restore(JSON.parse(await Bun.file('/var/lib/router/state.json').text()));`;
