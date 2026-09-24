import type { PackageDocData } from '../../../../types/packageDocs';

export const searchPackageData: PackageDocData = {
	category: 'AI',
	description:
		'Provider-neutral web evidence with a Brave Web Search and LLM Context adapter. Search returns normalized sources, excerpts, availability and attempt accounting. Compose it with the RAG research runtime for primary-page reads, structured extraction, field review and monitoring.',
	features: [
		{
			description:
				'createBraveSearch supports web and context modes, source excerpts, context limits and freshness/country/language constraints. The adapter makes no hidden model calls or fallback-provider requests.',
			title: 'Brave Web Search and LLM Context'
		},
		{
			description:
				'Successful empty, partial evidence, provider failure, quota failure and cancellation remain distinct. Sources retain their URLs and publication/retrieval information. Retrieval time does not establish an event date.',
			title: 'Availability and provenance'
		},
		{
			description:
				'Providers declare supported modes, filters and content views. assertSearchCapabilities and withSearchCapabilities reject unsupported constraints before provider work. The Brave adapter does not advertise domain/date/category filters.',
			title: 'Explicit capabilities'
		},
		{
			description:
				'withSearchCache requires an explicit scope, separates provider/options/version, retains empty results briefly and never caches failures. A host store can persist entries. Caller-owned cancellation prevents coalescing those requests.',
			title: 'Scoped caching'
		},
		{
			description:
				'observe receives each network attempt with billing disposition. The host owns prices, credentials, retry and admission; unknown cost stays null. The manifest exposes a guarded search_web tool and a Brave configuration recipe for the existing AI/MCP bridges.',
			title: 'Accounting and agent tools'
		}
	],
	installCommand: 'bun add @absolutejs/search@0.2.0',
	links: [
		{
			href: '/documentation/rag-research',
			label: 'Web research workflows'
		},
		{
			href: '/documentation/rag-web-index',
			label: 'Owned web indexes'
		},
		{
			href: 'https://github.com/absolutejs/search',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/search',
			label: 'npm'
		}
	],
	name: 'Search',
	npmName: '@absolutejs/search',
	samples: [
		{
			code: `import { createBraveSearch } from '@absolutejs/search/brave';

const apiKey = process.env.BRAVE_SEARCH_API_KEY;
if (!apiKey) throw new Error('Set BRAVE_SEARCH_API_KEY');
const search = createBraveSearch({ apiKey });
const result = await search.search({
  query: 'company partnership program',
  mode: 'context',
  maxTokens: 4096
});
console.log(result.status, result.sources, result.limitations);`,
			description:
				'Set BRAVE_SEARCH_API_KEY on the server. Handle status and limitations alongside sources; an unavailable response is not evidence that a company or fact does not exist.',
			heading: 'Query Brave context',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { createResearch } from '@absolutejs/rag/research';
const research = createResearch({ search, provider, model });
const result = await research.run({ query: 'Company partnership eligibility' });`,
			description:
				'Install @absolutejs/rag and @absolutejs/ai. provider and model are your configured model adapter and extraction model. Any compatible SearchProvider, including index.provider, can occupy this slot.',
			heading: 'Compose with research',
			intent: 'partial',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline: 'Use web search as a replaceable evidence provider.',
	version: '0.2.0'
};
