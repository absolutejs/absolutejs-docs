/**
 * Code samples for the sync cluster-bus docs page. The cluster bus
 * fans @absolutejs/sync updates across server instances, with two
 * first-party adapters: @absolutejs/sync-bus-pg (Postgres
 * LISTEN/NOTIFY + overflow spill) and @absolutejs/sync-bus-redis
 * (Redis pub/sub).
 */

export const clusterBusInterface = `type ClusterBus = {
  publish(message: ClusterMessage): Promise<void>;
  subscribe(
    handler: (message: ClusterMessage) => void,
  ): Promise<() => Promise<void>>;
};`;

export const clusterBusPgQuickStart = `import postgres from 'postgres';
import { createPostgresClusterBus } from '@absolutejs/sync-bus-pg';
import { createSyncEngine } from '@absolutejs/sync';

const sql = postgres(process.env.DATABASE_URL!);
const bus = createPostgresClusterBus({ sql });

const engine = createSyncEngine({ instanceId: 'shard-A' });
await engine.connectCluster(bus);

// Optionally prune the spill table on a schedule:
setInterval(() => bus.vacuum(60_000), 60_000);`;

export const clusterBusRedisQuickStart = `import Redis from 'ioredis';
import { createRedisClusterBus } from '@absolutejs/sync-bus-redis';
import { createSyncEngine } from '@absolutejs/sync';

const publisher = new Redis(process.env.REDIS_URL!);
const subscriber = publisher.duplicate(); // MUST be a separate connection
const bus = createRedisClusterBus({ publisher, subscriber });

const engine = createSyncEngine({ instanceId: 'shard-A' });
await engine.connectCluster(bus);`;
