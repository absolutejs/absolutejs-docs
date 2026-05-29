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
    // 0.3 — typing state with a TTL inside state.typingExpiresAt.
    typingTtlSec: 5,
  }),
);

// The engine now exposes:
//   - 'presence'              (collection — subscribe with { channel })
//   - 'presence:heartbeat'    (mutation)
//   - 'presence:cursor'       (mutation — patches state.cursor)
//   - 'presence:typing'       (mutation — patches state.typing + .typingExpiresAt)
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
// Composition rule: packs read each other's collections, packs MUST NOT
// call each other's mutations. Cross-pack data flows through the change
// feed, not the call graph — that's the structural difference from
// Convex Components, and the reason a pack can be swapped or removed
// without rippling through every dependent pack.

// ─── (1) The subscription seam ─────────────────────────────────────────
// A docs feature can subscribe to the presence collection to render
// typing/cursor indicators without ever importing presence's mutations:
const inDoc = await engine.subscribe({
  collection: 'presence',
  params: { channel: docId },
  ctx,
  onDiff: rerenderTypingIndicators,
});

// ─── (2) The host-callback seam ────────────────────────────────────────
// Some packs (mentions, audit, …) need to fan OUT to other packs at
// write time. The pattern: the pack exposes a typed hook in its config,
// and the HOST closes over the engine to call a sister pack's mutation.
// The pack itself stays unaware of any other pack.
engine.registerPack(
  createMentionsPack({
    getActorId: (ctx) => ctx.session.userId,
    resolveActorId: async (username) => userIdByUsername(username),
    onMention: async ({ mention }, ctx) => {
      // Host wiring — mentions never imports notifications.
      await engine.runMutation(
        'notifications:notify',
        {
          actorId: mention.mentionedActorId,
          kind: 'mention',
          title: 'You were mentioned',
          body: mention.snippet,
          href: \`/comments/\${mention.sourceId}\`,
        },
        { systemTrusted: true, userId: mention.authorId ?? undefined },
      );
    },
  }),
);

// A doc-pack handler that called \`presence:heartbeat\` directly would
// couple the two packs at runtime — the lock-in shape we avoid.`;

export const syncPacksFavoritesPin = `\
// Pack feature evolution stays inside the pack's npm semver — the
// engine doesn't need to know about new mutations. Example: favorites 0.2
// adds a pinning surface alongside the existing favorite/unfavorite/toggle.
engine.registerPack(
  createFavoritesPack<Ctx, Task>({
    getActorId: (ctx) => ctx.userId,
    joinResources: { table: 'tasks', hydrate: () => allTasks() },
  }),
);

// Mutations now on the engine (0.2):
//   - 'favorites:favorite'    { resourceKind, resourceId }
//   - 'favorites:unfavorite'  { resourceKind, resourceId }
//   - 'favorites:toggle'      { resourceKind, resourceId }
//   - 'favorites:pin'         { resourceKind, resourceId }   // NEW
//   - 'favorites:unpin'       { resourceKind, resourceId }   // NEW
//   - 'favorites:togglePin'   { resourceKind, resourceId }   // NEW

// Row shape adds a single nullable field; the client sorts pinned-first:
type FavoriteRow = {
  id: string;
  resourceKind: string;
  resourceId: string;
  actorId: string;
  createdAt: number;
  pinnedAt: number | null;   // NEW
};`;
