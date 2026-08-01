import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	mfaChallengeComponent,
	mfaChallengeReact,
	mfaEnrollReact,
	mfaServerSetup,
	mfaTwilioVerify
} from '../../../../data/documentation/authMfaDocsCode';
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
import { DocsTable, DocsTableCell } from '../../../utils/DocsTable';
import { Endpoint, EndpointTable } from '../../../utils/EndpointTable';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const mfaEndpoints: Endpoint[] = [
	{
		description: 'Begin TOTP enrollment (caller must be authenticated).',
		method: 'POST',
		note: 'Body: {} — returns { secret, uri }; uri is the otpauth:// value for the QR',
		path: '/auth/mfa/totp/setup'
	},
	{
		description: 'Activate TOTP — returns the backup codes ONCE.',
		method: 'POST',
		note: 'Body: { code } — returns { backupCodes }',
		path: '/auth/mfa/totp/verify'
	},
	{
		description: 'Text a verification code to the phone.',
		method: 'POST',
		note: "Body: { phone } — returns { status: 'sent' }; mounted when a verificationProvider is configured",
		path: '/auth/mfa/sms/setup'
	},
	{
		description: 'Activate the SMS factor.',
		method: 'POST',
		note: "Body: { code } — returns { status: 'verified' }",
		path: '/auth/mfa/sms/verify'
	},
	{
		description:
			"Complete a login that returned { status: 'mfa_required' }.",
		method: 'POST',
		note: 'Accepts three request shapes — see the table below',
		path: '/auth/mfa/challenge'
	}
];

const challengeShapeRows: DocsTableCell[][] = [
	[
		{ code: '{ code }' },
		{ code: "{ status: 'authenticated' }" },
		'TOTP or backup code'
	],
	[
		{ code: "{ factor: 'sms', action: 'send' }" },
		{ code: "{ status: 'sent' }" },
		'SMS — sends the code'
	],
	[
		{ code: "{ factor: 'sms', code }" },
		{ code: "{ status: 'authenticated' }" },
		'SMS'
	]
];

const tocItems: TocItem[] = [
	{ href: '#server-setup', label: 'Server Setup' },
	{ href: '#twilio-verify', label: 'Twilio Verify' },
	{ href: '#routes', label: 'Routes' },
	{ href: '#enroll', label: 'Enrolling TOTP (React)' },
	{ href: '#challenge', label: 'Login Challenge (React)' },
	{ href: '#component', label: 'Challenge Component' }
];

export const AuthMfaView = ({
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
					<h1 id="auth-mfa" style={h1Style(isMobileOrTablet)}>
						Multi-Factor Auth
					</h1>
					<p style={paragraphLargeStyle}>
						Native second-factor authentication for credential
						accounts: TOTP via any authenticator app (Google
						Authenticator, Authy, 1Password), single-use backup
						codes, provider-managed phone verification, and
						per-factor lockout — no second auth library required.
						Twilio Verify can own OTP generation, delivery, fraud
						evaluation, and code checking while Absolute Auth
						retains enrollment and session policy.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add an mfa block alongside credentials. auth()
						auto-wires the gate: once a user has a verified factor,
						login parks the session and returns mfa_required instead
						of authenticating, and only the challenge route
						completes it. The TOTP secret is AES-GCM encrypted at
						rest when you set encryptionKey. Failed second-factor
						attempts are tracked independently of the password
						lockout and lock out after totpMaxAttempts.
					</p>
					<PrismPlus
						codeString={mfaServerSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="twilio-verify"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Twilio Verify provider
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/auth-twilio</code> implements Auth's{' '}
						<code>verificationProvider</code> contract. The adapter
						surface supports SMS, WhatsApp, and voice-call Verify
						channels, purpose-specific templates, locale/rate-limit
						inputs, and tenant-isolated account routing. The
						built-in MFA routes shown here invoke its SMS channel;
						custom Auth verification flows can use the other
						channels and routing inputs. Unknown provider statuses
						fail closed.
					</p>
					<PrismPlus
						codeString={mfaTwilioVerify}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Keep Auth Verify separate from Dispatch"
						variant="info"
					>
						Twilio Verify creates and checks secrets. Use{' '}
						<code>@absolutejs/dispatch-twilio</code> only for
						application-authored alerts, transactional messages, and
						carrier/rich messaging workflows. The configured{' '}
						<code>serviceTokenTtlMs</code> must match the Verify
						Service because Twilio's start response does not expose
						that lifetime.
					</Callout>
					<p style={paragraphSpacedStyle}>
						Auth still enforces enrollment state, resend cooldown,
						failed-attempt lockout, audit events, and session
						promotion. Prefer Twilio API keys when constructing the
						production SDK client, and never place direct personal
						data in provider tags.
					</p>
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
						Enrollment routes require an authenticated caller; the
						challenge route runs against the parked login.
					</p>
					<EndpointTable
						endpoints={mfaEndpoints}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The challenge route accepts three request shapes:
					</p>
					<DocsTable
						columns={['Request body', 'Response', 'Factor']}
						rows={challengeShapeRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Returned exactly once"
						variant="warning"
					>
						The secret and backup codes are never re-fetchable.
						Store the QR at enrollment and the backup codes
						somewhere the user can save them.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enroll"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enrolling TOTP (React)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call setup from an authenticated page, render the
						otpauth:// URI as a QR code, then confirm the first code
						before the factor activates — enrollment stays inactive
						until a code is verified, so there is never a
						silently-active unconfirmed secret. verify returns the
						single-use backup codes exactly once.
					</p>
					<PrismPlus
						codeString={mfaEnrollReact}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="challenge"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Login Challenge (React)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For an enrolled user, a normal login returns
						mfa_required. The pending login is held in an httpOnly
						cookie — send the 6-digit code (or a backup code) to the
						challenge route with credentials: 'include' to complete
						it. A 401 with &quot;Too many attempts&quot; means the
						lockout tripped.
					</p>
					<PrismPlus
						codeString={mfaChallengeReact}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="component"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Challenge Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A drop-in challenge screen.
						autoComplete=&quot;one-time-code&quot; lets mobile
						keyboards surface the code, and a backup code is
						accepted in the same field.
					</p>
					<PrismPlus
						codeString={mfaChallengeComponent}
						language="tsx"
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
