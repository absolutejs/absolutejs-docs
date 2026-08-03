import type { OutcomePlaybook } from '../../../types/outcomePlaybook';

export const outcomePlaybooks: OutcomePlaybook[] = [
	{
		description:
			'Authenticate an agent, authorize one exact action, execute it durably, and retain evidence without creating competing policy owners.',
		expectedResults: [
			'An unauthorized action is rejected before its effect runs.',
			'An authorized action has one stable operation id and one Agency decision owner.',
			'Audit records correlate the agent run, action, effect, and outcome without storing prompts by default.'
		],
		failures: [
			{
				check: 'Confirm the actor, delegation, resource, and requested capability match the Agency policy input.',
				ifTrue: 'Inspect policy precedence and denial evidence.',
				problem: 'The action is denied.'
			},
			{
				check: 'Look up the existing operation by idempotency key before retrying.',
				ifTrue: 'Resume or reconcile that operation instead of issuing a second effect.',
				problem: 'The effect timed out or its result is ambiguous.'
			}
		],
		fileTree: `src/
  agent.ts        # runtime and tool registration
  policy.ts       # one Agency owner and action policy
  operations.ts   # Execution store and effect reconciliation
  audit.ts        # redacted run/action evidence
  server.ts       # authenticated transport boundary`,
		id: 'playbook-governed-agent',
		installCommand:
			'bun add @absolutejs/agent-runtime @absolutejs/agency @absolutejs/execution @absolutejs/audit',
		packages: [
			{
				detail: 'Runs the model/tool loop and emits typed lifecycle events.',
				name: '@absolutejs/agent-runtime',
				phase: 'required',
				role: 'Orchestrate',
				view: 'agent'
			},
			{
				detail: 'Owns the single authoritative action policy and decision ledger.',
				name: '@absolutejs/agency',
				phase: 'required',
				role: 'Authorize',
				view: 'agency'
			},
			{
				detail: 'Makes consequential effects resumable, idempotent, and reconcilable.',
				name: '@absolutejs/execution',
				phase: 'production',
				role: 'Execute',
				view: 'execution'
			},
			{
				detail: 'Records minimized run, action, handoff, and outcome evidence.',
				name: '@absolutejs/audit',
				phase: 'operate',
				role: 'Prove',
				view: 'audit'
			}
		],
		prerequisites: [
			'An application-authenticated actor and tenant boundary.',
			'A model provider configured outside the policy layer.',
			'A stable idempotency key for every consequential action.'
		],
		quickstart: [
			{
				detail: 'Create one Agency instance and pass it to every protected tool surface.',
				label: 'Own policy once',
				verify: 'A denied test action produces a decision but no effect.'
			},
			{
				detail: 'Register one deterministic tool and run it with a memory-backed operation store.',
				label: 'Run locally',
				verify: 'The tool result and operation id are stable across an intentional retry.'
			},
			{
				detail: 'Wire agent and Agency observers into Audit.',
				label: 'Capture evidence',
				verify: 'The audit stream links run, action, effect, and outcome ids.'
			}
		],
		substitutions: [
			{
				development: 'Memory Agency and operation stores',
				production: 'Durable tenant-fenced stores',
				reason: 'Decisions and effects must survive process loss and horizontal scaling.'
			},
			{
				development: 'Inline effect execution',
				production: 'Execution leases with reconciliation',
				reason: 'Timeouts cannot safely imply that an external effect did not happen.'
			}
		],
		title: 'Govern an AI agent'
	},
	{
		description:
			'Carry one tenant request from identity and project administration through runtime health, usage, billing, and an SLO release decision.',
		expectedResults: [
			'A tenant-scoped administrator can perform an allowed project action.',
			'The same tenant and operation identifiers appear in usage, health, and audit records.',
			'A release gate can distinguish healthy delivery from budget or SLO exhaustion.'
		],
		failures: [
			{
				check: 'Compare the authenticated tenant with the project resource tenant before querying data.',
				ifTrue: 'Reject before Admin navigation or data is produced.',
				problem: 'A project action crosses tenant scope.'
			},
			{
				check: 'Separate a missing metric from a failing objective.',
				ifTrue: 'Block release on unknown evidence instead of treating it as healthy.',
				problem: 'The SLO gate has incomplete telemetry.'
			}
		],
		fileTree: `src/
  auth.ts         # identity and tenant context
  admin.ts        # project roles and server authorization
  runtime.ts      # request lifecycle and health
  usage.ts        # metering and billing dimensions
  release.ts      # deploy verification and SLO gate`,
		id: 'playbook-saas-platform',
		installCommand:
			'bun add @absolutejs/auth @absolutejs/admin @absolutejs/runtime @absolutejs/metering @absolutejs/billing @absolutejs/health @absolutejs/slo @absolutejs/deploy',
		packages: [
			{
				detail: 'Resolves the user, session, organization, and tenant context.',
				name: '@absolutejs/auth',
				phase: 'required',
				role: 'Identify',
				view: 'absolute-auth'
			},
			{
				detail: 'Maps project roles to capabilities and fail-closed server decisions.',
				name: '@absolutejs/admin',
				phase: 'required',
				role: 'Administer',
				view: 'admin'
			},
			{
				detail: 'Connects request lifecycle, health, and operational state.',
				name: '@absolutejs/runtime',
				phase: 'required',
				role: 'Run',
				view: 'runtime'
			},
			{
				detail: 'Records billable dimensions and turns them into account charges.',
				name: '@absolutejs/metering + billing',
				phase: 'production',
				role: 'Account',
				view: 'metering'
			},
			{
				detail: 'Verifies releases and blocks promotion on unhealthy objectives.',
				name: '@absolutejs/health + slo + deploy',
				phase: 'operate',
				role: 'Release',
				view: 'deploy'
			}
		],
		prerequisites: [
			'A durable user, tenant, project, and membership model.',
			'A database transaction boundary shared by project mutations and usage evidence.',
			'A release environment with observable health checks.'
		],
		quickstart: [
			{
				detail: 'Resolve a tenant-scoped user and authorize one Admin capability on the server.',
				label: 'Protect one action',
				verify: 'Viewer is denied; administrator succeeds for the same project.'
			},
			{
				detail: 'Record one usage dimension with the tenant and operation id.',
				label: 'Account for work',
				verify: 'The usage query returns exactly one idempotent record.'
			},
			{
				detail: 'Deploy, run health verification, then evaluate the release SLO.',
				label: 'Gate a release',
				verify: 'A forced unhealthy check blocks promotion and preserves evidence.'
			}
		],
		substitutions: [
			{
				development: 'Single process and memory health history',
				production: 'Durable shared stores and external probes',
				reason: 'All instances and release operators need the same tenant and health truth.'
			},
			{
				development: 'Manual invoice inspection',
				production: 'Idempotent billing export and reconciliation',
				reason: 'Usage acceptance and money movement fail independently.'
			}
		],
		title: 'Ship a SaaS platform'
	},
	{
		description:
			'Build a live collaborative document with authoritative hydration, early-edit reconciliation, durable jobs, and multi-instance fanout.',
		expectedResults: [
			'Two browser tabs converge after concurrent edits.',
			'Edits made before authoritative hydration are retained.',
			'A reconnected client receives only the delta it missed.'
		],
		failures: [
			{
				check: 'Confirm document-scoped params and authorization resolve the same collection key.',
				ifTrue: 'Reject or resubscribe before applying local state.',
				problem:
					'The client hydrates the wrong document or an empty collection.'
			},
			{
				check: 'Check whether more than one application instance owns subscribers.',
				ifTrue: 'Add the Postgres or Redis cluster bus.',
				problem: 'Updates reach clients on only one server.'
			}
		],
		fileTree: `src/
  collections.ts  # schema, params, authorization
  sync.ts         # engine and durable store
  server.ts       # WebSocket route
  client.tsx      # ready state and buffered edits
  jobs.ts         # durable side effects`,
		id: 'playbook-realtime-collaboration',
		installCommand:
			'bun add @absolutejs/sync @absolutejs/queue @absolutejs/audit',
		packages: [
			{
				detail: 'Owns live collections, CRDT hydration, deltas, and client readiness.',
				name: '@absolutejs/sync',
				phase: 'required',
				role: 'Synchronize',
				view: 'sync-overview'
			},
			{
				detail: 'Runs durable post-commit jobs without blocking collaborative updates.',
				name: '@absolutejs/queue',
				phase: 'production',
				role: 'Effect',
				view: 'queue-overview'
			},
			{
				detail: 'Records mutations, reconnects, and operator actions.',
				name: '@absolutejs/audit',
				phase: 'operate',
				role: 'Observe',
				view: 'audit'
			}
		],
		prerequisites: [
			'One stable authenticated document id and authorization check.',
			'A durable authoritative store for document rows or CRDT bytes.',
			'A cluster bus when more than one server accepts connections.'
		],
		quickstart: [
			{
				detail: 'Define one document-scoped collection with params and server authorization.',
				label: 'Scope',
				verify: 'A user without document access cannot subscribe.'
			},
			{
				detail: 'Mount the server route and connect two local browser clients.',
				label: 'Connect',
				verify: 'An edit in either tab appears in the other.'
			},
			{
				detail: 'Type before ready, reconnect, and introduce a concurrent edit.',
				label: 'Stress hydration',
				verify: 'Buffered and remote edits converge without lost keystrokes.'
			}
		],
		substitutions: [
			{
				development: 'In-process subscribers and stores',
				production: 'Durable store plus Postgres or Redis cluster bus',
				reason: 'Connections and authoritative state are distributed across processes.'
			},
			{
				development: 'Inline post-update work',
				production: 'Idempotent queued jobs',
				reason: 'External effects must not extend or duplicate the collaboration transaction.'
			}
		],
		title: 'Add realtime collaboration'
	},
	{
		description:
			'Send a zero-credential local message, then move through consent, provider delivery, durable callbacks, and operational evidence.',
		expectedResults: [
			'The memory adapter contains exactly one normalized message.',
			'A denied-consent test never invokes the provider adapter.',
			'A duplicate provider callback produces one normalized application event.'
		],
		failures: [
			{
				check: 'Inspect policy and consent evidence before provider logs.',
				ifTrue: 'Correct recipient/channel consent or application policy.',
				problem: 'A send is rejected before delivery.'
			},
			{
				check: 'Determine whether the provider accepted the request before retrying.',
				ifTrue: 'Reconcile by idempotency key and callback status.',
				problem: 'Delivery is indeterminate.'
			}
		],
		fileTree: `src/
  dispatch.ts      # dispatcher and channel policies
  consent.ts       # recipient/channel decisions
  callbacks.ts     # verified durable webhook intake
  worker.ts        # retryable callback drain
  dispatch.test.ts # memory-adapter proof`,
		id: 'playbook-messaging',
		installCommand: 'bun add @absolutejs/dispatch @absolutejs/audit',
		packages: [
			{
				detail: 'Normalizes email, messaging, and push behind one policy boundary.',
				name: '@absolutejs/dispatch',
				phase: 'required',
				role: 'Send',
				view: 'dispatch'
			},
			{
				detail: 'Owns recipient purpose, channel permission, and revocation evidence.',
				name: '@absolutejs/compliance',
				phase: 'production',
				role: 'Consent',
				view: 'compliance'
			},
			{
				detail: 'Makes callback intake, retries, and indeterminate delivery operable.',
				name: '@absolutejs/reliability',
				phase: 'production',
				role: 'Recover',
				view: 'reliability'
			},
			{
				detail: 'Retains minimized send and callback evidence.',
				name: '@absolutejs/audit',
				phase: 'operate',
				role: 'Prove',
				view: 'audit'
			}
		],
		prerequisites: [
			'A stable tenant and recipient identity.',
			'Explicit consent rules for every outbound channel.',
			'Provider credentials and verified callback secrets only after local success.'
		],
		quickstart: [
			{
				detail: 'Use the bundled memory adapter and send one email-shaped message.',
				label: 'Send locally',
				verify: 'inspect() returns exactly the normalized message you sent.'
			},
			{
				detail: 'Add a policy that rejects a recipient without consent.',
				label: 'Enforce consent',
				verify: 'The result is denied and the adapter remains empty.'
			},
			{
				detail: 'Replace memory with one provider and verify its signed callback.',
				label: 'Go live',
				verify: 'Provider acceptance and normalized delivery share the idempotency key.'
			}
		],
		substitutions: [
			{
				development: 'Memory channel adapter',
				production: 'One explicit provider adapter per channel',
				reason: 'Provider credentials and delivery semantics stay outside application intent.'
			},
			{
				development: 'Inline callback processing',
				production: 'Durable intake plus retryable drain',
				reason: 'Acknowledgement, persistence, and application effects fail independently.'
			}
		],
		title: 'Deliver messages safely'
	},
	{
		description:
			'Connect one caller, resolve a provider stack, complete a turn, and retain the trace needed to operate the call.',
		expectedResults: [
			'A client connects and receives the configured greeting.',
			'One spoken turn produces a transcript and assistant response.',
			'The session trace contains provider, latency, cost, tool, and completion evidence.'
		],
		failures: [
			{
				check: 'Verify audio format, sample rate, credentials, and provider readiness before assistant logic.',
				ifTrue: 'Correct the adapter boundary and rerun its contract test.',
				problem: 'The call connects but no transcript appears.'
			},
			{
				check: 'Compare turn detection, barge-in, and provider latency on the session trace.',
				ifTrue: 'Tune the responsible stage instead of the whole assistant.',
				problem: 'Responses are late or overlap the caller.'
			}
		],
		fileTree: `src/
  voice.ts        # runtime and route
  assistant.ts    # prompt, tools, handoff
  providers.ts    # STT/TTS or realtime adapters
  ops.ts          # trace, recording, cost, readiness
  voice.test.ts   # synthetic caller scenario`,
		id: 'playbook-voice-agent',
		installCommand:
			'bun add @absolutejs/voice @absolutejs/voice-tester elysia',
		packages: [
			{
				detail: 'Owns sessions, turns, assistants, tools, handoff, and operational evidence.',
				name: '@absolutejs/voice',
				phase: 'required',
				role: 'Run',
				view: 'voice-runtime'
			},
			{
				detail: 'Provides independently installed STT, TTS, or realtime implementations.',
				name: 'Voice provider adapters',
				phase: 'required',
				role: 'Connect providers',
				view: 'voice-adapters'
			},
			{
				detail: 'Drives deterministic, Discord, WebSocket, or real-phone caller scenarios.',
				name: '@absolutejs/voice-tester',
				phase: 'production',
				role: 'Verify',
				view: 'voice-tester'
			},
			{
				detail: 'Explains trace, SLO, incident, replay, proof, and readiness surfaces.',
				name: 'Voice operations',
				phase: 'operate',
				role: 'Operate',
				view: 'voice-ops-proof'
			}
		],
		prerequisites: [
			'Choose cascaded STT/TTS or one realtime provider path.',
			'Provider credentials, expected audio format, and a public route for telephony.',
			'An application-owned session and retention policy.'
		],
		quickstart: [
			{
				detail: 'Run one adapter contract or deterministic tester scenario before opening a live route.',
				label: 'Verify providers',
				verify: 'The fixture yields the expected transcript or audio without an application server.'
			},
			{
				detail: 'Mount one voice route with a greeting and one turn handler.',
				label: 'Complete a turn',
				verify: 'The client receives a greeting, transcript, and response.'
			},
			{
				detail: 'Run the same behavior through a synthetic caller scenario.',
				label: 'Prove behavior',
				verify: 'The scenario asserts completion, latency, and expected conversation evidence.'
			}
		],
		substitutions: [
			{
				development: 'Fixtures or one low-friction provider',
				production:
					'Readiness-checked provider route with explicit fallback',
				reason: 'Provider latency and availability are independent failure domains.'
			},
			{
				development: 'Memory session and trace stores',
				production: 'Durable scoped stores with retention policy',
				reason: 'Calls, recordings, costs, and evidence outlive a process.'
			}
		],
		title: 'Build a voice agent'
	},
	{
		description:
			'Move from discovery and enrichment through audience selection, consent-aware outreach, checkout, and reconciled money movement.',
		expectedResults: [
			'Every lead carries source and enrichment provenance.',
			'Only consented audience members enter the dispatch workflow.',
			'Checkout, fulfillment, refund, and aftercare share stable order/action identifiers.'
		],
		failures: [
			{
				check: 'Inspect provenance, confidence, and account-scoped identity before merging.',
				ifTrue: 'Quarantine uncertain enrichment instead of overwriting canonical truth.',
				problem:
					'Two discovered entities may be the same customer or supplier.'
			},
			{
				check: 'Reconcile payment and fulfillment independently by durable action id.',
				ifTrue: 'Resume only the incomplete side of the order lifecycle.',
				problem:
					'Checkout or cancellation has an ambiguous external effect.'
			}
		],
		fileTree: `src/
  discovery.ts    # sourced entities
  enrichment.ts   # provenance-aware attributes
  audience.ts     # deterministic segment
  outreach.ts     # consent and dispatch
  commerce.ts     # order and fulfillment lifecycle`,
		id: 'playbook-commerce-growth',
		installCommand:
			'bun add @absolutejs/discover @absolutejs/enrich @absolutejs/audience @absolutejs/dispatch @absolutejs/commerce @absolutejs/audit',
		packages: [
			{
				detail: 'Finds candidates while retaining source identity.',
				name: '@absolutejs/discover',
				phase: 'required',
				role: 'Discover',
				view: 'discover'
			},
			{
				detail: 'Adds typed attributes with provenance and confidence.',
				name: '@absolutejs/enrich',
				phase: 'required',
				role: 'Qualify',
				view: 'enrich'
			},
			{
				detail: 'Builds repeatable segments and activation evidence.',
				name: '@absolutejs/audience',
				phase: 'required',
				role: 'Select',
				view: 'audience'
			},
			{
				detail: 'Delivers consent-aware outreach across channels.',
				name: '@absolutejs/dispatch',
				phase: 'production',
				role: 'Engage',
				view: 'dispatch'
			},
			{
				detail: 'Owns catalog, order, payment, fulfillment, refund, and aftercare state.',
				name: '@absolutejs/commerce',
				phase: 'production',
				role: 'Convert',
				view: 'commerce'
			},
			{
				detail: 'Correlates provenance, activation, order, payment, and fulfillment evidence.',
				name: '@absolutejs/audit',
				phase: 'operate',
				role: 'Prove',
				view: 'audit'
			}
		],
		prerequisites: [
			'A canonical account-scoped identity model.',
			'Provenance and consent retention requirements.',
			'Idempotency keys for provider, order, and payment effects.'
		],
		quickstart: [
			{
				detail: 'Discover and enrich one fixture entity without an external send.',
				label: 'Build sourced truth',
				verify: 'Every accepted field retains source and confidence.'
			},
			{
				detail: 'Evaluate one audience and dispatch into a memory adapter.',
				label: 'Activate safely',
				verify: 'Only the consented fixture appears in the adapter.'
			},
			{
				detail: 'Create one order with fake payment and fulfillment adapters.',
				label: 'Complete conversion',
				verify: 'The order reaches a terminal state and can be idempotently replayed.'
			}
		],
		substitutions: [
			{
				development: 'Fixture sources and memory adapters',
				production: 'Rate-bounded providers with durable checkpoints',
				reason: 'External datasets, messaging, payments, and fulfillment fail independently.'
			},
			{
				development: 'Inline order effects',
				production: 'Leased idempotent coordinators with quarantine',
				reason: 'Ambiguous money and fulfillment effects require explicit reconciliation.'
			}
		],
		title: 'Build commerce growth'
	},
	{
		description:
			'Protect requests and effects, then produce signed release evidence that a deployment gate can verify independently.',
		expectedResults: [
			'Abusive or unauthorized requests fail before secrets or effects are exposed.',
			'A vulnerability policy produces deterministic pass/fail evidence.',
			'Attestation, deployment, and audit records share the release artifact digest.'
		],
		failures: [
			{
				check: 'Separate missing evidence, invalid signatures, stale intelligence, and a genuine policy failure.',
				ifTrue: 'Fail closed with the exact missing or invalid trust-chain link.',
				problem: 'A release bundle cannot be verified.'
			},
			{
				check: 'Correlate the artifact digest across vulnerability, attestation, deploy, and audit records.',
				ifTrue: 'Reject evidence produced for a different artifact.',
				problem:
					'Evidence is individually valid but belongs to another release.'
			}
		],
		fileTree: `security/
  request.ts       # auth, rate limit, secret boundary
  scan.ts          # SBOM and vulnerability policy
  attest.ts        # signed artifact statement
  release.ts       # deploy gate and verification
  audit.ts         # immutable release evidence`,
		id: 'playbook-release-assurance',
		installCommand:
			'bun add @absolutejs/auth @absolutejs/rate-limit @absolutejs/secrets @absolutejs/vulnerabilities @absolutejs/attest @absolutejs/deploy @absolutejs/audit',
		packages: [
			{
				detail: 'Rejects unknown actors and abusive request volume.',
				name: '@absolutejs/auth + rate-limit',
				phase: 'required',
				role: 'Protect requests',
				view: 'rate-limit'
			},
			{
				detail: 'Keeps credentials outside package and effect payloads.',
				name: '@absolutejs/secrets',
				phase: 'required',
				role: 'Protect effects',
				view: 'secrets'
			},
			{
				detail: 'Normalizes findings and produces signed policy evidence.',
				name: '@absolutejs/vulnerabilities',
				phase: 'production',
				role: 'Evaluate',
				view: 'vulnerabilities'
			},
			{
				detail: 'Binds claims to the exact release artifact digest.',
				name: '@absolutejs/attest',
				phase: 'production',
				role: 'Attest',
				view: 'attest'
			},
			{
				detail: 'Verifies evidence before promotion and retains the release trail.',
				name: '@absolutejs/deploy + audit',
				phase: 'operate',
				role: 'Gate and prove',
				view: 'deploy'
			}
		],
		prerequisites: [
			'One immutable artifact digest used by every evidence producer.',
			'A trusted signing key with rotation and revocation policy.',
			'Pinned scanner intelligence and explicit admission policy.'
		],
		quickstart: [
			{
				detail: 'Generate or import a small scanner result and evaluate one explicit policy.',
				label: 'Evaluate',
				verify: 'A known vulnerable fixture fails with a deterministic finding id.'
			},
			{
				detail: 'Sign evidence bound to the artifact digest and verify it with public material only.',
				label: 'Attest',
				verify: 'Changing the digest or evidence invalidates verification.'
			},
			{
				detail: 'Require the verified bundle during deployment promotion.',
				label: 'Gate',
				verify: 'Missing, stale, invalid, or failing evidence blocks the release.'
			}
		],
		substitutions: [
			{
				development: 'Local key and scanner fixture',
				production:
					'Managed signing boundary and pinned intelligence snapshot',
				reason: 'Evidence trust depends on key custody and reproducible inputs.'
			},
			{
				development: 'Console verification',
				production:
					'Fail-closed deploy admission plus immutable audit sink',
				reason: 'Release assurance must be independently enforceable and reviewable.'
			}
		],
		title: 'Prove a safe release'
	}
];

export const outcomePlaybookById = Object.fromEntries(
	outcomePlaybooks.map((playbook) => [playbook.id, playbook])
);

export const playbooksForView = (view: string) =>
	outcomePlaybooks.filter((playbook) =>
		playbook.packages.some((packageRole) => packageRole.view === view)
	);
