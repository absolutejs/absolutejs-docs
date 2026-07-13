// Code samples / quotes for the "We heard you" docs page.
// Each block is a community complaint, followed by sync's answer.

export const syncWeHeardYouBackends = `\
// The complaint (across the field):
//
//   - Zero is "Postgres-only" (rocicorp Zero docs, marmelab review Feb 2025)
//   - Convex is its own proprietary store
//   - InstantDB tradeoff: "you can't bring your own postgres (yet)"
//   - Liveblocks doesn't have a DB story at all
//   - Replicache is BYO-backend (you write the integration tax)
//
// sync's answer: first-class support for Postgres, MySQL, and SQLite, with
// real change-data-capture (binlog for MySQL, WAL for Postgres, changelog
// poll for SQLite). Bring your own ORM (Drizzle, Prisma) — or just SQL.

import { drizzleAdapter } from '@absolutejs/sync/drizzle';
import { postgresSource } from '@absolutejs/sync/postgres';
import { mysqlSource }    from '@absolutejs/sync/mysql';
import { sqliteSource }   from '@absolutejs/sync/sqlite';

// Pick the one you already have. Switch any time without rewriting handlers.
const source = postgresSource({ connectionString: process.env.DATABASE_URL });`;
export const syncWeHeardYouCrdt = `\
// The complaint:
//
//   Liveblocks ships Yjs — but hosted-only, billed per MAU, with the SDK
//   review noting "Yjs integration breakage on framework upgrades"
//   (liveblocks #2099 broke multi-window sync, #2973 Lexical desync,
//    #3394 Tiptap undo breaks).
//
//   Zero has "last-update-wins" as the observed conflict behavior —
//   "no documented conflict resolution strategy" (marmelab review).
//
// sync's answer: declare any field as a CRDT, pick your backend (RGA from
// the in-package /crdt module, or first-party @absolutejs/sync-yjs,
// /sync-automerge, /sync-loro adapters). Self-hosted, no MAU billing,
// no version-pinning roulette.

import { defineCollection } from '@absolutejs/sync/engine';
import { rgaText } from '@absolutejs/sync/crdt';

defineCollection({
  name: 'docs',
  fields: {
    title: 'string',
    body: rgaText(),        // ← declared CRDT; server merges concurrent edits
    // Or: yText() from @absolutejs/sync-yjs for Yjs binary deltas.
  },
});`;
export const syncWeHeardYouFrameworks = `\
// The complaint (Liveblocks SDK review by velt.dev, Oct 2025):
//
//   "Vue and Svelte examples wrap the low-level client but lack first-class
//    hooks or components. Angular and plain JavaScript require even more
//    scaffolding."
//
//   Zero is React/TS-only.
//
// sync's answer: idiomatic first-party bindings for React, Vue, Svelte, AND
// Angular. Same data model, same mutation API — the framework binding only
// touches the integration layer.

// React:        import { useSyncCollection } from '@absolutejs/sync/react';
// Vue:          import { useSyncCollection } from '@absolutejs/sync/vue';
// Svelte:       import { syncCollection } from '@absolutejs/sync/svelte';
// Angular:      import { provideSyncCollection } from '@absolutejs/sync/angular';

// Each binding ships an example in examples/sync — same demo, four frameworks.`;
export const syncWeHeardYouJoins = `\
// The complaint (ElectricSQL discussion #1608, 36 👍, 13 🚀):
//
//   "Include trees / joins are the #1 missing feature."
//
// Same complaint surfaced as PowerSync's entire Sync Streams pivot (their
// older Sync Rules YAML couldn't express joins), as Firestore's eternal
// "no joins, no aggregations" gripe, and as Convex's "you must fetch
// related documents by ID; hand-coded joins in JS get ugly fast."
//
// sync's answer: operator-graph queries with first-class left/outer joins.
// Reactive incrementally: when either side changes, the affected slice of
// the join re-materializes — not the whole graph.

import { defineGraphCollection } from '@absolutejs/sync/engine';

defineGraphCollection({
  name: 'tasks_with_owner',
  graph: (g) =>
    g.from('tasks')
     .leftJoin('users', { from: 'ownerId', to: 'id' })
     .select({ id: 'tasks.id', title: 'tasks.title', owner: 'users.name' }),
});

// Subscribers get one collection. Inserts on tasks OR users update it
// incrementally. No N+1, no client-side join code.`;
export const syncWeHeardYouPermissions = `\
// The complaint (Zero, twice):
//
//   Zero deprecated its RLS-based permissions API in release 0.23 and rewrote
//   to "synced queries" + custom mutators. That's TWO complete permissions
//   rewrites in <18 months. Users who built on the old API had to rebuild.
//
//   Convex team's own admission: "Auth story isn't as streamlined as for
//   Firebase or Supabase if you don't want to use Clerk or Auth0." Beta
//   Convex Auth is "client-side React/RN only" (HN #40020516).
//
//   InstantDB plans to push CEL down to SQL predicates as "future work" —
//   permissions today evaluate post-query on the result set.
//
// sync's answer: server-authored topics + server-authoritative mutations.
// Permissions are TypeScript, in the topic definition, with the full
// context object — no DSL, no rewrites looming.

import { defineTopic } from '@absolutejs/sync/engine';

defineTopic('user_notes', {
  matches: (row, ctx) => row.tenant === ctx.tenant,
  // Only rows matching this predicate ever leave the server for this client.
});

defineMutation({
  name: 'updateNote',
  handler: async (args, ctx, actions) => {
    // ctx is the authenticated session — same shape topics see.
    const note = await actions.update('notes', { id: args.id, ...args.patch });
    if (note.tenant !== ctx.tenant) throw new Error('cross-tenant write');
    return note;
  },
});`;
export const syncWeHeardYouPresence = `\
// The gap:
//
//   Zero "does NOT include real-time presence" — johnny.sh review, Apr 2026.
//   Apps that need cursors / "who's online" with Zero have to run additional
//   infrastructure for it.
//
//   Liveblocks ships presence — but as a separate billable product on top of
//   the storage one.
//
// sync's answer: presence is a primitive on the same WebSocket as your data.
// One hook on the client; one event handler on the server. No extra service.

// Server is implicit — presence runs on the existing syncSocket transport.

// Client:
import { useSyncPresence } from '@absolutejs/sync/react';

const Editor = ({ docId }) => {
  const { peers, setMyState } = useSyncPresence({
    url: 'ws://api/sync/ws',
    room: docId,
  });
  // peers is a live list of others in the same room, each with their state.
  // setMyState(\\{ cursor: { x, y } \\}) broadcasts to the room.
  // ...
};`;
export const syncWeHeardYouPricing = `\
// The complaints:
//
//   - Convex per-developer pricing: "I don't like to pay extra fees simply
//     because I have a new intern joining the team." (ocavue review, Jun 2025)
//
//   - Liveblocks doubled prices after year 1 — multiple customer testimonials
//     on velt.dev. MAU pricing punishes "thousands of occasional reviewers."
//
//   - Cloudflare D1 surprise: $5/month account got a $4,868 D1 invoice from
//     two buggy workers (littlebearapps blog, Jan 2026). No circuit breaker.
//
//   - Vercel Fluid Compute: "Developers with active workloads saw higher bills
//     due to tighter CPU tracking" (flexprice pricing breakdown).
//
//   - Firebase: "$70k bill in one day" stories on HN; Spencer Pauly: "Firestore
//     is optimizing to make their costs cheaper. Not yours."
//
// sync's answer: it's open source under CC BY-NC 4.0. You run it on your own
// infrastructure. The "price" is your existing server's CPU. No MAU, no
// per-dev, no per-operation, no surprise bills.
//
// (Commercial license available for closed-source / SaaS reuse — but the
// open default is what every solo dev, indie team, and OSS project gets.)`;
export const syncWeHeardYouReconnect = `\
// The complaint (Supabase Realtime, GitHub discussion #5641):
//
//   "The standard examples of starting a subscription and letting realtime
//    handle re-connections in the background will cause loss of data changes...
//    realtime code attempts to reconnect and resume BUT loses any updates on
//    server during this time."
//
// Same class of bug fired publicly across ElectricSQL's August 2025 reliability
// sprint and Firebase RTDB's 13-hour outage on a customer's main product.
// supabase-js #1204 was closed "not planned."
//
// sync's answer: every client tracks an appliedVersion. On reconnect, the
// client sends \`since: appliedVersion\`; the engine resolves the catch-up diff
// from its change log and pushes the missed range as a single bounded frame.

// Server (one-time setup):
import { createSyncEngine } from '@absolutejs/sync/engine';
const engine = createSyncEngine();
// Catch-up is on by default; no flag needed.

// Client (also default):
import { createSyncCollection } from '@absolutejs/sync/client';
const tasks = createSyncCollection({
  url: 'ws://api/sync/ws',
  collection: 'tasks',
});
// Background-tab disconnect, sleep mode, network flap — all handled.
// Catch-up cost is bounded ~4–6 ms regardless of how many writes were
// missed (validated in benchmarks/sync, reconnect-correctness lane).`;
export const syncWeHeardYouSandbox = `\
// The gap:
//
//   None of Convex / Zero / InstantDB / PowerSync / RxDB / Liveblocks /
//   ElectricSQL / TanStack DB ships sandboxed user-supplied mutations.
//
//   Convex actions are server-trusted code. Zero custom mutators are
//   server-trusted code. Replicache mutators are server-trusted code.
//   If you want to safely run mutation logic supplied by a tenant, an AI,
//   or a plugin author, you have to build the sandbox yourself.
//
// sync's answer: sandboxedHandler. String source runs inside an
// @absolutejs/isolated-jsc Isolate. Hard CPU + memory caps; no host module
// access; concurrent-safe by construction; sub-millisecond warm dispatch
// on FFI (benchmarks/sync RESULTS.md: 0.09 ms p50 worker, 0.33 ms p50 ffi).

import { defineMutation } from '@absolutejs/sync/engine';

defineMutation({
  name: 'addNote',
  sandboxedHandler: \`async (args, ctx, actions) => {
    if (typeof args.title !== 'string') throw new Error('bad title');
    await actions.insert('notes', {
      id: crypto.randomUUID(),
      title: args.title.trim(),
      tenant: ctx.tenant,
    });
  }\`,
  sandbox: { memoryLimit: 32, timeout: 5000 },
});

// Tenants can submit mutation source in a multi-tenant SaaS; AI agents
// can emit mutations against your engine; plugin authors can extend
// without redeploys. See /documentation/sync-sandbox.`;
export const syncWeHeardYouScheduled = `\
// The gap:
//
//   Liveblocks doesn't ship scheduled jobs. RxDB doesn't. PowerSync doesn't.
//   ElectricSQL doesn't. If you want cron-like behavior next to your data
//   layer, you bolt on a separate worker.
//
// sync's answer: @absolutejs/sync/scheduled. Cron-style jobs that run inside
// the same engine, with access to the same actions API as mutations, and
// the same per-job sandboxing if you opt in.

import { defineScheduled } from '@absolutejs/sync/scheduled';

defineScheduled({
  name: 'nightly-digest',
  cron: '0 6 * * *',           // 6am UTC daily
  handler: async (ctx, actions) => {
    const users = await actions.query('users WHERE digest = true');
    for (const u of users) await actions.insert('digests', { userId: u.id });
  },
});

// Or sandboxedHandler if the job's logic comes from a tenant / plugin / AI:
defineScheduled({
  name: 'tenant-rollup',
  cron: '0 * * * *',
  sandboxedHandler: \`async (ctx, actions) => { /* tenant code */ }\`,
  sandbox: { memoryLimit: 64, timeout: 30_000 },
});`;
export const syncWeHeardYouSelfHost = `\
// The complaint (the universal sync-engine pain):
//
//   - Convex single-node self-host: "the open-source backend only runs on a
//     single machine, which has limited scalability" (convex.sucks)
//   - Zero requires zero-cache server: "not optional... running alongside
//     Postgres adds infrastructure burden" (pkgpulse 2026)
//   - Liveblocks blocks production self-host entirely (liveblocks #682, open
//     since Feb 2023; official answer: "let us know, we'd love to partner")
//   - PowerSync requires its own Go/Node service
//   - ElectricSQL requires a proxy in front for auth
//
// sync's answer: one Elysia plugin. Runs in your existing Elysia server,
// alongside your other routes, using your existing process supervisor.
// No extra service to deploy, monitor, or scale separately.

import { Elysia } from 'elysia';
import { syncSocket } from '@absolutejs/sync';
import { createSyncEngine } from '@absolutejs/sync/engine';

const engine = createSyncEngine();
// ... register collections / mutations / scheduled jobs ...

new Elysia()
  .use(syncSocket({ engine }))     // <-- this is the whole infrastructure
  .listen(process.env.PORT);

// That's the deployment. Whatever you already do for an Elysia app — Docker,
// Fly, Render, bare metal, k8s — works unchanged.`;
