import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	reactHandler,
	svelteHandler,
	vueHandler,
	htmlHandler,
	htmxHandler,
	generateHead,
	multipleFrameworks,
	propsExample,
	elysiaIntegration
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
	{ href: '#generateheadelement', label: 'generateHeadElement' },
	{ href: '#props-serialization', label: 'Props Serialization' },
	{ href: '#using-multiple-frameworks', label: 'Using Multiple Frameworks' },
	{ href: '#elysia-integration', label: 'Elysia Integration' },
	{ href: '#key-takeaways', label: 'Key Takeaways' }
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
							Props passed to components must be simple data
							(strings, numbers, objects, arrays)
						</li>
						<li style={listItemStyle}>
							Props cannot include functions, class instances, or
							complex objects
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
						codeString={`handleReactPageRequest(Component: ReactComponent, assetPath: string, props?: object)`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Component: Your React component
						</li>
						<li style={listItemStyle}>
							assetPath: Asset path from asset(manifest, key)
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
						codeString={`handleSveltePageRequest(Component: SvelteComponent, componentAsset: string, indexAsset: string, props?: object)`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Component: Your Svelte component
						</li>
						<li style={listItemStyle}>
							componentAsset: Asset path for the component
						</li>
						<li style={listItemStyle}>
							indexAsset: Asset path for the index file
						</li>
						<li style={listItemStyle}>
							props: Props to pass to the component (optional)
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
						codeString={`handleVuePageRequest(Component: VueComponent, componentAsset: string, indexAsset: string, headElement: HeadElement, props?: object)`}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Parameters:</strong>
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Component: Your Vue component
						</li>
						<li style={listItemStyle}>
							componentAsset: Asset path for the component
						</li>
						<li style={listItemStyle}>
							indexAsset: Asset path for the index file
						</li>
						<li style={listItemStyle}>
							headElement: Generated head element from
							generateHeadElement()
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

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="props-serialization"
					>
						Props Serialization
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Props passed to components must be JSON-serializable.
						Only simple data types are allowed:
					</p>
					<PrismPlus
						codeString={propsExample}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="using-multiple-frameworks"
					>
						Using Multiple Frameworks
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						You can serve different frameworks on different routes
						within the same application:
					</p>
					<PrismPlus
						codeString={multipleFrameworks}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="elysia-integration"
					>
						Elysia Integration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handlers work seamlessly with Elysia's built-in features
						like route params, cookies, and query parameters:
					</p>
					<PrismPlus
						codeString={elysiaIntegration}
						showLineNumbers={false}
						language="typescript"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="key-takeaways"
					>
						Key Takeaways
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Framework handlers require the manifest from build()
						</li>
						<li style={listItemStyle}>
							Always use asset(manifest, key) to get correct file
							paths
						</li>
						<li style={listItemStyle}>
							Props must be JSON-serializable (no functions, class
							instances, etc.)
						</li>
						<li style={listItemStyle}>
							Each framework handler has slightly different
							signature requirements
						</li>
						<li style={listItemStyle}>
							You can mix multiple frameworks in the same
							application
						</li>
						<li style={listItemStyle}>
							Static handlers (HTML/HTMX) don't require a manifest
						</li>
					</ul>
				</section>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
