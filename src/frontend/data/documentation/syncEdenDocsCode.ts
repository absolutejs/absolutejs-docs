export const syncEdenClient = `import { treaty } from '@elysiajs/eden';
import type { App } from '../server'; // type-only — no server code shipped
import { syncStore } from '@absolutejs/sync/client';

const api = treaty<App>('localhost:3000');

const orders = syncStore({
  // Eden-typed: row type inferred from the GET return
  hydrate: () => api.sync.orders.get({ query: { userId } }),
  // Eden-typed: args + result inferred from the POST signature
  mutate: (a) => api.sync.createOrder.post(a),
  // Live diffs over the WS — the diff frame's row shape matches \`hydrate\`
  diffs: { collection: 'orders', params: { userId } }
});

orders.subscribe((s) => render(s.data)); // s.data: Order[] — types via Eden

await orders.mutate(
  { total: 42 },
  { optimistic: (d) => d.set({ id: tmp, status: 'open' }) }
);`;
export const syncEdenLayering = `// Concern                                   | Owner
// ────────────────────────────────────────  | ──────────────────────────────
// Types over the wire + runtime validation  | Eden + TypeBox (\`t\`)
// One-shot read (hydrate) + mutate          | Elysia routes (Eden-typed)
// Live { added, removed, changed } diffs    | syncSocket (WebSocket)
// Local reactive cache / optimism / offline | syncStore (client)`;
export const syncEdenOpenAPI = `// absolute.config.ts — openapi is on by default in dev. Customize for prod:
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  openapi: {
    documentation: {
      title: 'My app',
      description: 'Live API + sync surfaces'
    },
    provider: 'scalar' // or 'swagger'
  }
});

// In dev: visit http://localhost:3000/openapi for the Scalar UI.
// Every Elysia route you declared shows up — including the sync hydrate /
// mutate routes — with their TypeBox schemas, parameters, and response
// types. No extra wiring; @absolutejs/absolute mounts @elysiajs/openapi
// for you.`;
export const syncEdenReconnect = `// The runtime model under \`syncStore\`:
//
// - Confirmed state comes from the WS (\`syncSocket\`): a snapshot on
//   subscribe, then ordered diffs.
// - Mutations go over Eden HTTP (typed). \`syncStore\` applies an
//   optimistic overlay, awaits the call, then reconciles:
//     - on reject, rolls back the overlay
//     - on resolve, drops the overlay once the WS diff has reflected
//       the touched keys (with a short grace fallback)
// - Offline: pending \`mutate\` calls are queued and replayed on
//   reconnect; optional durable storage survives reload.
// - Version cursor: snapshots + diffs carry a monotonic version; on
//   reconnect the client resumes from \`since\`, the engine replays
//   a catch-up diff (falls back to snapshot if the log can't cover
//   the gap).
//
// No flickers, no double-applies, no manual reconciliation. All types
// flow from \`typeof app\` through Eden.`;
export const syncEdenServer = `import { Elysia, t } from 'elysia';
import {
  createSyncEngine,
  defineMutation,
  hydrateRoute,
  mutateRoute
} from '@absolutejs/sync/engine';
import { syncSocket } from '@absolutejs/sync';
import { prismaCollection } from '@absolutejs/sync/prisma';

const engine = createSyncEngine();

const orders = prismaCollection({
  name: 'orders',
  where: (p: { userId: number }) => ({ userId: p.userId, status: 'open' }),
  find: (where) => prisma.order.findMany({ where }),
  authorize: (p, ctx: { userId: number }) => p.userId === ctx.userId
});
engine.register(orders);

const createOrder = defineMutation({
  name: 'createOrder',
  handler: async (
    args: { total: number },
    ctx: { userId: number },
    actions
  ) => {
    const order = await prisma.order.create({
      data: { ...args, userId: ctx.userId }
    });
    await actions.change('orders', { op: 'insert', row: order });
    return order;
  }
});
engine.registerMutation(createOrder);

const auth = (c: { userId?: number }) => ({ userId: c.userId ?? 0 });

const app = new Elysia()
  .use(syncSocket({ engine, resolveContext: auth })) // live diffs (WS)
  .get('/sync/orders', hydrateRoute(engine, orders, auth), {
    query: t.Object({ userId: t.Numeric() })
  })
  .post('/sync/createOrder', mutateRoute(engine, createOrder, auth), {
    body: t.Object({ total: t.Number() })
  });

// The Eden export — type-only, no server code shipped to the client.
export type App = typeof app;`;
