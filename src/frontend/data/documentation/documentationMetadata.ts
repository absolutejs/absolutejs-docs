import { ecosystemProjects } from './packages/ecosystem.generated';
import { flagshipGuidanceByPackage } from './packages/flagshipGuidance';
import {
	documentationViewByDirectory,
	packageProjectViewId,
	packageSubpackageViewId
} from './packages/packageRoutes';
import { outcomePlaybooks } from './outcomePlaybooks';

type DocumentationMetadata = {
	description: string;
	title: string;
};

const metadataByView = new Map<string, DocumentationMetadata>();
const maximumDescriptionLength = 158;

const conciseDescription = (value: string) => {
	if (value.length <= maximumDescriptionLength) return value;

	return `${value.slice(0, maximumDescriptionLength - 1).trimEnd()}…`;
};

for (const project of ecosystemProjects) {
	const packageLabel = project.packageName ?? project.name;
	const flagshipGuidance = project.packageName
		? flagshipGuidanceByPackage[project.packageName]
		: undefined;
	const guideMetadata: DocumentationMetadata = {
		description: conciseDescription(
			flagshipGuidance
				? `${project.description} ${flagshipGuidance.outcomes[0]?.description ?? ''}`
				: project.description
		),
		title: `${project.name} Guide | AbsoluteJS`
	};
	const referenceMetadata: DocumentationMetadata = {
		description: `Install ${packageLabel}, inspect its public exports, and use its API with source-backed AbsoluteJS examples.`,
		title: `${packageLabel} Installation, Exports and API | AbsoluteJS`
	};
	metadataByView.set(
		packageProjectViewId(project),
		flagshipGuidance ? guideMetadata : referenceMetadata
	);
	const guideView = documentationViewByDirectory[project.directory];
	if (guideView) metadataByView.set(guideView, guideMetadata);

	for (const subpackage of project.subpackages) {
		metadataByView.set(packageSubpackageViewId(project, subpackage), {
			description: `Install ${subpackage.name}, inspect its public exports, and use it within the ${project.name} workspace.`,
			title: `${subpackage.name} Installation and API | AbsoluteJS`
		});
	}
}

metadataByView.set('rag-research', {
	description:
		'Configure search, reading, extraction and field review, with six framework bindings, company discovery, durable batches and monitoring.',
	title: 'Web Research Workflows | AbsoluteJS'
});
metadataByView.set('rag-web-index', {
	description:
		'Crawl selected public sites, retain versioned evidence, search PostgreSQL and reuse the same research workflows across six frameworks.',
	title: 'Owned Web Indexes | AbsoluteJS'
});

metadataByView.set('native-apps', {
	description:
		'Turn any AbsoluteJS app into an iOS and Android app with one config: your pages, sign-in, offline data, device features, push and store releases.',
	title: 'Native iOS and Android Apps | AbsoluteJS'
});

metadataByView.set('native-quickstart', {
	description:
		'Run your AbsoluteJS app on iOS and Android: add the mobile config, create the native projects, and start bun dev on an emulator, simulator or phone.',
	title: 'Native App Quickstart: iOS and Android | AbsoluteJS'
});
metadataByView.set('native-how-it-works', {
	description:
		'How pages are packaged into the app, how each page gets its data from your server, what works offline, and how older installed apps keep working.',
	title: 'How AbsoluteJS Native Apps Work | AbsoluteJS'
});
metadataByView.set('native-devices', {
	description:
		'Camera, location, notifications, files, share and more through one import that uses native APIs in the app and browser APIs on the web.',
	title: 'Device APIs for iOS, Android and Web | AbsoluteJS'
});
metadataByView.set('native-auth-sync', {
	description:
		'Sign users in through the system browser, keep their data encrypted and synced offline, and call your API, with no changes to page code.',
	title: 'Native Sign-in, Offline Sync and HTTP | AbsoluteJS'
});
metadataByView.set('native-push', {
	description:
		'Enable push with one call, register devices as the signed-in user, and send through APNs, FCM and Web Push with Dispatch.',
	title: 'Push Notifications for iOS, Android and Web | AbsoluteJS'
});
metadataByView.set('native-navigation-ui', {
	description:
		'How links, Back, transitions and restoration work in AbsoluteJS apps, plus safe-area CSS variables, tab bars and sheets that work in every framework.',
	title: 'Native App Navigation, Safe Areas and UI Primitives | AbsoluteJS'
});
metadataByView.set('native-branding-links', {
	description:
		'Generate every iOS and Android icon and launch screen from one PNG, and open your app from universal links, app links and custom URL schemes.',
	title: 'App Icons, Splash Screens and Deep Links | AbsoluteJS'
});
metadataByView.set('native-development', {
	description:
		'Run your AbsoluteJS app on Android emulators, iOS simulators and phones with live reload, a browser preview, and iOS builds from Linux or Windows.',
	title: 'Native App Development: Emulators, Devices and Remote Mac | AbsoluteJS'
});
metadataByView.set('native-release', {
	description:
		'Build signed AAB and IPA releases, run the release doctor, certify the exact artifact, publish to Google Play and TestFlight, and generate GitHub Actions CI.',
	title: 'Release iOS and Android Apps to the Stores | AbsoluteJS'
});
metadataByView.set('native-updates', {
	description:
		'Ship signed fixes to installed iOS and Android apps without a store release, with staged rollout, fleet health checks and automatic rollback.',
	title: 'Over-the-Air Updates for Native Apps | AbsoluteJS'
});
metadataByView.set('native-expo', {
	description:
		'Use Expo when specific screens need React Native: long lists, gestures, native navigation. Every other page keeps working unchanged in the app.',
	title: 'Expo: React Native Screens in AbsoluteJS Apps | AbsoluteJS'
});
metadataByView.set('native-config', {
	description:
		'Every field of the mobile block in absolute.config.ts: app identity, platforms, deep links, branding, push, observability, updates and Expo routes.',
	title: 'Mobile Config Reference | AbsoluteJS'
});
metadataByView.set('native-cli', {
	description:
		'Every absolute mobile command and absolute dev mobile flag: init, sync, assets, doctor, build, publish, certify, CI, over-the-air updates and env vars.',
	title: 'Mobile CLI Reference: absolute mobile | AbsoluteJS'
});

metadataByView.set('native-testing', {
	description:
		'Install emulators in one command, test your app in its real WebView, and prove the exact signed release launches offline on Android, iOS and TestFlight.',
	title: 'Testing Native Apps on Emulators, Simulators and iPhones | AbsoluteJS'
});

metadataByView.set('packages', {
	description:
		'Explore every AbsoluteJS package, adapter, module, extension, example, and development tool.',
	title: 'Packages | AbsoluteJS'
});
for (const playbook of outcomePlaybooks)
	metadataByView.set(playbook.id, {
		description: conciseDescription(playbook.description),
		title: `${playbook.title} Playbook | AbsoluteJS`
	});

const titleCase = (value: string) =>
	value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');

export const documentationMetadataFor = (view: string) =>
	metadataByView.get(view) ?? {
		description: `AbsoluteJS documentation for ${titleCase(view)}.`,
		title: `${titleCase(view)} | AbsoluteJS`
	};

export const documentationStructuredDataFor = (view: string) => {
	const metadata = documentationMetadataFor(view);
	const path = view === 'overview' ? '' : `/${view}`;
	const url = `https://absolutejs.com/documentation${path}`;
	const breadcrumb: Record<string, unknown> = {
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				item: 'https://absolutejs.com/',
				name: 'AbsoluteJS',
				position: 1
			},
			{
				'@type': 'ListItem',
				item: 'https://absolutejs.com/documentation',
				name: 'Documentation',
				position: 2
			},
			{
				'@type': 'ListItem',
				item: url,
				name: metadata.title.replace(/ \| AbsoluteJS$/, ''),
				position: 3
			}
		]
	};

	const project = ecosystemProjects.find(
		(candidate) =>
			packageProjectViewId(candidate) === view ||
			candidate.subpackages.some(
				(subpackage) =>
					packageSubpackageViewId(candidate, subpackage) === view
			)
	);
	const playbook = outcomePlaybooks.find(
		(candidate) => candidate.id === view
	);
	if (playbook)
		return JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				breadcrumb,
				{
					'@type': 'HowTo',
					description: playbook.description,
					name: playbook.title,
					step: playbook.quickstart.map((step, index) => ({
						'@type': 'HowToStep',
						name: step.label,
						position: index + 1,
						text: `${step.detail} Verify: ${step.verify}`
					})),
					supply: playbook.packages.map((packageRole) => ({
						'@type': 'HowToSupply',
						name: packageRole.name
					})),
					url
				}
			]
		});
	if (project) {
		if (packageProjectViewId(project) === view)
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					breadcrumb,
					{
						'@type': 'SoftwareSourceCode',
						codeRepository: project.repository ?? undefined,
						description: project.description,
						name: project.packageName ?? project.name,
						programmingLanguage: 'TypeScript',
						runtimePlatform: 'Bun',
						url,
						version: project.version ?? undefined
					}
				]
			});

		const subpackage = project.subpackages.find(
			(candidate) => packageSubpackageViewId(project, candidate) === view
		);
		if (subpackage)
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					breadcrumb,
					{
						'@type': 'SoftwareSourceCode',
						codeRepository: project.repository ?? undefined,
						description: subpackage.description,
						name: subpackage.name,
						programmingLanguage: 'TypeScript',
						runtimePlatform: 'Bun',
						url,
						version: subpackage.version ?? undefined
					}
				]
			});
	}

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			breadcrumb,
			{
				'@type': 'TechArticle',
				description: metadata.description,
				headline: metadata.title.replace(/ \| AbsoluteJS$/, ''),
				inLanguage: 'en-US',
				url
			}
		]
	});
};
