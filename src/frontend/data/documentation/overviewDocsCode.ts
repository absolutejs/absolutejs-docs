export const simpleExample = `\
import { build, handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

const manifest = await build({
  reactDirectory: './src/frontend'
});

new Elysia()
  .get('/', () =>
    handleReactPageRequest(Home, asset(manifest, 'HomeIndex'))
  )
  .listen(3000);`;

export const multiFrameworkExample = `\
import { build, handleReactPageRequest, handleSveltePageRequest } from '@absolutejs/absolute';

const manifest = await build({
  reactDirectory: './src/frontend/react',
  svelteDirectory: './src/frontend/svelte'
});

new Elysia()
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .get('/dashboard', () => handleSveltePageRequest(Dashboard, pagePath, indexPath))
  .listen(3000);`;

export const installCommand = `\
bun create absolutejs my-app`;
