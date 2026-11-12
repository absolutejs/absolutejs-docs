/* eslint-disable absolute/max-jsxnesting -- long-form editorial markup keeps its semantic document hierarchy */
import { useState, type ReactNode } from 'react';
import type { ArticleContentProps } from '../postRegistry';
import { CodeSample } from './CodeSample';
import { FrameworkReel } from './FrameworkReel';
import { ManifestPlayground } from './ManifestPlayground';
import { ReplacedSentence } from './ReplacedSentence';
import { SaveStoryboard } from './SaveStoryboard';
import { SectionRail } from './SectionRail';
import { articleSections } from './sections';
import { SideNote } from './SideNote';
import { TypecheckScale } from './TypecheckScale';

const COPY_FEEDBACK_DURATION_MS = 1600;
const CREATE_COMMAND = 'bun create absolutejs';

const formatPostDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(new Date(value));

const serverCode = `import { Elysia } from 'elysia';
import { asset, handleHTMXPageRequest, networking, prepare } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { Home } from '../frontend/react/pages/Home';
import type Pricing from '../frontend/svelte/pages/Pricing.svelte';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
	.use(absolutejs)
	.get('/', () =>
		handleReactPageRequest({
			Page: Home,
			index: asset(manifest, 'HomeIndex'),
			props: { cssPath: asset(manifest, 'HomeCSS') }
		})
	)
	.get('/pricing', () =>
		handleSveltePageRequest<typeof Pricing>({
			indexPath: asset(manifest, 'PricingIndex'),
			pagePath: asset(manifest, 'Pricing'),
			props: { cssPath: asset(manifest, 'PricingCSS') }
		})
	)
	.get('/status', () => handleHTMXPageRequest(asset(manifest, 'Status')))
	.use(networking);`;

const registryCode = `import { defineIslandRegistry } from '@absolutejs/absolute/islands';
import FieldTimer from '../frontend/svelte/components/FieldTimer.svelte';
import { PriceChart } from '../frontend/react/components/PriceChart';

export const islandRegistry = defineIslandRegistry({
	react: { PriceChart },
	svelte: { FieldTimer }
});`;

const islandHtml = `<absolute-island
	framework="react"
	component="PriceChart"
	hydrate="idle"
	props='{"symbol":"BTC"}'
></absolute-island>`;

const apiCode = `export const api = new Elysia({ name: 'api', prefix: '/api' })
	.get('/projects', () => db.projects.list())
	.post('/projects', ({ body }) => db.projects.create(body), {
		body: t.Object({ name: t.String({ minLength: 1 }) })
	});

export type Api = typeof api;`;

const edenCode = `import { treaty } from '@elysia/eden';
import type { Api } from '../../backend/api';

export const server = treaty<Api>(location.origin);

const { data, error } = await server.api.projects.post({ name: 'Launch' });`;

type DayOneRow = { edge: string; todo: ReactNode };

const dayOneRows: DayOneRow[] = [
	{
		edge: "There's no file-system router",
		todo: 'Routes are explicit Elysia handlers. The server file is your map.'
	},
	{
		edge: 'Manifest keys are PascalCase',
		todo: (
			<>
				<code>asset(manifest, &apos;FooIndex&apos;)</code>. A missing
				key is empty in dev and throws in production.
			</>
		)
	},
	{
		edge: 'Eden revives dates',
		todo: (
			<>
				ISO strings arrive as <code>Date</code>. Normalize them in your
				fetch helpers.
			</>
		)
	},
	{
		edge: 'Keep one copy of Elysia and TypeBox',
		todo: (
			<>
				Run <code>absolute doctor --fix</code>. Prefer one shallow{' '}
				<code>.use([a, b])</code>.
			</>
		)
	},
	{
		edge: 'Server modules re-run on edit',
		todo: (
			<>
				Guard pools and schedulers on <code>globalThis</code>, or clean
				up with <code>onHotDispose</code>.
			</>
		)
	},
	{
		edge: 'Prerendering runs your real server',
		todo: (
			<>
				Wrap queues, billing and email in{' '}
				<code>if (!isPrerendering())</code>.
			</>
		)
	},
	{
		edge: 'The server binds localhost by default',
		todo: (
			<>
				On macOS that meant IPv6 <code>::1</code> only, so{' '}
				<code>127.0.0.1</code> didn&apos;t connect. In containers, set{' '}
				<code>HOST=0.0.0.0</code> (or <code>ABSOLUTE_HOST</code>).
			</>
		)
	},
	{
		edge: 'The README is behind the code',
		todo: (
			<>
				Use these docs and <code>example/server.ts</code> for the
				current API.
			</>
		)
	},
	{
		edge: "It's a fast-moving beta",
		todo: 'New releases every few days. Pin exact versions and read the changelog.'
	}
];

export const ChoosePerRouteContent = ({
	post,
	readingTime
}: ArticleContentProps) => {
	const [copied, setCopied] = useState(false);
	const copyCreateCommand = async () => {
		await navigator.clipboard.writeText(CREATE_COMMAND);
		setCopied(true);
		window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
	};

	return (
		<>
			<section aria-labelledby="page-title" className="cpr-hero">
				<div className="article-meta">
					<div className="author-lockup">
						<div>
							<span className="byline-label">Written by</span>
							<strong>
								<a href={post.author.url}>{post.author.name}</a>
							</strong>
							<span>{post.author.role}</span>
						</div>
					</div>
					<div className="article-meta-actions">
						<span className="article-details">
							Published{' '}
							<time dateTime={post.publishedAt}>
								{formatPostDate(post.publishedAt)}
							</time>
							{' · '}
							{readingTime?.text ?? 'Estimating read'}
						</span>
						<a
							className="source-link"
							href="https://github.com/absolutejs/absolutejs"
							rel="noreferrer"
							target="_blank"
						>
							View source ↗
						</a>
					</div>
				</div>

				<div className="cpr-hero-inner">
					<p
						aria-label="One server, any frontend."
						className="cpr-sentence"
					>
						<span aria-hidden="true">One server,</span>
						<FrameworkReel />
						<span aria-hidden="true">any frontend.</span>
					</p>
					<h1 id="page-title">
						Choose Per Route: What Building With AbsoluteJS Is
						Actually Like
					</h1>
					<p className="cpr-hero-summary">
						I&apos;ve been shipping production apps on AbsoluteJS
						since 2025, and I work on the framework itself. This is
						what the day-to-day is really like, what to expect, and
						what it lets you build that you couldn&apos;t before.
					</p>
				</div>

				<nav aria-label="In this article" className="article-toc">
					<p>In this article</p>
					<ol>
						{articleSections.map((section) => (
							<li key={section.id}>
								<a href={`#${section.id}`}>{section.title}</a>
							</li>
						))}
					</ol>
				</nav>
			</section>

			<SectionRail />
			<article className="cpr-article">
				<section className="cpr-section" id="seams">
					<h2>The seams are where the time goes</h2>
					<div className="cpr-col">
						<p>
							Every web stack I&apos;ve worked in has the same
							shape. There&apos;s a frontend framework, a server,
							something between them that carries data, something
							that builds it all, and something that deploys it.
							Each piece is fine on its own. The time goes at the
							joins.
						</p>
						<p>
							You write a type on the server and write it again on
							the client. You pick React for the app and then find
							out the marketing team wants something lighter for
							the landing pages, and now there are two repos. Your
							dev server restarts and drops your database
							connection, your form state and your place in the
							flow. Your static site generator is a second,
							slightly different copy of your app.
						</p>
						<p>
							AbsoluteJS is a full-stack TypeScript framework on
							Bun and Elysia. You can describe it as a list of
							features, but I think about it as a list of joins it
							removes. The biggest one is that choosing a frontend
							stops being a decision you make once per project and
							live with. You make it per route, and you can change
							your mind.
						</p>
						<p>
							Over the past year I&apos;ve built a production SaaS
							on it, a multi-tenant app builder, and an analytics
							platform that renders the same live data in four
							frameworks at once. I also spend my days in the
							framework&apos;s source. So this post is both the
							view from the inside and the view from someone who
							has to ship on it. Where something is rough,
							I&apos;ll say so.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="routes">
					<h2>A page is just a route</h2>
					<div className="cpr-col">
						<p>
							The first thing people coming from Next or SvelteKit
							look for is the <code>app/</code> or{' '}
							<code>routes/</code> folder. There isn&apos;t one.
							There&apos;s no file-system router.
						</p>
						<SideNote
							docs={[
								{
									href: '/documentation/routing-and-handlers',
									label: 'Routing & Handlers'
								}
							]}
							label="Tested"
						>
							This exact server ran on beta.168 on Nov 12, 2026,
							in <code>absolute dev</code> and in production, with
							all three routes rendering.
						</SideNote>
						<p>
							A page in AbsoluteJS is an Elysia route that returns
							streamed HTML. That&apos;s the whole model.
							Here&apos;s a real server serving a React page, a
							Svelte page and an HTMX page side by side:
						</p>
						<CodeSample
							code={serverCode}
							file="src/backend/server.ts"
							language="ts"
						/>
						<p>
							I was skeptical of this at first. File routing feels
							like a convenience you&apos;d miss. In practice the
							explicit version has paid for itself. The route is
							right there with its auth guard, its params schema
							and its data loading, in the same Elysia chain as
							your API. There&apos;s no second routing system to
							learn, no special file names that change behavior,
							and no question about where middleware runs. When
							someone new joins a project, the server file is the
							map.
						</p>
						<p>
							The other half of the model is the manifest.{' '}
							<code>prepare()</code> builds every framework
							directory you&apos;ve configured and hands back a
							manifest that maps names to hashed files. You put a
							component in <code>&lt;framework&gt;/pages/</code>,
							and the build gives you keys named after it in
							PascalCase: <code>Pricing</code> for the server
							module, <code>PricingIndex</code> for the client
							hydration entry, <code>PricingCSS</code> for its
							stylesheet, and <code>PricingCompiledCSS</code> for
							a Vue component&apos;s own styles. Your handler
							looks them up with <code>asset()</code>.
						</p>
					</div>
					<ManifestPlayground />
					<div className="cpr-col">
						<SideNote
							docs={[
								{
									href: '/documentation/build-and-manifest',
									label: 'Build & Manifest'
								}
							]}
							label="What you'll see"
						>
							In dev a missing key logs{' '}
							<code>[asset] key "X" not found in manifest</code>{' '}
							and carries on. In production the route fails with{' '}
							<code>Asset "X" not found in manifest.</code>
						</SideNote>
						<p>
							Two things about the manifest are worth knowing
							early. In dev, a missing key returns an empty string
							and the page is built on its first request, so you
							can add pages without restarting. In production, a
							missing key throws. That&apos;s deliberate: a typo
							in a key should fail the build, not ship a page with
							no JavaScript.
						</p>
						<SideNote
							docs={[
								{
									href: '/documentation/type-safety',
									label: 'Type Safety'
								}
							]}
							label="Tested"
						>
							A missing Svelte prop fails with TS2741, a wrong
							type with TS2322 and an unknown prop with TS2353.
							Install <code>svelte2tsx</code> as a dev dependency
							for the Svelte check.
						</SideNote>
						<p>
							Props are typed against the page. If{' '}
							<code>Home</code> takes{' '}
							<code className="cpr-nowrap">
								{'{ cssPath: string; user: User }'}
							</code>{' '}
							and you forget <code>user</code>, the route
							doesn&apos;t compile. Svelte pages get the same
							check: <code>absolute typecheck</code> generates
							real types for each Svelte component, so a missing
							prop, a wrong type or an unknown prop in{' '}
							<code>server.ts</code> fails just as it does for
							React. Add one <code>rootDirs</code> line to your
							tsconfig, which the command prints for you, and you
							see the same errors in your editor. Vue pages are
							checked by <code>vue-tsc</code>, and Angular pages
							read a typed request context.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="per-route">
					<h2>Pick the frontend per route, then change your mind</h2>
					<div className="cpr-col">
						<p>
							This is the part that changed how I plan projects.
						</p>
						<p>
							AbsoluteJS server-renders React, Svelte, Vue,
							Angular, plain HTML and HTMX, and each route chooses
							its own. They share one server, one build, one
							deploy and one set of API types. Ember support
							exists but is experimental and not publicly exported
							yet.
						</p>
						<p>
							The clearest example I have is an analytics platform
							I built. One Elysia backend pushes live metrics over
							WebSocket and SSE. Four dashboards render the same
							numbers: one in React 19, one in Vue 3, one in
							Svelte 5, and one in HTMX over server-sent events,
							each on its own route. I built it to compare the
							frameworks fairly, under identical data and
							identical load. Normally that&apos;s four projects.
							Here it was four folders.
						</p>
						<p>
							You probably won&apos;t build the same page four
							times. But the same property shows up in ordinary
							work:
						</p>
						<ul>
							<li>
								The marketing pages are static HTML or HTMX and
								ship almost no JavaScript. The app behind the
								login is React.
							</li>
							<li>
								A team that knows Vue can own one section of the
								product without a separate service.
							</li>
							<li>
								An old Angular screen keeps running on its own
								route while you rebuild the rest, and it still
								shares the session and the API types.
							</li>
						</ul>
						<p>
							Inside a page, you can go further with islands. An
							island is a component from one framework rendered
							inside a page from another, or inside a static HTML
							page, and hydrated on its own schedule. You register
							your islands once:
						</p>
						<CodeSample
							code={registryCode}
							file="src/islands/registry.ts"
							language="ts"
						/>
						<p>
							Then a plain HTML page can hold a React chart that
							hydrates only when the browser is idle. The{' '}
							<code>&lt;island&gt;</code> tag works too:
						</p>
						<CodeSample
							code={islandHtml}
							file="html/pages/Landing.html"
							language="html"
						/>
						<SideNote
							docs={[
								{
									href: '/documentation/islands',
									label: 'Islands'
								}
							]}
							label="Tested"
						>
							In Chromium on beta.168, the <code>load</code> and{' '}
							<code>idle</code> islands responded to clicks, and{' '}
							<code>hydrate="none"</code> stayed static.
						</SideNote>
						<p>
							Pointing the config at the registry,{' '}
							<code>{'islands: { registry }'}</code>, is all the
							setup a static page needs. The island is
							server-rendered into the HTML, and the build adds
							the small script that hydrates it.
						</p>
						<p>
							Hydration is a prop, <code>load</code>,{' '}
							<code>idle</code>, <code>visible</code> or{' '}
							<code>none</code>, instead of a directive syntax.
							Islands that need to agree on something share a
							store, <code>createIslandStore</code>, and each
							framework reads it through its own adapter. A Svelte
							timer and a React chart on the same page see the
							same state. <code>absolute islands --sizes</code>{' '}
							lists every island by framework, hydration mode and
							bundle size, and flags pages that mix frameworks.
						</p>
						<p>
							The part that makes this a real option, and not a
							demo, is that the choice is reversible.{' '}
							<code>absolute add vue</code> adds the dependencies,
							the config key and a starter page.{' '}
							<code>absolute remove angular --prune</code> takes
							the framework back out of the config and the
							dependencies, and leaves your source files alone.
							Choosing a framework for a route is about as
							expensive as choosing a library for a component.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="types">
					<h2>Types cross the wire with no codegen</h2>
					<div className="cpr-col">
						<p>
							Your API is an Elysia app. You export its type, and
							the browser calls it through Eden Treaty:
						</p>
						<CodeSample
							code={apiCode}
							file="src/backend/api.ts"
							language="ts"
						/>
						<CodeSample
							code={edenCode}
							file="src/frontend/utils/edenTreaty.ts"
							language="ts"
						/>
						<p>
							Request bodies, params and responses are typed end
							to end, and there&apos;s no generation step to
							forget to run. On the production SaaS I work on, we
							deleted a hand-written API client and its
							hand-maintained response types. The types now come
							from the routes, so they can&apos;t drift.
						</p>
						<p>
							This is also where I learned the framework&apos;s
							most important convention. Elysia&apos;s types flow
							through <code>.use()</code> composition, and long,
							deeply inferred chains can make TypeScript slow to
							the point of timing out. AbsoluteJS ships what it
							calls the Elysia composition contract, and{' '}
							<code>eslint-plugin-absolute</code> enforces it:
						</p>
						<ul>
							<li>
								Give each independently owned surface its own
								named <code>{'new Elysia({ name })'}</code>.
								Don&apos;t build the admin app by extending the
								public one.
							</li>
							<li>
								Prefer one shallow{' '}
								<code>.use([auth, metrics])</code> over a long{' '}
								<code>.use().use().use()</code> chain. The lint
								rule fixes simple chains for you.
							</li>
							<li>
								Keep exactly one installed copy of{' '}
								<code>elysia</code> and <code>typebox</code>.
								Two copies are the most common cause of types
								that suddenly fail to line up.
							</li>
						</ul>
						<SideNote
							docs={[
								{
									href: '/documentation/doctor',
									label: 'Doctor'
								}
							]}
							label="Worth knowing"
						>
							<code>absolute doctor --json</code> prints the same
							diagnosis for CI or an agent to read.
						</SideNote>
						<p>
							That last one used to cost me an afternoon each
							time. Now <code>absolute doctor --fix</code> finds
							the duplicate copies, rewrites your package
							overrides, removes the stale ones and reinstalls.
							The rule I hold myself to, and the reason this docs
							site bans <code>as</code> casts entirely, is simple:
							if a type doesn&apos;t flow, fix the flow. A cast
							hides the break, and Eden is only as good as the
							inference behind it.
						</p>
						<p>
							One thing to expect: Eden turns ISO date strings in
							responses into <code>Date</code> objects.
							That&apos;s usually what you want, until a string
							comparison or a template like{' '}
							<code>{'`${date}T00:00:00`'}</code> quietly breaks.
							Normalize dates in one place, in your fetch helpers,
							and you won&apos;t think about it again.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="dev-loop">
					<h2>Save the file and keep your place</h2>
					<div className="cpr-col">
						<p>
							The dev loop is where a framework either earns your
							trust or loses it, so here&apos;s exactly what
							happens when you save.
						</p>
						<SideNote
							docs={[
								{ href: '/documentation/dev', label: 'Dev' }
							]}
							label="Worth knowing"
						>
							Requests for the same page share one build, and
							hovering a link warms the page before you click.{' '}
							<code>ABSOLUTE_DEV_PROFILE=1</code> prints a boot
							timeline.
						</SideNote>
						<p>
							<code>absolute dev</code> doesn&apos;t bundle your
							app on every edit. It runs an unbundled module
							server that transpiles one file at a time and tracks
							which modules import which. Pages build lazily, on
							their first request, typically in about a second, so
							a large app boots fast. <code>--eager</code>{' '}
							restores the old build-everything-at-boot behavior
							if you want it.
						</p>
						<p>
							Each framework then updates through its own path.
							Scroll through them and watch the count:
						</p>
					</div>
					<SaveStoryboard />
					<div className="cpr-col">
						<p>
							CSS hot-reloads too, both the global stylesheets you
							configure and the CSS a component imports. In my
							test, a stylesheet edit applied in about 20 ms with
							no reload.
						</p>
						<SideNote label="Measured">
							On beta.168 the changed response was served about
							0.16 s after saving. The 29 ms is the update itself.
						</SideNote>
						<p>
							The one I&apos;d call the standout is backend HMR.
							When you edit server code, the running server
							updates in place, in milliseconds. When I changed a
							handler&apos;s response, the log said{' '}
							<code>server.ts updated in 29ms</code>, and the
							process ID was the same before and after. The
							process, the port, open requests, WebSockets,
							database pools, queues and in-memory state all carry
							across the edit. It works per top-level statement
							instead of per module: an unchanged{' '}
							<code>const</code> keeps the value it already
							created, and a side-effecting line like{' '}
							<code>startQueue()</code> runs again only if you
							changed it. If the new version throws, it rolls
							back.
						</p>
						<p>
							If you&apos;ve ever had a dev server re-run your
							entry file on every save, start a second queue
							worker, open a second pool and call a paid API at
							boot, you&apos;ll understand why this matters.
							It&apos;s also why there&apos;s one convention to
							follow: if something must exist exactly once, guard
							it on <code>globalThis</code> or clean it up with{' '}
							<code>onHotDispose</code>.
						</p>
						<p>
							Failure is handled well too. If one build pass
							fails, whether it&apos;s a syntax error in a
							component or a bad CSS <code>@import</code>, dev
							mode keeps serving what built successfully and shows
							an overlay with the file, line and column. A browser
							tab you open afterward gets the last error replayed,
							so you&apos;re never staring at a blank page
							wondering what happened. Fix the error and the page
							updates on its own. Production builds still fail
							hard, which is what you want there.
						</p>
						<p>
							On an earlier beta, a fast burst of edits across
							many files occasionally left the dev server serving a stale
							module until I restarted it. I couldn&apos;t
							reproduce that on beta.168. I rewrote seven files at
							once 65 times, some bursts only 40 ms apart, and
							every served module and the open page stayed
							current. Global stylesheet changes used to need a
							restart too, and they no longer do. That&apos;s the
							pace this project moves at.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="checks">
					<h2>Checks fast enough that you actually run them</h2>
					<div className="cpr-col">
						<p>
							<code>absolute typecheck</code> is one command for
							the whole app. It runs the TypeScript checker, then
							adds <code>vue-tsc</code>, <code>svelte-check</code>{' '}
							and the Angular compiler only for the framework
							directories you&apos;ve actually configured, all in
							parallel, with the output recolored so it reads as
							one report.
						</p>
						<p>
							On Bun 1.4.3 and later it uses{' '}
							<code>bun check</code>, a port of TypeScript
							7&apos;s checker that reads the same{' '}
							<code>tsconfig.json</code> and reports the same
							errors as <code>tsc</code>. On the framework&apos;s
							own repository:
						</p>
					</div>
					<TypecheckScale />
					<div className="cpr-col">
						<SideNote
							docs={[
								{
									href: '/documentation/typecheck',
									label: 'Typecheck'
								}
							]}
							label="Machine"
						>
							Apple M4 with 10 cores and 16 GB of memory, Bun
							1.4.4 and TypeScript 5.9.3. Both checkers reported
							identical results.
						</SideNote>
						<p>
							That&apos;s 1,200 source files checked in about 0.6
							seconds using 0.44 GB of memory, where{' '}
							<code>tsc</code> 5.9 took 7 to 10 seconds and about
							1 GB, with identical errors reported.
						</p>
						<p>
							The number matters less than what it does to your
							habits. A check that takes ten seconds or more runs
							in CI. A check that takes under a second runs every
							time you&apos;re about to commit, and in an
							agent&apos;s loop after every change. The same
							thinking shows up in <code>absolute eslint</code>,
							which is cached, and in{' '}
							<code>absolute lint-proof</code>, which records that
							lint passed locally so CI can verify it instead of
							linting again.
						</p>
						<p>
							A tip from experience: after you change
							dependencies, run one cold typecheck. Warm
							incremental runs can hide a type graph that has
							quietly become expensive.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="production">
					<h2>From laptop to production without rewriting the app</h2>
					<div className="cpr-col">
						<SideNote
							docs={[
								{
									href: '/documentation/static-generation',
									label: 'Static Generation'
								},
								{
									href: '/documentation/sitemap',
									label: 'Sitemap'
								},
								{
									href: '/documentation/image-optimization',
									label: 'Image Optimization'
								},
								{
									href: '/documentation/compile',
									label: 'Compile'
								},
								{ href: '/documentation/pwa', label: 'PWA' }
							]}
							label="In the docs"
						/>
						<p>
							The parts of a project that usually need their own
							tool are built in, and they work from the same
							server you run in dev.
						</p>
						<ul>
							<li>
								<strong>
									Prerendering runs your real server.
								</strong>{' '}
								You list routes in{' '}
								<code>{'static: { routes }'}</code>, or{' '}
								<code>&apos;all&apos;</code> to crawl, and the
								build starts a temporary copy of your actual
								server and saves what it returns. There&apos;s
								no separate static pipeline that renders your
								app slightly differently. Add{' '}
								<code>revalidate</code> and stale pages are
								served instantly and re-rendered in the
								background. The one convention: wrap anything
								that shouldn&apos;t start during a build, such
								as queue workers, billing jobs and email, in{' '}
								<code>if (!isPrerendering())</code>.
							</li>
							<li>
								<strong>
									The sitemap comes from your routes.
								</strong>{' '}
								The build reads your Elysia route registrations
								from the source and writes{' '}
								<code>sitemap.xml</code>. Set{' '}
								<code>sitemap.baseUrl</code> before you ship; it
								defaults to localhost.
							</li>
							<li>
								<strong>
									Images are optimized out of the box.
								</strong>{' '}
								The optimizer mounts at{' '}
								<code>/_absolute/image</code> with sensible
								defaults, and there are{' '}
								<code>&lt;Image&gt;</code> components for React,
								Svelte and Vue. The <code>images</code> config
								block is only for tuning it. In one app, a 4.6
								MB PNG came back as a 6.4 KB WebP at the size it
								was displayed, in about 1 ms once cached.
							</li>
							<li>
								<strong>One binary.</strong>{' '}
								<code>absolute compile</code> produces a single
								executable with the build, the prerendered pages
								and the WebSocket handler inside. For
								containers, <code>absolute prepare</code> builds
								at image time and{' '}
								<code>absolute start --prebuilt</code> runs
								without writing to disk.
							</li>
							<li>
								<strong>
									Installable, with offline support.
								</strong>{' '}
								One <code>pwa</code> key in the config generates
								the service worker, the web manifest and an
								offline fallback, and wires them into every
								framework&apos;s pages, islands included. Route
								and page code don&apos;t change. Turn on{' '}
								<code>sync</code> alongside{' '}
								<code>@absolutejs/auth</code> and the app keeps
								working offline, then syncs through IndexedDB
								when it reconnects. Turn on <code>push</code>{' '}
								for Web Push; only the public key ever reaches
								the browser, and page code never handles push
								credentials.
							</li>
						</ul>
					</div>
				</section>

				<section className="cpr-section" id="real-app">
					<h2>What one real app stopped needing</h2>
					<div className="cpr-col">
						<p>
							The production SaaS I work on started on a familiar
							stack, and we moved it to AbsoluteJS before its
							first deploy. Here&apos;s what it no longer needed
							afterward.
						</p>
						<ReplacedSentence />
						<ul>
							<li>
								The job queue moved to{' '}
								<code>@absolutejs/queue</code> on the Postgres
								database we already had, and Redis was deleted
								from the stack.
							</li>
							<li>
								Polling for generation status became live
								updates over SSE with{' '}
								<code>@absolutejs/sync</code>.
							</li>
							<li>
								The API client became Eden, and Swagger became
								the framework&apos;s built-in OpenAPI.
							</li>
							<li>
								Error tracking moved to{' '}
								<code>@absolutejs/errors</code> with a browser
								beacon, stored in our own database.
							</li>
							<li>
								SMS moved to <code>@absolutejs/dispatch</code>{' '}
								with a consent ledger, which closed a compliance
								gap the hand-rolled version had.
							</li>
						</ul>
						<SideNote
							docs={[
								{
									href: '/documentation/packages',
									label: 'Package catalog'
								}
							]}
							label="The packages"
						>
							Queue, sync, errors and dispatch are all first-party{' '}
							<code>@absolutejs</code> packages.
						</SideNote>
						<p>
							None of that changed the app&apos;s architecture.
							It&apos;s still one Elysia server, now with fewer
							vendors, fewer bills and fewer places for things to
							go wrong. Once staging was up, CI ran in a little
							over two minutes, and we deployed more than a
							hundred times in the following month.
						</p>
						<p>
							The ecosystem is large, with more than 200 published{' '}
							<code>@absolutejs</code> packages covering auth,
							realtime sync, queues, AI, payments, observability,
							deployment and more. It&apos;s also young and moving
							fast. My advice is to adopt packages the way we did:
							one at a time, each one replacing something you were
							already maintaining.
						</p>
					</div>
				</section>

				<section className="cpr-section" id="day-one">
					<h2>Know these before day one</h2>
					<div className="cpr-col">
						<div className="cpr-table-wrap">
							<table>
								<thead>
									<tr>
										<th scope="col">Convention or edge</th>
										<th scope="col">What to do</th>
									</tr>
								</thead>
								<tbody>
									{dayOneRows.map((row) => (
										<tr key={row.edge}>
											<td>{row.edge}</td>
											<td>{row.todo}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</section>

				<section className="cpr-section" id="questions">
					<h2>Questions people ask</h2>
					<div className="cpr-col cpr-questions">
						<details>
							<summary>Is there file-based routing?</summary>
							<p>
								No. Routes are explicit Elysia handlers, and
								I&apos;ve come to prefer it. A{' '}
								<code>pageRouterPlugin</code> exists in the
								source as a placeholder, but it isn&apos;t
								implemented.
							</p>
						</details>
						<details>
							<summary>Do I need the patched Bun?</summary>
							<p>
								Only if you want React to keep component state
								across edits. Everything else works on stock Bun
								1.4.2 or later.{' '}
								<code>absolute bun-patch install</code> sets it
								up and <code>absolute bun-patch remove</code>{' '}
								takes it out.
							</p>
						</details>
						<details>
							<summary>Is it production-ready?</summary>
							<p>
								I run production work on it. It&apos;s also a
								beta that releases every few days. The current
								line is 0.20.0-beta.168, while npm&apos;s{' '}
								<code>latest</code> tag still points at the 0.19
								line. Pin exact versions, read the changelog,
								and expect to upgrade often.
							</p>
						</details>
						<details>
							<summary>What&apos;s the license?</summary>
							<p>
								The core and most packages are BSL-1.1, with a
								grant that allows production use. You can build
								and run your own apps, internal tools and SaaS
								products on it, use it in commercial software
								you sell, and do client work with it. What you
								can&apos;t do is offer it as a hosted service
								that competes with a managed AbsoluteJS
								platform, sell it or a fork as a standalone
								product, or remove the attribution. The core
								converts to Apache-2.0 on May 29, 2030. Many
								adapters and some packages are Apache-2.0 or MIT
								already.
							</p>
						</details>
						<details>
							<summary>Can I bring an existing app?</summary>
							<p>
								<code>absolute migrate --path ./old-app</code>{' '}
								detects Next, Nuxt, Remix, SvelteKit, Astro,
								Create React App and Vite. It reports what maps
								where, including which of your dependencies have
								an <code>@absolutejs</code> equivalent. Because
								each route picks its framework, you can move one
								route at a time.
							</p>
						</details>
						<details>
							<summary>Does it work with coding agents?</summary>
							<p>
								That&apos;s been a design goal. The conventions
								are explicit, the composition contract is
								written for application authors and coding
								agents alike, the checks are fast enough to run
								after every change, and{' '}
								<code>bun create absolutejs --agentic</code>{' '}
								scaffolds an <code>AGENTS.md</code> with the
								project&apos;s rules for an agent to follow.
							</p>
						</details>
					</div>
				</section>
			</article>

			<section aria-labelledby="close-title" className="cpr-close">
				<div className="cpr-close-inner">
					<h2 id="close-title">Pick a route. Pick a frontend.</h2>
					<div className="cpr-close-row">
						<p>
							Start with one page in the framework you know. Then
							add a second route in one you don&apos;t, and see
							how little changes.
						</p>
						<div className="cpr-command">
							<code>{CREATE_COMMAND}</code>
							<button onClick={copyCreateCommand} type="button">
								{copied ? 'Copied' : 'Copy'}
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
