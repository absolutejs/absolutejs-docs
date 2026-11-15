export const angularDeferHandler = `\
// backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import type * as DashboardPage from '../frontend/angular/pages/dashboard';

new Elysia().get('/dashboard', async () =>
  handleAngularPageRequest<DashboardPage.Context>({
    collectStreamingSlots: true,
    indexPath: asset(manifest, 'DashboardIndex'),
    pagePath: asset(manifest, 'Dashboard'),
    requestContext: { stats: await getStats() }
  })
);`;
export const angularDeferTemplate = `\
<!-- frontend/angular/templates/dashboard.html -->
<h1>{{ stats.visits }} visits</h1>

@defer (on timer(300ms)) {
  <activity-feed />
} @placeholder {
  <p>Loading activity…</p>
}`;
export const angularZoneAsync = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-page',
  standalone: true,
  template: \`<p>{{ status }}</p>\`
})
export class ReportComponent implements OnInit {
  status = 'loading';

  // In zone mode the server waits for this before it sends the page,
  // so the HTML already says "loaded".
  async ngOnInit() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.status = 'loaded';
  }
}`;
export const angularZoneConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  angular: { changeDetection: 'zone' },
  angularDirectory: 'src/frontend/angular'
});`;
export const angularZoneInstall = `bun add zone.js`;
export const angularZoneTimer = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'status-page',
  standalone: true,
  template: \`
    <p>{{ status }}</p>
    <button (click)="later()">Update later</button>
  \`
})
export class StatusComponent implements OnInit {
  status = 'init';

  ngOnInit() {
    setTimeout(() => {
      this.status = 'ready';
    }, 50);
  }

  later() {
    setTimeout(() => {
      this.status = 'updated';
    }, 50);
  }
}`;
