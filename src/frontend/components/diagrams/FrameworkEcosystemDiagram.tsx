import { animated } from '@react-spring/web';
import { useState } from 'react';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { SiHtmx, SiSvelte } from 'react-icons/si';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';

type FrameworkEcosystemDiagramProps = {
	themeSprings: ThemeSprings;
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

	const frameworks = [
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

	const radius = 160;

	const features = [
		{ desc: 'One build() for all frameworks', label: 'Single Build' },
		{ desc: 'Same pattern everywhere', label: 'Unified Handlers' },
		{ desc: 'End-to-end TypeScript', label: 'Type-Safe Props' }
	];

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
				onMouseMove={(e) => {
					const svg = e.currentTarget;
					const rect = svg.getBoundingClientRect();
					const scaleX = svgWidth / rect.width;
					const scaleY = svgHeight / rect.height;
					setMousePos({
						x: (e.clientX - rect.left) * scaleX,
						y: (e.clientY - rect.top) * scaleY
					});
				}}
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<linearGradient
						id="eco-gradient"
						x1="0%"
						x2="100%"
						y1="0%"
						y2="100%"
					>
						<stop offset="0%" stopColor={colors.accent} />
						<stop
							offset="100%"
							stopColor={colors.accentSecondary}
						/>
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur result="coloredBlur" stdDeviation="4" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="hover-glow">
						<feGaussianBlur result="coloredBlur" stdDeviation="8" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Connection lines from center to frameworks */}
				{frameworks.map((fw, i) => {
					const angleRad = (fw.angle * Math.PI) / 180;
					const x = centerX + Math.cos(angleRad) * radius;
					const y = centerY + Math.sin(angleRad) * radius;

					return (
						<line
							key={i}
							stroke={colors.border}
							strokeDasharray="6,4"
							strokeWidth={1.5}
							x1={centerX}
							x2={x}
							y1={centerY}
							y2={y}
						/>
					);
				})}

				{/* Center hub - AbsoluteJS */}
				<g
					onMouseEnter={() => setCenterHovered(true)}
					onMouseLeave={() => setCenterHovered(false)}
					style={{ cursor: 'pointer' }}
				>
					<circle
						cx={centerX}
						cy={centerY}
						fill={colors.accent}
						filter={
							centerHovered ? 'url(#hover-glow)' : 'url(#glow)'
						}
						opacity={centerHovered ? 0.25 : 0.15}
						r={centerHovered ? 90 : 85}
						style={{ transition: 'all 0.2s ease-out' }}
					/>
					<circle
						cx={centerX}
						cy={centerY}
						fill={colors.background}
						r={centerHovered ? 84 : 80}
						stroke="url(#eco-gradient)"
						strokeWidth={centerHovered ? 5 : 4}
						style={{ transition: 'all 0.2s ease-out' }}
					/>
					{/* AbsoluteJS Logo */}
					<foreignObject
						height={70}
						width={70}
						x={centerX - 35}
						y={centerY - 35}
					>
						<div
							style={{
								alignItems: 'center',
								display: 'flex',
								height: '100%',
								justifyContent: 'center',
								width: '100%'
							}}
						>
							<img
								alt="AbsoluteJS"
								height={60}
								src="/assets/favicon.ico"
								width={60}
							/>
						</div>
					</foreignObject>
				</g>

				{/* Framework nodes */}
				{frameworks.map((fw, i) => {
					const angleRad = (fw.angle * Math.PI) / 180;
					const x = centerX + Math.cos(angleRad) * radius;
					const y = centerY + Math.sin(angleRad) * radius;
					const isComingSoon = fw.isComingSoon;
					const IconComponent = fw.icon;
					const isHovered = hoveredIndex === i;
					const nodeRadius = isHovered ? 52 : 46;
					const iconSize = isHovered ? 40 : 36;

					return (
						<g
							key={i}
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(null)}
							opacity={isComingSoon ? 0.5 : 1}
							style={{ cursor: 'pointer' }}
						>
							{/* Glow effect on hover */}
							{isHovered && (
								<circle
									cx={x}
									cy={y}
									fill={fw.color}
									filter="url(#hover-glow)"
									opacity={0.3}
									r={nodeRadius + 8}
								/>
							)}
							<circle
								cx={x}
								cy={y}
								fill={colors.background}
								r={nodeRadius}
								stroke={fw.color}
								strokeWidth={isHovered ? 4 : 3}
								style={{ transition: 'all 0.2s ease-out' }}
							/>
							<foreignObject
								height={iconSize}
								width={iconSize}
								x={x - iconSize / 2}
								y={y - iconSize / 2}
							>
								<div
									style={{
										alignItems: 'center',
										color: fw.color,
										display: 'flex',
										fontSize: iconSize,
										height: '100%',
										justifyContent: 'center',
										transition: 'all 0.2s ease-out',
										width: '100%'
									}}
								>
									<IconComponent />
								</div>
							</foreignObject>
						</g>
					);
				})}

				{/* Mouse-following tooltip */}
				{(hoveredIndex !== null || centerHovered) &&
					(() => {
						const isCenter = centerHovered;
						const hovered =
							hoveredIndex !== null
								? frameworks[hoveredIndex]
								: null;
						const borderColor = isCenter
							? colors.accent
							: (hovered?.color ?? colors.accent);
						const name = isCenter
							? 'AbsoluteJS'
							: (hovered?.name ?? '');
						const description = isCenter
							? 'The unified core that ties all frameworks together'
							: (hovered?.description ?? '');
						const tooltipWidth = 250;
						const tooltipHeight = 80;
						const offsetX = 15;
						const offsetY = 15;

						// Keep tooltip within SVG bounds
						let tooltipX = mousePos.x + offsetX;
						let tooltipY = mousePos.y + offsetY;
						if (tooltipX + tooltipWidth > svgWidth - 10) {
							tooltipX = mousePos.x - tooltipWidth - offsetX;
						}
						if (tooltipY + tooltipHeight > svgHeight - 10) {
							tooltipY = mousePos.y - tooltipHeight - offsetY;
						}

						return (
							<foreignObject
								height={tooltipHeight}
								style={{ overflow: 'visible' }}
								width={tooltipWidth}
								x={tooltipX}
								y={tooltipY}
							>
								<div
									style={{
										background: 'rgba(0, 0, 0, 0.95)',
										border: `2px solid ${borderColor}`,
										borderRadius: '6px',
										boxShadow:
											'0 4px 12px rgba(0, 0, 0, 0.4)',
										padding: '10px 14px',
										pointerEvents: 'none'
									}}
								>
									<p
										style={{
											color: borderColor,
											fontSize: '0.9rem',
											fontWeight: 600,
											margin: 0
										}}
									>
										{name}
									</p>
									<p
										style={{
											color: 'rgba(255, 255, 255, 0.7)',
											fontSize: '0.75rem',
											margin: 0,
											marginTop: '2px'
										}}
									>
										{description}
									</p>
								</div>
							</foreignObject>
						);
					})()}
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
