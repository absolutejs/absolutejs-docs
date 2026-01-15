export const buildSignature = `\
const manifest = await build({
  buildDirectory?: string,       // Default: 'build'
  assetsDirectory?: string,      // Default: 'assets'
  reactDirectory?: string,       // Path to React files
  svelteDirectory?: string,      // Path to Svelte files
  vueDirectory?: string,         // Path to Vue files
  htmlDirectory?: string,        // Path to HTML files
  htmxDirectory?: string,        // Path to HTMX files
  angularDirectory?: string,     // Path to Angular files (coming soon)
  tailwind?: TailwindConfig,     // Tailwind CSS configuration
  options?: BuildOptions         // Additional build options
});`;

export const simpleReactBuild = `\
import { build } from '@absolutejs/absolute';

const manifest = await build({
  reactDirectory: './src/frontend'
});`;

export const multiFrameworkBuild = `\
const manifest = await build({
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte',
  vueDirectory: './src/frontend/vue'
});`;

export const manifestStructure = `\
// The manifest maps entry point names to their bundled paths
{
  "HomeIndex": "/build/HomeIndex-x7f2a.js",
  "AboutIndex": "/build/AboutIndex-b3c1d.js",
  "DashboardIndex": "/build/DashboardIndex-e9k4m.js"
}`;

export const assetFunction = `\
import { asset } from '@absolutejs/absolute';

// asset() looks up the bundled path from the manifest
const indexPath = asset(manifest, 'HomeIndex');
// Returns: "/build/HomeIndex-x7f2a.js"

// Use it in your page handlers
.get('/', () =>
  handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
)`;

export const tailwindConfig = `\
const manifest = await build({
  reactDirectory: './src/frontend',
  tailwind: {
    configPath: './tailwind.config.ts',
    cssPath: './src/styles/globals.css'
  }
});`;

export const buildOptions = `\
const manifest = await build({
  reactDirectory: './src/frontend',
  options: {
    preserveIntermediateFiles: true  // Keep intermediate build artifacts
  }
});`;
