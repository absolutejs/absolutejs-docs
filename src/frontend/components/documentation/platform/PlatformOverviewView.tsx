import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#platform-overview', label: 'Overview' },
	{ href: '#packages', label: 'The Packages' },
	{ href: '#how-they-compose', label: 'How They Compose' },
	{ href: '#related', label: 'Related' }
];

type PlatformPackage = {
	description: string;
	name: string;
	npm: string;
	version: string;
	viewId: string;
};

const platformPackages: PlatformPackage[] = [
	{
		description:
			'Run many isolated Bun apps on one host — spawn-or-reuse child processes with idle-kill, spawn back-off, and per-process CPU + RSS metrics.',
		name: 'Runtime',
		npm: '@absolutejs/runtime',
		version: '0.3.0',
		viewId: 'runtime-overview'
	},
	{
		description:
			'Route requests and WebSocket connections across backend shards — consistent hashing, per-tenant connection caps and rate limits, healthy-shard skip.',
		name: 'Router',
		npm: '@absolutejs/router',
		version: '0.3.0',
		viewId: 'router-overview'
	},
	{
		description:
			'Ship releases to any box you can exec + upload to — atomic symlink swap, release history, rollback, and a pluggable step pipeline.',
		name: 'Deploy',
		npm: '@absolutejs/deploy',
		version: '0.10.0',
		viewId: 'deploy-overview'
	},
	{
		description:
			'Broker credentials host-side — pluggable adapters, safe-to-log fingerprints, rotation, and redaction before text reaches a log sink.',
		name: 'Secrets',
		npm: '@absolutejs/secrets',
		version: '0.5.0',
		viewId: 'secrets-overview'
	},
	{
		description:
			'Attribute CPU, egress, and request cost per tenant, and trip a circuit breaker the moment a budget dimension is exceeded.',
		name: 'Metering',
		npm: '@absolutejs/metering',
		version: '0.1.0',
		viewId: 'metering-overview'
	},
	{
		description:
			'Turn a metering usage snapshot into invoice line items — plans, graduated tiers, free allowances, all in integer micros so float drift is impossible.',
		name: 'Billing',
		npm: '@absolutejs/billing',
		version: '0.2.1',
		viewId: 'billing-overview'
	},
	{
		description:
			'Evaluate pluggable signals (CPU, queue depth, latency) against a declarative policy and drive your own actuator to spawn, drain, or terminate instances.',
		name: 'Autoscaler',
		npm: '@absolutejs/autoscaler',
		version: '0.1.0',
		viewId: 'autoscaler-overview'
	},
	{
		description:
			'Expose /healthz and /readyz from composable named checks — per-check timeouts, worst-of-any status, and a standard JSON envelope.',
		name: 'Health',
		npm: '@absolutejs/health',
		version: '0.1.0',
		viewId: 'health-overview'
	},
	{
		description:
			'Config-file-driven secrets / env / deploy verbs at the terminal — the ops sibling to the absolute framework CLI.',
		name: 'Ops CLI',
		npm: '@absolutejs/cli',
		version: '0.1.0',
		viewId: 'cli-overview'
	},
	{
		description:
			'Heap-isolated JavaScriptCore sandbox for running untrusted code in Bun, with an isolated-vm-shaped API, hard memory limits, and timeouts.',
		name: 'isolated-jsc',
		npm: '@absolutejs/isolated-jsc',
		version: '0.11.0',
		viewId: 'isolated-jsc'
	}
];

const npmChipStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.08)',
	borderRadius: '0.375rem',
	display: 'inline-block',
	fontSize: '0.8rem',
	marginBottom: '0.6rem',
	maxWidth: '100%',
	overflowX: 'auto',
	padding: '0.2rem 0.5rem',
	whiteSpace: 'nowrap'
};

const versionBadgeStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.12)',
	borderRadius: '999px',
	fontSize: '0.7rem',
	fontWeight: 600,
	padding: '0.15rem 0.6rem'
};

type PlatformPackageCardProps = {
	entry: PlatformPackage;
	onNavigate: (pageId: string) => void;
	themeSprings: ThemeSprings;
};

const PlatformPackageCard = ({
	entry,
	onNavigate,
	themeSprings
}: PlatformPackageCardProps) => (
	<animated.div
		onClick={() => onNavigate(entry.viewId)}
		style={{
			...featureCardStyle(themeSprings),
			cursor: 'pointer'
		}}
	>
		<p
			style={{
				...paragraphSpacedStyle,
				alignItems: 'center',
				display: 'flex',
				gap: '0.6rem',
				marginBottom: '0.5rem'
			}}
		>
			<strong style={strongStyle}>{entry.name}</strong>
			<span style={versionBadgeStyle}>v{entry.version}</span>
		</p>
		<code style={npmChipStyle}>{entry.npm}</code>
		<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
			{entry.description}
		</p>
	</animated.div>
);

const composeSteps: StepFlowStep[] = [
	{
		actor: 'deploy',
		description:
			'Deploy ships a release — upload, install, build, atomic current symlink swap — and only reports green after verify passes.',
		title: 'Ship a release'
	},
	{
		actor: 'runtime',
		description:
			'Runtime runs the apps — each one in an idle-killing, metric-emitting child process, spawned on first request and reused after.',
		title: 'Run the tenants'
	},
	{
		actor: 'router',
		description:
			'Router routes the connections — consistent-hash tenant to shard, enforce connection caps and rate limits, skip unhealthy shards.',
		title: 'Route the traffic'
	},
	{
		actor: 'secrets',
		description:
			'Secrets brokers the credentials — resolve through an adapter, log fingerprints instead of plaintext, redact before log sinks.',
		title: 'Broker the credentials'
	},
	{
		actor: 'metering + billing',
		description:
			'Metering rolls up per-tenant usage and trips budgets; billing turns the usage snapshot into invoice line items.',
		title: 'Track the cost'
	},
	{
		actor: 'autoscaler',
		description:
			'Autoscaler compares signals like CPU and queue depth against a policy and asks your actuator to spawn or drain instances.',
		title: 'Scale the fleet'
	},
	{
		actor: 'health',
		description:
			'Health exposes /healthz and /readyz — deploy verify, load balancers, and drain workflows all gate on the same two probes.',
		title: 'Gate the rollout'
	}
];

type RelatedLink = {
	label: string;
	viewId: string;
};

const relatedLinks: RelatedLink[] = [
	{ label: 'Queue', viewId: 'queue-overview' },
	{ label: 'Dispatch', viewId: 'dispatch-overview' },
	{ label: 'Audit', viewId: 'audit-overview' },
	{ label: 'Telemetry', viewId: 'telemetry-overview' }
];

type RelatedLinkItemProps = {
	link: RelatedLink;
	onNavigate: (pageId: string) => void;
	suffix: string;
};

const RelatedLinkItem = ({
	link,
	onNavigate,
	suffix
}: RelatedLinkItemProps) => (
	<span>
		<a
			href="#"
			onClick={(event) => {
				event.preventDefault();
				onNavigate(link.viewId);
			}}
			style={{
				color: 'inherit',
				textDecoration: 'underline'
			}}
		>
			{link.label}
		</a>
		{suffix}
	</span>
);

export const PlatformOverviewView = ({
	themeSprings,
	onNavigate,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
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
						id="platform-overview"
						style={h1Style(isMobileOrTablet)}
					>
						Platform Tools
					</h1>
					<p style={paragraphLargeStyle}>
						The building blocks for running Bun apps in production
						on your own infrastructure — the same primitives that
						power AbsoluteJS hosting. Each package does one job
						behind a small API: deploy releases, run isolated
						processes, route connections, broker secrets, meter
						cost, scale a fleet, and probe health. Use one on its
						own, or compose the full stack.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="packages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Packages
					</AnchorHeading>
					<Callout
						themeSprings={themeSprings}
						title="Standalone packages"
						variant="info"
					>
						Every tool below is a standalone published package. None
						of them require AbsoluteJS hosting — or each other — to
						be useful; each works against plain Bun projects on your
						own machines.
					</Callout>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
						}}
					>
						{platformPackages.map((entry) => (
							<PlatformPackageCard
								entry={entry}
								key={entry.npm}
								onNavigate={onNavigate}
								themeSprings={themeSprings}
							/>
						))}
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-they-compose"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How They Compose
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The packages share deliberate seams rather than a
						framework: metering consumes lifecycle and observation
						events from the runtime, the router takes{' '}
						<code>meter.allow</code> as its one-line admission hook,
						billing prices a metering usage snapshot, deploy's
						verify step can probe the endpoints health exposes, and
						the CLI drives secrets and deploy from one config file.
						A typical production loop looks like this:
					</p>
					<StepFlow
						steps={composeSteps}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="related"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Related
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Four companion packages round out a production setup:{' '}
						{relatedLinks.map((link, index) => (
							<RelatedLinkItem
								key={link.viewId}
								link={link}
								onNavigate={onNavigate}
								suffix={
									index < relatedLinks.length - 1 ? ', ' : ''
								}
							/>
						))}
						. Queue gives you durable background jobs, Dispatch fans
						work out to workers, Audit records who did what, and
						Telemetry gets traces and metrics off the box.
					</p>
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
