import { defineConfig } from 'drizzle-kit';
import { env } from 'node:process';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL must be set in the environment variables');
}

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
	dbCredentials: {
		url: env.DATABASE_URL
	},
	dialect: 'postgresql',
	out: './db/migrations',
	schema: './db/schema.ts'
});
