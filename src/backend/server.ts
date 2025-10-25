import {
	build,
	handleReactPageRequest,
	networkingPlugin
} from '@absolutejs/absolute';
import { absoluteAuth } from '@absolutejs/auth';
import { staticPlugin } from '@elysiajs/static';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Elysia, env, t } from 'elysia';
import { schema, User } from '../../db/schema';
import { AuthTesting } from '../frontend/pages/AuthTesting';
import { Documentation } from '../frontend/pages/Documentation';
import { Home } from '../frontend/pages/Home';
import { themeCookie } from '../types/typebox';
import { providerPlugin } from './plugins/providerPlugin';
import { absoluteAuthConfig } from './utils/absoluteAuthConfig';
import { SandBox } from '../frontend/pages/SandBox';


const manifest = await build({
	assetsDirectory: 'src/backend/assets',
	reactDirectory: 'src/frontend'
});

if (manifest === null) {
	throw new Error('Build manifest is null');
}

const homeIndex = manifest['HomeIndex'];
const documentationIndex = manifest['DocumentationIndex'];
const authTestingIndex = manifest['AuthTestingIndex'];

if (
	homeIndex === undefined ||
	authTestingIndex === undefined ||
	documentationIndex === undefined
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
	.get(
		'/',
		({ cookie: { theme } }) =>
			handleReactPageRequest(Home, homeIndex, {
				theme: theme?.value
			}),
		{ cookie: themeCookie }
	)
	.get(
		'/documentation/:section?',
		({ params: { section }, cookie: { theme } }) =>
			handleReactPageRequest(Documentation, documentationIndex, {
				section: section ?? 'overview',
				theme: theme?.value
			}),
		{ cookie: themeCookie }
	)
	.get(
    '/documentation/packages/:view',
    ({ params: { view }, cookie: { theme } }) =>
        handleReactPageRequest(
            Documentation,
            asset(manifest, 'DocumentationIndex'),
            {
                initialView: view ?? 'create',
                theme: theme?.value
            }
        ),
    {
        cookie: themeCookie,
        params: t.Object({ view: docsViewEnum })
    }
)
	.get(
		'/testing/authentication',
		({ cookie: { theme } }) =>
			handleReactPageRequest(AuthTesting, authTestingIndex, {
				theme: theme?.value
			}),
		{ cookie: themeCookie }
	)
<<<<<<< Updated upstream
	.use(networkingPlugin)
=======
	.get(
		'/sandbox/:view?',
		({ params: { view }, cookie: { theme } }) =>
			handleReactPageRequest(SandBox, asset(manifest, 'SandBoxIndex'), {
				view: view ?? 'create-absolutejs',
				theme: theme?.value
			}),
		{ cookie: themeCookie }
	)
	.use(networking)
>>>>>>> Stashed changes
	.on('error', (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});

export type Server = typeof server;

// TODO : avoid using localhost as per RFC 8252 8.3 https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
