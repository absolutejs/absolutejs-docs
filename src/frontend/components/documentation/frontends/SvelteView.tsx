import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteBuild,
	svelteCompilation,
	svelteComponent,
	svelteHandler,
	svelteTypeSafetyServer,
	svelteTypeSafetyTypes
} from '../../../data/documentation/svelteDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
	{ href: '#compilation', label: 'Compilation' },
	{ href: '#type-safety', label: 'Type Safety' }
];

export const SvelteView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="svelte">
						Svelte
					</h1>
					<p style={paragraphLargeStyle}>
						Server-render Svelte components with full type safety
						and automatic hydration.
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
						level="h2"
						id="page-handler"
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
						level="h2"
						id="svelte-components"
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
						level="h2"
						id="compilation"
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
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Page file</strong>: The
							compiled component used for server-side rendering
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Index file</strong>: The
							compiled hydration script that makes the page
							interactive on the client
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="type-safety"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Safety
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Svelte components enjoy the same end-to-end type safety
						as React. Define your database schema and infer types
						directly from your table definitions using Drizzle:
					</p>
					<PrismPlus
						codeString={svelteTypeSafetyTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Use those types in your server handlers to ensure props
						match your components:
					</p>
					<PrismPlus
						codeString={svelteTypeSafetyServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Schema → Types</strong>:
							Drizzle infers types directly from your table
							definitions
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Types → Server</strong>:
							Your inferred types flow into route handlers and
							props
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Props → Component
							</strong>
							: Svelte receives correctly typed props on both
							server and client
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
