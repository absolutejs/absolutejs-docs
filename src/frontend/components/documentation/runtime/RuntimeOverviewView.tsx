import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	runtimeBackoff,
	runtimeHibernation,
	runtimeObservation,
	runtimeQuickStart,
	runtimeRestartDrain
} from '../../../data/documentation/runtimeDocsCode';
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

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#runtime-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#hibernation', label: 'Hibernation' },
	{ href: '#backoff', label: 'Spawn Backoff' },
	{ href: '#restart-drain', label: 'Restart & Drain' },
	{ href: '#observation', label: 'CPU + RSS Observation' }
];

export const RuntimeOverviewView = ({
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
					<h1 id="runtime-overview" style={h1Style(isMobileOrTablet)}>
						Runtime
					</h1>
					<p style={paragraphLargeStyle}>
						Run many isolated Bun apps on one host. Wraps{' '}
						<code>Bun.spawn</code> so that "run this tenant's{' '}
						<code>bun run start</code> inside an idle-killing,
						metric-emitting child process" is one function call.
						Built for teams running many small Bun apps in
						production on their own infrastructure.
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
						<code>createRuntime()</code> returns a pool. The first
						<code>ensure(key)</code> call spawns the tenant's
						process, waits for HTTP readiness on the bound port, and
						returns the live <code>Tenant</code> handle. Subsequent
						calls reuse the running process; <code>touch(key)</code>
						defers the idle-kill clock.
					</p>
					<PrismPlus
						codeString={runtimeQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hibernation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hibernation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Hibernation is{' '}
						<strong>idle-kill at the process layer</strong>. Bun has
						no shipped process-level snapshot/resume primitive as of
						2026; when it lands, an opt-in
						<code>hibernate: 'process-snapshot'</code> mode joins
						idle-kill as the default. The current default trades
						wake latency (50-200ms cold spawn) for multi-tenant
						economics — a thousand idle tenants cost a small finite
						RSS, not a thousand running processes.
					</p>
					<PrismPlus
						codeString={runtimeHibernation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="backoff"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Spawn Back-off
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A spawn that fails (the spawn fn threw, readiness timed
						out) records per-key{' '}
						<code>{'{ attempt, retryAt, lastError }'}</code> and the
						next <code>ensure(key)</code> throws fast until{' '}
						<code>retryAt</code>. After <code>maxFailures</code>{' '}
						consecutive failures, the key stays refused until{' '}
						<code>clearBackoff(key)</code>. Without this, a broken
						tenant thrashes the host with rapid spawn retries —
						exactly the pattern that takes down nearby tenants.
					</p>
					<PrismPlus
						codeString={runtimeBackoff}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="restart-drain"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Restart, Drain & Exit Reasons
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>restart(key)</code> kills + spawns fresh in one
						call — for deploys that swap a tenant to a new release.{' '}
						<code>drain()</code> refuses new <code>ensure()</code>{' '}
						spawns while existing tenants keep running, for graceful
						shard shutdown. Every exit transition carries a
						structured <code>reason</code> so your metering or ops
						tooling can decide whether to charge, retry, or alert.
					</p>
					<PrismPlus
						codeString={runtimeRestartDrain}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="observation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CPU + RSS Observation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						On Linux, the sweeper reads{' '}
						<code>/proc/&lt;pid&gt;/stat</code> (utime + stime) and{' '}
						<code>/proc/&lt;pid&gt;/status</code> (VmRSS) per
						running tenant on a configurable interval and emits{' '}
						<code>{`{ type: 'observation', cpuMs, rssBytes }`}</code>{' '}
						via <code>onMetrics</code>. This is the per-tenant data{' '}
						<code>@absolutejs/metering</code> consumes to attribute
						idle hibernation cost precisely — without it,{' '}
						<code>processCpuMs</code> would always be zero.
					</p>
					<PrismPlus
						codeString={runtimeObservation}
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
