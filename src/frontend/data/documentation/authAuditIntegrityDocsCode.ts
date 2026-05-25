export const auditSiem = `\
import { auth, createSiemLogStream } from '@absolutejs/auth';

// Stream every audit event to your SIEM — Datadog, Splunk HEC, or any HTTP
// collector. Best-effort and isolated per endpoint (one slow sink can't block
// the auth flow). Matches WorkOS "Log Streams".
const siem = createSiemLogStream({
  endpoints: [
    {
      format: 'datadog',
      token: process.env.DD_API_KEY,
      url: 'https://http-intake.logs.datadoghq.com/api/v2/logs'
    },
    {
      format: 'splunk',
      token: process.env.SPLUNK_HEC_TOKEN,
      url: 'https://splunk.example/services/collector'
    }
  ]
});

await auth<User>({
  providersConfiguration: {},
  audit: { auditStore, onAuditEvent: (event) => siem.append(event) }
});`;
export const auditTamperEvident = `\
import { auth, createNeonAuditSink, createTamperEvidentSink } from '@absolutejs/auth';

// Wrap your durable sink: every event is hash-chained to the one before it
// (HMAC-SHA256 with a secret), stored under metadata.__integrity — no schema
// change. WorkOS's audit logs offer no integrity guarantee; this does.
const auditStore = createTamperEvidentSink({
  secret: process.env.AUDIT_HMAC_KEY,
  sink: createNeonAuditSink(process.env.DATABASE_URL)
});

await auth<User>({ providersConfiguration: {}, audit: { auditStore } });`;
export const auditVerify = `\
import { verifyAuditChain } from '@absolutejs/auth';

// Pass events oldest-first. Detects any modified, removed, or reordered entry
// and returns the index of the first broken link.
const recent = (await auditStore.list?.({ limit: 1000 })) ?? [];
const result = await verifyAuditChain(
  recent.reverse(),
  process.env.AUDIT_HMAC_KEY
);

if (!result.ok) {
  console.error('audit log tampered — first broken link at', result.brokenAt);
}`;
