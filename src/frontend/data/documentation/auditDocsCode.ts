/**
 * Content for the @absolutejs/audit docs page. Append-only,
 * hash-chain tamper-evident audit log with live-wire helpers for
 * runtime / queue / secrets / sync.
 */

export const auditIntegrity = `import {
  createAudit,
  memorySink,
  verifyChain,
  withIntegrity,
} from '@absolutejs/audit';

const sink = memorySink();
const audit = createAudit({
  sinks: [withIntegrity(sink, {
    secret: process.env.AUDIT_HMAC, // optional HMAC; sha256 without
    writerId: 'shard-A',            // stable id to resume across restarts
  })],
});

// Later, an auditor checks the chain:
const result = await verifyChain(await sink.list());
if (!result.ok) {
  console.error('Broken at index', result.brokenAt, ':', result.reason);
}`;
export const auditLiveWires = `import {
  recordQueueError,
  recordRuntimeTransition,
  recordSecretRotation,
  recordSyncActivity,
} from '@absolutejs/audit';

// @absolutejs/runtime
createRuntime({
  onTransition: recordRuntimeTransition(audit),
});
// → 'runtime.spawn', 'runtime.exit', 'runtime.crash', …

// @absolutejs/queue
createQueueWorker({
  onError: recordQueueError(audit),
});
// → 'queue.error' with jobKind + attempts in metadata

// @absolutejs/secrets
broker.onRotate(name, recordSecretRotation(audit));
// → 'secrets.rotated' (fingerprint only — value NEVER recorded)

// @absolutejs/sync
engine.onActivity(recordSyncActivity(audit));
// → 'sync.change.insert', 'sync.mutation.ok', 'sync.batch.error',
//   'sync.retry', …`;
export const auditQuickStart = `import { createAudit, memorySink } from '@absolutejs/audit';

const audit = createAudit({
  sinks: [memorySink()],
});

await audit.append({
  kind: 'auth.login',
  actor: 'user_123',
  target: 'session_abc',
  metadata: { ip: req.ip },
});

// Many sinks, one fan-out:
const production = createAudit({
  sinks: [
    memorySink(),                       // in-process for tests
    consoleSink(),                      // stdout for dev
    createPostgresAuditSink({ sql }),   // @absolutejs/audit-postgres
  ],
});`;
export const auditTesting = `import {
  createAudit, memorySink, verifyChain, withIntegrity
} from '@absolutejs/audit';

const sink = memorySink();
const audit = createAudit({ sinks: [withIntegrity(sink)] });

await audit.append({ kind: 'auth.login', actor: 'user_1' });
await audit.append({ kind: 'auth.login', actor: 'user_2' });

const events = await sink.list();
expect(events).toHaveLength(2);
expect(events[0]).toMatchObject({ kind: 'auth.login', actor: 'user_1' });

// Integrity check — a tampered event triggers brokenAt:
const chain = await verifyChain(events);
expect(chain.ok).toBe(true);

events[0].actor = 'attacker';  // tamper
const tampered = await verifyChain(events);
expect(tampered.ok).toBe(false);
expect(tampered.brokenAt).toBe(0);`;
