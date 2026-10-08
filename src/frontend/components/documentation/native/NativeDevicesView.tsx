import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	devicesImport,
	devicesLocationWatch,
	devicesPermissionFlow,
	devicesReactCleanup,
	devicesStorage,
	devicesSvelteCleanup,
	devicesTesting
} from '../../../data/documentation/native/nativeDevicesDocsCode';
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

const tocItems: TocItem[] = [
	{ href: '#import-what-you-use', label: 'Import what you use' },
	{ href: '#capabilities', label: 'Capabilities' },
	{ href: '#permissions', label: 'Permissions' },
	{ href: '#availability', label: 'Availability and errors' },
	{ href: '#support', label: 'Where each one works' },
	{ href: '#components', label: 'In your components' },
	{ href: '#location-and-storage', label: 'Location and storage' },
	{ href: '#testing', label: 'Testing' },
	{ href: '#packages', label: 'Packages' }
];

const provisioningSteps: StepFlowStep[] = [
	{
		description:
			'Import capabilities by name from @absolutejs/devices in any page or component: .ts, .tsx, .js, .jsx, .svelte or .vue.',
		title: 'You import a capability'
	},
	{
		code: 'bunx absolute mobile sync',
		description:
			'The CLI finds those imports and installs the exact native plugin version each one needs. Nothing you don’t import is installed.',
		title: 'Sync installs the plugins'
	},
	{
		description:
			'Android permissions, the iOS permission prompts (“Shop uses your camera when you choose to take a photo.”) and the iOS privacy manifest are written for you from your app name.',
		title: 'Permissions are generated'
	},
	{
		description:
			'A build stops with a clear message if an imported capability’s plugin is missing, so a store build can never ship without it.',
		title: 'The build checks it'
	}
];

const capabilityRows = [
	[
		{ code: 'camera' },
		'capability(), permission(), requestPermission(), takePhoto({ direction, transform })',
		'Take a photo with the front or rear camera, optionally resized.'
	],
	[
		{ code: 'photos' },
		'capability(), pick({ limit, transform })',
		'Let the user choose photos. Only the chosen photos are shared with your app.'
	],
	[
		{ code: 'documents' },
		'capability(op), pick({ accept, limit, maximumBytes }), export({ content, name }), open({ content, name })',
		'Pick files, save or share a file you made, or open one in the system viewer. Up to 64 MiB by default.'
	],
	[
		{ code: 'location' },
		'capability(), permission(), requestPermission({ precision }), current(options), watch(listener, options)',
		'Coarse or precise location while the app is open.'
	],
	[
		{ code: 'localNotifications' },
		'capability(), permission(), requestPermission(), schedule(notification), cancel(ids), pending(), onReceived(listener), onAction(listener)',
		'Notifications your app schedules on the device, now or later.'
	],
	[
		{ code: 'pushNotifications' },
		'capability(), permission(), requestPermission(), enable(), disable(), onReceived(listener), onAction(listener)',
		'Notifications your server sends. Registration is automatic; see Push notifications.'
	],
	[
		{ code: 'share' },
		'capability(content), share({ title, text, url, dialogTitle })',
		'Open the system share sheet.'
	],
	[
		{ code: 'clipboard' },
		'capability(op), readText(), writeText(value)',
		'Read and write plain text.'
	],
	[
		{ code: 'haptics' },
		'capability(), impact(style), notification(type), selectionChanged(), vibrate(ms)',
		'Taps and buzzes. Where there is no haptic engine, calls do nothing instead of failing.'
	],
	[
		{ code: 'keyboard' },
		'capability(), state(), onChange(listener), dismiss()',
		'Whether the on-screen keyboard is open and how tall it is.'
	],
	[
		{ code: 'systemBars' },
		'capability(op), setAppearance(appearance, bar), setVisible(visible, bar)',
		'Light or dark status-bar icons, and hiding the status or navigation bar.'
	],
	[
		{ code: 'platform' },
		'capability(), info()',
		'OS, phone or tablet, app version and build, locale, reduced motion and safe-area insets.'
	],
	[
		{ code: 'lifecycle' },
		'capability(), state(), onChange(listener), onResume(listener), onRestoredOperation(listener)',
		'Active, inactive or in the background, and when the app comes back.'
	],
	[
		{ code: 'links' },
		'capability(), getLaunchLink(), onOpenLink(listener), openExternal(url)',
		'The link that opened the app, links opened while it runs, and opening a page in the browser.'
	],
	[
		{ code: 'network' },
		'capability(), status(), onChange(listener)',
		'Online or offline, and Wi-Fi, cellular or ethernet.'
	],
	[
		{ code: 'back' },
		'capability(), onPress(listener)',
		'The Android Back button and gesture.'
	],
	[
		{ code: 'storage' },
		'capability(), get(key), set(key, value), remove(key), keys(), clear()',
		'Small preferences as strings, namespaced to your app.'
	],
	[
		{ code: 'secureStorage' },
		'capability(), get(key), set(key, value), remove(key), keys(), clear()',
		'Secrets in the iOS Keychain or Android Keystore. Never falls back to plain storage.'
	]
];

const permissionStateItems: DefinitionItem[] = [
	{
		description:
			'Not asked yet. requestPermission() shows the system prompt.',
		term: 'prompt'
	},
	{ description: 'The user allowed it.', term: 'granted' },
	{
		description:
			'Allowed for part of what was asked, such as approximate location.',
		term: 'limited'
	},
	{
		description: 'The user said no. You can explain why and ask again.',
		term: 'denied'
	},
	{
		description:
			'The system will not ask again. Point the user to the app’s settings.',
		term: 'blocked'
	},
	{
		description: 'This device or runtime has no such feature.',
		term: 'unavailable'
	}
];

const errorItems: DefinitionItem[] = [
	{
		description:
			'This runtime has no implementation, such as secureStorage in a browser.',
		term: 'unsupported'
	},
	{
		description:
			'The feature exists but cannot be used here, such as the camera during server rendering.',
		term: 'unavailable'
	},
	{
		description:
			'Permission has not been granted yet; call requestPermission() first.',
		term: 'permission-required'
	},
	{
		description: 'The user refused when asked.',
		term: 'permission-denied'
	},
	{
		description: 'The system will not show the prompt again.',
		term: 'permission-blocked'
	},
	{
		description:
			'The user closed the camera, picker or share sheet. Usually not an error to show.',
		term: 'cancelled'
	},
	{
		description:
			'Try again shortly, for example when no location fix is available yet.',
		term: 'temporarily-unavailable'
	},
	{ description: 'Anything else the platform reported.', term: 'failed' }
];

const supportRows: ComparisonRow[] = [
	{ feature: 'camera, photos, documents', values: [true, true, true] },
	{
		feature: 'location',
		note: 'While the app is open; there is no background location.',
		values: [true, true, true]
	},
	{
		feature: 'localNotifications',
		note: 'In the browser they fire while the page is open.',
		values: ['partial', true, true]
	},
	{
		feature: 'pushNotifications',
		note: 'Web Push in the browser and installed web app.',
		values: ['With PWA', true, true]
	},
	{
		feature: 'share',
		note: 'Uses the Web Share API where the browser has it.',
		values: ['partial', true, true]
	},
	{ feature: 'clipboard', values: [true, true, true] },
	{
		feature: 'haptics',
		note: 'Mapped to vibration patterns in the browser.',
		values: ['partial', true, true]
	},
	{
		feature: 'keyboard',
		note: 'Estimated from the visual viewport in the browser.',
		values: ['partial', true, true]
	},
	{
		feature: 'systemBars',
		note: 'The browser can follow the color scheme but not hide bars. The navigation bar exists only on Android.',
		values: ['partial', true, true]
	},
	{
		feature: 'platform, lifecycle, links, network, storage',
		values: [true, true, true]
	},
	{
		feature: 'back',
		values: [false, 'Android', 'Android']
	},
	{
		feature: 'secureStorage',
		note: 'Never emulated with plain browser storage. In Expo apps, sign-in credentials are kept in Expo SecureStore by Auth.',
		values: [false, true, false]
	}
];

const testingItems: DefinitionItem[] = [
	{
		description:
			'emitNetwork, emitLifecycle, emitLink, emitBack, emitKeyboard, emitLocation, emitLocalNotification and more drive events into your code.',
		term: 'Emit events'
	},
	{
		description:
			'cameraPermission, locationPermission and notificationPermission set what requestPermission() returns and count how often it was called.',
		term: 'Control permissions'
	},
	{
		description:
			'clipboardText, sharedContent, hapticEvents, openedExternalUrls, storage, secureStorage, pendingNotifications and the picked and exported files show what your code did.',
		term: 'Inspect results'
	}
];

const packageCards: PackageCard[] = [
	{
		description:
			'The API your pages import, with the browser, server-rendering and test implementations.',
		href: '/documentation/devices',
		name: 'Devices',
		packageName: '@absolutejs/devices'
	},
	{
		description:
			'The iOS and Android implementation for Capacitor apps, including the Keychain and Keystore vault.',
		href: '/documentation/devices-capacitor',
		name: 'Devices Capacitor',
		packageName: '@absolutejs/devices-capacitor'
	},
	{
		description: 'The implementation for Expo apps.',
		href: '/documentation/devices-expo',
		name: 'Devices Expo',
		packageName: '@absolutejs/devices-expo'
	}
];

export const NativeDevicesView = ({
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
					<h1 id="native-devices" style={h1Style(isMobileOrTablet)}>
						Device APIs
					</h1>
					<p style={paragraphLargeStyle}>
						One import for the camera, location, notifications,
						files, sharing and the rest of the device. The same call
						uses the native API in your iOS and Android app and the
						browser API on the web, and the build installs only what
						you import.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="import-what-you-use"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Import what you use
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every capability is a named export of{' '}
						<code>@absolutejs/devices</code>. Your code never checks
						which platform it is on: AbsoluteJS picks the browser,
						Capacitor or Expo implementation when it builds each
						target.
					</p>
					<PrismPlus
						codeString={devicesImport}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<StepFlow
						steps={provisioningSteps}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Use named imports"
					>
						The CLI reads <code>import {'{ camera }'}</code> and{' '}
						<code>import * as devices</code> with{' '}
						<code>devices.camera</code>. It cannot see a capability
						chosen at runtime, such as <code>devices[name]</code>,
						so name each one you use.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="capabilities"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Capabilities
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every method returns a promise. Listeners such as{' '}
						<code>onChange</code> resolve to a function that stops
						listening.
					</p>
					<DocsTable
						columns={['Import', 'Methods', 'What it does']}
						rows={capabilityRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="permissions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Permissions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Importing a capability or checking it never shows a
						prompt. <code>permission()</code> reads the current
						state; <code>requestPermission()</code> asks, so call it
						from something the user did, like tapping{' '}
						<em>Scan receipt</em>. Taking a photo, reading location
						and scheduling a notification refuse to run until
						permission is granted.
					</p>
					<DefinitionGrid
						items={permissionStateItems}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={devicesPermissionFlow}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="availability"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Availability and errors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>capability()</code> tells you whether a feature
						works here before you offer it. When it is available it
						also says how: <code>native</code> in the app,{' '}
						<code>web</code> in the browser, or{' '}
						<code>emulated</code> in tests. When it is not, it gives
						a reason you can show. Calls that fail throw a{' '}
						<code>DeviceError</code> with one of these codes;{' '}
						<code>isDeviceError(error)</code> narrows it.
					</p>
					<DefinitionGrid
						items={errorItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="support"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where each one works
					</AnchorHeading>
					<ComparisonTable
						columns={['Browser', 'iOS & Android', 'Expo']}
						firstColumnLabel="Capability"
						rows={supportRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						In the app, <code>links.openExternal</code> opens{' '}
						<code>https</code> and <code>http</code> links in the
						in-app browser; the web version also accepts{' '}
						<code>mailto:</code> and <code>tel:</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In your components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The capabilities are plain functions, so they work the
						same in React, Svelte, Vue, Angular, HTML and HTMX
						pages. Start listeners when a component mounts and call
						the returned function when it unmounts.
					</p>
					<PrismPlus
						codeString={devicesReactCleanup}
						language="tsx"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={devicesSvelteCleanup}
						language="svelte"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="location-and-storage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Location and storage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Ask for <code>coarse</code> location when a
						neighbourhood is enough; the system prompt is easier to
						accept. <code>watch</code> sends positions and errors to
						one listener until you stop it.
					</p>
					<PrismPlus
						codeString={devicesLocationWatch}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>storage</code> is for preferences.{' '}
						<code>secureStorage</code> is for anything secret and is
						only available where the platform can protect it.
						Sign-in tokens are already kept there for you; see{' '}
						<a href="/documentation/native-auth-sync">
							Auth, Sync & HTTP
						</a>
						.
					</p>
					<PrismPlus
						codeString={devicesStorage}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="testing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Testing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/devices/testing</code> gives you an
						in-memory device. Install it, drive it from your test,
						and check what your code did. Its secure storage is an
						in-memory stand-in, not real encryption.
					</p>
					<PrismPlus
						codeString={devicesTesting}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={testingItems}
						themeSprings={themeSprings}
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
					<PackageCardGrid
						items={packageCards}
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
