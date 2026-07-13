import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	tourBranchingConditions,
	tourBranchingEvents,
	tourBranchingGate,
	tourBranchingSteps,
	tourBranchingTrigger
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#tour-branching', label: 'Branching, Gates & Events' },
	{ href: '#condition-registry', label: 'Condition Registry' },
	{ href: '#showif-skipif', label: 'showIf & skipIf' },
	{ href: '#waitfor', label: 'waitFor Readiness' },
	{ href: '#funnel-events', label: 'Funnel Events' },
	{ href: '#autoplay-gate', label: 'Auto-play Gate' },
	{ href: '#trigger-rules', label: 'Trigger Rules' },
	{ href: '#gate-wiring', label: 'Wiring Events to the Gate' }
];

const builtinConditionRows: DocsTableCell[][] = [
	[
		{ code: 'element' },
		{ code: "{ selector: '.pipeline-board' }" },
		'True when document.querySelector finds the selector.'
	],
	[
		{ code: 'media' },
		{ code: "{ query: '(max-width: 640px)' }" },
		'True when the media query currently matches.'
	]
];

const waitForRows: DocsTableCell[][] = [
	[
		{ code: 'selector' },
		'Poll until the selector exists and has a visible box (a 0×0 element does not count).'
	],
	[
		{ code: 'condition' },
		'Poll a serialized condition ref (120ms interval) until it returns true.'
	],
	[
		{ code: 'timeoutMs', suffix: 'default 3500' },
		'Past the timeout the step shows anyway rather than stalling the tour.'
	]
];

const eventRows: DocsTableCell[][] = [
	[
		{ code: 'tour_started' },
		'A genuine start — a cross-page resume does not re-fire it.'
	],
	[
		{ code: 'step_viewed' },
		'A step is positioned and on screen (centered and missing-target steps included).'
	],
	[
		{ code: 'step_completed' },
		'The viewer (or an action) advanced past the step.'
	],
	[
		{ code: 'step_target_missing' },
		'The target selector was not found in time; the step degraded to a centered card.'
	],
	[
		{ code: 'action_failed' },
		'An action ref failed or named an unknown handler — reason carries the action name.'
	],
	[
		{ code: 'tour_completed' },
		'The last step finished. reason is "remaining-skipped" when the tail of the tour was branch-skipped.'
	],
	[
		{ code: 'tour_skipped' },
		'The viewer bailed — reason distinguishes the Skip button ("skip") from Escape ("escape").'
	]
];

const eventPayloadRows: DocsTableCell[][] = [
	[{ code: 'at' }, 'ISO timestamp.'],
	[{ code: 'isReplay' }, 'Whether the run was an explicit replay.'],
	[{ code: 'name' }, 'One of the seven event names above.'],
	[
		{ code: 'reason' },
		'Skip source, completion detail, or the failed action name — per event.'
	],
	[
		{ code: 'route' },
		'window.location.pathname when the event fired — for a skip, the screen the viewer was on when they had enough.'
	],
	[
		{ code: 'stepIndex / stepCount / stepTitle' },
		'Where in the tour the event happened.'
	],
	[
		{ code: 'target' },
		'The step target selector, post mobile-override resolution.'
	],
	[
		{ code: 'tutorialSlug' },
		'The tutorial identity the host is playing, so events from different tutorials never blur together.'
	]
];

const gateApiRows: DocsTableCell[][] = [
	[
		{ code: 'pick(tutorials, routePath)' },
		'The one tutorial to auto-play now: eligible candidates, highest trigger.priority wins (stable on ties). Null when none qualify.'
	],
	[
		{ code: 'shouldAutoPlay(tutorial, routePath)' },
		'The full eligibility check for a single tutorial. Manual replays bypass the gate entirely.'
	],
	[
		{ code: 'recordAutoPlay(slug)' },
		'Stamp that an auto-play actually started (session marker + last-played timestamp).'
	],
	[
		{ code: 'recordDismissal(slug)' },
		'The viewer skipped out — counts toward maxDismissals.'
	],
	[{ code: 'recordCompletion(slug)' }, 'The viewer finished the tour.'],
	[
		{ code: 'stateFor(slug)' },
		'The persisted state: { completedAt, dismissals, lastAutoPlayAt }.'
	],
	[
		{ code: 'reset(slug)' },
		'Clear the persisted gate state for one tutorial.'
	]
];

const triggerRows: DocsTableCell[][] = [
	[
		{ code: 'firstVisitOnly' },
		'Auto-play once per viewer — never again after a completion or a prior auto-play.'
	],
	[
		{ code: 'onRoutePrefix' },
		'Only auto-play when the current path starts with this prefix.'
	],
	[
		{ code: 'roles' },
		'Restrict auto-play to these role slugs — at least one must match the gate roles getter. Ignored when the getter is omitted.'
	],
	[
		{ code: 'maxDismissals', suffix: 'default 2' },
		'Stop auto-playing after the viewer has skipped it this many times. Manual replay stays available.'
	],
	[
		{ code: 'oncePerSession' },
		'Auto-play at most once per browser session (sessionStorage marker).'
	],
	[
		{ code: 'priority' },
		'When several tutorials match a page, the highest priority wins.'
	],
	[
		{ code: 'showIf' },
		'Audience predicates — all must hold for auto-play, resolved through the condition registry.'
	]
];

const gateWiring: StepFlowStep[] = [
	{
		actor: 'host',
		code: 'const tutorial = gate.pick(publishedTutorials, route.path);',
		description:
			'Route change (or app mount): ask the gate which tutorial, if any, should auto-play here and now.',
		title: 'Ask pick() on navigation'
	},
	{
		actor: 'host',
		code: "gate.recordAutoPlay(tutorial.slug ?? ''); controller.start();",
		description:
			'Stamping the auto-play is what makes oncePerSession and firstVisitOnly hold on the next visit.',
		title: 'Record the auto-play, then start'
	},
	{
		actor: 'engine',
		description:
			'useSpotlight emits the funnel events for the run — started, viewed, completed, skipped.',
		title: 'The tour plays and reports'
	},
	{
		actor: 'host',
		code: 'tour_skipped → gate.recordDismissal(slug)',
		description:
			'Each skip counts toward maxDismissals — after the cap (default 2), the tutorial only plays via manual replay.',
		title: 'Sink skips into the gate'
	},
	{
		actor: 'host',
		code: 'tour_completed → gate.recordCompletion(slug)',
		description:
			'A completion permanently satisfies firstVisitOnly for that viewer.',
		title: 'Sink completions into the gate'
	}
];

export const TourBranchingView = ({
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
					<h1 id="tour-branching" style={h1Style(isMobileOrTablet)}>
						Branching, Gates & Funnel Events
					</h1>
					<p style={paragraphLargeStyle}>
						One tour rarely fits every viewer. Serializable{' '}
						<strong>conditions</strong> branch steps with{' '}
						<code>showIf</code> / <code>skipIf</code> and hold them
						with <code>waitFor</code>; <code>useTourGate</code> owns
						the auto-play decision across many tutorials (dismissal
						caps, once-per-session, priority, audience); and
						structured <strong>funnel events</strong> tell you
						exactly where viewers bail — down to the step, route,
						and whether they hit Skip or Escape.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="condition-registry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Condition Registry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Conditions mirror actions: a step (or a trigger rule)
						references a predicate <strong>by name</strong> in plain
						JSON, and the host registers it on{' '}
						<code>useTourConditions()</code> — a keyed singleton,
						default key <code>'absolute.tour'</code>. Built-ins
						cover the DOM-shaped checks; anything product-shaped
						("hasDeals", "isSubscribed") comes from the host.
					</p>
					<DocsTable
						columns={['Built-in', 'Args', 'True when']}
						rows={builtinConditionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourBranchingConditions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Unknown conditions count as FALSE"
						variant="warning"
					>
						An unresolved condition name warns and evaluates to
						false — so a <code>showIf</code> on a missing predicate{' '}
						<strong>hides</strong> the step rather than breaking,
						and a <code>skipIf</code> on one doesn't skip. Throwing
						predicates are contained the same way.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="showif-skipif"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						showIf & skipIf
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A step is skipped when <strong>any</strong>{' '}
						<code>skipIf</code> predicate holds, when{' '}
						<strong>not all</strong> <code>showIf</code> predicates
						hold, or when its <code>mobile.skip</code> flag applies
						below the mobile query. Skipped steps are hopped in the
						direction of travel — going forward hops forward, going
						back hops back (and falls forward again if everything
						behind is skipped).
					</p>
					<PrismPlus
						codeString={tourBranchingSteps}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Clean completion"
						variant="success"
					>
						If everything ahead is skipped, the tour completes
						cleanly instead of stranding the viewer — it emits{' '}
						<code>tour_completed</code> with reason{' '}
						<code>"remaining-skipped"</code> and closes.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="waitfor"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						waitFor Readiness
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Branching decides <em>whether</em> a step shows;{' '}
						<code>waitFor</code> decides <em>when</em>. It holds the
						step until the app is ready for it — a panel rendered
						after a data fetch, a host predicate flipped true —
						instead of spotlighting a half-loaded surface.
					</p>
					<DocsTable
						columns={['Field', 'Behavior']}
						rows={waitForRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="funnel-events"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Funnel Events
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass <code>onEvent</code> to <code>useSpotlight</code>{' '}
						and every lifecycle moment lands in your analytics. The
						engine emits; the host sinks the events into whatever
						analytics it runs.
					</p>
					<DocsTable
						columns={['Event', 'Fires when']}
						rows={eventRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourBranchingEvents}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every <code>TourEvent</code> carries the full context:
					</p>
					<DocsTable
						columns={['Field', 'Description']}
						rows={eventPayloadRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="autoplay-gate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Auto-play Gate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Home-grown tours always break here first: one "seen"
						flag can't express "stop nagging after two skips", "at
						most once per session", or "when three tutorials match
						this page, play the important one".{' '}
						<code>useTourGate</code> owns that bookkeeping — state
						persists in <code>localStorage</code> because dismissals
						must survive sessions — and evaluates the trigger rules;
						the host just asks <code>pick()</code> and records what
						happened.
					</p>
					<PrismPlus
						codeString={tourBranchingGate}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Method', 'Description']}
						rows={gateApiRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="trigger-rules"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Trigger Rules
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A tutorial's <code>trigger</code> block describes when
						it should auto-play; a tutorial without one never
						auto-plays. All rules are serializable, so they store
						and author like the rest of the protocol:
					</p>
					<DocsTable
						columns={['Rule', 'Behavior']}
						rows={triggerRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourBranchingTrigger}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="gate-wiring"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wiring Events to the Gate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The gate and the funnel events close the loop: the gate
						decides, the engine reports, and the report feeds the
						next decision.
					</p>
					<StepFlow steps={gateWiring} themeSprings={themeSprings} />
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
