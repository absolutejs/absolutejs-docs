import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	ragQualityAccessControl,
	ragQualityCompare,
	ragQualityStores,
	ragQualitySuite
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
	{ href: '#rag-quality', label: 'Overview' },
	{ href: '#eval-suites', label: 'Evaluation Suites' },
	{ href: '#metrics', label: 'Metrics' },
	{ href: '#comparisons', label: 'Comparisons & Gates' },
	{ href: '#history-stores', label: 'History Stores' },
	{ href: '#search-traces', label: 'Search Traces' },
	{ href: '#access-control', label: 'Access Control' }
];

const suiteLifecycleRows: DocsTableCell[][] = [
	[
		{ code: 'createRAGEvaluationSuite' },
		'Normalizes cases and throws on duplicate case ids.'
	],
	[
		{
			code: 'addRAGEvaluationSuiteCase / updateRAGEvaluationSuiteCase / removeRAGEvaluationSuiteCase'
		},
		'Immutable case edits — each returns a new suite and validates ids.'
	],
	[
		{ code: 'reorderRAGEvaluationSuiteCases' },
		'Reorders by explicit id list; requires exactly one id per case.'
	],
	[
		{ code: 'setRAGEvaluationSuiteCaseGoldenSet' },
		'Marks or unmarks a case as part of the golden set.'
	],
	[
		{ code: 'addRAGEvaluationSuiteCaseHardNegative' },
		"Attaches a hard negative by kind: 'chunkId', 'source', or 'documentId'."
	],
	[
		{ code: 'generateRAGEvaluationSuiteFromDocuments' },
		'Synthesizes one case per indexed document (defaults: maxCases 20, topK 5, includeGoldenSet true, hardNegativePerCase 1).'
	],
	[
		{
			code: 'createRAGEvaluationSuiteSnapshot / buildRAGEvaluationSuiteSnapshotDiff'
		},
		'Versioned suite snapshots plus added / removed / changed / reordered case diffs.'
	],
	[
		{ code: 'summarizeRAGEvaluationSuiteDataset' },
		'Case, golden-set, and hard-negative counts for a suite.'
	]
];

const retrievalMetricRows: DocsTableCell[][] = [
	[
		{ code: 'precision' },
		{ code: 'matched / retrieved' },
		'How much of what came back was expected.'
	],
	[
		{ code: 'recall' },
		{ code: 'matched / expected' },
		'How much of what was expected came back.'
	],
	[{ code: 'f1' }, { code: '2pr / (p + r)' }, 'Harmonic mean of the two.'],
	[
		{ code: 'status' },
		{ code: 'pass | partial | fail' },
		'pass = every expected id matched; partial = some (or no expectations declared); fail = none.'
	],
	[
		{ code: 'failureClasses' },
		{ code: 'no_results, partial_recall, ...' },
		'Diagnostic tags: extra_noise, routing_miss, section / spreadsheet / media / ocr evidence misses.'
	]
];

const groundingMetricRows: DocsTableCell[][] = [
	[
		{ code: 'citationPrecision' },
		{ code: 'matched / cited' },
		'Cited sources that were expected.'
	],
	[
		{ code: 'citationRecall' },
		{ code: 'matched / expected' },
		'Expected sources that were cited.'
	],
	[
		{ code: 'citationF1' },
		{ code: '2pr / (p + r)' },
		'Harmonic mean over citations.'
	],
	[
		{ code: 'resolvedCitationRate' },
		{ code: 'resolved / cited' },
		'Citations that resolve to a real retrieved source.'
	],
	[
		{ code: 'coverage' },
		{ code: 'grounded | partial | ungrounded' },
		'How much of the answer text is backed by citations.'
	]
];

const verdictRows: DocsTableCell[][] = [
	[
		{ code: 'pass' },
		'Gate passed, or no gate and every tracked delta is non-negative.'
	],
	[{ code: 'warn' }, "Gate thresholds missed under severity: 'warn'."],
	[
		{ code: 'fail' },
		"Gate thresholds missed under severity: 'fail' (the default)."
	],
	[
		{ code: 'needs_review' },
		'No gate policy and at least one negative delta — or no baseline verdict derivable.'
	]
];

const storeFamilyRows: DocsTableCell[][] = [
	[
		'Evaluation runs',
		{ code: 'EvaluationHistory, EvaluationSuiteSnapshotHistory' },
		'Suite run history and versioned suite snapshots.'
	],
	[
		'Answer grounding',
		{
			code: 'AnswerGroundingEvaluationHistory, AnswerGroundingCaseDifficultyHistory'
		},
		'Grounding run history and per-case difficulty tracking.'
	],
	[
		'Baselines & comparisons',
		{ code: 'RetrievalBaseline, RetrievalComparisonHistory' },
		'Promoted retrieval baselines and comparison run history.'
	],
	[
		'Release governance',
		{
			code: 'RetrievalReleaseDecision, RetrievalReleaseIncident, *PolicyHistory'
		},
		'Release decisions, incidents, and lane / gate / escalation policy history.'
	],
	[
		'Lane handoffs',
		{
			code: 'RetrievalLaneHandoffDecision, ...Incident, ...IncidentHistory'
		},
		'Handoff decisions and incident lifecycle, plus auto-complete policy history.'
	],
	[
		'Remediations',
		{ code: 'RetrievalIncidentRemediationDecision, ...ExecutionHistory' },
		'Recorded remediation decisions and execution history.'
	],
	[
		'Search traces',
		{ code: 'SearchTrace, SearchTracePruneHistory' },
		'Persisted retrieval traces and prune-run history.'
	]
];

export const RagQualityView = ({
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
					<h1 id="rag-quality" style={h1Style(isMobileOrTablet)}>
						Quality & Access Control
					</h1>
					<p style={paragraphLargeStyle}>
						Retrieval changes should ship against evidence.{' '}
						<code>@absolutejs/rag/quality</code> is an evaluation
						harness — golden-set suites, precision / recall / F1
						scoring, answer-grounding checks, strategy and reranker
						comparisons with release gates — plus file and SQLite
						history stores and a request-scoped access-control layer
						for the chat plugin's mutating routes.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="eval-suites"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Evaluation Suites
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A suite is <code>{'{ id, input: { cases } }'}</code>{' '}
						where each case pairs a query with expectations —{' '}
						<code>expectedChunkIds</code>,{' '}
						<code>expectedSources</code>, or{' '}
						<code>expectedDocumentIds</code> — plus optional hard
						negatives and a golden-set flag. Run it with{' '}
						<code>runRAGEvaluationSuite</code> over any evaluate
						function; <code>evaluateRAGCollection</code> is the
						standard one, and{' '}
						<code>executeDryRunRAGEvaluation</code> produces zeroed
						results for wiring tests.
					</p>
					<DocsTable
						columns={['Function', 'What it does']}
						rows={suiteLifecycleRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragQualitySuite}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Metrics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Retrieval metrics are set-based over the expected id set
						(chunk ids, sources, or document ids — the mode is
						reported per case). The summary aggregates{' '}
						<code>averagePrecision</code>,{' '}
						<code>averageRecall</code>, <code>averageF1</code>, and{' '}
						<code>averageLatencyMs</code>, and the response adds{' '}
						<code>passingRate</code>.
					</p>
					<DocsTable
						columns={['Field', 'Computed as', 'Meaning']}
						rows={retrievalMetricRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>evaluateRAGAnswerGrounding</code> scores answers
						instead of rankings: do the citations in the generated
						text resolve to retrieved sources, and do they cover the
						expected ones?
					</p>
					<DocsTable
						columns={['Field', 'Computed as', 'Meaning']}
						rows={groundingMetricRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Leaderboard ordering"
						variant="info"
					>
						<code>buildRAGEvaluationLeaderboard</code> ranks runs by{' '}
						<code>passingRate</code> descending, then{' '}
						<code>averageF1</code> descending, then{' '}
						<code>averageLatencyMs</code> ascending. The grounding
						leaderboard uses <code>passingRate</code> then{' '}
						<code>averageCitationF1</code>.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="comparisons"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Comparisons & Gates
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>compareRAGRetrievalStrategies</code> runs one
						suite across retrieval candidates (
						<code>
							{'{ id, retrieval?, queryTransform?, rerank? }'}
						</code>
						) and <code>compareRAGRerankers</code> does the same
						across rerankers. A{' '}
						<code>RAGRetrievalBaselineGatePolicy</code> turns the
						baseline-vs-candidate deltas into an explicit gate:
						minimum passing-rate / F1 / cue-case deltas, maximum
						latency regression, with <code>severity</code> deciding
						whether a miss warns or fails.
					</p>
					<DocsTable
						columns={['Verdict', 'When']}
						rows={verdictRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragQualityCompare}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Prebuilt benchmark suites cover recurring regressions:{' '}
						<code>
							createRAGAdaptiveNativePlannerBenchmarkSuite
						</code>
						,{' '}
						<code>
							createRAGNativeBackendComparisonBenchmarkSuite
						</code>
						, <code>createRAGPresentationCueBenchmarkSuite</code>,
						and <code>createRAGSpreadsheetCueBenchmarkSuite</code> —
						each with a paired snapshot factory.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="history-stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						History Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every history surface follows one pattern:{' '}
						<code>createRAGFile*Store(path)</code> for a JSON file,{' '}
						<code>
							createRAGSQLite*Store({'{ db?, path?, tableName? }'}
							)
						</code>{' '}
						for bun:sqlite (defaulting to <code>:memory:</code> with
						a per-store table name). Paired <code>persist*</code>{' '}
						and <code>load*</code> functions write and read runs,
						and every store slot plugs straight into the{' '}
						<code>ragChat</code> config.
					</p>
					<DocsTable
						columns={['Family', 'Stores', 'What it keeps']}
						rows={storeFamilyRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={ragQualityStores}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>inspectRAGSQLiteStoreMigrations</code> reports
						missing columns across store tables and{' '}
						<code>applyRAGSQLiteStoreMigrations</code> adds them —
						run it on deploy when upgrading the package.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="search-traces"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Search Traces
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>searchWithTrace</code> returns the full retrieval
						trace; <code>buildRAGSearchTraceRecord</code> packages
						it with results, labels, group keys, and timing, and{' '}
						<code>persistRAGSearchTraceRecord</code> saves it.{' '}
						<code>buildRAGSearchTraceDiff</code> compares two
						records (added / removed / retained chunk ids, top
						result changes), and{' '}
						<code>summarizeRAGRetrievalTraces</code> aggregates
						across cases.
					</p>
					<p style={paragraphSpacedStyle}>
						Retention is explicit: prune by <code>maxAgeMs</code>,{' '}
						<code>maxRecordsPerQuery</code>, or{' '}
						<code>maxRecordsPerGroup</code> via{' '}
						<code>pruneRAGSearchTraceStore</code>, preview the
						effect first with{' '}
						<code>previewRAGSearchTraceStorePrune</code>, or hand{' '}
						<code>ragChat</code> a{' '}
						<code>searchTraceRetentionSchedule</code> (
						<code>{'{ intervalMs, runImmediately? }'}</code>) and
						let it prune on a timer — runs are tagged{' '}
						<code>manual</code>, <code>write</code>, or{' '}
						<code>schedule</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="access-control"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Access Control
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createRAGAccessControl</code> builds the two hooks
						the chat plugin understands:{' '}
						<code>authorizeRAGAction</code> decides per action —{' '}
						<code>ingest</code>, <code>create_document</code>,{' '}
						<code>delete_document</code>, <code>clear_index</code>,{' '}
						<code>reindex_document</code>,{' '}
						<code>reindex_source</code>, <code>reseed</code>,{' '}
						<code>reset</code>, <code>sync_source</code>,{' '}
						<code>sync_all_sources</code>,{' '}
						<code>list_sync_sources</code>,{' '}
						<code>analyze_backend</code>,{' '}
						<code>rebuild_native_index</code>,{' '}
						<code>manage_retrieval_admin</code>,{' '}
						<code>manage_retrieval_baselines</code>,{' '}
						<code>prune_search_traces</code> — returning a boolean
						or <code>{'{ allowed, reason }'}</code>, and{' '}
						<code>resolveRAGAccessScope</code> restricts what a
						request can see.
					</p>
					<p style={paragraphSpacedStyle}>
						An <code>RAGAccessScope</code> narrows reads and
						mutations to <code>allowedSources</code> /{' '}
						<code>allowedSourcePrefixes</code>,{' '}
						<code>allowedDocumentIds</code>,{' '}
						<code>allowedCorpusKeys</code> and corpus groups,{' '}
						<code>allowedSyncSourceIds</code>,{' '}
						<code>allowedComparisonGroupKeys</code>, plus a{' '}
						<code>requiredMetadata</code> equality filter. There is
						no built-in role model — your <code>authorize</code> and{' '}
						<code>resolveScope</code> callbacks own the policy.
					</p>
					<PrismPlus
						codeString={ragQualityAccessControl}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Deny by omission does not exist"
						variant="warning"
					>
						If <code>authorize</code> is omitted, every action is
						allowed; if <code>resolveScope</code> is omitted,
						nothing is scoped. Wire both for any multi-tenant
						deployment.
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
