import { MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT } from '../../../constants';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';

type MiddlewareChainDiagramProps = {
	themeSprings: ThemeSprings;
};

type MiddlewareLayer = {
	color: string;
	description: string;
	example: string;
	title: string;
};

export const MiddlewareChainDiagram = ({
	themeSprings
}: MiddlewareChainDiagramProps) => {
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);

	const svgWidth = 750;
	const svgHeight = 440;

	const layers: MiddlewareLayer[] = [
		{
			color: colors.textMuted,
			description: 'HTTP request arrives at your Elysia server',
			example: 'GET /api/users',
			title: 'Request'
		},
		{
			color: colors.accent,
			description:
				'cors(), static(), swagger() : extend server capabilities',
			example: '.use(cors()).use(staticPlugin())',
			title: 'Plugins'
		},
		{
			color: colors.accentSecondary,
			description:
				'Authentication, rate limiting, validation : protect routes',
			example: '.guard({ beforeHandle: checkAuth })',
			title: 'Guards'
		},
		{
			color: colors.accentTertiary,
			description:
				'Inject user, db connection, utilities : available in handlers',
			example: '.derive(() => ({ user: getUser() }))',
			title: 'Derive'
		},
		{
			color: colors.accent,
			description: 'Your route logic executes with full type safety',
			example: '.get("/", ({ user }) => ...)',
			title: 'Handler'
		}
	];

	const layerHeight = 70;
	const startY = 60;
	const startX = 50;
	const layerWidth = 550;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<marker
						fill={colors.arrow}
						id="middleware-arrow"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon points="0 0, 8 4, 0 8" />
					</marker>
				</defs>

				{/* Title */}
				<text
					fill={colors.text}
					fontSize={16}
					fontWeight={600}
					textAnchor="middle"
					x={svgWidth / 2}
					y={30}
				>
					Elysia Middleware Chain
				</text>

				{/* Layers */}
				{layers.map((layer, layerIndex) => {
					const layerY = startY + layerIndex * layerHeight;
					const indent =
						layerIndex *
						MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.layerIndentStep;

					return (
						<g key={layerIndex}>
							{/* Layer box */}
							<rect
								fill={colors.background}
								height={
									layerHeight -
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.layerBottomPadding
								}
								rx={10}
								stroke={layer.color}
								strokeWidth={2}
								width={layerWidth - indent * 2}
								x={startX + indent}
								y={layerY}
							/>

							{/* Step number */}
							<circle
								cx={
									startX +
									indent +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.stepBadgeOffsetX
								}
								cy={
									layerY +
									(layerHeight -
										MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.layerBottomPadding) /
										2
								}
								fill={layer.color}
								r={16}
							/>
							<text
								dominantBaseline="middle"
								fill={colors.text}
								fontSize={13}
								fontWeight={700}
								textAnchor="middle"
								x={
									startX +
									indent +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.stepBadgeOffsetX
								}
								y={
									layerY +
									(layerHeight -
										MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.layerBottomPadding) /
										2 +
									1
								}
							>
								{layerIndex + 1}
							</text>

							{/* Title */}
							<text
								fill={colors.text}
								fontSize={14}
								fontWeight={600}
								x={
									startX +
									indent +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.titleOffsetX
								}
								y={
									layerY +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.titleBaselineY
								}
							>
								{layer.title}
							</text>

							{/* Description */}
							<text
								fill={colors.textMuted}
								fontSize={11}
								x={
									startX +
									indent +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.titleOffsetX
								}
								y={
									layerY +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.descriptionBaselineY
								}
							>
								{layer.description}
							</text>

							{/* Example code */}
							<text
								fill={layer.color}
								fontFamily="monospace"
								fontSize={10}
								x={
									startX +
									indent +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.titleOffsetX
								}
								y={
									layerY +
									MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.exampleBaselineY
								}
							>
								{layer.example}
							</text>

							{/* Arrow to next layer */}
							{layerIndex < layers.length - 1 && (
								<line
									markerEnd="url(#middleware-arrow)"
									stroke={colors.arrow}
									strokeWidth={2}
									x1={startX + layerWidth / 2}
									x2={startX + layerWidth / 2}
									y1={
										layerY +
										layerHeight -
										MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.layerBottomPadding
									}
									y2={layerY + layerHeight + 2}
								/>
							)}
						</g>
					);
				})}

				{/* Right side: Type propagation note */}
				<g
					transform={`translate(${startX + layerWidth + MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteOffsetX}, ${startY + MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteOffsetY})`}
				>
					<rect
						fill={colors.highlight}
						height={
							MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteBoxHeight
						}
						rx={10}
						width={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteBoxWidth}
					/>
					<text
						fill={colors.text}
						fontSize={11}
						fontWeight={600}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteLabelY}
					>
						Types Flow
					</text>
					<line
						stroke={colors.arrow}
						strokeWidth={2}
						x1={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						x2={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y1={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteLineStartY}
						y2={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteLineEndY}
					/>
					<polygon
						fill={colors.arrow}
						points={`${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX},${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteArrowTipY} ${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteArrowLeftX},${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteLineEndY - MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteArrowShoulderOffsetY} ${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteArrowRightX},${MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteLineEndY - MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteArrowShoulderOffsetY}`}
					/>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={
							MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNotePluginsLabelY
						}
					>
						Plugins add
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={
							MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNotePluginsValueY
						}
					>
						methods
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteGuardsLabelY}
					>
						Guards add
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteGuardsValueY}
					>
						context
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteDeriveLabelY}
					>
						Derive adds
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteCenterX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.typeNoteDeriveValueY}
					>
						properties
					</text>
				</g>

				{/* Bottom note */}
				<g
					transform={`translate(${svgWidth / 2 - MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteOffsetX}, ${svgHeight - MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteY})`}
				>
					<rect
						fill={colors.accent}
						height={
							MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteBarHeight
						}
						rx={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteBarRadius}
						width={
							MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteBarWidth
						}
					/>
					<text
						fill={colors.text}
						fontSize={11}
						textAnchor="middle"
						x={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteTextX}
						y={MIDDLEWARE_CHAIN_DIAGRAM_LAYOUT.bottomNoteTextY}
					>
						All derived values are fully typed in your handlers
					</text>
				</g>
			</svg>
		</animated.div>
	);
};
