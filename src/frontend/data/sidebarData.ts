import { animated } from '@react-spring/web';
import {
	FaBook,
	FaRocket,
	FaCubes,
	FaLayerGroup,
	FaServer,
	FaDatabase,
	FaCloudUploadAlt,
	FaCode,
	FaPuzzlePiece,
	FaCog,
	FaLightbulb,
	FaTerminal,
	FaRobot
} from 'react-icons/fa';
import { MenuItem } from '../../types/types';
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
import { RoutingHandlersView } from '../components/documentation/core/RoutingHandlersView';
import { SSRModelView } from '../components/documentation/core/SSRModelView';
import { TypeSafetyView } from '../components/documentation/core/TypeSafetyView';
import { DataFetchingView } from '../components/documentation/data/DataFetchingView';
import { ServerStateView } from '../components/documentation/data/ServerStateView';
import { DockerView } from '../components/documentation/deployment/DockerView';
import { HostingView } from '../components/documentation/deployment/HostingView';
import { ProductionBuildView } from '../components/documentation/deployment/ProductionBuildView';
import { StaticGenerationView } from '../components/documentation/deployment/StaticGenerationView';
import { ExamplesRecipesView } from '../components/documentation/examples/ExamplesRecipesView';
import { InstallationView } from '../components/documentation/getting-started/InstallationView';
import { QuickstartView } from '../components/documentation/getting-started/QuickstartView';
import { Overview } from '../components/documentation/overview/OverviewView';
import { CitraView } from '../components/documentation/packages/CitraView';
import { CreateAbsoluteJSView } from '../components/documentation/packages/CreateAbsoluteJSView';
import { ScopedStateView } from '../components/documentation/packages/ScopedStateView';
import { AbsoluteAuthView } from '../components/documentation/packages/auth/AbsoluteAuthView';
import { AuthAbuseView } from '../components/documentation/packages/auth/AuthAbuseView';
import { AuthActionsView } from '../components/documentation/packages/auth/AuthActionsView';
import { AuthAdaptiveView } from '../components/documentation/packages/auth/AuthAdaptiveView';
import { AuthApiKeysView } from '../components/documentation/packages/auth/AuthApiKeysView';
import { AuthAuditIntegrityView } from '../components/documentation/packages/auth/AuthAuditIntegrityView';
import { AuthComplianceView } from '../components/documentation/packages/auth/AuthComplianceView';
import { AuthCredentialHardeningView } from '../components/documentation/packages/auth/AuthCredentialHardeningView';
import { AuthCredentialsView } from '../components/documentation/packages/auth/AuthCredentialsView';
import { AuthFgaView } from '../components/documentation/packages/auth/AuthFgaView';
import { AuthImpersonationView } from '../components/documentation/packages/auth/AuthImpersonationView';
import { AuthMultiSessionView } from '../components/documentation/packages/auth/AuthMultiSessionView';
import { AuthOidcProviderView } from '../components/documentation/packages/auth/AuthOidcProviderView';
import { AuthOrganizationsView } from '../components/documentation/packages/auth/AuthOrganizationsView';
import { AuthPasswordlessView } from '../components/documentation/packages/auth/AuthPasswordlessView';
import { AuthSsoView } from '../components/documentation/packages/auth/AuthSsoView';
import { AuthVaultView } from '../components/documentation/packages/auth/AuthVaultView';
import { EslintRuleView } from '../components/documentation/packages/eslint/EslintRuleView';
import { EslintView } from '../components/documentation/packages/eslint/EslintView';
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

export const docsViews = definePortalViews({
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
	'auth-abuse': AuthAbuseView,
	'auth-actions': AuthActionsView,
	'auth-adaptive': AuthAdaptiveView,
	'auth-apikeys': AuthApiKeysView,
	'auth-audit-integrity': AuthAuditIntegrityView,
	'auth-compliance': AuthComplianceView,
	'auth-credential-hardening': AuthCredentialHardeningView,
	'auth-credentials': AuthCredentialsView,
	'auth-fga': AuthFgaView,
	'auth-impersonation': AuthImpersonationView,
	'auth-multi-session': AuthMultiSessionView,
	'auth-oidc-provider': AuthOidcProviderView,
	'auth-organizations': AuthOrganizationsView,
	'auth-passwordless': AuthPasswordlessView,
	'auth-sso': AuthSsoView,
	'auth-vault': AuthVaultView,
	'build-and-manifest': BuildManifestView,
	'bun-build-options': BunBuildOptionsView,
	citra: CitraView,
	compile: CompileView,
	config: ConfigView,
	'create-absolutejs': CreateAbsoluteJSView,
	'cron-jobs': CronJobsView,
	'data-fetching': DataFetchingView,
	db: DbView,
	dev: DevView,
	'dev-tunnel': TunnelView,
	docker: DockerView,
	doctor: DoctorView,
	'eden-treaty-performance': EdenTreatyPerformanceView,
	'elysia-cors': ElysiaCorsView,
	'elysia-integration': ElysiaIntegrationView,
	'elysia-plugin-composition': ElysiaPluginCompositionView,
	'elysia-validation': ElysiaValidationView,
	env: EnvView,
	'environment-variables': EnvironmentVariablesView,
	'error-boundaries': ErrorBoundariesView,
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
	'eslint-no-useless-function': EslintRuleView,
	'eslint-prefer-inline-exports': EslintRuleView,
	'eslint-prettier': EslintPrettierView,
	'eslint-seperate-style-files': EslintRuleView,
	'eslint-sort-exports': EslintRuleView,
	'eslint-sort-keys-fixable': EslintRuleView,
	'eslint-spring-naming-convention': EslintRuleView,
	'examples-recipes': ExamplesRecipesView,
	frameworks: FrameworksView,
	generate: GenerateView,
	'head-meta-tags': HeadMetaTagsView,
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
	'loading-states': LoadingStatesView,
	logs: LogsView,
	ls: LsView,
	mem: MemView,
	middleware: MiddlewareView,
	mkcert: MkcertView,
	'networking-plugin': NetworkingPluginView,
	'out-of-order-streaming': OutOfOrderStreamingView,
	overview: Overview,
	'page-handlers': PageHandlersView,
	'production-build': ProductionBuildView,
	ps: PsView,
	quickstart: QuickstartView,
	'react-ai': ReactAIView,
	'react-components': ReactComponentsView,
	'react-hooks': ReactHooksView,
	'react-islands': ReactIslandsView,
	'react-overview': ReactOverviewView,
	'react-spa': ReactSpaView,
	routes: RoutesView,
	'routing-and-handlers': RoutingHandlersView,
	'scoped-state': ScopedStateView,
	'server-state': ServerStateView,
	sitemap: SitemapView,
	'ssr-model': SSRModelView,
	start: StartView,
	'static-generation': StaticGenerationView,
	'svelte-ai': SvelteAIView,
	'svelte-components': SvelteComponentsView,
	'svelte-islands': SvelteIslandsView,
	'svelte-overview': SvelteOverviewView,
	'svelte-spa': SvelteSpaView,
	'tailwind-css': TailwindCSSView,
	telemetry: TelemetryView,
	'type-safety': TypeSafetyView,
	typecheck: TypecheckView,
	types: TypesView,
	'vue-ai': VueAIView,
	'vue-components': VueComponentsView,
	'vue-islands': VueIslandsView,
	'vue-overview': VueOverviewView,
	'vue-spa': VueSpaView
});

export const sidebarData: MenuItem[] = [
	{
		icon: animated(FaBook),
		id: 'overview',
		label: 'Overview'
	},
	{
		buttons: [
			{ id: 'installation', label: 'Installation' },
			{ id: 'quickstart', label: 'Quickstart' }
		],
		icon: animated(FaRocket),
		label: 'Getting Started'
	},
	{
		buttons: [
			{ id: 'ssr-model', label: 'SSR Model' },
			{ id: 'build-and-manifest', label: 'Build & Manifest' },
			{ id: 'routing-and-handlers', label: 'Routing & Handlers' },
			{ id: 'type-safety', label: 'Type Safety' },
			{ id: 'islands', label: 'Islands' },
			{ id: 'error-boundaries', label: 'Error Boundaries' },
			{ id: 'loading-states', label: 'Loading States' },
			{ id: 'out-of-order-streaming', label: 'Out-of-Order Streaming' }
		],
		icon: animated(FaLayerGroup),
		label: 'Core Concepts'
	},
	{
		buttons: [
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
		],
		icon: animated(FaTerminal),
		label: 'CLI'
	},
	{
		buttons: [
			{ id: 'react-overview', label: 'Overview' },
			{ id: 'react-components', label: 'Components' },
			{ id: 'react-hooks', label: 'Hooks' },
			{ id: 'react-spa', label: 'SPA' },
			{ id: 'react-islands', label: 'Islands' },
			{ id: 'react-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'React'
	},
	{
		buttons: [
			{ id: 'svelte-overview', label: 'Overview' },
			{ id: 'svelte-components', label: 'Components' },
			{ id: 'svelte-spa', label: 'SPA' },
			{ id: 'svelte-islands', label: 'Islands' },
			{ id: 'svelte-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'Svelte'
	},
	{
		buttons: [
			{ id: 'vue-overview', label: 'Overview' },
			{ id: 'vue-components', label: 'Components' },
			{ id: 'vue-spa', label: 'SPA' },
			{ id: 'vue-islands', label: 'Islands' },
			{ id: 'vue-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'Vue'
	},
	{
		buttons: [
			{ id: 'angular-overview', label: 'Overview' },
			{ id: 'angular-components', label: 'Components' },
			{ id: 'angular-spa', label: 'SPA' },
			{ id: 'angular-islands', label: 'Islands' },
			{ id: 'angular-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'Angular'
	},
	{
		buttons: [
			{ id: 'html-overview', label: 'Overview' },
			{ id: 'html-image-optimization', label: 'Image Optimization' },
			{ id: 'html-islands', label: 'Islands' },
			{ id: 'html-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'HTML'
	},
	{
		buttons: [
			{ id: 'htmx-overview', label: 'Overview' },
			{ id: 'htmx-islands', label: 'Islands' },
			{ id: 'htmx-ai', label: 'AI' }
		],
		icon: animated(FaCubes),
		label: 'HTMX'
	},
	{
		buttons: [
			{ id: 'elysia-integration', label: 'Overview' },
			{ id: 'elysia-plugin-composition', label: 'Plugin Composition' },
			{ id: 'eden-treaty-performance', label: 'Type Performance' },
			{ id: 'elysia-validation', label: 'Validation' },
			{ id: 'elysia-cors', label: 'CORS' },
			{ id: 'cron-jobs', label: 'Cron Jobs' },
			{ id: 'middleware', label: 'Middleware' },
			{ id: 'networking-plugin', label: 'Networking Plugin' },
			{ id: 'dev-tunnel', label: 'Dev Tunnel' }
		],
		icon: animated(FaServer),
		label: 'Elysia Integration'
	},
	{
		buttons: [
			{ id: 'ai-overview', label: 'Overview' },
			{ id: 'ai-providers', label: 'Providers' },
			{ id: 'ai-plugin', label: 'Plugin' },
			{ id: 'ai-tools', label: 'Tools' },
			{ id: 'ai-streaming', label: 'Streaming & Protocol' }
		],
		icon: animated(FaRobot),
		label: 'AI'
	},
	{
		buttons: [
			{
				buttons: [
					{ id: 'auth-credentials', label: 'Credentials & MFA' },
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
					{
						id: 'auth-impersonation',
						label: 'Admin Impersonation'
					},
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
					{ id: 'auth-vault', label: 'Vault' }
				],
				id: 'absolute-auth',
				label: 'Absolute Auth'
			},
			{ id: 'citra', label: 'Citra' },
			{ id: 'create-absolutejs', label: 'Create AbsoluteJS' },
			{
				buttons: [
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
					{
						id: 'eslint-max-jsxnesting',
						label: 'max-jsxnesting'
					},
					{
						id: 'eslint-min-var-length',
						label: 'min-var-length'
					},
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
					{
						id: 'eslint-sort-exports',
						label: 'sort-exports'
					},
					{
						id: 'eslint-sort-keys-fixable',
						label: 'sort-keys-fixable'
					},
					{
						id: 'eslint-spring-naming-convention',
						label: 'spring-naming-convention'
					}
				],
				id: 'eslint',
				label: 'ESLint'
			},
			{ id: 'scoped-state', label: 'Scoped State' }
		],
		icon: animated(FaPuzzlePiece),
		label: 'Ecosystem'
	},
	{
		buttons: [
			{ id: 'data-fetching', label: 'Data Fetching' },
			{ id: 'server-state', label: 'Server State' }
		],
		icon: animated(FaDatabase),
		label: 'Data & State'
	},
	{
		buttons: [
			{ id: 'environment-variables', label: 'Environment Variables' },
			{ id: 'bun-build-options', label: 'Bun Build Options' },
			{ id: 'tailwind-css', label: 'Tailwind CSS' },
			{ id: 'head-meta-tags', label: 'Head & Meta Tags' },
			{ id: 'image-optimization', label: 'Image Optimization' },
			{ id: 'sitemap', label: 'Sitemap' },
			{ id: 'assets', label: 'Assets' },
			{ id: 'static-generation', label: 'Static Generation' }
		],
		icon: animated(FaCog),
		label: 'Configuration'
	},
	{
		buttons: [
			{ id: 'production-build', label: 'Production Build' },
			{ id: 'hosting', label: 'Hosting' },
			{ id: 'docker', label: 'Docker' }
		],
		icon: animated(FaCloudUploadAlt),
		label: 'Deployment'
	},
	{
		buttons: [{ id: 'examples-recipes', label: 'Examples & Recipes' }],
		icon: animated(FaLightbulb),
		label: 'Examples'
	},
	{
		buttons: [
			{ id: 'page-handlers', label: 'Page Handlers' },
			{ id: 'types', label: 'Types' }
		],
		icon: animated(FaCode),
		label: 'Reference'
	}
];
