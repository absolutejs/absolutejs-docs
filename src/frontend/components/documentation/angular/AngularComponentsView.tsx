import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { imageAngularUsage } from '../../../data/documentation/imageOptDocsCode';
import {
	streamingAngularPrimitive,
	streamingAngularRaw
} from '../../../data/documentation/streamingDocsCode';
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
import { ImageInputsList } from './ImageInputsList';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#image-component', label: 'Image Component' },
	{ href: '#image-inputs', label: 'Image Inputs' },
	{ href: '#template-usage', label: 'Template Usage' },
	{ href: '#streaming-components', label: 'Streaming Components' }
];

export const AngularComponentsView = ({
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
						id="angular-components"
						style={h1Style(isMobileOrTablet)}
					>
						Angular Components
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides <code>abs-image</code>, raw
						streaming slot components, and Angular-native{' '}
						<code>@defer</code> streaming integration.
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
						id="image-inputs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Image Inputs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Angular Image component uses <code>input()</code>{' '}
						signals for each prop. All available inputs:
					</p>
					<ImageInputsList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="template-usage"
						level="h2"
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

				<section style={sectionStyle}>
					<AnchorHeading
						id="streaming-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming Components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular has both layers of the streaming model. Use{' '}
						<code>abs-stream-slot</code> when you want the raw
						transport directly. Use Angular's <code>@defer</code>{' '}
						authoring surface when you want framework-native
						placeholder and resolved UI.
					</p>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS lowers <code>@defer</code> into the shared
						slot transport and routes the client handoff through
						Angular's own rendering model so streamed regions stay
						compatible with Angular's hydration rules.
					</p>
					<p style={paragraphSpacedStyle}>
						Raw transport with <code>abs-stream-slot</code>:
					</p>
					<PrismPlus
						codeString={streamingAngularRaw}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Framework-native transport with <code>@defer</code>:
					</p>
					<PrismPlus
						codeString={streamingAngularPrimitive}
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
