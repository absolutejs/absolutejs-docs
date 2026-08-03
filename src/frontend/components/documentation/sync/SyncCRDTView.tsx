import { animated } from '@react-spring/web';
import { PackageExplanation } from '../../../../types/packageDocs';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocumentationViewLayout } from '../DocumentationViewLayout';
import {
	syncCrdtAdapters,
	syncCrdtCompact,
	syncCrdtCursors,
	syncCrdtDelta,
	syncCrdtHook,
	syncCrdtKit,
	syncCrdtRegister
} from '../../../data/documentation/syncCrdtDocsCode';
import {
	h1Style,
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
import { TocItem } from '../../utils/TableOfContents';
import { PackageExplanationBlocks } from '../packages/PackageExplanationBlocks';

const tocItems: TocItem[] = [
	{ href: '#sync-crdt', label: 'CRDT & Collaboration' },
	{ href: '#declarative', label: 'Declarative on the engine' },
	{ href: '#hook', label: 'The client hook' },
	{ href: '#authoritative-hydration', label: 'Authoritative Hydration' },
	{ href: '#kit', label: 'The CRDT kit' },
	{ href: '#delta', label: 'Delta uploads' },
	{ href: '#compact', label: 'Tombstone compaction' },
	{ href: '#cursors', label: 'Collaborative cursors' },
	{ href: '#adapters', label: 'Yjs / Automerge / Loro' }
];

const hydrationExplanation: PackageExplanation[] = [
	{
		description:
			'Document-scoped params and a shared ready state prevent early local edits from forking an empty replica before the authoritative row arrives.',
		id: 'authoritative-hydration',
		kind: 'lifecycle',
		steps: [
			{
				detail: 'Subscribe with collection params that identify and authorize one document.',
				label: 'Scope'
			},
			{
				detail: 'Accept keystrokes locally while the transport and hydrate are still starting.',
				label: 'Buffer'
			},
			{
				detail: 'Hydrate the authoritative CRDT row and expose ready across React, Vue, Svelte, and Angular.',
				label: 'Ready'
			},
			{
				detail: 'Reconcile buffered edits onto authoritative state, then upload only the resulting delta.',
				label: 'Reconcile'
			}
		],
		title: 'Authoritative hydration without lost keystrokes'
	}
];

export const SyncCRDTView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => (
	<DocumentationViewLayout
		isMobileOrTablet={isMobileOrTablet}
		items={tocItems}
		onTocToggle={onTocToggle}
		themeSprings={themeSprings}
		tocOpen={tocOpen}
	>
		<animated.div style={heroGradientStyle(themeSprings)}>
			<h1 id="sync-crdt" style={h1Style(isMobileOrTablet)}>
				CRDT & Collaboration
			</h1>
			<p style={paragraphLargeStyle}>
				Conflict-free collaborative editing — declared on a row field,
				merged server-side, surfaced on the client with one hook. No
				clobbering, no per-keystroke round- trip, no extra backend.
			</p>
		</animated.div>

		<section style={sectionStyle}>
			<AnchorHeading
				id="declarative"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Declarative on the engine
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				Tell the engine which fields are CRDTs. Writes on those fields
				then <strong>merge</strong> on <code>actions.insert</code>/
				<code>update</code> instead of overwriting, and an upsert
				mutation named <code>"{'<table>'}:merge"</code> is
				auto-registered for the client hook.
			</p>
			<PrismPlus
				codeString={syncCrdtRegister}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="hook"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				The client hook
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				<code>useCollaborativeText</code> subscribes to the row's CRDT
				field, merges every replica's edits into a local replica, and
				broadcasts via the auto merge mutation. The local text is the
				source of truth between keystrokes — no per-keystroke server
				round-trip.
			</p>
			<PrismPlus
				codeString={syncCrdtHook}
				language="tsx"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
			<p style={paragraphSpacedStyle}>
				The same hook exists for Vue (<code>useCollaborativeText</code>
				), Svelte (<code>createCollaborativeTextStore</code>), and
				Angular (<code>SyncCollectionService.collaborativeText</code>).
				All four ship under{' '}
				<code>@absolutejs/sync/{'{react,vue,svelte,angular}'}</code>.
			</p>
		</section>

		<PackageExplanationBlocks
			explanations={hydrationExplanation}
			themeSprings={themeSprings}
		/>

		<section style={sectionStyle}>
			<AnchorHeading
				id="kit"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				The CRDT kit
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				<code>@absolutejs/sync/crdt</code> is a small, zero-dependency,
				isomorphic CRDT library — every type is state-based (CvRDT) and
				JSON-serialisable, so they ride the engine's change feed as row
				fields:
			</p>
			<PrismPlus
				codeString={syncCrdtKit}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="delta"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Delta uploads — O(edit), not O(doc)
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				The collaborative-text controller uploads only the new ops since
				the last sync (<code>takeDelta()</code>) instead of the whole
				document. Partial states merge exactly like full states (union),
				so the server keeps full state for trivial late-joiner hydration
				while clients send just deltas:
			</p>
			<PrismPlus
				codeString={syncCrdtDelta}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="compact"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Tombstone compaction
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				RGA keeps tombstones for deleted characters so concurrent edits
				stay convergent. <code>compact</code> drops the ones nothing
				live anchors to (visible text is unchanged), and the linearizer
				is orphan-safe — a stale client briefly referencing a compacted
				tombstone re-roots its element deterministically rather than
				losing content.
			</p>
			<PrismPlus
				codeString={syncCrdtCompact}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="cursors"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Collaborative cursors
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				A caret position survives concurrent edits when it's anchored to
				a CRDT element id instead of an integer index. Pair it with the
				presence hub for live remote carets.
			</p>
			<PrismPlus
				codeString={syncCrdtCursors}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="adapters"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Yjs / Automerge / Loro — first-party adapters
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				The in-package RGA handles offline-merge and moderate
				collaboration. For production-scale collaborative text —
				efficient deltas, tombstone management, interleaving guarantees
				— the <code>sync-adapters</code> repo ships three battle-tested
				backends behind the same <code>TextCrdtAdapter</code> contract:
			</p>
			<PrismPlus
				codeString={syncCrdtAdapters}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>
	</DocumentationViewLayout>
);
