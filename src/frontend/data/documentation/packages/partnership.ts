import { PackageDocData } from '../../../../types/packageDocs';

export const partnershipPackageData: PackageDocData = {
	category: 'Commerce & Growth',
	description:
		'In-house partnership and relationship intelligence — AI reasoning over the partnership lifecycle, so you do not pay a deal-copilot SaaS per seat for the parts you can run yourself. Each primitive is a pure function of typed input plus an injected AI call: the package owns the prompt, the JSON Schema, the tool contract, and the result mapping, while your app supplies the generation call along with provider, metering, timeouts, and fallbacks. Bridging to @absolutejs/ai (or a metering wrapper around it) is one line.',
	features: [
		{
			description:
				'scoreTrustFit returns four 0-1 dimensions (audience overlap, capability, mutual value, credibility) with three per-score reasons.',
			title: 'Trust & Fit scoring'
		},
		{
			description:
				'classifyRelationship resolves the relationship type, official name and domain, receptiveness, and a competitor out-serve play.',
			title: 'Relationship classification'
		},
		{
			description:
				'frameConnection produces why-connect, shared-ground, mutual-value, and conversation-starter framing for a specific person.',
			title: 'Connection framing'
		},
		{
			description:
				'verifyPartner builds a structured Verification Dossier covering credibility, track record, audience overlap, economics, and open questions.',
			title: 'Partner verification'
		},
		{
			description:
				'verifyPartner optionally takes an injected research call (for example @absolutejs/discover web research); omit it and synthesis falls back to knowledge-only.',
			title: 'Web-grounded research'
		},
		{
			description:
				'Each primitive passes its own feature tag through ("trustFit", "classifyMatch", "personConnection", "verification"), so your usage ledger keeps its per-feature breakdown.',
			title: 'Metering-friendly tags'
		}
	],
	installCommand: 'bun add @absolutejs/partnership',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/partnership',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/partnership',
			label: 'GitHub'
		}
	],
	name: 'Partnership',
	notes: [
		{
			body: 'Early 0.0.x release covering the Wave 1A primitives. Primitives throw on a model or validation failure — heuristic fallbacks are app-specific, so catch and degrade in your own wrapper.',
			title: 'Alpha status',
			variant: 'warning'
		},
		{
			body: 'The package never imports an AI provider and never touches your ledger. Your app injects generateObject, keeping billing, timeouts, and fallback policy in your own code.',
			title: 'Provider-injected by design',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/partnership',
	samples: [
		{
			code: `import { scoreTrustFit } from '@absolutejs/partnership';

const { dimensions, reasons } = await scoreTrustFit(
	{
		member: {
			audienceSize: '10k',
			niche: 'devtools',
			offer: 'hosted CI'
		},
		partner: { company: companyData, person: personData, reasoning },
		priorScores: { theirReceptiveness: 0.4, yourFit: 0.9 }
	},
	partnershipCtx(userSub)
);
// dimensions: four 0-1 scores (audience overlap, capability,
// mutual value, credibility) with three reasons per score.`,
			description:
				'partnershipCtx bridges the package to whatever you already use for structured generation — with @absolutejs/ai it is one line of wiring.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { verifyPartner } from '@absolutejs/partnership';

const dossier = await verifyPartner(input, {
	...partnershipCtx(userSub),
	research: (system, user) => webResearch(system, user)
});
// Omit research and synthesis falls back to knowledge-only.`,
			description:
				'verifyPartner optionally grounds its Verification Dossier in an injected web-research call, such as @absolutejs/discover.',
			heading: 'Web-grounded verification',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Trust & Fit scoring, relationship classification, connection framing, and partner verification on your own AI provider.',
	version: '0.0.7'
};
