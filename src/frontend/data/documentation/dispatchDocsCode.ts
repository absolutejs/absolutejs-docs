/**
 * Content for the @absolutejs/dispatch docs page. Each export is a
 * single block rendered via PrismPlus. The package is a substrate-level
 * outbound message dispatcher — email/SMS/push channels with
 * vendor-adapter siblings (resend, postmark, twilio).
 */

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

export const dispatchChannels = `# Three channels, one dispatcher

  Each channel is OPTIONAL — pass only the adapters you wire. Calling
  a channel that wasn't configured throws DispatchUnsupportedError so
  the omission is loud, not silent.

  createDispatcher({
    email?: EmailAdapter,
    sms?:   SmsAdapter,
    push?:  PushAdapter,
    audit?: AuditLike,                  // optional @absolutejs/audit
    tracerProvider?: TracerProvider,    // optional OTel via @absolutejs/telemetry
    defaultFrom?: { email?: string, sms?: string },
    onError?: (err, channel, message) => void,
  });

  The message shape per channel — every channel supports an optional
  \`tenant\` field that propagates to spans + audit, and an open
  \`metadata\` record adapters can interpret:

    EmailMessage  → { to, subject, text?, html?, from?, replyTo?,
                      cc?, bcc?, headers?, tenant?, metadata? }
    SmsMessage    → { to, body, from?, tenant?, metadata? }
    PushMessage   → { to, title?, body, data?, tenant?, metadata? }

  Each call returns DispatchResult { at, id?, provider } so you can
  correlate the send to the vendor's delivery webhook.`;

export const dispatchAdapters = `# Vendor adapter siblings

  Each adapter is its own npm package — install only the ones you
  wire. The narrow ClientLike interfaces keep the vendor SDKs as TRUE
  peer deps; the adapter doesn't pull in postmark or twilio
  transitively. Bring your own client.

  Bundled (Apache 2.0 Tier B):

    @absolutejs/dispatch-resend     → createResendAdapter (email)
    @absolutejs/dispatch-postmark   → createPostmarkAdapter (email)
    @absolutejs/dispatch-twilio     → createTwilioAdapter (sms)

  In-memory + console adapters ship with the core package — useful
  for tests + local dev:

    import {
      memoryEmailAdapter, memorySmsAdapter, memoryPushAdapter,
      consoleEmailAdapter, consoleSmsAdapter, consolePushAdapter,
    } from '@absolutejs/dispatch';

  Memory adapters keep an in-process FIFO buffer (default 1000); call
  .inspect() to read a copy, .clear() to reset between tests. Console
  adapters print the message as JSON and return immediately.`;

export const dispatchSpans = `# Observability — spans + counters + audit

  Each send fans out a single span under the channel's tracer:

    dispatch.email.send
    dispatch.sms.send
    dispatch.push.send

  with these attributes:

    abs.tenant            → message.tenant when set (ABS_ATTRS.tenant)
    dispatch.channel      → 'email' | 'sms' | 'push'
    dispatch.provider     → adapter.name ('resend', 'postmark', 'twilio', …)
    dispatch.recipient    → message.to (CSV-joined when to is an array)
    dispatch.message_id   → vendor id, set post-send when adapter returns one

  dispatcher.metrics() returns cumulative counters:

    {
      sent: number,
      failed: number,
      byChannel: {
        email: { sent: number, failed: number },
        sms:   { sent: number, failed: number },
        push:  { sent: number, failed: number },
      }
    }

  Pass an { audit } shaped like @absolutejs/audit's writer and every
  send appends one of:

    dispatch.email.sent  / dispatch.email.failed
    dispatch.sms.sent    / dispatch.sms.failed
    dispatch.push.sent   / dispatch.push.failed

  with provider + messageId in metadata, message.tenant as actor (or
  'system' when no tenant set), and the recipient as target.`;

export const dispatchPostmark = `# Postmark adapter — transactional + metadata routing

  import { createPostmarkAdapter } from '@absolutejs/dispatch-postmark';
  import { ServerClient } from 'postmark';

  const email = createPostmarkAdapter({
    client: new ServerClient(process.env.POSTMARK_TOKEN!),
    defaultFrom: 'noreply@example.com',
    messageStream: 'outbound',                          // default
  });

  Postmark requires a \`From\` address — pass per-message or via
  \`defaultFrom\`, otherwise the adapter throws a clear error.

  By default the adapter extracts a \`tag\` field from
  \`message.metadata\` into Postmark's Tag (used for analytics
  segmentation) and routes every other string-valued metadata entry
  into Postmark's Metadata map. Override the mapping via:

    createPostmarkAdapter({
      client,
      mapMetadata: (metadata) => ({
        Tag: metadata.tag as string | undefined,
        Metadata: {
          campaign: metadata.campaign as string,
          tenant:   metadata.tenant   as string,
        }
      }),
    });

  Custom headers in the EmailMessage convert to Postmark's
  [{Name, Value}] array shape automatically. SDK errors propagate; the
  dispatcher's onError + span error capture kicks in.`;

export const dispatchTwilio = `# Twilio adapter — SMS with messaging-service or single-number routing

  import { createTwilioAdapter } from '@absolutejs/dispatch-twilio';
  import twilio from 'twilio';

  const sms = createTwilioAdapter({
    client: twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN),
    defaultFrom: '+15555550100',                // OR
    messagingServiceSid: 'MGxxxxxxxx',          // OR — at least one required
    statusCallback: 'https://example.com/twilio/status',
  });

  Sender precedence: message.from > defaultFrom > messagingServiceSid.
  If none resolves, the adapter throws.

  statusCallback threads through to every send so Twilio's delivery
  webhooks fire to your own audit ingest URL. The adapter also
  normalizes Twilio's documented bulk-send response shape — an
  errorCode != null in the response body (rare but real) throws so
  the dispatcher's failed counter + audit failure event fire.`;

export const dispatchTesting = `# Testing — memory adapters + .inspect() assertions

  No vendor mocks. The in-memory adapters are the fast path for
  testing notification flows.

  import { createDispatcher, memoryEmailAdapter } from '@absolutejs/dispatch';

  const email = memoryEmailAdapter();
  const dispatch = createDispatcher({ email });

  await dispatch.email({
    to: 'a@b.c',
    subject: 'hi',
    text: 'hi'
  });

  const sent = email.inspect();
  expect(sent).toHaveLength(1);
  expect(sent[0].subject).toBe('hi');

  // Between tests:
  email.clear();
  expect(email.inspect()).toHaveLength(0);

  consoleEmailAdapter() is the sibling for local dev — prints the
  message as JSON to stdout, returns immediately. Useful when you
  want to eyeball what would have shipped without spinning up a real
  vendor account.

  For error-path tests, wrap an adapter and have its .send() reject —
  the dispatcher's failed counter, OTel span error, audit failure
  event, and onError hook all fire on the same rejection.`;
