import {
	jsonb,
	pgEnum,
	pgTable,
	text,
	uuid,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { PROVIDER_STATUSES } from '../src/constants';
import { ProviderOption } from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

export const errorLogs = pgTable('error_logs', {
	message: text().notNull(),
	stack: text().notNull(),
	timestamp: timestamp().notNull().defaultNow()
});
export const providerStatusEnum = pgEnum('provider_status', PROVIDER_STATUSES);
export const providers = pgTable('providers', {
	authorize_status: providerStatusEnum().notNull().default('untested'),
	name: varchar('name', { length: 255 }).primaryKey().$type<ProviderOption>(),
	profile_status: providerStatusEnum().notNull().default('untested'),
	refresh_status: providerStatusEnum().notNull().default('untested'),
	revoke_status: providerStatusEnum().notNull().default('untested')
});
export const telemetryEvents = pgTable('telemetry_events', {
	anonymous_id: varchar({ length: 255 }).notNull(),
	arch: varchar({ length: 50 }),
	bun_version: varchar({ length: 50 }),
	client_timestamp: timestamp().notNull(),
	event: varchar({ length: 255 }).notNull(),
	id: uuid().primaryKey().defaultRandom(),
	os: varchar({ length: 100 }),
	payload: jsonb().$type<Record<string, unknown>>().default({}),
	server_timestamp: timestamp().notNull().defaultNow(),
	version: varchar({ length: 100 })
});
export const telemetryUserLabels = pgTable('telemetry_user_labels', {
	anonymous_id: varchar({ length: 255 }).primaryKey(),
	created_at: timestamp().notNull().defaultNow(),
	label: varchar({ length: 255 }).notNull(),
	updated_at: timestamp().notNull().defaultNow()
});
export const unknownErrorLogs = pgTable('unknown_error_logs', {
	raw: jsonb().$type<unknown>().notNull(),
	timestamp: timestamp().notNull().defaultNow()
});
export const users = pgTable('users', {
	auth_sub: varchar({ length: 255 }).primaryKey(),
	created_at: timestamp().notNull().defaultNow(),
	metadata: jsonb().$type<Record<string, unknown>>().default({})
});
export const schema = {
	errorLogs,
	providers,
	telemetryEvents,
	telemetryUserLabels,
	unknownErrorLogs,
	users
};

export type SchemaType = typeof schema;
export type DatabaseType = NeonHttpDatabase<SchemaType>;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;

export type ErrorLog = typeof errorLogs.$inferSelect;
export type NewErrorLog = typeof errorLogs.$inferInsert;

export type UnknownErrorLog = typeof unknownErrorLogs.$inferSelect;
export type NewUnknownErrorLog = typeof unknownErrorLogs.$inferInsert;

export type TelemetryEvent = typeof telemetryEvents.$inferSelect;
export type NewTelemetryEvent = typeof telemetryEvents.$inferInsert;

export type TelemetryUserLabel = typeof telemetryUserLabels.$inferSelect;
export type NewTelemetryUserLabel = typeof telemetryUserLabels.$inferInsert;
