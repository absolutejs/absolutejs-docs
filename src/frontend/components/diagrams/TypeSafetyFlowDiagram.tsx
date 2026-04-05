import {
	PERCENT_SCALE,
	TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT
} from '../../../constants';
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

type StageColorKey = 'accent' | 'accentSecondary' | 'accentTertiary';

type TypeSafetyStage = {
	colorKey: StageColorKey;
	description: string;
	example: string;
	title: string;
};

export const TypeSafetyFlowDiagram = ({
	themeSprings
}: TypeSafetyFlowDiagramProps) => {
	const { dark } = diagramColors;
	const { light } = diagramColors;

	const svgWidth = 1200;
	const svgHeight = 340;

	// Dark color for numbers on bright circle backgrounds
	const numberColor = '#1a1a2e';

	const row1: TypeSafetyStage[] = [
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

	const row2: TypeSafetyStage[] = [
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
	const boxHeight = PERCENT_SCALE;
	const gapX = 30;
	const gapY = 30;
	const row1StartX =
		(svgWidth -
			(TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowStageCount * boxWidth +
				(TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowStageCount - 1) * gapX)) /
		2;
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
					y={
						row1Y -
						TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.serverLabelOffsetY
					}
				>
					SERVER
				</animated.text>

				{/* Row 1: Server side */}
				{row1.map((stage, stageIndex) => {
					const stageX = row1StartX + stageIndex * (boxWidth + gapX);

					return (
						<g key={`row1-${stageIndex}`}>
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
								x={stageX}
								y={row1Y}
							/>

							{/* Step number */}
							<animated.circle
								cx={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeX
								}
								cy={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeY
								}
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								r={
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeRadius
								}
							/>
							<text
								dominantBaseline="middle"
								fill={numberColor}
								fontSize={11}
								fontWeight={700}
								textAnchor="middle"
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeX
								}
								y={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepLabelOffsetY
								}
							>
								{stageIndex + 1}
							</text>

							{/* Title */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark') ? dark.text : light.text
								)}
								fontSize={13}
								fontWeight={600}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.textColumnOffsetX
								}
								y={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.titleBaselineY
								}
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
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.textColumnOffsetX
								}
								y={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.descriptionBaselineY
								}
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
								width={
									boxWidth -
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxWidthInset
								}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxXOffset
								}
								y={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxOffsetY
								}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								fontFamily="monospace"
								fontSize={10}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.exampleCodeXOffset
								}
								y={
									row1Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.exampleBaselineY
								}
							>
								{stage.example}
							</animated.text>

							{/* Arrow to next card */}
							{stageIndex < row1.length - 1 && (
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
									x1={
										stageX +
										boxWidth +
										TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset
									}
									x2={
										stageX +
										boxWidth +
										gapX -
										TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset
									}
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
					y1={
						row1Y +
						boxHeight +
						TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset
					}
					y2={row2Y - TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset}
				/>

				{/* Boundary line */}
				<animated.line
					stroke={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.border : light.border
					)}
					strokeDasharray="6,4"
					strokeWidth={1.5}
					x1={TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.boundaryInsetX}
					x2={
						svgWidth -
						TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.boundaryInsetX
					}
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
					y={
						row2Y -
						TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.serverLabelOffsetY
					}
				>
					CLIENT
				</animated.text>

				{/* Row 2: Client side */}
				{row2.map((stage, stageIndex) => {
					const stageX = row2StartX + stageIndex * (boxWidth + gapX);

					return (
						<g key={`row2-${stageIndex}`}>
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
								x={stageX}
								y={row2Y}
							/>

							{/* Step number */}
							<animated.circle
								cx={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeX
								}
								cy={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeY
								}
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								r={
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeRadius
								}
							/>
							<text
								dominantBaseline="middle"
								fill={numberColor}
								fontSize={11}
								fontWeight={700}
								textAnchor="middle"
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepBadgeX
								}
								y={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.stepLabelOffsetY
								}
							>
								{stageIndex +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.clientStepNumberStart}
							</text>

							{/* Title */}
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark') ? dark.text : light.text
								)}
								fontSize={13}
								fontWeight={600}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.textColumnOffsetX
								}
								y={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.titleBaselineY
								}
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
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.textColumnOffsetX
								}
								y={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.descriptionBaselineY
								}
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
								width={
									boxWidth -
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxWidthInset
								}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxXOffset
								}
								y={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.codeBoxOffsetY
								}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark[stage.colorKey]
										: light[stage.colorKey]
								)}
								fontFamily="monospace"
								fontSize={10}
								x={
									stageX +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.exampleCodeXOffset
								}
								y={
									row2Y +
									TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.exampleBaselineY
								}
							>
								{stage.example}
							</animated.text>

							{/* Arrow to next card */}
							{stageIndex < row2.length - 1 && (
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
									x1={
										stageX +
										boxWidth +
										TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset
									}
									x2={
										stageX +
										boxWidth +
										gapX -
										TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.rowArrowInset
									}
									y1={row2Y + boxHeight / 2}
									y2={row2Y + boxHeight / 2}
								/>
							)}
						</g>
					);
				})}

				{/* Type safety indicator bar */}
				<g
					transform={`translate(${TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.boundaryInsetX}, ${row2Y + boxHeight + TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarOffsetY})`}
				>
					<animated.rect
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'url(#type-gradient-dark)'
								: 'url(#type-gradient-light)'
						)}
						height={
							TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarHeight
						}
						rx={TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarRadius}
						width={
							svgWidth -
							TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarWidthInset
						}
					/>
					<animated.text
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark') ? dark.text : light.text
						)}
						fontSize={11}
						fontWeight={500}
						textAnchor="middle"
						x={
							(svgWidth -
								TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarWidthInset) /
							2
						}
						y={TYPE_SAFETY_FLOW_DIAGRAM_LAYOUT.progressBarLabelY}
					>
						TypeScript validates at every step: errors caught at
						compile time, not runtime
					</animated.text>
				</g>
			</svg>
		</animated.div>
	);
};
