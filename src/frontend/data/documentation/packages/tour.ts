import { PackageDocData } from '../../../../types/packageDocs';

export const tourPackageData: PackageDocData = {
	category: 'Frontend & UX',
	description:
		'@absolutejs/tour is an element-level, cross-page product tour engine for Vue apps. Tours are described by a small serializable step protocol — target selector, route, placement, copy — so they can live in code, in a database, or be authored in an admin UI, and all render through the same engine. The spotlight stays pixel-accurate through late layout shifts, and a sessionStorage-backed controller resumes tours across full-page navigations in MPAs. Vue 3 and vue-router are peer dependencies; you render a tiny overlay component with your own styling.',
	features: [
		{
			description:
				'Dims the page and highlights one real element, re-measuring on a light interval so the highlight follows late layout shifts, not just scroll and resize.',
			title: 'Spotlight positioning'
		},
		{
			description:
				'The controller persists progress in sessionStorage, so a step that navigates to another page resumes at the right step after the full reload.',
			title: 'Cross-page resume'
		},
		{
			description:
				'Steps reference actions and conditions by name; hosts register handlers, with click, scroll, wait, element, and media built in — so a tour can demo the product, not just point at it.',
			title: 'Serializable actions'
		},
		{
			description:
				'useTourDemo swaps in a fully-typed sample dataset while the tour plays, so fresh accounts can be toured on data-backed surfaces for free.',
			title: 'Demo data mode'
		},
		{
			description:
				'Every lifecycle moment — started, viewed, completed, skipped with the exact step and route — lands in your analytics via onEvent.',
			title: 'Funnel events'
		},
		{
			description:
				'useTourGate handles dismissal caps, once-per-session, priority, and audience matching across many tutorials; checklist and hotspot engines round out onboarding.',
			title: 'Auto-play gating'
		}
	],
	installCommand: 'bun add @absolutejs/tour',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/tour',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/tour',
			label: 'GitHub'
		}
	],
	name: 'Tour',
	notes: [
		{
			body: 'This package is in beta; the step protocol is designed to be stored, so breaking protocol changes are avoided, but composable APIs may still shift.',
			title: 'Beta',
			variant: 'warning'
		},
		{
			body: 'The engine only computes geometry and state — you own the overlay markup, the data-tour anchors, and where the "seen" marker is stored.',
			title: 'Headless by design',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/tour',
	samples: [
		{
			code: `import type { Tutorial } from '@absolutejs/tour';

const tour: Tutorial = {
	slug: 'portal-intro',
	steps: [
		{
			body: 'A quick tour.',
			placement: 'center',
			route: '/dashboard',
			title: 'Welcome'
		},
		{
			body: 'Your single best next step is always one click here.',
			placement: 'bottom',
			route: '/dashboard',
			target: "[data-tour='hero']",
			title: 'Your command center'
		}
	],
	trigger: { firstVisitOnly: true, onRoutePrefix: '/portal' }
};`,
			description:
				'Tours are plain serializable objects — safe to store in a database or author in an admin UI. Add data-tour attributes to the elements you want to spotlight; a step with no target renders as a centered card.',
			heading: 'The Protocol',
			language: 'typescript'
		},
		{
			code: `import { useSpotlight, useTourController } from '@absolutejs/tour';
import { PORTAL_TOUR_STEPS } from './steps';

// Shared controller (singleton per storage key)
const controller = useTourController('myapp.tour');

// Render your overlay from the computed geometry and state
const t = useSpotlight({
	controller,
	onClose: () => emit('close'),
	onEvent: (event) => analytics.track(event),
	steps: () => PORTAL_TOUR_STEPS
});
// t.step, t.spotlightStyle, t.tooltipStyle, t.next, t.back, t.skip

// Auto-play once on first visit, then stamp your own "seen" marker
if (!account.tourSeenAt) {
	controller.start();
}

// Replay from anywhere (does not re-stamp)
controller.start(true);`,
			description:
				'Wire the shared controller and the spotlight engine; your overlay component consumes the computed styles and step state.',
			heading: 'Wiring It Up',
			language: 'typescript'
		},
		{
			code: `import { useTourActions } from '@absolutejs/tour';

// The page that OWNS the surface registers its demo handler
const actions = useTourActions();
const unregister = actions.register('matches.demo-swipe', async (ctx) => {
	const direction = ctx.args.direction === 'left' ? 'left' : 'right';
	await swiper.value?.demoSwipe(direction); // ctx.signal aborts long demos
});
onBeforeUnmount(unregister);

// The step invokes it — plain JSON, safe to store in a DB
const step = {
	onEnter: [
		{ action: 'matches.demo-swipe', args: { direction: 'right' } },
		{ action: 'wait', args: { ms: 700 } },
		{ action: 'matches.demo-swipe', args: { direction: 'left' } }
	],
	route: '/portal/matches',
	target: "[data-tour='match-view']",
	title: 'Swipe or list'
};`,
			description:
				'Steps reference actions by name so they stay serializable; unknown action names warn and skip instead of breaking the tour.',
			heading: 'Step Actions',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Element-level, cross-page product tour engine for Vue apps — a serializable step protocol, a pixel-accurate spotlight, and a controller that survives full-page navigations.',
	version: '0.3.0-beta.2'
};
