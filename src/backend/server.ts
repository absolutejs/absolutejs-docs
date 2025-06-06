import {
	build,
	handleReactPageRequest,
	networkingPlugin
} from '@absolutejs/absolute';
import { absoluteAuth } from '@absolutejs/auth';
import { staticPlugin } from '@elysiajs/static';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Elysia, env } from 'elysia';
import { schema, User } from '../../db/schema';
import { AuthTesting } from '../frontend/pages/AuthTesting';
import { Home } from '../frontend/pages/Home';
import { providerPlugin } from './plugins/providerPlugin';
import { absoluteAuthConfig } from './utils/absoluteAuthConfig';

const manifest = await build({
	assetsDirectory: 'src/backend/assets',
	reactDirectory: 'src/frontend'
});

if (manifest === null) {
	throw new Error('Build manifest is null');
}

const homeIndex = manifest['HomeIndex'];
const authTestingIndex = manifest['AuthTestingIndex'];
const notAuthorizedIndex = manifest['NotAuthorizedIndex'];
const protectedIndex = manifest['ProtectedIndex'];

if (
	homeIndex === undefined ||
	authTestingIndex === undefined ||
	notAuthorizedIndex === undefined ||
	protectedIndex === undefined
) {
	throw new Error('Missing index file in manifest');
}

if (env.DATABASE_URL === undefined) {
	throw new Error('DATABASE_URL is not set in .env file');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, {
	schema
});

const server = new Elysia()
	.use(
		staticPlugin({
			assets: './build',
			prefix: ''
		})
	)
	.use(providerPlugin(db))
	.use(absoluteAuth<User>(absoluteAuthConfig(db)))
	.get('/', () => handleReactPageRequest(Home, homeIndex))
	.get('/testing/auth', () =>
		handleReactPageRequest(AuthTesting, authTestingIndex)
	)
	.use(networkingPlugin)
	.on('error', (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});

export type Server = typeof server;

// TODO : avoid using localhost as per RFC 8252 8.3 https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
