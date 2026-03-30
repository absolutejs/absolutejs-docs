import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageAngularUsage } from '../../../data/documentation/imageOptDocsCode';
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
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-inputs', label: 'Image Inputs' },
	{ href: '#template-usage', label: 'Template Usage' }
];

export const AngularComponentsView = ({
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
						id="angular-components"
					>
						Angular Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides an <code>abs-image</code> component
						for Angular. It is a standalone component that handles
						responsive image optimization.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="image-component"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Angular Image component uses the{' '}
						<code>abs-image</code> selector and is a standalone
						component. It provides responsive <code>srcset</code>{' '}
						generation, WebP/AVIF format negotiation, and on-demand
						optimization through the <code>/_absolute/image</code>{' '}
						endpoint.
					</p>
					<PrismPlus
						codeString={imageAngularUsage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="image-inputs"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Inputs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Angular Image component uses <code>input()</code>{' '}
						signals for each prop. All available inputs:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>src</strong> — path to
							the source image (required)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>alt</strong> —
							alternative text for accessibility (required)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>width</strong> —
							intrinsic width in pixels. Required unless{' '}
							<code>fill</code> is set.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>height</strong> —
							intrinsic height in pixels. Required unless{' '}
							<code>fill</code> is set.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>fill</strong> — when
							true, the image fills its parent container
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>quality</strong> —
							output quality from 1 to 100
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>sizes</strong> —
							responsive sizes attribute
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>priority</strong> —
							preload the image and disable lazy loading
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>loading</strong> —{' '}
							<code>"lazy"</code> or <code>"eager"</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>unoptimized</strong> —
							skip optimization and serve the original
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>style</strong> — inline
							styles
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>className</strong> — CSS
							class name
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="template-usage"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Template Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use the <code>abs-image</code> element directly in your
						Angular templates. Bind dynamic values with square
						bracket syntax and pass static strings as regular
						attributes:
					</p>
					<PrismPlus
						codeString={imageAngularUsage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The component generates the appropriate{' '}
						<code>srcset</code> and <code>sizes</code> attributes at
						render time and routes image requests through the{' '}
						<code>/_absolute/image</code> optimization endpoint.
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
