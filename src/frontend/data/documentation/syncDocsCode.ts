export const syncCrdt = `\
import { rgaText } from '@absolutejs/sync/crdt';

// Server — declare a field as a CRDT; the engine merges on write instead of
// overwriting, and auto-registers a "doc:merge" mutation for the client.
engine.registerCrdt('doc', { body: rgaText });

// Client — useCollaborativeText reads/writes that field. Open the same row
// in two tabs and type at once: edits merge with no clobbering.
import { useCollaborativeText } from '@absolutejs/sync/react';

const Editor = () => {
  const doc = useCollaborativeText({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'doc',
    field: 'body',
    id: 'shared',
  });

  return (
    <textarea
      value={doc.text}
      onChange={(event) => doc.setText(event.target.value)}
    />
  );
};`;
export const syncCrdtBackends = `\
// Swap the in-package RGA for a production CRDT — same call sites:
import { yjsText } from '@absolutejs/sync-yjs';
// or
import { automergeText } from '@absolutejs/sync-automerge';
import { loroText } from '@absolutejs/sync-loro';

engine.registerCrdt('doc', { body: yjsText });

const doc = useCollaborativeText({
  url, collection: 'doc', field: 'body', id: 'shared',
  create: createYjsText,  // <- the only client change
});`;
export const syncPermissions = `\
import { definePermissions } from '@absolutejs/sync/engine';

const engine = createSyncEngine({
  permissions: definePermissions({
    tasks: {
      // Row-level read filter applied to every diff the engine emits.
      read: (row, ctx) => row.userId === ctx.userId,
      // Write gate runs before insert/update/delete; deny rolls the txn back.
      write: (ctx) => ctx.role !== 'viewer',
    },
  }),
});`;
export const syncQuickStartClient = `\
import { useSyncCollection } from '@absolutejs/sync/react';

const Tasks = () => {
  const { data, mutate } = useSyncCollection({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'tasks',
  });

  return (
    <ul>
      {data.map((task) => <li key={task.id}>{task.title}</li>)}
      <button onClick={() => mutate({
        name: 'addTask',
        args: { title: 'New task' },
        optimistic: (draft) => draft.set({
          id: crypto.randomUUID(),
          title: 'New task',
        }),
      })}>Add</button>
    </ul>
  );
};`;
export const syncQuickStartServer = `\
import { Elysia } from 'elysia';
import { syncSocket } from '@absolutejs/sync';
import {
  createSyncEngine,
  defineMutation,
  defineReactiveQuery,
} from '@absolutejs/sync/engine';

const engine = createSyncEngine();

// Teach the engine your table once — it powers read-set-tracked queries.
engine.registerReader('tasks', { all: () => [...store.values()] });
engine.registerWriter('tasks', {
  insert: (data) => { store.set(data.id, data); return data; },
  update: (data) => { store.set(data.id, data); return data; },
  delete: (row) => { store.delete(row.id); },
});

// A live collection: re-runs and re-pushes whenever the table changes.
engine.registerReactive(defineReactiveQuery({
  name: 'tasks',
  key: (task) => task.id,
  run: ({ db }) => db.all('tasks'),
}));

engine.registerMutation(defineMutation({
  name: 'addTask',
  handler: (args, _ctx, actions) =>
    actions.insert('tasks', { id: crypto.randomUUID(), title: args.title }),
}));

new Elysia().use(syncSocket({ engine })).listen(3000);`;
export const syncScheduled = `\
import { defineSchedule } from '@absolutejs/sync/engine';
import { scheduled } from '@absolutejs/sync/scheduled';

engine.registerSchedule(defineSchedule({
  name: 'nightly-summary',
  pattern: '0 0 3 * * *',          // 6-field cron, seconds first
  run: ({ actions }) => actions.insert('reports', { /* ... */ }),
}));

new Elysia().use(syncSocket({ engine })).use(scheduled({ engine }));`;
export const syncSearch = `\
import { createTextIndex, defineSearchCollection } from '@absolutejs/sync/engine';

// Live full-text search (BM25) kept current from the same change feed.
engine.registerSearch(defineSearchCollection({
  name: 'taskSearch',
  table: 'tasks',
  source: () => [...store.values()],
  key: (task) => task.id,
  index: () => createTextIndex({
    fields: ['title', 'body'],
    key: (task) => task.id,
  }),
}));

// Client subscribes; the params ARE the query string. Top-K rows stream back
// re-ranked as rows change, each tagged with _score.
const hits = useSyncCollection({
  collection: 'taskSearch',
  params: 'urgent',
  url,
});`;
