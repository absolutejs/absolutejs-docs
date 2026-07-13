import { PackageDocData } from '../../../../types/packageDocs';

export const replayPackageData: PackageDocData = {
	category: 'Observability',
	description:
		'Self-hosted session replay: a recorder that chunks DOM recordings and uploads each chunk through a pluggable transport (wire in @absolutejs/blob), plus chunk assembly and a framework-agnostic player. The recorder itself is about 1 KB of glue — rrweb is an optional, lazy-loaded peer imported only when recording starts — and it exposes a replayId that @absolutejs/beacon stamps onto every error, cross-linking an issue to the exact DOM replay around it.',
	features: [
		{
			description:
				'rrweb is an optional peer, lazy-imported only when recording starts (and fully injectable), so replay weight never lands on a page that is not recording.',
			title: 'Zero hard dependencies'
		},
		{
			description:
				'Recordings are split by chunkIntervalMs / chunkMaxEvents and each chunk is handed to your upload function — point it at @absolutejs/blob or any storage.',
			title: 'Chunked pluggable upload'
		},
		{
			description:
				'maskAllInputs is on by default; rr-block skips a node entirely, rr-mask masks its text, and maskAllText covers high-sensitivity apps.',
			title: 'Privacy masking by default'
		},
		{
			description:
				'The recorder exposes replayId for @absolutejs/beacon getReplayId, so every captured error carries the session that produced it.',
			title: 'Error cross-linking'
		},
		{
			description:
				'assembleReplay orders and flattens stored chunks, and createReplayPlayer plays them back into any DOM target without a framework.',
			title: 'Framework-agnostic playback'
		},
		{
			description:
				'Imported without a DOM, createRecorder returns a no-op handle that still has a valid replayId and manifest.',
			title: 'SSR safe'
		}
	],
	installCommand: 'bun add @absolutejs/replay rrweb',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/replay',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/replay',
			label: 'GitHub'
		}
	],
	name: 'Replay',
	notes: [
		{
			body: 'Recording user sessions is a real liability surface — keep the default input masking on and add rr-block / rr-mask classes to sensitive UI.',
			title: 'Privacy first',
			variant: 'warning'
		},
		{
			body: 'Chunks are plain JSON handed to your own transport and storage, so replays live in your infrastructure — a self-hosted alternative to LogRocket or FullStory.',
			title: 'Your storage, your data',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/replay',
	samples: [
		{
			code: `import { initBeacon } from '@absolutejs/beacon';
import { createRecorder } from '@absolutejs/replay';

const recorder = createRecorder({
	project: 'web',
	release: import.meta.env.VITE_RELEASE,
	upload: (chunk) =>
		uploadToBlob(
			\`replays/\${chunk.replayId}/\${chunk.seq}.json\`,
			JSON.stringify(chunk)
		)
	// privacy defaults: maskAllInputs: true,
	// blockClass: 'rr-block', maskTextClass: 'rr-mask'
});

// Cross-link errors → this session:
initBeacon({ getReplayId: () => recorder.replayId, project: 'web' });

// On error, flush the tail so the replay around it is stored:
window.addEventListener('error', () => void recorder.flush());`,
			description:
				'Start recording, upload chunks to your storage and stamp every beacon error with the session id.',
			heading: 'Record a Session',
			language: 'typescript'
		},
		{
			code: `import { assembleReplay, createReplayPlayer } from '@absolutejs/replay';

const chunks = await loadChunksFromBlob(replayId); // your storage read
const target = document.getElementById('replay');

if (target !== null) {
	const player = await createReplayPlayer({
		events: assembleReplay(chunks), // ordered + flattened
		target
	});
	player.pause();
	player.play(0);
}`,
			description:
				'Re-assemble stored chunks and play them back into any DOM element.',
			heading: 'Play Back',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Chunked DOM session recording over your own storage, with a player and a replayId seam that links errors to the exact session.',
	version: '0.2.1'
};
