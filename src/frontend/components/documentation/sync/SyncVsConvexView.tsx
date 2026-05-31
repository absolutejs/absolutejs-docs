import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncVsConvexArchitectureFork,
	syncVsConvexCrossClientCache,
	syncVsConvexGaps,
	syncVsConvexHonestyFooter,
	syncVsConvexMatrix,
	syncVsConvexMigrate,
	syncVsConvexPickEach,
	syncVsConvexReplay,
	syncVsConvexSandbox,
	syncVsConvexSharedModel,
	syncVsConvexWireDiff
} from '../../../data/documentation/syncVsConvexDocsCode';
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
	{ href: '#sync-vs-convex', label: 'Overview' },
	{ href: '#shared-model', label: 'Shared mental model' },
	{ href: '#architecture', label: 'Where the engine runs' },
	{ href: '#matrix', label: 'Feature matrix' },
	{ href: '#wire-diff', label: 'Row-level diffs vs full results' },
	{ href: '#cache', label: 'Cross-client query cache' },
	{ href: '#sandbox', label: 'Sandboxed handlers' },
	{ href: '#replay', label: 'Point-in-time replay' },
	{ href: '#migrate', label: 'Tenant migration' },
	{ href: '#gaps', label: 'What sync doesn’t have yet' },
	{ href: '#pick-each', label: 'When to pick each' },
	{ href: '#honesty', label: 'Honest framing' }
];

export const SyncVsConvexView = ({
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
					<h1
						id="sync-vs-convex"
						style={h1Style(isMobileOrTablet)}
					>
						Sync vs Convex
					</h1>
					<p style={paragraphLargeStyle}>
						Convex is the closest comparison point for{' '}
						<code>@absolutejs/sync</code>. The mental model is the
						same — reactive subscriptions, server-authored
						mutations as transactions, automatic dependency
						tracking. The differences are in where the engine
						runs, what language it speaks, and what escape
						hatches it gives you. This page is the honest
						comparison.
					</p>
					<p style={paragraphSpacedStyle}>
						This page focuses on sync-vs-Convex specifically.
						The seven cross-cutting gaps the substrate audit
						named (audit log, OTel, dispatch, cluster bus,
						replay, migration) are consolidated on{' '}
						<a href="/documentation/substrate-audit">
							Substrate complete (G1–G7)
						</a>
						.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shared-model"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Shared mental model
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						If you've used Convex, sync's API will feel familiar.
						Subscribe to a query, mutate via a server-authored
						handler, get pushed updates whenever the read-set
						changes.
					</p>
					<PrismPlus
						codeString={syncVsConvexSharedModel}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="architecture"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where the engine runs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex is a managed runtime + managed DB; sync is a
						library you import into your own Bun server, talking
						to your own DB. Both shapes are valid; the trade-off
						is "guarantees" versus "flexibility."
					</p>
					<PrismPlus
						codeString={syncVsConvexArchitectureFork}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="matrix"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Feature matrix
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Side-by-side of what each ships today. Annotated
						sections below dig into the rows that have the
						biggest implementation differences.
					</p>
					<PrismPlus
						codeString={syncVsConvexMatrix}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wire-diff"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Row-level diffs vs full results
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex pushes the full query result on every change
						(tracked upstream as{' '}
						<a
							href="https://github.com/get-convex/convex-backend/issues/95"
							rel="noopener noreferrer"
							target="_blank"
						>
							get-convex/convex-backend#95
						</a>
						). Sync emits row-level{' '}
						<code>{'{ added, removed, changed }'}</code> diffs.
						Same workload, the wire savings get dramatic with
						query size.
					</p>
					<PrismPlus
						codeString={syncVsConvexWireDiff}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cache"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cross-client query cache
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex pioneered the "one query body per (code,
						parameters, read-set) executes only once" coalescing
						that makes their cost model work. Sync's read-set
						tracking and stable sub-key were already in place;{' '}
						<code>1.3</code> added the persistent cache layer to
						lift sharing across batches.
					</p>
					<PrismPlus
						codeString={syncVsConvexCrossClientCache}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sandbox"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sandboxed handlers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex's V8-isolate runtime sandboxes every handler
						by default. Sync inverts the choice: handlers are
						normal host JS by default, with an opt-in{' '}
						<code>sandboxedHandler</code> per mutation when the
						source is untrusted or you want hard CPU/memory
						caps. Backed by{' '}
						<a
							href="https://github.com/absolutejs/isolated-jsc"
							rel="noopener noreferrer"
							target="_blank"
						>
							@absolutejs/isolated-jsc
						</a>{' '}
						— a Bun-native JavaScriptCore sandbox we built
						because <code>isolated-vm</code> is V8-only and
						doesn't load under Bun. See the dedicated{' '}
						<a href="/documentation/sync-sandbox">
							Sandboxed Mutations
						</a>{' '}
						page for backends, bench numbers, and the full
						trade-off table.
					</p>
					<PrismPlus
						codeString={syncVsConvexSandbox}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="replay"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Point-in-time replay
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex's time-travel queries land in sync as{' '}
						<code>engine.replayTo({'{ at, tables? }'})</code>{' '}
						(1.22) plus a clickable Replay panel in{' '}
						<code>syncDevtools</code> (1.23). Walks the bounded
						change log forward to a target timestamp and returns
						the per-table rows that existed then. Accuracy is
						bounded by your retention policy — set{' '}
						<code>changeLogRetainMs</code> wide for forensic use
						cases.
					</p>
					<PrismPlus
						codeString={syncVsConvexReplay}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="migrate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tenant migration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Moving a tenant between engines (sharding rebalance,
						cross-region move, point-in-time clone for staging)
						is a first-class operation in sync 1.24. Three
						composable verbs — <code>fence</code>,{' '}
						<code>exportSnapshot</code>,{' '}
						<code>importSnapshot</code> — let you choreograph
						the strictness vs availability tradeoff yourself
						instead of taking whatever a monolithic{' '}
						<code>migrate()</code> would prescribe. Reads stay
						open under fence so live subscribers don't go dark
						during the transfer.
					</p>
					<PrismPlus
						codeString={syncVsConvexMigrate}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="gaps"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What sync doesn’t have yet
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Honest list of where Convex is ahead and we haven't
						caught up. These are roadmap items, not artifacts of
						being new — closing them will take real work.
					</p>
					<PrismPlus
						codeString={syncVsConvexGaps}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pick-each"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When to pick each
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Neither answer is wrong. The decision is mostly about
						whether the managed-runtime / managed-DB trade is one
						you want.
					</p>
					<PrismPlus
						codeString={syncVsConvexPickEach}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="honesty"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Honest framing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sync started six days ago. Convex is years old, well
						funded, with a real team. This page records what
						we've shipped and where the trade-offs land today;
						it's not a verdict on the products.
					</p>
					<PrismPlus
						codeString={syncVsConvexHonestyFooter}
						language="markdown"
						themeSprings={themeSprings}
					/>
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
