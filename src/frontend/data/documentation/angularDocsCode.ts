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
import { defineAngularPage } from '@absolutejs/absolute/angular';
import { Component, inject, InjectionToken } from '@angular/core';

type DashboardProps = {
  user: {
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
};

export const USER = new InjectionToken<DashboardProps['user']>('USER');

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
  readonly user = inject(USER);
}

// Explicit page declaration: selects the render root and carries the prop type.
export const page = defineAngularPage<DashboardProps>({
  component: Dashboard
});`;
export const angularDeterministicEnv = `\
import {
  DETERMINISTIC_NOW,
  DETERMINISTIC_RANDOM,
  provideDeterministicEnv
} from '@absolutejs/absolute/angular';
import { Component, inject } from '@angular/core';

@Component({
  providers: [
    provideDeterministicEnv({
      now: '2026-04-29T12:00:00.000Z',
      seed: 'auth-shell-dots'
    })
  ],
  selector: 'auth-shell',
  standalone: true,
  template: \`
    @for (dot of dots; track dot.id) {
      <span class="dot" [style.left.%]="dot.x" [style.top.%]="dot.y"></span>
    }
  \`
})
export class AuthShell {
  private readonly random = inject(DETERMINISTIC_RANDOM);
  readonly renderedAt = inject(DETERMINISTIC_NOW);

  readonly dots = Array.from({ length: 40 }, (_, id) => ({
    id,
    x: Math.round(this.random() * 100),
    y: Math.round(this.random() * 100)
  }));
}`;
export const angularHandler = `\
// backend/server.ts
import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import type * as DashboardPage from '../angular/Dashboard.server';

new Elysia()
  .get('/dashboard', async ({ cookie }) => {
    const user = await getUser(cookie);

    return handleAngularPageRequest<typeof DashboardPage>({
      pagePath: asset(manifest, 'Dashboard'),
      indexPath: asset(manifest, 'DashboardIndex'),
      headTag: generateHeadElement({
        title: 'Dashboard',
        description: 'User dashboard'
      }),
      props: { user }
    });
  })`;
export const angularHttpTransferCache = `\
import {
  ABSOLUTE_HTTP_TRANSFER_CACHE_SKIP_HEADER,
  buildAbsoluteHttpTransferCacheOptions
} from '@absolutejs/absolute/angular';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

// AbsoluteJS applies these defaults automatically during SSR and hydration.
export const providers = [
  provideClientHydration(
    withHttpTransferCacheOptions(buildAbsoluteHttpTransferCacheOptions())
  )
];

// Add the skip header when one HttpClient request should always refetch.
export class AccountService {
  private readonly http = inject(HttpClient);

  account$ = this.http.get('/api/account', {
    headers: {
      [ABSOLUTE_HTTP_TRANSFER_CACHE_SKIP_HEADER]: '1'
    }
  });
}`;
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
  .get('/', () => handleReactPageRequest({ Page: Home, index: asset(manifest, 'HomeIndex') }))
  .get('/admin', () =>
    handleAngularPageRequest<typeof AdminPage>({
      pagePath: asset(manifest, 'Admin'),
      indexPath: asset(manifest, 'AdminIndex'),
      headTag: generateHeadElement({ title: 'Admin Panel' }),
      props: { stats: adminStats }
    })
  )
  .get('/store', () =>
    handleVuePageRequest<typeof Store>({
      pagePath: asset(manifest, 'Store'),
      indexPath: asset(manifest, 'StoreIndex'),
      headTag: generateHeadElement({ title: 'Store' }),
      props: { products }
    })
  )`;
export const angularProviderModel = `\
// src/angular/Admin.server.ts
import { Component } from '@angular/core';
import { defineAngularPage } from '@absolutejs/absolute/angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'admin-page',
  standalone: true,
  template: '<router-outlet />'
})
export class AdminPage {}

// Canonical app DI location. AbsoluteJS uses this on the server and the client.
export const providers = [
  provideHttpClient(withFetch()),
  provideRouter(routes)
];

export const page = defineAngularPage({ component: AdminPage });`;
export const angularResolverPendingTask = `\
import { withPendingTask } from '@absolutejs/absolute/angular';
import type { ResolveFn } from '@angular/router';

type Account = {
  id: string;
  name: string;
};

export const accountResolver: ResolveFn<Account> = () =>
  withPendingTask(async () => {
    // Use this for custom async work that Angular cannot track itself.
    const account = await accountSdk.currentAccount();

    return account;
  });`;
export const angularTypeSafety = `\
// Types flow from your server to Angular components via props
// The page handler enforces type safety at the boundary
import { defineAngularPage } from '@absolutejs/absolute/angular';
import { Component, inject, InjectionToken } from '@angular/core';

// 1. Define your props type
type SettingsProps = {
  user: User;
  preferences: UserPreferences;
};

// 2. Angular component receives typed props via matching InjectionTokens
export const USER = new InjectionToken<SettingsProps['user']>('USER');
export const PREFERENCES = new InjectionToken<SettingsProps['preferences']>(
  'PREFERENCES'
);

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
  readonly user = inject(USER);
  readonly preferences = inject(PREFERENCES);
}

export const page = defineAngularPage<SettingsProps>({
  component: Settings
});

// 3. Server passes type-safe props
.get('/settings', async ({ cookie }) => {
  const user = await getUser(cookie);
  const preferences = await getPreferences(user.id);

  // TypeScript error if props don't match SettingsProps!
  return handleAngularPageRequest<typeof SettingsPage>({
    pagePath: asset(manifest, 'Settings'),
    indexPath: asset(manifest, 'SettingsIndex'),
    headTag: generateHeadElement({ title: 'Settings' }),
    props: { user, preferences }
  });
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
