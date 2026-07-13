import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	clusterBusInterface,
	clusterBusPgQuickStart,
	clusterBusRedisQuickStart
} from '../../../data/documentation/clusterBusDocsCode';
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
import { StepFlow } from '../../utils/StepFlow';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#cluster-bus-overview', label: 'Overview' },
	{ href: '#why', label: 'Why a Cluster Bus' },
	{ href: '#adapters', label: 'Adapters' },
	{ href: '#pg-quick-start', label: 'Postgres Quick Start' },
	{ href: '#pg-adapter', label: 'Postgres Adapter' },
	{ href: '#pg-metrics', label: 'Postgres Metrics' },
	{ href: '#redis-quick-start', label: 'Redis Quick Start' },
	{ href: '#redis-adapter', label: 'Redis Adapter' },
	{ href: '#redis-metrics', label: 'Redis Metrics' },
	{ href: '#choosing', label: 'Choosing an Adapter' }
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

type BusAdapterRow = {
	description: string;
	pkg: string;
	transport: string;
	version: string;
};

const busPublishStepDescription = (
	<>
		<code>engine.connectCluster(bus)</code> wires the commit stream to the
		bus — every committed change becomes a <code>ClusterMessage</code>{' '}
		envelope broadcast to every other instance.
	</>
);

const busAdapters: BusAdapterRow[] = [
	{
		description:
			'Horizontal scale on the Postgres you already run — no extra infrastructure. An overflow spill table handles payloads above the 8KB NOTIFY cap.',
		pkg: '@absolutejs/sync-bus-pg',
		transport: 'Postgres LISTEN/NOTIFY',
		version: '0.1.2'
	},
	{
		description:
			'Faster fan-out and a native geo-replication story on managed Redis. Works with any Redis client (ioredis, node-redis, …) via a narrow interface.',
		pkg: '@absolutejs/sync-bus-redis',
		transport: 'Redis PUBLISH/SUBSCRIBE',
		version: '0.0.1'
	}
];

type OptionRow = {
	defaultValue: string;
	description: string;
	option: string;
};

const pgOptions: OptionRow[] = [
	{
		defaultValue: 'required',
		description: 'A postgres.js client.',
		option: 'sql'
	},
	{
		defaultValue: "'absolutejs_sync_cluster'",
		description: 'The NOTIFY channel name.',
		option: 'channel'
	},
	{
		defaultValue: "'overflow'",
		description:
			"Strategy for oversized payloads — 'overflow', 'always', or 'never'.",
		option: 'spill'
	},
	{
		defaultValue: '—',
		description: 'Hook that fires on subscribe-side failures.',
		option: 'onError'
	}
];

type SpillStrategyRow = {
	behavior: string;
	mode: string;
};

const spillStrategies: SpillStrategyRow[] = [
	{
		behavior:
			'Inline JSON when the payload is small; table-backed above the inline budget. The best balance for most workloads.',
		mode: "'overflow' (default)"
	},
	{
		behavior:
			'Every message goes through the spill table — durable but slower. Useful for forensic-replay workflows.',
		mode: "'always'"
	},
	{
		behavior:
			'Throws on oversized payloads. Useful in tests to assert payload-size discipline.',
		mode: "'never'"
	}
];

type CounterRow = {
	counter: string;
	meaning: string;
};

const pgCounters: CounterRow[] = [
	{ counter: 'published', meaning: 'Envelopes put on the channel.' },
	{
		counter: 'publishedInline',
		meaning: 'Small payloads sent as direct NOTIFY.'
	},
	{
		counter: 'publishedSpilled',
		meaning: 'Oversized payloads routed via the spill table.'
	},
	{ counter: 'received', meaning: 'Envelopes pulled off the channel.' },
	{ counter: 'spillFetched', meaning: 'Receiver fetched a spill row.' },
	{
		counter: 'spillFetchFailed',
		meaning: 'Spill row was vacuumed before it could be read.'
	},
	{ counter: 'spillVacuumed', meaning: 'Rows pruned by vacuum().' },
	{ counter: 'publishErrors', meaning: 'publish() threw.' },
	{ counter: 'subscribeErrors', meaning: 'onError fired.' }
];

const redisOptions: OptionRow[] = [
	{
		defaultValue: 'required',
		description: 'Any RedisCommandClient — used for PUBLISH.',
		option: 'publisher'
	},
	{
		defaultValue: 'required',
		description:
			'A dedicated connection for SUBSCRIBE — publisher.duplicate().',
		option: 'subscriber'
	},
	{
		defaultValue: "'absolutejs_sync_cluster'",
		description: 'The pub/sub channel name.',
		option: 'channel'
	},
	{
		defaultValue: '—',
		description: 'Hook that fires on subscribe-side failures.',
		option: 'onError'
	}
];

const redisCounters: CounterRow[] = [
	{ counter: 'published', meaning: 'Envelopes published.' },
	{ counter: 'received', meaning: 'Envelopes received.' },
	{ counter: 'publishErrors', meaning: 'publish() threw.' },
	{ counter: 'subscribeErrors', meaning: 'onError fired.' },
	{
		counter: 'totalSubscribersReached',
		meaning: "Sum of Redis's PUBLISH return values across calls."
	}
];

type AdapterComparisonRow = {
	criterion: string;
	pg: string;
	redis: string;
};

const adapterComparison: AdapterComparisonRow[] = [
	{
		criterion: 'Delivery',
		pg: 'At-least-once on local commit for inline broadcasts.',
		redis: 'At-most-once — a disconnected subscriber misses messages while down.'
	},
	{
		criterion: 'Payload size',
		pg: '8KB NOTIFY cap; the spill table carries anything larger.',
		redis: 'No cap.'
	},
	{
		criterion: 'Fan-out latency',
		pg: 'Fine at small subscriber counts.',
		redis: 'Lower at high subscriber counts (10+).'
	},
	{
		criterion: 'Cross-region',
		pg: 'Not a fit — PG logical replication is too heavy for bus traffic.',
		redis: 'Native geo-replication on managed Redis (Redis Cluster, ElastiCache Global Datastore, Memorystore, Upstash).'
	},
	{
		criterion: 'Extra infrastructure',
		pg: 'None if you already run Postgres for the durable store.',
		redis: 'None if you already run Redis for cache / queue / rate-limit.'
	},
	{
		criterion: 'Replay',
		pg: 'The spill table can hold oversized payloads forensically.',
		redis: 'Pair with engine.exportChangeLog() for shard-reboot resume.'
	}
];

export const ClusterBusView = ({
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
					<h1
						id="cluster-bus-overview"
						style={h1Style(isMobileOrTablet)}
					>
						Sync Cluster Bus
					</h1>
					<p style={paragraphLargeStyle}>
						Fan <code>@absolutejs/sync</code> updates across every
						node in a multi-instance deployment. Two first-party
						adapters speak the same <code>ClusterBus</code>{' '}
						interface — Postgres LISTEN/NOTIFY (with overflow spill)
						and Redis pub/sub (with native geo-replication). Pick by
						what you're already running.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why a Cluster Bus
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A single SyncEngine instance fans out changes to its own
						subscribers in-process. Multiple instances behind a load
						balancer each see only their own writes — without a
						cluster bus, two clients hitting different nodes never
						converge.
					</p>
					<StepFlow
						steps={[
							{
								actor: 'Node A',
								description:
									'The engine applies the write locally and fans out to its own in-process subscribers.',
								title: 'A node commits a change'
							},
							{
								actor: 'Bus',
								description: busPublishStepDescription,
								title: 'The change is published to the bus'
							},
							{
								actor: 'Node B',
								description:
									'Receivers re-apply each message into their own local view, so subscribers on any node see writes from every node.',
								title: 'Every other node re-applies it'
							}
						]}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The bus interface itself is minimal — two methods:
					</p>
					<PrismPlus
						codeString={clusterBusInterface}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="adapters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Both adapters implement the same <code>ClusterBus</code>{' '}
						interface, so swapping is one constructor change — the
						engine doesn't know which bus is underneath.
					</p>
					<DocsTable
						headers={[
							'Package',
							'Version',
							'Transport',
							'Description'
						]}
						rows={busAdapters.map((row) => [
							<code style={tableCodeStyle}>{row.pkg}</code>,
							row.version,
							row.transport,
							row.description
						])}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pg-quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postgres Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/sync-bus-pg</code> uses{' '}
						<code>pg_notify</code> + <code>LISTEN</code> with an
						overflow spill table for payloads above the 8KB NOTIFY
						cap.
					</p>
					<PrismPlus
						codeString={clusterBusPgQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pg-adapter"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postgres Adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Postgres's native pub/sub means no extra infrastructure
						if you already run PG, and delivery of inline broadcasts
						is at-least-once on local commit.{' '}
						<code>createPostgresClusterBus()</code> accepts:
					</p>
					<DocsTable
						headers={['Option', 'Default', 'Description']}
						rows={pgOptions.map((row) => [
							<code style={tableCodeStyle}>{row.option}</code>,
							row.defaultValue,
							row.description
						])}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Three spill strategies cover different durability /
						speed trade-offs:
					</p>
					<DocsTable
						headers={['Mode', 'Behavior']}
						rows={spillStrategies.map((row) => [
							<code style={tableCodeStyle}>{row.mode}</code>,
							row.behavior
						])}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>bus.vacuum(olderThanMs)</code> prunes spill rows
						older than the cutoff, on a schedule you control. Inline
						messages never touch the table — only the rare oversized
						batch does.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Why vacuum instead of delete-on-consume"
						variant="note"
					>
						<code>NOTIFY</code> broadcasts to every listener,
						including the publisher's own, so a spill row must
						outlive the broadcast. Deleting on consume would race
						other listeners off the row — pruning by age is the safe
						policy.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pg-metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postgres Metrics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>bus.metrics()</code> returns cumulative counters
						since <code>createPostgresClusterBus()</code>. A healthy
						small-payload workload keeps{' '}
						<code>publishedSpilled</code> near zero.
					</p>
					<DocsTable
						headers={['Counter', 'Meaning']}
						rows={pgCounters.map((row) => [
							<code style={tableCodeStyle}>{row.counter}</code>,
							row.meaning
						])}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Watch spillFetchFailed"
						variant="warning"
					>
						A climbing <code>spillFetchFailed</code> means{' '}
						<code>vacuum()</code> is racing the receivers — widen
						the vacuum window or shrink the spill rate.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redis-quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redis Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/sync-bus-redis</code> uses{' '}
						<code>PUBLISH</code> / <code>SUBSCRIBE</code> with a
						dedicated subscriber connection.
					</p>
					<PrismPlus
						codeString={clusterBusRedisQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						No 8KB payload cap, lower latency at high subscriber
						counts, and native geo-replication on managed Redis.
						Delivery is at-most-once — a disconnected subscriber
						misses messages while down; pair with{' '}
						<code>engine.exportChangeLog()</code> for shard-reboot
						resume. <code>createRedisClusterBus()</code> accepts:
					</p>
					<DocsTable
						headers={['Option', 'Default', 'Description']}
						rows={redisOptions.map((row) => [
							<code style={tableCodeStyle}>{row.option}</code>,
							row.defaultValue,
							row.description
						])}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="The subscriber must be a separate connection"
						variant="warning"
					>
						Redis forbids other commands on a subscribed connection,
						so a single client doing both publish and subscribe
						deadlocks. ioredis's <code>duplicate()</code> and
						node-redis's <code>createClient()</code> both give you a
						second connection.
					</Callout>
					<p style={paragraphSpacedStyle}>
						The narrow <code>RedisPublisher</code> +{' '}
						<code>RedisSubscriber</code> interfaces mean the adapter
						doesn't peer-dep a specific client — the README shows
						the wrapping for ioredis (EventEmitter-based) vs
						node-redis (callback-based).
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redis-metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redis Metrics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>bus.metrics()</code> returns cumulative counters
						since <code>createRedisClusterBus()</code>:
					</p>
					<DocsTable
						headers={['Counter', 'Meaning']}
						rows={redisCounters.map((row) => [
							<code style={tableCodeStyle}>{row.counter}</code>,
							row.meaning
						])}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="totalSubscribersReached is the canary"
						variant="info"
					>
						Redis treats "no subscribers" as success, so{' '}
						<code>PUBLISH</code> won't error when the cluster
						unwires. A drop to 0 when you expect peers means
						subscribers disconnected — replication lag, a network
						partition, or a region failover dropping the duplex.
						Pair with <code>engine.metrics()</code> (
						<code>totalSubscriptions</code> across instances) to
						spot the cluster halving silently.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="choosing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Choosing an Adapter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pick by deployment, not in the abstract — the adapter
						that rides infrastructure you already run is almost
						always the right one, and swapping later is one
						constructor change.
					</p>
					<DocsTable
						headers={['', 'sync-bus-pg', 'sync-bus-redis']}
						rows={adapterComparison.map((row) => [
							<strong>{row.criterion}</strong>,
							row.pg,
							row.redis
						])}
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
