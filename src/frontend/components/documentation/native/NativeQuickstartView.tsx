import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	quickstartAndroidDevice,
	quickstartConfig,
	quickstartDev,
	quickstartDoctor,
	quickstartInit,
	quickstartIosDevice,
	quickstartPairMac,
	quickstartServerExport
} from '../../../data/documentation/native/nativeQuickstartDocsCode';
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
	{ href: '#before-you-start', label: 'Before you start' },
	{ href: '#add-the-config', label: '1. Add the config' },
	{ href: '#export-your-server', label: '2. Export your server' },
	{ href: '#create-the-projects', label: '3. Create the projects' },
	{ href: '#run-it', label: '4. Run it' },
	{ href: '#on-your-phone', label: '5. On your phone' },
	{ href: '#preview', label: 'Preview in the browser' },
	{ href: '#next', label: 'Next steps' }
];

const prerequisiteRows = [
	[
		'Android',
		'Linux, macOS, Windows or WSL',
		'Android SDK, emulator, API 36 system image and Java 21. bun dev offers to install them, or run absolute mobile doctor android --fix.'
	],
	[
		'iOS',
		'macOS, or any machine with a paired Mac',
		'Xcode with an iOS Simulator runtime. From Linux or Windows, pair a Mac once and AbsoluteJS builds and runs there over SSH.'
	]
];

const initItems: DefinitionItem[] = [
	{
		description:
			'The Capacitor packages AbsoluteJS has tested, pinned to exact versions. You are asked before anything is installed; --yes approves it up front.',
		term: 'package.json'
	},
	{
		description:
			'The Capacitor config, generated from your mobile block. Edit absolute.config.ts, not this file.',
		term: 'capacitor.config.ts'
	},
	{
		description:
			'The Android Studio and Xcode projects. They are yours: commit them and add native code if you need to. Change the folder with nativeProject.directory.',
		term: 'mobile/android and mobile/ios'
	},
	{
		description:
			'Your app’s icons and splash screens, deep links, the permissions for the device features you import, and the settings for sign-in, offline data and updates.',
		term: 'Applied from your config'
	}
];

const devSteps: StepFlowStep[] = [
	{
		description:
			'If the Android toolchain is missing, bun dev offers to install it. If the native project is missing, it offers to create it.',
		title: 'Check the toolchain'
	},
	{
		description:
			'An Android emulator boots, and on macOS (or a paired Mac) an iOS Simulator starts beside it.',
		title: 'Start the emulator and simulator'
	},
	{
		description:
			'The app is installed and pointed at your dev server, so every page, style and edit arrives over the same hot reload as the browser.',
		title: 'Install the app'
	},
	{
		description:
			'Native logs stream into your terminal as [android] and [ios]. Press d to see each device’s status, or type relaunch to restart the app.',
		title: 'Develop'
	}
];

const nextCards: PackageCard[] = [
	{
		description:
			'Camera, location, notifications, share, haptics and the rest, with what each does on every platform.',
		href: '/documentation/native-devices',
		name: 'Device APIs'
	},
	{
		description:
			'Sign-in, encrypted offline data and API calls in the app, without changing your page code.',
		href: '/documentation/native-auth-sync',
		name: 'Auth, Sync & HTTP'
	},
	{
		description:
			'Emulators, physical devices, HTTPS, the browser preview and building iOS from Linux or Windows.',
		href: '/documentation/native-development',
		name: 'Development'
	},
	{
		description:
			'Icons, splash screens and the links that open your app from the web.',
		href: '/documentation/native-branding-links',
		name: 'Branding & deep links'
	}
];

export const NativeQuickstartView = ({
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
						id="native-quickstart"
						style={h1Style(isMobileOrTablet)}
					>
						Native Quickstart
					</h1>
					<p style={paragraphLargeStyle}>
						Take an AbsoluteJS app you already have and run it as an
						iOS and Android app: add a config block, create the
						native projects, and start <code>bun dev</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="before-you-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Before you start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						You need an AbsoluteJS app whose pages are served by
						React, Svelte, Vue, Angular, HTML or HTMX page handlers.
						Then, for each platform you want to run:
					</p>
					<DocsTable
						columns={['Platform', 'Your machine', 'What it needs']}
						rows={prerequisiteRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={quickstartDoctor}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="add-the-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						1. Add the config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>appId</code> is the identifier the stores know
						your app by, in reverse-domain form.{' '}
						<code>productionOrigin</code> is the HTTPS address of
						your deployed server: the app loads each page’s data
						from there.
					</p>
					<PrismPlus
						codeString={quickstartConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Both platforms are built unless you set{' '}
						<code>platforms</code>, and the app opens on{' '}
						<code>/</code> unless you set <code>entry</code>. Every
						other field is in the{' '}
						<a href="/documentation/native-config">
							config reference
						</a>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="export-your-server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						2. Export your server
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build loads your server to find its pages, so the
						Elysia app has to be exported as <code>server</code>,{' '}
						<code>app</code> or the default export. Your handlers
						stay exactly as they are: the same route returns HTML to
						a browser and JSON props to the app.
					</p>
					<PrismPlus
						codeString={quickstartServerExport}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="create-the-projects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						3. Create the native projects
					</AnchorHeading>
					<PrismPlus
						codeString={quickstartInit}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={initItems}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						After you change the <code>mobile</code> block or start
						using a new device feature, run{' '}
						<code>bunx absolute mobile sync</code> to apply it to
						the native projects.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="run-it"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						4. Run it
					</AnchorHeading>
					<PrismPlus
						codeString={quickstartDev}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<StepFlow steps={devSteps} themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						To work on the web only, run{' '}
						<code>bunx absolute dev --no-mobile</code> or set{' '}
						<code>ABSOLUTE_NO_MOBILE=1</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="on-your-phone"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						5. Run it on your phone
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<strong>Android.</strong> Turn on USB debugging, connect
						the phone, and pass its serial. Your dev server is
						reachable over your local network for the session.
					</p>
					<PrismPlus
						codeString={quickstartAndroidDevice}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>iPhone.</strong> Pair it in Xcode once, turn on
						Developer Mode, and choose a signing team for the
						project. Then pass its identifier or name.
					</p>
					<PrismPlus
						codeString={quickstartIosDevice}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>iOS from Linux or Windows.</strong> Pair a Mac
						once. From then on <code>bun dev</code> sends your
						project to it, builds there, and streams hot reload back
						over SSH.
					</p>
					<PrismPlus
						codeString={quickstartPairMac}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Using HTTPS in dev"
					>
						With <code>dev.https</code> on, AbsoluteJS trusts its
						development certificate inside debug builds only, so
						phones reach your dev server over HTTPS without changing
						any system settings.{' '}
						<a href="/documentation/native-development">
							Development
						</a>{' '}
						covers each platform.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="preview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Preview in the browser
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For quick layout work there is no need to wait for an
						emulator. The dev server prints a Mobile link that runs
						your real pages in an iPhone or Android frame, with
						controls for the platform, network, keyboard, Back and
						deep links.
					</p>
					<TerminalFrame
						command="bun dev"
						output={
							'  ➜  Local:   http://localhost:3000/\n  ➜  Mobile:  http://localhost:3000/__absolute/mobile-preview'
						}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="next"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Next steps
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
