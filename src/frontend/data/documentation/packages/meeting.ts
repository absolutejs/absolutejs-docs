import { PackageDocData } from '../../../../types/packageDocs';

export const meetingPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'The core only depends on the small MeetingSource contract, so each platform ships as a separate adapter package (mirroring voice-adapters).',
			heading: 'Source Adapters',
			items: [
				{
					description:
						'A bot joins a Discord voice channel via native @discordjs/voice receive and streams per-participant audio — speakers are known, so no diarization is needed.',
					name: '@absolutejs/meeting-discord',
					version: '0.0.1-beta.13'
				},
				{
					description:
						'Recall.ai joins a Google Meet, Zoom, or Teams call as a bot and streams per-participant audio into the meeting core for live transcription and analysis.',
					name: '@absolutejs/meeting-recall',
					version: '0.0.1-beta.5'
				}
			]
		}
	],
	category: 'Voice & Media',
	description:
		'@absolutejs/meeting is the meeting-bot core for AbsoluteJS: join a call through a source adapter, transcribe it live with the @absolutejs/voice scribe, and surface diarized turns plus participants for downstream analysis such as deal coaching, summaries, or action items. The core is platform-agnostic — Recall.ai and Discord support live in separate adapter packages, and an in-memory buffer source ships in the box for testing without a real call.',
	features: [
		{
			description:
				'createMeeting wires a source adapter to a speech-to-text scribe and emits diarized turns as the call happens.',
			title: 'Live diarized transcription'
		},
		{
			description:
				'Subscribe to turn events for streaming analysis, and receive the full diarized transcript on the end event.',
			title: 'Turn and end events'
		},
		{
			description:
				'The core depends only on the MeetingSource contract; Recall.ai and Discord ship as separate adapters, and you can implement your own.',
			title: 'Platform-agnostic sources'
		},
		{
			description:
				'MeetingSession exposes getTranscript and getParticipants so you can inspect state at any point during or after the call.',
			title: 'Transcript and roster access'
		},
		{
			description:
				'createBufferMeetingSource streams an in-memory PCM buffer in real time — the reference MeetingSource implementation and a test harness.',
			title: 'Buffer source for tests'
		}
	],
	installCommand: 'bun add @absolutejs/meeting',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/meeting',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/meeting',
			label: 'GitHub'
		}
	],
	name: 'Meeting',
	notes: [
		{
			body: 'This package is in early beta; the MeetingSource contract and event shapes may still change between releases.',
			title: 'Beta',
			variant: 'warning'
		},
		{
			body: 'Speech-to-text comes from @absolutejs/voice provider adapters (for example @absolutejs/voice-deepgram), so the same scribe configuration you use for voice agents works here.',
			title: 'Pairs with voice',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/meeting',
	samples: [
		{
			code: `import { createMeeting } from '@absolutejs/meeting';
import { recall } from '@absolutejs/meeting-recall';
import { deepgram } from '@absolutejs/voice-deepgram';

const meeting = await createMeeting({
	sessionId: 'deal-123',
	source: recall({
		apiKey: process.env.RECALL_API_KEY ?? '',
		meetingUrl
	}),
	stt: deepgram({
		apiKey: process.env.DEEPGRAM_API_KEY ?? '',
		diarize: true
	})
});

meeting.on('turn', ({ turn }) => {
	// { speaker, text, participant? } — stream to your analyzer / UI
});
meeting.on('end', ({ transcript }) => {
	// full diarized transcript — run your deal-call analysis
});

await meeting.start(); // bot joins the call
// ...later
await meeting.stop();`,
			description:
				'Join a Google Meet, Zoom, or Teams call through the Recall.ai adapter and stream diarized turns from Deepgram.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	createBufferMeetingSource,
	createMeeting
} from '@absolutejs/meeting';
import { deepgram } from '@absolutejs/voice-deepgram';

// Streams an in-memory PCM buffer in real time — no platform needed
const source = createBufferMeetingSource({
	chunkMs: 40,
	format: {
		channels: 1,
		container: 'raw',
		encoding: 'pcm_s16le',
		sampleRateHz: 16000
	},
	pcm: recordedCallBytes
});

const meeting = await createMeeting({
	sessionId: 'fixture-run',
	source,
	stt: deepgram({
		apiKey: process.env.DEEPGRAM_API_KEY ?? '',
		diarize: true
	})
});

await meeting.start();`,
			description:
				'Exercise the full pipeline against a recorded PCM buffer — useful in tests and CI where no live call exists.',
			heading: 'Testing Without a Platform',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Meeting-bot core that joins calls through source adapters and surfaces live diarized turns and participants for analysis.',
	version: '0.0.1-beta.5'
};
