import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	vueRedirectHelper,
	vueSetupAppHook,
	vueSpaHandler,
	vueSpaPage,
	wildcardRoutePattern
} from '../../../data/documentation/spaDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#wildcard-route', label: 'Wildcard Route' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#setup-app', label: 'setupApp Hook' },
	{ href: '#page-component', label: 'Page Component' },
	{ href: '#redirects', label: 'Redirects' }
];

const PrimitivesList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>createRouter</strong>: from{' '}
			<code>vue-router</code>. Pair with{' '}
			<code>createMemoryHistory()</code> on the server and{' '}
			<code>createWebHistory()</code> on the client.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>RouterLink / RouterView</strong>:
			vue-router's components for navigation and the active-route outlet.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>useRouter / useRoute</strong>:
			composables for accessing the router instance and the current
			route's reactive state.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>setupApp</strong>: AbsoluteJS-specific
			hook your page module exports. The handler invokes it between{' '}
			<code>createSSRApp()</code> and <code>renderToWebStream()</code> —
			the only window where vue-router can be installed and resolved
			before SSR starts.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>applyVueRouterRedirect</strong>:
			AbsoluteJS helper that translates a vue-router redirect (from a
			guard or redirect rule) into a 302 response.
		</li>
	</ul>
);

const SetupAppContextList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>url</strong>: request pathname (plus
			search) on the server, current window URL on the client.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>isServer</strong>: <code>true</code>{' '}
			during SSR, <code>false</code> during client hydration. Use it to
			pick <code>createMemoryHistory()</code> vs{' '}
			<code>createWebHistory()</code>, and to gate{' '}
			<code>router.push(url)</code> + the redirect bridge to server-only.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>setRedirect(location, status?)</strong>:
			server-only. Call to short-circuit the SSR render and emit an HTTP
			redirect instead. Status defaults to <code>302</code>.
		</li>
	</ul>
);

const RedirectFlowList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			After <code>await router.isReady()</code>, vue-router's{' '}
			<code>currentRoute.value.fullPath</code> reflects every guard,
			redirect rule, and <code>{"next('/foo')"}</code> call.
		</li>
		<li style={listItemStyle}>
			If the resolved path differs from the requested URL, a redirect
			happened. <code>applyVueRouterRedirect</code> compares them and
			calls <code>setRedirect</code> if different.
		</li>
		<li style={listItemStyle}>
			The page handler sees <code>setRedirect</code> was called and
			returns a 302 response with the redirect target as the{' '}
			<code>Location</code> header — no HTML rendered for the redirected
			route.
		</li>
		<li style={listItemStyle}>
			Pass a custom status (e.g. <code>308</code>) for permanent
			redirects.
		</li>
	</ul>
);

export const VueSpaView = ({
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
					<h1 id="vue-spa" style={h1Style(isMobileOrTablet)}>
						Vue SPA
					</h1>
					<p style={paragraphLargeStyle}>
						Drive client-side sub-route navigation inside a Vue page
						using <code>vue-router</code>. Vue's SSR pipeline
						requires the router to be installed and resolved before{' '}
						<code>renderToWebStream()</code> runs — AbsoluteJS
						exposes a <code>setupApp</code> hook that opens that
						lifecycle window for you.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						vue-router's SSR contract is strict:{' '}
						<code>
							app.use(router); router.push(url); await
							router.isReady();
						</code>{' '}
						all have to run between <code>createSSRApp()</code> and{' '}
						<code>renderToWebStream()</code>. AbsoluteJS pages
						export a <code>setupApp</code> function that the handler
						invokes at exactly that point — that's the entire
						contract for wiring vue-router into AbsoluteJS SSR.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wildcard-route"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wildcard Route
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Refresh on any sub-route hits the server with the actual
						URL. Register a wildcard pattern so the same handler
						responds for every URL the page's router knows about:
					</p>
					<PrismPlus
						codeString={wildcardRoutePattern}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass <code>request</code> through to the page handler.
						The Vue handler doesn't merge it into props (vue-router
						needs the URL via <code>router.push()</code>, not via
						component props) — instead it forwards the URL into the
						page module's <code>setupApp</code> context:
					</p>
					<PrismPlus
						codeString={vueSpaHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="setup-app"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						setupApp Hook
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Export a <code>setupApp</code> function from your page
						module. The Vue page handler invokes it after creating
						the Vue app and before rendering — pass the app to{' '}
						<code>app.use(router)</code> here:
					</p>
					<PrismPlus
						codeString={vueSetupAppHook}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<SetupAppContextList />
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<strong style={strongStyle}>Important:</strong>{' '}
						<code>await router.isReady()</code> on <em>both</em>{' '}
						server and client. Awaiting only on the server causes a
						hydration mismatch — the active-link class on{' '}
						<code>{'<RouterLink>'}</code> flickers on the first
						render before the client router resolves.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-component"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The page is a Vue SFC. Define routes alongside the
						template; install the router via the exported{' '}
						<code>setupApp</code>:
					</p>
					<PrismPlus
						codeString={vueSpaPage}
						language="markup"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrimitivesList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redirects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redirects
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						vue-router supports redirects via{' '}
						<code>beforeEach</code> guards (return a string or
						route-object), <code>redirect</code> rules on a route,
						and manual <code>router.push()</code> from inside a
						guard. To turn any of these into an HTTP 302 during SSR,
						call the AbsoluteJS-shipped helper:
					</p>
					<PrismPlus
						codeString={vueRedirectHelper}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<RedirectFlowList />
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
