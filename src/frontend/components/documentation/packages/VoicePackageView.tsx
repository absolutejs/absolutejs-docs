/* eslint-disable absolute/max-jsxnesting */
import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents } from '../../utils/TableOfContents';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle,
	tableCellStyle,
	tableCodeStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';

type VoicePageId =
	| 'voice'
	| 'voice-adapter-contracts'
	| 'voice-adapters'
	| 'voice-api-reference'
	| 'voice-assistants-tools'
	| 'voice-client-frameworks'
	| 'voice-comparison'
	| 'voice-ecosystem'
	| 'voice-ops-proof'
	| 'voice-route-surfaces'
	| 'voice-runtime'
	| 'voice-tester'
	| 'voice-tester-discord'
	| 'voice-tester-scenarios'
	| 'voice-storage-testing'
	| 'voice-telephony';

type VoiceTable = {
	headers: [string, string];
	rows: Array<[string, string]>;
};

type VoiceSection = {
	body?: string;
	code?: {
		language: string;
		source: string;
	};
	id: string;
	items?: string[];
	table?: VoiceTable;
	title: string;
};

type VoicePageDefinition = {
	description: string;
	id: VoicePageId;
	sections: VoiceSection[];
	title: string;
};

const entrypoints: Array<[string, string]> = [
	[
		'@absolutejs/voice',
		'Server runtime, Elysia plugin, assistants, routing, ops, telephony, proof, storage, and core types.'
	],
	[
		'@absolutejs/voice/angular',
		'Angular injectable services for streams, controllers, widgets, and dashboards.'
	],
	[
		'@absolutejs/voice/client',
		'Browser primitives, stores, Web Components, HTMX bindings, audio players, and dashboard renderers.'
	],
	[
		'@absolutejs/voice/drizzle',
		'Drizzle table schemas for runtime storage, memory, handoff, evals, observability, incidents, and proof trends.'
	],
	['@absolutejs/voice/embed', 'Embeddable browser voice widget ESM entry.'],
	[
		'@absolutejs/voice/embed/voice-widget.js',
		'Prebuilt IIFE widget bundle for script-tag embedding.'
	],
	[
		'@absolutejs/voice/react',
		'React hooks and components for voice widgets, operational dashboards, timelines, and live consoles.'
	],
	[
		'@absolutejs/voice/svelte',
		'Svelte store factories and helper creators for voice UI surfaces.'
	],
	[
		'@absolutejs/voice/testing',
		'Provider simulators, STT/TTS fixtures, benchmarks, resilience harnesses, and review helpers.'
	],
	[
		'@absolutejs/voice/vue',
		'Vue components and composables for the same browser and ops surfaces.'
	]
];

const runtimeOptions: Array<[string, string]> = [
	['amd', 'Answering-machine detection driver for phone routes.'],
	['assistantMode', 'Resolved mode for realtime or split STT/TTS operation.'],
	[
		'audioConditioning',
		'Input normalization, resampling, gating, and conditioning before STT.'
	],
	[
		'bargeInMinPartialWords',
		'Minimum partial transcript word count before cancelling assistant audio.'
	],
	[
		'context',
		'Route/context resolver that builds app-specific session context.'
	],
	[
		'costTelemetry',
		'Cost attribution hooks for provider usage, call runtime, and turn-level accounting.'
	],
	[
		'defaultSilentTurnAck',
		'Spoken acknowledgement for tool-only or otherwise silent assistant turns.'
	],
	['fillerDelayMs', 'Delay before static latency filler is allowed to play.'],
	['fillerFor', 'Content-aware filler callback for short acknowledgements.'],
	['fillerForTimeoutMs', 'Timeout for the content-aware filler callback.'],
	[
		'fillerPhrases',
		'Static latency filler phrases spoken while the assistant response is pending.'
	],
	['greeting', 'Static or per-session first assistant message.'],
	[
		'handoff',
		'Transfer, escalation, voicemail, no-answer, and completion hooks.'
	],
	['htmx', 'Enables HTMX-oriented runtime attributes and responses.'],
	[
		'languageStrategy',
		'Fixed, auto-detect, or allow-switching language plan passed to providers.'
	],
	['lexicon', 'Static or context-resolved pronunciation/domain lexicon.'],
	['liveOps', 'Runtime control-state resolver for live operator actions.'],
	['logger', 'Structured runtime logger hook.'],
	['modalities', 'Audio/text modality list passed to realtime providers.'],
	['monitor', 'Live monitor registry binding for listen/control sockets.'],
	[
		'noiseSuppressor',
		'Optional @absolutejs/media-compatible noise suppressor.'
	],
	['noiseSuppressorFormat', 'AudioFormat expected by the noise suppressor.'],
	[
		'onTurn',
		'Required handler or assistant invocation for committed user turns.'
	],
	['ops', 'Operations task, review, sink, webhook, and event integration.'],
	['path', 'Required WebSocket path for the main voice runtime.'],
	['phraseHints', 'Static or context-resolved STT phrase hints.'],
	[
		'preset',
		'Runtime preset that fills common defaults for profile, language, turn detection, and carrier behavior.'
	],
	[
		'profileSwitchGuard',
		'Runtime guard that audits, blocks, or auto-applies profile-switch recommendations.'
	],
	['prosody', 'TTS speed, pitch, emphasis, and style hints.'],
	['realtime', 'Full-duplex realtime adapter for unified input and output.'],
	[
		'realtimeInputFormat',
		'AudioFormat for realtime input when it differs from the route default.'
	],
	['reconnect', 'Client reconnect/resume behavior and continuity policy.'],
	['recording', 'Recording store and channel capture policy.'],
	[
		'redact',
		'Transcript redactor applied before storage, traces, and sinks.'
	],
	['routeOnTurnTimeoutMs', 'Hard timeout for one onTurn call.'],
	[
		'scenarioId',
		'Scenario identifier used by simulation, proof, and profiles.'
	],
	[
		'semanticTurnDetector',
		'Model or heuristic semantic turn detector for natural turn completion.'
	],
	[
		'session',
		'Required session store used to create, read, update, and persist VoiceSessionRecord values.'
	],
	['sessionMetadata', 'Additional metadata attached to the runtime session.'],
	['stt', 'Streaming speech-to-text adapter used in split STT/TTS mode.'],
	['sttFallback', 'Fallback STT policy for empty or low-confidence turns.'],
	[
		'sttLifecycle',
		'Provider lifecycle hooks for STT session open, events, errors, and close.'
	],
	[
		'trace',
		'Trace event store used by diagnostics, timelines, proofs, and ops.'
	],
	[
		'tts',
		'Streaming text-to-speech adapter used for assistant audio output.'
	],
	[
		'turnDetection',
		'Silence, vendor, manual, semantic, or hybrid end-of-turn policy.'
	]
];

const routeSurfaces: Array<[string, string]> = [
	[
		'assistantHealth',
		'Assistant model, prompt, and tool health report routes.'
	],
	['auditDelivery', 'Audit sink delivery status and retry routes.'],
	['auditTrail', 'Audit event trail report routes.'],
	['bargeIn', 'Barge-in summary and HTML routes.'],
	[
		'browserCallProfile',
		'Browser call profile proof and markdown/HTML routes.'
	],
	['browserMedia', 'Browser media health and capture report routes.'],
	['callDebugger', 'Latest-session debugger and launch surface.'],
	[
		'campaign',
		'Outbound campaign CRUD, worker, proof, and observability routes.'
	],
	['competitiveCoverage', 'Vapi/Retell/Bland-style parity coverage reports.'],
	['dataControl', 'Retention, deletion, and data-control routes.'],
	['deliveryRuntime', 'Delivery runtime status and action routes.'],
	['deliverySink', 'File, S3, Postgres, SQLite, and webhook sink reports.'],
	['demoReady', 'Demo-readiness report route.'],
	['diagnostics', 'Trace-filtered diagnostic markdown routes.'],
	[
		'eval',
		'Scenario eval reports, baselines, trends, and fixture eval routes.'
	],
	['guardrail', 'Guardrail policy evaluation and runtime routes.'],
	['handoffHealth', 'Handoff health and transfer readiness routes.'],
	['htmxDashboard', 'Server-rendered HTMX dashboard routes.'],
	['incidentBundle', 'Incident bundle export, store, and retention routes.'],
	['incidentTimeline', 'Incident event timeline routes.'],
	['liveLatency', 'Live latency sample routes.'],
	['liveMonitor', 'Supervisor listen/control WebSocket routes.'],
	['liveOpsConsole', 'Live operator action and control routes.'],
	['mediaPipeline', 'Media pipeline proof, evidence, and artifact routes.'],
	['monitorReport', 'Synthetic monitor definition and run report routes.'],
	['monitorRunner', 'Monitor runner tick/loop routes.'],
	[
		'observabilityExport',
		'Export bundle creation, validation, and delivery routes.'
	],
	[
		'observabilityExportReplay',
		'Replay validation routes for exported records.'
	],
	['operationalStatus', 'Operational status summary routes.'],
	[
		'operationsRecord',
		'Unified operations record and failure replay routes.'
	],
	['opsActionAudit', 'Operator action audit history routes.'],
	['opsConsole', 'Ops console link/report routes.'],
	['opsRecovery', 'Failed-session recovery and intervention routes.'],
	['opsStatus', 'Ops status summary routes.'],
	['opsWebhookReceiver', 'Integration webhook receiver routes.'],
	['outcomeContract', 'Outcome contract suite and assertion routes.'],
	['phoneAgentProductionSmoke', 'Phone-agent production smoke-test routes.'],
	['platformCoverage', 'Platform surface coverage assertion routes.'],
	['postCallAnalysis', 'Post-call summary, extraction, and scoring routes.'],
	[
		'productionReadiness',
		'Production readiness gates and proof runtime routes.'
	],
	['profileSwitchLiveDecision', 'Live profile-switch decision routes.'],
	['profileSwitchPolicyProof', 'Profile-switch policy proof routes.'],
	['profileSwitchReadiness', 'Profile-switch readiness report routes.'],
	['proofPack', 'Proof pack generation and evidence routes.'],
	['proofTrend', 'Proof trend report routes.'],
	['proofTrendRecommendation', 'Proof trend recommendation routes.'],
	['providerCapability', 'Provider capability matrix routes.'],
	['providerContractMatrix', 'Provider contract matrix routes.'],
	['providerDecisionTrace', 'Provider decision trace routes.'],
	['providerHealth', 'Provider health summary routes.'],
	['providerOrchestration', 'Provider orchestration fit and issue routes.'],
	['providerSlo', 'Provider SLO assertion routes.'],
	['quality', 'Quality report routes.'],
	[
		'realCallEvidenceRuntime',
		'Real-call evidence collection runtime routes.'
	],
	['realCallProfileHistory', 'Real-call profile evidence history routes.'],
	[
		'realCallProfileRecoveryAction',
		'Real-call profile recovery action routes.'
	],
	['realtimeChannel', 'Realtime channel evidence and runtime-sample routes.'],
	['realtimeProviderContract', 'Realtime provider contract matrix routes.'],
	['reconnectContract', 'Reconnect contract report routes.'],
	['reconnectProof', 'Reconnect proof report routes.'],
	['resilience', 'Resilience simulation and routing summary routes.'],
	['sessionList', 'Session list routes.'],
	['sessionObservability', 'Session observability timeline routes.'],
	['sessionReplay', 'Session replay routes.'],
	['sessionSnapshot', 'Session snapshot status routes.'],
	['simulationSuite', 'Simulation suite assertion routes.'],
	['sloCalibration', 'SLO calibration report routes.'],
	['sloReadinessThreshold', 'SLO readiness threshold routes.'],
	['telephonyCarrierMatrix', 'Carrier contract matrix routes.'],
	['telephonyMedia', 'Carrier media proof routes.'],
	['telephonyWebhook', 'Telephony outcome webhook routes.'],
	['telephonyWebhookSecurity', 'Webhook signature/security evidence routes.'],
	['toolContract', 'Tool contract suite routes.'],
	['traceDelivery', 'Trace delivery status routes.'],
	['traceTimeline', 'Trace timeline routes.'],
	['turnLatency', 'Turn latency report routes.'],
	['turnQuality', 'Turn quality report routes.']
];

const adapterPackages: Array<[string, string]> = [
	[
		'@absolutejs/voice-assemblyai',
		'AssemblyAI streaming STT adapter for universal-streaming speech models.'
	],
	[
		'@absolutejs/voice-azure',
		'Azure Speech adapter with Neural TTS over REST and streaming STT over the WebSocket Unified Speech Protocol.'
	],
	[
		'@absolutejs/voice-cartesia',
		'Cartesia streaming TTS adapter using SSE or byte-stream endpoints.'
	],
	[
		'@absolutejs/voice-deepgram',
		'Deepgram streaming STT adapter that normalizes partial, final, and speech_final endpoint events.'
	],
	[
		'@absolutejs/voice-elevenlabs',
		'ElevenLabs streaming TTS adapter, with optional warm WebSocket sessions for lower startup latency.'
	],
	[
		'@absolutejs/voice-gemini',
		'Gemini Live realtime adapter that normalizes input transcripts, output transcripts, assistant audio, turn completion, and errors.'
	],
	[
		'@absolutejs/voice-gladia',
		'Gladia v2 live STT adapter with two-step session handshake and multilingual code-switch support.'
	],
	[
		'@absolutejs/voice-google-speech',
		'Google Cloud Speech-to-Text adapter with buffered REST recognition and real-time HTTP/2 streaming.'
	],
	[
		'@absolutejs/voice-lmnt',
		'LMNT streaming TTS adapter for aurora, blizzard, and mochi models.'
	],
	[
		'@absolutejs/voice-neets',
		'Neets low-cost TTS adapter for ar-diff-50k, style-tts-2, and vits models.'
	],
	[
		'@absolutejs/voice-openai',
		'OpenAI Realtime adapter for full-duplex realtime speech sessions.'
	],
	[
		'@absolutejs/voice-openai-whisper',
		'OpenAI Whisper buffered-batch STT adapter for flush/close transcription.'
	],
	[
		'@absolutejs/voice-playht',
		'PlayHT streaming TTS adapter for Play3.0-mini, PlayDialog, and PlayHT2.0-turbo models.'
	],
	[
		'@absolutejs/voice-rime',
		'Rime streaming TTS adapter for mist, mistv2, and arcana voice models.'
	],
	[
		'@absolutejs/voice-smallest',
		'Smallest AI raw PCM TTS adapter for Lightning and Lightning-v2 models.'
	],
	[
		'@absolutejs/voice-soniox',
		'Soniox real-time STT adapter with language hints and telephony encodings.'
	],
	[
		'@absolutejs/voice-speechmatics',
		'Speechmatics real-time STT adapter for regional WebSocket endpoints.'
	]
];

const adapterCapabilityMatrix: Array<[string, string]> = [
	[
		'Realtime STT',
		'Deepgram, AssemblyAI, Azure, Gladia, Google Speech streaming, Soniox, and Speechmatics implement STTAdapter sessions.'
	],
	[
		'Buffered STT',
		'OpenAI Whisper and googleSpeech() accumulate audio and emit a final transcript on flush or close.'
	],
	[
		'TTS',
		'Azure, Cartesia, ElevenLabs, LMNT, Neets, PlayHT, Rime, and Smallest implement TTSAdapter sessions.'
	],
	[
		'Full realtime',
		'OpenAI Realtime and Gemini Live implement RealtimeAdapter for unified input audio, transcripts, assistant audio, and turn completion.'
	],
	[
		'Telephony encodings',
		'Gladia, Google Speech, Soniox, Speechmatics, and Azure document μ-law or A-law support in addition to PCM paths.'
	],
	[
		'Language control',
		'Provider options and STTAdapterOpenOptions.languageStrategy resolve fixed languages, allow-switching lists, or auto-detect hints where the provider supports them.'
	],
	[
		'Endpointing',
		'Adapters normalize vendor endpoint events such as Deepgram speech_final, Gladia end_of_utterance, Google speech activity events, Azure turn.end, and Speechmatics end-of-turn events.'
	],
	[
		'Auth',
		'Most adapters accept API keys; Azure also supports token auth, and Google Speech supports API key, OAuth, or refresh hooks.'
	]
];

const testerModes: Array<[string, string]> = [
	[
		'twilio-ws',
		'Default mode. Opens a WebSocket directly to a Twilio Media Streams-compatible /stream endpoint and simulates the caller side without a real phone call.'
	],
	[
		'discord',
		'Joins a Discord voice channel as a separate tester bot, sends Aura TTS as Opus, receives the bot-under-test audio, and transcribes it through STT.'
	],
	[
		'twilio-outbound',
		'Originates a real outbound Twilio call through a temporary public webhook server so the test includes the carrier audio path.'
	]
];

const comparisonPlatforms: Array<[string, string]> = [
	[
		'Vapi',
		'Developer voice-agent platform for phone and web calls with assistants, squads, tools, provider choice, observability, evals, simulations, scorecards, outbound campaigns, chat, workflows, CLI, and SDKs.'
	],
	[
		'Retell AI',
		'Hosted/no-code voice automation platform focused on natural phone agents, scheduling, transfers, post-call analysis, workflows, CRM integrations, real-time analytics, scoring, and QA.'
	],
	[
		'Bland AI',
		'Enterprise AI phone-call platform with conversational pathways, call logs, custom Twilio integration, webhooks, batch calls, testbed, voice cloning, and enterprise deployment positioning.'
	],
	[
		'Synthflow',
		'No-code voice/chat agent platform organized around building, evaluating, launching, and learning from agents across voice and chat workflows.'
	],
	[
		'Raw provider stack',
		'Direct STT, LLM, TTS, and telephony vendors give maximum component control, but teams must build session state, barge-in, ops, testing, routing, storage, and proof themselves.'
	]
];

const comparisonMatrix: Array<[string, string]> = [
	[
		'Hosting model',
		'AbsoluteJS Voice is self-hosted in your Elysia app. Vapi, Retell, Bland, and Synthflow are primarily hosted platforms, with varying enterprise deployment options.'
	],
	[
		'Provider control',
		'AbsoluteJS keeps STT, TTS, realtime, model, telephony, storage, and routing as explicit adapters. Hosted platforms usually optimize speed-to-launch by abstracting more of that stack.'
	],
	[
		'Phone and web',
		'AbsoluteJS covers browser streams, embeds, framework widgets, Twilio/Telnyx/Plivo-style telephony, phone agents, webhooks, and campaigns; Vapi similarly documents phone and web voice paths.'
	],
	[
		'Conversation design',
		'AbsoluteJS has assistants, agents, squads, tools, RAG, MCP, Vapi import, pathways, slot collection, IVR plans, workflow contracts, outcome contracts, and simulation suites.'
	],
	[
		'Testing',
		'AbsoluteJS includes in-package simulators plus @absolutejs/voice-tester for Twilio WS, Discord, and outbound-call regression tests. Hosted tools often provide dashboards, testbeds, evals, or simulations, but not the same local package-level harness.'
	],
	[
		'Operations',
		'AbsoluteJS exposes audit trails, delivery sinks, delivery runtime, live ops, monitors, incidents, operations records, proof packs, SLOs, provider contracts, data control, retention, and observability export as app-owned routes.'
	],
	[
		'Migration',
		'AbsoluteJS includes fromVapiAssistantConfig() and Vapi-compatible tool concepts so teams can import assistant definitions and keep unsupported fields visible for manual review.'
	],
	[
		'Buyer tradeoff',
		'Choose hosted platforms for fastest vendor-managed launch. Choose AbsoluteJS when code ownership, provider portability, proof artifacts, custom operations, framework-native UI, or data residency matter more.'
	]
];

const comparisonDeepMatrix: Array<[string, string]> = [
	[
		'Agent authoring',
		'Vapi emphasizes Assistants and Squads, Retell emphasizes configurable/no-code agents and conversation flows, Bland emphasizes Conversational Pathways, Synthflow emphasizes visual flow design, and AbsoluteJS provides code-first assistants, agents, squads, pathways, workflow contracts, outcome contracts, tools, RAG, MCP, and Vapi import.'
	],
	[
		'Deterministic flows',
		'Bland Pathways and Synthflow flow designers are dashboard-first. Vapi retains workflow docs but recommends Assistants or Squads for new builds. AbsoluteJS keeps deterministic flow primitives in code through VoicePathway, compiler/runtime/generator/visualizer, slot collector, IVR plans, tool contracts, and workflow contracts.'
	],
	[
		'Realtime conversation path',
		'Vapi documents sub-600 ms realtime positioning and provider choice. Retell positions natural phone conversations around fast model releases. AbsoluteJS gives direct realtime adapters for OpenAI and Gemini plus cascaded STT/TTS routes where every adapter and latency tradeoff is explicit.'
	],
	[
		'Phone deployment',
		'Vapi and Retell expose phone-call APIs and dashboard flows. Bland focuses heavily on phone-call automation and call logs. Synthflow supports phone numbers, SIP trunking, and telephony integrations. AbsoluteJS exposes phone-agent routes, Twilio/Telnyx/Plivo helpers, webhook security, phone provisioning, carrier matrices, DTMF, AMD, campaigns, and telephony proof routes.'
	],
	[
		'Web deployment',
		'Vapi and Synthflow document web/widget paths. Bland call logs cover web/SMS/voice channels. AbsoluteJS ships browser streams, an embed bundle, Web Components, HTMX, and first-party React, Vue, Svelte, and Angular wrappers against the same runtime.'
	],
	[
		'Knowledge and retrieval',
		'Retell documents knowledge bases from URLs, documents, and text with retrieval settings. Vapi and hosted platforms expose knowledge/tooling patterns. AbsoluteJS uses createVoiceRAGTool(), MCP toolsets, API request tools, citations, assistant memory, caller memory, and app-owned RAG collections.'
	],
	[
		'Testing model',
		'Vapi exposes evals and simulations. Bland has a testbed that replays historical call context and promotes standards/regression tests. Synthflow documents phone/chat/widget/simulation testing. AbsoluteJS combines in-package simulators and fixtures with @absolutejs/voice-tester for Twilio WS, Discord voice, outbound Twilio, LLM-driven caller behavior, and JSON reports.'
	],
	[
		'Observability and QA',
		'Vapi documents observability, scorecards, monitoring, boards, and structured outputs. Retell exposes post-call analysis categories and result consumption via dashboard, webhook, and API. Bland call logs include transcripts, recordings, extracted variables, per-turn decision data, review status, outcomes, and testbed links. AbsoluteJS exposes traces, replay, observability export, call debugger, session snapshots, scorecards, evals, quality drift, proof packs, incidents, operations records, SLOs, and delivery sinks as routes.'
	],
	[
		'Campaigns and outbound scale',
		'Vapi has outbound campaigns. Retell has batch calls with scheduling, time windows, metrics, and per-call history. Bland documents batch calls and high-scale phone automation. AbsoluteJS has campaign stores, templates, controls, workers, dialers, campaign readiness/proof, DNC registry, calling windows, quotas, no-show prediction, reminders, and telephony outcome recorders.'
	],
	[
		'Data and compliance ownership',
		'Hosted platforms can package compliance, dashboards, and managed infrastructure. AbsoluteJS gives direct ownership of stores, retention, redaction, zero-data-retention mode, data-control routes, audit export, recording redaction, webhook verification, and observability export in the app.'
	],
	[
		'Extensibility boundary',
		'Hosted platforms are easiest when their extension points match your use case. AbsoluteJS is strongest when voice needs to share app auth, local data models, internal queues, domain-specific UIs, custom provider routing, private storage, or release gates.'
	]
];

const competitorDeepDives: Array<[string, string]> = [
	[
		'Vapi',
		'Closest developer-platform analogue. Strong comparison axes are assistants, squads, phone/web calls, provider choice, tools, observability, evals, simulations, scorecards, campaigns, chat, workflows, CLI, and SDKs. AbsoluteJS should be positioned as the code-owned/self-hosted alternative with comparable primitives plus app-owned proof, stores, framework UI, provider contracts, and migration helpers.'
	],
	[
		'Retell AI',
		'Strong dashboard/no-code phone automation comparison. Key axes are natural phone agents, phone APIs, batch calls, knowledge bases, post-call analysis categories, webhook/API/dashboard consumption, workflows, transfers, CRM integration, real-time analytics, scoring, and QA. AbsoluteJS competes when the team wants those concepts in app code with explicit providers and stores.'
	],
	[
		'Bland AI',
		'Strong enterprise phone/pathway comparison. Key axes are Conversational Pathways, node-level control, webhooks during calls, knowledge base, call logs with transcript/audio/variables/per-turn decision data, review workflows, outcomes, batch calls, testbed, and standards/regression testing. AbsoluteJS competes with code-defined pathways plus proof routes, simulations, voice-tester, and self-owned operations records.'
	],
	[
		'Synthflow',
		'Strong no-code lifecycle comparison. Key axes are BELL lifecycle, call-flow designer, knowledge base, actions, simulations, custom evaluations, deployment through phone/SIP/API/web widgets, webhooks, integrations, logs, release management, and continuous improvement. AbsoluteJS competes when teams want that lifecycle implemented as typed routes, tests, stores, and framework-native components.'
	],
	[
		'Raw provider stack',
		'Strongest comparison for infra-minded teams. Raw Deepgram/OpenAI/ElevenLabs/Twilio-style stacks maximize component choice but leave app teams to build turn taking, barge-in, sessions, tools, observability, testing, campaign logic, compliance evidence, dashboards, and replay. AbsoluteJS exists to keep provider control while filling those platform gaps.'
	]
];

const buyerQuestions: Array<[string, string]> = [
	[
		'How fast do we need to launch?',
		'Hosted platforms usually win dashboard-first pilots. AbsoluteJS wins when launch speed must still preserve code ownership, app auth, app data models, and custom UI.'
	],
	[
		'Who owns runtime data?',
		'If transcripts, recordings, audit events, trace events, delivery records, and proof artifacts must stay in your infrastructure, AbsoluteJS is a better architectural fit.'
	],
	[
		'How much provider control matters?',
		'If you need to switch STT, TTS, realtime, LLM, telephony, storage, or routing policies independently, AbsoluteJS makes those provider decisions explicit.'
	],
	[
		'How will we test regressions?',
		'If QA requires repeatable synthetic calls, Discord bot testing, outbound carrier-path tests, scenario reports, fixtures, simulators, and release assertions, AbsoluteJS has deeper code-level hooks.'
	],
	[
		'Do we need a visual builder?',
		'If non-engineers need to own most call-flow changes, hosted visual platforms may fit better. If engineers own workflows and need reviewable code, AbsoluteJS pathways and assistants fit better.'
	],
	[
		'Do we need product UI inside our app?',
		'AbsoluteJS is stronger when operations, proof, call player, live console, provider health, replay, and dashboards need to live inside the product through React, Vue, Svelte, Angular, HTMX, Web Components, or embeds.'
	],
	[
		'What is the migration path?',
		'AbsoluteJS has direct Vapi assistant import helpers and a documented approach for translating Retell/Bland/Synthflow concepts into assistants, pathways, tools, knowledge sources, telephony routes, and proof gates.'
	]
];

const fullSweepFeatureMap: Array<[string, string]> = [
	[
		'Agent and workflow logic',
		'Assistants, agents, squads, model routing, tools, RAG, MCP, Vapi import, pathways, pathway compiler/runtime/generator/visualizer, pathway slot collector, IVR plans, outcome recipes, workflow contracts, and tool contracts.'
	],
	[
		'Voice runtime',
		'Reconnect, barge-in, cached TTS, filler audio, audio conditioning, noise suppression, semantic turns, turn profiles, correction, scribe, recording, redaction, prompt-injection guard, guardrails, and zero-data-retention controls.'
	],
	[
		'Telephony and outbound',
		'Twilio, Telnyx, Plivo, phone agents, phone provisioning, carrier matrices, media proof, webhook verification, DTMF, AMD, hold audio, whisper channel, backchannel, live coach, supervisor presence, campaigns, dialers, DNC registry, calling windows, call quotas, no-show prediction, reminders, and telephony outcome policy.'
	],
	[
		'Business systems',
		'Caller memory, assistant memory, CRM caller linking, CRM call logging, CRM contracts, calendar adapters, calendar slots, booking flows, variable analytics, cost accounting, cost prediction, post-call analysis, post-call surveys, transcript annotation, call disposition, call scorecards, AI scorecards, calibration, and quality drift detection.'
	],
	[
		'Production proof',
		'Production readiness, readiness profiles, proof assertions, proof runner, proof packs, proof trends, provider health, provider orchestration, provider decision traces, provider router traces, provider SLOs, provider stack recommendations, provider contract matrices, platform coverage, competitive coverage, realtime provider contracts, reconnect contracts, multilingual proof, resilience, diagnostics, trace timelines, incident bundles, and operations records.'
	],
	[
		'Client and framework surfaces',
		'Core browser client, microphone capture, duplex controller, reactive sources, HTMX, Web Components, embed bundle, React, Vue, Svelte, Angular, dashboards, live call viewer, live agent console, call player, cost dashboard, provider dashboards, replay timeline, proof trends, turn quality, turn latency, routing status, session observability, and session snapshots.'
	],
	[
		'Storage and delivery',
		'Memory, file, S3, SQLite, Postgres, Drizzle runtime storage, recording stores, audit stores, trace stores, ops stores, delivery sinks, audit delivery, trace delivery, observability export, OpenTelemetry export, retention, data control, and webhook fanout.'
	],
	[
		'Testing ecosystem',
		'Core testing helpers, fixtures, provider simulators, I/O simulators, STT/TTS testing, duplex testing, resilience testing, accuracy benchmarks, session benchmarks, telephony tests, corrected transcript tests, voice-tester scenarios, Twilio WS transport, Discord transport, outbound Twilio transport, Aura TTS, Deepgram STT, LLM caller decisions, and μ-law utilities.'
	]
];

const codeSamples: Record<
	| 'adapters'
	| 'assistant'
	| 'channelDefaults'
	| 'client'
	| 'clientStream'
	| 'competitiveCoverage'
	| 'deliveryRuntime'
	| 'discordTester'
	| 'install'
	| 'minimal'
	| 'monitor'
	| 'phone'
	| 'providerRoute'
	| 'testerApi'
	| 'testerCli'
	| 'testerScenario'
	| 'storage',
	string
> = {
	adapters:
		'import { voice } from "@absolutejs/voice";\nimport { deepgram } from "@absolutejs/voice-deepgram";\nimport { elevenlabs } from "@absolutejs/voice-elevenlabs";\nimport { openAIRealtime } from "@absolutejs/voice-openai";\n\napp\n\t.use(voice({\n\t\tpath: "/voice/intake",\n\t\tsession,\n\t\tstt: deepgram({ apiKey: process.env.DEEPGRAM_API_KEY! }),\n\t\ttts: elevenlabs({ apiKey: process.env.ELEVENLABS_API_KEY!, voiceId }),\n\t\tonTurn\n\t}))\n\t.use(voice({\n\t\tpath: "/voice/realtime",\n\t\tsession,\n\t\trealtime: openAIRealtime({\n\t\t\tapiKey: process.env.OPENAI_API_KEY!,\n\t\t\tmodel: "gpt-4o-realtime-preview"\n\t\t})\n\t}));',
	assistant:
		'import { createVoiceAssistant, createVoiceRAGTool } from "@absolutejs/voice";\n\nconst assistant = createVoiceAssistant({\n\tid: "support",\n\tsystem: "You are a concise support agent.",\n\tmodel,\n\ttools: [createVoiceRAGTool(collection)]\n});',
	channelDefaults:
		'import { createVoiceConfiguration, voice } from "@absolutejs/voice";\n\nconst channelDefaults = (channelPath: string) => ({\n\tcorrectTurn,\n\thandoff: handoffAdapters.length > 0 ? { adapters: handoffAdapters, deliveryQueue } : undefined,\n\tliveOps: liveOpsRuntime,\n\tonTurn: contractAwareOnTurn,\n\tops: assistant.ops,\n\tpreset: "reliability" as const,\n\tprofileSwitchGuard: createProfileSwitchGuard(channelPath),\n\tsession: sessionStore,\n\tonComplete: async ({ session }) => persistIntake(buildSavedIntake(session)),\n\tphraseHints: async ({ context, sessionId }) => {\n\t\tawait rememberSessionRoutingMode({ context, sessionId });\n\t\treturn VOICE_DEMO_PHRASE_HINTS;\n\t}\n});\n\nexport const voiceConfig = createVoiceConfiguration({\n\t...channelDefaults("/voice/intake"),\n\tpath: "/voice/intake",\n\tstt,\n\ttts,\n\thtmx: renderSavedIntakeHtmx\n});\n\napp.use(voice(voiceConfig));',
	client: 'import { VoiceWidget, useVoiceOpsStatus } from "@absolutejs/voice/react";\n\nexport function VoicePanel() {\n\tconst ops = useVoiceOpsStatus({ url: "/api/voice/ops/status" });\n\n\treturn <VoiceWidget url="wss://api.example.com/voice/realtime" />;\n}',
	clientStream:
		'import { useVoiceStream } from "@absolutejs/voice/react";\nimport { createVoiceStream } from "@absolutejs/voice/client";\n\nconst reconnectReportPath = "/api/voice/reconnect-traces";\n\nconst reactVoice = useVoiceStream<SavedIntake>(\n\tgetVoiceRoutePath("guided", provider, routing, engine, profileId, sessionId),\n\t{ reconnectReportPath }\n);\n\nconst vanillaVoice = createVoiceStream<SavedIntake>(\n\tgetVoiceRoutePath("general", provider, routing, engine, profileId),\n\t{ reconnectReportPath }\n);',
	competitiveCoverage:
		'import {\n\tassertVoiceCompetitiveCoverage,\n\tbuildVoiceCompetitiveCoverageReport,\n\tcreateVoiceCompetitiveCoverageRoutes\n} from "@absolutejs/voice";\n\nconst report = buildVoiceCompetitiveCoverageReport({\n\tsource: "release-check",\n\tsurfaces: [\n\t\t{\n\t\t\tbuyerNeed: "Can we prove parity against hosted phone-agent platforms?",\n\t\t\tcompetitors: ["Vapi", "Retell", "Bland", "Synthflow"],\n\t\t\tcoverage: "covered",\n\t\t\tdepth: "advantage",\n\t\t\tevidence: [{ kind: "proof", name: "proof-pack", required: true, status: "pass" }],\n\t\t\toperationsRecord: "linked",\n\t\t\treadinessGate: "present",\n\t\t\tsurface: "production-proof",\n\t\t\twhy: "Readiness, provider contracts, simulations, incidents, and delivery records are app-owned routes."\n\t\t}\n\t]\n});\n\nassertVoiceCompetitiveCoverage(report, {\n\tminAdvantageSurfaces: 1,\n\trequireOperationsRecordLinks: true,\n\trequireReadinessGates: true\n});\n\napp.use(createVoiceCompetitiveCoverageRoutes({ source: report }));',
	deliveryRuntime:
		'const deliverySinkDescriptors = createVoiceDeliverySinkPair({\n\tauditHref: "/audit/deliveries",\n\tauditId: "demo-file-audit-sink",\n\tauditLabel: "File audit sink",\n\tdescription: "Demo sink selected by VOICE_DELIVERY_SINK.",\n\tkind: "file",\n\tmode: "file",\n\ttarget: `file://${runtimeDirectory}`,\n\ttraceHref: "/traces/deliveries",\n\ttraceId: "demo-file-trace-sink",\n\ttraceLabel: "File trace sink"\n});\n\nvoice({\n\t// ...runtime config\n\tdeliverySink: {\n\t\tauditDeliveries: { href: "/audit/deliveries", store: runtime.auditDeliveries },\n\t\tsinks: deliverySinkDescriptors,\n\t\ttraceDeliveries: { href: "/traces/deliveries", store: runtime.traceDeliveries }\n\t},\n\tdeliveryRuntime: { runtime: deliveryRuntimeControl }\n});',
	discordTester:
		'import { runScenario } from "@absolutejs/voice-tester";\nimport { adversarialScenario } from "@absolutejs/voice-tester/scenarios";\nimport { discordVoiceTransport } from "@absolutejs/voice-tester/discord";\n\nconst transport = await discordVoiceTransport({\n\ttoken: process.env.DISCORD_TESTER_TOKEN!,\n\tguildId: "1234567890",\n\tchannelId: "9876543210",\n\ttargetUserId: "1122334455"\n});\n\nconst report = await runScenario({\n\ttransport,\n\tscenario: adversarialScenario({ llm: {} }),\n\ttts: { apiKey: process.env.DEEPGRAM_API_KEY! },\n\tstt: { apiKey: process.env.DEEPGRAM_API_KEY! }\n});',
	install: 'bun add @absolutejs/voice elysia',
	minimal:
		'import { Elysia } from "elysia";\nimport { createVoiceMemoryStore, voice } from "@absolutejs/voice";\n\nconst sessions = createVoiceMemoryStore();\n\nexport const app = new Elysia().use(\n\tvoice({\n\t\tpath: "/voice/realtime",\n\t\tsession: sessions,\n\t\tstt,\n\t\ttts,\n\t\tgreeting: "Hi, how can I help?",\n\t\tcontext: async ({ session }) => ({ sessionId: session.id }),\n\t\tonTurn: async (session, turn, api) => {\n\t\t\tawait api.say(`You said: ${turn.text}`);\n\t\t}\n\t})\n);',
	monitor:
		'import {\n\tcreateVoiceInMemoryMonitorRegistry,\n\tcreateVoiceLiveMonitorRoutes,\n\tcreateVoiceMonitorRuntimeBinding,\n\tvoice\n} from "@absolutejs/voice";\n\nconst registry = createVoiceInMemoryMonitorRegistry();\n\napp\n\t.use(voice({\n\t\tpath: "/voice/realtime",\n\t\tsession,\n\t\tstt,\n\t\ttts,\n\t\tmonitor: createVoiceMonitorRuntimeBinding(registry)\n\t}))\n\t.use(createVoiceLiveMonitorRoutes({ registry, authenticate }));',
	phone: 'import {\n\tcreateVoicePhoneAgentRoutes,\n\tcreateVoiceTwilioPhoneAgentCarrier\n} from "@absolutejs/voice";\n\napp.use(createVoicePhoneAgentRoutes({\n\tcarrier: createVoiceTwilioPhoneAgentCarrier({ accountSid, authToken }),\n\tvoicePath: "/voice/realtime"\n}));',
	providerRoute:
		'export const getVoiceRoutePath = (\n\tscenarioId: "guided" | "general",\n\tprovider?: "openai" | "anthropic" | "gemini" | "deterministic",\n\trouting?: "balanced" | "fastest" | "cheapest" | "quality",\n\tengine: "cascaded" | "openai-realtime" = "cascaded",\n\tprofileId?: string,\n\tsessionId?: string\n) => {\n\tconst params = new URLSearchParams({ scenarioId });\n\tif (provider) params.set("provider", provider);\n\tif (routing) params.set("routing", routing);\n\tif (profileId) params.set("voiceProfile", profileId);\n\tif (sessionId) params.set("sessionId", sessionId);\n\tconst path = engine === "openai-realtime" ? "/voice/realtime" : "/voice/intake";\n\treturn `${path}?${params.toString()}`;\n};',
	storage:
		'import { createWriteBehindCache } from "@absolutejs/sync";\nimport { createVoiceDrizzleRuntimeStorage } from "@absolutejs/voice/drizzle";\n\nconst runtimeStorage = createVoiceDrizzleRuntimeStorage({ db });\nconst sessionCache = createWriteBehindCache<string, VoiceSessionRecord>({\n\tevict: (value) => value.status === "completed" || value.status === "failed",\n\tload: (id) => runtimeStorage.session.get(id),\n\tpersist: (id, value) => runtimeStorage.session.set(id, value),\n\tremove: (id) => runtimeStorage.session.remove(id)\n});\n\nexport const sessionStore = {\n\tget: (id) => sessionCache.get(id),\n\tgetOrCreate: async (id) => (await sessionCache.get(id)) ?? runtimeStorage.session.getOrCreate(id),\n\tlist: () => runtimeStorage.session.list(),\n\tremove: (id) => sessionCache.delete(id),\n\tset: async (id, value) => sessionCache.set(id, value)\n};',
	testerApi:
		'import { runTwilioScenario } from "@absolutejs/voice-tester";\nimport { adversarialScenario } from "@absolutejs/voice-tester/scenarios";\n\nconst report = await runTwilioScenario({\n\twsUrl: "wss://example.com/v1/voice/phone/stream",\n\ttts: { apiKey: process.env.DEEPGRAM_API_KEY! },\n\tstt: { apiKey: process.env.DEEPGRAM_API_KEY! },\n\tscenario: adversarialScenario({\n\t\tllm: { model: "claude-haiku-4-5-20251001" }\n\t}),\n\tcustomParameters: {\n\t\tsessionId: `phone:+15555550100:${Date.now()}`\n\t},\n\tfrom: "+15555550100",\n\tto: "+15555550199"\n});\n\nif (report.endedReason === "error") {\n\tthrow new Error(report.error?.message ?? "scenario failed");\n}',
	testerCli:
		'bun x @absolutejs/voice-tester \\\n\t--target wss://example.com/v1/voice/phone/stream \\\n\t--scenario adversarial \\\n\t--duration 90 \\\n\t--from +15555550100 \\\n\t--to +15555550199 \\\n\t--session phone:+15555550100:$(date +%s)',
	testerScenario:
		'import type { Scenario } from "@absolutejs/voice-tester";\n\nexport const pricingScenario: Scenario = {\n\tid: "pricing-question",\n\tmaxDurationMs: 60_000,\n\tidleMs: 1200,\n\tdecide: async ({ lastServiceUtterance, callerTurnCount }) => {\n\t\tif (callerTurnCount >= 5) return { type: "hangup", reason: "done" };\n\t\tif (lastServiceUtterance?.toLowerCase().includes("price")) {\n\t\t\treturn { type: "speak", text: "Is there a free trial?" };\n\t\t}\n\t\treturn { type: "speak", text: "Tell me more." };\n\t}\n};'
};

const voicePages: Record<VoicePageId, VoicePageDefinition> = {
	voice: {
		description:
			'Self-hosted voice operations for AbsoluteJS: realtime browser voice, phone-call routes, provider routing, assistants, handoffs, traces, evals, readiness proof, storage adapters, and framework-native UI helpers.',
		id: 'voice',
		sections: [
			{
				code: { language: 'bash', source: codeSamples.install },
				id: 'install',
				title: 'Install'
			},
			{
				id: 'entrypoints',
				table: {
					headers: ['Entrypoint', 'Purpose'],
					rows: entrypoints
				},
				title: 'Entrypoints'
			},
			{
				body: 'Mount voice() on an Elysia app, provide a session store, wire either realtime or STT/TTS adapters, and implement onTurn.',
				code: { language: 'typescript', source: codeSamples.minimal },
				id: 'quickstart',
				title: 'Quickstart'
			},
			{
				body: 'The full example app uses one shared channelDefaults() factory and spreads it into browser intake, OpenAI Realtime, and telephony bridge routes. That keeps phrase hints, correction, handoff, live ops, assistant ops, profile switching, session storage, and completion persistence consistent across channels.',
				code: {
					language: 'typescript',
					source: codeSamples.channelDefaults
				},
				id: 'example-pattern',
				title: 'Example App Pattern'
			},
			{
				id: 'feature-map',
				items: [
					'Runtime: voice(), createVoiceSession(), adapter contracts, reconnect, turn detection, filler audio, barge-in, conditioning, noise suppression.',
					'Assistants: createVoiceAssistant(), defineVoiceAssistant(), agents, squads, model adapters, MCP, RAG, named Vapi-compatible tools.',
					'Conversation flows: pathways, pathway compiler/runtime/generator/visualizer, slot collector, IVR plan, outcome recipes, workflow contracts, and tool contracts.',
					'Telephony: Twilio, Telnyx, Plivo, webhooks, carrier matrices, media proof, campaign dialers, phone agents, DTMF, AMD, hold audio, whisper channel, and backchannel.',
					'Outbound operations: campaigns, templates, controls, DNC registry, calling windows, call quotas, no-show prediction, booking flow, calendar slots, and reminder scheduling.',
					'Business intelligence: caller memory, assistant memory, CRM linking/logging/contracts, cost accounting, cost prediction, post-call analysis, scorecards, transcript annotation, and quality drift detection.',
					'Operations: audit trail, ops runtime, live ops, monitors, incidents, delivery sinks, recovery, webhooks, operations records.',
					'Proof: production readiness, SLOs, channel contracts, provider contracts, competitive coverage, media proof, simulation suites, multilingual STT, proof trends, real-call evidence.',
					'UI: browser controllers, Web Components, HTMX, React, Vue, Svelte, Angular, dashboards, timelines, call player, live-agent console.'
				],
				title: 'Feature Map'
			},
			{
				id: 'full-sweep-map',
				table: {
					headers: ['Feature Family', 'Included Surfaces'],
					rows: fullSweepFeatureMap
				},
				title: 'Full Sweep Feature Map'
			}
		],
		title: '@absolutejs/voice'
	},
	'voice-adapter-contracts': {
		description:
			'How provider adapters satisfy the @absolutejs/voice STT, TTS, and realtime contracts, including audio formats, endpointing, language strategy, and cancellation semantics.',
		id: 'voice-adapter-contracts',
		sections: [
			{
				id: 'stt-contract',
				items: [
					'STT adapters expose open() and return a session that receives audio chunks and emits partial, final, endOfTurn, error, and close events.',
					'Provider-specific endpointing is normalized into endOfTurn so runtime turn detection can combine vendor, silence, semantic, or manual policies.',
					'Adapters should reject unsupported encodings at open time instead of accepting audio that the provider cannot decode.',
					'The voice runtime may replay buffered user audio to fallback STT providers when the primary provider returns empty, late, or low-confidence results.'
				],
				title: 'STTAdapter'
			},
			{
				id: 'tts-contract',
				items: [
					'TTS adapters expose open() and return a session that receives assistant text and emits normalized audio chunks, errors, and close events.',
					'Streaming TTS adapters should forward chunks as soon as the vendor body produces them so playback can start before the full utterance is generated.',
					'Adapters that support warm sessions or WebSocket transports can reduce first-audio latency for repeated turns.',
					'Optional cancel() support lets the runtime stop assistant audio during barge-in.'
				],
				title: 'TTSAdapter'
			},
			{
				id: 'realtime-contract',
				items: [
					'Realtime adapters accept user audio or text and emit input transcripts, assistant transcripts, assistant audio, turn completion, errors, and close events.',
					'OpenAI Realtime currently enforces pcm16 input at 24 kHz; the adapter validates that audio before send().',
					'Gemini Live normalizes Gemini WebSocket events into the same RealtimeAdapter surface so the runtime route does not need provider-specific logic.',
					'Realtime routes can coexist with cascaded STT/TTS routes under separate paths such as /voice/realtime and /voice/intake.'
				],
				title: 'RealtimeAdapter'
			},
			{
				id: 'language-and-formats',
				items: [
					'AudioFormat carries encoding, sample rate, and channel count; documented encodings include pcm_s16le, pcm_f32le, mulaw, pcm_mulaw, alaw, and pcm_alaw depending on provider.',
					'languageStrategy resolves fixed, auto-detect, or allow-switching behavior before the adapter opens its provider session.',
					'phraseHints and lexicon values are runtime-level inputs that adapters can map to provider-specific boosting, keyword, glossary, or vocabulary fields.',
					'Telephony bridges usually prefer μ-law at 8 kHz at the carrier edge, while browser and realtime routes often use PCM at higher sample rates.'
				],
				title: 'Language And Formats'
			}
		],
		title: 'Adapter Contracts'
	},
	'voice-adapters': {
		description:
			'Provider packages from ~/abs/voice-adapters. These independently versioned packages plug Deepgram, AssemblyAI, Azure, Gladia, Google Speech, Soniox, Speechmatics, OpenAI, Gemini, ElevenLabs, Cartesia, LMNT, Neets, PlayHT, Rime, and Smallest into the core voice runtime.',
		id: 'voice-adapters',
		sections: [
			{
				body: 'Install the core voice package plus the provider packages your route needs. Cascaded routes usually provide stt and tts. Realtime routes provide realtime.',
				code: { language: 'typescript', source: codeSamples.adapters },
				id: 'usage',
				title: 'Usage'
			},
			{
				id: 'packages',
				table: {
					headers: ['Package', 'Purpose'],
					rows: adapterPackages
				},
				title: 'Packages'
			},
			{
				id: 'capabilities',
				table: {
					headers: ['Capability', 'Providers'],
					rows: adapterCapabilityMatrix
				},
				title: 'Capability Matrix'
			},
			{
				id: 'provider-selection',
				items: [
					'Use Deepgram, AssemblyAI, Gladia, Soniox, Speechmatics, Azure, or Google streaming when you want separate STT and TTS providers and full control over the assistant loop.',
					'Use OpenAI Realtime or Gemini Live when you want one provider to manage realtime input, output audio, and conversational timing.',
					'Use OpenAI Whisper or googleSpeech() for buffered post-call, short-utterance, or validation workflows where a final transcript is enough.',
					'Use Azure when a single cloud vendor for both STT and TTS is more important than mixing specialized providers.',
					'Use Cartesia, ElevenLabs, LMNT, PlayHT, Rime, Smallest, or Neets when TTS voice quality, speed, cost, or model personality is the primary routing decision.'
				],
				title: 'Provider Selection'
			},
			{
				id: 'environment',
				items: [
					'Each adapter keeps provider secrets out of the core voice config; pass API keys, tokens, project IDs, regions, voice IDs, and model names to the adapter factory.',
					'Azure supports subscription-key or token auth and region-specific base URLs for sovereign clouds or private endpoints.',
					'Google Speech supports API key, OAuth, or refresh-hook based auth and can override authority/path for proxies.',
					'Discord and Twilio testing are handled by @absolutejs/voice-tester rather than by provider adapters.'
				],
				title: 'Environment And Auth'
			}
		],
		title: 'Voice Adapters'
	},
	'voice-api-reference': {
		description:
			'Where to find the exhaustive public contract for every exported function, option, report, route options object, status union, store, adapter, and framework wrapper.',
		id: 'voice-api-reference',
		sections: [
			{
				body: 'VOICE_PACKAGE.md is generated from the built declaration files. It is intentionally long because it includes every public .d.ts file exactly as TypeScript consumers see it.',
				id: 'generated-reference',
				items: [
					'Root package declarations: dist/index.d.ts plus every dist/core/*.d.ts file.',
					'Client declarations: stores, widgets, Web Components, HTMX helpers, controllers, audio, microphone, and reactive sources.',
					'Framework declarations: React props/hooks, Vue components/composables, Svelte creators, Angular services.',
					'Storage and testing declarations: Drizzle schema bundle, fixtures, simulators, benchmarks, review helpers.',
					'Telephony declarations: Twilio, Telnyx, Plivo, webhook security, response shaping, contract matrix.'
				],
				title: 'Generated Reference'
			},
			{
				id: 'type-entrypoints',
				table: {
					headers: ['Entrypoint', 'Purpose'],
					rows: entrypoints
				},
				title: 'Type Entrypoints'
			}
		],
		title: 'Voice API Reference'
	},
	'voice-assistants-tools': {
		description:
			'Assistant, agent, model, tool, RAG, MCP, migration, and conversation-intelligence primitives.',
		id: 'voice-assistants-tools',
		sections: [
			{
				code: { language: 'typescript', source: codeSamples.assistant },
				id: 'assistant-definition',
				items: [
					'createVoiceAssistant() defines an assistant with id, system prompt, model, tools, guardrails, memory lifecycle, artifacts, and presets.',
					'defineVoiceAssistant() packages adapters, prompts, language strategy, phrase hints, lexicon, route config, and session conversion.',
					'createVoiceAgent() and createVoiceAgentSquad() run model/tool loops and specialist handoff policies.',
					'createVoiceExperiment() and summarizeVoiceAssistantRuns() compare variants and run summaries.'
				],
				title: 'Assistant Definition'
			},
			{
				id: 'models',
				items: [
					'createOpenAIVoiceAssistantModel(), createAnthropicVoiceAssistantModel(), createGeminiVoiceAssistantModel(), and createJSONVoiceAssistantModel() normalize model providers.',
					'createAIVoiceModel() bridges @absolutejs/ai models into voice assistant models.',
					'Provider router options support fallback modes, policy presets, weighted routing, health signals, and decision traces.'
				],
				title: 'Models And Routing'
			},
			{
				id: 'tools',
				items: [
					'createVoiceEndCallTool() completes a call with an optional farewell and result.',
					'createVoiceTransferCallTool() exposes typed destinations and calls api.transfer().',
					'createVoiceDTMFTool() validates and forwards keypad digits.',
					'createVoiceVoicemailDetectionTool() marks voicemail and can complete the call.',
					'createVoiceApiRequestTool() wraps HTTP calls with buildBody, buildQuery, buildHeaders, parseResponse, and injected fetch.',
					'createVoiceRAGTool() wraps an @absolutejs/rag collection and extractVoiceRAGCitations() pulls source citations.',
					'createVoiceMCPToolset() exposes MCP tools as voice agent tools.'
				],
				title: 'Tool Catalog'
			},
			{
				id: 'pathways',
				items: [
					'VoicePathway defines state-machine style call flows with typed slots, conditions, actions, transitions, tools, metadata, and validation.',
					'Pathway actions can say text, collect slots, call tools, set slots, transfer, or end the call.',
					'The pathway compiler, runtime, generator, visualizer, and slot collector support structured conversation flows similar to hosted conversational-pathway builders while staying in code.',
					'IVR plans, DTMF tools, outcome recipes, workflow contracts, and tool contracts make deterministic call flows testable alongside LLM-driven assistants.'
				],
				title: 'Pathways And Workflows'
			},
			{
				id: 'conversation-intelligence',
				items: [
					'Post-call analysis, mid-call summaries, transcript annotation, semantic turn detection, call disposition, post-call surveys.',
					'Call scorecards, AI scorecards, LLM judges, calibration, quality drift detection, agent performance reports.',
					'Caller memory, assistant memory, CRM linking, CRM contract registry, CRM call logger, variable analytics, cost accounting, and cost prediction.'
				],
				title: 'Conversation Intelligence'
			},
			{
				id: 'vapi-migration',
				items: [
					'fromVapiAssistantConfig() maps Vapi assistant JSON into assistant, tools, routeHints, and unsupported migration notes.',
					'Vapi-like tools map to endCall, transferCall, voicemail, apiRequest/function server tools, query/RAG, and DTMF with a caller-supplied factory.',
					'Unsupported migration fields are reported with concrete manual-review guidance.'
				],
				title: 'Vapi Migration'
			}
		],
		title: 'Assistants And Tools'
	},
	'voice-client-frameworks': {
		description:
			'Browser voice primitives and framework-native wrappers for React, Vue, Svelte, Angular, HTMX, and script-tag embeds.',
		id: 'voice-client-frameworks',
		sections: [
			{
				code: { language: 'tsx', source: codeSamples.client },
				id: 'frameworks',
				items: [
					'React exports VoiceWidget, VoiceCallPlayer, VoiceLiveAgentConsole, dashboards, proof views, traces, hooks, and controller hooks.',
					'Vue exports matching components plus composables like useVoiceStream(), useVoiceController(), and useVoiceOpsStatus().',
					'Svelte exports createVoice* store factories and reuses createVoiceController from the client entrypoint.',
					'Angular exports injectable services for widgets, streams, controllers, provider dashboards, traces, proof, and live operations.',
					'Embed exports an ESM widget and a prebuilt IIFE bundle at /embed/voice-widget.js.'
				],
				title: 'Framework Wrappers'
			},
			{
				id: 'browser-primitives',
				items: [
					'createVoiceConnection(), createVoiceController(), createVoiceStream(), createMicrophoneCapture(), createVoiceAudioPlayer().',
					'bindVoiceBargeIn(), createVoiceDuplexController(), createVoiceBargeInMonitor(), createVoiceLiveTurnLatencyMonitor().',
					'createVoiceBrowserMediaReporter(), browser voice support checks, browser noise suppression, and conversation analytics.'
				],
				title: 'Browser Primitives'
			},
			{
				id: 'widgets',
				items: [
					'Every operations/proof surface has fetch*, create*Store(), view-model, render*HTML(), mount*, define*Element(), and optional CSS helpers where applicable.',
					'Widget families include ops status/action center/history, delivery runtime, platform coverage, proof trends, reconnect profile evidence, provider status/capabilities/contracts, routing status, turn quality/latency, trace timeline, session snapshot/observability, call debugger, call player, live viewer, live agent console, profile comparison, simulation controls, and workflow status.'
				],
				title: 'Widgets And Stores'
			},
			{
				body: 'The example keeps framework parity by using the same route builder and reconnect report path in React, Vue, Svelte, Angular, HTML, and HTMX. React uses useVoiceStream(); vanilla/HTML uses createVoiceStream().',
				code: {
					language: 'typescript',
					source: codeSamples.clientStream
				},
				id: 'example-streams',
				title: 'Example Streams'
			}
		],
		title: 'Client And Frameworks'
	},
	'voice-comparison': {
		description:
			'Deep comparison of AbsoluteJS Voice against hosted voice-agent platforms such as Vapi, Retell AI, Bland AI, Synthflow, and raw provider stacks.',
		id: 'voice-comparison',
		sections: [
			{
				body: 'This is a practical evaluation guide. It compares architectural surfaces, operating model, testing depth, observability, migration paths, and buyer tradeoffs without assuming one product category is universally better.',
				id: 'positioning',
				table: {
					headers: ['Platform', 'Market Position'],
					rows: comparisonPlatforms
				},
				title: 'Positioning'
			},
			{
				id: 'matrix',
				table: {
					headers: ['Axis', 'Comparison'],
					rows: comparisonMatrix
				},
				title: 'Comparison Matrix'
			},
			{
				body: 'Use this matrix when a buyer asks whether AbsoluteJS has equivalent depth to the current voice-agent platforms. The answer is usually not just yes/no: hosted tools concentrate capability in dashboards and managed services, while AbsoluteJS exposes the same class of primitives as code, routes, stores, tests, and framework components.',
				id: 'deep-matrix',
				table: {
					headers: ['Surface', 'Detailed Comparison'],
					rows: comparisonDeepMatrix
				},
				title: 'Deep Feature Matrix'
			},
			{
				id: 'competitor-deep-dives',
				table: {
					headers: ['Competitor', 'How To Compare'],
					rows: competitorDeepDives
				},
				title: 'Competitor Deep Dives'
			},
			{
				id: 'buyer-questions',
				table: {
					headers: ['Buyer Question', 'How To Decide'],
					rows: buyerQuestions
				},
				title: 'Buyer Decision Questions'
			},
			{
				id: 'absolute-advantages',
				items: [
					'Self-hosting: voice sessions, traces, audit events, recordings, runtime storage, delivery sinks, and proof artifacts live in the application boundary you control.',
					'Provider portability: adapters keep STT, TTS, realtime, model, telephony, storage, and routing decisions replaceable instead of embedded in one hosted vendor.',
					'Framework-native UI: React, Vue, Svelte, Angular, HTMX, Web Components, and embed exports all target the same runtime surfaces.',
					'Proof as code: competitive coverage, provider contracts, production readiness, SLOs, simulations, proof packs, operations records, and incident bundles are typed route surfaces.',
					'Regression testing: @absolutejs/voice-tester simulates real callers over Twilio Media Streams-compatible WebSockets, Discord voice, or outbound Twilio calls.',
					'Release control: competitive coverage assertions, provider contract assertions, production readiness gates, SLO checks, and proof-pack generation can be wired into CI instead of reviewed only in a dashboard.',
					'Domain integration: voice behavior can share the same auth, database, queues, feature flags, observability stack, design system, and deployment process as the rest of the AbsoluteJS application.'
				],
				title: 'Where AbsoluteJS Is Strong'
			},
			{
				id: 'hosted-platform-advantages',
				items: [
					'Hosted platforms can be faster for teams that want a dashboard-first setup and do not need to own runtime internals.',
					'Hosted platforms may include managed telephony procurement, support teams, bundled usage pricing, and pre-integrated enterprise programs.',
					'Hosted platforms reduce the amount of application code a small team must operate when provider choice, data locality, and custom proof surfaces are not the main constraints.',
					'Hosted visual editors can be better when operations or business teams need to own call-flow edits without code review.',
					'Hosted analytics can be better when the team wants a vendor-maintained reporting model instead of defining its own stores, views, and route surfaces.',
					'AbsoluteJS is a better fit when the app already has engineering ownership and the voice agent needs to share code, storage, auth, observability, and UI with the rest of the product.'
				],
				title: 'Where Hosted Platforms Are Strong'
			},
			{
				id: 'parity-and-gaps',
				items: [
					'Parity: assistants, squads, tools, provider choice, phone calls, browser/web voice, workflows/pathways, knowledge/RAG, post-call analysis, simulations, eval-style checks, campaigns, transfers, webhooks, call logs/replay, recordings, and analytics all have AbsoluteJS equivalents.',
					'Advantage: AbsoluteJS goes deeper on app-owned proof, provider contract matrices, competitive coverage assertions, release gates, framework-native UI, storage control, and synthetic caller testing across Twilio WS, Discord, and outbound carrier paths.',
					'Gap: AbsoluteJS is not a hosted no-code control plane by default. Teams must build, ship, and operate the app surfaces they choose to expose.',
					'Gap: Hosted platforms may offer faster non-engineer onboarding, managed numbers, bundled support, vendor SLAs, and prebuilt account-level analytics.',
					'Intentional difference: AbsoluteJS favors typed code and application-owned infrastructure over a single vendor dashboard as the source of truth.'
				],
				title: 'Parity, Advantages, And Gaps'
			},
			{
				body: 'The package includes competitive coverage as a first-class proof surface. Teams can define the buyer needs they care about, attach evidence, require readiness gates, link operations records, and fail release checks when coverage slips.',
				code: {
					language: 'typescript',
					source: codeSamples.competitiveCoverage
				},
				id: 'competitive-coverage',
				title: 'Competitive Coverage Route'
			},
			{
				id: 'migration',
				items: [
					'fromVapiAssistantConfig() maps Vapi-style assistant model, voice, transcriber, first message, end-call behavior, voicemail behavior, tools, transfer destinations, API request tools, DTMF tools, and knowledge-base fields into AbsoluteJS assistant structures.',
					'Unsupported Vapi fields are returned as explicit unsupported reasons so migrations preserve review work instead of silently dropping behavior.',
					'Vapi-like concepts map to AbsoluteJS assistants, squads, tools, route hints, provider adapters, phone-agent routes, campaign routes, workflow/pathway primitives, and proof surfaces.',
					'Retell/Bland/Synthflow-style migrations should be modeled by extracting the agent prompt, call flow, tools, knowledge sources, transfer rules, phone routing, post-call analysis, and QA checks into typed AbsoluteJS assistants, pathways, tools, and proof routes.'
				],
				title: 'Migration Notes'
			},
			{
				id: 'source-notes',
				items: [
					'Vapi categories come from current Vapi documentation for assistants, squads, phone calls, web calls, observability, evals, simulations, campaigns, chat, workflows, CLI, and SDK surfaces.',
					'Retell categories come from current Retell documentation for phone-call APIs, batch calls, knowledge bases, post-call analysis, webhooks, dashboard history, and API consumption.',
					'Bland categories come from current Bland documentation for Conversational Pathways, call logs, webhooks, variables, per-turn decision data, reviews, outcomes, batch-call flows, and testbed standards.',
					'Synthflow categories come from current Synthflow documentation for the BELL lifecycle, call-flow design, knowledge bases, actions, simulations, deployment through phone/SIP/API/widgets, webhooks, integrations, logs, and continuous improvement.',
					'AbsoluteJS categories come from the local @absolutejs/voice, ~/abs/voice-adapters, ~/abs/voice-tester, and ~/abs/examples/voice source trees inspected during this docs pass.'
				],
				title: 'Source Notes'
			}
		],
		title: 'Voice Comparison'
	},
	'voice-ecosystem': {
		description:
			'How the core voice package, provider adapters, automated tester, and full example app fit together as one AbsoluteJS voice stack.',
		id: 'voice-ecosystem',
		sections: [
			{
				id: 'repositories',
				items: [
					'~/abs/voice contains @absolutejs/voice: the Elysia runtime, route surfaces, assistant helpers, telephony bridges, storage, proof, operations, and framework UI exports.',
					'~/abs/voice-adapters contains independently versioned provider packages that implement the core STTAdapter, TTSAdapter, and RealtimeAdapter contracts.',
					'~/abs/voice-tester contains @absolutejs/voice-tester: an AI caller harness that drives Twilio Media Streams-compatible endpoints, Discord voice bots, and real outbound Twilio calls.',
					'~/abs/examples/voice is the reference app that wires browser voice, OpenAI Realtime, telephony, provider routing, assistants, Drizzle storage, @absolutejs/sync caching, ops surfaces, and proof routes together.',
					'The comparison layer is inside the core package too: competitive coverage reports, Vapi migration helpers, provider stack recommendations, and provider contract matrices make market parity auditable.'
				],
				title: 'Repositories'
			},
			{
				id: 'runtime-flow',
				items: [
					'Browser, telephony, realtime, and tester clients connect to route paths mounted by voice() or phone-agent route helpers.',
					'The runtime resolves context, session state, phrase hints, lexicon, language strategy, profile-switch policy, handoff policy, live ops state, and provider configuration.',
					'Audio flows through STT/TTS adapters or a realtime adapter; turns flow into onTurn or createVoiceAssistant() handlers; traces, audit events, recordings, and delivery records flow into configured stores.',
					'Ops and proof routes read the same runtime records to render health, delivery, SLO, incident, replay, proof-pack, provider, and production-readiness surfaces.'
				],
				title: 'Runtime Flow'
			},
			{
				id: 'reference-app',
				items: [
					'The example app uses channelDefaults() to keep correction, handoff, live ops, assistant ops, profile switching, session persistence, and phrase hints identical across /voice/intake, /voice/realtime, and /voice/telephony.',
					'Frontend routes use getVoiceRoutePath() to switch between cascaded STT/TTS and OpenAI Realtime without changing the client stream API.',
					'Drizzle runtime storage and an @absolutejs/sync write-behind cache keep session writes fast while preserving durable history and proof data.',
					'The app mounts the large ops/proof surface set from one voiceConfig object so production readiness, incident evidence, provider routing, and session replay stay connected.'
				],
				title: 'Reference App'
			},
			{
				id: 'recommended-doc-order',
				items: [
					'Start with Runtime to understand voice() and the session/adapter contract.',
					'Read Adapters and Adapter Contracts when choosing providers or writing a new provider package.',
					'Read Comparison when evaluating AbsoluteJS against Vapi, Retell, Bland, Synthflow, or a raw provider stack.',
					'Read Telephony when exposing a phone path or campaign dialer.',
					'Read Testing, Scenarios, and Discord Testing when you want automated caller regression tests.',
					'Use Route Surfaces, Ops & Proof, Storage & Testing, and API Reference when turning a demo into a monitored production system.'
				],
				title: 'Recommended Reading Order'
			}
		],
		title: 'Voice Ecosystem'
	},
	'voice-ops-proof': {
		description:
			'Operations, audit, monitoring, readiness, SLO, proof, observability, and incident-management surfaces.',
		id: 'voice-ops-proof',
		sections: [
			{
				id: 'operations',
				items: [
					'createVoiceOpsRuntime(), resolveVoiceOpsPreset(), ops task stores, integration events, sinks, webhook receiver, task policies, assignment rules.',
					'Audit events, scoped audit stores, audit export, audit delivery, HTTP/S3 sinks, delivery workers, and operator action audit.',
					'Live ops controller, live ops routes, ops console, ops status, ops recovery, operational status, delivery runtime, delivery sinks.',
					'Incident timeline, incident bundles, operations records, failure replay, webhook fanout, route auth, OAuth2 token source.'
				],
				title: 'Operations'
			},
			{
				body: 'The example mounts opsStatus, opsConsole, quality, assistantHealth, handoffHealth, session list/replay/snapshot/observability, operations records, incident bundles, resilience, provider SLOs, provider orchestration, provider decision traces, telemetry/security proof, data control, delivery sinks, delivery runtime, incident timeline, diagnostics, trace timeline, tool contracts, simulation suite, live latency, and more from the same voice() config object.',
				code: {
					language: 'typescript',
					source: codeSamples.deliveryRuntime
				},
				id: 'example-ops-mount',
				title: 'Example Ops Mount'
			},
			{
				id: 'proof',
				items: [
					'Production readiness reports, gates, proof runtime, recovery actions, demo-ready routes, phone-agent production smoke checks.',
					'Latency SLO gate, SLO calibration, SLO readiness thresholds, live latency, turn latency, turn quality, provider SLO.',
					'Media pipeline proof, browser media proof, telephony media proof, realtime channel evidence, realtime provider contracts.',
					'Outcome contracts, workflow contracts, tool contracts, agent-squad contracts, provider-routing contracts, reconnect contracts.',
					'Simulation suites, conversation simulator, multilingual STT proof, proof runner, proof assertions, proof packs, proof trends, real-call profile recovery.'
				],
				title: 'Proof And Readiness'
			},
			{
				code: { language: 'typescript', source: codeSamples.monitor },
				id: 'monitoring',
				items: [
					'createVoiceMonitorRuntimeBinding() wires live session audio into a monitor registry from the main voice plugin.',
					'createVoiceLiveMonitorRoutes() exposes per-session listen/control WebSocket routes.',
					'createVoiceMonitoringRunner() style monitor surfaces support definitions, issue stores, notifiers, receipts, ticks, and run reports.'
				],
				title: 'Monitoring'
			}
		],
		title: 'Operations And Proof'
	},
	'voice-route-surfaces': {
		description:
			'Every optional route surface that can be mounted from the main voice() plugin.',
		id: 'voice-route-surfaces',
		sections: [
			{
				body: 'Route surfaces use VoiceSurfaceConfig semantics: omit or false to disable, pass an options object to configure, and pass true only for surfaces whose option type has no required fields.',
				id: 'semantics',
				title: 'Surface Semantics'
			},
			{
				id: 'surface-table',
				table: { headers: ['Surface', 'Purpose'], rows: routeSurfaces },
				title: 'Surface Table'
			}
		],
		title: 'Route Surfaces'
	},
	'voice-runtime': {
		description:
			'Runtime configuration, session lifecycle, adapter contracts, media handling, reconnect, turn detection, and call-control hooks.',
		id: 'voice-runtime',
		sections: [
			{
				code: { language: 'typescript', source: codeSamples.minimal },
				id: 'runtime-plugin',
				title: 'Runtime Plugin'
			},
			{
				id: 'options',
				table: { headers: ['Option', 'Meaning'], rows: runtimeOptions },
				title: 'VoicePluginConfig Options'
			},
			{
				id: 'adapter-contracts',
				items: [
					'STTAdapter.open() creates sessions that receive audio chunks and emit partial, final, endOfTurn, error, and close events.',
					'TTSAdapter.open() creates sessions that receive text and emit audio, error, and close events; optional cancel() supports barge-in.',
					'RealtimeAdapter.open() accepts audio or text and emits both transcript and audio events.',
					'AudioFormat covers raw alaw, mulaw, and pcm_s16le with sample rate and mono/stereo channel count.',
					'Language strategy supports fixed language, auto-detect with allow-list, or allow-switching.'
				],
				title: 'Adapter Contracts'
			},
			{
				body: 'The example exposes two runtime paths: /voice/intake for cascaded STT+TTS and /voice/realtime for OpenAI Realtime. The frontend chooses the route with an engine query parameter and passes stable sessionId values so every audio frame belongs to one server-side session.',
				code: {
					language: 'typescript',
					source: codeSamples.providerRoute
				},
				id: 'example-routing',
				title: 'Example Routing'
			},
			{
				id: 'turns-and-media',
				items: [
					'Turn detection can use vendor events, silence windows, manual end_turn messages, semantic VAD, or hybrids.',
					'STT fallback can replay audio to secondary providers on empty or low-confidence turns.',
					'Audio conditioning and noise suppression run before STT.',
					'Barge-in cancels active assistant audio based on partial transcript thresholds.',
					'Latency filler can be static phrases or content-aware fillerFor() acknowledgements with timeout fallback.',
					'Recording captures assistant and/or user channels into a configured recording store.'
				],
				title: 'Turns And Media'
			}
		],
		title: 'Runtime'
	},
	'voice-storage-testing': {
		description:
			'Storage adapters, Drizzle schema, data-control features, retention, observability export, fixtures, simulators, and benchmarks.',
		id: 'voice-storage-testing',
		sections: [
			{
				id: 'storage',
				items: [
					'createVoiceMemoryStore(), createVoiceSQLiteStore(), createVoicePostgresStore(), createVoiceFileStore(), createVoiceS3Store().',
					'Recording stores, assistant memory stores, real-call profile evidence stores, audit stores, ops task/event stores, delivery sink stores.',
					'@absolutejs/voice/drizzle exports shared tables and voiceDrizzleSchema for runtime storage, assistant memory, eval, handoff, incident bundles, observability export, and proof trends.',
					'Retention, zero-data-retention, data-control routes, redaction, recording redaction, and audit export support compliance workflows.'
				],
				title: 'Storage And Data Control'
			},
			{
				body: 'The example uses createVoiceDrizzleRuntimeStorage() for durable Neon/Postgres state, but wraps the hot-path session store in a write-behind cache. That keeps 20 ms audio-frame writes in memory while durable history and observability still land in the database.',
				code: { language: 'typescript', source: codeSamples.storage },
				id: 'example-drizzle-cache',
				title: 'Example Drizzle Cache'
			},
			{
				id: 'observability-export',
				items: [
					'Observability export creates envelopes, artifact indexes, checksums, freshness metadata, redaction summaries, validation results, replay reports, and delivery receipts.',
					'Trace delivery routes and OpenTelemetry export helpers bridge package traces into external observability systems.'
				],
				title: 'Observability Export'
			},
			{
				id: 'testing',
				items: [
					'@absolutejs/voice/testing exports accuracy, benchmark, corrected transcript, duplex, fixtures, I/O provider simulator, provider simulator, resilience, review, session benchmark, STT, telephony, and TTS helpers.',
					'Live adapter tests are split by provider for AssemblyAI, Deepgram, ElevenLabs, and OpenAI.',
					'Fixtures include audio manifests and PCM samples for clean/noisy dialogue and multilingual STT proof.'
				],
				title: 'Testing'
			}
		],
		title: 'Storage And Testing'
	},
	'voice-telephony': {
		description:
			'Phone-agent carriers, webhook normalization, security, media routes, campaign dialers, call control, and carrier proof surfaces.',
		id: 'voice-telephony',
		sections: [
			{
				code: { language: 'typescript', source: codeSamples.phone },
				id: 'phone-agents',
				items: [
					'Phone-agent routes can bridge carrier webhooks and media sessions into the main voice runtime.',
					'Carrier support includes Twilio, Telnyx, and Plivo route/carrier helpers.',
					'Phone provisioning helpers model number acquisition and setup reports.'
				],
				title: 'Phone Agents'
			},
			{
				body: 'The example creates a telephony bridge config by spreading the same channelDefaults("/voice/telephony") used by the browser route, then adding telephony-specific context, STT, and TTS adapters. Carrier-specific handoff adapters and webhook security are mounted around that shared route config.',
				code: {
					language: 'typescript',
					source: 'export const createTelephonyBridgeConfig = () => ({\n\t...channelDefaults("/voice/telephony"),\n\tcontext: {},\n\tstt: sttAdapter,\n\ttts: ttsAdapter\n});'
				},
				id: 'example-telephony-bridge',
				title: 'Example Telephony Bridge'
			},
			{
				id: 'webhooks',
				items: [
					'Telephony webhook parsing normalizes provider events into VoiceTelephonyWebhookDecision and stored decisions.',
					'Webhook security routes evaluate Twilio, Telnyx, and Plivo signatures plus replay/idempotency behavior.',
					'Telephony outcome handlers apply carrier outcomes to campaigns and session state.'
				],
				title: 'Webhooks And Security'
			},
			{
				id: 'call-control',
				items: [
					'Call-control messages support complete, escalate, no-answer, transfer, and voicemail actions.',
					'DTMF collector and DTMF tool support IVR digit forwarding.',
					'Hold audio, whisper channel, backchannel, live coach, supervisor presence, and live monitor support operator-assisted calls.',
					'Calling windows, call quota, no-show prediction, calendar slots, booking flow, reminder scheduler, and DNC registry support outbound workflows.'
				],
				title: 'Call Control'
			},
			{
				id: 'campaigns',
				items: [
					'Campaign stores, recipient import, campaign routes, worker loops, proof, readiness proof, observability reports, and summaries.',
					'Twilio, Telnyx, and Plivo campaign dialers plus campaign dialer proof status and assertions.',
					'Campaign controls, campaign templates, campaign telephony outcome recorders, and campaign readiness evidence.'
				],
				title: 'Campaigns'
			}
		],
		title: 'Telephony'
	},
	'voice-tester': {
		description:
			'AI-driven automated tester for voice services. It simulates a caller end-to-end with TTS, STT, LLM decisions, transport adapters, scenarios, and JSON reports.',
		id: 'voice-tester',
		sections: [
			{
				body: '@absolutejs/voice-tester can test a deployed receptionist or voice bot without a human caller. The default path opens a WebSocket directly to a Twilio Media Streams-compatible /stream endpoint, sends connected/start envelopes, streams 20 ms μ-law frames generated from Deepgram Aura TTS, decodes the service audio back to PCM, transcribes it with Deepgram STT, and asks an LLM what the simulated caller should do next.',
				code: { language: 'bash', source: codeSamples.testerCli },
				id: 'cli',
				title: 'CLI'
			},
			{
				code: { language: 'typescript', source: codeSamples.testerApi },
				id: 'api',
				title: 'API'
			},
			{
				id: 'modes',
				table: {
					headers: ['Mode', 'Purpose'],
					rows: testerModes
				},
				title: 'Modes'
			},
			{
				id: 'environment',
				items: [
					'DEEPGRAM_API_KEY is required for Aura TTS and Deepgram STT.',
					'ANTHROPIC_API_KEY is used by @absolutejs/ai when built-in scenarios ask an LLM to choose the next caller action.',
					'DISCORD_TESTER_TOKEN is required for Discord mode.',
					'TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required for twilio-outbound mode.',
					'Discord mode keeps discord.js, @discordjs/voice, and prism-media as optional peer dependencies so Twilio users do not install them by default.'
				],
				title: 'Environment'
			},
			{
				id: 'report',
				items: [
					'Scenario reports include scenario id, transport id, transcript, caller turn count, service turn count, durationMs, endedReason, and optional error message.',
					'endedReason is scenario_hangup, timeout, transport_closed, or error.',
					'The CLI exits non-zero when endedReason is error so it can be used in CI or release checks.',
					'Every run logs caller speech, service transcript finals, media activity, mark/clear events, STT lifecycle, and the final JSON report.'
				],
				title: 'Scenario Report'
			}
		],
		title: 'Voice Tester'
	},
	'voice-tester-discord': {
		description:
			'Discord voice testing mode for bots that live in voice channels. A separate tester bot joins the channel, speaks synthetic caller audio, receives the bot-under-test audio, and runs the same scenario loop.',
		id: 'voice-tester-discord',
		sections: [
			{
				code: {
					language: 'typescript',
					source: codeSamples.discordTester
				},
				id: 'api',
				title: 'API'
			},
			{
				id: 'setup',
				items: [
					'Create a separate Discord application for the tester. It cannot be the same bot as the target because the tester must subscribe to another user audio stream.',
					'Enable the normal Guilds and Guild Voice States behavior. Presence and Message Content privileged intents are not required.',
					'Invite the tester bot with Connect, Speak, and Use Voice Activity permissions. Add View Channel only when the channel is role-restricted.',
					'Turn on Discord Developer Mode and copy the guild ID, voice channel ID, and optional target user ID for the bot under test.',
					'Install optional peers only for Discord mode: @discordjs/voice, discord.js, and prism-media.'
				],
				title: 'Setup'
			},
			{
				code: {
					language: 'bash',
					source: 'DISCORD_TESTER_TOKEN=Bot.your_tester_bot_token bunx @absolutejs/voice-tester \\\n\t--mode discord \\\n\t--guild 1234567890 \\\n\t--channel 9876543210 \\\n\t--target-user 1122334455 \\\n\t--scenario adversarial \\\n\t--duration 90'
				},
				id: 'cli',
				title: 'CLI'
			},
			{
				id: 'gotchas',
				items: [
					'Connection timeouts usually mean the tester bot can see the guild but cannot enter the voice channel.',
					'If the bot joins but no audio is transcribed, confirm recent @discordjs/voice and prism-media versions and verify the target bot is actually emitting audio.',
					'When multiple people are in the channel, pass --target-user so the tester forwards only the bot-under-test audio to STT.',
					'The tester destroys the Discord client on scenario completion; an interrupted process can leave the gateway open briefly before Discord times out the connection.',
					'Missing Permissions errors usually mean channel-level Speak permission is missing for the tester bot role.'
				],
				title: 'Gotchas'
			}
		],
		title: 'Discord Testing'
	},
	'voice-tester-scenarios': {
		description:
			'How to model realistic and adversarial caller behavior for @absolutejs/voice-tester.',
		id: 'voice-tester-scenarios',
		sections: [
			{
				code: {
					language: 'typescript',
					source: codeSamples.testerScenario
				},
				id: 'custom-scenario',
				title: 'Custom Scenario'
			},
			{
				id: 'scenario-context',
				items: [
					'transcript is the chronological caller/service conversation observed so far.',
					'elapsedMs is total runtime since the transport opened.',
					'lastServiceUtterance is the most recent service turn or null while waiting for the first greeting.',
					'callerTurnCount lets scenarios stop after a fixed number of actions or branch as the call progresses.'
				],
				title: 'Scenario Context'
			},
			{
				id: 'actions',
				items: [
					'{ type: "speak", text } synthesizes caller speech and streams it through the active transport.',
					'{ type: "speak", text, voice } overrides the default Aura voice for one caller turn.',
					'{ type: "speak", text, interrupt: true } models barge-in behavior when the transport supports interruption.',
					'{ type: "silence", ms } tests greeting handling, recovery from pauses, timeout behavior, and no-input flows.',
					'{ type: "hangup", reason } ends the scenario intentionally and produces endedReason: "scenario_hangup".'
				],
				title: 'Actions'
			},
			{
				id: 'built-in-scenarios',
				items: [
					'happyPathScenario plays a realistic cooperative caller and is the baseline for catching basic regressions.',
					'adversarialScenario probes silence, mumbled answers, interruptions, language switching, off-topic questions, and LLM-improvised follow-ups.',
					'maxDurationMs caps the full call, idleMs controls when the tester decides the service has stopped speaking, and responseStartTimeoutMs controls how long it waits for the service to begin responding.',
					'Scenarios should fail the service for loops, crashes, hangs, bad turn-taking, and inability to recover from ordinary caller behavior.'
				],
				title: 'Built-In Scenarios'
			}
		],
		title: 'Tester Scenarios'
	}
};

const noOpTocToggle = () => undefined;

const pillStyle: CSSProperties = {
	border: '1px solid rgba(128, 128, 128, 0.22)',
	borderRadius: '999px',
	display: 'inline-flex',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	lineHeight: 1.4,
	padding: '0.28rem 0.58rem'
};

const cardGridStyle = (isMobile: boolean): CSSProperties => ({
	display: 'grid',
	gap: '0.9rem',
	gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
	marginTop: '1rem'
});

const buildTocItems = (page: VoicePageDefinition) =>
	page.sections.map((section) => ({
		href: `#${section.id}`,
		label: section.title
	}));

const renderTable = (
	table: VoiceTable,
	themeSprings: DocsViewProps['themeSprings']
) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						{table.headers[0]}
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						{table.headers[1]}
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{table.rows.map(([name, purpose]) => (
					<tr key={name}>
						<animated.td style={tableCellStyle(themeSprings)}>
							<code style={tableCodeStyle}>{name}</code>
						</animated.td>
						<animated.td style={tableCellStyle(themeSprings)}>
							{purpose}
						</animated.td>
					</tr>
				))}
			</tbody>
		</animated.table>
	</div>
);

const VoiceSectionBlock = ({
	section,
	themeSprings
}: {
	section: VoiceSection;
	themeSprings: DocsViewProps['themeSprings'];
}) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<section style={sectionStyle}>
			<AnchorHeading
				id={section.id}
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				{section.title}
			</AnchorHeading>
			{section.body && <p style={paragraphSpacedStyle}>{section.body}</p>}
			{section.items && (
				<div style={cardGridStyle(isMobile)}>
					{section.items.map((item) => (
						<animated.div
							key={item}
							style={featureCardStyle(themeSprings)}
						>
							<p
								style={{
									fontSize: '0.94rem',
									lineHeight: 1.6,
									margin: 0
								}}
							>
								{item}
							</p>
						</animated.div>
					))}
				</div>
			)}
			{section.table && renderTable(section.table, themeSprings)}
			{section.code && (
				<PrismPlus
					codeString={section.code.source}
					language={section.code.language}
					showLineNumbers={section.code.language !== 'bash'}
					themeSprings={themeSprings}
				/>
			)}
		</section>
	);
};

const VoiceDocsPage = ({
	pageId,
	props
}: {
	pageId: VoicePageId;
	props: DocsViewProps;
}) => {
	const page = voicePages[pageId];
	const tocItems = buildTocItems(page);
	const showDesktopToc = !props.isMobileOrTablet;

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
			<div style={mainContentStyle(props.isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(props.themeSprings)}>
					<h1 id={page.id} style={h1Style(props.isMobileOrTablet)}>
						{page.title}
					</h1>
					<p style={paragraphLargeStyle}>{page.description}</p>
					{pageId === 'voice-api-reference' && (
						<p style={paragraphSpacedStyle}>
							Open{' '}
							<strong style={strongStyle}>
								VOICE_PACKAGE.md
							</strong>{' '}
							in the docs repo for the complete generated
							reference.
						</p>
					)}
				</animated.div>

				{page.sections.map((section) => (
					<VoiceSectionBlock
						key={section.id}
						section={section}
						themeSprings={props.themeSprings}
					/>
				))}

				{pageId === 'voice-route-surfaces' && (
					<section style={sectionStyle}>
						<AnchorHeading
							id="surface-names"
							level="h2"
							style={gradientHeadingStyle(props.themeSprings)}
							themeSprings={props.themeSprings}
						>
							Surface Names
						</AnchorHeading>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.5rem',
								marginTop: '1rem'
							}}
						>
							{routeSurfaces.map(([surface]) => (
								<code key={surface} style={pillStyle}>
									{surface}
								</code>
							))}
						</div>
					</section>
				)}

				<DocsNavigation
					currentPageId={props.currentPageId}
					onNavigate={props.onNavigate}
					themeSprings={props.themeSprings}
				/>
			</div>
			{showDesktopToc && (
				<TableOfContents
					items={tocItems}
					themeSprings={props.themeSprings}
				/>
			)}
			<MobileTableOfContents
				isOpen={props.tocOpen ?? false}
				items={tocItems}
				onToggle={props.onTocToggle ?? noOpTocToggle}
				themeSprings={props.themeSprings}
			/>
		</div>
	);
};

export const VoiceAdapterContractsView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-adapter-contracts" props={props} />
);
export const VoiceAdaptersView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-adapters" props={props} />
);
export const VoiceApiReferenceView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-api-reference" props={props} />
);
export const VoiceAssistantsToolsView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-assistants-tools" props={props} />
);
export const VoiceClientFrameworksView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-client-frameworks" props={props} />
);
export const VoiceComparisonView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-comparison" props={props} />
);
export const VoiceEcosystemView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-ecosystem" props={props} />
);
export const VoiceOpsProofView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-ops-proof" props={props} />
);
export const VoiceOverviewView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice" props={props} />
);
export const VoiceRouteSurfacesView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-route-surfaces" props={props} />
);
export const VoiceRuntimeView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-runtime" props={props} />
);
export const VoiceStorageTestingView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-storage-testing" props={props} />
);
export const VoiceTelephonyView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-telephony" props={props} />
);
export const VoiceTesterDiscordView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-tester-discord" props={props} />
);
export const VoiceTesterScenariosView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-tester-scenarios" props={props} />
);
export const VoiceTesterView = (props: DocsViewProps) => (
	<VoiceDocsPage pageId="voice-tester" props={props} />
);
