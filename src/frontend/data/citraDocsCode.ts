export const gettingStarted = `import { createOAuth2Client } from 'citra';

const googleClient = await createOAuth2Client('google', {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://yourapp.com/auth/callback'
});`;

export const buildingAuthUrl = `const currentState = generateState();
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
);`;

export const callback = `// Parse callback URL parameters
const request = new Request('https://yourapp.com/auth/callback');
const params = new URL(request.url).searchParams;
const code = params.get('code');
const callback_state = params.get('state');

// Retrieve stored state and code verifier from cookies
const cookieHeader = request.headers.get('cookie') ?? '';
const cookies = Object.fromEntries(
  cookieHeader.split('; ').map(c => c.split('='))
);
const stored_state = cookies['oauth_state'];
const codeVerifier = cookies['pkce_code_verifier'];

// Validate state to prevent CSRF attacks
if (!callback_state || callback_state !== stored_state) {
  throw new Error('Invalid state mismatch');
}

// Validate code is present
if (!code) {
  throw new Error('Authorization code not found');
}

// Exchange authorization code for tokens
const tokenResponse = await googleClient.validateAuthorizationCode({
  code,
  codeVerifier
});`;

export const fetchUserProfile = `// Assuming you have code and codeVerifier from the callback
const code = 'authorization_code_from_callback';
const codeVerifier = 'code_verifier_from_cookie';

const tokenResponse = await googleClient.validateAuthorizationCode({
  code,
  codeVerifier
});

const profile = await googleClient.fetchUserProfile(tokenResponse.access_token);
console.log(profile);`;

export const refreshAccessToken = `const { refresh_token } = { refresh_token: 'refresh_token_from_callback' };
if (refresh_token) {
  const newTokens = await googleClient.refreshAccessToken(refresh_token);
}`;

export const revokeToken = `const { access_token } = { access_token: 'access_token_from_callback' };
if (isRevocableProviderOption('google')) {
  await googleClient.revokeToken(access_token);
}`;
