import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	headReact,
	headVue,
	headSvelte,
	headHtmx,
	headHtml
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
	{ href: '#react-head', label: 'React' },
	{ href: '#vue-head', label: 'Vue' },
	{ href: '#svelte-head', label: 'Svelte' },
	{ href: '#htmx-head', label: 'HTMX' },
	{ href: '#html-head', label: 'HTML' },
	{ href: '#seo', label: 'SEO Considerations' }
];

export const HeadMetaTagsView = ({
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
					<h1 style={h1Style} id="head-meta-tags">
						Head &amp; Meta Tags
					</h1>
					<p style={paragraphLargeStyle}>
						Control page titles, meta tags, and SEO across different
						frameworks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="react-head"
					>
						React
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						React components render the full HTML document, giving
						you complete control over the head section:
					</p>
					<PrismPlus
						codeString={headReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="vue-head"
					>
						Vue
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Vue uses the headTag parameter in handleVuePageRequest:
					</p>
					<PrismPlus
						codeString={headVue}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="svelte-head"
					>
						Svelte
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Svelte components render the full HTML document, giving
						you complete control over the head section:
					</p>
					<PrismPlus
						codeString={headSvelte}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="htmx-head"
					>
						HTMX
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						HTMX pages are real .html files with full control over
						the head section:
					</p>
					<PrismPlus
						codeString={headHtmx}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="html-head"
					>
						HTML
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						HTML pages are real .html files with full control over
						the head section:
					</p>
					<PrismPlus
						codeString={headHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="seo"
					>
						SEO Considerations
					</animated.h2>
					<p style={paragraphLargeStyle}>
						Since AbsoluteJS uses server-side rendering, all meta
						tags are present in the initial HTML response—perfect
						for SEO.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Title tags</strong>:
							Unique, descriptive titles for each page
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Meta descriptions
							</strong>
							: Summarize page content for search results
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Open Graph tags</strong>
							: Control social media previews
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Canonical URLs</strong>:
							Prevent duplicate content issues
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
