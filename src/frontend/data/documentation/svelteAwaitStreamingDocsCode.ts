export const svelteAwaitBuildError = `\
error: /home/you/app/src/frontend/svelte/pages/Activity.svelte:
the then branch of a streamed {#await} holds Svelte markup (<U…)
(<!-- absolute:stream --> streams plain HTML; remove the directive
to let Svelte render the block and hydrate it)`;
export const svelteAwaitPlain = `\
<!-- frontend/svelte/pages/Activity.svelte -->
<script lang="ts">
  import UpdateList from '../components/UpdateList.svelte';

  let { userName }: { userName: string } = $props();

  const activity = getActivity();
</script>

<h1>Hello, {userName}</h1>

{#await activity}
  <p>Loading activity…</p>
{:then updates}
  {#if updates.length > 0}
    <UpdateList {updates} />
  {:else}
    <p>Nothing new.</p>
  {/if}
{:catch error}
  <p>Could not load activity: {error.message}</p>
{/await}`;
export const svelteAwaitStreamBlock = `\
<!-- frontend/svelte/pages/Activity.svelte -->
<script lang="ts">
  let { userName }: { userName: string } = $props();
</script>

<h1>Hello, {userName}</h1>

<!-- absolute:stream -->
{#await getActivityCount()}
  <p>Loading activity…</p>
{:then count}
  <p>{count} updates since your last visit</p>
{:catch error}
  <p>Could not load activity: {error.message}</p>
{/await}`;
export const svelteAwaitStreamHandler = `\
// backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import type Activity from '../frontend/svelte/pages/Activity.svelte';

new Elysia().get('/activity', () =>
  handleSveltePageRequest<typeof Activity>({
    collectStreamingSlots: true,
    indexPath: asset(manifest, 'ActivityIndex'),
    pagePath: asset(manifest, 'Activity'),
    props: { userName: 'Ada' }
  })
);`;
