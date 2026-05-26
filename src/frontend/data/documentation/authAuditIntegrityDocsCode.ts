export const auditRetention = `\
import { exportAuditCsv } from '@absolutejs/auth';

// CSV export (RFC-4180 quoted) — the parity piece to WorkOS CSV export.
const events = (await auditStore.list?.({ limit: 10000 })) ?? [];
const csv = exportAuditCsv(events.reverse()); // oldest-first

// Retention: delete events older than the window; returns the count removed.
// Note: pruning necessarily drops the tamper-evidence of the removed rows.
const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
await auditStore.prune?.(Date.now() - ninetyDaysMs);`;
export const auditSharding = `\
import { createNeonAuditSink, createTamperEvidentSink } from '@absolutejs/auth';

// One hash-chain per WRITER. A single in-process chain can't span concurrent
// instances or survive a redeploy (each restart is a new process), so by default
// every process gets its own random writerId — each instance / deploy is a
// self-contained, independently-verifiable chain that never forks another.
const auditStore = createTamperEvidentSink({
  secret: process.env.AUDIT_HMAC_KEY,
  sink: createNeonAuditSink(process.env.DATABASE_URL)
  // writerId defaults to a fresh random id per process
});

// Single-writer deployment? Pass a stable writerId to keep ONE continuous chain
// across restarts. Supply loadWriterHead to resume without a scan (return that
// writer's most recent integrity hash, or undefined to start at genesis).
const single = createTamperEvidentSink({
  loadWriterHead: (writerId) => readLatestHashFor(writerId),
  secret: process.env.AUDIT_HMAC_KEY,
  sink: createNeonAuditSink(process.env.DATABASE_URL),
  writerId: 'audit-writer-1'
});`;
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

// Pass events oldest-first. Each writer's sub-chain is verified independently
// (grouped by writerId), detecting any modified, removed, or reordered entry and
// returning the input index of the first broken link.
const recent = (await auditStore.list?.({ limit: 1000 })) ?? [];
const result = await verifyAuditChain(
  recent.reverse(),
  process.env.AUDIT_HMAC_KEY
);

if (!result.ok) {
  console.error('audit log tampered — first broken link at', result.brokenAt);
}`;
