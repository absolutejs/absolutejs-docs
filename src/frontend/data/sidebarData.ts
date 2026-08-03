import { SidebarCategory, SidebarEntry, SidebarPage } from '../../types/types';
import { AnalyzeView } from '../components/documentation/cli/AnalyzeView';
import { ApiView } from '../components/documentation/cli/ApiView';
import { CompileView } from '../components/documentation/cli/CompileView';
import { ConfigView } from '../components/documentation/cli/ConfigView';
import { DbView } from '../components/documentation/cli/DbView';
import { DevView } from '../components/documentation/cli/DevView';
import { DoctorView } from '../components/documentation/cli/DoctorView';
import { EnvView } from '../components/documentation/cli/EnvView';
import { EslintPrettierView } from '../components/documentation/cli/EslintPrettierView';
import { FrameworksView } from '../components/documentation/cli/FrameworksView';
import { GenerateView } from '../components/documentation/cli/GenerateView';
import { InfoView } from '../components/documentation/cli/InfoView';
import { InspectView } from '../components/documentation/cli/InspectView';
import { IslandsView as IslandsCliView } from '../components/documentation/cli/IslandsView';
import { LogsView } from '../components/documentation/cli/LogsView';
import { LsView } from '../components/documentation/cli/LsView';
import { MemView } from '../components/documentation/cli/MemView';
import { MkcertView } from '../components/documentation/cli/MkcertView';
import { PsView } from '../components/documentation/cli/PsView';
import { RoutesView } from '../components/documentation/cli/RoutesView';
import { StartView } from '../components/documentation/cli/StartView';
import { TelemetryView } from '../components/documentation/cli/TelemetryView';
import { TypecheckView } from '../components/documentation/cli/TypecheckView';
import { CliReferenceView } from '../components/documentation/cli/CliReferenceView';
import { AssetsView } from '../components/documentation/config/AssetsView';
import { BunBuildOptionsView } from '../components/documentation/config/BunBuildOptionsView';
import { EnvironmentVariablesView } from '../components/documentation/config/EnvironmentVariablesView';
import { HeadMetaTagsView } from '../components/documentation/config/HeadMetaTagsView';
import { ImageOptimizationView } from '../components/documentation/config/ImageOptimizationView';
import { SitemapView } from '../components/documentation/config/SitemapView';
import { TailwindCSSView } from '../components/documentation/config/TailwindCSSView';
import { BuildManifestView } from '../components/documentation/core/BuildManifestView';
import { ErrorBoundariesView } from '../components/documentation/core/ErrorBoundariesView';
import { IslandsView } from '../components/documentation/core/IslandsView';
import { LoadingStatesView } from '../components/documentation/core/LoadingStatesView';
import { OutOfOrderStreamingView } from '../components/documentation/core/OutOfOrderStreamingView';
import { PackageExportsView } from '../components/documentation/core/PackageExportsView';
import { RoutingHandlersView } from '../components/documentation/core/RoutingHandlersView';
import { SSRModelView } from '../components/documentation/core/SSRModelView';
import { TypeSafetyView } from '../components/documentation/core/TypeSafetyView';
import { DataFetchingView } from '../components/documentation/data/DataFetchingView';
import { ServerStateView } from '../components/documentation/data/ServerStateView';
import { DockerView } from '../components/documentation/deployment/DockerView';
import { HostingView } from '../components/documentation/deployment/HostingView';
import { ProductionBuildView } from '../components/documentation/deployment/ProductionBuildView';
import { StaticGenerationView } from '../components/documentation/deployment/StaticGenerationView';
import { InstallationView } from '../components/documentation/getting-started/InstallationView';
import { QuickstartView } from '../components/documentation/getting-started/QuickstartView';
import { Overview } from '../components/documentation/overview/OverviewView';
import { CitraView } from '../components/documentation/packages/CitraView';
import { CreateAbsoluteJSView } from '../components/documentation/packages/CreateAbsoluteJSView';
import { IsolatedJscBunPositioningView } from '../components/documentation/packages/IsolatedJscBunPositioningView';
import { IsolatedJscHibernationView } from '../components/documentation/packages/IsolatedJscHibernationView';
import { IsolatedJscProofPackView } from '../components/documentation/packages/IsolatedJscProofPackView';
import { PackagesCatalogView } from '../components/documentation/packages/PackagesCatalogView';
import { packageReferenceViews } from '../components/documentation/packages/EcosystemProjectOverviewView';
import { ecosystemProjects } from './documentation/packages/ecosystem.generated';
import {
	documentationViewByDirectory,
	legacyPackageProjectViewId,
	packageProjectViewId,
	packageSubpackageViewId
} from './documentation/packages/packageRoutes';
import { ScopedStateView } from '../components/documentation/packages/ScopedStateView';
import {
	VoiceAdapterContractsView,
	VoiceAdaptersView,
	VoiceApiReferenceView,
	VoiceAssistantsToolsView,
	VoiceClientFrameworksView,
	VoiceComparisonView,
	VoiceEcosystemView,
	VoiceOpsProofView,
	VoiceOverviewView,
	VoiceRouteSurfacesView,
	VoiceRuntimeView,
	VoiceTesterDiscordView,
	VoiceTesterScenariosView,
	VoiceTesterView,
	VoiceStorageTestingView,
	VoiceTelephonyView
} from '../components/documentation/packages/VoicePackageView';
import {
	AudiencePackageView,
	AttributionPackageView,
	AutoscalerPackageView,
	BeaconPackageView,
	BillingPackageView,
	BlobPackageView,
	CommercePackageView,
	CompliancePackageView,
	CrmPackageView,
	DemoPackageView,
	DiscoverPackageView,
	EdenPackageView,
	EmailPackageView,
	EngagementPackageView,
	EnrichPackageView,
	ErrorsPackageView,
	HealthPackageView,
	LinkedProvidersPackageView,
	LogsPackageView,
	ManifestPackageView,
	McpPackageView,
	MediaPackageView,
	MeetingPackageView,
	MetricsPackageView,
	OnchainPackageView,
	OpsCliPackageView,
	OutcomesPackageView,
	PartnershipPackageView,
	PwaPackageView,
	RagPackageView,
	RenownPackageView,
	ReplayPackageView,
	RulesPackageView,
	TourPackageView,
	VscodeExtensionPackageView,
	VueComposablesPackageView
} from '../components/documentation/packages/packageViews';
import { AbsoluteAuthView } from '../components/documentation/packages/auth/AbsoluteAuthView';
import { AuthAbuseView } from '../components/documentation/packages/auth/AuthAbuseView';
import { AuthActionsView } from '../components/documentation/packages/auth/AuthActionsView';
import { AuthAdaptiveView } from '../components/documentation/packages/auth/AuthAdaptiveView';
import { AuthApiKeysView } from '../components/documentation/packages/auth/AuthApiKeysView';
import { AuthAuditIntegrityView } from '../components/documentation/packages/auth/AuthAuditIntegrityView';
import { AuthCibaView } from '../components/documentation/packages/auth/AuthCibaView';
import { AuthClientView } from '../components/documentation/packages/auth/AuthClientView';
import { AuthComplianceView } from '../components/documentation/packages/auth/AuthComplianceView';
import { AuthCredentialHardeningView } from '../components/documentation/packages/auth/AuthCredentialHardeningView';
import { AuthCredentialsView } from '../components/documentation/packages/auth/AuthCredentialsView';
import { AuthFgaView } from '../components/documentation/packages/auth/AuthFgaView';
import { AuthImpersonationView } from '../components/documentation/packages/auth/AuthImpersonationView';
import { AuthMfaView } from '../components/documentation/packages/auth/AuthMfaView';
import { AuthMigrationsView } from '../components/documentation/packages/auth/AuthMigrationsView';
import { AuthMtlsView } from '../components/documentation/packages/auth/AuthMtlsView';
import { AuthMultiSessionView } from '../components/documentation/packages/auth/AuthMultiSessionView';
import { AuthObservabilityView } from '../components/documentation/packages/auth/AuthObservabilityView';
import { AuthOidcProviderView } from '../components/documentation/packages/auth/AuthOidcProviderView';
import { AuthOrganizationsView } from '../components/documentation/packages/auth/AuthOrganizationsView';
import { AuthPasswordlessView } from '../components/documentation/packages/auth/AuthPasswordlessView';
import { AuthPluginsView } from '../components/documentation/packages/auth/AuthPluginsView';
import { AuthSsoView } from '../components/documentation/packages/auth/AuthSsoView';
import { AuthVaultView } from '../components/documentation/packages/auth/AuthVaultView';
import { AuthVerifiableCredentialsView } from '../components/documentation/packages/auth/AuthVerifiableCredentialsView';
import { EslintRuleView } from '../components/documentation/packages/eslint/EslintRuleView';
import { EslintView } from '../components/documentation/packages/eslint/EslintView';
import { PlatformOverviewView } from '../components/documentation/platform/PlatformOverviewView';
import { RagFrameworksView } from '../components/documentation/rag/RagFrameworksView';
import { RagIngestionView } from '../components/documentation/rag/RagIngestionView';
import { RagQualityView } from '../components/documentation/rag/RagQualityView';
import { RagRetrievalView } from '../components/documentation/rag/RagRetrievalView';
import { TourActionsView } from '../components/documentation/tour/TourActionsView';
import { TourBranchingView } from '../components/documentation/tour/TourBranchingView';
import { TourChecklistView } from '../components/documentation/tour/TourChecklistView';
import { PageHandlersView } from '../components/documentation/reference/PageHandlersView';
import { TypesView } from '../components/documentation/reference/TypesView';
import { CronJobsView } from '../components/documentation/server/CronJobsView';
import { EdenTreatyPerformanceView } from '../components/documentation/server/EdenTreatyPerformanceView';
import { ElysiaCorsView } from '../components/documentation/server/ElysiaCorsView';
import { ElysiaIntegrationView } from '../components/documentation/server/ElysiaIntegrationView';
import { ElysiaPluginCompositionView } from '../components/documentation/server/ElysiaPluginCompositionView';
import { ElysiaValidationView } from '../components/documentation/server/ElysiaValidationView';
import { MiddlewareView } from '../components/documentation/server/MiddlewareView';
import { NetworkingPluginView } from '../components/documentation/server/NetworkingPluginView';
import { TunnelView } from '../components/documentation/server/TunnelView';
import { AngularOverviewView } from '../components/documentation/angular/AngularOverviewView';
import { AngularComponentsView } from '../components/documentation/angular/AngularComponentsView';
import { AngularSpaView } from '../components/documentation/angular/AngularSpaView';
import { HTMLOverviewView } from '../components/documentation/html/HTMLOverviewView';
import { HTMLImageOptView } from '../components/documentation/html/HTMLImageOptView';
import { HTMLAIView } from '../components/documentation/html/HTMLAIView';
import { HTMXOverviewView } from '../components/documentation/htmx/HTMXOverviewView';
import { HTMXAIView } from '../components/documentation/htmx/HTMXAIView';
import { ReactOverviewView } from '../components/documentation/react/ReactOverviewView';
import { ReactComponentsView } from '../components/documentation/react/ReactComponentsView';
import { ReactHooksView } from '../components/documentation/react/ReactHooksView';
import { ReactSpaView } from '../components/documentation/react/ReactSpaView';
import { SvelteOverviewView } from '../components/documentation/svelte/SvelteOverviewView';
import { SvelteComponentsView } from '../components/documentation/svelte/SvelteComponentsView';
import { SvelteSpaView } from '../components/documentation/svelte/SvelteSpaView';
import { VueOverviewView } from '../components/documentation/vue/VueOverviewView';
import { VueComponentsView } from '../components/documentation/vue/VueComponentsView';
import { VueSpaView } from '../components/documentation/vue/VueSpaView';
import { VueAIView } from '../components/documentation/vue/VueAIView';
import { AIOverviewView } from '../components/documentation/ai/AIOverviewView';
import { AIProvidersView } from '../components/documentation/ai/AIProvidersView';
import { AIPluginView } from '../components/documentation/ai/AIPluginView';
import { SyncActionsJobsView } from '../components/documentation/sync/SyncActionsJobsView';
import { SyncAdaptersView } from '../components/documentation/sync/SyncAdaptersView';
import { SyncCodeModeView } from '../components/documentation/sync/SyncCodeModeView';
import { SyncPacksView } from '../components/documentation/sync/SyncPacksView';
import { SyncUnsafeHostView } from '../components/documentation/sync/SyncUnsafeHostView';
import { SyncCRDTView } from '../components/documentation/sync/SyncCRDTView';
import { SyncEdenTypedView } from '../components/documentation/sync/SyncEdenTypedView';
import { SyncFrameworksView } from '../components/documentation/sync/SyncFrameworksView';
import { SyncGraphCollectionsView } from '../components/documentation/sync/SyncGraphCollectionsView';
import { SyncOverviewView } from '../components/documentation/sync/SyncOverviewView';
import { RateLimitOverviewView } from '../components/documentation/rate-limit/RateLimitOverviewView';
import { RuntimeOverviewView } from '../components/documentation/runtime/RuntimeOverviewView';
import { MeteringOverviewView } from '../components/documentation/metering/MeteringOverviewView';
import { RouterOverviewView } from '../components/documentation/router/RouterOverviewView';
import { SecretsOverviewView } from '../components/documentation/secrets/SecretsOverviewView';
import { DeployOverviewView } from '../components/documentation/deploy/DeployOverviewView';
import { DispatchOverviewView } from '../components/documentation/dispatch/DispatchOverviewView';
import { AuditOverviewView } from '../components/documentation/audit/AuditOverviewView';
import { TelemetryPackageView } from '../components/documentation/telemetry-package/TelemetryPackageView';
import { QueueOverviewView } from '../components/documentation/queue/QueueOverviewView';
import { QueueJobsView } from '../components/documentation/queue/QueueJobsView';
import { QueueOperationsView } from '../components/documentation/queue/QueueOperationsView';
import { McpCapabilitiesView } from '../components/documentation/mcp/McpCapabilitiesView';
import { McpEndpointsView } from '../components/documentation/mcp/McpEndpointsView';
import { McpFeedbackView } from '../components/documentation/mcp/McpFeedbackView';
import { DemoBrowserView } from '../components/documentation/demo/DemoBrowserView';
import { DemoRecordingView } from '../components/documentation/demo/DemoRecordingView';
import { ErrorPipelineView } from '../components/documentation/error-pipeline/ErrorPipelineView';
import { ClusterBusView } from '../components/documentation/cluster-bus/ClusterBusView';
import { SyncSandboxView } from '../components/documentation/sync/SyncSandboxView';
import { SyncVsConvexView } from '../components/documentation/sync/SyncVsConvexView';
import { SyncVsFirebaseView } from '../components/documentation/sync/SyncVsFirebaseView';
import { SyncWeHeardYouView } from '../components/documentation/sync/SyncWeHeardYouView';
import { SyncLaunchView } from '../components/documentation/sync/SyncLaunchView';
import { AIToolsView } from '../components/documentation/ai/AIToolsView';
import { AIStreamingView } from '../components/documentation/ai/AIStreamingView';
import { ReactAIView } from '../components/documentation/react/ReactAIView';
import { SvelteAIView } from '../components/documentation/svelte/SvelteAIView';
import { AngularIslandsView } from '../components/documentation/angular/AngularIslandsView';
import { HTMLIslandsView } from '../components/documentation/html/HTMLIslandsView';
import { HTMXIslandsView } from '../components/documentation/htmx/HTMXIslandsView';
import { ReactIslandsView } from '../components/documentation/react/ReactIslandsView';
import { SvelteIslandsView } from '../components/documentation/svelte/SvelteIslandsView';
import { VueIslandsView } from '../components/documentation/vue/VueIslandsView';
import { AngularAIView } from '../components/documentation/angular/AngularAIView';

const definePortalViews = <T>(views: T) => views;

const primaryDocsViews = definePortalViews({
	'absolute-auth': AbsoluteAuthView,
	'ai-overview': AIOverviewView,
	'ai-plugin': AIPluginView,
	'ai-providers': AIProvidersView,
	'ai-streaming': AIStreamingView,
	'ai-tools': AIToolsView,
	analyze: AnalyzeView,
	'angular-ai': AngularAIView,
	'angular-components': AngularComponentsView,
	'angular-islands': AngularIslandsView,
	'angular-overview': AngularOverviewView,
	'angular-spa': AngularSpaView,
	api: ApiView,
	assets: AssetsView,
	attribution: AttributionPackageView,
	audience: AudiencePackageView,
	audit: AuditOverviewView,
	'auth-abuse': AuthAbuseView,
	'auth-actions': AuthActionsView,
	'auth-adaptive': AuthAdaptiveView,
	'auth-apikeys': AuthApiKeysView,
	'auth-audit-integrity': AuthAuditIntegrityView,
	'auth-ciba': AuthCibaView,
	'auth-client': AuthClientView,
	'auth-compliance': AuthComplianceView,
	'auth-credential-hardening': AuthCredentialHardeningView,
	'auth-credentials': AuthCredentialsView,
	'auth-fga': AuthFgaView,
	'auth-impersonation': AuthImpersonationView,
	'auth-mfa': AuthMfaView,
	'auth-migrations': AuthMigrationsView,
	'auth-mtls': AuthMtlsView,
	'auth-multi-session': AuthMultiSessionView,
	'auth-observability': AuthObservabilityView,
	'auth-oidc-provider': AuthOidcProviderView,
	'auth-organizations': AuthOrganizationsView,
	'auth-passwordless': AuthPasswordlessView,
	'auth-plugins': AuthPluginsView,
	'auth-sso': AuthSsoView,
	'auth-vault': AuthVaultView,
	'auth-verifiable-credentials': AuthVerifiableCredentialsView,
	autoscaler: AutoscalerPackageView,
	'beacon-overview': BeaconPackageView,
	billing: BillingPackageView,
	blob: BlobPackageView,
	'build-and-manifest': BuildManifestView,
	'bun-build-options': BunBuildOptionsView,
	citra: CitraView,
	cli: OpsCliPackageView,
	'cli-reference': CliReferenceView,
	'cluster-bus-overview': ClusterBusView,
	commerce: CommercePackageView,
	compile: CompileView,
	compliance: CompliancePackageView,
	config: ConfigView,
	'create-absolutejs': CreateAbsoluteJSView,
	crm: CrmPackageView,
	'cron-jobs': CronJobsView,
	'data-fetching': DataFetchingView,
	db: DbView,
	'demo-browser': DemoBrowserView,
	'demo-overview': DemoPackageView,
	'demo-recording': DemoRecordingView,
	deploy: DeployOverviewView,
	dev: DevView,
	'dev-tunnel': TunnelView,
	discover: DiscoverPackageView,
	dispatch: DispatchOverviewView,
	docker: DockerView,
	doctor: DoctorView,
	'eden-overview': EdenPackageView,
	'eden-treaty-performance': EdenTreatyPerformanceView,
	'elysia-cors': ElysiaCorsView,
	'elysia-integration': ElysiaIntegrationView,
	'elysia-plugin-composition': ElysiaPluginCompositionView,
	'elysia-validation': ElysiaValidationView,
	email: EmailPackageView,
	'engagement-overview': EngagementPackageView,
	enrich: EnrichPackageView,
	env: EnvView,
	'environment-variables': EnvironmentVariablesView,
	'error-boundaries': ErrorBoundariesView,
	'error-pipeline': ErrorPipelineView,
	'errors-overview': ErrorsPackageView,
	eslint: EslintView,
	'eslint-angular-one-feature-per-file': EslintRuleView,
	'eslint-explicit-object-types': EslintRuleView,
	'eslint-inline-style-limit': EslintRuleView,
	'eslint-localize-react-props': EslintRuleView,
	'eslint-max-depth-extended': EslintRuleView,
	'eslint-max-jsxnesting': EslintRuleView,
	'eslint-min-var-length': EslintRuleView,
	'eslint-no-button-navigation': EslintRuleView,
	'eslint-no-explicit-return-type': EslintRuleView,
	'eslint-no-import-meta-path': EslintRuleView,
	'eslint-no-inline-object-types': EslintRuleView,
	'eslint-no-multi-style-objects': EslintRuleView,
	'eslint-no-nested-jsx-return': EslintRuleView,
	'eslint-no-nondeterministic-render': EslintRuleView,
	'eslint-no-or-none-component': EslintRuleView,
	'eslint-no-redundant-type-annotation': EslintRuleView,
	'eslint-no-transition-cssproperties': EslintRuleView,
	'eslint-no-trivial-alias': EslintRuleView,
	'eslint-no-unnecessary-div': EslintRuleView,
	'eslint-no-unnecessary-key': EslintRuleView,
	'eslint-no-useless-catch': EslintRuleView,
	'eslint-no-useless-function': EslintRuleView,
	'eslint-prefer-inline-exports': EslintRuleView,
	'eslint-prettier': EslintPrettierView,
	'eslint-seperate-style-files': EslintRuleView,
	'eslint-sort-exports': EslintRuleView,
	'eslint-sort-keys-fixable': EslintRuleView,
	'eslint-spring-naming-convention': EslintRuleView,
	frameworks: FrameworksView,
	generate: GenerateView,
	'head-meta-tags': HeadMetaTagsView,
	health: HealthPackageView,
	hosting: HostingView,
	'html-ai': HTMLAIView,
	'html-image-optimization': HTMLImageOptView,
	'html-islands': HTMLIslandsView,
	'html-overview': HTMLOverviewView,
	'htmx-ai': HTMXAIView,
	'htmx-islands': HTMXIslandsView,
	'htmx-overview': HTMXOverviewView,
	'image-optimization': ImageOptimizationView,
	info: InfoView,
	inspect: InspectView,
	installation: InstallationView,
	islands: IslandsView,
	'islands-cli': IslandsCliView,
	'isolated-jsc': IsolatedJscProofPackView,
	'isolated-jsc-bun': IsolatedJscBunPositioningView,
	'isolated-jsc-hibernation': IsolatedJscHibernationView,
	'linked-providers': LinkedProvidersPackageView,
	'loading-states': LoadingStatesView,
	logs: LogsView,
	'logs-package': LogsPackageView,
	ls: LsView,
	manifest: ManifestPackageView,
	'mcp-capabilities': McpCapabilitiesView,
	'mcp-endpoints': McpEndpointsView,
	'mcp-feedback': McpFeedbackView,
	'mcp-overview': McpPackageView,
	media: MediaPackageView,
	meeting: MeetingPackageView,
	mem: MemView,
	metering: MeteringOverviewView,
	metrics: MetricsPackageView,
	middleware: MiddlewareView,
	mkcert: MkcertView,
	'networking-plugin': NetworkingPluginView,
	onchain: OnchainPackageView,
	'out-of-order-streaming': OutOfOrderStreamingView,
	outcomes: OutcomesPackageView,
	overview: Overview,
	'package-exports': PackageExportsView,
	packages: PackagesCatalogView,
	'page-handlers': PageHandlersView,
	partnership: PartnershipPackageView,
	'platform-overview': PlatformOverviewView,
	'production-build': ProductionBuildView,
	ps: PsView,
	pwa: PwaPackageView,
	'queue-jobs': QueueJobsView,
	'queue-operations': QueueOperationsView,
	'queue-overview': QueueOverviewView,
	quickstart: QuickstartView,
	'rag-frameworks': RagFrameworksView,
	'rag-ingestion': RagIngestionView,
	'rag-overview': RagPackageView,
	'rag-quality': RagQualityView,
	'rag-retrieval': RagRetrievalView,
	'rate-limit': RateLimitOverviewView,
	'react-ai': ReactAIView,
	'react-components': ReactComponentsView,
	'react-hooks': ReactHooksView,
	'react-islands': ReactIslandsView,
	'react-overview': ReactOverviewView,
	'react-spa': ReactSpaView,
	renown: RenownPackageView,
	'replay-overview': ReplayPackageView,
	router: RouterOverviewView,
	routes: RoutesView,
	'routing-and-handlers': RoutingHandlersView,
	rules: RulesPackageView,
	runtime: RuntimeOverviewView,
	'scoped-state': ScopedStateView,
	secrets: SecretsOverviewView,
	'server-state': ServerStateView,
	sitemap: SitemapView,
	'ssr-model': SSRModelView,
	start: StartView,
	'static-generation': StaticGenerationView,
	'substrate-audit': PlatformOverviewView,
	'svelte-ai': SvelteAIView,
	'svelte-components': SvelteComponentsView,
	'svelte-islands': SvelteIslandsView,
	'svelte-overview': SvelteOverviewView,
	'svelte-spa': SvelteSpaView,
	'sync-actions': SyncActionsJobsView,
	'sync-adapters': SyncAdaptersView,
	'sync-code-mode': SyncCodeModeView,
	'sync-crdt': SyncCRDTView,
	'sync-eden': SyncEdenTypedView,
	'sync-frameworks': SyncFrameworksView,
	'sync-graph': SyncGraphCollectionsView,
	'sync-launch': SyncLaunchView,
	'sync-overview': SyncOverviewView,
	'sync-packs': SyncPacksView,
	'sync-sandbox': SyncSandboxView,
	'sync-unsafe-host': SyncUnsafeHostView,
	'sync-vs-convex': SyncVsConvexView,
	'sync-vs-firebase': SyncVsFirebaseView,
	'sync-we-heard-you': SyncWeHeardYouView,
	'tailwind-css': TailwindCSSView,
	telemetry: TelemetryView,
	'telemetry-package': TelemetryPackageView,
	'tour-actions': TourActionsView,
	'tour-branching': TourBranchingView,
	'tour-checklist': TourChecklistView,
	'tour-overview': TourPackageView,
	'type-safety': TypeSafetyView,
	typecheck: TypecheckView,
	types: TypesView,
	voice: VoiceOverviewView,
	'voice-adapter-contracts': VoiceAdapterContractsView,
	'voice-adapters': VoiceAdaptersView,
	'voice-api-reference': VoiceApiReferenceView,
	'voice-assistants-tools': VoiceAssistantsToolsView,
	'voice-client-frameworks': VoiceClientFrameworksView,
	'voice-comparison': VoiceComparisonView,
	'voice-ecosystem': VoiceEcosystemView,
	'voice-ops-proof': VoiceOpsProofView,
	'voice-route-surfaces': VoiceRouteSurfacesView,
	'voice-runtime': VoiceRuntimeView,
	'voice-storage-testing': VoiceStorageTestingView,
	'voice-telephony': VoiceTelephonyView,
	'voice-tester': VoiceTesterView,
	'voice-tester-discord': VoiceTesterDiscordView,
	'voice-tester-scenarios': VoiceTesterScenariosView,
	'vscode-extension': VscodeExtensionPackageView,
	'vue-ai': VueAIView,
	'vue-components': VueComponentsView,
	'vue-composables': VueComposablesPackageView,
	'vue-islands': VueIslandsView,
	'vue-overview': VueOverviewView,
	'vue-spa': VueSpaView,
	...packageReferenceViews
});

const legacyPackageRouteAliases = Object.fromEntries(
	ecosystemProjects.flatMap((project) => {
		const canonicalView = packageProjectViewId(project);
		const legacyView = legacyPackageProjectViewId(project);
		if (canonicalView === legacyView) return [];
		const View = primaryDocsViews[canonicalView];
		if (!View) return [];

		return [[legacyView, View]];
	})
);

export const docsViews = definePortalViews({
	...primaryDocsViews,
	...legacyPackageRouteAliases
});

const legacyPackageViews = new Set(Object.keys(legacyPackageRouteAliases));
export const documentationSitemapRoutes = [
	'/documentation',
	...Object.keys(docsViews)
		.filter((view) => view !== 'overview' && !legacyPackageViews.has(view))
		.map((view) => `/documentation/${view}`)
];

const packageApiSidebarEntries = ecosystemProjects.flatMap<{
	category: string;
	entry: SidebarEntry;
}>((project) => {
	const publicSubpackages = project.subpackages.filter(
		(subpackage) => !subpackage.private
	);
	const hasCuratedGuide = Boolean(
		documentationViewByDirectory[project.directory]
	);
	if (hasCuratedGuide && publicSubpackages.length === 0) return [];

	const overview: SidebarPage = {
		id: packageProjectViewId(project),
		label: hasCuratedGuide ? 'Guide' : 'Overview'
	};
	if (publicSubpackages.length === 0)
		return [
			{
				category: project.category,
				entry: { id: overview.id, label: project.name }
			}
		];

	return [
		{
			category: project.category,
			entry: {
				label: project.name,
				pages: [
					overview,
					...publicSubpackages.map<SidebarPage>((subpackage) => ({
						id: packageSubpackageViewId(project, subpackage),
						label: subpackage.name.replace(/^@absolutejs\//, '')
					}))
				]
			}
		}
	];
});
const baseSidebarCategories: SidebarCategory[] = [
	{
		entries: [
			{ id: 'overview', label: 'Overview' },
			{
				label: 'Getting Started',
				pages: [
					{ id: 'installation', label: 'Installation' },
					{ id: 'quickstart', label: 'Quickstart' }
				]
			},
			{
				label: 'Core Concepts',
				pages: [
					{ id: 'ssr-model', label: 'SSR Model' },
					{ id: 'package-exports', label: 'Package Exports' },
					{ id: 'build-and-manifest', label: 'Build & Manifest' },
					{
						id: 'routing-and-handlers',
						label: 'Routing & Handlers'
					},
					{ id: 'type-safety', label: 'Type Safety' },
					{ id: 'islands', label: 'Islands' },
					{ id: 'error-boundaries', label: 'Error Boundaries' },
					{ id: 'loading-states', label: 'Loading States' },
					{
						id: 'out-of-order-streaming',
						label: 'Out-of-Order Streaming'
					}
				]
			},
			{
				label: 'CLI',
				pages: [
					{ id: 'cli-reference', label: 'Command Reference' },
					{ id: 'dev', label: 'Dev' },
					{ id: 'start', label: 'Start' },
					{ id: 'compile', label: 'Compile' },
					{ id: 'generate', label: 'Generate' },
					{ id: 'frameworks', label: 'Add / Remove' },
					{ id: 'config', label: 'Config' },
					{ id: 'db', label: 'Database' },
					{ id: 'ls', label: 'Build output' },
					{ id: 'analyze', label: 'Analyze' },
					{ id: 'routes', label: 'Routes' },
					{ id: 'api', label: 'API' },
					{ id: 'ps', label: 'Processes' },
					{ id: 'mem', label: 'Memory' },
					{ id: 'logs', label: 'Logs' },
					{ id: 'inspect', label: 'Inspect' },
					{ id: 'islands-cli', label: 'Islands' },
					{ id: 'doctor', label: 'Doctor' },
					{ id: 'env', label: 'Env' },
					{ id: 'eslint-prettier', label: 'ESLint & Prettier' },
					{ id: 'typecheck', label: 'Typecheck' },
					{ id: 'mkcert', label: 'Mkcert' },
					{ id: 'telemetry', label: 'Telemetry' },
					{ id: 'info', label: 'Info' }
				]
			},
			{
				label: 'React',
				pages: [
					{ id: 'react-overview', label: 'Overview' },
					{ id: 'react-components', label: 'Components' },
					{ id: 'react-hooks', label: 'Hooks' },
					{ id: 'react-spa', label: 'SPA' },
					{ id: 'react-islands', label: 'Islands' },
					{ id: 'react-ai', label: 'AI' }
				]
			},
			{
				label: 'Svelte',
				pages: [
					{ id: 'svelte-overview', label: 'Overview' },
					{ id: 'svelte-components', label: 'Components' },
					{ id: 'svelte-spa', label: 'SPA' },
					{ id: 'svelte-islands', label: 'Islands' },
					{ id: 'svelte-ai', label: 'AI' }
				]
			},
			{
				label: 'Vue',
				pages: [
					{ id: 'vue-overview', label: 'Overview' },
					{ id: 'vue-components', label: 'Components' },
					{ id: 'vue-spa', label: 'SPA' },
					{ id: 'vue-islands', label: 'Islands' },
					{ id: 'vue-ai', label: 'AI' }
				]
			},
			{
				label: 'Angular',
				pages: [
					{ id: 'angular-overview', label: 'Overview' },
					{ id: 'angular-components', label: 'Components' },
					{ id: 'angular-spa', label: 'SPA' },
					{ id: 'angular-islands', label: 'Islands' },
					{ id: 'angular-ai', label: 'AI' }
				]
			},
			{
				label: 'HTML',
				pages: [
					{ id: 'html-overview', label: 'Overview' },
					{
						id: 'html-image-optimization',
						label: 'Image Optimization'
					},
					{ id: 'html-islands', label: 'Islands' },
					{ id: 'html-ai', label: 'AI' }
				]
			},
			{
				label: 'HTMX',
				pages: [
					{ id: 'htmx-overview', label: 'Overview' },
					{ id: 'htmx-islands', label: 'Islands' },
					{ id: 'htmx-ai', label: 'AI' }
				]
			},
			{
				label: 'Elysia Integration',
				pages: [
					{ id: 'elysia-integration', label: 'Overview' },
					{
						id: 'elysia-plugin-composition',
						label: 'Plugin Composition'
					},
					{
						id: 'eden-treaty-performance',
						label: 'Type Performance'
					},
					{ id: 'elysia-validation', label: 'Validation' },
					{ id: 'elysia-cors', label: 'CORS' },
					{ id: 'cron-jobs', label: 'Cron Jobs' },
					{ id: 'middleware', label: 'Middleware' },
					{ id: 'networking-plugin', label: 'Networking Plugin' },
					{ id: 'dev-tunnel', label: 'Dev Tunnel' },
					{ id: 'eden-overview', label: 'Eden Errors' }
				]
			},
			{
				label: 'Data & State',
				pages: [
					{ id: 'data-fetching', label: 'Data Fetching' },
					{ id: 'server-state', label: 'Server State' }
				]
			},
			{
				label: 'Configuration',
				pages: [
					{
						id: 'environment-variables',
						label: 'Environment Variables'
					},
					{ id: 'bun-build-options', label: 'Bun Build Options' },
					{ id: 'tailwind-css', label: 'Tailwind CSS' },
					{ id: 'head-meta-tags', label: 'Head & Meta Tags' },
					{ id: 'image-optimization', label: 'Image Optimization' },
					{ id: 'sitemap', label: 'Sitemap' },
					{ id: 'assets', label: 'Assets' },
					{ id: 'static-generation', label: 'Static Generation' }
				]
			},
			{
				label: 'Deployment',
				pages: [
					{ id: 'production-build', label: 'Production Build' },
					{ id: 'hosting', label: 'Hosting' },
					{ id: 'docker', label: 'Docker' }
				]
			},
			{
				label: 'Reference',
				pages: [
					{ id: 'page-handlers', label: 'Page Handlers' },
					{ id: 'types', label: 'Types' }
				]
			}
		],
		label: 'Framework'
	},
	{
		entries: [
			{
				label: 'Absolute Auth',
				pages: [
					{ id: 'absolute-auth', label: 'Overview' },
					{ id: 'auth-credentials', label: 'Credentials & MFA' },
					{ id: 'auth-mfa', label: 'Multi-Factor Auth' },
					{ id: 'auth-sso', label: 'Enterprise SSO & SCIM' },
					{
						id: 'auth-organizations',
						label: 'Organizations & RBAC'
					},
					{ id: 'auth-apikeys', label: 'API Keys & M2M' },
					{ id: 'auth-adaptive', label: 'Adaptive Auth' },
					{
						id: 'auth-oidc-provider',
						label: 'OAuth2 / OIDC Provider'
					},
					{ id: 'auth-fga', label: 'Fine-Grained Authz' },
					{ id: 'auth-impersonation', label: 'Admin Impersonation' },
					{ id: 'auth-abuse', label: 'Bot & Abuse Protection' },
					{
						id: 'auth-audit-integrity',
						label: 'Tamper-evident Audit'
					},
					{
						id: 'auth-multi-session',
						label: 'Multi-session & Guest'
					},
					{
						id: 'auth-credential-hardening',
						label: 'Credential Hardening'
					},
					{
						id: 'auth-passwordless',
						label: 'Passwordless & Passkeys'
					},
					{
						id: 'auth-compliance',
						label: 'Audit, Compliance & Webhooks'
					},
					{ id: 'auth-actions', label: 'Actions Pipeline' },
					{ id: 'auth-vault', label: 'Vault' },
					{ id: 'auth-plugins', label: 'First-party Plugins' },
					{ id: 'auth-client', label: 'Client SDK & Hooks' },
					{
						id: 'auth-verifiable-credentials',
						label: 'Verifiable Credentials'
					},
					{ id: 'auth-ciba', label: 'CIBA (Backchannel Auth)' },
					{ id: 'auth-mtls', label: 'mTLS & Cert-Bound Tokens' },
					{ id: 'auth-observability', label: 'Observability' },
					{ id: 'auth-migrations', label: 'Database Migrations' }
				],
				status: 'beta'
			},
			{ id: 'citra', label: 'Citra', status: 'beta' },
			{
				id: 'linked-providers',
				label: 'Linked Providers',
				status: 'alpha'
			},
			{ id: 'compliance', label: 'Compliance', status: 'beta' }
		],
		label: 'Auth & Identity'
	},
	{
		entries: [
			{
				label: 'Sync',
				pages: [
					{ id: 'sync-overview', label: 'Overview' },
					{ id: 'sync-eden', label: 'End-to-end Types' },
					{ id: 'sync-graph', label: 'Operator-graph Queries' },
					{ id: 'sync-actions', label: 'Actions, Jobs & Schedules' },
					{ id: 'sync-crdt', label: 'CRDT & Collaboration' },
					{ id: 'sync-sandbox', label: 'Sandboxed Mutations' },
					{ id: 'sync-frameworks', label: 'Framework Hooks' },
					{ id: 'sync-adapters', label: 'CRDT Adapters' },
					{ id: 'sync-packs', label: 'Sync Packs' },
					{ id: 'sync-code-mode', label: 'Code Mode for Mutations' },
					{
						id: 'sync-unsafe-host',
						label: 'unsafeHost Escape Hatch'
					},
					{ id: 'cluster-bus-overview', label: 'Cluster Bus' },
					{ id: 'sync-launch', label: 'Release Notes' },
					{ id: 'sync-vs-convex', label: 'vs Convex' },
					{ id: 'sync-vs-firebase', label: 'vs Firebase' },
					{ id: 'sync-we-heard-you', label: 'We Heard You' }
				]
			},
			{
				label: 'Queue',
				pages: [
					{ id: 'queue-overview', label: 'Overview' },
					{ id: 'queue-jobs', label: 'Jobs & Scheduling' },
					{ id: 'queue-operations', label: 'Operations' }
				],
				status: 'beta'
			},
			{ id: 'blob', label: 'Blob', status: 'beta' }
		],
		label: 'Data & Sync'
	},
	{
		entries: [
			{
				label: 'AI Runtime',
				pages: [
					{ id: 'ai-overview', label: 'Overview' },
					{ id: 'ai-providers', label: 'Providers' },
					{ id: 'ai-plugin', label: 'Plugin' },
					{ id: 'ai-tools', label: 'Tools' },
					{ id: 'ai-streaming', label: 'Streaming & Protocol' }
				],
				status: 'beta'
			},
			{
				label: 'RAG',
				pages: [
					{ id: 'rag-overview', label: 'Overview' },
					{ id: 'rag-ingestion', label: 'Ingestion & Chunking' },
					{ id: 'rag-retrieval', label: 'Retrieval & Adapters' },
					{ id: 'rag-quality', label: 'Quality & Governance' },
					{ id: 'rag-frameworks', label: 'Frameworks & Chat' }
				],
				status: 'beta'
			},
			{
				label: 'MCP',
				pages: [
					{ id: 'mcp-overview', label: 'Overview' },
					{ id: 'mcp-endpoints', label: 'Endpoints & Transport' },
					{
						id: 'mcp-capabilities',
						label: 'Guards, Prompts & Resources'
					},
					{ id: 'mcp-feedback', label: 'Feedback & Elicitation' }
				],
				status: 'beta'
			},
			{ id: 'manifest', label: 'Manifest', status: 'beta' },
			{ id: 'rules', label: 'Rules', status: 'alpha' },
			{ id: 'outcomes', label: 'Outcomes', status: 'beta' }
		],
		label: 'AI & Agents'
	},
	{
		entries: [
			{
				label: 'Voice',
				pages: [
					{ id: 'voice', label: 'Overview' },
					{ id: 'voice-ecosystem', label: 'Ecosystem' },
					{ id: 'voice-comparison', label: 'Comparison' },
					{ id: 'voice-runtime', label: 'Runtime' },
					{ id: 'voice-adapters', label: 'Adapters' },
					{
						id: 'voice-adapter-contracts',
						label: 'Adapter Contracts'
					},
					{ id: 'voice-route-surfaces', label: 'Route Surfaces' },
					{
						id: 'voice-assistants-tools',
						label: 'Assistants & Tools'
					},
					{ id: 'voice-telephony', label: 'Telephony' },
					{ id: 'voice-ops-proof', label: 'Ops & Proof' },
					{
						id: 'voice-client-frameworks',
						label: 'Client & Frameworks'
					},
					{ id: 'voice-tester', label: 'Tester' },
					{ id: 'voice-tester-scenarios', label: 'Tester Scenarios' },
					{ id: 'voice-tester-discord', label: 'Discord Testing' },
					{ id: 'voice-storage-testing', label: 'Storage & Testing' },
					{ id: 'voice-api-reference', label: 'API Reference' }
				],
				status: 'beta'
			},
			{ id: 'media', label: 'Media', status: 'beta' },
			{ id: 'meeting', label: 'Meeting', status: 'beta' }
		],
		label: 'Voice & Media'
	},
	{
		entries: [
			{ id: 'platform-overview', label: 'Platform Tools' },
			{ id: 'runtime', label: 'Runtime', status: 'beta' },
			{ id: 'router', label: 'Router', status: 'beta' },
			{ id: 'deploy', label: 'Deploy', status: 'beta' },
			{ id: 'secrets', label: 'Secrets', status: 'beta' },
			{ id: 'metering', label: 'Metering', status: 'beta' },
			{ id: 'billing', label: 'Billing', status: 'beta' },
			{
				id: 'autoscaler',
				label: 'Autoscaler',
				status: 'beta'
			},
			{ id: 'health', label: 'Health', status: 'beta' },
			{ id: 'cli', label: 'Ops CLI', status: 'beta' },
			{
				label: 'isolated-jsc',
				pages: [
					{ id: 'isolated-jsc', label: 'Overview' },
					{ id: 'isolated-jsc-bun', label: 'For Bun' },
					{
						id: 'isolated-jsc-hibernation',
						label: 'Pool Hibernation'
					}
				],
				status: 'beta'
			},
			{
				id: 'rate-limit',
				label: 'Rate Limit',
				status: 'beta'
			}
		],
		label: 'Platform & Infra'
	},
	{
		entries: [
			{
				label: 'Error Pipeline',
				pages: [
					{ id: 'error-pipeline', label: 'Pipeline Overview' },
					{ id: 'errors-overview', label: 'Errors' },
					{ id: 'beacon-overview', label: 'Beacon' },
					{ id: 'replay-overview', label: 'Replay' }
				]
			},
			{ id: 'telemetry-package', label: 'Telemetry', status: 'beta' },
			{ id: 'metrics', label: 'Metrics', status: 'beta' },
			{ id: 'logs-package', label: 'Logs', status: 'beta' },
			{ id: 'audit', label: 'Audit', status: 'alpha' }
		],
		label: 'Observability'
	},
	{
		entries: [
			{ id: 'attribution', label: 'Attribution', status: 'beta' },
			{ id: 'commerce', label: 'Commerce', status: 'beta' },
			{ id: 'crm', label: 'CRM', status: 'alpha' },
			{ id: 'discover', label: 'Discover', status: 'alpha' },
			{ id: 'enrich', label: 'Enrich', status: 'beta' },
			{ id: 'audience', label: 'Audience', status: 'alpha' },
			{
				id: 'partnership',
				label: 'Partnership',
				status: 'alpha'
			},
			{
				id: 'engagement-overview',
				label: 'Engagement',
				status: 'alpha'
			},
			{ id: 'dispatch', label: 'Dispatch', status: 'alpha' },
			{ id: 'email', label: 'Email', status: 'alpha' },
			{ id: 'onchain', label: 'Onchain', status: 'alpha' }
		],
		label: 'Commerce & Growth'
	},
	{
		entries: [
			{ id: 'pwa', label: 'PWA', status: 'beta' },
			{
				label: 'Tour',
				pages: [
					{ id: 'tour-overview', label: 'Overview' },
					{ id: 'tour-actions', label: 'Actions & Demo Data' },
					{ id: 'tour-branching', label: 'Branching & Events' },
					{ id: 'tour-checklist', label: 'Checklist & Hotspots' }
				],
				status: 'beta'
			},
			{ id: 'scoped-state', label: 'Scoped State', status: 'beta' },
			{
				id: 'vue-composables',
				label: 'Vue Composables',
				status: 'beta'
			},
			{
				label: 'Demo',
				pages: [
					{ id: 'demo-overview', label: 'Overview' },
					{ id: 'demo-browser', label: 'Browser & Desktop' },
					{ id: 'demo-recording', label: 'Recording & Voiceover' }
				],
				status: 'beta'
			}
		],
		label: 'Frontend & UX'
	},
	{
		entries: [
			{
				id: 'create-absolutejs',
				label: 'Create AbsoluteJS',
				status: 'beta'
			},
			{
				label: 'ESLint',
				pages: [
					{ id: 'eslint', label: 'Overview' },
					{
						id: 'eslint-angular-one-feature-per-file',
						label: 'angular-one-feature-per-file'
					},
					{
						id: 'eslint-explicit-object-types',
						label: 'explicit-object-types'
					},
					{
						id: 'eslint-inline-style-limit',
						label: 'inline-style-limit'
					},
					{
						id: 'eslint-localize-react-props',
						label: 'localize-react-props'
					},
					{
						id: 'eslint-max-depth-extended',
						label: 'max-depth-extended'
					},
					{ id: 'eslint-max-jsxnesting', label: 'max-jsxnesting' },
					{ id: 'eslint-min-var-length', label: 'min-var-length' },
					{
						id: 'eslint-no-button-navigation',
						label: 'no-button-navigation'
					},
					{
						id: 'eslint-no-explicit-return-type',
						label: 'no-explicit-return-type'
					},
					{
						id: 'eslint-no-import-meta-path',
						label: 'no-import-meta-path'
					},
					{
						id: 'eslint-no-inline-object-types',
						label: 'no-inline-object-types'
					},
					{
						id: 'eslint-no-multi-style-objects',
						label: 'no-multi-style-objects'
					},
					{
						id: 'eslint-no-nested-jsx-return',
						label: 'no-nested-jsx-return'
					},
					{
						id: 'eslint-no-nondeterministic-render',
						label: 'no-nondeterministic-render'
					},
					{
						id: 'eslint-no-or-none-component',
						label: 'no-or-none-component'
					},
					{
						id: 'eslint-no-redundant-type-annotation',
						label: 'no-redundant-type-annotation'
					},
					{
						id: 'eslint-no-transition-cssproperties',
						label: 'no-transition-cssproperties'
					},
					{
						id: 'eslint-no-trivial-alias',
						label: 'no-trivial-alias'
					},
					{
						id: 'eslint-no-unnecessary-div',
						label: 'no-unnecessary-div'
					},
					{
						id: 'eslint-no-unnecessary-key',
						label: 'no-unnecessary-key'
					},
					{
						id: 'eslint-no-useless-catch',
						label: 'no-useless-catch'
					},
					{
						id: 'eslint-no-useless-function',
						label: 'no-useless-function'
					},
					{
						id: 'eslint-prefer-inline-exports',
						label: 'prefer-inline-exports'
					},
					{
						id: 'eslint-seperate-style-files',
						label: 'seperate-style-files'
					},
					{ id: 'eslint-sort-exports', label: 'sort-exports' },
					{
						id: 'eslint-sort-keys-fixable',
						label: 'sort-keys-fixable'
					},
					{
						id: 'eslint-spring-naming-convention',
						label: 'spring-naming-convention'
					}
				],
				status: 'beta'
			},
			{
				id: 'vscode-extension',
				label: 'VS Code Extension',
				status: 'alpha'
			},
			{ id: 'renown', label: 'Renown', status: 'beta' }
		],
		label: 'Dev Tools'
	}
];

const sidebarLabelByPackageCategory: Record<string, string> = {
	AI: 'AI & Agents',
	'Auth & Identity': 'Auth & Identity',
	'Commerce & Growth': 'Commerce & Growth',
	'Data & Sync': 'Data & Sync',
	'Dev Tools': 'Dev Tools',
	'Frontend & UX': 'Frontend & UX',
	Messaging: 'Messaging',
	Observability: 'Observability',
	'On-chain': 'On-chain',
	'Platform & Infra': 'Platform & Infra',
	'Voice & Media': 'Voice & Media'
};

const generatedEntriesFor = (sidebarLabel: string) =>
	packageApiSidebarEntries
		.filter(
			(candidate) =>
				sidebarLabelByPackageCategory[candidate.category] ===
				sidebarLabel
		)
		.map((candidate) => candidate.entry);

const existingSidebarLabels = new Set(
	baseSidebarCategories.map((category) => category.label)
);

export const sidebarCategories: SidebarCategory[] = [
	...baseSidebarCategories.map((category) => ({
		...category,
		entries: [...category.entries, ...generatedEntriesFor(category.label)]
	})),
	...Array.from(new Set(Object.values(sidebarLabelByPackageCategory)))
		.filter((label) => !existingSidebarLabels.has(label))
		.map((label) => ({ entries: generatedEntriesFor(label), label }))
];
