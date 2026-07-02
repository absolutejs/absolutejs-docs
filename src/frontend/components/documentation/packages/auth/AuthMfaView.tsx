import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	mfaChallengeComponent,
	mfaChallengeReact,
	mfaEnrollReact,
	mfaRoutes,
	mfaServerSetup
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
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#server-setup', label: 'Server Setup' },
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
						Multi-Factor Auth (TOTP)
					</h1>
					<p style={paragraphLargeStyle}>
						Native second-factor authentication for credential
						accounts: TOTP via any authenticator app (Google
						Authenticator, Authy, 1Password), single-use backup codes,
						an optional SMS factor, and per-factor lockout — no second
						auth library required.
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
						Add an mfa block alongside credentials. auth() auto-wires
						the gate: once a user has a verified factor, login parks the
						session and returns mfa_required instead of authenticating,
						and only the challenge route completes it. The TOTP secret
						is AES-GCM encrypted at rest when you set encryptionKey.
						Failed second-factor attempts are tracked independently of
						the password lockout and lock out after totpMaxAttempts.
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
						id="routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Enrollment routes require an authenticated caller; the
						challenge route runs against the parked login. The secret
						and backup codes are returned exactly once and are never
						re-fetchable.
					</p>
					<PrismPlus
						codeString={mfaRoutes}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
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
						Call setup from an authenticated page, render the otpauth://
						URI as a QR code, then confirm the first code before the
						factor activates — enrollment stays inactive until a code is
						verified, so there is never a silently-active unconfirmed
						secret. verify returns the single-use backup codes exactly
						once.
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
						For an enrolled user, a normal login returns mfa_required.
						The pending login is held in an httpOnly cookie — send the
						6-digit code (or a backup code) to the challenge route with
						credentials: 'include' to complete it. A 401 with &quot;Too
						many attempts&quot; means the lockout tripped.
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
						A drop-in challenge screen. autoComplete=&quot;one-time-code&quot;
						lets mobile keyboards surface the code, and a backup code is
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
