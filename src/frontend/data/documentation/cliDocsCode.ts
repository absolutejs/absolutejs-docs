export const devCommand = `\
# Start development server with HMR
absolute dev

# With a custom server entry
absolute dev src/backend/server.ts

# With a custom config
absolute dev --config ./my-config.ts`;
export const devConfigExample = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  dev: {
    https: true,
    devtools: {
      projectRoot: '.',
      uuidCachePath: '.cache/absolute/devtools-uuid',
      normalizeForWindowsContainer: true
    }
  }
});`;
export const devOutput = `\
$ absolute dev

  ABSOLUTEJS v0.19.0  ready in 1.23s

  ➜  Local: http://localhost:3000/
  ➜  Network: http://192.168.1.42:3000/`;
export const devtoolsJsonResponse = `\
{
  "workspace": {
    "root": "\\\\\\\\wsl.localhost\\\\Ubuntu\\\\home\\\\alex\\\\my-app",
    "uuid": "8e6dbf15-ff89-4fda-a640-a62416da70cc"
  }
}`;
export const devtoolsPluginExample = `\
import { Elysia } from 'elysia';
import { devtoolsJson, networking } from '@absolutejs/absolute';

const app = new Elysia()
  .use(devtoolsJson('build', {
    projectRoot: '.',
    uuidCachePath: '.cache/absolute/devtools-uuid'
  }))
  .get('/', () => 'hello')
  .use(networking);`;
export const startCommand = `\
# Build and start production server
absolute start

# With a custom output directory
absolute start --outdir build

# With a custom server entry
absolute start src/backend/server.ts`;
export const startOutput = `\
$ absolute start

  Building assets (3.15s)
  Bundling production server (544ms)

  ABSOLUTEJS v0.19.0  ready in 3.69s

  ➜  Local: http://localhost:3000/`;
export const startWithSSG = `\
$ absolute start

  Building assets (3.15s)
  Bundling production server (544ms)
  Pre-rendering static pages (5 pages, 512ms)

  ABSOLUTEJS v0.19.0  ready in 4.19s

  ➜  Local: http://localhost:3000/`;
