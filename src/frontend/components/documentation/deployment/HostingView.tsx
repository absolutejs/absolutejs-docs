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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#fly-io', label: 'Fly.io' },
	{ href: '#railway', label: 'Railway' },
	{ href: '#render', label: 'Render' }
];

type HostingCardProps = {
	themeSprings: DocsViewProps['themeSprings'];
	title: string;
	description: string;
};

const HostingCard = ({
	themeSprings,
	title,
	description
}: HostingCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				...paragraphSpacedStyle,
				marginBottom: '0.5rem'
			}}
		>
			<strong style={strongStyle}>{title}</strong>
		</p>
		<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{description}</p>
	</animated.div>
);

export const HostingView = ({
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
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="hosting" style={h1Style(isMobileOrTablet)}>
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
					<HostingCard
						description="Global edge deployment with easy scaling"
						themeSprings={themeSprings}
						title="Fly.io"
					/>
					<HostingCard
						description="Auto-detected Bun projects with zero config"
						themeSprings={themeSprings}
						title="Railway"
					/>
					<HostingCard
						description="Simple YAML-based deployment configuration"
						themeSprings={themeSprings}
						title="Render"
					/>
				</div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fly-io"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fly.io
					</AnchorHeading>
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
					<AnchorHeading
						id="railway"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Railway
					</AnchorHeading>
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
					<AnchorHeading
						id="render"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Render
					</AnchorHeading>
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
