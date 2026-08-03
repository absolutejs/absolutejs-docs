import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { StepFlow } from '../../utils/StepFlow';
import {
	angularRedirectBridge,
	angularSpaHandler,
	angularSpaPage,
	wildcardRoutePattern
} from '../../../data/documentation/spaDocsCode';
import {
	h1Style,
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

type SpaListProps = {
	themeSprings: ThemeSprings;
};

const PrimitivesList = ({ themeSprings }: SpaListProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						from <code>@angular/router</code>. Returns a provider
						that the AbsoluteJS handler installs at bootstrap.
						Export it as <code>providers</code> from your page
						module.
					</>
				),
				term: 'provideRouter(routes)'
			},
			{
				description: (
					<>
						standalone directive that renders the active route's
						component. Place <code>{'<router-outlet />'}</code>{' '}
						anywhere in the page template.
					</>
				),
				term: 'RouterOutlet'
			},
			{
				description: (
					<>
						navigation directives. <code>routerLinkActive</code>{' '}
						applies a class when its route matches; combine with{' '}
						<code>
							{'[routerLinkActiveOptions]="{ exact: true }"'}
						</code>{' '}
						for exact-match links.
					</>
				),
				term: 'RouterLink / RouterLinkActive'
			},
			{
				description: (
					<>
						programmatic navigation. <code>inject(Router)</code> at
						field-initializer time gives you the router instance —{' '}
						<code>router.navigate(['/x'])</code>,{' '}
						<code>router.events.subscribe(...)</code>,{' '}
						<code>router.url</code>, etc.
					</>
				),
				term: 'Router (injected)'
			},
			{
				description: (
					<>
						type for the array of{' '}
						<code>
							{'{ path, component, canActivate?, data? }'}
						</code>{' '}
						entries passed to <code>provideRouter</code>.
					</>
				),
				term: 'Routes'
			}
		]}
		themeSprings={themeSprings}
	/>
);

const PageExportsList = ({ themeSprings }: SpaListProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						your root component (the standalone Component class with{' '}
						<code>{'<router-outlet />'}</code>).
					</>
				),
				term: 'default export'
			},
			{
				description: (
					<>
						an array including <code>provideRouter(routes)</code>.
						The Angular handler installs these when bootstrapping
						the app.
					</>
				),
				term: 'providers'
			}
		]}
		themeSprings={themeSprings}
	/>
);

const RedirectMechanicsList = ({ themeSprings }: SpaListProps) => (
	<StepFlow
		steps={[
			{
				description: 'triggers an Angular Router redirect.',
				title: 'A guard returning a UrlTree (via router.parseUrl(...)), or a route with a redirectTo property'
			},
			{
				description: (
					<>
						immediately followed by a <code>NavigationStart</code>{' '}
						for the redirect target.
					</>
				),
				title: 'Internally Angular emits a NavigationCancel event with code Redirect'
			},
			{
				description: (
					<>
						When detected, it sets{' '}
						<code>responseInit.status = 302</code> and{' '}
						<code>Location</code> on the outbound response.
					</>
				),
				title: 'AbsoluteJS subscribes to router.events via an ENVIRONMENT_INITIALIZER and watches for that pair.'
			},
			{
				title: 'The handler returns the redirect response instead of rendering HTML for the redirected route.'
			}
		]}
		themeSprings={themeSprings}
	/>
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
					<PageExportsList themeSprings={themeSprings} />
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<strong style={strongStyle}>Primitives:</strong>
					</p>
					<PrimitivesList themeSprings={themeSprings} />
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
					<RedirectMechanicsList themeSprings={themeSprings} />
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
