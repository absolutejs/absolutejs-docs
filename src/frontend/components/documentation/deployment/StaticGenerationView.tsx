import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	isrConfig,
	isrFlow,
	noStaticConfig,
	ssgConfigAll,
	ssgConfigRoutes,
	ssgOutput,
	staticConfigType
} from '../../../data/documentation/staticDocsCode';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#ssg', label: 'Static Site Generation' },
	{ href: '#routes', label: 'Choosing Routes' },
	{ href: '#isr', label: 'Incremental Static Regeneration' },
	{ href: '#how-isr-works', label: 'How ISR Works' },
	{ href: '#type-reference', label: 'Type Reference' }
];

export const StaticGenerationView = ({
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
						id="static-generation"
					>
						Static Generation
					</h1>
					<p style={paragraphLargeStyle}>
						Pre-render pages at build time for instant load times.
						Optionally re-render stale pages in the background with
						ISR.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="ssg"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Static Site Generation (SSG)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						By default, AbsoluteJS renders every page on each
						request using streaming SSR. With the{' '}
						<strong style={strongStyle}>static</strong> config,
						pages are pre-rendered at build time and served as
						cached HTML — no SSR overhead per request.
					</p>
					<p style={paragraphSpacedStyle}>
						Set <code>routes: "all"</code> to automatically crawl
						your site from <code>/</code> and pre-render every
						linked page:
					</p>
					<PrismPlus
						codeString={ssgConfigAll}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						When you run{' '}
						<strong style={strongStyle}>absolute start</strong>, the
						build step now includes pre-rendering:
					</p>
					<PrismPlus
						codeString={ssgOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: '1fr 1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1.5rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Instant Loads
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Pre-rendered HTML is served directly from disk —
								no SSR computation on each request.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Client Hydration
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Pages still hydrate on the client — same
								interactive experience, just faster initial
								load.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									SSR Fallback
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Routes not in the static config still use SSR on
								demand — mix static and dynamic pages freely.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="routes"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Choosing Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Instead of pre-rendering everything, you can specify
						exactly which routes to pre-render:
					</p>
					<PrismPlus
						codeString={ssgConfigRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Routes not listed here will use SSR at request time as
						usual. This is useful when some pages have user-specific
						content that can't be pre-rendered.
					</p>
					<p style={paragraphSpacedStyle}>
						With <code>"all"</code>, AbsoluteJS starts from{' '}
						<code>/</code> and follows every internal{' '}
						<code>&lt;a href&gt;</code> link to discover pages
						automatically. Any page that's linked from another page
						will be found and pre-rendered.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="isr"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Incremental Static Regeneration (ISR)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						SSG pages are rendered once at build time and stay
						static. With{' '}
						<strong style={strongStyle}>revalidate</strong>, pages
						automatically refresh in the background after a set
						interval:
					</p>
					<PrismPlus
						codeString={isrConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Without revalidate
							</strong>
							: pure SSG — pages are rendered once at build time
							and never change
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>With revalidate</strong>
							: ISR — stale pages are served immediately while a
							fresh version renders in the background
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-isr-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How ISR Works
					</AnchorHeading>
					<PrismPlus
						codeString={isrFlow}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The user never waits for a re-render. Stale pages are
						served instantly — the fresh version is ready for the
						next visitor. This gives you the performance of static
						pages with the freshness of SSR.
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
						codeString={staticConfigType}
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
