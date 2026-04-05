import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	imageConfigBasic,
	imageConfigReference
} from '../../../data/documentation/imageOptDocsCode';
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
import { AllOptionsSection } from './AllOptionsSection';
import { AvifSupportSection } from './AvifSupportSection';
import { CachingSection } from './CachingSection';
import { HowItWorksSection } from './HowItWorksSection';
import { OptimizationEndpointSection } from './OptimizationEndpointSection';
import { RemoteImagesSection } from './RemoteImagesSection';

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
						id="image-optimization"
						style={h1Style(isMobileOrTablet)}
					>
						Image Optimization
					</h1>
					<p style={paragraphLargeStyle}>
						On-demand image resizing and format conversion powered
						by Sharp. Images are automatically converted to WebP or
						AVIF, resized to the requested width, cached to disk,
						and served with proper cache headers. Each framework has
						its own <code>{'<Image>'}</code> component: see the
						framework-specific Components page for usage.
					</p>
				</animated.div>

				<HowItWorksSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="configuration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add an <code>images</code> object to your{' '}
						<code>absolute.config.ts</code>. All fields are optional
						: the defaults work well for most apps.
					</p>
					<PrismPlus
						codeString={imageConfigBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<AllOptionsSection themeSprings={themeSprings} />

				<OptimizationEndpointSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="content-negotiation"
						level="h2"
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

				<CachingSection themeSprings={themeSprings} />

				<RemoteImagesSection themeSprings={themeSprings} />

				<AvifSupportSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="sharp"
						level="h2"
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
						id="type-reference"
						level="h2"
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
