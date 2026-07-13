import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	lsBudgetCommand,
	lsBudgetOutput,
	lsCommand,
	lsOutput,
	lsSizesOutput
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
	{ href: '#output', label: 'Reading the output' },
	{ href: '#sizes', label: 'Bundle sizes' },
	{ href: '#budgets', label: 'Size budgets' }
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
						List your project&apos;s pages, grouped by framework —
						read straight from source, so it is always current.
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
						<code>absolute ls</code> discovers pages the same way
						the build does — scanning{' '}
						<code>&lt;frameworkDir&gt;/pages</code> for each
						framework in your config. Because it reads source, not
						build output, it never goes stale and works the same
						whether you use <code>dev</code>, <code>start</code>, or{' '}
						<code>compile</code> — including multi-service workspace
						configs. No build required.
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
						Each framework gets its own group with a page count.
						Every row is a page and its source file.{' '}
						<code>--json</code> emits the same data as structured
						groups for scripting.
					</p>
					<TerminalFrame
						command={lsOutput.command}
						output={lsOutput.output}
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
						Sizes live in build output, so they are opt-in. Pass{' '}
						<code>--sizes</code> to read a build&apos;s manifest and
						show each page&apos;s shipped size (server bundle +
						hydration entry + client/island bundles + CSS). Point it
						at a build with <code>--outdir</code> (defaults to your{' '}
						<code>buildDirectory</code>); a{' '}
						<code>built 4m ago</code> note keeps staleness visible.
					</p>
					<TerminalFrame
						command={lsSizesOutput.command}
						output={lsSizesOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="budgets"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Size budgets
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add <code>--budget</code> (alongside{' '}
						<code>--sizes</code>) to enforce a per-page ceiling.
						Pages over the limit are flagged in red and the command
						exits non-zero, so a runaway bundle fails CI instead of
						quietly shipping. Budgets accept <code>kb</code> or{' '}
						<code>mb</code> — for example{' '}
						<code>--budget 500kb</code> or <code>--budget 1mb</code>
						.
					</p>
					<PrismPlus
						codeString={lsBudgetCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<TerminalFrame
						command={lsBudgetOutput.command}
						output={lsBudgetOutput.output}
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
