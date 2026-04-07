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
import {
	streamingReactPrimitive,
	streamingReactRaw
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { ImagePropsSection } from './ImagePropsSection';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#head-component', label: 'Head Component' },
	{ href: '#jsonld-component', label: 'JsonLd Component' },
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-props', label: 'Image Props' },
	{ href: '#priority-preloading', label: 'Priority & Preloading' },
	{ href: '#fill-mode', label: 'Fill Mode' },
	{ href: '#streaming-components', label: 'Streaming Components' }
];

export const ReactComponentsView = ({
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
					<h1 id="react-components" style={h1Style(isMobileOrTablet)}>
						React Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides Head, JsonLd, Image, StreamSlot, and
						SuspenseSlot components for React. Import them from{' '}
						<code>@absolutejs/absolute/react/components</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="head-component"
						level="h2"
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
						id="jsonld-component"
						level="h2"
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
						the component: you only need to provide the schema
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
						id="image-component"
						level="h2"
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

				<ImagePropsSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="priority-preloading"
						level="h2"
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
						fold: it wastes bandwidth and can hurt performance.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fill-mode"
						level="h2"
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

				<section style={sectionStyle}>
					<AnchorHeading
						id="streaming-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming Components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						React has both layers of the out-of-order streaming
						model. Use <code>StreamSlot</code> when you want the raw
						transport and will provide fallback and resolved HTML
						yourself. Use <code>SuspenseSlot</code> when you want to
						author fallback and resolved UI directly in JSX.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>SuspenseSlot</code> is the framework-native
						surface. It still lowers into the same slot transport
						underneath, so slots can resolve out of DOM order while
						staying in document order.
					</p>
					<p style={paragraphSpacedStyle}>
						Raw transport with <code>StreamSlot</code>:
					</p>
					<PrismPlus
						codeString={streamingReactRaw}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Framework-native transport with{' '}
						<code>SuspenseSlot</code>:
					</p>
					<PrismPlus
						codeString={streamingReactPrimitive}
						language="tsx"
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
