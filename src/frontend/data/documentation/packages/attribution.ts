import { PackageDocData } from '../../../../types/packageDocs';

export const attributionPackageData: PackageDocData = {
	category: 'Commerce & Growth',
	description:
		'@absolutejs/attribution keeps paid-click identity alive without turning attribution into a second analytics database. It captures validated Google click identifiers, stores only the identifiers and capture time, decorates links only for explicitly trusted origins, and provides a resilient Google tag controller. A separate server helper sends consent-aware conversions to Google Data Manager so applications can pair browser measurement with a retryable, idempotent backend job.',
	explanations: [
		{
			description:
				'Explore the handoff from a paid landing page to browser and server conversion delivery. Each boundary is explicit, so attribution does not leak into unrelated links or telemetry.',
			id: 'attribution-lifecycle',
			kind: 'flow',
			steps: [
				{
					detail: 'Read gclid, gbraid, and wbraid from the landing URL. Invalid characters, empty values, and values over 512 characters are rejected.',
					label: 'Capture'
				},
				{
					detail: 'Save only the validated identifiers and capturedAt timestamp in sessionStorage. The full landing URL is never persisted.',
					label: 'Minimize'
				},
				{
					detail: 'Forward identifiers only when the destination origin appears in your allowlist. Every other URL is returned undecorated.',
					label: 'Decorate'
				},
				{
					detail: 'Start the Google tag after hydration. Consent commands and conversions queue while bounded retries recover from temporary loading failures.',
					label: 'Measure'
				},
				{
					detail: 'Enqueue a backend job with the same transaction ID, consent state, and click identifier. Google can deduplicate browser and server delivery.',
					label: 'Supplement'
				}
			],
			title: 'Attribution lifecycle'
		},
		{
			description:
				'Choose the smallest delivery surface that meets your reliability requirements. Browser and server delivery are complementary, not competing implementations.',
			id: 'delivery-strategy',
			kind: 'decision',
			options: [
				{
					bestFor:
						'Lightweight funnels where best-effort browser measurement is sufficient.',
					label: 'Browser tag',
					requirements: [
						'A Google Ads tag ID',
						'An explicit consent state',
						'Start the controller after framework hydration'
					],
					tradeoffs:
						'Simple and immediate, but extensions, privacy controls, offline clients, and upstream script failures can block delivery.'
				},
				{
					bestFor:
						'Authoritative conversions already processed by a durable backend queue.',
					label: 'Server supplement',
					requirements: [
						'Google Data Manager account and conversion-action IDs',
						'An OAuth access-token provider',
						'A persisted click identifier and transaction ID'
					],
					tradeoffs:
						'More reliable, but your application owns durable retries, credentials, and job observability.'
				},
				{
					bestFor:
						'Purchases and high-value funnel events where measurement loss matters.',
					label: 'Browser + server',
					requirements: [
						'Everything required by both paths',
						'The same transaction ID on both deliveries',
						'Consistent value, currency, and consent facts'
					],
					tradeoffs:
						'Best resilience and recovery, with deduplication dependent on a stable shared transaction ID.'
				}
			],
			title: 'Choose a delivery strategy'
		},
		{
			columns: ['Click IDs', 'Full landing URL', 'Boundary'],
			description:
				'The package keeps each data surface narrow. Use this matrix when reviewing privacy behavior or deciding what application state to retain.',
			id: 'privacy-boundaries',
			kind: 'matrix',
			rows: [
				{
					label: 'Stored snapshot',
					values: ['Yes', 'Never', 'sessionStorage + expiry']
				},
				{
					label: 'Decorated link',
					values: ['Yes', 'No', 'Explicitly allowlisted origins only']
				},
				{
					label: 'Load telemetry',
					values: [
						'Only a boolean',
						'Never',
						'Attempt, state, recovery'
					]
				},
				{
					label: 'Data Manager request',
					values: ['Yes', 'Never', 'Explicit server destination']
				}
			],
			title: 'Privacy boundaries'
		}
	],
	features: [
		{
			description:
				'Capture gclid, gbraid, and wbraid with strict validation and a configurable age limit. Full landing URLs are never stored.',
			title: 'Minimal click-ID storage'
		},
		{
			description:
				'Decorate outbound links only when their exact origin is in the caller-provided allowlist.',
			title: 'Owned-origin forwarding'
		},
		{
			description:
				'The Google tag controller exposes idle, loading, ready, waiting-online, failed, and closed states with bounded retries.',
			title: 'Recoverable tag loading'
		},
		{
			description:
				'Default and updated Consent Mode commands are queued before tag configuration and remain available while the script recovers.',
			title: 'Consent-first measurement'
		},
		{
			description:
				'Track conversions with value, currency, destination, completion timeout, and a transaction ID that can also identify server delivery.',
			title: 'Conversion deduplication seam'
		},
		{
			description:
				'Send a validated, consent-aware conversion to Google Data Manager using an injected token provider and fetch implementation.',
			title: 'Server conversion supplement'
		}
	],
	installCommand: 'bun add @absolutejs/attribution',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/attribution',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/attribution',
			label: 'GitHub'
		}
	],
	name: 'Attribution',
	notes: [
		{
			body: 'The Data Manager helper performs one authenticated request. Put it behind your existing durable queue and retry policy; the package deliberately does not hide delivery state in browser storage or an in-memory server retry loop.',
			title: 'Durability belongs to your job system',
			variant: 'info'
		},
		{
			body: 'An allowlist is required for link decoration. Passing an untrusted origin leaves the target unchanged, preventing click identifiers from following arbitrary outbound links.',
			title: 'Forward deliberately',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/attribution',
	samples: [
		{
			code: `import { createAttributionStore } from '@absolutejs/attribution';
import { createGoogleAdsTag } from '@absolutejs/attribution/google-ads';

const attribution = createAttributionStore();
attribution.capture();

const google = createGoogleAdsTag({
	attribution,
	consent: {
		adPersonalization: 'denied',
		adStorage: 'denied',
		adUserData: 'denied',
		analyticsStorage: 'denied'
	},
	id: 'AW-123456789',
	onTelemetry: ({ attempt, event, recovered }) => {
		observeTagLoad({ attempt, event, recovered });
	}
});

// Call after framework hydration or mount.
google.start();`,
			description:
				'Capture a paid-click identifier, establish denied-by-default consent, and start the retrying Google tag after hydration.',
			heading: 'Browser setup',
			language: 'typescript'
		},
		{
			code: `const checkoutUrl = attribution.decorate(
	'https://checkout.example.com/upgrade',
	['https://checkout.example.com']
);

google.updateConsent({
	adPersonalization: 'denied',
	adStorage: 'granted',
	adUserData: 'granted',
	analyticsStorage: 'granted'
});

google.trackConversion({
	currency: 'USD',
	sendTo: 'AW-123456789/purchase',
	transactionId: order.id,
	value: order.total
});`,
			description:
				'Decorate an owned checkout origin, update consent from your consent UI, and use the order ID as the browser conversion transaction ID.',
			heading: 'Links and conversions',
			language: 'typescript'
		},
		{
			code: `import { sendGoogleAdsDataManagerConversion } from
	'@absolutejs/attribution/google-ads';

const conversion = {
	consent: {
		adPersonalization: 'denied',
		adUserData: 'granted'
	},
	currency: 'USD',
	eventTimestamp: order.paidAt.toISOString(),
	identifiers: order.attributionIdentifiers,
	transactionId: order.id,
	conversionValue: order.total
} as const;

await conversionQueue.add('google-ads-conversion', conversion);

// In the durable worker:
await sendGoogleAdsDataManagerConversion(
	{
		accessToken: getGoogleAccessToken,
		accountId: env.GOOGLE_ADS_ACCOUNT_ID,
		conversionActionId: env.GOOGLE_ADS_CONVERSION_ACTION_ID
	},
	conversion
);
`,
			description:
				'Run Data Manager delivery inside your durable queue. Reuse the browser transaction ID so Google can deduplicate both paths.',
			heading: 'Server supplement',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Privacy-aware click-ID capture, allowlisted link decoration, resilient Google tag loading, and consent-aware server conversion delivery.',
	version: '0.1.0'
};
