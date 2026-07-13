import { PackageDocData } from '../../../../types/packageDocs';

export const pwaPackageData: PackageDocData = {
	category: 'Frontend & UX',
	description:
		'@absolutejs/pwa provides framework-agnostic primitives for turning any app into an installable, push-capable PWA: a web app manifest builder, a generated push service worker, a VAPID Web Push sender that flags dead endpoints, and browser glue for registration and subscription. It is storage- and framework-agnostic — you decide how subscriptions are stored and how routes are mounted, which makes it a natural fit for an Elysia server on Bun. Server helpers live at the package root; browser helpers at @absolutejs/pwa/client.',
	features: [
		{
			description:
				'createWebAppManifest builds a typed web app manifest — icons, shortcuts, share targets — ready to serve as application/manifest+json.',
			title: 'Web app manifest'
		},
		{
			description:
				'pushServiceWorker generates the service worker source, with optional offline support that precaches an app shell and serves a fallback page.',
			title: 'Push service worker'
		},
		{
			description:
				'createWebPush signs and sends Web Push notifications, fans out to all of a user’s devices with sendMany, and reports gone endpoints for pruning.',
			title: 'VAPID sender'
		},
		{
			description:
				'registerServiceWorker, subscribeToPush, unsubscribeFromPush, and getPushStatus handle the browser side; you POST the results to your own routes.',
			title: 'Browser subscription glue'
		},
		{
			description:
				'initInstallPrompt captures the install signal so you can show your own install button and trigger promptInstall from a user gesture.',
			title: 'Install prompt control'
		},
		{
			description:
				'Every client function no-ops when the APIs are missing or during SSR, and the sender no-ops when VAPID keys are unset — push degrades gracefully.',
			title: 'Feature-safe everywhere'
		}
	],
	installCommand: 'bun add @absolutejs/pwa',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/pwa',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/pwa',
			label: 'GitHub'
		}
	],
	name: 'PWA',
	notes: [
		{
			body: 'Mounting is yours: serve the manifest as application/manifest+json and the service worker as text/javascript with a Service-Worker-Allowed header, from any framework. Subscriptions land in whatever storage you already use.',
			title: 'Bring your own routes and storage',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/pwa',
	samples: [
		{
			code: `import {
	createWebAppManifest,
	createWebPush,
	pushServiceWorker
} from '@absolutejs/pwa';
import { Elysia } from 'elysia';

const ICON = '/icons/app-512.png';

const manifest = createWebAppManifest({
	icons: [
		{ purpose: 'any', sizes: '192x192', src: ICON, type: 'image/png' },
		{ purpose: 'any', sizes: '512x512', src: ICON, type: 'image/png' }
	],
	name: 'My App',
	shortName: 'MyApp',
	themeColor: '#6366f1'
});

// Pass \`offline\` to also precache an app shell and serve a fallback
// page when a navigation fails offline.
const sw = pushServiceWorker({
	icon: ICON,
	offline: { assetPrefix: '/assets/', fallback: '/offline.html' }
});

new Elysia()
	.get('/manifest.webmanifest', ({ set }) => {
		set.headers['content-type'] = 'application/manifest+json';

		return manifest;
	})
	.get('/sw.js', ({ set }) => {
		set.headers['content-type'] = 'text/javascript';
		set.headers['service-worker-allowed'] = '/';

		return sw;
	});

// VAPID sender — with empty/unset keys it no-ops, so push degrades
// gracefully to your email or in-app fallback.
const push = createWebPush({
	privateKey: process.env.VAPID_PRIVATE_KEY,
	publicKey: process.env.VAPID_PUBLIC_KEY,
	subject: 'mailto:you@example.com'
});

// Fan out to a user's devices; prune whatever it reports gone.
const { gone } = await push.sendMany(subscriptions, {
	body: 'Acme Co. just replied.',
	title: 'New match',
	url: '/inbox'
});
await pruneEndpoints(gone); // your storage`,
			description:
				'Serve the manifest and service worker from Elysia, then send Web Push notifications with the VAPID sender.',
			heading: 'Server',
			language: 'typescript'
		},
		{
			code: `import {
	getPushStatus,
	registerServiceWorker,
	subscribeToPush,
	unsubscribeFromPush
} from '@absolutejs/pwa/client';

// At boot:
await registerServiceWorker(); // defaults to "/sw.js"

// Toggle on: returns the subscription JSON — POST it to your own route.
const subscription = await subscribeToPush(vapidPublicKey);
await fetch('/push/subscribe', {
	body: JSON.stringify(subscription),
	method: 'POST'
});

// Toggle off: returns the endpoint to drop server-side.
const endpoint = await unsubscribeFromPush();
await fetch('/push/unsubscribe', {
	body: JSON.stringify({ endpoint }),
	method: 'POST'
});

const status = await getPushStatus();
// { supported, permission, subscribed }`,
			description:
				'Register the service worker and manage push subscriptions from the browser; you own the routes the results are posted to.',
			heading: 'Client',
			language: 'typescript'
		},
		{
			code: `import {
	canInstall,
	initInstallPrompt,
	onInstallable,
	promptInstall
} from '@absolutejs/pwa/client';

initInstallPrompt(); // once at boot

// React to availability (show/hide your install button):
const off = onInstallable((installable) => setShowInstall(installable));

// From a click handler (must be a user gesture):
const accepted = await promptInstall();`,
			description:
				'Capture the browser install signal and drive installation from your own button instead of the default mini-infobar.',
			heading: 'Install Prompt',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Framework-agnostic PWA and Web Push primitives — manifest, push service worker, VAPID sender, and browser subscription glue — for any Bun or Elysia app.',
	version: '0.6.1'
};
