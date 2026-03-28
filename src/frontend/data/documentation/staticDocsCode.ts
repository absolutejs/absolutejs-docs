export const ssgConfigAll = `\
// absolute.config.ts
import { defineConfig } from "@absolutejs/absolute";

export default defineConfig({
  reactDirectory: "./src/frontend/react",
  svelteDirectory: "./src/frontend/svelte",
  // ...
  static: {
    routes: "all",
  },
});`;

export const ssgConfigRoutes = `\
// absolute.config.ts
import { defineConfig } from "@absolutejs/absolute";

export default defineConfig({
  reactDirectory: "./src/frontend/react",
  // ...
  static: {
    routes: ["/", "/about", "/pricing", "/blog"],
  },
});`;

export const isrConfig = `\
// absolute.config.ts
import { defineConfig } from "@absolutejs/absolute";

export default defineConfig({
  reactDirectory: "./src/frontend/react",
  // ...
  static: {
    routes: "all",
    revalidate: 60, // re-render stale pages every 60 seconds
  },
});`;

export const ssgOutput = `\
$ absolute start

  Building assets (3.15s)
  Bundling production server (544ms)
  Pre-rendering static pages (5 pages, 512ms)

  ABSOLUTEJS v0.19.0  ready in 4.19s

  ➜  Local:   http://localhost:3000/`;

export const staticConfigType = `\
type StaticConfig = {
  /** Routes to pre-render. Use "all" to crawl and discover all linked pages. */
  routes: string[] | "all";

  /** Revalidation interval in seconds (ISR). Optional. */
  revalidate?: number;
};`;

export const isrFlow = `\
// How ISR works at runtime:

// 1. Page pre-rendered at build time (e.g. 12:00:00)
//    revalidate: 60 means it's valid for 60 seconds

// 2. Request at 12:00:30 → serves cached HTML instantly (still fresh)

// 3. Request at 12:01:15 → page is stale (75s > 60s)
//    - Serves the stale HTML immediately (no waiting)
//    - Triggers a background re-render
//    - Fresh HTML is saved to disk

// 4. Next request → gets the freshly re-rendered page`;

export const compileCommand = `\
# Compile everything into a single standalone binary
absolute compile

# With options
absolute compile src/backend/server.ts --outdir dist --outfile my-app`;

export const compileOutput = `\
$ absolute compile

  Building assets (3.31s)
  Bundling production server (614ms)
  Pre-rendering pages (5 pages, 981ms)
  Compiling standalone executable (110ms)

  Compiled to ./compiled-server (97MB) in 5.02s
  Run with: ./compiled-server`;

export const compileRun = `\
# Run the compiled binary — no dependencies needed
./compiled-server

# Or set a custom port
PORT=8080 ./compiled-server`;

export const compilePackageJson = `\
{
  "scripts": {
    "dev": "absolute dev",
    "start": "absolute start",
    "compile": "absolute compile",
    "serve": "./compiled-server"
  }
}`;

export const noStaticConfig = `\
// Without static config — every page is SSR'd on each request
export default defineConfig({
  reactDirectory: "./src/frontend/react",
  // no static field = pure SSR
});`;
