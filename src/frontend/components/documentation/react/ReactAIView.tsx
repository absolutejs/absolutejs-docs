import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	reactUseAIStream,
	reactUseAIStreamReturn,
	reactProvider,
	reactAttachments
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
	{ href: '#ai-stream-provider', label: 'AIStreamProvider' },
	{ href: '#attachments', label: 'File Attachments' }
];

export const ReactAIView = ({
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
					<h1 id="react-ai" style={h1Style(isMobileOrTablet)}>
						React AI
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>useAIStream</code> hook and{' '}
						<code>AIStreamProvider</code> connect your React
						components to the AI streaming WebSocket. Import from{' '}
						<code>@absolutejs/absolute/react/ai</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="use-ai-stream"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						useAIStream
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The primary hook for AI streaming. Pass the WebSocket
						path and an optional conversation ID. It manages the
						connection, message state, and streaming lifecycle.
					</p>
					<PrismPlus
						codeString={reactUseAIStream}
						language="tsx"
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
						codeString={reactUseAIStreamReturn}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ai-stream-provider"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AIStreamProvider
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Wrap your component tree with{' '}
						<code>AIStreamProvider</code> to share a single
						WebSocket connection across multiple components. Child
						components can call <code>useAIStream()</code> without a
						path argument to use the shared connection.
					</p>
					<PrismPlus
						codeString={reactProvider}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="attachments"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						File Attachments
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Send images and PDFs alongside messages by converting
						files to base64 and passing them as the second argument
						to <code>send()</code>.
					</p>
					<PrismPlus
						codeString={reactAttachments}
						language="tsx"
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
