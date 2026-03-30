import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	headReactBasic,
	headReactFull,
	jsonLdReactBasic,
	jsonLdReactMultiple
} from '../../../data/documentation/componentsDocsCode';
import { imageReactUsage } from '../../../data/documentation/imageOptDocsCode';
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
	{ href: '#image-props', label: 'Image Props' },
	{ href: '#priority-preloading', label: 'Priority & Preloading' },
	{ href: '#fill-mode', label: 'Fill Mode' }
];

export const ReactComponentsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="react-components">
						React Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides Head, JsonLd, and Image components
						for React. Import them from{' '}
						<code>@absolutejs/absolute/react/components</code>.
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
						directives into the document <code>&lt;head&gt;</code>.
						It accepts a flat props object that maps directly to the
						underlying <code>Metadata</code> type.
					</p>
					<PrismPlus
						codeString={headReactBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For full control over SEO metadata, pass Open Graph,
						Twitter Card, and robots configuration:
					</p>
					<PrismPlus
						codeString={headReactFull}
						language="typescript"
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
						tag. The <code>@context</code> is automatically added by
						the component — you only need to provide the schema
						fields.
					</p>
					<PrismPlus
						codeString={jsonLdReactBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Pass an array to render multiple schemas in a single
						JSON-LD block:
					</p>
					<PrismPlus
						codeString={jsonLdReactMultiple}
						language="typescript"
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
						The <code>Image</code> component provides automatic
						responsive <code>srcset</code> generation, WebP/AVIF
						format negotiation, and on-demand image optimization
						through the <code>/_absolute/image</code> endpoint.
					</p>
					<PrismPlus
						codeString={imageReactUsage}
						language="typescript"
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
						All available props for the <code>Image</code>{' '}
						component:
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
							true, the image fills its parent container using
							absolute positioning
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>quality</strong> —
							output quality from 1 to 100
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>sizes</strong> —
							responsive sizes attribute for the browser
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
							<code>"lazy"</code> or <code>"eager"</code>.
							Defaults to <code>"lazy"</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>unoptimized</strong> —
							skip optimization and serve the original image
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>loader</strong> — custom
							function to generate the image URL
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>overrideSrc</strong> —
							override the resolved <code>src</code> on the
							rendered <code>&lt;img&gt;</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>fetchPriority</strong> —{' '}
							<code>"high"</code>, <code>"low"</code>, or{' '}
							<code>"auto"</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>crossOrigin</strong> —
							CORS setting for the image request
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>referrerPolicy</strong>{' '}
							— referrer policy for the image request
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>className</strong> — CSS
							class name
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>style</strong> — inline
							styles
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
						id="priority-preloading"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Priority & Preloading
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Setting <code>priority=true</code> on an Image component
						adds a <code>&lt;link rel="preload"&gt;</code> tag to
						the document head for the image. It also sets{' '}
						<code>loading="eager"</code> and{' '}
						<code>fetchPriority="high"</code> on the rendered{' '}
						<code>&lt;img&gt;</code> element.
					</p>
					<p style={paragraphSpacedStyle}>
						Use this for above-the-fold images like hero banners and
						LCP elements. Avoid setting priority on images below the
						fold — it wastes bandwidth and can hurt performance.
					</p>
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
						<code>position: relative</code> (or{' '}
						<code>absolute</code> / <code>fixed</code>).
					</p>
					<p style={paragraphSpacedStyle}>
						Use{' '}
						<code>
							style={'{'}
							{'{'} objectFit: 'cover' {'}'}
							{'}'}
						</code>{' '}
						or <code>objectFit: 'contain'</code> to control how the
						image scales within the container.
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
