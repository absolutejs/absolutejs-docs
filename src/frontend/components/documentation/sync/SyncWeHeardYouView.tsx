import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncWeHeardYouBackends,
	syncWeHeardYouCrdt,
	syncWeHeardYouFrameworks,
	syncWeHeardYouJoins,
	syncWeHeardYouPermissions,
	syncWeHeardYouPresence,
	syncWeHeardYouPricing,
	syncWeHeardYouReconnect,
	syncWeHeardYouSandbox,
	syncWeHeardYouScheduled,
	syncWeHeardYouSelfHost
} from '../../../data/documentation/syncWeHeardYouDocsCode';
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
	{ href: '#sync-we-heard-you', label: 'We Heard You' },
	{ href: '#reconnect', label: 'Silent reconnect data loss' },
	{ href: '#joins', label: 'No joins / aggregations' },
	{ href: '#backends', label: 'One-database lock-in' },
	{ href: '#self-host', label: 'Self-host gaps' },
	{ href: '#pricing', label: 'MAU / per-dev / surprise bills' },
	{ href: '#sandbox', label: 'No sandboxed user mutations' },
	{ href: '#permissions', label: 'Permissions thrash' },
	{ href: '#crdt', label: 'CRDT hosting lock-in' },
	{ href: '#presence', label: 'Presence missing or unbundled' },
	{ href: '#frameworks', label: 'Framework second-class' },
	{ href: '#scheduled', label: 'No scheduled jobs' }
];

export const SyncWeHeardYouView = ({
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
						id="sync-we-heard-you"
						style={h1Style(isMobileOrTablet)}
					>
						We Heard You
					</h1>
					<p style={paragraphLargeStyle}>
						These are pain points the sync-engine and realtime-DB
						community has been articulating for years across HN
						threads, GitHub issues, blog posts, and SDK reviews.
						Each one here is the original complaint, sourced, and
						what sync ships to address it. If you've hit any of
						these with another tool, this page is for you.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reconnect"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Silent reconnect data loss
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The single most-cited bug class in this space.
						Supabase Realtime{' '}
						<a
							href="https://github.com/orgs/supabase/discussions/5641"
							rel="noopener noreferrer"
							target="_blank"
						>
							documented
						</a>{' '}
						that "the standard examples of starting a subscription
						and letting realtime handle re-connections in the
						background will cause loss of data changes." A related
						memory-leak issue (
						<a
							href="https://github.com/supabase/supabase-js/issues/1204"
							rel="noopener noreferrer"
							target="_blank"
						>
							supabase-js #1204
						</a>
						) was closed "not planned." ElectricSQL's{' '}
						<a
							href="https://electric-sql.com/blog/2025/08/04/reliability-sprint"
							rel="noopener noreferrer"
							target="_blank"
						>
							August 2025 reliability sprint
						</a>{' '}
						fixed multiple related drops after 1.0 GA. Firebase
						RTDB had a publicly-reported 13-hour outage on a
						customer's main product.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouReconnect}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="joins"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						No joins, no aggregations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<a
							href="https://github.com/electric-sql/electric/discussions/1608"
							rel="noopener noreferrer"
							target="_blank"
						>
							ElectricSQL discussion #1608
						</a>{' '}
						(36 👍, 13 🚀) is the #1 user-voted feature request:
						include trees / joins. PowerSync rewrote their entire
						query model into "Sync Streams" specifically because
						the old DSL couldn't express joins. Convex has no JOIN
						operator at all; hand-coded joins in JS get ugly fast.
						Firestore's eternal "no joins, no aggregations" gripe
						pushes users off it.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouJoins}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="backends"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						One-database lock-in
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Zero is Postgres-only. Convex is its own proprietary
						store. InstantDB acknowledges "you can't bring your own
						postgres (yet)." Liveblocks doesn't have a DB story at
						all. Replicache is BYO-backend and you write the
						integration tax.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouBackends}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="self-host"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Self-host is universally weak
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex's self-hosted OSS{' '}
						<a
							href="https://www.convex.sucks/"
							rel="noopener noreferrer"
							target="_blank"
						>
							only runs on a single machine
						</a>
						. Zero requires a separate <code>zero-cache</code>{' '}
						process running alongside Postgres.{' '}
						<a
							href="https://github.com/liveblocks/liveblocks/issues/682"
							rel="noopener noreferrer"
							target="_blank"
						>
							Liveblocks #682
						</a>{' '}
						has been open since Feb 2023 asking for production
						self-host; the official answer is "let us know, we'd
						love to partner" (i.e. nope). PowerSync needs its own
						Go/Node service. ElectricSQL needs a proxy in front
						for auth.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouSelfHost}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pricing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						MAU pricing, per-dev fees, surprise bills
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The universal complaint across this category:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>Convex per-developer pricing</strong>:
							"I don't like to pay extra fees simply because I
							have a new intern joining the team."
						</li>
						<li>
							<strong>Liveblocks MAU</strong>: "Every user that
							triggers the SDK in a calendar month counts...
							thousands of occasional reviewers can push costs
							far beyond the budget for core editors." Prices
							doubled on year-1 renewal in multiple cited
							customer testimonials.
						</li>
						<li>
							<strong>Cloudflare D1</strong>: a $5/month account
							got a{' '}
							<a
								href="https://littlebearapps.com/blog/d1-billing-disaster-circuit-breakers/"
								rel="noopener noreferrer"
								target="_blank"
							>
								$4,868 invoice
							</a>{' '}
							from two buggy workers in January 2026. No
							circuit breaker.
						</li>
						<li>
							<strong>Firebase</strong>: HN reports of "$70k bill
							in one day"; Spencer Pauly's{' '}
							<a
								href="https://www.spencerpauly.com/tech/why-i-switched-away-from-google-firestore"
								rel="noopener noreferrer"
								target="_blank"
							>
								viral migration post
							</a>{' '}
							frames it: "Firestore is optimizing to make their
							costs cheaper. Not yours."
						</li>
					</ul>
					<PrismPlus
						codeString={syncWeHeardYouPricing}
						language="typescript"
						showLineNumbers={true}
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
						No sandboxed user-supplied mutations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						This one is a feature gap rather than a complaint —
						but it's stark. <strong>None</strong> of Convex, Zero,
						InstantDB, PowerSync, RxDB, Liveblocks, ElectricSQL,
						or TanStack DB ships a way to safely run mutation
						logic supplied by a tenant, an AI agent, or a plugin
						author. Convex actions, Zero custom mutators, and
						Replicache mutators are all server-trusted code. If
						you want a multi-tenant PaaS where customers write
						their own logic, you build the sandbox yourself.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouSandbox}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The full deep-dive on backends, performance, and
						trade-offs is at{' '}
						<a href="/documentation/sync-sandbox">
							Sandboxed Mutations
						</a>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="permissions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Permissions thrash
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Zero deprecated its RLS-based permissions API in
						release 0.23 and rewrote to "synced queries" + custom
						mutators — <strong>two complete rewrites in &lt;18
						months</strong>. Users who built on the old API had
						to rebuild. Convex team's own admission (HN
						discussion):{' '}
						<em>
							"Auth story isn't as streamlined as for Firebase
							or Supabase if you don't want to use Clerk or
							Auth0."
						</em>{' '}
						InstantDB plans to push CEL down to SQL predicates
						as "future work" — today permissions evaluate
						post-query on the result set.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouPermissions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="crdt"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CRDT collab without hosting lock-in
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Liveblocks ships Yjs — but hosted-only, billed per
						MAU, with the SDK review noting Yjs integration
						breakage on framework upgrades (liveblocks #2099 broke
						multi-window sync; #2973 caused Lexical desync; #3394
						breaks Tiptap undo). Zero has "last-update-wins" as
						the observed conflict behavior with{' '}
						<em>no documented strategy</em>.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouCrdt}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="presence"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Presence missing or unbundled
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Zero{' '}
						<a
							href="https://johnny.sh/blog/choosing-a-sync-engine-in-2026/"
							rel="noopener noreferrer"
							target="_blank"
						>
							does NOT include real-time presence
						</a>
						; apps that need cursors or "who's online" with Zero
						run additional infrastructure. Liveblocks ships
						presence — as a separate billable product on top of
						its storage one.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouPresence}
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
						Framework second-class status
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The{' '}
						<a
							href="https://velt.dev/blog/liveblocks-sdk-review-alternatives-2025"
							rel="noopener noreferrer"
							target="_blank"
						>
							Liveblocks SDK review (Oct 2025)
						</a>
						: "Vue and Svelte examples wrap the low-level client
						but lack first-class hooks or components. Angular and
						plain JavaScript require even more scaffolding." Zero
						is React/TS-only.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouFrameworks}
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
						No scheduled jobs alongside your data layer
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Liveblocks doesn't ship them. RxDB doesn't. PowerSync
						doesn't. ElectricSQL doesn't. If you want cron-like
						behavior next to your sync engine, you bolt on a
						separate worker process. Convex has them — Convex
						users like that.
					</p>
					<PrismPlus
						codeString={syncWeHeardYouScheduled}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ongoing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What we're still working on
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Honesty about the open questions:
					</p>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>"Code Mode" for AI agents</strong> —
							expose typed TS APIs of host tools to the model,
							let it write one function chaining them.
							Cloudflare's pattern; 80% token reduction. Coming
							to <code>@absolutejs/ai</code>'s{' '}
							<code>codeExecutionTool</code>.
						</li>
						<li>
							<strong>
								Per-tenant metrics as a system collection
							</strong>{' '}
							— sandbox runs already record{' '}
							<code>cpuMs</code> / <code>heapBytes</code>; we'll
							surface them as a queryable collection so you
							can build per-tenant dashboards in sync itself.
						</li>
						<li>
							<strong><code>bridgeFetch</code></strong> —
							credential-brokered HTTP from inside the sandbox.
							Auth headers attached on the host side; secrets
							never enter JSC.
						</li>
						<li>
							<strong>Pause/resume isolates</strong> — match
							the E2B / Sprites / Anthropic primitive of
							persistent agent state without ephemeral
							churn.
						</li>
						<li>
							<strong>Hosted absolutejs Cloud</strong> — the
							long-term home for the multi-tenant PaaS case.
							Substrate first, hosted later.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						Hit us with anything we missed. Issues at{' '}
						<a
							href="https://github.com/absolutejs/sync/issues"
							rel="noopener noreferrer"
							target="_blank"
						>
							github.com/absolutejs/sync
						</a>
						.
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
