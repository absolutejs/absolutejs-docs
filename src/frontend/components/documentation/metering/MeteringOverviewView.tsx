import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	meteringQuickStart,
	meteringRolling,
	meteringSinks,
	meteringSnapshot
} from '../../../data/documentation/meteringDocsCode';
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
	{ href: '#metering-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#rolling', label: 'Rolling-Window Budgets' },
	{ href: '#sinks', label: 'Flushable Sinks' },
	{ href: '#snapshot', label: 'Snapshot & Restore' }
];

export const MeteringOverviewView = ({
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
					<h1 id="metering-overview" style={h1Style(isMobileOrTablet)}>
						Metering
					</h1>
					<p style={paragraphLargeStyle}>
						Per-tenant cost-attribution + budget enforcement for
						multi-tenant Bun runtimes. Consumes{' '}
						<code>handlerMetrics</code> from{' '}
						<code>@absolutejs/sync</code>, lifecycle events from{' '}
						<code>@absolutejs/runtime</code>, and periodic{' '}
						<code>observation</code> events; rolls them up per
						tenant; trips a fail-closed circuit when any per-tenant
						budget dimension is exceeded.
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
						The meter is wire-level — a couple of one-line
						integrations stitch your sync engine, runtime, and
						router together through it. The output: an
						<code>allow(tenant)</code> gate, a{' '}
						<code>usage(tenant)</code> rollup, and a fan-out to any
						sinks you've added.
					</p>
					<PrismPlus
						codeString={meteringQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rolling"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cumulative & Rolling-Window Budgets
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Cumulative budgets stick until <code>reset()</code> —
						good for "you've used up your free-tier CPU-seconds
						this month." Rolling-window budgets re-close automatically
						as events drain — good for "errors in the last 5
						minutes." Both can apply to the same tenant; the breaker
						trips if any rule fires.
					</p>
					<PrismPlus
						codeString={meteringRolling}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sinks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Flushable Sinks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A sink can be a function or an object with{' '}
						<code>{`{ ingest, flush?, close? }`}</code>. On{' '}
						<code>dispose()</code> the meter awaits every sink's{' '}
						<code>flush</code> in order, then every{' '}
						<code>close</code>. A throwing flush is logged and
						swallowed; later sinks still flush. That posture is
						what batched adapters (Stripe Metered, Influx,
						ClickHouse) need to not drop the last few events on a
						shard shutdown.
					</p>
					<PrismPlus
						codeString={meteringSinks}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="snapshot"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Snapshot & Restore
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Serializable point-in-time state. The control plane
						writes a snapshot to disk before a shard reboot and
						restores it after — the bill doesn't reset to zero. The
						snapshot captures usage, tripped state, rolling-window
						state, AND the last-observation cpuMs baseline so the
						next observation charges a delta (not the cumulative-
						since-process-start value).
					</p>
					<PrismPlus
						codeString={meteringSnapshot}
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
