import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import {
	FaSync,
	FaHeartbeat,
	FaBolt,
	FaShieldAlt,
	FaBroom,
	FaTachometerAlt
} from 'react-icons/fa';
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
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
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

const connFeatureStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	fontSize: '0.95rem',
	gap: '0.5rem',
	lineHeight: 1.5
};

const connIconStyle: CSSProperties = {
	flexShrink: 0,
	fontSize: '1.1rem'
};

export const AIStreamingView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="ai-streaming">
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
						level="h2"
						id="client-messages"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Messages
					</AnchorHeading>
					<div style={directionLabelStyle('send')}>
						Client &#x2192; Server
					</div>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Type
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Purpose
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Key Fields
									</animated.th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											message
										</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										Send a message with optional file
										attachments
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											content
										</code>
										,{' '}
										<code style={tableCodeStyle}>
											attachments?
										</code>
									</animated.td>
								</tr>
								<tr>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											cancel
										</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										Stop a streaming response
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											conversationId
										</code>
									</animated.td>
								</tr>
								<tr>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											branch
										</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										Fork conversation from a specific
										message
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											messageId
										</code>
										,{' '}
										<code style={tableCodeStyle}>
											content
										</code>
									</animated.td>
								</tr>
							</tbody>
						</animated.table>
					</div>
					<PrismPlus
						codeString={aiStreamingProtocol}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="server-messages"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Messages
					</AnchorHeading>
					<div style={directionLabelStyle('receive')}>
						Server &#x2192; Client
					</div>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Type
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Purpose
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{[
									['chunk', 'Streamed text content fragment'],
									[
										'thinking',
										'Extended reasoning token stream'
									],
									[
										'tool_status',
										'Tool execution running or complete with result'
									],
									[
										'image',
										'Generated image data (may be partial during streaming)'
									],
									[
										'complete',
										'Response finished with model name, duration, and token usage'
									],
									[
										'error',
										'Error message from the provider or plugin'
									]
								].map(([type, purpose]) => (
									<tr key={type}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{type}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{purpose}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
					<PrismPlus
						codeString={aiStreamingServerMessages}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="message-type"
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
						level="h2"
						id="extended-thinking"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Extended Thinking
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Reasoning models can stream their thought process
						alongside the final response. Enable it with a token
						budget — thinking content arrives as{' '}
						<code>thinking</code> messages and is available on{' '}
						<code>AIMessage.thinking</code>.
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Model
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Provider
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{[
									['Claude Opus 4.6', 'Anthropic'],
									['Claude Sonnet 4.6', 'Anthropic'],
									['o3', 'OpenAI'],
									['o4-mini', 'OpenAI'],
									['DeepSeek Reasoner', 'DeepSeek']
								].map(([model, provider]) => (
									<tr key={model}>
										<animated.td
											style={{
												...tableCellStyle(themeSprings),
												fontWeight: 600
											}}
										>
											{model}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{provider}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
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
						level="h2"
						id="connection"
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
					<div
						style={{
							display: 'grid',
							gap: '0.75rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '0.5rem'
						}}
					>
						{[
							{
								icon: <FaSync />,
								title: 'Auto-Reconnect',
								desc: 'Exponential backoff on disconnect'
							},
							{
								icon: <FaHeartbeat />,
								title: 'Keep-Alive',
								desc: 'Ping interval every 30s by default'
							},
							{
								icon: <FaBolt />,
								title: 'Max Retries',
								desc: 'Up to 60 reconnect attempts'
							},
							{
								icon: <FaShieldAlt />,
								title: 'Type Validation',
								desc: 'All messages validated with type guards'
							},
							{
								icon: <FaBroom />,
								title: 'Cleanup',
								desc: 'Graceful teardown on component unmount'
							},
							{
								icon: <FaTachometerAlt />,
								title: 'Backpressure',
								desc: '1MB threshold for stream buffering'
							}
						].map((f) => (
							<animated.div
								key={f.title}
								style={{
									...featureCardStyle(themeSprings),
									padding: '1rem'
								}}
							>
								<div style={connFeatureStyle}>
									<span style={connIconStyle}>{f.icon}</span>
									<div>
										<div
											style={{
												fontWeight: 600,
												marginBottom: '0.15rem'
											}}
										>
											{f.title}
										</div>
										<div
											style={{
												fontSize: '0.85rem',
												opacity: 0.75
											}}
										>
											{f.desc}
										</div>
									</div>
								</div>
							</animated.div>
						))}
					</div>
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
