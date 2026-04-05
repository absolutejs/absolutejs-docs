import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageHtmlUsage } from '../../../data/documentation/imageOptDocsCode';
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
import { AttributesSection } from './AttributesSection';
import { HowItWorksSection } from './HowItWorksSection';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#usage', label: 'Usage' },
	{ href: '#attributes', label: 'Attributes' },
	{ href: '#fill-mode', label: 'Fill Mode' },
	{ href: '#htmx-support', label: 'HTMX Support' }
];

export const HTMLImageOptView = ({
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
						id="html-image-optimization"
						style={h1Style(isMobileOrTablet)}
					>
						HTML/HTMX Image Optimization
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS optimizes images in HTML and HTMX pages at
						build time using the <code>data-optimized</code>{' '}
						attribute. No JavaScript component needed.
					</p>
				</animated.div>

				<HowItWorksSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add the <code>data-optimized</code> attribute to any{' '}
						<code>&lt;img&gt;</code> tag to opt in to image
						optimization:
					</p>
					<PrismPlus
						codeString={imageHtmlUsage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<AttributesSection themeSprings={themeSprings} />

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
						For fill-style images in HTML, use CSS on the parent
						container. Set the parent to{' '}
						<code>position: relative</code> with explicit
						dimensions, then style the image with{' '}
						<code>position: absolute</code>,{' '}
						<code>width: 100%</code>, <code>height: 100%</code>, and{' '}
						<code>object-fit: cover</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="htmx-support"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX Support
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The same <code>data-optimized</code> attribute works in
						HTMX pages. The build process scans both the HTML and
						HTMX directories, so any{' '}
						<code>&lt;img data-optimized&gt;</code> tag in either
						directory is transformed identically.
					</p>
					<p style={paragraphSpacedStyle}>
						No additional configuration is needed. HTMX partial
						responses that include optimized images will have their
						src and srcset attributes rewritten at build time just
						like full HTML pages.
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
