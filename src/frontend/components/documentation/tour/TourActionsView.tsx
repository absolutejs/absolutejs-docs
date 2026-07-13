import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	tourActionsBuiltins,
	tourActionsController,
	tourActionsCta,
	tourActionsDemoData,
	tourActionsHandlerContext,
	tourActionsRegister
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
	{ href: '#tour-actions', label: 'Step Actions & Demo Data' },
	{ href: '#shared-controller', label: 'Shared Controller' },
	{ href: '#action-registry', label: 'Action Registry' },
	{ href: '#built-in-actions', label: 'Built-in Actions' },
	{ href: '#handler-context', label: 'Handler Context' },
	{ href: '#cta-buttons', label: 'CTA Buttons' },
	{ href: '#demo-data', label: 'Demo Data' },
	{ href: '#data-modes', label: 'Data Modes' }
];

const controllerApiRows: DocsTableCell[][] = [
	[
		{ code: 'active' },
		{ code: 'Ref<boolean>' },
		'True while a tour is running. Persisted so a cross-page step resumes after the full reload.'
	],
	[
		{ code: 'index' },
		{ code: 'Ref<number>' },
		'The current step index, persisted per keystroke of navigation.'
	],
	[
		{ code: 'isReplay' },
		{ code: 'Ref<boolean>' },
		'True when the run is an explicit replay, so the host can choose NOT to re-stamp its "seen" marker on finish.'
	],
	[
		{ code: 'start(replay?)' },
		{ code: '(replay?: boolean) => void' },
		'Resets the index to 0 and activates. Pass true to mark the run a replay.'
	],
	[
		{ code: 'stop()' },
		{ code: '() => void' },
		'Deactivates and resets the index to 0.'
	]
];

const builtinActionRows: DocsTableCell[][] = [
	[
		{ code: 'click' },
		{ code: 'selector?' },
		'Clicks the resolved element. Defaults to the step’s own target.'
	],
	[
		{ code: 'scroll' },
		{ code: 'selector?, block?' },
		'Smooth scrollIntoView. block is "center" unless set to "start".'
	],
	[
		{ code: 'wait' },
		{ code: 'ms?' },
		'Abortable sleep (default 600ms) — resolves early when the step changes or the tour stops.'
	]
];

const actionRefRows: DocsTableCell[][] = [
	[
		{ code: 'action' },
		'Names a built-in ("click" | "wait" | "scroll") or a handler the host registered.'
	],
	[
		{ code: 'args' },
		'Plain-JSON scalars (string | number | boolean | null) passed to the handler.'
	],
	[{ code: 'delayMs' }, 'Wait this long (ms) before running this action.']
];

const handlerContextRows: DocsTableCell[][] = [
	[{ code: 'step' }, 'The step being shown.'],
	[
		{ code: 'target' },
		'The step’s resolved target element, or null for a centered / missing-target step.'
	],
	[{ code: 'args' }, 'The raw args from the serialized ref.'],
	[{ code: 'index' }, 'The current step index.'],
	[
		{ code: 'signal' },
		'An AbortSignal that fires when the step changes or the tour stops mid-run.'
	],
	[
		{ code: 'next / back / stop' },
		'Tour navigation — a handler can drive the tour itself, e.g. auto-advance when its demo finishes.'
	]
];

const stepLifecycle: StepFlowStep[] = [
	{
		actor: 'engine',
		description:
			'The in-flight onEnter sequence is cancelled — its AbortSignal fires, and built-ins like wait resolve immediately.',
		title: 'The step changes; any running actions abort'
	},
	{
		actor: 'engine',
		description:
			'Cleanup runs to completion before the next step positions, because it may restore UI the next step depends on. Closing the tour still runs the last step’s onExit.',
		title: 'The previous step’s onExit actions run'
	},
	{
		actor: 'engine',
		description:
			'For cross-page steps the engine pushes the route, then waits for the page (and the target) to render before positioning.',
		title: 'Navigate and wait for the target'
	},
	{
		actor: 'engine',
		description:
			'They run sequentially, fire-and-forget, so the card shows while the demo plays.',
		title: 'onEnter actions fire once the step is positioned'
	},
	{
		actor: 'analytics',
		description: 'step_viewed is emitted to your onEvent sink.',
		title: 'The step is on screen'
	}
];

const dataModeRows: DocsTableCell[][] = [
	[
		{ code: '"auto"', suffix: 'default' },
		'The viewer’s real data when they have it — a member with sourced matches is toured on their literal matches — and the sample when they don’t.'
	],
	[
		{ code: '"demo"' },
		'Always the sample while the tour plays, even when real data exists.'
	],
	[
		{ code: '"live"' },
		'Always the real data, even mid-tour — the sample never shows.'
	]
];

export const TourActionsView = ({
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
					<h1 id="tour-actions" style={h1Style(isMobileOrTablet)}>
						Step Actions & Demo Data
					</h1>
					<p style={paragraphLargeStyle}>
						A tour should <strong>demo the product</strong>, not
						just point at it. Steps stay serializable, so a step
						references actions <strong>by name</strong> — the host
						registers the handlers with <code>useTourActions</code>,
						and built-ins (<code>click</code>, <code>scroll</code>,{' '}
						<code>wait</code>) work straight from admin-authored
						JSON. <code>useTourDemo</code> completes the picture:
						fully-typed sample data on data-backed surfaces, so a
						fresh signup can be toured on an empty account for free.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shared-controller"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Shared Controller
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>useTourController(storageKey)</code> returns a{' '}
						<strong>singleton per storage key</strong> (default{' '}
						<code>'absolute.tour'</code>). In an MPA each page is
						its own mount, so moving between steps is a full page
						reload — the controller persists <code>active</code>,{' '}
						<code>index</code>, and <code>isReplay</code> in{' '}
						<code>sessionStorage</code> (one key per field, no JSON)
						and the tour resumes on the next page at the right step.
					</p>
					<DocsTable
						columns={['Member', 'Type', 'Description']}
						rows={controllerApiRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourActionsController}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="First visit vs replay"
						variant="info"
					>
						The host owns where the "seen" marker lives. Finishing a
						first-visit run stamps it; a replay started with{' '}
						<code>start(true)</code> does not — check{' '}
						<code>isReplay</code> in your finish handler.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="action-registry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Action Registry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Steps are serializable JSON — they can live in a
						database or an admin editor — so a step can't hold a
						function. It holds an action <strong>name</strong>, and{' '}
						<code>useTourActions()</code> maps names to handlers.
						Like the controller it's a keyed singleton: the page
						that <strong>owns</strong> a surface registers its demo
						handler, while the tour overlay — mounted in a
						completely different part of the tree — resolves it by
						name.
					</p>
					<PrismPlus
						codeString={tourActionsRegister}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>register</code> returns an unregister function and{' '}
						<code>registerAll</code> returns one that disposes the
						whole batch — call them on unmount so a dead page's
						handler can't be resolved. The disposer only removes the
						entry if it still points at the same handler, so a
						remount that re-registered before the old cleanup ran is
						never clobbered.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="built-in-actions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Built-in Actions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three generic built-ins ship with the engine, so simple
						demos — click a tab, pause, scroll a panel into view —
						work from admin-authored JSON with no host code at all.
						Each takes an optional <code>selector</code> and
						defaults to the step's own target.
					</p>
					<DocsTable
						columns={['Action', 'Args', 'Behavior']}
						rows={builtinActionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourActionsBuiltins}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Each entry in <code>onEnter</code> / <code>onExit</code>{' '}
						is a <code>TourActionRef</code>:
					</p>
					<DocsTable
						columns={['Field', 'Description']}
						rows={actionRefRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Degrade, never break"
						variant="warning"
					>
						Unknown action names warn and skip, and handler errors
						are contained the same way — a tutorial authored against
						a page that isn't mounted degrades instead of breaking
						the tour. Both paths emit an <code>action_failed</code>{' '}
						funnel event carrying the action name.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handler-context"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handler Context
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every handler receives a <code>TourActionContext</code>{' '}
						— enough to run a demo against the highlighted element
						and even drive the tour itself:
					</p>
					<DocsTable
						columns={['Field', 'Description']}
						rows={handlerContextRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={tourActionsHandlerContext}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						What runs when a step changes, in order:
					</p>
					<StepFlow
						steps={stepLifecycle}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cta-buttons"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CTA Buttons
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A step's <code>cta</code> renders a call-to-action
						button in the card ("Try it now"). The engine's{' '}
						<code>runCta</code> runs the CTA's action refs through
						the same registry as <code>onEnter</code>, then advances
						to the next step unless the step opts out with{' '}
						<code>advance: false</code>.
					</p>
					<PrismPlus
						codeString={tourActionsCta}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="demo-data"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Demo Data
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A tour must be able to show a data-backed surface
						(matches, pipeline, metrics) to a viewer who has no data
						yet — a fresh signup, an unsubscribed user — without the
						host paying to source anything. <code>useTourDemo</code>{' '}
						swaps in a constant, <strong>fully-typed</strong> sample
						dataset while the tour plays and passes the real data
						through untouched otherwise. The demo's type is the
						contract: it must be the same shape the surface renders.
					</p>
					<PrismPlus
						codeString={tourActionsDemoData}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Badge sample data"
						variant="note"
					>
						Badge the surface when <code>isDemo</code> is true
						("Sample data") so the sample is never mistaken for the
						viewer's own. Outside an active tour <code>isDemo</code>{' '}
						is always false and the live data passes through.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="data-modes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Data Modes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Resolution is per <code>TourDataMode</code>.{' '}
						<code>Tutorial.dataMode</code> carries the choice in the
						serialized tutorial, and <code>useTourDemo</code>'s{' '}
						<code>mode</code> getter wires it through:
					</p>
					<DocsTable
						columns={['Mode', 'Resolution while the tour plays']}
						rows={dataModeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						In <code>"auto"</code>, "has data" defaults to
						non-nullish — and non-empty when the value is an array —
						and is overridable per surface with <code>hasLive</code>
						.
					</p>
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
