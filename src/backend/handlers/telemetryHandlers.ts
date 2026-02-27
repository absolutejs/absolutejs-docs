import {
	and,
	count,
	desc,
	eq,
	inArray,
	SQL,
	sql,
	gte,
	lte,
	ilike,
	or
} from 'drizzle-orm';
import { DatabaseType, NewTelemetryEvent, schema } from '../../../db/schema';

const stripPaths = (msg: string) => msg.replace(/(?:\/[\w.-]+)+/g, '<path>');

const sanitizePayload = (payload: Record<string, unknown> | undefined) => {
	if (!payload) return {};
	const sanitized: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(payload)) {
		sanitized[key] = typeof value === 'string' ? stripPaths(value) : value;
	}
	return sanitized;
};

type InsertTelemetryEventProps = {
	db: DatabaseType;
	event: NewTelemetryEvent;
};

export const insertTelemetryEvent = async ({
	db,
	event
}: InsertTelemetryEventProps) => {
	const [inserted] = await db
		.insert(schema.telemetryEvents)
		.values({
			...event,
			payload: sanitizePayload(
				event.payload as Record<string, unknown> | undefined
			)
		})
		.returning();
	return inserted;
};

const versionFilter = (version: string | undefined): SQL | undefined =>
	version ? eq(schema.telemetryEvents.version, version) : undefined;

const combine = (...conditions: (SQL | undefined)[]): SQL | undefined => {
	const defined = conditions.filter(
		(condition): condition is SQL => condition !== undefined
	);
	if (defined.length === 0) return undefined;
	if (defined.length === 1) return defined[0];
	return and(...defined);
};

export const getErrorRatesByEvent = async (
	db: DatabaseType,
	version?: string
) => {
	return db
		.select({
			event: schema.telemetryEvents.event,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				sql`${schema.telemetryEvents.event} LIKE '%error%'`,
				versionFilter(version)
			)
		)
		.groupBy(
			schema.telemetryEvents.event,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));
};

export const getBuildErrorsByPass = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			pass: sql<string>`${schema.telemetryEvents.payload}->>'pass'`,
			incremental: sql<string>`${schema.telemetryEvents.payload}->>'incremental'`,
			message: sql<string>`LEFT(${schema.telemetryEvents.payload}->>'message', 200)`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:error'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'pass'`,
			sql`${schema.telemetryEvents.payload}->>'incremental'`,
			sql`LEFT(${schema.telemetryEvents.payload}->>'message', 200)`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));

export const getFrameworkPopularity = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			framework: sql<string>`${schema.telemetryEvents.payload}->>'framework'`,
			tailwind: sql<string>`${schema.telemetryEvents.payload}->>'tailwind'`,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:start'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'framework'`,
			sql`${schema.telemetryEvents.payload}->>'tailwind'`
		)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getHMRReliability = async (db: DatabaseType, version?: string) =>
	db
		.select({
			event: schema.telemetryEvents.event,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				sql`${schema.telemetryEvents.event} LIKE 'hmr:%'`,
				versionFilter(version)
			)
		)
		.groupBy(
			schema.telemetryEvents.event,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));

const buildDurationCase = sql`CASE
	WHEN (${schema.telemetryEvents.payload}->>'durationMs')::int < 1000 THEN '<1s'
	WHEN (${schema.telemetryEvents.payload}->>'durationMs')::int < 5000 THEN '1-5s'
	WHEN (${schema.telemetryEvents.payload}->>'durationMs')::int < 15000 THEN '5-15s'
	ELSE '>15s'
END`;

export const getBuildDurationDistribution = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			duration_bucket: sql<string>`${buildDurationCase}`,
			...(!version
				? {
						version: schema.telemetryEvents.version,
						frameworks: sql<string>`${schema.telemetryEvents.payload}->>'frameworks'`
					}
				: {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:complete'),
				versionFilter(version)
			)
		)
		.groupBy(
			buildDurationCase,
			...(!version
				? [
						schema.telemetryEvents.version,
						sql`${schema.telemetryEvents.payload}->>'frameworks'`
					]
				: [])
		);

export const getVersionAdoption = async (db: DatabaseType) =>
	db
		.select({
			version: schema.telemetryEvents.version,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.groupBy(schema.telemetryEvents.version)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getPlatformBreakdown = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			os: schema.telemetryEvents.os,
			arch: schema.telemetryEvents.arch,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(versionFilter(version))
		.groupBy(schema.telemetryEvents.os, schema.telemetryEvents.arch)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getServerCrashFrequency = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			event: schema.telemetryEvents.event,
			date: sql<string>`DATE(${schema.telemetryEvents.server_timestamp})`,
			exit_code: sql<string>`${schema.telemetryEvents.payload}->>'exitCode'`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				sql`${schema.telemetryEvents.event} IN ('dev:server-crash', 'start:server-exit')`,
				versionFilter(version)
			)
		)
		.groupBy(
			schema.telemetryEvents.event,
			sql`DATE(${schema.telemetryEvents.server_timestamp})`,
			sql`${schema.telemetryEvents.payload}->>'exitCode'`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(sql`DATE(${schema.telemetryEvents.server_timestamp})`));

export const getCliCommandUsage = async (db: DatabaseType, version?: string) =>
	db
		.select({
			command: sql<string>`${schema.telemetryEvents.payload}->>'command'`,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'cli:command'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'command'`)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getHMRRebuildStats = async (db: DatabaseType, version?: string) =>
	db
		.select({
			framework: sql<string>`${schema.telemetryEvents.payload}->>'framework'`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			avg_duration_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'durationMs')::int)`,
			avg_file_count: sql<number>`AVG((${schema.telemetryEvents.payload}->>'fileCount')::int)`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'hmr:rebuild-complete'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'framework'`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));

const sessionDurationCase = sql`CASE
	WHEN (${schema.telemetryEvents.payload}->>'duration')::int < 60 THEN '<1m'
	WHEN (${schema.telemetryEvents.payload}->>'duration')::int < 300 THEN '1-5m'
	WHEN (${schema.telemetryEvents.payload}->>'duration')::int < 900 THEN '5-15m'
	WHEN (${schema.telemetryEvents.payload}->>'duration')::int < 3600 THEN '15-60m'
	ELSE '>60m'
END`;

export const getDevSessionDuration = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			duration_bucket: sql<string>`${sessionDurationCase}`,
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'dev:session-duration'),
				versionFilter(version)
			)
		)
		.groupBy(
			sessionDurationCase,
			sql`${schema.telemetryEvents.payload}->>'entry'`
		);

export const getBuildEmpty = async (db: DatabaseType, version?: string) =>
	db
		.select({
			frameworks: sql<string>`${schema.telemetryEvents.payload}->>'frameworks'`,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:empty'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'frameworks'`)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getMissingManifest = async (db: DatabaseType, version?: string) =>
	db
		.select({
			asset_name: sql<string>`${schema.telemetryEvents.payload}->>'assetName'`,
			asset_type: sql<string>`${schema.telemetryEvents.payload}->>'assetType'`,
			html_file: sql<string>`${schema.telemetryEvents.payload}->>'htmlFile'`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(
					schema.telemetryEvents.event,
					'build:missing-manifest-entry'
				),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'assetName'`,
			sql`${schema.telemetryEvents.payload}->>'assetType'`,
			sql`${schema.telemetryEvents.payload}->>'htmlFile'`
		)
		.orderBy(desc(count()));

export const getDevStarts = async (db: DatabaseType, version?: string) =>
	db
		.select({
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'dev:start'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'entry'`)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getHMRErrors = async (db: DatabaseType, version?: string) =>
	db
		.select({
			event: schema.telemetryEvents.event,
			framework_or_operation: sql<string>`COALESCE(
				${schema.telemetryEvents.payload}->>'frameworks',
				${schema.telemetryEvents.payload}->>'framework',
				${schema.telemetryEvents.payload}->>'operation',
				${schema.telemetryEvents.payload}->>'logCount'
			)`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				sql`${schema.telemetryEvents.event} IN ('hmr:error', 'hmr:rebuild-error', 'hmr:client-build-failed', 'hmr:graph-error')`,
				versionFilter(version)
			)
		)
		.groupBy(
			schema.telemetryEvents.event,
			sql`COALESCE(
				${schema.telemetryEvents.payload}->>'frameworks',
				${schema.telemetryEvents.payload}->>'framework',
				${schema.telemetryEvents.payload}->>'operation',
				${schema.telemetryEvents.payload}->>'logCount'
			)`
		)
		.orderBy(desc(count()));

export const getHMRRebuildErrors = async (db: DatabaseType, version?: string) =>
	db
		.select({
			framework: sql<string>`${schema.telemetryEvents.payload}->>'framework'`,
			avg_duration_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'durationMs')::int)`,
			avg_file_count: sql<number>`AVG((${schema.telemetryEvents.payload}->>'fileCount')::int)`,
			frameworks: sql<string>`${schema.telemetryEvents.payload}->>'frameworks'`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'hmr:rebuild-error'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'framework'`,
			sql`${schema.telemetryEvents.payload}->>'frameworks'`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));

export const getKpiSummary = async (db: DatabaseType) => {
	const [totalResult, errorResult, buildResult, frameworkResult] =
		await Promise.all([
			db.select({ count: count() }).from(schema.telemetryEvents),
			db
				.select({ count: count() })
				.from(schema.telemetryEvents)
				.where(sql`${schema.telemetryEvents.event} LIKE '%error%'`),
			db
				.select({
					avg_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'durationMs')::int)`
				})
				.from(schema.telemetryEvents)
				.where(eq(schema.telemetryEvents.event, 'build:complete')),
			db
				.select({
					framework: sql<string>`${schema.telemetryEvents.payload}->>'framework'`,
					count: count()
				})
				.from(schema.telemetryEvents)
				.where(eq(schema.telemetryEvents.event, 'build:start'))
				.groupBy(sql`${schema.telemetryEvents.payload}->>'framework'`)
				.orderBy(desc(count()))
				.limit(1)
		]);

	const total = totalResult[0]?.count ?? 0;
	const errors = errorResult[0]?.count ?? 0;
	const avgBuildMs = buildResult[0]?.avg_ms ?? null;
	const topFramework = frameworkResult[0]?.framework ?? null;

	return {
		totalEvents: total,
		errorRate: total > 0 ? Number(((errors / total) * 100).toFixed(1)) : 0,
		avgBuildMs: avgBuildMs !== null ? Math.round(avgBuildMs) : null,
		topFramework
	};
};

type EventFilters = {
	page?: number;
	pageSize?: number;
	event?: string;
	version?: string;
	os?: string;
	bun_version?: string;
	anonymous_id?: string;
	search?: string;
	from?: string;
	to?: string;
};

const buildEventFilterWhere = (filters: EventFilters) => {
	const conditions: (SQL | undefined)[] = [];

	if (filters.event)
		conditions.push(eq(schema.telemetryEvents.event, filters.event));
	if (filters.version)
		conditions.push(eq(schema.telemetryEvents.version, filters.version));
	if (filters.os) conditions.push(eq(schema.telemetryEvents.os, filters.os));
	if (filters.bun_version)
		conditions.push(
			eq(schema.telemetryEvents.bun_version, filters.bun_version)
		);
	if (filters.anonymous_id)
		conditions.push(
			eq(schema.telemetryEvents.anonymous_id, filters.anonymous_id)
		);
	if (filters.from)
		conditions.push(
			gte(schema.telemetryEvents.server_timestamp, new Date(filters.from))
		);
	if (filters.to)
		conditions.push(
			lte(schema.telemetryEvents.server_timestamp, new Date(filters.to))
		);
	if (filters.search) {
		const pattern = `%${filters.search}%`;
		conditions.push(
			or(
				sql`${schema.telemetryEvents.id}::text ILIKE ${pattern}`,
				ilike(schema.telemetryEvents.event, pattern),
				ilike(schema.telemetryEvents.anonymous_id, pattern),
				ilike(schema.telemetryEvents.version, pattern),
				ilike(schema.telemetryEvents.os, pattern),
				sql`${schema.telemetryEvents.payload}::text ILIKE ${pattern}`
			)
		);
	}

	return combine(...conditions);
};

export const getAllEvents = async (db: DatabaseType, filters: EventFilters) => {
	const page = filters.page ?? 1;
	const pageSize = Math.min(filters.pageSize ?? 50, 200);
	const offset = (page - 1) * pageSize;

	const where = buildEventFilterWhere(filters);

	const [rows, totalResult] = await Promise.all([
		db
			.select()
			.from(schema.telemetryEvents)
			.where(where)
			.orderBy(desc(schema.telemetryEvents.server_timestamp))
			.limit(pageSize)
			.offset(offset),
		db.select({ count: count() }).from(schema.telemetryEvents).where(where)
	]);

	return {
		rows,
		total: totalResult[0]?.count ?? 0,
		page,
		pageSize
	};
};

export const deleteTelemetryEventsByFilter = async (
	db: DatabaseType,
	filters: Omit<EventFilters, 'page' | 'pageSize'>
) => {
	const where = buildEventFilterWhere(filters);
	const deleted = await db
		.delete(schema.telemetryEvents)
		.where(where)
		.returning({ id: schema.telemetryEvents.id });
	return deleted;
};

export const getBunVersions = async (db: DatabaseType) => {
	const rows = await db
		.select({
			bun_version: schema.telemetryEvents.bun_version
		})
		.from(schema.telemetryEvents)
		.groupBy(schema.telemetryEvents.bun_version)
		.orderBy(desc(schema.telemetryEvents.bun_version));

	return rows
		.map((r) => r.bun_version)
		.filter((v): v is string => v !== null);
};

export const getUniqueUsers = async (db: DatabaseType, search?: string) => {
	const where = search
		? ilike(schema.telemetryEvents.anonymous_id, `%${search}%`)
		: undefined;

	return db
		.select({
			anonymous_id: schema.telemetryEvents.anonymous_id,
			total_events: count(),
			first_seen: sql<string>`MIN(${schema.telemetryEvents.server_timestamp})`,
			last_seen: sql<string>`MAX(${schema.telemetryEvents.server_timestamp})`,
			versions: sql<
				string[]
			>`ARRAY_AGG(DISTINCT ${schema.telemetryEvents.version})`,
			os_list: sql<
				string[]
			>`ARRAY_AGG(DISTINCT ${schema.telemetryEvents.os})`
		})
		.from(schema.telemetryEvents)
		.where(where)
		.groupBy(schema.telemetryEvents.anonymous_id)
		.orderBy(desc(sql`MAX(${schema.telemetryEvents.server_timestamp})`));
};

export const getUserEvents = async (
	db: DatabaseType,
	anonymousId: string,
	filters: Omit<EventFilters, 'anonymous_id'>
) => getAllEvents(db, { ...filters, anonymous_id: anonymousId });

export const deleteTelemetryEvent = async (db: DatabaseType, id: string) => {
	const [deleted] = await db
		.delete(schema.telemetryEvents)
		.where(eq(schema.telemetryEvents.id, id))
		.returning({ id: schema.telemetryEvents.id });
	return deleted ?? null;
};

export const deleteTelemetryEvents = async (
	db: DatabaseType,
	ids: string[]
) => {
	const deleted = await db
		.delete(schema.telemetryEvents)
		.where(inArray(schema.telemetryEvents.id, ids))
		.returning({ id: schema.telemetryEvents.id });
	return deleted;
};

export const getUserLabels = async (db: DatabaseType) =>
	db.select().from(schema.telemetryUserLabels);

type UpsertUserLabelProps = {
	db: DatabaseType;
	anonymousId: string;
	label: string;
};

export const upsertUserLabel = async ({
	db,
	anonymousId,
	label
}: UpsertUserLabelProps) => {
	const [result] = await db
		.insert(schema.telemetryUserLabels)
		.values({
			anonymous_id: anonymousId,
			label,
			updated_at: new Date()
		})
		.onConflictDoUpdate({
			target: schema.telemetryUserLabels.anonymous_id,
			set: { label, updated_at: new Date() }
		})
		.returning();
	return result;
};

export const deleteUserLabel = async (
	db: DatabaseType,
	anonymousId: string
) => {
	const [deleted] = await db
		.delete(schema.telemetryUserLabels)
		.where(eq(schema.telemetryUserLabels.anonymous_id, anonymousId))
		.returning();
	return deleted ?? null;
};

export const getStartStarts = async (db: DatabaseType, version?: string) =>
	db
		.select({
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			avg_build_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'buildDurationMs')::int)`,
			avg_bundle_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'bundleDurationMs')::int)`,
			avg_total_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'totalDurationMs')::int)`,
			users: sql<number>`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'start:start'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'entry'`)
		.orderBy(
			desc(sql`COUNT(DISTINCT ${schema.telemetryEvents.anonymous_id})`)
		);

export const getStartSessionDuration = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			duration_bucket: sql<string>`${sessionDurationCase}`,
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'start:session-duration'),
				versionFilter(version)
			)
		)
		.groupBy(
			sessionDurationCase,
			sql`${schema.telemetryEvents.payload}->>'entry'`
		);

export const getStartBundleStats = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			avg_duration_ms: sql<number>`AVG((${schema.telemetryEvents.payload}->>'durationMs')::int)`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'start:bundle-complete'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'entry'`)
		.orderBy(desc(count()));

export const getDevRestarts = async (db: DatabaseType, version?: string) =>
	db
		.select({
			entry: sql<string>`${schema.telemetryEvents.payload}->>'entry'`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'dev:restart'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'entry'`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(count()));

export const getBuildDurationByMode = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			mode: sql<string>`${schema.telemetryEvents.payload}->>'mode'`,
			duration_bucket: sql<string>`${buildDurationCase}`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:complete'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`${schema.telemetryEvents.payload}->>'mode'`,
			buildDurationCase
		);

export const telemetryQueryHandlers: Record<
	string,
	(db: DatabaseType, version?: string) => Promise<Record<string, unknown>[]>
> = {
	'error-rates': getErrorRatesByEvent,
	'build-errors': getBuildErrorsByPass,
	'framework-popularity': getFrameworkPopularity,
	'hmr-reliability': getHMRReliability,
	'build-duration': getBuildDurationDistribution,
	'version-adoption': getVersionAdoption,
	'platform-breakdown': getPlatformBreakdown,
	'server-crashes': getServerCrashFrequency,
	'cli-commands': getCliCommandUsage,
	'hmr-rebuilds': getHMRRebuildStats,
	'dev-sessions': getDevSessionDuration,
	'build-empty': getBuildEmpty,
	'missing-manifest': getMissingManifest,
	'dev-starts': getDevStarts,
	'hmr-errors': getHMRErrors,
	'hmr-rebuild-errors': getHMRRebuildErrors,
	'start-starts': getStartStarts,
	'start-sessions': getStartSessionDuration,
	'start-bundles': getStartBundleStats,
	'dev-restarts': getDevRestarts,
	'build-duration-by-mode': getBuildDurationByMode
};
