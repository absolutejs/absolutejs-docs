import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { basicBuild, allOptions, assetFunction, frameworkBuild, htmlOnlyBuild, fullExample } from '../../../data/apiBuildDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { mainContentStyle, h1Style, sectionStyle, headingStyle, paragraphLargeStyle, paragraphSpacedStyle, listStyle, listItemStyle, strongStyle, paragraphStyle } from '../../../styles/docsStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#basic-usage', label: 'Basic Usage' },
	{ href: '#configuration-options', label: 'Configuration Options' },
	{ href: '#return-value', label: 'Return Value' },
	{ href: '#html-htmx-build', label: 'HTML/HTMX Build' },
	{ href: '#framework-build-with-manifest', label: 'Framework Build with Manifest' },
	{ href: '#the-asset-function', label: 'The asset() Function' },
	{ href: '#complete-example', label: 'Complete Example' },
	{ href: '#important-notes', label: 'Important Notes' }
];

export const APIBuildView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex', flex: 1, overflowX: 'hidden', overflowY: 'auto', position: 'relative'
			}}
		>
			<div
				style={mainContentStyle}
			>
				<h1 style={h1Style} id="api-build">
					API: build()
				</h1>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="overview">
						Overview
					</animated.h2>
					<p style={paragraphLargeStyle}>
						The <code>build()</code> function is the core API for building your AbsoluteJS application. It compiles and optimizes all frontend code automatically, processes Tailwind CSS if configured, and generates a manifest for framework-based applications.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="basic-usage">
						Basic Usage
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The <code>build()</code> function accepts a configuration object with paths to your source directories and build output:
					</p>
					<PrismPlus codeString={basicBuild} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="configuration-options">
						Configuration Options
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						All available configuration options:
					</p>
					<PrismPlus codeString={allOptions} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
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
					<animated.h2 style={headingStyle(themeSprings)} id="return-value">
						Return Value
					</animated.h2>
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
					<animated.h2 style={headingStyle(themeSprings)} id="html-htmx-build">
						HTML/HTMX Build
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						When using only HTML/HTMX without frameworks, the build completes but doesn't return a manifest:
					</p>
					<PrismPlus codeString={htmlOnlyBuild} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="framework-build-with-manifest">
						Framework Build with Manifest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						When using frameworks, store the returned manifest for use in your page handlers:
					</p>
					<PrismPlus codeString={frameworkBuild} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="the-asset-function">
						The asset() Function
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The <code>asset()</code> helper function works alongside <code>build()</code> to retrieve correct file paths from the manifest:
					</p>
					<PrismPlus codeString={assetFunction} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
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
					<animated.h2 style={headingStyle(themeSprings)} id="complete-example">
						Complete Example
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Here's a full example showing how to build your app and use the manifest in page handlers:
					</p>
					<PrismPlus codeString={fullExample} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<animated.h2 style={headingStyle(themeSprings)} id="important-notes">
						Important Notes
					</animated.h2>
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

			{!isMobile && <TableOfContents themeSprings={themeSprings} items={tocItems} />}
		</div>
	)
}
