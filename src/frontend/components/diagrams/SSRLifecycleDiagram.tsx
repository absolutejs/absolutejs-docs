import { SSR_LIFECYCLE_DIAGRAM_LAYOUT } from '../../../constants';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramColors,
	diagramContainerStyle,
	svgContainerStyle
} from './diagramStyles';

type SSRLifecycleDiagramProps = {
	themeSprings: ThemeSprings;
};

type SSRStep = {
	label: string;
	sub: string;
};

const steps: SSRStep[] = [
	{ label: 'prepare()', sub: 'Load config, bundle' },
	{ label: 'Request', sub: 'GET /page' },
	{ label: 'Fetch Data', sub: 'DB query, auth' },
	{ label: 'Render', sub: 'Component → HTML' },
	{ label: 'Stream', sub: 'Progressive delivery' },
	{ label: 'Hydrate', sub: 'Interactive on client' }
];

export const SSRLifecycleDiagram = ({
	themeSprings
}: SSRLifecycleDiagramProps) => {
	const { dark } = diagramColors;
	const { light } = diagramColors;

	const boxW = 120;
	const boxH = 60;
	const gap = 24;
	const arrowLen = gap;
	const startX = 20;
	const rowY = 30;
	const totalW = startX * 2 + steps.length * boxW + (steps.length - 1) * gap;
	const svgHeight =
		rowY + boxH + SSR_LIFECYCLE_DIAGRAM_LAYOUT.svgBottomPadding;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${totalW} ${svgHeight}`}
			>
				<defs>
					<marker
						id="ssr-flow-arrow-dark"
						markerHeight={7}
						markerWidth={7}
						orient="auto"
						refX={6}
						refY={3.5}
					>
						<polygon
							fill={dark.accentSecondary}
							points="0 0, 7 3.5, 0 7"
						/>
					</marker>
					<marker
						id="ssr-flow-arrow-light"
						markerHeight={7}
						markerWidth={7}
						orient="auto"
						refX={6}
						refY={3.5}
					>
						<polygon
							fill={light.accentSecondary}
							points="0 0, 7 3.5, 0 7"
						/>
					</marker>
				</defs>

				{/* "Boot" label over first step */}
				<animated.text
					dominantBaseline="middle"
					fill={themeSprings.theme.to((t) =>
						t.endsWith('dark')
							? dark.accentTertiary
							: light.accentTertiary
					)}
					fontSize={10}
					fontWeight={700}
					textAnchor="middle"
					x={startX + boxW / 2}
					y={rowY - SSR_LIFECYCLE_DIAGRAM_LAYOUT.phaseLabelOffsetY}
				>
					ONCE
				</animated.text>

				{/* "Each request" label over steps 2-6 */}
				<animated.text
					dominantBaseline="middle"
					fill={themeSprings.theme.to((t) =>
						t.endsWith('dark')
							? dark.accentSecondary
							: light.accentSecondary
					)}
					fontSize={10}
					fontWeight={700}
					x={
						startX +
						boxW +
						gap +
						SSR_LIFECYCLE_DIAGRAM_LAYOUT.labelOffsetX
					}
					y={rowY - SSR_LIFECYCLE_DIAGRAM_LAYOUT.phaseLabelOffsetY}
				>
					EACH REQUEST
				</animated.text>

				{steps.map((step, stepIndex) => {
					const stepX = startX + stepIndex * (boxW + gap);
					const isFirst = stepIndex === 0;
					const isLast = stepIndex === steps.length - 1;

					return (
						<g key={stepIndex}>
							{/* Box */}
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.background
										: light.background
								)}
								height={boxH}
								rx={10}
								stroke={themeSprings.theme.to((t) => {
									if (isFirst)
										return t.endsWith('dark')
											? dark.accentTertiary
											: light.accentTertiary;
									if (isLast)
										return t.endsWith('dark')
											? dark.accent
											: light.accent;

									return t.endsWith('dark')
										? dark.accentSecondary
										: light.accentSecondary;
								})}
								strokeWidth={2}
								width={boxW}
								x={stepX}
								y={rowY}
							/>

							{/* Label */}
							<animated.text
								dominantBaseline="middle"
								fill={themeSprings.theme.to((t) => {
									if (isFirst)
										return t.endsWith('dark')
											? dark.accentTertiary
											: light.accentTertiary;
									if (isLast)
										return t.endsWith('dark')
											? dark.accent
											: light.accent;

									return t.endsWith('dark')
										? dark.accentSecondary
										: light.accentSecondary;
								})}
								fontSize={13}
								fontWeight={700}
								textAnchor="middle"
								x={stepX + boxW / 2}
								y={
									rowY +
									SSR_LIFECYCLE_DIAGRAM_LAYOUT.boxTitleBaselineY
								}
							>
								{step.label}
							</animated.text>

							{/* Sub label */}
							<animated.text
								dominantBaseline="middle"
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.textMuted
										: light.textMuted
								)}
								fontSize={10}
								textAnchor="middle"
								x={stepX + boxW / 2}
								y={
									rowY +
									SSR_LIFECYCLE_DIAGRAM_LAYOUT.boxSubtitleBaselineY
								}
							>
								{step.sub}
							</animated.text>

							{/* Arrow to next */}
							{stepIndex < steps.length - 1 && (
								<animated.line
									markerEnd={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'url(#ssr-flow-arrow-dark)'
											: 'url(#ssr-flow-arrow-light)'
									)}
									stroke={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? dark.accentSecondary
											: light.accentSecondary
									)}
									strokeWidth={2}
									x1={
										stepX +
										boxW +
										SSR_LIFECYCLE_DIAGRAM_LAYOUT.labelOffsetX
									}
									x2={
										stepX +
										boxW +
										arrowLen -
										SSR_LIFECYCLE_DIAGRAM_LAYOUT.markerSize
									}
									y1={rowY + boxH / 2}
									y2={rowY + boxH / 2}
								/>
							)}
						</g>
					);
				})}
			</svg>
		</animated.div>
	);
};
