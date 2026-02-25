import {
	asset,
	build,
	BuildConfig,
	devBuild,
	getEnv,
	handleReactPageRequest,
	hmr,
	networking
} from '@absolutejs/absolute';
import { absoluteAuth, getStatus } from '@absolutejs/auth';
import { staticPlugin } from '@elysiajs/static';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Elysia, env, t } from 'elysia';
import { schema, User } from '../../db/schema';
import { isValidProviderOption } from '@absolutejs/auth';
import { AuthTesting } from '../frontend/pages/AuthTesting';
import { Documentation } from '../frontend/pages/Documentation';
import { Home } from '../frontend/pages/Home';
import { Signup } from '../frontend/pages/Signup';
import { docsViewEnum } from '../types/typebox';
import { TelemetryDashboard } from '../frontend/pages/TelemetryDashboard';
import { providerPlugin } from './plugins/providerPlugin';
import { telemetryPlugin } from './plugins/telemetryPlugin';
import { absoluteAuthConfig } from './utils/absoluteAuthConfig';
import { pagesPlugin } from './plugins/pagesPlugin';

const sql = neon(getEnv('DATABASE_URL'));
const db = drizzle(sql, {
	schema
});

const buildConfig: BuildConfig = {
	assetsDirectory: './src/backend/assets',
	reactDirectory: './src/frontend'
};

const isDev = env.NODE_ENV === 'development';
const result = isDev ? await devBuild(buildConfig) : await build(buildConfig);

const server = new Elysia()
	.use(
		staticPlugin({
			assets: './build',
			prefix: ''
		})
	)
	.use(providerPlugin(db))
	.use(absoluteAuth<User>(absoluteAuthConfig(db)))
	.use(telemetryPlugin(db))
	.use(pagesPlugin(result))
	.use(networking)
	.on('error', (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});

if (
	typeof result.hmrState !== 'string' &&
	typeof result.manifest === 'object'
) {
	server.use(hmr(result.hmrState, result.manifest));
}

export type Server = typeof server;

// TODO : avoid using localhost as per RFC 8252 8.3 https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
