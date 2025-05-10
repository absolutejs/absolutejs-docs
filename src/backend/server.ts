import {
	build,
	handleReactPageRequest,
	networkingPlugin
} from '@absolutejs/absolute';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';
import { Testing } from '../frontend/pages/Testing';

const manifest = await build({
	assetsDir: 'example/assets',
	buildDir: 'example/build',
	reactIndexDir: 'example/indexes',
	reactPagesDir: 'example/pages'
});

if (manifest === null) {
	throw new Error('Build manifest is null');
}

const homeIndex = manifest['HomeIndex'];
const testingIndex = manifest['TestingIndex'];
if (
	homeIndex === undefined ||
	testingIndex === undefined
) {
	throw new Error('Missing index file in manifest');
}

new Elysia()
	.use(
		staticPlugin({
			assets: './example/build',
			prefix: ''
		})
	)
	.get('/', () => handleReactPageRequest(Home, homeIndex))
	.get('/testing', () => handleReactPageRequest(Testing, testingIndex))
	.use(networkingPlugin)
	.on('error', (error) => {
		const { request } = error;
		console.error(
			`Server error on ${request.method} ${request.url}: ${error.message}`
		);
	});

// TODO : avoid using localhost as per RFC 8252 8.3 https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
