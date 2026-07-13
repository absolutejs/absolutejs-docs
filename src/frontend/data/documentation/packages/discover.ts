import { PackageDocData } from '../../../../types/packageDocs';

export const discoverPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Open-data sources are importable adapters implementing the DatasetSource interface, published from the dataset-adapters monorepo (Apache-2.0). Seeded public data is free; the paid LLM/web path is the fallback.',
			heading: 'Dataset Adapters',
			items: [
				{
					description:
						'Resolve a company to its GitHub org and surface its public members (founders/leads, occasionally a public email) for tech-company contact discovery.',
					name: '@absolutejs/dataset-github',
					version: '0.0.2'
				},
				{
					description:
						'Resolve a company to its official legal entity (LEI, jurisdiction, country) from open CC0 GLEIF registry data.',
					name: '@absolutejs/dataset-gleif',
					version: '0.0.3'
				},
				{
					description:
						'Resolve a US public company (CIK) and its insiders (officers/directors via Form 3/4/5) from public-domain SEC EDGAR filings.',
					name: '@absolutejs/dataset-sec-edgar',
					version: '0.0.2'
				}
			]
		}
	],
	category: 'Commerce & Growth',
	description:
		'Finds the right person to contact at a company — the decision-maker lookup PDL and Apollo charge per person-search for. Orchestration is provider-agnostic: it consults importable open-data DatasetSource adapters first (free), then falls back to an injected web search plus LLM extraction only when it needs more. Results are deduped and ranked by confidence, and a failing source, search, or LLM contributes nothing rather than throwing.',
	features: [
		{
			description:
				'discoverContacts takes a company plus a role intent and returns ranked contacts with title, confidence, LinkedIn URL, source, and a reason.',
			title: 'Decision-maker discovery'
		},
		{
			description:
				'Open-data sources implement one DatasetSource interface (findPeople, findCompany) and normalize to one shape, so seeded public data stays free.',
			title: 'Dataset adapter contract'
		},
		{
			description:
				'You inject search (Brave, SerpAPI, RAG) and extract (any LLM completion) via DiscoverDeps; the package never picks a provider.',
			title: 'Bring your own LLM'
		},
		{
			description:
				'The LLM is instructed to use only people who appear in the search results — never to invent names — and results are deduped and confidence-ranked.',
			title: 'Grounded extraction'
		},
		{
			description:
				'discoverContacts never throws: a failing source, search, or LLM call simply contributes nothing to the result set.',
			title: 'Failure-tolerant orchestration'
		},
		{
			description:
				'A withCache wrapper is exported for memoizing expensive source and search calls.',
			title: 'Built-in caching helper'
		}
	],
	installCommand: 'bun add @absolutejs/discover',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/discover',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/discover',
			label: 'GitHub'
		}
	],
	name: 'Discover',
	notes: [
		{
			body: 'Early 0.0.x release — the DatasetSource and DiscoverDeps contracts are settling. Adapters are pure importers of public data; the self-collected dataset (learned email patterns, cross-member graph, outcomes) is deliberately not an adapter.',
			title: 'Alpha status',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/discover',
	samples: [
		{
			code: `import { discoverContacts } from '@absolutejs/discover';

const contacts = await discoverContacts(
	{
		company: 'Acme',
		domain: 'acme.com',
		roleIntent: 'head of partnerships'
	},
	{ extract: askClaude, search: braveSearch, sources: [secEdgar, gleif] }
);
// → [{ fullName: 'Jane Doe', title: 'Head of Partnerships',
//      confidence: 90, linkedinUrl: '…', source: '…',
//      reason: 'listed as partnerships lead' }]`,
			description:
				'Dataset adapters are consulted first for free; the injected search and extract capabilities only run when the adapters come up short.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `type DatasetSource = {
	name: string;
	findPeople?: (q: DatasetQuery) => Promise<NormalizedPerson[]>;
	findCompany?: (q: {
		name?: string;
		domain?: string;
	}) => Promise<NormalizedCompany | null>;
};`,
			description:
				'Every open-data adapter — GLEIF, SEC EDGAR, GitHub — implements this one interface over a public dataset and normalizes to one shape.',
			heading: 'The DatasetSource contract',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'B2B decision-maker discovery from free open-data adapters with LLM plus web search as the fallback.',
	version: '0.0.7'
};
