import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	diagramSvgWrapperStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';

type OAuthFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

export const OAuthFlowDiagram = ({ themeSprings }: OAuthFlowDiagramProps) => {
	const isDark =
		themeSprings.theme.get()?.toString().endsWith('dark') ?? true;
	const colors = getColors(isDark);

	const svgWidth = 720;
	const svgHeight = 500;

	// Entity positions
	const userX = 70;
	const appX = 230;
	const authX = 420;
	const providerX = 610;

	// Vertical layout
	const headerY = 15;
	const headerHeight = 36;
	const lifelineStart = headerY + headerHeight + 8;
	const lifelineEnd = svgHeight - 50;
	const stepStart = lifelineStart + 30;
	const stepGap = 58;

	const entities = [
		{ label: 'User', x: userX, width: 100 },
		{ label: 'Your App', x: appX, width: 100 },
		{ label: 'AbsoluteAuth', x: authX, width: 160 },
		{ label: 'Provider', x: providerX, width: 120 }
	];

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<div style={diagramSvgWrapperStyle}>
				<svg
					preserveAspectRatio="xMidYMid meet"
					style={svgContainerStyle}
					viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				>
					<defs>
						<marker
							fill={colors.arrow}
							id="oauth-arrow"
							markerHeight={6}
							markerWidth={6}
							orient="auto"
							refX={5}
							refY={3}
						>
							<polygon points="0 0, 6 3, 0 6" />
						</marker>
						<marker
							fill={colors.accent}
							id="oauth-arrow-accent"
							markerHeight={6}
							markerWidth={6}
							orient="auto"
							refX={5}
							refY={3}
						>
							<polygon points="0 0, 6 3, 0 6" />
						</marker>
						<marker
							fill={colors.accentSecondary}
							id="oauth-arrow-success"
							markerHeight={6}
							markerWidth={6}
							orient="auto"
							refX={5}
							refY={3}
						>
							<polygon points="0 0, 6 3, 0 6" />
						</marker>
					</defs>

					{/* Entity headers */}
					{entities.map((entity, i) => (
						<g key={i}>
							<rect
								fill={colors.background}
								height={headerHeight}
								rx={6}
								stroke={i === 2 ? colors.accent : colors.border}
								strokeWidth={i === 2 ? 2 : 1}
								width={entity.width}
								x={entity.x - entity.width / 2}
								y={headerY}
							/>
							<text
								dominantBaseline="middle"
								fill={i === 2 ? colors.accent : colors.text}
								fontSize={12}
								fontWeight={600}
								textAnchor="middle"
								x={entity.x}
								y={headerY + headerHeight / 2 + 1}
							>
								{entity.label}
							</text>
							{/* Vertical lifeline */}
							<line
								stroke={colors.border}
								strokeDasharray="4,3"
								strokeWidth={1}
								x1={entity.x}
								x2={entity.x}
								y1={lifelineStart}
								y2={lifelineEnd}
							/>
						</g>
					))}

					{/* Step 1: User clicks login */}
					<g>
						<line
							markerEnd="url(#oauth-arrow)"
							stroke={colors.arrow}
							strokeWidth={1.5}
							x1={userX + 8}
							x2={appX - 8}
							y1={stepStart}
							y2={stepStart}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.border}
							strokeWidth={1}
							width={152}
							x={(userX + appX) / 2 - 76}
							y={stepStart - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.text}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(userX + appX) / 2}
							y={stepStart - 19}
						>
							1. Login click
						</text>
					</g>

					{/* Step 2: App redirects to auth route */}
					<g>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeWidth={1.5}
							x1={appX + 8}
							x2={authX - 8}
							y1={stepStart + stepGap}
							y2={stepStart + stepGap}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={270}
							x={(appX + authX) / 2 - 135}
							y={stepStart + stepGap - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(appX + authX) / 2}
							y={stepStart + stepGap - 19}
						>
							2. /oauth2/auth/:provider
						</text>
					</g>

					{/* Step 3: Generate state + PKCE (self-action) */}
					<g>
						<rect
							fill={colors.pillBg}
							height={46}
							rx={4}
							stroke={colors.borderAccent}
							strokeDasharray="3,2"
							strokeWidth={1}
							width={160}
							x={authX - 80}
							y={stepStart + stepGap * 2 - 23}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={600}
							textAnchor="middle"
							x={authX}
							y={stepStart + stepGap * 2 - 6}
						>
							3. State + PKCE
						</text>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={9}
							opacity={0.8}
							textAnchor="middle"
							x={authX}
							y={stepStart + stepGap * 2 + 10}
						>
							generate
						</text>
					</g>

					{/* Step 4: Redirect to provider */}
					<g>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeWidth={1.5}
							x1={authX + 8}
							x2={providerX - 8}
							y1={stepStart + stepGap * 3}
							y2={stepStart + stepGap * 3}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={135}
							x={(authX + providerX) / 2 - 67}
							y={stepStart + stepGap * 3 - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={stepStart + stepGap * 3 - 19}
						>
							4. Redirect
						</text>
					</g>

					{/* Step 5: User authenticates (self-action at provider) */}
					<g>
						<rect
							fill={colors.pillBg}
							height={52}
							rx={4}
							stroke={colors.accentTertiary}
							strokeDasharray="3,2"
							strokeWidth={1}
							width={145}
							x={providerX - 72}
							y={stepStart + stepGap * 3.6 - 26}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accentTertiary}
							fontSize={10}
							fontWeight={600}
							textAnchor="middle"
							x={providerX}
							y={stepStart + stepGap * 3.6 - 6}
						>
							5. User login
						</text>
						<text
							dominantBaseline="middle"
							fill={colors.textMuted}
							fontSize={9}
							textAnchor="middle"
							x={providerX}
							y={stepStart + stepGap * 3.6 + 12}
						>
							(external)
						</text>
					</g>

					{/* Step 6: Callback with code */}
					<g>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeWidth={1.5}
							x1={providerX - 8}
							x2={authX + 8}
							y1={stepStart + stepGap * 4.6}
							y2={stepStart + stepGap * 4.6}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={180}
							x={(authX + providerX) / 2 - 90}
							y={stepStart + stepGap * 4.6 - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={stepStart + stepGap * 4.6 - 19}
						>
							6. Callback + code
						</text>
					</g>

					{/* Step 7: Exchange code for token */}
					<g>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeWidth={1.5}
							x1={authX + 8}
							x2={providerX - 8}
							y1={stepStart + stepGap * 5.5}
							y2={stepStart + stepGap * 5.5}
						/>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeDasharray="4,3"
							strokeWidth={1.5}
							x1={providerX - 8}
							x2={authX + 8}
							y1={stepStart + stepGap * 5.5 + 12}
							y2={stepStart + stepGap * 5.5 + 12}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={280}
							x={(authX + providerX) / 2 - 140}
							y={stepStart + stepGap * 5.5 - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={stepStart + stepGap * 5.5 - 19}
						>
							7. Exchange code for token
						</text>
					</g>

					{/* Step 8: Create session & redirect back */}
					<g>
						<line
							markerEnd="url(#oauth-arrow-success)"
							stroke={colors.accentSecondary}
							strokeWidth={1.5}
							x1={authX - 8}
							x2={userX + 8}
							y1={stepStart + stepGap * 6.4}
							y2={stepStart + stepGap * 6.4}
						/>
						<rect
							fill={colors.pillBg}
							height={22}
							rx={4}
							stroke={colors.accentSecondary}
							strokeWidth={1}
							width={180}
							x={(userX + authX) / 2 - 90}
							y={stepStart + stepGap * 6.4 - 30}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accentSecondary}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(userX + authX) / 2}
							y={stepStart + stepGap * 6.4 - 19}
						>
							8. Session created
						</text>
					</g>

					{/* Legend */}
					<g transform={`translate(15, ${svgHeight - 25})`}>
						<rect
							fill={colors.accent}
							height={8}
							rx={2}
							width={8}
						/>
						<text
							fill={colors.textMuted}
							fontSize={10}
							x={14}
							y={7}
						>
							AbsoluteAuth handles steps 2-8 automatically
						</text>
					</g>
				</svg>
			</div>
		</animated.div>
	);
};
