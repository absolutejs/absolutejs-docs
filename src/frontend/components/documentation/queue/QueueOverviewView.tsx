import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	queueDefineJobs,
	queueMetrics,
	queueObservability,
	queuePostgresAdapter,
	queueQuickStart,
	queueRedisAdapter,
	queueRegistry,
	queueRoutes,
	queueStores,
	queueWorker
} from '../../../data/documentation/queueDocsCode';
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
	{ href: '#queue-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#define-jobs', label: 'defineJobs' },
	{ href: '#registry', label: 'Handlers & Registry' },
	{ href: '#stores', label: 'JobStore Contract' },
	{ href: '#worker', label: 'Worker' },
	{ href: '#metrics', label: 'Metrics & Drain' },
	{ href: '#routes', label: 'Admin Routes' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#postgres-adapter', label: 'Postgres Adapter' },
	{ href: '#redis-adapter', label: 'Redis Adapter' }
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
						Background-job queue for Bun + Elysia. Define jobs
						once via TypeBox schemas, validate at the boundary,
						dispatch by kind, run with pluggable stores
						(in-memory / Postgres / Redis). Strict at-least-once
						with stuck-lease reap, exponential-backoff retries,
						dead-letter on exhausted attempts, OTel spans per
						run.
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
						One definition is the single source of truth for both
						inferred payload types and runtime validation. The
						package re-exports TypeBox's <code>t</code> so every
						schema shares one TypeBox instance.
					</p>
					<PrismPlus
						codeString={queueDefineJobs}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						<code>createJobRegistry(jobs).on(kind, handler)</code>{' '}
						is fluent. Each handler receives the typed payload
						and a <code>JobContext</code> with{' '}
						<code>signal</code> for cooperative drain. Throws
						trigger retry; final attempt sends to{' '}
						<code>dead</code>.
					</p>
					<PrismPlus
						codeString={queueRegistry}
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
						JobStore Contract
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Small worker contract (claim / complete / fail /
						reap) plus optional admin methods (cancel / retry /
						list / get / countByStatus). Bundled in-memory; two
						sibling adapters for durable stores.
					</p>
					<PrismPlus
						codeString={queueStores}
						language="markdown"
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
						The Elysia plugin runs a worker by default. Pass{' '}
						<code>runWorker: false</code> to separate the enqueue
						surface from the worker process — the recommended
						split for prod.
					</p>
					<PrismPlus
						codeString={queueWorker}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						<code>worker.metrics()</code> is a point-in-time
						snapshot plus cumulative counters since{' '}
						<code>createQueueWorker()</code>.{' '}
						<code>drain()</code> stops accepting new claims;{' '}
						<code>stop()</code> halts the poll loop —
						symmetric with the rest of the substrate.
					</p>
					<PrismPlus
						codeString={queueMetrics}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						internal admin shell.
					</p>
					<PrismPlus
						codeString={queueRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						Every job run becomes a{' '}
						<code>queue.runJob</code> span carrying{' '}
						<code>ABS_ATTRS</code>-shaped attributes. Pair with{' '}
						<code>@absolutejs/audit</code>'s{' '}
						<code>recordQueueError</code> for an audit-log trail
						of every failed job.
					</p>
					<PrismPlus
						codeString={queueObservability}
						language="markdown"
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
						<code>@absolutejs/queue-postgres</code> ships
						drizzle + postgres.js (pooled) and Neon HTTP-driver
						(serverless) variants. Implements every optional{' '}
						<code>JobStore</code> method so admin routes light up
						automatically.
					</p>
					<PrismPlus
						codeString={queuePostgresAdapter}
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
						<code>@absolutejs/queue-redis</code> uses atomic Lua
						scripts for claim + reap so two workers can't
						race-claim the same job. Narrow{' '}
						<code>RedisCommandClient</code> interface — ioredis
						and node-redis v4+ both work.
					</p>
					<PrismPlus
						codeString={queueRedisAdapter}
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
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
