export const svelteBuild = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  svelteDirectory: 'src/svelte'
  // Pages live in src/svelte/pages and are compiled during build
});`;
export const svelteCompilation = `\
// Your raw Svelte file:
src/svelte/pages/Dashboard.svelte

// Gets compiled into two entries in the build manifest:
Dashboard        // Compiled page component for SSR (pagePath)
DashboardIndex   // Client entry that hydrates the page (indexPath)`;
export const svelteComponent = `\
<!-- src/svelte/pages/Dashboard.svelte -->
<script lang="ts">
  import type { Stats, User } from '../../types/databaseTypes';

  type DashboardProps = {
    user: User;
    stats: Stats;
  };

  let { user, stats }: DashboardProps = $props();
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
export const svelteHandler = `\
// backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import type Dashboard from '../svelte/pages/Dashboard.svelte';

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);
    const stats = await getStats(user.id);

    // Both the page and index use asset() to get the compiled paths
    return handleSveltePageRequest<typeof Dashboard>({
      indexPath: asset(manifest, 'DashboardIndex'),
      pagePath: asset(manifest, 'Dashboard'),
      props: { user, stats }
    });
  })`;
export const svelteTypeSafetyServer = `\
// backend/server.ts
import type Dashboard from '../svelte/pages/Dashboard.svelte';

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);
    const stats = await getStats(user.id);

    // absolute typecheck reports a missing prop (TS2741), a wrong type
    // (TS2322) or an unknown prop (TS2353) against Dashboard's $props()
    return handleSveltePageRequest<typeof Dashboard>({
      indexPath: asset(manifest, 'DashboardIndex'),
      pagePath: asset(manifest, 'Dashboard'),
      props: { user, stats }
    });
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
