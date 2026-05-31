/**
 * Content for the @absolutejs/sync cluster-bus docs page. Covers
 * both vendor adapters: sync-bus-pg (Postgres LISTEN/NOTIFY +
 * overflow spill) and sync-bus-redis (Redis pub/sub).
 */

export const clusterBusWhy = `# Cluster bus — multi-instance sync fan-out

  A single SyncEngine instance fans out changes to its own
  subscribers in-process. Multiple instances behind a load balancer
  each see only their own writes — without a cluster bus, two
  clients hitting different shards never converge.

  engine.connectCluster(bus) wires the engine's commit stream to a
  bus. Every committed change becomes a ClusterMessage envelope
  broadcast to every other instance; receivers re-apply each
  message into their own local view, so subscribers on any shard
  see writes from every shard.

  The bus interface itself is minimal:

    type ClusterBus = {
      publish(message: ClusterMessage): Promise<void>;
      subscribe(handler: (message: ClusterMessage) => void): Promise<() => Promise<void>>;
    };

  Two first-party implementations: Postgres LISTEN/NOTIFY or Redis
  pub/sub. Pick by what you're already running.`;

export const clusterBusPgQuickStart = `import postgres from 'postgres';
import { createPostgresClusterBus } from '@absolutejs/sync-bus-pg';
import { createSyncEngine } from '@absolutejs/sync';

const sql = postgres(process.env.DATABASE_URL!);
const bus = createPostgresClusterBus({ sql });

const engine = createSyncEngine({ instanceId: 'shard-A' });
await engine.connectCluster(bus);

// Optionally prune the spill table on a schedule:
setInterval(() => bus.vacuum(60_000), 60_000);`;

export const clusterBusPg = `# @absolutejs/sync-bus-pg — Postgres LISTEN/NOTIFY

  Uses Postgres's native pub/sub (pg_notify + LISTEN). Pros:
  durability is at-least-once on local commit; no extra
  infrastructure if you're already running PG; the spill table
  handles payloads larger than the 8KB NOTIFY cap.

  createPostgresClusterBus({
    sql,                          // postgres.js client
    channel?: string,             // default 'absolutejs_sync_cluster'
    spill?: 'overflow' | 'always' | 'never',
    onError?: (error) => void,
  });

  Spill strategy:

  - 'overflow' (default): inline JSON when small, table-backed when
    the payload exceeds the inline budget. Best balance.
  - 'always': every message goes through the spill table —
    durable, slower; useful for forensic-replay workflows.
  - 'never': throw on oversized payloads. Useful in tests to assert
    payload-size discipline.

  bus.vacuum(olderThanMs) prunes spill rows older than the cutoff.
  Inline messages never touch the table — only the rare oversized
  batch does. NOTIFY broadcasts to every listener including the
  publisher's own, so the spill row outlives the broadcast and is
  pruned by age (delete-on-consume would race other listeners off
  the row).`;

export const clusterBusPgMetrics = `# Postgres bus metrics

  bus.metrics() returns cumulative counters since
  createPostgresClusterBus():

    {
      published:          number,  // envelopes put on the channel
      publishedInline:    number,  // small payloads — direct NOTIFY
      publishedSpilled:   number,  // oversized — via spill table
      received:           number,  // envelopes pulled off
      spillFetched:       number,  // receiver fetched a spill row
      spillFetchFailed:   number,  // spill row vacuumed before read
      spillVacuumed:      number,  // rows pruned by vacuum()
      publishErrors:      number,  // publish() threw
      subscribeErrors:    number,  // onError fired
    }

  Healthy small-payload workload: publishedSpilled is near zero. A
  climbing spillFetchFailed means vacuum() is racing the receivers
  — widen the vacuum window or shrink the spill rate.`;

export const clusterBusRedisQuickStart = `import Redis from 'ioredis';
import { createRedisClusterBus } from '@absolutejs/sync-bus-redis';
import { createSyncEngine } from '@absolutejs/sync';

const publisher = new Redis(process.env.REDIS_URL!);
const subscriber = publisher.duplicate(); // MUST be a separate connection
const bus = createRedisClusterBus({ publisher, subscriber });

const engine = createSyncEngine({ instanceId: 'shard-A' });
await engine.connectCluster(bus);`;

export const clusterBusRedis = `# @absolutejs/sync-bus-redis — Redis pub/sub

  Uses Redis's native PUBLISH / SUBSCRIBE. Pros: no 8KB payload
  cap; lower latency at 10+ subscribers; native geo-replication on
  managed Redis (Redis Cluster, ElastiCache Global Datastore,
  Memorystore, Upstash). Cons: at-most-once delivery — a
  disconnected subscriber misses messages while down. Pair with
  engine.exportChangeLog() for shard-reboot resume (same caveat as
  the PG bus would need for the same scenario).

  createRedisClusterBus({
    publisher,                  // any RedisCommandClient
    subscriber,                 // dedicated connection — publisher.duplicate()
    channel?: string,           // default 'absolutejs_sync_cluster'
    onError?: (error) => void,
  });

  The subscriber MUST be a separate connection — Redis forbids
  other commands on a subscribed connection, so a single client
  doing both publish + subscribe deadlocks. ioredis's duplicate()
  and node-redis's createClient() both work.

  Narrow RedisPublisher + RedisSubscriber interfaces means the
  adapter doesn't peer-dep a specific client. The README shows the
  wrapping for ioredis (EventEmitter-based) vs node-redis
  (callback-based).`;

export const clusterBusRedisMetrics = `# Redis bus metrics

  bus.metrics() returns cumulative counters since
  createRedisClusterBus():

    {
      published:               number,
      received:                number,
      publishErrors:           number,
      subscribeErrors:         number,
      totalSubscribersReached: number,  // sum of PUBLISH counts
    }

  totalSubscribersReached is a rough "is the cluster still wired
  up" signal — a drop to 0 when you expect peers means subscribers
  disconnected (replication lag, network partition, a region
  failover dropped the duplex). Redis treats "no subscribers" as
  success, so PUBLISH won't error — the metric is the canary.

  Pair with engine.metrics() (totalSubscriptions across instances)
  to spot the cluster halving silently.`;

export const clusterBusPickEach = `# Pick by deployment, not in the abstract

  Pick Postgres (sync-bus-pg) when:
  - You already run Postgres for the durable store. No extra infra.
  - You want at-least-once durability of inline broadcasts; the
    spill table can hold oversized payloads forensically.
  - You don't need cross-region fan-out (PG logical replication is
    the wrong primitive for cluster-bus traffic — too heavy).

  Pick Redis (sync-bus-redis) when:
  - You already run Redis for cache / queue / rate-limit.
  - You need cross-region fan-out — managed Redis offerings
    geo-replicate natively (Redis Cluster, ElastiCache Global,
    Memorystore, Upstash).
  - You want lower fan-out latency at high subscriber counts (10+).
  - You can tolerate at-most-once delivery (or pair with
    exportChangeLog for resume).

  Both adapters speak the same ClusterBus interface, so swap is
  one constructor change. The engine doesn't know which bus is
  underneath.`;
