import { and, count, desc, eq, SQL, sql } from 'drizzle-orm';
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
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'build:start'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'framework'`)
		.orderBy(desc(count()));

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
			...(!version ? { version: schema.telemetryEvents.version } : {}),
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
			...(!version ? [schema.telemetryEvents.version] : [])
		);

export const getVersionAdoption = async (db: DatabaseType) =>
	db
		.select({
			version: schema.telemetryEvents.version,
			count: count()
		})
		.from(schema.telemetryEvents)
		.groupBy(schema.telemetryEvents.version)
		.orderBy(desc(count()));

export const getPlatformBreakdown = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			os: schema.telemetryEvents.os,
			arch: schema.telemetryEvents.arch,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(versionFilter(version))
		.groupBy(schema.telemetryEvents.os, schema.telemetryEvents.arch)
		.orderBy(desc(count()));

export const getServerCrashFrequency = async (
	db: DatabaseType,
	version?: string
) =>
	db
		.select({
			date: sql<string>`DATE(${schema.telemetryEvents.server_timestamp})`,
			...(!version ? { version: schema.telemetryEvents.version } : {}),
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'dev:server-crash'),
				versionFilter(version)
			)
		)
		.groupBy(
			sql`DATE(${schema.telemetryEvents.server_timestamp})`,
			...(!version ? [schema.telemetryEvents.version] : [])
		)
		.orderBy(desc(sql`DATE(${schema.telemetryEvents.server_timestamp})`));

export const getCliCommandUsage = async (db: DatabaseType, version?: string) =>
	db
		.select({
			command: sql<string>`${schema.telemetryEvents.payload}->>'command'`,
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'cli:command'),
				versionFilter(version)
			)
		)
		.groupBy(sql`${schema.telemetryEvents.payload}->>'command'`)
		.orderBy(desc(count()));

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
			count: count()
		})
		.from(schema.telemetryEvents)
		.where(
			combine(
				eq(schema.telemetryEvents.event, 'dev:session-duration'),
				versionFilter(version)
			)
		)
		.groupBy(sessionDurationCase);

export const telemetryQueryHandlers: Record<
	string,
	(db: DatabaseType, version?: string) => Promise<unknown[]>
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
	'dev-sessions': getDevSessionDuration
};
