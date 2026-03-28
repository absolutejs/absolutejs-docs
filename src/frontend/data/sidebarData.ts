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
import { AssetsView } from '../components/documentation/config/AssetsView';
import { EnvironmentVariablesView } from '../components/documentation/config/EnvironmentVariablesView';
import { HeadMetaTagsView } from '../components/documentation/config/HeadMetaTagsView';
import { SitemapView } from '../components/documentation/config/SitemapView';
import { TailwindCSSView } from '../components/documentation/config/TailwindCSSView';
import { BuildManifestView } from '../components/documentation/core/BuildManifestView';
import { RoutingHandlersView } from '../components/documentation/core/RoutingHandlersView';
import { SSRModelView } from '../components/documentation/core/SSRModelView';
import { DataFetchingView } from '../components/documentation/data/DataFetchingView';
import { ServerStateView } from '../components/documentation/data/ServerStateView';
import { DockerView } from '../components/documentation/deployment/DockerView';
import { HostingView } from '../components/documentation/deployment/HostingView';
import { ProductionBuildView } from '../components/documentation/deployment/ProductionBuildView';
import { StaticGenerationView } from '../components/documentation/deployment/StaticGenerationView';
import { ExamplesRecipesView } from '../components/documentation/examples/ExamplesRecipesView';
import { AngularView } from '../components/documentation/frontends/AngularView';
import { HTMLView } from '../components/documentation/frontends/HTMLView';
import { HTMXView } from '../components/documentation/frontends/HTMXView';
import { ReactView } from '../components/documentation/frontends/ReactView';
import { SvelteView } from '../components/documentation/frontends/SvelteView';
import { VueView } from '../components/documentation/frontends/VueView';
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
import { NetworkingPluginView } from '../components/documentation/server/NetworkingPluginView';

const definePortalViews = <T>(views: T) => views;

export const docsViews = definePortalViews({
	'absolute-auth': AbsoluteAuthView,
	angular: AngularView,
	assets: AssetsView,
	'build-and-manifest': BuildManifestView,
	citra: CitraView,
	compile: CompileView,
	'create-absolutejs': CreateAbsoluteJSView,
	'data-fetching': DataFetchingView,
	dev: DevView,
	docker: DockerView,
	'eslint-prettier': EslintPrettierView,
	'elysia-integration': ElysiaIntegrationView,
	'environment-variables': EnvironmentVariablesView,
	eslint: EslintView,
	'examples-recipes': ExamplesRecipesView,
	'head-meta-tags': HeadMetaTagsView,
	hosting: HostingView,
	html: HTMLView,
	htmx: HTMXView,
	info: InfoView,
	installation: InstallationView,
	mkcert: MkcertView,
	'networking-plugin': NetworkingPluginView,
	overview: Overview,
	'page-handlers': PageHandlersView,
	'production-build': ProductionBuildView,
	quickstart: QuickstartView,
	react: ReactView,
	'routing-and-handlers': RoutingHandlersView,
	'scoped-state': ScopedStateView,
	'server-state': ServerStateView,
	sitemap: SitemapView,
	'ssr-model': SSRModelView,
	start: StartView,
	'static-generation': StaticGenerationView,
	telemetry: TelemetryView,
	svelte: SvelteView,
	'tailwind-css': TailwindCSSView,
	types: TypesView,
	vue: VueView
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
			{ id: 'routing-and-handlers', label: 'Routing & Handlers' }
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
			{ id: 'mkcert', label: 'Mkcert' },
			{ id: 'telemetry', label: 'Telemetry' },
			{ id: 'info', label: 'Info' }
		],
		icon: animated(FaTerminal),
		label: 'CLI'
	},
	{
		buttons: [
			{ id: 'react', label: 'React' },
			{ id: 'svelte', label: 'Svelte' },
			{ id: 'html', label: 'HTML' },
			{ id: 'htmx', label: 'HTMX' },
			{ id: 'vue', label: 'Vue' },
			{ id: 'angular', label: 'Angular' }
		],
		icon: animated(FaCubes),
		label: 'Frontends'
	},
	{
		buttons: [
			{ id: 'elysia-integration', label: 'Elysia Integration' },
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
