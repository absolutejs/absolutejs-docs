import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	isolatedJscHibernationBasic,
	isolatedJscHibernationBoundary,
	isolatedJscHibernationConcurrency,
	isolatedJscHibernationObservability,
	isolatedJscHibernationStorage
} from '../../../data/documentation/isolatedJscHibernationDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#hibernation', label: 'Pool hibernation' },
	{ href: '#why', label: 'Why hibernation' },
	{ href: '#basic', label: 'The basic shape' },
	{ href: '#boundary', label: 'Data vs heap boundary' },
	{ href: '#concurrency', label: 'Wake + claim semantics' },
	{ href: '#storage', label: 'Pluggable storage' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#operator-surface', label: 'Operator surface' }
];

const operatorSurfaceRows: DocsTableCell[][] = [
	[
		{ code: 'pool.metrics()', suffix: '0.10.0' },
		'Operator-shaped snapshot: point-in-time active / hibernated / total / inFlight / draining plus cumulative hibernations, wakes, evictions, and bytesHibernated since pool start, and lastWakeMs as a coarse SLO signal.'
	],
	[
		{ code: 'pool.drain()', suffix: '0.10.0' },
		'Refuses new keys while active and hibernated entries keep serving existing callers. For graceful shard shutdown: drain, wait for stats().total === 0, then dispose().'
	],
	[
		{ code: 'pool.warm(key)', suffix: '0.10.0' },
		'Materializes an active context ahead of expected work — wake from hibernation or spawn fresh — without invoking user code. Removes the cold-start tail from a tenant’s first request; shares single-flight semantics with run().'
	],
	[
		{ code: 'tracerProvider', suffix: '0.11.0' },
		'Optional pool option accepting any @opentelemetry/api-compatible provider (structural type via @absolutejs/telemetry, no peer-dep). Emits an isolated_jsc.run span per pool.run(key, fn) with abs.tenant, isolated_jsc.woke_from_hibernation, and isolated_jsc.wake_ms attributes. Zero-cost when omitted.'
	]
];

export const IsolatedJscHibernationView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	void isSizeOrLess;
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
					<h1 id="hibernation" style={h1Style(isMobileOrTablet)}>
						Pool hibernation
					</h1>
					<p style={paragraphLargeStyle}>
						<code>@absolutejs/isolated-jsc</code> ships{' '}
						<code>createHibernatingIsolatePool</code> (introduced in
						0.9.0, extended through 0.11.0): a keyed pool of isolate
						+ context pairs that hibernates idle entries by
						checkpointing the context's data half via the existing{' '}
						<code>context.checkpoint()</code> primitive, then wakes
						them transparently on the next call by passing the
						checkpoint back through{' '}
						<code>isolate.createContext({'{ checkpoint }'})</code>.
						Far more "tenant logical contexts" than physical
						isolates, because the warm ones get serialized down to
						bytes when no one's calling them.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why hibernation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The existing <code>createIsolatePool</code> keeps active
						isolates around for the lifetime of the key. That's the
						right call for a hot tenant set, but it caps total
						tenancy at the host's physical isolate budget — at
						scale, "100 active tenants per process" stops being
						interesting. Hibernation lets the pool hold N tenants{' '}
						<strong>logically</strong> while spending isolate budget
						only on the ones currently calling. The idle tenants
						live as serialized checkpoints in a pluggable store;
						their next call pays an isolate spawn + a
						structured-clone restore (typically faster than a full
						warm-up), nothing more.
					</p>
					<p style={paragraphSpacedStyle}>
						This is the SB-7 substrate for the eventual hosted Cloud
						bet. Same model AWS Lambda uses for "init code runs once
						per cold start" — the init (your seed) re-runs cheaply
						because the data is already there.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basic"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The basic shape
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>pool.run(key, fn)</code> resolves an active
						context — waking from a hibernated checkpoint, spawning
						fresh, or reusing as needed — and runs{' '}
						<code>fn(context)</code> with it. The signature matches
						the existing pool's <code>run(key, fn)</code> except the
						callback receives a <code>Context</code>, not an{' '}
						<code>Isolate</code>: the pool manages context lifecycle
						so it can checkpoint and restore in one atomic
						operation. <code>pool.stats()</code> returns{' '}
						<code>{'{ active, hibernated, total }'}</code> and is
						synchronous + cheap.
					</p>
					<PrismPlus
						codeString={isolatedJscHibernationBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="boundary"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Data vs heap boundary
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						This is not a JavaScriptCore heap pause/resume image.{' '}
						<code>SNAPSHOT_RESEARCH.md</code> in the package
						documents the boundary at length: the public JSC C API
						does not expose a stable pause/resume primitive for{' '}
						<code>JSGlobalContextRef</code> heap state, the call
						stack, the JIT cache, or closure graphs. What it does
						expose, and what hibernation uses, is
						structured-cloneable data on the context's globalThis.
					</p>
					<p style={paragraphSpacedStyle}>
						Concretely: your callables RECOMPILE on wake (same as a
						fresh spawn — but the data they read is already there).
						Host <code>Reference</code> bindings need reinstalling
						via <code>setGlobal</code>. Pending promises and
						in-flight async state do not survive. Anything you can
						pass through <code>structuredClone</code> does.
					</p>
					<PrismPlus
						codeString={isolatedJscHibernationBoundary}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="concurrency"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wake + claim semantics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						N concurrent calls to a hibernated key share one wake —
						no thundering-herd of isolate spawns racing to restore
						the same checkpoint. The pool holds a single-flight
						promise on the entry and all callers await it.
					</p>
					<p style={paragraphSpacedStyle}>
						Each <code>pool.run</code> atomically claims an
						in-flight slot as part of resolution, before the
						caller's first chance to await the context. A concurrent{' '}
						<code>pool.hibernate(key)</code> cannot race in between
						resolution and use; it waits for the in-flight counter
						to settle before checkpointing.
					</p>
					<PrismPlus
						codeString={isolatedJscHibernationConcurrency}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="storage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pluggable storage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>HibernationStore</code> is a three-method
						interface (<code>get</code>, <code>put</code>,{' '}
						<code>delete</code>). The default is{' '}
						<code>createInMemoryHibernationStore()</code> (one
						process). For production, wrap your persistent store
						(Redis, S3, local file cache, a database) and pass it as{' '}
						<code>hibernationStore</code>. Stores that lose the
						checkpoint between hibernate and wake fall back to
						fresh-spawn rather than throwing — TTL expiry, network
						partition, manual eviction all degrade safely.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>pool.dispose()</code> does not clear the store —
						it may be shared with other processes. Purge externally
						if you need to.
					</p>
					<PrismPlus
						codeString={isolatedJscHibernationStorage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="observability"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Observability
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>onTransition</code> fires on every hibernate,
						wake, and evict event. Errors thrown from the hook are
						caught + ignored (it's observational only). Pair it with{' '}
						<code>pool.stats()</code> for a complete picture: events
						for derivatives (rates, counts), stats for the current
						snapshot.
					</p>
					<PrismPlus
						codeString={isolatedJscHibernationObservability}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="operator-surface"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Operator surface (0.10.0 and 0.11.0)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The 0.9.0 API above is unchanged — <code>run</code>,{' '}
						<code>hibernate</code>, <code>stats</code>,{' '}
						<code>dispose</code>, <code>onTransition</code>, and the
						pluggable store all behave the same. 0.10.0 and 0.11.0
						are additive: an operator-shaped read for the PaaS
						host's metering loop, graceful shutdown, predictive
						pre-warm, and OpenTelemetry tracing.
					</p>
					<DocsTable
						columns={['Addition', 'What it does']}
						rows={operatorSurfaceRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>metrics()</code> feeds a metering loop directly:{' '}
						<code>bytesHibernated</code> is storage cost, wake
						counts with <code>lastWakeMs</code> flag wake-latency
						tail risk, and the eviction rate flags hot/cold churn.
						The non-hibernating <code>IsolatePool</code> gained the
						same <code>metrics()</code> / <code>drain()</code>{' '}
						pattern in 0.10.0, with <code>spawns</code>,{' '}
						<code>idleEvictions</code>, <code>lruEvictions</code>,
						and <code>recycles</code> counters. With{' '}
						<code>tracerProvider</code> set, the other pool methods
						keep emitting through <code>onTransition</code> — OTel
						wiring stays focused on <code>run</code> so a customer
						trace has one span per work invocation.
					</p>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
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
