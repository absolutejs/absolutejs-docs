import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	pluginsAlertSinks,
	pluginsGeoDeny,
	pluginsPhilosophy,
	pluginsPosthog
} from '../../../../data/documentation/authPluginsDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#philosophy', label: 'Philosophy' },
	{ href: '#alert-sinks', label: 'Alert sinks (Slack/Discord/PagerDuty)' },
	{ href: '#geo-deny', label: 'Geo block & disposable email' },
	{ href: '#posthog', label: 'PostHog identify' }
];

export const AuthPluginsView = ({
	currentPageId,
	onNavigate,
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
					<h1 id="auth-plugins" style={h1Style(isMobileOrTablet)}>
						First-party Plugins
					</h1>
					<p style={paragraphLargeStyle}>
						A small bundle of opinionated, ~20-LOC helpers for the things
						you&apos;d otherwise write twice — Slack / Discord / PagerDuty
						audit sinks, disposable-email and geo deny lists, PostHog
						identify. Each is a plain function returning a shape the
						package already accepts; no plugin registry, no lifecycle.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="philosophy"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Philosophy
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The benefit of this package is that the hooks already let you
						do anything. A &quot;plugin&quot; is just a function you pass
						to one of those hooks. So <code>/plugins</code> is exactly
						that — small named functions that return the same primitives
						(<code>AuditSink</code>, <code>(headers) =&gt; boolean</code>,{' '}
						<code>(email) =&gt; verdict</code>) your config already
						consumes. If you want one we don&apos;t ship, write the same
						shape and pass it to the same hook.
					</p>
					<PrismPlus
						codeString={pluginsPhilosophy}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="alert-sinks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Alert sinks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>slackAlertPlugin</code>, <code>discordAlertPlugin</code>,
						and <code>pagerdutyAlertPlugin</code> each return an{' '}
						<code>AuditSink</code> tuned for that destination&apos;s
						payload format. Filter to the events you actually want to wake
						up for — impersonation, MFA-disabled, abuse blocks,
						lockouts — and forward everything else only to your audit
						table.
					</p>
					<PrismPlus
						codeString={pluginsAlertSinks}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="geo-deny"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Geo block &amp; disposable email
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>denyDisposableEmailPlugin</code> blocks signups from
						throwaway mail providers; <code>geoBlockPlugin</code> takes an
						allow- or deny-list of ISO-3166 country codes and reads
						whichever header your CDN already populates. Both compose
						with the existing credentials and abuse hooks — no separate
						middleware pipeline.
					</p>
					<PrismPlus
						codeString={pluginsGeoDeny}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="posthog"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						PostHog identify
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>posthogIdentifyPlugin</code> streams every audit event
						as <code>$identify</code>, keyed by the audit event&apos;s{' '}
						<code>userId</code>. Same sink interface as the alert
						plugins, so you can chain it alongside Slack/PagerDuty.
					</p>
					<PrismPlus
						codeString={pluginsPosthog}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
