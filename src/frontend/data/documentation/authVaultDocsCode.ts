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
