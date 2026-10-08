import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	authPageCode,
	authServerSetup,
	httpPageCode,
	syncEvents,
	syncLocalSchema,
	syncPageCode,
	syncRemediation
} from '../../../data/documentation/native/nativeAuthSyncDocsCode';
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
import { StatBand, type StatTile } from '../../utils/StatBand';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#sign-in', label: 'Sign-in' },
	{ href: '#server-setup', label: 'Server setup' },
	{ href: '#api-calls', label: 'API calls' },
	{ href: '#offline-data', label: 'Offline data' },
	{ href: '#local-schema', label: 'What is stored' },
	{ href: '#migrations', label: 'Schema changes' },
	{ href: '#status', label: 'Status and failures' },
	{ href: '#packages', label: 'Packages' }
];

const signInSteps: StepFlowStep[] = [
	{
		description:
			'Your page calls the same @absolutejs/auth client it uses on the web.',
		title: 'The user taps Sign in'
	},
	{
		description:
			'The app opens your own sign-in page in the system browser (Safari or Chrome), never in a web view, using the OAuth code flow with PKCE.',
		title: 'Your sign-in page opens'
	},
	{
		description:
			'The browser returns to the app through its private link. The app exchanges the one-time code and stores the refresh credential in the iOS Keychain or Android Keystore.',
		title: 'The app receives the session'
	},
	{
		description:
			'From then on, page requests, @absolutejs/http calls and Sync sockets to your server are signed in automatically. Your page code never sees a token.',
		title: 'Everything is authenticated'
	}
];

const generatedClientItems: DefinitionItem[] = [
	{
		description:
			'absolutejs-native:<appId>, a public client with no secret, registered on your server automatically by absolute dev, start and compile.',
		term: 'Client ID'
	},
	{
		description:
			'<scheme>://auth/callback. The scheme is deepLinks.scheme, or your appId in lower case.',
		term: 'Redirect URI'
	},
	{
		description:
			'Your mobile.server.productionOrigin. Tokens are only ever sent there.',
		term: 'Issuer'
	},
	{
		description: 'openid and profile.',
		term: 'Scopes'
	}
];

const httpItems: DefinitionItem[] = [
	{
		description:
			'Requests go only to your production origin. Paths are relative; another host is refused.',
		term: 'One origin'
	},
	{
		description:
			'In the app, the signed-in user’s token is added for you. In the browser, your session cookie is sent to the same origin.',
		term: 'Credentials handled'
	},
	{
		description:
			'Authorization, Cookie and Proxy-Authorization headers set by page code are rejected, and redirects are refused, so credentials cannot leak.',
		term: 'Nothing to leak'
	},
	{
		description:
			'get, post, put, patch and delete parse JSON; request returns the raw Response; fetch plugs into Eden Treaty.',
		term: 'Familiar methods'
	}
];

const syncStats: StatTile[] = [
	{
		detail: 'Keys held by the Keychain or Android Keystore',
		label: 'Encryption',
		value: 'AES-256-GCM'
	},
	{
		detail: 'The OS runs a sync while the app is closed',
		label: 'Background sync',
		unit: 'min',
		value: '15'
	},
	{
		detail: 'A queued write reaches the server once, even after retries',
		label: 'Server effect per write',
		value: '1'
	}
];

const offlineItems: DefinitionItem[] = [
	{
		description:
			'Collections and queued writes are kept in encrypted SQLite on the device, so the app shows its data and accepts changes with no connection.',
		term: 'Stored on the device'
	},
	{
		description:
			'Each signed-in account has its own store. Switching accounts restarts the app’s view so nothing from the previous account stays on screen.',
		term: 'One store per account'
	},
	{
		description:
			'When the app comes back to the foreground or the network returns, Sync reconnects and sends the queue.',
		term: 'Reconnects by itself'
	},
	{
		description:
			'Android’s WorkManager and iOS background tasks send queued writes and pull changes about every 15 minutes, without starting your app’s code.',
		term: 'Syncs in the background'
	}
];

const ruleRows = [
	[{ code: 'match' }, 'A collection or mutation name, or a pattern with *.'],
	[
		{ code: 'sensitivity' },
		'public, private or secret. Private and secret data must be protected or memory-only.'
	],
	[
		{ code: 'protection' },
		'required encrypts it on the device; none stores it as is.'
	],
	[
		{ code: 'onProtectionUnavailable' },
		'error, or memory-only to keep it only in memory where the device cannot encrypt, such as some browsers.'
	],
	[{ code: 'persistence' }, 'durable (the default) or memory-only.'],
	[
		{ code: 'evictionPriority' },
		'critical, normal or disposable: what is removed first when the store is full. Queued writes are never removed.'
	],
	[{ code: 'maxAgeMs' }, 'Drop a cached collection older than this.'],
	[
		{ code: 'conflict' },
		'For mutations: manual (keep it for you to resolve, the default), server-wins, or client-wins with maxAttempts.'
	],
	[{ code: 'maxBytesPerNamespace' }, 'A size limit for each account’s store.']
];

const migrationRows = [
	[{ code: 'rename-field' }, 'collection, from, to'],
	[{ code: 'remove-field' }, 'collection, field'],
	[{ code: 'set-default' }, 'collection, field, value'],
	[{ code: 'delete-collection' }, 'collection']
];

const packageCards: PackageCard[] = [
	{
		description:
			'Sign-in, sessions and the OIDC provider your app signs in through.',
		href: '/documentation/absolute-auth',
		name: 'Absolute Auth',
		packageName: '@absolutejs/auth'
	},
	{
		description:
			'Live collections, optimistic writes and the offline queue.',
		href: '/documentation/sync-overview',
		name: 'Sync',
		packageName: '@absolutejs/sync'
	},
	{
		description:
			'HTTP to your own server with the user’s credentials handled for you.',
		href: '/documentation/http',
		name: 'HTTP',
		packageName: '@absolutejs/http'
	},
	{
		description:
			'The encrypted SQLite store and background sync for Capacitor apps.',
		href: '/documentation/sync-capacitor',
		name: 'Sync Capacitor',
		packageName: '@absolutejs/sync-capacitor'
	},
	{
		description: 'Sign-in for Expo apps.',
		href: '/documentation/auth-expo',
		name: 'Auth Expo',
		packageName: '@absolutejs/auth-expo'
	},
	{
		description: 'The encrypted store and background sync for Expo apps.',
		href: '/documentation/sync-expo',
		name: 'Sync Expo',
		packageName: '@absolutejs/sync-expo'
	}
];

export const NativeAuthSyncView = ({
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
					<h1 id="native-auth-sync" style={h1Style(isMobileOrTablet)}>
						Auth, Sync & HTTP
					</h1>
					<p style={paragraphLargeStyle}>
						Install <code>@absolutejs/auth</code> and your app signs
						users in. Add <code>@absolutejs/sync</code> and it keeps
						their data encrypted on the device and works offline.
						Your page code stays exactly as it is on the web.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sign-in"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sign-in
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When <code>@absolutejs/auth</code> is in your{' '}
						<code>package.json</code>, the app becomes a signed-in
						client of your server. There is nothing to add to{' '}
						<code>absolute.config.ts</code>.
					</p>
					<StepFlow steps={signInSteps} themeSprings={themeSprings} />
					<PrismPlus
						codeString={authPageCode}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS registers the app with your server for you:
					</p>
					<DefinitionGrid
						items={generatedClientItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The app signs in through Auth’s OpenID Connect provider,
						so turn on <code>oidc</code> in your auth config. Give
						it a <code>socketTicketStore</code> when you use Sync:
						the app opens its socket with a short-lived, single-use
						ticket instead of putting a token in the URL.
					</p>
					<PrismPlus
						codeString={authServerSetup}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="The build checks this"
						variant="warning"
					>
						A mobile build stops with a message if{' '}
						<code>@absolutejs/auth</code> is installed but its OIDC
						provider is not mounted, so you find out before a
						release, not from users.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="api-calls"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						API calls
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For plain calls to your own API, use{' '}
						<code>@absolutejs/http</code>. It works the same in the
						browser and the app, and it is how the signed-in user’s
						credentials reach your routes from the app.
					</p>
					<PrismPlus
						codeString={httpPageCode}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={httpItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="offline-data"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Offline data
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your app’s screens start offline, but each page asks
						your server for its data. Data that must be there
						without a connection belongs in{' '}
						<code>@absolutejs/sync</code>. With Auth and Sync both
						installed, every Sync client in your pages gets a
						durable, encrypted store on the device. You write the
						same code as on the web, or use the{' '}
						<code>@absolutejs/sync/react</code>,{' '}
						<code>/svelte</code>, <code>/vue</code> and{' '}
						<code>/angular</code> bindings.
					</p>
					<StatBand stats={syncStats} themeSprings={themeSprings} />
					<PrismPlus
						codeString={syncPageCode}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={offlineItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="local-schema"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What is stored
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Describe your offline data under{' '}
						<code>absolutejs.sync.localSchema</code> in{' '}
						<code>package.json</code>. Packages you install can
						declare their own, and the app combines them. Without
						one, your app’s data is version 1 with no rules.
					</p>
					<PrismPlus
						codeString={syncLocalSchema}
						language="json"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Rule', 'Meaning']}
						rows={ruleRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="migrations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Schema changes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Raise <code>version</code> when the shape of stored data
						changes, and add a migration whose{' '}
						<code>toVersion</code> is the new version. The device
						runs every step from the version it has to the new one,
						once, before your pages read the store, so each version
						needs its migration. A release upgrades data stored by
						up to two earlier versions; set{' '}
						<code>minimumCompatibleVersion</code> to reach further
						back. Data older than that reports{' '}
						<code>SCHEMA_TOO_OLD</code> through{' '}
						<code>absolute:sync-schema</code>.
					</p>
					<DocsTable
						columns={['Operation', 'Fields']}
						rows={migrationRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="status"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Status and failures
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Two window events report what Sync is doing:{' '}
						<code>absolute:sync-status</code> for the connection and
						queue, and <code>absolute:sync-schema</code> for the
						stored data’s version.
					</p>
					<PrismPlus
						codeString={syncEvents}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A write the server rejected is kept rather than lost.
						Inspect it, retry it, send it again with new arguments,
						or discard it:
					</p>
					<PrismPlus
						codeString={syncRemediation}
						language="typescript"
						showLineNumbers={false}
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
					<p style={paragraphSpacedStyle}>
						The build installs the native packages for you. Push
						notifications use the same sign-in; see{' '}
						<a href="/documentation/native-push">
							Push notifications
						</a>
						.
					</p>
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
