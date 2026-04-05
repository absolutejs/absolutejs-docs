import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiHtmxBasic,
	aiHtmxCustomRenderers,
	aiHtmxForm,
	aiHtmxSseResponse
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
import { HTMXAIEndpointsTable } from './HTMXAIEndpointsTable';
import { HTMXAIHowItWorksSection } from './HTMXAIHowItWorksSection';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#server-setup', label: 'Server Setup' },
	{ href: '#html-form', label: 'HTML Form' },
	{ href: '#sse-response', label: 'SSE Response' },
	{ href: '#endpoints', label: 'Endpoints' },
	{ href: '#custom-renderers', label: 'Custom Renderers' }
];

export const HTMXAIView = ({
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
					<h1 id="htmx-ai" style={h1Style(isMobileOrTablet)}>
						HTMX AI
					</h1>
					<p style={paragraphLargeStyle}>
						Stream AI responses with zero client-side JavaScript.
						The <code>htmx</code> option on the <code>aiChat</code>{' '}
						plugin adds SSE endpoints that stream HTML fragments :
						use <code>hx-post</code> to send messages and{' '}
						<code>sse-connect</code> to receive streamed responses.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<HTMXAIHowItWorksSection themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add <code>htmx: true</code> to enable SSE endpoints
						alongside the existing WebSocket ones. Both work
						simultaneously: JS frameworks use WebSocket, HTMX uses
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
						id="html-form"
						level="h2"
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
						id="sse-response"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SSE Response
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The POST endpoint returns HTML with the user message and
						an SSE-connected container. Each <code>sse-swap</code>{' '}
						target receives a different event type: content,
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
						id="endpoints"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Endpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						These are added alongside the existing WebSocket and
						REST endpoints when <code>htmx</code> is enabled:
					</p>
					<HTMXAIEndpointsTable themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="custom-renderers"
						level="h2"
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
