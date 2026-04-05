import { FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT } from '../../../constants';
import { animated } from '@react-spring/web';
import { useState } from 'react';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { SiHtmx, SiSvelte } from 'react-icons/si';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';
import { EcosystemCenterHub } from './EcosystemCenterHub';
import { EcosystemFrameworkNode } from './EcosystemFrameworkNode';
import { EcosystemGlowFilters } from './EcosystemGlowFilters';
import { EcosystemTooltip } from './EcosystemTooltip';

type FrameworkEcosystemDiagramProps = {
	themeSprings: ThemeSprings;
};

type FrameworkNode = {
	angle: number;
	color: string;
	description: string;
	icon: IconType;
	isComingSoon: boolean;
	name: string;
};

type EcosystemFeature = {
	desc: string;
	label: string;
};

export const FrameworkEcosystemDiagram = ({
	themeSprings
}: FrameworkEcosystemDiagramProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [centerHovered, setCenterHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);

	const svgWidth = 800;
	const svgHeight = 440;
	const centerX = svgWidth / 2;
	const centerY = 220;

	const frameworks: FrameworkNode[] = [
		{
			angle: -90,
			color: '#61DAFB',
			description: 'Full SSR with streaming and hydration',
			icon: FaReact,
			isComingSoon: false,
			name: 'React'
		},
		{
			angle: -30,
			color: '#FF3E00',
			description: 'Component SSR with client-side hydration',
			icon: SiSvelte,
			isComingSoon: false,
			name: 'Svelte'
		},
		{
			angle: 30,
			color: '#42B883',
			description: 'SSR with props injection and hydration',
			icon: FaVuejs,
			isComingSoon: false,
			name: 'Vue'
		},
		{
			angle: 90,
			color: '#E34F26',
			description: 'HTML pages with optional JavaScript',
			icon: FaHtml5,
			isComingSoon: false,
			name: 'HTML'
		},
		{
			angle: 150,
			color: '#3366CC',
			description: 'HTMX-powered interactive templates',
			icon: SiHtmx,
			isComingSoon: false,
			name: 'HTMX'
		},
		{
			angle: 210,
			color: '#DD0031',
			description: 'Angular support coming soon',
			icon: FaAngular,
			isComingSoon: true,
			name: 'Angular'
		}
	];

	const radius = FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.nodeOrbitRadius;

	const features: EcosystemFeature[] = [
		{ desc: 'One build() for all frameworks', label: 'Single Build' },
		{ desc: 'Same pattern everywhere', label: 'Unified Handlers' },
		{ desc: 'End-to-end TypeScript', label: 'Type-Safe Props' }
	];
	const hoveredFramework =
		hoveredIndex !== null ? frameworks[hoveredIndex] : null;
	const showTooltip = hoveredFramework !== null || centerHovered;
	const tooltipBorderColor = centerHovered
		? colors.accent
		: (hoveredFramework?.color ?? colors.accent);
	const tooltipName = centerHovered
		? 'AbsoluteJS'
		: (hoveredFramework?.name ?? '');
	const tooltipDescription = centerHovered
		? 'The unified core that ties all frameworks together'
		: (hoveredFramework?.description ?? '');
	const { tooltipHeight, tooltipWidth } = FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT;
	const offsetX = FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.tooltipOffsetX;
	const offsetY = FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.tooltipOffsetY;
	let tooltipX = mousePos.x + offsetX;
	let tooltipY = mousePos.y + offsetY;
	if (
		tooltipX + tooltipWidth >
		svgWidth - FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.tooltipBoundaryPadding
	) {
		tooltipX = mousePos.x - tooltipWidth - offsetX;
	}
	if (
		tooltipY + tooltipHeight >
		svgHeight - FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.tooltipBoundaryPadding
	) {
		tooltipY = mousePos.y - tooltipHeight - offsetY;
	}

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<h3
				style={{
					color: colors.text,
					fontSize: '1.1rem',
					fontWeight: 600,
					marginBottom: '1rem',
					textAlign: 'center'
				}}
			>
				One Framework, Any Frontend
			</h3>
			<svg
				onMouseMove={(event) => {
					const svg = event.currentTarget;
					const rect = svg.getBoundingClientRect();
					const scaleX = svgWidth / rect.width;
					const scaleY = svgHeight / rect.height;
					setMousePos({
						x: (event.clientX - rect.left) * scaleX,
						y: (event.clientY - rect.top) * scaleY
					});
				}}
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<EcosystemGlowFilters
					accentColor={colors.accent}
					accentSecondaryColor={colors.accentSecondary}
				/>

				{/* Connection lines from center to frameworks */}
				{frameworks.map((framework, frameworkIndex) => {
					const angleRad =
						(framework.angle * Math.PI) /
						FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.trigonometryFullCircleDegrees;
					const nodeX = centerX + Math.cos(angleRad) * radius;
					const nodeY = centerY + Math.sin(angleRad) * radius;

					return (
						<line
							key={frameworkIndex}
							stroke={colors.border}
							strokeDasharray="6,4"
							strokeWidth={1.5}
							x1={centerX}
							x2={nodeX}
							y1={centerY}
							y2={nodeY}
						/>
					);
				})}

				{/* Center hub - AbsoluteJS */}
				<EcosystemCenterHub
					accentColor={colors.accent}
					backgroundColor={colors.background}
					centerHovered={centerHovered}
					centerX={centerX}
					centerY={centerY}
					onMouseEnter={() => setCenterHovered(true)}
					onMouseLeave={() => setCenterHovered(false)}
				/>

				{/* Framework nodes */}
				{frameworks.map((framework, frameworkIndex) => {
					const angleRad =
						(framework.angle * Math.PI) /
						FRAMEWORK_ECOSYSTEM_DIAGRAM_LAYOUT.trigonometryFullCircleDegrees;
					const nodeX = centerX + Math.cos(angleRad) * radius;
					const nodeY = centerY + Math.sin(angleRad) * radius;

					return (
						<EcosystemFrameworkNode
							backgroundColor={colors.background}
							color={framework.color}
							icon={framework.icon}
							isComingSoon={framework.isComingSoon}
							isHovered={hoveredIndex === frameworkIndex}
							key={frameworkIndex}
							nodeX={nodeX}
							nodeY={nodeY}
							onMouseEnter={() => setHoveredIndex(frameworkIndex)}
							onMouseLeave={() => setHoveredIndex(null)}
						/>
					);
				})}

				{/* Mouse-following tooltip */}
				{showTooltip && (
					<EcosystemTooltip
						borderColor={tooltipBorderColor}
						description={tooltipDescription}
						name={tooltipName}
						tooltipHeight={tooltipHeight}
						tooltipWidth={tooltipWidth}
						tooltipX={tooltipX}
						tooltipY={tooltipY}
					/>
				)}
			</svg>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					justifyContent: 'center',
					marginTop: '1.5rem'
				}}
			>
				{features.map((feature, i) => (
					<div
						key={i}
						style={{
							background: colors.highlight,
							borderRadius: '0.5rem',
							flex: '1 1 200px',
							maxWidth: '240px',
							padding: '0.875rem 1rem',
							textAlign: 'center'
						}}
					>
						<p
							style={{
								color: colors.text,
								fontSize: '0.875rem',
								fontWeight: 600,
								margin: 0,
								marginBottom: '0.25rem'
							}}
						>
							{feature.label}
						</p>
						<p
							style={{
								color: colors.textMuted,
								fontSize: '0.75rem',
								margin: 0
							}}
						>
							{feature.desc}
						</p>
					</div>
				))}
			</div>
		</animated.div>
	);
};
