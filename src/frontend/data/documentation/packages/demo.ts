import { demoQuickStart } from '../demoSectionDocsCode';
import { PackageDocData } from '../../../../types/packageDocs';

export const demoPackageData: PackageDocData = {
	category: 'Frontend & UX',
	description:
		'@absolutejs/demo is an automated product-demo runtime: it drives your product through browser and desktop workflows, records the screen, draws presenter-style highlights over the UI, and coordinates AI voiceover. It is adapter-first — Playwright covers web apps, while desktop drivers, command recorders, and voiceover providers sit behind stable interfaces so each environment plugs in the right driver. Sign-in is profile-based with credentials resolved from env references, so credential values stay out of the script. A recording can still capture anything displayed by the login UI; use demo accounts and review recordings before sharing.',
	features: [
		{
			description:
				'createDemoRunner executes declarative step scripts — signIn, goto, narrate, spotlight, openApp, wait — and returns a report with timeline and artifacts.',
			title: 'Scripted demo runs'
		},
		{
			description:
				'Named credential profiles cover your own @absolutejs/auth site, any third-party login form, or a saved Playwright storage state. Secrets stay in env vars.',
			title: 'Profile-based sign-in'
		},
		{
			description:
				'createPlaywrightDemoSession provides the browser driver, screenshots, video recording, and on-page annotations for spotlight steps.',
			title: 'Playwright browser driver'
		},
		{
			description:
				'createMacDesktopDriver and createCommandDesktopDriver open, focus, and key into native apps for demos that leave the browser.',
			title: 'Desktop control'
		},
		{
			description:
				'createElevenLabsVoiceover renders high-fidelity narration, with provider-agnostic pronunciation aliasing and a render cache so re-runs skip re-synthesis.',
			title: 'AI voiceover'
		},
		{
			description:
				'composeDemoWithFFmpeg merges the screen recording and voiceover artifacts into a final video, offset against the demo timeline.',
			title: 'FFmpeg composition'
		}
	],
	installCommand:
		'bun add @absolutejs/demo @absolutejs/sync && bun add -d playwright && bunx playwright install chromium',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/demo',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/demo',
			label: 'GitHub'
		}
	],
	name: 'Demo',
	notes: [
		{
			body: 'This package is in very early beta; interfaces for drivers, steps, and reports may change between releases.',
			title: 'Early beta',
			variant: 'warning'
		},
		{
			body: 'Drivers are optional installs — add playwright as a dev dependency only when you run browser demos, and bring ffmpeg for recording or composition.',
			title: 'Optional drivers',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/demo',
	samples: [
		{
			code: demoQuickStart,
			description:
				'Run the local fixture, render real narration, record a browser walkthrough, and write a composed MP4 plus manifest. Install Playwright and its Chromium browser, put ffmpeg on PATH, and set ELEVENLABS_API_KEY before running. Save as demo.ts and run bun demo.ts.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	createElevenLabsVoiceover,
	withPronunciationAliases,
	withRenderCache
} from '@absolutejs/demo/voiceover';

// Premium voiceover with demo-vocabulary pronunciation fixes applied
// before TTS, and identical lines cached so re-runs skip re-synthesis.
const voiceover = withRenderCache(
	withPronunciationAliases(
		createElevenLabsVoiceover({
			apiKey: process.env.ELEVENLABS_API_KEY ?? '',
			outputDir: '.demo-voiceover'
		})
	),
	{ cacheDir: '.demo-voiceover/cache', salt: 'rachel:flash_v2_5' }
);`,
			description:
				'Render narration with ElevenLabs, wrapped in the provider-agnostic pronunciation-alias and render-cache helpers.',
			heading: 'AI Voiceover',
			language: 'typescript'
		},
		{
			code: `import { composeDemoWithFFmpeg } from '@absolutejs/demo/composition';

// Merge the run recording and voiceover artifacts into a final video,
// offsetting narration against the recorded screen via the demo timeline.
const finalVideo = await composeDemoWithFFmpeg(report, {
	outputPath: '.demo-artifacts/crm-demo.mp4',
	voiceoverTiming: 'timeline'
});`,
			description:
				'Produce the final demo video from a run report by composing recording and voiceover artifacts with FFmpeg.',
			heading: 'Composition',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Automated product-demo runtime that drives browser and desktop workflows, records the screen, highlights the UI, and narrates with AI voiceover.',
	version: '0.0.1-beta.1'
};
