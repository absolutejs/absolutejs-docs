import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	reactBuild,
	reactHandler,
	reactHydration,
	reactIndexFile,
	reactPageComponent,
	reactPreserveFiles,
	reactStreaming
} from '../../../data/documentation/reactDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#page-components', label: 'Page Components' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#index-files', label: 'Index Files' },
	{ href: '#streaming', label: 'Streaming SSR' }
];

export const ReactOverviewView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="react">
						React
					</h1>
					<p style={paragraphLargeStyle}>
						Build fully server-rendered React applications with
						complete type safety from your database to your
						components.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="build-config"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add React to your build by specifying the directory
						containing your React components:
					</p>
					<PrismPlus
						codeString={reactBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="page-handler"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>handleReactPageRequest</code> to render your
						components. Pass the component, its bundled index file,
						and optional props:
					</p>
					<PrismPlus
						codeString={reactHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="page-components"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Components
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						In AbsoluteJS, React components render the complete HTML
						document including html, head, and body tags. This gives
						you full control over meta tags, scripts, and page
						structure.
					</p>
					<p style={paragraphSpacedStyle}>
						Props passed from your server are fully typed and
						available in your component:
					</p>
					<PrismPlus
						codeString={reactPageComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="hydration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hydration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically handles React hydration. Your
						component renders on the server, then React
						&quot;hydrates&quot; it on the client to make it
						interactive:
					</p>
					<PrismPlus
						codeString={reactHydration}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="index-files"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Index Files
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically generates index files for
						client-side hydration. You never need to write these
						yourself — the build system creates them based on your
						page components.
					</p>
					<p style={paragraphSpacedStyle}>
						By default, these generated files are deleted after
						bundling. To inspect them, enable{' '}
						<code>preserveIntermediateFiles</code>:
					</p>
					<PrismPlus
						codeString={reactPreserveFiles}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Here&apos;s what a generated index file looks like:
					</p>
					<PrismPlus
						codeString={reactIndexFile}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="streaming"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming SSR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses React&apos;s streaming SSR to send HTML
						progressively to the browser:
					</p>
					<PrismPlus
						codeString={reactStreaming}
						language="tsx"
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
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
