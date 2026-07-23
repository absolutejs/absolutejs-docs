import { PackageDocData } from '../../../../types/packageDocs';

export const manifestPackageData: PackageDocData = {
	category: 'AI',
	description:
		'The AbsoluteJS package manifest contract: every @absolutejs/* package exports a typed manifest from its ./manifest subpath describing its settings schema, env requirements, adapter slots, wiring recipes, and guarded AI tools. This package is the contract those manifests are written against, plus fail-closed bridges that turn a contract-v2 manifest into an AI tool map for @absolutejs/ai or a remote MCP tool registry for @absolutejs/mcp. TypeBox schemas are the single source of truth, so the same schema types the handler at compile time and is handed verbatim to AI providers and MCP at runtime.',
	features: [
		{
			description:
				'A TypeBox schema is simultaneously a TypeScript type and a plain JSON Schema object, so tool inputs are typed at compile time and validated at runtime with no hand-written JSON Schema and no drift.',
			title: 'TypeBox single source'
		},
		{
			description:
				'defineManifest checks the settings schema against the package’s real exported config type, so renaming a config key without updating the manifest fails the package’s own tsc.',
			title: 'Drift-checked authoring'
		},
		{
			description:
				'toAIToolMap and toMcpToolRegistry validate every call’s input and require a host authorization enforcer before the handler runs. Contract-v1 tools, unguarded tools, missing runtimes, and ungranted capabilities are omitted entirely.',
			title: 'AI and MCP bridges'
		},
		{
			description:
				'Core packages declare slots by contract id and adapter packages declare matching implements entries, so publishing a new vendor adapter lights up every consumer without a core release.',
			title: 'Adapter slot resolution'
		},
		{
			description:
				'absolute-manifest emit validates the manifest and writes the derived, handler-stripped dist/manifest.json for consumers that cannot execute package code; scaffold generates a starter manifest.',
			title: 'CLI emit and scaffold'
		},
		{
			description:
				'Handlers receive nothing ambient: no process.env and no host secrets. Runtime tools get the instance the host constructed; workspace tools get an explicitly granted, jailed Workspace.',
			title: 'Capability-scoped handlers'
		}
	],
	installCommand: 'bun add @absolutejs/manifest',
	links: [
		{
			href: 'https://github.com/absolutejs/manifest',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/manifest',
			label: 'npm'
		}
	],
	name: 'Manifest',
	notes: [
		{
			body: 'MIT licensed with @sinclair/typebox as the sole peer dependency, so anyone can build AI tooling or MCP servers on top of the ecosystem’s manifests, not just AbsoluteJS’s own products.',
			title: 'Open contract',
			variant: 'info'
		},
		{
			body: 'Hosts running untrusted manifests should additionally compose hardenUntrustedTool from @absolutejs/ai over the bridged tool map.',
			title: 'Untrusted manifests',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/manifest',
	samples: [
		{
			code: `// src/manifest.ts of @absolutejs/dispatch
import { Type } from '@sinclair/typebox';
import { defineManifest, toolFactory } from '@absolutejs/manifest';
import type { Dispatcher, DispatcherOptions } from './types';

const tool = toolFactory<Dispatcher>();

export const manifest = defineManifest<DispatcherOptions, Dispatcher>()({
	contract: 2,
	identity: {
		category: 'messaging',
		name: '@absolutejs/dispatch',
		tagline: 'Send email, texts, and push notifications from your site.'
	},
	settings: Type.Object({
		defaultFrom: Type.Optional(
			Type.Object(
				{ email: Type.Optional(Type.String({ format: 'email' })) },
				{ title: 'Default sender' }
			)
		)
	}),
	slots: {
		email: {
			configPath: 'email',
			contract: 'dispatch/email-adapter',
			description: 'Email transport',
			known: ['@absolutejs/dispatch-resend']
		}
	},
	tools: {
		send_email: tool.runtime({
			annotations: { idempotentHint: true, openWorldHint: true },
			authorization: {
				approval: 'policy',
				audience: 'authenticated',
				destinationFields: ['to'],
				effects: ['send', 'external-network'],
				idempotency: { mode: 'host' },
				requiredScopes: ['messaging:send'],
				reversible: false
			},
			description: 'Send a transactional email.',
			handler: async (input, dispatcher) => {
				const result = await dispatcher.email(input);

				return \`sent via \${result.provider}\`;
			},
			input: Type.Object({
				subject: Type.String(),
				text: Type.String(),
				to: Type.String({ format: 'email' })
			})
		})
	},
	wiring: [
		{
			id: 'default',
			server: {
				code: 'const dispatcher = createDispatcher({ email: \${slot.email}, ...\${settings} });',
				imports: [
					{ from: '@absolutejs/dispatch', names: ['createDispatcher'] }
				],
				placement: 'module-scope'
			},
			title: 'Create the dispatcher'
		}
	]
});`,
			description:
				'A package describes itself once; the settings schema is type-checked against the real exported config type.',
			heading: 'Authoring a Manifest',
			language: 'typescript'
		},
		{
			code: `import {
	loadManifest,
	toAIToolMap,
	toMcpToolRegistry
} from '@absolutejs/manifest';

const result = await loadManifest('@absolutejs/dispatch');
if (!result.ok) throw new Error(result.details);

const enforce = async (request, execute) => {
	await agency.authorizeAndLease(request);
	const result = await execute();
	await agency.recordReceipt(request, result);

	return result;
};

// AI tool loop (@absolutejs/ai)
const tools = toAIToolMap(result.manifest, { enforce, runtime: dispatcher });

// Remote MCP server (@absolutejs/mcp)
new Elysia().use(
	mcpServer({
		path: '/mcp',
		tools: () =>
			toMcpToolRegistry(result.manifest, { enforce, runtime: dispatcher })
	})
);`,
			description:
				'Load a guarded manifest and bridge it only through the host authorization, lease, and receipt boundary.',
			heading: 'Consuming Manifests',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Typed manifest contract for @absolutejs/* packages, with bridges that turn any manifest into an AI tool map or remote MCP tool registry.',
	version: '0.4.0'
};
