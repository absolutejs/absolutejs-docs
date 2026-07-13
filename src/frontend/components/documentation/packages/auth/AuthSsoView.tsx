import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	portalSetup,
	scimAttributeMapping,
	scimGroupDelta,
	scimSetup,
	ssoConnections,
	ssoDiscovery,
	ssoOidc,
	ssoSaml,
	ssoSamlIdp
} from '../../../../data/documentation/authSsoDocsCode';
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
	{ href: '#connections', label: 'Connections' },
	{ href: '#oidc', label: 'OIDC' },
	{ href: '#saml', label: 'SAML' },
	{ href: '#saml-idp', label: 'SAML IdP role' },
	{ href: '#discovery', label: 'Discovery & SLO' },
	{ href: '#scim', label: 'SCIM Provisioning' },
	{ href: '#scim-attributes', label: 'SCIM Attribute Mapping' },
	{ href: '#scim-groups', label: 'SCIM Group Diff' },
	{ href: '#portal', label: 'Admin Portal' }
];

export const AuthSsoView = ({
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
					<h1 id="auth-sso" style={h1Style(isMobileOrTablet)}>
						Enterprise SSO &amp; SCIM
					</h1>
					<p style={paragraphLargeStyle}>
						Per-organization SAML &amp; OIDC single sign-on, SCIM
						directory sync, and a headless admin portal so a
						customer&apos;s IT can self-configure — the WorkOS
						model, in-house and dependency-light.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="connections"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Connections
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each organization connects its IdP once via an
						SSOConnectionStore (in-memory, Postgres, or Neon). The
						verified identity is handed to your getSsoUser hook,
						which maps it to your user — minting the same session as
						every other flow.
					</p>
					<PrismPlus
						codeString={ssoConnections}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="oidc"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OIDC
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Discovery-driven: store only the issuer and client
						credentials. The id_token is verified in-house against
						the issuer&apos;s JWKS (RS256/ES256), with no extra
						crypto dependency.
					</p>
					<PrismPlus
						codeString={ssoOidc}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="saml"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SAML
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						SAML support sits behind a dependency-light SamlAdapter
						you supply (wrapping a vetted XML-DSig library). The
						package owns route wiring, cookies, and session minting;
						your adapter owns the XML and signature validation.
					</p>
					<PrismPlus
						codeString={ssoSaml}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="saml-idp"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SAML IdP role
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The inverse of the SP role: your app issues SAML
						assertions to legacy SaaS RPs (Salesforce, Workday,
						Concur — anything older than OIDC). Register each
						relying party in the{' '}
						<code>samlServiceProviderStore</code>; mount{' '}
						<code>samlIdpRoutes</code> with a{' '}
						<code>SamlIdpAdapter</code> that wraps the same vetted
						XML-DSig library the SP role uses. Both SP-initiated
						(via AuthnRequest) and IdP-initiated SSO are supported.
					</p>
					<PrismPlus
						codeString={ssoSamlIdp}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="discovery"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Discovery &amp; SLO
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Home-realm discovery routes a user to their org&apos;s
						connection by email domain. SAML Single Logout is fully
						signed on both sides — SP-initiated logout sends a
						signed LogoutRequest, and the /slo endpoint completes or
						replies to IdP-initiated logout.
					</p>
					<PrismPlus
						codeString={ssoDiscovery}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scim"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SCIM Provisioning
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Auto-provision users (and optionally groups) from Okta /
						Azure AD. The package owns the SCIM 2.0 protocol and
						per-org bearer-token auth; you map resources to your
						user store through hooks.
					</p>
					<PrismPlus
						codeString={scimSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>0.38.0</code> added the required SCIM 2.0
						discovery endpoints (<code>/Schemas</code>,{' '}
						<code>/Schemas/:id</code>, <code>/ResourceTypes</code>,{' '}
						<code>/ResourceTypes/:id</code>) that Okta and Azure AD
						probe during connection setup — they work automatically
						with the core User + Group schemas, and extend through{' '}
						<code>customAttributes.schemas</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scim-attributes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SCIM Attribute Mapping
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>defineScimAttributeMap</code> handles the Okta
						admin&apos;s eternal pain: declarative bidirectional
						mapping between an enterprise extension URI&apos;s
						claims (e.g.
						<code> manager</code>, <code>department</code>) and your
						custom fields (<code>reporting_to</code>, etc.). The
						package threads inbound JSON through{' '}
						<code>fromScim</code> and surfaces it on{' '}
						<code>input.custom</code>; <code>toScim</code> flows the
						other way. The declared schemas show up automatically in{' '}
						<code>/Schemas</code> + <code>/ResourceTypes</code>.
					</p>
					<PrismPlus
						codeString={scimAttributeMapping}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scim-groups"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SCIM Group Diff
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>diffScimGroupMembers</code> is a small set-diff
						helper for <code>onScimGroupReplace</code> — compute{' '}
						<code>{'{added, removed}'}</code> deltas against your
						existing membership table without rolling your own loop.
						Keyed by <code>member.value</code> (the user&apos;s SCIM
						id).
					</p>
					<PrismPlus
						codeString={scimGroupDelta}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="portal"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Admin Portal
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mint a scoped, time-boxed setup link so a
						customer&apos;s IT admin self-configures their SSO/SCIM
						connection. The contract is JSON, so the portal page can
						be built in any framework; connections take effect
						immediately because the portal writes through the same
						stores.
					</p>
					<PrismPlus
						codeString={portalSetup}
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
