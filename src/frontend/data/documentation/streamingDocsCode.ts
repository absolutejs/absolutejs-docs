export const streamingAngularPrimitive = `\
@Component({
  standalone: true,
  imports: [DeferSlotComponent],
  template: \
    <main>
      <h1>Dashboard</h1>

      @defer (on timer(0ms)) {
        <app-activity-panel [activity]="activity"></app-activity-panel>
      } @placeholder {
        <app-activity-skeleton></app-activity-skeleton>
      }
    </main>
  \
})
export class DashboardComponent {
  activity = this.loadActivity();
}`.replace(/\\/g, '`');
export const streamingAngularRaw = `\
@Component({
  standalone: true,
  imports: [StreamSlotComponent],
  template: \
    <main>
      <h1>Dashboard</h1>

      <abs-stream-slot
        id="angular-activity"
        [fallbackHtml]="'<div class=&quot;card-skeleton&quot;>Loading activity...</div>'"
        [resolve]="loadActivityHtml"
      />
    </main>
  \
})
export class DashboardComponent {
  loadActivityHtml = async () => renderActivityHtml(await this.loadActivity());

  private async loadActivity() {
    return fetchActivity();
  }
}`.replace(/\\/g, '`');
export const streamingPageHandlerIntegration = `\
// Framework page handlers stream automatically when slots register during render
import { handleReactPageRequest } from '@absolutejs/absolute/react';

app.get('/dashboard', () =>
  handleReactPageRequest(Dashboard, asset(manifest, 'DashboardIndex'))
);`;
export const streamingRawFrameworkSnippet = `\
import { StreamSlot } from '@absolutejs/absolute/vue/components';

// Raw transport in a framework page: you provide fallbackHtml and resolved HTML yourself
<StreamSlot
  id="custom-slot"
  fallbackHtml="<div class='card-skeleton'>Loading...</div>"
  :resolve="async () => renderCardHtml(await getCardData())"
/>`;
export const streamingRawHtmlExample = `\
app.get('/reports', () =>
  handleHTMLPageRequest(asset(manifest, 'ReportsHTML'), {
    streamingSlots: [
      {
        id: 'report-summary',
        resolve: async () => renderSummaryHtml(await getSummary())
      },
      {
        id: 'report-feed',
        resolve: async () => renderFeedHtml(await getActivityFeed())
      }
    ]
  })
);`;
export const streamingRawHtmlTemplate = `\
<main>
  <h1>Reports</h1>

  <div id="report-summary" data-absolute-slot="true">
    <div class="card-skeleton">Loading summary...</div>
  </div>

  <div id="report-feed" data-absolute-slot="true">
    <div class="card-skeleton">Loading activity...</div>
  </div>
</main>`;
export const streamingReactPrimitive = `\
import { SuspenseSlot } from '@absolutejs/absolute/react/components';

export const Dashboard = () => (
  <main>
    <h1>Dashboard</h1>

    <SuspenseSlot
      id="react-activity"
      promise={getActivity()}
      fallback={<ActivitySkeleton />}
    >
      {({ value }) => <ActivityPanel activity={value} />}
    </SuspenseSlot>

    <SuspenseSlot
      id="react-metrics"
      promise={getMetrics()}
      fallback={<MetricsSkeleton />}
    >
      {({ value }) => <MetricsPanel metrics={value} />}
    </SuspenseSlot>
  </main>
);`;
export const streamingReactRaw = `\
import { StreamSlot } from '@absolutejs/absolute/react/components';

export const Dashboard = () => (
  <main>
    <h1>Dashboard</h1>

    <StreamSlot
      id="react-activity"
      fallbackHtml="<div class='card-skeleton'>Loading activity...</div>"
      resolve={async () => renderActivityHtml(await getActivity())}
    />
  </main>
);`;
export const streamingSveltePrimitive = `\
<script lang="ts">
  import AwaitSlot from '@absolutejs/absolute/svelte/components/AwaitSlot.svelte';

  const activityPromise = getActivity();
  const metricsPromise = getMetrics();
</script>

<main>
  <h1>Dashboard</h1>

  <AwaitSlot id="svelte-activity" resolve={() => activityPromise} fallbackHtml="<div class='card-skeleton'>Loading activity...</div>">
    <ActivityPanel let:value {value} />
  </AwaitSlot>

  <AwaitSlot id="svelte-metrics" resolve={() => metricsPromise} fallbackHtml="<div class='card-skeleton'>Loading metrics...</div>">
    <MetricsPanel let:value {value} />
  </AwaitSlot>
</main>`;
export const streamingSvelteRaw = `\
<script lang="ts">
  import StreamSlot from '@absolutejs/absolute/svelte/components/StreamSlot.svelte';
</script>

<main>
  <h1>Dashboard</h1>

  <StreamSlot
    id="svelte-activity"
    fallbackHtml="<div class=&quot;card-skeleton&quot;>Loading activity...</div>"
    resolve={async () => renderActivityHtml(await getActivity())}
  />
</main>`;
export const streamingTransportModes = `\
Current transport (shipped default)
- One HTML document response stays open
- Slot fallbacks are in the initial HTML
- Resolved slot patches arrive through the same response
- Browser tab can keep showing a loading spinner until the final slot patch arrives

Detached transport (planned)
- Initial HTML document closes earlier
- Slot fallbacks are still rendered in the initial HTML
- Late slot updates arrive over a secondary channel such as streaming fetch() or SSE
- Same slot APIs, different delivery transport semantics`;
export const streamingVuePrimitive = `\
<script setup lang="ts">
import { SuspenseSlot } from '@absolutejs/absolute/vue/components';
</script>

<template>
  <main>
    <h1>Dashboard</h1>

    <SuspenseSlot id="vue-activity" :promise="getActivity()" :timeout-ms="5000">
      <template #fallback>
        <ActivitySkeleton />
      </template>
      <template #default="{ value }">
        <ActivityPanel :activity="value" />
      </template>
    </SuspenseSlot>
  </main>
</template>`;
export const streamingVueRaw = `\
<script setup lang="ts">
import { StreamSlot } from '@absolutejs/absolute/vue/components';
</script>

<template>
  <main>
    <h1>Dashboard</h1>

    <StreamSlot
      id="vue-activity"
      fallback-html="<div class=&quot;card-skeleton&quot;>Loading activity...</div>"
      :resolve="async () => renderActivityHtml(await getActivity())"
    />
  </main>
</template>`;
