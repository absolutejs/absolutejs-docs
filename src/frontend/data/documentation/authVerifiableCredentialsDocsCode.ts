export const issuerOfferFlow = `\
// 1. Mint a credential offer + return its pre-authorized code to the
//    wallet (typically as a QR code or deeplink).
import { createCredentialOffer } from '@absolutejs/auth';

app.post('/dashboard/issue-credential', async ({ store }) => {
  const userId = await getUserId(store);
  const { preAuthorizedCode } = await createCredentialOffer({
    clientId: 'acme-wallet',
    configurationId: 'identity_v1',
    userId,
    store: credentialOfferStore
  });
  // Build the QR / deeplink the wallet scans.
  const offer = {
    credential_issuer: 'https://acme.example',
    credential_configuration_ids: ['identity_v1'],
    grants: {
      'urn:ietf:params:oauth:grant-type:pre-authorized_code': {
        'pre-authorized_code': preAuthorizedCode
      }
    }
  };
  const qr = 'openid-credential-offer://?credential_offer=' +
    encodeURIComponent(JSON.stringify(offer));
  return { qr };
});

// 2. The wallet trades the pre-auth code at /oauth2/token (the
//    package's existing token endpoint handles it), then POSTs to
//    /vci/credential with its proof-of-possession JWT. The package
//    verifies the proof signature, mints the SD-JWT VC bound to the
//    wallet's key (cnf.jwk), and returns it. Discovery lives at
//    /.well-known/openid-credential-issuer.

const appWithVci = new Elysia()
  .use(oidcProviderRoutes({ ...oidcConfig, vciConfig }))
  .use(vciRoutes({ issuerUrl: 'https://acme.example', signingKey, vciConfig }));`;
export const issuerSetup = `\
// 0.40.0 ships Verifiable Credentials end-to-end: SD-JWT VC primitives,
// OpenID4VCI issuer, OpenID4VP verifier, Bitstring Status List for
// revocation. First-to-ship in the OSS TypeScript auth space.
//
// "ID card you can store in your wallet" — issue an SD-JWT VC to a
// wallet (EU Digital Identity Wallet, Microsoft Authenticator, etc.)
// using the pre-authorized_code flow.

import {
  auth,
  createInMemoryCredentialOfferStore,
  createInMemoryCredentialNonceStore,
  generateSigningKey,
  vciRoutes
} from '@absolutejs/auth';

const signingKey = await generateSigningKey();
const credentialOfferStore = createInMemoryCredentialOfferStore();
const credentialNonceStore = createInMemoryCredentialNonceStore();

const vciConfig = {
  credentialOfferStore,
  credentialNonceStore,
  signingKey,
  credentialConfigurations: [{
    id: 'identity_v1',
    format: 'vc+sd-jwt',
    vct: 'https://credentials.acme.test/identity_v1',
    display: [{ name: 'Acme Identity Card', locale: 'en-US' }],
    claims: {
      given_name: { display: [{ name: 'Given name' }] },
      family_name: { display: [{ name: 'Family name' }] },
      birthdate: { display: [{ name: 'Date of birth' }] },
      is_over_21: { display: [{ name: 'Is over 21' }] }
    }
  }],
  resolveCredentialClaims: async ({ userId }) => {
    const profile = await myDb.getProfile(userId);
    return {
      given_name: profile.firstName,
      family_name: profile.lastName,
      birthdate: profile.dob,
      is_over_21: profile.dob < '2005-05-27'
    };
  }
};`;
export const statusListFlow = `\
// Revocation via Bitstring Status List (draft-ietf-oauth-status-list-12).
// You publish a JWT-encoded bitmap; each credential references its slot
// via the \`status\` claim; verifiers check the bit at verify time.

import {
  createStatusList,
  setCredentialStatus,
  buildStatusClaim,
  statusListRoutes
} from '@absolutejs/auth';

// At deploy: hold one Uint8Array per list. Default size 131_072 bits
// (~16 KiB serialized) covers many issuers — resize via new listId
// when you outgrow it.
const list1 = createStatusList();
const lists = new Map([['list-1', list1]]);

// When issuing a credential, embed its status pointer:
const credential = await issueSdJwtVc({
  base: {
    iss: 'https://acme.example',
    vct: 'https://credentials.acme.test/identity_v1',
    status: buildStatusClaim(42, 'https://acme.example/vc/status/list-1')
  },
  holderJwk: walletJwk,
  selective: claims,
  signingKey
});

// Revoke later:
setCredentialStatus(list1, 42, 1);

// Serve the list to verifiers:
app.use(statusListRoutes({
  issuerUrl: 'https://acme.example',
  signingKey,
  getStatusList: (id) => lists.get(id)
}));

// Verifiers that pass statusListResolver to vpConfig will refuse the
// revoked credential at presentation time.`;
export const verifierFlow = `\
// On the relying-party side: accept a wallet presentation, verify the
// SD-JWT signature + holder key-binding JWT + nonce + requested claims,
// optionally check the credential's status list.

import {
  createInMemoryPresentationRequestStore,
  vpRoutes,
  generateSigningKey
} from '@absolutejs/auth';

const clientSigningKey = await generateSigningKey();
const vpConfig = {
  clientSigningKey,
  defaultExpectedIssuerPublicJwk: trustedIssuerPublicJwk,
  requestStore: createInMemoryPresentationRequestStore(),
  getResponseUri: (id) => 'https://rp.acme.test/vp/response?state=' + id,
  // Optional: status list resolver lets the verifier refuse revoked creds.
  statusListResolver: async (uri) => fetch(uri).then(r => r.text()),
  statusListPublicJwk: trustedStatusListPublicJwk
};

app.use(vpRoutes({
  vpConfig,
  issuerUrl: 'https://rp.acme.test',
  defaultClientId: 'rp.acme.test',
  onVerifiedPresentation: async ({ verified }) => {
    // verified.disclosedClaims has what the holder revealed;
    // verified.holderJwk identifies the wallet that proved possession.
    await myDb.recordAgeVerification(verified.disclosedClaims.is_over_21);
  }
}));

// Flow:
// 1. RP POST /vp/authorize { requested_claims: ['is_over_21'] }
//    → { request_uri, nonce, requestId }
// 2. Wallet fetches request_uri, picks a matching credential, builds
//    a key-binding JWT over the nonce + client_id, POSTs vp_token to
//    /vp/response.
// 3. Package verifies issuer sig + cnf binding + claim coverage + status,
//    fires onVerifiedPresentation hook.`;
