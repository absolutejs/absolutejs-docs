export const angularBuild = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  angularDirectory: 'src/angular'
});`;
export const angularClientScripts = `\
// For dynamic client-side behavior, use registerClientScript
import { registerClientScript } from '@absolutejs/absolute';

// Register scripts that run after hydration
registerClientScript(() => {
  const button = document.querySelector('.my-button');
  if (button) {
    button.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  }
});`;
export const angularComponent = `\
// src/angular/Dashboard.server.ts
import { Component, Input } from '@angular/core';

type DashboardProps = {
  user: {
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`
    <div class="dashboard">
      <h1>Welcome back, {{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
    </div>
  \`,
  styles: [\`
    .dashboard {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  \`]
})
export class Dashboard {
  @Input() user!: DashboardProps['user'];
}

// Export the factory for the page handler
export const factory = (props: DashboardProps) => Dashboard;`;
export const angularHandler = `\
// backend/server.ts
import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);

    return handleAngularPageRequest(
      () => import('../angular/Dashboard.server'),  // Page importer
      asset(manifest, 'Dashboard'),                 // Compiled page path
      asset(manifest, 'DashboardIndex'),             // Client index path
      generateHeadElement({                          // Head tags
        title: 'Dashboard',
        description: 'User dashboard'
      }),
      { user }                                       // Type-safe props
    );
  })`;
export const angularHydration = `\
// Server-side rendering
// 1. Server renders the component using Angular platform-server
// 2. Props are serialized to window.__INITIAL_PROPS__
// 3. Client-side Angular bootstraps and hydrates the page
// 4. The component becomes interactive with all Angular features

// Zoneless by default : no Zone.js needed
// Uses provideZonelessChangeDetection() for optimal performance

// Production: AOT compilation : Angular Linker removes the compiler from bundles
// Development: JIT compilation : faster rebuilds for instant HMR`;
export const angularMultiFramework = `\
// Use Angular alongside other frameworks
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/react',
  angularDirectory: './src/angular',
  vueDirectory: './src/vue'
});

// server.ts: mix and match frameworks per route
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';

new Elysia()
  .use(absolutejs)
  .get('/', () => handleReactPageRequest(Home, asset(manifest, 'HomeIndex')))
  .get('/admin', () =>
    handleAngularPageRequest(
      () => import('../angular/Admin.server'),
      asset(manifest, 'Admin'),
      asset(manifest, 'AdminIndex'),
      generateHeadElement({ title: 'Admin Panel' }),
      { stats: adminStats }
    )
  )
  .get('/store', () =>
    handleVuePageRequest(
      Store,
      asset(manifest, 'Store'),
      asset(manifest, 'StoreIndex'),
      generateHeadElement({ title: 'Store' }),
      { products }
    )
  )`;
export const angularTypeSafety = `\
// Types flow from your server to Angular components via props
// The page handler enforces type safety at the boundary

// 1. Define your props type
type SettingsProps = {
  user: User;
  preferences: UserPreferences;
};

// 2. Angular component receives typed props via @Input
@Component({
  selector: 'app-settings',
  standalone: true,
  template: \`
    <div>
      <h1>Settings for {{ user.name }}</h1>
      <label>
        Theme:
        <select [value]="preferences.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  \`
})
export class Settings {
  @Input() user!: SettingsProps['user'];
  @Input() preferences!: SettingsProps['preferences'];
}

// 3. Server passes type-safe props
.get('/settings', async ({ cookie }) => {
  const user = await getUser(cookie);
  const preferences = await getPreferences(user.id);

  // TypeScript error if props don't match SettingsProps!
  return handleAngularPageRequest(
    () => import('../angular/Settings.server'),
    asset(manifest, 'Settings'),
    asset(manifest, 'SettingsIndex'),
    generateHeadElement({ title: 'Settings' }),
    { user, preferences }
  );
})`;
export const angularViewTransitions = `\
// CSS-only changes: stylesheet is hot-swapped instantly : no re-bootstrap

// Template or logic changes: View Transitions API for zero-flicker updates
// 1. Capture component state via ng.getComponent() + DOM snapshot
// 2. document.startViewTransition() : browser captures a screenshot
// 3. Destroy old app, recreate root element, import updated module
// 4. bootstrapApplication() renders new content behind the screenshot
// 5. Restore state via ng.getComponent() + ng.applyChanges()
// 6. View transition resolves : browser crossfades to new content

// The user never sees empty or default state : only before and after.
// Form inputs, scroll positions, and component state all survive.
// Without View Transitions API support, it falls back gracefully.`;
