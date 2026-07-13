export const demoAnnotations = `\
import {
	circle,
	clearAnnotations,
	highlight,
	spotlight
} from '@absolutejs/demo';

// Spotlight — dims the rest of the page and glows around the target.
spotlight({
	selector: "[data-demo='pipeline-total']",
	label: 'Revenue at risk',
	durationMs: 1800 // auto-clears; omit to keep it up
});

// Circle — a rounded ring around an element, no page dimming.
circle({ selector: '#submit', color: '#ff3b30' });

// Highlight — border-only emphasis; the page stays fully visible.
// Targets are a selector OR an explicit x/y/width/height rect.
highlight({ x: 120, y: 240, width: 320, height: 48, label: 'Drop zone' });

// Remove whatever is currently drawn.
clearAnnotations();`;

export const demoAuthForm = `\
// A third-party site you do NOT control — drives the real login UI.
{
	id: 'saucedemo',
	kind: 'form',
	loginUrl: 'https://www.saucedemo.com/',
	fields: [
		{ selector: '#user-name', value: { env: 'SAUCE_USERNAME' } },
		{
			selector: '#password',
			value: { env: 'SAUCE_PASSWORD' },
			typeDelayMs: 60 // type key-by-key, like a human
		}
	],
	submitSelector: '#login-button',
	// Confirm the login worked — an element that appears and/or a URL.
	success: { selector: '.inventory_list' }
}

// Multi-step flows (username → Next → password) use a steps array:
{
	id: 'workspace',
	kind: 'form',
	steps: [
		{ action: 'goto', url: 'https://accounts.example.com/signin' },
		{
			action: 'fill',
			selector: '#identifier',
			value: { env: 'DEMO_EMAIL' }
		},
		{ action: 'click', selector: '#identifier-next' },
		{ action: 'waitFor', target: '#password' },
		{
			action: 'fill',
			selector: '#password',
			value: { env: 'DEMO_PASSWORD' },
			pressEnter: true // submit with Enter instead of a click
		}
	],
	success: { url: '/dashboard' }
}

// Bespoke auth screens: implement DemoAuthDriver yourself.
const customAuth: DemoAuthDriver = {
	signIn: async (profile, context) => {
		await context.browser?.goto('https://app.example.com/sso');
		await context.browser?.click('#continue-with-okta');
		await context.browser?.waitFor('.dashboard');
	}
};`;

export const demoAuthProfiles = `\
import { createDemoRunner, signIn } from '@absolutejs/demo';
import { createDemoAuthDriver } from '@absolutejs/demo/auth';

const runner = createDemoRunner({
	// Default driver — handles all three profile kinds. routes.login
	// overrides the '/auth/login' default for absolute profiles.
	auth: createDemoAuthDriver({ routes: { login: '/api/auth/login' } }),
	browser: session.browserDriver
});

await runner.run({
	id: 'signin-demo',
	profiles: [
		// absolute — a site you own that uses @absolutejs/auth. Posts
		// email + password to the auth login route.
		{
			id: 'ae',
			kind: 'absolute',
			baseUrl: 'http://localhost:3000',
			email: { env: 'DEMO_EMAIL' },
			password: { env: 'DEMO_PASSWORD' },
			afterLoginUrl: 'http://localhost:3000/pipeline'
		},
		// storage-state — reuse a saved Playwright session; applied
		// when the browser context is created.
		{
			id: 'returning-user',
			kind: 'storage-state',
			storageState: '.demo-auth/ae.storage-state.json'
		}
	],
	// Trigger a profile from a step by id:
	steps: [signIn('ae')]
});`;

export const demoComposition = `\
import { composeDemoWithFFmpeg } from '@absolutejs/demo/composition';

// Mux the run recording and every voiceover artifact into one final
// video. Narration is offset against the recorded screen.
const finalVideo = await composeDemoWithFFmpeg(report, {
	outputPath: '.demo-artifacts/crm-demo.mp4'
});
// → { id: '<run>-composition', kind: 'composition', path, metadata }

// Every dial:
await composeDemoWithFFmpeg(report, {
	outputPath: '.demo-artifacts/crm-demo.mp4',
	audioMode: 'voiceover+recording', // keep live captured audio too
	voiceoverTiming: 'timeline', // place lines by run-clock offsets
	voiceoverGapMs: 250, // gap between lines in 'sequential' mode
	voiceoverOffsetsMs: { 'voiceover-3': 12400 }, // manual override wins
	videoCodec: 'libx264', // default for .mp4 output; 'copy' remuxes
	audioCodec: 'aac',
	extendVideo: true, // freeze the last frame until narration ends
	outputDurationMs: 95000,
	recordingPath: '.demo-video/override.webm', // bypass the artifact
	overwrite: true
});

// Or hold it behind the DemoComposer interface:
import { createFFmpegDemoComposer } from '@absolutejs/demo';
const composer = createFFmpegDemoComposer();
await composer.compose(report, { outputPath: 'final.mp4' });`;

export const demoDesktopControl = `\
import { createDemoRunner, focusApp, openApp, wait } from '@absolutejs/demo';
import {
	createCommandDesktopDriver,
	createMacDesktopDriver
} from '@absolutejs/demo/desktop';

// macOS: open/focus apps and send keystrokes via osascript.
const runner = createDemoRunner({ desktop: createMacDesktopDriver() });

await runner.run({
	id: 'discord-demo',
	steps: [openApp('Discord'), wait(1000), focusApp('Discord')]
});

// Linux / Windows: map each capability to a command — xdotool, wmctrl,
// PowerShell, or a UIA bridge. Unconfigured capabilities throw with a
// message naming the missing capability.
const linuxDesktop = createCommandDesktopDriver({
	open: (target) => ['xdg-open', String(target)],
	focus: (target) => ['wmctrl', '-a', String(target)],
	hotkey: (keys) => ['xdotool', 'key', keys.join('+')],
	typeText: (text) => ['xdotool', 'type', text],
	click: (x, y) => [
		'xdotool', 'mousemove', String(x), String(y), 'click', '1'
	]
});`;

export const demoPlaywrightSession = `\
import { createPlaywrightDemoSession } from '@absolutejs/demo/playwright';

const session = await createPlaywrightDemoSession({
	browser: 'chromium', // 'chromium' | 'firefox' | 'webkit'
	channel: 'chrome', // branded Chrome instead of the bundled build
	headless: false,
	recordVideoDir: '.demo-video', // Playwright video for this context
	screenshotDir: '.demo-shots',
	fullPageScreenshots: true,
	contextOptions: { viewport: { width: 1600, height: 900 } },
	// A storage-state profile applied when the context is created.
	account: {
		id: 'returning-user',
		kind: 'storage-state',
		storageState: '.demo-auth/ae.storage-state.json'
	}
});

// The session exposes everything the runner needs:
session.browserDriver; // DemoBrowserDriver — goto/click/fill/type/press
session.annotations; // overlay annotation driver for this page
session.page; // the raw Playwright page for anything bespoke
await session.recordingArtifact(); // video as a recording artifact
await session.close(); // stop recording, close context + browser

// Lower-level pieces are exported too:
import {
	createPlaywrightAnnotationDriver,
	createPlaywrightDemoBrowser,
	launchPlaywright
} from '@absolutejs/demo/playwright';

const browser = await launchPlaywright({ headless: true });
const driver = createPlaywrightDemoBrowser({ page, screenshotDir: 'x' });
const annotations = createPlaywrightAnnotationDriver(page);`;

export const demoQuickStart = `\
import {
	createDemoRunner,
	goto,
	narrate,
	signIn,
	spotlight,
	writeDemoManifest
} from '@absolutejs/demo';
import { createDemoAuthDriver } from '@absolutejs/demo/auth';
import { createPlaywrightDemoSession } from '@absolutejs/demo/playwright';

const session = await createPlaywrightDemoSession({
	headless: false,
	recordVideoDir: '.demo-video',
	screenshotDir: '.demo-shots'
});

const runner = createDemoRunner({
	auth: createDemoAuthDriver(),
	browser: session.browserDriver,
	annotations: session.annotations,
	voiceover: {
		speak: async ({ text }) => {
			console.log('[voiceover]', text);
		}
	}
});

const report = await runner.run({
	profiles: [
		{
			id: 'ae',
			kind: 'absolute',
			baseUrl: 'http://localhost:3000',
			email: { env: 'DEMO_EMAIL' },
			password: { env: 'DEMO_PASSWORD' },
			afterLoginUrl: 'http://localhost:3000/pipeline'
		}
	],
	id: 'crm-demo',
	title: 'CRM demo',
	steps: [
		signIn('ae'),
		narrate('Here is the live pipeline view.'),
		goto('http://localhost:3000/pipeline'),
		spotlight({
			selector: "[data-demo='pipeline-total']",
			label: 'Revenue at risk',
			durationMs: 1800
		})
	]
});

await writeDemoManifest(report, '.demo-artifacts/crm-demo.manifest.json');
console.log(report.status, report.artifacts);
await session.close();`;

export const demoRecorders = `\
import {
	createCommandRecorder,
	createPlaywrightVideoArtifact,
	createScreenRecorder
} from '@absolutejs/demo/recording';

// Wrap any CLI recorder — ffmpeg invocations, OBS command bridges, or
// platform-native recorders. start() spawns; stop() runs stopCommand
// (or SIGINTs the start process) and returns a recording artifact.
const obsRecorder = createCommandRecorder({
	startCommand: (run) => ['obs-cmd', 'recording', 'start'],
	stopCommand: (run) => ['obs-cmd', 'recording', 'stop'],
	outputPath: (run) => '.demo-video/' + run.id + '.mp4'
});

// Full-screen X11 recorder — captures REAL apps on a display, not just
// the Playwright browser. x11grab (+ optional PulseAudio) → mp4.
const screenRecorder = createScreenRecorder({
	outputPath: (run) => '.demo-video/' + run.id + '.mp4',
	display: ':0', // defaults to $DISPLAY or ':0' (WSLg)
	windowId: '0x1200004', // grab one X window (WSLg root is black)
	cropRect: { x: 0, y: 88, width: 1600, height: 812 }, // drop chrome
	framerate: 30,
	// PulseAudio: true → default source; or a sink monitor to record
	// playback (a live Meet/Discord call). Omit for video-only.
	audio: { device: 'rdp-sink.monitor' }
});

const runner = createDemoRunner({ recorder: screenRecorder });
// recorder.start() fires before step one; stop() runs after the last
// step (or on failure) and its artifact joins report.artifacts.

// Browser-only demos can skip a recorder entirely: pass recordVideoDir
// to createPlaywrightDemoSession and session.close() returns the video
// as a recording artifact — or wrap an existing file yourself:
const artifact = createPlaywrightVideoArtifact(
	'crm-demo-recording',
	'.demo-video/abc123.webm',
	{ source: 'playwright' }
);`;

export const demoRunnerOptions = `\
import { createDemoRunner } from '@absolutejs/demo';

const runner = createDemoRunner({
	annotations: session.annotations, // overlay callout driver
	auth: createDemoAuthDriver(), // resolves signIn('<id>') steps
	browser: session.browserDriver, // goto/click/fill/press/waitFor
	desktop: createMacDesktopDriver(), // native-app steps
	recorder: screenRecorder, // started before step 1, stopped after
	voiceover: elevenLabs, // narrate(...) target

	// 'throw' (default) or 'continue' — a failed overlay is logged as
	// an artifact and the run keeps going.
	annotationFailure: 'continue',
	// Stream run/step/artifact events as they happen.
	onEvent: (event) => sendToDashboard(event),
	// Block each narrate() until the rendered audio duration elapses,
	// so on-screen action stays in sync with live playback.
	voiceoverPlayback: 'wait-for-duration',
	idFactory: () => 'run-' + Date.now().toString(36)
});

const report = await runner.run(script);
// report — the DemoRunReport:
// {
//   id, scriptId, startedAt, endedAt, durationMs,
//   status: 'completed' | 'failed',
//   error?: { message, stack? },
//   artifacts: DemoArtifact[], // recordings, voiceovers, screenshots
//   events: DemoRunnerEvent[]  // run.started, step.started,
// }                            // step.completed, artifact, run.failed`;

export const demoScriptSteps = `\
import {
	click,
	demoScript,
	fill,
	goto,
	markRecording,
	narrate,
	press,
	screenshot,
	signIn,
	spotlight,
	wait,
	waitFor
} from '@absolutejs/demo';

const script = demoScript({
	id: 'crm-demo',
	title: 'CRM demo',
	metadata: { audience: 'enterprise', owner: 'sales-eng' },
	profiles: [
		/* credential profiles — see Authentication */
	],
	steps: [
		signIn('ae'), // run a credential profile by id
		goto('http://localhost:3000/pipeline'),
		waitFor("[data-demo='pipeline-total']"), // selector or ms
		click('#quarter-toggle'),
		fill('#search', 'Acme'),
		press('#search', 'Enter'),
		narrate({
			text: 'Here is the live pipeline view.',
			emotion: 'confident'
		}),
		spotlight({
			selector: "[data-demo='pipeline-total']",
			label: 'Revenue at risk',
			durationMs: 1800
		}),
		markRecording('chapter: pipeline'), // recorder chapter marker
		screenshot('pipeline'),
		wait(1200),
		// Escape hatch — custom logic with the full DemoContext.
		{
			name: 'custom',
			run: async (context) => {
				await context.narrate('And one more thing.');
				await context.annotate({ type: 'clear' });
				context.addArtifact({ id: 'note', kind: 'log' });
			}
		}
	]
});

const report = await runner.run(script);`;

export const demoTimelineManifest = `\
import {
	createDemoManifest,
	createDemoSyncPlan,
	createDemoTimeline,
	getDemoArtifactOffsetMs,
	writeDemoManifest
} from '@absolutejs/demo';

// Timeline — run events + artifacts as offset-from-start entries.
const timeline = createDemoTimeline(report, { includeSteps: true });
// [{ id, type, at, offsetMs, label?, artifact? }, ...]
// type: 'run' | 'step' | 'artifact' | 'voiceover' | 'recording'
//     | 'screenshot' | 'composition'

// Where one artifact landed on the run clock.
const offsetMs = getDemoArtifactOffsetMs(report, 'voiceover-3');

// Manifest — a self-describing proof-of-run JSON document.
const manifest = await writeDemoManifest(
	report,
	'.demo-artifacts/crm-demo.manifest.json',
	{ environment: 'staging', gitSha: process.env.GIT_SHA }
);
// manifest.proof → { status, durationMs, artifactCount, eventCount,
//                    hasRecording, hasVoiceover }
// createDemoManifest(report, options) builds it without writing.

// Sync plan — author a narration/visual schedule ahead of a run. Items
// publish ReactiveEvents through @absolutejs/sync as they are added.
const plan = createDemoSyncPlan('crm-demo');
plan.addVoiceover({
	id: 'intro',
	text: 'Here is the live pipeline view.',
	artifact: voiceArtifact,
	durationMs: 5200
});
plan.addVisual({ id: 'callout', label: 'Spotlight', durationMs: 1800 });
plan.durationMs; // running end of the schedule
plan.events(); // the published ReactiveEvents`;

export const demoVoiceoverProviders = `\
import {
	createDeepgramAuraVoiceover,
	createElevenLabsVoiceover,
	createVoiceTTSVoiceover
} from '@absolutejs/demo/voiceover';

// Premium tier — the recommended default for client demos.
const premium = createElevenLabsVoiceover({
	apiKey: process.env.ELEVENLABS_API_KEY ?? '',
	outputDir: '.demo-voiceover',
	// Everything below is optional — these ARE the defaults:
	voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel (American)
	modelId: 'eleven_flash_v2_5',
	outputFormat: 'mp3_44100_128', // CBR → duration derivable
	voiceSettings: {
		stability: 0.42,
		similarityBoost: 0.78,
		style: 0.35,
		speed: 1,
		useSpeakerBoost: true
	},
	cacheDir: '.demo-voiceover/cache' // content-addressed render cache
});

// Faster and cheaper, reads more synthetic — fine for internal runs.
const fast = createDeepgramAuraVoiceover({
	apiKey: process.env.DEEPGRAM_API_KEY ?? '',
	outputDir: '.demo-voiceover',
	model: 'aura-asteria-en',
	sampleRateHz: 24000 // 8000 | 16000 | 24000 | 48000
});

// Or wrap any @absolutejs/voice TTSAdapter.
const adapter = createVoiceTTSVoiceover({
	tts: myTtsAdapter,
	outputDir: '.demo-voiceover'
});

// Narration steps drive whichever voiceover the runner holds:
narrate({
	text: 'Here is the live pipeline view.',
	emotion: 'confident', // 'neutral'|'confident'|'excited'|'calm'
	voice: 'pNInz6obpgDQGcFmaJgB' // per-line voice id override
});`;

export const demoVoiceoverWrappers = `\
import {
	applyPronunciationAliases,
	createElevenLabsVoiceover,
	DEFAULT_PRONUNCIATION_RULES,
	withPronunciationAliases,
	withRenderCache
} from '@absolutejs/demo/voiceover';

// Demo-vocabulary pronunciation fixes (onSpark, AbsoluteJS, PDL, …)
// applied before TTS, and identical lines cached so re-runs skip
// re-synthesis. Both wrappers are provider-agnostic.
const voiceover = withRenderCache(
	withPronunciationAliases(
		createElevenLabsVoiceover({
			apiKey: process.env.ELEVENLABS_API_KEY ?? '',
			outputDir: '.demo-voiceover'
		})
	),
	{ cacheDir: '.demo-voiceover/cache', salt: 'rachel:flash_v2_5' }
);

// Add product vocabulary on top of the shipped defaults.
withPronunciationAliases(voiceover, [
	...DEFAULT_PRONUNCIATION_RULES,
	{ match: 'K8s', replacement: 'kubernetes' }
]);
// Or rewrite text directly (word-boundary, case-insensitive):
applyPronunciationAliases('AbsoluteJS ships onSpark');
// → 'absolute jay ess ships on spark'

// Cache controls:
withRenderCache(voiceover, {
	cacheDir: '.demo-voiceover/cache',
	// Bump whenever voice/model/settings change so stale audio is
	// never replayed — the salt folds into the cache key.
	salt: 'rachel:flash_v2_5',
	// Return null to bypass the cache for a line (dynamic narration).
	keyFor: (input) => (input.metadata?.dynamic ? null : input.text)
});`;
