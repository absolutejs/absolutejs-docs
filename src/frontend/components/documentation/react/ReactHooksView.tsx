import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	hooksBasicUsage,
	hooksProvider,
	hooksBreakpoints,
	hooksSsrUsage,
	hooksApiReference
} from '../../../data/documentation/reactHooksDocsCode';
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
import { BreakpointsSection } from './BreakpointsSection';
import { UseMediaQuerySection } from './UseMediaQuerySection';

const tocItems: TocItem[] = [
	{ href: '#use-media-query', label: 'useMediaQuery' },
	{ href: '#user-agent-provider', label: 'UserAgentProvider' },
	{ href: '#breakpoints', label: 'Breakpoints' },
	{ href: '#ssr-usage', label: 'SSR Usage' },
	{ href: '#api-reference', label: 'API Reference' }
];

export const ReactHooksView = ({
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
					<h1 id="react-hooks" style={h1Style(isMobileOrTablet)}>
						React Hooks
					</h1>
					<p style={paragraphLargeStyle}>
						Responsive design utilities for AbsoluteJS React
						applications. SSR-aware viewport breakpoints with
						user-agent detection for zero-layout-shift server
						rendering.
					</p>
				</animated.div>

				<UseMediaQuerySection
					codeString={hooksBasicUsage}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<AnchorHeading
						id="user-agent-provider"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						UserAgentProvider
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>UserAgentProvider</code> is an SSR-aware
						context provider that passes the user-agent string to{' '}
						<code>useMediaQuery</code>. On the server, the hook
						reads the user-agent to infer whether the client is
						mobile or desktop and returns a sensible default
						breakpoint. On the client, it switches to real viewport
						measurement via <code>matchMedia</code>.
					</p>
					<PrismPlus
						codeString={hooksProvider}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<BreakpointsSection
					codeString={hooksBreakpoints}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ssr-usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SSR Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When rendering on the server, there is no{' '}
						<code>window</code> object to measure. The{' '}
						<code>UserAgentProvider</code> solves this by parsing
						the user-agent string to detect mobile devices. Mobile
						user-agents get <code>sm</code> as the default
						breakpoint, and desktop user-agents get <code>lg</code>.
						This means the server renders the correct layout variant
						on the first pass, avoiding layout shift when the client
						hydrates.
					</p>
					<PrismPlus
						codeString={hooksSsrUsage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="api-reference"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						API Reference
					</AnchorHeading>
					<PrismPlus
						codeString={hooksApiReference}
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
