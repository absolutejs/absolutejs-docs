export const syncCrdtAdapters = `\
// Swap the first-party RGA for a production CRDT — same call sites.
import { yjsText } from '@absolutejs/sync-yjs';
// or '@absolutejs/sync-automerge', '@absolutejs/sync-loro'

engine.registerCrdt('issues', { body: yjsText });

import { createYjsText } from '@absolutejs/sync-yjs';
const doc = useCollaborativeText({
  url, collection: 'issues', field: 'body', id,
  create: createYjsText,           // <- the only client change
});

// Yjs also supports delta uploads via the same takeDelta surface — the adapter
// implements it through Y.encodeStateAsUpdate(doc, lastVector) and advances
// the vector on merge, so remote ops aren't re-broadcast.`;
export const syncCrdtCompact = `\
// RGA tombstones accumulate as text is deleted. compact() drops tombstones
// that no live element anchors to (visible text unchanged):

const state = doc.state();
console.log(tombstoneCount(state));      // 6,234
const smaller = compact(state);
console.log(tombstoneCount(smaller));    // 0 (for unreferenced tombstones)

// Safe on the canonical server state. The linearizer also re-roots orphans
// deterministically, so a stale client referencing a compacted tombstone
// never loses content.`;
export const syncCrdtCursors = `\
// A caret at a raw integer index drifts when others edit before it. Anchor it
// to a CRDT element id and it tracks the right spot through concurrent edits.

const anchor = doc.anchorAt(textarea.selectionStart);
// broadcast over presence:
presence.set({ name, anchor });

// render remote carets:
for (const member of presence.members) {
  const col = doc.indexOfAnchor(member.state.anchor);
  paint(member.state.name, col);
}`;
export const syncCrdtDelta = `\
// Without delta uploads: every keystroke broadcasts the WHOLE document.
// With delta uploads: every keystroke broadcasts O(edit) — just the new ops.
// The controller does this automatically; the data structure exposes takeDelta:

const doc = createTextCrdt('replica-a');
doc.setText('hello world');
const delta = doc.takeDelta();       // only the new elements
const remote = createTextCrdt('replica-b');
remote.merge(delta);                 // partial state merges exactly like full
console.log(remote.text());          // 'hello world'

// Measured: at 10,000 chars, full-state upload is ~877 KB; delta is ~105 B —
// an 8,350× reduction. See the bench in absolutejs/benchmarks#sync.`;
export const syncCrdtHook = `\
import { useCollaborativeText } from '@absolutejs/sync/react';

const Description = ({ issueId }: { issueId: string }) => {
  const doc = useCollaborativeText({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
    field: 'body',
    id: issueId,
  });

  return (
    <textarea
      value={doc.text}
      onChange={(e) => doc.setText(e.target.value)}
    />
  );
};`;
export const syncCrdtKit = `\
import {
  counter,           // PN-counter (concurrent +/-)
  lww,               // LWW register
  orSet,             // observed-remove set (add-wins on concurrent add/remove)
  lwwMap,            // per-key LWW map (delete = tombstone, can lose to a later set)
  createList,        // ordered-list RGA over arbitrary items
  createTextCrdt,    // RGA collaborative text (used by useCollaborativeText)
  textOf,
  mergeTextState,
  compact,
  tombstoneCount,
  type TextState,
} from '@absolutejs/sync/crdt';

// Every type is a pure CvRDT: merge is commutative + associative + idempotent.
// They serialise as JSON, so they ride the engine's change feed as row fields.

let cart = orSet.create<string>();
cart = orSet.add(cart, 'item-1');
cart = orSet.add(cart, 'item-2');
console.log(orSet.values(cart));   // ['item-1', 'item-2']

let prefs = lwwMap.create<string>();
prefs = lwwMap.set(prefs, 'theme', 'dark', 'replica-a', Date.now());
console.log(lwwMap.get(prefs, 'theme'));   // 'dark'`;
export const syncCrdtRegister = `\
import { rgaText } from '@absolutejs/sync/crdt';

// Declare 'body' a CRDT field on the issues table. The engine MERGES it on
// every actions.insert/update (instead of overwriting), and auto-registers a
// 'issues:merge' upsert mutation the client hook calls.
engine.registerCrdt('issues', { body: rgaText });`;
