import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncSandboxArchitecture,
	syncSandboxBenchTable,
	syncSandboxConfig,
	syncSandboxInstall,
	syncSandboxLimits,
	syncSandboxPerfArc,
	syncSandboxQuickStart
} from '../../../data/documentation/syncSandboxDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

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

export const SyncSandboxView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	useMediaQuery();
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
						closures, or globals &mdash; only the{' '}
						<code>args</code> / <code>ctx</code> clones and the{' '}
						<code>actions</code> bridge the engine passes in.
						Useful for multi-tenant PaaS, plugin systems,
						AI-generated logic, or any time you want a defensive
						CPU/memory cap per mutation.
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
						power, and what you should reach for first. The
						sandbox earns its trade-offs (string source, heap
						isolation, CPU/memory cap) when:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>The handler source is untrusted.</strong>{' '}
							Multi-tenant SaaS where customers write their own
							mutation logic; user-provided AI-generated
							handlers; an internal plugin system where
							third-party code lands at runtime.
						</li>
						<li>
							<strong>
								You want defensive resource caps per mutation.
							</strong>{' '}
							A runaway loop or memory-bomb in one tenant&apos;s
							handler shouldn&apos;t take down the host
							process.
						</li>
						<li>
							<strong>
								You&apos;re running the absolutejs hosted PaaS
								(or building your own).
							</strong>{' '}
							<code>@absolutejs/isolated-jsc</code> was built
							for this slot &mdash; per-tenant isolates with
							cheap cold spawn (FFI: ~6 ms/tenant) and hard
							resource bounds.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						If none of those apply, use the plain <code>handler</code>{' '}
						and skip this page.
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
						call site &mdash; sandboxed handlers are transparent
						to the caller. Errors thrown inside the sandbox
						propagate as JS <code>Error</code> objects with
						matching <code>.name</code> and <code>.message</code>;
						a timeout surfaces as <code>TimeoutError</code>; a
						memory overage as <code>MemoryLimitError</code>.
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
						reachable, the <code>auto</code> backend silently
						falls back to Worker.
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
						<code>isolated-jsc</code> ships two implementations
						of the same Isolate / Context / Script / Callable
						API:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>Worker</strong> &mdash; one Bun Worker
							per isolate. Each Worker spawns its own JSC VM
							with its own GC heap. Calls cross via{' '}
							<code>postMessage</code> with structured-cloned
							args. Available everywhere Bun runs (including
							Windows).
						</li>
						<li>
							<strong>FFI</strong> &mdash; direct{' '}
							<code>bun:ffi</code> calls into{' '}
							<code>libJavaScriptCore</code>. No Worker, no
							IPC. Cold heap ~300 KB (vs Worker&apos;s ~46
							MB). Interrupt-driven CPU timeouts that keep the
							isolate alive afterwards. macOS + Linux.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						The default <code>backend: &apos;auto&apos;</code>{' '}
						picks FFI when <code>libJavaScriptCore</code> is
						reachable and Worker otherwise. Both backends now
						run the same precompiled-function dispatch hot path
						(<code>Context.compileCallable</code>, now surfaced by{' '}
						<code>createIsolatedRunner().call()</code> in
						isolated-jsc 0.8.x), so the choice trades:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>Cold spawn</strong>: FFI wins ~6×. Worker
							pays Bun&apos;s Worker bootstrap (load runtime,
							parse worker.ts, wire postMessage) per isolate.
							FFI just does{' '}
							<code>JSContextGroupCreate</code> +{' '}
							<code>JSGlobalContextCreateInGroup</code>.
						</li>
						<li>
							<strong>Warm pure dispatch</strong>: comparable.
							Worker ~0.09 ms p50 (postMessage RTT); FFI ~0.33
							ms (<code>JSObjectCallAsFunction</code> + arg
							packing).
						</li>
						<li>
							<strong>Warm async-actions dispatch</strong>:
							Worker wins ~2× per <code>await</code>. Each
							FFI <code>await</code> pays a microtask
							yield + a read eval to drain the in-VM
							promise.
						</li>
						<li>
							<strong>Web APIs</strong>:{' '}
							<code>URL</code>, <code>TextEncoder</code>,{' '}
							<code>WebSocket</code> &mdash; Worker only. They
							live in the Bun-Worker environment, not the bare
							JSC C API.
						</li>
					</ul>
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
					<p style={paragraphSpacedStyle}>
						All numbers measured by{' '}
						<code>benchmarks/sync/scripts/bench-sandbox.ts</code>
						{' '}on WSL2, Bun 1.3.14, against{' '}
						<code>@absolutejs/sync@1.7.5</code> +{' '}
						<code>@absolutejs/isolated-jsc@0.8.x</code>.
					</p>
					<PrismPlus
						codeString={syncSandboxBenchTable}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Translation</strong>: pin{' '}
						<code>&apos;worker&apos;</code> only if you need Web
						APIs (or your handler hammers many awaited actions
						per call). Pin <code>&apos;ffi&apos;</code> to bypass
						the auto-probe in known-good environments.
						Otherwise leave it on <code>&apos;auto&apos;</code>{' '}
						&mdash; FFI wins or ties almost every workload.
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
						config &mdash; one isolate per mutation, sized for
						that mutation&apos;s workload:
					</p>
					<PrismPlus
						codeString={syncSandboxConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Sizing tips.</strong> The default{' '}
						<code>memoryLimit: 32</code> is conservative; many
						real handlers want ~128 MB so a burst doesn&apos;t
						trip the watchdog. The default{' '}
						<code>timeout: 5000</code> matches typical web-write
						budgets; tighten it for hot mutations, loosen it for
						long-running ones (jobs are usually a better fit
						there). The <code>backend</code> is the only knob
						with no &quot;just leave it&quot; answer &mdash;
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
						The sandbox runner is built lazily per mutation:
						nothing is spawned until the first call. After
						that, every call follows the same compact hot path:
					</p>
					<PrismPlus
						codeString={syncSandboxArchitecture}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The <code>callId</code> + <code>callMap</code>{' '}
						pattern means concurrent calls into the same
						mutation are safe by construction. Each call has
						its own <code>callId</code> &rarr; its own{' '}
						<code>actions</code> instance in the map. No
						shared-mutable slot, no serialization queue.
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
						drove five rounds of architectural cleanup over a
						single day:
					</p>
					<PrismPlus
						codeString={syncSandboxPerfArc}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The full arc &mdash; profile snapshots, regression
						catches, and post-fix re-benches &mdash; lives in
						the bench repo&apos;s{' '}
						<code>sync/RESULTS.md</code>. Worth reading if
						you&apos;re sizing whether the sandbox fits your
						workload.
					</p>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents
					items={tocItems}
					themeSprings={themeSprings}
				/>
			) : null}
			<MobileTableOfContents
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
