import { PackageDocData } from '../../../../types/packageDocs';

export const ragPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Published vector-store adapters that implement the RAGVectorStore contract from @absolutejs/rag. Each ships as its own package, so you install only the backend (and its heavy dependencies) you actually use.',
			heading: 'Vector store adapters',
			items: [
				{
					description:
						'Pinecone vector-store adapter for @absolutejs/rag',
					name: '@absolutejs/rag-pinecone',
					version: '0.0.7'
				},
				{
					description:
						'PostgreSQL (pgvector) vector-store adapter for @absolutejs/rag',
					name: '@absolutejs/rag-postgres',
					version: '0.0.7'
				},
				{
					description:
						'SQLite vector-store adapter for @absolutejs/rag with optional native vec0 acceleration',
					name: '@absolutejs/rag-sqlite',
					version: '0.0.7'
				}
			]
		}
	],
	category: 'AI',
	description:
		'A standalone RAG runtime for Bun and Elysia apps covering the full pipeline: document ingestion and chunking, embedding, hybrid retrieval with reranking, source sync, and retrieval-quality evaluation. Vector storage is pluggable behind a single RAGVectorStore contract, with published adapters for Postgres (pgvector), SQLite, and Pinecone alongside a built-in in-memory store. It pairs with @absolutejs/ai for the model side and ships framework bindings for React, Vue, Svelte, and Angular via subpath exports.',
	features: [
		{
			description:
				'One RAGVectorStore contract with an in-memory store built in and Postgres, SQLite, and Pinecone adapters published separately, so swapping backends does not touch retrieval code.',
			title: 'Pluggable vector stores'
		},
		{
			description:
				'Embedding providers for OpenAI, Gemini, Mistral, Ollama, xAI, DeepSeek, and more, plus any OpenAI-compatible endpoint, behind a single provider interface.',
			title: 'Provider-agnostic embeddings'
		},
		{
			description:
				'Lexical and vector results fuse into hybrid search, with query transforms and rerankers (Cohere, Jina, Voyage, or heuristic) applied per collection.',
			title: 'Hybrid retrieval and reranking'
		},
		{
			description:
				'Extractors for PDFs (including OCR), EPUB, office and legacy documents, archives, images, and media transcripts turn raw files, directories, uploads, and URLs into chunked documents.',
			title: 'File ingestion pipeline'
		},
		{
			description:
				'Sync sources for email (Gmail, Microsoft Graph, IMAP), GitHub repos, sitemaps, feeds, directories, and S3-compatible storage keep collections current on a scheduler.',
			title: 'Source sync and scheduling'
		},
		{
			description:
				'Evaluation suites score retrieval and answer grounding, compare strategies and rerankers, and persist run history so retrieval changes ship against a baseline.',
			title: 'Retrieval evaluation suites'
		}
	],
	installCommand: 'bun add @absolutejs/rag',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/rag',
			label: 'npm'
		}
	],
	name: 'RAG',
	notes: [
		{
			body: 'The package is pre-1.0 and its API surface is still settling; pin an exact version and review release notes when upgrading.',
			title: 'Beta API',
			variant: 'warning'
		},
		{
			body: 'Framework bindings live behind subpath exports (@absolutejs/rag/react, /vue, /svelte, /angular), and the adapter-kit subpath exposes the contract adapters build against.',
			title: 'Subpath exports',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/rag',
	samples: [
		{
			code: `import {
	createInMemoryRAGStore,
	createRAGCollection,
	ingestRAGDocuments,
	openaiEmbeddings,
	searchDocuments
} from '@absolutejs/rag';

const collection = createRAGCollection({
	embedding: openaiEmbeddings({
		apiKey: process.env.OPENAI_API_KEY ?? '',
		defaultModel: 'text-embedding-3-small'
	}),
	store: createInMemoryRAGStore()
});

await ingestRAGDocuments(collection, {
	documents: [
		{
			id: 'getting-started',
			text: 'AbsoluteJS ships full-stack primitives for Bun and Elysia.',
			title: 'Getting Started'
		}
	]
});

const results = await searchDocuments(collection, {
	query: 'What does AbsoluteJS ship?',
	topK: 3
});`,
			description:
				'Create a collection over the built-in in-memory store, ingest documents, and run a similarity search.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { createPostgresRAG } from '@absolutejs/rag-postgres';

const { collection, store } = createPostgresRAG({
	storeOptions: {
		connectionString: process.env.DATABASE_URL,
		dimensions: 1536,
		distanceMetric: 'cosine',
		indexType: 'hnsw'
	}
});`,
			description:
				'Swap the in-memory store for pgvector by installing @absolutejs/rag-postgres; the collection API stays identical.',
			heading: 'Postgres (pgvector) Backend',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Standalone RAG runtime for Bun and Elysia apps: ingestion, hybrid retrieval, source sync, and evaluation over pluggable vector stores.',
	version: '0.0.28'
};
