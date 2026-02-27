import { BuildConfig, getEnv, networking, prepare } from '@absolutejs/absolute';
import { absoluteAuth } from '@absolutejs/auth';
import { staticPlugin } from '@elysiajs/static';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Elysia, env, t } from 'elysia';
import { schema, User } from '../../db/schema';
import { providerPlugin } from './plugins/providerPlugin';
import { telemetryPlugin } from './plugins/telemetryPlugin';
import { absoluteAuthConfig } from './utils/absoluteAuthConfig';
import { pagesPlugin } from './plugins/pagesPlugin';

const sql = neon(getEnv('DATABASE_URL'));
const db = drizzle(sql, {
	schema
});

const { absolutejs, manifest } = await prepare();

const server = new Elysia()
	.use(absolutejs)
	.use(
		staticPlugin({
			assets: './build',
			prefix: ''
		})
	)
	.use(providerPlugin(db))
	.use(absoluteAuth<User>(absoluteAuthConfig(db)))
	.use(telemetryPlugin(db))
	.use(pagesPlugin(manifest))
	.use(networking)
	.on('error', (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});

export type Server = typeof server;

// TODO : avoid using localhost as per RFC 8252 8.3 https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
