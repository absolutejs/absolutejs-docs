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
import { CompileView } from '../components/documentation/cli/CompileView';
import { DevView } from '../components/documentation/cli/DevView';
import { EslintPrettierView } from '../components/documentation/cli/EslintPrettierView';
import { InfoView } from '../components/documentation/cli/InfoView';
import { MkcertView } from '../components/documentation/cli/MkcertView';
import { StartView } from '../components/documentation/cli/StartView';
import { TelemetryView } from '../components/documentation/cli/TelemetryView';
import { TypecheckView } from '../components/documentation/cli/TypecheckView';
import { AssetsView } from '../components/documentation/config/AssetsView';
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
import { EslintView } from '../components/documentation/packages/eslint/EslintView';
import { PageHandlersView } from '../components/documentation/reference/PageHandlersView';
import { TypesView } from '../components/documentation/reference/TypesView';
import { CronJobsView } from '../components/documentation/server/CronJobsView';
import { ElysiaCorsView } from '../components/documentation/server/ElysiaCorsView';
import { ElysiaIntegrationView } from '../components/documentation/server/ElysiaIntegrationView';
import { ElysiaPluginCompositionView } from '../components/documentation/server/ElysiaPluginCompositionView';
import { ElysiaValidationView } from '../components/documentation/server/ElysiaValidationView';
import { MiddlewareView } from '../components/documentation/server/MiddlewareView';
import { NetworkingPluginView } from '../components/documentation/server/NetworkingPluginView';
import { AngularOverviewView } from '../components/documentation/angular/AngularOverviewView';
import { AngularComponentsView } from '../components/documentation/angular/AngularComponentsView';
import { HTMLOverviewView } from '../components/documentation/html/HTMLOverviewView';
import { HTMLImageOptView } from '../components/documentation/html/HTMLImageOptView';
import { HTMLAIView } from '../components/documentation/html/HTMLAIView';
import { HTMXOverviewView } from '../components/documentation/htmx/HTMXOverviewView';
import { HTMXAIView } from '../components/documentation/htmx/HTMXAIView';
import { ReactOverviewView } from '../components/documentation/react/ReactOverviewView';
import { ReactComponentsView } from '../components/documentation/react/ReactComponentsView';
import { ReactHooksView } from '../components/documentation/react/ReactHooksView';
import { SvelteOverviewView } from '../components/documentation/svelte/SvelteOverviewView';
import { SvelteComponentsView } from '../components/documentation/svelte/SvelteComponentsView';
import { VueOverviewView } from '../components/documentation/vue/VueOverviewView';
import { VueComponentsView } from '../components/documentation/vue/VueComponentsView';
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
	'angular-ai': AngularAIView,
	'angular-components': AngularComponentsView,
	'angular-islands': AngularIslandsView,
	'angular-overview': AngularOverviewView,
	assets: AssetsView,
	'build-and-manifest': BuildManifestView,
	citra: CitraView,
	compile: CompileView,
	'create-absolutejs': CreateAbsoluteJSView,
	'cron-jobs': CronJobsView,
	'data-fetching': DataFetchingView,
	dev: DevView,
	docker: DockerView,
	'elysia-cors': ElysiaCorsView,
	'elysia-integration': ElysiaIntegrationView,
	'elysia-plugin-composition': ElysiaPluginCompositionView,
	'elysia-validation': ElysiaValidationView,
	'environment-variables': EnvironmentVariablesView,
	'error-boundaries': ErrorBoundariesView,
	eslint: EslintView,
	'eslint-prettier': EslintPrettierView,
	'examples-recipes': ExamplesRecipesView,
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
	installation: InstallationView,
	islands: IslandsView,
	'loading-states': LoadingStatesView,
	middleware: MiddlewareView,
	mkcert: MkcertView,
	'networking-plugin': NetworkingPluginView,
	'out-of-order-streaming': OutOfOrderStreamingView,
	overview: Overview,
	'page-handlers': PageHandlersView,
	'production-build': ProductionBuildView,
	quickstart: QuickstartView,
	'react-ai': ReactAIView,
	'react-components': ReactComponentsView,
	'react-hooks': ReactHooksView,
	'react-islands': ReactIslandsView,
	'react-overview': ReactOverviewView,
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
	'tailwind-css': TailwindCSSView,
	telemetry: TelemetryView,
	'type-safety': TypeSafetyView,
	typecheck: TypecheckView,
	types: TypesView,
	'vue-ai': VueAIView,
	'vue-components': VueComponentsView,
	'vue-islands': VueIslandsView,
	'vue-overview': VueOverviewView
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
			{ id: 'elysia-validation', label: 'Validation' },
			{ id: 'elysia-cors', label: 'CORS' },
			{ id: 'cron-jobs', label: 'Cron Jobs' },
			{ id: 'middleware', label: 'Middleware' },
			{ id: 'networking-plugin', label: 'Networking Plugin' }
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
			{ id: 'absolute-auth', label: 'Absolute Auth' },
			{ id: 'citra', label: 'Citra' },
			{ id: 'create-absolutejs', label: 'Create AbsoluteJS' },
			{ id: 'eslint', label: 'ESLint' },
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
