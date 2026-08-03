/* eslint-disable absolute/max-jsxnesting */
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
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
import { DefinitionGrid, DefinitionItem } from '../../utils/DefinitionGrid';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#bun-positioning', label: 'Bun positioning' },
	{ href: '#gap', label: 'The gap' },
	{ href: '#quick-answers', label: 'Quick answers' },
	{ href: '#options', label: 'Existing options' },
	{ href: '#fit', label: 'Where it fits' },
	{ href: '#pain-points', label: 'Pain points' },
	{ href: '#objections', label: 'Objections' },
	{ href: '#copy', label: 'Launch copy' }
];

const alternatives: Array<{
	option: string;
	goodFit: string;
	bunGap: string;
}> = [
	{
		bunGap: 'No meaningful authority boundary. User code sees the host global surface.',
		goodFit: 'Trusted configuration snippets',
		option: 'new Function / direct eval'
	},
	{
		bunGap: 'Node documents it as not a security mechanism for untrusted code, and it is Node/V8 rather than Bun/JSC.',
		goodFit: 'Convenience contexts for trusted or semi-trusted code',
		option: 'Node node:vm'
	},
	{
		bunGap: 'It is a V8 addon. It does not give Bun a JavaScriptCore-native isolate primitive.',
		goodFit: 'Mature isolate-shaped API for Node users',
		option: 'Node isolated-vm'
	},
	{
		bunGap: 'Useful substrate, but not a complete untrusted-code permissions model by itself.',
		goodFit: 'Portable separate-thread execution in Bun',
		option: 'Bun Worker'
	},
	{
		bunGap: 'Higher cold start, higher RSS, serialized IPC, and more operational surface for frequent tenant scripts.',
		goodFit: 'Stronger blast-radius control',
		option: 'Process or container per script'
	},
	{
		bunGap: 'Excellent platforms, but they change the runtime and deployment model instead of embedding in a Bun server.',
		goodFit: 'Hosted or platform isolate execution',
		option: 'Cloudflare Workers / Deno Deploy'
	}
];

const painPoints: DefinitionItem[] = [
	{
		description:
			'Model-generated snippets need timeouts, heap caps, console capture, and host tools without file, network, process, or shell authority.',
		term: 'AI code execution'
	},
	{
		description:
			'SaaS teams want customer-authored transforms, policy checks, workflow steps, and webhooks without a custom service per tenant.',
		term: 'Tenant scripting'
	},
	{
		description:
			'Internal tools and build systems want plugins while keeping filesystem, network, process, and package-manager access explicit.',
		term: 'Plugin evaluation'
	},
	{
		description:
			'Teams that already know isolated-vm need an isolate-shaped JavaScriptCore path when the host app moves to Bun.',
		term: 'Node-to-Bun migration'
	}
];

export const IsolatedJscBunPositioningView = ({
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
					<h1 id="bun-positioning" style={h1Style(isMobileOrTablet)}>
						Bun Positioning for isolated-jsc
					</h1>
					<p style={paragraphLargeStyle}>
						Bun makes TypeScript execution fast.{' '}
						<code>@absolutejs/isolated-jsc</code> makes untrusted
						TypeScript and JavaScript execution embeddable inside
						Bun, with bounded JavaScriptCore execution and explicit
						host capability brokering.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="gap"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The gap
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The market pain is not "how do I evaluate code." The
						pain is running tenant, plugin, or AI-generated code
						without ambient access to <code>Bun</code>,{' '}
						<code>process</code>, filesystem, network, Workers, or
						shell APIs. Teams also need timeouts, heap limits,
						deterministic teardown, metrics, and audited host tools.
					</p>
					<DefinitionGrid
						items={[
							{
								badge: 'Bun issue',
								description: 'asks for sandboxing permissions.',
								term: 'oven-sh/bun#6617'
							},
							{
								badge: 'Bun issue',
								description:
									'asks for a secure runtime for AI-agent generated code.',
								term: 'oven-sh/bun#25929'
							},
							{
								badge: 'Bun issue',
								description: (
									<>
										shows the migration trap:{' '}
										<code>isolated-vm</code> is a V8 addon,
										not a JavaScriptCore solution for Bun.
									</>
								),
								term: 'oven-sh/bun#23653'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-answers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick answers
					</AnchorHeading>
					<DefinitionGrid
						items={[
							{
								description: (
									<>
										It is the right shape for Node/V8, but
										Bun is JavaScriptCore.{' '}
										<code>isolated-jsc</code> ports the
										isolate-shaped API to Bun/JSC instead of
										trying to load a V8 addon.
									</>
								),
								term: 'Why not Node isolated-vm?'
							},
							{
								description:
									'Workers are the portable substrate and fallback backend. This package adds the sandbox product layer: hardened globals, heap limits, timeouts, metrics, error fidelity, TypeScript helpers, pools, execution receipts, output limits, and explicit host capability brokers with manifests, redaction, per-tool output byte caps, and bounded audit buffers. As of 0.11.0 that layer also covers hibernating keyed pools that checkpoint idle tenants to bytes, operator-shaped pool metrics with drain and warm, and optional OpenTelemetry tracing.',
								term: 'Why not just use Bun Workers?'
							},
							{
								description: (
									<>
										Require{' '}
										<code>backend: &apos;ffi&apos;</code>{' '}
										for hostile-code production paths on
										macOS or Linux where JavaScriptCore is
										available. Use{' '}
										<code>backend: &apos;auto&apos;</code>{' '}
										for portable defaults, demos, and CI.
										Add OS boundaries when a sandbox escape
										would expose meaningful host secrets.
									</>
								),
								term: 'When should I require FFI?'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Existing options
					</AnchorHeading>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Option
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Good fit
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Bun gap
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{alternatives.map((item) => (
									<tr key={item.option}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.option}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.goodFit}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.bunGap}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fit"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where it fits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/isolated-jsc</code> is the middle
						tier: stronger than <code>eval</code>,{' '}
						<code>node:vm</code>, or proxy sandboxing; lighter and
						more embeddable than a process or container per script;
						native to Bun and JavaScriptCore instead of Node and V8.
					</p>
					<DefinitionGrid
						items={[
							{
								description:
									'use for production Bun/JSC isolation where JavaScriptCore is available.',
								term: 'FFI backend'
							},
							{
								description:
									'use for local development, CI, demos, Windows, and hosts without libJSC.',
								term: 'Worker fallback'
							},
							{
								description:
									'add process, container, uid, seccomp, or network policy when a sandbox escape would expose high-value secrets.',
								term: 'OS boundary'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pain-points"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pain points
					</AnchorHeading>
					<DefinitionGrid
						items={painPoints}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="objections"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Objections
					</AnchorHeading>
					<DefinitionGrid
						items={[
							{
								description:
									'Runtime permissions would be valuable, but this is an embedding API: many tenant isolates inside one Bun app, host tools passed intentionally, pooled lifecycle, and per-run metrics.',
								term: 'Why not wait for Bun permissions?'
							},
							{
								description:
									'Workers are the portable substrate and fallback path. The product layer adds hardened globals, memory limits, timeout behavior, error fidelity, TypeScript helpers, execution receipts, result and console limits, capability brokers with redacted bounded audit events, and hibernating keyed pools with operator metrics and OpenTelemetry tracing.',
								term: 'Why not just use Workers?'
							},
							{
								description:
									'Use FFI plus OS isolation when host secrets or broad network/filesystem access are in scope. The claim is defense in depth, not magic in-process containment.',
								term: 'Is this enough for arbitrary hostile code?'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="copy"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Launch copy
					</AnchorHeading>
					<DefinitionGrid
						items={[
							{
								description: (
									<>
										The missing <code>isolated-vm</code>{' '}
										layer for Bun.
									</>
								),
								term: 'Primary'
							},
							{
								description: (
									<>
										Run untrusted JavaScript and TypeScript
										inside a bounded JavaScriptCore isolate,
										from a Bun host, with explicit
										capability brokering, redacted receipts,
										and bounded outputs instead of ambient{' '}
										<code>Bun</code>/<code>process</code>{' '}
										access.
									</>
								),
								term: 'Expanded'
							},
							{
								description:
									'Use FFI for production Bun/JSC isolation, Worker fallback for portability, and compose with process or container boundaries for fully adversarial code.',
								term: 'Security'
							}
						]}
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
