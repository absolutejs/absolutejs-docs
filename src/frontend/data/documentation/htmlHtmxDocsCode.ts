export const htmlAssetDetection = `\
// The build system automatically detects and processes:

// JavaScript files
<script src="./scripts/app.js"></script>

// TypeScript files (compiled to JS)
<script src="./scripts/app.ts"></script>

// CSS files
<link rel="stylesheet" href="./styles/main.css">

// All paths are updated to point to the bundled, hashed files`;
export const htmlBuild = `\
const manifest = await build({
  htmlDirectory: 'src/frontend'
});

// The manifest maps page names to their built HTML files
// { "home": "/build/pages/home.html", "about": "/build/pages/about.html" }`;
export const htmlBuiltExample = `\
<!-- After build, paths are automatically updated -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My App</title>
  <link rel="stylesheet" href="/build/main-a3f2c1.css">
</head>
<body>
  <h1>Welcome</h1>
  <div id="app"></div>

  <script src="/build/app-b7d4e9.js"></script>
</body>
</html>`;
export const htmlHandler = `\
// backend/server.ts
import { handleHTMLPageRequest } from '@absolutejs/absolute';

new Elysia()
  .get('/', () =>
    handleHTMLPageRequest('./build/pages/home.html')
  )
  .get('/about', () =>
    handleHTMLPageRequest('./build/pages/about.html')
  )`;
export const htmlSourceExample = `\
<!-- src/html/pages/home.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My App</title>
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <h1>Welcome</h1>
  <div id="app"></div>

  <script src="./scripts/app.ts"></script>
</body>
</html>`;
export const htmxApiEndpoint = `\
// HTMX requests return HTML fragments
new Elysia()
  .get('/api/data', () => {
    const items = getItems();

    return \`
      <ul>
        \${items.map(item => \`<li>\${item.name}</li>\`).join('')}
      </ul>
    \`;
  })`;
export const htmxBuild = `\
const manifest = await build({
  htmxDirectory: 'src/htmx/pages'
});`;
export const htmxExample = `\
<!-- src/htmx/pages/app.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>HTMX App</title>
  <script src="/htmx/htmx.min.js"></script>
  <link rel="stylesheet" href="./styles/htmx-app.css">
</head>
<body>
  <h1>HTMX Application</h1>

  <button hx-get="/api/data" hx-target="#results" hx-swap="innerHTML">
    Load Data
  </button>

  <div id="results"></div>
</body>
</html>`;
export const htmxHandler = `\
// backend/server.ts
import { handleHTMXPageRequest } from '@absolutejs/absolute';

new Elysia()
  .get('/app', () =>
    handleHTMXPageRequest('./build/pages/app.html')
  )`;
export const htmxScopedStateHtml = `\
<button hx-post="/api/increment" hx-target="#count" hx-swap="outerHTML">
  Increment
</button>

<span id="count" hx-get="/api/count" hx-trigger="load">
  Loading...
</span>

<!-- User A clicks 5 times → sees 5 -->
<!-- User B visits the page → sees 0 (their own fresh state) -->
<!-- User B clicks 2 times → sees 2 (independent from User A) -->`;
export const htmxScopedStateSetup = `\
import Elysia from 'elysia';
import { scopedState } from 'elysia-scoped-state';
import { handleHTMXPageRequest } from '@absolutejs/absolute';

new Elysia()
  .use(
    scopedState({
      count: { value: 0 },
      cart: { value: [] }
    })
  )
  .get('/app', () => handleHTMXPageRequest('./build/pages/app.html'))
  .get('/api/count', ({ scopedStore }) => {
    // Returns this user's count only
    return \`<span>\${scopedStore.count}</span>\`;
  })
  .post('/api/increment', ({ scopedStore }) => {
    // Only increments this user's count
    return \`<span>\${++scopedStore.count}</span>\`;
  })
  .listen(3000);`;
export const htmxStreamingEndpoints = `\
import { Elysia } from 'elysia';
import { handleHTMXPageRequest } from '@absolutejs/absolute';

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

new Elysia()
  .get('/dashboard', () =>
    handleHTMXPageRequest('./build/pages/dashboard.html')
  )
  .get('/dashboard/cards/summary', async () => {
    await delay(500);
    return '<article class="card"><h2>Summary</h2><p>Resolved first</p></article>';
  })
  .get('/dashboard/cards/activity', async () => {
    await delay(1800);
    return '<article class="card"><h2>Activity</h2><p>Resolved later</p></article>';
  });

// AbsoluteJS lowers each <abs-htmx-stream-slot>
// to hx-get + hx-trigger="load" + hx-swap="outerHTML".`;
export const htmxStreamingPage = `\
<!-- src/htmx/pages/dashboard.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>HTMX Live Dashboard</title>
  <script src="/htmx/htmx.min.js"></script>
</head>
<body>
  <section class="grid">
    <abs-htmx-stream-slot src="/dashboard/cards/summary">
      <article class="card card-fallback">
        <h2>Summary</h2>
        <p>Loading...</p>
      </article>
    </abs-htmx-stream-slot>

    <abs-htmx-stream-slot src="/dashboard/cards/activity">
      <article class="card card-fallback">
        <h2>Activity</h2>
        <p>Loading...</p>
      </article>
    </abs-htmx-stream-slot>
  </section>
</body>
</html>`;
