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
