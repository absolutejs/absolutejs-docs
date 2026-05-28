export const syncPacksRegister = `\
// One install, one register call — the pack handles its own schema,
// permissions, readers/writers, collections, mutations, and schedules.
import { createSyncEngine } from '@absolutejs/sync/engine';
import { createPresencePack } from '@absolutejs/sync-pack-presence';

const engine = createSyncEngine();
engine.registerPack(
  createPresencePack({
    getActorId: (ctx) => ctx.session.userId,
    scope: (ctx) => ctx.session.workspaceId,
    heartbeatTtlSec: 30,
  }),
);

// The engine now exposes:
//   - 'presence'              (collection — subscribe with { channel })
//   - 'presence:heartbeat'    (mutation)
//   - 'presence:leave'        (mutation)
//   - 'presence:cleanup'      (cron-fired schedule)`;

export const syncPacksAuthor = `\
// Anatomy of a pack — same shape as createSyncEngine's options, plus
// ownership metadata for conflict detection.
import {
  defineCollection,
  defineMutation,
  defineSchedule,
  defineSchema,
  defineSyncPack,
  field,
  type SyncPack,
} from '@absolutejs/sync/engine';

export const createMyPack = (config: MyPackConfig): SyncPack => {
  const table = \`\${config.prefix ?? ''}my_table\`;
  const getActorId = config.getActorId ?? ((ctx) => ctx.userId);

  return defineSyncPack({
    name: '@yourorg/sync-pack-my-feature',
    version: '0.1.0',
    ownsTables: [table],
    // ...
    schemas: defineSchema({
      [table]: { fields: { id: field.string } },
    }),
    permissions: {
      [table]: {
        read: (ctx, row) => true,
        insert: (ctx, row) => row.authorId === getActorId(ctx),
      },
    },
    collections: [defineCollection({ name: table } as any)],
    mutations: [defineMutation({ name: 'my:do' } as any)],
    schedules: [defineSchedule({ name: 'my:tick' } as any)],
  });
};`;

export const syncPacksFactoryPattern = `\
// Every published pack ships as a FACTORY, not a static record. The
// factory takes the host's namespacing + auth shape and returns a
// SyncPack. This is why two packs can both want a 'users' table without
// conflict — the prefix scopes the names; the engine never rewrites them.
export type MyPackConfig<Ctx> = {
  // Owns-tables prefix; also applied to collection/mutation/schedule names.
  prefix?: string;

  // The ONLY contract the pack assumes about app ctx.
  getActorId?: (ctx: Ctx) => string | undefined;

  // Optional tenant / workspace scope.
  scope?: (ctx: Ctx) => string | null;

  // Pack-specific config goes here (TTL, cron, retries, ...).
  heartbeatTtlSec?: number;
};

// Hosts run two instances of the same pack on one engine via prefix:
engine.registerPack(createPresencePack({ prefix: 'docs_', /* ... */ }));
engine.registerPack(createPresencePack({ prefix: 'chat_', /* ... */ }));
// Tables: docs_presence + chat_presence — no collision.`;

export const syncPacksComposition = `\
// Composition rule (enforced socially, not technically): packs read each
// other's collections, packs MUST NOT call each other's mutations.
//
// ✅ A docs pack subscribes to the presence collection:
const inDoc = await engine.subscribe({
  collection: 'presence',
  params: { channel: docId },
  ctx,
  onDiff: rerenderTypingIndicators,
});

// ❌ A docs pack handler that called presence's mutation:
//      await engine.runMutation('presence:heartbeat', /* ... */);
// would couple the two packs at runtime — exactly the lock-in shape we
// avoid. Cross-pack data flows through the change feed, not the call
// graph.`;
