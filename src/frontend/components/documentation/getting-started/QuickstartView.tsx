import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	addProps,
	addSecondPage,
	addSecondRoute,
	createCommand,
	passProps,
	runDev,
	simplePageComponent,
	simpleServer
} from '../../../data/documentation/quickstartDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { primaryColor } from '../../../styles/colors';

const tocItems: TocItem[] = [
	{ href: '#create-project', label: 'Create Project' },
	{ href: '#project-files', label: 'Project Files' },
	{ href: '#run-dev-server', label: 'Run Dev Server' },
	{ href: '#add-pages', label: 'Add More Pages' },
	{ href: '#passing-props', label: 'Passing Props' }
];

export const QuickstartView = ({
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
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="quickstart">
						Quickstart
					</h1>
					<p style={paragraphLargeStyle}>
						Build your first AbsoluteJS application in under 5
						minutes.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="create-project"
					>
						Create Your Project
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Start by creating a new AbsoluteJS project:
					</p>
					<PrismPlus
						codeString={createCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1rem' }}>
						The interactive CLI will guide you through setup
						options.{' '}
						<animated.span
							onClick={() => {
								onNavigate('create-absolutejs');
								window.scrollTo({ behavior: 'smooth', top: 0 });
							}}
							style={{
								color: primaryColor,
								cursor: 'pointer',
								fontWeight: 500,
								textDecoration: 'underline'
							}}
						>
							View all CLI options
						</animated.span>{' '}
						to customize your setup with command-line flags.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="project-files"
					>
						Understanding the Project Files
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Your page component is a full HTML document. In
						AbsoluteJS, React components render the entire page
						including the html, head, and body tags:
					</p>
					<PrismPlus
						codeString={simplePageComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The server uses the build() function to bundle your
						frontend code and handleReactPageRequest to render it:
					</p>
					<PrismPlus
						codeString={simpleServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="run-dev-server"
					>
						Run the Dev Server
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Start the development server with hot reloading:
					</p>
					<PrismPlus
						codeString={runDev}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1rem' }}>
						Open http://localhost:3000 to see your app.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="add-pages"
					>
						Add More Pages
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Create another page component:
					</p>
					<PrismPlus
						codeString={addSecondPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Add a route for it in your server:
					</p>
					<PrismPlus
						codeString={addSecondRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="passing-props"
					>
						Passing Props
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Pass data from your server to your components via props:
					</p>
					<PrismPlus
						codeString={addProps}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Pass the props from your route handler:
					</p>
					<PrismPlus
						codeString={passProps}
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
