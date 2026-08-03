import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	backgroundEmailScan,
	breachCheckOnLogin,
	compromisedCredential,
	emailValidation,
	enumerationResistance,
	originAllowlist,
	pruneInactiveUsersExample,
	requireAuthGuard,
	safeRedirectAndCookie,
	secureCookieDefaults
} from '../../../../data/documentation/authCredentialHardeningDocsCode';
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
import { Callout } from '../../../utils/Callout';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { StepFlow, StepFlowStep } from '../../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const breachScanSteps: StepFlowStep[] = [
	{
		description:
			'Walks your user population in cursor-paged batches — the email counterpart to the login-time password check.',
		title: 'Walk the user population'
	},
	{
		description: (
			<>
				Each batch is checked against HIBP&apos;s{' '}
				<code>breachedaccount</code> API.
			</>
		),
		title: 'Check against HIBP'
	},
	{
		description:
			'Wire it up as a cron and notify users whose addresses show up in new breaches.',
		title: 'Run on a schedule & notify'
	}
];

const pruneSteps: StepFlowStep[] = [
	{
		description: 'A pure orchestrator that walks a paged user population.',
		title: 'Walk the paged population'
	},
	{
		description: 'Identifies anyone past the inactivity threshold.',
		title: 'Identify inactive users'
	},
	{
		description: (
			<>
				You decide what &quot;prune&quot; means via the{' '}
				<code>onDelete</code> hook — soft-delete, hard-delete, or
				disable + notify.
			</>
		),
		title: 'Delegate the delete'
	}
];

const tocItems: TocItem[] = [
	{ href: '#email', label: 'Email validation' },
	{ href: '#compromised', label: 'Compromised credentials' },
	{ href: '#background-scan', label: 'Background breach re-scan' },
	{ href: '#prune-inactive', label: 'Prune inactive users' },
	{ href: '#secure-cookies', label: 'Secure-by-default cookies' },
	{ href: '#enumeration', label: 'Account-enumeration resistance' },
	{ href: '#origin-allowlist', label: 'Origin (CSRF) allowlist' },
	{ href: '#require-auth', label: 'Fail-closed route guard' },
	{ href: '#safe-redirects', label: 'Safe redirects & cookie parsing' }
];

export const AuthCredentialHardeningView = ({
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
					<h1
						id="auth-credential-hardening"
						style={h1Style(isMobileOrTablet)}
					>
						Credential Hardening
					</h1>
					<p style={paragraphLargeStyle}>
						Block junk emails at sign-up, and catch passwords that
						show up in a breach after the account already exists.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="email"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Email validation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>validateEmailDeliverability</code> checks format,
						blocks disposable domains (a starter list ships
						built-in; extend it), and optionally confirms the domain
						has MX records. <code>isDisposableEmail</code> is
						exposed on its own too.
					</p>
					<PrismPlus
						codeString={emailValidation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compromised"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Compromised credentials
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sign-up already blocks breached passwords (the
						credentials policy&apos;s <code>checkBreaches</code>).
						The login-time check is the half of Auth0
						&quot;Credential Guard&quot; a self-hosted library can
						do: catch a password that was fine at sign-up but later
						leaked, and prompt a reset.
					</p>
					<p style={paragraphSpacedStyle}>
						Turnkey: set <code>checkBreachesOnLogin: true</code> on
						the credentials config. A successful login then carries{' '}
						<code>passwordCompromised</code> in its response.
					</p>
					<Callout themeSprings={themeSprings} variant="note">
						The login-time check never blocks — the user is already
						authenticated — and it fails open on a HIBP outage.
					</Callout>
					<PrismPlus
						codeString={breachCheckOnLogin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Or call <code>isPasswordCompromised</code> yourself for
						full control over the response:
					</p>
					<PrismPlus
						codeString={compromisedCredential}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="background-scan"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Background breach re-scan
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>0.37.0</code> adds <code>runEmailBreachScan</code>
						:
					</p>
					<StepFlow
						steps={breachScanSteps}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={backgroundEmailScan}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prune-inactive"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prune inactive users
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The other half of <code>0.37.0</code>&apos;s background
						ops: <code>pruneInactiveUsers</code>.
					</p>
					<StepFlow steps={pruneSteps} themeSprings={themeSprings} />
					<Callout themeSprings={themeSprings} variant="note">
						<code>dryRun: true</code> reports candidates without
						touching anything.
					</Callout>
					<PrismPlus
						codeString={pruneInactiveUsersExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="secure-cookies"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Secure-by-default cookies
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Session cookies are <code>Secure</code> by default. Only the explicit <code>development</code>/<code>test</code> environments opt out (so <code>http://localhost</code> and test runners round-trip cookies) &mdash; every other case, including a production deploy that forgot <code>NODE_ENV</code>, gets Secure cookies. Override with <code>cookieSecure</code> when a proxy terminates TLS but reports the request as http.
					</p>
					<PrismPlus
						codeString={secureCookieDefaults}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enumeration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Account-enumeration resistance
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Registration is enumeration-safe by default: a duplicate email returns the same generic response a new pending registration does &mdash; it never says &ldquo;email already registered.&rdquo; <code>onExistingAccount</code> lets you nudge the real owner out of band; <code>revealRegistrationConflicts: true</code> opts back into the explicit 409. Login is timing-equalized too, so response time can&apos;t reveal which emails exist.
					</p>
					<PrismPlus
						codeString={enumerationResistance}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="origin-allowlist"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Origin (CSRF) allowlist
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>trustedOrigins</code> rejects login/register requests whose <code>Origin</code> header isn&apos;t one of yours. <code>enforceTrustedOrigins</code> defaults to <code>true</code> (block); set it <code>false</code> for a report-only rollout, and <code>onUntrustedOrigin</code> fires in both modes so you can observe the real Origin set before enforcing on a login path.
					</p>
					<Callout themeSprings={themeSprings} variant="note">
						Report-only first on a login path: log with <code>onUntrustedOrigin</code>, confirm the Origins are exactly yours, then flip <code>enforceTrustedOrigins</code> to <code>true</code>.
					</Callout>
					<PrismPlus
						codeString={originAllowlist}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="require-auth"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fail-closed route guard
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>requireAuthPlugin</code> is the fail-closed counterpart to <code>protectRoutePlugin</code>: mounting it guards every route in scope by default, rejecting an unauthenticated request with 401 before the handler runs. Forgetting a per-route check therefore can&apos;t silently leave a route public.
					</p>
					<PrismPlus
						codeString={requireAuthGuard}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="safe-redirects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Safe redirects & cookie parsing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>isSafeLocalPath</code>/<code>toSafeLocalPath</code> validate a post-login <code>returnUrl</code> as same-origin &mdash; rejecting the backslash open-redirect a naive check misses. <code>readSessionCookie</code> reads the session id from a request with an anchored parse, so a decoy <code>xuser_session_id=</code> cookie can&apos;t shadow the real one. Use these instead of hand-rolling either check.
					</p>
					<PrismPlus
						codeString={safeRedirectAndCookie}
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
