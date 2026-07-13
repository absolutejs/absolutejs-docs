import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	queuePostgresAdapter,
	queueQuickStart,
	queueRedisAdapter,
	queueStoreContract
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
	{ href: '#stores', label: 'Stores & Adapters' },
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
			'The production default — Drizzle + postgres.js against the Postgres you already run, with atomic multi-worker claims via FOR UPDATE SKIP LOCKED.',
		factory: 'createPostgresJobStore',
		pkg: '@absolutejs/queue-postgres',
		version: '0.1.0'
	},
	{
		bestFor:
			"Neon serverless Postgres — same store over Neon's WebSocket Pool driver, since claimDue needs real transactions and row-level locks.",
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
		key: '<prefix>idempotency:<key>',
		purpose: 'idempotencyKey → job id, set with NX for dedup.',
		type: 'STRING'
	},
	{
		key: '<prefix>kind:<kind>',
		purpose: 'Job ids by kind — lazy index.',
		type: 'SET'
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
					<p style={paragraphSpacedStyle}>
						This page covers the quick start and the storage layer.
						For defining work — schemas, handlers, retries,
						recurring and one-shot triggers — see{' '}
						<a href="/documentation/queue-jobs">Queue Jobs</a>. For
						running it — the worker, admin routes, metrics, and
						tracing — see{' '}
						<a href="/documentation/queue-operations">
							Queue Operations
						</a>
						.
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
						id="postgres-adapter"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postgres Adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/queue-postgres</code> is a
						Drizzle-based implementation of <code>JobStore</code>{' '}
						with convenience factories for postgres.js and Neon's
						WebSocket driver — and{' '}
						<code>buildPostgresJobStore</code> underneath, which
						accepts any Drizzle Postgres database if you're on
						another driver.
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
						Durability after a Redis crash depends on your
						persistence config — RDB snapshot cadence and AOF fsync
						policy — so jobs enqueued since the last persisted point
						can be lost. When every job must survive, prefer the
						Postgres adapter and its WAL-backed durability.
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
