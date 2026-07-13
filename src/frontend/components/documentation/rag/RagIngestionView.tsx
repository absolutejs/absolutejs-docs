import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	ragIngestionDirectory,
	ragIngestionExtractors
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
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#rag-ingestion', label: 'Overview' },
	{ href: '#pipeline', label: 'Pipeline' },
	{ href: '#loaders', label: 'Loaders & Builders' },
	{ href: '#chunking', label: 'Chunking' },
	{ href: '#extractors', label: 'File Extractors' },
	{ href: '#ocr-media', label: 'OCR & Transcription' },
	{ href: '#embedding', label: 'Embedding at Upsert' }
];

const pipelineSteps: StepFlowStep[] = [
	{
		actor: 'load',
		description:
			'A file, directory, URL, or in-memory upload is read into bytes plus metadata (path, content type, base metadata).',
		title: 'Load the raw input'
	},
	{
		actor: 'extract',
		code: 'createRAGFileExtractorRegistry([...])',
		description:
			'The first matching extractor turns bytes into one or more text documents. PDFs, office files, EPUBs, emails, and archives ship built in; OCR and media transcription are opt-in.',
		title: 'Extract text documents'
	},
	{
		actor: 'chunk',
		code: 'prepareRAGDocuments({ defaultChunking, documents })',
		description:
			'Each document is normalized and split into RAGDocumentChunk values with deterministic chunk ids, per the resolved chunking options.',
		title: 'Chunk each document'
	},
	{
		actor: 'collection',
		code: 'await collection.ingest({ chunks })',
		description:
			'Chunks without a precomputed embedding are embedded by the collection provider (kind: "passage"); precomputed vectors are dimension-validated and reused.',
		title: 'Embed at upsert time'
	},
	{
		actor: 'store',
		description:
			'The vector store receives one upsert({ chunks }) call: in-memory, SQLite, Postgres, Pinecone, or your own RAGVectorStore.',
		title: 'Upsert into the store'
	}
];

const loaderRows: DocsTableCell[][] = [
	[
		{ code: 'loadRAGDocumentFile' },
		{ code: 'RAGDocumentFileInput' },
		'Reads one file from disk and extracts it into a single document.'
	],
	[
		{ code: 'loadRAGDocumentsFromDirectory' },
		{ code: 'RAGDirectoryIngestInput' },
		'Walks a directory (recursive by default) and extracts every matching file.'
	],
	[
		{ code: 'loadRAGDocumentFromURL' },
		{ code: 'RAGDocumentUrlInput' },
		'Fetches one URL and extracts the response body.'
	],
	[
		{ code: 'loadRAGDocumentsFromURLs' },
		{ code: 'RAGDocumentUrlIngestInput' },
		'Fetches a batch of URLs with shared base metadata and chunking.'
	],
	[
		{ code: 'loadRAGDocumentsFromUploads' },
		{ code: 'RAGDocumentUploadIngestInput' },
		'Extracts in-memory uploads (utf8 or base64 content) without touching disk.'
	],
	[
		{ code: 'prepareRAGDocument / prepareRAGDocuments' },
		{ code: 'RAGIngestDocument' },
		'Normalizes and chunks already-extracted text into RAGPreparedDocument values.'
	],
	[
		{ code: 'buildRAGUpsertInputFrom*' },
		{ code: 'Documents | Directory | URLs | Uploads' },
		'One-call load + prepare + flatten into { chunks } ready for collection.ingest().'
	]
];

const chunkingRows: DocsTableCell[][] = [
	[
		{ code: 'strategy' },
		{ code: "'paragraphs'", suffix: 'default' },
		"Also 'sentences', 'fixed', and 'source_aware' (structure-aware splitting for extracted sheets, slides, and segments)."
	],
	[
		{ code: 'maxChunkLength' },
		{ code: '900', suffix: 'default' },
		'Upper bound per chunk in characters (clamped to a floor of 120).'
	],
	[
		{ code: 'chunkOverlap' },
		{ code: '120', suffix: 'default' },
		'Characters shared between adjacent chunks; clamped to maxChunkLength - 1.'
	],
	[
		{ code: 'minChunkLength' },
		{ code: '80', suffix: 'default' },
		'Fragments shorter than this merge into a neighbor instead of standing alone.'
	]
];

const extractorRows: DocsTableCell[][] = [
	[
		{ code: 'createTextFileExtractor()' },
		'.txt .md .mdx .html .json .csv .xml .yaml .ts .tsx ...',
		'UTF-8 text and structured-text formats; format inferred from content type or filename.'
	],
	[
		{ code: 'createPDFFileExtractor()' },
		'.pdf',
		'Native text-layer extraction. Throws on scanned, image-only PDFs (pair with the OCR extractor).'
	],
	[
		{ code: 'createOfficeDocumentExtractor()' },
		'.docx .xlsx .pptx .odt .ods .odp',
		'Summary document plus per-sheet and per-slide documents with source-native metadata.'
	],
	[
		{ code: 'createLegacyDocumentExtractor()' },
		'.rtf .doc .xls .ppt .msg',
		'Legacy binary office formats via printable-string extraction; RTF is stripped.'
	],
	[
		{ code: 'createEPUBExtractor()' },
		'.epub',
		'Unzips the container and extracts chapter text.'
	],
	[
		{ code: 'createEmailExtractor()' },
		'.eml .emlx .mbox .mbx',
		'Single messages and whole mailboxes, split into per-message documents.'
	],
	[
		{ code: 'createRAGArchiveFileExtractor(expander)' },
		'.zip .tar .gz .tgz .bz2 .xz',
		'Expands archives (zip / tar / gzip built in) and recursively extracts each entry.'
	],
	[
		{ code: 'createRAGImageOCRExtractor(provider)' },
		'.png .jpg .jpeg .webp .tiff .bmp .gif .heic',
		'Opt-in. Runs an RAGOCRProvider over images and records confidence metadata.'
	],
	[
		{ code: 'createRAGPDFOCRExtractor({ provider })' },
		'.pdf',
		'Opt-in. Native text first; OCR fallback below minExtractedTextLength (default 80) or always with alwaysOCR.'
	],
	[
		{ code: 'createRAGMediaFileExtractor(transcriber)' },
		'.mp3 .wav .m4a .flac .ogg .mp4 .mov .mkv .webm ...',
		'Opt-in. Transcribes audio / video into per-segment documents with timing metadata.'
	]
];

const ocrProviderRows: DocsTableCell[][] = [
	[
		{ code: 'anthropicOCR' },
		{ code: 'claude-3-5-sonnet-latest' },
		'OCR via the Anthropic Messages API; apiKey required.'
	],
	[
		{ code: 'openaiOCR' },
		{ code: 'gpt-4.1-mini' },
		'OCR via the OpenAI Responses API; apiKey required.'
	],
	[
		{ code: 'geminiOCR' },
		{ code: 'gemini-2.5-flash' },
		'OCR via the Gemini API; apiKey required.'
	],
	[
		{ code: 'ollamaOCR' },
		{ code: 'llava' },
		'Local OCR against http://127.0.0.1:11434 by default; no API key.'
	],
	[
		{ code: 'openaiCompatibleOCR' },
		{ code: 'gpt-4.1-mini' },
		'Any OpenAI-compatible endpoint; baseUrl becomes required.'
	],
	[
		{ code: 'openaiTranscriber' },
		{ code: 'gpt-4o-mini-transcribe' },
		'Audio transcription via /v1/audio/transcriptions with verbose segments.'
	],
	[
		{ code: 'ollamaTranscriber' },
		{ code: 'qwen2.5vl' },
		'Local transcription through Ollama; no API key.'
	],
	[
		{ code: 'openaiCompatibleTranscriber' },
		{ code: 'gpt-4o-mini-transcribe' },
		'Any OpenAI-compatible transcription endpoint; baseUrl required.'
	]
];

export const RagIngestionView = ({
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
					<h1 id="rag-ingestion" style={h1Style(isMobileOrTablet)}>
						Ingestion & Chunking
					</h1>
					<p style={paragraphLargeStyle}>
						Everything between a raw file and an upsert-ready chunk.{' '}
						<code>@absolutejs/rag</code> ships loaders for files,
						directories, URLs, and uploads; an extractor chain
						covering PDF, office, EPUB, email, archives, OCR, and
						media transcripts; and a chunking pipeline with
						per-document overrides, profile registries, and sane
						built-in defaults (900 / 120 / 80, paragraphs).
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pipeline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pipeline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Ingestion is a pure data pipeline — no network calls
						until the final embed step, and no store writes until
						the final upsert. Every stage is exported on its own, so
						you can enter at any point: hand raw text to{' '}
						<code>prepareRAGDocuments</code>, or let{' '}
						<code>buildRAGUpsertInputFromDirectory</code> run the
						whole chain in one call.
					</p>
					<StepFlow
						steps={pipelineSteps}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="loaders"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Loaders & Builders
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>load*</code> functions read and extract,{' '}
						<code>prepare*</code> functions chunk, and{' '}
						<code>buildRAGUpsertInputFrom*</code> functions do both
						and flatten the result to{' '}
						<code>{'{ chunks: RAGDocumentChunk[] }'}</code> — the
						exact shape <code>collection.ingest()</code> takes.
					</p>
					<DocsTable
						columns={['Function', 'Input', 'What it does']}
						rows={loaderRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragIngestionDirectory}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Directory extension filtering"
						variant="note"
					>
						Without <code>includeExtensions</code>, directory walks
						use a built-in allowlist (.txt, .md, .mdx, .html, .json,
						.csv, .xml, .yaml, .pdf, .eml, .mbox, ...). Passing
						custom <code>extractors</code> or an{' '}
						<code>extractorRegistry</code> without{' '}
						<code>includeExtensions</code> disables the filter so
						your extractors see every file.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="chunking"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Chunking
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>RAGChunkingOptions</code> resolve per field, most
						specific first: the document's own <code>chunking</code>
						, then a matching registry profile, then the{' '}
						<code>defaultChunking</code> you passed, then the
						built-ins. Documents that already fit inside{' '}
						<code>maxChunkLength</code> become a single chunk
						(except under <code>source_aware</code>).
					</p>
					<DocsTable
						columns={['Option', 'Default', 'Behavior']}
						rows={chunkingRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>createRAGChunkingRegistry([...])</code> registers
						profiles that match on <code>formats</code>,{' '}
						<code>sources</code>, <code>documentIds</code>, or{' '}
						<code>sourceNativeKinds</code> with an optional{' '}
						<code>priority</code> — one place to say "markdown gets
						1200-char source-aware chunks, transcripts get 500".
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="extractors"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						File Extractors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An extractor is{' '}
						<code>{'{ name, supports, extract }'}</code> over raw
						bytes. The default chain runs office → mailbox → legacy
						→ EPUB → email → archive → PDF → text, first match wins.
						Register your own with{' '}
						<code>createRAGFileExtractorRegistry</code>, matching on
						extensions, content types, formats, or a custom{' '}
						<code>match</code> function.
					</p>
					<DocsTable
						columns={['Extractor', 'Handles', 'Notes']}
						rows={extractorRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragIngestionExtractors}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ocr-media"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OCR & Transcription Providers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						OCR extractors take an <code>RAGOCRProvider</code> (
						<code>{'{ name, extractText }'}</code>) and media
						extractors take an <code>RAGMediaTranscriber</code> (
						<code>{'{ name, transcribe }'}</code>). Ready-made
						providers ship for the common APIs — or wrap your own
						with <code>createRAGOCRProvider</code> /{' '}
						<code>createRAGMediaTranscriber</code>.
					</p>
					<DocsTable
						columns={['Factory', 'Default model', 'Notes']}
						rows={ocrProviderRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="embedding"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Embedding at Upsert
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Ingestion itself never embeds. Chunks flow to the
						collection as plain text, and{' '}
						<code>collection.ingest()</code> embeds anything missing
						an <code>embedding</code> with the collection's provider
						(kind <code>'passage'</code>). Chunks that arrive with a
						precomputed vector — or per-chunk{' '}
						<code>embeddingVariants</code> — are validated against
						the expected dimensions via{' '}
						<code>validateRAGEmbeddingDimensions</code> and reused
						as-is.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Precomputed embeddings are first-class"
						variant="success"
					>
						Batch-embed offline, attach the vectors to your chunks,
						and ingest with zero embedding calls — a dimension
						mismatch throws instead of silently corrupting the
						index.
					</Callout>
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
