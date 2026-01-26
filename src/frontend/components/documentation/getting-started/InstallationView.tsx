import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	bunInstall,
	createProject,
	createProjectWithOptions,
	manualInstall,
	minimalServer
} from '../../../data/documentation/installationDocsCode';
import { ProjectStructureGraph } from './ProjectStructureGraph';
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#prerequisites', label: 'Prerequisites' },
	{ href: '#create-absolutejs', label: 'Using create-absolutejs' },
	{ href: '#project-structure', label: 'Project Structure' },
	{ href: '#manual-installation', label: 'Manual Installation' }
];

export const InstallationView = ({
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
					<h1 style={h1Style} id="installation">
						Installation
					</h1>
					<p style={paragraphLargeStyle}>
						Get started with AbsoluteJS in minutes using the CLI or
						manual setup.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="prerequisites"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prerequisites
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS requires Bun version 1.2 or higher. If you
						don&apos;t have Bun installed, run:
					</p>
					<PrismPlus
						codeString={bunInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="create-absolutejs"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Using create-absolutejs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The fastest way to start a new AbsoluteJS project is
						with the create-absolutejs CLI:
					</p>
					<PrismPlus
						codeString={createProject}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						You can also specify options directly:
					</p>
					<PrismPlus
						codeString={createProjectWithOptions}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Available options include:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--frontend</strong> —
							react, svelte, vue, html, htmx
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--database</strong> —
							drizzle, prisma, none
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--auth</strong> —
							Include @absolutejs/auth setup
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="project-structure"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Project Structure
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A new AbsoluteJS project has this structure:
					</p>
					<ProjectStructureGraph themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="manual-installation"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Manual Installation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						To add AbsoluteJS to an existing project:
					</p>
					<PrismPlus
						codeString={manualInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Then create your server entry point:
					</p>
					<PrismPlus
						codeString={minimalServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
