export const addCommand = `\
# Add a framework: installs deps, updates config, scaffolds a starter page
absolute add svelte

# Configure + scaffold only, skip the dependency install
absolute add vue --no-install`;
export const addOutput = `\
$ absolute add svelte

  Installing Svelte dependencies…
✓ Added Svelte to your project

  Installed 2 package(s).
  Created
    src/frontend/svelte/pages/SvelteExample.svelte
    src/frontend/styles/indexes/svelte-example.css
    src/frontend/shared/navData.ts
  Updated
    absolute.config.ts
    src/backend/plugins/pagesPlugin.ts

  Route  /svelte-example`;
export const analyzeCommand = `\
# Bundle size breakdown by category (pages, islands, chunks, CSS)
absolute analyze

# Record a baseline; later runs show the diff (+/- per category)
absolute analyze --save`;
export const analyzeOutput = `\
$ absolute analyze

  Pages          312 KB   +4 KB
  Hydration      180 KB   —
  Islands        165 KB   —
  Shared chunks  410 KB   -2 KB
  CSS            18 KB    —
  ──────────────────────────
  Total          1.1 MB   +2 KB

  Biggest changes
    +4 KB   Dashboard
    -2 KB   Chunk5wc6pv6k

  vs baseline .absolute-size-baseline.json`;
export const apiCommand = `\
# Show the API surface from a running dev server
absolute api

# Emit an OpenAPI 3 document from Elysia's typed schemas
absolute api --openapi > openapi.json`;
export const apiOutput = `\
$ absolute api

  GET     /
  GET     /dashboard
  POST    /api/login        body: email, password
  DELETE  /api/account/:id  params: id

  4 routes · my-app · \`absolute api --openapi\` for a spec`;
export const doctorCommand = `\
# Diagnose the project (bun, config, framework dirs, env, dev port)
absolute doctor

# Auto-fix safe issues: create missing framework dirs, scaffold .env.example
absolute doctor --fix

# Machine-readable, exits non-zero on failures (for CI)
absolute doctor --json`;
export const doctorOutput = `\
$ absolute doctor

  ✓ Bun runtime           v1.3.14
  ✓ @absolutejs/absolute  v0.19.0-beta.1038
  ✓ Native binary         v0.19.0-beta.1008
  ✓ Config                absolute.config.ts loaded
  ✓ react pages           ./src/frontend/react
  ✓ vue pages             ./src/frontend/vue
  ✗ Env vars              missing DATABASE_URL
  ⚠ Dev port              3000 in use by pid 48210

  8 checks · 1 failed · 1 warning`;
export const envCommand = `\
# Report the env vars the app reads via getEnv()
absolute env

# Fail (exit 1) if any are missing — for CI
absolute env --check`;
export const envOutput = `\
$ absolute env

  ✓ DATABASE_URL          set      2 files
  ✗ OAUTH2_CALLBACK_URI   missing  1 file

  2 referenced · 1 missing`;
export const eslintCommand = `\
# Run ESLint with caching across the whole project
absolute eslint

# Lint a specific path (no implicit '.' is appended)
absolute eslint src/backend

# Pass-through to ESLint: autofix, CI-friendly output, strictness
absolute eslint --fix
absolute eslint --quiet --max-warnings 0
absolute eslint --format json -o eslint-report.json

# Wipe the cache file (does NOT invoke ESLint)
absolute eslint --clear-cache

# Relocate the cache (useful in monorepos / CI to avoid collisions)
ABSOLUTE_ESLINT_CACHE=.cache/eslint absolute eslint`;
export const generateCommand = `\
# Generate a page — component file, CSS, nav, and route all wired up
absolute generate page dashboard --framework react

# --framework is optional when only one framework is configured
absolute generate page settings

# An API plugin with GET/POST stubs, mounted on the server
absolute generate api users

# A reusable component (no route)
absolute generate component Button --framework svelte`;
export const generateOutput = `\
$ absolute generate page dashboard --framework react

✓ Generated page dashboard (react)

  Created
    src/frontend/react/pages/Dashboard.tsx
    src/frontend/styles/indexes/dashboard.css
    src/frontend/shared/navData.ts
  Updated
    src/backend/plugins/pagesPlugin.ts

  Route  /dashboard

  Next  run \`absolute prettier --write\` to format edits, then \`absolute dev\``;
export const htmxCommand = `\
# Report the self-hosted htmx version (and the CLI's vendored default)
absolute htmx

# Install / upgrade the pinned copy from jsDelivr
absolute htmx latest
absolute htmx 2.0.6`;
export const htmxOutput = `\
$ absolute htmx

  installed  2.0.6
  vendored   2.0.6

  Upgrade with \`absolute htmx <version>\` (e.g. \`absolute htmx latest\`)`;
export const infoCommand = `\
# Print system info for bug reports
absolute info`;
export const infoOutput = `\
$ absolute info

  AbsoluteJS v0.19.0-beta.174
  Bun v1.3.11
  Platform: linux x64
  Node: v22.0.0`;
export const inspectCommand = `\
# Live request inspector for a running dev server
absolute inspect

# One-shot snapshot (when piped) or machine-readable JSON
absolute inspect | cat
absolute inspect --json`;
export const inspectOutput = `\
$ absolute inspect

  TIME      METHOD  PATH      STATUS  TOOK   SIZE
  04:34:57  GET     /         200     5ms    —
  04:34:57  GET     /react    200     65ms   —
  04:34:57  GET     /vue      200     116ms  —
  04:34:58  GET     /missing  404     8ms    —

  4 requests · 54ms avg · 116ms p95 · live · q quit`;
export const islandsCommand = `\
# List islands by framework, hydration strategy, and the pages that mount them
absolute islands

# Add the shipped JS size per island (reads the build manifest)
absolute islands --sizes

# Machine-readable
absolute islands --json`;
export const islandsOutput = `\
$ absolute islands --sizes

  ⬡ ReactCounter  react · 5 pages · 4 cross-framework  1 KB
    src/frontend/react/components/ReactCounter
    src/frontend/react/pages/Home.tsx            load
    src/frontend/vue/pages/VueHost.vue           load                 → in vue
    src/frontend/svelte/pages/SvelteHost.svelte  load, idle, visible  → in svelte

  ⬡ AngularCounter  angular · 5 pages · 5 cross-framework  159 KB
    src/frontend/angular/components/angular-counter
    src/frontend/react/pages/Home.tsx            load                 → in react

  4 islands · 4 frameworks · 44 mounts · 39 cross-framework`;
export const logsCommand = `\
# Tail a running server's log by name (from any terminal)
absolute logs my-app

# Follow live, last 100 lines
absolute logs my-app -f -n 100`;
export const logsOutput = `\
$ absolute logs my-app

  [build] ready in 312ms
  GET / 200 4ms
  GET /api/users 200 12ms
  — following my-app · ctrl+c to stop —`;
export const lsBudgetCommand = `\
# Fail the build if any page ships more than a size budget (needs --sizes)
absolute ls --sizes --budget 500kb

# Also accepts mb; combine with --json for CI
absolute ls --sizes --budget 1mb --json`;
export const lsBudgetOutput = `\
$ absolute ls --sizes --budget 500kb

  React · 2 pages
    Dashboard  312.4 KB  src/frontend/react/pages/Dashboard.tsx
    Home       207.0 KB  src/frontend/react/pages/Home.tsx

  Vue · 1 page
    Settings   918.7 KB  src/frontend/vue/pages/Settings.vue   over budget

  1 page over the 500 KB budget · exit 1`;
export const lsCommand = `\
# List your project's pages, grouped by framework (reads source — no build needed)
absolute ls

# Add built bundle sizes from a build you point at
absolute ls --sizes
absolute ls --sizes --outdir dist

# Machine-readable output
absolute ls --json`;
export const lsOutput = `\
$ absolute ls

  React · 2 pages
    Dashboard  src/frontend/react/pages/Dashboard.tsx
    Home       src/frontend/react/pages/Home.tsx

  Vue · 1 page
    Settings   src/frontend/vue/pages/Settings.vue

  HTMX · 1 page
    Inbox      src/frontend/htmx/pages/Inbox.html

  3 frameworks · 4 pages`;
export const lsSizesOutput = `\
$ absolute ls --sizes

  build/manifest.json · built 4m 12s ago

  React · 2 pages
    Dashboard  312.4 KB  src/frontend/react/pages/Dashboard.tsx
    Home       207.0 KB  src/frontend/react/pages/Home.tsx

  Vue · 1 page
    Settings   918.7 KB  src/frontend/vue/pages/Settings.vue

  3 frameworks · 4 pages`;
export const memCommand = `\
# Memory report for every running server, biggest first
absolute mem

# Diff two heap snapshots by object type to find leaks
absolute mem diff before.heapsnapshot after.heapsnapshot

# Machine-readable (per-server RSS + system totals)
absolute mem --json`;
export const memHeapSnapshot = `\
$ absolute dev
  ...
# press  m  (or type: heap)
[absolute] heap snapshot written: heap-48210-1716600000000.heapsnapshot
# load it in Chrome DevTools › Memory › Load`;
export const memOutput = `\
$ absolute mem

  NAME     SOURCE     PORT  RSS       % SYS
  my-app   dev        3000  142.6 MB  ███░░░░░░░░░░ 0.9%
  api      untracked  3001  88.1 MB   ██░░░░░░░░░░░ 0.5%

  2 servers · 230.7 MB resident total
  system  6.2 GB / 16.0 GB used · 9.8 GB free`;
export const mkcertCommand = `\
# Setup trusted HTTPS certificates for local development
absolute mkcert`;
export const mkcertConfig = `\
// absolute.config.ts
export default defineConfig({
  // ...
  dev: {
    https: true,
  },
});`;
export const prettierCommand = `\
# Check formatting
absolute prettier

# Fix formatting
absolute prettier --write`;
export const psCommand = `\
# List every running AbsoluteJS server on the machine
absolute ps

# Auto-refreshing dashboard you can act on
absolute ps --watch

# Machine-readable output
absolute ps --json`;
export const psKillCommand = `\
# Stop a server by pid, or free a port an orphan is squatting
absolute ps --kill 48210
absolute ps --kill 3001

# Stop every running server
absolute ps --kill-all`;
export const psOutput = `\
$ absolute ps

  NAME        SOURCE     PORT  PID    UPTIME  MEM       STATUS  URL
  my-app      dev        3000  48210  2m 14s  142.6 MB  ready   http://localhost:3000/
  api-server  untracked  3001  51388  5h 42m  88.1 MB   ready   http://localhost:3001/`;
export const psPortConflict = `\
$ absolute dev

  Port 3000 is in use (held by pid 51388 — bun run dist/server.js), trying another one... → http://localhost:3001/`;
export const removeCommand = `\
# Remove a framework from the config (keeps your source files)
absolute remove svelte

# Also uninstall the framework's dependencies
absolute remove svelte --prune`;
export const removeOutput = `\
$ absolute remove svelte

✓ Removed svelteDirectory from absolute.config.ts

  Kept  src/frontend/svelte — delete its source manually if no longer needed.
  Still references  src/backend/plugins/pagesPlugin.ts (calls handleSveltePageRequest)

  Run \`absolute remove svelte --prune\` to also uninstall: svelte, svelte-check`;
export const routesCommand = `\
# List every route (pages + API) of a running dev server
absolute routes

# Machine-readable
absolute routes --json`;
export const routesOutput = `\
$ absolute routes

  GET     /
  GET     /dashboard
  DELETE  /api/account/:id
  POST    /api/login

  4 routes · my-app`;
export const telemetryCommand = `\
# Check telemetry status
absolute telemetry

# Disable telemetry
absolute telemetry off

# Enable telemetry
absolute telemetry on`;
export const typecheckCommand = `\
# Run type checkers for all frameworks
absolute typecheck

# With a custom config
absolute typecheck --config ./my-config.ts`;
export const typecheckConfig = `\
// absolute.config.ts : typecheck reads your framework directories
export default defineConfig({
  reactDirectory: "./src/frontend/react",
  svelteDirectory: "./src/frontend/svelte",
  vueDirectory: "./src/frontend/vue",
  angularDirectory: "./src/frontend/angular",
});

// package.json
{
  "scripts": {
    "typecheck": "absolute typecheck"
  }
}`;
export const typecheckOutput = `\
$ absolute typecheck
✓ Typecheck passed`;
