export const pprConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/react',
  svelteDirectory: 'src/frontend/svelte',
  static: {
    // Re-capture each shell in the background once it is older than 60 seconds
    revalidate: 60,
    routes: ['/pricing', '/account']
  }
});`;
export const pprPrerenderWarning = `\
[cli] Could not pre-render /account: the route responded with HTTP 500. It renders on each request instead.`;
export const pprReactPage = `\
// src/frontend/react/pages/Pricing.tsx
import { SuspenseSlot } from '@absolutejs/absolute/react/components';
import { getCart } from '../../../data/cart';

type Plan = { id: string; name: string };
type PricingProps = { plans: Plan[]; userId: string };

export const Pricing = ({ plans, userId }: PricingProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Pricing</title>
    </head>
    <body>
      <h1>Pricing</h1>

      {/* Static: rendered once into the shell */}
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>{plan.name}</li>
        ))}
      </ul>

      {/* Dynamic: rendered for each visitor */}
      <SuspenseSlot
        dynamic
        fallback={<p>Loading your cart...</p>}
        id="cart"
        resolve={async () => {
          const cart = await getCart(userId);

          return <p>{cart.items.length} items in your cart</p>;
        }}
      />
    </body>
  </html>
);`;
export const pprReactStreamSlot = `\
<StreamSlot
  dynamic
  fallbackHtml="<p>Loading your cart...</p>"
  id="cart"
  resolve={async () => {
    const cart = await getCart(userId);

    return \`<p>\${cart.items.length} items in your cart</p>\`;
  }}
/>`;
export const pprResponse = `\
HTTP/1.1 200 OK
Content-Type: text/html
Cache-Control: private, no-cache
x-absolute-partial-prerender: shell

<!-- The cached shell arrives first, with the slot fallback in place -->
<div data-absolute-slot="true" id="cart"><p>Loading your cart...</p></div>
...
<!-- This visitor's slot content streams in afterwards -->
<script nonce="...">...("cart", "<p>3 items in your cart</p>")</script>
</body></html>`;
export const pprServer = `\
// src/backend/server.ts
import { asset, prepare } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { Elysia } from 'elysia';
import { getPlans } from '../data/plans';
import { Pricing } from '../frontend/react/pages/Pricing';
import type Account from '../frontend/svelte/pages/Account.svelte';

const { absolutejs, manifest } = await prepare();

const userIdFrom = (request: Request) =>
  request.headers.get('cookie')?.match(/user=(\\w+)/)?.[1] ?? 'guest';

export const server = new Elysia()
  .use(absolutejs)
  .get('/pricing', async ({ request }) =>
    handleReactPageRequest({
      Page: Pricing,
      index: asset(manifest, 'PricingIndex'),
      props: { plans: await getPlans(), userId: userIdFrom(request) }
    })
  )
  .get('/account', ({ request }) =>
    handleSveltePageRequest<typeof Account>({
      // Svelte pages opt in to streaming slots
      collectStreamingSlots: true,
      indexPath: asset(manifest, 'AccountIndex'),
      pagePath: asset(manifest, 'Account'),
      props: { userId: userIdFrom(request) }
    })
  );`;
export const pprStaticSlot = `\
{/* Static: resolved once, when the shell is captured */}
<StreamSlot
  fallbackHtml="<p>Loading plans...</p>"
  id="plans"
  resolve={async () => {
    const plans = await getPlans();

    return \`<ul>\${plans.map((plan) => \`<li>\${plan.name}</li>\`).join('')}</ul>\`;
  }}
/>

{/* Dynamic: resolved for each visitor */}
<SuspenseSlot
  dynamic
  fallback={<p>Loading your cart...</p>}
  id="cart"
  resolve={async () => {
    const cart = await getCart(userId);

    return <p>{cart.items.length} items in your cart</p>;
  }}
/>`;
export const pprSveltePage = `\
<!-- src/frontend/svelte/pages/Account.svelte -->
<script lang="ts">
  import StreamSlot from '@absolutejs/absolute/svelte/components/StreamSlot.svelte';
  import { getCart, getRecommendations } from '../../../data/cart';

  let { userId }: { userId: string } = $props();

  const renderCart = async () => {
    const cart = await getCart(userId);

    return \`<p>\${cart.items.length} items in your cart</p>\`;
  };

  const recommendations = getRecommendations(userId);
</script>

<main>
  <h1>Your account</h1>

  <StreamSlot
    dynamic
    fallbackHtml="<p>Loading your cart...</p>"
    id="cart"
    resolve={renderCart}
  />

  <!-- absolute:stream dynamic -->
  {#await recommendations}
    <p>Loading recommendations...</p>
  {:then items}
    <p>{items.length} picked for you</p>
  {/await}
</main>`;
