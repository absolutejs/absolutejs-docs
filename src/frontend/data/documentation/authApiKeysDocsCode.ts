export const apiKeyGuard = `\
import { Elysia } from 'elysia';
import { hasScopes, resolveApiPrincipal } from '@absolutejs/auth';

// One guard accepts both credential types. resolveApiPrincipal routes by token
// prefix: at_… -> access-token store, sk_… -> api-key store.
new Elysia().get('/api/videos', async ({ headers, status }) => {
  const principal = await resolveApiPrincipal({
    accessTokenStore, // client_credentials access tokens (at_…)
    apiKey: headers['x-api-key'], // …and static keys via X-API-Key
    apiKeyStore, // …or via Authorization: Bearer
    authorization: headers.authorization
  });
  if (!hasScopes(principal, ['videos:read'])) {
    return status('Unauthorized', 'missing scope videos:read');
  }

  // principal.ownerId is whatever you bound the credential to at creation.
  return listVideos(principal.ownerId);
});`;
export const clientCredentials = `\
import {
  auth,
  createApiClient,
  createNeonAccessTokenStore,
  createNeonApiClientStore
} from '@absolutejs/auth';

const apiClientStore = createNeonApiClientStore(process.env.DATABASE_URL);

await auth<User>({
  providersConfiguration: {},
  apikeys: {
    accessTokenStore: createNeonAccessTokenStore(process.env.DATABASE_URL),
    apiClientStore,
    accessTokenTtlMs: 3600000 // optional; default 1 hour
  }
});
// -> mounts POST /oauth2/token (the OAuth2 client_credentials grant)

// Register a machine client from your admin route (secret returned ONCE):
const { clientId, clientSecret } = await createApiClient(apiClientStore, {
  name: 'partner-sync',
  scopes: ['videos:read', 'athletes:read']
});
// clientId: 'cid_…' (public)   clientSecret: 'cs_…' (show once)

// The client then exchanges its credentials for a short-lived access token:
//   POST /oauth2/token
//   grant_type=client_credentials&client_id=cid_…&client_secret=cs_…&scope=videos:read
//   (client_id/secret may instead be sent as an HTTP Basic header)
// -> { access_token: 'at_…', token_type: 'Bearer', expires_in: 3600, scope: 'videos:read' }
// Tokens are stored by hash + expiry, so they stay revocable (unlike a bare JWT).`;
export const staticApiKeys = `\
import { auth, createApiKey, createNeonApiKeyStore } from '@absolutejs/auth';

const apiKeyStore = createNeonApiKeyStore(process.env.DATABASE_URL);

await auth<User>({
  providersConfiguration: {},
  apikeys: { apiKeyStore }
});

// Mint a key from your own (RBAC-protected) admin route. Only the hash is
// persisted; the plaintext is returned ONCE:
const { key, record } = await createApiKey(apiKeyStore, {
  name: 'CI pipeline',
  ownerId: user.sub, // bind to a user, an org, anything — it's free-form
  scopes: ['videos:read'],
  expiresAt: Date.now() + 7776000000 // optional (90 days here)
});
// key: 'sk_8Kf3…' (show once)   record.prefix: 'sk_8Kf3…' (keep for the UI list)`;
