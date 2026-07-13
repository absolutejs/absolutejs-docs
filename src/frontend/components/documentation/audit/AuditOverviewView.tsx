import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	auditIntegrity,
	auditLiveWires,
	auditQuickStart,
	auditTesting
} from '../../../data/documentation/auditDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#audit-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#event-shape', label: 'Event Shape' },
	{ href: '#sinks', label: 'Sinks' },
	{ href: '#integrity', label: 'Hash-chain Integrity' },
	{ href: '#live-wires', label: 'Live-Wire Helpers' },
	{ href: '#metrics', label: 'Metrics & Close' },
	{ href: '#testing', label: 'Testing' }
];

const eventFieldRows: DocsTableCell[][] = [
	[
		{ code: 'at' },
		{ code: 'number' },
		'Emission timestamp (Date.now()), filled in automatically by append().'
	],
	[
		{ code: 'kind' },
		{ code: 'string' },
		"Event name. Convention is \"<source>.<event>\" (e.g. 'auth.login', 'queue.job.failed') so a kind filter matches a whole source."
	],
	[
		{ code: 'actor?' },
		{ code: 'string' },
		"Who caused the event — a user id, or 'system'."
	],
	[
		{ code: 'target?' },
		{ code: 'string' },
		'What was acted on — typically a resource id.'
	],
	[
		{ code: 'metadata?' },
		{ code: 'Record<string, unknown>' },
		'Arbitrary structured context for the event.'
	]
];

const sinkRows: DocsTableCell[][] = [
	[
		{ code: 'memorySink({ max })' },
		{ code: '@absolutejs/audit', suffix: '0.0.1' },
		'In-process FIFO (bounded by max). Implements list() — useful for tests and an in-process tail.'
	],
	[
		{ code: 'consoleSink({ pretty })' },
		{ code: '@absolutejs/audit', suffix: '0.0.1' },
		'Forwards events to stdout / stderr as JSON.'
	],
	[
		{ code: 'createPostgresAuditSink({ sql })' },
		{ code: '@absolutejs/audit-postgres', suffix: '0.0.1' },
		'Postgres sink with list + prune + flush. Accepts any postgres-js-compatible tag template (porsager/postgres or Neon serverless). Lazy schema, jsonb metadata, indexed on at / kind / actor.'
	],
	[
		{ code: 'createS3AuditSink(...)' },
		{ code: '@absolutejs/audit-s3', suffix: '0.0.1' },
		'Buffered JSONL writes to AWS S3, Cloudflare R2, Backblaze B2, or MinIO. Time-sortable object keys; WORM-bucket-friendly for compliance retention.'
	],
	[
		{ code: 'auditElysia(...)' },
		{ code: '@absolutejs/audit-elysia', suffix: '0.0.2' },
		'Elysia plugin emitting one structured audit event per request — success AND error paths — with optional correlation to the active OTel trace id.'
	]
];

const metricRows: DocsTableCell[][] = [
	[
		{ code: 'appended' },
		{ code: 'number' },
		'Total successful append() calls.'
	],
	[
		{ code: 'appendErrors' },
		{ code: 'number' },
		'Calls where at least one sink threw.'
	],
	[
		{ code: 'sinkErrors' },
		{ code: 'Record<string, number>' },
		"Per-sink error counts, keyed by sink.name or 'sink-<index>'."
	]
];

export const AuditOverviewView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="audit-overview" style={h1Style(isMobileOrTablet)}>
						Audit
					</h1>
					<p style={paragraphLargeStyle}>
						An append-only, hash-chain tamper-evident audit log for
						your app. Many sinks behind one fan-out, optional
						per-writer integrity (SHA-256 or HMAC-SHA256), live-wire
						helpers for runtime / queue / secrets / sync events, and
						an open <code>kind: string</code> shape so any source
						can emit anything without an enforced enum.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createAudit({'{ sinks: [...] }'})</code> returns a
						handle with{' '}
						<code>append() / metrics() / flush() / close()</code>.
						Every append fans out to every sink concurrently; one
						sink throwing doesn't cancel the others.
					</p>
					<PrismPlus
						codeString={auditQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="event-shape"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Event Shape
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Open by design — no enforced enum on <code>kind</code>.{' '}
						<code>
							audit.append(
							{'{ kind, actor?, target?, metadata? }'})
						</code>{' '}
						fills in <code>at</code> and fans out to every sink
						concurrently.
					</p>
					<DocsTable
						columns={['Field', 'Type', 'Description']}
						rows={eventFieldRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Keep secrets out of metadata"
						variant="warning"
					>
						Don't stuff secrets into <code>metadata</code> — pipe
						values through <code>@absolutejs/secrets</code>{' '}
						<code>redact()</code> first.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sinks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sinks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An <code>AuditSink</code> is anything that implements{' '}
						<code>append()</code>;{' '}
						<code>list / prune / flush / close</code> are optional
						for stores that support them. Two sinks ship in core,
						with sibling packages for Postgres, S3-compatible object
						storage, and Elysia request tracing.
					</p>
					<DocsTable
						columns={['Sink', 'Package', 'What it does']}
						rows={sinkRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Custom sinks just implement <code>AuditSink</code> —
						append a row to your warehouse, forward to Splunk, post
						to a webhook. A sink that only forwards doesn't need{' '}
						<code>list</code> / <code>prune</code>; only stores do.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="integrity"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hash-chain Integrity
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>withIntegrity(sink)</code> decorates any sink with
						a per-writer hash chain. Each appended event carries a{' '}
						<code>metadata.__integrity</code> link (
						<code>{'{ hash, previousHash, writerId }'}</code>) so{' '}
						<code>verifyChain(events)</code> detects modification,
						removal, or reordering. SHA-256 by default; pass{' '}
						<code>secret</code> for HMAC-SHA256 (only secret holders
						can forge a valid chain).
					</p>
					<PrismPlus
						codeString={auditIntegrity}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Multi-writer safe — each <code>withIntegrity()</code>{' '}
						call defaults to a random <code>writerId</code> so
						concurrent writers and redeploys each own a
						self-contained sub-chain. Pass a stable{' '}
						<code>writerId</code> to resume across restarts; the
						chain seeds from the most recent event matching the
						writer (overridable via <code>loadWriterHead</code>).
						Concurrent appends within a writer are serialized so two
						callers can't both link to the same{' '}
						<code>previousHash</code> — that's the chain's
						correctness contract, not an optimization.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="live-wires"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Live-Wire Helpers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Bundled helpers return plain callbacks you wire into the
						source package's existing listener API. Audit doesn't
						reach into any package's lifecycle — your app stays in
						control. The inputs are narrow duck types, so audit
						takes no peer deps on the packages it can observe.
					</p>
					<PrismPlus
						codeString={auditLiveWires}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Each helper is a one-liner convenience for the common
						shape. If you need custom event mapping, write your own
						listener and call <code>audit.append()</code> directly.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Metrics &amp; Close
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>audit.metrics()</code> returns cumulative counters
						with a per-sink error breakdown:
					</p>
					<DocsTable
						columns={['Counter', 'Type', 'Description']}
						rows={metricRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Sink errors are NOT fatal — every sink still receives
						the event; errors fire <code>onError</code> and bump the
						per-sink counter. The default <code>onError</code> is{' '}
						<code>console.warn</code>; route it to a side-channel
						pipeline if you want sink failures visible separately
						(the audit log itself would loop). <code>flush()</code>{' '}
						flushes every sink that implements it — useful before
						shutdown so batched writers commit. <code>close()</code>{' '}
						flushes then closes every sink; after{' '}
						<code>close()</code>, <code>append()</code> throws{' '}
						<code>AuditClosedError</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="testing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Testing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						No mocks — <code>memorySink()</code> implements{' '}
						<code>list()</code> so tests assert exactly what was
						appended, without coupling to a particular store.
						<code>verifyChain</code> over a tampered event surfaces{' '}
						<code>brokenAt</code> for tamper-evidence tests.
					</p>
					<PrismPlus
						codeString={auditTesting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
