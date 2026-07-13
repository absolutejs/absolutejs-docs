import { PackageDocData } from '../../../../types/packageDocs';

export const audiencePackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Source adapters implement the AudienceSource contract against third-party audience-intelligence APIs (Apache-2.0), putting measured data behind the same interface as the derived, own-it primitives.',
			heading: 'Source Adapters',
			items: [
				{
					description:
						'Audiense Insights adapter — reports, demographics, influencer/brand affinities, and measured audience overlap from Audiense’s proprietary social graph. Every AudienceSource method is optional, so consumers feature-detect and fall back to affinityOverlap when a method is absent.',
					name: '@absolutejs/audience-audiense',
					version: '0.0.1'
				}
			]
		}
	],
	category: 'Commerce & Growth',
	description:
		'In-house audience and affinity intelligence — the ownable parts of what an audience-intelligence SaaS sells, run on your own provider and embedding model. Every primitive is a pure function of typed input plus an injected AI call, and affinity work also takes an injected embed call, so the package never picks a provider or an embedding model. Pairs naturally with @absolutejs/partnership, which follows the same injection pattern.',
	features: [
		{
			description:
				'inferPsychographics derives the communication style, values, and motivations of a person or brand from public signals — the "how to approach them" layer.',
			title: 'Psychographic inference'
		},
		{
			description:
				'profileAffinity extracts a structured interest/brand affinity profile and embeds it into a vector via your injected embed call.',
			title: 'Affinity profiles'
		},
		{
			description:
				'affinityOverlap returns a measured audience-overlap score (cosine of two embedded affinity profiles) plus shared topics and brands — pure, no model call.',
			title: 'Measured audience overlap'
		},
		{
			description:
				'Your app supplies generateObject and embed through AudienceContext, keeping provider choice, metering, and caching in your own code.',
			title: 'Provider and embedding injected'
		},
		{
			description:
				'cosineSimilarity is exported directly for a cheap inline path: embed two short descriptor strings yourself and compare.',
			title: 'Vector math exported'
		}
	],
	installCommand: 'bun add @absolutejs/audience',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/audience',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/audience',
			label: 'GitHub'
		}
	],
	name: 'Audience',
	notes: [
		{
			body: 'Very early 0.0.x release — the AudienceContext and affinity type surfaces may still change between versions.',
			title: 'Alpha status',
			variant: 'warning'
		},
		{
			body: 'Use affinityOverlap wherever you would otherwise have an LLM guess an overlap — for example the audience-overlap dimension of a @absolutejs/partnership Trust & Fit score.',
			title: 'Measured, not guessed',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/audience',
	samples: [
		{
			code: `import type { AudienceContext } from '@absolutejs/audience';
import { affinityOverlap, profileAffinity } from '@absolutejs/audience';

const ctx: AudienceContext = {
	embed: (texts) => embedTexts(texts, 'passage'),
	generateObject: (req) => generateObjectAI({ ...req, provider })
};

const me = await profileAffinity(
	{ name: 'Me', signals: { niche, offer } },
	ctx
);
const them = await profileAffinity(
	{ name: company, signals: { industry, summary } },
	ctx
);

const { rationale, score, sharedTopics } = affinityOverlap(me, them);
// score ∈ [0,1] — a measured overlap, not an LLM guess.`,
			description:
				'Build an AudienceContext from whatever you already use for structured generation and embeddings, extract two affinity profiles, then compare them without another model call.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Psychographic inference, affinity profiles, and measured audience-overlap scores on your own AI provider.',
	version: '0.0.2'
};
