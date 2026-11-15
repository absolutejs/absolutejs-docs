export const staticConventionFiles = `\
src/frontend/html/pages/
  Home.html
  Home.error.html    # used when Home.html fails
  error.html         # any other HTML page, and thrown routes
  not-found.html     # no route matched
src/frontend/htmx/pages/
  Dashboard.html
  error.html         # HTMX pages, and thrown routes on HTMX requests
  not-found.html     # unmatched HTMX requests`;
export const staticCustomOnError = `\
export const server = new Elysia()
  .onError(({ error }) => {
    console.error(error);

    return new Response('Something went wrong', { status: 500 });
  })
  .use(absolutejs)
  .get('/account', () => {
    throw new Error('database unavailable');
  });`;
export const staticErrorResponses = `\
# Development
<p>database unavailable</p>
<pre>Error: database unavailable
    at …/src/backend/server.ts:42:11</pre>

# Production
<p>Something went wrong while rendering this page.</p>
<pre></pre>`;
export const staticErrorTemplate = `\
<!-- src/frontend/html/pages/error.html -->
<!doctype html>
<html>
  <head>
    <title>Something went wrong</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../styles/indexes/site.css" />
  </head>
  <body>
    <h1>Something went wrong</h1>
    <p>{{ message }}</p>
    <pre>{{ stack }}</pre>
    <a href="/">Back to the home page</a>
  </body>
</html>`;
export const staticJsonResponses = `\
# GET /account with Accept: application/json (or */*)
500 application/problem+json
{"type":"internal-server-error","code":"internal-server-error","title":"Internal Server Error","status":500}

# GET /missing with Accept: application/json (or */*)
404 application/problem+json
{"type":"not-found","code":"not-found","status":404,"title":"Not Found"}`;
export const staticServerLog = `\
[SSR] GET /account threw: Error: database unavailable
    at …/src/backend/server.ts:42:11`;
export const staticThrowingRoute = `\
// src/backend/server.ts
export const server = new Elysia()
  .use(absolutejs)
  .get('/', () => handleHTMLPageRequest(asset(manifest, 'Home')))
  .get('/account', () => {
    throw new Error('database unavailable');
  });`;
