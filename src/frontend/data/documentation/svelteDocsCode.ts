export const svelteComponent = `\
<!-- src/svelte/pages/Dashboard.svelte -->
<script lang="ts">
  type DashboardProps = {
    user: User;
    stats: Stats;
  };

  export let user: DashboardProps['user'];
  export let stats: DashboardProps['stats'];
</script>

<svelte:head>
  <title>Dashboard | {user.name}</title>
</svelte:head>

<main>
  <h1>Welcome back, {user.name}</h1>

  <div class="stats-grid">
    <div class="stat">
      <span class="label">Total Views</span>
      <span class="value">{stats.views}</span>
    </div>
    <div class="stat">
      <span class="label">Revenue</span>
      <span class="value">\${stats.revenue}</span>
    </div>
  </div>
</main>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
</style>`;

export const svelteCompilation = `\
// Your raw Svelte file:
src/svelte/pages/Dashboard.svelte

// Gets compiled into two files:
build/DashboardPage.js    // Compiled page component for SSR
build/DashboardIndex.js   // Compiled index file for client hydration`;

export const svelteHandler = `\
// backend/server.ts
import { handleSveltePageRequest, asset } from '@absolutejs/absolute';

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);
    const stats = await getStats(user.id);

    // Both the page and index use asset() to get the compiled paths
    return handleSveltePageRequest(
      asset(manifest, 'Dashboard'),   // Compiled page for SSR
      asset(manifest, 'DashboardIndex'),  // Compiled index for hydration
      { user, stats }
    );
  })`;

export const svelteTypeSafetyTypes = `\
// db/schema.ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  avatar: text('avatar')
});

export const stats = pgTable('stats', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  views: integer('views').notNull().default(0),
  revenue: integer('revenue').notNull().default(0)
});

// types/databaseTypes.ts
export type User = typeof users.$inferSelect;
export type Stats = typeof stats.$inferSelect;`;

export const svelteTypeSafetyServer = `\
// backend/server.ts
import { User, Stats } from '../types/databaseTypes';

type DashboardProps = {
  user: User;
  stats: Stats;
};

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);
    const stats = await getStats(user.id);

    // TypeScript error if props don't match DashboardProps!
    return handleSveltePageRequest(
      asset(manifest, 'DashboardPage'),
      asset(manifest, 'DashboardIndex'),
      { user, stats }
    );
  })`;

export const svelteBuild = `\
// Configure Svelte in your build
const manifest = await build({
  svelteDirectory: 'src/svelte/pages',
  // Svelte components are compiled during build
});`;
