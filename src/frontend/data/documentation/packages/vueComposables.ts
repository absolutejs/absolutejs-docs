import { PackageDocData } from '../../../../types/packageDocs';

export const vueComposablesPackageData: PackageDocData = {
	category: 'Frontend & UX',
	description:
		'@absolutejs/vue-composables is a small set of broadly-useful Vue composables for SSR-first apps: an SSR hydration gate, a browser-environment flag, a scope-safe debouncer, and an async-action wrapper that centralizes try/catch, loading flags, and toast notifications. Vue is a peer dependency, so it drops into any Vue 3 app — including AbsoluteJS Vue pages — without pulling in a second Vue copy.',
	features: [
		{
			description:
				'useHydrated returns a ref that is false during SSR and the first client render, then true after mount — gate client-only data on it to avoid hydration mismatches.',
			title: 'SSR hydration gate'
		},
		{
			description:
				'isBrowser is true on the client and false during SSR, for quick environment checks outside component setup.',
			title: 'Browser flag'
		},
		{
			description:
				'useDebouncedAction gives a trailing-edge debouncer whose timer is auto-cleared on scope dispose; trigger() restarts the delay.',
			title: 'Debounced actions'
		},
		{
			description:
				'runAsyncAction wraps a task with try/catch/finally, a loading-flag callback, console.error, and success/error notifications.',
			title: 'Async action wrapper'
		},
		{
			description:
				'configureAsyncNotifier injects your toast implementation once, so every runAsyncAction call site stays free of notification plumbing.',
			title: 'Injectable notifier'
		}
	],
	installCommand: 'bun add @absolutejs/vue-composables',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/vue-composables',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/vue-composables',
			label: 'GitHub'
		}
	],
	name: 'Vue Composables',
	notes: [
		{
			body: 'Vue 3.3+ is a peer dependency. The composables are deliberately small and framework-only — no AbsoluteJS runtime required, so they work in any Vue app.',
			title: 'Lightweight by design',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/vue-composables',
	samples: [
		{
			code: `import {
	configureAsyncNotifier,
	runAsyncAction,
	useHydrated
} from '@absolutejs/vue-composables';
import { computed } from 'vue';

// Inject your toast once, app-wide
configureAsyncNotifier({ error: toast.error, success: toast.success });

await runAsyncAction(() => api.save(payload), {
	loading: (s) => (saving.value = s),
	onSuccess: () => emit('updated'),
	successMessage: 'Saved'
});

// Gate client-only data to avoid hydration mismatches
const hydrated = useHydrated();
const loading = computed(() => !hydrated.value || actualLoading.value);`,
			description:
				'Wire the notifier once, run async actions without repeated try/catch/loading boilerplate, and gate client-only state on hydration.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { useDebouncedAction } from '@absolutejs/vue-composables';

// Trailing-edge debounce, auto-cleared when the component scope disposes
const search = useDebouncedAction(() => {
	void fetchResults(query.value);
}, 250);

// Each call (re)starts the delay
const onInput = () => search.trigger();`,
			description:
				'Debounce user input without managing timers — cleanup happens automatically on scope dispose.',
			heading: 'Debounced Actions',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Small SSR-aware Vue composables — hydration gate, browser flag, debounced actions, and an async try/catch/notify wrapper — for Vue 3 apps.',
	version: '0.1.0'
};
