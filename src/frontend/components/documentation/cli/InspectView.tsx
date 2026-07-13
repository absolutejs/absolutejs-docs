import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	inspectCommand,
	inspectOutput
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { TerminalFrame } from '../../utils/TerminalFrame';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#output', label: 'Reading the output' }
];

export const InspectView = ({
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
					<h1 id="inspect" style={h1Style(isMobileOrTablet)}>
						absolute inspect
					</h1>
					<p style={paragraphLargeStyle}>
						A live request inspector for your dev server — every
						request, its status, and how long it took, as it
						happens.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With a dev server running, <code>absolute inspect</code>{' '}
						opens a live dashboard that refreshes as requests come
						in. Use <code>↑/↓</code> to select a request and the
						detail pane shows its status, query, request/response
						headers, and a per-lifecycle-phase timing breakdown
						(parse, handler, etc.) from{' '}
						<code>@elysiajs/server-timing</code> — so you see where
						the time actually went; press <code>q</code> to quit
						(the server keeps running). Piped or in CI it prints a
						one-shot snapshot instead, and <code>--json</code> emits
						the captured requests for scripting. The inspector is
						dev-only and adds nothing to a production build — for
						production distributed tracing, enable{' '}
						<code>telemetry</code> in{' '}
						<code>absolute.config.ts</code> to wire{' '}
						<code>@elysiajs/opentelemetry</code>.
					</p>
					<PrismPlus
						codeString={inspectCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="output"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reading the output
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each row is a request: time, method, path, status,
						duration, and response size. Methods and statuses are
						colored, and slow requests are highlighted so
						regressions jump out. Asset, HMR, and internal traffic
						is dimmed so your real page and API requests stand out,
						and the footer rolls up the request count plus average
						and p95 latency. It works by capturing every request
						through global lifecycle hooks on the dev runtime — no
						changes to your app required.
					</p>
					<TerminalFrame
						command={inspectOutput.command}
						output={inspectOutput.output}
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
