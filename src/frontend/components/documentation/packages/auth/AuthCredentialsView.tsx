import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	bulkImport,
	credentialsSetup,
	lockoutSetup,
	mfaSetup,
	stepUpUsage
} from '../../../../data/documentation/authCredentialsDocsCode';
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
import { Endpoint, EndpointTable } from '../../../utils/EndpointTable';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const credentialEndpoints: Endpoint[] = [
	{
		description: 'Create a local account.',
		method: 'POST',
		note: 'Body: { email, password, ...extraFields }',
		path: '/auth/register'
	},
	{
		description: 'Sign in with email and password.',
		method: 'POST',
		note: 'Body: { email, password } — returns { status }',
		path: '/auth/login'
	},
	{
		description: 'Confirm an email with its verification token.',
		method: 'POST',
		note: 'Body: { token }',
		path: '/auth/verify-email'
	},
	{
		description: 'Request a new verification email.',
		method: 'POST',
		note: 'Body: { email }',
		path: '/auth/verify-email/request'
	},
	{
		description: 'Set a new password with a reset token.',
		method: 'POST',
		note: 'Body: { token, password }',
		path: '/auth/reset-password'
	},
	{
		description: 'Request a password-reset email.',
		method: 'POST',
		note: 'Body: { email }',
		path: '/auth/reset-password/request'
	}
];

const tocItems: TocItem[] = [
	{ href: '#email-password', label: 'Email & Password' },
	{ href: '#routes', label: 'Routes' },
	{ href: '#mfa', label: 'Multi-Factor Auth' },
	{ href: '#step-up', label: 'Step-Up Auth' },
	{ href: '#lockout', label: 'Account Lockout' },
	{ href: '#bulk-import', label: 'Bulk import & legacy hashes' }
];

export const AuthCredentialsView = ({
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
					<h1 id="auth-credentials" style={h1Style(isMobileOrTablet)}>
						Credentials &amp; MFA
					</h1>
					<p style={paragraphLargeStyle}>
						Add local email/password sign-in, multi-factor auth, and
						account lockout. Every block is additive and optional —
						each produces the same session as OAuth, transparent to
						protectRoute.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="email-password"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Email &amp; Password
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The credentials block owns password hashing and
						single-use, hashed-at-rest verification / reset tokens.
						You own the user table through the hooks; the store
						ships in-memory, Postgres, and Neon flavors.
					</p>
					<PrismPlus
						codeString={credentialsSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The credentials block mounts these routes, transparent
						to <code>protectRoute</code>:
					</p>
					<EndpointTable
						endpoints={credentialEndpoints}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} variant="info">
						Passwords are hashed with <code>Bun.password</code>{' '}
						(argon2id). Existing argon2id/bcrypt hashes verify
						as-is, so you can migrate a legacy user table with no
						rehash.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="mfa"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Factor Auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						TOTP (authenticator apps) plus single-use backup codes.
						The TOTP secret is AES-GCM encrypted at rest. When MFA
						is enrolled, login parks the session and only promotes
						it once a factor is verified.
					</p>
					<PrismPlus
						codeString={mfaSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="step-up"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Step-Up Auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Gate sensitive actions behind a fresh authentication. A
						token refresh does not count as recent auth, so
						destructive operations can demand a real login or MFA.
					</p>
					<PrismPlus
						codeString={stepUpUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="lockout"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Account Lockout
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Per-identity attempt throttling on the login route. The
						store is in-memory, Postgres, or Redis — Redis gives
						atomic counters with native per-key TTL, shared across
						instances and self-expiring.
					</p>
					<PrismPlus
						codeString={lockoutSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="bulk-import"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Bulk import &amp; legacy hashes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>importUser</code> / <code>importUsers</code>{' '}
						migrate an Auth0, Cognito, or Firebase export in one
						pass — argon2id and bcrypt hashes verify natively via{' '}
						<code>Bun.password</code>. Legacy formats (Auth0 PBKDF2,
						Cognito SHA-256) are recognized by{' '}
						<code>isLegacyHash</code> and verified by the matching{' '}
						<code>verifyAuth0Pbkdf2</code> /{' '}
						<code>verifyCognitoSha256</code>; opt in to{' '}
						<code>rehashOnLogin</code> and the first successful
						sign-in silently upgrades the stored hash to argon2id.
						No forced password reset, no public breach.
					</p>
					<PrismPlus
						codeString={bulkImport}
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
