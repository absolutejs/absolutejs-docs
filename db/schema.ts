import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import {
	jsonb,
	pgEnum,
	pgTable,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { PROVIDER_STATUSES } from '../src/constants';
import { ProviderOption } from '@absolutejs/auth';

export const providerStatusEnum = pgEnum('provider_status', PROVIDER_STATUSES);

export const users = pgTable('users', {
	auth_sub: varchar('auth_sub', { length: 255 }).primaryKey(),
	created_at: timestamp('created_at').notNull().defaultNow(),
	metadata: jsonb('metadata').$type<Record<string, unknown>>().default({})
});

export const providers = pgTable('providers', {
	name: varchar('name', { length: 255 }).primaryKey().$type<ProviderOption>(),
	authorizeStatus: providerStatusEnum('authorize_status')
		.notNull()
		.default('untested'),
	profileStatus: providerStatusEnum('profile_status')
		.notNull()
		.default('untested'),
	refreshStatus: providerStatusEnum('refresh_status')
		.notNull()
		.default('untested'),
	revokeStatus: providerStatusEnum('revoke_status')
		.notNull()
		.default('untested')
});

export const schema = {
	users,
	providers
};

export type SchemaType = typeof schema;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;

export type DatabaseFunctionProps = {
	db: NeonHttpDatabase<SchemaType>;
	schema: SchemaType;
};
