import { PackageDocData } from '../../../../types/packageDocs';

export const beaconPackageData: PackageDocData = {
	category: 'Observability',
	description:
		'A tiny, zero-dependency browser SDK that captures uncaught errors and unhandled rejections, records breadcrumbs, batches events and POSTs an envelope to the @absolutejs/errors /ingest endpoint via navigator.sendBeacon or fetch keepalive. It stays around 2 KB gzipped by keeping Effect and Schema validation server-side, while a compile-time assertion contract-locks the envelope shape to the ingest endpoint — change either side and the build breaks.',
	features: [
		{
			description:
				'window.onerror and unhandledrejection handlers are installed by initBeacon and can be toggled via the instrument option.',
			title: 'Automatic error capture'
		},
		{
			description:
				'console.error/warn calls, clicks, fetch requests (skipping its own ingest endpoint) and SPA navigations are kept in a ring buffer attached to each event.',
			title: 'Breadcrumb trail'
		},
		{
			description:
				'Events buffer up to maxBatch (default 30) or flushIntervalMs (default 5s) and flush reliably on pagehide and tab-hidden via sendBeacon.',
			title: 'Reliable batching'
		},
		{
			description:
				'setTags, setUser, per-call tags and extra, and a per-session id enrich every event; sampleRate and a beforeSend hook drop or redact before sending.',
			title: 'Context and sampling'
		},
		{
			description:
				'getReplayId() stamps each event with the active session-replay id so @absolutejs/replay can cross-link an error to its exact DOM recording.',
			title: 'Session replay seam'
		},
		{
			description:
				'Imported in a non-DOM environment, createBeacon returns a no-op — safe to ship in server-rendered code paths.',
			title: 'SSR safe'
		}
	],
	installCommand: 'bun add @absolutejs/beacon',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/beacon',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/beacon',
			label: 'GitHub'
		}
	],
	name: 'Beacon',
	notes: [
		{
			body: 'Beacon is deliberately not Effect-native: an Effect client measures around 108 KB gzipped versus about 2 KB here. The browser is a dumb producer of telemetry; validation rigor lives server-side in @absolutejs/errors/ingest.',
			title: 'Bytes over machinery',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/beacon',
	samples: [
		{
			code: `import { captureException, initBeacon } from '@absolutejs/beacon';

initBeacon({
	endpoint: 'https://api.example.com/ingest',
	environment: 'production',
	project: 'web',
	release: import.meta.env.VITE_RELEASE
});

// Uncaught errors + unhandled rejections are captured automatically.
// Manual capture anywhere:
try {
	await checkout();
} catch (e) {
	captureException(e, { tags: { component: 'billing' } });
}`,
			description:
				'Initialize the global singleton once; auto-capture takes over, and the global helpers work anywhere after that.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { createBeacon } from '@absolutejs/beacon';

const beacon = createBeacon({ project: 'web' });
beacon.setUser({ id: currentUserId });
beacon.captureMessage('checkout started', 'info');

// Buffered events out now:
await beacon.flush();
// Remove listeners + final flush:
await beacon.close();`,
			description:
				'Hold an instance instead of the global when you need explicit lifecycle control.',
			heading: 'Instance API',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'A ~2 KB gzipped browser error and breadcrumb SDK that ships envelopes to your own @absolutejs/errors ingest endpoint.',
	version: '0.3.1'
};
