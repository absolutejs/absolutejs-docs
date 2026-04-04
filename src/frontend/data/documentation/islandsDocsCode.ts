export const islandsRegistry = `import { defineIslandRegistry } from '@absolutejs/absolute/islands';
import { createTypedIsland as createTypedAngularIsland } from '@absolutejs/absolute/angular';
import { createTypedIsland as createTypedReactIsland } from '@absolutejs/absolute/react';
import { createTypedIsland as createTypedSvelteIsland } from '@absolutejs/absolute/svelte';
import { createTypedIsland as createTypedVueIsland } from '@absolutejs/absolute/vue';
import { AngularCounter } from '../angular/components/AngularCounter';
import { ReactCounter } from '../react/components/ReactCounter';
import SvelteCounter from '../svelte/components/SvelteCounter.svelte';
import { VueCounter } from '../vue/components/VueCounter';

export const islandRegistry = defineIslandRegistry({
  angular: { AngularCounter },
  react: { ReactCounter },
  svelte: { SvelteCounter },
  vue: { VueCounter }
});

export const TypedAngularIsland = createTypedAngularIsland(islandRegistry);
export const TypedReactIsland = createTypedReactIsland(islandRegistry);
export const TypedSvelteIsland = createTypedSvelteIsland(islandRegistry);
export const TypedVueIsland = createTypedVueIsland(islandRegistry);`;

export const islandsLoose = `import { Island } from '@absolutejs/absolute/react';

export const DashboardPage = () => (
  <main>
    <Island
      framework="vue"
      component="VueCounter"
      hydrate="visible"
      props={{
        initialCount: 0,
        label: 'Loose deferred Vue island'
      }}
    />
  </main>
);`;

export const islandsTyped = `import { TypedReactIsland } from '../../islands/registry';

export const DashboardPage = () => (
  <main>
    <TypedReactIsland
      framework="react"
      component="ReactCounter"
      hydrate="load"
      props={{
        initialCount: 0,
        label: 'React island'
      }}
    />
  </main>
);`;

export const islandsTypeSafety = `// Loose Island accepts any framework/component string pair.
<Island
  framework="vue"
  component="VueCounter"
  props={{ initialCount: 0, label: 'Loose island' }}
/>

// Typed islands are driven by the registry.
<TypedReactIsland
  framework="react"
  component="ReactCounter"
  props={{ initialCount: 0, label: 'Typed island' }}
/>

// createTypedIsland(registry) narrows all three parts together:
// framework -> component -> props
//
// These fail at compile time:
// - wrong framework/component combinations
// - missing required props
// - extra props not accepted by the component`;

export const islandsHydrationModes = `<Island framework="react" component="Hero" hydrate="load" props={{ ... }} />
<Island framework="vue" component="AnalyticsPanel" hydrate="idle" props={{ ... }} />
<Island framework="svelte" component="PricingTable" hydrate="visible" props={{ ... }} />
<Island framework="react" component="StaticBadge" hydrate="none" props={{ ... }} />`;

export const islandsStore = `import { createIslandStore } from '@absolutejs/absolute/islands';

export const counterIslandStore = createIslandStore(
  'counter',
  {
    sharedCount: 0
  },
  (set) => ({
    incrementShared: () =>
      set((state) => ({
        sharedCount: Number(state.sharedCount ?? 0) + 1
      })),
    resetShared: () => set({ sharedCount: 0 })
  })
);`;

export const islandsStoreUsage = `// Import the same island store module from any island component.
// That is what makes the state shared across frameworks.

<Island
  framework="react"
  component="ReactCounter"
  props={{ initialCount: 0, label: 'React island' }}
/>

<Island
  framework="vue"
  component="VueCounter"
  props={{ initialCount: 0, label: 'Vue island' }}
/>`;

export const islandsSharedStateNote = `AbsoluteJS uses zustand/vanilla under the hood.

The model is store-first, not key-first:
- define state and actions once with createIslandStore(...)
- import the same store into any island component
- select state and actions with framework-specific primitives

Serializable state is snapshotted for SSR.
Actions are recreated from your store definition on the client.`;

export const islandsHtml = `<absolute-island
  framework="react"
  component="ReactCounter"
  hydrate="load"
  props='{"initialCount":0,"label":"React island"}'
></absolute-island>`;

export const reactIslandsTyped = `import { Island } from '@absolutejs/absolute/react';
import { TypedReactIsland } from '../../islands/registry';

export const IslandsPage = () => (
  <main>
    <h2>Typed Islands</h2>
    <TypedReactIsland
      framework="react"
      component="ReactCounter"
      hydrate="load"
      props={{ initialCount: 0, label: 'React island' }}
    />

    <h2>Loose Island</h2>
    <Island
      framework="vue"
      component="VueCounter"
      hydrate="visible"
      props={{ initialCount: 0, label: 'Loose deferred Vue island' }}
    />
  </main>
);`;

export const reactIslandsStore = `import { useState } from 'react';
import { useIslandStore } from '@absolutejs/absolute/react';
import { counterIslandStore } from '../../islands/counterStore';

export const ReactCounter = ({
  initialCount,
  label
}: {
  initialCount: number;
  label: string;
}) => {
  const [count, setCount] = useState(initialCount);
  const sharedCount = useIslandStore(
    counterIslandStore,
    (state) => state.sharedCount
  );
  const incrementShared = useIslandStore(
    counterIslandStore,
    (state) => state.incrementShared
  );

  return (
    <div>
      <p>{label}</p>
      <strong>{'Local: ' + count}</strong>
      <strong>{'Shared: ' + sharedCount}</strong>
      <button onClick={() => setCount((value) => value + 1)}>
        Increment React
      </button>
      <button onClick={() => incrementShared()}>
        Increment Shared
      </button>
    </div>
  );
};`;

export const vueIslandsTyped = `<script setup lang="ts">
import { Island } from '@absolutejs/absolute/vue';
import { TypedVueIsland } from '../../islands/registry';
</script>

<template>
  <main>
    <TypedVueIsland
      framework="react"
      component="ReactCounter"
      :props="{ initialCount: 0, label: 'React island' }"
      hydrate="load"
    />

    <Island
      framework="vue"
      component="VueCounter"
      :props="{ initialCount: 0, label: 'Loose deferred Vue island' }"
      hydrate="visible"
    />
  </main>
</template>`;

export const vueIslandsStore = `import { defineComponent, h, ref } from 'vue';
import { useIslandStore } from '@absolutejs/absolute/vue';
import { counterIslandStore } from '../../islands/counterStore';

export const VueCounter = defineComponent({
  props: {
    initialCount: { type: Number, required: true },
    label: { type: String, required: true }
  },
  setup(props) {
    const count = ref(props.initialCount);
    const sharedCount = useIslandStore(
      counterIslandStore,
      (state) => state.sharedCount
    );
    const incrementShared = useIslandStore(
      counterIslandStore,
      (state) => state.incrementShared
    );

    return () =>
      h('div', [
        h('p', props.label),
        h('strong', 'Local: ' + String(count.value)),
        h('strong', 'Shared: ' + String(sharedCount.value)),
        h('button', { onClick: () => { count.value += 1; } }, 'Increment Vue'),
        h('button', { onClick: () => { incrementShared.value(); } }, 'Increment Shared')
      ]);
  }
});`;

export const svelteIslandsHost = `<script lang="ts">
  import { Island } from '@absolutejs/absolute/svelte';
</script>

<main>
  <Island
    framework="react"
    component="ReactCounter"
    hydrate="load"
    props={{ initialCount: 0, label: 'React island' }}
  />
  <Island
    framework="vue"
    component="VueCounter"
    hydrate="visible"
    props={{ initialCount: 0, label: 'Deferred Vue island' }}
  />
</main>`;

export const svelteIslandsStore = `<script lang="ts">
  import { useIslandStore } from '@absolutejs/absolute/svelte';
  import { counterIslandStore } from '../../islands/counterStore';

  let {
    initialCount,
    label
  }: {
    initialCount: number;
    label: string;
  } = $props();

  let count = $state(initialCount);
  const sharedCount = useIslandStore(
    counterIslandStore,
    (state) => state.sharedCount
  );
  const incrementShared = useIslandStore(
    counterIslandStore,
    (state) => state.incrementShared
  );
</script>

<div>
  <p>{label}</p>
  <strong>Local: {count}</strong>
  <strong>Shared: {$sharedCount}</strong>
  <button onclick={() => count += 1}>Increment Svelte</button>
  <button onclick={() => $incrementShared()}>Increment Shared</button>
</div>`;

export const angularIslandsHost = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Island } from '@absolutejs/absolute/angular';

@Component({
  imports: [CommonModule, Island],
  selector: 'angular-host-page',
  standalone: true,
  template: \
    \
      \
      '<absolute-island\n' +
      '  component="ReactCounter"\n' +
      '  framework="react"\n' +
      '  hydrate="load"\n' +
      '  [props]="{ initialCount: 0, label: \'React island\' }"\n' +
      '/>'
})
export class AngularHostComponent {}`;

export const angularIslandsStore = `import '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IslandStore } from '@absolutejs/absolute/angular';
import { counterIslandStore } from '../../islands/counterStore';

class AngularCounterImpl implements OnDestroy, OnInit {
  static __absoluteProps = {
    initialCount: 0,
    label: ''
  };

  readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly islandStore = inject(IslandStore);
  readonly incrementSharedAction = this.islandStore.get(
    counterIslandStore,
    (state) => state.incrementShared
  );
  subscription = new Subscription();
  initialCount = 0;
  label = '';
  readonly count = signal(this.initialCount);
  readonly sharedCount = signal(0);

  ngOnInit() {
    this.count.set(this.initialCount);
    this.subscription.add(
      this.islandStore
        .select(counterIslandStore, (state) => state.sharedCount)
        .subscribe((value) => {
          this.sharedCount.set(Number(value));
          this.changeDetectorRef.detectChanges();
        })
    );
  }

  increment() {
    this.count.update((value) => value + 1);
  }

  incrementShared() {
    this.incrementSharedAction();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

Component({
  selector: 'abs-angular-counter',
  standalone: true,
  template: \
    \
      \
      '<div>\n' +
      '  <p>{{ label }}</p>\n' +
      '  <strong>Local: {{ count() }}</strong>\n' +
      '  <strong>Shared: {{ sharedCount() }}</strong>\n' +
      '  <button (click)="increment()">Increment Angular</button>\n' +
      '  <button (click)="incrementShared()">Increment Shared</button>\n' +
      '</div>'
})(AngularCounterImpl);
Input()(AngularCounterImpl.prototype, 'initialCount');
Input()(AngularCounterImpl.prototype, 'label');

export const AngularCounter = AngularCounterImpl;`;

export const htmlIslandsPage = `<!doctype html>
<html lang="en">
  <body>
    <main>
      <absolute-island
        framework="react"
        component="ReactCounter"
        hydrate="load"
        props='{"initialCount":0,"label":"React island"}'
      ></absolute-island>

      <absolute-island
        framework="vue"
        component="VueCounter"
        hydrate="visible"
        props='{"initialCount":0,"label":"Deferred Vue island"}'
      ></absolute-island>
    </main>
  </body>
</html>`;

export const htmxIslandsPage = `<!doctype html>
<html lang="en">
  <body>
    <main>
      <section id="dashboard">
        <absolute-island
          framework="svelte"
          component="SvelteCounter"
          hydrate="load"
          props='{"initialCount":0,"label":"Svelte island"}'
        ></absolute-island>
      </section>
    </main>
  </body>
</html>`;
