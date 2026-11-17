// Every sample below ran in a fresh create-absolutejs app on
// @absolutejs/absolute 0.20.0-beta.178 to beta.181 before publishing; the
// form-action samples ran on beta.191 and beta.192.

export const angularDefer = `@defer (on timer(300ms)) {
  <section class="activity">{{ stats.updates }} updates since your last visit</section>
} @placeholder {
  <p>Loading activity…</p>
}`;
export const angularPage = `export type Context = { stats: Stats };

@Component({ selector: 'dashboard-page', standalone: true, templateUrl: '../templates/dashboard.html' })
export class DashboardComponent {
  stats = usePageContext<Context>().stats;
}`;
export const angularRoute = `.get('/dashboard', async () =>
  handleAngularPageRequest<DashboardPage.Context>({
    indexPath: asset(manifest, 'DashboardIndex'),
    pagePath: asset(manifest, 'Dashboard'),
    requestContext: { stats: await getStats() }
  })
)`;
export const htmlLayout = `<!doctype html>
<html>
  <head>
    <abs-slot name="head"><title>My site</title></abs-slot>
  </head>
  <body>
    <abs-include src="../partials/header.html"></abs-include>
    <main><abs-slot></abs-slot></main>
  </body>
</html>`;
export const htmlPage = `<abs-include src="../layouts/base.html">
  <template slot="head"><title>About us</title></template>
  <h1>About us</h1>
  <absolute-island framework="react" component="ContactForm" hydrate="visible"></absolute-island>
</abs-include>`;
export const htmxAction = `.post(
  '/actions/greet',
  {
    form: {
      body: t.Object({ name: t.String({ error: 'Name too short', minLength: 2 }) }),
      htmx: (result: ActionResult<{ hello: string }>) =>
        result.status === 'success'
          ? \`<p>Hello \${result.data?.hello}</p>\`
          : \`<p>\${result.errors.name}</p>\`
    }
  },
  ({ body }) => ({ hello: body.name })
)`;
export const htmxRoute = `.post(
  '/htmx/greet',
  { body: t.Object({ name: t.String({ minLength: 2 }) }) },
  ({ body }) => \`<p id="greeting">Hi \${body.name}</p>\`
)`;
export const htmxState = `const visitorState = scopedState({ count: { value: 0 } });

new Elysia()
  .use([absolutejs, api, visitorState])
  .post('/htmx/increment', ({ scopedStore }) => ++scopedStore.count);`;
export const islandStore = `export const counterStore = createIslandStore('counter', { count: 0 }, (set) => ({
  increment: () => set((state) => ({ count: state.count + 1 }))
}));`;
export const openingRoute = `new Elysia()
  .use(absolutejs)
  .get('/dashboard', () =>
    handleSveltePageRequest<typeof Dashboard>({
      indexPath: asset(manifest, 'DashboardIndex'),
      pagePath: asset(manifest, 'Dashboard'),
      props: { stats }
    })
  );`;
export const reactAction = `.use(auth) // derives user
.post(
  '/actions/signup',
  {
    form: t.Object({
      email: t.String({ error: 'Enter a valid email', format: 'email' }),
      name: t.String({
        error: 'Name must be at least 2 characters',
        minLength: 2
      })
    })
  },
  ({ body, fail, user }) =>
    body.name === 'taken'
      ? fail({ name: 'That name is taken' })
      : { greeting: \`Welcome, \${body.name}\`, invitedBy: user?.name }
)`;
export const reactClient = `import { createFormActionClient } from '@absolutejs/absolute/react/hooks';
import type { server } from '../backend/server';

export const actions = createFormActionClient<typeof server>();`;
export const reactForm = `const signup = actions.useFormAction('/actions/signup', {
  initialState: signupState
});

<form {...signup.formProps}>
  <input name="name" defaultValue={signup.values.name} />
  {signup.errors.name && <p>{signup.errors.name}</p>}
  …
</form>`;
export const reactRoute = `.get('/signup', (): Promise<Response> =>
  handleReactPageRequest({
    Page: Signup,
    index: asset(manifest, 'SignupIndex'),
    props: { signupState: actions.getActionState('/actions/signup') ?? null }
  })
)`;
export const reactServerComponent = `.get('/report', () =>
  handleReactServerPageRequest({ page: asset(manifest, 'ReportRSC'), props: { month } })
)`;
export const reactSlot = `<SuspenseSlot fallback={<p>Loading…</p>} id="activity" resolve={loadActivity} />`;
export const sveltePage = `<script lang="ts">
  let { stats, user }: { stats: Stats; user: User } = $props();
</script>`;
export const svelteRoute = `.get('/dashboard', () =>
  handleSveltePageRequest<typeof Dashboard>({
    indexPath: asset(manifest, 'DashboardIndex'),
    pagePath: asset(manifest, 'Dashboard'),
    props: { stats, user: 'ada' }   // TS2322: Type 'string' is not assignable to type 'User'.
  })
)`;
export const svelteRouter = `<Router {url}>
  <Route
    path="/app/dashboard"
    guard={async ({ request }) => {
      const user = await loadUser(request);
      if (!user) throw redirect('/app/login?next=/app/dashboard');
    }}
  >
    {#snippet content()}<Dashboard />{/snippet}
  </Route>
</Router>`;
export const svelteStreamBlock = `<!-- absolute:stream -->
{#await getActivity()}
  <p>Loading activity…</p>
{:then activity}
  <p>{activity.length} updates since your last visit</p>
{/await}`;
export const svelteStreamHandler = `handleSveltePageRequest<typeof Dashboard>({
  collectStreamingSlots: true,
  indexPath: asset(manifest, 'DashboardIndex'),
  pagePath: asset(manifest, 'Dashboard'),
  props: { stats, user }
})`;
export const vueNone = `.get('/pricing', () =>
  handleVuePageRequest<typeof Pricing>({
    client: 'none',
    pagePath: asset(manifest, 'Pricing'),
    props: { plans }
  })
)`;
export const vueRoutes = `<script lang="ts">
import { defineRoutes } from '@absolutejs/absolute/vue';

export const routes = defineRoutes([
  { path: '/app/one', component: () => import('./One.vue').then((m) => m.default) },
  { path: '/app', redirect: '/app/one' }
]);
</script>

<template><RouterView /></template>`;
export const vueServerData = `<script setup lang="ts">
import { useServerData } from '@absolutejs/absolute/vue';

const { data, error, pending, refresh } = useServerData('profile', loadProfile);
</script>`;
