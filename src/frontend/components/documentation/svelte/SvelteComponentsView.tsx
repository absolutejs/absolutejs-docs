import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	headSvelteBasic,
	jsonLdSvelteBasic
} from '../../../data/documentation/componentsDocsCode';
import { imageSvelteUsage } from '../../../data/documentation/imageOptDocsCode';
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
	{ href: '#head-component', label: 'Head Component' },
	{ href: '#jsonld-component', label: 'JsonLd Component' },
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-props', label: 'Image Props' }
];

export const SvelteComponentsView = ({
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
					<h1
						style={h1Style(isMobileOrTablet)}
						id="svelte-components"
					>
						Svelte Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides Head, JsonLd, and Image components
						for Svelte. Import them from their respective module
						paths.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="head-component"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Head Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>Head</code> component renders meta tags, Open
						Graph tags, Twitter Cards, canonical URLs, and robots
						directives. Import it from{' '}
						<code>
							@absolutejs/absolute/svelte/components/Head.svelte
						</code>
						.
					</p>
					<PrismPlus
						codeString={headSvelteBasic}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="jsonld-component"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						JsonLd Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>JsonLd</code> component renders structured
						data as a{' '}
						<code>&lt;script type="application/ld+json"&gt;</code>{' '}
						tag. The <code>@context</code> is automatically added.
						Import it from{' '}
						<code>
							@absolutejs/absolute/svelte/components/JsonLd.svelte
						</code>
						.
					</p>
					<PrismPlus
						codeString={jsonLdSvelteBasic}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

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
						The Svelte <code>Image</code> component is a local
						component that uses the shared <code>imageUtils</code>{' '}
						module under the hood. It provides responsive{' '}
						<code>srcset</code> generation, WebP/AVIF format
						negotiation, and on-demand optimization.
					</p>
					<PrismPlus
						codeString={imageSvelteUsage}
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
						The Svelte Image component accepts the same props as the
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
							styles (string in Svelte)
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
