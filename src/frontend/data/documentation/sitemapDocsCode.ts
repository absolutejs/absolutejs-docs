export const sitemapCustomConfig = `\
// absolute.config.ts : with sitemap options
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  publicDirectory: './public',
  sitemap: {
    // Public origin for production. Defaults to the server's listening
    // origin (e.g. http://localhost:3000) when unset — typically you'd
    // env-gate this so dev keeps localhost.
    baseUrl: process.env.SITE_URL,

    // Defaults applied to every URL unless overridden per-route.
    defaultChangefreq: 'daily',
    defaultPriority: 0.7,

    // Drop matching routes from the sitemap. Strings match exactly;
    // regexes test against the full URL path.
    exclude: [
      '/admin',
      /^\\/internal/,
      /^\\/admin(\\/|$)/  // also drops every /admin/* sub-route
    ],

    // Final override layer — beats handler-level sitemap options.
    overrides: {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/blog': { lastmod: '2026-03-28', priority: 0.9 }
    }
  }
});`;
export const sitemapPerPageMetadata = `\
// Backend route handler — pass an optional 'sitemap' option to
// handle*PageRequest. AbsoluteJS reads it statically from the handler
// source at registration time and uses it on the sitemap entries
// produced from that route.
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';

app
  .get('/', async ({ request }) =>
    handleAngularPageRequest<typeof HomePage>({
      request,
      pagePath: 'Home',
      indexPath: 'assets/index.js',
      sitemap: { changefreq: 'daily', priority: 1.0 }
    })
  )
  .get('/signin', async ({ request }) =>
    handleAngularPageRequest<typeof SigninPage>({
      request,
      pagePath: 'Signin',
      indexPath: 'assets/index.js',
      sitemap: { changefreq: 'monthly', priority: 0.3 }
    })
  );
// The sitemap option is type-checked but has no runtime cost — the
// page handler ignores it. Values must be literals (strings / numbers);
// computed expressions can't be read statically, so use sitemap.overrides
// in absolute.config.ts for those.`;
export const sitemapSpaAngular = `\
// Angular page module (e.g. portal.ts) — no doc-specific changes.
// AbsoluteJS statically reads the APP_BASE_HREF useValue and the
// Routes array you pass to provideRouter() at sitemap-generation time.
import { APP_BASE_HREF } from '@angular/common';
import { provideRouter, type Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard').then(m => m.DashboardComponent) },
  { path: 'profile',   loadComponent: () => import('../profile/profile').then(m => m.ProfileComponent) },
  { path: 'users/:id', loadComponent: () => import('../user/user').then(m => m.UserComponent) }, // dynamic — auto-excluded
  { path: 'settings',  data: { sitemap: 'exclude' }, loadComponent: () => import('../settings/settings').then(m => m.SettingsComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }, // redirect — auto-excluded
];

export const providers = [
  provideRouter(routes),
  { provide: APP_BASE_HREF, useValue: '/portal/' }
];
// Emits: /portal/dashboard, /portal/profile
// (skips :id, settings opt-out, and the empty redirect)`;
export const sitemapSpaReact = `\
// React page — AbsoluteJS reads the createBrowserRouter routes and
// the basename option at sitemap-generation time.
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'profile',   element: <Profile /> },
  { path: 'users/:id', element: <User /> }, // dynamic — auto-excluded
  { path: 'settings', handle: { sitemap: 'exclude' }, element: <Settings /> },
];

const router = createBrowserRouter(routes, { basename: '/portal' });
// Emits: /portal/dashboard, /portal/profile`;
export const sitemapSpaVue = `\
// Vue page — AbsoluteJS reads the createWebHistory base and the routes
// option passed to createRouter() at sitemap-generation time.
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/profile',   component: Profile },
  { path: '/users/:id', component: User }, // dynamic — auto-excluded
  { path: '/settings',  meta: { sitemap: 'exclude' }, component: Settings },
];

createRouter({
  history: createWebHistory('/portal/'),
  routes
});
// Emits: /portal/dashboard, /portal/profile`;
export const sitemapSpaSvelte = `\
<!-- Svelte page — AbsoluteJS reads <Router basepath> and child
     <Route path> tags. -->
<script>
  import Router from '@absolutejs/absolute/svelte/router/Router.svelte';
  import Route from '@absolutejs/absolute/svelte/router/Route.svelte';
  import Dashboard from '../dashboard.svelte';
  import Profile from '../profile.svelte';
</script>

<Router basepath="/portal">
  <Route path="/dashboard"><Dashboard /></Route>
  <Route path="/profile"><Profile /></Route>
</Router>
<!-- Emits: /portal/dashboard, /portal/profile -->`;
export const sitemapWildcardElysiaRoute = `\
// Backend Elysia route that hosts the Angular SPA at /portal/*.
// AbsoluteJS sees the wildcard, matches its mount path (/portal)
// against the page module's APP_BASE_HREF (/portal/), and emits one
// sitemap entry per non-dynamic Angular Route under that mount.
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';

app.get('/portal/*', async ({ request }) =>
  handleAngularPageRequest<typeof PortalPage>({
    request,
    pagePath: 'Portal',
    indexPath: 'assets/portal/index.js',
    sitemap: { changefreq: 'weekly', priority: 0.6 }
  })
);
// The wildcard mount itself isn't emitted (it isn't a destination URL)
// — every leaf under the page's Router config is.`;
export const sitemapDynamicRoutes = `\
// absolute.config.ts : with dynamic routes
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  publicDirectory: './public',
  sitemap: {
    baseUrl: 'https://mysite.com',

    // Provide additional routes that can't be auto-discovered
    // (e.g. parameterized routes like /blog/:slug).
    routes: async () => {
      const posts = await db.query('SELECT slug FROM posts');
      return posts.map(p => \`/blog/\${p.slug}\`);
    }
  }
});`;
export const sitemapOutput = `\
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Top-level pages from .get() handlers -->
  <url>
    <loc>https://mysite.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://mysite.com/signin</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <!-- SPA sub-routes discovered from the page module's router config -->
  <url>
    <loc>https://mysite.com/portal/dashboard</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://mysite.com/portal/profile</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
export const sitemapTypeReference = `\
type SitemapConfig = {
  baseUrl?: string;
  exclude?: (string | RegExp)[];
  defaultChangefreq?: ChangeFrequency;
  defaultPriority?: number;
  overrides?: Record<string, SitemapRouteOverride>;
  routes?: () => string[] | Promise<string[]>;
};

type ChangeFrequency =
  | 'always' | 'hourly' | 'daily'
  | 'weekly' | 'monthly' | 'yearly' | 'never';

type SitemapRouteOverride = {
  changefreq?: ChangeFrequency;
  priority?: number;
  lastmod?: string;
};

// Accepted as an optional 'sitemap' field on every framework's
// page-handler input (handleAngularPageRequest, handleReactPageRequest,
// handleSveltePageRequest, handleVuePageRequest, handleHTMLPageRequest).
type PageHandlerSitemapMetadata = SitemapRouteOverride;`;
export const sitemapZeroConfig = `\
// absolute.config.ts : sitemap is automatic
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend'
  // That's it. Sitemap generation is built in.
  // On server start, AbsoluteJS discovers your page routes
  // and writes sitemap.xml to the build directory.
});`;
