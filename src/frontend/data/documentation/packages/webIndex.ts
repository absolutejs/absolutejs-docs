import type { PackageDocData } from '../../../../types/packageDocs';

export const webIndexGuideData: PackageDocData = {
	category: 'AI',
	description:
		'Own the evidence lifecycle for selected public sites: durable crawling, source versions, freshness, native PostgreSQL retrieval and reviewed company, person and event projections. The index exposes the same SearchProvider contract as external web search, so research, batches and monitoring use the same downstream workflow.',
	explanations: [
		{
			columns: ['Entry point', 'Usage'],
			description:
				'Every binding calls the same authorized server plugin. Clients start idle and expose state and cancellation. Cancellation cannot undo committed work.',
			id: 'index-frameworks',
			kind: 'matrix',
			rows: [
				{
					label: 'React',
					values: [
						'@absolutejs/rag/react',
						'useWebIndex(); index.call("stats", {})'
					]
				},
				{
					label: 'Vue',
					values: [
						'@absolutejs/rag/vue',
						'useWebIndex() with reactive state'
					]
				},
				{
					label: 'Svelte',
					values: [
						'@absolutejs/rag/svelte',
						'createWebIndexStore() with readable state; dispose on teardown'
					]
				},
				{
					label: 'Angular',
					values: [
						'@absolutejs/rag/angular',
						'WebIndexService.connect("/web-index", destroyRef)'
					]
				},
				{
					label: 'HTML',
					values: [
						'@absolutejs/rag/web-index/client',
						'bindWebIndexSearchForm(form, output); dispose the binding'
					]
				},
				{
					label: 'HTMX',
					values: [
						'GET /web-index/html',
						'Load and refresh escaped index statistics'
					]
				}
			],
			title: 'Six presentation frameworks'
		}
	],
	features: [
		{
			description:
				'Configure eligible origins, URL/page/byte/chunk/depth limits, recrawl cadence and provider admission. Robots rules, public-address checks, redirect validation, origin leases and crawl delays apply. A run can finish with pending work; the worker resumes when the origin becomes eligible.',
			title: 'Bounded public-site crawling'
		},
		{
			description:
				'Conditional ETag/Last-Modified requests avoid re-embedding an unchanged page. Heading and section context accompany passages. Publication dates come from explicit article metadata. Search checks active committed source versions and reports corpus statistics.',
			title: 'Versions and freshness'
		},
		{
			description:
				'@absolutejs/rag-postgres uses pgvector for vector retrieval and GIN full-text indexes for native lexical retrieval. Supported tenant/domain/publication predicates apply before top-K; only selected results cross into the application. Hybrid retrieval and reranking use collection configuration.',
			title: 'Native PostgreSQL retrieval'
		},
		{
			description:
				'webIndexPlugin requires authorization for every route and separates read, crawl and admin operations. For private corpora, resolve identity to a server-selected tenant/index runtime. Client requests cannot configure origins, credentials, providers or budgets.',
			title: 'Authorized tenant workflows'
		},
		{
			description:
				'createWebIndexProjector extracts and separately reviews one immutable source version. It publishes supported identity/facts with original passage references. Stale versions cannot commit; explicit validity intervals can expire fields.',
			title: 'Company, person and event projections'
		},
		{
			description:
				'Pass index.provider to createResearch. Embedding, reranking and generation models remain provider choices. An index generation fixes model identity, dimensions, origins and representation; rebuild and evaluate a new generation before activation.',
			title: 'Replace providers without replacing the workflow'
		}
	],
	installCommand:
		'bun add @absolutejs/rag@0.22.1 @absolutejs/rag-postgres@0.1.0 elysia@2.0.0-beta.6',
	links: [
		{
			href: '/documentation/rag-research',
			label: 'Web research workflows'
		},
		{
			href: '/documentation/rag-postgres',
			label: 'PostgreSQL adapter'
		},
		{
			href: 'https://github.com/absolutejs/rag/blob/v0.22.1/WEB_INDEX.md',
			label: 'Owned-index source guide'
		},
		{
			href: 'https://github.com/absolutejs/rag/blob/v0.22.1/benchmarks/web-index/lifecycle.ts',
			label: 'Reproduce lifecycle measurements'
		}
	],
	name: 'Owned Web Indexes',
	notes: [
		{
			body: '404/410/noindex remove active evidence; transient network/429/5xx failures preserve it and retry. Configure every retained generation when permanently purging chunks. Schedule obsolete-generation retention and orphan cleanup in the host storage lifecycle. Active-version checks exclude unreferenced chunks left by interrupted ingestion. The provider does not cache search responses; any host cache needs explicit invalidation.',
			title: 'Deletion, failures and retention',
			variant: 'info'
		},
		{
			body: 'Native full-text mode creates a GIN index on first use, including for existing tables. Initialize populated stores during a planned migration window. Native and portable scorers have different ranking semantics. Meter ingestion, query embeddings, reranking and hosting through configured providers; unknown provider and infrastructure costs are reported as null.',
			title: 'Native indexing and cost',
			variant: 'note'
		},
		{
			body: 'A controlled 100-page PostgreSQL 15 lifecycle run measured 11.31 ms warm-query median / 13.36 ms p95, 88.50 ms update visibility and 37.94 ms takedown confirmation. It used simulated page responses and deterministic vectors. These figures exclude public-network and hosted-model effects. Reproduce with benchmarks/web-index/lifecycle.ts in a disposable database; they do not establish web-wide coverage or equivalence to an external search index.',
			title: 'Measured scope',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/rag',
	samples: [
		{
			code: `import { Elysia } from "elysia";
import { createRAGCollection, openaiEmbeddings } from "@absolutejs/rag";
import { createPostgresRAGStore } from "@absolutejs/rag-postgres";
import {
  createWebIndex, createPostgresWebIndexStore, webIndexPostgresSchemaSql,
  webIndexPlugin, startWebIndexWorker,
} from "@absolutejs/rag/web-index";

const db = new Bun.SQL(process.env.DATABASE_URL!);
// Run this schema initialization in your deployment's migration phase.
await db.unsafe(webIndexPostgresSchemaSql());
const collection = createRAGCollection({
  store: createPostgresRAGStore({ sql: db, tableName: "public_web_chunks", dimensions: 1536 }),
  embedding: openaiEmbeddings({
    apiKey: process.env.OPENAI_API_KEY!,
    defaultModel: "text-embedding-3-small", dimensions: 1536
  }),
});
const index = createWebIndex({
  tenant: "public", index: "partner-sites",
  store: createPostgresWebIndexStore(db),
  origins: ["https://example.com"],
  generations: [{
    id: "v1", collection,
    embedding: { provider: "openai", model: "text-embedding-3-small", dimensions: 1536 },
    retrieval: "hybrid",
  }],
  limits: { maxUrls: 1000, maxPagesPerRun: 20, maxBytesPerRun: 20_000_000, maxChunksPerPage: 100, maxDepth: 3 },
  recrawlMs: 6 * 60 * 60 * 1000,
  originDelayMs: 1000,
  admit: async work => reserveEmbeddingWork(work),
});
const app = new Elysia().use(webIndexPlugin({
  runtime: index,
  authorize: async (request, operation) => authorizeIndexOperation(request, operation),
}));
await index.enqueue(["https://example.com/"]);
const worker = startWebIndexWorker({ runtime: index, onError: error => console.error(error) });
// On shutdown, await worker.stop() before closing the database.
const result = await index.search({ query: "partnership eligibility", count: 5 });
`,
			description:
				'Requires PostgreSQL with pgvector, DATABASE_URL and OPENAI_API_KEY. Run schema initialization during migration. reserveEmbeddingWork and authorizeIndexOperation are host admission and authorization functions. Replace example.com with the approved corpus origins. Mount app in the server and await worker.stop() during shutdown before closing the database.',
			heading: 'Configure and run an index',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { createResearch, researchPlugin } from "@absolutejs/rag/research";
import { createWebIndexProjector } from "@absolutejs/rag/web-index";
const research = createResearch({
  provider: configuredAIProvider, model: extractionModel,
  reviewer: { provider: configuredAIProvider, model: reviewModel },
  search: index.provider,
});
app.use(researchPlugin({ runtime: research, authorize: authorizeResearch }));
const result = await research.run({ query: "Which partners meet these requirements?" });
const extract = createWebIndexProjector({
  kind: "company", instructions: "Identify the company and its partner eligibility requirements.",
  provider: configuredAIProvider, model: extractionModel,
  reviewer: { provider: configuredAIProvider, model: reviewModel },
  onResult: result => recordResearchAccounting(result),
});
await index.project({ url: "https://example.com/", extract });
const companies = await index.projections("company");
`,
			description:
				'Continues from the configured index. Install @absolutejs/ai for a model adapter. configuredAIProvider, extractionModel, reviewModel, authorizeResearch and recordResearchAccounting are host configuration. project is a trusted server function; its extractor and policy are not selected by a browser.',
			heading: 'Research and project indexed evidence',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { createWebIndexClient } from '@absolutejs/rag/web-index/client';

const index = createWebIndexClient({ path: '/web-index' });
const stats = await index.call('stats', {});
const hits = await index.call('search', {
  query: 'partnership eligibility', count: 5
});
// index.cancel(); index.dispose() when the view is removed.`,
			description:
				'The framework-free client uses the authenticated plugin and existing same-origin session. Read/crawl/admin permission checks remain server-side.',
			heading: 'Typed index client',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `const versions = await index.history('https://example.com/');
await index.remove('https://example.com/');
await index.restore('https://example.com/');
await index.enqueue(['https://example.com/']);`,
			description:
				'Trusted server functions. A manual remove creates a scope-wide takedown, purges history/projections and removes chunks from configured generations. restore permits future crawling explicitly.',
			heading: 'Maintain source evidence',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `let after: string | undefined;
do {
  const page = await index.rebuild('v1', 'v2', 100, after);
  after = page.next;
} while (after);
// Run the v2 frontier and evaluate before this separate release step:
const activated = await index.activate('v2', 'v1', {
  passed: true,
  evidence: approvedEvaluationReportReference
});`,
			description:
				'Configure v1 and v2 in generations first, with separate model identity and collection configuration. Enqueue the old corpus in pages, let workers crawl v2, and evaluate it. Activation requires readiness and an actual passing host report, and compares the expected active generation.',
			heading: 'Rebuild and activate a generation',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `<section hx-get="/web-index/html" hx-trigger="load, every 30s" hx-swap="innerHTML"></section>`,
			description:
				'Serve HTMX through the application. The authorized endpoint returns escaped index statistics.',
			heading: 'HTMX index status',
			intent: 'partial',
			language: 'html'
		}
	],
	status: 'beta',
	tagline:
		'Crawl selected sites, retain versioned evidence and search it through the AbsoluteJS research stack.',
	version: '0.22.1'
};
