import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	htmlIncludesCycleError,
	htmlIncludesHandler,
	htmlIncludesLayout,
	htmlIncludesLayoutPage,
	htmlIncludesMissingError,
	htmlIncludesNestedLayout,
	htmlIncludesPartial,
	htmlIncludesStructure,
	htmlIncludesUnclosedError
} from '../../../data/documentation/htmlIncludesDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#partials', label: 'Partials' },
	{ href: '#layouts', label: 'Layouts and Slots' },
	{ href: '#nested-layouts', label: 'Nested Layouts' },
	{ href: '#pages', label: 'What Counts as a Page' },
	{ href: '#build-time', label: 'Build-Time Resolution' },
	{ href: '#errors', label: 'Errors' },
	{ href: '#dev-hmr', label: 'Dev HMR' }
];

export const HTMLIncludesView = ({
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
					<h1 id="html-includes" style={h1Style(isMobileOrTablet)}>
						Includes &amp; Layouts
					</h1>
					<p style={paragraphLargeStyle}>
						HTML and HTMX pages share markup through build-time
						includes. The build replaces each{' '}
						<code>{'<abs-include>'}</code> with the file it names,
						so the served page is plain HTML. There is no runtime
						cost and no expression language.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="partials"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Partials
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>{'<abs-include src="…" />'}</code> is replaced
						with the contents of the file in <code>src</code>. The
						path is relative to the file that contains the tag.
						Included files can include others. The paired form,{' '}
						<code>{'<abs-include src="…"></abs-include>'}</code>,
						works the same. <code>{'<abs-slot>'}</code> and{' '}
						<code>{'<template slot="…">'}</code> can be self-closing
						too, anywhere, including inside other includes.
					</p>
					<PrismPlus
						codeString={htmlIncludesPartial}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="layouts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Layouts and Slots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A layout marks where content goes with{' '}
						<code>{'<abs-slot>'}</code>. The default slot has no
						name. Other slots have a <code>name</code>. Whatever a
						slot contains is its fallback, used when the page
						doesn&apos;t fill it.
					</p>
					<PrismPlus
						codeString={htmlIncludesLayout}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A page fills the slots with the include&apos;s children.
						Put content for a named slot in{' '}
						<code>{'<template slot="name">'}</code>. Everything else
						goes to the default slot. Here the page sets the title,
						fills the main content, and keeps the default footer.
					</p>
					<PrismPlus
						codeString={htmlIncludesLayoutPage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={htmlIncludesHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="nested-layouts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Nested Layouts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A layout can include another layout and pass its own
						slots on. Put an <code>{'<abs-slot>'}</code> inside the
						content it gives the outer layout.
					</p>
					<PrismPlus
						codeString={htmlIncludesNestedLayout}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What Counts as a Page
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Only the <code>.html</code> files directly inside{' '}
						<code>pages/</code> are pages. They get a manifest entry
						and can be served with{' '}
						<code>handleHTMLPageRequest</code> or{' '}
						<code>handleHTMXPageRequest</code>. Keep partials and
						layouts in a sibling directory inside your HTML or HTMX
						directory. The dev server watches them, and they never
						become pages.
					</p>
					<PrismPlus
						codeString={htmlIncludesStructure}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-time"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build-Time Resolution
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build expands includes in each copied page before
						anything else processes it. Included markup gets
						everything a page&apos;s own markup gets:{' '}
						<code>{'<absolute-island>'}</code> tags are
						server-rendered and hydrated, stylesheet and script
						links get their hashed paths, and images are optimized.
					</p>
					<p style={paragraphSpacedStyle}>
						Stylesheet and script links are matched by file name, so
						a relative path in a partial works wherever the partial
						is included. Root-relative URLs such as{' '}
						<code>/assets/…</code> pass through unchanged, as they
						do in pages.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="errors"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Errors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An include cycle fails the build. The error names the
						file that includes itself and the whole include chain.
					</p>
					<PrismPlus
						codeString={htmlIncludesCycleError}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A missing file fails the build the same way.
					</p>
					<PrismPlus
						codeString={htmlIncludesMissingError}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						An <code>{'<abs-include>'}</code> or{' '}
						<code>{'<abs-slot>'}</code> that is never closed fails
						the build too. The error gives the file and line.
					</p>
					<PrismPlus
						codeString={htmlIncludesUnclosedError}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev-hmr"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dev HMR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In <code>absolute dev</code>, editing a page
						live-updates it. Editing a partial or a layout
						live-updates every open page that includes it, directly
						or through another include. Each tab gets its own page
						with its own slot content and the partial&apos;s new
						text, so two tabs on two pages that share a layout both
						stay correct.
					</p>
					<p style={paragraphSpacedStyle}>
						Text that a script changed on an element with an{' '}
						<code>id</code>, such as a counter, is kept across live
						updates. Text you edit in the markup always shows the
						new version.
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
