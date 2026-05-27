import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	otelWireup,
	zeroCost
} from '../../../../data/documentation/authObservabilityDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#otel', label: 'Wire up OpenTelemetry' },
	{ href: '#zero-cost', label: 'Zero cost when unused' }
];

export const AuthObservabilityView = ({
	currentPageId,
	onNavigate,
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
					<h1 id="auth-observability" style={h1Style(isMobileOrTablet)}>
						Observability
					</h1>
					<p style={paragraphLargeStyle}>
						OpenTelemetry instrumentation shipped in <code>0.35.0</code>.
						OTel is the CNCF vendor-neutral observability standard
						(OpenTracing + OpenCensus merger) — distinct from product
						analytics. Install <code>@opentelemetry/api</code> and an
						exporter; every authorize, callback, token, MFA challenge,
						webhook delivery, and FGA check shows up in your tracing
						backend with no other config.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="otel"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wire up OpenTelemetry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Spans carry attributes like <code>auth.client_id</code>,{' '}
						<code>auth.user_sub</code>, <code>auth.scopes</code>,{' '}
						<code>auth.grant_type</code>. Works with any OTLP-compatible
						backend: Jaeger, Tempo, Honeycomb, Datadog, Grafana, Lightstep.
					</p>
					<PrismPlus
						codeString={otelWireup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="zero-cost"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Zero cost when unused
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@opentelemetry/api</code> is an optional peer dependency
						loaded via dynamic import. Consumers who don&apos;t install it
						pay nothing at module load — the span calls short-circuit
						before the package is resolved.
					</p>
					<PrismPlus
						codeString={zeroCost}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
