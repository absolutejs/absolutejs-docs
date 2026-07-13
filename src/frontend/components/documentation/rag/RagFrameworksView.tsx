import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	ragFrameworksBindings,
	ragFrameworksChatServer,
	ragFrameworksClient,
	ragFrameworksReact
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#rag-frameworks', label: 'Overview' },
	{ href: '#chat-plugin', label: 'The Chat Plugin' },
	{ href: '#server-surface', label: 'Server Surface' },
	{ href: '#browser-client', label: 'Browser Client' },
	{ href: '#react-hooks', label: 'React Hooks' },
	{ href: '#svelte-vue-angular', label: 'Svelte, Vue & Angular' },
	{ href: '#presentation', label: 'Presentation Helpers' }
];

const chatOptionRows: DocsTableCell[][] = [
	[
		{ code: 'provider' },
		{ code: 'required' },
		'Factory from provider name to AI provider config — same contract as aiChat.'
	],
	[
		{ code: 'path' },
		{ code: "'/rag'", suffix: 'default' },
		'Prefix for every route and the WebSocket channel.'
	],
	[
		{ code: 'collection / ragStore' },
		{ code: 'RAGCollection | RAGVectorStore' },
		'Retrieval backend. A collection brings its own embedding; a bare store pairs with embedding / embeddingModel.'
	],
	[
		{ code: 'topK' },
		{ code: '6', suffix: 'default' },
		'Sources retrieved per chat turn and per /search default.'
	],
	[
		{ code: 'scoreThreshold' },
		{ code: 'number' },
		'Drops sources under the threshold before answering.'
	],
	[
		{ code: 'rerank / extractors' },
		{ code: 'provider / registry' },
		'Reranker for retrieval and file extractors for the upload-ingest routes.'
	],
	[
		{ code: 'authorizeRAGAction / resolveRAGAccessScope' },
		{ code: 'hooks' },
		'Access control over mutating routes and scoped reads (see the Quality page).'
	],
	[
		{ code: 'searchTraceStore, retrievalBaselineStore, ...' },
		{ code: 'stores' },
		'Governance store slots — wire all fifteen at once with createRAGSQLiteGovernanceStores.'
	],
	[
		{ code: 'htmx' },
		{ code: 'false', suffix: 'default' },
		'true or a render config mounts the HTMX form / SSE routes alongside the JSON surface.'
	],
	[
		{ code: 'staleAfterMs' },
		{ code: '7 days', suffix: 'default' },
		'Age before an idle conversation is considered stale.'
	]
];

const routeGroupRows: DocsTableCell[][] = [
	[
		'Chat',
		{ code: 'WS /rag' },
		'The WebSocket chat channel: message, cancel, and branch frames; retrieval runs before each answer streams.'
	],
	[
		'Search',
		{ code: 'POST /rag/search' },
		'Retrieval without generation; includeTrace returns the full trace.'
	],
	[
		'Documents',
		{ code: 'GET|POST /rag/documents, GET /rag/documents/:id/chunks' },
		'List, create, inspect chunks, and DELETE /rag/documents/:id.'
	],
	[
		'Ingest & index',
		{ code: 'POST /rag/ingest, DELETE /rag/index' },
		'Plus /rag/reindex/documents/:id, /rag/reindex/source, /rag/reseed, /rag/reset.'
	],
	[
		'Backend',
		{ code: 'GET /rag/backends, POST /rag/backend/analyze' },
		'Backend capabilities, analyze, and POST /rag/backend/reindex-native.'
	],
	[
		'Sync',
		{ code: 'GET|POST /rag/sync, POST /rag/sync/:id' },
		'List sync sources, run them all, or run one.'
	],
	[
		'Evaluation',
		{ code: 'POST /rag/evaluate, POST /rag/evaluate/stream' },
		'Batch evaluation and an SSE stream of per-case results.'
	],
	[
		'Traces',
		{ code: 'GET /rag/traces[/groups|/stats]' },
		'Trace history plus prune preview / prune / prune history.'
	],
	[
		'Governance',
		{ code: '/rag/compare/retrieval/*' },
		'Comparisons, baselines, promotions, lane handoffs, incidents, remediations, and policy history.'
	],
	[
		'Status',
		{ code: 'GET /rag/status[/...], GET /rag/ops' },
		'Readiness, maintenance, release, and handoff status rollups.'
	],
	[
		'Conversations',
		{ code: 'GET|DELETE /rag/conversations[/:id]' },
		'Stored chat history from the conversation store.'
	],
	[
		'HTMX (opt-in)',
		{ code: 'POST /rag/message, GET /rag/sse/:conv/:msg' },
		'Form post + SSE HTML fragments; mounted only when htmx is set.'
	]
];

const reactHookRows: DocsTableCell[][] = [
	[
		{ code: 'useRAG(path, options?)' },
		'Composes every hook below into one object: search, ingest, status, ops, documents, chunkPreview, evaluate, index, stream / workflow, sources, citations, grounding.'
	],
	[
		{ code: 'useRAGSearch' },
		'search / searchWithTrace with results, trace, isSearching, error.'
	],
	[
		{ code: 'useRAGIngest' },
		'ingestChunks / ingestDocuments / ingestUrls / ingestUploads / clearIndex.'
	],
	[
		{ code: 'useRAGStream / useRAGWorkflow' },
		'WebSocket answer workflow: query(), stage, sources, citations, groundedAnswer, progress.'
	],
	[
		{ code: 'useRAGStatus / useRAGOps' },
		'Backend status, capabilities, health, jobs, and maintenance rollups (auto-load on mount).'
	],
	[
		{ code: 'useRAGDocuments / useRAGChunkPreview' },
		'Indexed document listing and per-document chunk graph navigation.'
	],
	[
		{ code: 'useRAGEvaluate' },
		'evaluate / evaluateStream / runSuite with leaderboard and suite-run state.'
	],
	[
		{ code: 'useRAGIndexAdmin' },
		'createDocument, deleteDocument, reindex, reseed, reset, sync sources, backend actions.'
	],
	[
		{ code: 'useRAGSources / useRAGCitations / useRAGGrounding' },
		'Pure derivations over messages: source groups, citation maps, grounded-answer coverage.'
	]
];

const bindingRows: DocsTableCell[][] = [
	[
		'React',
		{ code: '@absolutejs/rag/react' },
		{ code: 'useRAG, useRAGSearch, ...' },
		'Hooks with plain state; useRAG memoizes the composite.'
	],
	[
		'Svelte',
		{ code: '@absolutejs/rag/svelte' },
		{ code: 'createRAG, createRAGSearch, ...' },
		'Same surface as stores — subscribe in templates.'
	],
	[
		'Vue',
		{ code: '@absolutejs/rag/vue' },
		{ code: 'useRAG, useRAGSearch, ...' },
		'Same names as React, backed by ref() / computed().'
	],
	[
		'Angular',
		{ code: '@absolutejs/rag/angular' },
		{ code: 'RAGClientService, RAGStreamService, RAGWorkflowService' },
		'Injectable services; connect() returns signal-based state.'
	]
];

export const RagFrameworksView = ({
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
					<h1 id="rag-frameworks" style={h1Style(isMobileOrTablet)}>
						Frameworks & Chat
					</h1>
					<p style={paragraphLargeStyle}>
						<code>ragChat()</code> mounts a complete
						retrieval-augmented chat backend on Elysia — WebSocket
						streaming, search, ingest, sync, evaluation, and
						governance routes under one path. On the other side, a
						framework-free browser client plus matching bindings for
						React, Svelte, Vue, and Angular consume that surface
						without hand-written fetch code.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="chat-plugin"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Chat Plugin
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>ragChat(config)</code> extends the{' '}
						<code>@absolutejs/ai</code> chat plugin config — same{' '}
						<code>provider</code>, <code>model</code>,{' '}
						<code>tools</code>, <code>store</code>, and{' '}
						<code>systemPrompt</code> — with the retrieval surface.
						Each chat turn retrieves <code>topK</code> sources,
						streams them to the client ahead of the answer, and
						cites them in the response.
					</p>
					<DocsTable
						columns={['Option', 'Type / default', 'Purpose']}
						rows={chatOptionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragFrameworksChatServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="ragPlugin is the same function"
						variant="note"
					>
						<code>ragPlugin</code> is a re-export alias of{' '}
						<code>ragChat</code> — use whichever name reads better
						in your server file.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-surface"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Surface
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every route lives under the configured <code>path</code>{' '}
						(default <code>/rag</code>). Chat itself is a WebSocket
						at the path root; evaluation and the opt-in HTMX surface
						stream over SSE. The browser client and all framework
						bindings target exactly these routes.
					</p>
					<DocsTable
						columns={['Group', 'Routes', 'What it covers']}
						rows={routeGroupRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="browser-client"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Browser Client
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createRAGClient({'{ path, fetch? }'})</code> from{' '}
						<code>@absolutejs/rag/client</code> wraps the whole HTTP
						surface: search (with or without trace), ingest,
						documents, sync, status / ops, evaluation (including the
						SSE stream), traces, and the full governance surface —
						promotions, handoffs, incidents, remediations.{' '}
						<code>createRAGWorkflow(path)</code> opens the WebSocket
						and exposes the answer lifecycle as derived getters.
					</p>
					<PrismPlus
						codeString={ragFrameworksClient}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The client subpath also re-exports{' '}
						<code>createRAGEvaluationSuite</code>,{' '}
						<code>runRAGEvaluationSuite</code>, and{' '}
						<code>buildRAGEvaluationLeaderboard</code> so evaluation
						UIs need a single import, plus{' '}
						<code>buildRAGMaintenanceOverview</code> for maintenance
						dashboards.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react-hooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/rag/react</code> layers hooks over the
						client and the streaming workflow. Every hook takes the
						plugin path as its first argument;{' '}
						<code>useRAG(path)</code> composes them all when you
						want one handle.
					</p>
					<DocsTable
						columns={['Hook', 'Surface']}
						rows={reactHookRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragFrameworksReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte-vue-angular"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte, Vue & Angular
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The other bindings mirror the React surface one-for-one,
						adapted to each framework's reactivity model. All of
						them are optional peer dependencies — install only the
						framework you render with.
					</p>
					<DocsTable
						columns={[
							'Framework',
							'Subpath',
							'Entry points',
							'State model'
						]}
						rows={bindingRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragFrameworksBindings}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="presentation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Presentation Helpers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Two helper subpaths keep UI code framework-agnostic.{' '}
						<code>@absolutejs/rag/client/ui</code> ships the
						browser-safe workflow builders the bindings use
						internally — <code>buildRAGAnswerWorkflowState</code>,{' '}
						<code>buildRAGStreamProgress</code>,{' '}
						<code>buildRAGGroundedAnswer</code>,{' '}
						<code>buildRAGCitationReferenceMap</code>,{' '}
						<code>buildRAGChunkGraph</code> and its navigation
						helpers — so a vanilla JS app can render the same
						retrieval workflow.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/rag/ui</code> is the wider server-side
						presentation layer: citations, source groups and
						summaries, corpus health, readiness, evaluation and
						grounding history rows, reranker and retrieval
						comparison overviews, and sync-source presentations —
						the building blocks for admin dashboards over the
						governance routes.
					</p>
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
