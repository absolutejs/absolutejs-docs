import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageVueUsage } from '../../../data/documentation/imageOptDocsCode';
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
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-props', label: 'Image Props' },
	{ href: '#fill-mode', label: 'Fill Mode' }
];

export const VueComponentsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="vue-components">
						Vue Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides an Image component for Vue. Import
						it from <code>@absolutejs/absolute/vue</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="image-component"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Vue <code>Image</code> component is a local
						component that uses the shared <code>imageUtils</code>{' '}
						module under the hood. It provides responsive{' '}
						<code>srcset</code> generation, WebP/AVIF format
						negotiation, and on-demand optimization through the{' '}
						<code>/_absolute/image</code> endpoint.
					</p>
					<PrismPlus
						codeString={imageVueUsage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="image-props"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Props
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Vue Image component accepts the same props as the
						React Image component:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>src</strong> — path to
							the source image (required)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>alt</strong> —
							alternative text for accessibility (required)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>width</strong> —
							intrinsic width in pixels. Required unless{' '}
							<code>fill</code> is set.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>height</strong> —
							intrinsic height in pixels. Required unless{' '}
							<code>fill</code> is set.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>fill</strong> — when
							true, the image fills its parent container
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>quality</strong> —
							output quality from 1 to 100
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>sizes</strong> —
							responsive sizes attribute
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>priority</strong> —
							preload the image and disable lazy loading
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>placeholder</strong> —
							placeholder strategy while loading
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>blurDataURL</strong> —
							base64 data URL for blur placeholder
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>loading</strong> —{' '}
							<code>"lazy"</code> or <code>"eager"</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>unoptimized</strong> —
							skip optimization and serve the original
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>style</strong> — inline
							styles
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>className</strong> — CSS
							class name
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onLoad</strong> —
							callback when the image finishes loading
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onError</strong> —
							callback when the image fails to load
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="fill-mode"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fill Mode
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When <code>fill</code> is set, the image uses absolute
						positioning to fill its parent container. You do not
						need to provide <code>width</code> or{' '}
						<code>height</code>. The parent must have{' '}
						<code>position: relative</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						Note that Vue's <code>Teleport</code> component has
						limitations with SSR — it cannot teleport to elements
						that don't exist in the server-rendered HTML. The Image
						component handles preload link injection without
						Teleport, so priority images work correctly during SSR.
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
