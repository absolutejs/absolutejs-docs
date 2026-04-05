import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	angularHandler,
	reactHandler,
	svelteHandler,
	vueHandler,
	htmlHandler,
	htmxHandler
} from '../../../data/documentation/pageHandlersDocsCode';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { HandlerBehaviorCards } from './HandlerBehaviorCards';
import { ParamsTable } from './ParamsTable';

const tocItems: TocItem[] = [
	{ href: '#handler-behavior', label: 'Handler Behavior' },
	{ href: '#handlereactpagerequest', label: 'React Handler' },
	{ href: '#handleangularpagerequest', label: 'Angular Handler' },
	{ href: '#handlesveltepagerequest', label: 'Svelte Handler' },
	{ href: '#handlevuepagerequest', label: 'Vue Handler' },
	{ href: '#handlehtmlpagerequest', label: 'HTML Handler' },
	{ href: '#handlehtmxpagerequest', label: 'HTMX Handler' }
];

type HandlerParam = {
	description: string;
	param: string;
	type: string;
};

const reactParams: HandlerParam[] = [
	{
		description: 'Your React page component from the pages directory',
		param: 'pageComponent',
		type: 'React.ComponentType<Props>'
	},
	{
		description: 'Path to the hydration script from asset(manifest, key)',
		param: 'index',
		type: 'string'
	},
	{
		description:
			'Type-safe props matching the component requirements (optional)',
		param: 'props',
		type: 'Props'
	}
];

const angularParams: HandlerParam[] = [
	{
		description: 'Async function that imports the Angular page factory',
		param: 'importer',
		type: '() => Promise<{ factory: AngularPageFactory<Props> }>'
	},
	{
		description: 'Path to compiled Angular page for SSR',
		param: 'pagePath',
		type: 'string'
	},
	{
		description: 'Path to hydration script from asset(manifest, key)',
		param: 'indexPath',
		type: 'string'
	},
	{
		description: 'Custom head element (use generateHeadElement helper)',
		param: 'headTag',
		type: '`<head>...</head>`'
	},
	{
		description: 'Type-safe props (optional if component has no props)',
		param: 'props',
		type: 'Props'
	}
];

const svelteParams: HandlerParam[] = [
	{
		description: 'Raw Svelte component (used only for type inference)',
		param: 'PageComponent',
		type: 'SvelteComponent<Props>'
	},
	{
		description: 'Path to compiled Svelte page for SSR',
		param: 'pagePath',
		type: 'string'
	},
	{
		description: 'Path to hydration script from asset(manifest, key)',
		param: 'indexPath',
		type: 'string'
	},
	{
		description: 'Type-safe props (optional if component has no props)',
		param: 'props',
		type: 'Props'
	}
];

const vueParams: HandlerParam[] = [
	{
		description: 'Raw Vue component (used only for type inference)',
		param: '_PageComponent',
		type: 'VueComponent<Props>'
	},
	{
		description: 'Path to compiled Vue page for SSR',
		param: 'pagePath',
		type: 'string'
	},
	{
		description: 'Path to hydration script from asset(manifest, key)',
		param: 'indexPath',
		type: 'string'
	},
	{
		description: 'Custom head element (use generateHeadElement helper)',
		param: 'headTag',
		type: '`<head>...</head>`'
	},
	{
		description: 'Type-safe props (optional if component has no props)',
		param: 'props',
		type: 'Props'
	}
];

const htmlParams: HandlerParam[] = [
	{
		description: 'Path to the HTML file',
		param: 'html',
		type: 'string'
	}
];

const htmxParams: HandlerParam[] = [
	{
		description: 'Path to the HTMX template file',
		param: 'htmx',
		type: 'string'
	}
];

export const PageHandlersView = ({
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
					<h1 id="page-handlers" style={h1Style(isMobileOrTablet)}>
						Page Handlers
					</h1>
					<p style={paragraphLargeStyle}>
						Specialized handler functions for server-side rendering
						with different frontend frameworks. All handlers provide
						complete type safety from server to client.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handler-behavior"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handler Behavior
					</AnchorHeading>
					<HandlerBehaviorCards themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						All handlers work seamlessly with Elysia's routing
						system and return properly formatted responses.
						Framework handlers require the manifest from{' '}
						<code style={tableCodeStyle}>prepare()</code>. Always
						use{' '}
						<code style={tableCodeStyle}>asset(manifest, key)</code>{' '}
						to look up script paths: it will throw if the artifact
						doesn't exist.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handlereactpagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleReactPageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for React pages. The
						component is rendered to HTML with createElement, then
						hydrated on the client with the provided index script.
					</p>
					<ParamsTable
						params={reactParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={reactHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handleangularpagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleAngularPageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Angular pages. Uses a
						factory importer pattern for lazy loading Angular
						components.
					</p>
					<ParamsTable
						params={angularParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={angularHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handlesveltepagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleSveltePageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Svelte pages. The
						component parameter is only used for type inference: the
						actual rendering uses the compiled page at pagePath.
					</p>
					<ParamsTable
						params={svelteParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={svelteHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handlevuepagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleVuePageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Vue pages. Vue
						components cannot include page elements like head, so
						you pass a headTag parameter (use generateHeadElement
						helper for convenience).
					</p>
					<ParamsTable
						params={vueParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={vueHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handlehtmlpagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleHTMLPageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Serves static HTML files directly. The file still goes
						through the build process to update resource paths to
						their bundled versions.
					</p>
					<ParamsTable
						params={htmlParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={htmlHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handlehtmxpagerequest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						handleHTMXPageRequest
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Serves HTMX template files. Like HTML handler, files go
						through the build process for path updates.
					</p>
					<ParamsTable
						params={htmxParams}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={htmxHandler}
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
