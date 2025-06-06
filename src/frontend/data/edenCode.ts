export const databaseCode = `export const users = pgTable('users', {
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
export type DatabaseType = DatabaseType
`;

export const serverCode = `import {
	build,
	handleReactPageRequest,
	networkingPlugin
} from '@absolutejs/absolute';
import { Home } from '../frontend/pages/Home';
import { Elysia, env } from 'elysia';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema, User } from '../../db/schema';

const manifest = await build({
    reactDirectory: 'src/frontend'
});

if (manifest === null) {
	throw new Error('Failed to build manifest');
}

const homeIndex = manifest['HomeIndex'];

if (env.DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL is not set in .env file');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, {
    schema
});

const server = new Elysia()
    .get('/', () => handleReactPageRequest(Home, homeIndex))
    .get('/api/users/:userid', 
    async ({ status, params: { provider } }) => db.select().from('User'))

export type Server = typeof server;
`;

export const treatyCode = `import { treaty } from '@elysiajs/eden';
import type { Server } from '../../backend/server';

export const server = treaty<Server>('http://localhost:3000');
`;

export const frontendCode = `const { data, error } = await server.api.users().get();
`;
