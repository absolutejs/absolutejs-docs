export const basicBuild = `import { build } from '@absolutejs/absolute';

await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  reactDirectory: './src/frontend/react',
  tailwind: {
    input: './src/styles/input.css',
    output: './dist/output.css'
  }
});`

export const htmlOnlyBuild = `import { build } from '@absolutejs/absolute';

// For HTML/HTMX only - no manifest returned
await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  htmlDirectory: './src/frontend/html',
  htmxDirectory: './src/frontend/htmx'
});`

export const frameworkBuild = `import { build } from '@absolutejs/absolute';

// For framework-based apps - returns manifest
const manifest = await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte',
  vueDirectory: './src/frontend/vue'
});

// Store manifest for use in page handlers
export { manifest };`

export const assetFunction = `import { asset } from '@absolutejs/absolute';
import { build } from '@absolutejs/absolute';

// For framework-based apps - returns manifest
const manifest = await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte',
  vueDirectory: './src/frontend/vue'
});

// Retrieve compiled asset path from manifest
const homePath = asset(manifest, 'HomeIndex');
console.log(homePath); // Output: '/dist/HomeIndex-abc123.js'

// Use in page handler

app.get('/', () => {
  const scriptPath = asset(manifest, 'HomeIndex');
  return new Response(
    \`<!DOCTYPE html>
    <html>
      <head>
        <script type="module" src="\${scriptPath}"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>\`,
    { headers: { 'Content-Type': 'text/html' } }
  );
});`

export const fullExample = `import { build, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

// Build the application
const manifest = await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  reactDirectory: './src/frontend/react',
  tailwind: {
    input: './src/styles/input.css',
    output: './dist/output.css'
  }
});

// Create server with page handlers
const app = new Elysia()
  .get('/', () => {
    const scriptPath = asset(manifest, 'HomeIndex');
    const stylePath = asset(manifest, 'styles');
    
    return new Response(
      \`<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="\${stylePath}">
          <script type="module" src="\${scriptPath}"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>\`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  })
  .listen(3000);

console.log('Server running on http://localhost:3000');`

export const allOptions = `import { build } from '@absolutejs/absolute';
await build({
  // Required: Static assets folder
  assetsDirectory: './src/assets',
  
  // Required: Output directory for built files
  buildDirectory: './dist',
  
  // Optional: Framework directories
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte',
  vueDirectory: './src/frontend/vue',
  
  // Optional: HTML/HTMX directories
  htmlDirectory: './src/frontend/html',
  htmxDirectory: './src/frontend/htmx',
  
  // Optional: Tailwind CSS configuration
  tailwind: {
    input: './src/styles/input.css',
    output: './dist/output.css'
  }
});`;