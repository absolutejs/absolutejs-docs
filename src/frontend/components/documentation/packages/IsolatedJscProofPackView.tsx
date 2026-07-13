/* eslint-disable absolute/max-jsxnesting */
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { StatBand, StatTile } from '../../utils/StatBand';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import {
	VersionTimeline,
	VersionTimelineEntry
} from '../../utils/VersionTimeline';
import { DocsNavigation } from '../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#isolated-jsc-proof-pack', label: '0.11.0 proof pack' },
	{ href: '#what-shipped', label: 'What shipped' },
	{ href: '#receipts-limits', label: 'Receipts + limits' },
	{ href: '#bun-wedge', label: 'Bun wedge' },
	{ href: '#example', label: 'Agent tool example' },
	{ href: '#decision-guide', label: 'Decision guide' },
	{ href: '#security', label: 'Security posture' },
	{ href: '#start-here', label: 'Start here' }
];

const shippedRows: DocsTableCell[][] = [
	[
		'Benchmark proof pack',
		'Reproducible local measurements for FFI, Worker, Bun process-spawn, and optional Node isolated-vm baselines.'
	],
	[
		'Migration guide',
		'A concrete path for teams moving a Node isolated-vm workload to Bun and JavaScriptCore.'
	],
	[
		'Security model',
		'Explicit FFI vs Worker guarantees, Worker residuals, resource limits, and deployment hardening guidance.'
	],
	[
		'TypeScript helpers',
		'Bun-native transpilation helpers for string source and real .ts/.tsx/.js/.jsx files before isolate execution.'
	],
	[
		'Capability broker',
		'Named host tools with validation hooks, timeout, concurrency, output byte caps, tenant context, manifests, redacted audit events, bounded audit buffers, typed tool definitions, and typed host-side direct calls.'
	],
	[
		'Execution receipts',
		'Per-run receipts for scripts, callables, one-shot execution, and pooled runners, including backend, policy, timing, metrics, output size, capability summaries, console bounds, and dropped-audit counts.'
	],
	[
		'Output boundaries',
		'Run-level result byte limits, per-capability output byte limits, and isolate-level console entry/byte limits so successful outputs, tool outputs, and captured logs stay bounded.'
	],
	[
		'Doctor CLI',
		'A package bin that reports Bun/platform details, FFI availability, checked JSC paths, and install hints.'
	],
	[
		'Agent-tool example',
		'A runnable demo combining TypeScript callables, brokered tools, tenant context, metrics, and audit events.'
	],
	[
		'Policy presets + runners',
		'Product-ready recipes for AI tools, tenant scripts, plugins, and trusted code, including recommended result, console, audit, broker, and pool defaults.'
	],
	[
		'Hibernating isolate pool',
		'A keyed isolate + context pool that checkpoints idle tenants down to bytes and wakes them transparently on the next call, with a pluggable hibernation store (0.9.0).'
	],
	[
		'Pool operator surface',
		'metrics(), drain(), and warm(key) on both pools for cost metering, graceful shard shutdown, and predictive pre-warm (0.10.0).'
	],
	[
		'OpenTelemetry tracing',
		'Optional tracerProvider on the hibernating pool emits an isolated_jsc.run span per pool.run with tenant and wake attributes (0.11.0).'
	]
];

const benchmarkStats: StatTile[] = [
	{
		detail: 'FFI backend, 100 warm iterations of bench:proof',
		label: 'Warm callable p50',
		unit: 'ms',
		value: '0.23'
	},
	{
		detail: 'FFI backend, includes backend startup',
		label: 'Cold isolate p50',
		unit: 'ms',
		value: '1.15'
	},
	{
		detail: 'FFI backend; the Worker fallback sits at ~46 MB',
		label: 'Cold heap',
		unit: 'KB',
		value: '~300'
	},
	{
		detail: 'Bun subprocess per execution, the baseline it replaces',
		label: 'Process-spawn p50',
		unit: 'ms',
		value: '25.8'
	}
];

const releaseTimeline: VersionTimelineEntry[] = [
	{
		description:
			'Preserves host Reference error metadata — capability code, tool, and output-size fields — when errors cross the FFI backend.',
		title: 'FFI error metadata parity',
		version: '0.8.11'
	},
	{
		description:
			'Adds schemaVersion: 1 to capability manifest entries and execution receipts so apps can persist and parse audit records against an explicit stable schema.',
		title: 'Stable audit schema',
		version: '0.8.12'
	},
	{
		description:
			'Contract tests lock the schema-v1 manifest and receipt key sets so future audit-surface changes are intentional.',
		title: 'Schema contract tests',
		version: '0.8.13'
	},
	{
		description:
			'Expands default and per-tool audit redactors: masked emails, opaque card tokens, and redacted processor trace identifiers.',
		title: 'Broker redaction examples',
		version: '0.8.14'
	},
	{
		description:
			'Resolved policies carry recommended result, console, audit buffer, broker, and runner pool settings; policy isolates inherit the recipe result-size limit as a default run option.',
		title: 'Packaged policy recipes',
		version: '0.8.15'
	},
	{
		description:
			'policyAuditOptions(), policyBrokerOptions(), policyConsoleOptions(), policyRunOptions(), and policyRunnerOptions() return copy-safe option objects for wiring recipes into surrounding APIs.',
		title: 'Policy helper builders',
		version: '0.8.16'
	},
	{
		description:
			'SNAPSHOT_RESEARCH.md documents why the public JSC C API supports data checkpoints but not a V8-style heap pause/resume snapshot.',
		title: 'Checkpoint boundary documented',
		version: '0.8.17'
	},
	{
		description:
			'Scripts and callables can live in real .ts/.tsx/.js/.jsx files via compileTypeScriptFile(), runIsolatedFile(), and runner file methods instead of string literals.',
		title: 'File-backed sources',
		version: '0.8.18'
	},
	{
		description:
			'context.checkpoint(options) with schema version, byte length, skip reasons, and maxBytes / include / exclude controls, plus createContext({ checkpoint }) restore.',
		title: 'Explicit context checkpoints',
		version: '0.8.19'
	},
	{
		description:
			'validateContextCheckpoint() and runtime restore validation fail malformed persisted checkpoints before seed code runs; backend parity tests cover Worker and FFI.',
		title: 'Restore validation',
		version: '0.8.20'
	},
	{
		description:
			'checkpointWithReceipt() and createContextWithReceipt() return schema-v1 CheckpointReceipt envelopes; the error path rethrows with the receipt attached.',
		title: 'Checkpoint receipts',
		version: '0.8.21'
	},
	{
		description:
			'createHibernatingIsolatePool checkpoints idle tenant contexts to bytes and wakes them transparently on the next call; createInMemoryHibernationStore ships as the default pluggable store.',
		highlight: true,
		title: 'Hibernating isolate pool',
		version: '0.9.0'
	},
	{
		description:
			'metrics(), drain(), and warm(key) on both pools — cumulative cost counters for metering, graceful shard shutdown, and predictive pre-warm without invoking user code.',
		highlight: true,
		title: 'Pool operator surface',
		version: '0.10.0'
	},
	{
		description:
			'HibernatingIsolatePoolOptions.tracerProvider accepts any @opentelemetry/api-compatible provider and emits an isolated_jsc.run span per pool.run(key, fn); zero-cost when omitted.',
		highlight: true,
		title: 'OpenTelemetry tracing',
		version: '0.11.0'
	}
];

const installCode = `bun add @absolutejs/isolated-jsc
bunx @absolutejs/isolated-jsc`;

const agentToolCode = `import {
  createCapabilityAuditBuffer,
  createCapabilityBroker,
  createIsolatedRunner,
  defineCapabilityTool
} from "@absolutejs/isolated-jsc";

type TenantContext = { id: string; plan: "free" | "pro" };
type OrderLookup = { id: string };
type Order = { id: string; status: string; totalUsd: number };

const audit = createCapabilityAuditBuffer<TenantContext>({ maxEvents: 100 });

const broker = createCapabilityBroker(
  {
    lookupOrder: defineCapabilityTool<
      OrderLookup,
      Order | null,
      TenantContext
    >({
      description: "Read one order by id for the current tenant",
      input: "OrderLookup",
      output: "Order | null",
      maxOutputBytes: 16_384,
      risk: "read-only",
      timeoutMs: 100,
      redactAuditInput: (input) => ({ id: (input as { id?: unknown }).id }),
      redactAuditOutput: (output) => {
        if (output === null) return null;
        const order = output as Order;
        return { id: order.id, status: order.status };
      },
      validateInput: (input) => {
        if (input === null || typeof input !== "object") {
          throw new Error("lookupOrder input must be an object");
        }
        const id = (input as { id?: unknown }).id;
        if (typeof id !== "string") {
          throw new Error("lookupOrder input requires a string id");
        }
        return { id };
      },
      handler: async ({ id }, tenant) => lookupOrderForTenant(tenant.id, id)
    })
  },
  {
    context: { id: "tenant_acme", plan: "pro" },
    onAudit: audit.onAudit
  }
);

const manifest = broker.manifest();

// Direct host calls infer Order | null from the tool map.
const order = await broker.call("lookupOrder", { id: "ord_123" });

const runner = createIsolatedRunner({
  policy: "ai-tool",
  pool: { maxSize: 64, idleMs: 60_000 },
});

await runner.precompile(
  "agentLookup",
  'async (tools, orderId) => await tools("lookupOrder", { id: orderId })',
  { key: "tenant_acme" }
);

const { result, metrics } = await runner.call(
  "agentLookup",
  'async (tools, orderId) => await tools("lookupOrder", { id: orderId })',
  [broker.reference, "ord_123"],
  {
    key: "tenant_acme",
    run: {
      ...audit.receiptOptions(),
      maxResultBytes: 16_384,
      purpose: "agent-tool-call",
      tenant: "tenant_acme"
    },
    withMetrics: true
  }
);

const stats = runner.stats();
await runner.dispose();`;

const receiptLimitsCode = `import {
  createCapabilityAuditBuffer,
  runIsolated
} from "@absolutejs/isolated-jsc";

const audit = createCapabilityAuditBuffer({ maxEvents: 32 });

const { result, receipt } = await runIsolated("await tools('now'); 42", {
  policy: "tenant-script",
  globals: { tools: broker.reference },
  maxConsoleEntries: 4,
  maxConsoleBytes: 512,
  run: {
    ...audit.receiptOptions(),
    executionId: "exec_123",
    maxResultBytes: 16_384,
    purpose: "tenant-plugin",
    tenant: "tenant_acme",
  },
  withReceipt: true
});

receipt.capabilityCallsDropped;    // number of audit events not retained
receipt.capabilityCallsTruncated;  // true when the audit buffer overflowed
receipt.console.truncated;         // true when console capture overflowed
receipt.error?.code;               // machine-readable failure, when present
receipt.schemaVersion;             // 1 — stable receipt schema marker
receipt.outputBytes;               // estimated successful-result bytes`;

export const IsolatedJscProofPackView = ({
	currentPageId,
	themeSprings,
	tocOpen,
	onTocToggle,
	onNavigate,
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
						id="isolated-jsc-proof-pack"
						style={h1Style(isMobileOrTablet)}
					>
						isolated-jsc 0.11.0 Proof Pack
					</h1>
					<p style={paragraphLargeStyle}>
						This is still not broad launch mode. The 0.8.x line
						moved isolated-jsc from raw isolate primitives into a
						product API for the Bun isolation wedge: policy recipes,
						one-shot execution, pooled keyed runners, precompiled
						callables, capability manifests, redacted bounded audit
						events, execution receipts, and output limits for tenant
						scripts, AI-generated code, and plugin execution. The
						0.9.0 through 0.11.0 releases add the multi-tenant
						economics layer on top: hibernating keyed pools,
						operator-shaped pool metrics, and OpenTelemetry tracing.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-shipped"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What shipped
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						As of <code>0.11.0</code> the package keeps the proof
						pack but adds the API shape services actually want:
						choose a policy, run one-off source with{' '}
						<code>runIsolated()</code>, create a pooled{' '}
						<code>createIsolatedRunner()</code>, warm hot functions
						with <code>precompile()</code>, hibernate idle tenants
						with <code>createHibernatingIsolatePool()</code>, review
						declared host powers with capability manifests, redact
						and bound audit events, cap host capability outputs, and
						inspect every run with receipts.
					</p>
					<p style={paragraphSpacedStyle}>
						Headline numbers from the repeatable{' '}
						<code>bench:proof</code> run (100 warm / 10 cold
						iterations):
					</p>
					<StatBand
						stats={benchmarkStats}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Feature', 'Why it matters']}
						rows={shippedRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="receipts-limits"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Receipts + limits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The new launch framing is not just "run code in a
						sandbox." The host gets reviewable capability manifests,
						redacted audit events, bounded audit buffers, and
						execution receipts that survive success and failure
						paths. Receipts carry the backend, policy, tenant and
						purpose labels, timing, metrics, output size, capability
						call summaries, console overflow flags, and capability
						audit truncation counts.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>maxResultBytes</code> rejects oversized successful
						outputs with <code>ResultSizeError</code>.{' '}
						<code>maxConsoleEntries</code> and{' '}
						<code>maxConsoleBytes</code> bound captured console
						output. <code>createCapabilityAuditBuffer()</code>
						bounds retained capability events and records how many
						were dropped. Capability tools can set{' '}
						<code>maxOutputBytes</code> so oversized host-tool
						results reject with a <code>CapabilityError</code>
						before sandbox code receives them, and receipts retain
						machine-readable error codes such as{' '}
						<code>CAPABILITY_OUTPUT_SIZE_LIMIT</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						Every release since <code>0.8.11</code> tightened this
						surface. The line runs from error-metadata parity
						through checkpoints and receipts to the hibernating pool
						and tracing:
					</p>
					<VersionTimeline
						entries={releaseTimeline}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={receiptLimitsCode}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="bun-wedge"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Bun wedge
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The positioning is narrow on purpose: Bun already makes
						TypeScript execution fast.{' '}
						<code>@absolutejs/isolated-jsc</code> makes untrusted
						TypeScript and JavaScript execution embeddable inside
						Bun.
					</p>
					<p style={paragraphSpacedStyle}>
						For the deeper market and objection-handling frame, see{' '}
						<a href="/documentation/isolated-jsc-bun">
							isolated-jsc for Bun
						</a>
						.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<span style={strongStyle}>Node migration:</span>{' '}
							teams using <code>isolated-vm</code> get familiar
							nouns: Isolate, Context, Script, Reference, and
							ExternalCopy.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Bun-native runtime:</span>{' '}
							the FFI backend talks to JavaScriptCore directly
							when libJSC is available, with a Worker fallback for
							portability.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Operational proof:</span>{' '}
							<code>isolated-jsc doctor</code> shows the backend,
							checked JSC paths, and platform-specific install
							guidance before teams hit runtime errors.
						</li>
					</ul>
					<PrismPlus
						codeString={installCode}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="example"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Agent tool example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The example is the intended adoption shape: define typed
						host tools, call them directly from the host when
						useful, pass the brokered dispatcher as a Reference to
						untrusted code, set a timeout, and capture per-call
						metrics.
					</p>
					<PrismPlus
						codeString={agentToolCode}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="decision-guide"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Bun sandboxing decision guide
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>backend: &apos;ffi&apos;</code> for
						hostile-code production paths on macOS or Linux where
						JavaScriptCore is available. Use{' '}
						<code>backend: &apos;auto&apos;</code> for local
						development, demos, CI smoke tests, and portable
						defaults. When the Worker fallback is the only option,
						keep it behind a process or container boundary if
						hostile workloads could reach meaningful host secrets.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<span style={strongStyle}>FFI:</span> lowest cold
							heap, interrupt-driven timeouts, isolate survives
							timeouts, and eval / Function-constructor residuals
							are closed.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Worker fallback:</span>{' '}
							portable heap isolation and resource caps, but
							deploy it with OS-level blast-radius controls for
							arbitrary third-party code.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Host tools:</span> expose
							powers through <code>Reference</code> or the typed
							capability broker, then validate, timeout, and audit
							every call.
						</li>
					</ul>
				</section>
				<section style={sectionStyle}>
					<AnchorHeading
						id="security"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Security posture
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The release keeps the security language explicit. FFI
						closes the indirect eval and Function-constructor
						residuals by disabling eval per context. The Worker
						backend remains a portable fallback, but hostile-code
						workloads that care about those residuals should require
						<code>backend: &apos;ffi&apos;</code> and compose with
						process, container, uid, or network boundaries when host
						secrets are high value.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="start-here"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Start here
					</AnchorHeading>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Read the package{' '}
							<a
								href="https://github.com/absolutejs/isolated-jsc/blob/main/README.md"
								rel="noopener noreferrer"
								target="_blank"
							>
								README
							</a>{' '}
							for install, backend behavior, and API examples.
						</li>
						<li style={listItemStyle}>
							Read{' '}
							<a
								href="https://github.com/absolutejs/isolated-jsc/blob/main/SECURITY.md"
								rel="noopener noreferrer"
								target="_blank"
							>
								SECURITY.md
							</a>{' '}
							before running untrusted code.
						</li>
						<li style={listItemStyle}>
							Run <code>bun run example:agent-tool</code> from the
							repo to see the proof-pack path end to end.
						</li>
					</ul>
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
