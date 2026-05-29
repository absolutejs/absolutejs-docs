import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncPacksAuthor,
	syncPacksComposition,
	syncPacksFactoryPattern,
	syncPacksFavoritesPin,
	syncPacksRegister
} from '../../../data/documentation/syncPacksDocsCode';
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
	{ href: '#sync-packs', label: 'Sync Packs' },
	{ href: '#shipped', label: 'Shipped packs' },
	{ href: '#register', label: 'One register call' },
	{ href: '#shape', label: 'The factory shape' },
	{ href: '#composition', label: 'Composition rules' },
	{ href: '#evolve', label: 'Evolving a pack' },
	{ href: '#author', label: 'Authoring a pack' }
];

export const SyncPacksView = ({
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
					<h1 id="sync-packs" style={h1Style(isMobileOrTablet)}>
						Sync Packs
					</h1>
					<p style={paragraphLargeStyle}>
						Convex Components without the lock-in. A{' '}
						<strong>sync pack</strong> bundles schema + permissions
						+ readers/writers + collections + mutations + schedules
						as one npm package, registered with one{' '}
						<code>engine.registerPack(...)</code> call. The lineage
						is Convex Components; the difference is they're plain
						portable npm packages, not a runtime moat.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shipped"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Shipped packs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Seven first-party packs and one helper library live in
						the{' '}
						<a
							href="https://github.com/absolutejs/sync-packs"
							rel="noopener noreferrer"
							target="_blank"
						>
							sync-packs
						</a>{' '}
						monorepo. Each is its own independent npm package —
						install only what you use.
					</p>
					<ul style={paragraphSpacedStyle}>
						<li>
							<code>@absolutejs/sync-pack-presence</code>{' '}
							<strong>0.3</strong> — per-channel live presence
							with heartbeat-driven membership, TTL cleanup,
							plus cursor and typing state patches (typing
							carries its own deadline inside{' '}
							<code>state.typingExpiresAt</code>, so stalled
							typists clear without a server pass).
						</li>
						<li>
							<code>@absolutejs/sync-pack-comments</code>{' '}
							<strong>0.4</strong> — threaded comments on
							host-side resources, with per-resource ACL,
							author-only edits, author-or-moderator deletes,
							optional CRDT bodies, an optional{' '}
							<code>comments-with-author</code> join, in-thread
							full-text search, and emoji reactions.
						</li>
						<li>
							<code>@absolutejs/sync-pack-digest</code>{' '}
							<strong>0.2</strong> — scheduled per-actor digest
							emails, cursor-managed, transport-agnostic (you
							bring Resend / SES / Postmark) with a{' '}
							<code>dryRun</code> + <code>onActorPreview</code>{' '}
							mode for staging.
						</li>
						<li>
							<code>@absolutejs/sync-pack-notifications</code>{' '}
							<strong>0.2</strong> — per-actor inbox with
							host-trusted <code>notify</code> +{' '}
							<code>markRead</code> + <code>markAllRead</code>,
							optional <code>autoArchiveAfterDays</code> cron,
							and a <code>kindFilter</code> param for slice
							subscriptions.
						</li>
						<li>
							<code>@absolutejs/sync-pack-favorites</code>{' '}
							<strong>0.2</strong> — per-actor saved resources
							with idempotent favorite/unfavorite/toggle, an
							optional <code>favorites-with-resource</code>{' '}
							join, and a nullable <code>pinnedAt</code>{' '}
							timestamp for pinned-first sort.
						</li>
						<li>
							<code>@absolutejs/sync-pack-counters</code>{' '}
							<strong>0.1</strong> — read-set-tracked live
							counters via <code>defineReactiveQuery</code>.
							Each counter is a separate reactive query whose
							compute reads through <code>db</code>; the engine
							re-runs and re-pushes when any touched table
							changes. The pack owns no tables — pure derived
							views.
						</li>
						<li>
							<code>@absolutejs/sync-pack-mentions</code>{' '}
							<strong>0.1</strong> — parses{' '}
							<code>@username</code> from a body, writes
							per-actor mention rows, and fires an{' '}
							<code>onMention</code> hook the host uses to
							compose with other packs (typically{' '}
							<code>notifications:notify</code>). The
							composition seam, not a hardcoded dependency.
						</li>
						<li>
							<code>@absolutejs/sync-pack-utils</code>{' '}
							<strong>0.1</strong> — helper library (not a
							pack). Exports <code>resolveActor</code>,{' '}
							<code>requireRowOwner</code>,{' '}
							<code>requireOwnerOrModerator</code>,{' '}
							<code>createInMemoryStore</code> — the patterns
							every pack repeats. New packs should import from
							here.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						The full surface plus the worked-example demos live in
						the{' '}
						<a
							href="https://github.com/absolutejs/examples/tree/main/sync"
							rel="noopener noreferrer"
							target="_blank"
						>
							<code>examples/sync</code>
						</a>{' '}
						app — every pack is wired across all four reactive
						frameworks (React, Vue, Svelte, Angular) so the same
						test loop validates them uniformly.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="register"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						One register call
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A pack is a self-contained record. The engine's{' '}
						<code>registerPack</code> walks every field and
						dispatches to the matching{' '}
						<code>engine.register*</code> method — no new
						persistence path, no runtime indirection. Two registered
						packs cannot claim the same{' '}
						<code>ownsTables</code> entry; the engine throws{' '}
						<code>PackTableConflictError</code> if they try.
					</p>
					<PrismPlus
						codeString={syncPacksRegister}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The pack is also surfaced in{' '}
						<code>engine.inspect().packs</code> for devtools.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shape"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The factory shape
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every published pack ships as{' '}
						<code>create&lt;Name&gt;Pack(config)</code>, never as a
						pre-built static record. Namespacing (the{' '}
						<code>tablePrefix</code>) and config injection (the
						app's <code>getActorId</code>, the{' '}
						<code>scope</code>) belong to the pack's own code, not
						to the engine. That's why the same pack can be
						registered twice on one engine with different prefixes,
						and why no two packs need a coordination layer to avoid
						stepping on each other's table names.
					</p>
					<PrismPlus
						codeString={syncPacksFactoryPattern}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="composition"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Composition rules
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Packs compose via the <em>subscription</em> layer or
						through an <em>explicit host-callback</em> — never by
						calling each other's mutations directly. The pack
						subscribes to a sister collection, or it exposes a
						typed hook (e.g.{' '}
						<code>mentions.onMention(({'{'} mention {'}'}, ctx) =&gt; …)</code>) and
						the host closes over the engine to wire the second
						pack inside that hook. Either way, cross-pack data
						flows through the change feed or through the host's
						explicit code — never through a hardcoded import. The
						mentions pack uses this seam to fire{' '}
						<code>notifications:notify</code> on every parsed{' '}
						<code>@username</code>, with neither pack importing
						the other.
					</p>
					<PrismPlus
						codeString={syncPacksComposition}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="evolve"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Evolving a pack
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pack feature evolution happens inside the pack's npm
						semver — the engine doesn't need to know about new
						mutations or columns. Bump the version, ship the
						feature, and host code picks it up by upgrading the
						dependency. The favorites pack's 0.2 pinning surface
						is a worked example: a new nullable column on the
						owned row, three new idempotent mutations, no engine
						change, and clients sort pinned-first on the result.
					</p>
					<PrismPlus
						codeString={syncPacksFavoritesPin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="author"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authoring a pack
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A pack is a plain data record returned by{' '}
						<code>defineSyncPack(...)</code>. The fields mirror the
						engine's <code>register*</code> surface plus ownership
						metadata; the engine does the dispatching.
					</p>
					<PrismPlus
						codeString={syncPacksAuthor}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The full design rationale — including the locked
						decisions on factory + injection, no engine-side name
						rewriting, and subscription-layer composition — lives
						in the{' '}
						<a
							href="https://github.com/absolutejs/sync/blob/main/src/engine/syncPacks.design.md"
							rel="noopener noreferrer"
							target="_blank"
						>
							syncPacks.design.md
						</a>{' '}
						in the sync repo. Pack tests can use the{' '}
						<code>@absolutejs/sync/testing</code> subpath (added in
						1.9.2) for <code>createTestEngine</code>,{' '}
						<code>expectRejection</code>, and{' '}
						<code>runAsActor</code>.
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
