import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	flyConfig,
	flyDeploy,
	railwayDeploy,
	renderDeploy
} from '../../../data/documentation/deploymentDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#fly-io', label: 'Fly.io' },
	{ href: '#railway', label: 'Railway' },
	{ href: '#render', label: 'Render' }
];

export const HostingView = ({
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
					<h1 style={h1Style} id="hosting">
						Hosting
					</h1>
					<p style={paragraphLargeStyle}>
						Deploy your AbsoluteJS application to popular hosting
						platforms with minimal configuration.
					</p>
				</animated.div>

				<div
					style={{
						display: 'grid',
						gap: '1rem',
						gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
						marginBottom: '2rem'
					}}
				>
					<animated.div style={featureCardStyle(themeSprings)}>
						<p
							style={{
								...paragraphSpacedStyle,
								marginBottom: '0.5rem'
							}}
						>
							<strong style={strongStyle}>Fly.io</strong>
						</p>
						<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
							Global edge deployment with easy scaling
						</p>
					</animated.div>
					<animated.div style={featureCardStyle(themeSprings)}>
						<p
							style={{
								...paragraphSpacedStyle,
								marginBottom: '0.5rem'
							}}
						>
							<strong style={strongStyle}>Railway</strong>
						</p>
						<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
							Auto-detected Bun projects with zero config
						</p>
					</animated.div>
					<animated.div style={featureCardStyle(themeSprings)}>
						<p
							style={{
								...paragraphSpacedStyle,
								marginBottom: '0.5rem'
							}}
						>
							<strong style={strongStyle}>Render</strong>
						</p>
						<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
							Simple YAML-based deployment configuration
						</p>
					</animated.div>
				</div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="fly-io"
					>
						Fly.io
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Fly.io deploys your app to edge servers worldwide.
						Create a fly.toml configuration file:
					</p>
					<PrismPlus
						codeString={flyConfig}
						language="toml"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Deploy with the Fly CLI:
					</p>
					<PrismPlus
						codeString={flyDeploy}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="railway"
					>
						Railway
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Railway auto-detects Bun projects and handles deployment
						automatically. Just connect your GitHub repository.
						Optionally add a railway.json for custom configuration:
					</p>
					<PrismPlus
						codeString={railwayDeploy}
						language="json"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="render"
					>
						Render
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Render uses a render.yaml blueprint for deployment
						configuration:
					</p>
					<PrismPlus
						codeString={renderDeploy}
						language="yaml"
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

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
