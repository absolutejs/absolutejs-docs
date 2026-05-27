import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncVsFirebaseAuth,
	syncVsFirebaseCostExample,
	syncVsFirebaseListenerAfter,
	syncVsFirebaseListenerBefore,
	syncVsFirebaseMigrationScript,
	syncVsFirebaseMutationAfter,
	syncVsFirebaseMutationBefore,
	syncVsFirebaseTldr,
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#sync-vs-firebase', label: 'sync vs Firebase' },
	{ href: '#why-migrate', label: 'Why migrate' },
	{ href: '#tldr', label: 'TL;DR mapping' },
	{ href: '#listeners', label: 'Listeners → subscriptions' },
	{ href: '#topics', label: 'Security rules → topics' },
	{ href: '#mutations', label: 'doc.set → mutations' },
	{ href: '#cost', label: 'Cost worked example' },
	{ href: '#auth', label: 'Auth (keep or migrate)' },
	{ href: '#migration', label: 'One-shot migration script' }
];

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
					<h1
						id="sync-vs-firebase"
						style={h1Style(isMobileOrTablet)}
					>
						sync vs Firebase
					</h1>
					<p style={paragraphLargeStyle}>
						The most common "switched away" story across every
						sync-engine community thread starts with{' '}
						<em>"I picked Firebase for MVP speed, regretted it by
						production."</em> This page is the practical guide:
						what maps to what, what the migration script looks
						like, and what the realistic cost difference is on a
						worked example.
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
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>Surprise bills.</strong> "$70k bill in one
							day" stories on{' '}
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
							: "Firestore is optimizing to make their costs
							cheaper. Not yours."
						</li>
						<li>
							<strong>No joins, no aggregations</strong> on
							Firestore Standard. Pipeline Operations API in
							Enterprise adds them back — at a price.
						</li>
						<li>
							<strong>Vendor lock-in.</strong> Pauly again:
							"Firestore is the epitome of vendor lock-in." No
							portable migration; rewriting business logic to
							leave.
						</li>
						<li>
							<strong>RTDB historical reliability.</strong> A 13-hour
							outage on a customer's main product (
							<a
								href="https://news.ycombinator.com/item?id=19047812"
								rel="noopener noreferrer"
								target="_blank"
							>
								HN #19047812
							</a>
							). "Almost weekly, all clients sometimes wouldn't
							get notified of document changes."
						</li>
						<li>
							<strong>1.2 MB document limit</strong> is a
							hard wall for analytics/reporting screens.
						</li>
					</ul>
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
					<PrismPlus
						codeString={syncVsFirebaseTldr}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
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
						Firestore security rules are a Firebase-specific DSL
						you ship next to the data. sync moves that into the
						same TypeScript file as everything else, with full
						context access (and tests that run with{' '}
						<code>bun test</code>).
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
						rule, the SDK silently rolls back the optimistic
						cache and the app has no app-visible signal. sync
						makes the server handler explicit, the optimistic
						draft a first-class API, and rejection a normal
						Promise reject.
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
						equivalent looks like on sync:
					</p>
					<PrismPlus
						codeString={syncVsFirebaseCostExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
					<PrismPlus
						codeString={syncVsFirebaseAuth}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						The actual data move. Run it while Firebase stays
						live; tail a delta at cutover.
					</p>
					<PrismPlus
						codeString={syncVsFirebaseMigrationScript}
						language="typescript"
						showLineNumbers={true}
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
