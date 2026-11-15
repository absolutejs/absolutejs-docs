import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	staticConventionFiles,
	staticCustomOnError,
	staticErrorResponses,
	staticErrorTemplate,
	staticJsonResponses,
	staticServerLog,
	staticThrowingRoute
} from '../../../data/documentation/staticPageConventionsDocsCode';
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
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#files', label: 'Files' },
	{ href: '#when-they-render', label: 'When They Render' },
	{ href: '#error-pages', label: 'Error Pages' },
	{ href: '#dev-vs-production', label: 'Dev vs Production' },
	{ href: '#not-found-pages', label: 'Not-Found Pages' },
	{ href: '#custom-on-error', label: 'Custom onError' },
	{ href: '#stylesheets', label: 'Stylesheets' }
];

const fileRows: DocsTableCell[][] = [
	[
		{ code: '<Page>.error.html' },
		'The page with the same name fails to render'
	],
	[
		{ code: 'error.html' },
		'A page fails and has no page-specific error file, or a route handler throws'
	],
	[{ code: 'not-found.html' }, 'No route matches the request']
];

const requestRows: DocsTableCell[][] = [
	[
		'Browser navigation',
		{ code: 'Accept: text/html' },
		{ code: 'error.html' },
		{ code: 'not-found.html' }
	],
	[
		'HTMX request',
		{ code: 'HX-Request: true' },
		'HTMX error.html first',
		'HTMX not-found.html first'
	],
	[
		'fetch, curl or API client',
		{ code: 'application/json' },
		'JSON 500',
		'JSON 404'
	],
	['Anything else', { code: '*/*' }, 'JSON 500', 'JSON 404']
];

const PlaceholderList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					"The error's name, such as Error or TypeError. Always filled in.",
				term: '{{ name }}'
			},
			{
				description:
					'The error message in development. A generic message in production.',
				term: '{{ message }}'
			},
			{
				description:
					'The stack trace in development. Empty in production.',
				term: '{{ stack }}'
			}
		]}
		themeSprings={themeSprings}
	/>
);

const LookupOrderList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						<code>htmx/pages/&lt;Page&gt;.error.html</code>, then{' '}
						<code>htmx/pages/error.html</code>, then the shared
						error page.
					</>
				),
				term: 'HTMX pages'
			},
			{
				description: (
					<>
						<code>&lt;Page&gt;.error.html</code> or{' '}
						<code>error.html</code> from the first pages directory
						that has one, in this order: React, Svelte, Vue,
						Angular, Ember, HTML, HTMX. Framework pages without an
						error page of their own fall back to it too.
					</>
				),
				term: 'HTML pages and the shared page'
			},
			{
				description: (
					<>
						HTMX requests try <code>htmx/pages/error.html</code>{' '}
						first, then <code>html/pages/error.html</code>. Other
						page requests try them the other way round.
					</>
				),
				term: 'Thrown routes'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const StaticPageConventionsView = ({
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
						id="static-page-conventions"
						style={h1Style(isMobileOrTablet)}
					>
						Error &amp; Not-Found Pages
					</h1>
					<p style={paragraphLargeStyle}>
						HTML and HTMX pages use the same file conventions as
						React, Svelte, Vue and Angular pages. Put{' '}
						<code>error.html</code> and <code>not-found.html</code>{' '}
						next to your pages, and AbsoluteJS finds them at build
						time.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="files"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Files
					</AnchorHeading>
					<PrismPlus
						codeString={staticConventionFiles}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['File', 'Used when']}
						rows={fileRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>error.html</code> and <code>not-found.html</code>{' '}
						may exist in both the HTML and the HTMX pages directory.
						That doesn&apos;t count as a page name collision.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="when-they-render"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When They Render
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						These pages are HTML, so they answer page requests only:
						a browser navigation or an HTMX request. A client that
						asks for JSON, or sends <code>Accept: */*</code> as{' '}
						<code>fetch</code> and <code>curl</code> do, gets
						Elysia&apos;s JSON response instead.
					</p>
					<DocsTable
						columns={[
							'Request',
							'Header',
							'Route throws',
							'No route matches'
						]}
						rows={requestRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={staticJsonResponses}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="error-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Error Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>handleHTMLPageRequest</code> and{' '}
						<code>handleHTMXPageRequest</code> render the error page
						when a page can&apos;t be served: its file is missing or
						unreadable, or it fails a static-page check. The
						response has status 500.
					</p>
					<p style={paragraphSpacedStyle}>
						A route handler that throws before it returns a page
						also gets <code>error.html</code> with status 500, on a
						page request:
					</p>
					<PrismPlus
						codeString={staticThrowingRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A thrown route uses the directory&apos;s{' '}
						<code>error.html</code>, since a route isn&apos;t tied
						to a page file. Elysia&apos;s own errors (validation,
						parse errors) and thrown <code>status(...)</code>{' '}
						responses keep their own status and handling. Without an{' '}
						<code>error.html</code> in the HTML or HTMX pages
						directory, the route gets Elysia&apos;s default
						response.
					</p>
					<p style={paragraphSpacedStyle}>
						The page shows the error through three placeholders.
						Each value is HTML-escaped.
					</p>
					<PrismPlus
						codeString={staticErrorTemplate}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PlaceholderList themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						AbsoluteJS looks for the error page in this order.
						Without any error page, the built-in AbsoluteJS error
						page is shown.
					</p>
					<LookupOrderList themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev-vs-production"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dev vs Production
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In development the page shows the real message and
						stack. Outside development it shows{' '}
						<code>
							Something went wrong while rendering this page.
						</code>{' '}
						and an empty stack, so no error text or file path
						reaches the browser. The built-in error page does the
						same.
					</p>
					<PrismPlus
						codeString={staticErrorResponses}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The full error is always logged on the server. When your
						app has no <code>onError</code> of its own, every route
						that throws is logged once with its method, path and
						stack, whatever the request accepts. 404s and thrown{' '}
						<code>status(...)</code> responses aren&apos;t logged.
					</p>
					<PrismPlus
						codeString={staticServerLog}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="not-found-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Not-Found Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A page request that matches no route renders the first{' '}
						<code>not-found</code> page found, in this order: React,
						Svelte, Vue, Angular, HTML, HTMX. The status is 404.
					</p>
					<p style={paragraphSpacedStyle}>
						An HTMX request tries{' '}
						<code>htmx/pages/not-found.html</code> first, so a swap
						that targets a missing route gets your HTMX markup.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="custom-on-error"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Custom onError
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Rendering <code>error.html</code> for thrown routes is a
						fallback. If your app registers its own{' '}
						<code>onError</code>, before or after{' '}
						<code>.use(absolutejs)</code> or as a global hook in
						another plugin, your handler decides the response and
						does its own logging. AbsoluteJS doesn&apos;t render{' '}
						<code>error.html</code> for those errors or log them.
					</p>
					<PrismPlus
						codeString={staticCustomOnError}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						An <code>onError</code> with the default local scope
						inside a sub-plugin doesn&apos;t count, because Elysia
						doesn&apos;t share it with the app. Your handler is
						found when the server starts with <code>.listen()</code>
						, which covers <code>absolute dev</code>,{' '}
						<code>absolute start</code> and compiled binaries.
					</p>
					<p style={paragraphSpacedStyle}>
						Page handler failures are separate.{' '}
						<code>handleHTMLPageRequest</code> and{' '}
						<code>handleHTMXPageRequest</code> render their error
						page themselves, so those responses don&apos;t depend on
						your <code>onError</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stylesheets"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stylesheets
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Link stylesheets and scripts relative to the source
						file, as in your other HTML pages. The build rewrites{' '}
						<code>error.html</code> and <code>not-found.html</code>{' '}
						like any other HTML or HTMX page: links get the hashed
						asset URLs, and the font tags from the{' '}
						<code>fonts</code> config are added to the head. The
						error page is styled in production as in development.
					</p>
					<p style={paragraphSpacedStyle}>
						Under <code>secureHeaders()</code>, inline scripts and
						styles in these pages get the request&apos;s nonce, like
						any other HTML page.
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
