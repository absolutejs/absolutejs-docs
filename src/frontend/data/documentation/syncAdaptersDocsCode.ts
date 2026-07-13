export const syncAdaptersAutomerge = `\
import { automergeText, createAutomergeText } from '@absolutejs/sync-automerge';

engine.registerCrdt('issues', { body: automergeText });

const doc = useCollaborativeText({
  url, collection: 'issues', field: 'body', id,
  create: createAutomergeText,
});

// State = base64 of an Automerge doc. Notes:
// - The 'replica' option is accepted for contract symmetry; Automerge manages
//   actor identity internally.
// - Mutators concurrently creating the SAME top-level key on independent docs
//   can fork; the empty() snapshot is the shared base so clients load it for
//   a common root.`;
export const syncAdaptersContract = `\
// The contract every backend (first-party rgaText included) implements:
import type { CrdtText, TextCrdtAdapter, CrdtMergeable } from '@absolutejs/sync/crdt';

// What the engine needs server-side to auto-merge a CRDT field on write:
type CrdtMergeable<State> = {
  empty: () => State;
  merge: (a: State, b: State) => State;
};

// What a collaborative-text backend exposes:
type TextCrdtAdapter<State> = CrdtMergeable<State> & {
  create: (replica: string, initial?: State) => CrdtText<State>;
  textOf: (state: State) => string;
  compact?: (state: State) => State;       // optional, for GC-style backends
};

// The live doc the client controller drives:
type CrdtText<State> = {
  text: () => string;
  setText: (next: string) => void;
  merge: (state: State) => void;
  state: () => State;
  takeDelta?: () => State;                  // optional; the controller falls
                                            // back to state() when missing
};`;
export const syncAdaptersLoro = `\
import { loroText, createLoroText } from '@absolutejs/sync-loro';

engine.registerCrdt('issues', { body: loroText });

const doc = useCollaborativeText({
  url, collection: 'issues', field: 'body', id,
  create: createLoroText,
});

// State = base64 of a Loro snapshot. Loro is a fast Rust/wasm CRDT;
// importing a snapshot or update into a doc merges. The 'replica' option is
// accepted for contract symmetry; Loro assigns a peer id internally.`;
export const syncAdaptersYjs = `\
import { yjsText, createYjsText } from '@absolutejs/sync-yjs';

// Server
engine.registerCrdt('issues', { body: yjsText });

// Client — only the create factory changes
const doc = useCollaborativeText({
  url, collection: 'issues', field: 'body', id,
  create: createYjsText,
});

// State serialises as a base64 Yjs update (JSON-safe for the change feed).
// takeDelta is implemented via Y.encodeStateAsUpdate(doc, lastVector) and the
// vector advances on merge — remote ops aren't re-broadcast.`;
