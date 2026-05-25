import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	analyzeCommand,
	analyzeOutput
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
	{ href: '#baseline', label: 'Size diffs in CI' }
];

export const AnalyzeView = ({
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
					<h1 id="analyze" style={h1Style(isMobileOrTablet)}>
						absolute analyze
					</h1>
					<p style={paragraphLargeStyle}>
						Break down what your build ships — by category — and catch
						size regressions before they land.
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
						<code>absolute analyze</code> reads your build manifest and
						groups every shipped asset into categories — page bundles,
						hydration entries, client bundles, islands, shared chunks,
						and CSS — with a running total. It reads from disk, so it
						works on any build without a server. Add <code>--json</code>{' '}
						for the raw per-asset sizes.
					</p>
					<PrismPlus
						codeString={analyzeCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="baseline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Size diffs in CI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Run <code>absolute analyze --save</code> to record a
						baseline (<code>.absolute-size-baseline.json</code>, safe to
						commit). After that, every <code>analyze</code> shows the
						delta per category plus the biggest individual changes — so
						a pull request can surface <code>Dashboard +4 KB</code>{' '}
						instead of letting bundle bloat creep in unnoticed. Pair it
						with <code>ls --budget</code> to fail CI on a hard ceiling.
					</p>
					<PrismPlus
						codeString={analyzeOutput}
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
