/**
 * Content for the "Sync vs Convex" docs page. Comparison tables are typed
 * ComparisonRow[] data rendered via the ComparisonTable primitive; only
 * genuine code samples stay as code strings rendered via PrismPlus.
 *
 * Tone: honest both-ways. Convex is a great product and we built much of
 * sync standing on shoulders Convex shaped (cross-client query coalescing,
 * mutations-as-transactions, deterministic handlers as the safe path).
 * This page documents where sync is and where it isn't today.
 */

import { ComparisonRow } from '../../components/utils/ComparisonTable';

export const syncVsConvexCacheColumns = [
	'DB hits, cache off',
	'DB hits, cache on (default)'
];
export const syncVsConvexCacheRows: ComparisonRow[] = [
	{ feature: '100', values: ['100', '1'] },
	{ feature: '1,000', values: ['1,000', '1'] },
	{ feature: '10,000', values: ['10,000', '1'] }
];
export const syncVsConvexMatrixColumns = ['Convex', 'sync'];
export const syncVsConvexMatrixRows: ComparisonRow[] = [
	{
		feature: 'Reactive subscriptions',
		note: 'same mental model',
		values: [true, true]
	},
	{
		feature: 'Server-authored mutations',
		note: 'mutations are the only way to write',
		values: [true, true]
	},
	{
		feature: 'Automatic dependency tracking',
		note: 'read-set + invalidation',
		values: [true, true]
	},
	{
		feature: 'Optimistic mutations',
		values: [true, true]
	},
	{
		feature: 'Cross-client query coalescing',
		note: '"one query body per (code, params, read-set)" — sync since 1.3',
		values: [true, true]
	},
	{
		feature: 'Local-first / offline',
		note: 'catch-up via change log on reconnect — sync Tier 2',
		values: [true, true]
	},
	{
		feature: 'Built-in permissions',
		note: 'row-level + per-mutation authorize',
		values: [true, true]
	},
	{
		feature: 'Live search',
		note: 'text + vector indexes',
		values: [true, true]
	},
	{
		feature: 'Scheduled functions / cron',
		note: '@elysiajs/cron + registerSchedule',
		values: [true, true]
	},
	{
		feature: 'CRDT collaboration',
		note: 'RGA text + LWW reg + PN-counter + adapters',
		values: ['third-party', 'first-party (/crdt)']
	},
	{
		feature: 'Schema validation',
		note: 'defineSchema + field()',
		values: ['runtime-enforced', 'declare + enforce']
	},
	{
		feature: 'Devtools / inspector',
		note: 'console + recent changes',
		values: ['dashboard', 'engine.inspect()']
	},
	{
		feature: 'Sandboxed handler execution',
		note: 'sandboxedHandler + @absolutejs/isolated-jsc',
		values: ['always-on (V8)', 'opt-in (1.4)']
	},
	{
		feature: 'Determinism guarantees',
		note: 'sync trusts the developer; sandbox is opt-in',
		values: ['strict (managed)', 'developer-owned']
	},
	{
		feature: 'DB choice',
		note: 'Postgres, MySQL, SQLite, Drizzle, Prisma',
		values: ['Convex DB only', 'any']
	},
	{
		feature: 'Handler language',
		note: 'TS, async, host imports, your runtime',
		values: ['JS only', 'any host code']
	},
	{
		feature: 'Time-travel queries',
		note: 'engine.replayTo({ at, tables? }) — sync 1.22, see below',
		values: [true, true]
	},
	{
		feature: 'Tenant migration primitives',
		note: 'engine.fence / exportSnapshot / importSnapshot — sync 1.24',
		values: [false, true]
	},
	{
		feature: 'Multi-region replication',
		note: 'host-level concern, no managed offering',
		values: ['managed', 'DIY']
	},
	{
		feature: 'Hosting model',
		note: 'managed PaaS planned (uses isolated-jsc)',
		values: ['managed only', 'self-host']
	}
];
export const syncVsConvexMigrateVerbs = `// ── on the source ──
const fence = source.fence({ reason: 'tenant-7 → us-east-2' });
try {
  const snapshot = await source.exportSnapshot();
  await transport(snapshot); // S3, message bus, your choice
  // ── on the target ──
  await target.importSnapshot(snapshot, {
    onProgress: (table, done, total) =>
      observability.gauge('migrate.rows', { table, done, total })
  });
  await dnsCutover(); // direct clients at target
} finally {
  fence.lift();
}`;
export const syncVsConvexReplayRetention = `createSyncEngine({
  changeLogSize: 100_000,
  changeLogRetainMs: 14 * 24 * 60 * 60 * 1000 // 14-day window
});`;
export const syncVsConvexReplayUsage = `const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
const result = await engine.replayTo({
  at: twoHoursAgo,
  tables: ['orders']
});
if (result.truncated) {
  console.warn('Best-effort — log retention window too short.');
}
console.log(result.rows.orders);`;
export const syncVsConvexSandboxHandler = `defineMutation({
  name: 'transfer',
  sandbox: { memoryLimit: 32, timeout: 1000 },
  sandboxedHandler: \`async (args, ctx, actions) => {
    await actions.update('accounts', { id: args.from, balance: ... });
    await actions.update('accounts', { id: args.to, balance: ... });
  }\`,
});`;
export const syncVsConvexWireDiffColumns = [
	'Convex per-push',
	'sync per-push',
	'Ratio'
];
export const syncVsConvexWireDiffRows: ComparisonRow[] = [
	{ feature: '100', values: ['12.4 KB', '118 B', '105×'] },
	{ feature: '1,000', values: ['116.3 KB', '118 B', '986×'] },
	{ feature: '5,000', values: ['577.1 KB', '118 B', '4,888×'] }
];
