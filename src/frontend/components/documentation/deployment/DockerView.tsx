import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	dockerCompose,
	dockerFile
} from '../../../data/documentation/deploymentDocsCode';
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
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#dockerfile', label: 'Dockerfile' },
	{ href: '#docker-compose', label: 'Docker Compose' },
	{ href: '#best-practices', label: 'Best Practices' }
];

export const DockerView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

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
					<h1 style={h1Style} id="docker">
						Docker
					</h1>
					<p style={paragraphLargeStyle}>
						Containerize your AbsoluteJS application for consistent
						deployments across any environment.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="dockerfile"
					>
						Dockerfile
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="docker-compose"
					>
						Docker Compose
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="best-practices"
					>
						Best Practices
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Use --frozen-lockfile
							</strong>
							: Ensures reproducible builds by using exact
							versions from bun.lockb
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Multi-stage builds
							</strong>
							: Separate build and runtime stages to reduce final
							image size
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Don&apos;t run as root
							</strong>
							: Add a non-root user for better security
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Use .dockerignore
							</strong>
							: Exclude node_modules, .git, and other unnecessary
							files
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Health checks</strong>:
							Add HEALTHCHECK instruction for container
							orchestration
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
