import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	fileRoutesConfig,
	fileRoutesConfigOptions,
	fileRoutesGenerated,
	fileRoutesPrecedence,
	fileRoutesReactPage,
	fileRoutesReactServer,
	fileRoutesServer,
	fileRoutesSveltePage,
	fileRoutesSvelteServer,
	fileRoutesTree,
	fileRoutesTypeError
} from '../../../data/documentation/fileRoutesDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const contextRows: DocsTableCell[][] = [
	[
		{ code: 'params' },
		'Typed from the path: /blog/:slug gives { slug: string }'
	],
	[{ code: 'query' }, 'Query string values'],
	[{ code: 'headers' }, 'Request headers'],
	[{ code: 'request' }, 'The Request'],
	[{ code: 'set' }, 'Response status and headers, as on an Elysia context'],
	[{ code: 'path' }, 'The request path'],
	[{ code: 'redirect(url, status?)' }, 'A redirect response. Default 302.']
];

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#enable', label: 'Enable File Routes' },
	{ href: '#routes-folder', label: 'The routes Folder' },
	{ href: '#react-route', label: 'React Route' },
	{ href: '#svelte-route', label: 'Svelte Route' },
	{ href: '#load-context', label: 'Load Context' },
	{ href: '#route-tree', label: 'Route Tree' },
	{ href: '#typed-props', label: 'Typed Props' },
	{ href: '#explicit-routes', label: 'Explicit Routes' }
];

export const FileRoutesView = ({
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
					<h1 id="file-routes" style={h1Style(isMobileOrTablet)}>
						File Routes
					</h1>
					<p style={paragraphLargeStyle}>
						File routes turn files in a <code>routes/</code> folder
						into GET routes for React and Svelte pages. A{' '}
						<code>.server.ts</code> file next to a page loads its
						props, and the types check that the two agree.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="overview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						File routes are opt-in. Explicit Elysia routes stay the
						default. Use file routes when an app has many
						content-shaped pages and you want the URL to follow the
						file path.
					</p>
					<p style={paragraphSpacedStyle}>
						Each file route is a real Elysia GET route. Hooks and
						plugins registered before it, such as auth or{' '}
						<code>secureHeaders()</code>, apply to it like any other
						route.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enable"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enable File Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Set <code>fileRoutes: true</code> in{' '}
						<code>absolute.config.ts</code>.
					</p>
					<PrismPlus
						codeString={fileRoutesConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Pass an object instead to change the folder name or
						where the route module is written.
					</p>
					<PrismPlus
						codeString={fileRoutesConfigOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="routes-folder"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The routes Folder
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Route files live in a <code>routes/</code> folder inside
						each framework directory:{' '}
						<code>&lt;reactDirectory&gt;/routes/</code> for{' '}
						<code>.tsx</code> and <code>.jsx</code> files, and{' '}
						<code>&lt;svelteDirectory&gt;/routes/</code> for{' '}
						<code>.svelte</code> files. Your existing{' '}
						<code>pages/</code> folders are unchanged.
					</p>
					<PrismPlus
						codeString={fileRoutesTree}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>index</code> maps to its folder&apos;s path. A{' '}
						<code>[name]</code> segment becomes an Elysia param.
						Files and folders that start with <code>_</code> are
						private, so components can live next to the routes that
						use them. Test files (<code>.test</code>,{' '}
						<code>.spec</code>) are not routes.
					</p>
					<p style={paragraphSpacedStyle}>
						React and Svelte routes share one URL space. Two files
						that claim the same path are reported when the routes
						are scanned.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react-route"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React Route
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A React route file default-exports its page component.
						Like any React page, it renders the whole document.
					</p>
					<PrismPlus
						codeString={fileRoutesReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The sibling <code>[slug].server.ts</code> can export{' '}
						<code>load</code> and <code>beforeHandle</code>.{' '}
						<code>load</code> returns the page&apos;s props, or a{' '}
						<code>Response</code> such as a redirect.{' '}
						<code>beforeHandle</code> runs first; a value it returns
						answers the request.
					</p>
					<PrismPlus
						codeString={fileRoutesReactServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Throwing <code>NotFound</code> from <code>load</code>{' '}
						renders the not-found page. Any other error renders the
						framework&apos;s error page.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte-route"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte Route
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A Svelte route is a <code>.svelte</code> file that reads
						its props with <code>$props()</code>. Its server module
						works the same way as React&apos;s.
					</p>
					<PrismPlus
						codeString={fileRoutesSveltePage}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={fileRoutesSvelteServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="load-context"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Load Context
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>load</code> and <code>beforeHandle</code> receive
						a <code>FileRouteContext&lt;Path&gt;</code>. Pass the
						route&apos;s Elysia path as the type argument.
					</p>
					<DocsTable
						columns={['Field', 'Value']}
						rows={contextRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="route-tree"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Route Tree
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build scans the route folders and writes a route
						module, <code>src/routes.gen.ts</code> by default. It
						exports <code>routeTree</code>. Pass it and the manifest
						to <code>fileRoutes(routeTree, manifest)</code> after{' '}
						<code>prepare()</code>.
					</p>
					<PrismPlus
						codeString={fileRoutesServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>absolute build</code>, <code>absolute dev</code>{' '}
						and <code>absolute typecheck</code> write the module.
						Don&apos;t edit it. In <code>absolute dev</code>,
						adding, renaming or removing a route file rewrites it
						and the routes update without a restart.
					</p>
					<PrismPlus
						codeString={fileRoutesGenerated}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="typed-props"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Typed Props
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The route module passes each route&apos;s path, page
						module and server module as type arguments. So{' '}
						<code>load</code> must accept the route&apos;s params
						and return the page&apos;s props. A page with required
						props must have a server module with <code>load</code>.
						The <code>url</code> prop is filled in by the page
						handler, so <code>load</code> doesn&apos;t return it.
					</p>
					<PrismPlus
						codeString={fileRoutesTypeError}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The same check applies to Svelte routes.{' '}
						<code>absolute typecheck</code> reads the props a Svelte
						page declares with <code>$props()</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="explicit-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Explicit Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An explicit route always wins over a file route for the
						same path. If it is registered before{' '}
						<code>.use(fileRoutes(...))</code>, the file route is
						skipped with a warning. If it is registered after, it
						replaces the file route.
					</p>
					<PrismPlus
						codeString={fileRoutesPrecedence}
						language="typescript"
						showLineNumbers={true}
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
