import { ComparisonRow } from '../../components/utils/ComparisonTable';

export const syncVsFirebaseAuthBridge = `\
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
export const syncVsFirebaseCostColumns = ['Firestore Blaze', 'sync'];
export const syncVsFirebaseCostGraph = `\
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
});`;
export const syncVsFirebaseCostRows: ComparisonRow[] = [
	{
		feature: 'Cost of one feed load (20 posts + author names)',
		values: [
			'40 reads (1 read for the post + 1 read for the author = 2 reads × 20 posts)',
			'One Postgres query per page-load (or one push frame per change when a subscriber is live)'
		]
	},
	{
		feature: 'Pricing model',
		values: [
			'Reads: $0.06 per 100k',
			'A $5/month Hetzner box comfortably serves 1M page views'
		]
	},
	{
		feature: '1M page views / month',
		note: "With a join you'd need: still 20 + 20 reads × 1M = same $24.",
		values: [
			'40M reads = $24/month from this view alone',
			'$5/month — flat, regardless of how many users see the feed'
		]
	}
];
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
export const syncVsFirebaseMigrationScript = `\
// One-shot migration: 'tasks' Firestore collection → 'tasks' Postgres table.

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
}`;
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
export const syncVsFirebaseOperatorColumns = ['sync'];
export const syncVsFirebaseOperatorRows: ComparisonRow[] = [
	{
		feature:
			'Point-in-time recovery (PITR) — managed, 7-day window, Firestore Standard / Enterprise',
		values: [
			'engine.replayTo({ at, tables? }) (1.22). Bounded change log; retention is yours to configure (changeLogRetainMs). The syncDevtools Replay panel (1.23) is the clickable demo.'
		]
	},
	{
		feature:
			'Cloud Firestore Managed Export/Import (GCS buckets, operator console)',
		values: [
			'engine.fence({ reason }) + exportSnapshot() + importSnapshot() (1.24). Three composable verbs the host choreographs — no "spin up the export job, wait, restore" loop.'
		]
	},
	{
		feature: 'Firestore Audit Logs (Cloud Logging, retention by org)',
		values: [
			'@absolutejs/audit + withIntegrity (hash-chain tamper evidence; SHA-256 or HMAC-SHA256)'
		]
	},
	{
		feature: 'Cloud Trace / Cloud Monitoring',
		values: [
			'OTel spans across every substrate package via @absolutejs/telemetry — wire ONE TracerProvider, every package emits.'
		]
	}
];
export const syncVsFirebaseTldrColumns = ['sync (@absolutejs/sync)'];
export const syncVsFirebaseTldrRows: ComparisonRow[] = [
	{
		feature: 'Firestore document / collection',
		values: ['Postgres/MySQL/SQLite row / table']
	},
	{
		feature: 'Hosted Google infrastructure',
		values: ['Your existing Elysia server']
	},
	{
		feature: 'Bills per read, write, GB, MAU',
		values: ['Free (CC BY-NC 4.0 OSS); your CPU']
	},
	{
		feature: 'No joins, no aggregations',
		values: ['Operator-graph joins + aggregates']
	},
	{
		feature: 'Security rules DSL (Firebase-specific)',
		values: ['TypeScript permissions on topics']
	},
	{
		feature: 'Offline persistence (mobile)',
		values: ['Local-first IndexedDB cache + queue']
	},
	{
		feature: 'onSnapshot(query, cb)',
		values: ['useSyncCollection({ collection })']
	},
	{
		feature: 'doc.set(data)',
		values: ["engine.runMutation('save', data)"]
	},
	{
		feature: 'Hosted-only',
		values: ['Self-hosted, on the infra you have']
	},
	{
		feature: 'Vendor lock-in (rewrite to leave)',
		values: ['Drop sync, keep your DB']
	}
];
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
