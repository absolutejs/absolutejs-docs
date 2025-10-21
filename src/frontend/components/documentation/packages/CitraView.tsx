import { citraDocsCode } from '../../../data/citraDocsCode';
import { CodeBlock } from '../../utils/CodeBlock';

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
			padding: '1rem 2rem',
			overflowX: 'hidden',
			overflowY: 'auto'
		}}
	>
		<link rel='stylesheet' href='https://esm.sh/@shikijs/twoslash@latest/style-rich.css' />
		<h1>Citra</h1>

		<section>
			<h2>Introduction</h2>
			<p>
				Citra is a curated collection of OAuth 2.0 provider configurations, each bundled with the correct endpoints and request details.
				It provides a ready-to-use foundation for integrating secure authentication into JavaScript and TypeScript applications.
			</p>
		</section>

		<section>
			<h2>Why Citra?</h2>
			<p>
				<strong>Interchangeability</strong>: All OAuth 2.0 providers follow the same authorization flow, and Citra abstracts this process into a unified interface.
			</p>
			<p>
				<strong>Type Safety</strong>: Leverage TypeScript generics and type guards to catch configuration mistakes at compile time.
			</p>
			<p>
				Inspired by Arctic, Citra reduces boilerplate and minimizes integration errors by enforcing a uniform configuration approach.
			</p>
		</section>

		<section>
			<h2>Installation</h2>
		</section>

		<section>
			<h2>
				Getting Started
			</h2>
			<p>
				Citra uses strong TypeScript typing to help you build OAuth clients safely and correctly. Each supported provider includes its own typed configuration schema, ensuring you can't accidentally pass unsupported parameters or omit required ones.
			</p>
			<div dangerouslySetInnerHTML={{ __html: gettingStarted }} />
		</section>

		<section>
			<h2>
				Building the Authorization URL
			</h2>
			<p>
				Once your client is initialized, you can generate a fully customized authorization URL for redirecting users to the provider's login page. Every option is strongly typed and context-aware, but you retain full control over advanced parameters like PKCE, scopes, and provider-specific query strings.
			</p>
			<div dangerouslySetInnerHTML={{ __html: buildingAuthUrl }} />
		</section>

		<section>
			<h2>
				Handling the Callback
			</h2>
			<p>
				Exchange the code and verifier for an OAuth2TokenResponse:
			</p>
			<div dangerouslySetInnerHTML={{ __html: callback }} />
		</section>

		<section>
			<h2>
				Fetching the User Profile
			</h2>
			<p>
				Exchange the access token for user information:
			</p>
			<div dangerouslySetInnerHTML={{ __html: fetchUserProfile }} />
		</section>

		<section>
			<h2>
				Refreshing and Revoking Tokens
			</h2>
			<p>
				If supported by the provider, you can refresh and revoke tokens:
			</p>
			<div dangerouslySetInnerHTML={{ __html: refreshAccessToken }} />
			<div dangerouslySetInnerHTML={{ __html: revokeToken }} />
		</section>

		<section>
			<h2>Supported Providers</h2>
			<p>Citra supports 50+ OAuth 2.0 providers including:</p>
			<ul>
				<li>Google, GitHub, Discord, Microsoft Entra ID</li>
				<li>Apple, Facebook, Twitter, LinkedIn</li>
				<li>Auth0, Okta, Keycloak, WorkOS</li>
				<li>Twitch, Steam, Epic Games, Battle.net</li>
				<li>GitLab, Bitbucket, Linear, Notion</li>
				<li>And many more...</li>
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
