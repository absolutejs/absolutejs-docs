export const secretsQuickStart = `\
import {
  createSecretBroker,
  envAdapter,
  inMemoryAdapter,
  compositeAdapter,
} from '@absolutejs/secrets';

const broker = createSecretBroker({
  adapter: compositeAdapter([
    inMemoryAdapter({ initial: { TEST_KEY: 'sk_test_local_value' } }),
    envAdapter({ prefix: 'ABS_SECRET_' }),
  ]),
  audit: (event) => observabilitySink.write(event),
  cacheTtlMs: 60_000,
});

// Resolve a secret — returns { value, fingerprint } where fingerprint is
// a sha256 prefix safe to log.
const { value, fingerprint } = (await broker.resolve('STRIPE_KEY'))!;
logger.info('charging', { tenant, fingerprint });  // safe — no plaintext

// Use the value inside the host call, then forget.
return fetch('https://api.stripe.com/...', {
  headers: { Authorization: \`Bearer \${value}\` },
});`;

export const secretsRedact = `\
// Whole-string redaction — replace every cached value with [REDACTED:NAME].
// Longest values redact first so a substring of a longer secret doesn't
// blank before the full match is found.
const log = 'GET /v1 failed with sk_live_abcdef1234 and DB error postgres-pw';
const redacted = broker.redact(log);
// → 'GET /v1 failed with [REDACTED:STRIPE_KEY] and DB error [REDACTED:DB_PW]'

// Streaming redaction — TransformStream<string, string> that catches
// secrets straddling chunk boundaries via a lookback buffer. The transform
// redacts the WHOLE buffer per chunk (so in-flight secrets become labels)
// then holds back the tail until the next chunk arrives.
tenantStdoutText
  .pipeThrough(broker.redactStream())
  .pipeTo(lokiSink);

// Catch base64-encoded forms of cached secrets too (JWTs, cookies).
const broker = createSecretBroker({
  adapter,
  redactionEncodings: ['plain', 'base64'],
});
// → '[REDACTED:JWT_SIG:b64]' for the base64-encoded form`;

export const secretsRotation = `\
// onRotate fires AFTER the new value lands in the cache. Long-lived
// connections (DB pools, AI SDK instances, WebSocket servers per-tenant)
// subscribe so they swap credentials in-place instead of reconnecting on
// every resolve().
const off = broker.onRotate('DATABASE_URL', async ({ value, fingerprint }) => {
  await dbPool.reconfigure({ connectionString: value });
  log.info('db credentials rotated', { fingerprint });
});

// Triggers the listener after the cache update.
await broker.rotate('DATABASE_URL');

off();                          // unsubscribe`;

export const secretsTtlOverride = `\
// High-blast-radius secrets refresh more often than the global default.
const broker = createSecretBroker({
  adapter,
  cacheTtlMs: 60_000,                  // 1 min global default
  cacheTtlOverrides: {
    ADMIN_API_TOKEN:    5_000,         // 5s — very short
    DB_PASSWORD:        300_000,       // 5 min — slower-rotating
    KILL_SWITCH_FLAG:   1_000,         // 1s — wants near-real-time
  },
});`;

export const secretsAdapters = `\
// Bundled adapters cover dev + test + simple prod:
inMemoryAdapter({ initial: { K: 'v0' } });           // tests, dev
envAdapter({ prefix: 'ABS_SECRET_' });               // process.env, prefix-scoped
compositeAdapter([dev, env, vault]);                 // fan-out fallback

// Build a custom adapter (e.g. AWS Secrets Manager) by implementing:
const myAdapter: SecretAdapter = {
  fetch:  async (name)         => awsSm.getSecretValue(name),
  put:    async (name, value)  => awsSm.put(name, value),
  rotate: async (name)         => awsSm.rotate(name),
  remove: async (name)         => awsSm.delete(name),
  list:   async ()             => awsSm.list(),
};

// Vendored adapters for AWS Secrets Manager, HashiCorp Vault, Doppler,
// Infisical, GCP Secret Manager, and Azure Key Vault ship as sibling
// packages.`;
