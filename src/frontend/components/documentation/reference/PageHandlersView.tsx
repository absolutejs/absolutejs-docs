import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { reactHandler, svelteHandler, vueHandler, htmlHandler, htmxHandler, generateHead, multipleFrameworks, propsExample, elysiaIntegration } from '../../../data/pageHandlersDocsCode';
import * as styles from '../../../styles/docsStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

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
				display: 'flex', flex: 1, overflowX: 'hidden', overflowY: 'auto', position: 'relative'
			}}
		>

			{/* Main Content - Centered */}
			<div
				style={styles.mainContentStyle}
			>
				<h1 style={styles.h1Style} id="page-handlers">
					Page Handlers
				</h1>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="overview">
						Overview
					</animated.h2>
					<p style={styles.paragraphLargeStyle}>
						AbsoluteJS provides specialized handler functions for different frontend frameworks. These handlers work seamlessly with Elysia's routing system to perform server-side rendering for framework-based pages or serve static files directly.
					</p>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="general-handler-behavior">
						General Handler Behavior
					</animated.h2>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Framework handlers</strong> (React/Svelte/Vue) perform server-side rendering
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Static handlers</strong> (HTML/HTMX) serve pre-built files directly
						</li>
						<li style={styles.listItemStyle}>
							All handlers are designed to work seamlessly with Elysia's routing system
						</li>
						<li style={styles.listItemStyle}>
							Each handler returns a properly formatted response for the browser
						</li>
						<li style={styles.listItemStyle}>
							Typically used with <code>.get()</code> routes for page rendering
						</li>
					</ul>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="important-requirements">
						Important Requirements
					</animated.h2>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Manifest requirement</strong>: Framework handlers (React, Svelte, Vue) require the manifest from <code>build()</code>
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Props serialization</strong>: Props passed to components must be simple data (strings, numbers, objects, arrays)
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>No complex objects</strong>: Props cannot include functions, class instances, or complex objects
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Asset function</strong>: Always use with <code>asset(manifest, key)</code> to get correct paths
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Static handlers</strong>: HTML/HTMX handlers work without a manifest
						</li>
					</ul>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="handlereactpagerequest">
						handleReactPageRequest
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Handles server-side rendering for React pages.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`handleReactPageRequest(Component: ReactComponent, assetPath: string, props?: object)`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Component</strong>: Your React component
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>assetPath</strong>: Asset path from <code>asset(manifest, key)</code>
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>props</strong>: Props to pass to the component (optional)
						</li>
					</ul>
					<PrismPlus codeString={reactHandler} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="handlesveltepagerequest">
						handleSveltePageRequest
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Handles server-side rendering for Svelte pages.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`handleSveltePageRequest(Component: SvelteComponent, componentAsset: string, indexAsset: string, props?: object)`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Component</strong>: Your Svelte component
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>componentAsset</strong>: Asset path for the component
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>indexAsset</strong>: Asset path for the index file
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>props</strong>: Props to pass to the component (optional)
						</li>
					</ul>
					<PrismPlus codeString={svelteHandler} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="handlevuepagerequest">
						handleVuePageRequest
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Handles server-side rendering for Vue pages.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`handleVuePageRequest(Component: VueComponent, componentAsset: string, indexAsset: string, headElement: HeadElement, props?: object)`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>Component</strong>: Your Vue component
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>componentAsset</strong>: Asset path for the component
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>indexAsset</strong>: Asset path for the index file
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>headElement</strong>: Generated head element from <code>generateHeadElement()</code>
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>props</strong>: Props to pass to the component (optional)
						</li>
					</ul>
					<PrismPlus codeString={vueHandler} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="handlehtmlpagerequest">
						handleHTMLPageRequest
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Serves static HTML files.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`handleHTMLPageRequest(path: string)`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>path</strong>: Path to the HTML file
						</li>
					</ul>
					<PrismPlus codeString={htmlHandler} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="handlehtmxpagerequest">
						handleHTMXPageRequest
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Serves HTMX template files.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`handleHTMXPageRequest(path: string)`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>path</strong>: Path to the HTMX template file
						</li>
					</ul>
					<PrismPlus codeString={htmxHandler} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="generateheadelement">
						generateHeadElement
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Helper function for generating HTML head elements for Vue pages.
					</p>
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Signature:</strong>
					</p>
					<PrismPlus codeString={`generateHeadElement({ cssPath?: string, title?: string, description?: string })`} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
					<p style={styles.paragraphStyle}>
						<strong style={styles.strongStyle}>Parameters:</strong>
					</p>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>cssPath</strong>: Path to CSS file (optional)
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>title</strong>: Page title (optional)
						</li>
						<li style={styles.listItemStyle}>
							<strong style={styles.strongStyle}>description</strong>: Page description (optional)
						</li>
					</ul>
					<PrismPlus codeString={generateHead} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="props-serialization">
						Props Serialization
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Props passed to components must be JSON-serializable. Only simple data types are allowed:
					</p>
					<PrismPlus codeString={propsExample} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="using-multiple-frameworks">
						Using Multiple Frameworks
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						You can serve different frameworks on different routes within the same application:
					</p>
					<PrismPlus codeString={multipleFrameworks} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="elysia-integration">
						Elysia Integration
					</animated.h2>
					<p style={styles.paragraphSpacedStyle}>
						Handlers work seamlessly with Elysia's built-in features like route params, cookies, and query parameters:
					</p>
					<PrismPlus codeString={elysiaIntegration} showLineNumbers={false} language="typescript" themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="key-takeaways">
						Key Takeaways
					</animated.h2>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}>
							Framework handlers require the manifest from <code>build()</code>
						</li>
						<li style={styles.listItemStyle}>
							Always use <code>asset(manifest, key)</code> to get correct file paths
						</li>
						<li style={styles.listItemStyle}>
							Props must be JSON-serializable (no functions, class instances, etc.)
						</li>
						<li style={styles.listItemStyle}>
							Each framework handler has slightly different signature requirements
						</li>
						<li style={styles.listItemStyle}>
							You can mix multiple frameworks in the same application
						</li>
						<li style={styles.listItemStyle}>
							Static handlers (HTML/HTMX) don't require a manifest
						</li>
					</ul>
				</section>
			</div>

			{!isMobile && <TableOfContents themeSprings={themeSprings} items={tocItems} />}
		</div>
	)
};
