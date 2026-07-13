import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	h1Style,
	listItemStyle,
	listStyle,
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
import { DocsNavigation } from '../DocsNavigation';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StatBand, StatTile } from '../../utils/StatBand';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import {
	VersionTimeline,
	VersionTimelineEntry
} from '../../utils/VersionTimeline';

const tocItems: TocItem[] = [
	{ href: '#sync-release-notes', label: 'Release notes' },
	{ href: '#benchmark-trust', label: 'Benchmark trust numbers' },
	{ href: '#release-timeline', label: 'Release timeline' },
	{ href: '#tanstack-db', label: 'TanStack DB adapter' },
	{ href: '#why-it-matters', label: 'Why it matters' },
	{ href: '#start-here', label: 'Start here' }
];

const tanstackDbExample =
	'import { createCollection } from "@tanstack/db";\nimport { createSyncTanStackCollectionOptions } from "@absolutejs/sync/tanstack-db";\n\ntype Order = { id: string; total: number; status: string };\n\nconst orders = createCollection(\n\tcreateSyncTanStackCollectionOptions<Order>({\n\t\tid: "orders",\n\t\turl: "ws://localhost:3000/sync/ws",\n\t\tcollection: "orders",\n\t\tgetKey: (order) => order.id,\n\t\tmutations: {\n\t\t\tinsert: "createOrder",\n\t\t\tupdate: "updateOrder",\n\t\t\tdelete: "deleteOrder"\n\t\t}\n\t})\n);';

const trustStats: StatTile[] = [
	{
		detail: 'writes delivered across 100 disconnect iterations in the reconnect bench',
		label: 'Reconnect correctness',
		value: '800/800'
	},
	{
		detail: 'dropped writes across all 100 forced disconnects',
		label: 'Dropped writes',
		value: '0'
	},
	{
		detail: 'median isolated-jsc FFI cold spawn in the shootout bench',
		label: 'Sandbox cold start',
		unit: 'ms',
		value: '2'
	},
	{
		detail: 'tests in the suite as of 1.24.0 — every release below landed with its own tests',
		label: 'Test count',
		value: '593'
	}
];

const releaseEntries: VersionTimelineEntry[] = [
	{
		description:
			'Public API declared stable across every subpath: reactive push, ORM-derived topics, live queries, the write-behind cache, and the Tier 3 engine with CRDTs, CDC, search, scheduled functions, and devtools.',
		highlight: true,
		title: 'API freeze — sync launches',
		version: '1.0.0'
	},
	{
		description:
			'Reactive reruns memoized per change batch — the 1,000-subscriber tail drops from ~1.6 s to ~81 ms (20.3×).',
		title: 'Reactive fan-out is no longer O(N)',
		version: '1.1.0'
	},
	{
		description:
			'Force-close the WebSocket without losing state; auto-reconnect resumes via since with a catch-up diff.',
		title: 'client disconnect()',
		version: '1.2.0'
	},
	{
		description:
			'N fresh subscribers to the same (collection, params, ctx) run the query body once; overlapping writes invalidate and refresh the entry.',
		title: 'Cross-client reactive query cache',
		version: '1.3.0'
	},
	{
		description:
			'defineMutation accepts a sandboxedHandler string that runs inside an @absolutejs/isolated-jsc isolate with per-mutation memory and timeout caps.',
		title: 'Sandboxed mutation handlers',
		version: '1.4.0'
	},
	{
		description:
			'Opt-in RetryPolicy re-runs handlers on serialization failures with exponential backoff and fresh actions per attempt.',
		title: 'OCC retry for mutations',
		version: '1.5.0'
	},
	{
		description:
			'engine.streamChanges() yields historical then live commits; the syncCdc plugin exposes it as a Server-Sent Events route.',
		title: 'Outbound CDC streaming',
		version: '1.6.0'
	},
	{
		description:
			'SandboxConfig.backend opts handlers into the FFI backend — ~300 KB cold heap versus ~46 MB on Worker.',
		title: 'Sandbox backend selection',
		version: '1.7.0'
	},
	{
		description:
			'Five bench-driven rounds across 1.7.2 → 1.7.5 (with isolated-jsc 0.5 and 0.6) take FFI pure warm dispatch from 4.69 ms to 0.33 ms.',
		title: 'Sandbox performance arc lands',
		version: '1.7.5'
	},
	{
		description:
			'handlerMetrics fires a per-call record (duration, CPU, heap, success or error) for every sandboxed mutation; sink failures never break user traffic.',
		title: 'Handler metrics',
		version: '1.7.6'
	},
	{
		description:
			'Engine-controlled wall clock inside mutation handlers, setting up deterministic replay and optimistic rebase.',
		title: 'actions.now()',
		version: '1.7.7'
	},
	{
		description:
			'Allowlisted HTTP from inside the sandbox with host-side credential injection — the secret never enters the JSC heap.',
		title: 'bridgeFetch',
		version: '1.7.8'
	},
	{
		description:
			'@absolutejs/sync/mcp exposes collections, mutations, snapshots, inspection, and mutation runs to MCP-aware clients through five tools.',
		title: 'MCP server',
		version: '1.7.9'
	},
	{
		description:
			'@absolutejs/sync/tanstack-db lets TanStack DB own the client collection graph while sync supplies the live transport and server mutations.',
		title: 'TanStack DB adapter',
		version: '1.8.0'
	},
	{
		description:
			'sandboxedHandler moves to createIsolatedRunner() with the tenant-script policy and precompiled callables (isolated-jsc 0.8).',
		title: 'isolated-jsc 0.8 runners',
		version: '1.8.1'
	},
	{
		description:
			'engine.registerPack(pack) registers a self-contained bundle of schemas, permissions, collections, mutations, and schedules; conflicting ownsTables claims throw.',
		title: 'Sync packs',
		version: '1.9.0'
	},
	{
		description:
			'@absolutejs/sync/testing ships createTestEngine, expectRejection, and runAsActor for engine and pack tests.',
		title: 'Testing subpath',
		version: '1.9.2'
	},
	{
		description:
			'engineMutationsAsHostTools exposes the mutation surface as host tools for @absolutejs/ai Code Mode scripts.',
		title: 'Code Mode subpath',
		version: '1.10.0'
	},
	{
		description:
			'engine.runMutations runs N mutations in one transaction with one live diff; transactionalBatchAsHostTool pairs it with Code Mode.',
		title: 'Atomic mutation batches',
		version: '1.11.0'
	},
	{
		description:
			'Declared host functions become callable from a sandboxed handler — loud by name, routed through the existing dispatch Reference.',
		title: 'unsafeHost escape hatch',
		version: '1.12.0'
	},
	{
		description:
			'engine.metrics() for operator scraping, time-based change-log retention via changeLogRetainMs, and per-mutation counters.',
		title: 'Engine introspection + retention',
		version: '1.13.0'
	},
	{
		description:
			'connection.stats() plus WS-layer slow-client detection (maxBufferedBytes, onSlow, closeOnSlow).',
		title: 'Slow-client signaling',
		version: '1.14.0'
	},
	{
		description:
			'First-class cancellation on subscribe and hydrate — a mid-flight abort stops CPU work nobody will ever read.',
		title: 'AbortSignal support',
		version: '1.15.0'
	},
	{
		description:
			'FrameSerializer seam on both ends — swap JSON for msgpack or cbor to cut hydrate bandwidth 40–60%.',
		title: 'Pluggable wire format',
		version: '1.16.0'
	},
	{
		description:
			'Clients reconnecting to a different cluster shard resume with a catch-up diff instead of a fresh snapshot.',
		title: 'Cross-instance resume cursor',
		version: '1.17.0'
	},
	{
		description:
			'The 1.17 cursor flows end-to-end through syncClient, syncCollection, and syncStore; legacy numeric since keeps working.',
		title: 'Client-side cursor plumbing',
		version: '1.18.0'
	},
	{
		description:
			'exportChangeLog / importChangeLog keep cursor resumability across a shard reboot.',
		title: 'Change-log snapshot / restore',
		version: '1.19.0'
	},
	{
		description:
			'mutationConcurrency FIFO semaphore plus mutationQueueLimit — clean 429s instead of unbounded queues.',
		title: 'Mutation backpressure',
		version: '1.20.0'
	},
	{
		description:
			'Per-tenant subscriptionLimit rejects before any state allocation; slots release on unsubscribe or abort.',
		title: 'Subscription backpressure',
		version: '1.20.1'
	},
	{
		description:
			'Optional tracerProvider emits sync.runMutation and sync.subscribe spans; a zero-allocation noop when unset.',
		title: 'OpenTelemetry tracing',
		version: '1.21.0'
	},
	{
		description:
			'engine.replayTo({ at, tables }) folds the change log into per-table state at a target timestamp.',
		title: 'Point-in-time replay',
		version: '1.22.0'
	},
	{
		description:
			'A clickable Replay panel plus a GET <path>/replay JSON endpoint wire replayTo into the devtools dashboard.',
		title: 'Devtools replay surface',
		version: '1.23.0'
	},
	{
		description:
			'engine.fence / exportSnapshot / importSnapshot — three composable verbs to move a tenant between engines.',
		title: 'Tenant migration primitives',
		version: '1.24.0'
	},
	{
		description:
			'Breaking peer move: drizzle-orm advances to the 1.0 RC line. engine.metrics().source exposes change-source liveness so CDC-fed health checks can catch a silent feed.',
		highlight: true,
		title: 'The 2.x line opens',
		version: '2.1.0'
	},
	{
		description:
			'Optional CollectionDefinition.affects() skips re-hydrates for subscriptions a change provably cannot touch — fan-out drops from O(all subscribers) to O(affected).',
		title: 'Affects gate',
		version: '2.2.0'
	},
	{
		description:
			'Housekeeping patch — npm support metadata added to the package manifest. Current release.',
		highlight: true,
		title: 'Current release',
		version: '2.2.1'
	}
];

const StartHereList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			Read <a href="/documentation/sync-we-heard-you">We Heard You</a> for
			the pain-point map and source links.
		</li>
		<li style={listItemStyle}>
			Read <a href="/documentation/sync-vs-firebase">vs Firebase</a> if
			you are migrating away from Firestore or Realtime Database.
		</li>
		<li style={listItemStyle}>
			Read <a href="/documentation/sync-sandbox">Sandboxed Mutations</a>{' '}
			for isolated handlers, backend choices, metrics, bridgeFetch, and
			MCP.
		</li>
	</ul>
);

export const SyncLaunchView = ({
	currentPageId,
	themeSprings,
	tocOpen,
	onTocToggle,
	onNavigate,
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
					<h1
						id="sync-release-notes"
						style={h1Style(isMobileOrTablet)}
					>
						Sync Release Notes
					</h1>
					<p style={paragraphLargeStyle}>
						<code>@absolutejs/sync</code> is at{' '}
						<strong>2.2.1</strong>. The 1.0 release froze the public
						API across every subpath; the 1.x line layered on the
						sandbox, sync packs, Code Mode, cluster cursors,
						backpressure, tracing, point-in-time replay, and tenant
						migration; the 2.x line opened with the move to the
						drizzle-orm 1.0 RC peer line. Every entry below is
						summarized from the package changelog.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="benchmark-trust"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Benchmark trust numbers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The headline numbers are intentionally simple because
						they map to real trust decisions:
					</p>
					<StatBand stats={trustStats} themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						The sync suite covers the shipped engine path end to
						end, including sandbox actions, metrics, bridgeFetch,
						and MCP registration behavior. The benchmark work is
						tracked in{' '}
						<a
							href="https://github.com/absolutejs/benchmarks/pull/13"
							rel="noopener noreferrer"
							target="_blank"
						>
							absolutejs/benchmarks PR #13
						</a>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="release-timeline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Release timeline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The full arc from the 1.0 API freeze to the current
						2.2.1 release — patch releases fold into the feature
						they belong to. Highlighted pills mark the launch, the
						2.x major, and the current version.
					</p>
					<VersionTimeline
						entries={releaseEntries}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="tanstack-db"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						TanStack DB adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>@absolutejs/sync/tanstack-db</code> subpath
						(added in 1.8.0) returns TanStack DB collection options.
						TanStack DB owns local collection queries and
						reactivity; Absolute Sync owns WebSocket catch-up,
						reconnect, server-authoritative mutations, offline
						mutation replay, and optional local-first read cache.
					</p>
					<PrismPlus
						codeString={tanstackDbExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>@tanstack/db</code> is optional and pinned to{' '}
						<code>&gt;= 0.6.7 &lt;0.7</code> because the TanStack DB
						API is still pre-1.0. The adapter accepts string or
						number keys, matching TanStack DB&apos;s current key
						surface.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-it-matters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why it matters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Most sync engines make one of three trade-offs: they
						require a hosted control plane, they need a sidecar
						service, or they only solve the client cache while
						leaving server authority and operational boundaries to
						the application. Sync is built to run inside your
						existing Elysia process, next to your database, with
						server-authoritative mutations as the default.
					</p>
					<p style={paragraphSpacedStyle}>
						The release arc strengthens that position. The same
						engine runs tenant-provided mutation code in an isolated
						JavaScriptCore sandbox, measures it, brokers HTTP
						credentials for it, exposes it to MCP clients, and
						proves reconnect catch-up with a repeatable benchmark.
						The operator releases (1.13 through 1.24) added metrics,
						backpressure, tracing, point-in-time replay, and tenant
						migration on top.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="start-here"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Start here
					</AnchorHeading>
					<StartHereList />
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
