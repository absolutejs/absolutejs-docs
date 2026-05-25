import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	lsCommand,
	lsOutput
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#output', label: 'Reading the output' }
];

export const LsView = ({
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
					<h1 id="ls" style={h1Style(isMobileOrTablet)}>
						absolute ls
					</h1>
					<p style={paragraphLargeStyle}>
						List every page, island, and asset your project builds —
						grouped by framework, with on-disk sizes.
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
						<code>absolute ls</code> reads the manifest at{' '}
						<code>build/manifest.json</code>, so run{' '}
						<code>absolute build</code> (or <code>absolute dev</code>)
						first. Add <code>--all</code> to include shared chunks in
						the listing, or <code>--json</code> for the structured
						entries — handy for bundle-size budgets in CI.
					</p>
					<PrismPlus
						codeString={lsCommand}
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
						Each framework gets its own group with a file count and
						subtotal. Every row is one built artifact, tagged by kind:{' '}
						<code>page</code> (the server bundle or static page),{' '}
						<code>index</code> (its client hydration entry),{' '}
						<code>client</code> and <code>island</code> bundles,{' '}
						<code>css</code>, and shared <code>chunk</code>s. Sizes are
						read straight from disk so you can spot what is shipping
						before you deploy.
					</p>
					<PrismPlus
						codeString={lsOutput}
						language="bash"
						showLineNumbers={false}
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
