export const ragFrameworksBindings = `\
// Svelte : store-backed factories from @absolutejs/rag/svelte
import { createRAG } from '@absolutejs/rag/svelte';

const rag = createRAG('/rag');
// createRAGSearch, createRAGIngest, createRAGStream, createRAGStatus,
// createRAGOps, ... mirror the React hooks one-for-one.

// Vue : composables from @absolutejs/rag/vue with computed()/ref() state
import { useRAG } from '@absolutejs/rag/vue';

const vueRag = useRAG('/rag', { autoLoadStatus: true });

// Angular : injectable services from @absolutejs/rag/angular
import { inject } from '@angular/core';
import { RAGClientService, RAGStreamService } from '@absolutejs/rag/angular';

class DocsAssistant {
  private readonly client = inject(RAGClientService);
  private readonly stream = inject(RAGStreamService).connect('/rag');

  async run(query: string) {
    // Every RAGClientService method takes the base path first.
    const hits = await this.client.search('/rag', { query });
    // connect() returns Angular signals: sources(), stage(), progress()...
    this.stream.query(query);

    return hits;
  }
}`;
export const ragFrameworksChatServer = `\
import { Elysia } from 'elysia';
import { anthropic } from '@absolutejs/ai/anthropic';
import {
  createRAGCollection,
  openaiEmbeddings,
  ragChat
} from '@absolutejs/rag';
import { createPostgresRAGStore } from '@absolutejs/rag-postgres';

const collection = createRAGCollection({
  embedding: openaiEmbeddings({
    apiKey: process.env.OPENAI_API_KEY ?? '',
    defaultModel: 'text-embedding-3-small',
    dimensions: 1536
  }),
  store: createPostgresRAGStore({ dimensions: 1536 })
});

new Elysia()
  .use(
    ragChat({
      collection,
      path: '/rag', // default
      provider: () => anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
      systemPrompt: 'Answer from the retrieved context and cite sources.',
      topK: 6 // default
    })
  )
  .listen(3000);`;
export const ragFrameworksClient = `\
import { createRAGClient, createRAGWorkflow } from '@absolutejs/rag/client';

// Framework-free browser client : typed fetch over every route the
// plugin mounts. Pass the same path you gave ragChat.
const client = createRAGClient({ path: '/rag' });

const results = await client.search({ query: 'How do deploys work?' });
const detailed = await client.searchWithTrace({
  query: 'How do deploys work?'
});

await client.ingestDocuments({
  documents: [{ id: 'deploys', text: 'Deploys run on every push to main.' }]
});

const status = await client.status();
const operations = await client.ops();
await client.syncAllSources();

// WebSocket answer workflow over the same path : send a query, then
// read retrieval stage, streamed answer, sources, and citations.
const workflow = createRAGWorkflow('/rag');
workflow.query('How do deploys work?');
workflow.isRetrieving;
workflow.sources;
workflow.citations;
workflow.groundedAnswer;`;
export const ragFrameworksReact = `\
import { useRAG } from '@absolutejs/rag/react';

export const DocsAssistant = () => {
  // One hook composes search, ingest, status, ops, documents, chunk
  // preview, evaluate, index admin, and the streaming answer workflow.
  const rag = useRAG('/rag');

  return (
    <section>
      <button
        onClick={() => rag.search.search({ query: 'What is hybrid search?' })}
      >
        Search
      </button>
      {rag.search.results.map((hit) => (
        <article key={hit.chunkId}>
          <h3>{hit.title}</h3>
          <p>{hit.text}</p>
        </article>
      ))}

      <button onClick={() => rag.stream.query('Explain hybrid search')}>
        Ask
      </button>
      {rag.stream.isRunning ? (
        <p>{rag.stream.sources.length} sources retrieved...</p>
      ) : null}
      {rag.stream.groundedAnswer ? <p>Grounded answer ready.</p> : null}
    </section>
  );
};`;
export const ragIngestionDirectory = `\
import {
  buildRAGUpsertInputFromDirectory,
  createInMemoryRAGStore,
  createRAGCollection,
  openaiEmbeddings
} from '@absolutejs/rag';

const collection = createRAGCollection({
  embedding: openaiEmbeddings({
    apiKey: process.env.OPENAI_API_KEY ?? '',
    defaultModel: 'text-embedding-3-small'
  }),
  store: createInMemoryRAGStore()
});

// Walks ./docs (recursive by default), picks an extractor per file,
// chunks every document, and flattens to upsert-ready chunks.
const upsert = await buildRAGUpsertInputFromDirectory({
  baseMetadata: { team: 'platform' },
  directory: './docs',
  includeExtensions: ['.md', '.mdx', '.pdf']
});

// Chunks without a precomputed embedding are embedded by the
// collection's provider at upsert time (kind: 'passage').
await collection.ingest(upsert);`;
export const ragIngestionExtractors = `\
import {
  createRAGChunkingRegistry,
  createRAGFileExtractorRegistry,
  createRAGImageOCRExtractor,
  createRAGPDFOCRExtractor,
  loadRAGDocumentsFromDirectory,
  openaiOCR,
  prepareRAGDocuments
} from '@absolutejs/rag';

// OCR and media extractors are opt-in : they need a provider, so they
// are not part of the built-in extractor chain.
const ocr = openaiOCR({ apiKey: process.env.OPENAI_API_KEY ?? '' });

const extractorRegistry = createRAGFileExtractorRegistry([
  {
    extensions: ['.png', '.jpg', '.webp'],
    extractor: createRAGImageOCRExtractor(ocr)
  },
  {
    extensions: ['.pdf'],
    // Uses the native text layer when it yields >= 80 characters;
    // falls back to OCR for scanned pages (or set alwaysOCR: true).
    extractor: createRAGPDFOCRExtractor({ provider: ocr })
  }
]);

// Chunking profiles match on format / source / document id; anything
// unmatched falls back to defaultChunking, then the built-in
// 900 / 120 / 80 paragraphs defaults.
const chunkingRegistry = createRAGChunkingRegistry([
  {
    formats: ['markdown'],
    profile: { maxChunkLength: 1200, strategy: 'source_aware' }
  }
]);

const loaded = await loadRAGDocumentsFromDirectory({
  chunkingRegistry,
  defaultChunking: { chunkOverlap: 120, maxChunkLength: 900 },
  directory: './scans',
  extractorRegistry
});

const prepared = prepareRAGDocuments(loaded);`;
export const ragQualityAccessControl = `\
import { Elysia } from 'elysia';
import { createRAGAccessControl, ragChat } from '@absolutejs/rag';

type Session = { role: 'admin' | 'member'; tenantId: string };

const accessControl = createRAGAccessControl<Session>({
  authorize: ({ action, context }) => {
    if (!context) {
      return { allowed: false, reason: 'Sign in required' };
    }
    if (action === 'reset' || action === 'clear_index') {
      return { allowed: context.role === 'admin', reason: 'Admins only' };
    }

    return true;
  },
  // Called once per Request (memoized in a WeakMap) and shared by
  // both the authorize and scope resolvers.
  resolveContext: (request) => loadSession(request),
  resolveScope: ({ context }) =>
    context
      ? {
          allowedSourcePrefixes: ['docs/'],
          requiredMetadata: { tenantId: context.tenantId }
        }
      : undefined
});

// Spreads authorizeRAGAction + resolveRAGAccessScope onto the plugin.
new Elysia().use(ragChat({ ...accessControl, collection, provider }));`;
export const ragQualityCompare = `\
import {
  buildRAGRetrievalComparisonDecisionSummary,
  buildRAGRetrievalReleaseVerdict,
  compareRAGRetrievalStrategies
} from '@absolutejs/rag/quality';

const comparison = await compareRAGRetrievalStrategies({
  collection,
  retrievals: [
    { id: 'vector-baseline', retrieval: 'vector' },
    {
      id: 'hybrid-mmr',
      retrieval: { diversityStrategy: 'mmr', mode: 'hybrid' }
    }
  ],
  suite
});

// Gate the candidate against the baseline with explicit thresholds.
const decision = buildRAGRetrievalComparisonDecisionSummary({
  baselineRetrievalId: 'vector-baseline',
  candidateRetrievalId: 'hybrid-mmr',
  comparison,
  policy: {
    maxElapsedMsDelta: 250,
    minAverageF1Delta: 0,
    minPassingRateDelta: 0,
    severity: 'fail' // or 'warn' to downgrade gate misses
  }
});

// pass | warn | fail | needs_review : without a gate policy, any
// negative passing-rate / F1 / cue delta yields needs_review.
const verdict = buildRAGRetrievalReleaseVerdict({
  decisionSummary: decision
});`;
export const ragQualityStores = `\
import { Elysia } from 'elysia';
import { ragChat } from '@absolutejs/rag';
import {
  applyRAGSQLiteStoreMigrations,
  createRAGSQLiteEvaluationHistoryStore,
  createRAGSQLiteGovernanceStores,
  persistRAGEvaluationSuiteRun
} from '@absolutejs/rag/quality';

// One call wires all fifteen governance stores (baselines, release
// decisions, incidents, lane handoffs, traces, ...) onto ragChat.
const governance = createRAGSQLiteGovernanceStores({
  path: './rag-governance.sqlite',
  tablePrefix: 'docs'
});

applyRAGSQLiteStoreMigrations({ path: './rag-governance.sqlite' });

new Elysia().use(ragChat({ ...governance, collection, provider }));

// Or persist runs yourself. File stores take a path string; SQLite
// stores take { db?, path?, tableName? } and default to ':memory:'.
const history = createRAGSQLiteEvaluationHistoryStore({
  path: './rag-history.sqlite'
});

await persistRAGEvaluationSuiteRun({ run, store: history });`;
export const ragQualitySuite = `\
import {
  addRAGEvaluationSuiteCase,
  buildRAGEvaluationLeaderboard,
  createRAGEvaluationSuite,
  evaluateRAGCollection,
  runRAGEvaluationSuite
} from '@absolutejs/rag/quality';

let suite = createRAGEvaluationSuite({
  id: 'docs-retrieval',
  input: { cases: [], topK: 6 },
  label: 'Docs retrieval'
});

// Every mutation returns a new suite and validates case ids.
suite = addRAGEvaluationSuiteCase({
  caseInput: {
    expectedDocumentIds: ['release-notes'],
    hardNegativeSources: ['docs/archive.md'],
    id: 'release-question',
    query: 'What changed in the latest release?'
  },
  suite
});

const run = await runRAGEvaluationSuite({
  evaluate: (input) => evaluateRAGCollection({ collection, input }),
  suite
});

// run.response.summary: averagePrecision, averageRecall, averageF1,
// averageLatencyMs + passingRate over pass/partial/fail cases.

// Ranks runs by passingRate desc, then averageF1 desc, then latency.
const leaderboard = buildRAGEvaluationLeaderboard([run]);`;
export const ragRetrievalAdapters = `\
// Postgres (pgvector) : table rag_chunks, hnsw index by default
import { createPostgresRAG } from '@absolutejs/rag-postgres';

const { collection, store } = createPostgresRAG({
  storeOptions: {
    connectionString: process.env.DATABASE_URL,
    dimensions: 1536,
    distanceMetric: 'cosine', // 'cosine' | 'l2' | 'inner_product'
    indexType: 'hnsw' // 'none' | 'hnsw' | 'ivfflat'
  }
});

// SQLite : JSON fallback everywhere, native vec0 when available
import { createSQLiteRAG } from '@absolutejs/rag-sqlite';

const sqlite = createSQLiteRAG({
  storeOptions: {
    dimensions: 1536,
    native: { mode: 'vec0' }, // loads the platform vec0 extension
    path: './rag.sqlite'
  }
});
sqlite.getNativeSupport(); // resolution, nativeActive, actionableMessage

// Pinecone : serverless index, provision + connect
import {
  createPineconeRAG,
  ensurePineconeIndex
} from '@absolutejs/rag-pinecone';

await ensurePineconeIndex({
  dimensions: 1536,
  indexName: 'docs',
  waitUntilReady: true
});

const pinecone = createPineconeRAG({
  indexName: 'docs', // apiKey falls back to PINECONE_API_KEY
  namespace: 'production',
  vector: { dimensions: 1536, distanceMetric: 'cosine', provider: 'pinecone' }
});`;
export const ragRetrievalHybrid = `\
import { fuseRAGQueryResults, searchDocuments } from '@absolutejs/rag';

// A mode string picks the defaults; an options object tunes fusion.
const results = await searchDocuments(collection, {
  query: 'quarterly revenue by region',
  retrieval: {
    diversityStrategy: 'mmr', // default 'none'
    fusion: 'rrf', // 'rrf' | 'max'
    fusionConstant: 60, // default 60
    lexicalWeight: 2, // default 2
    mmrLambda: 0.7, // default 0.7
    mode: 'hybrid', // 'vector' | 'lexical' | 'hybrid'
    sourceBalanceStrategy: 'round_robin', // default 'cap'
    vectorWeight: 1 // default 1
  },
  topK: 8
});

// The fusion primitive is exported for custom pipelines : reciprocal
// rank fusion (weight / (constant + rank)) or weighted max-score.
const fused = fuseRAGQueryResults({
  fusion: 'rrf',
  lexical: lexicalResults,
  lexicalWeight: 2,
  vector: vectorResults,
  vectorWeight: 1
});`;
export const ragRetrievalQuickStart = `\
import {
  buildRAGContext,
  createHeuristicRAGReranker,
  createRAGCollection,
  ingestRAGDocuments,
  openaiEmbeddings,
  searchDocuments
} from '@absolutejs/rag';
import { createSQLiteRAGStore } from '@absolutejs/rag-sqlite';

const collection = createRAGCollection({
  embedding: openaiEmbeddings({
    apiKey: process.env.OPENAI_API_KEY ?? '',
    defaultModel: 'text-embedding-3-small',
    dimensions: 1536
  }),
  rerank: createHeuristicRAGReranker(),
  store: createSQLiteRAGStore({ dimensions: 1536, path: './rag.sqlite' })
});

await ingestRAGDocuments(collection, {
  documents: [
    {
      id: 'release-notes',
      source: 'docs/releases.md',
      text: 'Hybrid retrieval fuses lexical and vector results...',
      title: 'Release Notes'
    }
  ]
});

// topK defaults to 6. Candidates over-fetch at topK * 4 whenever a
// reranker, query transform, or non-vector mode is active.
const hits = await searchDocuments(collection, {
  query: 'What changed in the latest release?',
  retrieval: 'hybrid',
  topK: 5
});

// Numbered "[1] Release Notes (docs/releases.md)" context blocks
// plus citation guidance, ready to drop into a prompt.
const context = buildRAGContext(hits);`;
export const ragRetrievalRerank = `\
import {
  createCohereRAGReranker,
  createHeuristicRAGQueryTransform,
  createHeuristicRAGRetrievalStrategy,
  createRAGCollection,
  createVoyageRAGReranker
} from '@absolutejs/rag';

const collection = createRAGCollection({
  embedding,
  // Heuristic variant expansion runs before retrieval; bring your own
  // model-backed transform via createRAGQueryTransform({ transform }).
  queryTransform: createHeuristicRAGQueryTransform(),
  // Hosted cross-encoders : Cohere rerank-v3.5, Voyage rerank-2, or
  // Jina jina-reranker-v2-base-multilingual by default.
  rerank: createCohereRAGReranker({
    apiKey: process.env.COHERE_API_KEY ?? ''
  }),
  // Routes scoped queries to vector, support-style queries to
  // lexical, and exact-phrase / source-native queries to hybrid.
  retrievalStrategy: createHeuristicRAGRetrievalStrategy(),
  store
});

// Per-search overrides win over the collection defaults.
await collection.search({
  query: 'refund policy for enterprise contracts',
  rerank: createVoyageRAGReranker({
    apiKey: process.env.VOYAGE_API_KEY ?? ''
  }),
  topK: 6
});`;
export const ragRetrievalStoreContract = `\
// The contract every backend implements (@absolutejs/rag/adapter-kit).
// embed, query, and upsert are required; every optional member
// unlocks a capability when present.
type RAGVectorStore = {
  embed: (input: RAGEmbeddingInput) => Promise<number[]>;
  query: (input: RAGQueryInput) => Promise<RAGQueryResult[]>;
  queryLexical?: (input: RAGLexicalQueryInput) => Promise<RAGQueryResult[]>;
  count?: (input?: RAGVectorCountInput) => Promise<number>;
  delete?: (input?: RAGVectorDeleteInput) => Promise<number>;
  analyze?: () => Promise<void> | void;
  rebuildNativeIndex?: () => Promise<void> | void;
  upsert: (input: RAGUpsertInput) => Promise<void>;
  clear?: () => Promise<void> | void;
  close?: () => Promise<void> | void;
  getStatus?: () => RAGVectorStoreStatus;
  getCapabilities?: () => RAGBackendCapabilities;
};

// A minimal custom store built on the adapter-kit vector helpers.
import {
  createRAGVector,
  normalizeVector,
  querySimilarity
} from '@absolutejs/rag/adapter-kit';

const memory = new Map<string, { embedding: number[]; text: string }>();

const demoStore: RAGVectorStore = {
  embed: async ({ text }) => normalizeVector(createRAGVector(text, 24)),
  query: async ({ queryVector, topK }) =>
    [...memory.entries()]
      .map(([chunkId, row]) => ({
        chunkId,
        chunkText: row.text,
        score: querySimilarity(queryVector, row.embedding)
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, topK),
  upsert: async ({ chunks }) => {
    for (const chunk of chunks) {
      memory.set(chunk.chunkId, {
        embedding: chunk.embedding ?? [],
        text: chunk.text
      });
    }
  }
};`;
