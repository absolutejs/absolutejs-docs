export const vueServerDataBasic = `\
<!-- frontend/vue/pages/Profile.vue -->
<script setup lang="ts">
import { useServerData } from '@absolutejs/absolute/vue';

type Profile = { id: number; name: string };

const loadProfile = async (signal: AbortSignal): Promise<Profile> => {
  const response = await fetch('https://api.example.com/me', { signal });

  return response.json();
};

const { data, error, pending, refresh } = useServerData('profile', loadProfile);
</script>

<template>
  <p v-if="pending">Loading…</p>
  <p v-else-if="error">Could not load your profile: {{ error.message }}</p>
  <h1 v-else-if="data">{{ data.name }}</h1>
  <button type="button" @click="refresh">Reload</button>
</template>`;
export const vueServerDataClientOnly = `\
// The server renders the pending state; the browser loads the data.
const { data, pending } = useServerData('recommendations', loadRecommendations, {
  server: false
});`;
export const vueServerDataHandler = `\
// backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import type Profile from '../frontend/vue/pages/Profile.vue';

new Elysia().get('/profile', () =>
  handleVuePageRequest<typeof Profile>({
    indexPath: asset(manifest, 'ProfileIndex'),
    pagePath: asset(manifest, 'Profile'),
    props: {}
  })
);`;
export const vueServerDataKeys = `\
<script setup lang="ts">
import { useServerData } from '@absolutejs/absolute/vue';

const props = defineProps<{ id: number }>();

// One key per request: put the component's identity in it when the
// component appears more than once on a page.
const { data } = useServerData(\`post:\${props.id}\`, (signal) =>
  loadPost(props.id, signal)
);
</script>`;
export const vueServerDataNone = `\
// backend/server.ts
import type Pricing from '../frontend/vue/pages/Pricing.vue';

new Elysia().get('/pricing', () =>
  handleVuePageRequest<typeof Pricing>({
    client: 'none',
    pagePath: asset(manifest, 'Pricing'),
    props: { plans }
  })
);`;
export const vueServerDataPayload = `\
<script>window.__ABSOLUTE_SERVER_DATA__={"profile":{"data":{"id":1,"name":"Ada"}}}</script>`;
