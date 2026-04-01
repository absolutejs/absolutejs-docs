export const errorConventionBasic = `\
src/frontend/react/pages/
  Home.tsx
  Home.error.tsx     # page-specific error boundary for Home
  About.tsx
  error.tsx          # default error page for all React pages
  not-found.tsx      # 404 page`;

export const errorComponentReact = `\
// src/frontend/react/pages/error.tsx
export const ErrorPage = ({ error }: { error: { message: string; stack?: string } }) => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      {error.stack && (
        <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.7 }}>
          {error.stack}
        </pre>
      )}
    </div>
  );
};`;

export const errorComponentSvelte = `\
<!-- src/frontend/svelte/pages/error.svelte -->
<script lang="ts">
  const { error } = $props<{ error: { message: string; stack?: string } }>();
</script>

<div style="padding: 2rem; font-family: system-ui;">
  <h1>Something went wrong</h1>
  <p>{error.message}</p>
  {#if error.stack}
    <pre style="white-space: pre-wrap; opacity: 0.7;">{error.stack}</pre>
  {/if}
</div>`;

export const errorComponentVue = `\
<!-- src/frontend/vue/pages/error.vue -->
<script setup lang="ts">
const props = defineProps<{
  error: { message: string; stack?: string }
}>();
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui;">
    <h1>Something went wrong</h1>
    <p>{{ props.error.message }}</p>
    <pre v-if="props.error.stack" style="white-space: pre-wrap; opacity: 0.7;">
      {{ props.error.stack }}
    </pre>
  </div>
</template>`;

export const errorComponentAngular = `\
// src/frontend/angular/pages/error.ts
export const renderError = (error: { message: string; stack?: string }) => {
  return \`
    <div style="padding: 2rem; font-family: system-ui;">
      <h1>Something went wrong</h1>
      <p>\${error.message}</p>
      \${error.stack ? \`<pre style="white-space: pre-wrap; opacity: 0.7;">\${error.stack}</pre>\` : ''}
    </div>
  \`;
};`;

export const notFoundReact = `\
// src/frontend/react/pages/not-found.tsx
export const NotFound = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', textAlign: 'center' }}>
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go home</a>
    </div>
  );
};`;

export const errorFallbackChain = `\
Error Fallback Chain (highest to lowest priority):

1. Page-specific error file   →  Home.error.tsx  (only for Home page)
2. Framework default error    →  error.tsx       (for all pages in that framework)
3. Generic SSR error page     →  ssrErrorPage()  (built-in fallback)`;

export const pageSpecificExample = `\
src/frontend/react/pages/
  Home.tsx              # the page component
  Home.error.tsx        # error boundary ONLY for Home
  Dashboard.tsx         # another page
  Dashboard.error.tsx   # error boundary ONLY for Dashboard
  error.tsx             # fallback for pages without a specific error file`;
