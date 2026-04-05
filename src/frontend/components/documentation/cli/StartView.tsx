import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	startCommand,
	startOutput,
	startWithSSG
} from '../../../data/documentation/cliDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#options', label: 'Options' },
	{ href: '#with-ssg', label: 'With Static Generation' }
];

const StartOptionsList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>[entry]</strong> : Server entry file
			(defaults to <code>src/backend/server.ts</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--outdir</strong> : Build output
			directory (defaults to <code>dist</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--config</strong>: Path to{' '}
			<code>absolute.config.ts</code>
		</li>
	</ul>
);

export const StartView = ({
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
					<h1 id="start" style={h1Style(isMobileOrTablet)}>
						absolute start
					</h1>
					<p style={paragraphLargeStyle}>
						Build assets, bundle the production server, and start
						serving.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<PrismPlus
						codeString={startCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={startOutput}
						language="bash"
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
					<StartOptionsList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="with-ssg"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						With Static Generation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When your <code>absolute.config.ts</code> includes a{' '}
						<code>static</code> config, the start command
						automatically pre-renders those pages after bundling:
					</p>
					<PrismPlus
						codeString={startWithSSG}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						See the{' '}
						<a
							href="#"
							onClick={(event) => {
								event.preventDefault();
								onNavigate('static-generation');
							}}
							style={{
								color: 'inherit',
								textDecoration: 'underline'
							}}
						>
							Static Generation
						</a>{' '}
						docs for configuration details.
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
