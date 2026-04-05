import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageVueUsage } from '../../../data/documentation/imageOptDocsCode';
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
import { VueImagePropsSection } from './VueImagePropsSection';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-props', label: 'Image Props' },
	{ href: '#fill-mode', label: 'Fill Mode' }
];

export const VueComponentsView = ({
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
					<h1 id="vue-components" style={h1Style(isMobileOrTablet)}>
						Vue Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides an Image component for Vue. Import
						it from <code>@absolutejs/absolute/vue</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="image-component"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Vue <code>Image</code> component is a local
						component that uses the shared <code>imageUtils</code>{' '}
						module under the hood. It provides responsive{' '}
						<code>srcset</code> generation, WebP/AVIF format
						negotiation, and on-demand optimization through the{' '}
						<code>/_absolute/image</code> endpoint.
					</p>
					<PrismPlus
						codeString={imageVueUsage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<VueImagePropsSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<AnchorHeading
						id="fill-mode"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fill Mode
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When <code>fill</code> is set, the image uses absolute
						positioning to fill its parent container. You do not
						need to provide <code>width</code> or{' '}
						<code>height</code>. The parent must have{' '}
						<code>position: relative</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						Note that Vue's <code>Teleport</code> component has
						limitations with SSR: it cannot teleport to elements
						that don't exist in the server-rendered HTML. The Image
						component handles preload link injection without
						Teleport, so priority images work correctly during SSR.
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
