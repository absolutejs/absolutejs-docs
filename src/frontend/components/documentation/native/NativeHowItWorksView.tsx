import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	howItWorksKeepReleases,
	howItWorksPageRequest,
	howItWorksPageResponse,
	howItWorksPageRoute
} from '../../../data/documentation/native/nativeHowItWorksDocsCode';
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
	DefinitionGrid,
	type DefinitionItem
} from '../../utils/DefinitionGrid';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#finding-pages', label: 'Finding your pages' },
	{ href: '#inside-the-app', label: 'Inside the app' },
	{ href: '#page-data', label: 'Page data' },
	{ href: '#offline', label: 'Offline' },
	{ href: '#html-and-htmx', label: 'HTML and HTMX pages' },
	{ href: '#older-apps', label: 'Older installed apps' },
	{ href: '#security', label: 'Security' }
];

const buildSteps: StepFlowStep[] = [
	{
		description:
			'The build loads your exported Elysia app with the TypeScript compiler and finds every .get and .head route that renders a page.',
		title: 'Find the page routes'
	},
	{
		description:
			'Each page gets an identity and a contract: the shape of its props type. Two routes that render the same page share it.',
		title: 'Record each page’s contract'
	},
	{
		description:
			'Each page’s client code and styles are copied into the app under content hashes, with your static assets.',
		title: 'Package the client code'
	},
	{
		description:
			'A manifest lists the routes, pages and entry route, your production server, deep-link hosts and the device features in use.',
		title: 'Write the app manifest'
	}
];

const recognisedRules = [
	'The route is a .get or .head call with a literal path, such as ‘/products/:id’.',
	'The route’s handler calls handleReactPageRequest, handleSveltePageRequest, handleVuePageRequest, handleAngularPageRequest, handleHTMLPageRequest or handleHTMXPageRequest by name.',
	'The handler’s argument is an object literal, with index: asset(manifest, ‘…’) for the page’s client bundle.',
	'Props are plain JSON: strings, numbers, booleans, null, arrays and objects. Dates and class instances arrive as JSON.'
];

const bundleItems: DefinitionItem[] = [
	{
		description:
			'The page every launch starts from, with a Content-Security-Policy that only allows scripts packaged in the app.',
		term: 'index.html'
	},
	{
		description:
			'The shell: navigation, deep links, Back, sign-in, offline data and updates.',
		term: 'absolute-mobile-bootstrap.js'
	},
	{
		description:
			'Routes, pages, the entry route, your production server, deep-link hosts and the device features the build found.',
		term: 'absolute-mobile-manifest.json'
	},
	{
		description:
			'Each page’s client code and styles, named by content hash.',
		term: 'pages/ and styles/'
	},
	{
		description:
			'Your static assets, plus HTML and HTMX pages as documents that are checked against their hashes when they load.',
		term: 'assets/, html/ and htmx/'
	}
];

const offlineRows = [
	[
		'Launching the app',
		'Works offline',
		'The interface is packaged in the app.'
	],
	[
		'Opening a page',
		'Needs your server',
		'The app shows “You are offline. Reconnect to load this page.” with a Retry button.'
	],
	[
		'Reading data kept in @absolutejs/sync',
		'Works offline',
		'Stored encrypted on the device for the signed-in user.'
	],
	[
		'Writing data through @absolutejs/sync',
		'Works offline',
		'Queued on the device and applied exactly once when the network returns.'
	]
];

const upgradeRows = [
	[
		'app-release',
		'The installed app is older than the releases your server keeps.'
	],
	[
		'page-contract',
		'The page the app asked for is not in any release your server keeps.'
	],
	['runtime', 'The native shell changed in a way an older app cannot use.'],
	['protocol', 'The app speaks an older version of the page protocol.']
];

const securityItems: DefinitionItem[] = [
	{
		description:
			'Production apps never load their interface from a URL. Scripts come only from the app, and the production Capacitor config may not point at a server, allow cleartext or widen navigation.',
		term: 'No remote code'
	},
	{
		description:
			'productionOrigin must be HTTPS (plain http is allowed only on localhost in development) and may not contain credentials, a path, a query or a fragment.',
		term: 'One HTTPS server'
	},
	{
		description:
			'The app may only connect to itself and your production server, over HTTPS and its secure WebSocket.',
		term: 'Locked-down connections'
	},
	{
		description:
			'Page code never sees access or refresh tokens. The shell adds credentials to requests for your server and nowhere else.',
		term: 'Tokens stay native'
	},
	{
		description:
			'Unused device features install nothing and request no permissions. Prompts appear only when your code asks.',
		term: 'Permissions follow imports'
	},
	{
		description:
			'absolute mobile doctor release fails a build that still contains dev servers, debug flags, cleartext traffic or development certificates.',
		term: 'Release checks'
	}
];

export const NativeHowItWorksView = ({
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
						id="native-how-it-works"
						style={h1Style(isMobileOrTablet)}
					>
						How Native Apps Work
					</h1>
					<p style={paragraphLargeStyle}>
						The app carries your interface; your server carries the
						data. Here is how pages get into the app, how each one
						gets its data, and why a server deploy never breaks the
						apps people already have installed.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="finding-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Finding your pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute start</code>, <code>compile</code> and{' '}
						<code>absolute mobile build</code> all run the same
						steps when <code>mobile</code> is configured:
					</p>
					<StepFlow steps={buildSteps} themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						A route counts as a page when:
					</p>
					<ChecklistRows
						items={recognisedRules}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={howItWorksPageRoute}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} title="Frameworks">
						React, Svelte, Vue, Angular, HTML and HTMX pages are
						packaged into the app. Ember and Astro support is coming
						soon; until then the build stops with a message naming
						the page.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="inside-the-app"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Inside the app
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The packaged interface is written to{' '}
						<code>.absolutejs/mobile/web</code> (change it with{' '}
						<code>bundleDirectory</code>) and copied into the native
						projects:
					</p>
					<DefinitionGrid
						items={bundleItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-data"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page data
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When the app opens a route, it asks your production
						server for that route with a page media type. The same
						handler that renders HTML for a browser runs, and
						AbsoluteJS returns its props as JSON instead. Your
						route’s guards, auth and database queries all run
						exactly as they do for the web.
					</p>
					<PrismPlus
						codeString={howItWorksPageRequest}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={howItWorksPageResponse}
						language="json"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The packaged page then renders those props on the
						device. Moving between pages keeps the latest request
						and cancels the rest, and the screen changes only once
						the next page is ready, with a view transition where the
						platform supports one.{' '}
						<a href="/documentation/native-navigation-ui">
							Navigation & UI
						</a>{' '}
						covers links, Back and sheets.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="offline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Offline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The app starts with no network, and data you keep in{' '}
						<code>@absolutejs/sync</code> stays usable offline. Page
						props come from your server each time a page opens.
					</p>
					<DocsTable
						columns={['What the user does', 'Offline', 'Why']}
						rows={offlineRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<a href="/documentation/native-auth-sync">
							Auth, Sync & HTTP
						</a>{' '}
						shows how to keep data on the device.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="html-and-htmx"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTML and HTMX pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTML and HTMX pages are packaged as documents and
						checked against their hashes when they load. In HTMX
						pages, <code>hx-get</code>, <code>hx-post</code> and the
						other request attributes, and form actions, are pointed
						at your production server. Fragments your server returns
						are cleaned before they are inserted: scripts, iframes,
						inline event handlers, <code>hx-on</code> and links to
						other origins are removed.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="older-apps"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Older installed apps
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						People update apps when they get round to it, so your
						server answers more than one version. Each build keeps
						the server code of the three most recent releases. When
						an app from an earlier release asks for a page, the
						server answers with that release’s own code, so it
						receives the props it was built for, even after you have
						changed them.
					</p>
					<p style={paragraphSpacedStyle}>
						An app older than that receives HTTP 426 and shows “This
						app version must be updated to continue.” The response
						says why:
					</p>
					<DocsTable
						columns={['Reason', 'Meaning']}
						rows={upgradeRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Keep releases between builds"
						variant="warning"
					>
						Releases are kept in{' '}
						<code>build/.absolutejs/mobile-compatibility</code>{' '}
						(under your <code>buildDirectory</code>). A build that
						starts from an empty directory, as most CI builds do,
						only knows the release it just made. Restore that folder
						from the previous build first:
					</Callout>
					<PrismPlus
						codeString={howItWorksKeepReleases}
						language="yaml"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="security"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Security
					</AnchorHeading>
					<DefinitionGrid
						items={securityItems}
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
