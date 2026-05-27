export const syncVsFirebaseTldr = `\
TL;DR mapping:

  Firebase / Firestore                    sync (@absolutejs/sync)
  ──────────────────────────────────────  ─────────────────────────────────────
  Firestore document / collection         Postgres/MySQL/SQLite row / table
  Hosted Google infrastructure            Your existing Elysia server
  Bills per read, write, GB, MAU          Free (CC BY-NC 4.0 OSS); your CPU
  No joins, no aggregations               Operator-graph joins + aggregates
  Security rules DSL (Firebase-specific)  TypeScript permissions on topics
  Offline persistence (mobile)            Local-first IndexedDB cache + queue
  onSnapshot(query, cb)                   useSyncCollection({ collection })
  doc.set(data)                           engine.runMutation('save', data)
  Hosted-only                             Self-hosted, on the infra you have
  Vendor lock-in (rewrite to leave)       Drop sync, keep your DB

If the answer to "what changed?" is just "the data layer," you can do
this migration without touching auth, the rest of your stack, or your
hosting model.`;

export const syncVsFirebaseListenerBefore = `\
// BEFORE — Firestore real-time listener.
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from './firebase';

useEffect(() => {
  const q = query(
    collection(db, 'tasks'),
    where('ownerId', '==', userId),
  );
  const unsubscribe = onSnapshot(q, (snap) => {
    setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
  return unsubscribe;
}, [userId]);`;

export const syncVsFirebaseListenerAfter = `\
// AFTER — sync collection subscription.
import { useSyncCollection } from '@absolutejs/sync/react';

const { data: tasks } = useSyncCollection({
  url: 'ws://localhost:3000/sync/ws',
  collection: 'tasks_for_owner',
  params: { ownerId: userId },
});

// Reconnect catch-up is on by default — the WebSocket re-resolves
// after background-tab sleep, network flap, etc., with bounded ~4-6 ms
// catch-up regardless of missed-writes count. No silent drops the way
// onSnapshot can on long disconnects.`;

export const syncVsFirebaseTopicServer = `\
// Server side — define the 'tasks_for_owner' collection ONCE.
// This is the bit Firestore's security rules + onSnapshot try to do
// implicitly; in sync it's an explicit TypeScript function you can
// test, log, and version-control.

import { defineCollection } from '@absolutejs/sync/engine';

defineCollection({
  name: 'tasks_for_owner',
  key: (row) => row.id,
  hydrate: ({ db, params }) =>
    db.all('tasks WHERE owner_id = ?', [params.ownerId]),
  match: (row, params, ctx) =>
    row.ownerId === params.ownerId && row.tenant === ctx.tenant,
});

// 'match' is the per-row predicate the engine re-evaluates on every
// change. Conceptually equivalent to a Firestore security rule, but
// in TypeScript with full context access — no DSL to learn.`;

export const syncVsFirebaseMutationBefore = `\
// BEFORE — Firestore write with offline persistence + optimistic UX.
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const addTask = async (text) => {
  // Optimistic UI happens "for free" via the local cache, but if the
  // write violates security rules the SDK silently rolls back with no
  // app-visible signal. You have to wire your own error handler.
  await setDoc(doc(db, 'tasks', crypto.randomUUID()), {
    text,
    ownerId: currentUser.uid,
    createdAt: serverTimestamp(),
  });
};`;

export const syncVsFirebaseMutationAfter = `\
// AFTER — sync mutation with optimistic draft.
const { mutate } = useSyncCollection({ url, collection: 'tasks_for_owner' });

const addTask = (text) => mutate({
  name: 'addTask',
  args: { text },
  optimistic: (draft) => {
    draft.set({ id: crypto.randomUUID(), text, ownerId: userId, n: 0 });
  },
});

// Server side — the handler authoritatively decides the id, timestamp,
// and any computed fields. If it throws, the optimistic draft rolls
// back AND the caller's promise rejects with the real error.

import { defineMutation } from '@absolutejs/sync/engine';

defineMutation({
  name: 'addTask',
  handler: async (args, ctx, actions) => {
    if (typeof args.text !== 'string' || args.text.length === 0) {
      throw new Error('text required');
    }
    return actions.insert('tasks', {
      id: crypto.randomUUID(),
      text: args.text.trim(),
      ownerId: ctx.userId,
      createdAt: actions.now(),
    });
  },
});`;

export const syncVsFirebaseCostExample = `\
// Spencer Pauly's canonical Firestore cost trap, re-costed on sync:
//
//   "20 posts shown on a feed cost 40 reads if not denormalized."
//   (1 read for the post + 1 read for the author = 2 reads × 20 posts)
//
// On Firestore Blaze:
//   - Reads: \$0.06 per 100k.
//   - 1M page views × 40 reads = 40M reads = \$24/month from this view ALONE.
//   - With a join you'd need: still 20 + 20 reads × 1M = same \$24.
//
// On sync, the equivalent is a graph collection with a left join:

import { defineGraphCollection } from '@absolutejs/sync/engine';

defineGraphCollection({
  name: 'feed_with_authors',
  graph: (g) =>
    g.from('posts')
     .leftJoin('users', { from: 'authorId', to: 'id' })
     .select({
       id: 'posts.id',
       title: 'posts.title',
       authorName: 'users.name',
     })
     .orderBy('posts.createdAt', 'desc')
     .limit(20),
});

// Cost: one Postgres query per page-load (or one push frame per change
// when a subscriber is live). On a \$5/month Hetzner box that
// comfortably serves 1M page views, your bill is \$5/month — flat,
// regardless of how many users see the feed.
//
// The actual feature you wanted ("posts with author names") is one
// declarative collection, not a denormalisation strategy you have to
// rebuild every time the schema changes.`;

export const syncVsFirebaseAuth = `\
// Auth is the one thing sync doesn't do — it's a data layer, not an
// identity provider. The migration pattern that fits 90% of teams:
//
//   1. Keep Firebase Auth as your identity provider (it's fine).
//   2. Validate the Firebase ID token in your Elysia server's auth
//      middleware (firebase-admin's verifyIdToken).
//   3. The verified token becomes the 'ctx' object sync sees on every
//      subscription and mutation.
//
// If you'd rather move auth too:
//
//   @absolutejs/auth ships OAuth (Google, GitHub, Apple, etc.),
//   credentials, MFA, sessions, and the Firebase-style 'just call
//   onAuthStateChanged' client primitive. Migration is independent of
//   the sync migration; do them in either order.

import { Elysia } from 'elysia';
import { syncSocket } from '@absolutejs/sync';
import { auth } from 'firebase-admin';

new Elysia()
  .derive(async ({ headers }) => {
    const token = headers['authorization']?.replace(/^Bearer /, '');
    if (!token) return { ctx: null };
    const decoded = await auth().verifyIdToken(token);
    return { ctx: { userId: decoded.uid, tenant: decoded.firebase?.tenant } };
  })
  .use(syncSocket({ engine }))
  .listen(3000);`;

export const syncVsFirebaseMigrationScript = `\
// One-shot migration: Firestore export → Postgres rows.
//
// Use firebase CLI to dump each collection to JSON (one doc per line),
// then stream into sync's destination DB through Drizzle/Prisma/raw SQL.
//
// Example: 'tasks' collection → 'tasks' Postgres table.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readFileSync } from 'node:fs';
import { tasks } from './schema';

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql);

// firebase firestore:export gs://my-bucket/dump
// gcloud storage cp -r gs://my-bucket/dump/all_namespaces/...tasks ./tasks
// jq -c '.documents[] | { id: .name, ...(.fields | with_entries(...)) }' \\
//   ./tasks/output-0 > tasks.jsonl

for (const line of readFileSync('./tasks.jsonl', 'utf8').trim().split('\\n')) {
  const doc = JSON.parse(line);
  await db.insert(tasks).values({
    id: doc.id,
    text: doc.text,
    ownerId: doc.ownerId,
    createdAt: new Date(doc.createdAt),
  }).onConflictDoNothing();
}

// Two pragmatic notes:
//
//  1. Run the migration with the Firebase site STILL LIVE; you're
//     copying, not migrating away yet. Re-run a tail-only delta when
//     you cut over.
//
//  2. Date/timestamp normalization is the most common gotcha. Firestore
//     timestamps come back as { _seconds, _nanoseconds }; convert to JS
//     Date or ISO string before the insert.`;
