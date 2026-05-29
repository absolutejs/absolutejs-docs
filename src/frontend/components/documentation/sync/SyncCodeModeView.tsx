import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncCodeModeChain,
	syncCodeModeDemo,
	syncCodeModeFactory,
	syncCodeModeNaming,
	syncCodeModeSemantics,
	syncCodeModeTransactional,
	syncCodeModeTransactionalChain
} from '../../../data/documentation/syncCodeModeDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#code-mode', label: 'Code Mode for Mutations' },
	{ href: '#why', label: 'Why one tool, not N' },
	{ href: '#factory', label: 'The host-tool factory' },
	{ href: '#chain', label: 'What the model emits' },
	{ href: '#naming', label: 'Host-fn naming' },
	{ href: '#semantics', label: 'v0.1 semantics' },
	{ href: '#demo', label: 'Worked example' },
	{ href: '#transactional', label: 'Atomic batches (1.11+)' }
];

export const SyncCodeModeView = ({
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
					<h1 id="code-mode" style={h1Style(isMobileOrTablet)}>
						Code Mode for Mutations
					</h1>
					<p style={paragraphLargeStyle}>
						<code>@absolutejs/sync@1.10.0</code> adds a new{' '}
						<code>/code-mode</code> subpath that exposes the
						engine's mutation surface as a host-tool map
						shape-compatible with{' '}
						<code>@absolutejs/ai</code>'s{' '}
						<code>codeModeTool</code>. N optimistic mutations
						collapse into one model turn — the agent emits a
						single function body that chains them through the
						sandbox, and only the final return enters the
						conversation context.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why one tool, not N
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Code Mode pattern was popularized by
						Cloudflare's Dynamic Workers (April 2026) and
						parallel work on Anthropic's programmatic tool
						calling. Both vendors report ~80% token reduction
						on multi-tool turns. Instead of exposing N tools
						and letting the model call them sequentially (N
						round-trips, N tool-call tokens, intermediate
						state crowding the context), Code Mode exposes one
						tool whose body is JS the model writes. The
						sandbox runs the JS, calls the host fns in any
						order, and returns one value.
					</p>
					<p style={paragraphSpacedStyle}>
						Sync's contribution: the engine's mutation surface
						is the underlying host fn set. A mutation handler
						the engine already validates, retries, fans out,
						and authorizes becomes a function the model can
						call from a sandbox script. The integration is a
						single factory call.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="factory"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The host-tool factory
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>engineMutationsAsHostTools</code> takes the
						engine, a per-call <code>ctx()</code> factory,
						and the mutation descriptor list. It returns a
						record shape-compatible with{' '}
						<code>codeModeTool({'{ tools }'})</code> — no
						import of <code>@absolutejs/ai</code> from sync's
						side, so the AI SDK stays decoupled from the
						engine.
					</p>
					<PrismPlus
						codeString={syncCodeModeFactory}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="chain"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What the model emits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The model sees the typed signatures of every host
						fn in the prompt and writes ONE function body that
						chains them. A built-in <code>log(...)</code> is
						in scope for debugging — its messages come back
						alongside the result without entering the
						conversation context.
					</p>
					<PrismPlus
						codeString={syncCodeModeChain}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="naming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Host-fn naming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Engine mutation names use <code>:</code> because
						they're addressing strings, not identifiers. The
						host-tool map auto-derives JS-safe names by
						replacing non-identifier characters with{' '}
						<code>_</code>. Override per-mutation with{' '}
						<code>hostFnName</code> when the derived name
						would collide. Build-time errors surface at boot,
						not at the first model call.
					</p>
					<PrismPlus
						codeString={syncCodeModeNaming}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="semantics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						v0.1 semantics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each <code>runMutation</code> call in the model's
						script runs in its own DB transaction — the
						engine's per-call retry + tx wrapper. If mutation
						3/5 throws, mutations 1–2 are already committed.
						The model receives the error and can compensate
						in code, or surface the partial-success state for
						a follow-up turn.
					</p>
					<p style={paragraphSpacedStyle}>
						When you need cross-mutation atomicity instead —
						all-or-nothing across N runMutations — skip the
						per-mutation host fns and reach for{' '}
						<code>transactionalBatchAsHostTool</code> +{' '}
						<code>engine.runMutations</code> in sync 1.11+
						(see <a href="#transactional">Atomic batches</a>{' '}
						below). The per-mutation surface here ships
						honest v0.1 semantics; the batched surface ships
						the all-or-nothing variant. Pick per host fn, not
						per engine.
					</p>
					<p style={paragraphSpacedStyle}>
						In practice: design the host fns so each is
						independently safe to commit. Idempotent
						mutations (favorites toggle on a deterministic
						row id; mentions record on a primary key
						composed of the source) make this easy.
					</p>
					<PrismPlus
						codeString={syncCodeModeSemantics}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="demo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Worked example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The{' '}
						<a
							href="https://github.com/absolutejs/examples/tree/main/sync"
							rel="noopener noreferrer"
							target="_blank"
						>
							<code>examples/sync</code>
						</a>{' '}
						app's React page renders a{' '}
						<code>CodeModePanel</code> with a textarea, Run
						button, and live output. The default body chains
						<code>comments_create</code> +{' '}
						<code>comments_toggleReaction</code>. The
						Playwright test fills the textarea with a marker
						body, clicks Run, and asserts both tool calls
						land plus the created comment row materializing
						in the live <code>comments-with-author</code>{' '}
						join collection — proving the mutation committed
						end-to-end through the engine, not just round-
						tripped through the sandbox.
					</p>
					<PrismPlus
						codeString={syncCodeModeDemo}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="transactional"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Atomic batches (1.11+)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>sync@1.11.0</code> closes the cross-mutation
						atomicity gap. The engine gains{' '}
						<code>runMutations(specs, ctx)</code>: N mutations
						in one DB transaction, accumulated buffered
						changes that fan out as ONE live diff on commit,
						and full rollback on any thrown handler — no
						partial commits, no surprise per-mutation diffs.
						Per-mutation <code>authorize</code> still runs
						(inside the tx); per-mutation retry policies do
						not apply to batches.
					</p>
					<p style={paragraphSpacedStyle}>
						The <code>/code-mode</code> subpath gains{' '}
						<code>transactionalBatchAsHostTool</code>, which
						returns one Code Mode host fn (by convention{' '}
						<code>run_transaction</code>) that takes an{' '}
						<code>Array&lt;&#123; name, args &#125;&gt;</code> from
						the model. The model can use the per-mutation
						host fns when it needs to branch on intermediate
						results, OR call <code>run_transaction</code>{' '}
						when it needs all-or-nothing semantics. Drop both
						into the same <code>codeModeTool({'{ tools }'})</code>{' '}
						map.
					</p>
					<PrismPlus
						codeString={syncCodeModeTransactional}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						What the model emits for the atomic path:
					</p>
					<PrismPlus
						codeString={syncCodeModeTransactionalChain}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The trade-off the batch makes explicit: the model
						can't reference an intermediate result inside the
						spec list (it's data, not code). When the script
						needs to thread a value from mutation 1 into
						mutation 2's args, use the per-mutation host fns
						and accept partial-failure compensation. When it
						needs to commit several pre-shaped writes
						together or not at all, use{' '}
						<code>run_transaction</code>.
					</p>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
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
