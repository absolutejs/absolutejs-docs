export const svelteRouterBeforeNavigate = `\
<script lang="ts">
  import { beforeNavigate } from '@absolutejs/absolute/svelte/router';

  let dirty = $state(false);

  // Browser only. Registered while the component sets up, it is
  // removed when the component is destroyed.
  beforeNavigate(() => {
    if (dirty) return false;
  });
</script>`;
export const svelteRouterGotoOutcome = `\
import { goto } from '@absolutejs/absolute/svelte/router';

const outcome = await goto('/app/admin');
// 'committed' | 'cancelled' | 'redirected' | 'superseded' | 'external'

if (outcome === 'redirected') {
  // a guard sent the navigation somewhere else
}`;
export const svelteRouterGuardTypes = `\
// Exported as types from '@absolutejs/absolute/svelte/router'
type NavigationContext = {
  from: URL | null; // null on the first render ('enter')
  to: URL; // in hash mode, to.pathname is the routed path
  params: Record<string, string | undefined>; // the guard's route, matched against to
  type: 'link' | 'goto' | 'popstate' | 'enter';
  request: Request | undefined; // the incoming request, server render only
};

type RouteGuardResult =
  | undefined
  | void
  | boolean // true allows, false cancels
  | string // redirect to this URL
  | { redirect: string; replace?: boolean };

type RouteGuard = (
  navigation: NavigationContext
) => RouteGuardResult | Promise<RouteGuardResult>;`;
export const svelteRouterHandler = `\
// backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import type App from '../frontend/svelte/pages/App.svelte';

const appPage = ({ request }: { request: Request }) =>
  handleSveltePageRequest<typeof App>({
    indexPath: asset(manifest, 'AppIndex'),
    pagePath: asset(manifest, 'App'),
    props: {},
    request // passed to guards; also sets props.url
  });

new Elysia()
  .get('/app', appPage)
  .get('/app/*', appPage);`;
export const svelteRouterLazyComponent = `\
<!-- frontend/svelte/components/Editor.svelte -->
<script lang="ts">
  // id comes from the route params, readOnly from the props prop.
  let { id, readOnly }: { id: string; readOnly: boolean } = $props();
</script>

<h1>Editing {id}</h1>`;
export const svelteRouterLazyRoute = `\
<Route
  path="/app/editor/:id"
  loader={() => import('../components/Editor.svelte')}
  props={{ readOnly: false }}
>
  {#snippet pending()}<p>Loading the editor…</p>{/snippet}
  {#snippet error(reason, retry)}
    <p>The editor failed to load.</p>
    <button onclick={retry}>Try again</button>
  {/snippet}
</Route>`;
export const svelteRouterPreload = `\
import { preloadRoute } from '@absolutejs/absolute/svelte/router';

// Start loading the chunk for the route this URL would render.
preloadRoute('/app/editor/7');`;
export const svelteRouterRouteGuard = `\
<!-- frontend/svelte/pages/App.svelte -->
<script lang="ts">
  import Route from '@absolutejs/absolute/svelte/router/Route.svelte';
  import Router from '@absolutejs/absolute/svelte/router/Router.svelte';
  import Dashboard from '../components/Dashboard.svelte';
  import Login from '../components/Login.svelte';
  import { requireUser } from '../utils/session';

  let { url }: { url?: string } = $props();
</script>

<Router {url}>
  <Route path="/app/login">
    {#snippet content()}<Login />{/snippet}
  </Route>
  <Route
    path="/app/dashboard"
    guard={({ request }) => requireUser(request, '/app/dashboard')}
  >
    {#snippet content()}<Dashboard />{/snippet}
  </Route>
</Router>`;
export const svelteRouterRouterGuard = `\
<Router
  {url}
  guard={({ to, request }) => {
    if (to.pathname.startsWith('/app/admin') && !isAdmin(request)) {
      return '/app/login';
    }
  }}
>
  <Route path="/app/admin">
    {#snippet content()}<Admin />{/snippet}
  </Route>
</Router>`;
export const svelteRouterScroll = `\
<script lang="ts">
  import Link from '@absolutejs/absolute/svelte/router/Link.svelte';
  import { goto } from '@absolutejs/absolute/svelte/router';

  const showTab = (tab: string) =>
    goto(\`/app/docs?tab=\${tab}\`, { noScroll: true });
</script>

<!-- Scrolls the element with id="install" into view -->
<Link to="/app/docs#install">Install</Link>

<!-- Keeps the current scroll position -->
<Link to="/app/docs?tab=api" noScroll>API tab</Link>
<button onclick={() => showTab('examples')}>Examples</button>`;
export const svelteRouterSession = `\
// frontend/svelte/utils/session.ts
import { redirect } from '@absolutejs/absolute/svelte/router';

// request is set during the server render and undefined in the browser.
// The browser can only read cookies that are not httpOnly, so this
// checks a signed_in flag set next to the real session cookie.
const readCookies = (request: Request | undefined) =>
  request ? (request.headers.get('cookie') ?? '') : document.cookie;

export const requireUser = (request: Request | undefined, next: string) => {
  if (!readCookies(request).includes('signed_in=1')) {
    throw redirect(\`/app/login?next=\${encodeURIComponent(next)}\`);
  }
};

export const isAdmin = (request: Request | undefined) =>
  readCookies(request).includes('role=admin');`;
