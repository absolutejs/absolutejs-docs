import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	reactHandler,
	svelteHandler,
	vueHandler,
	htmlHandler,
	htmxHandler
} from '../../../data/documentation/pageHandlersDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle,
	featureCardStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#handler-behavior', label: 'Handler Behavior' },
	{ href: '#handlereactpagerequest', label: 'React Handler' },
	{ href: '#handlesveltepagerequest', label: 'Svelte Handler' },
	{ href: '#handlevuepagerequest', label: 'Vue Handler' },
	{ href: '#handlehtmlpagerequest', label: 'HTML Handler' },
	{ href: '#handlehtmxpagerequest', label: 'HTMX Handler' }
];

const reactParams = [
	{
		param: 'pageComponent',
		type: 'React.ComponentType<Props>',
		description: 'Your React page component from the pages directory'
	},
	{
		param: 'index',
		type: 'string',
		description: 'Path to the hydration script from asset(manifest, key)'
	},
	{
		param: 'props',
		type: 'Props',
		description:
			'Type-safe props matching the component requirements (optional)'
	}
];

const svelteParams = [
	{
		param: 'PageComponent',
		type: 'SvelteComponent<Props>',
		description: 'Raw Svelte component (used only for type inference)'
	},
	{
		param: 'pagePath',
		type: 'string',
		description: 'Path to compiled Svelte page for SSR'
	},
	{
		param: 'indexPath',
		type: 'string',
		description: 'Path to hydration script from asset(manifest, key)'
	},
	{
		param: 'props',
		type: 'Props',
		description: 'Type-safe props (optional if component has no props)'
	}
];

const vueParams = [
	{
		param: '_PageComponent',
		type: 'VueComponent<Props>',
		description: 'Raw Vue component (used only for type inference)'
	},
	{
		param: 'pagePath',
		type: 'string',
		description: 'Path to compiled Vue page for SSR'
	},
	{
		param: 'indexPath',
		type: 'string',
		description: 'Path to hydration script from asset(manifest, key)'
	},
	{
		param: 'headTag',
		type: '`<head>...</head>`',
		description: 'Custom head element (use generateHeadElement helper)'
	},
	{
		param: 'props',
		type: 'Props',
		description: 'Type-safe props (optional if component has no props)'
	}
];

export const PageHandlersView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	const renderParamsTable = (
		params: { param: string; type: string; description: string }[]
	) => (
		<div style={tableContainerStyle}>
			<animated.table style={tableStyle(themeSprings)}>
				<thead>
					<tr>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Parameter
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Type
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Description
						</animated.th>
					</tr>
				</thead>
				<tbody>
					{params.map((p, i) => (
						<tr key={i}>
							<animated.td style={tableCellStyle(themeSprings)}>
								<code style={tableCodeStyle}>{p.param}</code>
							</animated.td>
							<animated.td style={tableCellStyle(themeSprings)}>
								<code style={tableCodeStyle}>{p.type}</code>
							</animated.td>
							<animated.td style={tableCellStyle(themeSprings)}>
								{p.description}
							</animated.td>
						</tr>
					))}
				</tbody>
			</animated.table>
		</div>
	);

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="page-handlers">
						Page Handlers
					</h1>
					<p style={paragraphLargeStyle}>
						Specialized handler functions for server-side rendering
						with different frontend frameworks. All handlers provide
						complete type safety from server to client.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handler-behavior"
					>
						Handler Behavior
					</animated.h2>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									marginBottom: '0.5rem',
									fontWeight: 600
								}}
							>
								Framework Handlers
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								React, Svelte, Vue handlers perform server-side
								rendering and return hydrated HTML.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									marginBottom: '0.5rem',
									fontWeight: 600
								}}
							>
								Static Handlers
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								HTML and HTMX handlers serve pre-built files
								directly without SSR processing.
							</p>
						</animated.div>
					</div>
					<p style={paragraphSpacedStyle}>
						All handlers work seamlessly with Elysia's routing
						system and return properly formatted responses.
						Framework handlers require the manifest from{' '}
						<code style={tableCodeStyle}>build()</code>. Always use{' '}
						<code style={tableCodeStyle}>asset(manifest, key)</code>{' '}
						to look up script paths—it will throw if the artifact
						doesn't exist.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handlereactpagerequest"
					>
						handleReactPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for React pages. The
						component is rendered to HTML with createElement, then
						hydrated on the client with the provided index script.
					</p>
					{renderParamsTable(reactParams)}
					<PrismPlus
						codeString={reactHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handlesveltepagerequest"
					>
						handleSveltePageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Svelte pages. The
						component parameter is only used for type inference—the
						actual rendering uses the compiled page at pagePath.
					</p>
					{renderParamsTable(svelteParams)}
					<PrismPlus
						codeString={svelteHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handlevuepagerequest"
					>
						handleVuePageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Vue pages. Vue
						components cannot include page elements like head, so
						you pass a headTag parameter (use generateHeadElement
						helper for convenience).
					</p>
					{renderParamsTable(vueParams)}
					<PrismPlus
						codeString={vueHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handlehtmlpagerequest"
					>
						handleHTMLPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Serves static HTML files directly. The file still goes
						through the build process to update resource paths to
						their bundled versions.
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Parameter
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Type
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Description
									</animated.th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>html</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											string
										</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										Path to the HTML file
									</animated.td>
								</tr>
							</tbody>
						</animated.table>
					</div>
					<PrismPlus
						codeString={htmlHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="handlehtmxpagerequest"
					>
						handleHTMXPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Serves HTMX template files. Like HTML handler, files go
						through the build process for path updates.
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Parameter
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Type
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Description
									</animated.th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>htmx</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										<code style={tableCodeStyle}>
											string
										</code>
									</animated.td>
									<animated.td
										style={tableCellStyle(themeSprings)}
									>
										Path to the HTMX template file
									</animated.td>
								</tr>
							</tbody>
						</animated.table>
					</div>
					<PrismPlus
						codeString={htmxHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
