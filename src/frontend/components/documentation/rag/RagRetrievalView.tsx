import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	ragRetrievalAdapters,
	ragRetrievalHybrid,
	ragRetrievalQuickStart,
	ragRetrievalRerank,
	ragRetrievalStoreContract
} from '../../../data/documentation/ragSectionDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PackageCard, PackageCardGrid } from '../../utils/PackageCardGrid';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#rag-retrieval', label: 'Overview' },
	{ href: '#collections', label: 'Collections' },
	{ href: '#hybrid-search', label: 'Hybrid Search' },
	{ href: '#reranking', label: 'Reranking & Transforms' },
	{ href: '#vector-store', label: 'The RAGVectorStore Contract' },
	{ href: '#stores-adapters', label: 'Stores & Adapters' }
];

const collectionOptionRows: DocsTableCell[][] = [
	[
		{ code: 'store' },
		{ code: 'RAGVectorStore', suffix: 'required' },
		'The backend. In-memory ships in core; SQLite, Postgres, and Pinecone are separate packages.'
	],
	[
		{ code: 'embedding' },
		{ code: 'RAGEmbeddingProviderLike' },
		'A provider object or bare embed function. Falls back to the store embed() when omitted.'
	],
	[
		{ code: 'defaultTopK' },
		{ code: '6', suffix: 'default' },
		'Result count when a search omits topK.'
	],
	[
		{ code: 'defaultCandidateMultiplier' },
		{ code: '4', suffix: 'default' },
		'Candidate over-fetch factor (topK x multiplier) when reranking, transforms, or hybrid modes are active.'
	],
	[
		{ code: 'defaultModel' },
		{ code: 'string' },
		'Embedding model used when neither the call nor the provider names one.'
	],
	[
		{ code: 'queryTransform' },
		{ code: 'RAGQueryTransformProviderLike' },
		'Rewrites the query and adds variant queries before retrieval.'
	],
	[
		{ code: 'retrievalStrategy' },
		{ code: 'RAGRetrievalStrategyProviderLike' },
		'Routes each query to vector, lexical, or hybrid retrieval per decision.'
	],
	[
		{ code: 'rerank' },
		{ code: 'RAGRerankerProviderLike' },
		'Re-orders the fused candidate set before the final topK slice.'
	]
];

const hybridOptionRows: DocsTableCell[][] = [
	[
		{ code: 'mode' },
		{ code: "'vector'", suffix: 'default' },
		"'vector' | 'lexical' | 'hybrid' — a bare mode string is accepted anywhere RAGHybridSearchOptions is."
	],
	[
		{ code: 'fusion' },
		{ code: "'rrf'", suffix: 'default' },
		"Reciprocal rank fusion, or 'max' for weighted max-score."
	],
	[
		{ code: 'fusionConstant' },
		{ code: '60', suffix: 'default' },
		'The k in weight / (k + rank); higher flattens rank differences.'
	],
	[
		{ code: 'lexicalWeight / vectorWeight' },
		{ code: '2 / 1', suffix: 'defaults' },
		'Per-signal weights applied during fusion.'
	],
	[
		{ code: 'lexicalTopK' },
		{ code: 'unset' },
		'Caps the lexical candidate list independently of topK.'
	],
	[
		{ code: 'diversityStrategy' },
		{ code: "'none'", suffix: 'default' },
		"'mmr' enables maximal-marginal-relevance de-duplication."
	],
	[
		{ code: 'mmrLambda' },
		{ code: '0.7', suffix: 'default' },
		'MMR relevance-vs-diversity balance, clamped to 0..1.'
	],
	[
		{ code: 'sourceBalanceStrategy' },
		{ code: "'cap'", suffix: 'default' },
		"With maxResultsPerSource: 'cap' truncates per source, 'round_robin' interleaves sources."
	]
];

const rerankerRows: DocsTableCell[][] = [
	[
		{ code: 'createHeuristicRAGReranker()' },
		{ code: 'absolute-heuristic-reranker' },
		'No network calls — BM25-style lexical re-scoring. A solid default.'
	],
	[
		{ code: 'createCohereRAGReranker({ apiKey })' },
		{ code: 'rerank-v3.5' },
		'Cohere /v2/rerank cross-encoder.'
	],
	[
		{ code: 'createVoyageRAGReranker({ apiKey })' },
		{ code: 'rerank-2' },
		'Voyage /v1/rerank cross-encoder.'
	],
	[
		{ code: 'createJinaRAGReranker({ apiKey })' },
		{ code: 'jina-reranker-v2-base-multilingual' },
		'Jina /v1/rerank cross-encoder.'
	],
	[
		{ code: 'createRAGReranker({ rerank })' },
		{ code: 'yours' },
		'Wrap any (input) => results function — an LLM judge, a local cross-encoder, anything.'
	]
];

const storeCards: PackageCard[] = [
	{
		badge: 'built in',
		description:
			'Zero-dependency store for tests, demos, and small corpora. JS filtering and lexical ranking included.',
		name: 'createInMemoryRAGStore',
		packageName: '@absolutejs/rag'
	},
	{
		badge: 'built in',
		description:
			'Backs retrieval with a live @absolutejs/sync engine collection — search results update reactively.',
		name: 'createSyncRAGStore',
		packageName: '@absolutejs/rag'
	},
	{
		description:
			'pgvector-native store: vector(n) column, cosine / l2 / inner_product, hnsw or ivfflat indexes.',
		name: 'Postgres',
		packageName: '@absolutejs/rag-postgres',
		version: '0.0.7'
	},
	{
		description:
			'Embedded store on bun:sqlite. JSON fallback everywhere; native vec0 acceleration via platform packages.',
		name: 'SQLite',
		packageName: '@absolutejs/rag-sqlite',
		version: '0.0.7'
	},
	{
		description:
			'Serverless Pinecone indexes with filter translation, batched upserts, and index provisioning helpers.',
		name: 'Pinecone',
		packageName: '@absolutejs/rag-pinecone',
		version: '0.0.7'
	}
];

const adapterFactoryRows: DocsTableCell[][] = [
	[
		{ code: 'createPostgresRAG(options?)' },
		{ code: 'rag_chunks', suffix: 'default table' },
		'Connection from options.sql, connectionString, RAG_POSTGRES_URL, or DATABASE_URL. Status reports native_pgvector with index diagnostics.'
	],
	[
		{ code: 'createSQLiteRAG(options?)' },
		{ code: ':memory:', suffix: 'default path' },
		'native: { mode: "vec0" } loads the sqlite-vec extension resolved from @absolutejs/absolute-rag-sqlite-* platform packages; getNativeSupport() explains the outcome.'
	],
	[
		{ code: 'createPineconeRAG({ vector })' },
		{ code: '1536', suffix: 'default dims' },
		'cosine / euclidean / dotproduct metrics, $eq..$containsAll filters, 100-record upsert batches. ensurePineconeIndex() provisions serverless indexes.'
	]
];

export const RagRetrievalView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="rag-retrieval" style={h1Style(isMobileOrTablet)}>
						Retrieval & Context
					</h1>
					<p style={paragraphLargeStyle}>
						One <code>createRAGCollection()</code> call wires
						embedding, query transforms, retrieval routing, hybrid
						lexical + vector fusion, and reranking over any backend
						that implements the <code>RAGVectorStore</code> contract
						— in-memory in core, Postgres (pgvector), SQLite (vec0),
						and Pinecone as published adapters.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="collections"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Collections
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A collection binds a store to a retrieval pipeline. It
						exposes <code>search</code> /{' '}
						<code>searchWithTrace</code> (results plus a full
						retrieval trace), <code>ingest</code>,{' '}
						<code>ingestSource</code> / <code>removeSource</code>{' '}
						(tracked, deletable source sets), and pass-through{' '}
						<code>clear</code> / <code>getStatus</code> /{' '}
						<code>getCapabilities</code>. Free-function wrappers —{' '}
						<code>searchDocuments</code>,{' '}
						<code>ingestRAGDocuments</code>,{' '}
						<code>ingestRAGSource</code>,{' '}
						<code>removeRAGSource</code> — mirror the methods.
					</p>
					<DocsTable
						columns={['Option', 'Type / default', 'Purpose']}
						rows={collectionOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragRetrievalQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>buildRAGContext(hits)</code> renders results into
						a prompt-ready block: numbered{' '}
						<code>[1] Title (source)</code> headers, location labels
						for pages, sheets, slides, and timestamps, provenance
						cues for OCR and transcripts, then citation guidance. An
						empty hit list returns an empty string.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hybrid-search"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hybrid Search
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every search accepts <code>retrieval</code> — a mode
						string or a full <code>RAGHybridSearchOptions</code>{' '}
						object. In hybrid mode the store's vector results and
						BM25-style lexical results (via{' '}
						<code>queryLexical</code> where the backend supports it)
						are fused, de-duplicated, diversity-filtered, and only
						then reranked.
					</p>
					<DocsTable
						columns={['Option', 'Default', 'Behavior']}
						rows={hybridOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragRetrievalHybrid}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The pieces are exported for custom pipelines:{' '}
						<code>buildRAGLexicalHaystack</code> and{' '}
						<code>scoreRAGLexicalMatch</code> for lexical scoring,{' '}
						<code>fuseRAGQueryResults</code> for fusion, and{' '}
						<code>resolveRAGHybridSearchOptions</code> to expand a
						mode string into the fully-defaulted options object.
						Fused results carry their per-signal ranks in{' '}
						<code>metadata.retrievalSignals</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reranking"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reranking & Transforms
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Rerankers receive the over-fetched candidate set (
						<code>topK x defaultCandidateMultiplier</code>) and
						return the final ordering. Query transforms run first —{' '}
						<code>createHeuristicRAGQueryTransform()</code> expands
						domain terms into variant queries, or wrap a model call
						with <code>createRAGQueryTransform</code>. A retrieval
						strategy (
						<code>createHeuristicRAGRetrievalStrategy</code>) can
						override the mode per query: scoped filters go straight
						to vector, support-style queries to lexical, exact
						phrases to hybrid.
					</p>
					<DocsTable
						columns={['Reranker', 'Default model', 'Notes']}
						rows={rerankerRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragRetrievalRerank}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>applyRAGReranking</code> and{' '}
						<code>resolveRAGReranker</code> are exported for
						standalone use — no reranker configured means results
						pass through unchanged.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="vector-store"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The RAGVectorStore Contract
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three required methods make a working store; everything
						else is a capability the pipeline detects and uses when
						present — <code>queryLexical</code> unlocks backend-side
						lexical retrieval, <code>delete</code> /{' '}
						<code>count</code> unlock source removal,{' '}
						<code>analyze</code> and <code>rebuildNativeIndex</code>{' '}
						unlock maintenance actions. The{' '}
						<code>@absolutejs/rag/adapter-kit</code> subpath
						re-exports the contract types plus the vector helpers,
						metadata filter matcher, lexical ranker, and native
						query planners adapter packages build on.
					</p>
					<PrismPlus
						codeString={ragRetrievalStoreContract}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Status is a discriminated union"
						variant="info"
					>
						<code>getStatus()</code> reports the backend and its
						vector mode — <code>in_memory</code>, SQLite{' '}
						<code>json_fallback</code> / <code>native_vec0</code>,
						or Postgres <code>native_pgvector</code> — with native
						diagnostics (index type, row counts, last query plan)
						when available.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stores-adapters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stores & Adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Two stores ship in core and three adapters are published
						as standalone packages, so the heavy backend
						dependencies stay out of your bundle until you opt in.
						Each adapter also exports a{' '}
						<code>create*RAGCollection</code> and a bundled{' '}
						<code>create*RAG</code> (store + collection + status
						accessors).
					</p>
					<PackageCardGrid
						items={storeCards}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Factory', 'Key default', 'Notes']}
						rows={adapterFactoryRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragRetrievalAdapters}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
