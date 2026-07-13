import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	islandsCommand,
	islandsOutput
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
	{ href: '#cross-framework', label: 'Cross-framework mounts' },
	{ href: '#sizes', label: 'Bundle sizes' }
];

export const IslandsView = ({
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
					<h1 id="islands" style={h1Style(isMobileOrTablet)}>
						absolute islands
					</h1>
					<p style={paragraphLargeStyle}>
						See every island across your whole app — which framework
						it&apos;s built in, how it hydrates, which pages mount
						it, and what it costs to ship.
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
						<code>absolute islands</code> reads your island registry
						and scans your pages — no build or running server
						required — and lists each island grouped with the pages
						that mount it and the hydration strategy of each mount (
						<code>load</code>, <code>idle</code>,{' '}
						<code>visible</code>, or <code>none</code>). Add{' '}
						<code>--sizes</code> to include the shipped JS per
						island from the build manifest, or <code>--json</code>{' '}
						for scripting.
					</p>
					<PrismPlus
						codeString={islandsCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cross-framework"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cross-framework mounts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						This is the part nothing else can show you: AbsoluteJS
						lets a React island live inside a Vue page, a Svelte
						island inside an HTML page, and so on.{' '}
						<code>absolute islands</code> flags every such mount
						with <code>→ in &lt;framework&gt;</code> and totals them
						in the summary, so you can see your cross-framework
						surface at a glance — one island reused everywhere,
						regardless of the host page&apos;s framework.
					</p>
					<TerminalFrame
						command={islandsOutput.command}
						output={islandsOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sizes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Bundle sizes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>--sizes</code>, each island shows the JS it
						ships to the client — the real cost of interactivity. It
						makes trade-offs obvious at a glance: a lightweight
						React or Svelte counter next to a heavier Angular one,
						so you can decide where the interactivity is worth its
						weight.
					</p>
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
