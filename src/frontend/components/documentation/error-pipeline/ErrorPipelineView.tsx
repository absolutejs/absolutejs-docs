import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	errorPipelineBrowser,
	errorPipelineServer
} from '../../../data/documentation/errorPipelineDocsCode';
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
import { PackageCard, PackageCardGrid } from '../../utils/PackageCardGrid';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#error-pipeline', label: 'Overview' },
	{ href: '#end-to-end-path', label: 'The End-to-End Path' },
	{ href: '#packages', label: 'The Packages' },
	{ href: '#wiring', label: 'Wiring It Together' },
	{ href: '#going-deeper', label: 'Going Deeper' }
];

const pipelineSteps: StepFlowStep[] = [
	{
		actor: 'Browser',
		description:
			'window.onerror or unhandledrejection fires. By this point the breadcrumb ring buffer already holds the trail that led here — console.error / warn calls, clicks, fetch requests, and SPA navigations.',
		title: 'An exception escapes'
	},
	{
		actor: 'Beacon',
		description:
			'The event picks up tags, user context, a per-session id, and the active replayId via getReplayId. Events buffer up to maxBatch (default 30) or flushIntervalMs (default 5s), with sampleRate sampling and a beforeSend redaction hook — and flush reliably on pagehide / tab-hidden via sendBeacon.',
		title: 'Beacon captures and batches'
	},
	{
		actor: 'Errors ingest',
		description:
			'The untrusted envelope is Schema-validated server-side. Every rejection is a typed IngestRejection that maps to exactly one HTTP status — 413 payload too large, 400 malformed, 401 unauthorized, 429 rate limited. Accepted events are fingerprinted, pushed into the coalescing buffer, and answered 202 immediately.',
		title: 'POST to the ingest endpoint'
	},
	{
		actor: 'Errors ingest',
		description:
			"The default fingerprint is a 16-hex-char SHA-1 prefix over the error name, the normalized message (digits and quoted literals stripped — so \"user 'u_42' not found\" and \"user 'u_99' not found\" group together), and the first user stack frame. The drainer's prepare hook wires /symbolicate to rewrite minified stacks against uploaded source maps, off the hot path.",
		title: 'Symbolication and fingerprinting'
	},
	{
		actor: 'Errors ingest',
		description:
			'Every ~500ms the drainer flushes: N identical errors in a window become a single times_seen += N upsert plus a capped sample of raw events, so an incident herd touches the hot issue row once. onIssue fires only on the transitions worth paging for — a new issue, or a resolved issue seen again (a regression, which flips back to unresolved).',
		title: 'Issue created or deduped'
	},
	{
		actor: 'Replay',
		description:
			'In parallel, the recorder chunks the DOM recording and uploads each chunk via its pluggable transport (wire @absolutejs/blob). A flush() on window error stores the tail around the exception, and the stored event carries the replayId — cross-linking the issue to the exact session.',
		title: 'Replay segments stored'
	},
	{
		actor: 'Errors ingest',
		description:
			'The durable store is the Issues surface: first-seen, last-seen, occurrence count, state, assignee, and regression detection. listIssues drives a dashboard, setState resolves or ignores, listEvents shows the occurrence timeline — and traceId / spanId / replayId cross-link each event to its exact trace and DOM replay.',
		title: 'Triage'
	}
];

const pipelinePackages: PackageCard[] = [
	{
		badge: 'server',
		description:
			'Effect-native, Sentry-equivalent capture. capture() returns an Effect that can never itself fail — every sink failure is a typed, tagged value — plus durable fingerprinted issues and the /ingest and /symbolicate subpaths.',
		name: 'Errors',
		packageName: '@absolutejs/errors',
		version: '0.3.0'
	},
	{
		badge: 'browser',
		description:
			'Zero-dependency browser SDK, ~2 KB gzipped. Auto-captures uncaught errors and unhandled rejections, records breadcrumbs, batches, and POSTs the envelope via sendBeacon / fetch keepalive.',
		name: 'Beacon',
		packageName: '@absolutejs/beacon',
		version: '0.3.1'
	},
	{
		badge: 'browser',
		description:
			'Session replay in ~1 KB of glue — rrweb is an optional, lazy-loaded peer. Chunks DOM recordings, uploads via a pluggable blob transport, and masks inputs by default.',
		name: 'Replay',
		packageName: '@absolutejs/replay',
		version: '0.2.1'
	},
	{
		badge: 'adapter',
		description:
			'Postgres-backed, Effect-native IssueStore. Grouped issues plus an event timeline, with new-vs-regression detection in one atomic CTE upsert — works with porsager/postgres or Neon serverless.',
		name: 'Errors Postgres',
		packageName: '@absolutejs/errors-postgres',
		version: '0.0.3'
	}
];

type RelatedLink = {
	label: string;
	viewId: string;
};

const relatedLinks: RelatedLink[] = [
	{ label: 'Errors', viewId: 'errors-overview' },
	{ label: 'Beacon', viewId: 'beacon-overview' },
	{ label: 'Replay', viewId: 'replay-overview' }
];

type RelatedLinkItemProps = {
	link: RelatedLink;
	onNavigate: (pageId: string) => void;
	suffix: string;
};

const RelatedLinkItem = ({
	link,
	onNavigate,
	suffix
}: RelatedLinkItemProps) => (
	<span>
		<a
			href="#"
			onClick={(event) => {
				event.preventDefault();
				onNavigate(link.viewId);
			}}
			style={{
				color: 'inherit',
				textDecoration: 'underline'
			}}
		>
			{link.label}
		</a>
		{suffix}
	</span>
);

export const ErrorPipelineView = ({
	themeSprings,
	onNavigate,
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
					<h1 id="error-pipeline" style={h1Style(isMobileOrTablet)}>
						Error Pipeline
					</h1>
					<p style={paragraphLargeStyle}>
						A Sentry-equivalent loop built from three packages that
						share deliberate seams. <strong>Beacon</strong> captures
						uncaught errors, unhandled rejections, and breadcrumbs
						in the browser — ~2 KB gzipped, zero dependencies.{' '}
						<strong>Errors</strong> ingests the envelope
						server-side, fingerprints it, and upserts a durable,
						grouped issue; server-side exceptions enter the same
						store through <code>capture()</code>, an Effect that can
						never itself fail — errors-as-values.{' '}
						<strong>Replay</strong> records the DOM session in
						chunks, uploaded via a pluggable blob transport, and
						exposes the <code>replayId</code> that stamps every
						error — cross-linking each issue to the exact session
						around it.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="end-to-end-path"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The End-to-End Path
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One browser exception travels through every seam in the
						stack. The client side is a dumb producer of telemetry —
						it has no trust boundary — so the Effect/Schema rigor
						lives server-side in the ingest endpoint, which
						validates the untrusted POST body:
					</p>
					<StepFlow
						steps={pipelineSteps}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Bounded by design"
						variant="info"
					>
						The ingest buffer is in-process and bounded —{' '}
						<code>maxGroups</code> (default 10,000) ×{' '}
						<code>maxSamplesPerGroup</code> (default 10) — with no
						Redis; new groups beyond the cap are shed and counted in{' '}
						<code>droppedGroups</code>. On the tracker side,{' '}
						<code>maxRecent</code> (default 100) caps the recent
						buffer and <code>maxFingerprints</code> (default 1000)
						caps the counter map, so an attacker who can synthesize
						unique errors can&apos;t blow process memory. A Redis or
						durable-log buffer can implement the{' '}
						<code>EventBuffer</code> seam later — without touching
						the endpoint — when a zero-loss SLA demands it.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="packages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Packages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The split follows the byte budget. A browser SDK loads
						on every page for every user, so bytes are the dominant
						cost: an Effect-native client measures ~108 KB gzipped,
						beacon is ~2 KB, and replay adds ~1 KB of glue with
						rrweb lazy-imported only when recording starts. You lose
						nothing on type safety — the envelope is contract-locked
						to the ingest endpoint&apos;s accepted shape by a
						compile-time assertion, so changing the shape on either
						side breaks the build.
					</p>
					<PackageCardGrid
						items={pipelinePackages}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wiring"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wiring It Together
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Server-side, <code>ingestPlugin</code> mounts the{' '}
						<code>POST /ingest</code> route and starts the drainer
						on one Elysia plugin. Swap{' '}
						<code>createMemoryIssueStore()</code> (dev, tests,
						single-process) for the Postgres adapter and issues
						become durable — both honor identical semantics:
					</p>
					<PrismPlus
						codeString={errorPipelineServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Browser-side, start the recorder first, then hand its{' '}
						<code>replayId</code> to the beacon so every captured
						event is stamped with the active session:
					</p>
					<PrismPlus
						codeString={errorPipelineBrowser}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Recording sessions is a liability surface"
						variant="warning"
					>
						Replay is private by default — inputs are masked (
						<code>maskAllInputs: true</code>); keep masking on. Add{' '}
						<code>class=&quot;rr-block&quot;</code> to skip
						recording a node entirely,{' '}
						<code>class=&quot;rr-mask&quot;</code> to mask its text,
						and set <code>maskAllText: true</code> for
						high-sensitivity apps.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="going-deeper"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Going Deeper
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						This page is the map; each package has its own page for
						the territory:{' '}
						{relatedLinks.map((link, index) => (
							<RelatedLinkItem
								key={link.viewId}
								link={link}
								onNavigate={onNavigate}
								suffix={
									index < relatedLinks.length - 1 ? ', ' : ''
								}
							/>
						))}
						. Errors covers the <code>CaptureOutcome</code> shape,
						the <code>IssueStore</code> contract, and memory bounds;
						Beacon covers the full browser API, batching, and
						sampling; Replay covers recording options, privacy
						classes, and the framework-agnostic player.
					</p>
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
