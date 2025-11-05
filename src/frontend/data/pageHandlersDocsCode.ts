// TODO: Fix code samples
export const pageHandlersDocsCode = {
    'reactHandler': `import { handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { Home } from './components/Home';
import { manifest } from './build';

const app = new Elysia()
  .get('/', ({ cookie: { theme } }) => 
    handleReactPageRequest(
      Home,
      asset(manifest, 'HomeIndex'),
      { theme: theme?.value }
    )
  )
  .listen(3000);`,

    'svelteHandler': `import { handleSveltePageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import SvelteExample from './components/SvelteExample.svelte';
import { manifest } from './build';

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
  .listen(3000);`,

    'vueHandler': `import { handleVuePageRequest, generateHeadElement, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import VueExample from './components/VueExample.vue';
import { manifest } from './build';


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
  .listen(3000);`,

    'htmlHandler': `import { handleHTMLPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/static', () =>
    handleHTMLPageRequest('build/pages/HTMLExample.html')
  )
  .listen(3000);`,

    'htmxHandler': `import { handleHTMXPageRequest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/htmx', () =>
    handleHTMXPageRequest('build/pages/HTMXExample.html')
  )
  .listen(3000);`,

    'generateHead': `import { generateHeadElement } from '@absolutejs/absolute';

const headElement = generateHeadElement({
  cssPath: '/dist/styles.css',
  title: 'My Application',
  description: 'A modern web application built with AbsoluteJS'
});`,

    'multipleFrameworks': `import { 
  handleReactPageRequest, 
  handleSveltePageRequest, 
  handleVuePageRequest,
  handleHTMLPageRequest,
  asset 
} from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { manifest } from './build';

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
  .listen(3000);`,

    'propsExample': `import { handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Dashboard } from './components/Dashboard';
import { manifest } from './build';


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

app.get('/dashboard', () =>
  handleReactPageRequest(
    Dashboard,
    asset(manifest, 'DashboardIndex'),
    validProps
  )
);

// Invalid props - will cause errors
const invalidProps = {
  callback: () => {},              // ❌ Function
  date: new Date(),                // ❌ Date object
  regex: /pattern/,                // ❌ RegExp
  map: new Map(),                  // ❌ Map
  set: new Set()                   // ❌ Set
};`,

    'elysiaIntegration': `import { handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { Profile } from './components/Profile';
import { manifest } from './build';


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
  .listen(3000);`
};
