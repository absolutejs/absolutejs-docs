import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { FaServer, FaCode, FaExchangeAlt } from 'react-icons/fa';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiHtmxBasic,
	aiHtmxCustomRenderers,
	aiHtmxForm,
	aiHtmxSseResponse
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
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#server-setup', label: 'Server Setup' },
	{ href: '#html-form', label: 'HTML Form' },
	{ href: '#sse-response', label: 'SSE Response' },
	{ href: '#endpoints', label: 'Endpoints' },
	{ href: '#custom-renderers', label: 'Custom Renderers' }
];

const methodBadgeStyle = (color: string): CSSProperties => ({
	borderRadius: '4px',
	color,
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8rem',
	fontWeight: 700
});

export const HTMXAIView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="htmx-ai">
						HTMX AI
					</h1>
					<p style={paragraphLargeStyle}>
						Stream AI responses with zero client-side JavaScript.
						The <code>htmx</code> option on the <code>aiChat</code>{' '}
						plugin adds SSE endpoints that stream HTML fragments —
						use <code>hx-post</code> to send messages and{' '}
						<code>sse-connect</code> to receive streamed responses.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<div
						style={{
							display: 'grid',
							gap: '0.75rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: '1fr 1fr 1fr',
							marginTop: '0.5rem'
						}}
					>
						<animated.div
							style={{
								...featureCardStyle(themeSprings),
								textAlign: 'center'
							}}
						>
							<FaCode
								style={{
									fontSize: '1.5rem',
									marginBottom: '0.5rem',
									opacity: 0.7
								}}
							/>
							<div
								style={{
									fontSize: '1rem',
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								Form POST
							</div>
							<div
								style={{
									fontSize: '0.85rem',
									opacity: 0.75
								}}
							>
								User submits via{' '}
								<code style={tableCodeStyle}>hx-post</code>
							</div>
						</animated.div>
						<animated.div
							style={{
								...featureCardStyle(themeSprings),
								textAlign: 'center'
							}}
						>
							<FaServer
								style={{
									fontSize: '1.5rem',
									marginBottom: '0.5rem',
									opacity: 0.7
								}}
							/>
							<div
								style={{
									fontSize: '1rem',
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								HTML + SSE
							</div>
							<div
								style={{
									fontSize: '0.85rem',
									opacity: 0.75
								}}
							>
								Server returns SSE-connected container
							</div>
						</animated.div>
						<animated.div
							style={{
								...featureCardStyle(themeSprings),
								textAlign: 'center'
							}}
						>
							<FaExchangeAlt
								style={{
									fontSize: '1.5rem',
									marginBottom: '0.5rem',
									opacity: 0.7
								}}
							/>
							<div
								style={{
									fontSize: '1rem',
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								HTML Fragments
							</div>
							<div
								style={{
									fontSize: '0.85rem',
									opacity: 0.75
								}}
							>
								Chunks stream as rendered HTML via{' '}
								<code style={tableCodeStyle}>sse-swap</code>
							</div>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="server-setup"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add <code>htmx: true</code> to enable SSE endpoints
						alongside the existing WebSocket ones. Both work
						simultaneously — JS frameworks use WebSocket, HTMX uses
						SSE.
					</p>
					<PrismPlus
						codeString={aiHtmxBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="html-form"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTML Form
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						No JavaScript needed. A standard HTML form with{' '}
						<code>hx-post</code> sends messages, and the sidebar
						polls with <code>hx-trigger=&quot;every 3s&quot;</code>.
					</p>
					<PrismPlus
						codeString={aiHtmxForm}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="sse-response"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SSE Response
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The POST endpoint returns HTML with the user message and
						an SSE-connected container. Each <code>sse-swap</code>{' '}
						target receives a different event type — content,
						thinking, tools, images, and status.
					</p>
					<PrismPlus
						codeString={aiHtmxSseResponse}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="endpoints"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Endpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						These are added alongside the existing WebSocket and
						REST endpoints when <code>htmx</code> is enabled:
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Method
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Path
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Returns
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{[
									{
										method: 'POST',
										color: '#3B82F6',
										path: '/chat/message',
										desc: 'User message HTML + SSE container'
									},
									{
										method: 'GET',
										color: '#10B981',
										path: '/chat/sse/:convId/:msgId',
										desc: 'SSE stream of HTML fragments'
									},
									{
										method: 'GET',
										color: '#10B981',
										path: '/chat/history/:convId',
										desc: 'Full conversation as HTML'
									},
									{
										method: 'GET',
										color: '#10B981',
										path: '/chat/conversations/list',
										desc: 'Sidebar HTML fragment'
									},
									{
										method: 'DELETE',
										color: '#EF4444',
										path: '/chat/conversations/:id',
										desc: 'Empty response'
									}
								].map(({ method, color, path: p, desc }) => (
									<tr key={p}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<span
												style={methodBadgeStyle(color)}
											>
												{method}
											</span>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{p}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{desc}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="custom-renderers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Custom Renderers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Override the default HTML output for any event type.
						Each render function receives the relevant data and
						returns an HTML string.
					</p>
					<PrismPlus
						codeString={aiHtmxCustomRenderers}
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
