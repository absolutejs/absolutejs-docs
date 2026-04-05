import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	headSvelteBasic,
	jsonLdSvelteBasic
} from '../../../data/documentation/componentsDocsCode';
import { imageSvelteUsage } from '../../../data/documentation/imageOptDocsCode';
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
import { SvelteImagePropsList } from './SvelteImagePropsList';

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
						id="svelte-components"
						style={h1Style(isMobileOrTablet)}
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
						id="image-component"
						level="h2"
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
						id="image-props"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Props
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Svelte Image component accepts the same props as the
						React Image component:
					</p>
					<SvelteImagePropsList />
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
