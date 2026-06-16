export const edenBackendReturnType = `\
// The real fix lives in the PLUGIN, not the call site. A plugin with many
// routes — especially config-conditional ones — has an inferred return type
// that MULTIPLIES: every \`config.x ? routes(x) : new Elysia()\` is a union,
// and \`.use()\` distributes over unions, so N optional plugins trend toward
// 2^N. It blows past tsc's serialization limit (TS7056) long before any route
// ceiling. Casting it away at every call site is a workaround; giving the
// plugin an explicit, cheap return type is the cure.

// Expose only what consumers actually read. @absolutejs/auth is the worked
// example: its route PATHS are configurable (authorizeRoute, callbackRoute…),
// so Elysia keys those routes by \`string\` — there is no literal route type to
// expose anyway. What IS precise is the typed \`protectRoute\` context, so
// auth() returns that, and User is inferred from your \`getUser\`:
//
//   export const auth = async <User>(
//     config: AuthConfig<User>          // User inferred from config.getUser
//   ) => composed as unknown as AuthInstance<User>;  // one internal bridge

// Consumers just mount it — no cast, full inference, instant type-check. Your
// typed Eden surface (the REST plugin Treaty reads) stays fully inferred:
const server = new Elysia()
  .use(framework)
  .use(authPlugin)        // Promise<AuthInstance<User>> — small + typed
  .use(apiPlugin(db));    // your Eden surface; stays precisely inferred`;
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
