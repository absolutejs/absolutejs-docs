import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	productionBuild,
	productionStart
} from '../../../data/documentation/deploymentDocsCode';
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
import { ProductionBuildFeatureCards } from './ProductionBuildFeatureCards';
import { ProductionBuildOptimizationTips } from './ProductionBuildOptimizationTips';
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
					<h1 id="production-build" style={h1Style(isMobileOrTablet)}>
						Production Build
					</h1>
					<p style={paragraphLargeStyle}>
						Build and run your AbsoluteJS application in production
						with optimized bundles and proper process management.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="building"
						level="h2"
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
					<ProductionBuildFeatureCards themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="running"
						level="h2"
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
						id="optimization"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Optimization Tips
					</AnchorHeading>
					<ProductionBuildOptimizationTips />
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
