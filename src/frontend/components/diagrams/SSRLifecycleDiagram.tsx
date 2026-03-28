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

const steps = [
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
	const dark = diagramColors.dark;
	const light = diagramColors.light;

	const boxW = 120;
	const boxH = 60;
	const gap = 24;
	const arrowLen = gap;
	const startX = 20;
	const y = 30;
	const totalW = startX * 2 + steps.length * boxW + (steps.length - 1) * gap;
	const svgHeight = y + boxH + 30;

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
					y={y - 8}
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
					x={startX + boxW + gap + 2}
					y={y - 8}
				>
					EACH REQUEST
				</animated.text>

				{steps.map((step, i) => {
					const x = startX + i * (boxW + gap);
					const isFirst = i === 0;
					const isLast = i === steps.length - 1;

					return (
						<g key={i}>
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
								x={x}
								y={y}
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
								x={x + boxW / 2}
								y={y + 22}
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
								x={x + boxW / 2}
								y={y + 44}
							>
								{step.sub}
							</animated.text>

							{/* Arrow to next */}
							{i < steps.length - 1 && (
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
									x1={x + boxW + 2}
									x2={x + boxW + arrowLen - 8}
									y1={y + boxH / 2}
									y2={y + boxH / 2}
								/>
							)}
						</g>
					);
				})}
			</svg>
		</animated.div>
	);
};
