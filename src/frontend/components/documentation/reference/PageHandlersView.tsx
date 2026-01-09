import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	reactHandler,
	svelteHandler,
	vueHandler,
	htmlHandler,
	htmxHandler,
	generateHead
} from '../../../data/documentation/pageHandlersDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	headingStyle,
	paragraphLargeStyle,
	listStyle,
	listItemStyle,
	paragraphStyle,
	strongStyle,
	paragraphSpacedStyle
} from '../../../styles/docsStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#general-handler-behavior', label: 'General Handler Behavior' },
	{ href: '#important-requirements', label: 'Important Requirements' },
	{ href: '#handlereactpagerequest', label: 'handleReactPageRequest' },
	{ href: '#handlesveltepagerequest', label: 'handleSveltePageRequest' },
	{ href: '#handlevuepagerequest', label: 'handleVuePageRequest' },
	{ href: '#handlehtmlpagerequest', label: 'handleHTMLPageRequest' },
	{ href: '#handlehtmxpagerequest', label: 'handleHTMXPageRequest' },
	{ href: '#generateheadelement', label: 'generateHeadElement' }
];

export const PageHandlersView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

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
			{/* Main Content - Centered */}
			<div style={mainContentStyle}>
				<h1 style={h1Style} id="page-handlers">
					Page Handlers
				</h1>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="overview"
					>
						Overview
					</animated.h2>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides specialized handler functions for
						different frontend frameworks. These handlers work
						seamlessly with Elysia's routing system to perform
						server-side rendering for framework-based pages or serve
						static files directly.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="general-handler-behavior"
					>
						General Handler Behavior
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Framework handlers (React/Svelte/Vue) perform
							server-side rendering
						</li>
						<li style={listItemStyle}>
							Static handlers (HTML/HTMX) serve pre-built files
							directly
						</li>
						<li style={listItemStyle}>
							All handlers are designed to work seamlessly with
							Elysia's routing system
						</li>
						<li style={listItemStyle}>
							Each handler returns a properly formatted response
							for the browser
						</li>
						<li style={listItemStyle}>
							Typically used with .get() routes for page rendering
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="important-requirements"
					>
						Important Requirements
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Framework handlers (React, Svelte, Vue) require the
							manifest from build()
						</li>
						<li style={listItemStyle}>
							Props passed to components can be any valid
							JavaScript object or function
						</li>
						<li style={listItemStyle}>
							Always use with asset(manifest, key) to get correct
							paths
						</li>
						<li style={listItemStyle}>
							HTML/HTMX handlers work without a manifest
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handlereactpagerequest"
					>
						handleReactPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for React pages.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`handleReactPageRequest<Props extends Record<string, unknown> = Record<never, never>>(
  pageComponent: ReactComponent<Props>,
  index: string,
  ...props: keyof Props extends never ? [] : [props: Props]
): Promise<Response>`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							pageComponent: Your React component
						</li>
						<li style={listItemStyle}>
							index: The index path used to hydrate the page with
							JavaScript
						</li>
						<li style={listItemStyle}>
							props: Props to pass to the component (optional)
						</li>
					</ul>
					<PrismPlus
						codeString={reactHandler}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handlesveltepagerequest"
					>
						handleSveltePageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Svelte pages.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`handleSveltePageRequest<P extends Record<string, unknown>>(
  PageComponent: SvelteComponent<P>,
  pagePath: string,
  indexPath: string,
  props: P
): Promise<Response>`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							PageComponent: The raw Svelte component (used only
							for type inference to ensure props have the correct
							type)
						</li>
						<li style={listItemStyle}>
							pagePath: The path to the compiled Svelte page that
							will be imported and used
						</li>
						<li style={listItemStyle}>
							indexPath: The index path used to hydrate the page
							with JavaScript
						</li>
						<li style={listItemStyle}>
							props: Props to pass to the component
						</li>
					</ul>
					<PrismPlus
						codeString={svelteHandler}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handlevuepagerequest"
					>
						handleVuePageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handles server-side rendering for Vue pages.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`handleVuePageRequest<Props extends Record<string, unknown> = Record<never, never>>(
  _PageComponent: VueComponent<Props>,
  pagePath: string,
  indexPath: string,
  headTag?: \`<head>\${string}</head>\`,
  ...props: keyof Props extends never ? [] : [props: Props]
): Promise<Response>`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							_PageComponent: The raw Vue component (used only for
							type inference to ensure props have the correct
							type)
						</li>
						<li style={listItemStyle}>
							pagePath: The path to the compiled Vue page that
							will be imported and used
						</li>
						<li style={listItemStyle}>
							indexPath: The index path used to hydrate the page
							with JavaScript
						</li>
						<li style={listItemStyle}>
							headTag: Vue components cannot include page elements
							like the head, so we create it inside the handler
							and attach the head component you pass. You have the
							option to use generateHeadElement() so you don't
							have to write the whole thing manually (optional)
						</li>
						<li style={listItemStyle}>
							props: Props to pass to the component (optional)
						</li>
					</ul>
					<PrismPlus
						codeString={vueHandler}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handlehtmlpagerequest"
					>
						handleHTMLPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Serves static HTML files.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`handleHTMLPageRequest(path: string)`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							path: Path to the HTML file
						</li>
					</ul>
					<PrismPlus
						codeString={htmlHandler}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handlehtmxpagerequest"
					>
						handleHTMXPageRequest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Serves HTMX template files.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`handleHTMXPageRequest(path: string)`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							path: Path to the HTMX template file
						</li>
					</ul>
					<PrismPlus
						codeString={htmxHandler}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="generateheadelement"
					>
						generateHeadElement
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Helper function for generating HTML head elements for
						Vue pages.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Signature:</strong>
					</p>
					<PrismPlus
						codeString={`generateHeadElement({ cssPath?: string, title?: string, description?: string })`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							cssPath: Path to CSS file (optional)
						</li>
						<li style={listItemStyle}>
							title: Page title (optional)
						</li>
						<li style={listItemStyle}>
							description: Page description (optional)
						</li>
					</ul>
					<PrismPlus
						codeString={generateHead}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
