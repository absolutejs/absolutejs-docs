export const bulkImport = `\
import {
  importUsers,
  isLegacyHash,
  rehashCredentialPassword,
  verifyAuth0Pbkdf2,
  verifyCognitoSha256
} from '@absolutejs/auth';

// Migrate an Auth0 / Cognito / Firebase export without forcing every user to
// reset their password. importUsers writes one row per record; argon2id and
// bcrypt hashes verify natively on next login. Legacy formats (Auth0 PBKDF2,
// Cognito SHA-256) are recognized by the isLegacyHash wrapper and verified by
// the matching legacy verifier; rehashOnLogin upgrades them to argon2id the
// first time the user signs in.
const result = await importUsers(records, {
  credentialStore: createNeonCredentialStore(process.env.DATABASE_URL),
  onCreateUser: ({ email, fields }) => createUser({ email, ...fields }),
  // Optional: detect + verify legacy formats (no rehash needed at import time).
  passwordVerifier: async (password, hash) => {
    if (hash.startsWith('auth0_pbkdf2:')) return verifyAuth0Pbkdf2(password, hash);
    if (hash.startsWith('cognito_sha256:')) return verifyCognitoSha256(password, hash);
    return Bun.password.verify(password, hash);
  }
});
console.info(\`imported \${result.imported}, skipped \${result.skipped}\`);

// On the credentials block, opt in to silent upgrade-on-login:
credentials: {
  // ...the rest of your credentials config
  passwordVerifier: async (password, hash) => {
    if (isLegacyHash(hash)) {
      return hash.startsWith('auth0_pbkdf2:')
        ? verifyAuth0Pbkdf2(password, hash)
        : verifyCognitoSha256(password, hash);
    }
    return Bun.password.verify(password, hash);
  },
  rehashOnLogin: true // calls rehashCredentialPassword behind the scenes
}`;
export const credentialsRoutes = `\
// The credentials block mounts these routes (transparent to protectRoute):
POST /auth/register                 { email, password, ...extraFields }
POST /auth/login                    { email, password } -> { status }
POST /auth/verify-email             { token }
POST /auth/verify-email/request     { email }
POST /auth/reset-password           { token, password }
POST /auth/reset-password/request   { email }

// Passwords are hashed with Bun.password (argon2id). Existing argon2id/bcrypt
// hashes verify as-is, so you can migrate a legacy user table with no rehash.`;
export const credentialsSetup = `\
import { auth, createNeonCredentialStore } from '@absolutejs/auth';

const app = await auth<User>({
  providersConfiguration: {},
  credentials: {
    credentialStore: createNeonCredentialStore(process.env.DATABASE_URL),
    getUserByEmail: (email) => findUserByEmail(email),
    onCreateCredentialUser: ({ email, ...extra }) => createUser({ email, ...extra }),
    onSendEmail: ({ email, token, type }) => sendBrevoEmail(email, type, token),
    passwordPolicy: { minLength: 12 },
    requireEmailVerification: true
  }
});`;
export const lockoutSetup = `\
import {
  auth,
  createRedisLockoutStore,
  type RedisLike
} from '@absolutejs/auth';

// RedisLike is a 3-method adapter — wrap ioredis / node-redis / Bun's RedisClient.
const redis: RedisLike = {
  del: (key) => client.del(key),
  get: (key) => client.get(key),
  set: (key, value, ttlMs) => client.set(key, value, 'PX', String(ttlMs))
};

await auth<User>({
  providersConfiguration: {},
  credentials: { /* … */ },
  lockout: {
    lockoutStore: createRedisLockoutStore(redis, 'auth:lockout:'),
    maxAttempts: 5,
    windowMs: 15 * 60_000
  }
});

// The credential login route returns 429 once an identity is locked. Redis gives
// atomic counters + native TTL (no cleanup job), shared across instances.`;
export const mfaSetup = `\
import { auth, createNeonMfaStore } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  credentials: { /* … */ },
  mfa: {
    mfaStore: createNeonMfaStore(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    // resolve the parked identity back into a user during a challenge:
    getChallengeUser: (identity) => findUserByEmail(String(identity.email)),
    issuer: 'Acme',
    encryptionKey: process.env.MFA_ENCRYPTION_KEY // AES-GCM: encrypts the TOTP secret at rest
  }
});

// With credentials + mfa set, login auto-parks the session until a factor is
// verified. Routes: /auth/mfa/totp/setup, /auth/mfa/totp/verify, /auth/mfa/challenge.`;
export const stepUpUsage = `\
// auth() exposes a requireRecentAuth derive alongside protectRoute.
// The handler runs only if the session was established by a real authentication
// (login or MFA — NOT a token refresh) within the window; otherwise 401.
app.delete('/account', ({ requireRecentAuth }) =>
  requireRecentAuth(5 * 60_000, (user) => deleteAccount(user))
);`;
