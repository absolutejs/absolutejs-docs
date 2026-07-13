export const tourActionsBuiltins = `\
// Built-ins run straight from admin-authored JSON — no host code at all.
// Each takes an optional selector (default: the step's own target).
const step = {
	body: 'Filters, sort, and export live up here.',
	onEnter: [
		// Open the panel the step is about…
		{ action: 'click', args: { selector: "[data-tour='filters-toggle']" } },
		// …let the open animation finish (ms defaults to 600 when omitted)…
		{ action: 'wait', args: { ms: 700 } },
		// …and bring the panel into view (block: 'center' by default).
		{ action: 'scroll', args: { block: 'start' } }
	],
	// onExit runs when the step is left — cleanup / restore.
	onExit: [
		{ action: 'click', args: { selector: "[data-tour='filters-toggle']" } }
	],
	route: '/portal/matches',
	target: "[data-tour='filters']",
	title: 'Powerful filters'
};

// delayMs waits before an individual action runs:
// { action: 'matches.demo-swipe', args: { direction: 'left' }, delayMs: 400 }`;
export const tourActionsController = `\
import { useTourController } from '@absolutejs/tour';

// Singleton per storage key — the overlay component and a "replay" button
// in a completely different part of the tree share one switch.
const tour = useTourController('myapp.tour');

// Reactive state, persisted to sessionStorage (one key per field, no
// JSON) so a cross-page step's full reload resumes at the right index.
tour.active; // Ref<boolean>
tour.index; // Ref<number>
tour.isReplay; // Ref<boolean>

// Auto-play once on first visit, then stamp your own "seen" marker.
if (!account.tourSeenAt) tour.start();

// Replay from anywhere. isReplay stays true for the whole run, so the
// host can choose NOT to re-stamp its "seen" marker on finish.
tour.start(true);

// Stop — deactivates and resets the index to 0.
tour.stop();`;
export const tourActionsCta = `\
// A call-to-action button rendered in the step card. Its action refs run
// through the same registry as onEnter, then the tour advances unless
// advance: false.
const step = {
	body: 'Send your first invite without leaving the tour.',
	cta: {
		actions: [
			{ action: 'click', args: { selector: "[data-tour='invite']" } }
		],
		advance: false,
		label: 'Try it now'
	},
	target: "[data-tour='invite']",
	title: 'Invite your team'
};

// The host template renders it and calls the engine's runCta:
//   <button v-if="t.step.value.cta" @click="t.runCta">
//     {{ t.step.value.cta.label }}
//   </button>`;
export const tourActionsDemoData = `\
import { useTourController, useTourDemo } from '@absolutejs/tour';

const controller = useTourController('myapp.tour');

const { data: matches, isDemo } = useTourDemo({
	controller,
	// The constant sample dataset. Its type IS the contract — the same
	// shape as the live data, so the surface renders it unchanged.
	demo: DEMO_MATCHES,
	// Optional: does this live value count as "has data"? Default:
	// non-nullish, and non-empty when it's an array.
	hasLive: (value) => value.length > 2,
	// Getter for the real (reactive) data; null/undefined while absent.
	live: () => realMatches.value,
	// Optional per-tutorial override, wired to Tutorial.dataMode.
	mode: () => activeTutorial.value?.dataMode
});

// matches → what the surface should render right now
// isDemo  → true while the sample is showing; badge the surface
//           ("Sample data") so it is never mistaken for real data`;
export const tourActionsHandlerContext = `\
import { tourWait, useTourActions } from '@absolutejs/tour';

// Handlers receive the full context — a handler can drive the tour
// itself (e.g. auto-advance when its demo finishes).
useTourActions().register('pipeline.demo-drag', async (ctx) => {
	// ctx.step   — the step being shown
	// ctx.target — the step's resolved target element (or null)
	// ctx.args   — plain-JSON args from the serialized ref
	// ctx.index  — the current step index
	// ctx.signal — fires when the step changes or the tour stops
	// ctx.next / ctx.back / ctx.stop — tour navigation

	await board.value?.demoDrag(ctx.args.dealId, ctx.signal);
	if (ctx.signal.aborted) return;

	// tourWait is an abortable sleep — resolves early (never rejects)
	// when the signal fires.
	await tourWait(500, ctx.signal);

	// Auto-advance once the demo finishes.
	ctx.next();
});`;
export const tourActionsRegister = `\
import { onBeforeUnmount } from 'vue';
import { useTourActions } from '@absolutejs/tour';

// The page that OWNS the surface registers its demo handler. The tour
// overlay — mounted in a completely different part of the tree —
// resolves it by name through the same keyed singleton.
const actions = useTourActions(); // default registry key 'absolute.tour'

const unregister = actions.register('matches.demo-swipe', async (ctx) => {
	const direction = ctx.args.direction === 'left' ? 'left' : 'right';
	await swiper.value?.demoSwipe(direction); // ctx.signal aborts long demos
});

// Or several at once — the return unregisters them all.
const unregisterAll = actions.registerAll({
	'matches.demo-filter': (ctx) => filters.value?.demo(ctx.args),
	'matches.demo-sort': (ctx) => sorter.value?.demo(ctx.args)
});

// Unregister on unmount so a dead page's handler can't be resolved.
// Safe against remount races: the disposer only removes the entry if
// it still points at THIS handler.
onBeforeUnmount(unregister);
onBeforeUnmount(unregisterAll);`;
export const tourBranchingConditions = `\
import { useTourConditions } from '@absolutejs/tour';

// Conditions mirror actions: serializable refs resolved BY NAME against
// a keyed-singleton registry. Built-ins cover the DOM-shaped checks;
// anything product-shaped comes from the host.
const conditions = useTourConditions(); // default key 'absolute.tour'

const unregister = conditions.register(
	'hasDeals',
	() => dealCount.value > 0
);

conditions.registerAll({
	isSubscribed: () => Boolean(viewer.value?.subscription),
	onTrial: () => viewer.value?.plan === 'trial'
});

// Built-ins — no registration needed:
// { condition: 'element', args: { selector: '.pipeline-board' } }
// { condition: 'media', args: { query: '(max-width: 640px)' } }`;
export const tourBranchingEvents = `\
import { useSpotlight } from '@absolutejs/tour';

const t = useSpotlight({
	controller,
	onClose,
	// Every lifecycle moment lands in your analytics.
	onEvent: (event) => analytics.track(event.name, event),
	steps: () => activeTutorial.value?.steps ?? [],
	// Stamped on every event so tutorials don't blur together.
	tutorialSlug: () => activeTutorial.value?.slug
});

// A tour_skipped event — the one that matters — carries the exact
// screen the viewer was on when they'd had enough:
// {
//   at: '2026-07-12T17:03:11.302Z',
//   isReplay: false,
//   name: 'tour_skipped',
//   reason: 'escape',          // Skip button → 'skip'
//   route: '/portal/matches',  // window.location.pathname at fire time
//   stepCount: 7,
//   stepIndex: 4,
//   stepTitle: 'Swipe or list',
//   target: "[data-tour='match-view']",
//   tutorialSlug: 'portal-intro'
// }`;
export const tourBranchingGate = `\
import { useTourController, useTourGate } from '@absolutejs/tour';

const controller = useTourController('myapp.tour');

// The auto-play decision, centralized. Dismissal counts persist in
// localStorage — they must survive sessions.
const gate = useTourGate({ roles: () => viewer.roles });

// The one tutorial to auto-play now: eligible candidates on this route,
// highest trigger.priority wins (stable on ties).
const tutorial = gate.pick(publishedTutorials, route.path);
if (tutorial) {
	gate.recordAutoPlay(tutorial.slug ?? '');
	controller.start();
}

// From your onEvent sink:
const onEvent = (event) => {
	const slug = activeTutorial.value?.slug ?? '';
	if (event.name === 'tour_skipped') gate.recordDismissal(slug);
	if (event.name === 'tour_completed') gate.recordCompletion(slug);
};

// Manual replays bypass the gate entirely — it governs auto-play only.
controller.start(true);`;
export const tourBranchingSteps = `\
const step = {
	body: 'Every deal, one board.',
	route: '/portal/pipeline',
	// ALL showIf predicates must hold, or the step is skipped.
	showIf: [{ condition: 'hasDeals' }],
	// ANY skipIf predicate holding skips the step.
	skipIf: [
		{ args: { query: '(max-width: 640px)' }, condition: 'media' }
	],
	target: '.pipeline-board',
	title: 'Your pipeline',
	// Hold the step until the app is ready for it: a selector that must
	// exist (and have a visible box), or a registered condition that
	// must return true. Past timeoutMs (default 3500) the step shows
	// anyway rather than stalling the tour.
	waitFor: { selector: '.pipeline-board', timeoutMs: 5000 }
};

// waitFor can also poll a registered condition (120ms interval):
// waitFor: { condition: { condition: 'hasDeals' }, timeoutMs: 4000 }`;
export const tourBranchingTrigger = `\
import type { Tutorial } from '@absolutejs/tour';

const tutorial: Tutorial = {
	slug: 'portal-intro',
	steps: PORTAL_TOUR_STEPS,
	trigger: {
		// Auto-play once per viewer, on their first visit.
		firstVisitOnly: true,
		// Stop auto-playing after this many skips (default 2). Manual
		// replay stays available.
		maxDismissals: 2,
		// Only auto-play when the current path starts with this prefix.
		onRoutePrefix: '/portal',
		// Auto-play at most once per browser session.
		oncePerSession: true,
		// When several tutorials match a page, highest priority wins.
		priority: 10,
		// Restrict auto-play to these role slugs (at least one must
		// match the gate's roles getter).
		roles: ['member'],
		// Audience predicates — all must hold for auto-play.
		showIf: [{ condition: 'isSubscribed' }]
	}
};`;
export const tourChecklistSetup = `\
import { useTourChecklist } from '@absolutejs/tour';

const checklist = useTourChecklist({
	// Identity of this checklist — its persistence bucket in
	// localStorage (namespaced by storageKey, default 'absolute.tour').
	id: 'onboarding',
	// The tasks — a getter so the list can be reactive.
	items: () => [
		{ href: '/portal/intake', id: 'intake', title: 'Finish your intake' },
		// Completing this tutorial checks the task off (see
		// completeForTutorial below).
		{ id: 'tour', title: 'Take the tour', tutorialSlug: 'portal-intro' },
		{
			description: 'Get your first three matches reviewed.',
			href: '/portal/matches',
			id: 'matches',
			title: 'Review your matches'
		}
	]
});

// The host renders the panel:
// checklist.items.value    → [{ ...item, done }]
// checklist.progress.value → { done, total, percent }`;
export const tourChecklistWiring = `\
// Wire tutorial completion into the checklist from the engine's funnel
// events — finishing 'portal-intro' checks off every task tied to it.
useSpotlight({
	controller,
	onClose,
	onEvent: (event) => {
		if (event.name === 'tour_completed') {
			checklist.completeForTutorial(event.tutorialSlug ?? '');
		}
	},
	steps: () => PORTAL_TOUR_STEPS,
	tutorialSlug: () => 'portal-intro'
});

// Manual task management:
checklist.complete('intake');
checklist.uncomplete('intake');
checklist.isDone('intake'); // boolean

// Dismissal persists (an ISO timestamp) until restored:
checklist.dismiss(); // checklist.dismissed.value → true
checklist.restore();

// Wipe completions AND the dismissal:
checklist.reset();`;
export const tourHotspotsSetup = `\
import { useTourController, useTourHotspots } from '@absolutejs/tour';

const tourController = useTourController('myapp.tour');

// Persistent pulsing beacons on tricky UI — independent of any linear
// tour — that open an explainer card on click.
const spots = useTourHotspots({
	// Master switch: hide beacons while a tour is playing. Default on.
	enabled: () => !tourController.active.value,
	// The hotspots for the current page — a getter so it can be reactive.
	hotspots: () => [
		{
			body: 'How aligned this investor is with your goals.',
			id: 'trust-fit',
			placement: 'right',
			target: "[data-tour='trust-fit']",
			title: 'Trust & Fit'
		},
		{
			body: 'Matches refresh every Monday morning.',
			id: 'refresh',
			// Hide the beacon permanently once it has been opened.
			once: true,
			target: "[data-tour='refresh']",
			title: 'Weekly refresh'
		}
	]
});

// spots.beacons.value → [{ hotspot, style }] — one beacon per target
// spots.card.value    → { hotspot, style } | null — the open card
// spots.open(id) / spots.close() / spots.dismiss(id) / spots.restoreAll()`;
export const tourSpotlightSetup = `\
<script setup lang="ts">
import { useSpotlight, useTourController } from '@absolutejs/tour';
import { PORTAL_TOUR_STEPS } from './steps';

const controller = useTourController('myapp.tour');
const emit = defineEmits<{ close: [] }>();

const t = useSpotlight({
	controller,
	// Below this query, steps' mobile blocks win. Default shown.
	mobileQuery: '(max-width: 640px)',
	onClose: () => emit('close'),
	// Hold positioning (and navigation!) until the host has resolved
	// WHICH steps to play — an async tutorial fetch on a cross-page
	// resume. The engine re-locates when this flips true.
	ready: () => tutorialLoaded.value,
	steps: () => PORTAL_TOUR_STEPS,
	// Per-tutorial theme → CSS custom properties on the overlay.
	theme: () => activeTutorial.value?.theme
});
</script>

<template>
	<Teleport to="body">
		<div
			v-if="t.active.value && t.step.value"
			class="tour-root"
			:style="t.themeVars.value"
		>
			<div class="tour-blocker" :class="{ dim: t.isCentered.value }"></div>
			<div class="tour-spotlight" :style="t.spotlightStyle.value"></div>
			<div
				class="tour-tooltip"
				:class="{ centered: t.isCentered.value }"
				:style="t.isCentered.value ? {} : t.tooltipStyle.value"
			>
				<p>Step {{ t.index.value + 1 }} of {{ t.stepCount.value }}</p>
				<h3>{{ t.step.value.title }}</h3>
				<p>{{ t.step.value.body }}</p>
				<button @click="t.skip">Skip</button>
				<button v-if="!t.isFirst.value" @click="t.back">Back</button>
				<button @click="t.next">
					{{ t.isLast.value ? 'Done' : 'Next' }}
				</button>
			</div>
		</div>
	</Teleport>
</template>`;
