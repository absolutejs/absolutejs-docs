import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	assetsDirectory,
	assetsStatic
} from '../../../data/documentation/configDocsCode';
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
	{ href: '#assets-directory', label: 'Assets Directory' },
	{ href: '#static-plugin', label: 'Static Plugin' },
	{ href: '#asset-types', label: 'Asset Types' }
];

const AssetTypesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Images</strong>: PNG, JPG, SVG, WebP
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Fonts</strong>: WOFF, WOFF2, TTF, OTF
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Documents</strong>: PDF, TXT, JSON
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Media</strong>: MP4, WebM, MP3, WAV
		</li>
	</ul>
);

export const AssetsView = ({
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
					<h1 id="assets" style={h1Style(isMobileOrTablet)}>
						Assets
					</h1>
					<p style={paragraphLargeStyle}>
						Serve static assets like images, fonts, and files.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="assets-directory"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Assets Directory
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Configure an assets directory in your build for bundled
						assets:
					</p>
					<PrismPlus
						codeString={assetsDirectory}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="static-plugin"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Static Plugin
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use Elysia&apos;s static plugin to serve files from a
						public directory:
					</p>
					<PrismPlus
						codeString={assetsStatic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="asset-types"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Asset Types
					</AnchorHeading>
					<AssetTypesList />
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
