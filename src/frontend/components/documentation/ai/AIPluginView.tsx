import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiPluginBasicConfig,
	aiPluginFullConfig,
	aiPluginConfigType,
	aiStoreInterface,
	aiStoreMemory,
	aiStoreCustom,
	aiHtmxBasic,
	aiHtmxCustomRenderers
} from '../../../data/documentation/aiDocsCode';
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
	{ href: '#basic-setup', label: 'Basic Setup' },
	{ href: '#full-configuration', label: 'Full Configuration' },
	{ href: '#config-options', label: 'Config Options' },
	{ href: '#config-type', label: 'Configuration Type' },
	{ href: '#endpoints', label: 'Endpoints' },
	{ href: '#conversation-store', label: 'Conversation Store' },
	{ href: '#htmx', label: 'HTMX Support' }
];

const optionNameStyle: CSSProperties = {
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.95rem',
	fontWeight: 600
};

const optionDescStyle: CSSProperties = {
	fontSize: '0.9rem',
	lineHeight: 1.5,
	marginTop: '0.25rem',
	opacity: 0.85
};

const optionTypeStyle: CSSProperties = {
	...tableCodeStyle,
	display: 'inline-block',
	fontSize: '0.75rem',
	marginLeft: '0.5rem',
	opacity: 0.7
};

const methodBadgeStyle = (color: string): CSSProperties => ({
	borderRadius: '4px',
	color,
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8rem',
	fontWeight: 700
});

type AIPluginSectionBlockProps = {
	section: 'options' | 'endpoints';
	themeSprings: DocsViewProps['themeSprings'];
};

const configOptions: Array<{
	desc: string;
	name: string;
	required?: boolean;
	type: string;
}> = [
	{
		desc: 'Factory function that receives a provider name and returns a provider config. This is the only required option.',
		name: 'provider',
		required: true,
		type: '(name) => AIProviderConfig'
	},
	{
		desc: 'Static model name or function to select model per provider. If omitted, the client must specify the model.',
		name: 'model',
		type: 'string | (name) => string'
	},
	{
		desc: 'Static tool map or function returning tools per provider/model. Return undefined to disable tools for a model.',
		name: 'tools',
		type: 'AIToolMap | (name, model) => AIToolMap'
	},
	{
		desc: 'Enable extended thinking globally, with a token budget, or dynamically per provider/model.',
		name: 'thinking',
		type: 'boolean | { budgetTokens } | fn'
	},
	{
		desc: 'Custom parser to extract provider, model, and content from the raw message string sent by the client.',
		name: 'parseProvider',
		type: '(content) => { content, model, providerName }'
	},
	{
		desc: 'Callback fired when a response finishes streaming. Useful for logging token usage or saving to a database.',
		name: 'onComplete',
		type: '(conversationId, response, usage) => void'
	},
	{
		desc: "WebSocket and REST endpoint path. Defaults to '/chat'.",
		name: 'path',
		type: 'string'
	},
	{
		desc: 'Maximum tool-use rounds before the plugin stops the loop. Defaults to 10.',
		name: 'maxTurns',
		type: 'number'
	}
];

const endpointRows: Array<[string, string, string, string]> = [
	[
		'WS',
		'#8B5CF6',
		'/chat',
		'Main streaming endpoint. Handles messages, cancellation, and branching.'
	],
	[
		'GET',
		'#10B981',
		'/chat/conversations',
		'List all conversations sorted by most recent.'
	],
	[
		'GET',
		'#10B981',
		'/chat/conversations/:id',
		'Get a single conversation with its full message history.'
	],
	[
		'DELETE',
		'#EF4444',
		'/chat/conversations/:id',
		'Delete a conversation and all its messages.'
	]
];

const renderEndpointRows = (themeSprings: DocsViewProps['themeSprings']) => (
	<tbody>
		{endpointRows.map(([method, color, path, description]) => (
			<tr key={`${method}-${path}`}>
				<animated.td style={tableCellStyle(themeSprings)}>
					<span style={methodBadgeStyle(color)}>{method}</span>
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					<code style={tableCodeStyle}>{path}</code>
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					{description}
				</animated.td>
			</tr>
		))}
	</tbody>
);

const AIPluginSectionBlock = ({
	section,
	themeSprings
}: AIPluginSectionBlockProps) => {
	if (section === 'options') {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.75rem',
					marginTop: '0.5rem'
				}}
			>
				{configOptions.map((opt) => (
					<animated.div
						key={opt.name}
						style={{
							...featureCardStyle(themeSprings),
							padding: '1rem 1.25rem'
						}}
					>
						<div
							style={{
								alignItems: 'center',
								display: 'flex',
								flexWrap: 'wrap'
							}}
						>
							<span style={optionNameStyle}>{opt.name}</span>
							{opt.required && (
								<span
									style={{
										background: 'rgba(239, 68, 68, 0.15)',
										borderRadius: '4px',
										color: '#EF4444',
										fontSize: '0.7rem',
										fontWeight: 600,
										marginLeft: '0.5rem',
										padding: '0.1rem 0.4rem',
										textTransform: 'uppercase'
									}}
								>
									required
								</span>
							)}
							<span style={optionTypeStyle}>{opt.type}</span>
						</div>
						<div style={optionDescStyle}>{opt.desc}</div>
					</animated.div>
				))}
			</div>
		);
	}

	return (
		<div style={tableContainerStyle}>
			<animated.table style={tableStyle(themeSprings)}>
				<thead>
					<tr>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Method
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Path
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Description
						</animated.th>
					</tr>
				</thead>
				{renderEndpointRows(themeSprings)}
			</animated.table>
		</div>
	);
};

export const AIPluginView = ({
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
					<h1 id="ai-plugin" style={h1Style(isMobileOrTablet)}>
						AI Plugin
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>aiChat</code> Elysia plugin is the server-side
						entry point for AI streaming. It creates WebSocket and
						REST endpoints, manages conversations, and orchestrates
						provider streaming with tool execution.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basic-setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						At minimum, <code>aiChat</code> needs a provider
						factory. Everything else has sensible defaults.
					</p>
					<PrismPlus
						codeString={aiPluginBasicConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="full-configuration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Full Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A production setup with multiple providers, dynamic tool
						and thinking configuration, custom message parsing, and
						completion callbacks:
					</p>
					<PrismPlus
						codeString={aiPluginFullConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Config Options
					</AnchorHeading>
					<AIPluginSectionBlock
						section="options"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config-type"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration Type
					</AnchorHeading>
					<PrismPlus
						codeString={aiPluginConfigType}
						language="typescript"
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
						The plugin automatically creates these endpoints under
						the configured path (default <code>/chat</code>):
					</p>
					<AIPluginSectionBlock
						section="endpoints"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="conversation-store"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Conversation Store
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						By default, conversations are stored in memory. This
						works for single-instance deployments but breaks when
						you run multiple server instances behind a load
						balancer. Pass a custom <code>store</code> to persist
						conversations to Redis, Postgres, or any backend.
					</p>
					<PrismPlus
						codeString={aiStoreInterface}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1rem'
						}}
					>
						The default memory store:
					</p>
					<PrismPlus
						codeString={aiStoreMemory}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1rem'
						}}
					>
						A Redis implementation for multi-instance deployments:
					</p>
					<PrismPlus
						codeString={aiStoreCustom}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="htmx"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX Support
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Enable <code>htmx: true</code> to add SSE-based
						endpoints alongside the WebSocket ones. HTMX clients can
						stream AI responses with zero JavaScript. Just use{' '}
						<code>hx-post</code> and <code>sse-connect</code>.
					</p>
					<PrismPlus
						codeString={aiHtmxBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1rem'
						}}
					>
						Customize the HTML fragments with render functions:
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
