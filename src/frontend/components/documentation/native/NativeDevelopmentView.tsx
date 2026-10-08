import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeDevBanner,
	nativeDevDoctor,
	nativeDevHttpsConfig,
	nativeDevInspect,
	nativeDevPairMac,
	nativeDevPhysicalAndroid,
	nativeDevPhysicalIos,
	nativeDevRemotes,
	nativeDevSkipMobile
} from '../../../data/documentation/native/nativeDevelopmentDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { TerminalFrame } from '../../utils/TerminalFrame';

const tocItems: TocItem[] = [
	{ href: '#bun-dev', label: 'bun dev' },
	{ href: '#live-reload', label: 'Live reload on device' },
	{ href: '#terminal', label: 'Logs and shortcuts' },
	{ href: '#physical-devices', label: 'Physical devices' },
	{ href: '#preview', label: 'Browser preview' },
	{ href: '#remote-mac', label: 'iOS from Linux or Windows' },
	{ href: '#doctor', label: 'Checking your setup' }
];

const firstRunSteps: StepFlowStep[] = [
	{
		description:
			'If the Android SDK, emulator or Java is missing, bun dev asks: “Android development is not configured. Install the tested toolchain now?” Yes installs checksum-verified tools, API 36, build tools and Java 21.',
		title: 'Install the Android toolchain'
	},
	{
		description:
			'Without a native project yet, it asks “Create the managed Capacitor Android project now?” and generates it. For iOS, run absolute mobile init once first.',
		title: 'Create the native project'
	},
	{
		description:
			'On a Mac it installs a missing iOS Simulator runtime when you agree. On Linux, Windows or WSL it uses your paired Mac.',
		title: 'Prepare iOS'
	},
	{
		description:
			'The emulator and simulator start, the app installs, and it opens your entry route from the dev server you are already running.',
		title: 'Launch the app'
	}
];

const changeRows = [
	[
		'A page, component, stylesheet or public asset',
		'Hot update on every target, including the app. No native rebuild.'
	],
	[
		'absolute.config.ts, package.json or the lockfile',
		'The native project is synced and rebuilt automatically.'
	],
	[
		'capacitor.config.ts or files in the native project',
		'The native project is synced and rebuilt automatically.'
	],
	[
		'An Expo native route',
		'Metro Fast Refresh, as in any Expo app. See Expo.'
	]
];

const shortcutItems: DefinitionItem[] = [
	{
		description:
			'Shows each mobile target, the emulator, simulator or device it is using, and its state.',
		term: 'd or device'
	},
	{
		description:
			'Closes and reopens the installed app without restarting the server.',
		term: 'relaunch'
	},
	{
		description:
			'Stops the server and native logs, and puts the native project back to its production settings. Emulators and simulators stay warm for next time.',
		term: 'Ctrl-C'
	}
];

const previewControlItems: DefinitionItem[] = [
	{
		description:
			'Switch between iOS and Android, with each platform’s safe areas.',
		term: 'Platform'
	},
	{
		description:
			'Open any route directly, or deliver it the way a tapped deep link would.',
		term: 'Route or deep link'
	},
	{
		description:
			'Wi-Fi, cellular or offline. Offline rejects your app’s requests while hot reload keeps working.',
		term: 'Network'
	},
	{
		description: 'Send active, inactive and background transitions.',
		term: 'Lifecycle'
	},
	{
		description: 'Press Android Back and show or hide the keyboard.',
		term: 'Back and keyboard'
	},
	{
		description:
			'Set camera, location and notification permissions to granted, denied or prompt.',
		term: 'Permissions'
	}
];

const previewRows: ComparisonRow[] = [
	{ feature: 'Your pages with hot reload', values: [true, true] },
	{
		feature: 'Platform, network, lifecycle, Back and keyboard',
		values: [true, true]
	},
	{
		feature: 'Camera, location and notification permissions',
		values: [true, true]
	},
	{
		feature: 'Native rendering and WebView differences',
		values: [false, true]
	},
	{ feature: 'Sign-in through the system browser', values: [false, true] },
	{ feature: 'Keychain and Keystore storage', values: [false, true] },
	{ feature: 'Push delivery', values: [false, true] },
	{
		feature: 'Background tasks and the app being closed by the OS',
		values: [false, true]
	},
	{ feature: 'Needs an SDK', values: ['No', 'Yes'] }
];

const remoteMacSteps: StepFlowStep[] = [
	{
		description:
			'Install full Xcode, accept its license and add an iOS Simulator runtime.',
		title: 'Xcode'
	},
	{
		description:
			'Install Bun. ~/.bun/bin/bun is found even when SSH sessions do not put it on PATH.',
		title: 'Bun'
	},
	{
		description:
			'Turn on Remote Login in System Settings → General → Sharing, and allow public-key login and TCP forwarding.',
		title: 'Remote Login'
	},
	{
		description:
			'For a real iPhone or iPad, pair it in Xcode, turn on Developer Mode, keep it on the Mac’s network, and set the Development Team once in the generated workspace.',
		title: 'Devices (optional)'
	}
];

const remoteSyncRows = [
	[
		'Sent to the Mac',
		'Your project, as an atomic snapshot, plus a checksum-verified AbsoluteJS agent'
	],
	[
		'Never sent',
		'.git, node_modules, build output, .absolutejs state, environment files, signing keys and profiles, Android keystores'
	],
	[
		'Kept on the Mac between runs',
		'node_modules, Xcode DerivedData and the installed app, so later starts are fast'
	],
	[
		'Stays on your computer',
		'The dev server, hot reload, logs and the development certificate’s private key'
	]
];

export const NativeDevelopmentView = ({
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
					<h1
						id="native-development"
						style={h1Style(isMobileOrTablet)}
					>
						Development
					</h1>
					<p style={paragraphLargeStyle}>
						The same <code>bun dev</code> that serves your site runs
						your app on an Android emulator, an iOS simulator or a
						phone on your desk. Edits reach the app as fast as they
						reach the browser.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="bun-dev"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						bun dev
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With a <code>mobile</code> block in{' '}
						<code>absolute.config.ts</code>, <code>bun dev</code>{' '}
						starts a target for every platform in{' '}
						<code>mobile.platforms</code>. The first run sets up
						what is missing, asking before it installs anything:
					</p>
					<StepFlow
						steps={firstRunSteps}
						themeSprings={themeSprings}
					/>
					<TerminalFrame
						command={nativeDevBanner.command}
						output={nativeDevBanner.output}
					/>
					<p style={paragraphSpacedStyle}>
						Mobile targets start only in an interactive terminal. To
						run the web server alone:
					</p>
					<PrismPlus
						codeString={nativeDevSkipMobile}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="live-reload"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Live reload on device
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A release build carries its pages inside the app. In
						development, the app loads them from your dev server
						instead, so hot reload works exactly as it does in the
						browser. Emulators reach the server through{' '}
						<code>adb reverse</code> and the iOS Simulator through
						loopback. When the session ends, or the next time a
						crashed session is detected, the native project goes
						back to its production settings, so a development
						address never ends up in a store build.
					</p>
					<DocsTable
						columns={['When you change', 'What happens']}
						rows={changeRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="terminal"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Logs and shortcuts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The app’s console output streams into the same terminal
						as your server, tagged <code>[android]</code> or{' '}
						<code>[ios]</code>. Type these at the{' '}
						<code>bun dev</code> prompt:
					</p>
					<DefinitionGrid
						items={shortcutItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="physical-devices"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Physical devices
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<strong>Android.</strong> Connect the phone with USB
						debugging allowed, then pass its serial. The dev server
						listens on your local network so the phone can reach it.
					</p>
					<PrismPlus
						codeString={nativeDevPhysicalAndroid}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>iOS.</strong> Pair the iPhone or iPad in Xcode,
						turn on Developer Mode, and choose a Development Team
						with automatic signing in the generated workspace once.
						Any identifier <code>devicectl</code> accepts works: the
						UDID, the device name or its serial number. AbsoluteJS
						builds, installs and launches the app, and later starts
						skip Xcode when nothing native has changed.
					</p>
					<PrismPlus
						codeString={nativeDevPhysicalIos}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="HTTPS in development"
					>
						Set <code>dev.https</code> and the app uses it too;
						there is no separate native setting. Android trusts the
						development certificate through a debug-only network
						setting that is removed when the session ends. The iOS
						Simulator gets it installed automatically. On a real
						iPhone, open the one-time link the terminal prints,
						install the profile, and turn it on under Settings →
						General → About → Certificate Trust Settings.
					</Callout>
					<PrismPlus
						codeString={nativeDevHttpsConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="preview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Browser preview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Open the <strong>Mobile</strong> URL that{' '}
						<code>bun dev</code> prints,{' '}
						<code>/__absolute/mobile-preview</code>, to run your
						real pages inside an iOS- or Android-shaped frame with
						no SDK installed. It is more than a resized viewport:{' '}
						<code>@absolutejs/devices</code> and{' '}
						<code>@absolutejs/http</code> behave as they do in the
						app, and a panel drives the device around them.
					</p>
					<DefinitionGrid
						items={previewControlItems}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Use it for fast work on app behavior, and an emulator,
						simulator or device for anything the operating system
						does itself:
					</p>
					<ComparisonTable
						columns={['Browser preview', 'Emulator or device']}
						rows={previewRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="remote-mac"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						iOS from Linux or Windows
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Xcode only runs on macOS, so AbsoluteJS uses a Mac you
						own as the iOS build host while you keep working on
						Linux, Windows, WSL or another Mac. Your editor, Bun and
						the dev server stay on your computer. The app in the
						Mac’s simulator reaches your dev server through an SSH
						tunnel, so hot reload works without copying anything for
						page edits. Set up the Mac once:
					</p>
					<StepFlow
						steps={remoteMacSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Check that you can SSH in with a key, then pair. Pairing
						confirms the Mac has macOS, Bun and Xcode, and stores
						only connection details, in{' '}
						<code>~/.absolutejs/mobile/remote-macs.json</code>. The
						last Mac you paired is the default;{' '}
						<code>ABSOLUTE_IOS_REMOTE=&lt;name&gt;</code> picks
						another.
					</p>
					<PrismPlus
						codeString={nativeDevPairMac}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						From then on <code>bun dev</code> uses the Mac for iOS
						automatically, and <code>--ios-device</code> works for a
						phone on the Mac’s network. A Capacitor app needs its
						iOS project first (<code>absolute mobile init</code>);
						Expo generates its own.
					</p>
					<DocsTable
						columns={['', 'What']}
						rows={remoteSyncRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeDevRemotes}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Unpairing removes only the local profile, never files on
						the Mac. The same Mac signs and uploads iOS releases;
						see <a href="/documentation/native-release">Release</a>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="doctor"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Checking your setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>mobile doctor</code> checks the tools each
						platform needs and says what is missing;{' '}
						<code>--fix</code> installs it. Against a paired Mac it
						only reports, since the Mac is yours to configure.
					</p>
					<PrismPlus
						codeString={nativeDevDoctor}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>mobile inspect</code> reports how AbsoluteJS sees
						your project: app identity, platforms, the device
						features found in your code and the plugins they need,
						whether the native projects exist, and whether the
						packaged pages are complete. It changes nothing, so it
						is safe in CI; <code>--require-bundle</code> fails when
						the packaged pages are missing or out of date.
					</p>
					<PrismPlus
						codeString={nativeDevInspect}
						language="bash"
						showLineNumbers={false}
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
