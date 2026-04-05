import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	sitemapZeroConfig,
	sitemapOutput,
	sitemapDynamicRoutes,
	sitemapTypeReference
} from '../../../data/documentation/sitemapDocsCode';
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
import { SitemapConfigurationSection } from './SitemapConfigurationSection';
import { SitemapExcludeRoutesSection } from './SitemapExcludeRoutesSection';
import { SitemapHowItWorksSection } from './SitemapHowItWorksSection';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#zero-config', label: 'Zero Config' },
	{ href: '#example-output', label: 'Example Output' },
	{ href: '#configuration', label: 'Configuration' },
	{ href: '#exclude-routes', label: 'Excluding Routes' },
	{ href: '#dynamic-routes', label: 'Dynamic Routes' },
	{ href: '#type-reference', label: 'Type Reference' }
];

export const SitemapView = ({
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
					<h1 id="sitemap" style={h1Style(isMobileOrTablet)}>
						Sitemap
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS automatically generates a sitemap.xml for
						your site. No plugin, no manual route list: it discovers
						your pages on server start.
					</p>
				</animated.div>

				<SitemapHowItWorksSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="zero-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Zero Config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sitemap generation is enabled automatically. No
						additional configuration is needed. AbsoluteJS writes
						the sitemap directly to the build directory.
					</p>
					<PrismPlus
						codeString={sitemapZeroConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="example-output"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Example Output
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The generated sitemap.xml follows the standard sitemap
						protocol and includes only routes that return HTML
						pages:
					</p>
					<PrismPlus
						codeString={sitemapOutput}
						language="xml"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<SitemapConfigurationSection themeSprings={themeSprings} />

				<SitemapExcludeRoutesSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="dynamic-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dynamic Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Parameterized routes like <code>/blog/:slug</code> can't
						be auto-discovered because AbsoluteJS doesn't know what
						slugs exist. Use the <code>routes</code> function to
						provide them. It can be async, so you can query a
						database or CMS.
					</p>
					<PrismPlus
						codeString={sitemapDynamicRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Routes returned by this function are added alongside the
						auto-discovered pages. They respect the same{' '}
						<code>exclude</code> patterns and <code>overrides</code>{' '}
						configuration.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="type-reference"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Reference
					</AnchorHeading>
					<PrismPlus
						codeString={sitemapTypeReference}
						language="typescript"
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
