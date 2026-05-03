import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularBuild,
	angularClientScripts,
	angularComponent,
	angularDeterministicEnv,
	angularHandler,
	angularHydration,
	angularHttpTransferCache,
	angularMultiFramework,
	angularProviderModel,
	angularResolverPendingTask,
	angularViewTransitions
} from '../../../data/documentation/angularDocsCode';
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
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#provider-model', label: 'Provider Model' },
	{ href: '#components', label: 'Components' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#http-transfer-cache', label: 'HTTP Transfer Cache' },
	{ href: '#async-resolvers', label: 'Async Resolvers' },
	{ href: '#deterministic-rendering', label: 'Deterministic Rendering' },
	{ href: '#view-transitions', label: 'View Transitions HMR' },
	{ href: '#ssr-animations', label: 'SSR Animations' },
	{ href: '#client-scripts', label: 'Client Scripts' },
	{ href: '#multi-framework', label: 'Multi-Framework' }
];

const AngularMultiFrameworkList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>AOT in Production</strong>: Angular
			Linker plugin removes the compiler from browser bundles
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>JIT in Dev</strong>: Faster rebuilds
			during development with HMR support
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>DOM State Preservation</strong>: Form
			inputs and scroll positions are preserved during HMR
		</li>
	</ul>
);

export const AngularOverviewView = ({
	currentPageId,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	themeSprings,
	tocOpen
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
					<h1 id="angular" style={h1Style(isMobileOrTablet)}>
						Angular
					</h1>
					<p style={paragraphLargeStyle}>
						Build server-rendered Angular applications with full
						type safety, zoneless change detection, and automatic
						hydration.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add Angular to your build by specifying the directory
						containing your Angular components in{' '}
						<code>absolute.config.ts</code>:
					</p>
					<PrismPlus
						codeString={angularBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="async-resolvers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Async Resolvers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular router navigation participates in app stability,
						but custom async work inside a zoneless resolver should
						be registered with Angular&apos;s pending-task tracker.
						Wrap raw promises, timers, SDK calls, and other
						non-HttpClient work with <code>withPendingTask</code> so
						SSR waits before serializing HTML.
					</p>
					<PrismPlus
						codeString={angularResolverPendingTask}
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
						Use <code>handleAngularPageRequest</code> from{' '}
						<code>@absolutejs/absolute/angular</code> to render your
						components. Pass a page importer function, compiled
						paths, an optional head tag, and optional props:
					</p>
					<p style={paragraphSpacedStyle}>
						Framework handlers are non-streaming by default. Add{' '}
						<code>{`{ collectStreamingSlots: true }`}</code> as the
						final argument to enable streaming for
						<code>abs-stream-slot</code> and <code>@defer</code>{' '}
						scenarios.
					</p>
					<PrismPlus
						codeString={angularHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Components
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Angular components in AbsoluteJS use standalone
						components. Each non-trivial page exports a{' '}
						<code>page</code> declaration from{' '}
						<code>defineAngularPage</code> so the page handler knows
						the render root and the route prop type.
					</p>
					<p style={paragraphSpacedStyle}>
						Props passed from your server are provided through
						Angular DI. Export an <code>InjectionToken</code> whose
						name matches the prop key in screaming snake case, then
						read it with <code>inject()</code> inside the component:
					</p>
					<PrismPlus
						codeString={angularComponent}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="provider-model"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Provider Model
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS owns the framework providers needed for SSR,
						hydration, request tokens, sanitization, zoneless change
						detection, transfer cache, and server-safe animation
						handling. Application providers belong in the Angular
						page module&apos;s exported <code>providers</code>{' '}
						array.
					</p>
					<p style={paragraphSpacedStyle}>
						Put <code>provideHttpClient</code>,{' '}
						<code>provideRouter</code>, app services, interceptors,
						locale providers, and other app DI there. The page
						module providers are used for both server rendering and
						browser hydration. For request-specific data, inject{' '}
						<code>REQUEST</code>, <code>REQUEST_CONTEXT</code>, or{' '}
						<code>RESPONSE_INIT</code> from your service or resolver
						instead of passing providers to the handler.
					</p>
					<p style={paragraphSpacedStyle}>
						Angular route-level <code>providers</code> inside{' '}
						<code>provideRouter</code> route definitions continue to
						work normally. Use them for services or token values
						that should be scoped to one matched route subtree.
					</p>
					<p style={paragraphSpacedStyle}>
						Lazy routes using <code>loadComponent</code> also work
						during SSR, including imports from installed packages.
						The package must be importable from the server runtime
						environment; if a package is only available to the
						browser bundle, SSR cannot resolve that route component.
					</p>
					<p style={paragraphSpacedStyle}>
						If an Angular route guard redirects during SSR by
						returning a <code>UrlTree</code> or redirect command,
						AbsoluteJS converts that router redirect into an HTTP
						<code>302</code> response with a <code>Location</code>{' '}
						header.
					</p>
					<PrismPlus
						codeString={angularProviderModel}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hydration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hydration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically handles Angular SSR and
						hydration. AOT compilation is used for production
						builds, while JIT compilation enables fast HMR during
						development:
					</p>
					<PrismPlus
						codeString={angularHydration}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="http-transfer-cache"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTTP Transfer Cache
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular&apos;s recommended SSR path is to use
						<code>provideClientHydration</code>, which includes
						Angular&apos;s built-in HttpClient transfer cache.
						AbsoluteJS keeps that cache enabled during server
						rendering and hydration. By default, Angular caches safe
						HttpClient reads and avoids requests with authorization
						headers.
					</p>
					<p style={paragraphSpacedStyle}>
						Use HttpClient for SSR data reads that should transfer
						to the browser without a duplicate request. Add{' '}
						<code>x-skip-transfer-cache</code> to individual
						requests that must always refetch during hydration.
					</p>
					<PrismPlus
						codeString={angularHttpTransferCache}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="view-transitions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						View Transitions HMR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						CSS-only changes are hot-swapped instantly without
						touching the app. For template and logic changes,
						AbsoluteJS uses the browser&apos;s native View
						Transitions API. Instead of the page going blank while
						the app re-bootstraps with the new module, the browser
						holds a screenshot and crossfades to the new content
						once it&apos;s ready:
					</p>
					<PrismPlus
						codeString={angularViewTransitions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="deterministic-rendering"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Deterministic Rendering
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular SSR and hydration must render the same initial
						values on the server and in the browser. Avoid direct{' '}
						<code>Math.random()</code>, <code>Date.now()</code>,{' '}
						<code>new Date()</code>,{' '}
						<code>crypto.randomUUID()</code>, and{' '}
						<code>performance.now()</code> calls in component field
						initializers and templates.
					</p>
					<p style={paragraphSpacedStyle}>
						Use <code>provideDeterministicEnv</code> for visual
						variation that must be identical through hydration. The{' '}
						<code>absolute/no-nondeterministic-render</code> ESLint
						rule catches the common render-time footguns in Angular
						component fields and inline templates.
					</p>
					<PrismPlus
						codeString={angularDeterministicEnv}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ssr-animations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SSR Animations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular&apos;s current recommendation is to use{' '}
						<code>animate.enter</code> and{' '}
						<code>animate.leave</code> for new animation work. These
						APIs are CSS-class based and fit naturally with SSR.
					</p>
					<p style={paragraphSpacedStyle}>
						For existing apps that still use legacy{' '}
						<code>@angular/animations</code> triggers, AbsoluteJS
						detects those imports and provides Angular&apos;s noop
						animation driver during server rendering. The server
						output renders the final state instead of trying to run
						browser animation APIs. After hydration, your client
						animation providers continue to control browser
						animations.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-scripts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Scripts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For adding dynamic client-side behavior after hydration,
						use the <code>registerClientScript</code> utility:
					</p>
					<PrismPlus
						codeString={angularClientScripts}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-framework"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular works alongside other frameworks in the same
						AbsoluteJS application. Each route can use a different
						framework:
					</p>
					<PrismPlus
						codeString={angularMultiFramework}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<AngularMultiFrameworkList />
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
