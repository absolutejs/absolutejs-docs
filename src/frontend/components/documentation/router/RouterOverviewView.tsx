import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	routerDrain,
	routerLimits,
	routerMeterAllow,
	routerQuickStart,
	routerSnapshot,
	routerStrategies
} from '../../../data/documentation/routerDocsCode';
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
	{ href: '#router-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#strategies', label: 'Hash Strategies + Load' },
	{ href: '#drain', label: 'Drain Mode' },
	{ href: '#limits', label: 'Connection Cap + Rate Limits' },
	{ href: '#meter-allow', label: 'Meter Integration' },
	{ href: '#snapshot', label: 'Snapshot & Restore' }
];

export const RouterOverviewView = ({
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
					<h1 id="router-overview" style={h1Style(isMobileOrTablet)}>
						Router
					</h1>
					<p style={paragraphLargeStyle}>
						Multi-tenant connection routing primitive. Sits between
						an incoming request / WS upgrade and N backend
						processes; decides which shard owns the tenant, whether
						the tenant is over its rate limit, whether the tenant is
						over its connection cap, and whether the chosen shard is
						healthy and not draining. Pure logic — wire it into
						whatever HTTP/WS layer you have.
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
						<code>route()</code> returns{' '}
						<code>{`{ decision, shard, emptiedBucket? }`}</code>{' '}
						where decision is one of{' '}
						<code>allow</code> / <code>rate-limited</code> /{' '}
						<code>capped</code> / <code>no-shards</code> /{' '}
						<code>denied</code>. The gateway forwards bytes to{' '}
						<code>shard.url</code> on allow; everything else is a 4xx.
					</p>
					<PrismPlus
						codeString={routerQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="strategies"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hash Strategies + Load Bias
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Default is <strong>jump-consistent-hash</strong>{' '}
						(Lamping &amp; Veach 2014) — O(log n), no memory, exactly
						1/N keys move on a shard-add at the tail.{' '}
						<strong>Rendezvous</strong> (HRW) supports per-shard
						weights for heterogeneous engine sizes AND a per-call{' '}
						<code>load(shardId)</code> hook to bias AWAY from hot
						shards. Both strategies are sticky — the same tenant
						always lands on the same shard until membership
						changes.
					</p>
					<PrismPlus
						codeString={routerStrategies}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="drain"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Drain Mode
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>drainShard(id)</code> is the operator-intentional
						"finishing up" state — distinct from{' '}
						<code>markUnhealthy(id)</code> which means "broken,
						route around now." Both exclude the shard from new
						routing; drain leaves existing acquires alone. Use drain
						before a planned shard reboot; tenants rehash to healthy
						non-draining shards on their next route, but in-flight
						requests aren't torn down.
					</p>
					<PrismPlus
						codeString={routerDrain}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="limits"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Connection Cap + Rate Limits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>perTenantConnectionCap</code> counts active
						connections via <code>acquire()</code> /{' '}
						<code>release()</code>; over the cap, <code>route()</code>{' '}
						returns <code>capped</code>. The token-bucket{' '}
						<code>perTenantRateLimit</code> gates per-call;{' '}
						<code>perRouteRateLimits</code> layers a SECOND bucket
						per named route with atomic two-bucket commit (a failed
						route bucket does NOT consume the tenant bucket).
					</p>
					<PrismPlus
						codeString={routerLimits}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="meter-allow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Meter Integration via <code>allow()</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>allow: (tenantId) =&gt; boolean</code> hook is
						the meter+router wire-up in one line:{' '}
						<code>allow: meter.allow</code>. When the meter has
						tripped a tenant, the router returns{' '}
						<code>denied</code> at the edge — the gateway can
						surface "quota exceeded" without paying for the upstream
						hop.
					</p>
					<PrismPlus
						codeString={routerMeterAllow}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="snapshot"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Snapshot & Restore
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Preserve rate-limit tokens across edge restarts.
						Without this, a deploy hands every tenant a fresh full
						bucket — instant rate-limit bypass for anyone watching
						the deploy times.
					</p>
					<PrismPlus
						codeString={routerSnapshot}
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
