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
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
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
					<h1 style={h1Style(isMobileOrTablet)} id="react-hooks">
						React Hooks
					</h1>
					<p style={paragraphLargeStyle}>
						Responsive design utilities for AbsoluteJS React
						applications. SSR-aware viewport breakpoints with
						user-agent detection for zero-layout-shift server
						rendering.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="use-media-query"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						useMediaQuery
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>useMediaQuery</code> hook provides
						viewport-based responsive breakpoints. It returns the
						current breakpoint name and two helper functions for
						checking size ranges.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>breakpoint</strong> —
							the current breakpoint name (<code>xs</code>,{' '}
							<code>sm</code>, <code>md</code>, <code>lg</code>,{' '}
							<code>xl</code>, <code>2xl</code>)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>isSizeOrGreater</strong>{' '}
							— returns <code>true</code> if the viewport is at or
							above the given breakpoint
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>isSizeOrLess</strong> —
							returns <code>true</code> if the viewport is at or
							below the given breakpoint
						</li>
					</ul>
					<PrismPlus
						codeString={hooksBasicUsage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="user-agent-provider"
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

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="breakpoints"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Breakpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default breakpoints match Tailwind CSS values. The
						hook checks viewport width against these thresholds and
						returns the largest breakpoint that the current width
						satisfies.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>xs</strong> — 0px
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>sm</strong> — 640px
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>md</strong> — 768px
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>lg</strong> — 1024px
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>xl</strong> — 1280px
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>2xl</strong> — 1536px
						</li>
					</ul>
					<PrismPlus
						codeString={hooksBreakpoints}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="ssr-usage"
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
						level="h2"
						id="api-reference"
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
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
