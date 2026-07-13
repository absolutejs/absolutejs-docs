import { PackageDocData } from '../../../../types/packageDocs';

export const mediaPackageData: PackageDocData = {
	category: 'Voice & Media',
	description:
		'@absolutejs/media provides the low-level realtime media layer that voice products build on: generic media frames, transports, processor graphs, calibration, resampling, speech activity, and interruption reports. It also ships noise suppression (energy gate, FFmpeg, Krisp-style frame processors) and compact artifact helpers that summarize media health into small JSON + Markdown reports. Product-specific voice routes and provider orchestration stay in @absolutejs/voice, which consumes this package.',
	features: [
		{
			description:
				'A shared MediaFrame shape for input audio, assistant audio, transcripts, interruptions, and metadata, with createMediaTransport for lifecycle- and event-tracked delivery.',
			title: 'Frames and transports'
		},
		{
			description:
				'createMediaProcessorGraph wires nodes with branch routing, fan-in joins, backpressure strategies, and per-node timing reports.',
			title: 'Processor graphs'
		},
		{
			description:
				'Energy-gate, pass-through, FFmpeg, and frame-processor (Krisp-style) suppressors behind one NoiseSuppressor contract, composable in sequence.',
			title: 'Noise suppression'
		},
		{
			description:
				'Parse and serialize telephony envelopes from Twilio, Telnyx, and Plivo streams into media frames and lifecycle reports.',
			title: 'Telephony stream helpers'
		},
		{
			description:
				'Quality, transport, VAD, interruption, WebRTC stats, and pipeline calibration reports with pass / warn / fail statuses you can gate on.',
			title: 'Health reports'
		},
		{
			description:
				'Summarize, render to Markdown, redact, and persist reports as compact side-by-side .json + .md artifacts with stable issueCodes.',
			title: 'Compact artifacts'
		}
	],
	installCommand: 'bun add @absolutejs/media',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/media',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/media',
			label: 'GitHub'
		}
	],
	name: 'Media',
	notes: [
		{
			body: 'This package is in beta; the frame, transport, and report shapes may still shift between releases.',
			title: 'Beta',
			variant: 'warning'
		},
		{
			body: 'Media is the substrate layer. If you want voice agents, readiness gates, or provider orchestration, reach for @absolutejs/voice — it consumes these primitives for you.',
			title: 'Where it sits',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/media',
	samples: [
		{
			code: `import {
	buildMediaResamplingPlan,
	createEnergyGateNoiseSuppressor
} from '@absolutejs/media';

// Plan a resample between transport and provider formats
const plan = buildMediaResamplingPlan({
	inputFormat: {
		channels: 1,
		container: 'raw',
		encoding: 'mulaw',
		sampleRateHz: 8000
	},
	outputFormat: {
		channels: 1,
		container: 'raw',
		encoding: 'pcm_s16le',
		sampleRateHz: 16000
	}
});
console.log(plan.required, plan.ratio, plan.status);

// Gate out background noise before it reaches your STT provider
const suppressor = createEnergyGateNoiseSuppressor({ thresholdRms: 0.02 });

const { bytes } = await suppressor.process({
	format: {
		channels: 1,
		container: 'raw',
		encoding: 'pcm_s16le',
		sampleRateHz: 16000
	},
	pcm: pcmChunk // ArrayBuffer | ArrayBufferView from your transport
});`,
			description:
				'Plan format conversion between transports and clean up inbound audio with the energy-gate noise suppressor.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	buildMediaQualityArtifact,
	buildMediaQualityReport,
	writeMediaArtifact
} from '@absolutejs/media';

const report = buildMediaQualityReport({ frames });

// { json, jsonValue, markdown, summary } in a single call
const artifact = buildMediaQualityArtifact(report);

if (artifact.summary.issueCodes.length > 0) {
	console.warn('media issues:', artifact.summary.issueCodes);
}

// Persists media-quality.json + media-quality.md side by side
await writeMediaArtifact({
	dir: '.media-artifacts',
	json: artifact.json,
	markdown: artifact.markdown,
	slug: 'media-quality',
	summary: artifact.summary
});`,
			description:
				'Turn a media quality report into a compact, array-free summary plus readable Markdown, and persist both as artifacts.',
			heading: 'Health Report Artifacts',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Low-level realtime media primitives — frames, transports, processor graphs, noise suppression, and health reports — for builders of voice pipelines.',
	version: '0.0.1-beta.21'
};
