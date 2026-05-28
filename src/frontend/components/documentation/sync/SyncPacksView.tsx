import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncPacksAuthor,
	syncPacksComposition,
	syncPacksFactoryPattern,
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
						Three first-party packs live in the{' '}
						<a
							href="https://github.com/absolutejs/sync-packs"
							rel="noopener noreferrer"
							target="_blank"
						>
							sync-packs
						</a>{' '}
						monorepo. They're independent npm packages — install
						only what you use.
					</p>
					<ul style={paragraphSpacedStyle}>
						<li>
							<code>@absolutejs/sync-pack-presence</code> — per-
							channel live presence with heartbeat-driven
							membership and TTL cleanup via a scheduled function.
						</li>
						<li>
							<code>@absolutejs/sync-pack-comments</code> —
							threaded comments on host-side resources, with
							per-resource ACL injection, author-only edits,
							author-or-moderator deletes, and optional CRDT
							bodies.
						</li>
						<li>
							<code>@absolutejs/sync-pack-digest</code> —
							scheduled per-actor digest emails, cursor-managed,
							transport-agnostic (you bring Resend / SES /
							Postmark).
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						The full surface plus the worked-example demos live in
						the <code>examples/sync</code> React page (and on each
						pack's README).
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
						Packs compose via the <em>subscription</em> layer, never
						the <em>call</em> layer. A pack that wants to react to
						another pack's data subscribes to its collection; it
						does not call its mutations. Cross-pack data flows
						through the change feed, and the call graph stays
						decoupled — which is the structural difference between
						sync packs and Convex Components.
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
