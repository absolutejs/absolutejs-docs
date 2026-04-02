import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	vueUseAIStream,
	vueUseAIStreamReturn,
	vueProvide
} from '../../../data/documentation/aiFrameworkDocsCode';
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

const tocItems: TocItem[] = [
	{ href: '#use-ai-stream', label: 'useAIStream' },
	{ href: '#return-type', label: 'Return Type' },
	{ href: '#provide-inject', label: 'Provide / Inject' }
];

export const VueAIView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="vue-ai">
						Vue AI
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>useAIStream</code> composable connects Vue
						components to the AI streaming WebSocket with reactive
						refs. Import from{' '}
						<code>@absolutejs/absolute/vue/ai</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="use-ai-stream"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						useAIStream
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The composable takes a WebSocket path and optional
						conversation ID. All returned state values are Vue refs
						that update reactively as messages stream in. The
						connection cleans up automatically on{' '}
						<code>onUnmounted</code>.
					</p>
					<PrismPlus
						codeString={vueUseAIStream}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="return-type"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Return Type
					</AnchorHeading>
					<PrismPlus
						codeString={vueUseAIStreamReturn}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="provide-inject"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Provide / Inject
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Share a single AI connection across your component tree
						using Vue&apos;s provide/inject pattern. The exported{' '}
						<code>AIStreamKey</code> symbol ensures type safety.
					</p>
					<PrismPlus
						codeString={vueProvide}
						language="html"
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
