import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	dockerCompose,
	dockerFile
} from '../../../data/documentation/deploymentDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { DockerBestPracticesList } from './DockerBestPracticesList';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#dockerfile', label: 'Dockerfile' },
	{ href: '#docker-compose', label: 'Docker Compose' },
	{ href: '#best-practices', label: 'Best Practices' }
];

export const DockerView = ({
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
					<h1 id="docker" style={h1Style(isMobileOrTablet)}>
						Docker
					</h1>
					<p style={paragraphLargeStyle}>
						Containerize your AbsoluteJS application for consistent
						deployments across any environment.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dockerfile"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dockerfile
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A production-ready Dockerfile using the official Bun
						image. The --host flag ensures the server binds to all
						interfaces for Docker networking:
					</p>
					<PrismPlus
						codeString={dockerFile}
						language="dockerfile"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="docker-compose"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Docker Compose
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For local development or simple deployments, use Docker
						Compose to run your app with a database:
					</p>
					<PrismPlus
						codeString={dockerCompose}
						language="yaml"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="best-practices"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Best Practices
					</AnchorHeading>
					<DockerBestPracticesList />
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
