import { OAUTH_FLOW_DIAGRAM_LAYOUT, PERCENT_SCALE } from '../../../constants';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	diagramContainerStyle,
	diagramSvgWrapperStyle,
	getColors,
	svgContainerStyle
} from './diagramStyles';
import { OAuthFlowMarkers } from './OAuthFlowMarkers';

type OAuthFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

type OAuthEntity = {
	label: string;
	width: number;
	x: number;
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
	const lifelineStart =
		headerY + headerHeight + OAUTH_FLOW_DIAGRAM_LAYOUT.lifelineStartOffsetY;
	const lifelineEnd =
		svgHeight - OAUTH_FLOW_DIAGRAM_LAYOUT.lifelineBottomPadding;
	const stepStart =
		lifelineStart + OAUTH_FLOW_DIAGRAM_LAYOUT.stepStartOffsetY;
	const stepGap = OAUTH_FLOW_DIAGRAM_LAYOUT.stepGapY;

	const entities: OAuthEntity[] = [
		{ label: 'User', width: PERCENT_SCALE, x: userX },
		{ label: 'Your App', width: PERCENT_SCALE, x: appX },
		{
			label: 'AbsoluteAuth',
			width: OAUTH_FLOW_DIAGRAM_LAYOUT.accentEntityWidth,
			x: authX
		},
		{
			label: 'Provider',
			width: OAUTH_FLOW_DIAGRAM_LAYOUT.providerEntityWidth,
			x: providerX
		}
	];

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<div style={diagramSvgWrapperStyle}>
				<svg
					preserveAspectRatio="xMidYMid meet"
					style={svgContainerStyle}
					viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				>
					<OAuthFlowMarkers
						accentColor={colors.accent}
						accentSecondaryColor={colors.accentSecondary}
						arrowColor={colors.arrow}
					/>

					{/* Entity headers */}
					{entities.map((entity, entityIndex) => (
						<g key={entity.label}>
							<rect
								fill={colors.background}
								height={headerHeight}
								rx={6}
								stroke={
									entityIndex ===
									OAUTH_FLOW_DIAGRAM_LAYOUT.accentEntityIndex
										? colors.accent
										: colors.border
								}
								strokeWidth={
									entityIndex ===
									OAUTH_FLOW_DIAGRAM_LAYOUT.accentEntityIndex
										? 2
										: 1
								}
								width={entity.width}
								x={entity.x - entity.width / 2}
								y={headerY}
							/>
							<text
								dominantBaseline="middle"
								fill={
									entityIndex ===
									OAUTH_FLOW_DIAGRAM_LAYOUT.accentEntityIndex
										? colors.accent
										: colors.text
								}
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
							x1={
								userX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={appX - OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset}
							y1={stepStart}
							y2={stepStart}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.border}
							strokeWidth={1}
							width={152}
							x={
								(userX + appX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.loginClickPillHalfWidth
							}
							y={
								stepStart -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.text}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(userX + appX) / 2}
							y={
								stepStart -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillLabelOffsetY
							}
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
							x1={appX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset}
							x2={
								authX - OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={stepStart + stepGap}
							y2={stepStart + stepGap}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={270}
							x={
								(appX + authX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.authRoutePillHalfWidth
							}
							y={
								stepStart +
								stepGap -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(appX + authX) / 2}
							y={
								stepStart +
								stepGap -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillLabelOffsetY
							}
						>
							2. /oauth2/auth/:provider
						</text>
					</g>

					{/* Step 3: Generate state + PKCE (self-action) */}
					<g>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stateBoxHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.borderAccent}
							strokeDasharray={`${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashFirst},${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashSecond}`}
							strokeWidth={1}
							width={OAUTH_FLOW_DIAGRAM_LAYOUT.stateBoxWidth}
							x={
								authX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stateBoxWidth / 2
							}
							y={
								stepStart +
								stepGap * 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stateBoxOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={600}
							textAnchor="middle"
							x={authX}
							y={
								stepStart +
								stepGap * 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stateTitleOffsetY
							}
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
							y={
								stepStart +
								stepGap * 2 +
								OAUTH_FLOW_DIAGRAM_LAYOUT.stateSubtitleOffsetY
							}
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
							x1={
								authX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={
								providerX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.providerRedirectStepIndex
							}
							y2={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.providerRedirectStepIndex
							}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={OAUTH_FLOW_DIAGRAM_LAYOUT.redirectPillWidth}
							x={
								(authX + providerX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.redirectPillHalfWidth
							}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.providerRedirectStepIndex -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.providerRedirectStepIndex -
								OAUTH_FLOW_DIAGRAM_LAYOUT.redirectLabelOffsetY
							}
						>
							4. Redirect
						</text>
					</g>

					{/* Step 5: User authenticates (self-action at provider) */}
					<g>
						<rect
							fill={colors.pillBg}
							height={
								OAUTH_FLOW_DIAGRAM_LAYOUT.providerLoginBoxHeight
							}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.accentTertiary}
							strokeDasharray={`${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashFirst},${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashSecond}`}
							strokeWidth={1}
							width={
								OAUTH_FLOW_DIAGRAM_LAYOUT.providerLoginBoxWidth
							}
							x={
								providerX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.providerLoginHalfWidth
							}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.callbackLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.providerLoginOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accentTertiary}
							fontSize={10}
							fontWeight={600}
							textAnchor="middle"
							x={providerX}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.callbackLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.providerLoginTitleOffsetY
							}
						>
							5. User login
						</text>
						<text
							dominantBaseline="middle"
							fill={colors.textMuted}
							fontSize={9}
							textAnchor="middle"
							x={providerX}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.callbackLoopDx +
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionSelfActionHeight
							}
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
							x1={
								providerX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={
								authX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangeLoopDx
							}
							y2={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangeLoopDx
							}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={
								OAUTH_FLOW_DIAGRAM_LAYOUT.callbackCodePillWidth
							}
							x={
								(authX + providerX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.callbackHalfWidth
							}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangeLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangeLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.callbackCodeLabelY
							}
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
							x1={
								authX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={
								providerX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx
							}
							y2={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx
							}
						/>
						<line
							markerEnd="url(#oauth-arrow-accent)"
							stroke={colors.accent}
							strokeDasharray={`${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashFirst + 1},${OAUTH_FLOW_DIAGRAM_LAYOUT.pkceDashFirst}`}
							strokeWidth={1.5}
							x1={
								providerX -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={
								authX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx +
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionSelfActionHeight
							}
							y2={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx +
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionSelfActionHeight
							}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.borderAccent}
							strokeWidth={1}
							width={
								OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangePillWidth
							}
							x={
								(authX + providerX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.tokenExchangeHalfWidth
							}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accent}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(authX + providerX) / 2}
							y={
								stepStart +
								stepGap *
									OAUTH_FLOW_DIAGRAM_LAYOUT.sessionLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillLabelOffsetY
							}
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
							x1={
								authX - OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							x2={
								userX + OAUTH_FLOW_DIAGRAM_LAYOUT.stepArrowInset
							}
							y1={
								stepStart +
								stepGap * OAUTH_FLOW_DIAGRAM_LAYOUT.doneLoopDx
							}
							y2={
								stepStart +
								stepGap * OAUTH_FLOW_DIAGRAM_LAYOUT.doneLoopDx
							}
						/>
						<rect
							fill={colors.pillBg}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillHeight}
							rx={OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillRadius}
							stroke={colors.accentSecondary}
							strokeWidth={1}
							width={
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionCreatedPillWidth
							}
							x={
								(userX + authX) / 2 -
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionCreatedHalfWidth
							}
							y={
								stepStart +
								stepGap * OAUTH_FLOW_DIAGRAM_LAYOUT.doneLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.stepPillOffsetY
							}
						/>
						<text
							dominantBaseline="middle"
							fill={colors.accentSecondary}
							fontSize={10}
							fontWeight={500}
							textAnchor="middle"
							x={(userX + authX) / 2}
							y={
								stepStart +
								stepGap * OAUTH_FLOW_DIAGRAM_LAYOUT.doneLoopDx -
								OAUTH_FLOW_DIAGRAM_LAYOUT.sessionCreatedLabelY
							}
						>
							8. Session created
						</text>
					</g>

					{/* Legend */}
					<g
						transform={`translate(${OAUTH_FLOW_DIAGRAM_LAYOUT.legendOffsetX}, ${svgHeight - OAUTH_FLOW_DIAGRAM_LAYOUT.legendOffsetY})`}
					>
						<rect
							fill={colors.accent}
							height={OAUTH_FLOW_DIAGRAM_LAYOUT.legendSwatchSize}
							rx={2}
							width={OAUTH_FLOW_DIAGRAM_LAYOUT.legendSwatchSize}
						/>
						<text
							fill={colors.textMuted}
							fontSize={10}
							x={OAUTH_FLOW_DIAGRAM_LAYOUT.legendTextOffsetX}
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
