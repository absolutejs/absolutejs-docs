import { citraDocsCode } from '../../../data/citraDocsCode';
import { h1Style, headingStyle, sectionStyle, paragraphStyle, listStyle, listItemStyle, codeWrapperStyle, paragraphLargeStyle, paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { CodeBlock, BashCodeBlock } from '../../utils/CodeBlock';

const gettingStarted = await CodeBlock({ code: citraDocsCode['gettingStarted'] });
const buildingAuthUrl = await CodeBlock({ code: citraDocsCode['buildingAuthUrl'] });
const callback = await CodeBlock({ code: citraDocsCode['callback'] });
const fetchUserProfile = await CodeBlock({ code: citraDocsCode['fetchUserProfile'] });
const refreshAccessToken = await CodeBlock({ code: citraDocsCode['refreshAccessToken'] });
const revokeToken = await CodeBlock({ code: citraDocsCode['revokeToken'] });

export const CitraView = () => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			padding: '2rem',
			lineHeight: '1.7',
			overflowX: 'hidden',
			overflowY: 'auto'
		}}
	>
		<link rel='stylesheet' href='https://esm.sh/@shikijs/twoslash@latest/style-rich.css' />
		<h1 style={h1Style}>
			Citra
		</h1>
		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Introduction
			</h2>
			<p style={paragraphLargeStyle}>
				Citra is a curated collection of OAuth 2.0 provider configurations, each bundled with the correct endpoints and request details.
				It provides a ready-to-use foundation for integrating secure authentication into JavaScript and TypeScript applications.
			</p>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Why Citra?
			</h2>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>
					Interchangeability
				</strong>
				: All OAuth 2.0 providers follow the same authorization flow, and Citra abstracts this process into a unified interface.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>
					Type Safety
				</strong>
				: Leverage TypeScript generics and type guards to catch configuration mistakes at compile time.
			</p>
			<p style={paragraphStyle}>
				Inspired by Arctic, Citra reduces boilerplate and minimizes integration errors by enforcing a uniform configuration approach.
			</p>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Installation
			</h2>
			<BashCodeBlock>
				{`bun install citra`}
			</BashCodeBlock>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Getting Started
			</h2>
			<p style={paragraphSpacedStyle}>
				Citra uses strong TypeScript typing to help you build OAuth clients safely and correctly. Each supported provider includes its own typed configuration schema, ensuring you can't accidentally pass unsupported parameters or omit required ones.
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: gettingStarted }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Building the Authorization URL
			</h2>
			<p style={paragraphSpacedStyle}>
				Once your client is initialized, you can generate a fully customized authorization URL for redirecting users to the provider's login page. Every option is strongly typed and context-aware, but you retain full control over advanced parameters like PKCE, scopes, and provider-specific query strings.
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: buildingAuthUrl }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Handling the Callback
			</h2>
			<p style={paragraphSpacedStyle}>
				Exchange the code and verifier for an OAuth2TokenResponse:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: callback }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Fetching the User Profile
			</h2>
			<p style={paragraphSpacedStyle}>
				Exchange the access token for user information:
			</p>
			<div style={codeWrapperStyle}	>
				<div dangerouslySetInnerHTML={{ __html: fetchUserProfile }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Refreshing and Revoking Tokens
			</h2>
			<p style={paragraphSpacedStyle}>
				If supported by the provider, you can refresh and revoke tokens:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: refreshAccessToken }} />
			</div>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: revokeToken }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Supported Providers
			</h2>
			<p style={paragraphStyle}>
				Citra supports 50+ OAuth 2.0 providers including:
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					Google, GitHub, Discord, Microsoft Entra ID
				</li>
				<li style={listItemStyle}>
					Apple, Facebook, Twitter, LinkedIn
				</li>
				<li style={listItemStyle}>
					Auth0, Okta, Keycloak, WorkOS
				</li>
				<li style={listItemStyle}>
					Twitch, Steam, Epic Games, Battle.net
				</li>
				<li style={listItemStyle}>
					GitLab, Bitbucket, Linear, Notion
				</li>
				<li style={listItemStyle}>
					And many more...
				</li>
			</ul>
		</section>

		{/* <section>
			<h2>Type Safety</h2>
			<p>Citra provides comprehensive TypeScript definitions:</p>
			<ul>
				<li><strong>PKCEProvider</strong>: Providers with PKCE support</li>
				<li><strong>OIDCProvider</strong>: Providers with OpenID Connect</li>
				<li><strong>RefreshableProvider</strong>: Providers supporting token refresh</li>
				<li><strong>RevocableProvider</strong>: Providers supporting token revocation</li>
				<li><strong>ScopeRequiredProvider</strong>: Providers requiring explicit scopes</li>
			</ul>
		</section> */}
	</div>
);
