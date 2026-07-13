import { PackageDocData } from '../../../../types/packageDocs';

export const outcomesPackageData: PackageDocData = {
	category: 'AI',
	description:
		'An outcome feedback loop that makes an AI agent measurably better per user without training anything. Agents produce artifacts (outreach emails, generated pages, drafts) and things happen to them (opens, replies, conversions); recording both sides with typed features frozen at production time lets the agent’s context improve every week, with receipts you can show users. You define artifact kinds and outcome events once, and the package derives the ledger contract, attribution-joined stats, and an evidence block your own AI call distills into a per-user memo.',
	features: [
		{
			description:
				'defineOutcomeVocabulary declares artifact kinds with typed, bucketable features (number buckets, closed string sets, booleans) and an ordered list of outcome events.',
			title: 'Typed outcome vocabulary'
		},
		{
			description:
				'The OutcomeStore contract records artifacts and outcomes; attribution is simply the join on your artifact id, with createMemoryOutcomeStore included for tests.',
			title: 'Ledger contract'
		},
		{
			description:
				'computeOutcomeStats reports each outcome’s rate overall, per feature bucket, and per experiment variant when present, so A/B experiments bolt on without extra machinery.',
			title: 'Attribution-joined stats'
		},
		{
			description:
				'Below your minSample threshold stats report not-ready, so hosts stay quiet instead of showing confident noise; the cold-start contract is explicit.',
			title: 'Cold-start safety'
		},
		{
			description:
				'renderEvidence produces a compact text block your own AI call distills into a "what works for you" memo that conditions future generations; the package never calls a model itself.',
			title: 'Model-agnostic evidence'
		}
	],
	installCommand: 'bun add @absolutejs/outcomes',
	links: [
		{
			href: 'https://github.com/absolutejs/outcomes',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/outcomes',
			label: 'npm'
		}
	],
	name: 'Outcomes',
	notes: [
		{
			body: 'The same machinery serves an outreach copilot (features: subject length, tone; outcomes: replies) and an AI website builder (features: hero copy length, layout; outcomes: conversions from your analytics beacon).',
			title: 'One loop, many products',
			variant: 'info'
		},
		{
			body: 'The package is pre-1.0; the vocabulary and store contracts may still shift, so pin an exact version.',
			title: 'Beta API',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/outcomes',
	samples: [
		{
			code: `import {
	computeOutcomeStats,
	defineOutcomeVocabulary,
	renderEvidence
} from '@absolutejs/outcomes';

const vocabulary = defineOutcomeVocabulary({
	artifacts: {
		outreach_email: {
			label: 'Outreach email',
			features: {
				subjectWords: {
					type: 'number',
					buckets: [
						{ label: 'short', max: 7 },
						{ label: 'medium', max: 12 }
					],
					overflowLabel: 'long'
				},
				mode: { type: 'string', values: ['outreach', 'followup'] },
				hasQuestion: { type: 'boolean' }
			}
		}
	},
	outcomes: ['opened', 'replied', 'meeting_scheduled']
});

// At production time:
//   store.recordArtifact({ id: sendId, ownerId, kind, features })
// From your signal hooks:
//   store.recordOutcome({ artifactId: sendId, outcome: 'replied' })

const rows = await store.listArtifactsWithOutcomes(
	ownerId,
	'outreach_email',
	since
);
const stats = computeOutcomeStats(vocabulary, 'outreach_email', rows, {
	minSample: 10
});
if (stats.ready) {
	const memo = await yourAiCall(
		\`Distill what works:\\n\${renderEvidence(stats)}\`
	);
	// ...feed memo into every future draft; show stats in your UI.
}`,
			description:
				'Define the vocabulary, record artifacts and outcomes, then turn attribution-joined stats into evidence your own AI call distills.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Outcome feedback loop for AI agents: typed artifact features, attribution-joined stats, and rendered evidence that makes agent context better per user.',
	version: '0.1.0'
};
