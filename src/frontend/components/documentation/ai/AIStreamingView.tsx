import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiStreamingProtocol,
	aiStreamingServerMessages,
	aiStreamingMessageType,
	aiStreamingThinkingStatic,
	aiStreamingThinkingDynamic,
	aiConnectionOptions
} from '../../../data/documentation/aiDocsCode';
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
import { StreamingClientMessagesTable } from './StreamingClientMessagesTable';
import { StreamingConnectionFeatures } from './StreamingConnectionFeatures';
import { StreamingServerMessagesTable } from './StreamingServerMessagesTable';
import { StreamingThinkingTable } from './StreamingThinkingTable';

const tocItems: TocItem[] = [
	{ href: '#client-messages', label: 'Client Messages' },
	{ href: '#server-messages', label: 'Server Messages' },
	{ href: '#message-type', label: 'AIMessage Type' },
	{ href: '#extended-thinking', label: 'Extended Thinking' },
	{ href: '#connection', label: 'Connection Management' }
];

const directionLabelStyle = (direction: 'send' | 'receive'): CSSProperties => ({
	background:
		direction === 'send'
			? 'rgba(99, 102, 241, 0.12)'
			: 'rgba(16, 185, 129, 0.12)',
	borderRadius: '6px',
	color: direction === 'send' ? '#818CF8' : '#10B981',
	display: 'inline-block',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.75rem',
	fontWeight: 600,
	letterSpacing: '0.05em',
	marginBottom: '1rem',
	padding: '0.3rem 0.75rem',
	textTransform: 'uppercase'
});

const renderClientMessagesTable = (
	themeSprings: DocsViewProps['themeSprings']
) => (
	<StreamingClientMessagesTable
		directionLabelStyle={directionLabelStyle('send')}
		themeSprings={themeSprings}
	/>
);

const renderServerMessagesTable = (
	themeSprings: DocsViewProps['themeSprings']
) => (
	<StreamingServerMessagesTable
		directionLabelStyle={directionLabelStyle('receive')}
		themeSprings={themeSprings}
	/>
);

export const AIStreamingView = ({
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
					<h1 id="ai-streaming" style={h1Style(isMobileOrTablet)}>
						Streaming &amp; Protocol
					</h1>
					<p style={paragraphLargeStyle}>
						AI responses stream over WebSocket using a typed message
						protocol. The client hooks handle parsing and state
						management automatically, but understanding the protocol
						is useful for custom integrations.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-messages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Messages
					</AnchorHeading>
					{renderClientMessagesTable(themeSprings)}
					<PrismPlus
						codeString={aiStreamingProtocol}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-messages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Messages
					</AnchorHeading>
					{renderServerMessagesTable(themeSprings)}
					<PrismPlus
						codeString={aiStreamingServerMessages}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="message-type"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AIMessage Type
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						On the client, streamed data accumulates into{' '}
						<code>AIMessage</code> objects. This is the shape
						returned by all framework hooks in the{' '}
						<code>messages</code> array.
					</p>
					<PrismPlus
						codeString={aiStreamingMessageType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="extended-thinking"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Extended Thinking
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Reasoning models can stream their thought process
						alongside the final response. Enable it with a token
						budget. Thinking content arrives as{' '}
						<code>thinking</code> messages and is available on{' '}
						<code>AIMessage.thinking</code>.
					</p>
					<StreamingThinkingTable themeSprings={themeSprings} />
					<p
						style={{
							...paragraphSpacedStyle,
							marginBottom: '0.5rem',
							marginTop: '1rem'
						}}
					>
						Enable statically for all requests:
					</p>
					<PrismPlus
						codeString={aiStreamingThinkingStatic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginBottom: '0.5rem',
							marginTop: '1rem'
						}}
					>
						Or dynamically per model:
					</p>
					<PrismPlus
						codeString={aiStreamingThinkingDynamic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="connection"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Connection Management
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The client hooks manage the WebSocket connection
						lifecycle automatically. You get these behaviors out of
						the box:
					</p>
					<StreamingConnectionFeatures themeSprings={themeSprings} />
					<PrismPlus
						codeString={aiConnectionOptions}
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
