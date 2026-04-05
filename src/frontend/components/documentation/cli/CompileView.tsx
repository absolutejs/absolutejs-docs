import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	compileCommand,
	compileOutput,
	compilePackageJson,
	compileRun
} from '../../../data/documentation/staticDocsCode';
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
import { CompileCliOptions } from './CompileCliOptions';
import { CompileEmbeddedGrid } from './CompileEmbeddedGrid';

const tocItems: TocItem[] = [
	{ href: '#compiling', label: 'Compiling Your App' },
	{ href: '#running', label: 'Running the Binary' },
	{ href: '#whats-embedded', label: "What's Embedded" },
	{ href: '#cli-options', label: 'CLI Options' },
	{ href: '#package-scripts', label: 'Package Scripts' }
];

export const CompileView = ({
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
					<h1 id="compile" style={h1Style(isMobileOrTablet)}>
						Compile
					</h1>
					<p style={paragraphLargeStyle}>
						Compile your entire app into a single standalone
						executable: no runtime, no node_modules, no external
						files needed.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compiling"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Compiling Your App
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>absolute compile</code> command builds your
						assets, pre-renders all pages, and compiles everything
						into a single binary using Bun's{' '}
						<code>bun build --compile</code>:
					</p>
					<PrismPlus
						codeString={compileCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={compileOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="running"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Running the Binary
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary is fully self-contained. Copy it to
						any machine and run it: no Bun, no Node.js, no
						dependencies:
					</p>
					<PrismPlus
						codeString={compileRun}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="whats-embedded"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What's Embedded
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary includes everything your app needs
						to run:
					</p>
					<CompileEmbeddedGrid themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cli-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Options
					</AnchorHeading>
					<CompileCliOptions />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="package-scripts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Package Scripts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add these scripts to your <code>package.json</code> for
						easy access:
					</p>
					<PrismPlus
						codeString={compilePackageJson}
						language="json"
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
