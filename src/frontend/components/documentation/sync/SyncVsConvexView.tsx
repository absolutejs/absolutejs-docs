import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncVsConvexCacheColumns,
	syncVsConvexCacheRows,
	syncVsConvexMatrixColumns,
	syncVsConvexMatrixRows,
	syncVsConvexMigrateVerbs,
	syncVsConvexReplayRetention,
	syncVsConvexReplayUsage,
	syncVsConvexSandboxHandler,
	syncVsConvexWireDiffColumns,
	syncVsConvexWireDiffRows
} from '../../../data/documentation/syncVsConvexDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { ComparisonTable } from '../../utils/ComparisonTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#sync-vs-convex', label: 'Overview' },
	{ href: '#shared-model', label: 'Shared mental model' },
	{ href: '#architecture', label: 'Where the engine runs' },
	{ href: '#matrix', label: 'Feature matrix' },
	{ href: '#wire-diff', label: 'Row-level diffs vs full results' },
	{ href: '#cache', label: 'Cross-client query cache' },
	{ href: '#sandbox', label: 'Sandboxed handlers' },
	{ href: '#replay', label: 'Point-in-time replay' },
	{ href: '#migrate', label: 'Tenant migration' },
	{ href: '#gaps', label: 'What sync doesn’t have yet' },
	{ href: '#pick-each', label: 'When to pick each' },
	{ href: '#honesty', label: 'Honest framing' }
];

const cardGridStyle = (isMobileOrTablet?: boolean): CSSProperties => ({
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: isMobileOrTablet ? '1fr' : 'repeat(2, 1fr)',
	marginBottom: '1.5rem'
});

const cardListStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	listStyleType: 'disc',
	margin: 0,
	paddingLeft: '1.1rem'
};

type FeatureCardProps = {
	children: ReactNode;
	themeSprings: DocsViewProps['themeSprings'];
	title: ReactNode;
};

const FeatureCard = ({ children, themeSprings, title }: FeatureCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				fontSize: '1rem',
				fontWeight: 600,
				marginBottom: '0.5rem'
			}}
		>
			{title}
		</p>
		<div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{children}</div>
	</animated.div>
);

type CardGridSectionProps = {
	isMobileOrTablet: DocsViewProps['isMobileOrTablet'];
	themeSprings: DocsViewProps['themeSprings'];
};

const ArchitectureCards = ({
	isMobileOrTablet,
	themeSprings
}: CardGridSectionProps) => (
	<div style={cardGridStyle(isMobileOrTablet)}>
		<FeatureCard themeSprings={themeSprings} title="Convex">
			<ul style={cardListStyle}>
				<li>
					<strong style={strongStyle}>Managed runtime.</strong> Hosted
					V8 isolates with seeded ChaCha12 RNG and a frozen{' '}
					<code>Date.now()</code> inside mutations. Every mutation is
					automatically deterministic, retryable, and replayable.
				</li>
				<li>
					<strong style={strongStyle}>
						JS-only mutation handlers.
					</strong>{' '}
					The runtime decides what your handler can reach.
				</li>
				<li>
					<strong style={strongStyle}>Convex's own database</strong>{' '}
					under the runtime. Replication, point-in-time recovery,
					multi-region failover are theirs to operate.
				</li>
				<li>
					<strong style={strongStyle}>One product.</strong> You opt in
					or out; there's no piecemeal.
				</li>
			</ul>
		</FeatureCard>
		<FeatureCard themeSprings={themeSprings} title="sync">
			<ul style={cardListStyle}>
				<li>
					<strong style={strongStyle}>A library you import.</strong>{' '}
					Runs on your Bun (or Node) process, alongside your other
					Elysia routes. No managed control plane.
				</li>
				<li>
					<strong style={strongStyle}>
						Arbitrary host JS handlers
					</strong>{' '}
					— TypeScript, async, with access to anything you've
					imported. Fast, full-power, no sandbox by default.
				</li>
				<li>
					<strong style={strongStyle}>Brings your own DB.</strong>{' '}
					First-party adapters for Postgres / MySQL / SQLite, plus
					Drizzle and Prisma. The engine treats your DB as the source
					of truth; replication / backups / regions are your choice
					(same way you'd run a normal Elysia app).
				</li>
				<li>
					<strong style={strongStyle}>
						Pick the pieces you need.
					</strong>{' '}
					Use just reactive subscriptions, or add CRDT, search,
					scheduled jobs, cluster bus, sandboxing — each is opt-in via
					a sub-package.
				</li>
			</ul>
		</FeatureCard>
	</div>
);

const MigrationVerbCards = ({
	isMobileOrTablet,
	themeSprings
}: CardGridSectionProps) => (
	<div style={cardGridStyle(isMobileOrTablet)}>
		<FeatureCard
			themeSprings={themeSprings}
			title={<code>fence({'{ reason }'})</code>}
		>
			Pauses new mutations on the source so its captured state stops
			drifting. <code>runMutation</code> rejects with{' '}
			<code>EngineFencedError</code> carrying the reason. Reads keep
			working — <code>subscribe</code> / <code>hydrate</code> /{' '}
			<code>streamChanges</code> stay open, so live readers don't go dark
			during the transfer. Multiple fences compose: every handle has to{' '}
			<code>lift()</code> before the engine unfences.
		</FeatureCard>
		<FeatureCard
			themeSprings={themeSprings}
			title={<code>exportSnapshot()</code>}
		>
			Walks each registered reader's <code>all(ctx)</code> and returns a
			portable <code>EngineSnapshot</code>{' '}
			<code>{'{ sourceInstanceId, version, exportedAt, tables }'}</code>.
			Optionally narrow with <code>{'{ tables: [...] }'}</code> for
			partial migrations.
		</FeatureCard>
		<FeatureCard
			themeSprings={themeSprings}
			title={<code>importSnapshot(snapshot, options)</code>}
		>
			Bulk-loads via each table's registered writer on the target.{' '}
			<code>onProgress</code> fires per row. Tables in the snapshot
			without a writer on the target are surfaced in{' '}
			<code>result.skipped</code> so a misconfigured target doesn't
			silently drop rows.
		</FeatureCard>
	</div>
);

const GapsCards = ({
	isMobileOrTablet,
	themeSprings
}: CardGridSectionProps) => (
	<div style={cardGridStyle(isMobileOrTablet)}>
		<FeatureCard themeSprings={themeSprings} title="Managed deployment">
			Convex is a hosted product. Sync is a library; the absolutejs hosted
			PaaS is planned (and <code>isolated-jsc</code> was built to power
			its sandbox slot).
		</FeatureCard>
		<FeatureCard themeSprings={themeSprings} title="Strict determinism">
			Convex enforces it; sync trusts you (unless you opt into{' '}
			<code>sandboxedHandler</code>, where the sandbox enforces resource
			caps but not "no random / no real time" determinism).
		</FeatureCard>
		<FeatureCard
			themeSprings={themeSprings}
			title="Multi-region with managed failover"
		>
			Convex handles this for you; in sync this is a deployment choice
			(Postgres logical replication or Redis pub/sub via{' '}
			<code>@absolutejs/sync-bus-redis</code> works, but you operate it).
		</FeatureCard>
	</div>
);

const PickEachCards = ({
	isMobileOrTablet,
	themeSprings
}: CardGridSectionProps) => (
	<div style={cardGridStyle(isMobileOrTablet)}>
		<FeatureCard themeSprings={themeSprings} title="Pick Convex if:">
			<ul style={cardListStyle}>
				<li>You want one managed product end-to-end.</li>
				<li>JS-only mutation handlers are fine.</li>
				<li>
					You don't need to choose your database — Convex's is good
					and you'd rather not operate one.
				</li>
				<li>
					You want strict determinism guaranteed by the runtime, with
					no developer responsibility for it.
				</li>
				<li>
					You're not running Bun (Convex doesn't run on Bun
					specifically; it has its own runtime).
				</li>
			</ul>
		</FeatureCard>
		<FeatureCard themeSprings={themeSprings} title="Pick sync if:">
			<ul style={cardListStyle}>
				<li>
					You already have a database (Postgres / MySQL / SQLite) and
					want to keep it as the source of truth.
				</li>
				<li>
					You want your handlers to be normal TS code with access to
					your other libraries and your own runtime.
				</li>
				<li>
					You want first-party CRDT support with pluggable backends
					(Yjs, Automerge, Loro).
				</li>
				<li>
					You want to use sandboxing on some handlers (untrusted
					source, PaaS, AI-generated) but not pay the cost on the fast
					path.
				</li>
				<li>You're running on Bun and want native primitives.</li>
				<li>
					You want to host it yourself (or wait for the absolutejs
					PaaS).
				</li>
			</ul>
		</FeatureCard>
	</div>
);

const HonestyCards = ({
	isMobileOrTablet,
	themeSprings
}: CardGridSectionProps) => (
	<div style={cardGridStyle(isMobileOrTablet)}>
		<FeatureCard
			themeSprings={themeSprings}
			title="No backwards-compat burden"
		>
			We didn't have to commit to backwards compat. Convex has paying
			customers; we can move fast on shape.
		</FeatureCard>
		<FeatureCard themeSprings={themeSprings} title="We don't host the DB">
			They have to design for multi-region; we delegate that to your
			existing infra.
		</FeatureCard>
		<FeatureCard
			themeSprings={themeSprings}
			title="CRDT was already shipped"
		>
			The CRDT story was already shipped in absolutejs (<code>/crdt</code>
			) before sync started, so we slotted in.
		</FeatureCard>
		<FeatureCard
			themeSprings={themeSprings}
			title="The targets were written down"
		>
			Convex's gaps are well-tracked in their public issue tracker (#95,
			etc) — we had the targets written down.
		</FeatureCard>
	</div>
);

export const SyncVsConvexView = ({
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
					<h1 id="sync-vs-convex" style={h1Style(isMobileOrTablet)}>
						Sync vs Convex
					</h1>
					<p style={paragraphLargeStyle}>
						Convex is the closest comparison point for{' '}
						<code>@absolutejs/sync</code>. The mental model is the
						same — reactive subscriptions, server-authored mutations
						as transactions, automatic dependency tracking. The
						differences are in where the engine runs, what language
						it speaks, and what escape hatches it gives you. This
						page is the honest comparison.
					</p>
					<p style={paragraphSpacedStyle}>
						This page focuses on sync-vs-Convex specifically. The
						seven cross-cutting gaps the substrate audit named
						(audit log, OTel, dispatch, cluster bus, replay,
						migration) are consolidated on{' '}
						<a href="/documentation/substrate-audit">
							Substrate complete (G1–G7)
						</a>
						.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shared-model"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Shared mental model
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						If you've used Convex, sync's API will feel familiar.
						Both engines collapse "store + cache + invalidation +
						push" into one abstraction.
					</p>
					<div style={cardGridStyle(isMobileOrTablet)}>
						<FeatureCard
							themeSprings={themeSprings}
							title="Subscribe to a query"
						>
							Clients subscribe to a query. The engine returns the
							initial result and pushes updates whenever anything
							that query depends on changes.
						</FeatureCard>
						<FeatureCard
							themeSprings={themeSprings}
							title="Writes go through mutations"
						>
							Writes go through server-authored mutations. The
							mutation transacts against the durable store and
							emits the changes; subscribers see them atomically
							after commit.
						</FeatureCard>
						<FeatureCard
							themeSprings={themeSprings}
							title="Automatic dependency tracking"
						>
							The engine notes what tables/keys a query read, and
							only re-runs (or invalidates) when something in that
							read-set is written.
						</FeatureCard>
						<FeatureCard
							themeSprings={themeSprings}
							title="Mutation results as the ack"
						>
							Mutation results are pushed back to the calling
							client as the ack, so the optimistic edit can settle
							against authoritative state.
						</FeatureCard>
					</div>
					<p style={paragraphSpacedStyle}>
						Where the two diverge is <em>under</em> that surface —
						see "Where the engine runs" below.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="architecture"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where the engine runs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex is a managed runtime + managed DB; sync is a
						library you import into your own Bun server, talking to
						your own DB.
					</p>
					<ArchitectureCards
						isMobileOrTablet={isMobileOrTablet}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Both shapes are valid. Convex trades flexibility for
						guarantees; sync trades guarantees for flexibility (with
						opt-in ways to claw the guarantees back when you want
						them).
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="matrix"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Feature matrix
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Side-by-side of what each ships today. Annotated
						sections below dig into the rows that have the biggest
						implementation differences.
					</p>
					<ComparisonTable
						columns={syncVsConvexMatrixColumns}
						rows={syncVsConvexMatrixRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wire-diff"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Row-level diffs vs full results
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex pushes the full query result on every change
						(tracked upstream as{' '}
						<a
							href="https://github.com/get-convex/convex-backend/issues/95"
							rel="noopener noreferrer"
							target="_blank"
						>
							get-convex/convex-backend#95
						</a>
						). Sync emits row-level{' '}
						<code>{'{ added, removed, changed }'}</code> diffs. Same
						workload, the wire savings get dramatic with query size.
					</p>
					<p style={paragraphSpacedStyle}>
						Measured against an N-row reactive query, one row
						changed per push:
					</p>
					<ComparisonTable
						columns={syncVsConvexWireDiffColumns}
						firstColumnLabel="K (rows)"
						rows={syncVsConvexWireDiffRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Same workload, same Convex deployment, same sync engine.
						Sync's wire format encodes only the delta; the client
						reconciles into its local store.
					</p>
					<Callout themeSprings={themeSprings} variant="info">
						Convex's #95 also notes a 8192-element cap on array
						returns and a 4096-read cap per function — neither
						applies to sync.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cache"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cross-client query cache
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex pioneered the "one query body per (code,
						parameters, read-set) executes only once" coalescing
						that makes their cost model work at scale. Sync had the
						prerequisites already (read-set tracking, stable
						sub-keys) since 1.0; <code>1.3</code> lifted the
						existing per-batch dedup to a persistent LRU + TTL cache
						shared across batches.
					</p>
					<p style={paragraphSpacedStyle}>
						Subscribe-storm bench — N fresh subscribers to the same
						query:
					</p>
					<ComparisonTable
						columns={syncVsConvexCacheColumns}
						firstColumnLabel="N (subscribers)"
						rows={syncVsConvexCacheRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Configure via{' '}
						<code>
							{
								'createSyncEngine({ reactiveCache: { max, ttlMs } })'
							}
						</code>
						. Defaults are bounded (256 entries, 60s TTL). Different{' '}
						<code>ctx</code> references stay isolated, so per-user
						query bodies aren't accidentally shared.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sandbox"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sandboxed handlers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex's V8-isolate runtime sandboxes every handler by
						default — that's the price of admission and also the
						guarantee. Sync inverts the choice: handlers are normal
						host JS by default (~50 ns per call, full host access,
						integrate with anything), with an opt-in{' '}
						<code>sandboxedHandler</code> per mutation when the
						source is untrusted or you want hard CPU/memory caps.
					</p>
					<PrismPlus
						codeString={syncVsConvexSandboxHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Sandboxed handlers run inside{' '}
						<a
							href="https://github.com/absolutejs/isolated-jsc"
							rel="noopener noreferrer"
							target="_blank"
						>
							@absolutejs/isolated-jsc
						</a>{' '}
						— a Bun-native JavaScriptCore Isolate with a separate
						heap. First call per mutation pays ~30 ms (Worker spawn
						+ compile). Every subsequent call reuses the isolate at
						~0.5 ms. Timeout terminates the isolate; the next call
						transparently re-spawns.{' '}
						<code>@absolutejs/isolated-jsc</code> is an optional
						peer dep — only loaded when the first sandboxed mutation
						runs.
					</p>
					<p style={paragraphSpacedStyle}>
						Built because <code>isolated-vm</code> is V8-only and
						doesn't load in Bun (Bun uses JavaScriptCore, not V8 —
						see{' '}
						<a
							href="https://github.com/oven-sh/bun/issues/23653"
							rel="noopener noreferrer"
							target="_blank"
						>
							oven-sh/bun#23653
						</a>
						). The library fills that gap; sync wires it. See the
						dedicated{' '}
						<a href="/documentation/sync-sandbox">
							Sandboxed Mutations
						</a>{' '}
						page for backends, bench numbers, and the full trade-off
						table.
					</p>
					<p style={paragraphSpacedStyle}>
						Use <code>sandboxedHandler</code> when:
					</p>
					<div style={cardGridStyle(isMobileOrTablet)}>
						<FeatureCard
							themeSprings={themeSprings}
							title="User-supplied source"
						>
							The handler source is user-supplied (multi-tenant
							PaaS, plugins).
						</FeatureCard>
						<FeatureCard
							themeSprings={themeSprings}
							title="AI-generated source"
						>
							The source is AI-generated and you need hard caps
							before running.
						</FeatureCard>
						<FeatureCard
							themeSprings={themeSprings}
							title="Defense-in-depth"
						>
							You want defense-in-depth resource limits on your
							own first-party handlers — capped CPU/memory keeps a
							runaway from taking the engine down.
						</FeatureCard>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="replay"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Point-in-time replay
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex's time-travel queries let you read against any
						past commit — the killer feature for "I deleted prod,
						restore us to 2h ago" and forensic "what did the tenant
						see at 14:32?" stories. Sync 1.22 shipped the same
						primitive as{' '}
						<code>engine.replayTo({'{ at, tables? }'})</code>:
					</p>
					<PrismPlus
						codeString={syncVsConvexReplayUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						How it works: sync's change log is bounded by{' '}
						<code>changeLogSize</code> +{' '}
						<code>changeLogRetainMs</code>. <code>replayTo</code>{' '}
						walks the log forward to the target timestamp, folds
						each insert/update/delete into a per-table keyed view
						(last-write-wins per row key, delete removes), and
						returns{' '}
						<code>
							{'{ asOfVersion, asOfAt, rows, truncated }'}
						</code>
						. <code>truncated=true</code> when the log doesn't
						extend back to the target — result is best-effort from
						the oldest retained entry.
					</p>
					<p style={paragraphSpacedStyle}>
						For forensic use cases, set{' '}
						<code>changeLogRetainMs</code> wide:
					</p>
					<PrismPlus
						codeString={syncVsConvexReplayRetention}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Sync 1.23 added a Replay panel to{' '}
						<code>syncDevtools</code> — a datetime picker, optional
						tables filter, and a clickable Replay button. The same
						endpoint is exposed as JSON at{' '}
						<code>{'GET <devtoolsPath>/replay'}</code> so admin
						shells can wrap it without screen-scraping HTML.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="When Convex's version is better"
						variant="note"
					>
						Convex's storage layer is designed for forever-retention
						out of the box, so any historical timestamp resolves
						exactly. Sync's accuracy is bounded by your retention
						policy — set the window wide for forensics, narrow for
						short-tail use cases.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="migrate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tenant migration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Moving a tenant between engines (sharding rebalance,
						cross-region move, point-in-time clone for staging) is a
						first-class operation in sync 1.24. Three composable
						verbs — <code>fence</code>, <code>exportSnapshot</code>,{' '}
						<code>importSnapshot</code> — let you choreograph the
						strictness vs availability tradeoff yourself instead of
						taking whatever a monolithic <code>migrate()</code>{' '}
						would prescribe.
					</p>
					<PrismPlus
						codeString={syncVsConvexMigrateVerbs}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<MigrationVerbCards
						isMobileOrTablet={isMobileOrTablet}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Why three verbs, not one big <code>migrate()</code>: a
						monolithic call would conflate pause-writes,
						capture-state, transport-bytes, and reapply — but
						transport is your choice (S3? Kafka? gRPC?) and the
						strictness vs availability tradeoff (fence-first vs
						export-first) is operator policy. The substrate offers
						the verbs; the choreography is yours. Reads stay open
						under fence so live subscribers don't go dark during the
						transfer.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Out of scope"
						variant="warning"
					>
						Out-of-band writes (CDC drivers, raw SQL). The fence
						only blocks <code>runMutation</code>; halt CDC
						separately or the snapshot will drift between export and
						import.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="gaps"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What sync doesn’t have yet
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Honest list of where Convex is ahead and we haven't
						caught up. These are roadmap items, not artifacts of
						being new — closing them will take real work.
					</p>
					<GapsCards
						isMobileOrTablet={isMobileOrTablet}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pick-each"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When to pick each
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Neither answer is wrong. The decision is mostly about
						whether the managed-runtime / managed-DB trade is one
						you want.
					</p>
					<PickEachCards
						isMobileOrTablet={isMobileOrTablet}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="honesty"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Honest framing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sync's first commit was 2026-05-23. Convex is years old,
						well-funded, with a real team. This page records what
						we've shipped and where the trade-offs land today; it's
						not a verdict on the products.
					</p>
					<p style={paragraphSpacedStyle}>
						We were able to close most of the architectural gaps
						quickly because:
					</p>
					<HonestyCards
						isMobileOrTablet={isMobileOrTablet}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} variant="note">
						The gaps we still have (managed deployment, strict
						determinism, managed multi-region failover) are real and
						not artifacts of "we're new." They're host-operator
						concerns and will land alongside the absolutejs hosted
						PaaS. We're documenting them honestly here so you can
						plan.
					</Callout>
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
