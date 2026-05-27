export const certBoundTokens = `\
// When mTLS is used at /token, the issued access token's cnf claim
// gets x5t#S256 = the cert thumbprint. Resource servers verify the
// presented cert at use time matches the binding — a stolen token
// is useless without the matching private key.

import { verifyCertificateBoundToken } from '@absolutejs/auth';

// In your resource server's request handler:
const verified = await verifyJwt(accessToken, issuerJwks);
const presentedCertDer = readClientCertHeader(request);

const ok = await verifyCertificateBoundToken({
  accessToken: verified,
  presentedCertDer
});
if (!ok) return new Response('cert binding mismatch', { status: 401 });

// The verification works alongside DPoP — a token can be DPoP-bound
// AND cert-bound simultaneously (cnf carries both jkt + x5t#S256).`;
export const discoveryAdvert = `\
// Discovery (/.well-known/openid-configuration) auto-advertises:
{
  "tls_client_certificate_bound_access_tokens": true,
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post",
    "private_key_jwt",
    "self_signed_tls_client_auth"
  ]
}

// Plus the usual FAPI-grade signals from the other 0.29-0.30 work:
// PAR, JAR, DPoP-with-nonce, acr_values, JWKS endpoint.`;
export const mtlsConfig = `\
// 0.36.0 ships RFC 8705 mutual-TLS client authentication + cert-bound
// access tokens. Required for FAPI 2.0 baseline profile (open banking,
// healthcare, anything PSD2-aligned).
//
// The package doesn't terminate TLS — your reverse proxy (nginx,
// Envoy, Caddy, AWS ALB) handles that and forwards the client cert
// via a request header. Default reader is RFC 9440's
// 'Client-Cert: :<base64-der>:' shape; override with extractTlsClientCert.

import { auth } from '@absolutejs/auth';

const app = await auth({
  oidc: {
    // Per-client allow-list of SHA-256 thumbprints (DER bytes).
    // The package computes the thumbprint of the presented cert and
    // matches it against this list.
    clientStore: createPostgresOAuthClientStore(db),
    // Optional: custom header reader if your proxy uses a non-standard
    // format. Return raw DER bytes; the package handles thumbprinting.
    extractTlsClientCert: (headers) => {
      const pem = headers.get('x-client-cert');
      if (!pem) return undefined;
      return pemToDer(pem);
    }
  }
});

// Mark a client as requiring + bound to a specific cert:
await clientStore.saveClient({
  clientId: 'open-banking-rp',
  // ... usual client fields
  tlsCertificateBoundThumbprints: ['Yw3W8YHzz...base64url']
});`;
