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
	{ href: '#react-head', label: 'React' },
	{ href: '#vue-head', label: 'Vue' },
	{ href: '#svelte-head', label: 'Svelte' },
	{ href: '#htmx-head', label: 'HTMX' },
	{ href: '#html-head', label: 'HTML' },
	{ href: '#seo', label: 'SEO Considerations' }
];

const SeoChecklist = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Title tags</strong>: Unique, descriptive
			titles for each page
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Meta descriptions</strong>: Summarize
			page content for search results
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Open Graph tags</strong>: Control social
			media previews
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Canonical URLs</strong>: Prevent
			duplicate content issues
		</li>
	</ul>
);

export const HeadMetaTagsView = ({
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
					<h1 id="head-meta-tags" style={h1Style(isMobileOrTablet)}>
						Head &amp; Meta Tags
					</h1>
					<p style={paragraphLargeStyle}>
						Control page titles, meta tags, and SEO across different
						frameworks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react-head"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React
					</AnchorHeading>
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
					<AnchorHeading
						id="vue-head"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vue
					</AnchorHeading>
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
					<AnchorHeading
						id="svelte-head"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte
					</AnchorHeading>
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
					<AnchorHeading
						id="htmx-head"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX
					</AnchorHeading>
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
					<AnchorHeading
						id="html-head"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTML
					</AnchorHeading>
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
					<AnchorHeading
						id="seo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SEO Considerations
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Since AbsoluteJS uses server-side rendering, all meta
						tags are present in the initial HTML response: perfect
						for SEO.
					</p>
					<SeoChecklist />
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
