import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	demoComposition,
	demoRecorders,
	demoTimelineManifest,
	demoVoiceoverProviders,
	demoVoiceoverWrappers
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#demo-recording', label: 'Recording & Composition' },
	{ href: '#pipeline', label: 'The Pipeline' },
	{ href: '#recording', label: 'Recording' },
	{ href: '#voiceover', label: 'AI Voiceover' },
	{ href: '#voiceover-wrappers', label: 'Pronunciation & Caching' },
	{ href: '#composition', label: 'Composition' },
	{ href: '#timeline-manifest', label: 'Timeline & Manifest' }
];

const pipelineSteps: StepFlowStep[] = [
	{
		actor: 'recorder',
		code: 'recorder.start(run)',
		description:
			'The runner starts the recorder before step one — Playwright ' +
			'video for browser-only demos, or an ffmpeg screen recorder ' +
			'when real apps are on screen.',
		title: 'Record the run'
	},
	{
		actor: 'voiceover',
		code: "narrate({ text: '…', emotion: 'confident' })",
		description:
			'Each narrate step renders audio through the voiceover driver ' +
			'and adds a voiceover artifact carrying its durationMs. With ' +
			"voiceoverPlayback: 'wait-for-duration', the run paces itself " +
			'to the audio.',
		title: 'Narrate each beat'
	},
	{
		actor: 'runner',
		code: 'const report = await runner.run(script)',
		description:
			'After the last step (or on failure) the recorder is stopped ' +
			'and its file joins report.artifacts, alongside timestamped ' +
			'run/step/artifact events.',
		title: 'Stop and report'
	},
	{
		actor: 'ffmpeg',
		code: "composeDemoWithFFmpeg(report, { outputPath: 'demo.mp4' })",
		description:
			'Composition muxes the recording with every voiceover artifact, ' +
			'offsetting narration against the recorded screen using the ' +
			'demo timeline.',
		title: 'Compose the final video'
	},
	{
		actor: 'manifest',
		code: "writeDemoManifest(report, 'demo.manifest.json')",
		description:
			'The manifest is a self-describing proof-of-run document: the ' +
			'full report, a proof summary, and the timeline.',
		title: 'Write the proof'
	}
];

const recorderChoiceRows: DocsTableCell[][] = [
	[
		{ code: 'Playwright video' },
		'Browser-only demos',
		'Pass recordVideoDir to the session; close() returns the video as a recording artifact. Zero extra tooling.'
	],
	[
		{ code: 'createScreenRecorder' },
		'Real apps on a display',
		'ffmpeg x11grab capture of the screen or one X window, with optional PulseAudio — records Discord, Meet, anything visible.'
	],
	[
		{ code: 'createCommandRecorder' },
		'Custom tooling',
		'Wraps any start/stop CLI — OBS command bridges or platform-native recorders.'
	]
];

const screenRecorderOptionRows: DocsTableCell[][] = [
	[
		{ code: 'outputPath' },
		{ code: 'string | (run) => string' },
		'Where the mp4 is written; a factory gets the DemoRunInfo.'
	],
	[
		{ code: 'display' },
		{ code: 'string' },
		'X display to grab. Defaults to $DISPLAY or ":0" (WSLg).'
	],
	[
		{ code: 'windowId' },
		{ code: 'string' },
		'Grab a single X window instead of the root — on WSLg the root is black, but a window grab captures correctly.'
	],
	[
		{ code: 'videoSize' },
		{ code: "'WIDTHxHEIGHT'" },
		'Fixed region grab; ignored when windowId is set.'
	],
	[
		{ code: 'cropRect' },
		{ code: '{ x, y, width, height }' },
		'Crop after grabbing — e.g. drop the browser chrome and keep the viewport. Rounded to even dimensions for libx264.'
	],
	[
		{ code: 'framerate' },
		{ code: 'number' },
		'Capture framerate; defaults to 30.'
	],
	[
		{ code: 'audio' },
		{ code: 'boolean | { device? }' },
		'PulseAudio capture — true for the default source, or a device such as a sink monitor to record playback (a live call).'
	],
	[
		{ code: 'ffmpegPath' },
		{ code: 'string' },
		'Binary override; defaults to "ffmpeg" on PATH.'
	]
];

const voiceoverProviderRows: DocsTableCell[][] = [
	[
		{ code: 'createElevenLabsVoiceover' },
		'Premium — client demos',
		'High-fidelity mp3_44100_128 renders with the tuned Dealroom settings. The recommended tier.'
	],
	[
		{ code: 'createDeepgramAuraVoiceover' },
		'Fast + cheap — internal runs',
		'Deepgram Aura linear16 PCM; faster and cheaper but reads more synthetic.'
	],
	[
		{ code: 'createVoiceTTSVoiceover' },
		'Bring your own adapter',
		'Wraps any @absolutejs/voice TTSAdapter; emotion maps to the prosody style.'
	]
];

const elevenLabsDefaultRows: DocsTableCell[][] = [
	[
		{ code: 'voiceId' },
		{ code: "'21m00Tcm4TlvDq8ikWAM'" },
		'Rachel — the American voice tuned for client demos. Override per line via input.voice.'
	],
	[
		{ code: 'modelId' },
		{ code: "'eleven_flash_v2_5'" },
		'DEFAULT_ELEVENLABS_MODEL_ID.'
	],
	[
		{ code: 'outputFormat' },
		{ code: "'mp3_44100_128'" },
		'CBR mp3 — duration is derivable from byte length and the file drops straight into ffmpeg composition.'
	],
	[
		{ code: 'stability / style' },
		{ code: '0.42 / 0.35' },
		'The tuned expressive dials from the Dealroom voice upgrade.'
	],
	[
		{ code: 'similarityBoost / speed' },
		{ code: '0.78 / 1' },
		'Similarity boost keeps the voice on-character.'
	],
	[
		{ code: 'useSpeakerBoost' },
		{ code: 'true' },
		'Speaker boost on for presence.'
	]
];

const emotionRows: DocsTableCell[][] = [
	[{ code: "'neutral'" }, 'No change — the tuned base settings.'],
	[
		{ code: "'calm'" },
		'Stability 0.6, style 0.25 — steadier, more measured.'
	],
	[{ code: "'confident'" }, 'Stability 0.5, style 0.45 — assured delivery.'],
	[
		{ code: "'excited'" },
		'Stability 0.3, style 0.6 — the most animated read.'
	]
];

const compositionOptionRows: DocsTableCell[][] = [
	[
		{ code: 'outputPath' },
		'Final video path. .mp4 defaults the video codec to libx264; anything else remuxes with copy.'
	],
	[
		{ code: 'recordingPath' },
		'Use this file instead of the report’s recording artifact.'
	],
	[
		{ code: 'audioMode' },
		'"voiceover-only" (default) mixes just the narration; "voiceover+recording" keeps the recording’s own captured audio (live call voices) under the narration; "none" strips audio.'
	],
	[
		{ code: 'voiceoverTiming' },
		'"timeline" places each line at its run-clock offset; "sequential" plays lines back-to-back.'
	],
	[
		{ code: 'voiceoverGapMs' },
		'Gap between lines in sequential mode; defaults to 250.'
	],
	[
		{ code: 'voiceoverOffsetsMs' },
		'Per-artifact-id manual offsets — always win over either timing mode.'
	],
	[
		{ code: 'extendVideo' },
		'Freeze the last frame until the final narration ends (default on when narration exists).'
	],
	[{ code: 'outputDurationMs' }, 'Force a total duration for the output.'],
	[
		{ code: 'videoCodec / audioCodec' },
		'"copy" | "libx264" and "aac" | "copy" overrides.'
	],
	[
		{ code: 'overwrite / ffmpegPath' },
		'Overwrite the output (default true) and the ffmpeg binary to run.'
	]
];

export const DemoRecordingView = ({
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
					<h1 id="demo-recording" style={h1Style(isMobileOrTablet)}>
						Demo — Recording & Composition
					</h1>
					<p style={paragraphLargeStyle}>
						The output side of <code>@absolutejs/demo</code>:
						capture the screen while the runner drives the product,
						render AI narration per step, then compose both into a
						final video with <strong>ffmpeg</strong> — narration
						offset against the recorded screen by the run's own
						timeline, and the whole run documented in a proof-of-run
						manifest.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pipeline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Pipeline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Recording, voiceover, and composition are three
						independent drivers that meet in the{' '}
						<code>DemoRunReport</code>: the recorder contributes a{' '}
						<code>recording</code> artifact, each narration a{' '}
						<code>voiceover</code> artifact with its duration, and
						the event log timestamps everything so composition knows
						where each line belongs.
					</p>
					<StepFlow
						steps={pipelineSteps}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="recording"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Recording
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A recorder is anything implementing{' '}
						<code>DemoRecorder</code> — <code>start(run)</code>,{' '}
						<code>stop(reason?)</code> returning a recording
						artifact, and an optional <code>mark(label)</code> for
						chapter markers. Three paths cover the practical cases:
					</p>
					<DocsTable
						columns={['Recorder', 'Best for', 'Notes']}
						rows={recorderChoiceRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoRecorders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>createScreenRecorder()</code> is hardened for long
						captures: ffmpeg's progress output is discarded so it
						can never fill a pipe and stall the grab, stop SIGINTs
						and awaits a clean finalize (escalating to SIGKILL on a
						bounded timeout), and the fragmented-mp4 flags keep the
						file playable even if ffmpeg dies without a trailer.
					</p>
					<DocsTable
						columns={['Option', 'Type', 'Description']}
						rows={screenRecorderOptionRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="voiceover"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AI Voiceover
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A voiceover is a single method —{' '}
						<code>speak(input)</code> — that renders one narration
						line to an audio file and returns it as a voiceover
						artifact. Three factories ship in{' '}
						<code>@absolutejs/demo/voiceover</code>:
					</p>
					<DocsTable
						columns={['Factory', 'Tier', 'Notes']}
						rows={voiceoverProviderRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoVoiceoverProviders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						ElevenLabs defaults come from the Dealroom voice upgrade
						— exported as <code>DEFAULT_ELEVENLABS_VOICE_ID</code>,{' '}
						<code>DEFAULT_ELEVENLABS_MODEL_ID</code>, and{' '}
						<code>DEFAULT_ELEVENLABS_OUTPUT_FORMAT</code>:
					</p>
					<DocsTable
						columns={['Setting', 'Default', 'Why']}
						rows={elevenLabsDefaultRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>input.emotion</code> nudges only the two
						expressive dials, so a tuned base voice keeps its
						character:
					</p>
					<DocsTable
						columns={['Emotion', 'Effect']}
						rows={emotionRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Two ElevenLabs keys"
						variant="warning"
					>
						Set <code>ELEVENLABS_API_KEY</code> (a restricted
						synthesis key) for rendering.{' '}
						<code>ELEVENLABS_ADMIN_API_KEY</code> (write-capable) is
						reserved for future pronunciation-dictionary sync and
						should stay out of the synthesis path.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="voiceover-wrappers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pronunciation & Caching
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Both wrappers are provider-agnostic — they compose over
						the ElevenLabs, Aura, and generic-adapter voiceovers
						alike. <code>withPronunciationAliases()</code> rewrites
						demo vocabulary before TTS using{' '}
						<code>DEFAULT_PRONUNCIATION_RULES</code> (onSpark,
						AbsoluteJS, PDL, CRM, …); <code>withRenderCache()</code>{' '}
						synthesizes each unique line once and replays it from
						disk on later runs.
					</p>
					<PrismPlus
						codeString={demoVoiceoverWrappers}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Never re-billed for the same line"
						variant="info"
					>
						Compose the pronunciation wrapper <em>inside-out</em> as
						shown so the cache keys on the spoken-as text. The
						ElevenLabs factory also accepts its own{' '}
						<code>cacheDir</code> — a content-addressed cache keyed
						on the full request signature (voice, model, format,
						settings, language, seed, text) with an exact-signature
						guard against hash collisions.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="composition"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Composition
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>composeDemoWithFFmpeg()</code> (from{' '}
						<code>@absolutejs/demo/composition</code>) creates the
						final video artifact from the run recording and
						voiceover artifacts. Each line is delayed to its offset,
						the mix never clips the recording short, and the video
						is padded so narration never outruns the screen.
					</p>
					<DocsTable
						columns={['Option', 'Description']}
						rows={compositionOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={demoComposition}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="timeline-manifest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Timeline & Manifest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createDemoTimeline()</code> flattens the report's
						event log into offset-from-start entries — it is what
						timeline-mode composition consults, and{' '}
						<code>getDemoArtifactOffsetMs()</code> answers the
						one-artifact question directly.{' '}
						<code>writeDemoManifest()</code> emits the shareable
						proof-of-run document, and{' '}
						<code>createDemoSyncPlan()</code> authors a
						narration/visual schedule ahead of a run.
					</p>
					<PrismPlus
						codeString={demoTimelineManifest}
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
