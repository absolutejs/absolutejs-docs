import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramColors,
	diagramContainerStyle,
	svgContainerStyle
} from './diagramStyles';

type TypeSafetyFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

export const TypeSafetyFlowDiagram = ({
	themeSprings
}: TypeSafetyFlowDiagramProps) => {
	const dark = diagramColors.dark;
	const light = diagramColors.light;

	const svgWidth = 1200;
	const svgHeight = 340;

	// Dark color for numbers on bright circle backgrounds
	const numberColor = '#1a1a2e';

	const row1 = [
		{
			colorKey: 'accentTertiary' as const,
			description: 'Define your tables',
			example: "pgTable('users', { id, name, email })",
			title: 'Schema'
		},
		{
			colorKey: 'accent' as const,
			description: 'Infer TypeScript types',
			example: 'type User = typeof users.$inferSelect',
			title: 'Drizzle ORM'
		},
		{
			colorKey: 'accentSecondary' as const,
			description: 'Query and return data',
			example: 'db.select().from(users)',
			title: 'Route Handler'
		}
	];

	const row2 = [
		{
			colorKey: 'accent' as const,
			description: 'Type-safe API calls',
			example: 'const { data, error } = api.users.get()',
			title: 'Eden Treaty'
		},
		{
			colorKey: 'accentSecondary' as const,
			description: 'Fully typed props',
			example: 'type Props = { user: User }',
			title: 'Component'
		}
	];

	const boxWidth = 380;
	const boxHeight = 100;
	const gapX = 30;
	const gapY = 30;
	const row1StartX = (svgWidth - (3 * boxWidth + 2 * gapX)) / 2;
	const row2StartX = (svgWidth - (2 * boxWidth + gapX)) / 2;
	const row1Y = 55;
	const row2Y = row1Y + boxHeight + gapY;

	// SERVER label centered above row 1
	const serverCenterX = svgWidth / 2;
	// CLIENT label centered above row 2
	const clientCenterX = svgWidth / 2;
	// Boundary line between rows
	const boundaryY = row1Y + boxHeight + gapY / 2;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<marker
						id="type-arrow-dark"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon fill={dark.arrow} points="0 0, 8 4, 0 8" />
					</marker>
					<marker
						id="type-arrow-light"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon fill={light.arrow} points="0 0, 8 4, 0 8" />
					</marker>
					<marker
						id="type-arrow-down-dark"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={4}
						refY={7}
					>
						<polygon fill={dark.arrow} points="0 0, 8 0, 4 8" />
					</marker>
					<marker
						id="type-arrow-down-light"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={4}
						refY={7}
					>
						<polygon fill={light.arrow} points="0 0, 8 0, 4 8" />
					</marker>
					<linearGradient
						id="type-gradient-dark"
						x1="0%"
						x2="100%"
						y1="0%"
						y2="0%"
					>
						<stop offset="0%" stopColor={dark.accent} />
						<stop offset="100%" stopColor={dark.accentSecondary} />
					</linearGradient>
					<linearGradient
						id="type-gradient-light"
						x1="0%"
						x2="100%"
						y1="0%"
						y2="0%"
					>
						<stop offset="0%" stopColor={light.accent} />
						<stop offset="100%" stopColor={light.accentSecondary} />
					</linearGradient>
				</defs>

				{/* Title */}
				<animated.text
					fill={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.text : light.text
					)}
					fontSize={16}
					fontWeight={600}
					textAnchor="middle"
					x={svgWidth / 2}
					y={24}
				>
					End-to-End Type Safety
				</animated.text>

				{/* SERVER label */}
				<animated.text
					fill={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.textMuted : light.textMuted
					)}
					fontSize={10}
					fontWeight={600}
					textAnchor="middle"
					x={serverCenterX}
					y={row1Y - 10}
				>
					SERVER
				</animated.text>

				{/* Row 1 - Server side */}
				{row1.map((stage, i) => {
					const x = row1StartX + i * (boxWidth + gapX);

					return (
						<g key={`row1-${i}`}>
							{/* Box */}
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.background
										: light.background
								)}
								height={boxHeight}
								rx={10}
								stroke={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								strokeWidth={2}
								width={boxWidth}
								x={x}
								y={row1Y}
							/>

							{/* Step number */}
							<animated.circle
								cx={x + 24}
								cy={row1Y + 24}
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								r={12}
							/>
							<text
								dominantBaseline="middle"
								fill={numberColor}
								fontSize={11}
								fontWeight={700}
								textAnchor="middle"
								x={x + 24}
								y={row1Y + 25}
							>
								{i + 1}
							</text>

							{/* Title */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark') ? dark.text : light.text
								)}
								fontSize={13}
								fontWeight={600}
								x={x + 44}
								y={row1Y + 22}
							>
								{stage.title}
							</animated.text>

							{/* Description */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.textMuted
										: light.textMuted
								)}
								fontSize={10}
								x={x + 44}
								y={row1Y + 38}
							>
								{stage.description}
							</animated.text>

							{/* Example code box */}
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								height={30}
								opacity={0.12}
								rx={6}
								width={boxWidth - 24}
								x={x + 12}
								y={row1Y + 56}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								fontFamily="monospace"
								fontSize={10}
								x={x + 22}
								y={row1Y + 76}
							>
								{stage.example}
							</animated.text>

							{/* Arrow to next card */}
							{i < row1.length - 1 && (
								<animated.line
									markerEnd={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'url(#type-arrow-dark)'
											: 'url(#type-arrow-light)'
									)}
									stroke={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? dark.arrow
											: light.arrow
									)}
									strokeWidth={2}
									x1={x + boxWidth + 8}
									x2={x + boxWidth + gapX - 8}
									y1={row1Y + boxHeight / 2}
									y2={row1Y + boxHeight / 2}
								/>
							)}
						</g>
					);
				})}

				{/* Arrow from row 1 to row 2 */}
				<animated.line
					markerEnd={themeSprings.theme.to((t) =>
						t.endsWith('dark')
							? 'url(#type-arrow-down-dark)'
							: 'url(#type-arrow-down-light)'
					)}
					stroke={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.arrow : light.arrow
					)}
					strokeWidth={2}
					x1={row1StartX + 2 * boxWidth + 2 * gapX + boxWidth / 2}
					x2={row2StartX + boxWidth / 2}
					y1={row1Y + boxHeight + 8}
					y2={row2Y - 8}
				/>

				{/* Boundary line */}
				<animated.line
					stroke={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.border : light.border
					)}
					strokeDasharray="6,4"
					strokeWidth={1.5}
					x1={50}
					x2={svgWidth - 50}
					y1={boundaryY}
					y2={boundaryY}
				/>

				{/* CLIENT label */}
				<animated.text
					fill={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.textMuted : light.textMuted
					)}
					fontSize={10}
					fontWeight={600}
					textAnchor="middle"
					x={clientCenterX}
					y={row2Y - 10}
				>
					CLIENT
				</animated.text>

				{/* Row 2 - Client side */}
				{row2.map((stage, i) => {
					const x = row2StartX + i * (boxWidth + gapX);

					return (
						<g key={`row2-${i}`}>
							{/* Box */}
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.background
										: light.background
								)}
								height={boxHeight}
								rx={10}
								stroke={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								strokeWidth={2}
								width={boxWidth}
								x={x}
								y={row2Y}
							/>

							{/* Step number */}
							<animated.circle
								cx={x + 24}
								cy={row2Y + 24}
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								r={12}
							/>
							<text
								dominantBaseline="middle"
								fill={numberColor}
								fontSize={11}
								fontWeight={700}
								textAnchor="middle"
								x={x + 24}
								y={row2Y + 25}
							>
								{i + 4}
							</text>

							{/* Title */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark') ? dark.text : light.text
								)}
								fontSize={13}
								fontWeight={600}
								x={x + 44}
								y={row2Y + 22}
							>
								{stage.title}
							</animated.text>

							{/* Description */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.textMuted
										: light.textMuted
								)}
								fontSize={10}
								x={x + 44}
								y={row2Y + 38}
							>
								{stage.description}
							</animated.text>

							{/* Example code box */}
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								height={30}
								opacity={0.12}
								rx={6}
								width={boxWidth - 24}
								x={x + 12}
								y={row2Y + 56}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								fontFamily="monospace"
								fontSize={10}
								x={x + 22}
								y={row2Y + 76}
							>
								{stage.example}
							</animated.text>

							{/* Arrow to next card */}
							{i < row2.length - 1 && (
								<animated.line
									markerEnd={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'url(#type-arrow-dark)'
											: 'url(#type-arrow-light)'
									)}
									stroke={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? dark.arrow
											: light.arrow
									)}
									strokeWidth={2}
									x1={x + boxWidth + 8}
									x2={x + boxWidth + gapX - 8}
									y1={row2Y + boxHeight / 2}
									y2={row2Y + boxHeight / 2}
								/>
							)}
						</g>
					);
				})}

				{/* Type safety indicator bar */}
				<g transform={`translate(50, ${row2Y + boxHeight + 25})`}>
					<animated.rect
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'url(#type-gradient-dark)'
								: 'url(#type-gradient-light)'
						)}
						height={5}
						rx={2.5}
						width={svgWidth - 100}
					/>
					<animated.text
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark') ? dark.text : light.text
						)}
						fontSize={11}
						fontWeight={500}
						textAnchor="middle"
						x={(svgWidth - 100) / 2}
						y={22}
					>
						TypeScript validates at every step — errors caught at
						compile time, not runtime
					</animated.text>
				</g>
			</svg>
		</animated.div>
	);
};
