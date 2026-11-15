import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	fontsBuildOutput,
	fontsConfig,
	fontsCssUsage,
	fontsFallbackFace,
	fontsGeneratedVariables,
	fontsHeadTags,
	fontsPreloadOptions,
	fontsReactPage,
	fontsReactRoute,
	fontsVueRoute
} from '../../../data/documentation/fontsDocsCode';
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
	{ href: '#configure', label: 'Configure' },
	{ href: '#options', label: 'Options' },
	{ href: '#in-a-page', label: 'Fonts in a Page' },
	{ href: '#preloads', label: 'Preloads' },
	{ href: '#in-css', label: 'In CSS' },
	{ href: '#fallback-metrics', label: 'Fallback Metrics' },
	{ href: '#caching', label: 'Caching & Serving' }
];

const familyOptionRows: DocsTableCell[][] = [
	[{ code: 'family' }, 'required', "Family name, such as 'Open Sans'."],
	[
		{ code: 'weights' },
		{ code: '[400]' },
		"Google Fonts weights, or one variable range such as '100..900'."
	],
	[{ code: 'styles' }, { code: "['normal']" }, "'normal' and/or 'italic'."],
	[
		{ code: 'subsets' },
		{ code: "['latin']" },
		"Google Fonts subsets to keep, such as 'latin-ext' or 'cyrillic'. Others are dropped."
	],
	[
		{ code: 'src' },
		'none',
		'Local .woff2, .woff, .ttf or .otf files, relative to the project root, each with an optional weight and style. The family is copied from these instead of downloaded.'
	],
	[{ code: 'display' }, 'top-level display', 'font-display for this family.'],
	[
		{ code: 'preload' },
		{ code: 'true' },
		'true preloads the first weight and style in the latin subset. false preloads nothing. A list picks faces.'
	],
	[
		{ code: 'fallback' },
		'inferred',
		"'sans-serif' (Arial), 'serif' (Times New Roman) or 'monospace' (Courier New). Names containing Mono infer monospace, Serif infers serif."
	],
	[
		{ code: 'adjustFallback' },
		{ code: 'true' },
		'Generate the metric-matched fallback face.'
	],
	[
		{ code: 'variable' },
		{ code: '--font-<family-kebab>' },
		'CSS custom property name.'
	],
	[
		{ code: 'className' },
		{ code: 'font-<family-kebab>' },
		'Class that applies the family.'
	]
];

const topLevelOptionRows: DocsTableCell[][] = [
	[{ code: 'families' }, 'required', 'The families to build.'],
	[{ code: 'display' }, { code: "'swap'" }, 'Default font-display.'],
	[
		{ code: 'fallbackToRemote' },
		{ code: 'false' },
		'When a download fails, link the Google Fonts stylesheet at runtime instead of failing the build.'
	],
	[
		{ code: 'cacheDirectory' },
		{ code: '.absolutejs/cache/fonts' },
		'Where downloads are kept between builds.'
	],
	[
		{ code: 'injectHtml' },
		{ code: 'true' },
		'Add the preloads and stylesheet to the head of HTML and HTMX pages.'
	]
];

const BuildStepsList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Downloads the Google Fonts stylesheet and the woff2 files it names, or copies your local font files.',
				term: 'Fetch'
			},
			{
				description:
					'Writes the files to <build>/assets/fonts/ with content-hashed names.',
				term: 'Self-host'
			},
			{
				description:
					'Writes one linked stylesheet with the @font-face rules, using font-display: swap by default.',
				term: 'Stylesheet'
			},
			{
				description:
					'Adds a metric-matched fallback face per family, so text does not shift when the web font arrives.',
				term: 'Fallback'
			},
			{
				description: 'Defines a CSS variable and a class per family.',
				term: 'Variables'
			},
			{
				description: 'Records preloads for the critical faces only.',
				term: 'Preload'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const FontsView = ({
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
					<h1 id="fonts" style={h1Style(isMobileOrTablet)}>
						Fonts
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS can self-host your web fonts at build time.
						Add a <code>fonts</code> block to{' '}
						<code>absolute.config.ts</code> and your pages load
						fonts from your own origin, with preloads and a fallback
						face that keeps the layout still while they load. Pages
						no longer contact <code>fonts.googleapis.com</code> or{' '}
						<code>fonts.gstatic.com</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="configure"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configure
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						List each family. Give a Google Fonts family its weights
						and styles, or point <code>src</code> at font files in
						your project.
					</p>
					<PrismPlus
						codeString={fontsConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>On each build:</p>
					<BuildStepsList themeSprings={themeSprings} />
					<PrismPlus
						codeString={fontsBuildOutput}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>Per family:</p>
					<DocsTable
						columns={['Option', 'Default', 'Meaning']}
						rows={familyOptionRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						On the <code>fonts</code> block:
					</p>
					<DocsTable
						columns={['Option', 'Default', 'Meaning']}
						rows={topLevelOptionRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="in-a-page"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fonts in a Page
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build records the font stylesheet and preloads in
						the manifest. <code>fontAssets(manifest)</code> returns
						them as plain data, which is safe to pass as a page
						prop. It is empty when no fonts are configured.
					</p>
					<p style={paragraphSpacedStyle}>
						For React, pass it from the route to the page and on to
						the <code>fonts</code> prop of <code>Head</code>.
						Svelte&apos;s <code>Head</code> component takes the same{' '}
						<code>fonts</code> prop.
					</p>
					<PrismPlus
						codeString={fontsReactRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={fontsReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For Vue and Angular, pass it to{' '}
						<code>generateHeadElement</code>:
					</p>
					<PrismPlus
						codeString={fontsVueRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						HTML and HTMX pages need nothing. The build adds the
						tags to the <code>&lt;head&gt;</code> of every page,
						including <code>error.html</code> and{' '}
						<code>not-found.html</code>, ahead of the page&apos;s
						own stylesheets. Set <code>injectHtml: false</code> to
						add them yourself.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="preloads"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Preloads
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The head gets a{' '}
						<code>
							&lt;link rel=&quot;preload&quot;
							as=&quot;font&quot;&gt;
						</code>{' '}
						for each critical face, then the font stylesheet:
					</p>
					<PrismPlus
						codeString={fontsHeadTags}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						By default only the first weight and style of each
						family is preloaded. Use <code>preload</code> to pick
						other faces or none:
					</p>
					<PrismPlus
						codeString={fontsPreloadOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Nothing is inlined, so a strict <code>style-src</code>{' '}
						under <code>secureHeaders()</code> needs no nonce for
						fonts, and the default policy already allows them. A
						family that falls back to the remote Google Fonts
						stylesheet (<code>fallbackToRemote</code>) loads from
						another origin, which the default policy blocks.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="in-css"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In CSS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each family gets a variable and a class in the font
						stylesheet:
					</p>
					<PrismPlus
						codeString={fontsGeneratedVariables}
						language="css"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Use the class in markup, as in{' '}
						<code>className=&quot;font-poppins&quot;</code> above,
						or the variable in your own CSS:
					</p>
					<PrismPlus
						codeString={fontsCssUsage}
						language="css"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						With Tailwind v4, the <code>--font-poppins</code>{' '}
						variable also matches the <code>font-poppins</code>{' '}
						utility.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fallback-metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fallback Metrics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						While the web font loads, the browser draws text in the
						fallback. If the fallback is wider or taller, the page
						shifts when the web font arrives. For each family the
						build reads the font file and writes a fallback face
						over a local system font:
					</p>
					<PrismPlus
						codeString={fontsFallbackFace}
						language="css"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>size-adjust</code> matches the average width of
						English text, and the overrides match the font&apos;s
						ascent, descent and line gap. The metrics come from the
						preloaded face, or the first latin face. Set{' '}
						<code>adjustFallback: false</code> to skip it.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="caching"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Caching &amp; Serving
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Downloads are cached under{' '}
						<code>.absolutejs/cache/fonts</code>, so later builds
						reuse them and work offline. If a family isn&apos;t
						cached and the download fails, the build stops with an
						error naming the family and the reason. With{' '}
						<code>fallbackToRemote: true</code> it warns instead and
						links the Google Fonts stylesheet for that family. The
						variable and class still work, without a fallback face
						or preload.
					</p>
					<p style={paragraphSpacedStyle}>
						Font files and the font stylesheet have content-hashed
						names, so the production server sends them with{' '}
						<code>
							Cache-Control: public, max-age=31536000, immutable
						</code>
						. A changed font gets a new name, and a new build
						removes the old files.
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
