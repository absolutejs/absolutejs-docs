import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	htmlAssetDetection,
	htmlBuild,
	htmlBuiltExample,
	htmlHandler,
	htmlSourceExample
} from '../../../data/documentation/htmlHtmxDocsCode';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#asset-detection', label: 'Asset Detection' }
];

export const HTMLView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="html">
						HTML
					</h1>
					<p style={paragraphLargeStyle}>
						Build HTML pages with automatic asset bundling.
						AbsoluteJS detects JS, TS, and CSS files, bundles them,
						and updates paths automatically.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-config"
					>
						Build Configuration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Add HTML to your build by specifying the directory
						containing your HTML files:
					</p>
					<PrismPlus
						codeString={htmlBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="page-handler"
					>
						Page Handler
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Pass the path to the built HTML file to{' '}
						<code>handleHTMLPageRequest</code>:
					</p>
					<PrismPlus
						codeString={htmlHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="how-it-works"
					>
						How It Works
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Write your HTML with relative paths to your scripts and
						stylesheets:
					</p>
					<PrismPlus
						codeString={htmlSourceExample}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						During the build process, AbsoluteJS detects all
						referenced assets, bundles them, and rewrites the paths
						to point to the built files:
					</p>
					<PrismPlus
						codeString={htmlBuiltExample}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="asset-detection"
					>
						Asset Detection
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The build system automatically detects and processes
						assets referenced in your HTML:
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: 'repeat(3, 1fr)',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>JavaScript</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								<code>.js</code> files are bundled and minified
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>TypeScript</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								<code>.ts</code> files are compiled to JS and
								bundled
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>CSS</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								<code>.css</code> files are bundled and minified
							</p>
						</animated.div>
					</div>
					<PrismPlus
						codeString={htmlAssetDetection}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Hashed filenames
							</strong>
							: Built files include content hashes for cache
							busting
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Path rewriting</strong>:
							All asset paths are automatically updated to the
							build output
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Bundling</strong>:
							Assets are optimized and minified for production
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
