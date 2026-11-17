/* eslint-disable absolute/max-jsxnesting -- long-form editorial markup keeps its semantic document hierarchy */
import type { ArticleContentProps } from '../postRegistry';
import { CodeSample } from '../shared/CodeSample';
import { SectionRail } from '../shared/SectionRail';
import { SideNote } from '../shared/SideNote';
import { ChapterIndex } from './ChapterIndex';
import {
	angularDefer,
	angularPage,
	angularRoute,
	htmlLayout,
	htmlPage,
	htmxAction,
	htmxRoute,
	htmxState,
	islandStore,
	openingRoute,
	reactAction,
	reactClient,
	reactForm,
	reactRoute,
	reactServerComponent,
	reactSlot,
	sveltePage,
	svelteRoute,
	svelteRouter,
	svelteStreamBlock,
	svelteStreamHandler,
	vueNone,
	vueRoutes,
	vueServerData
} from './codeSamples';
import { CreateCommand } from './CreateCommand';
import { FolderStack } from './FolderStack';
import { FrameworkChapter } from './FrameworkChapter';
import { articleSections, chapterFrameworks } from './frameworks';
import { MoveThisRoute } from './MoveThisRoute';
import { SharedServer } from './SharedServer';

const formatPostDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(new Date(value));

const docsFor = (key: string) =>
	chapterFrameworks
		.filter((framework) => framework.key === key)
		.map((framework) => framework.docs);

export const KeepYourFrameworkContent = ({
	post,
	readingTime
}: ArticleContentProps) => (
	<>
		<section aria-labelledby="page-title" className="post-hero">
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

			<div className="post-hero-inner kyf-hero-inner">
				<h1 id="page-title">
					Keep Your Framework, Lose the Package Deal
				</h1>
				<p className="post-hero-summary">
					Keep React, Svelte, Vue, Angular, HTML or HTMX. Drop the
					package deal that usually comes with it. This post covers
					what each one gains inside one AbsoluteJS server, framework
					by framework, with the code.
				</p>
				<FolderStack />
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

		<SectionRail
			sections={articleSections}
			wideFigures=".post-figure, .kyf-ledger, .kyf-index"
		/>
		<article className="post-article kyf-article">
			<section className="post-section" id="package-deal">
				<h2>What a meta-framework makes you buy</h2>
				<div className="post-col">
					<p>
						When you pick a UI library today, you usually pick a lot
						more than a UI library. Choose React and the default
						path is Next.js. Choose Svelte and it&apos;s SvelteKit;
						Vue, Nuxt; Angular, the Angular CLI and its SSR builder.
						Each of those is a good piece of software. Each is also
						a package deal: a router, a bundler, a server, a
						data-loading model and a deploy story, all designed
						around one library.
					</p>
					<p>
						That&apos;s fine until the deal stops fitting. Your
						marketing pages want to ship no JavaScript, but the deal
						assumes an app. Your team has a Vue dashboard and wants
						a React editor next to it, and now there are two deals,
						two servers and two copies of every type. Your backend
						lives in its own project because the
						meta-framework&apos;s server was built to render pages,
						not to be your API.
					</p>
					<p>
						AbsoluteJS splits that deal apart. The framework does
						what it is best at, rendering UI. Everything else
						(routing, the server, data, the build, types between
						client and server) moves into one Elysia server on Bun
						that every framework shares. A page is a route that
						returns HTML:
					</p>
					<CodeSample
						code={openingRoute}
						file="src/backend/server.ts"
						language="ts"
					/>
					<p>
						Swap that handler for{' '}
						<code>handleReactPageRequest</code>,{' '}
						<code>handleVuePageRequest</code>,{' '}
						<code>handleAngularPageRequest</code>,{' '}
						<code>handleHTMLPageRequest</code> or{' '}
						<code>handleHTMXPageRequest</code>, and the route serves
						a different framework. Nothing around it changes.
					</p>
					<p>
						The rest of this post is the part people ask me about
						most. When you keep your framework and lose its package
						deal, what does the framework actually gain? Each
						chapter below starts with the framework at home, then
						shows it here.
					</p>
				</div>
				<ChapterIndex />
			</section>

			<FrameworkChapter
				framework="react"
				here={[
					'A React page is a component you return from an Elysia route.',
					'Props are typed at the route, and streaming is on by default.',
					'Server Components are opt-in, page by page.',
					'The same server is your API.'
				]}
				home={{
					items: [
						'The App Router, the bundler and the server come as one React-only package.',
						'Data loading, caching and Server Components follow its conventions.'
					],
					label: 'Next.js 16'
				}}
				title="React, without the platform"
			>
				<p>
					Here&apos;s a full React route, with a form that works
					whether or not JavaScript loads:
				</p>
				<CodeSample
					code={`${reactAction}\n${reactRoute}`}
					file="src/backend/server.ts"
					language="ts"
				/>
				<CodeSample
					code={reactClient}
					file="src/frontend/actions.ts"
					language="ts"
				/>
				<CodeSample code={reactForm} file="Signup.tsx" language="tsx" />
				<SideNote label="Tested">
					On beta.173 the shell arrived at 14 ms and the slot at 2,015
					ms, with no option set. In the Server Components test, a
					marker string from server-only code appeared only in the
					server bundle, which the production server doesn&apos;t
					serve. The client bundle had zero matches.
				</SideNote>
				<p>
					The action is an ordinary route in the app&apos;s chain, so{' '}
					<code>user</code> arrives typed from the app&apos;s own
					auth. Its <code>form</code> schema is an ordinary Elysia
					schema, so the same rules validate the form, type{' '}
					<code>signup.errors</code> and type the Eden client. The
					page reaches the action by its path, checked against the
					server&apos;s routes. With JavaScript on, the form submits
					without a page load. With it off, the browser posts, the
					server redirects back, and the page renders the same errors
					and keeps what you typed.
				</p>
				<p>
					Streaming needs no setup. Put a <code>SuspenseSlot</code> on
					the page and the shell goes out first while the slot fills
					in when its data resolves:
				</p>
				<CodeSample
					code={reactSlot}
					file="Dashboard.tsx"
					language="tsx"
				/>
				<p>
					When a page should be a Server Component, put it in the{' '}
					<code>pages</code> folder of your{' '}
					<code>reactServerComponentsDirectory</code> and serve it the
					same way:
				</p>
				<CodeSample
					code={reactServerComponent}
					file="src/backend/server.ts"
					language="ts"
				/>
				<SideNote
					docs={docsFor('react')}
					label="At home, checked Nov 12, 2026"
				>
					Next.js 16.4, nextjs.org/docs.
				</SideNote>
				<p>
					The page can be <code>async</code> and read your database
					directly. That code stays on the server.
				</p>
				<p>
					React also gets file routes if you want them. Turn on{' '}
					<code>fileRoutes</code>, add{' '}
					<code>routes/posts/[slug].tsx</code> with a{' '}
					<code>[slug].server.ts</code> beside it, and serve the
					generated route tree with{' '}
					<code>.use(fileRoutes(routeTree, manifest))</code>. The{' '}
					<code>load</code> function must return the page&apos;s
					props, so a missing or wrong field fails the typecheck.
				</p>
			</FrameworkChapter>

			<FrameworkChapter
				framework="svelte"
				here={[
					'A Svelte page is a .svelte file served from any route.',
					'Its props are checked where the route calls it.',
					<>
						<code>{'{#await}'}</code> renders on the server and
						hydrates.
					</>,
					'A router with real redirects comes in the box.'
				]}
				home={{
					items: [
						<>
							Routing, <code>load</code> functions and adapters
							are SvelteKit&apos;s.
						</>,
						'They are built for Svelte only.'
					],
					label: 'SvelteKit 3'
				}}
				title="Svelte, typed from the server"
			>
				<p>
					The part I&apos;d show a Svelte developer first is the type
					check. The route passes props to the page, and the page
					declares them with <code>$props()</code>:
				</p>
				<CodeSample
					code={sveltePage}
					file="Dashboard.svelte"
					language="svelte"
				/>
				<CodeSample
					code={svelteRoute}
					file="src/backend/server.ts"
					language="ts"
				/>
				<p>
					<code>{'<typeof Dashboard>'}</code> ties the handler to the
					component, so a wrong or missing prop fails{' '}
					<code>absolute typecheck</code>. The check runs svelte-check
					across your components and TypeScript across the server in
					one command.
				</p>
				<p>
					<code>{'{#await}'}</code> is plain Svelte. The server
					renders the pending branch, and the browser resolves it and
					hydrates. When you&apos;d rather the server send the
					resolved branch as it arrives, put{' '}
					<code>{'<!-- absolute:stream -->'}</code> before the block
					and add <code>collectStreamingSlots: true</code> to the
					page&apos;s handler:
				</p>
				<CodeSample
					code={svelteStreamHandler}
					file="src/backend/server.ts"
					language="ts"
				/>
				<CodeSample
					code={svelteStreamBlock}
					file="Dashboard.svelte"
					language="svelte"
				/>
				<p>
					A streamed block&apos;s branches go out as HTML, so they
					hold elements and <code>{'{expressions}'}</code>. Anything
					richer stays in a plain <code>{'{#await}'}</code>, which
					hydrates.
				</p>
				<SideNote label="Tested">
					On beta.170 and beta.173 the guard returned 302 to curl and
					redirected on click, and the router page hydrated in dev
					with no mismatch warning.
				</SideNote>
				<p>
					For apps with more than one view, the Svelte router runs on
					both sides. Its guards run during server rendering too, so a
					guard that throws <code>redirect()</code> sends a real 302
					before any HTML goes out:
				</p>
				<CodeSample
					code={svelteRouter}
					file="App.svelte"
					language="svelte"
				/>
				<SideNote
					docs={docsFor('svelte')}
					label="At home, checked Nov 12, 2026"
				>
					SvelteKit 3.2, svelte.dev/docs/kit.
				</SideNote>
				<p>
					Lazy routes and scroll restoration come with it, and Svelte
					pages get the same file routes and typed <code>load</code>{' '}
					as React.
				</p>
			</FrameworkChapter>

			<FrameworkChapter
				framework="vue"
				here={[
					'Each route decides what hydrates.',
					'A page can ship no script at all.',
					'Data loads on the server without a second fetch in the browser.',
					'Or the page runs a full vue-router app.'
				]}
				home={{
					items: [
						'Nuxt decides what hydrates.',
						<>
							Its server components are <code>.server.vue</code>{' '}
							files, still marked experimental.
						</>
					],
					label: 'Nuxt 4'
				}}
				title="Vue, down to zero JavaScript"
			>
				<p>
					Some pages don&apos;t need to be apps. A pricing page, a
					changelog, a legal page: render them with Vue because
					that&apos;s where your components live, then ship no
					JavaScript:
				</p>
				<CodeSample
					code={vueNone}
					file="src/backend/server.ts"
					language="ts"
				/>
				<p>
					That page goes out as HTML and CSS with no{' '}
					<code>{'<script>'}</code> tag. The next route over can be
					fully interactive.
				</p>
				<SideNote label="Tested">
					On beta.173 in production, the{' '}
					<code>client: &apos;none&apos;</code> page had zero script
					tags, and the browser fetcher behind{' '}
					<code>useServerData</code> ran zero times on hydration. On
					beta.178 the typecheck of a fresh Vue starter took 0.35 to
					0.41 s clean, on Bun 1.4.4, and caught a wrong type and a
					misspelled prop.
				</SideNote>
				<p>
					When a page does hydrate, <code>useServerData</code> loads
					its data once:
				</p>
				<CodeSample
					code={vueServerData}
					file="Profile.vue"
					language="vue"
				/>
				<p>
					On the server it runs <code>loadProfile</code> and renders
					the result. The result rides along in the page, so on
					hydration the browser uses it and doesn&apos;t fetch again.{' '}
					<code>refresh</code> is there when you do want new data.
				</p>
				<p>
					An app with several views exports its routes, and AbsoluteJS
					sets up vue-router for you:
				</p>
				<CodeSample code={vueRoutes} file="App.vue" language="vue" />
				<SideNote
					docs={docsFor('vue')}
					label="At home, checked Nov 12, 2026"
				>
					Nuxt 4.6, nuxt.com/docs (server components).
				</SideNote>
				<p>
					Deep links work, lazy routes load on demand, and links
					navigate without a reload.
				</p>
				<p>
					The dev loop keeps up. <code>{'<script setup>'}</code> state
					survives template edits, and <code>absolute typecheck</code>{' '}
					checks your <code>.vue</code> files and the props your
					routes pass in. A clean check of a starter project takes
					well under a second.
				</p>
			</FrameworkChapter>

			<FrameworkChapter
				framework="angular"
				here={[
					'Template edits apply in place in 5 to 12 ms on the server, and component state is kept.',
					<>
						Zoneless SSR runs on Bun, and <code>@defer</code>{' '}
						streams from the server and stays after hydration.
					</>,
					<>
						A page is one exported component class. An exported{' '}
						<code>routes</code> is wired for you, base href
						included.
					</>,
					'The handler type-checks the request context, and the same Eden client calls your API.'
				]}
				home={{
					items: [
						'HMR covers styles and templates. Other changes rebuild and reload the page.',
						'SSR comes from the CLI builder and a Node server.',
						<>
							A bootstrap file, <code>provideRouter</code> and app
							config come with every app.
						</>,
						'Wiring up the API, and the types it shares with your components, is your job.'
					],
					label: 'Angular CLI 22'
				}}
				title="Angular, edited in milliseconds"
			>
				<p>
					An Angular page is a standalone component. It reads what the
					route gives it through a typed context:
				</p>
				<CodeSample
					code={angularPage}
					file="dashboard.ts"
					language="ts"
				/>
				<CodeSample
					code={angularRoute}
					file="src/backend/server.ts"
					language="ts"
				/>
				<p>
					That&apos;s the whole setup. It needs no{' '}
					<code>main.ts</code>, no <code>app.config.ts</code> and no
					server file. If <code>requestContext</code> doesn&apos;t
					match <code>Context</code>, the typecheck fails.
				</p>
				<SideNote label="Measured">
					On beta.170, server-side apply p50 was 5 to 12 ms, and about
					52 to 70 ms from save to the change in the browser. A
					counter at 2 survived five template edits.
				</SideNote>
				<p>
					The part Angular developers notice first is the edit loop.
					Change a template and it&apos;s in the browser almost at
					once, with your counters, form input and component state
					where you left them.
				</p>
				<p>
					<code>@defer</code> streams. Add{' '}
					<code>collectStreamingSlots: true</code> to the handler, and
					the server sends each deferred block as it resolves, then
					hydrates the page around it:
				</p>
				<CodeSample
					code={angularDefer}
					file="dashboard.html"
					language="html"
				/>
				<SideNote label="Measured">
					On beta.173, with timers of 300 ms and 1,500 ms, the fast
					block arrived at 309 ms and the slow one at 1,508 ms. Both
					were still in the DOM after hydration, with zero console
					errors.
				</SideNote>
				<SideNote
					docs={docsFor('angular')}
					label="At home, checked Nov 12, 2026"
				>
					Angular 22, angular.dev (HMR).
				</SideNote>
				<p>
					Pages run zoneless by default. When a library still needs
					zone.js, set{' '}
					<code>{"angular: { changeDetection: 'zone' }"}</code> in{' '}
					<code>absolute.config.ts</code> and{' '}
					<code>bun add zone.js</code>.
				</p>
			</FrameworkChapter>

			<FrameworkChapter
				framework="html"
				here={[
					<>
						A page is an <code>.html</code> file.
					</>,
					'The build hashes its assets, makes responsive images, and assembles it from layouts and partials.',
					'An island from any framework drops in where the page needs one interactive part.'
				]}
				home={{
					items: [
						'Hand-written pages have no build step to hash assets or share a header.',
						'Astro gives you one, with islands. Each framework’s components live in their own files, and shared state goes through Nano Stores.'
					],
					label: 'hand-written HTML, or Astro 7'
				}}
				title="Plain HTML, with superpowers"
			>
				<p>
					An HTML page here is just HTML. Layouts and partials are two
					elements:
				</p>
				<CodeSample
					code={htmlLayout}
					file="html/layouts/base.html"
					language="html"
				/>
				<CodeSample
					code={htmlPage}
					file="html/pages/About.html"
					language="html"
				/>
				<SideNote label="Tested">
					On beta.173, two tabs shared one partial. After three edits,
					each tab kept its own body and title and showed the new
					text.
				</SideNote>
				<p>
					The includes are resolved at build time, so the browser gets
					one plain document. In dev, editing <code>header.html</code>{' '}
					updates every open page that uses it, and each page keeps
					its own title and body.
				</p>
				<p>
					The island in that page is a React component,
					server-rendered into the HTML and hydrated when it scrolls
					into view. It could just as well be Svelte, Vue or Angular,
					and it can read the same store as islands from any other
					framework.
				</p>
				<SideNote
					docs={docsFor('html')}
					label="At home, checked Nov 12, 2026"
				>
					Astro 7.4, docs.astro.build (framework components, sharing
					state).
				</SideNote>
				<p>
					Errors follow the same idea. Put an <code>error.html</code>{' '}
					in your pages folder, and a route that throws while serving
					a page renders it with status 500. In production it shows a
					generic message, and the full error goes to the server log.
				</p>
			</FrameworkChapter>

			<FrameworkChapter
				framework="htmx"
				here={[
					'Fragment endpoints are typed Elysia routes.',
					'htmx is pinned and served from your own origin.',
					'Per-visitor state survives a server edit.',
					'The page hot-updates without losing what you typed.'
				]}
				home={{
					items: [
						'You pick a server and write the fragment endpoints.',
						'Validation, per-visitor state and reloading are yours to assemble.'
					],
					label: 'htmx and a server you bolt on'
				}}
				title="HTMX, with a typed server"
			>
				<p>
					An HTMX fragment is an Elysia route, so it gets
					Elysia&apos;s validation:
				</p>
				<CodeSample
					code={htmxRoute}
					file="src/backend/server.ts"
					language="ts"
				/>
				<p>
					A bad body gets a 422 before your handler runs. A good one
					gets the fragment.
				</p>
				<SideNote label="Tested">
					On beta.173 the counter stayed at 3 through edits to{' '}
					<code>server.ts</code> and <code>api.ts</code>, in the same
					server process. A bad body to the typed route returned 422
					in dev and production.
				</SideNote>
				<p>
					Per-visitor state lives in <code>scopedState</code>, and it
					is kept through server edits. Change a route in{' '}
					<code>api.ts</code> and the server picks up the new code
					without a restart, while every visitor&apos;s counter stays
					where it was:
				</p>
				<CodeSample
					code={htmxState}
					file="src/backend/server.ts"
					language="ts"
				/>
				<p>
					Form actions work here too. The same <code>form</code>{' '}
					option from the React chapter takes an <code>htmx</code>{' '}
					renderer, so <code>hx-post</code> gets a fragment back, and
					a browser without JavaScript gets a normal post and
					redirect:
				</p>
				<CodeSample
					code={htmxAction}
					file="src/backend/server.ts"
					language="ts"
				/>
				<SideNote docs={docsFor('htmx')} label="Docs" />
				<p>
					htmx itself is version 2.0.11, pinned and served from your
					own origin, so there&apos;s no CDN to allow in your CSP.
					Edit the page in dev, and the DOM is patched in place
					without losing what you typed in the form.
				</p>
			</FrameworkChapter>

			<section className="post-section" id="each-other">
				<h2>What they get from each other</h2>
				<div className="post-col">
					<p>
						Everything so far is what one framework gains from
						losing its package deal. This part comes from them
						sharing one server and one build. No single-framework
						tool can offer it, because there is only one framework
						in the room.
					</p>
				</div>
				<SharedServer />
				<MoveThisRoute />
				<div className="post-col">
					<p>
						<strong>One store, any framework.</strong> An island
						store is defined once and read through each
						framework&apos;s own adapter:
					</p>
					<CodeSample
						code={islandStore}
						file="src/shared/counterStore.ts"
						language="ts"
					/>
					<SideNote
						docs={[
							{
								href: '/documentation/islands',
								label: 'Islands'
							},
							{
								href: '/documentation/eden-overview',
								label: 'Eden'
							}
						]}
						label="Tested"
					>
						On beta.173 to beta.180, React to Svelte and back took
						the store from 2 to 3 with zero document loads. With{' '}
						<code>secureHeaders()</code> on, styled Svelte and Vue
						islands logged zero violations. A wrong prop in each of
						four frameworks was reported under its own checker, and
						40 edits to a page hosting three islands each showed in
						under 70 ms, with every island&apos;s state kept.
					</SideNote>
					<p>
						A React island calls{' '}
						<code>
							useIslandStore(counterStore, (s) =&gt; s.count)
						</code>
						. A Svelte island gets the same value as a Svelte store,
						and Vue gets a ref. Click in one and the others update.
					</p>
					<p>
						<strong>Navigation that keeps the store.</strong> Call{' '}
						<code>enableNavigation()</code> on your pages, and links
						between React and Svelte pages become soft navigations,
						even though the two pages use different frameworks.
						Going from a React page to a Svelte page and back, the
						document never reloads and the store keeps its value.
					</p>
					<p>
						<strong>One API, typed everywhere.</strong> Your API is
						a set of Elysia routes on the same server. Every
						framework calls it through the same Eden client, typed
						from the server, so a renamed field is a type error in
						the React page, the Svelte page and the Angular page at
						once, in one typecheck.
					</p>
					<p>
						<strong>One typecheck.</strong>{' '}
						<code>absolute typecheck</code> runs TypeScript,
						svelte-check, Vue&apos;s checker and Angular&apos;s
						compiler checks in one command, and each error is
						labelled with the checker that found it.
					</p>
					<p>
						<strong>One security policy.</strong>{' '}
						<code>.use(secureHeaders())</code> sets a strict,
						nonce-based Content Security Policy for every page, and
						everything the framework writes into a page carries the
						nonce: hydration data, streamed slots, island styles and
						hot updates in dev. You don&apos;t loosen the policy for
						one framework.
					</p>
					<p>
						<strong>One dev loop.</strong> Edit a React island on an
						HTML page, a Svelte component and an API route, and each
						update arrives in place. Edit a React page that hosts
						islands from three frameworks, and the page updates
						around them while every island keeps its state.
					</p>
				</div>
			</section>

			<section className="post-section" id="questions">
				<h2>Questions people ask</h2>
				<div className="post-col post-questions">
					<details>
						<summary>Is this a micro-frontend setup?</summary>
						<p>
							No. There&apos;s one server, one build and one
							deploy. Each page is rendered by one framework, and
							islands let another framework take a part of a page.
							Nothing is stitched together at runtime from
							separately deployed apps.
						</p>
					</details>
					<details>
						<summary>Can I use it with just one framework?</summary>
						<p>
							Yes. Most projects start that way.{' '}
							<code>bun create absolutejs my-app --vue</code>{' '}
							gives you a Vue app with the server, typecheck and
							dev loop described here. Adding a second framework
							later is one command:{' '}
							<code>absolute add react</code>,{' '}
							<code>absolute add angular</code>, and so on.
						</p>
					</details>
					<details>
						<summary>
							Do I have to give up file-based routing?
						</summary>
						<p>
							No, but you choose it. Routes are Elysia routes by
							default. Turn on <code>fileRoutes</code> and React
							and Svelte pages under <code>routes/</code> become
							routes, with a typed <code>load</code> beside each
							one.
						</p>
					</details>
					<details>
						<summary>
							What about my existing SvelteKit, Nuxt or Next.js
							app?
						</summary>
						<p>
							Your components move as they are. They&apos;re
							React, Svelte or Vue components, and that&apos;s
							what AbsoluteJS renders. What you rewrite is the
							glue: the routes, the loaders and the server code,
							which become Elysia routes. Start with one page.
						</p>
					</details>
					<details>
						<summary>Does Angular really run on Bun?</summary>
						<p>
							Yes. Pages render zoneless on Bun with server-side{' '}
							<code>@defer</code> streaming, and zone.js is one
							config option and a <code>bun add zone.js</code>{' '}
							away for libraries that still need it.
						</p>
					</details>
					<details>
						<summary>
							What does &ldquo;the framework renders&rdquo; leave
							out?
						</summary>
						<p>
							Whatever you&apos;d normally pick per framework: the
							router for multi-page apps, data loading, form
							handling, the server and the build. Those come from
							AbsoluteJS once, for every framework.
						</p>
					</details>
				</div>
			</section>
		</article>

		<section aria-labelledby="close-title" className="post-close kyf-close">
			<div className="post-close-inner">
				<h2 id="close-title">
					Bring the framework. Leave the package deal.
				</h2>
				<div className="post-close-row">
					<p>
						Pick the framework you already like and start there.
						You&apos;ll get the server, the typecheck and the dev
						loop from this post, with your framework doing what it
						was always good at.
					</p>
					<CreateCommand />
				</div>
			</div>
		</section>
	</>
);
