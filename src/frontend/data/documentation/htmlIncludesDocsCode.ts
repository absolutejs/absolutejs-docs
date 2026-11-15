export const htmlIncludesCycleError = `\
error: Include cycle: src/frontend/html/partials/a.html includes itself
  include chain: src/frontend/html/pages/Loop.html → src/frontend/html/partials/a.html → src/frontend/html/partials/b.html → src/frontend/html/partials/a.html`;
export const htmlIncludesHandler = `\
// backend/server.ts
import { asset, handleHTMLPageRequest } from '@absolutejs/absolute';

new Elysia()
  .get('/about', () => handleHTMLPageRequest(asset(manifest, 'About')))
  .get('/post', () => handleHTMLPageRequest(asset(manifest, 'Post')));`;
export const htmlIncludesLayout = `\
<!-- html/layouts/base.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <abs-slot name="head"><title>My site</title></abs-slot>
  </head>
  <body>
    <abs-include src="../partials/header.html" />
    <main><abs-slot /></main>
    <abs-slot name="footer"><footer>Default footer</footer></abs-slot>
  </body>
</html>`;
export const htmlIncludesLayoutPage = `\
<!-- html/pages/About.html -->
<abs-include src="../layouts/base.html">
  <template slot="head"><title>About us</title></template>
  <h1>About us</h1>
  <abs-include src="../partials/team.html" />
</abs-include>`;
export const htmlIncludesMissingError = `\
error: <abs-include src="../partials/missing.html"> in src/frontend/html/pages/Loop.html: file not found (/home/you/app/src/frontend/html/partials/missing.html)
  include chain: src/frontend/html/pages/Loop.html → src/frontend/html/partials/missing.html`;
export const htmlIncludesNestedLayout = `\
<!-- html/layouts/article.html -->
<abs-include src="base.html">
  <template slot="head"><abs-slot name="head" /></template>
  <article><abs-slot /></article>
</abs-include>

<!-- html/pages/Post.html -->
<abs-include src="../layouts/article.html">
  <template slot="head"><title>A post</title></template>
  <h1>A post</h1>
</abs-include>`;
export const htmlIncludesPartial = `\
<!-- html/partials/header.html -->
<header>
  <a href="/">Home</a>
  <a href="/about">About</a>
</header>

<!-- html/pages/Contact.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Contact</title>
  </head>
  <body>
    <abs-include src="../partials/header.html" />
    <main>…</main>
  </body>
</html>`;
export const htmlIncludesStructure = `\
src/frontend/html/
├── pages/          # each .html file directly in here is a page
│   ├── About.html
│   └── Post.html
├── layouts/        # included only, never served on their own
│   ├── base.html
│   └── article.html
└── partials/
    ├── header.html
    └── team.html`;
export const htmlIncludesUnclosedError = `\
error: Unclosed <abs-include src="../partials/header.html"> in src/frontend/html/pages/Contact.html:8: close it with </abs-include> or make it self-closing (<abs-include … />)
  include chain: src/frontend/html/pages/Contact.html`;
