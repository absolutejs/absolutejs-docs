import { CodeBlock } from '../../utils/CodeBlock';
import { pageHandlersDocsCode } from '../../../data/pageHandlersDocsCode';
import { h1Style, sectionStyle, headingStyle, paragraphLargeStyle, paragraphSpacedStyle, paragraphStyle, strongStyle, listStyle, listItemStyle, codeWrapperStyle, mainContentStyle } from '../../../styles/docsStyles';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const reactHandler = await CodeBlock({ code: pageHandlersDocsCode.reactHandler });
const svelteHandler = await CodeBlock({ code: pageHandlersDocsCode.svelteHandler });
const vueHandler = await CodeBlock({ code: pageHandlersDocsCode.vueHandler });
const htmlHandler = await CodeBlock({ code: pageHandlersDocsCode.htmlHandler });
const htmxHandler = await CodeBlock({ code: pageHandlersDocsCode.htmxHandler });
const generateHead = await CodeBlock({ code: pageHandlersDocsCode.generateHead });
const multipleFrameworks = await CodeBlock({ code: pageHandlersDocsCode.multipleFrameworks });
const propsExample = await CodeBlock({ code: pageHandlersDocsCode.propsExample });
const elysiaIntegration = await CodeBlock({ code: pageHandlersDocsCode.elysiaIntegration });

const tocItems: TocItem[] = [
	{ label: 'Overview', href: '#overview' },
	{ label: 'General Handler Behavior', href: '#general-handler-behavior' },
	{ label: 'Important Requirements', href: '#important-requirements' },
	{ label: 'handleReactPageRequest', href: '#handlereactpagerequest' },
	{ label: 'handleSveltePageRequest', href: '#handlesveltepagerequest' },
	{ label: 'handleVuePageRequest', href: '#handlevuepagerequest' },
	{ label: 'handleHTMLPageRequest', href: '#handlehtmlpagerequest' },
	{ label: 'handleHTMXPageRequest', href: '#handlehtmxpagerequest' },
	{ label: 'generateHeadElement', href: '#generateheadelement' },
	{ label: 'Props Serialization', href: '#props-serialization' },
	{ label: 'Using Multiple Frameworks', href: '#using-multiple-frameworks' },
	{ label: 'Elysia Integration', href: '#elysia-integration' },
	{ label: 'Key Takeaways', href: '#key-takeaways' }
];

export const PageHandlersView = () => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			position: 'relative',
			overflowX: 'hidden',
			overflowY: 'auto'
		}}
	>
		<link rel='stylesheet' href='https://esm.sh/@shikijs/twoslash@latest/style-rich.css' />
		
		{/* Main Content - Centered */}
		<div
			style={mainContentStyle}
		>
			<h1 style={h1Style} id="page-handlers">
				Page Handlers
			</h1>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="overview">
					Overview
				</h2>
			<p style={paragraphLargeStyle}>
				AbsoluteJS provides specialized handler functions for different frontend frameworks. These handlers work seamlessly with Elysia's routing system to perform server-side rendering for framework-based pages or serve static files directly.
			</p>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="general-handler-behavior">
					General Handler Behavior
				</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Framework handlers</strong> (React/Svelte/Vue) perform server-side rendering
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Static handlers</strong> (HTML/HTMX) serve pre-built files directly
				</li>
				<li style={listItemStyle}>
					All handlers are designed to work seamlessly with Elysia's routing system
				</li>
				<li style={listItemStyle}>
					Each handler returns a properly formatted response for the browser
				</li>
				<li style={listItemStyle}>
					Typically used with <code>.get()</code> routes for page rendering
				</li>
			</ul>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="important-requirements">
					Important Requirements
				</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Manifest requirement</strong>: Framework handlers (React, Svelte, Vue) require the manifest from <code>build()</code>
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Props serialization</strong>: Props passed to components must be simple data (strings, numbers, objects, arrays)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>No complex objects</strong>: Props cannot include functions, class instances, or complex objects
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Asset function</strong>: Always use with <code>asset(manifest, key)</code> to get correct paths
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Static handlers</strong>: HTML/HTMX handlers work without a manifest
				</li>
			</ul>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="handlereactpagerequest">
					handleReactPageRequest
				</h2>
			<p style={paragraphSpacedStyle}>
				Handles server-side rendering for React pages.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>handleReactPageRequest(Component: ReactComponent, assetPath: string, props?: object)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Component</strong>: Your React component
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>assetPath</strong>: Asset path from <code>asset(manifest, key)</code>
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>props</strong>: Props to pass to the component (optional)
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: reactHandler }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="handlesveltepagerequest">
					handleSveltePageRequest
				</h2>
			<p style={paragraphSpacedStyle}>
				Handles server-side rendering for Svelte pages.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>handleSveltePageRequest(Component: SvelteComponent, componentAsset: string, indexAsset: string, props?: object)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Component</strong>: Your Svelte component
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>componentAsset</strong>: Asset path for the component
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>indexAsset</strong>: Asset path for the index file
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>props</strong>: Props to pass to the component (optional)
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: svelteHandler }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="handlevuepagerequest">
					handleVuePageRequest
				</h2>
			<p style={paragraphSpacedStyle}>
				Handles server-side rendering for Vue pages.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>handleVuePageRequest(Component: VueComponent, componentAsset: string, indexAsset: string, headElement: HeadElement, props?: object)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Component</strong>: Your Vue component
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>componentAsset</strong>: Asset path for the component
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>indexAsset</strong>: Asset path for the index file
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>headElement</strong>: Generated head element from <code>generateHeadElement()</code>
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>props</strong>: Props to pass to the component (optional)
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: vueHandler }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="handlehtmlpagerequest">
					handleHTMLPageRequest
				</h2>
			<p style={paragraphSpacedStyle}>
				Serves static HTML files.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>handleHTMLPageRequest(path: string)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>path</strong>: Path to the HTML file
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: htmlHandler }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="handlehtmxpagerequest">
					handleHTMXPageRequest
				</h2>
			<p style={paragraphSpacedStyle}>
				Serves HTMX template files.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>handleHTMXPageRequest(path: string)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>path</strong>: Path to the HTMX template file
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: htmxHandler }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="generateheadelement">
					generateHeadElement
				</h2>
			<p style={paragraphSpacedStyle}>
				Helper function for generating HTML head elements for Vue pages.
			</p>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Signature:</strong>
			</p>
			<pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
				<code>generateHeadElement(&#123; cssPath?: string, title?: string, description?: string &#125;)</code>
			</pre>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>cssPath</strong>: Path to CSS file (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>title</strong>: Page title (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>description</strong>: Page description (optional)
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: generateHead }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="props-serialization">
					Props Serialization
				</h2>
			<p style={paragraphSpacedStyle}>
				Props passed to components must be JSON-serializable. Only simple data types are allowed:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: propsExample }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="using-multiple-frameworks">
					Using Multiple Frameworks
				</h2>
			<p style={paragraphSpacedStyle}>
				You can serve different frameworks on different routes within the same application:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: multipleFrameworks }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="elysia-integration">
					Elysia Integration
				</h2>
			<p style={paragraphSpacedStyle}>
				Handlers work seamlessly with Elysia's built-in features like route params, cookies, and query parameters:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: elysiaIntegration }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="key-takeaways">
					Key Takeaways
				</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					Framework handlers require the manifest from <code>build()</code>
				</li>
				<li style={listItemStyle}>
					Always use <code>asset(manifest, key)</code> to get correct file paths
				</li>
				<li style={listItemStyle}>
					Props must be JSON-serializable (no functions, class instances, etc.)
				</li>
				<li style={listItemStyle}>
					Each framework handler has slightly different signature requirements
				</li>
				<li style={listItemStyle}>
					You can mix multiple frameworks in the same application
				</li>
				<li style={listItemStyle}>
					Static handlers (HTML/HTMX) don't require a manifest
				</li>
			</ul>
			</section>
		</div>

		<TableOfContents items={tocItems} />
	</div>
);
