import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageHtmlUsage } from '../../../data/documentation/imageOptDocsCode';
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
						id="html-image-optimization"
					>
						HTML/HTMX Image Optimization
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS optimizes images in HTML and HTMX pages at
						build time using the <code>data-optimized</code>{' '}
						attribute. No JavaScript component needed.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						At build time, AbsoluteJS scans your HTML files for{' '}
						<code>&lt;img&gt;</code> tags with the{' '}
						<code>data-optimized</code> attribute and transforms
						them:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Rewrites src</strong> —
							replaces the original <code>src</code> with a URL
							pointing to the <code>/_absolute/image</code>{' '}
							optimization endpoint
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Adds srcset</strong> —
							generates a responsive <code>srcset</code> with all
							configured breakpoints
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Sets loading and decoding
							</strong>{' '}
							— adds <code>loading="lazy"</code> and{' '}
							<code>decoding="async"</code> for performance
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Removes data-optimized
							</strong>{' '}
							— the attribute is stripped from the output HTML
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="usage"
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

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="attributes"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Attributes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The following attributes are used by the build
						transform:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>width</strong> — used
							for srcset generation. Determines the maximum width
							for the responsive breakpoints.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>height</strong> —
							prevents cumulative layout shift (CLS) by reserving
							space before the image loads
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>sizes</strong> —
							responsive breakpoints hint for the browser.
							Controls which srcset entry the browser downloads.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>alt</strong> —
							alternative text for accessibility. Always include a
							descriptive alt attribute.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						The <code>data-optimized</code> attribute itself is
						removed from the output HTML. It is only used as a
						signal to the build transform.
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
						level="h2"
						id="htmx-support"
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
