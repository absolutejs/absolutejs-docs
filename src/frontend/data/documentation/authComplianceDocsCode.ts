export const auditSetup = `\
import {
  auth,
  createNeonAuditSink,
  createAuditRedactor
} from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  audit: {
    auditStore: createNeonAuditSink(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    // PII redaction applied to every event before any sink sees it:
    redact: createAuditRedactor({ hashFields: ['email'], redactIp: true }),
    onAuditEvent: (event) => forwardToSiem(event) // optional extra sink
  }
});

// auth() emits structured, append-only events from every flow: register, login,
// mfa_*, password_reset, sso_login, scim_provision, organization_created,
// role_assigned, webauthn_*, passwordless_login, token_revoked, and more.`;
export const complianceSetup = `\
import { auth, createSecretCipher } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  compliance: {
    getUserId: (user) => user.sub,
    exportUserData: ({ user }) => gatherEverything(user), // GDPR Art. 15
    deleteUserData: ({ user }) => anonymizeOrDelete(user) // GDPR Art. 17
  }
});

// Mounts GET /auth/account/export (right to access -> JSON download) and
// DELETE /auth/account (right to erasure: runs your hook, revokes every session
// the user holds, clears the cookie).

// Field encryption at rest, bound to an AES-GCM key (F2):
const cipher = createSecretCipher(process.env.FIELD_KEY);
const stored = await cipher.encrypt(refreshToken);
const plain = await cipher.decrypt(stored);`;
export const sessionsSetup = `\
await auth<User>({
  providersConfiguration: {},
  authSessionStore, // a store that can enumerate sessions (Neon / Redis)
  sessions: { getUserId: (user) => user.sub }
});

// Self-service session management:
GET    /auth/sessions        // list the caller's active sessions
DELETE /auth/sessions/:id    // revoke one the caller owns

// listUserSessions / revokeUserSessions are also exported for password-reset
// "log out everywhere" flows.`;
export const webhooksSetup = `\
import { auth, verifyWebhookSignature } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  // Configuring webhooks alone turns on event emission and forwards the whole
  // audit taxonomy, HMAC-signed (Standard Webhooks scheme), to each endpoint:
  webhooks: {
    endpoints: [{ url: 'https://hooks.example.com/auth', secret: process.env.WHSEC }],
    onDeliveryError: ({ endpoint, error }) => log(endpoint.url, error)
  }
});

// Verify on the receiving end (Svix-compatible):
const ok = await verifyWebhookSignature({
  headers: request.headers, // webhook-id / webhook-timestamp / webhook-signature
  payload: await request.text(),
  secret: process.env.WHSEC
});`;
