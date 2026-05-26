import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	breachCheckOnLogin,
	compromisedCredential,
	emailValidation
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
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#email', label: 'Email validation' },
	{ href: '#compromised', label: 'Compromised credentials' }
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
						Block junk emails at sign-up, and catch passwords that show
						up in a breach after the account already exists.
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
						blocks disposable domains (a starter list ships built-in;
						extend it), and optionally confirms the domain has MX
						records. <code>isDisposableEmail</code> is exposed on its own
						too.
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
						Sign-up already blocks breached passwords (the credentials
						policy&apos;s <code>checkBreaches</code>). The login-time check
						is the half of Auth0 &quot;Credential Guard&quot; a self-hosted
						library can do: catch a password that was fine at sign-up but
						later leaked, and prompt a reset. Fails open on a HIBP outage.
					</p>
					<p style={paragraphSpacedStyle}>
						Turnkey: set <code>checkBreachesOnLogin: true</code> on the
						credentials config. A successful login then carries{' '}
						<code>passwordCompromised</code> in its response (it never
						blocks — the user is already authenticated).
					</p>
					<PrismPlus
						codeString={breachCheckOnLogin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Or call <code>isPasswordCompromised</code> yourself for full
						control over the response:
					</p>
					<PrismPlus
						codeString={compromisedCredential}
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
