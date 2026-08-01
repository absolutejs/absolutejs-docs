/**
 * Code samples for the @absolutejs/dispatch docs page. Dispatch is a
 * provider-agnostic outbound dispatcher for Bun + Elysia — email, messaging,
 * and push behind one typed interface, with vendor adapter packages
 * for Resend, Postmark, AWS, Infobip, Sinch, Telnyx, Twilio, and Vonage.
 */

const dispatchInstall = `bun add @absolutejs/dispatch@0.7.1

# Install only the capabilities you use:
bun add @absolutejs/dispatch-apns @absolutejs/dispatch-fcm
bun add @absolutejs/dispatch-push-postgres @absolutejs/reliability
bun add @absolutejs/dispatch-aws-end-user-messaging
bun add @absolutejs/dispatch-infobip
bun add @absolutejs/dispatch-twilio @absolutejs/compliance twilio

# OTP/MFA is a separate Auth concern:
bun add @absolutejs/auth @absolutejs/auth-twilio twilio`;

const dispatchConsent = `import { createDispatcher } from '@absolutejs/dispatch';
import {
  createMessagingConsentDispatchPolicy,
  createMessagingConsentLedger,
  createPostgresMessagingConsentStore,
} from '@absolutejs/compliance';

const consent = createMessagingConsentLedger({
  audit,
  store: createPostgresMessagingConsentStore(postgres),
});

await consent.grant({
  programId: 'acme-incident-alerts',
  purpose: 'incident-alerts',
  recipient: '+12025550100',
  tenant: 'tenant-a',
  transport: 'sms',
}, {
  at: Date.now(),
  reference: 'signup-42',
  source: 'signup-form',
});

const dispatch = createDispatcher({
  messaging,
  policies: [createMessagingConsentDispatchPolicy({ ledger: consent })],
});

// Missing or revoked evidence is denied before a provider request is made.
await dispatch.messaging({
  consent: { programId: 'acme-incident-alerts', purpose: 'incident-alerts' },
  content: { kind: 'text', text: 'Database latency is elevated.' },
  tenant: 'tenant-a',
  to: { address: '+12025550100', transport: 'sms' },
});`;

const dispatchChannelUsage = `// Every channel call returns a DispatchResult you can correlate
// with the vendor's delivery webhook later.
const result = await dispatch.messaging({
  content: { kind: 'text', text: 'Database latency is elevated.' },
  to: { address: '+15555550123', transport: 'sms' },
  tenant: 'acme',                    // propagates to spans + audit
  metadata: { campaign: 'signup' },  // open record adapters interpret
});

console.log(result); // { at: 1785600000000, id: 'SM…', provider: 'twilio', delivery: … }`;
const dispatchPostmark = `import { createPostmarkAdapter } from '@absolutejs/dispatch-postmark';
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
const dispatchQuickStart = `import { createDispatcher } from '@absolutejs/dispatch';
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
const dispatchPushLifecycle = `import { createPushLifecycle } from '@absolutejs/dispatch';
import {
  createPostgresPushFanoutClaimStore,
  createPostgresPushSubscriptionStore,
} from '@absolutejs/dispatch-push-postgres';
import {
  createPostgresIdempotentOperationStore,
  createPostgresTransactionRunner,
} from '@absolutejs/reliability';

const runner = createPostgresTransactionRunner(postgresPool);
const push = createPushLifecycle({
  adapterFor: ({ platform, tenant }) => resolveTenantPushAdapter(tenant, platform),
  claimStore: createPostgresPushFanoutClaimStore(
    createPostgresIdempotentOperationStore(runner),
  ),
  store: createPostgresPushSubscriptionStore(runner),
});

await push.register({
  deviceId: 'iphone-15',
  platform: 'apns',
  tenant: 'acme',
  token,
  topics: ['incidents'],
  userId: 'user-42',
});

const result = await push.send(
  { tenant: 'acme', topic: 'incidents' },
  {
    body: 'Database latency is elevated.',
    deepLink: 'absolute://incidents/42',
    idempotencyKey: 'incident-42:opened',
    sound: 'default',
    title: 'Production alert',
  },
);

if (result.indeterminate > 0) {
  // Delivery may have succeeded before the provider acknowledgement was lost.
  // Reconcile this state; do not blindly retry it as a new notification.
  await operations.recordIndeterminatePush(result);
}`;
const dispatchPushProviders = `import { createApnsAdapter } from '@absolutejs/dispatch-apns';
import { createFcmAdapter } from '@absolutejs/dispatch-fcm';

const adapters = {
  apns: createApnsAdapter({
    bundleId: process.env.APNS_BUNDLE_ID!,
    keyId: process.env.APNS_KEY_ID!,
    privateKey: process.env.APNS_PRIVATE_KEY!,
    teamId: process.env.APNS_TEAM_ID!,
  }),
  fcm: createFcmAdapter({ projectId: process.env.FCM_PROJECT_ID! }),
};

// The lifecycle passes the same portable fields to either provider.
// APNs maps them into aps; FCM maps Android, APNs, webpush, and data payloads.
const adapterFor = ({ platform }: { platform: 'apns' | 'fcm' }) =>
  adapters[platform];

// Drain pooled APNs HTTP/2 sessions during graceful shutdown.
await adapters.apns.dispose();`;
const dispatchAws = `import { PinpointSMSVoiceV2Client } from '@aws-sdk/client-pinpoint-sms-voice-v2';
import { SocialMessagingClient } from '@aws-sdk/client-socialmessaging';
import { createDispatcher } from '@absolutejs/dispatch';
import {
  createAwsEndUserMessagingAdapter,
  inspectAwsEndUserMessagingReadiness,
} from '@absolutejs/dispatch-aws-end-user-messaging';

const client = new PinpointSMSVoiceV2Client({ region: process.env.AWS_REGION });
const messaging = createAwsEndUserMessagingAdapter({
  client,
  configurationSetName: 'pro-alert-events',
  messageType: 'TRANSACTIONAL',
  originationIdentity: process.env.AWS_EUM_ALERT_POOL_ARN,
  protectConfigurationId: process.env.AWS_EUM_PROTECT_ID,
  socialClient: new SocialMessagingClient({ region: process.env.AWS_REGION }),
  whatsappPhoneNumberId: process.env.AWS_WHATSAPP_PHONE_NUMBER_ID,
});

const dispatch = createDispatcher({ messaging });
await dispatch.messaging({
  content: { kind: 'text', text: 'Database latency is elevated.' },
  consent: { programId: 'pro-alerts', purpose: 'incident-alerts' },
  idempotencyKey: 'incident-42:recipient-7',
  to: { address: '+12025550100', transport: 'rcs' },
});

await inspectAwsEndUserMessagingReadiness({
  client,
  configurationSetName: 'pro-alert-events',
  originationIdentity: process.env.AWS_EUM_ALERT_POOL_ARN,
  protectConfigurationId: process.env.AWS_EUM_PROTECT_ID,
});`;
const dispatchAwsOperations = `import {
  createAwsEndUserMessagingEventHandler,
  createAwsEndUserMessagingRegistrationManager,
  createPostgresTransactionRunner,
  createPostgresWebhookInboxStore,
  drainAwsEndUserMessagingEventInbox,
} from '@absolutejs/dispatch-aws-end-user-messaging';

const runner = createPostgresTransactionRunner(postgresPool);
const inbox = createPostgresWebhookInboxStore<string>(runner);
const events = createAwsEndUserMessagingEventHandler({
  inbox,
  // Verify the authenticated EventBridge/SNS ingress your deployment exposes.
  verify: (headers, body) => verifyAwsEventIngress(headers, body),
});
app.post('/webhooks/aws-messaging', ({ request }) => events(request));

// Run in a worker. HTTP intake returns 202 after durable storage.
await drainAwsEndUserMessagingEventInbox({
  inbox,
  onEvent: event => lifecycle.record(event),
});

const registrations = createAwsEndUserMessagingRegistrationManager(client);
// Select the exact current type returned by AWS registration definitions.
const created = await registrations.create({ RegistrationType: selectedRegistrationType });
await registrations.putFields(created.RegistrationId!, registrationFields);
await registrations.submit(created.RegistrationId!);
const status = await registrations.inspect(created.RegistrationId!);`;
const dispatchInfobip = `import { createDispatcher } from '@absolutejs/dispatch';
import {
  createInfobipAdapter,
  createInfobipWebhookHandler,
  createPostgresTransactionRunner,
  createPostgresWebhookInboxStore,
  drainInfobipWebhookInbox,
} from '@absolutejs/dispatch-infobip';

const inbox = createPostgresWebhookInboxStore(
  createPostgresTransactionRunner(postgresPool),
);
const messaging = createInfobipAdapter({
  apiKey: process.env.INFOBIP_API_KEY,
  baseUrl: process.env.INFOBIP_BASE_URL,
  defaultSenders: { sms: process.env.INFOBIP_SMS_SENDER },
  deliveryWebhookUrl: 'https://example.com/webhooks/infobip',
  validateBeforeSend: true,
});
const webhook = createInfobipWebhookHandler({
  inbox,
  verify: headers => verifyInfobipGatewayAuthorization(headers),
});
app.post('/webhooks/infobip', ({ request }) => webhook(request));

await drainInfobipWebhookInbox({
  inbox,
  onEvent: event => lifecycle.record(event),
});

const dispatch = createDispatcher({ messaging });
await dispatch.messaging({
  content: { kind: 'text', text: 'Database latency is elevated.' },
  consent: { programId: 'pro-alerts', purpose: 'incident-alerts' },
  to: { address: '+12025550100', transport: 'sms' },
});`;
const dispatchInfobipOperations = `import {
  createInfobipOperationsClient,
} from '@absolutejs/dispatch-infobip';

const operations = createInfobipOperationsClient({
  apiKey: process.env.INFOBIP_API_KEY!,
  baseUrl: process.env.INFOBIP_BASE_URL!,
});

const brand = await operations.createBrand(brandApplication);
const campaign = await operations.createCampaign({
  ...campaignApplication,
  brandId: brand.id,
});
await operations.registerCampaign(String(campaign.id));
await operations.requestNumber(numberRequest);

// Read these from a worker or admin surface until every registration is ready.
await operations.inspectBrand(String(brand.id));
await operations.inspectCampaign(String(campaign.id));`;
const dispatchSinch = `import { createDispatcher } from '@absolutejs/dispatch';
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

const dispatchTelnyx = `import { createDispatcher } from '@absolutejs/dispatch';
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
const dispatchTesting = `import { createDispatcher, memoryEmailAdapter } from '@absolutejs/dispatch';

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
const dispatchTwilio = `import {
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
const dispatchVonage = `import { createDispatcher } from '@absolutejs/dispatch';
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

export {
	dispatchAws,
	dispatchAwsOperations,
	dispatchChannelUsage,
	dispatchConsent,
	dispatchInfobip,
	dispatchInfobipOperations,
	dispatchInstall,
	dispatchPostmark,
	dispatchPushLifecycle,
	dispatchPushProviders,
	dispatchQuickStart,
	dispatchSinch,
	dispatchTelnyx,
	dispatchTesting,
	dispatchTwilio,
	dispatchVonage
};
