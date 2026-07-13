import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	queueAuditWiring,
	queueRoutes,
	queueWorker,
	queueWorkerSplit
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
import { Endpoint, EndpointTable } from '../../utils/EndpointTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#queue-operations', label: 'Overview' },
	{ href: '#worker', label: 'Worker' },
	{ href: '#deployment', label: 'Deployment Split' },
	{ href: '#routes', label: 'Admin Routes' },
	{ href: '#metrics', label: 'Metrics & Drain' },
	{ href: '#observability', label: 'Observability' }
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

const adminEndpoints: Endpoint[] = [
	{
		description: 'Job counts grouped by status.',
		method: 'GET',
		note: 'Backed by the optional countByStatus store method.',
		path: '/queue/stats'
	},
	{
		description:
			'List jobs — filter with ?kind=…&status=…&limit=…&offset=…',
		method: 'GET',
		path: '/queue/jobs'
	},
	{
		description: 'Fetch a single job by id.',
		method: 'GET',
		path: '/queue/jobs/:id'
	},
	{
		description: 'Re-enqueue a failed or dead job.',
		method: 'POST',
		path: '/queue/jobs/:id/retry'
	},
	{
		description: 'Cancel a pending or claimed job.',
		method: 'POST',
		path: '/queue/jobs/:id/cancel'
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
	{
		field: 'failed',
		meaning: 'Runs that threw — includes the dead-lettered tail.'
	},
	{ field: 'retried', meaning: 'Failed runs re-scheduled with backoff.' },
	{ field: 'deadLettered', meaning: 'Jobs that exhausted maxAttempts.' },
	{ field: 'polls', meaning: 'Poll-loop tick() invocations.' },
	{ field: 'reaped', meaning: 'Stuck leases returned to pending.' },
	{ field: 'lastTickMs', meaning: 'Wall-clock duration of the last tick.' }
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

export const QueueOperationsView = ({
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
					<h1 id="queue-operations" style={h1Style(isMobileOrTablet)}>
						Queue Operations
					</h1>
					<p style={paragraphLargeStyle}>
						Running the queue in production: the worker loop and its
						lifecycle, splitting the HTTP fleet from the worker
						fleet, admin routes for inspecting and repairing jobs,
						operator-shaped metrics, and OpenTelemetry + audit
						wiring for every run.
					</p>
				</animated.div>

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
						Each poll-loop tick reaps stuck leases, claims due jobs
						up to the spare concurrency, re-validates their
						payloads, and runs the handlers — completing, retrying
						with backoff, or dead-lettering as each one resolves. A
						worker that dies mid-job simply lets the lease expire;
						another worker's <code>reapStuck</code> returns the job
						to pending.
					</p>
					<PrismPlus
						codeString={queueWorker}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>drain()</code> is "stop accepting new work," not
						"halt the worker" — the poll loop keeps running so
						stuck-lease reaps continue, in-flight handlers finish,
						and no new jobs are claimed. <code>stop()</code> halts
						the loop and waits for active handlers, so the pair
						gives the worker a clean SIGTERM story.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="deployment"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Deployment Split
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Elysia <code>queue()</code> plugin runs an
						in-process worker by default. Pass{' '}
						<code>runWorker: false</code> to keep only the enqueue
						surface in your HTTP layer and run the worker separately
						— the recommended split for prod: one HTTP fleet, one
						worker fleet, both sharing the durable store.{' '}
						<code>runQueueWorker(options)</code> is the
						standalone-entrypoint wrapper — it starts the worker and
						wires process signals to <code>stop()</code> followed by
						a clean exit.
					</p>
					<PrismPlus
						codeString={queueWorkerSplit}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="The plugin's worker takes a subset of options"
						variant="note"
					>
						<code>queue()</code> forwards only <code>backoff</code>{' '}
						and <code>concurrency</code> to its in-process worker.
						For <code>leaseMs</code>, <code>pollIntervalMs</code>,{' '}
						<code>handlerTimeoutMs</code>, <code>onError</code>, or{' '}
						<code>tracerProvider</code>, run the worker yourself via{' '}
						<code>createQueueWorker</code> /{' '}
						<code>runQueueWorker</code>.
					</Callout>
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
						<code>createQueueRoutes({'{ prefix, store }'})</code>{' '}
						exposes the optional <code>JobStore</code> methods as
						HTTP endpoints — useful for an internal admin dashboard.
						Endpoints whose store method is missing respond{' '}
						<code>501</code> rather than failing at mount time.
					</p>
					<PrismPlus
						codeString={queueRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<EndpointTable
						endpoints={adminEndpoints}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The in-memory store and the Postgres adapter implement
						the full optional set, so every route lights up. The
						Redis adapter (0.0.1) adds <code>get</code> and{' '}
						<code>countByStatus</code> on top of the worker contract
						— <code>list</code> / <code>cancel</code> /{' '}
						<code>retry</code> respond 501 until a later release —
						and its <code>countByStatus</code> counts only pending
						and claimed jobs.
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
						Pass a <code>tracerProvider</code> (any{' '}
						<code>@opentelemetry/api</code>-compatible provider —
						see <code>@absolutejs/telemetry</code> for the type
						shape) and every job run is wrapped in a{' '}
						<code>queue.runJob</code> span carrying these attributes
						— when no provider is set, tracing is a zero-allocation
						noop:
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
						On failure the handler's exception is recorded on the
						span and its status becomes <code>ERROR</code> — for
						retryable and dead-lettered outcomes alike. Each attempt
						gets its own span on its own run, with the attempt
						number in <code>abs.job.attempt</code>. Pair with{' '}
						<code>@absolutejs/audit</code>'s{' '}
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
