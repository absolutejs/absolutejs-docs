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
	{ href: '#isolated-jsc-070', label: '0.7.0 proof pack' },
	{ href: '#what-shipped', label: 'What shipped' },
	{ href: '#bun-wedge', label: 'Bun wedge' },
	{ href: '#example', label: 'Agent tool example' },
	{ href: '#security', label: 'Security posture' },
	{ href: '#start-here', label: 'Start here' }
];

const shippedItems = [
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
		result: 'Named host tools with validation hooks, timeout, concurrency, tenant context, and audit events.'
	},
	{
		feature: 'Doctor CLI',
		result: 'A package bin that reports Bun/platform details, FFI availability, checked JSC paths, and install hints.'
	},
	{
		feature: 'Agent-tool example',
		result: 'A runnable demo combining TypeScript callables, brokered tools, tenant context, metrics, and audit events.'
	}
];

const installCode = `bun add @absolutejs/isolated-jsc
bunx @absolutejs/isolated-jsc`;

const agentToolCode = `import {
  compileTypeScriptCallable,
  createCapabilityBroker,
  createIsolate
} from "@absolutejs/isolated-jsc";

const broker = createCapabilityBroker(
  {
    lookupOrder: {
      timeoutMs: 100,
      validateInput: (input) => ({ id: String((input as { id: unknown }).id) }),
      handler: async ({ id }, tenant) => lookupOrderForTenant(tenant.id, id)
    }
  },
  { context: { id: "tenant_acme", plan: "pro" } }
);

const isolate = await createIsolate({ memoryLimit: 256 });
const context = await isolate.createContext();

const agent = await compileTypeScriptCallable(
  context,
  \`async (
    tools: (name: string, input: unknown) => Promise<unknown>,
    orderId: string
  ) => await tools("lookupOrder", { id: orderId })\`
);

const { result, metrics } = await agent.callWithMetrics(
  [broker.reference, "ord_123"],
  { timeout: 500 }
);`;

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
					<h1 id="isolated-jsc-070" style={h1Style(isMobileOrTablet)}>
						isolated-jsc 0.7.0 Proof Pack
					</h1>
					<p style={paragraphLargeStyle}>
						This is not broad launch mode. The 0.7.0 release is a
						proof-pack update for the Bun isolation wedge: give Bun
						apps an isolated-vm-shaped JavaScriptCore path for
						tenant scripts, AI-generated code, and plugin execution
						without leaving the Bun runtime.
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
						Version <code>0.7.0</code> moves the package from a raw
						isolate primitive toward an adoption-ready proof pack:
						benchmarks, migration framing, security guidance,
						TypeScript execution, safer host tools, diagnostics, and
						a runnable agent example.
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
						The new example is the intended adoption shape: compile
						a TypeScript callable, pass a brokered tool dispatcher
						as a Reference, set a timeout, and capture per-call
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
