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
