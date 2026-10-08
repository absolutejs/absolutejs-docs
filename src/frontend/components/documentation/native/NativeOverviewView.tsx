import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeFirstRun,
	nativeMinimalConfig,
	nativeSamePageCode
} from '../../../data/documentation/native/nativeOverviewDocsCode';
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
import {
	ComparisonTable,
	type ComparisonRow
} from '../../utils/ComparisonTable';
import {
	DefinitionGrid,
	type DefinitionItem
} from '../../utils/DefinitionGrid';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PackageCardGrid, type PackageCard } from '../../utils/PackageCardGrid';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { TerminalFrame } from '../../utils/TerminalFrame';

const tocItems: TocItem[] = [
	{ href: '#one-config', label: 'One config' },
	{ href: '#what-you-get', label: 'What you get' },
	{ href: '#how-it-works', label: 'How it works' },
	{ href: '#same-code', label: 'Same code everywhere' },
	{ href: '#capacitor-or-expo', label: 'Capacitor or Expo' },
	{ href: '#frameworks', label: 'Frameworks' },
	{ href: '#platforms', label: 'Platforms' },
	{ href: '#packages', label: 'Packages' },
	{ href: '#next', label: 'Where next' }
];

const featureItems: DefinitionItem[] = [
	{
		description:
			'Every page route you already serve with a React, Svelte, Vue, Angular, HTML or HTMX handler is found at build time and packaged into the app.',
		term: 'Your pages, as screens'
	},
	{
		description:
			'With @absolutejs/auth installed, the app signs in through the system browser and keeps its credentials in the Keychain or Android Keystore. Page code does not change.',
		term: 'Sign-in'
	},
	{
		description:
			'With @absolutejs/sync installed, data is stored encrypted on the device, writes queue offline, and the OS syncs in the background.',
		term: 'Offline data'
	},
	{
		description:
			'Camera, photos, location, notifications, share, haptics, clipboard, files and more, through one API. Only the plugins you import are installed.',
		term: 'Device features'
	},
	{
		description:
			'APNs and FCM registration is automatic, and the same code sends Web Push to the browser and installed web app.',
		term: 'Push notifications'
	},
	{
		description:
			'Universal links and Android app links open the right screen, and the association files are served by your server.',
		term: 'Deep links'
	},
	{
		description:
			'Ship signed fixes without a store review, rolled out in stages and rolled back automatically if a release fails to start.',
		term: 'Over-the-air updates'
	},
	{
		description:
			'Signed App Store and Google Play builds, a release check, store publishing and a generated GitHub Actions workflow.',
		term: 'Store releases'
	}
];

const howItWorksSteps: StepFlowStep[] = [
	{
		description:
			'absolute mobile init generates the iOS and Android projects, installs the pinned native packages and applies your config: icons, deep links, permissions.',
		title: 'Generate the native projects'
	},
	{
		description:
			'The build finds the page routes on your Elysia server and packages each page’s client code and styles into the app. Nothing is loaded from a remote URL.',
		title: 'Package your pages'
	},
	{
		description:
			'The app launches with no network. When it opens a route, it asks your production server for that page’s props as JSON from the same handler that renders the page for the web.',
		title: 'Fetch each page’s data'
	},
	{
		description:
			'The packaged page renders those props on the device. Links, Back and deep links navigate inside the app.',
		title: 'Render on the device'
	}
];

const engineRows: ComparisonRow[] = [
	{
		feature: 'Every page in every supported framework',
		values: [true, true]
	},
	{
		feature: 'Screens written in React Native',
		note: 'Expo routes you choose can be React Native components; every other route stays your AbsoluteJS page.',
		values: [false, true]
	},
	{
		feature: 'Native project',
		values: ['Committed, editable mobile/', 'Generated, never edited']
	},
	{
		feature: 'Device features, Auth, Sync and push',
		values: [true, true]
	},
	{
		feature: 'Signed over-the-air updates',
		values: [true, true]
	},
	{
		feature: 'Best for',
		values: ['Every app', 'Screens that need native UI']
	}
];

const frameworkRows: ComparisonRow[] = [
	{ feature: 'React', values: [true, true] },
	{ feature: 'Svelte', values: [true, true] },
	{ feature: 'Vue', values: [true, true] },
	{ feature: 'Angular', values: [true, true] },
	{ feature: 'HTML', values: [true, true] },
	{
		feature: 'HTMX',
		note: 'hx-get, hx-post and form actions are pointed at your production server.',
		values: [true, true]
	},
	{ feature: 'Ember', values: ['Coming soon', 'Coming soon'] },
	{ feature: 'Astro', values: ['Coming soon', 'Coming soon'] }
];

const platformRows = [
	[
		'Android',
		'Linux, macOS, Windows or WSL',
		'absolute mobile doctor android --fix installs the SDK, emulator and Java 21'
	],
	[
		'iOS',
		'macOS with Xcode, or any machine with a paired Mac',
		'absolute mobile pair mac builds and runs on a Mac over SSH'
	]
];

const packageCards: PackageCard[] = [
	{
		description:
			'Camera, location, notifications, share, storage and more. One API on the web and in the app.',
		href: '/documentation/devices',
		name: 'Devices',
		packageName: '@absolutejs/devices'
	},
	{
		description:
			'HTTP to your server that carries the signed-in user’s credentials in the app and in the browser.',
		href: '/documentation/http',
		name: 'HTTP',
		packageName: '@absolutejs/http'
	},
	{
		description:
			'Encrypted SQLite storage and background sync for @absolutejs/sync in the app.',
		href: '/documentation/sync-capacitor',
		name: 'Sync Capacitor',
		packageName: '@absolutejs/sync-capacitor'
	},
	{
		description:
			'APNs, FCM and Web Push delivery with device registration that follows the signed-in user.',
		href: '/documentation/dispatch',
		name: 'Dispatch',
		packageName: '@absolutejs/dispatch'
	},
	{
		description: 'The Expo implementation of @absolutejs/auth sign-in.',
		href: '/documentation/auth-expo',
		name: 'Auth Expo',
		packageName: '@absolutejs/auth-expo'
	},
	{
		description:
			'Encrypted SQLite storage and background sync for @absolutejs/sync in Expo.',
		href: '/documentation/sync-expo',
		name: 'Sync Expo',
		packageName: '@absolutejs/sync-expo'
	}
];

const nextCards: PackageCard[] = [
	{
		description:
			'From config to your app running on an emulator or simulator.',
		href: '/documentation/native-quickstart',
		name: 'Quickstart'
	},
	{
		description:
			'How pages are packaged, how data arrives, and how older app versions keep working.',
		href: '/documentation/native-how-it-works',
		name: 'How it works'
	},
	{
		description:
			'Every device feature, with what each one does on the web, iOS and Android.',
		href: '/documentation/native-devices',
		name: 'Device APIs'
	},
	{
		description:
			'Build, sign and publish to the App Store and Google Play.',
		href: '/documentation/native-release',
		name: 'Release'
	}
];

export const NativeOverviewView = ({
	currentPageId,
	onNavigate,
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
					<h1 id="native-apps" style={h1Style(isMobileOrTablet)}>
						Native Apps
					</h1>
					<p style={paragraphLargeStyle}>
						Every AbsoluteJS app is also an iOS and Android app. Add
						a <code>mobile</code> block to{' '}
						<code>absolute.config.ts</code> and the pages you have
						already written ship to the App Store and Google Play:
						the same routes, the same server and the same code.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="one-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						One config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three fields make an app: its store identifier, its name
						and the server it talks to.
					</p>
					<PrismPlus
						codeString={nativeMinimalConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeFirstRun}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Before your first store release"
					>
						Add your Apple team prefix and Android signing
						fingerprint under <code>deepLinks</code>. Your server
						publishes the files that link your domain to the app,
						and a production server will not start without them.{' '}
						<a href="/documentation/native-branding-links">
							Branding & deep links
						</a>{' '}
						covers both.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-you-get"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What you get
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS looks at what your app already uses and sets
						up the native side to match. Install{' '}
						<code>@absolutejs/auth</code> and the app signs in;
						install <code>@absolutejs/sync</code> and it works
						offline; import <code>camera</code> and the camera
						plugin and its permission prompts are added.
					</p>
					<DefinitionGrid
						items={featureItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How it works
					</AnchorHeading>
					<StepFlow
						steps={howItWorksSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Because the interface ships inside the app, it starts
						instantly and offline. Each page asks your server for
						fresh data when it opens; data that must be there
						offline lives in <code>@absolutejs/sync</code>. When you
						deploy a new server, apps already installed keep
						working: as long as your build directory is kept between
						builds, the server keeps answering the three most recent
						releases, and asks for an update only when an installed
						app is older than that.{' '}
						<a href="/documentation/native-how-it-works">
							How it works
						</a>{' '}
						has the details.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="same-code"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Same code everywhere
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Device features come from{' '}
						<code>@absolutejs/devices</code>. The build picks the
						right implementation for the browser, iOS or Android, so
						your page never checks which one it is running on. This
						function takes a photo with the native camera in the app
						and through the browser on the web:
					</p>
					<PrismPlus
						codeString={nativeSamePageCode}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="capacitor-or-expo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Capacitor or Expo
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Apps are built with Capacitor unless you choose
						otherwise, and that is the right choice for almost every
						app. Expo is there for teams that need specific screens
						in React Native: very long lists, gesture-heavy
						interfaces, native stack transitions, or a library that
						only exists for React Native. You keep every other page
						as it is. <a href="/documentation/native-expo">Expo</a>{' '}
						explains when it pays off.
					</p>
					<ComparisonTable
						columns={['Capacitor (default)', 'Expo']}
						rows={engineRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="frameworks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Frameworks
					</AnchorHeading>
					<ComparisonTable
						columns={['Capacitor', 'Expo']}
						firstColumnLabel="Pages written in"
						rows={frameworkRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="platforms"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Platforms
					</AnchorHeading>
					<DocsTable
						columns={['Platform', 'Build on', 'Setup']}
						rows={platformRows}
						themeSprings={themeSprings}
					/>
					<TerminalFrame
						command="bunx absolute mobile doctor"
						output="Checks the Android SDK, emulator, Java and Xcode, and says what is missing."
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="packages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Packages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Native support is part of{' '}
						<code>@absolutejs/absolute</code>. These packages
						provide the parts your pages call, and the build
						installs the versions it needs.
					</p>
					<PackageCardGrid
						items={packageCards}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="next"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where next
					</AnchorHeading>
					<PackageCardGrid
						items={nextCards}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
