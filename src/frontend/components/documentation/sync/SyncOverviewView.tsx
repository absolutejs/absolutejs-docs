import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncCrdt,
	syncCrdtBackends,
	syncPermissions,
	syncQuickStartClient,
	syncQuickStartServer,
	syncScheduled,
	syncSearch
} from '../../../data/documentation/syncDocsCode';
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
	{ href: '#sync-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#how-it-fits', label: 'How it fits' },
	{ href: '#crdt', label: 'CRDT Collaboration' },
	{ href: '#permissions', label: 'Permissions & Schema' },
	{ href: '#search', label: 'Live Search' },
	{ href: '#scheduled', label: 'Scheduled Functions' },
	{ href: '#adapters', label: 'CRDT Backends' },
	{ href: '#frameworks', label: 'Framework Hooks' }
];

export const SyncOverviewView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
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
					<h1 id="sync-overview" style={h1Style(isMobileOrTablet)}>
						Sync
					</h1>
					<p style={paragraphLargeStyle}>
						A reactive data layer for your own database. Push
						row-level diffs over a WebSocket, run server-authored
						mutations with optimistic client edits, declare CRDT
						fields for conflict-free collaboration, and run
						scheduled functions — all without adopting a hosted
						backend.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define a collection on your engine, expose it over{' '}
						<code>syncSocket</code>, and let the engine push diffs.
						Reads and writes both flow through one WebSocket.
					</p>
					<PrismPlus
						codeString={syncQuickStartServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On the client, one hook gives you the live data + an
						optimistic <code>mutate</code>:
					</p>
					<PrismPlus
						codeString={syncQuickStartClient}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-fits"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How it fits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sync is a <strong>library</strong>, not a hosted
						backend. It runs inside your Elysia server, talks to
						the database you already have (Postgres, MySQL, SQLite
						via Drizzle or Prisma), and ships its own transport:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>Reactive push</strong> — kill polling. A
							view subscribes to topics; mutations publish them;
							subscribers refetch the instant data changes.
						</li>
						<li>
							<strong>ORM auto-reactivity</strong> — Drizzle and
							Prisma adapters derive topics from a query, so
							reads and writes line up automatically.
						</li>
						<li>
							<strong>Live collections</strong> — row-level{' '}
							<code>{'{ added, removed, changed }'}</code> diffs
							over a WebSocket, optimistic mutations, an offline
							queue, and a local-first IndexedDB cache.
						</li>
						<li>
							<strong>Operator graph</strong> — incremental
							joins, aggregations, and top-N ordering as
							composable operators.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="crdt"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CRDT Collaboration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Declare any row field as a CRDT and the engine merges
						concurrent writes server-side instead of overwriting.
						A client hook reads/writes the field with no
						per-keystroke server round-trip — the local replica
						holds the live text and uploads only the delta ops
						(O(edit), not O(doc)).
					</p>
					<PrismPlus
						codeString={syncCrdt}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The first-party CRDT kit at{' '}
						<code>@absolutejs/sync/crdt</code> is zero-dependency
						and isomorphic — a PN-counter, an LWW register, an
						OR-Set, a key→value map, an ordered list, and the RGA
						text type. Caret positions can be anchored to CRDT
						element ids so they survive concurrent edits
						(collaborative cursors).
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="permissions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Permissions & Schema
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Row-level reads and writes are gated declaratively:
						the read rule filters every diff the engine emits, and
						the write rule runs against the committed row before
						the mutation touches your store (a deny rolls the
						transaction back).
					</p>
					<PrismPlus
						codeString={syncPermissions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The companion <code>defineSchema</code> + the{' '}
						<code>field</code> kit validate every write (a bad
						write throws <code>SchemaError</code>), and{' '}
						<code>migrate</code> lazily upcasts rows on read — no
						database migration step required.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="search"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Live Search
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A search collection keeps a server-side BM25 (or
						vector) index current from the same change feed. The
						subscription's params <em>are</em> the query — the
						ranked top-K streams back as a normal collection,
						re-ranked as rows change.
					</p>
					<PrismPlus
						codeString={syncSearch}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scheduled"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scheduled Functions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Cron-pattern server jobs whose writes go live through
						the change feed — no polling, no separate scheduler
						service. Wired through the{' '}
						<code>scheduled</code> Elysia plugin (an optional
						subpath so consumers without it pull no cron
						dependency).
					</p>
					<PrismPlus
						codeString={syncScheduled}
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
						CRDT Backends — first-party adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The in-package CRDT is great for offline-merge and
						moderate collaboration. For production-scale
						collaborative text, swap in a battle-tested backend
						from the <code>sync-adapters</code> repo —{' '}
						<code>@absolutejs/sync-yjs</code>,{' '}
						<code>@absolutejs/sync-automerge</code>, or{' '}
						<code>@absolutejs/sync-loro</code> — all behind the
						same <code>TextCrdtAdapter</code> contract:
					</p>
					<PrismPlus
						codeString={syncCrdtBackends}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="frameworks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Framework Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Idiomatic bindings live at{' '}
						<code>@absolutejs/sync/{'{react, vue, svelte, angular}'}</code>.
						Each ships <code>useSyncCollection</code> /{' '}
						<code>createSyncCollectionStore</code> /{' '}
						<code>SyncCollectionService.connect</code> for live
						collections, plus a matching{' '}
						<code>useCollaborativeText</code> /{' '}
						<code>createCollaborativeTextStore</code> /{' '}
						<code>SyncCollectionService.collaborativeText</code>{' '}
						for CRDT fields.
					</p>
					<p style={paragraphSpacedStyle}>
						All four hook surfaces are SSR-safe and return the same
						shape — so swapping frameworks in a multi-stack app
						doesn't change your data layer.
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
