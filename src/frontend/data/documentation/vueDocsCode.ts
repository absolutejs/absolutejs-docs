export const vueBuild = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  vueDirectory: 'frontend/vue'
});`;
export const vueComponent = `\
<!-- src/vue/pages/Products.vue -->
<script setup lang="ts">
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type ProductsProps = {
  product: Product;
  relatedProducts: Product[];
};

const props = defineProps<ProductsProps>();
</script>

<template>
  <div class="product-page">
    <h1>{{ props.product.name }}</h1>
    <p class="price">\${{ props.product.price }}</p>
    <p>{{ props.product.description }}</p>

    <section v-if="props.relatedProducts.length > 0">
      <h2>Related Products</h2>
      <ul>
        <li v-for="related in props.relatedProducts" :key="related.id">
          <a :href="\`/products/\${related.id}\`">{{ related.name }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.price {
  font-size: 1.5rem;
  color: var(--primary);
}
</style>`;
export const vueGenerateHead = `\
import { generateHeadElement } from '@absolutejs/absolute';

// generateHeadElement creates the head tag string for you
const head = generateHeadElement({
  title: 'Page Title',
  meta: [
    { name: 'description', content: 'Page description' },
    { name: 'keywords', content: 'vue, ssr, absolutejs' },
    { property: 'og:title', content: 'Open Graph Title' },
    { property: 'og:image', content: '/images/og.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://example.com/page' },
    { rel: 'icon', href: '/favicon.ico' }
  ]
});

// Returns a string like:
// <title>Page Title</title>
// <meta name="description" content="Page description">
// <meta property="og:title" content="Open Graph Title">
// <link rel="canonical" href="https://example.com/page">`;
export const vueHandler = `\
// backend/server.ts
import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';

new Elysia()
  .get('/products/:id', async ({ params }) => {
    const product = await getProduct(params.id);
    const relatedProducts = await getRelatedProducts(product.categoryId);

    return handleVuePageRequest(
      asset(manifest, 'Products'),   // Compiled page for SSR
      asset(manifest, 'ProductsIndex'),  // Compiled index for hydration
      generateHeadElement({                 // Head tags
        title: \`\${product.name} | My Store\`,
        meta: [
          { name: 'description', content: product.description }
        ]
      }),
      { product, relatedProducts }          // Type-safe props
    );
  })`;
export const vueImports = `\
import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import SvelteExample from './svelte/pages/SvelteExample.svelte';
import { vueImports } from './vueImporter';

export const server = new Elysia()
  .get('/svelte', async () =>
    handleSveltePageRequest(
      SvelteExample,
      asset(manifest, 'SvelteExample'),
      asset(manifest, 'SvelteExampleIndex'),
      {
        cssPath: asset(manifest, 'SvelteExampleCSS'),
        initialCount: 0
      }
    )
  )
  .get('/vue', () =>
    handleVuePageRequest(
      vueImports.VueExample,
      asset(manifest, 'VueExample'),
      asset(manifest, 'VueExampleIndex'),
      generateHeadElement({
        cssPath: asset(manifest, 'VueExampleCSS'),
        title: 'AbsoluteJS + Vue'
      }),
      { initialCount: 0 }
    )
  )
;`;
export const vueTypeSafety = `\
// Vue 3 with TypeScript provides complete type safety
// defineProps<T>() ensures compile-time type checking

<script setup lang="ts">
// Types are enforced at compile time
type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
};

type AdminDashboardProps = {
  user: User;
  systemStats: SystemStats;
};

// TypeScript error if server sends wrong types!
const props = defineProps<AdminDashboardProps>();

// Computed properties are also type-safe
const isAdmin = computed(() => props.user.role === 'admin');
</script>`;
