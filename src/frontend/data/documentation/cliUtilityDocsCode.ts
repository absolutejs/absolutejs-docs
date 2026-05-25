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
export const infoCommand = `\
# Print system info for bug reports
absolute info`;
export const infoOutput = `\
$ absolute info

  AbsoluteJS v0.19.0-beta.174
  Bun v1.3.11
  Platform: linux x64
  Node: v22.0.0`;
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

  NAME        SOURCE     PORT  PID    UPTIME  STATUS  URL
  my-app      dev        3000  48210  2m 14s  ready   http://localhost:3000/
  api-server  untracked  3001  51388  5h 42m  ready   http://localhost:3001/`;
export const psPortConflict = `\
$ absolute dev

  Port 3000 is in use (held by pid 51388 — bun run dist/server.js), trying another one... → http://localhost:3001/`;
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
