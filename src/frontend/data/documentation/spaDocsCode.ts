// Shared between the per-framework SPA pages. All examples assume the user
// installs the framework's own router (`react-router`, `vue-router`,
// `@angular/router`) — except Svelte, which uses the AbsoluteJS-shipped
// `@absolutejs/absolute/svelte/router`.

export const wildcardRoutePattern = `\
// backend/server.ts — register a wildcard route per page so refresh /
// deep-link on any sub-route hits the same handler. The native router
// then dispatches based on the URL.
new Elysia()
  .get('/dashboard', dashboardHandler)
  .get('/dashboard/*', dashboardHandler)
  .listen(3000);`;

// ─────────────────────────────────────────────────────────────────────────
// React
// ─────────────────────────────────────────────────────────────────────────

export const reactSpaHandler = `\
// backend/server.ts
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { ReactSpa } from '../frontend/react/pages/ReactSpa';

const reactHandler = ({ request }: { request: Request }) =>
  handleReactPageRequest({
    Page: ReactSpa,
    index: asset(manifest, 'ReactSpaIndex'),
    props: { cssPath: asset(manifest, 'SpaCSS') },
    request, // ← URL auto-injected as props.url for the page
  });

new Elysia()
  .get('/react', reactHandler)
  .get('/react/*', reactHandler);`;

export const reactSpaPage = `\
// frontend/react/pages/ReactSpa.tsx
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  StaticRouter,
  useLocation,
} from 'react-router';

type ReactSpaProps = {
  url?: string; // auto-injected from request by the page handler
  cssPath?: string;
};

export const ReactSpa = ({ url, cssPath }: ReactSpaProps) => {
  // <StaticRouter location> on the server, <BrowserRouter> on the client.
  // The url prop is undefined on the client — that's the cue to switch.
  const isServer = typeof window === 'undefined';
  const Router = isServer ? StaticRouter : BrowserRouter;
  const routerProps = isServer ? { location: url ?? '/' } : {};

  return (
    <html>
      <head>{cssPath && <link rel="stylesheet" href={cssPath} />}</head>
      <body>
        <Router {...routerProps}>
          <nav>
            <Link to="/react">Home</Link>
            <Link to="/react/settings">Settings</Link>
            <Link to="/react/profile">Profile</Link>
          </nav>
          <Routes>
            <Route path="/react" element={<HomeView />} />
            <Route path="/react/settings" element={<SettingsView />} />
            <Route path="/react/profile" element={<ProfileView />} />
          </Routes>
        </Router>
      </body>
    </html>
  );
};`;

// ─────────────────────────────────────────────────────────────────────────
// Svelte
// ─────────────────────────────────────────────────────────────────────────

export const svelteSpaHandler = `\
// backend/server.ts
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import type SvelteSpa from '../frontend/svelte/pages/SvelteSpa.svelte';

const svelteHandler = ({ request }: { request: Request }) =>
  handleSveltePageRequest<typeof SvelteSpa>({
    indexPath: asset(manifest, 'SvelteSpaIndex'),
    pagePath: asset(manifest, 'SvelteSpa'),
    props: { cssPath: asset(manifest, 'SpaCSS') },
    request, // ← URL auto-injected as props.url for the page
  });

new Elysia()
  .get('/svelte', svelteHandler)
  .get('/svelte/*', svelteHandler);`;

export const svelteSpaPage = `\
<!-- frontend/svelte/pages/SvelteSpa.svelte -->
<script lang="ts">
  import Link from '@absolutejs/absolute/svelte/router/Link.svelte';
  import Route from '@absolutejs/absolute/svelte/router/Route.svelte';
  import Router from '@absolutejs/absolute/svelte/router/Router.svelte';
  import { page } from '@absolutejs/absolute/svelte/router';

  type Props = { url?: string; cssPath?: string };
  let { url, cssPath }: Props = $props();
</script>

<Router {url}>
  <nav>
    <Link to="/svelte">Home</Link>
    <Link to="/svelte/settings">Settings</Link>
    <Link to="/svelte/profile">Profile</Link>
  </nav>

  <Route path="/svelte">
    {#snippet content()}<h2>Home</h2>{/snippet}
  </Route>
  <Route path="/svelte/settings">
    {#snippet content()}<h2>Settings</h2>{/snippet}
  </Route>
  <Route path="/svelte/profile">
    {#snippet content()}<h2>Profile</h2>{/snippet}
  </Route>

  <p>Current path: {page.url.pathname}</p>
</Router>`;

export const svelteRouterPrimitives = `\
import {
  // Components (import each from its file path):
  // <Router>  — context provider, owns the registry + match resolver
  // <Route>   — declarative path matcher, renders its snippet at its
  //             own DOM location when active
  // <Link>    — anchor wrapper with click interception + prefetch
  // ↑ These three are available as 'svelte/router/Router.svelte' etc.

  // Programmatic API (importable from the package root):
  goto,           // (url, opts?) — programmatic nav, runs View Transition
  pushState,      // (url, state) — shallow routing (no Route swap)
  replaceState,   // (url, state) — same but with history.replaceState
  page,           // reactive route state — page.url, page.params, page.state

  // Types:
  type GotoOptions,
  type PageState,
  type RouterMode,
  type LinkPrefetchMode,
  type ExtractRouteParams,
} from '@absolutejs/absolute/svelte/router';`;

export const svelteRouteParams = `\
<!-- :param syntax — params type is INFERRED from the path literal -->
<Route path="/users/:id">
  {#snippet content(params)}
    <!-- params is { id: string } — fully typed, no annotation -->
    <p>User #{params.id}</p>
  {/snippet}
</Route>

<Route path="/users/:id/posts/:postId?">
  {#snippet content(params)}
    <!-- params is { id: string; postId: string | undefined } -->
    <p>User {params.id}, post {params.postId ?? '(none)'}</p>
  {/snippet}
</Route>

<Route path="/files/*">
  {#snippet content(params)}
    <!-- params is { wildcard: string } -->
    <p>File path: {params.wildcard}</p>
  {/snippet}
</Route>`;

export const sveltePageRune = `\
// page is a Svelte 5 $state-backed reactive object. Direct property
// access in templates re-renders. Mirrors SvelteKit's \`page\` from
// \`$app/state\` — same shape, same names.
import { page } from '@absolutejs/absolute/svelte/router';

// page.url       — URL object for the current path (reactive)
// page.url.pathname / .search / .hash / .searchParams
// page.params    — Record<string, string | undefined> from active Route
// page.state     — value attached to history.state (set via goto/pushState)`;

export const svelteGoto = `\
import { goto, pushState, replaceState } from '@absolutejs/absolute/svelte/router';

// Programmatic navigation. Triggers View Transitions when supported.
await goto('/dashboard');
await goto('/login', { replaceState: true });
await goto('/users/42', {
  state: { from: 'search' }, // available via page.state
  noScroll: true,
  keepFocus: true,
});

// Shallow routing — update URL bar + page.state without re-running
// <Route> matching. Useful for modals / drawers / side panels that
// want a shareable URL but shouldn't swap the active route.
pushState('/photos/42', { modal: 'photo', id: 42 });
replaceState('/photos/42', { modal: 'photo', id: 42 });`;

export const svelteLink = `\
<!-- <Link> renders a real <a href> for progressive enhancement.
     Click is intercepted on same-origin URLs (modifier-key clicks,
     target=_blank, download, and external URLs all fall through to
     a normal full-page navigation). -->

<Link to="/settings">Settings</Link>

<!-- Hover prefetch is on by default; viewport / off are alternatives. -->
<Link to="/profile" prefetch="viewport">Profile</Link>
<Link to="/contact" prefetch="none">Contact</Link>

<!-- Use replaceState instead of pushState (matches SvelteKit's API). -->
<Link to="/login" replaceState>Log in</Link>

<!-- All standard <a> attributes pass through. -->
<Link to="/docs" class="btn-primary" aria-label="Open docs">Docs</Link>`;

export const svelteHashMode = `\
<!-- Hash mode is opt-in via the mode prop. The matcher operates against
     window.location.hash (with the leading "#/" stripped) instead of
     window.location.pathname. Useful for static deploys (GitHub Pages,
     S3, etc.) where the host can't be configured to wildcard-route to
     a single HTML file. -->

<Router mode="hash" {url}>
  <Route path="/dashboard">
    {#snippet content()}<Dashboard />{/snippet}
  </Route>
</Router>

<!-- URL: https://example.com/#/dashboard -->`;

export const svelteNestedRouter = `<!-- Nested <Router> blocks compose their basepaths. The inner router
     matches against the full URL, but its <Route path> values are
     interpreted relative to the stacked basepath. Useful for embeddable
     SPA fragments shipped as packages. -->

<Router basepath="/portal" {url}>
  <Router basepath="/admin">
    <Route path="/users">
      {#snippet content()}<!-- matches /portal/admin/users -->{/snippet}
    </Route>
  </Router>
</Router>`;

// ─────────────────────────────────────────────────────────────────────────
// Vue
// ─────────────────────────────────────────────────────────────────────────

export const vueSpaHandler = `\
// backend/server.ts
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import type VueSpa from '../frontend/vue/pages/VueSpa.vue';

const vueHandler = ({ request }: { request: Request }) =>
  handleVuePageRequest<typeof VueSpa>({
    headTag: generateHeadElement({
      cssPath: asset(manifest, 'SpaCSS'),
      title: 'AbsoluteJS SPA — Vue',
    }),
    indexPath: asset(manifest, 'VueSpaIndex'),
    pagePath: asset(manifest, 'VueSpa'),
    request, // ← passed into the page module's setupApp() hook
  });

new Elysia()
  .get('/vue', vueHandler)
  .get('/vue/*', vueHandler);`;

export const vueSpaPage = `\
<!-- frontend/vue/pages/VueSpa.vue -->
<script setup lang="ts">
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouterLink,
  RouterView,
} from 'vue-router';

const routes = [
  { path: '/vue', component: { template: '<h2>Home</h2>' } },
  { path: '/vue/settings', component: { template: '<h2>Settings</h2>' } },
  { path: '/vue/profile', component: { template: '<h2>Profile</h2>' } },
];
</script>

<template>
  <nav>
    <RouterLink to="/vue">Home</RouterLink>
    <RouterLink to="/vue/settings">Settings</RouterLink>
    <RouterLink to="/vue/profile">Profile</RouterLink>
  </nav>
  <RouterView />
</template>

<script lang="ts">
// vue-router's history mode differs between server (memory) and client
// (web). The router must be installed via app.use() AND awaited via
// router.isReady() BEFORE renderToWebStream — otherwise the active
// route doesn't resolve in time for SSR. AbsoluteJS exposes a
// setupApp() hook for exactly this lifecycle window.
import type { App } from 'vue';
import { applyVueRouterRedirect } from '@absolutejs/absolute/vue';

export const setupApp = async (
  app: App,
  { url, isServer, setRedirect }: {
    url: string;
    isServer: boolean;
    setRedirect: (location: string, status?: number) => void;
  }
) => {
  const router = createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });
  app.use(router);
  if (isServer) await router.push(url);
  await router.isReady(); // ← required on BOTH sides for clean hydration

  // Optional: convert vue-router redirects (from guards or redirect rules)
  // into HTTP 302s instead of rendering the redirected route's HTML.
  if (isServer) applyVueRouterRedirect(router, url, setRedirect);
};
</script>`;

export const vueSetupAppHook = `\
// The Vue page handler invokes the page module's exported setupApp()
// hook between createSSRApp() and renderToWebStream(). This is the
// only place to install vue-router (or vue-i18n, or pinia, etc.) so
// the renderer sees the configured app.

// Signature:
type SetupApp = (
  app: App,
  ctx: {
    url: string;        // request pathname + search (server) / window URL (client)
    isServer: boolean;  // true on SSR, false on hydration
    setRedirect: (
      location: string,
      status?: number  // defaults to 302
    ) => void;
  }
) => void | Promise<void>;`;

export const vueRedirectHelper = `\
import { applyVueRouterRedirect } from '@absolutejs/absolute/vue';

// applyVueRouterRedirect compares the requested URL against
// router.currentRoute.value.fullPath after router.isReady(). If a
// vue-router guard or redirect rule sent the user somewhere else, it
// invokes setRedirect() so the page handler emits a 302 instead of
// rendering the redirected page's HTML.

export const setupApp = async (app, { url, isServer, setRedirect }) => {
  const router = createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });

  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !isLoggedIn()) return '/login';
  });

  app.use(router);
  if (isServer) await router.push(url);
  await router.isReady();

  // After isReady(), if the auth guard above redirected, this fires.
  if (isServer) applyVueRouterRedirect(router, url, setRedirect);
};

// Pass a custom status for permanent redirects:
//   applyVueRouterRedirect(router, url, setRedirect, 308);`;

// ─────────────────────────────────────────────────────────────────────────
// Angular
// ─────────────────────────────────────────────────────────────────────────

export const angularSpaHandler = `\
// backend/server.ts
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import type * as AngularSpaPage from '../frontend/angular/pages/angular-spa';

const angularHandler = ({ request }: { request: Request }) =>
  handleAngularPageRequest<typeof AngularSpaPage>({
    headTag: generateHeadElement({
      cssPath: asset(manifest, 'SpaCSS'),
      title: 'AbsoluteJS SPA — Angular',
    }),
    indexPath: asset(manifest, 'AngularSpaIndex'),
    pagePath: asset(manifest, 'AngularSpa'),
    request, // ← request.url forwarded into renderApplication
  });

new Elysia()
  .get('/angular', angularHandler)
  .get('/angular/*', angularHandler);`;

export const angularSpaPage = `\
// frontend/angular/pages/angular-spa.ts
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  provideRouter,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  type Routes,
} from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'spa-home',
  standalone: true,
  template: '<h2>Home</h2>',
})
export class HomeView {}

@Component({
  imports: [CommonModule],
  selector: 'spa-settings',
  standalone: true,
  template: '<h2>Settings</h2>',
})
export class SettingsView {}

const routes: Routes = [
  { component: HomeView, path: 'angular' },
  { component: SettingsView, path: 'angular/settings' },
];

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'angular-spa-page',
  standalone: true,
  template: \`
    <nav>
      <a routerLink="/angular" routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/angular/settings" routerLinkActive="active">Settings</a>
    </nav>
    <router-outlet />
  \`,
})
export class AngularSpaComponent {
  private router = inject(Router);
}

// Page-level providers — exported so the AbsoluteJS Angular handler
// installs them when bootstrapping. provideRouter is the standard
// Angular way to wire @angular/router; the AbsoluteJS adapter forwards
// request.url into renderApplication so the router resolves the correct
// initial route during SSR.
export const providers = [provideRouter(routes)];

export default AngularSpaComponent;`;

export const angularRedirectBridge = `\
// AbsoluteJS automatically translates Angular Router redirects (issued
// from guards via router.navigate, redirectTo on a Route, etc.) into
// HTTP 302s during SSR. The bridge subscribes to router.events,
// watches for NavigationCancel with code Redirect, captures the
// next NavigationStart's URL, and writes Location + 302 to the
// outgoing response. No user code required — it's wired in
// handleAngularPageRequest itself.

// Example: a CanActivate guard returning a UrlTree triggers a 302.
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const requireAuth: CanActivateFn = () => {
  const router = inject(Router);
  if (!isLoggedIn()) return router.parseUrl('/login');
  return true;
};

const routes: Routes = [
  { component: ProfileView, path: 'profile', canActivate: [requireAuth] },
];
// SSR request to /profile while logged out → 302 Location: /login`;
