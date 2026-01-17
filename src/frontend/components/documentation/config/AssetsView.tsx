import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	assetsDirectory,
	assetsStatic
} from '../../../data/documentation/configDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#assets-directory', label: 'Assets Directory' },
	{ href: '#static-plugin', label: 'Static Plugin' },
	{ href: '#asset-types', label: 'Asset Types' }
];

export const AssetsView = ({
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
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="assets">
						Assets
					</h1>
					<p style={paragraphLargeStyle}>
						Serve static assets like images, fonts, and files.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="assets-directory"
					>
						Assets Directory
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="static-plugin"
					>
						Static Plugin
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="asset-types"
					>
						Asset Types
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Images</strong>: PNG,
							JPG, SVG, WebP
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Fonts</strong>: WOFF,
							WOFF2, TTF, OTF
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Documents</strong>: PDF,
							TXT, JSON
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Media</strong>: MP4,
							WebM, MP3, WAV
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
