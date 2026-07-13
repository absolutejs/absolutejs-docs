import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	mcpEndpointsChallenge,
	mcpEndpointsQuickStart,
	mcpEndpointsRawHandler,
	mcpEndpointsRichResults,
	mcpEndpointsSecondEndpoint
} from '../../../data/documentation/mcpSectionDocsCode';
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
import { Callout } from '../../utils/Callout';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { Endpoint, EndpointTable } from '../../utils/EndpointTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#mcp-endpoints-overview', label: 'Overview' },
	{ href: '#define-an-endpoint', label: 'Define an Endpoint' },
	{ href: '#route-surface', label: 'Route Surface' },
	{ href: '#transport', label: 'Transport & Statelessness' },
	{ href: '#authorization', label: 'Authorization & Discovery' },
	{ href: '#tool-registry', label: 'Tools & Tool Maps' },
	{ href: '#raw-handler', label: 'Framework-Agnostic Handler' },
	{ href: '#multiple-endpoints', label: 'Multiple Endpoints' }
];

const endpointRoutes: Endpoint[] = [
	{
		description: 'The JSON-RPC endpoint (streamable HTTP).',
		method: 'POST',
		note: 'Answers with a plain JSON body, or an SSE stream only when a tool marked mayElicit runs inside a session.',
		path: '/mcp'
	},
	{
		description: 'Returns 405.',
		method: 'GET',
		note: 'No standalone server-initiated stream.',
		path: '/mcp'
	},
	{
		description: 'End an elicitation session (204).',
		method: 'DELETE',
		note: '405 when the endpoint is sessionless — the default, with elicitation off.',
		path: '/mcp'
	},
	{
		description: 'RFC 9728 protected-resource metadata.',
		method: 'GET',
		note: 'Per RFC 9728 §3 the endpoint path is inserted after the well-known segment.',
		path: '/.well-known/oauth-protected-resource/mcp'
	},
	{
		description: 'The same metadata at the un-suffixed root alias.',
		method: 'GET',
		note: 'Served only when serveRootMetadata is set — some clients probe the root.',
		path: '/.well-known/oauth-protected-resource'
	}
];

const postLifecycleSteps: StepFlowStep[] = [
	{
		actor: 'You',
		description:
			'config.authorize(request) resolves the request into a caller (plus its scopes), or returns the reason for the 401.',
		title: 'Authorize'
	},
	{
		actor: 'Package',
		description:
			'The body must be one JSON-RPC 2.0 message. JSON-RPC batching is rejected — the 2025-06-18 protocol revision dropped it.',
		title: 'Validate'
	},
	{
		actor: 'Package',
		description:
			'The method routes to tools, prompts, or resources. Notifications (no id) get a bare 202; unknown methods get method-not-found.',
		title: 'Dispatch'
	},
	{
		actor: 'Package',
		description:
			'Every reply is a complete HTTP Response — a plain JSON body unless a mayElicit tool is streaming its question over SSE.',
		title: 'Respond'
	}
];

const methodRows: DocsTableCell[][] = [
	[
		{ code: 'initialize' },
		'Negotiates the protocol version, advertises capabilities derived from the config, and returns serverInfo + instructions.'
	],
	[{ code: 'ping' }, 'Returns an empty result.'],
	[
		{ code: 'tools/list' },
		'The tools visible to this caller (scope-gated tools filtered out), paginated with an opaque cursor.'
	],
	[
		{ code: 'tools/call' },
		'Runs one tool through beforeCall, the handler, and onCall.'
	],
	[
		{ code: 'prompts/list' },
		'The prompt definitions, paginated.',
		'prompts configured'
	],
	[
		{ code: 'prompts/get' },
		'Builds one prompt as a single user text message.',
		'prompts configured'
	],
	[
		{ code: 'resources/list' },
		'The resources visible to this caller, paginated.',
		'resources configured'
	],
	[
		{ code: 'resources/read' },
		'Reads one resource by uri.',
		'resources configured'
	]
];

const bearerCheckRows: DocsTableCell[][] = [
	[
		'Bearer header present',
		{ code: 'Missing bearer token', suffix: 'rejection reason' }
	],
	['Signature valid (via your verify)', { code: 'Invalid token' }],
	[{ code: 'token_use === "access"' }, { code: 'Not an access token' }],
	['Issuer matches', { code: 'Wrong issuer' }],
	['Not expired', { code: 'Token expired' }],
	[
		'Holds requiredScope, when set',
		{ code: 'Token lacks the <scope> scope' }
	],
	['Has a subject', { code: 'Token has no subject' }]
];

const toolFieldRows: DocsTableCell[][] = [
	[
		{ code: 'description' },
		'What the tool does, shown to the model on tools/list.'
	],
	[{ code: 'inputSchema' }, 'A JSON Schema object for the arguments.'],
	[
		{ code: 'handler(args, context)' },
		'Returns a bare string, an array of content blocks, or a full McpToolResult.'
	],
	[
		{ code: 'annotations', suffix: 'optional' },
		'MCP behaviour hints (readOnlyHint, destructiveHint, idempotentHint, openWorldHint, title), passed straight through to the client.'
	],
	[
		{ code: 'outputSchema', suffix: 'optional' },
		'JSON Schema for structuredContent, advertised on tools/list.'
	],
	[
		{ code: 'scope', suffix: 'optional' },
		'The tool is only listed and callable when the caller holds this scope. Fails closed.'
	],
	[
		{ code: 'mayElicit', suffix: 'optional' },
		'Marks a tool that may ask the user a question mid-call — it answers over SSE instead of a plain JSON body.'
	]
];

const contentBlockRows: DocsTableCell[][] = [
	[{ code: 'text' }, { code: '{ text, type }' }],
	[{ code: 'image' }, { code: '{ data, mimeType, type }' }],
	[{ code: 'audio' }, { code: '{ data, mimeType, type }' }],
	[
		{ code: 'resource_link' },
		{ code: '{ uri, type, name?, description?, mimeType? }' }
	]
];

export const McpEndpointsView = ({
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
						id="mcp-endpoints-overview"
						style={h1Style(isMobileOrTablet)}
					>
						MCP Endpoints
					</h1>
					<p style={paragraphLargeStyle}>
						Serve a remote Model Context Protocol endpoint —{' '}
						<strong>streamable HTTP, stateless</strong> — from a
						tool/prompt/resource registry. You supply which tools to
						expose and how to authorize a request into a caller;{' '}
						<code>@absolutejs/mcp</code> owns the JSON-RPC protocol,
						protocol-version negotiation, RFC 9728 discovery
						metadata, and the <code>401</code> challenge that lets a
						client find your authorization server. Nothing here
						depends on a model.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-an-endpoint"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Define an Endpoint
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>mcpServer()</code> builds the endpoint as an
						Elysia plugin — mount it with <code>.use()</code>. The
						only peer dependency is <code>elysia</code>. Two things
						are yours: <code>authorize</code> decides who is allowed
						in, and <code>tools</code> builds the registry for that
						caller, called once per request.
					</p>
					<PrismPlus
						codeString={mcpEndpointsQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						That is a complete member endpoint.{' '}
						<code>GET /mcp</code> returns <code>405</code>,{' '}
						<code>POST /mcp</code> speaks JSON-RPC, and{' '}
						<code>
							GET /.well-known/oauth-protected-resource[/mcp]
						</code>{' '}
						serves the discovery metadata.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="route-surface"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Route Surface
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One plugin registers the whole surface for its{' '}
						<code>path</code> (here <code>/mcp</code>):
					</p>
					<EndpointTable
						endpoints={endpointRoutes}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="transport"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Transport & Statelessness
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The transport is streamable HTTP: every request is a
						self-contained POST, and every reply is a complete HTTP
						Response. Leave elicitation off — the default — and the
						endpoint holds <strong>no session state at all</strong>:
						no <code>Mcp-Session-Id</code>, no standalone SSE
						stream, nothing to replicate across instances.
					</p>
					<StepFlow
						steps={postLifecycleSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Protocol negotiation is automatic: the endpoint accepts
						the versions in <code>supportedProtocols</code>{' '}
						(defaults <code>2025-06-18</code>,{' '}
						<code>2025-03-26</code>, <code>2024-11-05</code>), the
						first being preferred — a request for an unknown version
						falls back to it. The dispatcher handles:
					</p>
					<DocsTable
						columns={['Method', 'Behavior', 'Requires']}
						rows={methodRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Batching is rejected, not half-supported"
						variant="warning"
					>
						The 2025-06-18 protocol revision dropped JSON-RPC
						batching, so an array body is refused with an
						invalid-request error rather than partially processed.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="authorization"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authorization & Discovery
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>authorize(request)</code> runs before anything
						else on every POST and returns{' '}
						<code>{'{ ok: true, caller, scopes? }'}</code> or{' '}
						<code>{'{ ok: false, reason }'}</code>. On failure the
						package emits the <code>401</code> with an RFC 9728{' '}
						<code>WWW-Authenticate</code> challenge pointing at the
						protected-resource metadata, so the client can discover
						your authorization server on its own:
					</p>
					<PrismPlus
						codeString={mcpEndpointsChallenge}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The package never verifies tokens itself — any
						authorization server (or none) works.{' '}
						<code>verifyBearer()</code> is the convenience your{' '}
						<code>authorize</code> can call for the standard OAuth
						access-token checks; you supply the signature{' '}
						<code>verify</code> function, and it layers the claim
						checks every MCP endpoint needs:
					</p>
					<DocsTable
						columns={['Check', 'Failure']}
						rows={bearerCheckRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="The reason is safe to surface"
						variant="info"
					>
						On success <code>verifyBearer</code> returns the decoded
						payload, the parsed scopes, and the subject. On failure
						it returns a reason string that is safe to expose in the
						401 — it never says why a signature failed.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="tool-registry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tools & Tool Maps
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>tools</code> is a factory, not a static list: it
						receives <code>{'{ caller, meta }'}</code> and returns
						an <code>McpToolRegistry</code> — a record of named{' '}
						<code>McpTool</code> entries built for that caller. Each
						tool carries:
					</p>
					<DocsTable
						columns={['Field', 'Meaning']}
						rows={toolFieldRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A bare string return is the common case — it is wrapped
						as one text block. Rich results mix four content block
						types, plus optional <code>structuredContent</code>{' '}
						validated against the tool's <code>outputSchema</code>:
					</p>
					<DocsTable
						columns={['Block', 'Shape']}
						rows={contentBlockRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={mcpEndpointsRichResults}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>tools/list</code>, <code>prompts/list</code>, and{' '}
						<code>resources/list</code> paginate with an opaque
						cursor — <code>listPageSize</code> sets the page size
						(default 50), and clients follow <code>nextCursor</code>{' '}
						until the list ends.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="AIToolMap compatible"
						variant="success"
					>
						The tool shape is structurally compatible with{' '}
						<code>@absolutejs/ai</code>'s <code>AIToolMap</code>, so
						an AI tool registry serves over MCP without conversion —
						but any typed tool registry works.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="raw-handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Framework-Agnostic Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Elysia plugin is a thin wrapper over a
						transport-agnostic core. <code>createMcpHandler()</code>{' '}
						exposes the same core directly, so the Elysia and
						raw-handler paths can never diverge:
					</p>
					<PrismPlus
						codeString={mcpEndpointsRawHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multiple-endpoints"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multiple Endpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>mcpServer</code> is per-endpoint, so a second,
						stricter endpoint is just a second <code>.use()</code>{' '}
						with a different <code>path</code> and its own config:
					</p>
					<PrismPlus
						codeString={mcpEndpointsSecondEndpoint}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="One root alias per app"
						variant="warning"
					>
						Only one endpoint per app should set{' '}
						<code>serveRootMetadata</code> — it claims the
						un-suffixed{' '}
						<code>/.well-known/oauth-protected-resource</code>{' '}
						alias.
					</Callout>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
