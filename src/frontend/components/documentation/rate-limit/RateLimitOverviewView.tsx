import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	rateLimitAlgorithms,
	rateLimitCost,
	rateLimitHeaders,
	rateLimitIpModes,
	rateLimitNonHttp,
	rateLimitQuickStart
} from '../../../data/documentation/rateLimitDocsCode';
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
	{ href: '#rate-limit-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#algorithms', label: 'Algorithms' },
	{ href: '#cost-keys-hooks', label: 'Cost, Keys & Hooks' },
	{ href: '#headers', label: 'IETF Headers' },
	{ href: '#ip-modes', label: 'IP & Proxy Trust' },
	{ href: '#non-http', label: 'Non-HTTP Usage' }
];

export const RateLimitOverviewView = ({
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
					<h1 id="rate-limit-overview" style={h1Style(isMobileOrTablet)}>
						Rate Limit
					</h1>
					<p style={paragraphLargeStyle}>
						A first-class, from-scratch, 2026 rate limit for Bun +
						Elysia. <strong>GCRA</strong> by default — the algorithm
						Stripe uses — with token bucket and sliding-window also
						bundled. IETF draft-09 <code>RateLimit-*</code> headers,
						IPv6 grouping by <code>/64</code>,{' '}
						<code>X-Forwarded-For</code> trust modes, BigInt
						nanosecond TAT, and a lazy-TTL LRU memory store with no
						background sweeper.
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
						<code>rateLimit()</code> is an Elysia plugin — wire it
						with <code>.use()</code> and every request is gated
						before it reaches your handlers. The default key is the
						requester's IP; the default algorithm is GCRA.
					</p>
					<PrismPlus
						codeString={rateLimitQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Over the cap, the plugin returns <code>429</code> with{' '}
						<code>Retry-After</code> + the IETF{' '}
						<code>RateLimit-*</code> headers. The remaining count
						stays current on the <code>200</code> responses too — so
						clients can throttle themselves before they get
						refused.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="algorithms"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Algorithms
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pick GCRA unless you have a reason not to. It's exact,
						O(1) memory per key (one BigInt — the TAT), no boundary
						effects, no float drift. Token bucket and sliding-window
						are bundled for when you specifically want their
						semantics (burst-then-throttle or
						N-in-the-last-M-seconds, respectively). Stack any of
						them with <code>combined</code>.
					</p>
					<PrismPlus
						codeString={rateLimitAlgorithms}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul
						style={{
							lineHeight: 1.6,
							marginBottom: '1rem',
							paddingLeft: '1.2rem'
						}}
					>
						<li>
							<strong>GCRA</strong> — exact, BigInt nanosecond TAT,
							one number of state per key, no boundary effects. The
							default.
						</li>
						<li>
							<strong>Token bucket</strong> — classic. Allows brief
							bursts at refill boundaries. Pick this when you want
							"fill the bucket, fire it all at once" semantics.
						</li>
						<li>
							<strong>Sliding window</strong> — counter
							approximation. Easy to explain on a status page ("you
							have N requests left in the last M seconds").
						</li>
						<li>
							<strong>Combined</strong> — composes any number of
							algorithms; passes only when every component passes.
							Stack a per-IP minute cap with a per-user-id daily
							cap in one plugin.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cost-keys-hooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cost, Keys & Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Heavy endpoints charge more than cheap ones with a{' '}
						<code>cost</code> function. The bucket goes into overdraft
						on a cost-N hit (you wait it off — same as Stripe's
						metered approach). Key derivation is a string preset (
						<code>'ip'</code> or <code>'authorization'</code>) or a
						function. <code>skip</code> bypasses the limit entirely;{' '}
						<code>onAllow</code> and <code>onLimit</code> are
						symmetric hooks for metrics + custom responses.
					</p>
					<PrismPlus
						codeString={rateLimitCost}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="headers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						IETF Headers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default header set is{' '}
						<a
							href="https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/"
							rel="noreferrer noopener"
							target="_blank"
						>
							IETF draft-09
						</a>{' '}
						— a combined <code>RateLimit</code> header carrying{' '}
						<code>limit</code>, <code>remaining</code>, and{' '}
						<code>reset</code> together, plus{' '}
						<code>RateLimit-Policy</code> describing the policy. Set{' '}
						<code>headers: 'legacy'</code> for the older{' '}
						<code>X-RateLimit-*</code> form (GitHub circa 2014),{' '}
						<code>'both'</code> for a transition period, or{' '}
						<code>false</code> to suppress everything except
						Retry-After.
					</p>
					<PrismPlus
						codeString={rateLimitHeaders}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ip-modes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						IP & Proxy Trust
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Most rate-limit libraries either trust{' '}
						<code>X-Forwarded-For</code> blindly (spoofable) or
						ignore it entirely (broken behind any CDN).{' '}
						<code>trustedProxies: N</code> honors only the last N
						hops — anything to the left is attacker-supplied and
						ignored. <code>0</code> disables XFF; <code>1</code> is
						the right default behind a single CDN/LB.
					</p>
					<p style={paragraphSpacedStyle}>
						IPv6 addresses are grouped by their <code>/64</code>{' '}
						prefix by default — one user's RIR allocation gets one
						quota, not one quota per device. Configurable via{' '}
						<code>ipv6Prefix</code>. CDN headers
						(<code>cf-connecting-ip</code>, <code>fly-client-ip</code>,
						<code> true-client-ip</code>, <code>x-real-ip</code>) are
						honored when XFF is missing and a proxy is trusted.
					</p>
					<PrismPlus
						codeString={rateLimitIpModes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="non-http"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Non-HTTP Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The algorithms + store are exported separately at{' '}
						<code>@absolutejs/rate-limit/core</code> with no Elysia
						dependency. Use them directly for WebSocket-message
						rate-limiting, queue-consumer throttling, AI-call
						quotas — anywhere you need exact rate enforcement
						without HTTP. Each algorithm exposes <code>peek()</code>{' '}
						for status-page read-only inspection and{' '}
						<code>reset()</code> for admin clears.
					</p>
					<PrismPlus
						codeString={rateLimitNonHttp}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
