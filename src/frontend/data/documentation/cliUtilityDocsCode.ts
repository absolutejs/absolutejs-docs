export const eslintCommand = `\
# Run ESLint with caching
absolute eslint

# Pass additional args to ESLint
absolute eslint --fix`;

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

export const infoCommand = `\
# Print system info for bug reports
absolute info`;

export const infoOutput = `\
$ absolute info

  AbsoluteJS v0.19.0-beta.174
  Bun v1.3.11
  Platform: linux x64
  Node: v22.0.0`;
