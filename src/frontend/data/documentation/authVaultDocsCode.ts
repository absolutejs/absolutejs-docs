export const vaultFederatedTokens = `\
import { createFederatedTokenStore, getOrRefreshFederatedTokens } from '@absolutejs/auth';

// Auth0 "Token Vault" parity on top of the vault block. Stash a user's third-party
// OAuth tokens (Google Drive, Slack, GitHub, ...) so your background jobs and
// AI agents can call those APIs as the user — with automatic refresh ~30s before
// expiry. The package never bundles a provider list; you bring the citra
// providerInstance you already use for sign-in.
const federatedTokens = createFederatedTokenStore(vault);

// At the end of an OAuth callback for, say, Google Drive scopes:
await federatedTokens.save({
  userId: user.sub,
  provider: 'google-drive',
  tokens: { accessToken, refreshToken, expiresAt }
});

// Anywhere you need to call the third-party API on the user's behalf — never
// touch a raw token; let the helper refresh if it's close to expiring.
const { accessToken } = await getOrRefreshFederatedTokens({
  store: federatedTokens,
  userId: user.sub,
  provider: 'google-drive',
  refresh: (token) => googleProvider.refreshAccessToken(token)
});
await fetch('https://www.googleapis.com/drive/v3/files', {
  headers: { authorization: \`Bearer \${accessToken}\` }
});`;
export const vaultRotation = `\
import { rotateVaultKey } from '@absolutejs/auth';

// Key rotation: re-encrypt every entry from oldKey to newKey, then swap your
// env to newKey. Mirrors rotateMfaEncryptionKey's shape. Run from a script.
const { rotated } = await rotateVaultKey({
  newKey: process.env.VAULT_KEY_NEW,
  oldKey: process.env.VAULT_KEY,
  store: createNeonVaultStore(process.env.DATABASE_URL)
});
console.info('re-encrypted', rotated, 'entries');`;
export const vaultUsage = `\
import {
  createNeonVaultStore,
  createSecretCipher,
  createVault
} from '@absolutejs/auth';

// Managed encrypted-blob storage. Pair an AES-GCM cipher (from
// createSecretCipher) with a store; put/get/list/delete entries per owner
// (typically a userId). The ciphertext lives in the store; the key lives in
// your env. Built on the same primitive as MFA secret encryption.
const vault = createVault({
  cipher: createSecretCipher(process.env.VAULT_KEY),
  store: createNeonVaultStore(process.env.DATABASE_URL)
});

await vault.put(user.sub, 'stripe_customer', 'cus_abc123');
const customerId = await vault.get(user.sub, 'stripe_customer');
const names = await vault.list(user.sub); // ['stripe_customer', ...]
await vault.delete(user.sub, 'stripe_customer');`;
