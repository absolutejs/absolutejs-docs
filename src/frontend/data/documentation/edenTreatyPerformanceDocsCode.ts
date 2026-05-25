export const edenBackendWidening = `\
// The backend has the same disease: a long \`.use()\` chain accumulates the
// merged per-route type. Widen the heavy plugins so it cannot.
import { type AnyElysia, Elysia } from 'elysia';

// An async, generic-over-User plugin with many routes is the worst offender.
const authPlugin = auth<User>(config) as Promise<AnyElysia>;

// The rest, widened so none compound. Order is preserved; the casts are
// type-only, so every plugin still mounts at runtime.
const bulkPlugins: AnyElysia[] = [usersPlugin(db), athletePlugin(db) /* … */];

const server = new Elysia()
  .use(framework)
  .use(authPlugin)
  .use(bulkPlugins);

// Use AnyElysia, NOT the base \`Elysia\` — a specific \`Elysia<…>\` is not
// assignable to the base type (its store/decorator defaults are empty).`;
export const edenTreatyComposedClient = `\
// Keep the ergonomic \`server.*\` surface AND stay fast: build one client per
// plugin, then compose them back into the same shape with EXPLICIT leaf
// assignment. Never object-spread an Eden client — it is a URL-building Proxy,
// so spreading drops every route at runtime.
const admins = treaty<ReturnType<typeof adminsPlugin>>(url);
const athlete = treaty<ReturnType<typeof athletePlugin>>(url);
const coaches = treaty<ReturnType<typeof coachesPlugin>>(url);

export const server = {
  admins: admins.admins,
  api: {
    admin: {
      users: admins.api.admin.users,
      // hyphenated routes are bracket keys, not dotted:
      'invite-codes': coaches.api.admin['invite-codes']
    },
    athlete: athlete.api.athlete
  }
};

// Every existing call site is unchanged and still fully typed:
await server.api.athlete.profile.get();`;
export const edenTreatySubApp = `\
// Elysia's recommendation: type Eden over a SUB-APP, not the whole Server.
// You keep full end-to-end type safety — it just evaluates one plugin's type.
import { treaty } from '@elysiajs/eden';
import type { adminsPlugin } from '../../backend/plugins/adminsPlugin';

// Plugins are \`(db) => Elysia<…>\`, so ReturnType is the app type.
// \`import type\` keeps the backend plugin out of the frontend bundle.
export const adminApi = treaty<ReturnType<typeof adminsPlugin>>(url);

await adminApi.api.admin.users.get(); // fully typed`;
export const edenTreatyWholeApp = `\
// The convenient default: one client typed over the WHOLE app.
import { treaty } from '@elysiajs/eden';
import type { Server } from '../../backend/server';

export const server = treaty<Server>(window.location.origin);

// On a large app, \`treaty<Server>\` instantiates the type of EVERY route at once.
// That is super-linear, and a batch \`tsc\` (\`absolute typecheck\`) runs out of memory.`;
