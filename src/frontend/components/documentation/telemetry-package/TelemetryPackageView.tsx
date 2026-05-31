import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	telemetryAbsAttrs,
	telemetryCoverage,
	telemetryQuickStart,
	telemetryReadActive,
	telemetryTracerOrNoop,
	telemetryWhy,
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
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#telemetry-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#why', label: 'Why a separate package' },
	{ href: '#tracer-or-noop', label: 'tracerOrNoop' },
	{ href: '#with-span', label: 'withSpan' },
	{ href: '#abs-attrs', label: 'ABS_ATTRS' },
	{ href: '#read-active-trace', label: 'readActiveTraceId' },
	{ href: '#coverage', label: 'Substrate Coverage' }
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
						The shared OpenTelemetry layer every AbsoluteJS
						substrate package uses to emit spans without pulling{' '}
						<code>@opentelemetry/api</code> as a peer dep. A
						type-replicated OTel surface, a built-in noop tracer
						for "no provider wired," <code>ABS_ATTRS</code>{' '}
						semantic conventions, and{' '}
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
						Wire any standard OTel{' '}
						<code>TracerProvider</code> to a substrate package's{' '}
						<code>tracerProvider</code> option. With no provider
						set, the substrate package uses a noop tracer —
						spans are emitted regardless; the noop just drops
						them. No code path branches on "is OTel installed."
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
						The substrate needs to emit OTel spans without
						forcing every consumer to install OTel. This package
						is the shared layer — type-replicated structurally
						compatible types, a noop tracer that costs nothing
						when there's no provider, and shared semantic
						attribute names so spans across packages correlate.
					</p>
					<PrismPlus
						codeString={telemetryWhy}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						The canonical entry point — every substrate package
						starts with{' '}
						<code>
							tracerOrNoop(options.tracerProvider,
							'@absolutejs/&lt;pkg&gt;')
						</code>
						. Provider undefined returns the shared noop;
						provider defined returns{' '}
						<code>provider.getTracer(name, version)</code>.
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
						into one async wrapper. Records exceptions, sets the
						ERROR status, calls <code>span.end()</code> in
						finally — and returns whatever the wrapped fn
						returned.
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
						Shared semantic conventions so spans across substrate
						packages use the same attribute keys.{' '}
						<code>abs.tenant</code> is universal; per-package
						keys cover sync, queue, runtime, router, secrets,
						audit.
					</p>
					<PrismPlus
						codeString={telemetryAbsAttrs}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
						line, audit event, error response). Dynamic import
						of <code>@opentelemetry/api</code> keeps the
						package peer-dep-free; returns{' '}
						<code>undefined</code> when no provider is wired.
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
						Substrate Coverage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						G2 closed across the substrate — every package below
						already calls <code>tracerOrNoop</code> and emits
						spans with <code>ABS_ATTRS</code> keys. Wire one
						<code>TracerProvider</code> on your app and every
						span lights up.
					</p>
					<PrismPlus
						codeString={telemetryCoverage}
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
