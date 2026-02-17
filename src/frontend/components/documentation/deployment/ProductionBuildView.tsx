import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	productionBuild,
	productionStart
} from '../../../data/documentation/deploymentDocsCode';
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
	{ href: '#building', label: 'Building for Production' },
	{ href: '#running', label: 'Running in Production' },
	{ href: '#optimization', label: 'Optimization Tips' }
];

export const ProductionBuildView = ({
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
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="production-build">
						Production Build
					</h1>
					<p style={paragraphLargeStyle}>
						Build and run your AbsoluteJS application in production
						with optimized bundles and proper process management.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="building"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Building for Production
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build command bundles all your frontend code,
						generates hashed asset filenames for cache busting, and
						creates the manifest file for asset lookup:
					</p>
					<PrismPlus
						codeString={productionBuild}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
									Bundled Assets
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								All frontend code is bundled and minified for
								optimal load times.
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
									Cache Busting
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Hashed filenames ensure browsers always get the
								latest version.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="running"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Running in Production
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Start your production server directly with Bun, or use a
						process manager like PM2 for automatic restarts and
						clustering:
					</p>
					<PrismPlus
						codeString={productionStart}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="optimization"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Optimization Tips
					</AnchorHeading>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Environment variables
							</strong>
							: Set NODE_ENV=production to enable optimizations
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Process manager</strong>
							: Use PM2 or systemd for automatic restarts and
							logging
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Reverse proxy</strong>:
							Put nginx or Caddy in front for SSL termination and
							caching
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Health checks</strong>:
							Add a /health endpoint for load balancer health
							checks
						</li>
					</ul>
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
