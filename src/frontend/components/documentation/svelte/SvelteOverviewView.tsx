import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteBuild,
	svelteCompilation,
	svelteComponent,
	svelteHandler
} from '../../../data/documentation/svelteDocsCode';
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
	{ href: '#svelte-components', label: 'Components' },
	{ href: '#compilation', label: 'Compilation' }
];

const SvelteCompilationList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Page file</strong>: The compiled
			component used for server-side rendering
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Index file</strong>: The compiled
			hydration script that makes the page interactive on the client
		</li>
	</ul>
);

export const SvelteOverviewView = ({
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
					<h1 id="svelte" style={h1Style(isMobileOrTablet)}>
						Svelte
					</h1>
					<p style={paragraphLargeStyle}>
						Server-render Svelte components with full type safety
						and automatic hydration.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add Svelte to your build by specifying the directory
						containing your Svelte components:
					</p>
					<PrismPlus
						codeString={svelteBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>handleSveltePageRequest</code> with{' '}
						<code>asset()</code> to get the compiled paths for both
						the page and index files:
					</p>
					<PrismPlus
						codeString={svelteHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Svelte components receive typed props via exports. Use
						svelte:head for meta tags:
					</p>
					<PrismPlus
						codeString={svelteComponent}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compilation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Compilation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						During the build process, each raw <code>.svelte</code>{' '}
						file is compiled into two separate JavaScript files:
					</p>
					<PrismPlus
						codeString={svelteCompilation}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<SvelteCompilationList />
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
