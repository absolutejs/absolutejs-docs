export const cspDefaultPolicy = `\
base-uri 'self';
connect-src 'self';
default-src 'self';
font-src 'self' data:;
form-action 'self';
img-src 'self' data: blob:;
manifest-src 'self';
object-src 'none';
script-src 'self' 'strict-dynamic' 'nonce-…';
style-src 'self' 'nonce-…';
style-src-attr 'unsafe-inline';
worker-src 'self' blob:;
frame-ancestors 'self'`;
export const cspDevAdditions = `\
connect-src 'self' ws://localhost:3000 wss://localhost:3000;
script-src 'self' 'strict-dynamic' 'nonce-…' 'unsafe-eval';`;
export const cspNoncePage = `\
// src/frontend/react/pages/Home.tsx
import { getCspNonce } from '@absolutejs/absolute/react';

const analytics = 'window.analyticsReady = true;';

export const Home = () => (
  <html>
    <head>
      <title>Home</title>
    </head>
    <body>
      <h1>Home</h1>
      <script
        dangerouslySetInnerHTML={{ __html: analytics }}
        nonce={getCspNonce()}
        suppressHydrationWarning
      />
    </body>
  </html>
);`;
export const cspNonceServerHelper = `\
// src/backend/server.ts
import { getCspNonce } from '@absolutejs/absolute';

.get('/status', () =>
  new Response(
    \`<!doctype html>
<p id="status"></p>
<script nonce="\${getCspNonce() ?? ''}">
  document.getElementById('status').textContent = 'ok';
</script>\`,
    { headers: { 'content-type': 'text/html; charset=utf-8' } }
  )
)`;
export const secureHeadersCustomize = `\
secureHeaders({
  contentSecurityPolicy: {
    directives: {
      'img-src': ["'self'", 'data:', 'https://images.example.com'],
      'object-src': false // remove a directive
    },
    reportOnly: true // send Content-Security-Policy-Report-Only
  },
  contentTypeOptions: false,
  frameAncestors: ["'none'"],
  permissionsPolicy: { camera: ['self'], geolocation: [] },
  referrerPolicy: 'no-referrer'
});`;
export const secureHeadersRemoteFonts = `\
secureHeaders({
  contentSecurityPolicy: {
    directives: {
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'style-src': ["'self'", 'https://fonts.googleapis.com']
    }
  }
});`;
export const secureHeadersSetup = `\
// src/backend/server.ts
import { asset, prepare, secureHeaders } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from '../frontend/react/pages/Home';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(secureHeaders())
  .use(absolutejs)
  .get('/', () =>
    handleReactPageRequest({
      Page: Home,
      index: asset(manifest, 'HomeIndex')
    })
  );`;
