# Eden Treaty type performance & the `treaty<Server>` gotcha

> **TL;DR** — `treaty<Server>` gives you end‑to‑end type safety by instantiating the type of
> **every route in your app at once**. On a large app that becomes super‑linear and `tsc`
> (i.e. `absolute typecheck`) runs out of memory — even with 13 GB of heap. The fix is Elysia's
> recommended **sub‑app isolation**: give Eden a smaller sub‑app type per domain instead of the
> whole `Server`. You keep full type safety; you just stop evaluating the entire app in one shot.

---

## Symptom

`absolute typecheck` (which runs `tsc --noEmit`) dies with:

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

…or simply never finishes. Raising `--max-old-space-size` doesn't help — we measured a single
file (`edenTreaty.ts`, which only does `treaty<Server>(...)`) running **> 6 minutes at a 13 GB heap
without finishing**.

## Why it happens

End‑to‑end type safety in Eden comes from one line:

```ts
export const server = treaty<Server>(url) // Server = typeof app (the whole Elysia instance)
```

`treaty<Server>` walks **every route** in the app and instantiates its params/body/response/headers
types into a giant nested client type. Two things make this explode on a big app:

1. **It's eager and global.** A batch `tsc` run instantiates the *entire* `treaty<Server>` type at
   once (every route, every schema), not just the routes a given file calls.
2. **`.use()` composition is ~multiplicative, not additive.** Stacking ~15 plugins into one merged
   app type and then mapping it through `treaty<>` costs far more than the sum of the plugins.

### Measured on intent (Elysia 1.4.28, latest)

| What | Result |
| --- | --- |
| `treaty<one plugin>` (e.g. `adminsPlugin`) | ~100–155K instantiations, ~300–400 MB, **~14 s ✅** |
| `treaty<~12 plugins merged>` | **timed out > 5 min ❌** |
| `treaty<Server>` (whole app, one file) | **> 6 min at 13 GB, never finished ❌** |

A single plugin is cheap. The *merged whole‑app* type is the problem. This is **not** fixed by a
newer Elysia (we're on the latest) or more RAM — it's the shape of the type.

## The important reframe: you are NOT losing type safety in development

- The **TypeScript language server (your editor) is lazy** — it only instantiates the slice of the
  type for the file you're editing. So autocomplete and inline errors on `server.api.x.y.get()`
  **work fine today**, even with `treaty<Server>`.
- Your **app still builds and runs** — `absolute dev` / `absolute start` bundle with Bun, which
  does **not** run a full `tsc`.
- The only thing that dies is the **eager batch `tsc` / `absolute typecheck`** gate (CI / pre‑push).

So this is a CI‑gate problem, not a "we lost type safety" problem. That said, losing the batch gate
is worth fixing — it's your safety net against breaking changes across the front/back boundary.

## The fix — sub‑app isolation (Elysia's official recommendation)

From the Elysia docs ([TypeScript patterns](https://elysiajs.com/patterns/typescript)):

> "you can try using a sub app of Elysia to isolate the type inference … export a sub app and
> import that instead of the whole app … so it doesn't need to evaluate the whole app."

```ts
// backend
export type App = typeof app          // whole app (runtime)
export type AdminApp = typeof adminPlugin   // a sub-app type for Eden

// frontend
import { treaty } from '@elysiajs/eden'
const adminApi = treaty<AdminApp>(url)      // full inference, ~1 plugin's worth of type
```

You still get **complete** end‑to‑end type safety for those routes — Eden just evaluates one
plugin's type instead of the whole app. You end up with a few domain‑scoped clients
(`adminApi`, `coachApi`, …) instead of one `server`.

## Worked example (intent)

`intent`'s admin views used to import the whole‑app `server` and OOM'd on typecheck. We added a
sub‑app client:

```ts
// src/frontend/utils/adminApi.ts
import { treaty } from '@elysiajs/eden'
import type { adminsPlugin } from '../../backend/plugins/adminsPlugin'

const url = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'

// Types ONLY the admin plugin's routes. Runtime is identical to `server` — treaty just
// generates fetch calls; only the *type* is scoped.
export const adminApi = treaty<ReturnType<typeof adminsPlugin>>(url)
```

> Note `import type` + `ReturnType<typeof adminsPlugin>` — plugins are `(db) => Elysia<…>`, so we
> take the instance type via `ReturnType`, and `import type` keeps the backend plugin's runtime out
> of the frontend bundle.

Then the views call `adminApi.api.admin.organizations.get()` instead of
`server.api.admin.organizations.get()`. Same request, same response type.

**Result for those files:** `tsc` went from *never finishing at 13 GB* → **11.46 s, 367 MB,
EXIT 0**. Identical runtime (verified in the browser).

### Watch out for transitive imports

Isolation only helps if the file doesn't pull in `treaty<Server>` through a *side door*. In intent,
the admin views imported shared layout styles from `ShowcasesView` — which imports the full
`server`. That re‑poisoned the type graph. Fix: move shared styles into a **server‑free module**
(`components/admin/shared/viewStyles.ts`) so isolated views never transitively touch `treaty<Server>`.

Rule of thumb: a file you want to keep cheap must not import (even transitively) any module that
instantiates `treaty<Server>`.

## Rollout playbook (to fully restore `absolute typecheck`)

The batch gate only comes back once **nothing** instantiates `treaty<Server>`. Migrate incrementally:

1. For each domain, add a `xApi = treaty<ReturnType<typeof xPlugin>>(url)` client.
2. Point that domain's components at `xApi`; keep call sites identical (`xApi.api.x.…`).
3. Keep shared, server‑free utilities (styles, helpers) out of any `server`‑importing module.
4. When the last `server` consumer is migrated, **delete the `treaty<Server>` export**. Now every
   file instantiates at most one plugin's type, and `tsc` is linear in the number of domains.

Optional ergonomic variant: compose the per‑plugin clients back into one `server`‑shaped object
(`{ api: { admin: adminApi.api.admin, athlete: athleteApi.api.athlete, … }, … }`) so existing
`server.api.x` call sites don't change. This keeps the additive (per‑plugin) cost while preserving
the old surface — but verify it type‑checks, since the composed object still references every client.

## Other practical notes

- **Don't bother for small apps.** A handful of plugins evaluates fine; this only bites at scale
  (≈ dozens of routes with rich `t.Object(...)` schemas, or a big generic plugin).
- **A heavy generic plugin is a multiplier.** A plugin generic over a wide type (e.g.
  `auth<User>()` where `User` is a 27‑field row, mounting ~40 routes) inflates every route it owns.
  Such plugins are good candidates to keep *off* the Eden type entirely and call via plain `fetch`
  if the frontend only hits one or two of their routes.
- **Prefer `fetch` for one‑off / Bearer‑auth calls.** It adds nothing to the treaty type. (intent's
  customer SSO‑setup page calls the auth package's portal routes with a Bearer token via `fetch`
  for exactly this reason.)
- **To verify a change without OOM**, point `tsc` at just the files you touched with a scoped
  config that doesn't pull in `treaty<Server>`:
  ```jsonc
  // _tc.tsconfig.json
  { "extends": "./tsconfig.json",
    "compilerOptions": { "incremental": false, "noEmit": true },
    "include": ["src/.../ChangedFile.tsx"] }
  ```
  `bunx tsc -p _tc.tsconfig.json`. If the file (transitively) imports `treaty<Server>`, it'll still
  OOM — which is itself a useful signal.
- **`tsc --generateTrace <dir>` + `@typescript/analyze-trace`** (or Perfetto) pinpoints the hottest
  types if you need to attribute cost — though on a `treaty<Server>` that won't finish, you'll learn
  more from the per‑plugin A/B above.

## There's a second chokepoint: the backend `.use()` chain

Fixing the **frontend** (Eden) side is necessary but **not sufficient** to restore
`absolute typecheck`. The same Elysia type accumulation bites on the **backend**: the app entry
(`server.ts`) chains ~15 plugins —

```ts
const server = new Elysia().use(absolutejs).use(auth<User>(...)).use(adminsPlugin(db))…
```

— and TypeScript infers the *accumulated* type through every `.use()`. With a wide generic plugin
in the chain (e.g. `auth<User>()`, ~40 routes generic over a 27‑field row) that merged type is
itself intractable. Measured on intent: type‑checking **`server.ts` alone timed out > 5 min at
10 GB**, independent of Eden.

So a full green `absolute typecheck` needs **both**:

1. **Frontend:** compose per‑plugin Eden clients (above). ✅ done on intent — whole frontend checks
   in ~49 s.
2. **Backend:** stop materializing one giant accumulated app type in `server.ts`. Options (each
   needs careful, runtime‑verified work since you can't lean on `tsc` until it's fixed):
   - Group plugins into **sub‑apps / controllers** and `.use()` the groups, so no single chain
     accumulates all ~15 at full width.
   - Use the **array form** `.use([p1, p2, …])` where it reduces nesting.
   - Keep the heaviest generic plugin (the auth mega‑plugin) as its own mounted instance and avoid
     threading its full type through the rest of the chain.
   - As a last resort, widen the app entry's inferred type so tsc doesn't deeply instantiate it
     (you lose nothing on the frontend now that Eden no longer reads `typeof server`).

> Until the backend is addressed, `absolute typecheck` still OOMs even though the frontend is fixed.
> The app continues to **build and run** fine (Bun bundles without `tsc`).

## References

- Elysia — TypeScript patterns: https://elysiajs.com/patterns/typescript
- Eden overview (end‑to‑end type safety): https://elysiajs.com/eden/overview
- Elysia 1.3 "Scientific Witchery" (type‑perf, Sucrose, "1,000+ routes per treaty"): https://elysiajs.com/blog/elysia-13
- Elysia 1.0 "Lament of the Fallen" (type‑instantiation rewrite): https://elysiajs.com/blog/elysia-10
