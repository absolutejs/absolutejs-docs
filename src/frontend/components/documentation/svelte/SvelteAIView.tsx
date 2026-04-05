import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	svelteCreateAIStream,
	svelteCreateAIStreamReturn
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
	{ href: '#create-ai-stream', label: 'createAIStream' },
	{ href: '#return-type', label: 'Return Type' }
];

export const SvelteAIView = ({
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
					<h1 id="svelte-ai" style={h1Style(isMobileOrTablet)}>
						Svelte AI
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>createAIStream</code> function connects Svelte
						components to the AI streaming WebSocket using reactive
						getter properties. Import from{' '}
						<code>@absolutejs/absolute/svelte/ai</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="create-ai-stream"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						createAIStream
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>createAIStream</code> with the WebSocket path
						and an optional conversation ID. It returns an object
						with getter properties that work with Svelte&apos;s
						reactivity system: access <code>ai.messages</code>,{' '}
						<code>ai.isStreaming</code>, and <code>ai.error</code>{' '}
						directly in your template.
					</p>
					<PrismPlus
						codeString={svelteCreateAIStream}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="return-type"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Return Type
					</AnchorHeading>
					<PrismPlus
						codeString={svelteCreateAIStreamReturn}
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
