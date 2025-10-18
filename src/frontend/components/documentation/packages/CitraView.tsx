import { CodeBlock } from '../../utils/CodeBlock';

export const CitraView = () => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			padding: '1rem 2rem'
		}}
	>
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
			<ul>
				<li><strong>Interchangeability</strong>: All OAuth 2.0 providers follow the same authorization flow, and Citra abstracts this process into a unified interface.</li>
				<li><strong>Type Safety</strong>: Leverage TypeScript generics and type guards to catch configuration mistakes at compile time.</li>
			</ul>
			<p>
				Inspired by Arctic, Citra reduces boilerplate and minimizes integration errors by enforcing a uniform configuration approach.
			</p>
		</section>

		<section>
			<h2>Installation</h2>
			<CodeBlock language="bash">{`bun install citra`}</CodeBlock>
		</section>

		<section>
			<h2>Getting Started</h2>
			<p>Import Citra and create a client for your desired provider: (expand on type safe parameters)</p>
			<CodeBlock language="typescript">{`import { createOAuth2Client } from 'citra';

const googleClient = await createOAuth2Client('google', {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://yourapp.com/auth/callback'
});`}</CodeBlock>
		</section>

		<section>
			<h2>Building the Authorization URL</h2>
			<p>Generate the authorization URL from the provider metadata (including a PKCE verifier when required): (expand on customizable parameters like scope, etc)</p>
			<CodeBlock language="typescript">{`
			import { generateState, generateCodeVerifier } from 'citra';

			const currentState = generateState();
			const codeVerifier = generateCodeVerifier();
			const authUrl = await googleClient.createAuthorizationUrl({
				codeVerifier,
				scope: ['profile', 'openid'],
				searchParams: [
					['access_type', 'offline'],
					['prompt', 'consent']
				],
				state: currentState
			});

			// Store state and PKCE verifier in HttpOnly cookies
			const headers = new Headers();
			headers.set('Location', authUrl.toString());
			headers.append(
			'Set-Cookie',
			\`oauth_state=\${currentState}; HttpOnly; Path=/; Secure; SameSite=Lax\`
			);
			headers.append(
			'Set-Cookie',
			\`pkce_code_verifier=\${codeVerifier}; HttpOnly; Path=/; Secure; SameSite=Lax\`
			);`}
			</CodeBlock>
		</section>

		<section>
			<h2>Handling the Callback</h2>
			<p>Exchange the code and verifier for an OAuth2TokenResponse:</p>
			<CodeBlock language="typescript">{`const params = new URL(request.url).searchParams;
const code = params.get('code');
const callback_state = params.get('state');

const cookieHeader = request.headers.get('cookie') ?? '';
const cookies = parse(cookieHeader);
const stored_state = cookies['state'];
const code_verifier = cookies['code_verifier'];

if (callback_state !== stored_state.value) {
  return new Response('Invalid state mismatch', { status: 400 });
}

const tokenResponse = await googleClient.validateAuthorizationCode({
  code,
  codeVerifier
});`}</CodeBlock>
		</section>

		<section>
			<h2>Fetching the User Profile</h2>
			<p>Exchange the access token for user information:</p>
			<CodeBlock language="typescript">{`const profile = await googleClient.fetchUserProfile(tokenResponse.access_token);
console.log(profile);`}</CodeBlock>
		</section>

		<section>
			<h2>Refreshing and Revoking Tokens</h2>
			<p>If supported by the provider, you can refresh and revoke tokens:</p>
			<CodeBlock language="typescript">{`const { refresh_token, access_token } = tokenResponse;`}</CodeBlock>
			<CodeBlock language="typescript">{`if (refresh_token) {
  const newTokens = await googleClient.refreshAccessToken(refresh_token);
}`}</CodeBlock>
			<CodeBlock language="typescript">{`if (isRevocableProvider(googleClient)) {
  await googleClient.revokeToken(access_token);
}`}</CodeBlock>
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

		<section>
			<h2>Type Safety</h2>
			<p>Citra provides comprehensive TypeScript definitions:</p>
			<ul>
				<li><strong>PKCEProvider</strong>: Providers with PKCE support</li>
				<li><strong>OIDCProvider</strong>: Providers with OpenID Connect</li>
				<li><strong>RefreshableProvider</strong>: Providers supporting token refresh</li>
				<li><strong>RevocableProvider</strong>: Providers supporting token revocation</li>
				<li><strong>ScopeRequiredProvider</strong>: Providers requiring explicit scopes</li>
			</ul>
		</section>
	</div>
);
