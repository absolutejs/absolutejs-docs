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
# List every running AbsoluteJS server on the machine
absolute ls

# Same thing, process-manager muscle memory
absolute ps

# Auto-refreshing dashboard you can act on
absolute ls --watch

# Machine-readable output
absolute ls --json`;
export const lsKillCommand = `\
# Stop a server by pid, or free a port an orphan is squatting
absolute ls --kill 48210
absolute ls --kill 3001

# Stop every running server
absolute ls --kill-all`;
export const lsOutput = `\
$ absolute ls

  NAME        SOURCE     PORT  PID    UPTIME  STATUS  URL
  my-app      dev        3000  48210  2m 14s  ready   http://localhost:3000/
  api-server  untracked  3001  51388  5h 42m  ready   http://localhost:3001/`;
export const lsPortConflict = `\
$ absolute dev

  Port 3000 is in use (held by pid 51388 — bun run dist/server.js), trying another one... → http://localhost:3001/`;
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
