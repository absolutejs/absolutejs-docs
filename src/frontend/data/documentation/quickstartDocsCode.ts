export const createCommand = `\
bun create absolutejs my-app
cd my-app`;

export const runDev = `\
bun run dev`;

export const simplePageComponent = `\
// src/frontend/pages/Home.tsx
export const Home = () => (
  <html lang="en">
    <head>
      <title>My AbsoluteJS App</title>
    </head>
    <body>
      <h1>Welcome to AbsoluteJS</h1>
      <p>Your full-stack adventure starts here.</p>
    </body>
  </html>
);`;

export const simpleServer = `\
// src/backend/server.ts
import { build, handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

const manifest = await build({
  reactDirectory: './src/frontend'
});

new Elysia()
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .listen(3000);`;

export const addSecondPage = `\
// src/frontend/pages/About.tsx
export const About = () => (
  <html lang="en">
    <head>
      <title>About | My App</title>
    </head>
    <body>
      <h1>About Us</h1>
      <a href="/">Back to Home</a>
    </body>
  </html>
);`;

export const addSecondRoute = `\
import { About } from '../frontend/pages/About';

new Elysia()
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .get('/about', () => handleReactPageRequest(About, asset(manifest, 'AboutIndex')))
  .listen(3000);`;

export const addProps = `\
// src/frontend/pages/Hello.tsx
type HelloProps = {
  name: string;
};

export const Hello = ({ name }: HelloProps) => (
  <html lang="en">
    <body>
      <h1>Hello, {name}!</h1>
    </body>
  </html>
);`;

export const passProps = `\
.get('/hello/:name', ({ params: { name } }) =>
  handleReactPageRequest(Hello, asset(manifest, 'HelloIndex'), { name })
)`;
