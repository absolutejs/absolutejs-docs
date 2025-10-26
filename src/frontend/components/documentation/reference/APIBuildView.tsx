import { CodeBlock } from '../../utils/CodeBlock';
import { apiBuildDocsCode } from '../../../data/apiBuildDocsCode';
import { h1Style, sectionStyle, headingStyle, paragraphLargeStyle, paragraphSpacedStyle, paragraphStyle, strongStyle, listStyle, listItemStyle, codeWrapperStyle, mainContentStyle } from '../../../styles/docsStyles';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const basicBuild = await CodeBlock({ code: apiBuildDocsCode.basicBuild });
const htmlOnlyBuild = await CodeBlock({ code: apiBuildDocsCode.htmlOnlyBuild });
const frameworkBuild = await CodeBlock({ code: apiBuildDocsCode.frameworkBuild });
const assetFunction = await CodeBlock({ code: apiBuildDocsCode.assetFunction });
const fullExample = await CodeBlock({ code: apiBuildDocsCode.fullExample });
const allOptions = await CodeBlock({ code: apiBuildDocsCode.allOptions });

const tocItems: TocItem[] = [
	{ label: 'Overview', href: '#overview' },
	{ label: 'Basic Usage', href: '#basic-usage' },
	{ label: 'Configuration Options', href: '#configuration-options' },
	{ label: 'Return Value', href: '#return-value' },
	{ label: 'HTML/HTMX Build', href: '#html-htmx-build' },
	{ label: 'Framework Build with Manifest', href: '#framework-build-with-manifest' },
	{ label: 'The asset() Function', href: '#the-asset-function' },
	{ label: 'Complete Example', href: '#complete-example' },
	{ label: 'Important Notes', href: '#important-notes' }
];

export const APIBuildView = () => (
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
			<h1 style={h1Style} id="api-build">
				API: build()
			</h1>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="overview">
					Overview
				</h2>
			<p style={paragraphLargeStyle}>
				The <code>build()</code> function is the core API for building your AbsoluteJS application. It compiles and optimizes all frontend code automatically, processes Tailwind CSS if configured, and generates a manifest for framework-based applications.
			</p>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="basic-usage">
					Basic Usage
				</h2>
			<p style={paragraphSpacedStyle}>
				The <code>build()</code> function accepts a configuration object with paths to your source directories and build output:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: basicBuild }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="configuration-options">
					Configuration Options
				</h2>
			<p style={paragraphSpacedStyle}>
				All available configuration options:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: allOptions }} />
			</div>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>assetsDirectory</strong>: Path to your static assets folder (required)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>buildDirectory</strong>: Output directory for built files (required)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>reactDirectory</strong>: Path to React components (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>svelteDirectory</strong>: Path to Svelte components (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>vueDirectory</strong>: Path to Vue components (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>htmlDirectory</strong>: Path to static HTML files (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>htmxDirectory</strong>: Path to HTMX templates (optional)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>tailwind</strong>: Tailwind CSS configuration with <code>input</code> and <code>output</code> paths (optional)
				</li>
			</ul>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="return-value">
					Return Value
				</h2>
			<p style={paragraphStyle}>
				The <code>build()</code> function's return value depends on your frontend setup:
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Framework-based apps</strong> (React/Svelte/Vue): Returns a manifest object containing paths to compiled assets
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>HTML/HTMX only</strong>: Completes the build but does not return a manifest
				</li>
			</ul>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="html-htmx-build">
					HTML/HTMX Build
				</h2>
			<p style={paragraphSpacedStyle}>
				When using only HTML/HTMX without frameworks, the build completes but doesn't return a manifest:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: htmlOnlyBuild }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="framework-build-with-manifest">
					Framework Build with Manifest
				</h2>
			<p style={paragraphSpacedStyle}>
				When using frameworks, store the returned manifest for use in your page handlers:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: frameworkBuild }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="the-asset-function">
					The asset() Function
				</h2>
			<p style={paragraphSpacedStyle}>
				The <code>asset()</code> helper function works alongside <code>build()</code> to retrieve correct file paths from the manifest:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: assetFunction }} />
			</div>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Parameters:</strong>
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>manifest</strong>: The manifest object returned by <code>build()</code>
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>key</strong>: String identifier for the asset you want (e.g., 'HomeIndex')
				</li>
			</ul>
			<p style={paragraphStyle}>
				<strong style={strongStyle}>Returns:</strong> The path to the compiled asset as a string
			</p>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="complete-example">
					Complete Example
				</h2>
			<p style={paragraphSpacedStyle}>
				Here's a full example showing how to build your app and use the manifest in page handlers:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: fullExample }} />
			</div>
			</section>

			<section style={sectionStyle}>
				<h2 style={headingStyle} id="important-notes">
					Important Notes
				</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					The build process compiles and optimizes all frontend code automatically
				</li>
				<li style={listItemStyle}>
					Tailwind CSS is processed during the build if configured
				</li>
				<li style={listItemStyle}>
					The manifest must be stored and passed to page handlers when using frameworks
				</li>
				<li style={listItemStyle}>
					The <code>asset()</code> function is essential for framework-based pages to find their compiled files
				</li>
				<li style={listItemStyle}>
					When using only HTML/HTMX, <code>build()</code> completes but doesn't return a manifest
				</li>
			</ul>
			</section>
		</div>

		<TableOfContents items={tocItems} />
	</div>
);
