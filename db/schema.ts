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

export const providerStatusEnum = pgEnum('provider_status', PROVIDER_STATUSES);

export const users = pgTable('users', {
	auth_sub: varchar({ length: 255 }).primaryKey(),
	created_at: timestamp().notNull().defaultNow(),
	metadata: jsonb().$type<Record<string, unknown>>().default({})
});

export const providers = pgTable('providers', {
	name: varchar('name', { length: 255 }).primaryKey().$type<ProviderOption>(),
	authorize_status: providerStatusEnum().notNull().default('untested'),
	profile_status: providerStatusEnum().notNull().default('untested'),
	refresh_status: providerStatusEnum().notNull().default('untested'),
	revoke_status: providerStatusEnum().notNull().default('untested')
});

export const errorLogs = pgTable('error_logs', {
	message: text().notNull(),
	timestamp: timestamp().notNull().defaultNow(),
	stack: text().notNull()
});

export const unknownErrorLogs = pgTable('unknown_error_logs', {
	raw: jsonb().$type<unknown>().notNull(),
	timestamp: timestamp().notNull().defaultNow()
});

export const telemetryEvents = pgTable('telemetry_events', {
	id: uuid().primaryKey().defaultRandom(),
	event: varchar({ length: 255 }).notNull(),
	anonymous_id: varchar({ length: 255 }).notNull(),
	version: varchar({ length: 100 }),
	os: varchar({ length: 100 }),
	arch: varchar({ length: 50 }),
	bun_version: varchar({ length: 50 }),
	client_timestamp: timestamp().notNull(),
	server_timestamp: timestamp().notNull().defaultNow(),
	payload: jsonb().$type<Record<string, unknown>>().default({})
});

export const telemetryUserLabels = pgTable('telemetry_user_labels', {
	anonymous_id: varchar({ length: 255 }).primaryKey(),
	label: varchar({ length: 255 }).notNull(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow()
});

export const schema = {
	users,
	providers,
	errorLogs,
	unknownErrorLogs,
	telemetryEvents,
	telemetryUserLabels
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
