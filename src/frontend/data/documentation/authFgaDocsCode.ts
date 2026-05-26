export const fgaCheck = `\
// Write relationships (warrants), then check or query — the schema's inheritance
// does the rest, so you don't write a warrant per permission.
await fga.writeWarrant({
  resourceType: 'document',
  resourceId: 'doc1',
  relation: 'owner',
  subjectType: 'user',
  subjectId: 'alice'
});
// doc1 lives in folder f1 (so it inherits f1's viewers):
await fga.writeWarrant({
  resourceType: 'document',
  resourceId: 'doc1',
  relation: 'parent',
  subjectType: 'folder',
  subjectId: 'f1'
});

// Check API — does alice have <relation> on doc1?
await fga.check({
  resourceType: 'document',
  resourceId: 'doc1',
  relation: 'viewer',
  subjectType: 'user',
  subjectId: 'alice'
}); // true: owner -> editor -> viewer

// Query API — who can view doc1? (expands every path, incl. group#member)
const viewers = await fga.listSubjects({
  resourceType: 'document',
  resourceId: 'doc1',
  relation: 'viewer'
});`;
export const fgaReverse = `\
// Reverse query — which documents can alice view? (the inverse of check)
const docs = await fga.listObjects({
  resourceType: 'document',
  relation: 'viewer',
  subjectType: 'user',
  subjectId: 'alice'
}); // -> ['doc1', ...]

// Author the schema in the OpenFGA-style DSL and parse it, instead of the
// object form. Grammar (one statement per line):
//   type document
//     relations
//       define owner: [user]
//       define editor: [user] or owner
//       define viewer: [user] or editor or viewer from parent
import { parseSchema } from '@absolutejs/auth';
const schema = parseSchema(dsl);`;
export const fgaSchema = `\
import { createFgaEngine, createNeonWarrantStore } from '@absolutejs/auth';
import type { FgaSchema } from '@absolutejs/auth';

// Relationship-based access control (the WorkOS FGA / Google Zanzibar model).
// Relations inherit: an editor is also a viewer; a doc inherits its folder's
// viewers (tupleToUserset); usersets (group#member) expand recursively.
const schema: FgaSchema = {
  document: {
    owner: { kind: 'self' },
    editor: {
      kind: 'union',
      rules: [{ kind: 'self' }, { kind: 'computedUserset', relation: 'owner' }]
    },
    viewer: {
      kind: 'union',
      rules: [
        { kind: 'self' },
        { kind: 'computedUserset', relation: 'editor' },
        { kind: 'tupleToUserset', viaRelation: 'parent', relation: 'viewer' }
      ]
    }
  },
  folder: { viewer: { kind: 'self' } }
};

export const fga = createFgaEngine({
  schema,
  warrantStore: createNeonWarrantStore(process.env.DATABASE_URL)
});`;
