export const databaseCode = `import { pgTable, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    auth_sub: varchar('auth_sub', { length: 255 }).primaryKey(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({})
});

export const schema = {
	users,
};

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type SchemaType = typeof schema;
export type DatabaseType = DatabaseType`;

export const serverCode = `import { build, getEnvVar, handleReactPageRequest, networkingPlugin } from '@absolutejs/absolute';
import { Home } from '../frontend/pages/Home';
import { Elysia, env } from 'elysia';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema, User } from '../../db/schema';

const manifest = await build({
    reactDirectory: 'src/frontend'
});

if (manifest === null || manifest['HomeIndex'] === undefined) {
	throw new Error('Failed to build manifest');
}

const sql = neon(getEnvVar('DATABASE_URL'))
const db = drizzle(sql, {
    schema
});

const server = new Elysia()
    .get('/', () => handleReactPageRequest(Home, manifest['HomeIndex']))
    .get('/api/users/:subject', 
    async ({ status, params: { subject } }) => db.select().from(schema.users).where(schema.users.auth_sub.eq(subject))

export type Server = typeof server;`;

export const treatyCode = `import { treaty } from '@elysiajs/eden';
import type { Server } from '../../backend/server';

const serverUrl =
	typeof window !== 'undefined'
		? window.location.origin
		: 'http://localhost:3000';

export const server = treaty<Server>(serverUrl);`;

export const frontendCode = `const { data, error } = await server.api.users().get();`;
