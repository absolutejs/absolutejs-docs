import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	passwordlessRoutes,
	passwordlessSetup,
	webauthnFlow,
	webauthnSetup
} from '../../../../data/documentation/authPasswordlessDocsCode';
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
	{ href: '#magic-links-otp', label: 'Magic Links & OTP' },
	{ href: '#passwordless-routes', label: 'Routes' },
	{ href: '#passkeys', label: 'WebAuthn Passkeys' },
	{ href: '#passkey-flow', label: 'Passkey Flow' }
];

export const AuthPasswordlessView = ({
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
					<h1 id="auth-passwordless" style={h1Style(isMobileOrTablet)}>
						Passwordless &amp; Passkeys
					</h1>
					<p style={paragraphLargeStyle}>
						Sign in with magic links, email/SMS one-time codes, or
						WebAuthn passkeys. Every method mints the same session as
						password and OAuth login.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="magic-links-otp"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Magic Links &amp; OTP
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The passwordless block delivers a one-time link or code
						over your existing email/SMS hooks and exchanges it for a
						session. Pair it with onCreateUser for signup on first
						login.
					</p>
					<PrismPlus
						codeString={passwordlessSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="passwordless-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Routes
					</AnchorHeading>
					<PrismPlus
						codeString={passwordlessRoutes}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="passkeys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						WebAuthn Passkeys
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Biometric / passkey login behind a dependency-light
						WebAuthnAdapter you supply (wrapping @simplewebauthn/server).
						The package never bundles the WebAuthn crypto, so you pin
						your own version; option and response payloads stay opaque
						and credentials are base64url strings.
					</p>
					<PrismPlus
						codeString={webauthnSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="passkey-flow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Passkey Flow
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Registration adds a passkey to the authenticated caller;
						authentication is passwordless discoverable-credential
						sign-in. The signature counter is persisted to detect
						cloned authenticators.
					</p>
					<PrismPlus
						codeString={webauthnFlow}
						language="text"
						showLineNumbers={false}
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
