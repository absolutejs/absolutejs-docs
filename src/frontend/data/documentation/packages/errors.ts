import { PackageDocData } from '../../../../types/packageDocs';

export const errorsPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Durable issue stores plug into createErrorTracker via the store option. The built-in createMemoryIssueStore covers dev, tests and single-process apps; adapters add persistence with identical semantics.',
			heading: 'Issue Store Adapters',
			items: [
				{
					description:
						'Postgres-backed, Effect-native IssueStore. Durable grouped issues plus an append-only event timeline, with new-vs-regression detection resolved in a single atomic CTE upsert (one round trip, no transaction — works over Neon HTTP too). Accepts any postgres-js-compatible tag template (porsager/postgres or @neondatabase/serverless).',
					name: '@absolutejs/errors-postgres',
					version: '0.0.3'
				}
			]
		}
	],
	category: 'Observability',
	description:
		'Sentry-equivalent exception capture you self-host inside your Bun app. createErrorTracker fingerprints errors into grouped issues, records them on the active OTel span, emits audit events and upserts into a durable issue store — and capture() can never itself fail, returning a CaptureOutcome with per-sink delivery state and typed failures instead of throwing. The /ingest subpath adds a Schema-validated Elysia endpoint (with a coalescing buffer and drainer) for browser envelopes from @absolutejs/beacon, and /symbolicate rewrites minified stacks through source maps.',
	features: [
		{
			description:
				'A stable fingerprint (name, normalized message, first user stack frame) collapses the same error from different call sites into one issue; digits and string literals are stripped so IDs do not split groups.',
			title: 'Stable error fingerprinting'
		},
		{
			description:
				'Every fan-out (audit, tracer, store, onIssue) is wrapped so its failure becomes a typed Data.TaggedError in the outcome, with per-sink delivery state you can switch on exhaustively.',
			title: 'Errors as values'
		},
		{
			description:
				'Pass a store to get a persistent issues surface — first seen, last seen, occurrence count, state, assignee — with onIssue firing only on new issues and regressions.',
			title: 'Durable issues surface'
		},
		{
			description:
				'The /ingest subpath exposes a Schema-validated Elysia endpoint that buffers and drains envelopes posted by @absolutejs/beacon from the browser.',
			title: 'Browser ingest endpoint'
		},
		{
			description:
				'The /symbolicate subpath rewrites minified production stack traces back to original source locations via source maps.',
			title: 'Source map symbolication'
		},
		{
			description:
				'maxRecent and maxFingerprints cap the in-process buffers so synthesized unique errors cannot blow process memory.',
			title: 'Bounded memory'
		}
	],
	installCommand: 'bun add @absolutejs/errors',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/errors',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/errors',
			label: 'GitHub'
		}
	],
	name: 'Errors',
	notes: [
		{
			body: 'The tracker composes with @absolutejs/audit, @absolutejs/telemetry and @absolutejs/replay: StoredEvent carries traceId, spanId and replayId so a dashboard can cross-link an issue to its exact trace and DOM replay.',
			title: 'Cross-linked observability',
			variant: 'info'
		},
		{
			body: 'Pre-1.0: the CaptureOutcome and IssueStore contracts are settling and may change between minor versions.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/errors',
	samples: [
		{
			code: `import { Effect } from 'effect';
import {
	createErrorTracker,
	createMemoryIssueStore
} from '@absolutejs/errors';

const errors = createErrorTracker({
	environment: 'production',
	onIssue: (r) => alert(r.issue), // fires only on new / regression
	project: 'acme',
	release: process.env.RELEASE,
	store: createMemoryIssueStore() // or @absolutejs/errors-postgres
});

// Effect API (primary):
const outcome = await Effect.runPromise(
	errors.capture(e, {
		tags: { component: 'billing' },
		target: \`order_\${orderId}\`,
		tenant
	})
);

// Promise edge — identical outcome:
const out = await errors.captureException(e);`,
			description:
				'Create a tracker and capture an exception. capture() returns Effect<CaptureOutcome, never> — capturing an error can never itself fail.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `if (out.failures.length > 0) {
	for (const f of out.failures) {
		switch (f._tag) {
			case 'StoreFailure':
				retryLater(f.cause); // f.cause: IssueStoreError
				break;
			case 'AuditSinkFailure':
				page('audit lost', f.cause);
				break;
			case 'TracerFailure':
			case 'OnIssueFailure':
			case 'FingerprintFailure':
				break; // tolerate
		}
	}
}

return new Response(\`error \${out.fingerprint}\`, { status: 500 });`,
			description:
				'Each sink failure is a typed, tagged value collected into the outcome — react per sink instead of catching unknown.',
			heading: 'Handling Per-Sink Failures',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Effect-native, Sentry-equivalent exception capture with grouped issues, typed per-sink failures and a browser ingest endpoint.',
	version: '0.3.0'
};
