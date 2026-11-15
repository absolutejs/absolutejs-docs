import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteRouterBeforeNavigate,
	svelteRouterGotoOutcome,
	svelteRouterGuardTypes,
	svelteRouterHandler,
	svelteRouterLazyComponent,
	svelteRouterLazyRoute,
	svelteRouterPreload,
	svelteRouterRouteGuard,
	svelteRouterRouterGuard,
	svelteRouterScroll,
	svelteRouterSession
} from '../../../data/documentation/svelteRouterDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#setup', label: 'Setup' },
	{ href: '#route-guards', label: 'Route Guards' },
	{ href: '#router-guards', label: 'Router Guards' },
	{ href: '#before-navigate', label: 'beforeNavigate' },
	{ href: '#guard-results', label: 'Guard Results' },
	{ href: '#server-redirects', label: 'Server Redirects' },
	{ href: '#lazy-routes', label: 'Lazy Routes' },
	{ href: '#scroll-restoration', label: 'Scroll Restoration' }
];

const guardRows: DocsTableCell[][] = [
	[
		{ code: 'beforeNavigate(fn)' },
		'Browser only',
		'Every client-side navigation'
	],
	[
		{ code: '<Router guard>' },
		'Browser and server',
		'Outermost router: every navigation. Nested router: navigations onto its routes.'
	],
	[
		{ code: '<Route guard>' },
		'Browser and server',
		'Navigations onto that route'
	]
];

const resultRows: DocsTableCell[][] = [
	[{ code: 'undefined' }, 'Allow the navigation'],
	[{ code: 'true' }, 'Allow the navigation'],
	[{ code: 'false' }, 'Cancel: the URL and the route stay as they were'],
	[{ code: "'/app/login'" }, 'Redirect to that URL'],
	[
		{ code: "{ redirect: '/app/login', replace: true }" },
		'Redirect, replacing the current history entry'
	],
	[{ code: "redirect('/app/login')" }, 'Redirect. Return it or throw it.']
];

const serverRows: DocsTableCell[][] = [
	[
		'Redirect',
		{ code: '302' },
		'Location is the target. A same-origin target is written as a path.'
	],
	[
		{ code: 'false' },
		{ code: '403' },
		'The request ends with 403 Forbidden.'
	],
	['Allow', { code: '200' }, 'The page renders as usual.']
];

const scrollRows: DocsTableCell[][] = [
	[
		{ code: '<Link>' },
		'Top of the page, or the #hash target when the URL has one'
	],
	[{ code: 'goto(url)' }, 'Same as a link'],
	['Back / forward', 'The position you were at when you left that entry'],
	['Reload', 'The position saved in the entry'],
	[{ code: 'noScroll' }, 'Unchanged. Pass it to goto() or set it on <Link>.'],
	[{ code: 'pushState / replaceState' }, 'Unchanged (shallow routing)']
];

export const SvelteRouterView = ({
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
					<h1 id="svelte-router" style={h1Style(isMobileOrTablet)}>
						Router
					</h1>
					<p style={paragraphLargeStyle}>
						The Svelte router ships with AbsoluteJS. Guards decide
						whether a navigation happens, in the browser and during
						the server render. Lazy routes load a component only
						when it is needed. Scroll positions are kept across back
						and forward.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Import <code>Router</code>, <code>Route</code> and{' '}
						<code>Link</code> by file path from{' '}
						<code>@absolutejs/absolute/svelte/router/*.svelte</code>
						. Functions and types such as <code>goto</code>,{' '}
						<code>redirect</code> and <code>NavigationContext</code>{' '}
						come from{' '}
						<code>@absolutejs/absolute/svelte/router</code>. The
						Svelte SPA page covers routes, params, links and{' '}
						<code>goto</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						Pass <code>request</code> to the page handler. The
						handler sets <code>props.url</code> from it, and guards
						get it while the page renders on the server.
					</p>
					<PrismPlus
						codeString={svelteRouterHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="route-guards"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Route Guards
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A guard is a function that runs before a navigation
						commits. Put one on a <code>Route</code> to protect that
						route. It runs for <code>Link</code> clicks,{' '}
						<code>goto()</code>, back and forward, and the server
						render. Guards can be async.
					</p>
					<PrismPlus
						codeString={svelteRouterRouteGuard}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>redirect()</code> returns a value you can return
						or throw. Throwing it from a helper deep inside a guard
						stops the guard chain the same way. Any other error a
						guard throws rejects the navigation.
					</p>
					<PrismPlus
						codeString={svelteRouterSession}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="router-guards"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Router Guards
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A guard on <code>Router</code> covers a group of routes.
						On the outermost router it runs for every navigation. On
						a nested router it runs for navigations onto that
						router&apos;s routes.
					</p>
					<PrismPlus
						codeString={svelteRouterRouterGuard}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="before-navigate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						beforeNavigate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>beforeNavigate</code> registers a guard for every
						client-side navigation. It never runs on the server, so
						use it for browser concerns such as unsaved changes. Put
						checks the server must enforce on a <code>Route</code>{' '}
						or <code>Router</code> guard. Called during component
						setup, the guard is removed when the component is
						destroyed. It also returns a function that removes it.
					</p>
					<PrismPlus
						codeString={svelteRouterBeforeNavigate}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For one navigation the guards run in this order, and the
						first guard that cancels or redirects decides:{' '}
						<code>beforeNavigate</code> guards in registration
						order, then each mounted <code>Router</code> guard
						outermost first, then the matched <code>Route</code>{' '}
						guard.
					</p>
					<DocsTable
						columns={['Guard', 'Runs', 'Scope']}
						rows={guardRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="guard-results"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Guard Results
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every guard receives a <code>NavigationContext</code>{' '}
						and returns a <code>RouteGuardResult</code>. Both types
						are exported from{' '}
						<code>@absolutejs/absolute/svelte/router</code>.
					</p>
					<PrismPlus
						codeString={svelteRouterGuardTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Result', 'Effect']}
						rows={resultRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						When you cancel back or forward, the router puts the
						previous URL back. A redirect from back, forward or the
						first render always replaces the history entry.{' '}
						<code>goto()</code> resolves to what happened.
					</p>
					<PrismPlus
						codeString={svelteRouterGotoOutcome}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Changing only the <code>#hash</code> runs no guards, and
						neither does shallow routing with <code>pushState</code>{' '}
						or <code>replaceState</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-redirects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server Redirects
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When the handler gets <code>request</code>, each{' '}
						<code>Router</code> runs its <code>Router</code> and{' '}
						<code>Route</code> guards against the request URL during
						the server render. The context has{' '}
						<code>type: &apos;enter&apos;</code>,{' '}
						<code>from: null</code> and <code>request</code> set, so
						a guard can read cookies and headers. The result becomes
						a real response.
					</p>
					<DocsTable
						columns={['Guard result', 'Status', 'Response']}
						rows={serverRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Keep guard logic the same on both sides for the same
						input. The server HTML is what hydrates, and the guard
						runs again on the next navigation. In hash mode the
						server never sees the hash, so the router also runs the
						guards once in the browser on the first render.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="lazy-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Lazy Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Give a <code>Route</code> a <code>loader</code> instead
						of a <code>content</code> snippet. The build puts the
						component in its own chunk. The browser loads it the
						first time the route is visited or a <code>Link</code>{' '}
						to it is prefetched.
					</p>
					<PrismPlus
						codeString={svelteRouterLazyRoute}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The component receives the route params as props, plus
						anything in <code>props</code>. The <code>props</code>{' '}
						value is type-checked against the component&apos;s props
						minus the route params. <code>pending</code> shows while
						a client-side navigation waits for the chunk.{' '}
						<code>error</code> gets the reason and a{' '}
						<code>retry</code> function. With no <code>error</code>{' '}
						snippet, a failed load is thrown again.
					</p>
					<PrismPlus
						codeString={svelteRouterLazyComponent}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On the server the page handler waits for the loader and
						renders the real component, so the HTML is complete. The
						browser loads that chunk before it hydrates, so the page
						shows no pending state and hydration matches. To warm a
						chunk yourself, call <code>preloadRoute</code>.
					</p>
					<PrismPlus
						codeString={svelteRouterPreload}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scroll-restoration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scroll Restoration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						While a <code>Router</code> is mounted it manages the
						window&apos;s scroll position. It sets{' '}
						<code>history.scrollRestoration</code> to{' '}
						<code>&apos;manual&apos;</code> on mount and puts the
						old value back on unmount.
					</p>
					<DocsTable
						columns={['Navigation', 'Scroll position']}
						rows={scrollRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={svelteRouterScroll}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						In hash mode the hash holds the route, so navigations
						scroll to the top and back and forward restore the saved
						position. The router tracks the window only, not inner
						scroll containers.
					</p>
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
