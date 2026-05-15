export const angularBuild = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';
import { appProviders } from './src/angular/appProviders';

export default defineConfig({
  angularDirectory: 'src/angular',
  // Optional. Pass a real typed value (not a string path) so TS catches
  // a missing import or renamed binding. The framework AST-parses this
  // file at build time to find the source of \`appProviders\`, then
  // injects a matching \`import { appProviders } from "..."\` plus an
  // \`export const providers = [...appProviders, /* router, base-href */]\`
  // directly into every page's compiled server output. SSR reads
  // \`pageModule.providers\`, the client wrapper reads it from the same
  // module — single \`@angular/core\` instance for page + providers.
  angular: { providers: appProviders }
});`;
export const angularAppProviders = `\
// src/angular/appProviders.ts
import { provideHttpClient, withFetch } from '@angular/common/http';
import type { EnvironmentProviders, Provider } from '@angular/core';

// Global DI every Angular page on this server gets at SSR + client bootstrap.
// Per-page additions (router, APP_BASE_HREF) are auto-wired by the build,
// so keep this file focused on cross-cutting concerns: http, error
// handlers, interceptors, locale, app-wide services.
export const appProviders: ReadonlyArray<Provider | EnvironmentProviders> = [
  provideHttpClient(withFetch())
];`;
export const angularPageWithRoutes = `\
// src/angular/portal/portal.ts
import { Component } from '@angular/core';
import { RouterOutlet, type Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { SettingsComponent } from './settings/settings';

// Top-level export — same pattern Angular itself uses in app.routes.ts.
// AbsoluteJS detects this export at build time and auto-wires
// provideRouter(routes, withComponentInputBinding(), withViewTransitions())
// into the page's bootstrap providers.
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent }
];

@Component({
  selector: 'portal-page',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class PortalComponent {}`;
export const angularSimplePage = `\
// src/angular/about/about.ts
// No routes, no providers exports — just a standalone @Component.
// The framework still wires up the global \`appProviders\` from the config.
import { Component } from '@angular/core';

@Component({
  selector: 'about-page',
  standalone: true,
  template: '<h1>About AbsoluteJS</h1>'
})
export class AboutComponent {}`;
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
import { Component } from '@angular/core';
import { usePageContext } from '@absolutejs/absolute/angular';

export type Context = {
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
      <h1>Welcome back, {{ ctx.user.name }}</h1>
      <p>Email: {{ ctx.user.email }}</p>
      <p>Role: {{ ctx.user.role }}</p>
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
  readonly ctx = usePageContext<Context>();
}`;
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

    return handleAngularPageRequest<DashboardPage.Context>({
      pagePath: asset(manifest, 'Dashboard'),
      indexPath: asset(manifest, 'DashboardIndex'),
      headTag: generateHeadElement({
        title: 'Dashboard',
        description: 'User dashboard'
      }),
      requestContext: { user }
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
// 2. \`requestContext\` is serialized into window.__ABS_ANGULAR_REQUEST_CONTEXT__
// 3. Client-side Angular bootstraps and re-provides REQUEST_CONTEXT
//    with the same value, so \`usePageContext<T>()\` returns identical
//    data on both phases
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
    handleAngularPageRequest<AdminPage.Context>({
      pagePath: asset(manifest, 'Admin'),
      indexPath: asset(manifest, 'AdminIndex'),
      headTag: generateHeadElement({ title: 'Admin Panel' }),
      requestContext: { stats: adminStats }
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
// src/angular/admin/admin.ts
// Page modules are pure Angular. No \`export const providers\`, no
// \`provideRouter(routes)\`, no APP_BASE_HREF boilerplate — the build
// appends the providers declaration directly to this module's compiled
// server output:
//
//   export const providers = [
//     ...appProviders,             // from absolute.config.ts > angular.providers
//     provideRouter(routes, ...),  // only when this page exports \`routes\`
//     { provide: APP_BASE_HREF,    // inferred from the Elysia mount path
//       useValue: '/admin/' }      // e.g. .get('/admin/*', ...) → '/admin/'
//   ];
//
// SSR reads \`pageModule.providers\` from the bundled page; the client
// wrapper reads the same export off the same module — one
// \`@angular/core\` instance across both phases.
import { Component } from '@angular/core';
import { RouterOutlet, type Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: AdminUsersComponent }
];

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AdminComponent {}`;
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
export const angularZonelessTriggers = `\
// AbsoluteJS bootstraps Angular with provideZonelessChangeDetection().
// Change detection runs ONLY when one of these happens:
//
//   1. A signal you read in a template is updated         (signal.set / .update)
//   2. A template DOM event fires                         ((click), (input), ...)
//   3. AsyncPipe receives an emission                     ({{ obs$ | async }})
//   4. cdr.markForCheck() / cdr.detectChanges() is called (manual escape hatch)
//   5. HttpClient (and a few other built-ins) settle      (PendingTasks tracker)
//
// Plain property assignment in an await/setTimeout/subscribe callback does
// NOT tick CD. The value changes; the template does not re-evaluate.

@Component({ /* ... */ })
export class ProfileComponent {
  // Broken in zoneless mode: setting plainLoading after await never updates UI.
  plainLoading = false;

  // Correct: the signal triggers CD on its consumers automatically.
  loading = signal(false);

  async load() {
    this.loading.set(true);
    await this.profileService.fetch();
    this.loading.set(false);
  }
}`;
export const angularUsePageContext = `\
import { usePageContext } from '@absolutejs/absolute/angular';
import { Component } from '@angular/core';

// Declare the page's context shape next to the component. The backend's
// handleAngularPageRequest<Context>({ requestContext }) call is typechecked
// against this same type, so both sides agree on what's in flight.
export type Context = {
  user: { id: string; name: string; role: 'admin' | 'user' };
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`<p>Welcome, {{ ctx.user.name }}</p>\`
})
export class DashboardComponent {
  // One generic, no \`as\` cast at the call site. The composable owns the
  // single cast from REQUEST_CONTEXT's \`unknown\` value type to T.
  readonly ctx = usePageContext<Context>();
}`;
export const angularUseTimers = `\
import { useTimers } from '@absolutejs/absolute/angular';
import { Component, signal } from '@angular/core';

@Component({ /* ... */ })
export class FlashMessage {
  private timers = useTimers();
  visible = signal(false);

  show() {
    this.visible.set(true);
    // Auto-cleared on component destroy. Signals tick CD in the callback.
    this.timers.setTimeout(() => this.visible.set(false), 3000);
  }
}`;
export const angularUseResource = `\
import { useResource } from '@absolutejs/absolute/angular';
import { Component, inject } from '@angular/core';
import { ApiClient } from './api';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: \`
    @if (profile.loading()) {
      <p>Loading...</p>
    } @else if (profile.error()) {
      <p>Failed to load.</p>
    } @else if (profile.data(); as p) {
      <h1>{{ p.name }}</h1>
      <button (click)="rename(p, 'Renamed')">Rename</button>
    }
    <button (click)="profile.refresh()">Reload</button>
  \`,
})
export class ProfileComponent {
  private api = inject(ApiClient);
  // Signal-backed async data. data/error/loading are signals, so reading them
  // in the template auto-ticks CD. The AbortSignal aborts on destroy or refresh.
  profile = useResource((signal) => this.api.profile.get({ signal }));

  async rename(current: Profile, name: string) {
    const updated = await this.api.profile.update({ id: current.id, name });
    // mutate() writes the new value into the resource without a wasteful
    // re-fetch. Pass a value or an updater function.
    this.profile.mutate(updated);
  }
}`;
export const angularUseSubscription = `\
import { useSubscription } from '@absolutejs/absolute/angular';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({ /* ... */ })
export class HeaderComponent {
  private router = inject(Router);
  // Capture once in a field initializer — these run inside the
  // injection context. Passing the captured ref into useSubscription
  // is what keeps automatic teardown alive for calls from lifecycle
  // hooks like ngOnInit, where inject(DestroyRef) is illegal.
  private destroyRef = inject(DestroyRef);
  currentPath = signal('');

  ngOnInit() {
    useSubscription(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      ),
      (event) => this.currentPath.set(event.urlAfterRedirects),
      this.destroyRef,
    );
  }
}`;
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
