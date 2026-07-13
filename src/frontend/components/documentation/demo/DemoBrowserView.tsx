import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	demoAnnotations,
	demoAuthForm,
	demoAuthProfiles,
	demoDesktopControl,
	demoPlaywrightSession,
	demoQuickStart,
	demoRunnerOptions,
	demoScriptSteps
} from '../../../data/documentation/demoSectionDocsCode';
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
import { ComparisonTable, ComparisonRow } from '../../utils/ComparisonTable';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#demo-browser', label: 'Browser Demos' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#playwright-session', label: 'Playwright Session' },
	{ href: '#runner-scripts', label: 'Runner & Script Steps' },
	{ href: '#authentication', label: 'Authentication' },
	{ href: '#annotations', label: 'Annotations' },
	{ href: '#desktop-control', label: 'Desktop Control' }
];

const sessionOptionRows: DocsTableCell[][] = [
	[
		{ code: 'headless' },
		{ code: 'boolean' },
		'Defaults to false — a demo is meant to be seen (and recorded).'
	],
	[
		{ code: 'browser' },
		{ code: "'chromium' | 'firefox' | 'webkit'" },
		'Engine to launch. Defaults to chromium.'
	],
	[
		{ code: 'channel' },
		{ code: 'string' },
		'Branded browser channel (e.g. "chrome") instead of the bundled build.'
	],
	[
		{ code: 'browserInstance' },
		{ code: 'Browser' },
		'Reuse an already-launched Playwright browser; close() then leaves it running.'
	],
	[
		{ code: 'contextOptions' },
		{ code: 'Record<string, unknown>' },
		'Passed straight to browser.newContext() — viewport, locale, permissions.'
	],
	[
		{ code: 'recordVideoDir' },
		{ code: 'string' },
		'Enables Playwright video for the context; close() returns it as a recording artifact.'
	],
	[
		{ code: 'screenshotDir' },
		{ code: 'string' },
		'Where screenshot() steps write their PNG files.'
	],
	[
		{ code: 'fullPageScreenshots' },
		{ code: 'boolean' },
		'Capture the full scroll height (default true) instead of the viewport.'
	],
	[
		{ code: 'account' },
		{ code: 'DemoCredentialProfile' },
		'A storage-state profile applied when the context is created — start signed in.'
	]
];

const runnerOptionRows: DocsTableCell[][] = [
	[
		{ code: 'browser' },
		{ code: 'DemoBrowserDriver' },
		'Executes goto/click/fill/type/press/waitFor/screenshot steps.'
	],
	[
		{ code: 'auth' },
		{ code: 'DemoAuthDriver' },
		'Resolves signIn("<id>") steps against the script’s profiles.'
	],
	[
		{ code: 'annotations' },
		{ code: 'DemoAnnotationDriver' },
		'Draws spotlight / circle / highlight overlays.'
	],
	[
		{ code: 'desktop' },
		{ code: 'DemoDesktopDriver' },
		'Executes openApp / focusApp / hotkey / typeText / click steps.'
	],
	[
		{ code: 'recorder' },
		{ code: 'DemoRecorder' },
		'Started before step one; stopped (and collected as an artifact) after the last step or on failure.'
	],
	[
		{ code: 'voiceover' },
		{ code: 'DemoVoiceover' },
		'speak() target for narrate steps; returned artifacts join the report.'
	],
	[
		{ code: 'annotationFailure' },
		{ code: "'throw' | 'continue'" },
		'With "continue", a failed overlay becomes a log artifact and the run keeps going.'
	],
	[
		{ code: 'onEvent' },
		{ code: '(event) => void | Promise<void>' },
		'Streams run.started, step.started, step.completed, artifact, run.completed, run.failed.'
	],
	[
		{ code: 'voiceoverPlayback' },
		{ code: "'continue' | 'wait-for-duration'" },
		'Block each narration for its rendered audio duration so live playback stays in sync.'
	],
	[
		{ code: 'idFactory' },
		{ code: '() => string' },
		'Custom run ids; defaults to a timestamped random id.'
	]
];

const stepBuilderRows: DocsTableCell[][] = [
	[
		{ code: 'signIn(profileId)' },
		'Run the named credential profile through the auth driver.'
	],
	[{ code: 'goto(url)' }, 'Navigate the page.'],
	[{ code: 'click(selector)' }, 'Click an element.'],
	[{ code: 'fill(selector, value)' }, 'Set an input value instantly.'],
	[{ code: 'press(selector, key)' }, 'Press a key in an element.'],
	[
		{ code: 'waitFor(target)' },
		'Wait for a selector to appear, or sleep for a number of ms.'
	],
	[
		{ code: 'screenshot(name?)' },
		'Capture the page; the PNG becomes a screenshot artifact.'
	],
	[
		{ code: 'narrate(input)' },
		'Speak a line — a string or { text, voice?, emotion? }.'
	],
	[
		{ code: 'spotlight / circle / highlight' },
		'Draw a presenter callout over the UI (see Annotations).'
	],
	[{ code: 'clearAnnotations()' }, 'Remove the current overlay.'],
	[
		{ code: 'openApp / focusApp' },
		'Open or focus a native app via the desktop driver.'
	],
	[
		{ code: 'hotkey(keys) / typeText(text)' },
		'Send OS-level keystrokes or type text into the focused app.'
	],
	[{ code: 'wait(ms)' }, 'Pause the run.'],
	[
		{ code: 'markRecording(label)' },
		'Drop a chapter marker on recorders that support mark().'
	],
	[
		{ code: '{ run: (context) => ... }' },
		'Escape hatch — arbitrary logic with the full DemoContext.'
	]
];

const profileKindRows: ComparisonRow[] = [
	{
		feature: 'Works on sites you don’t control',
		values: [false, true, false]
	},
	{
		feature: 'Drives the real login UI',
		note: 'Navigates, types into fields, clicks submit',
		values: [false, true, false]
	},
	{
		feature: 'Posts to the @absolutejs/auth login route',
		note: '/auth/login by default, or routes.login',
		values: [true, false, false]
	},
	{
		feature: 'Multi-step flows',
		note: 'username → Next → password via a steps array',
		values: [false, true, false]
	},
	{
		feature: 'Human-style typing',
		note: 'typeDelayMs types key-by-key; pressEnter submits',
		values: [false, true, false]
	},
	{
		feature: 'Success confirmation',
		note: 'success.selector and/or success.url',
		values: ['afterLoginUrl', true, 'n/a']
	},
	{
		feature: 'Reuses a saved Playwright session',
		note: 'Applied when the browser context is created',
		values: [false, false, true]
	},
	{
		feature: 'Secrets resolved from env at sign-in',
		values: [true, true, 'n/a']
	}
];

const annotationFieldRows: DocsTableCell[][] = [
	[
		{ code: 'type' },
		'"spotlight" dims the page around the target; "circle" rings it; "highlight" borders it; "clear" removes the overlay.'
	],
	[
		{ code: 'selector' },
		'CSS selector to anchor on — or use x / y / width / height for an explicit rect.'
	],
	[{ code: 'label' }, 'Presenter caption rendered above the target.'],
	[{ code: 'color' }, 'Accent color; defaults to #ff3b30.'],
	[
		{ code: 'durationMs' },
		'Auto-clear after this many ms; omit to keep the callout up until the next one.'
	]
];

const desktopCapabilityRows: DocsTableCell[][] = [
	[
		{ code: 'open(target)' },
		'Launch an app. Targets are a name string or { name, bundleId, executable, windowTitle }.'
	],
	[{ code: 'focus(target)' }, 'Bring an app’s window to the front.'],
	[
		{ code: 'hotkey(...keys)' },
		'Send a key chord (modifiers first, key last).'
	],
	[{ code: 'typeText(text)' }, 'Type text into the focused app.'],
	[{ code: 'click?(x, y)' }, 'Optional — click at screen coordinates.'],
	[
		{ code: 'waitForWindow?(target, timeoutMs?)' },
		'Optional — block until a window exists.'
	]
];

export const DemoBrowserView = ({
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
					<h1 id="demo-browser" style={h1Style(isMobileOrTablet)}>
						Demo — Browser Runtime
					</h1>
					<p style={paragraphLargeStyle}>
						<code>@absolutejs/demo</code> is the orchestration layer
						for enterprise-grade AI demos: drive the product,
						narrate with AI voiceover, record the screen, and draw
						presenter-style highlights over the UI. It is
						intentionally adapter-first — Playwright is excellent
						for web apps, but real demos often need Discord, Google
						Meet, native apps, screen switching, and OS-level focus
						control, so every capability sits behind a stable driver
						interface.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Install with <code>bun add @absolutejs/demo</code>, and
						add optional drivers only when needed (
						<code>bun add -d playwright</code>). A browser demo is
						three pieces: a Playwright <em>session</em> (page +
						video + screenshots), a <em>runner</em> holding the
						drivers, and a declarative <em>script</em> of steps. The
						report that comes back carries every artifact and a
						timestamped event log.
					</p>
					<PrismPlus
						codeString={demoQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>runner.run()</code> never throws for a failed demo
						— it returns a report with <code>status: 'failed'</code>{' '}
						and the error, after stopping the recorder so the
						partial recording survives.{' '}
						<code>writeDemoManifest()</code> then turns the report
						into a proof-of-run JSON document.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="playwright-session"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Playwright Session
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createPlaywrightDemoSession()</code> (from{' '}
						<code>@absolutejs/demo/playwright</code>) launches the
						browser, opens a context + page, and hands back the two
						drivers the runner needs: a{' '}
						<code>DemoBrowserDriver</code> and an annotation driver.
						Playwright itself is loaded dynamically — it stays an
						optional dependency.
					</p>
					<DocsTable
						columns={['Option', 'Type', 'Description']}
						rows={sessionOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoPlaywrightSession}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="runner-scripts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Runner & Script Steps
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createDemoRunner()</code> holds the drivers;{' '}
						<code>demoScript()</code> declares what happens. Every
						driver is optional — a script that only narrates needs
						only a voiceover, and a step whose driver is missing
						fails with an error naming it.
					</p>
					<DocsTable
						columns={['Option', 'Type', 'Description']}
						rows={runnerOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoRunnerOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Steps are plain JSON-friendly objects; the builders
						below construct them. Each accepts a trailing{' '}
						<code>{'{ id?, name? }'}</code> options object that
						labels the step in the event log and timeline.
					</p>
					<DocsTable
						columns={['Builder', 'Step']}
						rows={stepBuilderRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoScriptSteps}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="authentication"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authentication
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sign-in is profile-based: declare named credential{' '}
						<code>profiles</code> on the script and trigger them
						with <code>signIn("&lt;id&gt;")</code> steps. Three
						profile kinds cover the common cases — your own
						AbsoluteJS app, any third-party login form, and a saved
						browser session.
					</p>
					<ComparisonTable
						columns={['absolute', 'form', 'storage-state']}
						firstColumnLabel="Capability"
						rows={profileKindRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Secrets never enter the script"
						variant="success"
					>
						Credentials are passed as env <em>references</em> (
						<code>{'{ env: "VAR_NAME" }'}</code>) — the runner
						resolves them at sign-in time, so real secrets never
						enter the script object, the manifest, or the recording.
						A missing env var throws an error naming the variable,
						never its value. The sign-in log artifact records only
						which profile ran and whether it succeeded.
					</Callout>
					<PrismPlus
						codeString={demoAuthProfiles}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>form</code> profiles drive the real login UI of{' '}
						<strong>any</strong> site, including ones you don't
						control: navigate to <code>loginUrl</code>, fill{' '}
						<code>fields</code>, click <code>submitSelector</code>,
						and confirm via a <code>success</code> selector and/or
						URL. For bespoke auth screens, implement your own{' '}
						<code>DemoAuthDriver</code>.
					</p>
					<PrismPlus
						codeString={demoAuthForm}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="annotations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Annotations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Annotations are presenter-style callouts drawn as a
						fixed overlay above the page (max z-index, pointer
						events off — they never intercept the demo's own
						clicks). The Playwright annotation driver renders them
						in-page; any environment can implement{' '}
						<code>DemoAnnotationDriver</code> with a single{' '}
						<code>show()</code> method.
					</p>
					<DocsTable
						columns={['Field', 'Meaning']}
						rows={annotationFieldRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoAnnotations}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="desktop-control"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Desktop Control
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Native-app automation goes through{' '}
						<code>createCommandDesktopDriver()</code> (from{' '}
						<code>@absolutejs/demo/desktop</code>) — each capability
						maps to a CLI command. On macOS,{' '}
						<code>createMacDesktopDriver()</code> ships ready-made:
						it opens and focuses apps with <code>open -a</code> and
						sends keystrokes via <code>osascript</code>. Linux and
						Windows provide equivalent factories with{' '}
						<code>xdotool</code>, <code>wmctrl</code>, PowerShell,
						or a UIA bridge.
					</p>
					<DocsTable
						columns={['Capability', 'Description']}
						rows={desktopCapabilityRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoDesktopControl}
						language="typescript"
						showLineNumbers={true}
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
