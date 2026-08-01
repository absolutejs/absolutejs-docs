/**
 * Code samples for the @absolutejs/dispatch docs page. Dispatch is a
 * provider-agnostic outbound dispatcher for Bun + Elysia — email, messaging,
 * and push behind one typed interface, with vendor adapter packages
 * for Resend, Postmark, Sinch, Telnyx, Twilio, and Vonage.
 */

export const dispatchChannelUsage = `// Every channel call returns a DispatchResult you can correlate
// with the vendor's delivery webhook later.
const result = await dispatch.messaging({
  content: { kind: 'text', text: 'Your code is 424242' },
  to: { address: '+15555550123', transport: 'sms' },
  tenant: 'acme',                    // propagates to spans + audit
  metadata: { campaign: 'signup' },  // open record adapters interpret
});

console.log(result); // { at: Date, id: 'SM…', provider: 'twilio' }`;
export const dispatchPostmark = `import { createPostmarkAdapter } from '@absolutejs/dispatch-postmark';
import { ServerClient } from 'postmark';

const email = createPostmarkAdapter({
  client: new ServerClient(process.env.POSTMARK_TOKEN!),
  defaultFrom: 'noreply@example.com',
  messageStream: 'outbound', // default
});

// Override the default metadata mapping when you need full control
// over Postmark's Tag + Metadata fields:
const emailCustom = createPostmarkAdapter({
  client: new ServerClient(process.env.POSTMARK_TOKEN!),
  defaultFrom: 'noreply@example.com',
  mapMetadata: (metadata) => ({
    Tag: typeof metadata.tag === 'string' ? metadata.tag : undefined,
    Metadata: {
      campaign: String(metadata.campaign),
      tenant: String(metadata.tenant),
    },
  }),
});`;
export const dispatchQuickStart = `import { createDispatcher } from '@absolutejs/dispatch';
import { createResendAdapter } from '@absolutejs/dispatch-resend';
import { Resend } from 'resend';

const dispatch = createDispatcher({
  email: createResendAdapter({
    client: new Resend(process.env.RESEND_API_KEY!),
  }),
  defaultFrom: { email: 'Example <noreply@example.com>' },
});

// Each channel is called directly — dispatch.email(...), dispatch.messaging(...).
await dispatch.email({
  to: 'user@example.com',
  subject: 'Welcome',
  text: 'Hi there!',
});`;
export const dispatchSinch = `import { createDispatcher } from '@absolutejs/dispatch';
import {
  createPostgresIdempotentOperationStore,
  createPostgresTransactionRunner,
  createPostgresWebhookInboxStore,
  createSinchAdapter,
  createSinchWebhookHandler,
  drainSinchWebhookInbox,
} from '@absolutejs/dispatch-sinch';
import {
  createMessagingConsentLedger,
  createPostgresMessagingConsentStore,
} from '@absolutejs/compliance';
import { SinchClient } from '@sinch/sdk-core';

const client = new SinchClient({
  conversationRegion: 'us',
  keyId: process.env.SINCH_KEY_ID!,
  keySecret: process.env.SINCH_KEY_SECRET!,
  projectId: process.env.SINCH_PROJECT_ID!,
});
const runner = createPostgresTransactionRunner(postgresPool);
const inbox = createPostgresWebhookInboxStore(runner);
const consentLedger = createMessagingConsentLedger({
  store: createPostgresMessagingConsentStore(postgresPool),
});
const messaging = createSinchAdapter({
  appId: process.env.SINCH_APP_ID!,
  client,
  idempotencyStore: createPostgresIdempotentOperationStore(runner),
  projectId: process.env.SINCH_PROJECT_ID!,
  resolveRecipientIdentity: ({ address, transport }) =>
    transport === 'messenger' ? lookupMessengerPsid(address) : address,
});

const webhook = createSinchWebhookHandler({
  inbox,
  resolveAccount: accountKey => sinchWebhookAccount(accountKey),
  resolveAccountKey: ({ url }) => new URL(url).pathname.split('/').at(-1)!,
});
app.post('/webhooks/sinch/:accountKey', ({ request }) => webhook(request));

// Run from a worker. Intake returns 202 before these retryable effects run.
await drainSinchWebhookInbox({
  consentLedger,
  handler: event => lifecycle.record(event),
  inbox,
  resolveConsentScopes: event => programsForNumber(event.from),
});

const dispatch = createDispatcher({ messaging });
await dispatch.messaging({
  content: { kind: 'text', text: 'Database latency is elevated.' },
  consent: { programId: 'pro-alerts', purpose: 'incident-alerts' },
  fallbacks: [{ transport: 'sms' }],
  idempotencyKey: 'incident-42:recipient-7',
  to: { address: '+12025550100', transport: 'rcs' },
});`;
export const dispatchTelnyx = `import { createDispatcher } from '@absolutejs/dispatch';
import {
  createPostgresIdempotentOperationStore,
  createPostgresTransactionRunner,
  createPostgresWebhookInboxStore,
  createTelnyxAdapter,
  createTelnyxWebhookHandler,
} from '@absolutejs/dispatch-telnyx';
import { Telnyx } from 'telnyx';

const client = new Telnyx({ apiKey: process.env.TELNYX_API_KEY });
const runner = createPostgresTransactionRunner(postgresPool);
const messaging = createTelnyxAdapter({
  accountId: process.env.TELNYX_ORGANIZATION_ID,
  client,
  idempotencyStore: createPostgresIdempotentOperationStore(runner),
  messagingProfileId: process.env.TELNYX_MESSAGING_PROFILE_ID,
  rcsAgentId: process.env.TELNYX_RCS_AGENT_ID,
  webhookUrl: 'https://example.com/webhooks/telnyx',
});

const telnyxWebhook = createTelnyxWebhookHandler({
  handler: event => lifecycle.record(event),
  inbox: createPostgresWebhookInboxStore(runner),
  resolveAccount: organizationId => telnyxWebhookAccount(organizationId),
  resolveConsentScopes: event => programsForNumber(event.from),
});
app.post('/webhooks/telnyx', ({ request }) => telnyxWebhook(request));

const dispatch = createDispatcher({ messaging });
await dispatch.messaging({
  content: {
    kind: 'rich',
    title: 'Production alert',
    text: 'Database latency is elevated.',
    actions: [{
      kind: 'url',
      label: 'Open incident',
      url: 'https://example.com/incidents/42',
    }],
  },
  consent: { programId: 'pro-alerts', purpose: 'incident-alerts' },
  fallbacks: [{ transport: 'sms' }],
  idempotencyKey: 'incident-42:recipient-7',
  to: { address: '+12025550100', transport: 'rcs' },
});`;
export const dispatchTesting = `import { createDispatcher, memoryEmailAdapter } from '@absolutejs/dispatch';

const email = memoryEmailAdapter();
const dispatch = createDispatcher({ email });

await dispatch.email({
  to: 'a@b.c',
  subject: 'hi',
  text: 'hi',
});

const sent = email.inspect();
expect(sent).toHaveLength(1);
expect(sent[0].subject).toBe('hi');

// Between tests:
email.clear();
expect(email.inspect()).toHaveLength(0);`;
export const dispatchTwilio = `import {
  createTwilioComplianceManager,
  createPostgresTwilioIdempotencyStore,
  createTwilioAdapter,
  createTwilioWebhookHandler,
  inspectTwilioMessagingReadiness,
} from '@absolutejs/dispatch-twilio';
import {
  createMessagingConsentDispatchPolicy,
  createMessagingConsentLedger,
  createPostgresMessagingConsentStore,
} from '@absolutejs/compliance';
import { createDispatcher } from '@absolutejs/dispatch';
import { Twilio } from 'twilio';

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const consent = createMessagingConsentLedger({
  store: createPostgresMessagingConsentStore(postgres),
});
const messaging = createTwilioAdapter({
  accountSid: process.env.TWILIO_SID,
  client,
  idempotencyStore: createPostgresTwilioIdempotencyStore(postgres),
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  statusCallbackUrl: 'https://example.com/webhooks/twilio/messaging',
  validityPeriod: 300,
});

const webhook = createTwilioWebhookHandler({
  resolveAccount: accountSid => twilioWebhookAccount(accountSid),
  publicUrl: 'https://example.com/webhooks/twilio/messaging',
  lifecycleStore: durableLifecycleStore,
  consentLedger: consent,
  resolveScopes: event => [{
    programId: 'acme-alerts',
    purpose: 'incident-alerts',
    tenant: 'tenant-a',
  }],
  onEvent: event => lifecycle.record(event),
});

app.post('/webhooks/twilio/messaging', ({ request }) => webhook(request));

const dispatch = createDispatcher({
  policies: [createMessagingConsentDispatchPolicy({ ledger: consent })],
  messaging,
});

await dispatch.messaging({
  content: { kind: 'text', text: 'Service health has degraded.' },
  consent: { programId: 'acme-alerts', purpose: 'incident-alerts' },
  fallbacks: [{
    from: { address: '+12025550199', transport: 'sms' },
    transport: 'sms',
  }],
  tenant: 'tenant-a',
  to: { address: '+12025550100', transport: 'rcs' },
});

const registration = createTwilioComplianceManager(client);
const registrationStatus = await registration.inspect({
  kind: 'a2p',
  customerProfileSid,
  brandRegistrationSid,
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  campaignSid,
});

const readiness = await inspectTwilioMessagingReadiness({
  client,
  expectedAccountSid: process.env.TWILIO_SID,
  inboundWebhookUrl: 'https://example.com/webhooks/twilio/inbound',
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  requiresUsA2PRegistration: true,
  requiresRcsSender: true,
  statusCallbackUrl: 'https://example.com/webhooks/twilio/messaging',
  store: durableLifecycleStore,
  assertions: {
    consentEvidenceStored: true,
    optOutConfigured: true,
    privacyPolicyPublished: true,
    termsPublished: true,
  },
});`;
export const dispatchVonage = `import { createDispatcher } from '@absolutejs/dispatch';
import {
  createPostgresIdempotentOperationStore,
  createPostgresTransactionRunner,
  createPostgresWebhookInboxStore,
  createVonageAdapter,
  createVonageWebhookHandler,
} from '@absolutejs/dispatch-vonage';
import { Vonage } from '@vonage/server-sdk';

const client = new Vonage({
  applicationId: process.env.VONAGE_APPLICATION_ID!,
  privateKey: process.env.VONAGE_PRIVATE_KEY!,
});
const runner = createPostgresTransactionRunner(postgresPool);
const messaging = createVonageAdapter({
  apiKey: process.env.VONAGE_API_KEY!,
  client,
  defaultFrom: {
    rcs: process.env.VONAGE_RCS_AGENT_ID!,
    sms: process.env.VONAGE_SMS_NUMBER!,
  },
  idempotencyStore: createPostgresIdempotentOperationStore(runner),
});

const webhook = createVonageWebhookHandler({
  handler: event => lifecycle.record(event),
  inbox: createPostgresWebhookInboxStore(runner),
  resolveAccount: apiKey => vonageWebhookAccount(apiKey),
  resolveConsentScopes: event => programsForNumber(event.from),
});
app.post('/webhooks/vonage', ({ request }) => webhook(request));

const dispatch = createDispatcher({ messaging });
await dispatch.messaging({
  content: { kind: 'text', text: 'Database latency is elevated.' },
  consent: { programId: 'pro-alerts', purpose: 'incident-alerts' },
  fallbacks: [{ transport: 'sms' }],
  idempotencyKey: 'incident-42:recipient-7',
  to: { address: '+12025550100', transport: 'rcs' },
});`;
