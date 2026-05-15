import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularAppProviders,
	angularBuild,
	angularClientScripts,
	angularComponent,
	angularDeterministicEnv,
	angularHandler,
	angularHydration,
	angularHttpTransferCache,
	angularMultiFramework,
	angularPageWithRoutes,
	angularProviderModel,
	angularResolverPendingTask,
	angularSimplePage,
	angularUsePageContext,
	angularUseResource,
	angularUseSubscription,
	angularUseTimers,
	angularViewTransitions,
	angularZonelessTriggers
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
	{ href: '#zoneless', label: 'Zoneless Change Detection' },
	{ href: '#composables', label: 'Composables' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#provider-model', label: 'Provider Model' },
	{ href: '#routing', label: 'Routing' },
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
						<code>absolute.config.ts</code>. The optional{' '}
						<code>angular.providers</code> field declares the global
						DI provider array every Angular page on this server
						receives at SSR and client bootstrap &mdash; the place
						for cross-cutting concerns like{' '}
						<code>provideHttpClient</code>, error handlers,
						interceptors, and locale providers:
					</p>
					<PrismPlus
						codeString={angularBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Write the providers as a real typed value (not a
						string path). TypeScript catches a missing import or
						renamed binding at compile time, and the framework
						AST-parses <code>absolute.config.ts</code> at build
						time to find the import path of the binding referenced
						here, then bakes a matching import into every per-page
						generated providers file. Per-page additions like{' '}
						<code>provideRouter(routes)</code> and{' '}
						<code>APP_BASE_HREF</code> are auto-wired by the build
						from page-level signals &mdash; you never write either
						yourself. See <a href="#provider-model">Provider Model</a>{' '}
						and <a href="#routing">Routing</a> for the full
						auto-wire pipeline.
					</p>
					<PrismPlus
						codeString={angularAppProviders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="zoneless"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Zoneless Change Detection
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS bootstraps every Angular page with{' '}
						<code>provideZonelessChangeDetection()</code>. There is
						no opt-out: <code>zone.js</code> is never loaded into
						the client bundle, never patches the browser&apos;s
						async primitives, and never auto-ticks change
						detection. This produces smaller bundles and aligns
						with Angular&apos;s long-term direction, but it changes
						what triggers a re-render.
					</p>
					<p style={paragraphSpacedStyle}>
						In a zoneless app, change detection runs only in
						response to <strong style={strongStyle}>explicit</strong>{' '}
						triggers. Mutating a plain class property inside an{' '}
						<code>await</code>, <code>setTimeout</code>,{' '}
						RxJS <code>.subscribe</code> callback, or other async
						source updates the value but does <em>not</em> tell
						Angular to re-evaluate the template. The most reliable
						way to make state reactive is to store it in a{' '}
						<code>signal()</code>:
					</p>
					<PrismPlus
						codeString={angularZonelessTriggers}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Two-way <code>[(ngModel)]</code> bindings and template
						event handlers like <code>(click)</code> are handled
						for you &mdash; Angular installs its own listener
						wrappers that tick CD when those fire. The
						gotcha-prone surfaces are{' '}
						<code>await</code>/<code>then</code>, raw{' '}
						<code>setTimeout</code>, and observables you subscribe
						to manually. The composables in the next section cover
						those.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="composables"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Composables
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS ships a small set of zoneless-safe
						composables from{' '}
						<code>@absolutejs/absolute/angular</code>. They cover
						the three patterns that most often leak state or fail
						to re-render in a zoneless app: timers, async data
						fetching, and Observable subscriptions. Each must be
						called inside an Angular injection context (component
						constructor, field initializer, or{' '}
						<code>runInInjectionContext</code>).
					</p>
					<p style={paragraphSpacedStyle}>
						<code>usePageContext&lt;T&gt;()</code> &mdash;
						typed accessor for the per-request payload the
						backend handler passed via{' '}
						<code>requestContext</code>. AbsoluteJS hydrates
						the value into Angular&apos;s standard{' '}
						<code>REQUEST_CONTEXT</code> token on both SSR and
						client bootstrap, so the object{' '}
						<code>usePageContext()</code> returns is identical
						across phases. The page declares its own{' '}
						<code>Context</code> type near the component and
						passes it as the generic argument; the same type
						parameterises{' '}
						<code>
							handleAngularPageRequest&lt;Context&gt;()
						</code>{' '}
						in the backend, so the contract is enforced at the
						call site and there is no per-page cast.
					</p>
					<PrismPlus
						codeString={angularUsePageContext}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>useTimers()</code> &mdash; component-scoped{' '}
						<code>setTimeout</code> / <code>setInterval</code> with
						automatic cleanup on destroy. Use it instead of raw{' '}
						<code>setTimeout</code> so timers never outlive the
						component that scheduled them, and pair it with
						signals if the callback drives the template.
					</p>
					<PrismPlus
						codeString={angularUseTimers}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>useResource()</code> &mdash; signal-backed async
						fetcher. Returns <code>data</code>, <code>error</code>,
						and <code>loading</code> signals plus{' '}
						<code>refresh()</code> and <code>mutate()</code>{' '}
						methods. The fetcher receives an{' '}
						<code>AbortSignal</code> that fires on destroy or on a
						subsequent refresh, so in-flight requests are cancelled
						deterministically. Reading the returned signals in a
						template is enough to drive re-renders. Use{' '}
						<code>mutate(value)</code> after an edit action returns
						the new entity, so you can update the displayed value
						without a wasteful re-fetch.
					</p>
					<PrismPlus
						codeString={angularUseResource}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If the fetcher depends on state that&apos;s set{' '}
						<em>after</em> field initializers run &mdash; a typical
						example is <code>this.id</code> assigned by the page
						factory from a <code>:id</code> route param &mdash; pass{' '}
						<code>{`{ start: 'pending' }`}</code> and call{' '}
						<code>refresh()</code> from <code>ngOnInit</code>. That
						keeps <code>loading()</code> <code>true</code> on first
						paint so the template renders the spinner branch
						immediately, with no blank-frame flash between mount
						and the first fetch. The other values are{' '}
						<code>{`'immediate'`}</code> (the default &mdash; fire
						the fetcher at construction) and <code>{`'idle'`}</code>{' '}
						(dormant until <code>refresh()</code> or{' '}
						<code>mutate()</code> is called explicitly).
					</p>
					<p style={paragraphSpacedStyle}>
						<strong style={strongStyle}>
							When to reach for TanStack Query instead.
						</strong>{' '}
						<code>useResource</code> is intentionally minimal: each
						instance owns its own copy of the data. Two components
						that fetch the same entity will fire two requests, and
						an edit in one place won&apos;t propagate to another
						unless you wire it through manually. If you need a
						shared cache, request deduplication, automatic refetch
						on focus or reconnect, query invalidation by key,
						optimistic updates with rollback, or paginated/infinite
						queries, install{' '}
						<code>@tanstack/angular-query</code> alongside this
						composable. Use <code>useResource</code> for one-off
						fetches and trivial admin screens; reach for TanStack
						Query when the data layer is shared across pages or
						needs cache semantics.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>useSubscription()</code> &mdash; wraps{' '}
						<code>observable.subscribe(...)</code> with{' '}
						<code>takeUntilDestroyed()</code> so you can&apos;t
						forget the cleanup operator. The most common source of
						Angular memory leaks collapses into a single call. The
						observer body still needs signals (or an explicit{' '}
						<code>cdr.markForCheck()</code>) if it mutates state
						that drives the template &mdash; subscription teardown
						is the only thing this composable handles.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>inject(DestroyRef)</code> is only legal in an
						Angular injection context (constructor, field
						initializer,{' '}
						<code>runInInjectionContext</code>), so a call from{' '}
						<code>ngOnInit</code> or any other lifecycle hook
						can&apos;t automatically capture the host&apos;s{' '}
						<code>DestroyRef</code>. When that happens{' '}
						<code>useSubscription</code> falls back to a plain
						subscription (the caller owns teardown) and logs a
						one-time warning. The cleanest fix is to capture{' '}
						<code>DestroyRef</code> once in a field initializer
						and pass it through:
					</p>
					<PrismPlus
						codeString={angularUseSubscription}
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
						Angular pages in AbsoluteJS are plain standalone
						components. A page module&apos;s{' '}
						<code>default export</code> is the page root; nothing
						else is required. There is no{' '}
						<code>defineAngularPage</code> wrapper, no exported{' '}
						<code>providers</code> array, and no per-prop{' '}
						<code>InjectionToken</code> ceremony.
					</p>
					<p style={paragraphSpacedStyle}>
						Per-request data passed from the backend handler&apos;s{' '}
						<code>requestContext</code> argument is read with the{' '}
						<code>usePageContext&lt;T&gt;()</code> composable. The
						page declares its own <code>Context</code> type next to
						the component and passes it as the generic; the same
						type parameterises{' '}
						<code>
							handleAngularPageRequest&lt;Context&gt;()
						</code>{' '}
						on the backend, so the contract is enforced at the call
						site:
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
						hydration, request tokens, sanitization, zoneless
						change detection, transfer cache, and server-safe
						animation handling. Application providers come from
						one place &mdash; the{' '}
						<code>angular.providers</code> array in{' '}
						<code>absolute.config.ts</code>. Page modules do{' '}
						<strong style={strongStyle}>not</strong> export a{' '}
						<code>providers</code> array of their own.
					</p>
					<p style={paragraphSpacedStyle}>
						The build runs an AST scan before any framework
						compile: it walks the project from your server
						entrypoint, finds every{' '}
						<code>handleAngularPageRequest({'{...}'})</code>{' '}
						call, then injects the providers declaration
						directly into each page&apos;s compiled server
						output:
					</p>
					<p style={paragraphSpacedStyle}>
						<code>
							export const providers = [...appProviders,
							provideRouter(routes, withComponentInputBinding(),
							withViewTransitions()),{' '}
							{`{ provide: APP_BASE_HREF, useValue: "/admin/" }`}
							];
						</code>
					</p>
					<p style={paragraphSpacedStyle}>
						The <code>appProviders</code> import resolves to the
						path the build extracted from{' '}
						<code>absolute.config.ts</code>;{' '}
						<code>provideRouter(routes, ...)</code> is appended
						only when the page exports a{' '}
						<code>routes</code> array (see{' '}
						<a href="#routing">Routing</a>), and the{' '}
						<code>APP_BASE_HREF</code> entry is included only
						when the Elysia mount is a sub-router pattern (
						<code>.get(&apos;/admin/*&apos;, ...)</code> &rarr;{' '}
						<code>&apos;/admin/&apos;</code>). Because the
						declaration lives in the page module itself, the
						page&apos;s server bundle and the client wrapper
						both read the same <code>providers</code> export off
						the same module &mdash; one{' '}
						<code>@angular/core</code> instance, no runtime
						providers indirection.
					</p>
					<p style={paragraphSpacedStyle}>
						For request-specific data, inject{' '}
						<code>REQUEST</code>, <code>REQUEST_CONTEXT</code>, or{' '}
						<code>RESPONSE_INIT</code> from your service or
						resolver, or read the typed payload with{' '}
						<code>usePageContext&lt;T&gt;()</code>. Angular
						route-level <code>providers</code> inside{' '}
						<code>provideRouter</code> route definitions continue
						to work normally for token values that should be
						scoped to one matched route subtree.
					</p>
					<p style={paragraphSpacedStyle}>
						Lazy routes using <code>loadComponent</code> also work
						during SSR, including imports from installed packages.
						The package must be importable from the server runtime
						environment; if a package is only available to the
						browser bundle, SSR cannot resolve that route
						component.
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
						id="routing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Routing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS is a multi-page application: each Angular
						page bootstraps its own application root. A page that
						wants client-side sub-routes declares them with a
						top-level <code>export const routes: Routes</code>{' '}
						&mdash; the same export name and shape that Angular
						itself uses in <code>app.routes.ts</code>. The build
						scans every file under your{' '}
						<code>angularDirectory</code> for this export and, when
						found, auto-wires{' '}
						<code>
							provideRouter(routes, withComponentInputBinding(),
							withViewTransitions())
						</code>{' '}
						into that page&apos;s generated providers file.
					</p>
					<PrismPlus
						codeString={angularPageWithRoutes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>APP_BASE_HREF</code> is auto-inferred. The build
						also emits a small route-mounts map alongside the
						providers files: one entry per Elysia mount that hosts
						an Angular page. The SSR handler matches the incoming
						request URL against that map at runtime to set
						<code>APP_BASE_HREF</code> for the current request,
						and the client bundle imports the per-page providers
						file with the base path baked in. You never write{' '}
						<code>{`{ provide: APP_BASE_HREF, useValue: '/portal/' }`}</code>{' '}
						by hand &mdash; that detail tracks the mount path
						automatically, so renaming a mount in the Elysia
						chain does not also require touching the Angular page.
					</p>
					<p style={paragraphSpacedStyle}>
						Pages without sub-routes need nothing extra. Omit the{' '}
						<code>routes</code> export and the build skips{' '}
						<code>provideRouter</code> for that page &mdash; the
						generated providers file is just{' '}
						<code>[...appProviders]</code> plus the inferred base
						path:
					</p>
					<PrismPlus
						codeString={angularSimplePage}
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
