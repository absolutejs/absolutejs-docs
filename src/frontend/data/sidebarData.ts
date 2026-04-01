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
	FaTerminal
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
import { LoadingStatesView } from '../components/documentation/core/LoadingStatesView';
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
import { ElysiaIntegrationView } from '../components/documentation/server/ElysiaIntegrationView';
import { MiddlewareView } from '../components/documentation/server/MiddlewareView';
import { NetworkingPluginView } from '../components/documentation/server/NetworkingPluginView';
import { AngularOverviewView } from '../components/documentation/angular/AngularOverviewView';
import { AngularComponentsView } from '../components/documentation/angular/AngularComponentsView';
import { HTMLOverviewView } from '../components/documentation/html/HTMLOverviewView';
import { HTMLImageOptView } from '../components/documentation/html/HTMLImageOptView';
import { HTMXOverviewView } from '../components/documentation/htmx/HTMXOverviewView';
import { ReactOverviewView } from '../components/documentation/react/ReactOverviewView';
import { ReactComponentsView } from '../components/documentation/react/ReactComponentsView';
import { ReactHooksView } from '../components/documentation/react/ReactHooksView';
import { SvelteOverviewView } from '../components/documentation/svelte/SvelteOverviewView';
import { SvelteComponentsView } from '../components/documentation/svelte/SvelteComponentsView';
import { VueOverviewView } from '../components/documentation/vue/VueOverviewView';
import { VueComponentsView } from '../components/documentation/vue/VueComponentsView';

const definePortalViews = <T>(views: T) => views;

export const docsViews = definePortalViews({
	'absolute-auth': AbsoluteAuthView,
	'angular-components': AngularComponentsView,
	'angular-overview': AngularOverviewView,
	assets: AssetsView,
	'build-and-manifest': BuildManifestView,
	citra: CitraView,
	compile: CompileView,
	'create-absolutejs': CreateAbsoluteJSView,
	'data-fetching': DataFetchingView,
	dev: DevView,
	docker: DockerView,
	'eslint-prettier': EslintPrettierView,
	'error-boundaries': ErrorBoundariesView,
	'elysia-integration': ElysiaIntegrationView,
	'environment-variables': EnvironmentVariablesView,
	eslint: EslintView,
	'examples-recipes': ExamplesRecipesView,
	'head-meta-tags': HeadMetaTagsView,
	hosting: HostingView,
	'html-image-optimization': HTMLImageOptView,
	'html-overview': HTMLOverviewView,
	'htmx-overview': HTMXOverviewView,
	'image-optimization': ImageOptimizationView,
	info: InfoView,
	installation: InstallationView,
	'loading-states': LoadingStatesView,
	middleware: MiddlewareView,
	mkcert: MkcertView,
	'networking-plugin': NetworkingPluginView,
	overview: Overview,
	'page-handlers': PageHandlersView,
	'production-build': ProductionBuildView,
	quickstart: QuickstartView,
	'react-components': ReactComponentsView,
	'react-hooks': ReactHooksView,
	'react-overview': ReactOverviewView,
	'routing-and-handlers': RoutingHandlersView,
	'scoped-state': ScopedStateView,
	'server-state': ServerStateView,
	sitemap: SitemapView,
	'ssr-model': SSRModelView,
	start: StartView,
	'static-generation': StaticGenerationView,
	'svelte-components': SvelteComponentsView,
	'svelte-overview': SvelteOverviewView,
	'tailwind-css': TailwindCSSView,
	telemetry: TelemetryView,
	typecheck: TypecheckView,
	'type-safety': TypeSafetyView,
	types: TypesView,
	'vue-components': VueComponentsView,
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
			{ id: 'error-boundaries', label: 'Error Boundaries' },
			{ id: 'loading-states', label: 'Loading States' }
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
			{ id: 'react-hooks', label: 'Hooks' }
		],
		icon: animated(FaCubes),
		label: 'React'
	},
	{
		buttons: [
			{ id: 'svelte-overview', label: 'Overview' },
			{ id: 'svelte-components', label: 'Components' }
		],
		icon: animated(FaCubes),
		label: 'Svelte'
	},
	{
		buttons: [
			{ id: 'vue-overview', label: 'Overview' },
			{ id: 'vue-components', label: 'Components' }
		],
		icon: animated(FaCubes),
		label: 'Vue'
	},
	{
		buttons: [
			{ id: 'angular-overview', label: 'Overview' },
			{ id: 'angular-components', label: 'Components' }
		],
		icon: animated(FaCubes),
		label: 'Angular'
	},
	{
		buttons: [
			{ id: 'html-overview', label: 'Overview' },
			{ id: 'html-image-optimization', label: 'Image Optimization' }
		],
		icon: animated(FaCubes),
		label: 'HTML'
	},
	{
		buttons: [{ id: 'htmx-overview', label: 'Overview' }],
		icon: animated(FaCubes),
		label: 'HTMX'
	},
	{
		buttons: [
			{ id: 'elysia-integration', label: 'Elysia Integration' },
			{ id: 'middleware', label: 'Middleware' },
			{ id: 'networking-plugin', label: 'Networking Plugin' }
		],
		icon: animated(FaServer),
		label: 'Server'
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
