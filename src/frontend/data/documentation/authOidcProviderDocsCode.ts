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
export const oidcDcr = `\
// Dynamic Client Registration (RFC 7591 + 7592). Clients self-register at runtime;
// the package issues a clientId/secret + a registration_access_token that lets the
// client read/update/delete its own record. Gate registration with an initial
// access token (RFC 7591 §3) — without one, /register returns 401.
oidc: {
  // ...the rest of your OIDC config
  dynamicClientRegistration: {
    initialAccessTokenStore: createNeonInitialAccessTokenStore(
      process.env.DATABASE_URL
    ),
    clientRegistrationTokenStore: createNeonClientRegistrationTokenStore(
      process.env.DATABASE_URL
    ),
    // Default policy: lock down redirect URIs + scopes the SaaS will allow:
    allowScopes: ['openid', 'profile', 'email'],
    requireHttps: true
  }
}

// Issue an initial access token to a partner (one-shot, expires):
await createInitialAccessToken(initialAccessTokenStore, {
  scope: 'register',
  expiresInMs: 24 * 60 * 60_000
});

// Mounts: POST {oidcRoute}/register, GET/PUT/DELETE {oidcRoute}/register/:clientId.`;
export const oidcDeviceFlow = `\
// RFC 8628 Device Authorization Grant — sign-in on TVs / CLIs / IoT where typing a
// password is painful. The device polls /oauth2/token while the user authorizes on
// a phone (slow_down + authorization_pending statuses handled in-house).
oidc: {
  // ...the rest of your OIDC config
  deviceAuthorization: {
    deviceCodeStore: createNeonDeviceCodeStore(process.env.DATABASE_URL),
    verificationUri: 'https://app.example.com/device',
    intervalSeconds: 5
  }
}

// Mounts:
//   POST {oidcRoute}/device_authorization  -> { device_code, user_code, verification_uri }
//   POST {oidcRoute}/token                 (grant_type=urn:ietf:params:oauth:grant-type:device_code)
//   GET/POST /device                       (your page — call approveDeviceCode after login)`;
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
}

// §8 nonces: opt in via dpopNonceStore so the AS challenges proofs with a
// short-lived nonce (returned as DPoP-Nonce: <value>). Mitigates pre-computed
// proof replays. RFC 9470 acr_values: pass acr_values=urn:mace:incommon:iap:silver
// to /authorize and require step-up before the code is issued.`;
export const oidcIntrospect = `\
// RFC 7662 token introspection — resource servers ask the AS whether a token is
// still live (revoked? expired? right audience?). Active reply mirrors the JWT
// claims (sub, scope, aud, exp, cnf, token_use); inactive replies with just
// { active: false }. Required by many enterprise procurement reviews.
//
//   POST {oidcRoute}/introspect    (client_secret_basic, client_secret_post, or
//                                   private_key_jwt — the same auth the token
//                                   endpoint accepts)
//     token=<access or refresh token>
//     token_type_hint=access_token   // optional
//
// Returns the live token state; revoked refresh tokens flip to { active: false }.`;
export const oidcJar = `\
import { signJwt } from '@absolutejs/auth';

// RFC 9101 JAR — sign the /authorize request itself (Request Object) instead of
// passing parameters as query strings. Required by FAPI profiles, used heavily by
// banking + healthcare. Per-client opt-in via requireSignedRequestObject; the AS
// verifies the JWT signature against the client's JWKS, then unwraps the params.
await clientStore.saveClient({
  clientId: 'fapi-partner',
  jwksUri: 'https://partner.example/.well-known/jwks.json',
  requireSignedRequestObject: true,
  // ...standard fields
});

// Client side: sign the request, then hit /authorize with ?request=<jwt>:
const requestObject = await signJwt({
  payload: {
    aud: 'https://id.yourapp.com',
    client_id: 'fapi-partner',
    iss: 'fapi-partner',
    redirect_uri: 'https://partner.example/callback',
    response_type: 'code',
    scope: 'openid profile',
    state,
    code_challenge,
    code_challenge_method: 'S256'
  },
  privateJwk: partnerPrivateKey
});
const url = \`https://id.yourapp.com/oauth2/authorize?request=\${requestObject}\`;`;
export const oidcLogout = `\
// OIDC RP-Initiated Logout 1.0 + Back-Channel Logout 1.0. The end-session endpoint
// lets RPs sign the user out and bounce them back to a registered post-logout URI;
// back-channel logout pushes a signed logout_token to every other RP that has an
// open session for the same sid, so a single click logs the user out everywhere.
await clientStore.saveClient({
  clientId: 'rp-app',
  backchannelLogoutUri: 'https://rp.example/oidc/backchannel-logout',
  postLogoutRedirectUris: ['https://rp.example/goodbye'],
  // ...standard fields
});

oidc: {
  // ...the rest of your OIDC config
  logoutDeliveryStore: createNeonLogoutDeliveryStore(process.env.DATABASE_URL),
  // Optional override; defaults to fetch() with retry + Standard Webhooks signing.
  deliverLogoutToken: async ({ url, logoutToken }) => fetch(url, {
    method: 'POST',
    body: new URLSearchParams({ logout_token: logoutToken })
  })
}

// Mounts:
//   GET {oidcRoute}/end_session?id_token_hint=...&post_logout_redirect_uri=...
//   On signout, the AS fans out a signed logout_token to every other RP's
//   backchannelLogoutUri for the same sid. Deliveries retry; failures persist
//   in the store so you can re-fire them.`;
export const oidcPar = `\
// RFC 9126 PAR — pushed authorization requests. The client POSTs its params to
// /par over an authenticated back-channel; the AS returns a request_uri the client
// then hands to /authorize. Defeats browser-leak attacks on long ?-strings and
// is required for FAPI profiles. Per-client opt-in via requirePushedAuthorizationRequests.
oidc: {
  // ...the rest of your OIDC config
  par: {
    pushedAuthorizationRequestStore: createNeonPushedAuthorizationRequestStore(
      process.env.DATABASE_URL
    ),
    expiresInMs: 60_000
  }
}

// Client side (one request, one URL):
//   POST {oidcRoute}/par   (client auth, same as /token)
//     client_id, redirect_uri, scope, code_challenge, code_challenge_method, ...
//   -> { request_uri: "urn:ietf:params:oauth:request_uri:...", expires_in }
//
//   GET {oidcRoute}/authorize?client_id=...&request_uri=<above>`;
export const oidcPrivateKeyJwt = `\
// RFC 7521/7523 private_key_jwt — the strongest client authentication. Instead of
// sending a shared client_secret to /token, the client signs a JWT assertion with
// its private key (the AS holds only the public JWK). Stolen logs no longer leak
// credentials. Same store change works for client_secret_jwt (HS256) and ships in
// the introspect / revoke / DCR endpoints too.
await clientStore.saveClient({
  clientId: 'partner-app',
  tokenEndpointAuthMethod: 'private_key_jwt',
  jwks: { keys: [partnerPublicJwk] }, // or jwksUri: 'https://partner.example/jwks.json'
  // ...standard fields
});

oidc: {
  // ...the rest of your OIDC config
  clientAssertionJtiStore: createNeonClientAssertionJtiStore(
    process.env.DATABASE_URL
  ) // RFC 7523 §3: enforce one-time use of the assertion's jti
}

// Client side:
//   POST {oidcRoute}/token
//     grant_type=authorization_code, code=..., code_verifier=...
//     client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
//     client_assertion=<signed JWT with iss=sub=clientId, aud=tokenEndpoint, exp, jti>`;
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
// /oauth2/token (refresh-token rotation), /oauth2/jwks, /oauth2/userinfo,
// /oauth2/introspect, /oauth2/revoke, /oauth2/end_session, and
// /.well-known/openid-configuration — fully self-hosted (you own the keys, no
// api.workos.com). The authorize login reuses your session, so it gets
// passkeys / MFA / SSO for free.`;
export const oidcReauth = `\
// OIDC prompt + max_age + id_token_hint — re-authentication signals from RPs.
//   prompt=login      -> ignore the active session, force a fresh login
//   prompt=none       -> never show UI; return login_required if no session
//   prompt=select_account -> route to your account-chooser (account_selection_required)
//   max_age=300       -> if the session is older than 300s, re-authenticate
//   id_token_hint=... -> verify the active user matches; mismatch -> login_required
//
// All four are honored automatically. The package compares max_age to the session's
// auth_time and bounces to loginUrl when needed (preserving return_to). Pair with
// requireRecentAuth on sensitive RP actions for end-to-end freshness guarantees.`;
export const oidcRevoke = `\
// RFC 7009 token revocation — clients voluntarily kill a refresh token (e.g. on
// "Sign out of this device"). Returns 200 whether the token existed or not (the
// spec forbids leaking that).
//
//   POST {oidcRoute}/revoke   (same client auth as /token + /introspect)
//     token=<refresh or access token>
//     token_type_hint=refresh_token   // optional
//
// Revoking a refresh token also flips its access tokens to active=false at the
// introspect endpoint.`;
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
export const oidcUserInfo = `\
// OIDC /userinfo — RPs swap a valid access token for the user's profile claims
// (the same scope-driven set returned to getClaims at code issue time, minus
// reserved JWT envelope). Bearer-token authenticated, GET or POST.
oidc: {
  // ...the rest of your OIDC config
  getUserInfo: async (sub) => {
    const user = await getUserBySub(sub);
    return {
      email: user.email,
      email_verified: user.emailVerified,
      name: user.name,
      picture: user.avatarUrl
    };
  }
}

// Mounts:
//   GET  {oidcRoute}/userinfo    (Authorization: Bearer <access_token>)
//   POST {oidcRoute}/userinfo
//   -> { sub, ...your claims }
//
// On invalid/missing token, replies 401 with a standard
// WWW-Authenticate: Bearer realm="userinfo", error="..." challenge.`;
