import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	sitemapZeroConfig,
	sitemapOutput,
	sitemapCustomConfig,
	sitemapDynamicRoutes,
	sitemapTypeReference
} from '../../../data/documentation/sitemapDocsCode';
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
					<h1 style={h1Style(isMobileOrTablet)} id="sitemap">
						Sitemap
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS automatically generates a sitemap.xml for
						your site. No plugin, no manual route list — it
						discovers your pages on server start.
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
						When your server starts, AbsoluteJS automatically:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Discovers all GET routes
							</strong>{' '}
							— reads every route registered on your Elysia app
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Identifies pages
							</strong>{' '}
							— sends a HEAD request to each route and checks if
							it returns <code>text/html</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Filters non-pages
							</strong>{' '}
							— API endpoints, static assets, wildcard routes, and
							parameterized routes are excluded automatically
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Writes sitemap.xml
							</strong>{' '}
							— generates the XML and writes it to the build
							directory where the static file server picks it up
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						This runs in the background and does not block server
						startup. The sitemap is available at{' '}
						<code>/sitemap.xml</code> as soon as generation
						completes.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="zero-config"
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
						level="h2"
						id="example-output"
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

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="configuration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add a <code>sitemap</code> object to your{' '}
						<code>absolute.config.ts</code> to customize the output.
						All fields are optional.
					</p>
					<PrismPlus
						codeString={sitemapCustomConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>baseUrl</strong> —
							overrides the auto-detected origin. Use this in
							production when behind a reverse proxy or load
							balancer where the internal URL differs from the
							public one.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								defaultChangefreq
							</strong>{' '}
							— how often pages typically change. Defaults to{' '}
							<code>"weekly"</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>defaultPriority</strong>{' '}
							— relative importance of pages on your site (0.0 to
							1.0). Defaults to <code>0.8</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>overrides</strong> —
							per-route settings for changefreq, priority, and
							lastmod.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="exclude-routes"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Excluding Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use the <code>exclude</code> array to keep specific
						routes out of the sitemap. Supports exact string matches
						and regular expressions.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Exact strings</strong> —{' '}
							<code>"/admin"</code> excludes only that path
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Regex patterns</strong>{' '}
							— <code>{'/^\\/internal/'}</code> excludes all
							routes starting with <code>/internal</code>
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						API endpoints, wildcard routes, and parameterized routes
						(containing <code>*</code> or <code>:</code>) are always
						excluded automatically.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="dynamic-routes"
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
						level="h2"
						id="type-reference"
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
