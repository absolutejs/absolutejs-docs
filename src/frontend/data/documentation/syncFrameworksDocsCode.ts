export const syncFrameworksAngular = `\
import { Component, inject } from '@angular/core';
import { SyncCollectionService } from '@absolutejs/sync/angular';

@Component({
  selector: 'issues-page',
  standalone: true,
  template: \`
    @for (issue of issues.data(); track issue.id) {
      <li>{{ issue.title }}</li>
    }
    <textarea
      [value]="doc.text()"
      (input)="doc.setText(($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  \`,
})
export class IssuesPageComponent {
  private sync = inject(SyncCollectionService);
  issues = this.sync.connect<Issue>({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
  });
  doc = this.sync.collaborativeText({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
    field: 'body',
    id: 'shared',
  });
}`;
export const syncFrameworksClient = `\
// All four framework bindings are thin wrappers over a framework-agnostic
// client. You can use it directly when you don't want a framework binding:
import { createSyncCollection, createCollaborativeText } from '@absolutejs/sync/client';

const issues = createSyncCollection<Issue>({
  url: 'ws://localhost:3000/sync/ws',
  collection: 'issues',
});
issues.subscribe((state) => render(state.data));

const doc = createCollaborativeText({
  url: 'ws://localhost:3000/sync/ws',
  collection: 'issues',
  field: 'body',
  id: 'shared',
});
doc.subscribe(({ text }) => renderTextarea(text));`;
export const syncFrameworksReact = `\
import { useSyncCollection, useCollaborativeText } from '@absolutejs/sync/react';

const Issues = () => {
  const { data, status, mutate } = useSyncCollection({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
  });
  return (
    <ul>{data.map((issue) => <li key={issue.id}>{issue.title}</li>)}</ul>
  );
};

const Description = ({ issueId }: { issueId: string }) => {
  const doc = useCollaborativeText({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
    field: 'body',
    id: issueId,
  });
  return (
    <textarea value={doc.text} onChange={(e) => doc.setText(e.target.value)} />
  );
};`;
export const syncFrameworksSvelte = `\
<script lang="ts">
  import {
    createSyncCollectionStore,
    createCollaborativeTextStore,
  } from '@absolutejs/sync/svelte';

  const issues = createSyncCollectionStore<Issue>({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
  });

  const doc = createCollaborativeTextStore({
    url: 'ws://localhost:3000/sync/ws',
    collection: 'issues',
    field: 'body',
    id: 'shared',
  });
</script>

<ul>
  {#each $issues.data as issue (issue.id)}
    <li>{issue.title}</li>
  {/each}
</ul>
<textarea
  value={$doc.text}
  oninput={(e) => doc.setText(e.currentTarget.value)}
></textarea>`;
export const syncFrameworksVue = `\
<script setup lang="ts">
import { useSyncCollection, useCollaborativeText } from '@absolutejs/sync/vue';

const { data, status, mutate } = useSyncCollection<Issue>({
  url: 'ws://localhost:3000/sync/ws',
  collection: 'issues',
});

const { text: docText, setText: setDocText } = useCollaborativeText({
  url: 'ws://localhost:3000/sync/ws',
  collection: 'issues',
  field: 'body',
  id: 'shared',
});
</script>

<template>
  <ul>
    <li v-for="issue in data" :key="issue.id">{{ issue.title }}</li>
  </ul>
  <textarea
    :value="docText"
    @input="setDocText(($event.target as HTMLTextAreaElement).value)"
  ></textarea>
</template>`;
