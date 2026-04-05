import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { ContextPropertiesGrid } from './ContextPropertiesGrid';
import {
	diagramContainerStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';

type RequestAnatomyDiagramProps = {
	themeSprings: ThemeSprings;
};

export const RequestAnatomyDiagram = ({
	themeSprings
}: RequestAnatomyDiagramProps) => {
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);

	const svgWidth = 780;
	const svgHeight = 820;

	const cardWidth = 220;
	const cardHeight = 140;
	const cardGap = 10;
	const rowGap = 10;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				{/* Title */}
				<text
					fill={colors.text}
					fontSize={20}
					fontWeight={600}
					textAnchor="middle"
					x={svgWidth / 2}
					y={32}
				>
					Elysia Type-Safe Context
				</text>
				<text
					fill={colors.textMuted}
					fontSize={12}
					textAnchor="middle"
					x={svgWidth / 2}
					y={56}
				>
					Context properties are fully typed based on your
					route&apos;s TypeBox schema
				</text>

				{/* Main container */}
				<g transform="translate(30, 75)">
					<rect
						fill={colors.background}
						height={690}
						rx={12}
						stroke={colors.accent}
						strokeWidth={2}
						width={720}
					/>

					{/* Route definition example */}
					<text
						fill={colors.accent}
						fontFamily="monospace"
						fontSize={13}
						fontWeight={600}
						x={25}
						y={35}
					>
						.get(&apos;/users/:id&apos;, (context) =&gt; {'{ ... }'}
						)
					</text>

					{/* Divider */}
					<line
						stroke={colors.border}
						strokeWidth={1}
						x1={25}
						x2={695}
						y1={55}
						y2={55}
					/>

					{/* Context properties grid - 3 columns, 4 rows */}
					<ContextPropertiesGrid
						cardGap={cardGap}
						cardHeight={cardHeight}
						cardWidth={cardWidth}
						colors={colors}
						rowGap={rowGap}
					/>
				</g>
			</svg>
		</animated.div>
	);
};
