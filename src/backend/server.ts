import { getEnv, networking, prepare } from '@absolutejs/absolute';
import { auth } from '@absolutejs/auth';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Elysia } from 'elysia';
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

// @absolutejs/auth grew enough OAuth2/OIDC/SSO/credentials/etc. routes since 0.22
// that inlining its plugin into the Elysia .use() chain blows TS's union budget
// (TS2590). Type-erase to a bare Elysia for this leg — the docs frontend doesn't
// Eden-call any auth routes anyway (signout goes through plain fetch).
const authPluginRich = await auth<User>(absoluteAuthConfig(db));
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- intentional type erasure to keep the Elysia .use() chain under TS's union budget; see comment above
const authPlugin = authPluginRich as unknown as Elysia;

const server = new Elysia()
	.use(absolutejs)
	.use(providerPlugin(db))
	.use(authPlugin)
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
