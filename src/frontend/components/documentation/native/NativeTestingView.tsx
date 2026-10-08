import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeTestingAndroidRelease,
	nativeTestingCertify,
	nativeTestingCi,
	nativeTestingDoctor,
	nativeTestingHmr,
	nativeTestingIosRelease,
	nativeTestingOutput,
	nativeTestingPhysicalIos,
	nativeTestingRoutes
} from '../../../data/documentation/native/nativeTestingDocsCode';
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
import { ChecklistRows } from '../../utils/ChecklistRows';
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
	{ href: '#toolchain', label: 'Toolchain in one command' },
	{ href: '#targets', label: 'Emulators and simulators' },
	{ href: '#modes', label: 'Three ways to test' },
	{ href: '#development', label: 'Test the running app' },
	{ href: '#release', label: 'Test the exact release' },
	{ href: '#ios-release', label: 'iOS: simulator, iPhone, TestFlight' },
	{ href: '#reports', label: 'Reports and artifacts' },
	{ href: '#certify', label: 'From report to certification' },
	{ href: '#ci', label: 'In CI' },
	{ href: '#flags', label: 'Flags' },
	{ href: '#troubleshooting', label: 'Troubleshooting' }
];

const toolchainRows = [
	[
		'Android SDK location',
		'ANDROID_HOME or ANDROID_SDK_ROOT when set; otherwise ~/.absolutejs/android-sdk, or %LOCALAPPDATA%\\AbsoluteJS\\Android\\Sdk on Windows and WSL'
	],
	[
		'Command-line tools',
		'Google’s pinned release, downloaded and checked against its SHA-256 before it is unpacked'
	],
	[
		'SDK packages',
		'platform-tools, emulator, Android API 36 and build-tools 36.0.0, after you review the SDK licenses'
	],
	[
		'Emulator',
		'An AVD named AbsoluteJS_API_36 built from the Google APIs system image for your CPU'
	],
	[
		'Java',
		'Java 21: Temurin through winget on Windows and WSL or Homebrew on macOS, OpenJDK through apt, dnf or pacman on Linux'
	],
	[
		'iOS Simulator',
		'On a Mac with Xcode, --fix downloads the current iOS Simulator runtime'
	]
];

const hostItems: DefinitionItem[] = [
	{
		description:
			'The emulator runs with KVM acceleration. Doctor warns when /dev/kvm is missing or your user cannot open it.',
		term: 'Linux'
	},
	{
		description:
			'The Android SDK lives on Windows, where the emulator runs fastest, and WSL drives it through adb.exe. Doctor confirms the bridge works.',
		term: 'WSL'
	},
	{
		description:
			'Android and iOS side by side. iOS tools are found with xcrun and xcodebuild.',
		term: 'macOS'
	},
	{
		description:
			'Android runs locally; iOS runs on a Mac you pair once with absolute mobile pair mac. Doctor checks that Mac with --remote, read-only.',
		term: 'Windows and Linux, for iOS'
	}
];

const targetSteps: StepFlowStep[] = [
	{
		description:
			'bun dev finds the AbsoluteJS emulator or a booted simulator, and boots one if none is running, waiting until the OS reports boot completed.',
		title: 'Find or boot a target'
	},
	{
		description:
			'On Android, adb reverse maps the dev server’s port onto the emulator, so the app reaches your machine at localhost. With dev HTTPS on, the target is set up to trust your development certificate.',
		title: 'Connect it to your dev server'
	},
	{
		description:
			'The native project is fingerprinted. When nothing native changed, the installed build is reused and Gradle and Xcode are skipped.',
		title: 'Build only when native code changed'
	},
	{
		description:
			'The app launches with HMR connected, and its native logs stream into your terminal. bun dev prints how long each phase took.',
		title: 'Install, launch and stream logs'
	}
];

const modeRows: ComparisonRow[] = [
	{
		feature: 'What it runs against',
		values: [
			'Your page in a browser frame',
			'The debug app on the emulator, simulator or device',
			'The signed AAB or IPA you will ship'
		]
	},
	{
		feature: 'Native WebView, plugins and permissions',
		values: [false, true, true]
	},
	{
		feature: 'Offline launch proven',
		values: [false, false, true]
	},
	{
		feature: 'Produces certification evidence',
		values: [false, false, true]
	},
	{
		feature: 'How',
		values: [
			'/__absolute/mobile-preview',
			'mobile test android|ios',
			'mobile test android|ios --release'
		]
	}
];

const androidDevChecks = [
	'The app is attached over Chrome DevTools, in its own WebView, not a desktop browser',
	'Each --route is opened and must render text, with the request reaching your dev server’s origin and path',
	'The page’s HMR client must be connected and identify itself as the Capacitor Android target',
	'A page showing the AbsoluteJS error overlay fails the check',
	'With --wait-for-hmr, the run waits for you to save an edit and reports the server and client time to apply it'
];

const androidReleaseSteps: StepFlowStep[] = [
	{
		description:
			'The release must match mobile.appId and the configured engine, and its recorded SHA-256 must still match the file.',
		title: 'Verify the release'
	},
	{
		description:
			'Uses a running emulator, or starts AbsoluteJS_API_36 and waits up to 180 seconds for it to boot.',
		title: 'Pick an emulator'
	},
	{
		description:
			'Bundletool turns that exact AAB into a universal APK set and installs it. The installed versionCode must match the release. Bundletool is a pinned, checksum-verified download, fetched after you agree or with --yes.',
		title: 'Install the AAB the way the store does'
	},
	{
		description:
			'Wi-Fi and mobile data are switched off. The app is cold-launched, must render its embedded content, then is stopped and launched again.',
		title: 'Launch twice with no network'
	},
	{
		description:
			'Wi-Fi and mobile data go back to how they were, even when the run fails.',
		title: 'Restore the emulator'
	}
];

const iosReleaseRows = [
	[
		'Simulator',
		'A Release build from the same project and version, run in the iOS Simulator',
		'simulator'
	],
	[
		'Registered iPhone (--device)',
		'The IPA exported from the same archive with --registered-device-artifact',
		'device'
	],
	[
		'TestFlight (--device --testflight)',
		'The build Apple processed and TestFlight installed on the iPhone',
		'store'
	]
];

const reportItems: DefinitionItem[] = [
	{
		description:
			'report.json and report.md, written to .absolutejs/mobile/test-reports/<platform>-<timestamp>, or the directory you pass to --report.',
		term: 'Report'
	},
	{
		description:
			'Pass or fail for each automated check, with timings, the release ID, size and SHA-256 for release runs, and the host, Bun, AbsoluteJS, adb or Xcode versions.',
		term: 'Automated checks'
	},
	{
		description:
			'Startup timing, safe areas, rotation with the keyboard open, offline and reconnect, system bars, navigation and device features, each NOT_RUN until you mark it PASS, FAIL or SKIPPED.',
		term: 'Manual checklist'
	},
	{
		description:
			'A screenshot of the app on the target, such as android-emulator.png, android-release.png or ios-simulator.png.',
		term: 'Screenshot'
	},
	{
		description:
			'On failure, a JSON diagnostic and, when the app was attached, a screenshot, in .absolutejs/mobile/test-artifacts (or --artifacts). The error message names the file.',
		term: 'Failure diagnostics'
	},
	{
		description:
			'Reports stay on your machine. Tokens, cookies, passwords, query strings and coordinates are redacted before they are written.',
		term: 'Privacy'
	}
];

const flagRows = [
	[
		'--route <path>',
		'Android, development',
		'A route to check; repeat it for more. Defaults to mobile.entry.'
	],
	[
		'--wait-for-hmr',
		'Android and iOS, development',
		'Wait for a saved edit to reach the app and report how long it took'
	],
	[
		'--port <n> [--https]',
		'Development',
		'The dev server to use when more than one is running for the project'
	],
	[
		'--timeout <ms>',
		'Development',
		'How long each check may take. Default 30000.'
	],
	[
		'--serial <id>',
		'Android',
		'The adb target. Defaults to the first ready emulator.'
	],
	['--udid <id>', 'iOS', 'The booted simulator to use'],
	[
		'--device <id>',
		'iOS',
		'A physical iPhone: the one running bun dev --ios-device, or the one to install a release on'
	],
	[
		'--testflight',
		'iOS release',
		'Test the TestFlight build installed on --device'
	],
	[
		'--remote <name>',
		'iOS',
		'Run on a paired Mac: release runs, or a device session started through it'
	],
	[
		'--release <dir>',
		'Android and iOS',
		'Test an installed release: its directory or its release.json'
	],
	[
		'--report [dir]',
		'Android and iOS',
		'Write report.json, report.md and a screenshot'
	],
	[
		'--artifacts <dir>',
		'Android and iOS',
		'Where failure diagnostics go; must be inside the project'
	],
	[
		'--yes',
		'Release runs',
		'Approve the Bundletool download, or confirm an iPhone is offline'
	],
	[
		'--json',
		'Android and iOS',
		'Print the result as JSON; progress goes to stderr'
	]
];

const troubleshootingItems: DefinitionItem[] = [
	{
		description:
			'The test attaches to the app bun dev started. Start bun dev, wait until the target reports it is ready, then run the test again.',
		term: 'No running AbsoluteJS dev server was found for this project'
	},
	{
		description:
			'More than one bun dev is running in this project. Choose one with --port.',
		term: 'Multiple dev servers are running for this project'
	},
	{
		description:
			'No emulator has finished booting. Let bun dev start one, or pass --serial for a connected device.',
		term: 'No ready Android emulator was found'
	},
	{
		description:
			'The SDK is missing or incomplete. Run absolute mobile doctor android --fix.',
		term: 'Android Debug Bridge is unavailable'
	},
	{
		description:
			'The app is not open, or it is a release build, which cannot be inspected. Open the debug app that bun dev installed.',
		term: 'Could not attach to a debuggable WebView'
	},
	{
		description:
			'The page threw while rendering. The failure screenshot shows the overlay and the diagnostic JSON has the console output.',
		term: 'Loaded with the AbsoluteJS error overlay visible'
	},
	{
		description:
			'Release acceptance switches the network off, which only an emulator allows. Drop --serial or point it at an emulator.',
		term: 'Requires an Android emulator'
	},
	{
		description:
			'The release was built before mobile.appId or the engine changed. Build it again.',
		term: 'Release app ID does not match mobile.appId'
	},
	{
		description:
			'Build again with absolute mobile build ios --registered-device-artifact to export an IPA for registered devices from the same archive.',
		term: 'This release has no same-archive registered-device IPA'
	},
	{
		description:
			'Pair the iPhone in Xcode, trust this Mac, unlock the phone and turn on Developer Mode.',
		term: 'The selected physical iOS device is unavailable'
	},
	{
		description:
			'Testing a physical iPhone needs dev.https: true in absolute.config.ts, so the report shows the app trusted your dev server.',
		term: 'Physical iOS acceptance requires dev.https: true'
	},
	{
		description:
			'iOS testing runs on macOS. On Windows or Linux, pair a Mac with absolute mobile pair mac and use --remote.',
		term: 'iOS release acceptance requires macOS or a paired Remote Mac'
	}
];

export const NativeTestingView = ({
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
					<h1 id="native-testing" style={h1Style(isMobileOrTablet)}>
						Testing on Emulators and Devices
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS installs the emulators, boots them, and tests
						your app inside its real WebView on Android emulators,
						iOS simulators and iPhones. It can install the exact
						signed build you are about to ship, launch it with the
						network off, and hand you a report that becomes release
						evidence.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="toolchain"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Toolchain in one command
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						You do not need Android Studio.{' '}
						<code>mobile doctor</code> checks everything native
						development needs, and <code>--fix</code> installs what
						is missing. <code>bun dev</code> offers the same install
						the first time it finds the toolchain missing.
					</p>
					<PrismPlus
						codeString={nativeTestingDoctor}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['What --fix sets up', 'Details']}
						rows={toolchainRows}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={hostItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="targets"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Emulators and simulators
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>mobile</code> configured,{' '}
						<code>bun dev</code> starts your app on an Android
						emulator and, on a Mac or through a paired one, an iOS
						simulator, next to the web server. Every target goes
						through the same steps:
					</p>
					<StepFlow steps={targetSteps} themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						Physical devices use the same loop with{' '}
						<code>--android-device</code> and{' '}
						<code>--ios-device</code>.{' '}
						<a href="/documentation/native-development">
							Development
						</a>{' '}
						covers them and the Remote Mac.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="modes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Three ways to test
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The browser preview is the fastest loop for layout,
						routes, offline states and Back. It runs your real page
						in an iOS- or Android-shaped frame, but it is not a
						WebView, so plugins, permissions, OAuth callbacks and
						secure storage need a real target. Use all three: the
						preview while you build, <code>mobile test</code> on the
						running app, and <code>--release</code> before you ship.
					</p>
					<ComparisonTable
						columns={['Browser preview', 'Running app', 'Release']}
						rows={modeRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="development"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Test the running app
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>bun dev</code> running,{' '}
						<code>mobile test android</code> drives the app on the
						emulator through the same debugging protocol Chrome
						uses. List the routes that matter; each one is opened
						inside the app and checked.
					</p>
					<PrismPlus
						codeString={nativeTestingRoutes}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<ChecklistRows
						items={androidDevChecks}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On iOS, <code>mobile test ios</code> launches the
						installed app on the booted simulator, waits for it to
						connect to your dev server and takes a screenshot. The
						simulator opens <code>mobile.entry</code>, so iOS does
						not take <code>--route</code>.{' '}
						<code>--wait-for-hmr</code> works on both:
					</p>
					<PrismPlus
						codeString={nativeTestingHmr}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						To test a physical iPhone, start <code>bun dev</code> on
						it and pass the same device to the test. It relaunches
						the app and confirms it reconnects to your HTTPS dev
						server.
					</p>
					<PrismPlus
						codeString={nativeTestingPhysicalIos}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} title="Expo apps">
						Testing the running app is available for Capacitor apps.
						Expo apps use release testing, below, which works for
						both engines as long as <code>mobile.entry</code> is a
						web route. <a href="/documentation/native-expo">Expo</a>{' '}
						has the rest.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="release"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Test the exact release
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>--release</code> tests the signed App Bundle that{' '}
						<code>mobile build android</code> produced, not a debug
						build. It proves the app installs and starts from what
						is inside it, with no network.
					</p>
					<PrismPlus
						codeString={nativeTestingAndroidRelease}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<StepFlow
						steps={androidReleaseSteps}
						themeSprings={themeSprings}
					/>
					<TerminalFrame
						command={nativeTestingOutput.command}
						output={nativeTestingOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ios-release"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						iOS: simulator, iPhone, TestFlight
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						iOS release testing runs at three levels, each closer to
						what your users install. Each launches the app twice and
						checks it renders its embedded content. On an iPhone,
						the test asks you to turn on Airplane Mode and turn off
						Wi-Fi first; <code>--yes</code> confirms you have. From
						Windows or Linux, add <code>--remote</code> and the run
						happens on your paired Mac.
					</p>
					<PrismPlus
						codeString={nativeTestingIosRelease}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Level', 'What is installed', 'Evidence']}
						rows={iosReleaseRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reports"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reports and artifacts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every test prints its result and exits non-zero on
						failure. Add <code>--report</code> to keep a record:
					</p>
					<DefinitionGrid
						items={reportItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="certify"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						From report to certification
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A release report is evidence for{' '}
						<code>mobile certify</code>, which binds it to that
						exact release. An Android release report counts as{' '}
						<code>installed</code>; iOS reports count as{' '}
						<code>simulator</code>, <code>device</code> or{' '}
						<code>store</code>, by the level above. Publishing
						checks the certification your release policy requires.
					</p>
					<PrismPlus
						codeString={nativeTestingCertify}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<a href="/documentation/native-release">Release</a>{' '}
						covers certification policies and publishing.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ci"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In CI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Release tests run unattended: <code>--yes</code>{' '}
						approves the Bundletool download, <code>--json</code>{' '}
						prints a machine-readable result, and the exit code
						fails the job. <code>absolute mobile ci github</code>{' '}
						generates a workflow that builds, tests and certifies
						for you;{' '}
						<a href="/documentation/native-release">Release</a>{' '}
						walks through it.
					</p>
					<PrismPlus
						codeString={nativeTestingCi}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="flags"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Flags
					</AnchorHeading>
					<DocsTable
						columns={['Flag', 'Applies to', 'What it does']}
						rows={flagRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every <code>absolute mobile</code> command is in the{' '}
						<a href="/documentation/native-cli">CLI reference</a>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="troubleshooting"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Troubleshooting
					</AnchorHeading>
					<DefinitionGrid
						items={troubleshootingItems}
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
