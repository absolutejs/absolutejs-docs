export const navigationCartStore = `// src/shared/cartStore.ts
import { createIslandStore } from '@absolutejs/absolute/client';

export const cartStore = createIslandStore('cart', { items: 0 }, (set) => ({
  addItem: () => set((state) => ({ items: state.items + 1 }))
}));`;

export const navigationEvents = `import { navigateDocument } from '@absolutejs/absolute/client/navigation';

window.addEventListener('absolute:before-navigate', (event) => {
  // Cancel link and programmatic navigations
  if (hasUnsavedChanges()) event.preventDefault();
});

window.addEventListener('absolute:after-navigate', (event) => {
  if (event instanceof CustomEvent) console.log('now on', event.detail.url);
});

const outcome = await navigateDocument('/checkout', { replace: true });
// 'swapped' | 'reloaded' | 'superseded' | 'cancelled'`;

export const navigationOptions = `import { enableNavigation } from '@absolutejs/absolute/client/navigation';

enableNavigation({
  // Return false for a normal page load to this URL
  shouldIntercept: (url) => !url.pathname.startsWith('/admin'),
  // Default true. Skipped for users who prefer reduced motion.
  viewTransition: false
});`;

export const navigationOptOut = `<!-- On a link or on any parent element -->
<a data-absolute-navigation="off" href="/legacy">Legacy page</a>`;

export const navigationPrefetchReact = `import { Link } from '@absolutejs/absolute/react/components';

export const StoreNav = () => (
  <nav>
    <Link href="/checkout" prefetch="hover">
      Checkout
    </Link>
    <Link href="/pricing" prefetch="viewport" prerender>
      Pricing
    </Link>
    <Link data-absolute-navigation="off" href="/legacy" prefetch="none">
      Legacy page
    </Link>
  </nav>
);`;

export const navigationPrefetchSvelte = `<script lang="ts">
  import Link from '@absolutejs/absolute/svelte/router/Link.svelte';
</script>

<nav>
  <Link to="/store" prefetch="hover">Back to the store</Link>
  <Link to="/pricing" prefetch="viewport" prerender>Pricing</Link>
  <Link to="/legacy" prefetch="none" data-absolute-navigation="off">
    Legacy page
  </Link>
</nav>`;

export const navigationReactPage = `// src/frontend/react/pages/Store.tsx
import { useEffect } from 'react';
import { enableNavigation } from '@absolutejs/absolute/client/navigation';
import { Link } from '@absolutejs/absolute/react/components';
import { useIslandStore } from '@absolutejs/absolute/react/hooks';
import { cartStore } from '../../../shared/cartStore';

export const Store = () => {
  const items = useIslandStore(cartStore, (state) => state.items);
  const addItem = useIslandStore(cartStore, (state) => state.addItem);

  useEffect(() => {
    enableNavigation();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Store</title>
      </head>
      <body>
        <nav>
          <Link href="/checkout">Checkout</Link>
        </nav>
        <button onClick={addItem} type="button">
          Add to cart ({items})
        </button>
      </body>
    </html>
  );
};`;

export const navigationSveltePage = `<!-- src/frontend/svelte/pages/Checkout.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Link from '@absolutejs/absolute/svelte/router/Link.svelte';
  import { enableNavigation } from '@absolutejs/absolute/client/navigation';
  import { useIslandStore } from '@absolutejs/absolute/svelte';
  import { cartStore } from '../../../shared/cartStore';

  const items = useIslandStore(cartStore, (state) => state.items);

  onMount(() => {
    enableNavigation();
  });
</script>

<svelte:head>
  <title>Checkout</title>
</svelte:head>

<nav>
  <Link to="/store">Back to the store</Link>
</nav>
<p>Items in your cart: {$items}</p>`;
