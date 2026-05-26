export const oidcClaims = `\
// Add consumer claims (email/name/org_id/...) to every access token. Reserved keys
// — iss, sub, aud, exp, iat, jti, client_id, scope, token_use, act, cnf — are
// stripped before merge, so the hook can't rewrite the token's identity or lifetime.
oidc: {
  // ...the rest of your OIDC config
  getAccessTokenClaims: async ({ sub }) => {
    const user = await getUserBySub(sub);
    return { email: user.email, name: user.name, org_id: user.orgId };
  }
}`;
export const oidcDpop = `\
import { verifyDpopProof, verifyJwt } from '@absolutejs/auth';

// DPoP (RFC 9449) is automatic at the token endpoint: if the client sends a
// 'DPoP' proof header, the issued access token is bound to its key (cnf.jkt) and
// typed "DPoP" — a stolen bearer token is then useless without the private key.
// WorkOS doesn't offer this.

// On your resource server, verify the proof and match its thumbprint to the
// token's cnf.jkt:
const proof = await verifyDpopProof({
  htm: request.method,
  htu: request.url,
  proof: request.headers.get('dpop') ?? undefined
});
const token = await verifyJwt(accessToken, publicJwk);
if (proof === undefined || proof.jkt !== token?.payload.cnf?.jkt) {
  return new Response('invalid_token', { status: 401 });
}`;
export const oidcProvider = `\
import {
  auth,
  createInMemoryOAuthClientStore,
  createNeonAuthorizationCodeStore,
  createNeonOidcRefreshTokenStore,
  generateSigningKey
} from '@absolutejs/auth';

// Generate once; persist privateJwk (it signs tokens), serve publicJwk via JWKS.
const signingKey = await generateSigningKey();

await auth<User>({
  providersConfiguration: {},
  authSessionStore,
  oidc: {
    issuer: 'https://id.yourapp.com',
    signingKey,
    clientStore: createInMemoryOAuthClientStore([
      {
        clientId: 'partner-app',
        name: 'Partner',
        redirectUris: ['https://partner.example/callback'],
        scopes: ['openid', 'profile']
      }
    ]),
    authorizationCodeStore: createNeonAuthorizationCodeStore(
      process.env.DATABASE_URL
    ),
    refreshTokenStore: createNeonOidcRefreshTokenStore(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    getClaims: (user) => ({ email: user.email, name: user.name }),
    loginUrl: '/signin'
  }
});

// Mounts: /oauth2/authorize (authorization_code + mandatory PKCE),
// /oauth2/token (refresh-token rotation), /oauth2/jwks, and
// /.well-known/openid-configuration — fully self-hosted (you own the keys, no
// api.workos.com). The authorize login reuses your session, so it gets
// passkeys / MFA / SSO for free.`;
export const oidcTokenExchange = `\
// AI-agent / MCP "on-behalf-of": an agent (a registered client) trades a user's
// access token for a narrower, short-lived, audience-bound delegated token.
//
//   POST /oauth2/token
//     grant_type=urn:ietf:params:oauth:grant-type:token-exchange
//     subject_token=<the user's access token>
//     subject_token_type=urn:ietf:params:oauth:token-type:access_token
//     resource=https://api.example/mcp   // RFC 8707 — binds the token's aud
//     scope=documents:read               // narrowed (must be a subset)
//   -> { access_token, issued_token_type, scope, token_type }
//
// The issued token keeps the user's sub, sets aud to the resource, and adds an
// act claim ({ sub: <agent client id> }) recording the delegation. DPoP-bindable.

import { mcpProtectedResourceMetadata } from '@absolutejs/auth';

// Serve at /.well-known/oauth-protected-resource on your MCP / resource server so
// agent clients discover this authorization server (RFC 9728):
const metadata = mcpProtectedResourceMetadata({
  issuer: 'https://id.yourapp.com',
  resource: 'https://api.example/mcp',
  scopes: ['documents:read']
});`;
