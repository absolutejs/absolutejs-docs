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
