export const angularHandler = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { Elysia } from 'elysia';
import type * as DashboardPage from './angular/Dashboard.server';

const app = new Elysia()
  .get('/angular', () =>
    handleAngularPageRequest<typeof DashboardPage>({
      pagePath: asset(manifest, 'Dashboard'),
      indexPath: asset(manifest, 'DashboardIndex'),
      headTag: generateHeadElement({
        title: 'AbsoluteJS + Angular',
        description: 'An Angular example with AbsoluteJS'
      }),
      props: { user: { name: 'Alex' } }
    })
  )
  .listen(3000);`;
export const elysiaIntegration = `import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Profile, Dashboard, SearchResults } from './components';

const app = new Elysia()
  // Using route params
  .get('/user/:id', ({ params: { id } }) =>
    handleReactPageRequest({
      Page: Profile,
      index: asset(manifest, 'ProfileIndex'),
      props: { userId: id }
    })
  )
  // Using cookies
  .get('/dashboard', ({ cookie: { session } }) =>
    handleReactPageRequest({
      Page: Dashboard,
      index: asset(manifest, 'DashboardIndex'),
      props: { sessionId: session?.value }
    })
  )
  // Using query params
  .get('/search', ({ query: { q, page } }) =>
    handleReactPageRequest({
      Page: SearchResults,
      index: asset(manifest, 'SearchResultsIndex'),
      props: {
        searchQuery: q,
        currentPage: parseInt(page || '1')
      }
    })
  )
  .listen(3000);`;
export const generateHead = `import { generateHeadElement } from '@absolutejs/absolute';

const headElement = generateHeadElement({
  cssPath: '/dist/styles.css',
  title: 'My Application',
  description: 'A modern web application built with AbsoluteJS'
});`;
export const htmlHandler = `import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/html', () =>
    handleHTMLPageRequest('build/pages/HTMLExample.html')
  )
  .listen(3000);`;
export const htmlStreamingHandler = `import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/reports', () =>
    handleHTMLPageRequest('build/pages/Reports.html')
  )
  .listen(3000);`;
export const htmxHandler = `import { handleHTMXPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/htmx', () =>
    handleHTMXPageRequest('build/pages/HTMXExample.html')
  )
  .listen(3000);`;
export const htmxStreamingHandler = `import { handleHTMXPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const app = new Elysia()
  .get('/htmx/live', () =>
    handleHTMXPageRequest('build/pages/LiveDashboard.html')
  )
  .get('/htmx/live/cards/summary', async () => {
    await delay(500);
    return '<article><h2>Summary</h2><p>Resolved first</p></article>';
  })
  .listen(3000);`;
export const multipleFrameworks = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import type About from './svelte/About.svelte';
import type Contact from './vue/Contact.vue';

// Import components
import Home from './react/Home';

const app = new Elysia()
  // React page
  .get('/', () =>
    handleReactPageRequest({
      Page: Home,
      index: asset(manifest, 'HomeIndex'),
      props: { title: 'Welcome' }
    })
  )
  // Svelte page
  .get('/about', () =>
    handleSveltePageRequest<typeof About>({
      pagePath: asset(manifest, 'About'),
      indexPath: asset(manifest, 'AboutIndex'),
      props: { company: '@absolutejs/absolute' }
    })
  )
  // Vue page
  .get('/contact', () =>
    handleVuePageRequest<typeof Contact>({
      pagePath: asset(manifest, 'Contact'),
      indexPath: asset(manifest, 'ContactIndex'),
      headTag: generateHeadElement({ title: 'Contact Us' }),
      props: { email: 'hello@example.com' }
    })
  )
  // Static HTML
  .get('/terms', () =>
    handleHTMLPageRequest('build/pages/terms.html')
  )
  .listen(3000);`;
export const propsExample = `import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Dashboard } from './components/Dashboard';

// Valid props: simple data types
const validProps = {
  username: 'john_doe',           // string
  age: 25,                        // number
  isActive: true,                 // boolean
  settings: {                     // object
    theme: 'dark',
    notifications: true
  },
  items: ['item1', 'item2'],      // array
  metadata: null                  // null
};

const app = new Elysia()
  .get('/dashboard', () =>
    handleReactPageRequest({
      Page: Dashboard,
      index: asset(manifest, 'DashboardIndex'),
      props: validProps
    })
  )
  .listen(3000);

// Invalid props: will cause errors
const invalidProps = {
  callback: () => {},              // Function
  date: new Date(),                // Date object
  regex: /pattern/,                // RegExp
  map: new Map(),                  // Map
  set: new Set()                   // Set
};`;
export const reactHandler = `import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from './pages/Home';

const app = new Elysia()
  .get('/', () =>
    handleReactPageRequest({
      Page: Home,
      index: asset(manifest, 'HomeIndex'),
      props: { count: 0 }
    })
  )
  .listen(3000);`;
export const svelteHandler = `import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { Elysia } from 'elysia';
import type SvelteExample from './components/SvelteExample.svelte';

const app = new Elysia()
  .get('/svelte', () =>
    handleSveltePageRequest<typeof SvelteExample>({
      pagePath: asset(manifest, 'SvelteExample'),
      indexPath: asset(manifest, 'SvelteExampleIndex'),
      props: {
        initialCount: 0,
        cssPath: asset(manifest, 'SvelteExampleCSS')
      }
    })
  )
  .listen(3000);`;
export const vueHandler = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { Elysia } from 'elysia';
import type VueExample from './components/VueExample.vue';

const app = new Elysia()
  .get('/vue', () =>
    handleVuePageRequest<typeof VueExample>({
      pagePath: asset(manifest, 'VueExample'),
      indexPath: asset(manifest, 'VueExampleIndex'),
      headTag: generateHeadElement({
        cssPath: asset(manifest, 'VueExampleCSS'),
        title: 'AbsoluteJS + Vue',
        description: 'A Vue.js example with AbsoluteJS'
      }),
      props: { initialCount: 0 }
    })
  )
  .listen(3000);`;
