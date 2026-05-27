/**
 * Content for the "Sync vs Convex" docs page. Each export is a single block
 * of text that gets rendered via PrismPlus as a code block. We keep the
 * comparison tables as monospaced ASCII (the same convention as
 * `syncJobsConvexMap` already in syncActionsJobsDocsCode.ts).
 *
 * Tone: honest both-ways. Convex is a great product and we built much of
 * sync standing on shoulders Convex shaped (cross-client query coalescing,
 * mutations-as-transactions, deterministic handlers as the safe path).
 * This page documents where sync is and where it isn't today.
 */

export const syncVsConvexMatrix = `# Feature parity matrix

  Feature                          | Convex             | sync               | Notes
  ─────────────────────────────────|────────────────────|────────────────────|─────
  Reactive subscriptions           | ✓                  | ✓                  | same mental model
  Server-authored mutations        | ✓                  | ✓                  | mutations are the only way to write
  Automatic dependency tracking    | ✓                  | ✓                  | read-set + invalidation
  Optimistic mutations             | ✓                  | ✓                  |
  Cross-client query coalescing    | ✓                  | ✓ (1.3)            | "one query body per (code, params, read-set)"
  Local-first / offline            | ✓                  | ✓ (Tier 2)         | catch-up via change log on reconnect
  Built-in permissions             | ✓                  | ✓                  | row-level + per-mutation authorize
  Live search                      | ✓                  | ✓                  | text + vector indexes
  Scheduled functions / cron       | ✓                  | ✓                  | @elysiajs/cron + registerSchedule
  CRDT collaboration               | third-party        | first-party (/crdt)| RGA text + LWW reg + PN-counter + adapters
  Schema validation                | runtime-enforced   | declare + enforce  | defineSchema + field()
  Devtools / inspector             | dashboard          | engine.inspect()   | console + recent changes
  Sandboxed handler execution      | always-on (V8)     | opt-in (1.4)       | sandboxedHandler + @absolutejs/isolated-jsc
  Determinism guarantees           | strict (managed)   | developer-owned    | sync trusts the developer; sandbox is opt-in
  DB choice                        | Convex DB only     | any                | Postgres, MySQL, SQLite, Drizzle, Prisma
  Handler language                 | JS only            | any host code      | TS, async, host imports, your runtime
  Time-travel queries              | ✓                  | ⨯ (Tier 3)         | not yet
  Multi-region replication         | managed            | DIY                | host-level concern, no managed offering
  Hosting model                    | managed only       | self-host          | managed PaaS planned (uses isolated-jsc)`;

export const syncVsConvexSharedModel = `# What's the same: the shared mental model

  Both engines collapse "store + cache + invalidation + push" into one
  abstraction.

  - Clients subscribe to a query. The engine returns the initial result
    and pushes updates whenever anything that query depends on changes.
  - Writes go through server-authored mutations. The mutation transacts
    against the durable store and emits the changes; subscribers see them
    atomically after commit.
  - Dependency tracking is automatic. The engine notes what tables/keys
    a query read, and only re-runs (or invalidates) when something in
    that read-set is written.
  - Mutation results are pushed back to the calling client as the ack,
    so the optimistic edit can settle against authoritative state.

  If you've used Convex, sync's API will feel familiar. Where the two
  diverge is *under* that surface — see "What's different" below.`;

export const syncVsConvexArchitectureFork = `# What's different: where the engine runs

  Convex
  ──────
  - Managed runtime. Hosted V8 isolates with seeded ChaCha12 RNG and a
    frozen Date.now() inside mutations. Every mutation is automatically
    deterministic, retryable, and replayable.
  - JS-only mutation handlers. The runtime decides what your handler
    can reach.
  - Convex's own database under the runtime. Replication, point-in-time
    recovery, multi-region failover are theirs to operate.
  - One product. You opt in or out; there's no piecemeal.

  sync
  ────
  - A library you import. Runs on your Bun (or Node) process, alongside
    your other Elysia routes. No managed control plane.
  - Mutation handlers are arbitrary host JS — TypeScript, async, with
    access to anything you've imported. Fast, full-power, no sandbox by
    default.
  - Brings your own DB. First-party adapters for Postgres / MySQL /
    SQLite, plus Drizzle and Prisma. The engine treats your DB as the
    source of truth; replication / backups / regions are your choice
    (same way you'd run a normal Elysia app).
  - Pick the pieces you need. Use just reactive subscriptions, or add
    CRDT, search, scheduled jobs, cluster bus, sandboxing — each is
    opt-in via a sub-package.

  Both shapes are valid. Convex trades flexibility for guarantees;
  sync trades guarantees for flexibility (with opt-in ways to claw the
  guarantees back when you want them).`;

export const syncVsConvexWireDiff = `# The architectural gap we closed: row-level diffs vs full results

  Convex pushes the full query result on every change (long-tracked
  upstream — see get-convex/convex-backend#95). sync emits row-level
  diff frames: { added, removed, changed }.

  Measured against an N-row reactive query, one row changed per push:

    K (rows)   | Convex per-push      | sync per-push      | ratio
    ───────────|──────────────────────|────────────────────|──────
    100        | 12.4 KB              | 118 B              | 105×
    1,000      | 116.3 KB             | 118 B              | 986×
    5,000      | 577.1 KB             | 118 B              | 4,888×

  Same workload, same Convex deployment, same sync engine. Sync's wire
  format encodes only the delta; the client reconciles into its local
  store. (Convex's #95 also notes a 8192-element cap on array returns
  and a 4096-read cap per function — neither applies to sync.)`;

export const syncVsConvexCrossClientCache = `# The cross-client query cache (sync 1.3)

  Convex's "one query body per (query code, parameters, database read
  set) executes only once" coalescing is what makes their cost model
  work at scale. Sync had the prerequisites already (read-set tracking,
  stable sub-keys) since 1.0. 1.3 lifted the existing per-batch dedup
  to a persistent LRU + TTL cache shared across batches.

  Subscribe-storm bench — N fresh subscribers to the same query:

    N           | DB hits, cache off  | DB hits, cache on (default)
    ────────────|─────────────────────|────────────────────────────
    100         | 100                 | 1
    1,000       | 1,000               | 1
    10,000      | 10,000              | 1

  Configure via createSyncEngine({ reactiveCache: { max, ttlMs } }).
  Defaults are bounded (256 entries, 60s TTL). Different ctx references
  stay isolated, so per-user query bodies aren't accidentally shared.`;

export const syncVsConvexSandbox = `# Sandboxed handlers (sync 1.4)

  Convex's V8-isolate model means every handler is sandboxed by default
  — that's the price of admission and also the guarantee. Sync goes the
  other way: handlers are normal JS by default (~50 ns per call, full
  host access, integrate with anything), and you opt INTO sandboxing
  per-mutation when you need it.

  defineMutation({
    name: 'transfer',
    sandbox: { memoryLimit: 32, timeout: 1000 },
    sandboxedHandler: \`async (args, ctx, actions) => {
      await actions.update('accounts', { id: args.from, balance: ... });
      await actions.update('accounts', { id: args.to, balance: ... });
    }\`,
  });

  Sandboxed handlers run inside @absolutejs/isolated-jsc — a Bun-native
  JavaScriptCore Isolate with a separate heap. First call per mutation
  pays ~30 ms (Worker spawn + compile). Every subsequent call reuses
  the isolate at ~0.5 ms. Timeout terminates the isolate; the next call
  transparently re-spawns. @absolutejs/isolated-jsc is an OPTIONAL peer
  dep — only loaded when the first sandboxed mutation runs.

  Built because isolated-vm is V8-only and doesn't load in Bun (Bun
  uses JavaScriptCore, not V8 — see oven-sh/bun#23653). The library
  fills that gap; sync wires it.

  Use sandboxedHandler when:
  - The handler source is user-supplied (multi-tenant PaaS, plugins).
  - The source is AI-generated and you need hard caps before running.
  - You want defense-in-depth resource limits on your own first-party
    handlers (capped CPU/memory keeps a runaway from taking the engine
    down).`;

export const syncVsConvexGaps = `# What sync doesn't have yet

  Honest list of where Convex is ahead and we haven't caught up:

  - Time-travel queries. Convex lets you snapshot any past commit and
    read against it. Sync's change log makes this technically possible
    but the read API isn't there yet (Tier 3 plan item).
  - Managed deployment. Convex is a hosted product. Sync is a library;
    the absolutejs hosted PaaS is planned (and isolated-jsc was built
    to power its sandbox slot).
  - Strict determinism. Convex enforces it; sync trusts you (unless
    you opt into sandboxedHandler, where the sandbox enforces resource
    caps but not "no random / no real time" determinism).
  - Multi-region with managed failover. Convex handles this for you;
    in sync this is a deployment choice (Postgres logical replication +
    a cluster bus per region works, but you operate it).
  - A dashboard. Convex has a polished console. Sync has
    engine.inspect() + engine.onActivity(...) for tooling-via-code,
    but no first-party UI.`;

export const syncVsConvexPickEach = `# When to pick each

  Pick Convex if:
  - You want one managed product end-to-end.
  - JS-only mutation handlers are fine.
  - You don't need to choose your database — Convex's is good and
    you'd rather not operate one.
  - You want time-travel queries today.
  - You want strict determinism guaranteed by the runtime, with no
    developer responsibility for it.
  - You're not running Bun (Convex doesn't run on Bun specifically;
    it has its own runtime).

  Pick sync if:
  - You already have a database (Postgres / MySQL / SQLite) and want
    to keep it as the source of truth.
  - You want your handlers to be normal TS code with access to your
    other libraries and your own runtime.
  - You want first-party CRDT support with pluggable backends (Yjs,
    Automerge, Loro).
  - You want to use sandboxing on some handlers (untrusted source,
    PaaS, AI-generated) but not pay the cost on the fast path.
  - You're running on Bun and want native primitives.
  - You want to host it yourself (or wait for the absolutejs PaaS).

  Neither answer is wrong. The decision is mostly about whether the
  managed-runtime / managed-DB trade is one you want.`;

export const syncVsConvexHonestyFooter = `# Honest framing

  Sync started six days ago (first commit 2026-05-23). Convex is years
  old, well-funded, with a real team. This page records what we've
  shipped and where the trade-offs land today; it's not a verdict on
  the products.

  We were able to close most of the architectural gaps quickly because:
  - We didn't have to commit to backwards compat. Convex has paying
    customers; we can move fast on shape.
  - We don't host the DB. They have to design for multi-region; we
    delegate that to your existing infra.
  - The CRDT story was already shipped in absolutejs (/crdt) before
    sync started, so we slotted in.
  - Convex's gaps are well-tracked in their public issue tracker
    (#95, etc) — we had the targets written down.

  The gaps we still have (time-travel, managed deployment, strict
  determinism) are real and not artifacts of "we're new." They'll
  take real time to close. We're documenting them honestly here so
  you can plan.`;
