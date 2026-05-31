import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	clusterBusPg,
	clusterBusPgMetrics,
	clusterBusPgQuickStart,
	clusterBusPickEach,
	clusterBusRedis,
	clusterBusRedisMetrics,
	clusterBusRedisQuickStart,
	clusterBusWhy
} from '../../../data/documentation/clusterBusDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#cluster-bus-overview', label: 'Overview' },
	{ href: '#why', label: 'Why a cluster bus' },
	{ href: '#pg-quick-start', label: 'Postgres Quick Start' },
	{ href: '#pg-adapter', label: 'Postgres Adapter' },
	{ href: '#pg-metrics', label: 'Postgres Metrics' },
	{ href: '#redis-quick-start', label: 'Redis Quick Start' },
	{ href: '#redis-adapter', label: 'Redis Adapter' },
	{ href: '#redis-metrics', label: 'Redis Metrics' },
	{ href: '#pick-each', label: 'Pick each' }
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
						Multi-instance fan-out for{' '}
						<code>@absolutejs/sync</code>. Two first-party
						adapters speak the same{' '}
						<code>ClusterBus</code> interface — Postgres
						LISTEN/NOTIFY (with overflow spill) and Redis pub/sub
						(with native geo-replication). Pick by what you're
						already running.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why a cluster bus
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A single SyncEngine instance fans out to its own
						subscribers in-process. Multiple instances behind a
						load balancer don't see each other's writes without
						a bus.{' '}
						<code>engine.connectCluster(bus)</code> wires the
						commit stream to a bus so subscribers on any shard
						see writes from every shard.
					</p>
					<PrismPlus
						codeString={clusterBusWhy}
						language="markdown"
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
						overflow spill table for payloads above the 8KB
						NOTIFY cap.
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
						Three spill strategies for different durability /
						speed trade-offs. <code>bus.vacuum()</code> prunes
						old spill rows on a schedule the host controls — the
						adapter never delete-on-consume because{' '}
						<code>NOTIFY</code> broadcasts to every listener
						including the publisher's own.
					</p>
					<PrismPlus
						codeString={clusterBusPg}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						<code>bus.metrics()</code> tracks the inline /
						spilled split, fetch failures (vacuum racing the
						receiver), and per-side error counts. Healthy
						small-payload workloads have{' '}
						<code>publishedSpilled</code> near zero.
					</p>
					<PrismPlus
						codeString={clusterBusPgMetrics}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						<code>PUBLISH</code> /{' '}
						<code>SUBSCRIBE</code>. The subscriber MUST be a
						separate connection — Redis forbids other commands
						on a subscribed connection.
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
						No 8KB payload cap; lower latency at high subscriber
						counts; native geo-replication on managed Redis
						(Redis Cluster, ElastiCache Global Datastore,
						Memorystore, Upstash). At-most-once delivery — a
						disconnected subscriber misses messages while down.
						Pair with <code>engine.exportChangeLog()</code> for
						shard-reboot resume.
					</p>
					<PrismPlus
						codeString={clusterBusRedis}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						<code>totalSubscribersReached</code> sums Redis's{' '}
						<code>PUBLISH</code> return value across calls —
						use it as a "is the cluster still wired up" signal.
						A drop to 0 when you expect peers means a subscriber
						disconnect (replication lag, network partition).
					</p>
					<PrismPlus
						codeString={clusterBusRedisMetrics}
						language="markdown"
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
						Pick each
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Both adapters implement the same{' '}
						<code>ClusterBus</code> interface, so swap is one
						constructor change. The engine doesn't know which
						bus is underneath.
					</p>
					<PrismPlus
						codeString={clusterBusPickEach}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
