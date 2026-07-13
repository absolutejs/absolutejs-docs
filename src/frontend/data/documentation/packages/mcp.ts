import { PackageDocData } from '../../../../types/packageDocs';

export const mcpPackageData: PackageDocData = {
	category: 'AI',
	description:
		'Serves a remote Model Context Protocol endpoint (streamable HTTP, stateless) from a typed tool, prompt, and resource registry as an Elysia plugin. You supply which tools to expose and how to authorize a request into a caller; the package owns the JSON-RPC protocol, protocol-version negotiation, RFC 9728 discovery metadata, and the 401 challenge that points clients at your authorization server. Nothing in it depends on a model, and the tool shape is structurally compatible with the AIToolMap from @absolutejs/ai, so an existing AI tool registry serves over MCP without conversion.',
	features: [
		{
			description:
				'POST speaks JSON-RPC with plain JSON responses and no session state by default, so the endpoint scales like any other stateless route.',
			title: 'Stateless streamable HTTP'
		},
		{
			description:
				'verifyBearer runs the standard OAuth access-token checks, and the plugin serves RFC 9728 protected-resource metadata plus the 401 challenge that lets clients discover your authorization server.',
			title: 'OAuth bearer auth and discovery'
		},
		{
			description:
				'beforeCall can refuse a single call (credits, rate limits) with a message the model relays, onCall audits every call, and a per-request meta scratchpad carries data between tool handlers and hooks.',
			title: 'Per-call guards and audit'
		},
		{
			description:
				'Tools marked mayElicit can ask the user a question mid-call and await the answer; opt-in session state plus pluggable store and bus seams make it safe behind a load balancer with no sticky routing.',
			title: 'Mid-call elicitation'
		},
		{
			description:
				'feedbackTools and FEEDBACK_INSTRUCTIONS give connected AI clients a channel to report problems and relay user feedback, the signal every MCP server otherwise hand-rolls or loses.',
			title: 'Built-in feedback tools'
		},
		{
			description:
				'Server-side prompt definitions and readable resources are plain hooks, and createMcpClient consumes remote MCP servers, including answering their elicitation requests via onElicit.',
			title: 'Prompts, resources, and client'
		}
	],
	installCommand: 'bun add @absolutejs/mcp',
	links: [
		{
			href: 'https://github.com/absolutejs/mcp',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/mcp',
			label: 'npm'
		}
	],
	name: 'MCP',
	notes: [
		{
			body: 'mcpServer is per-endpoint: mount a second, stricter instance (different path, scopes, authorize, and guards) for an admin surface. Only one endpoint per app should set serveRootMetadata.',
			title: 'Multiple endpoints',
			variant: 'info'
		},
		{
			body: 'The package is pre-1.0; the elicitation and session seams in particular may evolve, so pin an exact version.',
			title: 'Beta API',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/mcp',
	samples: [
		{
			code: `import { Elysia } from 'elysia';
import { mcpServer, verifyBearer } from '@absolutejs/mcp';

type Caller = { userId: string };

const server = new Elysia().use(
	mcpServer<Caller>({
		path: '/mcp',
		issuer: 'https://your.app',
		serverInfo: { name: 'your-app', title: 'Your App', version: '1.0.0' },
		instructions: 'What the model should know about this server.',
		scopesSupported: ['openid', 'mcp'],
		serveRootMetadata: true,

		// You decide who is allowed in. verifyBearer does the standard
		// OAuth access-token checks; add your own on top.
		authorize: async (request) => {
			const token = await verifyBearer({
				request,
				issuer: 'https://your.app',
				requiredScope: 'mcp',
				verify: (jwt) => verifyJwt(jwt, publicJwk)
			});
			if ('error' in token) return { ok: false, reason: token.error };
			return { ok: true, caller: { userId: token.subject } };
		},

		// Called once per request; build the tools for this caller.
		tools: ({ caller }) => buildToolsFor(caller.userId)
	})
);`,
			description:
				'A complete MCP endpoint: POST /mcp speaks JSON-RPC and the RFC 9728 discovery metadata is served automatically.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	FEEDBACK_INSTRUCTIONS,
	feedbackTools,
	mcpServer
} from '@absolutejs/mcp';

mcpServer<Caller>({
	// ...as above
	instructions: \`\${myInstructions} \${FEEDBACK_INSTRUCTIONS}\`,

	// Refuse a single call before it runs; the message comes back as
	// an isError tool result the model can relay, not a crash.
	beforeCall: async ({ caller }) =>
		(await outOfCredits(caller))
			? { block: 'Out of credits this cycle.' }
			: undefined,

	// Audit every call. meta carries whatever the tool handler wrote.
	onCall: ({ caller, name, ok, meta }) =>
		recordCall({ caller, name, ok, touched: meta.touched }),

	tools: ({ caller }) => ({
		...myTools(caller),
		...feedbackTools({
			caller,
			store: {
				reportProblem: ({ caller, report }) => file(caller, report),
				submitFeedback: ({ caller, feedback }) => record(caller, feedback)
			}
		})
	})
});`,
			description:
				'Guard calls, audit them, and give the connected AI client a feedback channel back to you.',
			heading: 'Guards, Audit, and Feedback',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Remote MCP endpoint for Elysia servers: bring your tools and authorization, the JSON-RPC protocol and OAuth discovery come done correctly.',
	version: '0.4.2'
};
