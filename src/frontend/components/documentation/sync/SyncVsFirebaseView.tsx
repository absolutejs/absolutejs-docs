import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncVsFirebaseAuthBridge,
	syncVsFirebaseCostColumns,
	syncVsFirebaseCostGraph,
	syncVsFirebaseCostRows,
	syncVsFirebaseListenerAfter,
	syncVsFirebaseListenerBefore,
	syncVsFirebaseMigrationScript,
	syncVsFirebaseMutationAfter,
	syncVsFirebaseMutationBefore,
	syncVsFirebaseOperatorColumns,
	syncVsFirebaseOperatorRows,
	syncVsFirebaseTldrColumns,
	syncVsFirebaseTldrRows,
	syncVsFirebaseTopicServer
} from '../../../data/documentation/syncVsFirebaseDocsCode';
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
import { Callout } from '../../utils/Callout';
import { ComparisonTable } from '../../utils/ComparisonTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#sync-vs-firebase', label: 'sync vs Firebase' },
	{ href: '#why-migrate', label: 'Why migrate' },
	{ href: '#tldr', label: 'TL;DR mapping' },
	{ href: '#listeners', label: 'Listeners → subscriptions' },
	{ href: '#topics', label: 'Security rules → topics' },
	{ href: '#mutations', label: 'doc.set → mutations' },
	{ href: '#cost', label: 'Cost worked example' },
	{ href: '#operator', label: 'Operator surface' },
	{ href: '#auth', label: 'Auth (keep or migrate)' },
	{ href: '#migration', label: 'One-shot migration script' }
];

const orderedListStyle: CSSProperties = {
	lineHeight: 1.6,
	marginBottom: '1rem',
	paddingLeft: '1.2rem'
};

const WhyLeaveList = () => (
	<ul
		style={{
			lineHeight: 1.6,
			marginBottom: '1rem',
			paddingLeft: '1.2rem'
		}}
	>
		<li>
			<strong>Surprise bills.</strong> "$70k bill in one day" stories on{' '}
			<a
				href="https://news.ycombinator.com/item?id=38935323"
				rel="noopener noreferrer"
				target="_blank"
			>
				HN
			</a>
			. Spencer Pauly's viral{' '}
			<a
				href="https://www.spencerpauly.com/tech/why-i-switched-away-from-google-firestore"
				rel="noopener noreferrer"
				target="_blank"
			>
				migration post
			</a>
			: "Firestore is optimizing to make their costs cheaper. Not yours."
		</li>
		<li>
			<strong>No joins, no aggregations</strong> on Firestore Standard.
			Pipeline Operations API in Enterprise adds them back — at a price.
		</li>
		<li>
			<strong>Vendor lock-in.</strong> Pauly again: "Firestore is the
			epitome of vendor lock-in." No portable migration; rewriting
			business logic to leave.
		</li>
		<li>
			<strong>RTDB historical reliability.</strong> A 13-hour outage on a
			customer's main product (
			<a
				href="https://news.ycombinator.com/item?id=19047812"
				rel="noopener noreferrer"
				target="_blank"
			>
				HN #19047812
			</a>
			). "Almost weekly, all clients sometimes wouldn't get notified of
			document changes."
		</li>
		<li>
			<strong>1.2 MB document limit</strong> is a hard wall for
			analytics/reporting screens.
		</li>
	</ul>
);

const AuthBridgeSteps = () => (
	<ol style={orderedListStyle}>
		<li>Keep Firebase Auth as your identity provider (it's fine).</li>
		<li>
			Validate the Firebase ID token in your Elysia server's auth
			middleware (firebase-admin's <code>verifyIdToken</code>).
		</li>
		<li>
			The verified token becomes the <code>ctx</code> object sync sees on
			every subscription and mutation.
		</li>
	</ol>
);

const MigrationNotesList = () => (
	<ol
		style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			margin: 0,
			paddingLeft: '1.2rem'
		}}
	>
		<li>
			Run the migration with the Firebase site <strong>still live</strong>
			; you're copying, not migrating away yet. Re-run a tail-only delta
			when you cut over.
		</li>
		<li>
			Date/timestamp normalization is the most common gotcha. Firestore
			timestamps come back as <code>{'{ _seconds, _nanoseconds }'}</code>;
			convert to JS Date or ISO string before the insert.
		</li>
	</ol>
);

export const SyncVsFirebaseView = ({
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
					<h1 id="sync-vs-firebase" style={h1Style(isMobileOrTablet)}>
						sync vs Firebase
					</h1>
					<p style={paragraphLargeStyle}>
						The most common "switched away" story across every
						sync-engine community thread starts with{' '}
						<em>
							"I picked Firebase for MVP speed, regretted it by
							production."
						</em>{' '}
						This page is the practical guide: what maps to what,
						what the migration script looks like, and what the
						realistic cost difference is on a worked example.
					</p>
					<p style={paragraphSpacedStyle}>
						This page focuses on sync-vs-Firebase specifically. The
						substrate's operator-grade primitives (audit, OTel,
						dispatch, cluster bus, replay, migration) are
						consolidated on{' '}
						<a href="/documentation/substrate-audit">
							Substrate complete (G1–G7)
						</a>
						.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-migrate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why teams leave Firebase
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The dominant complaints are sourced and consistent
						across years of public discourse:
					</p>
					<WhyLeaveList />
					<p style={paragraphSpacedStyle}>
						sync's positioning is the literal anti-Firebase:
						self-hosted (no vendor), priced as your existing
						server's CPU (no surprise reads bill), uses your
						Postgres/MySQL/SQLite (no NoSQL tax, no document size
						cap, real joins), and the migration is just "swap your
						data layer" — nothing else has to move.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="tldr"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						TL;DR mapping
					</AnchorHeading>
					<ComparisonTable
						columns={syncVsFirebaseTldrColumns}
						firstColumnLabel="Firebase / Firestore"
						rows={syncVsFirebaseTldrRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If the answer to "what changed?" is just "the data
						layer," you can do this migration without touching auth,
						the rest of your stack, or your hosting model.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="listeners"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						<code>onSnapshot</code> → sync collection subscribe
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The client-side change is essentially mechanical: swap
						the import, swap the call. The semantics line up.
					</p>
					<PrismPlus
						codeString={syncVsFirebaseListenerBefore}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>becomes</p>
					<PrismPlus
						codeString={syncVsFirebaseListenerAfter}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="topics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Security rules → server-defined topics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Firestore security rules are a Firebase-specific DSL you
						ship next to the data. sync moves that into the same
						TypeScript file as everything else, with full context
						access (and tests that run with <code>bun test</code>).
					</p>
					<PrismPlus
						codeString={syncVsFirebaseTopicServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="mutations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						<code>doc.set()</code> → mutations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Firestore writes are "set the doc; the server decides
						with security rules." When a write fails the security
						rule, the SDK silently rolls back the optimistic cache
						and the app has no app-visible signal. sync makes the
						server handler explicit, the optimistic draft a
						first-class API, and rejection a normal Promise reject.
					</p>
					<PrismPlus
						codeString={syncVsFirebaseMutationBefore}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>becomes</p>
					<PrismPlus
						codeString={syncVsFirebaseMutationAfter}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cost"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cost worked example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The canonical Firestore cost surprise — and what the
						equivalent looks like on sync. Spencer Pauly's cost
						trap, re-costed:{' '}
						<em>
							"20 posts shown on a feed cost 40 reads if not
							denormalized."
						</em>
					</p>
					<ComparisonTable
						columns={syncVsFirebaseCostColumns}
						firstColumnLabel="Worked example"
						rows={syncVsFirebaseCostRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On sync, the equivalent is a graph collection with a
						left join:
					</p>
					<PrismPlus
						codeString={syncVsFirebaseCostGraph}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The actual feature you wanted ("posts with author
						names") is one declarative collection, not a
						denormalisation strategy you have to rebuild every time
						the schema changes.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="operator"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Operator surface
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Firebase's operator-grade story is managed:
						point-in-time recovery up to 7 days on Firestore
						(Enterprise extends), managed export/import to GCS
						buckets, hosted dashboards. The tradeoff is the vendor
						lock-in + cost surprises you came to leave. Sync ships
						composable primitives you wire into your host — fewer
						bells, more control.
					</p>
					<ComparisonTable
						columns={syncVsFirebaseOperatorColumns}
						firstColumnLabel="Firebase"
						rows={syncVsFirebaseOperatorRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Direction of tradeoff"
						variant="note"
					>
						Firebase ships "managed and done." Sync ships
						"primitives you own and operate." For teams who left
						Firebase because of bills + lock-in, owning the operator
						surface <em>is</em> the point — the substrate gives you
						the verbs so you don't rebuild them.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="auth"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Auth — keep Firebase Auth, or move
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Auth is the one thing sync doesn't do — it's a data
						layer, not an identity provider. The migration pattern
						that fits 90% of teams:
					</p>
					<AuthBridgeSteps />
					<PrismPlus
						codeString={syncVsFirebaseAuthBridge}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="If you'd rather move auth too"
						variant="info"
					>
						<code>@absolutejs/auth</code> ships OAuth (Google,
						GitHub, Apple, etc.), credentials, MFA, sessions, and
						the Firebase-style "just call{' '}
						<code>onAuthStateChanged</code>" client primitive.
						Migration is independent of the sync migration; do them
						in either order.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="migration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						One-shot migration script
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The actual data move. Run it while Firebase stays live;
						tail a delta at cutover.
					</p>
					<p style={paragraphSpacedStyle}>
						Use the firebase CLI to dump each collection to JSON
						(one doc per line), then stream into sync's destination
						DB through Drizzle/Prisma/raw SQL. The example moves the{' '}
						<code>tasks</code> collection to a <code>tasks</code>{' '}
						Postgres table.
					</p>
					<PrismPlus
						codeString={syncVsFirebaseMigrationScript}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Two pragmatic notes"
						variant="note"
					>
						<MigrationNotesList />
					</Callout>
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
