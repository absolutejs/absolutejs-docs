import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramColors,
	diagramContainerStyle,
	svgContainerStyle
} from './diagramStyles';

type BuildPipelineDiagramProps = {
	themeSprings: ThemeSprings;
};

export const BuildPipelineDiagram = ({
	themeSprings
}: BuildPipelineDiagramProps) => {
	const svgWidth = 1100;
	const svgHeight = 520;

	const color = (key: keyof typeof diagramColors.dark) =>
		themeSprings.theme.to((theme) =>
			theme.endsWith('dark')
				? diagramColors.dark[key]
				: diagramColors.light[key]
		);

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>
				<defs>
					<marker
						id="build-arrow"
						markerHeight={10}
						markerWidth={10}
						orient="auto"
						refX={9}
						refY={5}
					>
						<animated.polygon
							fill={color('arrow')}
							points="0 0, 10 5, 0 10"
						/>
					</marker>
				</defs>

				{/* Title */}
				<animated.text
					fill={color('text')}
					fontSize={24}
					fontWeight={600}
					textAnchor="middle"
					x={svgWidth / 2}
					y={35}
				>
					Build Pipeline
				</animated.text>

				{/* Input: Frontend directories */}
				<g transform="translate(30, 60)">
					<animated.text
						fill={color('textMuted')}
						fontSize={14}
						fontWeight={600}
						letterSpacing="0.05em"
					>
						INPUT
					</animated.text>
					<animated.rect
						fill={color('background')}
						height={180}
						rx={10}
						stroke={color('border')}
						strokeWidth={1.5}
						width={220}
						y={18}
					/>
					<animated.text
						fill={color('text')}
						fontSize={16}
						fontWeight={600}
						x={18}
						y={52}
					>
						Frontend Directories
					</animated.text>
					{['pages/', 'styles/'].map((label, i) => (
						<g key={i} transform={`translate(18, ${78 + i * 50})`}>
							<animated.rect
								fill={color('accent')}
								height={38}
								opacity={0.15}
								rx={6}
								width={184}
							/>
							<animated.text
								fill={color('accent')}
								fontSize={15}
								fontWeight={600}
								x={14}
								y={25}
							>
								{label}
							</animated.text>
						</g>
					))}
				</g>

				{/* Arrow to build() */}
				<g transform="translate(260, 168)">
					<animated.line
						markerEnd="url(#build-arrow)"
						stroke={color('arrow')}
						strokeWidth={2.5}
						x1={0}
						x2={55}
						y1={0}
						y2={0}
					/>
				</g>

				{/* build() function */}
				<g transform="translate(325, 60)">
					<animated.rect
						fill={color('accent')}
						height={180}
						opacity={0.1}
						rx={12}
						width={320}
						y={18}
					/>
					<animated.rect
						fill="none"
						height={180}
						rx={12}
						stroke={color('accent')}
						strokeWidth={2.5}
						width={320}
						y={18}
					/>
					<animated.text
						fill={color('accent')}
						fontSize={32}
						fontWeight={700}
						textAnchor="middle"
						x={160}
						y={62}
					>
						build()
					</animated.text>
					<animated.line
						stroke={color('accent')}
						strokeOpacity={0.3}
						strokeWidth={1}
						x1={28}
						x2={292}
						y1={82}
						y2={82}
					/>
					<animated.text
						fill={color('textMuted')}
						fontSize={16}
						textAnchor="middle"
						x={160}
						y={110}
					>
						Bundles all components
					</animated.text>
					<animated.text
						fill={color('textMuted')}
						fontSize={16}
						textAnchor="middle"
						x={160}
						y={136}
					>
						Generates content hashes
					</animated.text>
					<animated.text
						fill={color('textMuted')}
						fontSize={16}
						textAnchor="middle"
						x={160}
						y={162}
					>
						Creates asset manifest
					</animated.text>
				</g>

				{/* Arrow to manifest */}
				<g transform="translate(655, 168)">
					<animated.line
						markerEnd="url(#build-arrow)"
						stroke={color('arrow')}
						strokeWidth={2.5}
						x1={0}
						x2={55}
						y1={0}
						y2={0}
					/>
				</g>

				{/* Output: Manifest */}
				<g transform="translate(720, 60)">
					<animated.text
						fill={color('textMuted')}
						fontSize={14}
						fontWeight={600}
						letterSpacing="0.05em"
					>
						OUTPUT
					</animated.text>
					<animated.rect
						fill={color('background')}
						height={180}
						rx={10}
						stroke={color('accentSecondary')}
						strokeWidth={2}
						width={350}
						y={18}
					/>
					<animated.text
						fill={color('accentSecondary')}
						fontSize={16}
						fontWeight={600}
						x={20}
						y={50}
					>
						Manifest Object
					</animated.text>
					<g transform="translate(20, 78)">
						<animated.text
							fill={color('textMuted')}
							fontFamily="monospace"
							fontSize={14}
						>
							{'{'}
						</animated.text>
						<animated.text
							fill={color('accent')}
							fontFamily="monospace"
							fontSize={14}
							x={16}
							y={22}
						>
							HomeIndex:
						</animated.text>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={13}
							x={28}
							y={40}
						>
							&quot;/build/Home-a1b2c3.js&quot;
						</animated.text>
						<animated.text
							fill={color('accent')}
							fontFamily="monospace"
							fontSize={14}
							x={16}
							y={62}
						>
							HomeCSS:
						</animated.text>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={13}
							x={28}
							y={80}
						>
							&quot;/assets/css/home.m93k7s.css&quot;
						</animated.text>
						<animated.text
							fill={color('textMuted')}
							fontFamily="monospace"
							fontSize={14}
							y={102}
						>
							{'}'}
						</animated.text>
					</g>
				</g>

				{/* Usage section at bottom */}
				<g transform="translate(30, 300)">
					<animated.text
						fill={color('textMuted')}
						fontSize={14}
						fontWeight={600}
						letterSpacing="0.05em"
					>
						USAGE
					</animated.text>
					<animated.rect
						fill={color('backgroundAlt')}
						height={150}
						rx={10}
						width={1040}
						y={18}
					/>

					{/* asset() function */}
					<g transform="translate(24, 42)">
						<animated.rect
							fill={color('accentSecondary')}
							height={100}
							opacity={0.1}
							rx={8}
							stroke={color('accentSecondary')}
							strokeWidth={2}
							width={280}
						/>
						<animated.text
							fill={color('accentSecondary')}
							fontSize={18}
							fontWeight={700}
							x={24}
							y={38}
						>
							asset(manifest, key)
						</animated.text>
						<animated.text
							fill={color('textMuted')}
							fontSize={14}
							x={24}
							y={65}
						>
							Looks up bundled path
						</animated.text>
						<animated.text
							fill={color('textMuted')}
							fontSize={14}
							x={24}
							y={86}
						>
							from the manifest object
						</animated.text>
					</g>

					{/* Arrow */}
					<animated.line
						markerEnd="url(#build-arrow)"
						stroke={color('arrow')}
						strokeWidth={2.5}
						x1={320}
						x2={380}
						y1={92}
						y2={92}
					/>

					{/* Route handler example */}
					<g transform="translate(400, 42)">
						<animated.rect
							fill={color('background')}
							height={100}
							rx={8}
							stroke={color('border')}
							strokeWidth={1.5}
							width={615}
						/>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={14}
							x={20}
							y={18}
						>
							.get(&apos;/&apos;, () =&gt; handleReactPageRequest(
						</animated.text>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={14}
							x={44}
							y={36}
						>
							Home,
						</animated.text>
						<animated.text
							fill={color('accentSecondary')}
							fontFamily="monospace"
							fontSize={14}
							fontWeight={600}
							x={44}
							y={54}
						>
							asset(manifest, &apos;HomeIndex&apos;)
							<animated.tspan
								fill={color('text')}
								fontWeight={400}
							>
								,
							</animated.tspan>
						</animated.text>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={14}
							x={44}
							y={72}
						>
							{'{ '}
							<animated.tspan fill={color('accent')}>
								cssPath
							</animated.tspan>
							{': '}
							<animated.tspan
								fill={color('accentSecondary')}
								fontWeight={600}
							>
								asset(manifest, &apos;HomeCSS&apos;)
							</animated.tspan>
							{' }'}
						</animated.text>
						<animated.text
							fill={color('text')}
							fontFamily="monospace"
							fontSize={14}
							x={20}
							y={90}
						>
							))
						</animated.text>
					</g>
				</g>
			</svg>
		</animated.div>
	);
};
