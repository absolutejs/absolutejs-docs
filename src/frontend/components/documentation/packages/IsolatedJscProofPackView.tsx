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
	strongStyle,
	tableCellStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#isolated-jsc-080', label: '0.8.0 proof pack' },
	{ href: '#what-shipped', label: 'What shipped' },
	{ href: '#bun-wedge', label: 'Bun wedge' },
	{ href: '#example', label: 'Agent tool example' },
	{ href: '#decision-guide', label: 'Decision guide' },
	{ href: '#security', label: 'Security posture' },
	{ href: '#start-here', label: 'Start here' }
];

const shippedItems: Array<{ feature: string; result: string }> = [
	{
		feature: 'Benchmark proof pack',
		result: 'Reproducible local measurements for FFI, Worker, Bun process-spawn, and optional Node isolated-vm baselines.'
	},
	{
		feature: 'Migration guide',
		result: 'A concrete path for teams moving a Node isolated-vm workload to Bun and JavaScriptCore.'
	},
	{
		feature: 'Security model',
		result: 'Explicit FFI vs Worker guarantees, Worker residuals, resource limits, and deployment hardening guidance.'
	},
	{
		feature: 'TypeScript helpers',
		result: 'Bun-native transpilation helpers for scripts and reusable callables before isolate execution.'
	},
	{
		feature: 'Capability broker',
		result: 'Named host tools with validation hooks, timeout, concurrency, tenant context, audit events, typed tool definitions, and typed host-side direct calls.'
	},
	{
		feature: 'Doctor CLI',
		result: 'A package bin that reports Bun/platform details, FFI availability, checked JSC paths, and install hints.'
	},
	{
		feature: 'Agent-tool example',
		result: 'A runnable demo combining TypeScript callables, brokered tools, tenant context, metrics, and audit events.'
	},
	{
		feature: 'Policy presets + runners',
		result: 'Product-ready presets for AI tools, tenant scripts, plugins, and trusted code, plus one-shot and pooled runner APIs for request paths.'
	}
];

const installCode = `bun add @absolutejs/isolated-jsc
bunx @absolutejs/isolated-jsc`;

const agentToolCode = `import {
  createCapabilityBroker,
  createIsolatedRunner,
  defineCapabilityTool
} from "@absolutejs/isolated-jsc";

type TenantContext = { id: string; plan: "free" | "pro" };
type OrderLookup = { id: string };
type Order = { id: string; status: string; totalUsd: number };

const broker = createCapabilityBroker(
  {
    lookupOrder: defineCapabilityTool<
      OrderLookup,
      Order | null,
      TenantContext
    >({
      timeoutMs: 100,
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
  { context: { id: "tenant_acme", plan: "pro" } }
);

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
  { key: "tenant_acme", withMetrics: true }
);

const stats = runner.stats();
await runner.dispose();`;

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
					<h1 id="isolated-jsc-080" style={h1Style(isMobileOrTablet)}>
						isolated-jsc 0.8.0 Proof Pack
					</h1>
					<p style={paragraphLargeStyle}>
						This is still not broad launch mode. The 0.8.0 line
						moves isolated-jsc from raw isolate primitives toward a
						product API for the Bun isolation wedge: policy presets,
						one-shot execution, pooled keyed runners, precompiled
						callables, and cache observability for tenant scripts,
						AI-generated code, and plugin execution.
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
						Version <code>0.8.0</code> keeps the proof pack but adds
						the API shape services actually want: choose a policy,
						run one-off source with <code>runIsolated()</code>, or
						create a pooled <code>createIsolatedRunner()</code>,
						warm hot functions with <code>precompile()</code>, call
						them repeatedly with <code>call()</code>, and inspect
						cache growth with <code>stats()</code>.
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Feature
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Why it matters
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{shippedItems.map((item) => (
									<tr key={item.feature}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.feature}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.result}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
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
