export const rateLimitQuickStart = `\
import { Elysia } from 'elysia';
import { rateLimit, gcra } from '@absolutejs/rate-limit';

new Elysia()
  .use(rateLimit({
    // GCRA — the algorithm Stripe uses. Exact, O(1) memory per key,
    // no boundary effects. Burst of 5, sustained 10 req/s.
    algorithm: gcra({ requestsPerPeriod: 10, periodMs: 1000, burst: 5 }),
    // 'ip' uses extractIp() with the trustedProxies + ipv6Prefix below.
    key: 'ip',
    trustedProxies: 1, // honor one CDN/LB hop of X-Forwarded-For
  }))
  .get('/', () => 'ok')
  .listen(3000);`;

export const rateLimitAlgorithms = `\
// GCRA — default. Exact, BigInt nanosecond TAT, no float drift.
import { gcra } from '@absolutejs/rate-limit';
gcra({ requestsPerPeriod: 100, periodMs: 60_000, burst: 20 });

// Token bucket — classic. Allows refill-boundary bursts up to capacity.
import { tokenBucket } from '@absolutejs/rate-limit';
tokenBucket({ capacity: 100, refillPerSecond: 1.667 });

// Sliding-window counter — approximation; intuitive on a status page.
import { slidingWindow } from '@absolutejs/rate-limit';
slidingWindow({ requestsPerPeriod: 100, periodMs: 60_000 });

// Combined — passes only when every component passes. Stack limits:
//   100 / minute per IP AND 10,000 / day per user-id
import { combined } from '@absolutejs/rate-limit';
combined({
  algorithms: [
    gcra({ requestsPerPeriod: 100,    periodMs: 60_000,     burst: 20 }),
    gcra({ requestsPerPeriod: 10_000, periodMs: 86_400_000           }),
  ],
});`;

export const rateLimitCost = `\
new Elysia().use(rateLimit({
  algorithm: gcra({ requestsPerPeriod: 100, periodMs: 60_000, burst: 20 }),

  // Per-route cost — heavy endpoints charge more.
  cost: (ctx) => {
    if (ctx.request.url.includes('/upload')) return 5;
    if (ctx.request.url.includes('/admin'))  return 0; // free for admin
    return 1;
  },

  // Custom key derivation — per-tenant, falling back to IP.
  key: (ctx) => ctx.request.headers.get('x-tenant') ?? extractIp({
    connectionIp: ctx.server?.requestIP?.(ctx.request)?.address ?? null,
    headers: ctx.request.headers,
    trustedProxies: 1,
  }),

  // Skip for admin tokens (sync — async work belongs in key).
  skip: (ctx) => ctx.request.headers.get('authorization') === ADMIN,

  // Fire a billing event on every allowed request.
  onAllow: (_ctx, info) => meter.record({
    type: 'handler', tenant: info.key, durationMs: 0, cpuMs: 0, ok: true,
  }),

  // Customize the 429 response.
  onLimit: (_ctx, info) => new Response(JSON.stringify({
    ok: false, retryAfterSec: info.decision.retryAfterSec,
  }), { status: 429, headers: { 'Content-Type': 'application/json' } }),
}));`;

export const rateLimitHeaders = `\
# IETF draft-09 (default — headers: 'standard')
RateLimit: limit=20, remaining=18, reset=15
RateLimit-Policy: 100;w=60;burst=20
Retry-After: 7                       # only on 429

# Legacy GitHub-style (headers: 'legacy')
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 18
X-RateLimit-Reset: 15
Retry-After: 7

# Or 'both' to emit both — useful during a transition.
# 'false' suppresses everything except Retry-After.`;

export const rateLimitIpModes = `\
// trustedProxies — IPv6 /64 — CDN-aware
import { extractIp } from '@absolutejs/rate-limit/core';

// 0: ignore X-Forwarded-For entirely. Use the raw connection IP only.
extractIp({ trustedProxies: 0, ... });

// 1: trust ONE proxy hop. Take XFF[length - 1] (the originator). This is
// the right default behind ONE CDN. Anything to the left is attacker-set.
extractIp({ trustedProxies: 1, ... });

// 2: trust TWO hops (CDN + load balancer). Same idea, take XFF[length-2].
extractIp({ trustedProxies: 2, ... });

// IPv6 grouping: by default IPv6 is reduced to its /64 prefix — one user
// allocation per RIR convention. 2001:db8::1 and 2001:db8::dead:beef both
// hash to '2001:db8:0:0:0:0:0:0/64'. Configurable via ipv6Prefix.
extractIp({ ipv6Prefix: 128, ... }); // disable grouping

// Honors cf-connecting-ip, fly-client-ip, true-client-ip, x-real-ip when
// XFF is missing and a proxy is trusted.`;

export const rateLimitNonHttp = `\
// Use the algorithms directly outside HTTP — WebSocket message rate-limit,
// queue consumer throttle, AI call quotas. Import from /core to skip the
// Elysia dependency entirely.
import { gcra, memoryStore } from '@absolutejs/rate-limit/core';

const aiLimiter = gcra({ requestsPerPeriod: 60, periodMs: 60_000, burst: 10 });
const store = memoryStore();

async function callOpenAi(userId: string, prompt: string) {
  const decision = aiLimiter.check(store, userId, Date.now());
  if (!decision.allowed) {
    throw new Error(\`Slow down — retry in \${decision.retryAfterSec}s\`);
  }
  return openai.chat.completions.create({ ... });
}

// peek() = read-only inspection (no token consumed).
const remaining = aiLimiter.peek(store, userId, Date.now()).remaining;

// reset() = admin clear.
aiLimiter.reset(store, userId);`;
