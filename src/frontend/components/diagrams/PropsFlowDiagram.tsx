import { useState } from 'react';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';

type PropsFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

export const PropsFlowDiagram = ({ themeSprings }: PropsFlowDiagramProps) => {
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);
	const [hoveredProp, setHoveredProp] = useState<'user' | 'posts' | null>(
		null
	);

	const svgWidth = 480;
	const svgHeight = 160;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<marker
						fill={colors.accent}
						id="props-arrow"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon points="0 0, 8 4, 0 8" />
					</marker>
				</defs>

				{/* Route handler box - left */}
				<g transform="translate(15, 10)">
					<rect
						fill={colors.background}
						height={140}
						rx={10}
						stroke={colors.accent}
						strokeWidth={2}
						width={190}
					/>
					<text
						fill={colors.accent}
						fontSize={14}
						fontWeight={600}
						x={16}
						y={28}
					>
						Route Handler
					</text>
					<text
						fill={colors.textMuted}
						fontFamily="monospace"
						fontSize={13}
						x={16}
						y={55}
					>
						handleRequest(
					</text>
					<text
						fill={colors.text}
						fontFamily="monospace"
						fontSize={13}
						x={26}
						y={75}
					>
						Home,
					</text>
					<text
						fill={colors.text}
						fontFamily="monospace"
						fontSize={13}
						x={26}
						y={95}
					>
						asset(...),
					</text>
					<text
						fill={colors.text}
						fontFamily="monospace"
						fontSize={13}
						x={26}
						y={115}
					>
						{'{ '}
					</text>
					<g
						onMouseEnter={() => setHoveredProp('user')}
						onMouseLeave={() => setHoveredProp(null)}
						style={{ cursor: 'pointer' }}
					>
						<rect
							fill="transparent"
							height={20}
							width={34}
							x={42}
							y={100}
						/>
						<text
							fill={colors.accentSecondary}
							fontFamily="monospace"
							fontSize={13}
							fontWeight={600}
							x={42}
							y={115}
						>
							user
						</text>
						{hoveredProp === 'user' && (
							<g transform="translate(42, 60)">
								<rect
									fill={colors.background}
									height={34}
									rx={5}
									stroke={colors.accentSecondary}
									strokeWidth={1.5}
									width={100}
									x={-8}
									y={0}
								/>
								<text
									fill={colors.accentSecondary}
									fontFamily="monospace"
									fontSize={14}
									fontWeight={500}
									x={5}
									y={22}
								>
									user: User
								</text>
							</g>
						)}
					</g>
					<text
						fill={colors.text}
						fontFamily="monospace"
						fontSize={13}
						x={76}
						y={115}
					>
						,
					</text>
					<g
						onMouseEnter={() => setHoveredProp('posts')}
						onMouseLeave={() => setHoveredProp(null)}
						style={{ cursor: 'pointer' }}
					>
						<rect
							fill="transparent"
							height={20}
							width={42}
							x={90}
							y={100}
						/>
						<text
							fill={colors.accentSecondary}
							fontFamily="monospace"
							fontSize={13}
							fontWeight={600}
							x={90}
							y={115}
						>
							posts
						</text>
						{hoveredProp === 'posts' && (
							<g transform="translate(90, 60)">
								<rect
									fill={colors.background}
									height={34}
									rx={5}
									stroke={colors.accentSecondary}
									strokeWidth={1.5}
									width={120}
									x={-8}
									y={0}
								/>
								<text
									fill={colors.accentSecondary}
									fontFamily="monospace"
									fontSize={14}
									fontWeight={500}
									x={5}
									y={22}
								>
									posts: Post[]
								</text>
							</g>
						)}
					</g>
					<text
						fill={colors.text}
						fontFamily="monospace"
						fontSize={13}
						x={132}
						y={115}
					>
						{' }'}
					</text>
					<text
						fill={colors.textMuted}
						fontFamily="monospace"
						fontSize={13}
						x={16}
						y={135}
					>
						)
					</text>
				</g>

				{/* Arrow */}
				<g transform="translate(215, 80)">
					<line
						markerEnd="url(#props-arrow)"
						stroke={colors.accent}
						strokeWidth={3}
						x1={0}
						x2={35}
						y1={0}
						y2={0}
					/>
				</g>

				{/* Component box - right */}
				<g transform="translate(260, 10)">
					<rect
						fill={colors.background}
						height={140}
						rx={10}
						stroke={colors.accentSecondary}
						strokeWidth={2}
						width={205}
					/>
					<text
						fill={colors.accentSecondary}
						fontSize={14}
						fontWeight={600}
						x={16}
						y={28}
					>
						Component
					</text>
					<text
						fill={colors.textMuted}
						fontFamily="monospace"
						fontSize={13}
						x={16}
						y={55}
					>
						type Props = {'{'}
					</text>
					<text
						fill={colors.accentSecondary}
						fontFamily="monospace"
						fontSize={13}
						fontWeight={500}
						x={26}
						y={75}
					>
						user: User
					</text>
					<text
						fill={colors.accentSecondary}
						fontFamily="monospace"
						fontSize={13}
						fontWeight={500}
						x={26}
						y={95}
					>
						posts: Post[]
					</text>
					<text
						fill={colors.textMuted}
						fontFamily="monospace"
						fontSize={13}
						x={16}
						y={115}
					>
						{'}'}
					</text>
				</g>
			</svg>
		</animated.div>
	);
};
