import type { PackageFeature } from '../../../../types/packageDocs';

export type FlagshipGuidance = {
	diagnostics: PackageFeature[];
	outcomes: PackageFeature[];
	production: PackageFeature[];
};

export const flagshipGuidanceByPackage: Record<string, FlagshipGuidance> = {
	'@absolutejs/a2a': {
		diagnostics: [
			{
				description:
					'Confirm the advertised protocol version and optional capabilities match the configured handlers. Then inspect authentication, authorization-key task ownership, media type, response size, and timeout failures.',
				title: 'Protocol or discovery failures'
			}
		],
		outcomes: [
			{
				description:
					'Expose authenticated JSON-RPC messaging, streaming, task subscriptions, pagination, push configuration, and extended Agent Cards through the A2A 1.0 protocol.',
				title: 'Standards-based agent transport'
			},
			{
				description:
					'Connect Agency approval decisions and single-use execution leases to remote agent actions without creating a second action ledger.',
				title: 'Governed remote actions'
			}
		],
		production: [
			{
				description:
					'Use durable authorization-fenced task and push-configuration stores. Independently harden webhook delivery against private-network resolution, redirects, unauthenticated requests, and non-idempotent retries.',
				title: 'Persist and isolate every caller'
			}
		]
	},
	'@absolutejs/absolute': {
		diagnostics: [
			{
				description:
					'Run the CLI doctor and inspect commands before deployment. Verify the build manifest, route composition, static assets, environment configuration, and compiled runtime target.',
				title: 'Build or runtime mismatch'
			}
		],
		outcomes: [
			{
				description:
					'Build type-safe Bun and Elysia applications with server rendering, streaming, islands, framework adapters, asset handling, and production compilation in one toolchain.',
				title: 'One full-stack runtime'
			},
			{
				description:
					'Compose route plugins and package manifests so application features remain independently testable and discoverable by the build system.',
				title: 'Composable application architecture'
			}
		],
		production: [
			{
				description:
					'Compile immutable production artifacts with environment-independent route composition, explicit assets, health checks, and deployment configuration supplied at the appropriate boundary.',
				title: 'Ship reproducible artifacts'
			}
		]
	},
	'@absolutejs/agency': {
		diagnostics: [
			{
				description:
					'Trace the canonical action binding, policy decision, approval or rejection, lease issuance, lease consumption, and execution receipt. A mismatch at any boundary should fail closed.',
				title: 'An action was not executed'
			}
		],
		outcomes: [
			{
				description:
					'Authorize the exact action an authenticated agent wants to perform, including actor, delegation, effects, resource, input digest, spend, and expiry.',
				title: 'Action-level authorization'
			},
			{
				description:
					'Coordinate approvals, terminal rejections, revocation, simulation, short-lived leases, execution, and receipts through one provider-neutral control plane.',
				title: 'Human and policy control'
			}
		],
		production: [
			{
				description:
					'Replace memory stores with transactional durable stores for actions, decisions, leases, receipts, kill switches, delegation state, and replay nonces before production.',
				title: 'Use durable Agency state'
			}
		]
	},
	'@absolutejs/agent': {
		diagnostics: [
			{
				description:
					'Run assertProductionReady() against the assembled stack. It identifies missing durability, authorization, sandbox, trust, memory, inbox, execution, policy, wallet, and control-plane concerns before traffic arrives.',
				title: 'A stack is incomplete'
			}
		],
		outcomes: [
			{
				description:
					'Assemble independently replaceable agent engines behind one typed facade with stable subpaths and an AbsoluteJS manifest.',
				title: 'A cohesive agent stack'
			},
			{
				description:
					'Use standard MCP, A2A, OAuth, auth.md, AuthZEN, Arazzo, and WebMCP surfaces without introducing an Absolute-only wire protocol.',
				title: 'Open interoperability'
			}
		],
		production: [
			{
				description:
					'Keep one Agency runtime owner and one compatible action contract. Configure every production-readiness capability explicitly and fail deployment when a required concern is absent.',
				title: 'One governed runtime'
			}
		]
	},
	'@absolutejs/ai': {
		diagnostics: [
			{
				description:
					'Inspect structured SSE terminal events first: complete, stopped, and error distinguish normal completion from budget limits, aborts, provider failures, and lookup failures.',
				title: 'A stream ended unexpectedly'
			}
		],
		outcomes: [
			{
				description:
					'Run provider-neutral chat and model traffic locally or across a trusted control plane while retaining host egress policy, tracing, aborts, and test transports.',
				title: 'Portable provider execution'
			},
			{
				description:
					'Serialize concurrent turns, expose queued state to every framework adapter, and create conversation branches without allowing later messages to overtake failures.',
				title: 'Deterministic conversations'
			}
		],
		production: [
			{
				description:
					'Use structured SSE events, explicit token and duration ceilings, abort propagation, heartbeat-aware proxying, and host-controlled provider credentials.',
				title: 'Bound every model stream'
			}
		]
	},
	'@absolutejs/auth': {
		diagnostics: [
			{
				description:
					'Start with the callback URI, provider configuration, cookie security, session expiry, and selected server entry point. Use the focused OIDC, SAML, WebAuthn, vault, and provider guides for protocol-specific failures.',
				title: 'Login or session failures'
			}
		],
		outcomes: [
			{
				description:
					'Add multi-provider login, sessions, route protection, recent-auth checks, organizations, API keys, MFA, passwordless flows, SSO, OIDC, SAML, and WebAuthn.',
				title: 'Complete application identity'
			},
			{
				description:
					'Bind authenticated users, delegated AI agents, authorization details, permissions, audit evidence, and credential vaults to one reusable request context.',
				title: 'Users and agents together'
			}
		],
		production: [
			{
				description:
					'Use durable session and credential stores, secure cookies, exact callback origins, provider-managed verification where required, bounded sessions, audit hooks, and explicit optional protocol adapters.',
				title: 'Harden every identity boundary'
			}
		]
	},
	'@absolutejs/billing': {
		diagnostics: [
			{
				description:
					'Inspect each invoice line’s charged quantity, free allowance, unit divisor, tier, rounding policy, minimum-charge adjustment, and integer-micro amount before comparing external invoice output.',
				title: 'An invoice total differs'
			}
		],
		outcomes: [
			{
				description:
					'Declare provider-neutral plans with base prices, usage dimensions, free allowances, graduated tiers, minimum charges, labels, and explicit rounding.',
				title: 'Model SaaS pricing'
			},
			{
				description:
					'Preview, dry-run, and re-price usage snapshots without calling Stripe, QuickBooks, or another invoicing provider.',
				title: 'Compute invoices deterministically'
			}
		],
		production: [
			{
				description:
					'Keep all prices in integer micros, version the plan used for each period, retain the input usage snapshot, and push the resulting invoice through a separately idempotent provider adapter.',
				title: 'Preserve billing evidence'
			}
		]
	},
	'@absolutejs/commerce': {
		diagnostics: [
			{
				description:
					'Follow the durable state transitions across catalog sync, publication, server-side cart resolution, payment intent, verified webhook receipt, order creation, fulfillment lease, and aftercare case.',
				title: 'A checkout did not converge'
			}
		],
		outcomes: [
			{
				description:
					'Manage supplier truth, tenant storefront merchandising, product variants, collections, artwork rules, server-resolved carts, and provider-neutral checkout.',
				title: 'Operate multi-store catalogs'
			},
			{
				description:
					'Coordinate payment, fulfillment, order access, notifications, returns, disputes, evidence, refunds, and production packets through durable boundaries.',
				title: 'Own the full order lifecycle'
			}
		],
		production: [
			{
				description:
					'Resolve price and policy on the server, verify webhook signatures before persistence, fence every provider installation by tenant, lease effects, preserve idempotency, and quarantine ambiguous outcomes.',
				title: 'Treat provider effects as durable workflows'
			}
		]
	},
	'@absolutejs/deploy': {
		diagnostics: [
			{
				description:
					'Run the verify stage against the target and inspect streamed release evidence, process-manager state, environment propagation, DNS, TLS, and provider-specific provisioning output.',
				title: 'A release is not healthy'
			}
		],
		outcomes: [
			{
				description:
					'Describe targets, process managers, pipelines, verification, streamed artifacts, environment synchronization, DNS, TLS, and global edge ingress through typed provider seams.',
				title: 'Automate complete releases'
			},
			{
				description:
					'Provision or reuse infrastructure from DigitalOcean, Hetzner, Cloudflare, and other adapters without coupling the release model to one provider.',
				title: 'Keep infrastructure replaceable'
			}
		],
		production: [
			{
				description:
					'Use immutable release artifacts, explicit target identity, idempotent provision-or-reuse operations, secret-aware environment propagation, certificate renewal, and post-release verification.',
				title: 'Make releases reproducible'
			}
		]
	},
	'@absolutejs/mcp': {
		diagnostics: [
			{
				description:
					'Inspect endpoint discovery, OAuth metadata, guard decisions, parsed tool input, Agency action state, durable task state, and the final MCP result separately.',
				title: 'A tool call was rejected or stalled'
			}
		],
		outcomes: [
			{
				description:
					'Publish typed MCP tools, prompts, resources, elicitation, feedback, OAuth-native clients, and stricter secondary endpoints from an AbsoluteJS application.',
				title: 'Build complete MCP servers'
			},
			{
				description:
					'Route consequential tool calls through Agency decisions and model long-running work as durable tasks instead of keeping requests open indefinitely.',
				title: 'Govern and persist agent work'
			}
		],
		production: [
			{
				description:
					'Authenticate before tool execution, validate every input, separate endpoint trust levels, persist durable tasks, bound scratchpad data, and retain authorization and execution evidence.',
				title: 'Secure the protocol boundary'
			}
		]
	},
	'@absolutejs/observability': {
		diagnostics: [
			{
				description:
					'Check that the relay is mounted before application routes and that endpoint, token, and project environment variables are present. Then verify same-origin delivery and project fencing.',
				title: 'Issues or replays are missing'
			}
		],
		outcomes: [
			{
				description:
					'Correlate browser issues with privacy-masked replay tails and capture thrown, handled, and otherwise unexplained server 5xx responses in one project-fenced history.',
				title: 'Join browser and server evidence'
			},
			{
				description:
					'Promote contradictory agent handoff summaries into the same issue pipeline without copying evidence messages, references, external identifiers, or raw payloads.',
				title: 'Observe agent contradictions'
			}
		],
		production: [
			{
				description:
					'Keep write credentials server-side, mask sensitive browser inputs, redact secret-shaped server context before egress, and mount the relay early enough to observe generated handlers.',
				title: 'Preserve privacy by default'
			}
		]
	},
	'@absolutejs/queue': {
		diagnostics: [
			{
				description:
					'Inspect job kind and payload validation, runAt, attempts, retry backoff, claim ownership, worker liveness, dead-letter state, and the configured durable store.',
				title: 'A job did not run'
			}
		],
		outcomes: [
			{
				description:
					'Define schema-validated job kinds once, infer payload types, enqueue delayed work, claim safely across workers, retry with backoff, and dead-letter terminal failures.',
				title: 'Run durable background jobs'
			},
			{
				description:
					'Combine recurring cron triggers with queue durability and wake idle-killed tenant runtimes from an always-on control plane.',
				title: 'Schedule work across sleeping tenants'
			}
		],
		production: [
			{
				description:
					'Use a production store, stable idempotency keys, bounded retries, dead-letter operations, independent worker health, and persisted wake-scheduler snapshots.',
				title: 'Keep execution restart-safe'
			}
		]
	},
	'@absolutejs/rag': {
		diagnostics: [
			{
				description:
					'Separate ingestion, chunking, embedding, storage, lexical retrieval, vector retrieval, fusion, reranking, and answer grounding. Evaluate each stage against a retained baseline.',
				title: 'Retrieval quality regressed'
			}
		],
		outcomes: [
			{
				description:
					'Ingest files, URLs, office documents, archives, images, and media transcripts; synchronize durable sources; and search with lexical, vector, hybrid, transformed, and reranked retrieval.',
				title: 'Build complete retrieval pipelines'
			},
			{
				description:
					'Swap memory, PostgreSQL/pgvector, SQLite/vec0, and Pinecone stores behind one contract and expose retrieval through framework-neutral or framework-specific clients.',
				title: 'Choose storage without changing the app'
			}
		],
		production: [
			{
				description:
					'Persist source checkpoints, make ingestion idempotent, pin embedding dimensions, test retrieval relevance and grounding, compare rerankers, and block releases that regress the evaluation baseline.',
				title: 'Treat retrieval quality as a release gate'
			}
		]
	},
	'@absolutejs/sync': {
		diagnostics: [
			{
				description:
					'Inspect the collection query, mutation commit, change publication, topic derivation, broker delivery, client cursor, reconnect state, and local projection in that order.',
				title: 'A client stopped updating'
			}
		],
		outcomes: [
			{
				description:
					'Push database changes into live collections and framework bindings without polling or manually naming every invalidation topic.',
				title: 'Reactive application data'
			},
			{
				description:
					'Compose CRDT collaboration, write-behind caching, PostgreSQL/MySQL/SQLite stores, ORM integrations, and one brokered upstream pool for many tenants.',
				title: 'A complete synchronization engine'
			}
		],
		production: [
			{
				description:
					'Use durable cursors, reconnect and replay behavior, bounded upstream pools, explicit conflict semantics, transaction-aware change publication, and adapter-specific operational metrics.',
				title: 'Design for reconnects and concurrency'
			}
		]
	},
	'@absolutejs/voice': {
		diagnostics: [
			{
				description:
					'Follow the default debug path through session state, media ingress, STT, turn timing, model routing, tools, TTS, delivery, telephony, traces, and replay before swapping providers.',
				title: 'A call sounds or behaves incorrectly'
			}
		],
		outcomes: [
			{
				description:
					'Build browser and phone voice agents with streaming STT, model routing, tools, RAG, TTS, telephony, framework helpers, fallback, reconnection, and session storage.',
				title: 'Own the realtime voice stack'
			},
			{
				description:
					'Run support, scheduling, outreach, meeting-recording, and compliance-sensitive workflows with simulations, proof packs, live monitoring, operator controls, and post-call analysis.',
				title: 'Operate production voice workflows'
			}
		],
		production: [
			{
				description:
					'Complete the readiness checklist for latency budgets, provider fallback, telephony, storage, delivery, compliance, observability, simulations, multilingual quality, and operator recovery.',
				title: 'Prove readiness before live traffic'
			}
		]
	}
};
