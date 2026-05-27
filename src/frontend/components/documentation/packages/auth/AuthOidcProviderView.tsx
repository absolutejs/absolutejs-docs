import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	oidcClaims,
	oidcDcr,
	oidcDeviceFlow,
	oidcDpop,
	oidcIntrospect,
	oidcJar,
	oidcLogout,
	oidcPar,
	oidcPrivateKeyJwt,
	oidcProvider,
	oidcReauth,
	oidcRevoke,
	oidcTokenExchange,
	oidcUserInfo
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
	{ href: '#claims', label: 'Custom access-token claims' },
	{ href: '#userinfo', label: 'UserInfo' },
	{ href: '#reauth', label: 'Re-authentication signals' },
	{ href: '#introspect', label: 'Introspection (RFC 7662)' },
	{ href: '#revoke', label: 'Revocation (RFC 7009)' },
	{ href: '#device-flow', label: 'Device flow (RFC 8628)' },
	{ href: '#private-key-jwt', label: 'private_key_jwt client auth' },
	{ href: '#dcr', label: 'Dynamic Client Registration' },
	{ href: '#par', label: 'Pushed Authorization (PAR)' },
	{ href: '#jar', label: 'Signed requests (JAR)' },
	{ href: '#logout', label: 'Logout (RP-init + back-channel)' },
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
						refresh-token rotation, DPoP sender-constrained tokens, and a
						complete OAuth2/OIDC surface (introspect, revoke, device
						flow, PAR, JAR, DCR, private_key_jwt, RP-initiated +
						back-channel logout, userinfo).
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
						rotation), <code>GET {'{oidcRoute}'}/jwks</code>,{' '}
						<code>GET/POST {'{oidcRoute}'}/userinfo</code>,{' '}
						<code>POST {'{oidcRoute}'}/introspect</code>,{' '}
						<code>POST {'{oidcRoute}'}/revoke</code>,{' '}
						<code>GET {'{oidcRoute}'}/end_session</code>, and{' '}
						<code>GET /.well-known/openid-configuration</code>. Optional
						endpoints opt in by configuring their store:{' '}
						<code>POST {'{oidcRoute}'}/device_authorization</code>,{' '}
						<code>POST {'{oidcRoute}'}/par</code>,{' '}
						<code>POST {'{oidcRoute}'}/register</code> (+{' '}
						<code>GET/PUT/DELETE {'{oidcRoute}'}/register/:id</code>).
						Everything is self-hosted — you own the keys, with no
						dependency on api.workos.com. Consent is yours via the{' '}
						<code>getGrantedScopes</code> hook (auto-granted for
						first-party clients).
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="claims"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Custom access-token claims
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>getAccessTokenClaims</code> lets you add per-token claims
						(email, name, org_id, tenant tier, …) to every issued access
						token. Reserved keys (<code>iss</code>, <code>sub</code>,{' '}
						<code>aud</code>, <code>exp</code>, <code>iat</code>,{' '}
						<code>jti</code>, <code>client_id</code>, <code>scope</code>,{' '}
						<code>token_use</code>, <code>act</code>, <code>cnf</code>) are
						stripped before merge, so the hook can&apos;t rewrite the
						token&apos;s identity, lifetime, or DPoP binding.
					</p>
					<PrismPlus
						codeString={oidcClaims}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="userinfo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						UserInfo
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The OIDC <code>/userinfo</code> endpoint lets RPs swap a valid
						access token for the user&apos;s profile claims — the missing
						piece that lets <em>any</em> generic OIDC client (Grafana,
						Tailscale, ArgoCD, etc.) onboard. Configure{' '}
						<code>getUserInfo(sub)</code> and the package mounts both GET
						and POST, with proper{' '}
						<code>WWW-Authenticate: Bearer</code> challenges on invalid
						tokens.
					</p>
					<PrismPlus
						codeString={oidcUserInfo}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reauth"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Re-authentication signals
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						OIDC defines four standard ways for an RP to ask for a fresher
						or different login — <code>prompt</code>,{' '}
						<code>max_age</code>, <code>id_token_hint</code>, and
						(combined with the bot/abuse abuse and adaptive blocks){' '}
						<code>acr_values</code>. The authorize endpoint honors them
						against the session&apos;s <code>auth_time</code> and bounces
						to <code>loginUrl</code> when needed, preserving the original{' '}
						<code>return_to</code>.
					</p>
					<PrismPlus
						codeString={oidcReauth}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="introspect"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Introspection (RFC 7662)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Resource servers ask the AS whether a token is still live and
						who it belongs to. Active responses mirror the JWT claims
						(including <code>cnf</code> for DPoP binding); revoked tokens
						flip to <code>{'{ active: false }'}</code>. Required by most
						enterprise procurement reviews.
					</p>
					<PrismPlus
						codeString={oidcIntrospect}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="revoke"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Revocation (RFC 7009)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Clients voluntarily kill a refresh token — &quot;Sign out of
						this device&quot;. The spec mandates a 200 whether the token
						existed or not (no enumeration leak); revoking a refresh
						token cascades to its derived access tokens at the introspect
						endpoint.
					</p>
					<PrismPlus
						codeString={oidcRevoke}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="device-flow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Device Authorization Grant (RFC 8628)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sign-in for TVs, CLIs, and IoT — the device prints a short
						<code>user_code</code> and the user authorizes on a phone. The
						package handles <code>slow_down</code>,{' '}
						<code>authorization_pending</code>, and{' '}
						<code>access_denied</code> at the polling endpoint; your
						<code>/device</code> page calls{' '}
						<code>approveDeviceCode</code> after the user signs in.
					</p>
					<PrismPlus
						codeString={oidcDeviceFlow}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="private-key-jwt"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						private_key_jwt client auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The strongest client authentication (RFC 7521/7523). The client
						signs a JWT assertion with its private key; the AS holds only
						the public JWK. No shared secret means stolen logs can&apos;t
						leak credentials. The same wiring also accepts{' '}
						<code>client_secret_jwt</code> (HS256). A{' '}
						<code>jti</code> replay store enforces RFC 7523 §3 one-time
						use.
					</p>
					<PrismPlus
						codeString={oidcPrivateKeyJwt}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dcr"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dynamic Client Registration (RFC 7591 + 7592)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Partners self-register at runtime without you minting clients
						by hand. Gate registration with an initial access token; the
						registered client receives a{' '}
						<code>registration_access_token</code> that lets it
						read/update/delete its own record. Match WorkOS&apos;{' '}
						&quot;Connect&quot; flow without the SaaS.
					</p>
					<PrismPlus
						codeString={oidcDcr}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="par"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pushed Authorization Requests (RFC 9126)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The client posts its parameters to the AS over the
						authenticated back-channel and gets back a short-lived{' '}
						<code>request_uri</code> to hand to <code>/authorize</code>.
						Defeats browser-leak attacks on long query strings; required
						by FAPI profiles. Per-client opt-in via{' '}
						<code>requirePushedAuthorizationRequests</code>.
					</p>
					<PrismPlus
						codeString={oidcPar}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="jar"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Signed Authorize Requests (RFC 9101 JAR)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass the entire <code>/authorize</code> request as a signed
						JWT (<code>?request=&lt;jwt&gt;</code>), proving the
						parameters originated from the registered client. Required by
						FAPI / Open Banking / FHIR; per-client opt-in via{' '}
						<code>requireSignedRequestObject</code>. Shares the same JWKS
						infrastructure as <code>private_key_jwt</code>.
					</p>
					<PrismPlus
						codeString={oidcJar}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="logout"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Logout (RP-Initiated + Back-Channel)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<strong>OIDC RP-Initiated Logout 1.0</strong> lets RPs sign
						users out and bounce them to a registered{' '}
						<code>post_logout_redirect_uri</code>.{' '}
						<strong>OIDC Back-Channel Logout 1.0</strong> pushes a signed
						<code>logout_token</code> to every other RP that holds a
						session for the same <code>sid</code>, so one click logs the
						user out of every connected app. Delivery uses Standard
						Webhooks signing + automatic retries; failures persist for
						manual replay.
					</p>
					<PrismPlus
						codeString={oidcLogout}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						<code>verifyDpopProof</code>. §8 nonces opt in via a{' '}
						<code>dpopNonceStore</code> to defeat pre-computed-proof
						replays. RFC 9470 <code>acr_values</code> pair with the
						adaptive + MFA gates to force step-up before issuing a code.
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
