import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	imageConfigBasic,
	imageConfigFull,
	imageEndpointDirect,
	imageRemotePatterns,
	imageConfigReference
} from '../../../data/documentation/imageOptDocsCode';
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
	{ href: '#configuration', label: 'Configuration' },
	{ href: '#all-options', label: 'All Options' },
	{ href: '#endpoint', label: 'Optimization Endpoint' },
	{ href: '#content-negotiation', label: 'Content Negotiation' },
	{ href: '#caching', label: 'Caching' },
	{ href: '#remote-images', label: 'Remote Images' },
	{ href: '#avif', label: 'AVIF Support' },
	{ href: '#sharp', label: 'Sharp' },
	{ href: '#type-reference', label: 'Type Reference' }
];

export const ImageOptimizationView = ({
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
						id="image-optimization"
					>
						Image Optimization
					</h1>
					<p style={paragraphLargeStyle}>
						On-demand image resizing and format conversion powered
						by Sharp. Images are automatically converted to WebP or
						AVIF, resized to the requested width, cached to disk,
						and served with proper cache headers. Each framework has
						its own <code>{'<Image>'}</code> component — see the
						framework-specific Components page for usage.
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
						AbsoluteJS registers a <code>/_absolute/image</code>{' '}
						endpoint automatically when your server starts. When a
						browser requests an optimized image:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Content negotiation
							</strong>{' '}
							— checks the browser's <code>Accept</code> header to
							determine the best output format (AVIF, WebP, or
							JPEG)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Cache lookup</strong> —
							checks the disk cache for a previously optimized
							version with matching URL, width, quality, and
							format
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Sharp optimization
							</strong>{' '}
							— if not cached, loads the source image,
							auto-rotates based on EXIF, resizes to the requested
							width (never upscales), and converts to the
							negotiated format
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Cache write</strong> —
							stores the optimized image to disk with metadata
							(ETag, TTL, content type)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Response</strong> —
							serves the image with <code>Cache-Control</code>,{' '}
							<code>ETag</code>, and <code>Vary: Accept</code>{' '}
							headers
						</li>
					</ul>
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
						Add an <code>images</code> object to your{' '}
						<code>absolute.config.ts</code>. All fields are optional
						— the defaults work well for most apps.
					</p>
					<PrismPlus
						codeString={imageConfigBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="all-options"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						All Options
					</AnchorHeading>
					<PrismPlus
						codeString={imageConfigFull}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>deviceSizes</strong> —
							breakpoints for device-width responsive images.
							Default:{' '}
							<code>
								[640, 750, 828, 1080, 1200, 1920, 2048, 3840]
							</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>imageSizes</strong> —
							breakpoints for fixed-width images. Default:{' '}
							<code>[16, 32, 48, 64, 96, 128, 256, 384]</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>formats</strong> —
							output formats in preference order. Default:{' '}
							<code>["webp"]</code>. Add <code>"avif"</code> for
							smaller files at slower encode speed.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>minimumCacheTTL</strong>{' '}
							— cache duration in seconds. Default:{' '}
							<code>60</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>quality</strong> —
							default quality 1-100. Default: <code>75</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>remotePatterns</strong>{' '}
							— allowed remote image origins for security.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>path</strong> — custom
							endpoint path. Default:{' '}
							<code>"/_absolute/image"</code>.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>unoptimized</strong> —
							globally disable optimization. Images served as-is.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="endpoint"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Optimization Endpoint
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The endpoint accepts three query parameters:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>url</strong> (required)
							— the source image path or a full remote URL
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>w</strong> (required) —
							target width in pixels. Must be one of the
							configured <code>deviceSizes</code> or{' '}
							<code>imageSizes</code> values.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>q</strong> (optional) —
							quality 1-100. Defaults to the configured quality.
						</li>
					</ul>
					<PrismPlus
						codeString={imageEndpointDirect}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="content-negotiation"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Content Negotiation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The endpoint reads the browser's <code>Accept</code>{' '}
						header to pick the best format. If the browser supports
						AVIF and it's in your <code>formats</code> config, AVIF
						is served. Otherwise WebP. Otherwise the source format.
						The response includes <code>Vary: Accept</code> so CDNs
						cache each variant separately.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="caching"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Caching
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Optimized images are cached to disk at{' '}
						<code>{'{buildDir}/.cache/images/'}</code>. Each entry
						is keyed by a SHA-256 hash of the URL, width, quality,
						and format. Cache files persist across server restarts.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>ETag</strong> — each
							cached image gets a unique ETag. Browsers send{' '}
							<code>If-None-Match</code> on subsequent requests
							and get 304 Not Modified.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>TTL</strong> — set via{' '}
							<code>minimumCacheTTL</code> (seconds). After
							expiry, the next request regenerates the image.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Cache-Control</strong> —
							responses include{' '}
							<code>
								public, max-age={'<TTL>'}, must-revalidate
							</code>
							.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="remote-images"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Remote Images
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						By default, only local images are allowed. To optimize
						remote images, configure <code>remotePatterns</code>{' '}
						with the allowed origins. This prevents the endpoint
						from being used as an open proxy.
					</p>
					<PrismPlus
						codeString={imageRemotePatterns}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>hostname</strong> —
							supports wildcards: <code>"*.example.com"</code>{' '}
							matches <code>cdn.example.com</code>, etc.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>pathname</strong> —
							supports glob prefixes: <code>"/photos/**"</code>{' '}
							matches any path starting with <code>/photos/</code>
							.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="avif"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AVIF Support
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AVIF delivers ~20-30% smaller files than WebP but
						encoding is ~50x slower. AbsoluteJS handles this with
						async pre-generation:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Add <code>"avif"</code> to your <code>formats</code>{' '}
							array before <code>"webp"</code>
						</li>
						<li style={listItemStyle}>
							First request: browser gets WebP immediately
						</li>
						<li style={listItemStyle}>
							Background: AVIF variant is generated and cached
						</li>
						<li style={listItemStyle}>
							Next request from an AVIF-capable browser: served
							from cache instantly
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="sharp"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sharp
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sharp is an optional peer dependency that wraps libvips
						for fast native image processing. Install it with:
					</p>
					<PrismPlus
						codeString="bun add sharp"
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If Sharp is not installed, the optimization endpoint
						serves images unoptimized (original format and size)
						with a one-time console warning. This lets you develop
						without Sharp and add it when you're ready for
						production optimization.
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
						codeString={imageConfigReference}
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
