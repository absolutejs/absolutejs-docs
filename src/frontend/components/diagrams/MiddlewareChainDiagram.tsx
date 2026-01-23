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

export const MiddlewareChainDiagram = ({
	themeSprings
}: MiddlewareChainDiagramProps) => {
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);

	const svgWidth = 750;
	const svgHeight = 440;

	const layers = [
		{
			color: colors.textMuted,
			description: 'HTTP request arrives at your Elysia server',
			example: 'GET /api/users',
			title: 'Request'
		},
		{
			color: colors.accent,
			description:
				'cors(), static(), swagger() — extend server capabilities',
			example: '.use(cors()).use(staticPlugin())',
			title: 'Plugins'
		},
		{
			color: colors.accentSecondary,
			description:
				'Authentication, rate limiting, validation — protect routes',
			example: '.guard({ beforeHandle: checkAuth })',
			title: 'Guards'
		},
		{
			color: colors.accentTertiary,
			description:
				'Inject user, db connection, utilities — available in handlers',
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
				{layers.map((layer, i) => {
					const y = startY + i * layerHeight;
					const indent = i * 25;

					return (
						<g key={i}>
							{/* Layer box */}
							<rect
								fill={colors.background}
								height={layerHeight - 10}
								rx={10}
								stroke={layer.color}
								strokeWidth={2}
								width={layerWidth - indent * 2}
								x={startX + indent}
								y={y}
							/>

							{/* Step number */}
							<circle
								cx={startX + indent + 28}
								cy={y + (layerHeight - 10) / 2}
								fill={layer.color}
								r={16}
							/>
							<text
								dominantBaseline="middle"
								fill={colors.text}
								fontSize={13}
								fontWeight={700}
								textAnchor="middle"
								x={startX + indent + 28}
								y={y + (layerHeight - 10) / 2 + 1}
							>
								{i + 1}
							</text>

							{/* Title */}
							<text
								fill={colors.text}
								fontSize={14}
								fontWeight={600}
								x={startX + indent + 55}
								y={y + 22}
							>
								{layer.title}
							</text>

							{/* Description */}
							<text
								fill={colors.textMuted}
								fontSize={11}
								x={startX + indent + 55}
								y={y + 40}
							>
								{layer.description}
							</text>

							{/* Example code */}
							<text
								fill={layer.color}
								fontFamily="monospace"
								fontSize={10}
								x={startX + indent + 55}
								y={y + 55}
							>
								{layer.example}
							</text>

							{/* Arrow to next layer */}
							{i < layers.length - 1 && (
								<line
									markerEnd="url(#middleware-arrow)"
									stroke={colors.arrow}
									strokeWidth={2}
									x1={startX + layerWidth / 2}
									x2={startX + layerWidth / 2}
									y1={y + layerHeight - 10}
									y2={y + layerHeight + 2}
								/>
							)}
						</g>
					);
				})}

				{/* Right side: Type propagation note */}
				<g
					transform={`translate(${startX + layerWidth + 30}, ${startY + 50})`}
				>
					<rect
						fill={colors.highlight}
						height={200}
						rx={10}
						width={110}
					/>
					<text
						fill={colors.text}
						fontSize={11}
						fontWeight={600}
						textAnchor="middle"
						x={55}
						y={25}
					>
						Types Flow
					</text>
					<line
						stroke={colors.arrow}
						strokeWidth={2}
						x1={55}
						x2={55}
						y1={40}
						y2={170}
					/>
					<polygon
						fill={colors.arrow}
						points="55,180 48,165 62,165"
					/>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={70}
					>
						Plugins add
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={82}
					>
						methods
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={110}
					>
						Guards add
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={122}
					>
						context
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={150}
					>
						Derive adds
					</text>
					<text
						fill={colors.textMuted}
						fontSize={9}
						textAnchor="middle"
						x={55}
						y={162}
					>
						properties
					</text>
				</g>

				{/* Bottom note */}
				<g
					transform={`translate(${svgWidth / 2 - 180}, ${svgHeight - 35})`}
				>
					<rect fill={colors.accent} height={6} rx={3} width={360} />
					<text
						fill={colors.text}
						fontSize={11}
						textAnchor="middle"
						x={180}
						y={22}
					>
						All derived values are fully typed in your handlers
					</text>
				</g>
			</svg>
		</animated.div>
	);
};
