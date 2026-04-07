// absolute.config.ts
export const absoluteConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  // Framework directories
  reactDirectory: './src/frontend',
  svelteDirectory: './src/svelte',
  vueDirectory: './src/vue',
  angularDirectory: './src/angular',
  htmlDirectory: './src/html',
  htmxDirectory: './src/htmx',

  // Output directories
  buildDirectory: './build',         // Default: './build'
  assetsDirectory: './assets',       // Default: './assets'
  publicDirectory: './public',       // Public static assets

  // Tailwind CSS
  tailwind: {
    input: './src/styles/globals.css',
    output: './build/styles.css'
  },

  // Build options
  options: {
    preserveIntermediateFiles: false, // Keep compiled/ folder
    throwOnError: false               // Throw vs exit(1)
  }
});`;
export const assetsDirectory = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend',
  assetsDirectory: 'src/assets'  // Static assets like images, fonts
});`;
export const assetsStatic = `\
import { staticPlugin } from '@elysiajs/static';

new Elysia()
  .use(staticPlugin({
    assets: './public',    // Served at root: /image.png
    prefix: '/static'      // Or with prefix: /static/image.png
  }))`;
export const customConfigPath = `\
// Load from a custom config path
const { absolutejs, manifest } = await prepare('./custom.config.ts');`;
export const envRequired = `\
# .env file
DATABASE_URL=postgresql://user:pass@localhost:5432/db
HOST=localhost
PORT=3000

# For OAuth authentication:
OAUTH2_CALLBACK_URI=http://localhost:3000/auth/callback

# Provider-specific credentials:
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...`;
export const envTypeSafe = `\
import { getEnv } from '@absolutejs/absolute';

// getEnv throws immediately if the variable is not set
// This catches configuration errors at startup, not runtime

const config = {
  database: getEnv('DATABASE_URL'),
  host: getEnv('HOST'),
  port: getEnv('PORT'),
  callbackUri: getEnv('OAUTH2_CALLBACK_URI')
};

// If any variable is missing, you get a clear error:
// Error: Missing environment variable DATABASE_URL

// All variables are guaranteed to be strings (never undefined)
const db = drizzle(config.database);`;
export const envUsage = `\
import { getEnv } from '@absolutejs/absolute';

// getEnv reads from .env and throws if the variable is missing
const databaseUrl = getEnv('DATABASE_URL');
const callbackUri = getEnv('OAUTH2_CALLBACK_URI');

// Use in your server configuration
const db = drizzle(databaseUrl);`;
export const headHtml = `\
<!-- about.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>About Us | Company</title>
    <meta name="description" content="Learn about our company" />
    <meta property="og:title" content="About Us" />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <!-- content -->
  </body>
</html>`;
export const headHtmx = `\
<!-- dashboard.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard | Admin</title>
    <meta name="robots" content="noindex" />
    <script src="https://unpkg.com/htmx.org"></script>
  </head>
  <body>
    <!-- content -->
  </body>
</html>`;
export const headReact = `\
// React components render the full HTML including head
export const Page = ({ title, description }: PageProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles/global.css" />
    </head>
    <body>
      {/* content */}
    </body>
  </html>
);`;
export const headSvelte = `\
<!-- Svelte components render the full HTML including head -->
<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <!-- content -->
  </body>
</html>`;
export const headVue = `\
// Vue uses handleVuePageRequest's headTag parameter
.get('/products/:id', async ({ params }) => {
  const product = await getProduct(params.id);

  return handleVuePageRequest(
    ProductPage,
    pagePath,
    indexPath,
    \`<title>\${product.name} | My Store</title>
     <meta name="description" content="\${product.description}" />\`,
    { product }
  );
})`;
export const minimalConfig = `\
// absolute.config.ts: minimal example
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend'
});`;
export const prepareUsage = `\
// src/backend/server.ts
import { prepare, asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

// prepare() loads absolute.config.ts and builds your app
const { absolutejs, manifest } = await prepare();

new Elysia()
  .use(absolutejs)  // Adds HMR routes in development
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .listen(3000);`;
export const tailwindBuild = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend',
  tailwind: {
    input: './src/styles/globals.css',
    output: './build/styles.css'
  }
});`;
export const tailwindConfig = `\
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A0E7E5',
        secondary: '#B4F8C8'
      }
    }
  },
  plugins: []
} satisfies Config;`;
export const tailwindCss = `\
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles */
@layer components {
  .btn-primary {
    @apply bg-primary text-black px-4 py-2 rounded-lg;
  }
}`;
