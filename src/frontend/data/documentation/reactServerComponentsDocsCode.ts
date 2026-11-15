export const rscAsyncPage = `\
// src/frontend/rsc/pages/Dashboard.tsx
import { Suspense } from 'react';
import { getActivity, getProject } from '../../../data/projects';
import { LikeButton } from '../components/LikeButton';

export type DashboardProps = { projectId: string };

const Activity = async ({ projectId }: DashboardProps) => {
  const events = await getActivity(projectId);

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.label}</li>
      ))}
    </ul>
  );
};

export const Dashboard = async ({ projectId }: DashboardProps) => {
  const project = await getProject(projectId);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{project.name}</title>
      </head>
      <body>
        <h1>{project.name}</h1>
        <LikeButton initialLikes={project.likes} />
        <Suspense fallback={<p>Loading activity...</p>}>
          <Activity projectId={projectId} />
        </Suspense>
      </body>
    </html>
  );
};`;

export const rscClientComponent = `\
// src/frontend/rsc/components/LikeButton.tsx
'use client';

import { useState } from 'react';

type LikeButtonProps = { initialLikes: number };

export const LikeButton = ({ initialLikes }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button onClick={() => setLikes(likes + 1)} type="button">
      {likes} likes
    </button>
  );
};`;

export const rscConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/react',
  reactServerComponentsDirectory: 'src/frontend/rsc'
});`;

export const rscInstall = `\
# Use the exact version of react in your package.json (19.2.3 or later)
bun add react-server-dom-webpack@19.2.3`;

export const rscLayout = `\
src/frontend/rsc/
├── pages/
│   ├── Dashboard.tsx     → asset(manifest, 'DashboardRSC')
│   └── ReportsRSC.tsx    → asset(manifest, 'ReportsRSC')
└── components/
    └── LikeButton.tsx    'use client'`;

export const rscRoute = `\
// src/backend/server.ts
import { asset, prepare } from '@absolutejs/absolute';
import { handleReactServerPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import type { DashboardProps } from '../frontend/rsc/pages/Dashboard';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(absolutejs)
  .get('/projects/:id', ({ params }) =>
    handleReactServerPageRequest<DashboardProps>({
      page: asset(manifest, 'DashboardRSC'),
      props: { projectId: params.id }
    })
  );`;

export const rscSecureHeaders = `\
import { asset, prepare, secureHeaders } from '@absolutejs/absolute';
import { handleReactServerPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(secureHeaders())
  .use(absolutejs)
  .get('/reports', () =>
    handleReactServerPageRequest({ page: asset(manifest, 'ReportsRSC') })
  );`;

export const rscSlots = `\
// src/frontend/rsc/pages/ReportsRSC.tsx
import {
  Link,
  StreamSlot,
  SuspenseSlot
} from '@absolutejs/absolute/react/components';
import { getAlerts, getRevenue } from '../../../data/reports';

const renderAlerts = async () => {
  const alerts = await getAlerts();

  return \`<p>\${alerts.length} open alerts</p>\`;
};

export const ReportsRSC = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Reports</title>
    </head>
    <body>
      <Link href="/projects/42">Back to the dashboard</Link>

      {/* React content, rendered on the server */}
      <SuspenseSlot
        fallback={<p>Loading revenue...</p>}
        id="revenue"
        promise={getRevenue()}
      >
        {(revenue) => <p>Revenue: {revenue}</p>}
      </SuspenseSlot>

      {/* An HTML string */}
      <StreamSlot
        fallbackHtml="<p>Loading alerts...</p>"
        id="alerts"
        resolve={renderAlerts}
      />
    </body>
  </html>
);`;
