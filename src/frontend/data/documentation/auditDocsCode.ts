/**
 * Content for the @absolutejs/audit docs page. Append-only audit log
 * substrate with hash-chain integrity + live-wire helpers for
 * runtime / queue / secrets / sync.
 */

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
const audit = createAudit({
  sinks: [
    memorySink(),                   // in-process for tests
    consoleSink(),                  // stdout for dev
    pgSink({ pool, table: 'audit' }), // @absolutejs/audit-pg
  ],
});`;

export const auditEventShape = `# The AuditEvent shape

  Open by design — no enforced enum on kind. Convention is
  "<source>.<event>" so a kind filter like { kind: 'runtime.' }
  matches the whole source. Each event:

    AuditEvent {
      at:        number,            // Date.now() at emission (auto)
      kind:      string,            // 'auth.login', 'queue.job.failed', …
      actor?:    string,            // who caused it — userId, system
      target?:   string,            // what was acted on — resourceId
      metadata?: Record<string, unknown>,
    }

  Tip: don't stuff secrets into metadata. Pipe values through
  @absolutejs/secrets redact() first.

  audit.append({ kind, actor?, target?, metadata? }) fills in at and
  fans out to every sink concurrently. One sink throwing doesn't
  cancel the others — its error goes to onError + the per-sink
  counter; the remaining sinks still receive the event.`;

export const auditSinks = `# Sinks — append-only, optional list/prune/flush/close

  An AuditSink is anything that implements append(); list/prune/flush/
  close are optional for stores that support them. Bundled in core:

    memorySink({ max })   → in-process FIFO. list() implemented;
                            useful for tests and the in-process tail.
    consoleSink({ pretty }) → forward to stdout/stderr as JSON.

  Sibling packages (separate npm packages):

    @absolutejs/audit-pg     → Postgres sink with list + prune + flush
    @absolutejs/audit-elysia → Request-tracing plugin (HTTP spans, OTel)

  Custom sinks just implement AuditSink — append a row to your
  warehouse, forward to Splunk, post to a webhook, etc. A sink that
  forwards doesn't need to implement list/prune — only stores do.`;

export const auditIntegrity = `# Hash-chain integrity (tamper-evidence)

  withIntegrity() decorates any sink with a per-writer hash chain.
  Each appended event carries a metadata.__integrity link
  { hash, previousHash, writerId } so verifyChain() can detect
  modification, removal, or reordering.

  import { createAudit, memorySink, withIntegrity, verifyChain }
    from '@absolutejs/audit';

  const sink = memorySink();
  const audit = createAudit({
    sinks: [withIntegrity(sink, {
      secret: process.env.AUDIT_HMAC,    // optional HMAC; sha256 without
      writerId: 'shard-A',                // stable id to resume across restarts
    })],
  });

  // Later, an auditor checks the chain:
  const result = await verifyChain(await sink.list());
  if (!result.ok) {
    console.error('Broken at index', result.brokenAt, ':', result.reason);
  }

  Two integrity modes:

  - Without secret: SHA-256 chain. A reader can detect modification
    but an attacker with write access could forge a fresh chain.
  - With secret (HMAC-SHA256): only a holder of the secret can
    produce a valid chain. Verification needs the same secret.

  Multi-writer support: each withIntegrity() call defaults to a
  random writerId so concurrent writers / redeploys each own a
  self-contained sub-chain. Pass a stable writerId to resume across
  restarts; the chain seeds from the most recent event matching the
  writer (overridable via loadWriterHead).

  Concurrent appends within a writer are serialized so two callers
  can't both link to the same previousHash. This is the chain's
  correctness contract, not an optimization.`;

export const auditLiveWires = `# Live-wire helpers for the substrate

  Each helper returns a plain callback the host wires into the
  source package's existing listener API. audit doesn't reach into
  the substrate's lifecycle — the host stays in control. Narrow
  duck-typed inputs mean audit doesn't take peer deps on every
  substrate package.

  import {
    recordRuntimeTransition,
    recordQueueError,
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
  //   'sync.retry', …

  Each helper is a one-liner; they're conveniences for the common
  shape. If you need custom event mapping, write your own listener
  and call audit.append() directly.`;

export const auditMetrics = `# Operator metrics + close()

  audit.metrics() returns cumulative counters:

    {
      appended:     number,                // total successful append() calls
      appendErrors: number,                // calls where at least one sink threw
      sinkErrors:   Record<string, number> // per-sink error counts
                                           // keyed by sink.name or 'sink-<index>'
    }

  Sink errors are NOT fatal — every sink receives the event, errors
  bump the counter and call onError. The default onError is
  console.warn; route to a side-channel pipeline if you want sink
  failures visible separately (the audit log itself would loop).

  audit.flush() flushes every sink that implements flush(); useful
  before shutdown so batched writers commit. audit.close() flushes
  then closes every sink — after close(), append() throws
  AuditClosedError.`;

export const auditTesting = `# Testing — memorySink + .list() assertions

  No mocks. memorySink() exposes list() so tests assert exactly what
  was appended without coupling to a particular store.

  import {
    createAudit, memorySink, withIntegrity, verifyChain
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
