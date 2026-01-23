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

export const SSRLifecycleDiagram = ({
	themeSprings
}: SSRLifecycleDiagramProps) => {
	const svgWidth = 960;
	const svgHeight = 320;

	const dark = diagramColors.dark;
	const light = diagramColors.light;

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<marker
						id="ssr-arrow-yellow-dark"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon
							fill={dark.accentTertiary}
							points="0 0, 8 4, 0 8"
						/>
					</marker>
					<marker
						id="ssr-arrow-yellow-light"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon
							fill={light.accentTertiary}
							points="0 0, 8 4, 0 8"
						/>
					</marker>
					<marker
						id="ssr-arrow-green-dark"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon
							fill={dark.accentSecondary}
							points="0 0, 8 4, 0 8"
						/>
					</marker>
					<marker
						id="ssr-arrow-green-light"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon
							fill={light.accentSecondary}
							points="0 0, 8 4, 0 8"
						/>
					</marker>
					<marker
						id="ssr-arrow-cyan-dark"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon fill={dark.accent} points="0 0, 8 4, 0 8" />
					</marker>
					<marker
						id="ssr-arrow-cyan-light"
						markerHeight={8}
						markerWidth={8}
						orient="auto"
						refX={7}
						refY={4}
					>
						<polygon fill={light.accent} points="0 0, 8 4, 0 8" />
					</marker>
				</defs>

				{/* ===== STARTUP PHASE (left column) ===== */}
				<g transform="translate(30, 30)">
					<animated.rect
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.accentTertiary
								: light.accentTertiary
						)}
						height={30}
						opacity={0.15}
						rx={6}
						width={160}
					/>
					<animated.text
						dominantBaseline="middle"
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.accentTertiary
								: light.accentTertiary
						)}
						fontSize={13}
						fontWeight={700}
						x={16}
						y={16}
					>
						SERVER STARTUP
					</animated.text>

					{/* build() box */}
					<g transform="translate(0, 50)">
						<animated.rect
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.background
									: light.background
							)}
							height={100}
							rx={12}
							stroke={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.accentTertiary
									: light.accentTertiary
							)}
							strokeWidth={2}
							width={220}
						/>
						<animated.text
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.accentTertiary
									: light.accentTertiary
							)}
							fontSize={20}
							fontWeight={700}
							x={24}
							y={40}
						>
							build()
						</animated.text>
						<animated.text
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.textMuted
									: light.textMuted
							)}
							fontSize={13}
							x={24}
							y={65}
						>
							Bundles code
						</animated.text>
						<animated.text
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.textMuted
									: light.textMuted
							)}
							fontSize={13}
							x={24}
							y={85}
						>
							Hashes assets
						</animated.text>
					</g>

					{/* Arrow to manifest */}
					<animated.line
						markerEnd={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'url(#ssr-arrow-yellow-dark)'
								: 'url(#ssr-arrow-yellow-light)'
						)}
						stroke={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.accentTertiary
								: light.accentTertiary
						)}
						strokeWidth={2}
						x1={110}
						x2={110}
						y1={150}
						y2={175}
					/>

					{/* Manifest box */}
					<g transform="translate(0, 180)">
						<animated.rect
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.background
									: light.background
							)}
							height={80}
							rx={12}
							stroke={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.accentTertiary
									: light.accentTertiary
							)}
							strokeWidth={2}
							width={220}
						/>
						<animated.text
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.accentTertiary
									: light.accentTertiary
							)}
							fontSize={18}
							fontWeight={700}
							x={24}
							y={35}
						>
							Manifest
						</animated.text>
						<animated.text
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? dark.textMuted
									: light.textMuted
							)}
							fontSize={13}
							x={24}
							y={58}
						>
							Route → asset map
						</animated.text>
					</g>

					{/* "Runs Once" label */}
					<animated.text
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.textMuted
								: light.textMuted
						)}
						fontSize={11}
						fontStyle="italic"
						textAnchor="middle"
						x={110}
						y={280}
					>
						Runs once at boot
					</animated.text>
				</g>

				{/* Vertical divider */}
				<animated.line
					stroke={themeSprings.theme.to((t) =>
						t.endsWith('dark') ? dark.border : light.border
					)}
					strokeDasharray="6,4"
					strokeWidth={1}
					x1={290}
					x2={290}
					y1={30}
					y2={290}
				/>

				{/* ===== REQUEST PHASE (right side) ===== */}
				<g transform="translate(320, 30)">
					<animated.rect
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.accentSecondary
								: light.accentSecondary
						)}
						height={30}
						opacity={0.15}
						rx={6}
						width={150}
					/>
					<animated.text
						dominantBaseline="middle"
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.accentSecondary
								: light.accentSecondary
						)}
						fontSize={13}
						fontWeight={700}
						x={16}
						y={16}
					>
						EACH REQUEST
					</animated.text>

					{/* Server request flow - horizontal */}
					{[
						{ desc: 'Incoming', title: 'Request', x: 0 },
						{ desc: 'Find handler', title: 'Route', x: 150 },
						{ desc: 'JSX → HTML', title: 'Render', x: 300 },
						{ desc: 'Progressive', title: 'Stream', x: 450 }
					].map((step, i) => (
						<g key={i} transform={`translate(${step.x}, 50)`}>
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.background
										: light.background
								)}
								height={70}
								rx={10}
								stroke={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.accentSecondary
										: light.accentSecondary
								)}
								strokeWidth={2}
								width={135}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.accentSecondary
										: light.accentSecondary
								)}
								fontSize={15}
								fontWeight={700}
								x={16}
								y={30}
							>
								{step.title}
							</animated.text>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.textMuted
										: light.textMuted
								)}
								fontSize={12}
								x={16}
								y={52}
							>
								{step.desc}
							</animated.text>
							{i < 3 && (
								<animated.line
									markerEnd={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'url(#ssr-arrow-green-dark)'
											: 'url(#ssr-arrow-green-light)'
									)}
									stroke={themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? dark.accentSecondary
											: light.accentSecondary
									)}
									strokeWidth={2}
									x1={140}
									x2={148}
									y1={35}
									y2={35}
								/>
							)}
						</g>
					))}

					{/* Arrow down to client */}
					<animated.line
						markerEnd={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'url(#ssr-arrow-cyan-dark)'
								: 'url(#ssr-arrow-cyan-light)'
						)}
						stroke={themeSprings.theme.to((t) =>
							t.endsWith('dark') ? dark.accent : light.accent
						)}
						strokeWidth={2}
						x1={518}
						x2={518}
						y1={125}
						y2={155}
					/>

					{/* Client section */}
					<g transform="translate(0, 165)">
						<animated.rect
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark') ? dark.accent : light.accent
							)}
							height={26}
							opacity={0.15}
							rx={6}
							width={80}
						/>
						<animated.text
							dominantBaseline="middle"
							fill={themeSprings.theme.to((t) =>
								t.endsWith('dark') ? dark.accent : light.accent
							)}
							fontSize={12}
							fontWeight={700}
							x={14}
							y={14}
						>
							CLIENT
						</animated.text>

						{/* Hydrate box */}
						<g transform="translate(450, 30)">
							<animated.rect
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.background
										: light.background
								)}
								height={70}
								rx={10}
								stroke={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.accent
										: light.accent
								)}
								strokeWidth={2}
								width={135}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.accent
										: light.accent
								)}
								fontSize={15}
								fontWeight={700}
								x={16}
								y={28}
							>
								Hydrate
							</animated.text>
							<animated.text
								fill={themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? dark.textMuted
										: light.textMuted
								)}
								fontSize={12}
								x={16}
								y={48}
							>
								Interactive
							</animated.text>
						</g>
					</g>

					{/* "Per request" label */}
					<animated.text
						fill={themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? dark.textMuted
								: light.textMuted
						)}
						fontSize={11}
						fontStyle="italic"
						x={0}
						y={280}
					>
						Repeats for each request
					</animated.text>
				</g>
			</svg>
		</animated.div>
	);
};
