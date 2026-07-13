import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	telemetryQuickStart,
	telemetryReadActive,
	telemetryTracerOrNoop,
	telemetryWithSpan
} from '../../../data/documentation/telemetryPackageDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#telemetry-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#why', label: 'Why a separate package' },
	{ href: '#tracer-or-noop', label: 'tracerOrNoop' },
	{ href: '#with-span', label: 'withSpan' },
	{ href: '#abs-attrs', label: 'ABS_ATTRS' },
	{ href: '#read-active-trace', label: 'readActiveTraceId' },
	{ href: '#coverage', label: 'Instrumented Packages' }
];

type WhyCard = {
	description: string;
	title: string;
};

const whyCards: WhyCard[] = [
	{
		description:
			'The Tracer / Span / TracerProvider types match @opentelemetry/api structurally — a NodeTracerProvider plugs in without an adapter, and @opentelemetry/api is never a peer dep.',
		title: 'Type-replicated OTel surface'
	},
	{
		description:
			'Calling startSpan() without a provider is a no-allocation pass-through that returns no-op spans. tracerOrNoop(provider, name) is the single entry point.',
		title: 'Built-in noop tracer'
	},
	{
		description:
			'Standard attribute names (abs.tenant, abs.engine.id, abs.collection, …) so spans from different packages correlate via consistent keys.',
		title: 'ABS_ATTRS semantic conventions'
	}
];

type WhyCardItemProps = WhyCard & {
	themeSprings: ThemeSprings;
};

const WhyCardItem = ({
	description,
	themeSprings,
	title
}: WhyCardItemProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				fontWeight: 600,
				marginBottom: '0.5rem'
			}}
		>
			{title}
		</p>
		<p
			style={{
				fontSize: '0.95rem',
				lineHeight: 1.6
			}}
		>
			{description}
		</p>
	</animated.div>
);

const absAttrRows: DocsTableCell[][] = [
	[
		{ code: 'abs.tenant' },
		'all',
		'Tenant / shard key. Carried on every span when available.'
	],
	[{ code: 'abs.shard.id' }, 'all', 'Cluster member id.'],
	[{ code: 'abs.engine.id' }, 'sync', 'Sync engine instance id.'],
	[
		{ code: 'abs.collection' },
		'sync',
		'Collection the change or subscription targets.'
	],
	[{ code: 'abs.mutation' }, 'sync', 'Mutation name being run.'],
	[
		{ code: 'abs.mutation.attempt' },
		'sync',
		'Retry attempt number for the mutation.'
	],
	[
		{ code: 'abs.subscription.id' },
		'sync',
		'Subscription the span belongs to.'
	],
	[
		{ code: 'abs.batch.size' },
		'sync',
		'Number of changes in an applyChangeBatch.'
	],
	[
		{ code: 'abs.cluster.origin' },
		'sync',
		'Cluster member a replicated change originated from.'
	],
	[{ code: 'abs.job.id' }, 'queue', 'Id of the job being processed.'],
	[{ code: 'abs.job.kind' }, 'queue', 'Job kind from the typed registry.'],
	[{ code: 'abs.job.attempt' }, 'queue', 'Current attempt number.'],
	[
		{ code: 'abs.job.max_attempts' },
		'queue',
		'Attempt budget before dead-letter.'
	],
	[{ code: 'abs.worker.id' }, 'queue', 'Worker that claimed the job.'],
	[{ code: 'abs.runtime.key' }, 'runtime', 'Key of the managed process.'],
	[{ code: 'abs.runtime.pid' }, 'runtime', 'Pid of the spawned process.'],
	[{ code: 'abs.runtime.port' }, 'runtime', 'Port the process is bound to.'],
	[{ code: 'abs.runtime.exit_reason' }, 'runtime', 'Why the process exited.'],
	[
		{ code: 'abs.runtime.readiness_ms' },
		'runtime',
		'Milliseconds from spawn to readiness.'
	],
	[{ code: 'abs.route.shard' }, 'router', 'Shard the request was routed to.'],
	[{ code: 'abs.route.decision' }, 'router', 'Routing decision taken.'],
	[
		{ code: 'abs.secret.name' },
		'secrets',
		'Name of the secret (never the value).'
	],
	[
		{ code: 'abs.secret.fingerprint' },
		'secrets',
		'Fingerprint of the secret value.'
	],
	[{ code: 'abs.audit.kind' }, 'audit', 'Kind of the audit event.']
];

const coverageRows: DocsTableCell[][] = [
	[
		{ code: '@absolutejs/sync' },
		'sync.runMutation, sync.subscribe, sync.applyChange, sync.cluster.publish'
	],
	[
		{ code: '@absolutejs/queue' },
		'queue.enqueue, queue.worker.process, queue.worker.retry'
	],
	[
		{ code: '@absolutejs/runtime' },
		'runtime.spawn, runtime.exit, runtime.health-check'
	],
	[
		{ code: '@absolutejs/router' },
		'router.route (decision attribute), router.shard-resolve'
	],
	[{ code: '@absolutejs/secrets' }, 'secrets.read, secrets.rotate'],
	[{ code: '@absolutejs/rate-limit' }, 'rate-limit.check, rate-limit.block'],
	[
		{ code: '@absolutejs/isolated-jsc' },
		'isolate.spawn, isolate.invoke, isolate.hibernate, isolate.resume'
	]
];

export const TelemetryPackageView = ({
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
						id="telemetry-overview"
						style={h1Style(isMobileOrTablet)}
					>
						Telemetry
					</h1>
					<p style={paragraphLargeStyle}>
						A shared OpenTelemetry layer any app or library can use
						to emit spans without pulling{' '}
						<code>@opentelemetry/api</code> as a peer dep — the same
						layer every AbsoluteJS package uses. A type-replicated
						OTel surface, a built-in noop tracer for "no provider
						wired," <code>ABS_ATTRS</code> semantic conventions, and{' '}
						<code>tracerOrNoop(provider, name)</code> as the
						canonical entry point.
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
						Wire any standard OTel <code>TracerProvider</code> to an
						instrumented package's <code>tracerProvider</code>{' '}
						option. With no provider set, the package uses a noop
						tracer — spans are emitted regardless; the noop just
						drops them. No code path branches on "is OTel
						installed."
					</p>
					<PrismPlus
						codeString={telemetryQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why a separate package
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A library that wants to emit OTel spans shouldn't force
						every consumer to install OTel.{' '}
						<code>@absolutejs/telemetry</code> is the shared layer
						that lets a package say "trace this if a provider is
						wired, otherwise no-op." Three properties make it work:
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobileOrTablet
								? '1fr'
								: '1fr 1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						{whyCards.map((card) => (
							<WhyCardItem
								description={card.description}
								key={card.title}
								themeSprings={themeSprings}
								title={card.title}
							/>
						))}
					</div>
					<p style={paragraphSpacedStyle}>
						Without the shared layer, every package would either
						reinvent noop spans inline or take{' '}
						<code>@opentelemetry/api</code> as a hard dependency.
						Both lose.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="tracer-or-noop"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						tracerOrNoop
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The canonical entry point — every instrumented package's
						tracer line looks the same. Provider undefined returns
						the shared noop tracer (zero allocations, no-op spans);
						provider defined returns{' '}
						<code>provider.getTracer(name, version)</code>. Any
						OTel-compatible provider works —{' '}
						<code>NodeTracerProvider</code>, the OpenTelemetry
						Collector SDK, or a custom one.
					</p>
					<PrismPlus
						codeString={telemetryTracerOrNoop}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="with-span"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						withSpan
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Collapses the repeated try / finally / status pattern
						into one async wrapper: OK status on resolve, exception
						recorded + ERROR status + rethrow on reject,{' '}
						<code>span.end()</code> in finally — and it returns
						whatever the wrapped fn returned. A{' '}
						<code>withSpanSync</code> variant covers the same
						pattern in synchronous code paths.
					</p>
					<PrismPlus
						codeString={telemetryWithSpan}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="abs-attrs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						ABS_ATTRS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Shared semantic conventions so spans across packages use
						the same attribute keys and correlate without
						per-package translation. <code>abs.tenant</code> is
						universal; per-package keys cover sync, queue, runtime,
						router, secrets, and audit.
					</p>
					<DocsTable
						columns={['Attribute', 'Package', 'Meaning']}
						rows={absAttrRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Use the TypeScript keys"
						variant="note"
					>
						Set attributes via{' '}
						<code>
							span.setAttribute(ABS_ATTRS.tenant, ctx.tenantId)
						</code>{' '}
						— <code>ABS_ATTRS.tenant</code> is type-checked; a raw{' '}
						<code>'abs.tenant'</code> string is a typo waiting to
						happen.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="read-active-trace"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						readActiveTraceId
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Get the active trace id from a non-OTel surface (log
						line, audit event, error response). The module specifier
						is built at runtime so bundlers don't statically resolve{' '}
						<code>@opentelemetry/api</code> as a hard dep; it
						returns <code>undefined</code> when OTel isn't installed
						or no active context exists. The same trick powers{' '}
						<code>tracerOrNoop</code>'s optional provider —
						telemetry stays peer-dep-free for consumers who don't
						run OTel.
					</p>
					<PrismPlus
						codeString={telemetryReadActive}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="coverage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Instrumented Packages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every package below already calls{' '}
						<code>tracerOrNoop</code> and emits spans with{' '}
						<code>ABS_ATTRS</code> keys. Wire one{' '}
						<code>TracerProvider</code> on your app and every span
						lights up.
					</p>
					<DocsTable
						columns={['Package', 'Spans emitted']}
						rows={coverageRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every span carries <code>abs.tenant</code> when
						available, so a single trace view can filter "show me
						everything for tenant-7."
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
