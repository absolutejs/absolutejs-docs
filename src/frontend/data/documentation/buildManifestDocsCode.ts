export const assetFunction = `\
import { asset } from '@absolutejs/absolute';

// asset() looks up the bundled path from the manifest
const indexPath = asset(manifest, 'HomeIndex');
// Returns: "/build/HomeIndex-x7f2a.js"

// Use it in your page handlers
.get('/', () =>
  handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
)`;
export const buildOptions = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  options: {
    preserveIntermediateFiles: true  // Keep intermediate build artifacts
  }
});`;
export const cliCommands = `\
# Development server with HMR
absolute dev src/backend/server.ts

# Production build and start
absolute start src/backend/server.ts

# With custom config path
absolute dev src/backend/server.ts --config ./my-config.ts

# Format code
absolute prettier --write

# Lint code
absolute eslint

# Show system info
absolute info`;
export const configFile = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  buildDirectory: 'build',          // Default: 'build'
  assetsDirectory: 'assets',        // Default: 'assets'
  publicDirectory: 'public',        // Public static assets
  reactDirectory: 'src/frontend',   // Path to React files
  svelteDirectory: 'src/svelte',    // Path to Svelte files
  vueDirectory: 'src/vue',          // Path to Vue files
  htmlDirectory: 'src/html',        // Path to HTML files
  htmxDirectory: 'src/htmx',        // Path to HTMX files
  angularDirectory: 'src/angular',  // Path to Angular files
  tailwind: {                       // Tailwind CSS configuration
    input: './src/styles/globals.css',
    output: './build/styles.css'
  },
  options: {                        // Additional build options
    preserveIntermediateFiles: false,
    throwOnError: false
  }
});`;
export const manifestStructure = `\
// The manifest maps entry point names to their bundled paths
{
  "HomeIndex": "/build/HomeIndex-x7f2a.js",
  "AboutIndex": "/build/AboutIndex-b3c1d.js",
  "DashboardIndex": "/build/DashboardIndex-e9k4m.js"
}`;
export const multiFrameworkConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte',
  vueDirectory: './src/frontend/vue',
  angularDirectory: './src/frontend/angular'
});`;
export const prepareFunction = `\
import { prepare, asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

// prepare() loads absolute.config.ts and builds your app
const { absolutejs, manifest } = await prepare();

new Elysia()
  .use(absolutejs)  // Adds HMR routes in development
  .get('/', () =>
    handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
  )
  .listen(3000);`;
export const simpleReactConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend'
});`;
export const tailwindConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  tailwind: {
    input: './src/styles/globals.css',
    output: './build/styles.css'
  }
});`;
