import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularRedirectBridge,
	angularSpaHandler,
	angularSpaPage,
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
	{ href: '#page-component', label: 'Page Component' },
	{ href: '#redirects', label: 'Redirects' }
];

const PrimitivesList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>provideRouter(routes)</strong>: from{' '}
			<code>@angular/router</code>. Returns a provider that the AbsoluteJS
			handler installs at bootstrap. Export it as <code>providers</code>{' '}
			from your page module.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>RouterOutlet</strong>: standalone
			directive that renders the active route's component. Place{' '}
			<code>{'<router-outlet />'}</code> anywhere in the page template.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>RouterLink / RouterLinkActive</strong>:
			navigation directives. <code>routerLinkActive</code> applies a class
			when its route matches; combine with{' '}
			<code>{'[routerLinkActiveOptions]="{ exact: true }"'}</code> for
			exact-match links.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Router (injected)</strong>: programmatic
			navigation. <code>inject(Router)</code> at field-initializer time
			gives you the router instance — <code>router.navigate(['/x'])</code>
			, <code>router.events.subscribe(...)</code>, <code>router.url</code>
			, etc.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Routes</strong>: type for the array of{' '}
			<code>{'{ path, component, canActivate?, data? }'}</code> entries
			passed to <code>provideRouter</code>.
		</li>
	</ul>
);

const PageExportsList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>default export</strong>: your root
			component (the standalone Component class with{' '}
			<code>{'<router-outlet />'}</code>).
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>providers</strong>: an array including{' '}
			<code>provideRouter(routes)</code>. The Angular handler installs
			these when bootstrapping the app.
		</li>
	</ul>
);

const RedirectMechanicsList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			A guard returning a <code>UrlTree</code> (via{' '}
			<code>router.parseUrl(...)</code>), or a route with a{' '}
			<code>redirectTo</code> property, triggers an Angular Router
			redirect.
		</li>
		<li style={listItemStyle}>
			Internally Angular emits a <code>NavigationCancel</code> event with
			code <code>Redirect</code>, immediately followed by a{' '}
			<code>NavigationStart</code> for the redirect target.
		</li>
		<li style={listItemStyle}>
			AbsoluteJS subscribes to <code>router.events</code> via an{' '}
			<code>ENVIRONMENT_INITIALIZER</code> and watches for that pair. When
			detected, it sets <code>responseInit.status = 302</code> and{' '}
			<code>Location</code> on the outbound response.
		</li>
		<li style={listItemStyle}>
			The handler returns the redirect response instead of rendering HTML
			for the redirected route.
		</li>
	</ul>
);

export const AngularSpaView = ({
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
					<h1 id="angular-spa" style={h1Style(isMobileOrTablet)}>
						Angular SPA
					</h1>
					<p style={paragraphLargeStyle}>
						Drive client-side sub-route navigation inside an Angular
						page using <code>@angular/router</code>. AbsoluteJS
						forwards the request URL into{' '}
						<code>renderApplication</code> so the router resolves
						the correct initial route during SSR — and translates
						any router-issued redirect into an HTTP 302
						automatically.
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
						Angular's standalone-component model and{' '}
						<code>provideRouter</code> API make SPA setup minimal:
						export the routes, export{' '}
						<code>providers = [provideRouter(routes)]</code>, place{' '}
						<code>{'<router-outlet />'}</code> in the template, and
						the AbsoluteJS adapter handles the rest. There's no
						server-vs-client router-class swap (Angular Router uses
						the same class on both sides; the adapter selects the
						right location strategy under the hood).
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
						The Angular handler forwards <code>request.url</code>{' '}
						into <code>renderApplication</code> and installs the
						redirect bridge into the bootstrap providers — no other
						user wiring needed:
					</p>
					<PrismPlus
						codeString={angularSpaHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
						The page module exports its root component as the
						default export, plus a <code>providers</code> array
						containing <code>provideRouter(routes)</code>:
					</p>
					<PrismPlus
						codeString={angularSpaPage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PageExportsList />
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<strong style={strongStyle}>Primitives:</strong>
					</p>
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
						The redirect bridge is wired automatically — no opt-in
						required. Angular Router redirects (from guards
						returning a <code>UrlTree</code>, or from{' '}
						<code>redirectTo</code> on a route) become HTTP 302s
						during SSR:
					</p>
					<PrismPlus
						codeString={angularRedirectBridge}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<RedirectMechanicsList />
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
