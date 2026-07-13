export const errorComponentAngular = `\
// src/frontend/angular/pages/error.ts
import { defineRenderErrorPage } from '@absolutejs/absolute';

export default defineRenderErrorPage(({ name, message, stack }) => \`<!DOCTYPE html>
<html>
  <body style="padding: 2rem; font-family: system-ui;">
    <h1>\${name}: Something went wrong</h1>
    <p>\${message}</p>
    \${stack ? \`<pre style="white-space: pre-wrap; opacity: 0.7;">\${stack}</pre>\` : ''}
  </body>
</html>\`);`;
export const errorComponentHtml = `\
<!-- drop in any pages dir, e.g. src/frontend/react/pages/error.html -->
<!DOCTYPE html>
<html>
  <body style="padding: 2rem; font-family: system-ui;">
    <h1>{{name}}: Something went wrong</h1>
    <p>{{message}}</p>
    <pre style="white-space: pre-wrap; opacity: 0.7;">{{stack}}</pre>
  </body>
</html>`;
export const errorComponentReact = `\
// src/frontend/react/pages/error.tsx
import type { ErrorPageProps } from '@absolutejs/absolute';

export const ErrorPage = ({ name, message, stack }: ErrorPageProps) => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{name}: Something went wrong</h1>
      <p>{message}</p>
      {stack && (
        <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.7 }}>
          {stack}
        </pre>
      )}
    </div>
  );
};`;
export const errorComponentSvelte = `\
<!-- src/frontend/svelte/pages/error.svelte -->
<script lang="ts">
  import type { ErrorPageProps } from '@absolutejs/absolute';
  let { name, message, stack }: ErrorPageProps = $props();
</script>

<div style="padding: 2rem; font-family: system-ui;">
  <h1>{name}: Something went wrong</h1>
  <p>{message}</p>
  {#if stack}
    <pre style="white-space: pre-wrap; opacity: 0.7;">{stack}</pre>
  {/if}
</div>`;
export const errorComponentVue = `\
<!-- src/frontend/vue/pages/error.vue -->
<script setup lang="ts">
import type { ErrorPageProps } from '@absolutejs/absolute';
defineProps<ErrorPageProps>();
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui;">
    <h1>{{ name }}: Something went wrong</h1>
    <p>{{ message }}</p>
    <pre v-if="stack" style="white-space: pre-wrap; opacity: 0.7;">
      {{ stack }}
    </pre>
  </div>
</template>`;
export const errorConventionBasic = `\
src/frontend/react/pages/
  Home.tsx
  Home.error.tsx     # page-specific error boundary for Home
  About.tsx
  error.tsx          # default error page for all React pages
  not-found.tsx      # 404 page
  error.html         # universal HTML fallback (any framework, zero config)
  not-found.html     # universal 404 fallback`;
export const errorFallbackChain = `\
Error Fallback Chain (highest to lowest priority):

1. Page-specific error file   →  Home.error.tsx  (only for Home page)
2. Framework default error    →  error.tsx       (for all pages in that framework)
3. Universal HTML fallback    →  error.html      (any framework, token-replaced)
4. Generic SSR error page     →  ssrErrorPage()  (built-in last resort)`;
export const notFoundAngular = `\
// src/frontend/angular/pages/not-found.ts
import { defineRenderNotFoundPage } from '@absolutejs/absolute';

export default defineRenderNotFoundPage(() => \`<!DOCTYPE html>
<html>
  <body style="padding: 2rem; font-family: system-ui; text-align: center;">
    <h1>404</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go home</a>
  </body>
</html>\`);`;
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
export const pageSpecificExample = `\
src/frontend/react/pages/
  Home.tsx              # the page component
  Home.error.tsx        # error boundary ONLY for Home
  Dashboard.tsx         # another page
  Dashboard.error.tsx   # error boundary ONLY for Dashboard
  error.tsx             # fallback for pages without a specific error file`;
