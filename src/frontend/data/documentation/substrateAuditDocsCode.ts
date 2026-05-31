/**
 * Content for the Substrate Audit Closed (G1–G7) page. Consolidates
 * the seven cross-cutting gaps from the deep-research audit and what
 * shipped against each. Honest closer about what is NOT in-tree.
 */

export const substrateAuditPremise = `# What the audit said

  Mid-2026 a deep-research audit of the AbsoluteJS substrate
  surfaced seven cross-cutting gaps blocking the "can absolutejs.ai
  host other teams' production tenants" question:

  G1. Cross-surface audit log — multiple packages emitting events,
      no shared writer, no tamper-evidence.
  G2. OpenTelemetry across the substrate — every package wanted to
      emit spans; none did, and pulling @opentelemetry/api as a
      peer dep would tax every consumer.
  G3. Stripe meter sink — @absolutejs/metering was pluggable but
      had no first-party Stripe billing-meter sink.
  G4. Outbound message dispatch — every package needing to send
      email/SMS/push reinvented its own client.
  G5. Multi-region cluster bus — sync-bus-pg existed; nothing
      shipped for teams already on Redis or needing geo-replication.
  G6. Point-in-time replay — Convex shipped time-travel queries;
      sync didn't have the read API even though the change log
      made it mechanically possible.
  G7. Tenant migration primitives — moving a tenant between engines
      (sharding rebalance, cross-region move, staging clone) was
      not a first-class operation.

  As of 2026-05-31 every gap is addressed in-tree. This page is
  the consolidated record.`;

export const substrateAuditMatrix = `# Coverage matrix

  G   | Surface                       | Package(s)                                   | Version
  ────|───────────────────────────────|──────────────────────────────────────────────|────────
  G1  | Cross-surface audit log       | @absolutejs/audit                            | 0.0.1
      |                               | @absolutejs/audit-elysia                     | 0.0.2
      |                               | @absolutejs/audit-pg                         | 0.0.1
  G2  | OTel across substrate         | @absolutejs/telemetry                        | 0.0.3
      |                               | instrumented: sync, queue, runtime,          |
      |                               | router, secrets, rate-limit, isolated-jsc    |
  G3  | Stripe meter sink             | @absolutejs/metering (already pluggable —    |  —
      |                               | sink stays a host concern, see below)        |
  G4  | Outbound message dispatch     | @absolutejs/dispatch                         | 0.0.1
      |                               | @absolutejs/dispatch-resend                  | 0.0.1
      |                               | @absolutejs/dispatch-postmark                | 0.0.1
      |                               | @absolutejs/dispatch-twilio                  | 0.0.1
  G5  | Multi-region cluster bus      | @absolutejs/sync-bus-redis                   | 0.0.1
      |                               | (sibling to sync-bus-pg — same ClusterBus)   |
  G6  | Point-in-time replay          | @absolutejs/sync — engine.replayTo()         | 1.22.0
      |                               | @absolutejs/sync — syncDevtools Replay panel | 1.23.0
  G7  | Tenant migration primitives   | @absolutejs/sync — engine.fence,             | 1.24.0
      |                               | exportSnapshot, importSnapshot               |`;

export const substrateAuditG1 = `# G1 — Cross-surface audit log

  @absolutejs/audit ships a small Audit handle with one fan-out to
  many sinks: append, metrics, flush, close. Open kind: string shape
  (\`auth.login\`, \`runtime.exit\`, \`queue.error\`, …) — no enforced
  enum. Sinks are append-only with optional list/prune/flush/close;
  one sink throwing doesn't cancel the others.

  Hash-chain integrity is a decorator: \`withIntegrity(sink, { secret? })\`
  links each event to the previous via SHA-256 or HMAC-SHA256;
  \`verifyChain(events)\` detects modification, removal, or reordering.
  Multi-writer safe via writerId.

  Live-wire helpers \`recordRuntimeTransition / recordQueueError /
  recordSecretRotation / recordSyncActivity\` return plain callbacks
  the host wires into the source package's existing listener API.
  Audit doesn't reach into the substrate's lifecycle — the host
  stays in control.`;

export const substrateAuditG2 = `# G2 — OpenTelemetry across the substrate

  @absolutejs/telemetry is the shared OTel layer every substrate
  package uses. Three properties make it work:

  - Type-replicated OTel surface. The Tracer / Span / TracerProvider
    types match @opentelemetry/api's structural shape; the package
    does NOT take @opentelemetry/api as a peer dep.
  - A noop tracer that returns no-op spans. \`tracerOrNoop(provider, name)\`
    is the single entry point every substrate package uses — provider
    undefined → noop, provider defined → real tracer.
  - ABS_ATTRS semantic conventions. Standard attribute keys
    (abs.tenant, abs.engine.id, abs.job.id, abs.runtime.key, …) so
    spans across packages correlate.

  G2 closed across the substrate: sync, queue, runtime, router,
  secrets, rate-limit, isolated-jsc all call tracerOrNoop and emit
  spans with ABS_ATTRS keys. Wire one TracerProvider on the app
  and every span lights up.`;

export const substrateAuditG3 = `# G3 — Stripe meter sink (deferred, by design)

  The audit asked for a first-party Stripe billing-meter sink.
  @absolutejs/metering had been pluggable since its first release —
  a host-supplied sink is the entry point, not an internal commitment.

  After review the call was: metering's pluggability already covers
  the case. A Stripe sink is a 30-line adapter inside the host
  control plane, not a substrate dependency. The substrate's
  responsibility is the meter itself + the sink contract; which
  vendor sits on the other side is policy, not architecture.

  G3 is the only gap closed by "no, we don't need to ship that."
  Documented explicitly so the audit can mark it resolved, not
  pending.`;

export const substrateAuditG4 = `# G4 — Outbound message dispatch

  @absolutejs/dispatch is a provider-agnostic outbound dispatcher:
  one factory \`createDispatcher\` returning a Dispatcher with three
  channels (\`email / sms / push\`). Each channel is optional; calling
  an unconfigured channel throws \`DispatchUnsupportedError\` so the
  omission is loud.

  Three first-party vendor adapters, each its own npm package with
  the vendor SDK as a true peer dep (narrow ClientLike interfaces
  keep the adapter slim):

  - @absolutejs/dispatch-resend   → EmailAdapter
  - @absolutejs/dispatch-postmark → EmailAdapter (with tag/metadata
                                    routing for analytics)
  - @absolutejs/dispatch-twilio   → SmsAdapter (number or
                                    MessagingService routing)

  Memory + console adapters bundle with the core package for tests.

  Every send fans out an OTel span (\`dispatch.email.send\`, etc.)
  with ABS_ATTRS attributes and bumps cumulative \`dispatcher.metrics()\`
  counters. Passing \`{ audit }\` from @absolutejs/audit emits
  \`dispatch.email.sent / .failed\` events with provider + messageId
  correlation. The substrate around adapters is uniform.`;

export const substrateAuditG5 = `# G5 — Multi-region cluster bus

  @absolutejs/sync-bus-pg already existed: Postgres LISTEN/NOTIFY
  with an overflow spill table for payloads above the 8KB NOTIFY
  cap. Worked for teams on a shared Postgres; useless for teams
  on Redis or needing native cross-region fan-out.

  @absolutejs/sync-bus-redis closes that gap: Redis pub/sub via
  PUBLISH/SUBSCRIBE behind the same ClusterBus interface. The
  subscriber MUST be a separate connection — Redis forbids other
  commands on a subscribed connection, so a single client doing
  both would deadlock. Narrow RedisPublisher + RedisSubscriber
  interfaces work with ioredis and node-redis v4+.

  Tradeoff: at-most-once delivery — a disconnected subscriber
  misses messages while down. Pair with engine.exportChangeLog()
  for shard-reboot resume (same caveat any pub/sub bus needs).

  Both adapters implement the same ClusterBus contract, so swap
  is one constructor change. The engine doesn't know which bus
  is underneath.`;

export const substrateAuditG6 = `# G6 — Point-in-time replay

  Convex's time-travel queries set the bar — "I deleted prod,
  restore us to 2h ago" + forensic "what did the tenant see at
  14:32?" The sync engine's bounded change log made this
  mechanically possible; G6 closed the read API.

  engine.replayTo({ at, tables? }) walks the change log forward
  to a target timestamp, folds each insert/update/delete into a
  per-table keyed view (last-write-wins per row key; delete
  removes), and returns { asOfVersion, asOfAt, rows, truncated }.
  truncated: true when the log doesn't extend back to the target
  — best-effort from the oldest retained entry. Widen
  changeLogRetainMs for forensic windows (e.g. 14 days for SOC2).

  syncDevtools followed in 1.23 with a clickable Replay panel:
  datetime picker, tables filter, max-rows cap, results pane with
  per-table row count + JSON preview. The same endpoint is
  exposed as JSON at GET <devtoolsPath>/replay so admin shells can
  wrap it without screen-scraping HTML.`;

export const substrateAuditG7 = `# G7 — Tenant migration primitives

  Moving a tenant between sync engines (sharding rebalance,
  cross-region move, point-in-time clone for staging) was not a
  first-class operation. G7 ships three composable verbs rather
  than one monolithic migrate():

  engine.fence({ reason })
    Pause new mutations on the source. runMutation rejects with
    EngineFencedError; subscribe / hydrate / streamChanges stay
    open so live readers don't go dark. Multiple fences compose;
    every handle must lift() before the engine unfences.

  engine.exportSnapshot({ tables?, ctx? })
    Walk every registered reader's all(ctx) and return a portable
    EngineSnapshot { sourceInstanceId, version, exportedAt,
    tables }. Detached from ChangeLogSnapshot — snapshots carry
    live state, not history.

  engine.importSnapshot(snapshot, { tables?, onProgress?, ctx? })
    Bulk-load on the target via each table's registered writer.
    Per-table progress callback. Tables without a writer surface
    in result.skipped so misconfigured targets don't silently
    drop rows.

  Why three verbs, not one. A monolithic migrate() would
  conflate pause-writes, capture-state, transport-bytes, and
  reapply — but transport is the operator's choice (S3? Kafka?
  gRPC?), and the strictness vs availability tradeoff
  (fence-first vs export-first) is policy. The substrate offers
  the verbs; the choreography is operator's.

  Out of scope (caller's responsibility): out-of-band writes
  (CDC drivers, raw SQL). The fence only blocks runMutation.`;

export const substrateAuditNotInTree = `# What is NOT in-tree

  The substrate is feature-complete on the deep-research audit's
  axis. Three real gaps remain — all host-operator concerns, not
  library concerns:

  - Managed deployment. Convex is a hosted product. Sync is a
    library; the absolutejs hosted PaaS is the right home for
    this. isolated-jsc shipped specifically to be its sandbox
    slot.
  - Strict determinism. Convex enforces it at the runtime layer.
    sync trusts the developer; opting into sandboxedHandler buys
    resource caps but not "no random / no real time" determinism.
    Forcing strict determinism on every handler is the wrong
    tradeoff for a library — the choice belongs to the host.
  - Managed multi-region with failover. Both bus adapters
    (sync-bus-pg + sync-bus-redis) work cross-region; the
    failover policy + DNS cutover + replication lag handling
    belong to the deployment layer, not the library.

  These are not "we forgot." They're the line between substrate
  and platform. The absolutejs.ai hosted PaaS picks them up.`;

export const substrateAuditNext = `# Where to start

  Per-package deep dives (every G-gap has a dedicated docs page):

    G1: /documentation/audit-overview
    G2: /documentation/telemetry-overview
    G4: /documentation/dispatch-overview
    G5: /documentation/cluster-bus-overview
    G6: /documentation/sync-vs-convex#replay
    G7: /documentation/sync-vs-convex#migrate

  Related substrate pages worth reading alongside:

    /documentation/queue-overview         — pluggable JobStore with
                                            Postgres / Redis adapters,
                                            instrumented for G1 + G2.
    /documentation/sync-overview          — the operator surface lives
                                            inside the main sync API
                                            table (1.22 / 1.23 / 1.24
                                            rows).

  Clickable demo of G6 + the operator surface: launch the sync
  example app (\`bun run dev\` in @absolutejs/examples/sync) and
  open the Devtools tab — datetime picker → Now → Replay round-
  trips through engine.replayTo with formatted JSON results.`;
