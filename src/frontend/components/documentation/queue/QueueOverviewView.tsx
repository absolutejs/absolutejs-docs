import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	queueAuditWiring,
	queueDefineJobs,
	queuePostgresAdapter,
	queueQuickStart,
	queueRedisAdapter,
	queueRegistry,
	queueRoutes,
	queueStoreContract,
	queueWorker
} from '../../../data/documentation/queueDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableCellStyle,
	tableCodeStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#queue-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#define-jobs', label: 'defineJobs' },
	{ href: '#registry', label: 'Handlers & Registry' },
	{ href: '#stores', label: 'Stores & Adapters' },
	{ href: '#worker', label: 'Worker' },
	{ href: '#metrics', label: 'Metrics & Drain' },
	{ href: '#routes', label: 'Admin Routes' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#postgres-adapter', label: 'Postgres Adapter' },
	{ href: '#redis-adapter', label: 'Redis Adapter' }
];

type DocsTableProps = {
	headers: string[];
	rows: ReactNode[][];
	themeSprings: ThemeSprings;
};

const DocsTable = ({ headers, rows, themeSprings }: DocsTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					{headers.map((header) => (
						<animated.th
							key={header}
							style={tableHeaderStyle(themeSprings)}
						>
							{header}
						</animated.th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<animated.td
								key={cellIndex}
								style={tableCellStyle(themeSprings)}
							>
								{cell}
							</animated.td>
						))}
					</tr>
				))}
			</tbody>
		</animated.table>
	</div>
);

type BundledStoreRow = {
	bestFor: string;
	factory: string;
	pkg: string;
	version: string;
};

const bundledStores: BundledStoreRow[] = [
	{
		bestFor:
			'Tests and single-process apps. snapshot()/restore() round-trips state so the host can persist on SIGTERM and rehydrate on restart.',
		factory: 'createInMemoryJobStore',
		pkg: '@absolutejs/queue',
		version: '0.3.0'
	},
	{
		bestFor:
			'Shared-database simplicity — Drizzle + postgres.js against the Postgres you already run.',
		factory: 'createPostgresJobStore',
		pkg: '@absolutejs/queue-postgres',
		version: '0.1.0'
	},
	{
		bestFor:
			"Serverless — Neon's HTTP driver issues single-shot queries with no pool to leak in /api routes.",
		factory: 'createNeonJobStore',
		pkg: '@absolutejs/queue-postgres',
		version: '0.1.0'
	},
	{
		bestFor:
			'High-throughput, low-latency claims — atomic Lua scripts keep the critical section to one round-trip.',
		factory: 'createRedisJobStore',
		pkg: '@absolutejs/queue-redis',
		version: '0.0.1'
	}
];

type WorkerMetricRow = {
	field: string;
	meaning: string;
};

const workerMetrics: WorkerMetricRow[] = [
	{ field: 'active', meaning: 'Currently-running handlers.' },
	{ field: 'capacity', meaning: 'Configured concurrency.' },
	{ field: 'draining', meaning: 'Whether drain() has been requested.' },
	{ field: 'runs', meaning: 'Total handlers invoked.' },
	{ field: 'completed', meaning: 'Runs that finished successfully.' },
	{ field: 'failed', meaning: 'Runs that threw.' },
	{ field: 'retried', meaning: 'Failed runs re-scheduled with backoff.' },
	{ field: 'deadLettered', meaning: 'Jobs that exhausted maxAttempts.' },
	{ field: 'polls', meaning: 'Poll-loop tick() invocations.' },
	{ field: 'reaped', meaning: 'Stuck leases returned to pending.' },
	{ field: 'lastTickMs', meaning: 'Wall-clock duration of the last tick.' }
];

type AdminRouteRow = {
	description: string;
	method: string;
	route: string;
};

const adminRoutes: AdminRouteRow[] = [
	{
		description: 'List jobs — filter with ?kind=…&status=…&limit=…',
		method: 'GET',
		route: '/queue/jobs'
	},
	{
		description: 'Fetch a single job by id.',
		method: 'GET',
		route: '/queue/jobs/:id'
	},
	{
		description: 'Re-enqueue a failed or dead job.',
		method: 'POST',
		route: '/queue/jobs/:id/retry'
	},
	{
		description: 'Cancel a pending job.',
		method: 'POST',
		route: '/queue/jobs/:id/cancel'
	},
	{
		description: 'Job counts grouped by status.',
		method: 'GET',
		route: '/queue/jobs/count'
	}
];

type JobSpanAttributeRow = {
	attribute: string;
	value: string;
};

const jobSpanAttributes: JobSpanAttributeRow[] = [
	{ attribute: 'abs.job.id', value: 'The JobId' },
	{ attribute: 'abs.job.kind', value: 'The kind string' },
	{ attribute: 'abs.job.attempt', value: 'Current attempt number' },
	{ attribute: 'abs.job.max_attempts', value: 'Attempt ceiling' },
	{
		attribute: 'abs.worker.id',
		value: 'Worker id from createQueueWorker'
	}
];

type RedisStorageRow = {
	key: string;
	purpose: string;
	type: string;
};

const redisStorageLayout: RedisStorageRow[] = [
	{
		key: '<prefix>job:<id>',
		purpose: 'One record per job.',
		type: 'HASH'
	},
	{
		key: '<prefix>due',
		purpose: 'Scheduling — jobs sorted by runAt.',
		type: 'ZSET'
	},
	{
		key: '<prefix>claimed',
		purpose: 'Active leases keyed by lockedAt + leaseMs.',
		type: 'ZSET'
	},
	{
		key: '<prefix>idem:<key>',
		purpose: 'idempotencyKey dedup.',
		type: 'STRING'
	}
];

export const QueueOverviewView = ({
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
					<h1 id="queue-overview" style={h1Style(isMobileOrTablet)}>
						Queue
					</h1>
					<p style={paragraphLargeStyle}>
						Durable typed job queue for Bun + Elysia. Define jobs
						once via TypeBox schemas, validate payloads at the
						boundary, dispatch by kind, and run on the store that
						fits your deployment — in-memory, Postgres, or Redis.
						At-least-once delivery with stuck-lease reap,
						exponential-backoff retries, dead-lettering on exhausted
						attempts, and an OpenTelemetry span per run.
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
						Four moves: define jobs, register handlers, pick a
						store, wire the Elysia plugin.{' '}
						<code>queue.enqueue(kind, payload)</code> is decorated
						onto the Elysia context so any route can dispatch.
					</p>
					<PrismPlus
						codeString={queueQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-jobs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						defineJobs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>defineJobs</code> takes a kind → TypeBox-schema
						map. The result is the single source of truth for both{' '}
						<strong>inferred payload types</strong> — every{' '}
						<code>enqueue(kind, payload)</code> call and every
						handler is auto-typed — and{' '}
						<strong>runtime validation</strong> — payloads are
						validated against the schema before persistence, so a
						buggy caller can't push junk into the durable store and
						break the worker on dequeue.
					</p>
					<PrismPlus
						codeString={queueDefineJobs}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Use the re-exported t"
						variant="note"
					>
						The package re-exports TypeBox's <code>t</code> so every
						schema shares one TypeBox instance — mixing TypeBox
						versions silently breaks type narrowing.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="registry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handlers &amp; Registry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createJobRegistry(jobs)</code> is a fluent
						registry — chain <code>.on(kind, handler)</code> per
						kind. Each handler receives the typed payload and a{' '}
						<code>JobContext</code> with <code>id</code>,{' '}
						<code>kind</code>, <code>attempts</code>,{' '}
						<code>maxAttempts</code>, and <code>signal</code>.
					</p>
					<PrismPlus
						codeString={queueRegistry}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Throwing from a handler triggers the retry policy —
						exponential backoff (configurable via{' '}
						<code>backoff</code>) up to <code>maxAttempts</code>{' '}
						(set per-job at enqueue, default 5). After the final
						attempt the job moves to <code>dead</code>, surfaced
						separately in metrics and listable via{' '}
						<code>store.listByKind</code>. <code>ctx.attempts</code>{' '}
						/ <code>ctx.maxAttempts</code> let a handler change
						behavior on the final attempt — send a summary to ops
						instead of throwing one more time.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Honor the drain signal"
						variant="info"
					>
						<code>ctx.signal</code> aborts when the worker drains.
						Check it on cooperative paths (and pass it to in-flight
						HTTP calls) so SIGTERM doesn't leave jobs half-applied.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stores &amp; Adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The worker contract is small — claim due jobs, complete,
						fail (with retry or dead-letter), reap stuck leases.
						Optional methods power the admin tooling.
					</p>
					<PrismPlus
						codeString={queueStoreContract}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						One store ships with the core package; two adapter
						packages cover durable deployments. Pick by deployment
						model:
					</p>
					<DocsTable
						headers={['Store', 'Package', 'Version', 'Best for']}
						rows={bundledStores.map((row) => [
							<code style={tableCodeStyle}>{row.factory}</code>,
							<code style={tableCodeStyle}>{row.pkg}</code>,
							row.version,
							row.bestFor
						])}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="worker"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Worker
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Elysia <code>queue()</code> plugin runs a worker by
						default. Pass <code>runWorker: false</code> to keep the
						enqueue surface in your HTTP layer and run the worker as
						a separate process — the recommended split for prod: one
						HTTP fleet, one worker fleet, both sharing the durable
						store.
					</p>
					<PrismPlus
						codeString={queueWorker}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>runQueueWorker(options)</code> is the
						standalone-binary wrapper — it wires SIGTERM →{' '}
						<code>drain()</code> → <code>stop()</code> and exits
						cleanly.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Metrics &amp; Drain
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>worker.metrics()</code> returns a point-in-time
						snapshot plus cumulative counters since{' '}
						<code>createQueueWorker()</code>. Scrape it on a 30s
						interval — it pairs well with{' '}
						<code>@absolutejs/metering</code> for per-worker cost
						and throughput attribution.
					</p>
					<DocsTable
						headers={['Field', 'Meaning']}
						rows={workerMetrics.map((row) => [
							<code style={tableCodeStyle}>{row.field}</code>,
							row.meaning
						])}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Watch lastTickMs"
						variant="note"
					>
						A climbing <code>lastTickMs</code> means the store is
						slowing down — Postgres locking, network jitter, Redis
						CPU pressure. Pair it with the <code>queue.runJob</code>{' '}
						spans to see where the time actually went.
					</Callout>
					<p style={paragraphSpacedStyle}>
						<code>drain()</code> stops accepting new claims and
						waits for in-flight handlers; <code>stop()</code> halts
						the poll loop. Together they give the worker a clean
						SIGTERM story.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Admin Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createQueueRoutes</code> exposes the optional{' '}
						<code>JobStore</code> methods as HTTP endpoints, gated
						by an <code>authorize</code> callback. Useful for an
						internal admin dashboard.
					</p>
					<PrismPlus
						codeString={queueRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						headers={['Method', 'Route', 'Description']}
						rows={adminRoutes.map((row) => [
							row.method,
							<code style={tableCodeStyle}>{row.route}</code>,
							row.description
						])}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every store method is optional — the routes call only
						what the store implements. The in-memory store and the
						Postgres adapter implement the full set; the Redis
						adapter implements the worker contract plus list / get /
						cancel / retry.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="observability"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Observability
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass a <code>tracerProvider</code> (via{' '}
						<code>@absolutejs/telemetry</code>) and every job run is
						wrapped in a <code>queue.runJob</code> span carrying
						these attributes — when no provider is set, tracing is a
						zero-allocation noop:
					</p>
					<DocsTable
						headers={['Attribute', 'Value']}
						rows={jobSpanAttributes.map((row) => [
							<code style={tableCodeStyle}>{row.attribute}</code>,
							row.value
						])}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Errors are recorded on the span and its status becomes{' '}
						<code>ERROR</code>. Spans on retries thread their
						parent, so a job's full attempt history shows up as one
						trace tree. Pair with <code>@absolutejs/audit</code>'s{' '}
						<code>recordQueueError</code> helper for an audit-log
						trail of every failed job:
					</p>
					<PrismPlus
						codeString={queueAuditWiring}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="postgres-adapter"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postgres Adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/queue-postgres</code> is a Drizzle +
						postgres.js implementation of <code>JobStore</code>.
						Pass an existing postgres.js client to share its
						connection pool, or a connection string to let the
						adapter open its own.
					</p>
					<PrismPlus
						codeString={queuePostgresAdapter}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The adapter implements the full <code>JobStore</code>{' '}
						plus every optional method (cancel / retry / list / get
						/ listByKind / countByStatus), so the admin routes light
						up automatically. The schema is exported as{' '}
						<code>queueJobsTable</code> if you want to manage
						migrations alongside your own.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redis-adapter"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redis Adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/queue-redis</code> claims and reaps
						via atomic Lua scripts, so two workers can't race-claim
						the same job. The narrow <code>RedisCommandClient</code>{' '}
						contract means ioredis and node-redis v4+ both work — no
						client peer dep.
					</p>
					<PrismPlus
						codeString={queueRedisAdapter}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						headers={['Key', 'Type', 'Purpose']}
						rows={redisStorageLayout.map((row) => [
							<code style={tableCodeStyle}>{row.key}</code>,
							row.type,
							row.purpose
						])}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Choose Redis for high-throughput claims and low-latency
						dispatch — it also pairs naturally with{' '}
						<code>@absolutejs/sync-bus-redis</code> if you're
						already running Redis for the sync cluster bus.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Durability trade-off"
						variant="warning"
					>
						Delivery is at-most-once across subscription gaps — the
						same caveat as the Redis cluster bus. Pair with periodic
						snapshots if your jobs are not safely retryable.
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
