import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeExpoConfig,
	nativeExpoDev,
	nativeExpoRelease,
	nativeExpoRoute,
	nativeExpoServerRoute
} from '../../../data/documentation/native/nativeExpoDocsCode';
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
	{ href: '#why-expo', label: 'Why Expo' },
	{ href: '#trade-offs', label: 'Trade-offs' },
	{ href: '#how-it-works', label: 'How it works' },
	{ href: '#configure', label: 'Configure' },
	{ href: '#native-routes', label: 'Write a native route' },
	{ href: '#auth-sync-devices', label: 'Auth, Sync and devices' },
	{ href: '#bridge', label: 'The bridge' },
	{ href: '#development', label: 'Development' },
	{ href: '#release-and-updates', label: 'Release and updates' }
];

const reasonItems: DefinitionItem[] = [
	{
		description:
			'React Native lists recycle native views, so feeds and catalogues with thousands of rows scroll at native frame rates.',
		term: 'Very long lists'
	},
	{
		description:
			'Swipe-to-dismiss, drag to reorder, pinch and pan run on the native gesture system instead of DOM touch events.',
		term: 'Gesture-heavy screens'
	},
	{
		description:
			'Every route sits in Expo Router’s native stack, with the platform’s own push and pop transitions and edge swipe back.',
		term: 'Native navigation'
	},
	{
		description:
			'Maps, camera views, video and other components that only exist as React Native libraries become available on the screens that use them.',
		term: 'React Native libraries'
	},
	{
		description:
			'Native routes reload with Metro Fast Refresh, keeping component state, while your web routes keep AbsoluteJS hot reload.',
		term: 'Fast Refresh'
	}
];

const tradeOffRows: ComparisonRow[] = [
	{
		feature: 'Native project',
		note: 'Expo’s project is regenerated from your config on every sync; change absolute.config.ts, not the generated files.',
		values: ['mobile/, yours to edit', '.absolutejs/mobile/expo, generated']
	},
	{
		feature: 'Screens in React Native',
		values: [false, 'Routes you list in routes.native']
	},
	{
		feature: 'Native route framework',
		values: ['—', 'React Native only']
	},
	{
		feature: 'Every other page',
		values: ['Your page', 'Your page, in a WebView']
	},
	{
		feature: 'Device features, Auth, Sync, push',
		values: [true, true]
	},
	{
		feature: 'Over-the-air updates',
		values: [true, true]
	}
];

const architectureSteps: StepFlowStep[] = [
	{
		description:
			'The generated app is an Expo Router app. Every URL, including deep links, resolves through it, so navigation is native.',
		title: 'Expo Router owns navigation'
	},
	{
		description:
			'Routes listed in routes.native render your React Native module, with live props from the same server handler that serves that page on the web.',
		title: 'Native routes render React Native'
	},
	{
		description:
			'Every other route renders your AbsoluteJS page, packaged into the app, in a WebView. Android Back walks its history before leaving the screen.',
		title: 'Web routes render your page'
	},
	{
		description:
			'Pages reach device features, HTTP, sign-in and Sync through a bridge to the native side. Tokens and the local database never enter the WebView.',
		title: 'A bridge connects them'
	}
];

const routeRuleRows = [
	['/scanner', 'A static path'],
	['/products/:productId', 'A named parameter matches one segment'],
	[
		'/files/*',
		'A final * matches one or more segments, as params.absoluteWildcard'
	],
	[
		'Not allowed',
		'Query strings, fragments, trailing slashes, a root /*, repeated parameter names, two patterns that match the same URLs'
	],
	[
		'Reserved',
		'/__absolute/native and first segments such as _expo, assets, public and manifest'
	]
];

const nativePropsItems: DefinitionItem[] = [
	{
		description:
			'The props your server route produced for the current URL, typed with the page’s own props type.',
		term: 'pageProps'
	},
	{
		description: 'Path and query parameters from Expo Router.',
		term: 'params'
	},
	{
		description:
			'Runs the server route again and updates pageProps without remounting the screen.',
		term: 'reload()'
	}
];

const runtimeCards: PackageCard[] = [
	{
		description:
			'Sign-in through the system browser with PKCE, credentials in SecureStore. App code keeps using @absolutejs/auth.',
		href: '/documentation/auth-expo',
		name: 'Auth Expo',
		packageName: '@absolutejs/auth-expo'
	},
	{
		description:
			'Encrypted SQLite storage, reconnect on foreground, and background sync for unchanged @absolutejs/sync clients.',
		href: '/documentation/sync-expo',
		name: 'Sync Expo',
		packageName: '@absolutejs/sync-expo'
	},
	{
		description:
			'The Expo implementation of every @absolutejs/devices feature, including push through APNs and FCM.',
		href: '/documentation/devices-expo',
		name: 'Devices Expo',
		packageName: '@absolutejs/devices-expo'
	}
];

const bridgeRows = [
	['Message size', '64 KiB'],
	['HTTP request and response bodies', '48 KiB'],
	['Files (photos, documents)', '64 MiB, transferred in 24 KiB chunks'],
	['Sync socket frames', '4 MiB'],
	['Requests', '30 seconds; pickers and permission prompts 5 minutes'],
	[
		'HTTP',
		'Production origin only; your own Authorization headers and redirects are refused'
	]
];

export const NativeExpoView = ({
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
					<h1 id="native-expo" style={h1Style(isMobileOrTablet)}>
						Expo
					</h1>
					<p style={paragraphLargeStyle}>
						For teams that need specific screens in React Native.
						Set <code>engine: &apos;expo&apos;</code>, list the
						routes you want to rebuild natively, and every other
						page keeps working exactly as it does in the Capacitor
						app.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-expo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why Expo
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Capacitor renders every screen in a WebView, which is
						the right default. Expo earns its place when a screen
						needs what only native views can do:
					</p>
					<DefinitionGrid
						items={reasonItems}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If none of these apply to your app, stay with{' '}
						<a href="/documentation/native-apps">Capacitor</a>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="trade-offs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Trade-offs
					</AnchorHeading>
					<ComparisonTable
						columns={['Capacitor', 'Expo']}
						rows={tradeOffRows}
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
						steps={architectureSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Web routes are not converted to React Native. A React,
						Svelte, Vue, Angular, HTML or HTMX page is packaged and
						rendered exactly as in the Capacitor app. Only the
						modules you list use React Native.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="configure"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configure
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Everything else in <code>mobile</code> works the same
						for both engines. <code>routes.native</code> maps a path
						pattern to a React Native module, relative to your
						project root. The generated app uses Expo SDK 57.
					</p>
					<PrismPlus
						codeString={nativeExpoConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Pattern', 'Rule']}
						rows={routeRuleRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="native-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Write a native route
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A native route is a React Native component whose props
						come from your existing server route. You do not write
						an API for it: the handler that renders the page on the
						web returns the same props to the app.
					</p>
					<PrismPlus
						codeString={nativeExpoServerRoute}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeExpoRoute}
						language="tsx"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={nativePropsItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="auth-sync-devices"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Auth, Sync and devices
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your code does not change. Native routes and web routes
						both use <code>@absolutejs/auth/client</code>,{' '}
						<code>@absolutejs/sync</code> and{' '}
						<code>@absolutejs/devices</code>; the Expo app installs
						these implementations for you, as soon as your{' '}
						<code>package.json</code> lists the package.
					</p>
					<PackageCardGrid
						items={runtimeCards}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Push uses the device&apos;s APNs or FCM token directly
						and registers it with your server exactly as in the
						Capacitor app; see{' '}
						<a href="/documentation/native-push">
							Push notifications
						</a>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="bridge"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The bridge
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Web routes call a fixed list of native methods: device
						features, HTTP, sign-in and Sync. Nothing else on the
						native side is reachable from a page.
					</p>
					<DocsTable
						columns={['Limit', 'Value']}
						rows={bridgeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Sync over the bridge uses the default JSON serializer.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="development"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Development
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>bun dev</code> generates the Expo project, offers
						to install the pinned SDK and Android toolchain, and
						starts Metro, the development client and your server
						together. It rebuilds the native app when your config,{' '}
						<code>package.json</code> or lockfile changes.
					</p>
					<PrismPlus
						codeString={nativeExpoDev}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						iOS needs macOS, or a Mac paired with{' '}
						<code>absolute mobile pair mac</code>.{' '}
						<a href="/documentation/native-development">
							Development
						</a>{' '}
						covers devices, HTTPS and the remote Mac.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="release-and-updates"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Release and updates
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Store builds, the release doctor, certification and
						publishing use the same commands as Capacitor. Each
						build regenerates the native project from scratch, so
						nothing left over from development reaches the store.
					</p>
					<PrismPlus
						codeString={nativeExpoRelease}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Over-the-air updates use the standard{' '}
						<code>expo-updates</code> client against your own
						AbsoluteJS server, with an RSA code-signing certificate
						built into the app.{' '}
						<a href="/documentation/native-updates">
							Over-the-air updates
						</a>{' '}
						covers keys and rollout.
					</p>
					<Callout themeSprings={themeSprings} title="No EAS needed">
						AbsoluteJS builds, signs and serves Expo apps and
						updates itself. EAS Build and EAS Update are not used,
						and you do not need an Expo account.
					</Callout>
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
