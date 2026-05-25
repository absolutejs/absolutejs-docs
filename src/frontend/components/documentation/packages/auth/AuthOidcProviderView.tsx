import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	oidcDpop,
	oidcProvider,
	oidcTokenExchange
} from '../../../../data/documentation/authOidcProviderDocsCode';
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
	{ href: '#provider', label: 'Become an IdP' },
	{ href: '#endpoints', label: 'Endpoints' },
	{ href: '#dpop', label: 'DPoP (sender-constrained)' },
	{ href: '#token-exchange', label: 'AI-agent / MCP token exchange' }
];

export const AuthOidcProviderView = ({
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
						id="auth-oidc-provider"
						style={h1Style(isMobileOrTablet)}
					>
						OAuth2 / OIDC Provider
					</h1>
					<p style={paragraphLargeStyle}>
						Make your app an identity provider — &quot;Sign in with
						&lt;yourapp&gt;&quot;. authorization_code + mandatory PKCE,
						ES256 JWTs signed by a key you own (self-hosted JWKS),
						refresh-token rotation, and DPoP sender-constrained tokens.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="provider"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Become an IdP
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Configure the <code>oidc</code> block with a signing key, a
						relying-party client registry, and the code / refresh stores.
						The authorize endpoint reuses the package session, so the IdP
						login gets passkeys / MFA / SSO for free.
					</p>
					<PrismPlus
						codeString={oidcProvider}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="endpoints"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Endpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mounted automatically:{' '}
						<code>GET {'{oidcRoute}'}/authorize</code> (code + PKCE),{' '}
						<code>POST {'{oidcRoute}'}/token</code> (with refresh
						rotation), <code>GET {'{oidcRoute}'}/jwks</code>, and{' '}
						<code>GET /.well-known/openid-configuration</code>. Everything
						is self-hosted — you own the keys, with no dependency on
						api.workos.com. Consent is yours via the{' '}
						<code>getGrantedScopes</code> hook (auto-granted for
						first-party clients).
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dpop"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						DPoP (sender-constrained)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						DPoP (RFC 9449) binds the access token to the client&apos;s
						proof key (<code>cnf.jkt</code>), so a stolen bearer token is
						useless without the private key — WorkOS doesn&apos;t offer
						this. It&apos;s automatic at the token endpoint; verify the
						proof on your resource server with{' '}
						<code>verifyDpopProof</code>.
					</p>
					<PrismPlus
						codeString={oidcDpop}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="token-exchange"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AI-agent / MCP token exchange
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The 2026 frontier. An agent trades a user&apos;s token for a
						narrower, short-lived, audience-bound{' '}
						<strong>on-behalf-of</strong> token via{' '}
						<strong>RFC 8693 token exchange</strong> — the issued token
						keeps the user&apos;s <code>sub</code>, binds <code>aud</code>{' '}
						to the resource (<strong>RFC 8707</strong>), and records the
						delegation in an <code>act</code> claim (DPoP-bindable).{' '}
						<code>mcpProtectedResourceMetadata</code> emits the MCP /
						RFC 9728 discovery doc. Matches Auth0&apos;s &quot;Auth for
						MCP&quot;.
					</p>
					<PrismPlus
						codeString={oidcTokenExchange}
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
