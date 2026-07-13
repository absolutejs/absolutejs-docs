import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	tourChecklistSetup,
	tourChecklistWiring,
	tourHotspotsSetup,
	tourSpotlightSetup
} from '../../../data/documentation/tourSectionDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { ComparisonRow, ComparisonTable } from '../../utils/ComparisonTable';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#tour-checklist', label: 'Checklist, Hotspots & Overlay' },
	{ href: '#help-surfaces', label: 'Three Help Surfaces' },
	{ href: '#getting-started', label: 'Getting-started Checklist' },
	{ href: '#completion-progress', label: 'Completion & Progress' },
	{ href: '#hotspots', label: 'Always-on Hotspots' },
	{ href: '#beacons-and-card', label: 'Beacons & Card' },
	{ href: '#spotlight-overlay', label: 'Rendering the Overlay' },
	{ href: '#overlay-surface', label: 'Overlay Surface' }
];

const surfaceRows: ComparisonRow[] = [
	{
		feature: 'Shape',
		values: [
			'Linear steps across pages',
			'Task list with progress',
			'Per-element beacons'
		]
	},
	{
		feature: 'Lifetime',
		values: ['One run per trigger', 'Until dismissed', 'Always on']
	},
	{
		feature: 'Persists',
		values: [
			'Progress in sessionStorage',
			'Completions in localStorage',
			'Dismissals in localStorage'
		]
	},
	{
		feature: 'Best for',
		values: [
			'First-visit walkthrough',
			'Activation milestones',
			'Tricky UI explainers'
		]
	}
];

const checklistItemRows: DocsTableCell[][] = [
	[{ code: 'id' }, 'Identity of the task — completions persist against it.'],
	[
		{ code: 'title / description?' },
		'The copy the host renders in the panel row.'
	],
	[
		{ code: 'tutorialSlug' },
		'A tutorial this task launches — completing that tutorial (via completeForTutorial) checks the task off.'
	],
	[{ code: 'href' }, 'Or a plain deep link the host navigates to.']
];

const checklistApiRows: DocsTableCell[][] = [
	[
		{ code: 'items' },
		'Computed [{ ...item, done }] — the panel maps straight over it.'
	],
	[
		{ code: 'progress' },
		'{ done, total, percent } — percent is rounded, and 0 for an empty list. The progress bar comes for free.'
	],
	[
		{ code: 'complete / uncomplete / isDone' },
		'Manual task management by item id.'
	],
	[
		{ code: 'completeForTutorial(slug)' },
		'Checks off every task tied to that tutorial — wire it to the tour_completed funnel event.'
	],
	[
		{ code: 'dismissed / dismiss() / restore()' },
		'Dismissal persists (an ISO timestamp) until restored — a closed panel stays closed across sessions.'
	],
	[{ code: 'reset()' }, 'Wipes completions AND the dismissal.']
];

const activationLoop: StepFlowStep[] = [
	{
		actor: 'host',
		code: 'checklist.items.value → [{ ...item, done }]',
		description:
			'The composable owns the logic — typed items, completion persistence, progress math — and the host owns the panel.',
		title: 'Render the panel from items and progress'
	},
	{
		actor: 'host',
		description:
			'A tutorialSlug task starts its tour through the shared controller; an href task is a plain navigation.',
		title: 'A task launches a tutorial or a deep link'
	},
	{
		actor: 'engine',
		description:
			'useSpotlight emits tour_completed when the viewer finishes the last step.',
		title: 'The tour plays and reports'
	},
	{
		actor: 'host',
		code: 'tour_completed → checklist.completeForTutorial(slug)',
		description:
			'Every task tied to that tutorial flips to done — the funnel event is the bridge.',
		title: 'Sink the completion into the checklist'
	},
	{
		actor: 'host',
		description:
			'progress recomputes on its own; when the viewer is finished with the panel, dismiss() hides it for good.',
		title: 'Progress updates, dismissal persists'
	}
];

const hotspotFieldRows: DocsTableCell[][] = [
	[
		{ code: 'id' },
		'Identity of the hotspot — dismissals persist against it.'
	],
	[{ code: 'target' }, 'CSS selector for the element the beacon rides.'],
	[{ code: 'title / body' }, 'The copy of the explainer card.'],
	[
		{ code: 'placement', suffix: 'default "bottom"' },
		'Preferred card side. bottom flips to top when the viewport runs out of room, and the card clamps on screen.'
	],
	[{ code: 'media' }, 'Optional image or video shown in the card.'],
	[
		{ code: 'once' },
		'Hide the beacon permanently once the viewer has opened it.'
	]
];

const hotspotApiRows: DocsTableCell[][] = [
	[
		{ code: 'beacons' },
		'One { hotspot, style } per visible target. Elements that vanish (page changed, panel closed) simply drop out — beacons follow the DOM.'
	],
	[
		{ code: 'card' },
		'{ hotspot, style } for the open explainer, or null — its position is clamped to the viewport.'
	],
	[
		{ code: 'open(id) / openId' },
		'Open a hotspot’s card; openId is the currently open id.'
	],
	[
		{ code: 'close()' },
		'Close the card — and permanently dismiss the hotspot when it is marked once.'
	],
	[
		{ code: 'dismiss(id)' },
		'Persist a dismissal (localStorage) and close the card if it is open.'
	],
	[{ code: 'restoreAll()' }, 'Clear every persisted dismissal.']
];

const spotlightOptionRows: DocsTableCell[][] = [
	[
		{ code: 'controller' },
		'The shared switch from useTourController — the overlay consumes what start() flips.'
	],
	[
		{ code: 'steps' },
		'Getter for the ordered steps. Swapped under a running tour (an async tutorial fetch), the engine re-positions against the new list.'
	],
	[
		{ code: 'onClose' },
		'Called when the viewer finishes the last step or skips.'
	],
	[
		{ code: 'actions / conditions' },
		'Registries that resolve the steps’ serialized action and condition names. Default to the shared keyed singletons.'
	],
	[
		{ code: 'mobileQuery', suffix: 'default "(max-width: 640px)"' },
		'Below this query, steps’ mobile blocks win — target, placement, copy, or skip.'
	],
	[
		{ code: 'onEvent / tutorialSlug' },
		'The funnel-event sink and the tutorial identity stamped on every event.'
	],
	[
		{ code: 'ready' },
		'Hold positioning (and navigation!) until the host has resolved WHICH steps to play — the engine re-locates when it flips true.'
	],
	[
		{ code: 'theme' },
		'Per-tutorial TourTheme, exposed to the host as CSS custom properties via themeVars.'
	]
];

const overlaySurfaceRows: DocsTableCell[][] = [
	[
		{ code: 'active / step / index / stepCount' },
		'Where the viewer is. step is the resolved current step, mobile overrides already applied.'
	],
	[
		{ code: 'isFirst / isLast' },
		'The edges — hide Back on the first step, relabel Next to "Done" on the last.'
	],
	[
		{ code: 'isCentered' },
		'True when there is no target rect — welcome and closing steps, and steps whose target went missing, render as a centered card.'
	],
	[
		{ code: 'next / back / skip' },
		'Navigation. skip(reason) emits tour_skipped — pass "escape"-style strings; non-strings coerce to "skip".'
	],
	[
		{ code: 'runCta()' },
		'Runs the step’s cta action refs through the registry, then advances unless advance: false.'
	],
	[
		{ code: 'spotlightStyle' },
		'Position and size for the highlight ring, honoring the step’s spotlight padding, radius, and shape.'
	],
	[
		{ code: 'tooltipStyle / tooltipEl' },
		'The card position, computed from the card’s MEASURED size — bind ref="tooltipEl" so clamping never works from a guess.'
	],
	[
		{ code: 'blockers' },
		'The click-blocking layers: one full-screen rect, or four bands around the target when spotlight.allowInteraction keeps the element clickable.'
	],
	[
		{ code: 'showBeacon / beaconStyle' },
		'The pulsing hint dot for beacon: true steps — a lighter touch than the full spotlight.'
	],
	[
		{ code: 'cardAnimationStyle' },
		'Entrance animation per the step’s transition — re-key the card per step so it replays.'
	],
	[
		{ code: 'themeVars / isMobile' },
		'CSS custom properties from the tutorial theme, and whether the mobile query currently matches.'
	]
];

export const TourChecklistView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="tour-checklist" style={h1Style(isMobileOrTablet)}>
						Checklist, Hotspots & the Overlay
					</h1>
					<p style={paragraphLargeStyle}>
						One guided run is not an onboarding system.{' '}
						<code>useTourChecklist</code> keeps a persistent{' '}
						<strong>getting-started panel</strong> — typed tasks,
						completion persistence, progress math —{' '}
						<code>useTourHotspots</code> puts{' '}
						<strong>always-on beacons</strong> on tricky UI, and{' '}
						<code>useSpotlight</code> turns the serialized steps
						into <strong>pixel-accurate geometry</strong> for an
						overlay you render and style yourself.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="help-surfaces"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Three Help Surfaces
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The three surfaces split the same way: the composable
						owns discovery, state, persistence, and geometry; the
						host renders and styles. They also share one{' '}
						<code>storageKey</code> namespace (default{' '}
						<code>'absolute.tour'</code>), so a product's tour,
						checklist, and hotspots persist side by side.
					</p>
					<ComparisonTable
						columns={['Spotlight tour', 'Checklist', 'Hotspots']}
						firstColumnLabel="Surface"
						rows={surfaceRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="getting-started"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Getting-started Checklist
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The stickiest pattern in this category: a persistent
						panel with N tasks, a progress bar, and each task
						launching a tour or a deep link.{' '}
						<code>useTourChecklist</code> is the{' '}
						<strong>logic only</strong> — the host renders the panel
						and decides what launching a task means. State lives in{' '}
						<code>localStorage</code> under{' '}
						<code>storageKey.checklist.id</code>, so completions
						survive sessions.
					</p>
					<PrismPlus
						codeString={tourChecklistSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Each <code>TourChecklistItem</code> is plain data:
					</p>
					<DocsTable
						columns={['Field', 'Description']}
						rows={checklistItemRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="completion-progress"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Completion & Progress
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Tasks complete three ways: the host calls{' '}
						<code>complete(id)</code> directly, the viewer finishes
						a tutorial tied to the task, or the host re-derives
						completion from product state. The tutorial path is the
						interesting one — the engine's funnel events carry the{' '}
						<code>tutorialSlug</code>, so one line in the{' '}
						<code>onEvent</code> sink closes the loop.
					</p>
					<PrismPlus
						codeString={tourChecklistWiring}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Member', 'Description']}
						rows={checklistApiRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The activation loop end to end:
					</p>
					<StepFlow
						steps={activationLoop}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hotspots"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Always-on Hotspots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Some UI needs explaining <em>every</em> time, not once —
						a trust score, a weekly refresh cadence.{' '}
						<code>useTourHotspots</code> keeps persistent pulsing
						beacons on those elements, independent of any linear
						tour, and opens an explainer card on click. Same
						machinery as the tour's beacon and card, but per-element
						and permanent.
					</p>
					<PrismPlus
						codeString={tourHotspotsSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Field', 'Description']}
						rows={hotspotFieldRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Beacons off while a tour plays"
						variant="info"
					>
						The <code>enabled</code> getter is the master switch
						(default on). Wire it to{' '}
						<code>!tourController.active.value</code> so pulsing
						beacons never compete with an active spotlight.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="beacons-and-card"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Beacons & Card
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The composable measures every eligible target on scroll,
						resize, and a light 250ms interval, and hands the host
						ready-to-render position styles. A target with no
						visible box (a collapsed drawer, a hidden panel) is
						skipped rather than beaconed at 0×0.
					</p>
					<DocsTable
						columns={['Member', 'Description']}
						rows={hotspotApiRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Dismissals persist"
						variant="note"
					>
						<code>dismiss(id)</code> and a <code>once</code>{' '}
						hotspot's first open both persist to{' '}
						<code>localStorage</code> — the beacon stays gone across
						sessions until <code>restoreAll()</code>. Useful for a
						"restore tips" switch in settings.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="spotlight-overlay"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rendering the Overlay
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>useSpotlight</code> is the engine behind
						everything the other pages configure: it walks the
						steps, navigates cross-page, runs actions, evaluates
						branches, and emits funnel events — but it renders{' '}
						<strong>nothing</strong>. The host teleports a small
						overlay to <code>body</code> and styles it however it
						likes; the engine only computes geometry.
					</p>
					<PrismPlus
						codeString={tourSpotlightSetup}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Option', 'Description']}
						rows={spotlightOptionRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Keyboard comes wired"
						variant="success"
					>
						While the tour is active, <code>Escape</code> skips
						(reason <code>"escape"</code>), <code>ArrowRight</code>{' '}
						/ <code>Enter</code> advance, and <code>ArrowLeft</code>{' '}
						goes back — no host wiring needed.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="overlay-surface"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overlay Surface
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Positioning works from the card's{' '}
						<strong>measured</strong> size: the engine flips to the
						roomier side when the preferred placement can't fit,
						then clamps both axes so the card — and its Skip / Next
						controls — can never leave the viewport. After each step
						it re-measures on short settle delays and a light 150ms
						interval, so the highlight follows late layout shifts; a
						target that collapses mid-step degrades to the centered
						card instead of a 0×0 spotlight.
					</p>
					<DocsTable
						columns={['Member', 'Description']}
						rows={overlaySurfaceRows}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
