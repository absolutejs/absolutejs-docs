import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	htmlAssetDetection,
	htmlBuild,
	htmlBuiltExample,
	htmlHandler,
	htmlSourceExample
} from '../../../data/documentation/htmlHtmxDocsCode';
import {
	streamingRawHtmlExample,
	streamingRawHtmlTemplate
} from '../../../data/documentation/streamingDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { AssetTypeCards } from './AssetTypeCards';
import { AssetFeatureList } from './AssetFeatureList';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#asset-detection', label: 'Asset Detection' },
	{ href: '#out-of-order-streaming', label: 'Out-of-Order Streaming' }
];

export const HTMLOverviewView = ({
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
					<h1 id="html" style={h1Style(isMobileOrTablet)}>
						HTML
					</h1>
					<p style={paragraphLargeStyle}>
						Build HTML pages with automatic asset bundling and raw
						out-of-order streaming support.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
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
					<AnchorHeading
						id="page-handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
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
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
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
					<AnchorHeading
						id="asset-detection"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Asset Detection
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build system automatically detects and processes
						assets referenced in your HTML:
					</p>
					<AssetTypeCards themeSprings={themeSprings} />
					<PrismPlus
						codeString={htmlAssetDetection}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<AssetFeatureList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="out-of-order-streaming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Out-of-Order Streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTML uses the raw streaming transport directly, and the
						server stays explicit: pass <code>streamingSlots</code>{' '}
						to <code>handleHTMLPageRequest</code> while the document
						renders stable fallback placeholders.
					</p>
					<PrismPlus
						codeString={streamingRawHtmlTemplate}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The route passes the explicit streaming slot
						definitions:
					</p>
					<PrismPlus
						codeString={streamingRawHtmlExample}
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
