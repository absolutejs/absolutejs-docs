import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncSandboxConfig,
	syncSandboxInstall,
	syncSandboxLimits,
	syncSandboxQuickStart
} from '../../../data/documentation/syncSandboxDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { StatBand, StatTile } from '../../utils/StatBand';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import {
	VersionTimeline,
	VersionTimelineEntry
} from '../../utils/VersionTimeline';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#sync-sandbox', label: 'Sandboxed Mutations' },
	{ href: '#when', label: 'When to reach for it' },
	{ href: '#quick-start', label: 'Quick start' },
	{ href: '#install', label: 'Install' },
	{ href: '#backends', label: 'Backends' },
	{ href: '#perf', label: 'Performance' },
	{ href: '#config', label: 'Configuration' },
	{ href: '#architecture', label: 'Architecture' },
	{ href: '#limits', label: 'Limits' },
	{ href: '#arc', label: 'Optimization arc' }
];

const benchColumns = ['Lane', 'Worker', 'FFI', 'Ops/sec (best)'];

const benchRows: DocsTableCell[][] = [
	['Pure handler', '0.09 ms', '0.33 ms', '7,364 (worker)'],
	['actions.change', '0.42 ms', '0.92 ms', '1,934 (worker)'],
	['20-tenant cold spawn', '35.4 ms', '5.7 ms', '6.2× per-tenant (ffi wins)']
];

const perfStats: StatTile[] = [
	{
		detail: 'faster cold spawn on FFI — 5.7 ms vs 35.4 ms per tenant in the 20-tenant lane',
		label: 'Cold spawn',
		value: '6.2×'
	},
	{
		detail: 'pure-handler warm dispatch p50 on the Worker backend',
		label: 'Warm dispatch',
		unit: 'ms',
		value: '0.09'
	},
	{
		detail: 'best pure-handler throughput (Worker backend)',
		label: 'Throughput',
		unit: 'ops/sec',
		value: '7,364'
	}
];

const perfArcEntries: VersionTimelineEntry[] = [
	{
		description: 'FFI pure warm dispatch: 4.69 → 2.47 ms.',
		title: 'Router Reference + reused context',
		version: '1.7.2'
	},
	{
		description: 'Unwrap path drops from 3 evals per call to 2.',
		title: 'isolated-jsc: cleanup eval folded into the read eval',
		version: 'jsc 0.5'
	},
	{
		description:
			'Sync handlers skip the Promise unwrap entirely. FFI pure: 2.47 → 0.29 ms.',
		title: 'Sync IIFE wrap',
		version: '1.7.3'
	},
	{
		description: 'FFI actions lane: 6.62 → 0.71 ms.',
		title: 'isolated-jsc: microtask-first pump fast path',
		version: 'jsc 0.5.1'
	},
	{
		description:
			'Compile once, call many times — per call: no eval, no setGlobal.',
		title: 'isolated-jsc: Context.compileCallable primitive',
		version: 'jsc 0.6'
	},
	{
		description:
			'Dispatch Reference installed once per isolate. FFI pure: 0.96 → 0.33 ms.',
		highlight: true,
		title: 'callId routing',
		version: '1.7.5'
	}
];

const architectureSteps: StepFlowStep[] = [
	{
		actor: 'first call',
		code: 'createIsolatedRunner({ policy, pool })',
		description:
			'Creates a keyed pool of JSC VMs — a Bun Worker per isolate on the Worker backend, libJSC via bun:ffi on the FFI backend.',
		title: 'Create the runner pool'
	},
	{
		actor: 'first call',
		code: 'createContext()',
		description:
			'Fresh global scope, hardened — no fetch, Bun, process, or any other host global.',
		title: 'Create a hardened context'
	},
	{
		actor: 'first call',
		code: "setGlobal('__dispatch', new Reference(...))",
		description:
			'Installs a SINGLE Reference that routes actions.* calls back to the host. It closes over a per-mutation callMap keyed by a per-call integer callId, so concurrent calls are safe — each has its own callId and its own actions slot.',
		title: 'Install the dispatch Reference once'
	},
	{
		actor: 'first call',
		code: 'runner.precompile(name, wrappedSource, { key })',
		description:
			'Compiles ONCE per tenant/mutation key. The compiled function takes (callId, args, ctx) and builds the in-VM actions shim that dispatches through __dispatch with its callId.',
		title: 'Precompile the wrapped source'
	},
	{
		actor: 'every call',
		code: 'const callId = nextCallId++;\ncallMap.set(callId, actions);\ntry {\n\treturn await runner.call(name, wrappedSource, [callId, args, ctx], {\n\t\tkey,\n\t\trun: { timeout }\n\t});\n} finally {\n\tcallMap.delete(callId);\n}',
		description:
			'The per-call hot path is one JSObjectCallAsFunction (FFI) or one postMessage (Worker). No per-call eval, no per-call setGlobal, no Reference alloc.',
		title: 'Dispatch through the hot path'
	}
];

const UseCaseList = () => (
	<ul
		style={{
			lineHeight: 1.6,
			marginBottom: '1rem',
			paddingLeft: '1.2rem'
		}}
	>
		<li>
			<strong>The handler source is untrusted.</strong> Multi-tenant SaaS
			where customers write their own mutation logic; user-provided
			AI-generated handlers; an internal plugin system where third-party
			code lands at runtime.
		</li>
		<li>
			<strong>You want defensive resource caps per mutation.</strong> A
			runaway loop or memory-bomb in one tenant&apos;s handler
			shouldn&apos;t take down the host process.
		</li>
		<li>
			<strong>
				You&apos;re running the absolutejs hosted PaaS (or building your
				own).
			</strong>{' '}
			<code>@absolutejs/isolated-jsc</code> was built for this slot
			&mdash; per-tenant isolates with cheap cold spawn (FFI: ~6
			ms/tenant) and hard resource bounds.
		</li>
	</ul>
);

const BackendList = () => (
	<ul
		style={{
			lineHeight: 1.6,
			marginBottom: '1rem',
			paddingLeft: '1.2rem'
		}}
	>
		<li>
			<strong>Worker</strong> &mdash; one Bun Worker per isolate. Each
			Worker spawns its own JSC VM with its own GC heap. Calls cross via{' '}
			<code>postMessage</code> with structured-cloned args. Available
			everywhere Bun runs (including Windows).
		</li>
		<li>
			<strong>FFI</strong> &mdash; direct <code>bun:ffi</code> calls into{' '}
			<code>libJavaScriptCore</code>. No Worker, no IPC. Cold heap ~300 KB
			(vs Worker&apos;s ~46 MB). Interrupt-driven CPU timeouts that keep
			the isolate alive afterwards. macOS + Linux.
		</li>
	</ul>
);

const BackendTradeoffList = () => (
	<ul
		style={{
			lineHeight: 1.6,
			marginBottom: '1rem',
			paddingLeft: '1.2rem'
		}}
	>
		<li>
			<strong>Cold spawn</strong>: FFI wins ~6×. Worker pays Bun&apos;s
			Worker bootstrap (load runtime, parse worker.ts, wire postMessage)
			per isolate. FFI just does <code>JSContextGroupCreate</code> +{' '}
			<code>JSGlobalContextCreateInGroup</code>.
		</li>
		<li>
			<strong>Warm pure dispatch</strong>: comparable. Worker ~0.09 ms p50
			(postMessage RTT); FFI ~0.33 ms (<code>JSObjectCallAsFunction</code>{' '}
			+ arg packing).
		</li>
		<li>
			<strong>Warm async-actions dispatch</strong>: Worker wins ~2× per{' '}
			<code>await</code>. Each FFI <code>await</code> pays a microtask
			yield + a read eval to drain the in-VM promise.
		</li>
		<li>
			<strong>Web APIs</strong>: <code>URL</code>,{' '}
			<code>TextEncoder</code>, <code>WebSocket</code> &mdash; Worker
			only. They live in the Bun-Worker environment, not the bare JSC C
			API.
		</li>
	</ul>
);

export const SyncSandboxView = ({
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
					<h1 id="sync-sandbox" style={h1Style(isMobileOrTablet)}>
						Sandboxed Mutations
					</h1>
					<p style={paragraphLargeStyle}>
						Run a string-form mutation handler inside an{' '}
						<code>@absolutejs/isolated-jsc</code> Isolate. The
						handler can&apos;t reach the host&apos;s modules,
						closures, or globals &mdash; only the <code>args</code>{' '}
						/ <code>ctx</code> clones and the <code>actions</code>{' '}
						bridge the engine passes in. Useful for multi-tenant
						PaaS, plugin systems, AI-generated logic, or any time
						you want a defensive CPU/memory cap per mutation.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="when"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When to reach for it
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sandboxed mutations are an <em>opt-in</em>, not the
						default. Sync&apos;s regular <code>handler</code> runs
						natively in your Elysia process with full access to
						everything you&apos;ve imported &mdash; fast, full
						power, and what you should reach for first. The sandbox
						earns its trade-offs (string source, heap isolation,
						CPU/memory cap) when:
					</p>
					<UseCaseList />
					<p style={paragraphSpacedStyle}>
						If none of those apply, use the plain{' '}
						<code>handler</code> and skip this page.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Swap <code>handler</code> for{' '}
						<code>sandboxedHandler</code> (a string) and add a{' '}
						<code>sandbox</code> config. The engine builds the
						runner lazily on first invocation:
					</p>
					<PrismPlus
						codeString={syncSandboxQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>runMutation</code> stays exactly the same on the
						call site &mdash; sandboxed handlers are transparent to
						the caller. Errors thrown inside the sandbox propagate
						as JS <code>Error</code> objects with matching{' '}
						<code>.name</code> and <code>.message</code>; a timeout
						surfaces as <code>TimeoutError</code>; a memory overage
						as <code>MemoryLimitError</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="install"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Install
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/isolated-jsc</code> is an{' '}
						<strong>optional peer dependency</strong>. The sync
						package itself stays lean &mdash; the sandbox runner
						loads <code>isolated-jsc</code> via{' '}
						<code>import()</code> the first time a sandboxed
						mutation runs, so apps that don&apos;t use one pay
						nothing.
					</p>
					<PrismPlus
						codeString={syncSandboxInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On macOS the FFI backend uses the system{' '}
						<code>JavaScriptCore</code> framework &mdash; no extra
						install. On Linux it needs{' '}
						<code>libjavascriptcoregtk</code>. If neither is
						reachable, the <code>auto</code> backend silently falls
						back to Worker.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="backends"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Backends: Worker vs FFI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>isolated-jsc</code> ships two implementations of
						the same Isolate / Context / Script / Callable API:
					</p>
					<BackendList />
					<p style={paragraphSpacedStyle}>
						The default <code>backend: &apos;auto&apos;</code> picks
						FFI when <code>libJavaScriptCore</code> is reachable and
						Worker otherwise. Both backends now run the same
						precompiled-function dispatch hot path (
						<code>Context.compileCallable</code>, now surfaced by{' '}
						<code>createIsolatedRunner().call()</code> in
						isolated-jsc 0.8.x), so the choice trades:
					</p>
					<BackendTradeoffList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="perf"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Performance
					</AnchorHeading>
					<StatBand stats={perfStats} themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						All numbers are warm-dispatch p50 measured by{' '}
						<code>benchmarks/sync/scripts/bench-sandbox.ts</code> on
						WSL2, Bun 1.3.14, against{' '}
						<code>@absolutejs/sync@1.7.5</code> +{' '}
						<code>@absolutejs/isolated-jsc@0.8.x</code>.
					</p>
					<DocsTable
						columns={benchColumns}
						rows={benchRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Translation</strong>: the{' '}
						<code>&apos;auto&apos;</code> default lands on FFI for
						Linux/macOS deployments &mdash; comparable warm
						dispatch, 6× faster cold spawn. Pin{' '}
						<code>&apos;worker&apos;</code> only if you need Web
						APIs (or your handler hammers many awaited actions per
						call). Pin <code>&apos;ffi&apos;</code> to bypass the
						auto-probe in known-good environments. Otherwise leave
						it on <code>&apos;auto&apos;</code> &mdash; FFI wins or
						ties almost every workload.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each mutation carries its own <code>sandbox</code>{' '}
						config &mdash; one isolate per mutation, sized for that
						mutation&apos;s workload:
					</p>
					<PrismPlus
						codeString={syncSandboxConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Sizing tips.</strong> The default{' '}
						<code>memoryLimit: 32</code> is conservative; many real
						handlers want ~128 MB so a burst doesn&apos;t trip the
						watchdog. The default <code>timeout: 5000</code> matches
						typical web-write budgets; tighten it for hot mutations,
						loosen it for long-running ones (jobs are usually a
						better fit there). The <code>backend</code> is the only
						knob with no &quot;just leave it&quot; answer &mdash;
						pick by what your handler needs.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="architecture"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Architecture
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The sandbox runner is built lazily per mutation: nothing
						is spawned until the first call. The first invocation
						walks four setup steps; every call after that takes only
						the final hot-path step:
					</p>
					<StepFlow
						steps={architectureSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The <code>callId</code> + <code>callMap</code> pattern
						means concurrent calls into the same mutation are safe
						by construction. Each call has its own{' '}
						<code>callId</code> &rarr; its own <code>actions</code>{' '}
						instance in the map. No shared-mutable slot, no
						serialization queue.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="limits"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Limits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The sandbox is a sandbox &mdash; it trades capability
						for isolation. Things to know up front:
					</p>
					<PrismPlus
						codeString={syncSandboxLimits}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="arc"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Optimization arc
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The sandbox shipped in sync 1.4 with a straightforward
						per-call eval + setGlobal model. Profiling against{' '}
						<code>benchmarks/sync/scripts/bench-sandbox.ts</code>{' '}
						drove five rounds of architectural cleanup over a single
						day, interleaving sync releases with isolated-jsc
						(&quot;jsc&quot;) releases:
					</p>
					<VersionTimeline
						entries={perfArcEntries}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Total: 14× faster on the pure FFI lane, 7× on actions
						FFI, 10× on pure Worker. The bench is the spec &mdash;
						1.7.4 caught its own regression in the post-publish
						re-run, fixed same-day as 1.7.5. We&apos;re at the floor
						for the current architecture: further wins would need
						Bun/JSC API-level work (shared event loops for cheaper
						async host-fn pumps). Until then, both backends sit at
						sub-millisecond p50 for the warm cases that matter.
					</p>
					<p style={paragraphSpacedStyle}>
						The full arc &mdash; profile snapshots, regression
						catches, and post-fix re-benches &mdash; lives in the
						bench repo&apos;s <code>sync/RESULTS.md</code>. Worth
						reading if you&apos;re sizing whether the sandbox fits
						your workload.
					</p>
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
