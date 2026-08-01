/**
 * Code samples for the @absolutejs/dispatch docs page. Dispatch is a
 * provider-agnostic outbound dispatcher for Bun + Elysia — email, SMS,
 * and push behind one typed interface, with vendor adapter packages
 * for Resend, Postmark, and Twilio.
 */

export const dispatchChannelUsage = `// Every channel call returns a DispatchResult you can correlate
// with the vendor's delivery webhook later.
const result = await dispatch.sms({
  to: '+15555550123',
  body: 'Your code is 424242',
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

// Each channel is called directly — dispatch.email(...), dispatch.sms(...).
await dispatch.email({
  to: 'user@example.com',
  subject: 'Welcome',
  text: 'Hi there!',
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
const sms = createTwilioAdapter({
  client,
  idempotencyStore: createPostgresTwilioIdempotencyStore(postgres),
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  statusCallbackUrl: 'https://example.com/webhooks/twilio/messaging',
  validityPeriod: 300,
});

const webhook = createTwilioWebhookHandler({
  authToken: process.env.TWILIO_TOKEN,
  expectedAccountSid: process.env.TWILIO_SID,
  expectedMessagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  publicUrl: 'https://example.com/webhooks/twilio/messaging',
  store: durableLifecycleStore,
  consent: {
    ledger: consent,
    resolveScope: event => ({
      recipient: event.from,
      senderId: 'acme',
      tenant: 'tenant-a',
      topic: 'incident-alerts',
      transport: 'sms',
    }),
  },
  onEvent: event => lifecycle.record(event),
});

app.post('/webhooks/twilio/messaging', ({ request }) => webhook(request));

const dispatch = createDispatcher({
  policies: [createMessagingConsentDispatchPolicy({ ledger: consent })],
  sms,
});

await dispatch.sms({
  body: 'Service health has degraded.',
  channel: 'rcs',
  consent: { senderId: 'acme', topic: 'incident-alerts' },
  rcs: { fallbackFrom: '+12025550199' },
  tenant: 'tenant-a',
  to: '+12025550100',
});

const registration = createTwilioComplianceManager(client);
const registrationStatus = await registration.inspect({
  customerProfileSid,
  brandRegistrationSid,
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  campaignSid,
  tollfreeVerificationSid,
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
