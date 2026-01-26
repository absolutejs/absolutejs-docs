export const scopedStateInstallation = `\
bun add elysia-scoped-state`;

export const scopedStateSetup = `\
import Elysia from 'elysia';
import { scopedState } from 'elysia-scoped-state';

const app = new Elysia()
  .use(
    scopedState({
      count: { value: 0 },
      username: { value: '', preserve: true }
    })
  )
  .listen(3000);`;

export const scopedStateAccess = `\
// Access and modify scoped state in route handlers
new Elysia()
  .use(scopedState({ count: { value: 0 } }))
  .get('/api/count', ({ scopedStore }) => {
    // Each user sees their own count
    return scopedStore.count;
  })
  .post('/api/increment', ({ scopedStore }) => {
    // Increment only affects this user's state
    return ++scopedStore.count;
  })
  .post('/api/decrement', ({ scopedStore }) => {
    return --scopedStore.count;
  });`;

export const scopedStatePreserve = `\
// The preserve option keeps state across page refreshes and navigation
scopedState({
  // This resets when the user refreshes or navigates away
  count: { value: 0 },

  // This persists across page refreshes and switches
  theme: { value: 'light', preserve: true },
  username: { value: '', preserve: true }
})`;

export const scopedStateReset = `\
// Programmatically reset the user's scoped store
new Elysia()
  .use(scopedState({
    count: { value: 0 },
    theme: { value: 'light', preserve: true }
  }))
  .post('/api/reset', ({ resetScopedStore }) => {
    // Resets count to 0, but keeps theme (respects preserve)
    resetScopedStore();
    return 'State reset!';
  })
  .post('/api/full-reset', ({ resetScopedStore }) => {
    // Ignores preserve flags, resets everything including theme
    resetScopedStore(true);
    return 'Full state reset!';
  });`;

export const scopedStateHtmxExample = `\
// Complete HTMX counter example with scoped state
import Elysia from 'elysia';
import { scopedState } from 'elysia-scoped-state';
import { handleHTMXPageRequest } from '@absolutejs/absolute';

new Elysia()
  .use(
    scopedState({
      count: { value: 0 }
    })
  )
  .get('/app', () => handleHTMXPageRequest('./build/pages/counter.html'))
  .get('/api/count', ({ scopedStore }) => {
    return \`<span id="count">\${scopedStore.count}</span>\`;
  })
  .post('/api/increment', ({ scopedStore }) => {
    return \`<span id="count">\${++scopedStore.count}</span>\`;
  })
  .post('/api/decrement', ({ scopedStore }) => {
    return \`<span id="count">\${--scopedStore.count}</span>\`;
  })
  .listen(3000);`;

export const scopedStateHtmxHtml = `\
<!-- counter.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Counter App</title>
  <script src="https://unpkg.com/htmx.org@1.9.10"></script>
</head>
<body>
  <h1>Personal Counter</h1>

  <div>
    Count: <span id="count" hx-get="/api/count" hx-trigger="load">0</span>
  </div>

  <button hx-post="/api/increment" hx-target="#count" hx-swap="outerHTML">
    +1
  </button>

  <button hx-post="/api/decrement" hx-target="#count" hx-swap="outerHTML">
    -1
  </button>
</body>
</html>`;
