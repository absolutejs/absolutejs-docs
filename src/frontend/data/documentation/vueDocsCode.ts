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

    return handleVuePageRequest({
      headTag: generateHeadElement({
        title: \`\${product.name} | My Store\`,
        meta: [
          { name: 'description', content: product.description }
        ]
      }),
      indexPath: asset(manifest, 'ProductsIndex'),
      pagePath: asset(manifest, 'Products'),
      props: { product, relatedProducts }
    });
  })`;
export const vueImports = `\
import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { vueImports } from './vueImporter';

export const server = new Elysia()
  .get('/svelte', async () =>
    handleSveltePageRequest({
      indexPath: asset(manifest, 'SvelteExampleIndex'),
      pagePath: asset(manifest, 'SvelteExample'),
      props: {
        cssPath: asset(manifest, 'SvelteExampleCSS'),
        initialCount: 0
      }
    })
  )
  .get('/vue', () =>
    handleVuePageRequest({
      Page: vueImports.VueExample,
      headTag: generateHeadElement({
        cssPath: asset(manifest, 'VueExampleCSS'),
        title: 'AbsoluteJS + Vue'
      }),
      indexPath: asset(manifest, 'VueExampleIndex'),
      pagePath: asset(manifest, 'VueExample'),
      props: { initialCount: 0 }
    })
  )
;`;
export const vueResource = `\
<script setup lang="ts">
import { useResource } from '@absolutejs/absolute/vue';

const profile = useResource((signal) =>
  fetch('/api/profile', { signal }).then((response) => response.json())
);

const rename = async (name: string) => {
  const updated = await saveProfile({ name });
  profile.mutate(updated);
};
</script>

<template>
  <Spinner v-if="profile.loading.value" />
  <ErrorMessage v-else-if="profile.error.value" />
  <ProfileCard v-else :profile="profile.data.value" @rename="rename" />
  <button @click="profile.refresh()">Refresh</button>
</template>`;
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
