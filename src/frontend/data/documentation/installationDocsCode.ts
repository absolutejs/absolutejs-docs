export const bunInstall = `\
curl -fsSL https://bun.sh/install | bash`;

export const createProject = `\
bun create absolutejs my-app`;

export const createProjectWithOptions = `\
bun create absolutejs my-app --frontend react --database drizzle`;

export const projectStructure = `\
my-app/
├── build/                 # Build output and compiled assets
├── db/                    # DB and ORM related stuff
├── src/
│   ├── backend/
│   │   ├── handlers/      # Request handlers
│   │   ├── plugins/       # Elysia plugins
│   │   ├── assets/        # Static assets
│   │   └── server.ts      # Elysia server entry point
│   ├── frontend/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Shared components
│   │   └── styles/        # CSS and styling files
│   └── types/             # TypeScript type definitions
│
├── package.json
├── tsconfig.json
└── .env`;

export const manualInstall = `\
bun add @absolutejs/absolute elysia`;

export const minimalServer = `\
import { build, handleReactPageRequest, asset } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

const manifest = await build({
  reactDirectory: './src/frontend',
});

new Elysia()
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .listen(3000);

console.log('Server running at http://localhost:3000');`;
