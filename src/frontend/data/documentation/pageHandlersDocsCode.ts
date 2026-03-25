export const reactHandler = `import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from './pages/Home';

const app = new Elysia()
  .get('/', () =>
    handleReactPageRequest(
      Home,
      asset(manifest, 'HomeIndex'),
      { count: 0 }
    )
  )
  .listen(3000);`;

export const svelteHandler = `import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { Elysia } from 'elysia';
import SvelteExample from './components/SvelteExample.svelte';

const app = new Elysia()
  .get('/svelte', () =>
    handleSveltePageRequest(
      SvelteExample,
      asset(manifest, 'SvelteExample'),
      asset(manifest, 'SvelteExampleIndex'),
      {
        initialCount: 0,
        cssPath: asset(manifest, 'SvelteExampleCSS')
      }
    )
  )
  .listen(3000);`;

export const vueHandler = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { Elysia } from 'elysia';
import VueExample from './components/VueExample.vue';

const app = new Elysia()
  .get('/vue', () =>
    handleVuePageRequest(
      VueExample,
      asset(manifest, 'VueExample'),
      asset(manifest, 'VueExampleIndex'),
      generateHeadElement({
        cssPath: asset(manifest, 'VueExampleCSS'),
        title: 'AbsoluteJS + Vue',
        description: 'A Vue.js example with AbsoluteJS'
      }),
      { initialCount: 0 }
    )
  )
  .listen(3000);`;

export const angularHandler = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/angular', () =>
    handleAngularPageRequest(
      () => import('./angular/Dashboard.server'),
      asset(manifest, 'Dashboard'),
      asset(manifest, 'DashboardIndex'),
      generateHeadElement({
        title: 'AbsoluteJS + Angular',
        description: 'An Angular example with AbsoluteJS'
      }),
      { user: { name: 'Alex' } }
    )
  )
  .listen(3000);`;

export const htmlHandler = `import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/html', () =>
    handleHTMLPageRequest('build/pages/HTMLExample.html')
  )
  .listen(3000);`;

export const htmxHandler = `import { handleHTMXPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/htmx', () =>
    handleHTMXPageRequest('build/pages/HTMXExample.html')
  )
  .listen(3000);`;

export const generateHead = `import { generateHeadElement } from '@absolutejs/absolute';

const headElement = generateHeadElement({
  cssPath: '/dist/styles.css',
  title: 'My Application',
  description: 'A modern web application built with AbsoluteJS'
});`;

export const multipleFrameworks = `import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

// Import components
import Home from './react/Home';
import About from './svelte/About.svelte';
import Contact from './vue/Contact.vue';

const app = new Elysia()
  // React page
  .get('/', () =>
    handleReactPageRequest(
      Home,
      asset(manifest, 'HomeIndex'),
      { title: 'Welcome' }
    )
  )
  // Svelte page
  .get('/about', () =>
    handleSveltePageRequest(
      About,
      asset(manifest, 'About'),
      asset(manifest, 'AboutIndex'),
      { company: '@absolutejs/absolute' }
    )
  )
  // Vue page
  .get('/contact', () =>
    handleVuePageRequest(
      Contact,
      asset(manifest, 'Contact'),
      asset(manifest, 'ContactIndex'),
      generateHeadElement({ title: 'Contact Us' }),
      { email: 'hello@example.com' }
    )
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

// Valid props - simple data types
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
    handleReactPageRequest(
      Dashboard,
      asset(manifest, 'DashboardIndex'),
      validProps
    )
  )
  .listen(3000);

// Invalid props - will cause errors
const invalidProps = {
  callback: () => {},              // Function
  date: new Date(),                // Date object
  regex: /pattern/,                // RegExp
  map: new Map(),                  // Map
  set: new Set()                   // Set
};`;

export const elysiaIntegration = `import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Profile, Dashboard, SearchResults } from './components';

const app = new Elysia()
  // Using route params
  .get('/user/:id', ({ params: { id } }) =>
    handleReactPageRequest(
      Profile,
      asset(manifest, 'ProfileIndex'),
      { userId: id }
    )
  )
  // Using cookies
  .get('/dashboard', ({ cookie: { session } }) =>
    handleReactPageRequest(
      Dashboard,
      asset(manifest, 'DashboardIndex'),
      { sessionId: session?.value }
    )
  )
  // Using query params
  .get('/search', ({ query: { q, page } }) =>
    handleReactPageRequest(
      SearchResults,
      asset(manifest, 'SearchResultsIndex'),
      {
        searchQuery: q,
        currentPage: parseInt(page || '1')
      }
    )
  )
  .listen(3000);`;
