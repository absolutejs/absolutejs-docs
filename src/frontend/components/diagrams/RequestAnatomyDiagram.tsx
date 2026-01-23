import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
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
					<g transform="translate(25, 75)">
						{/* Row 1 - Request Input */}
						{/* params */}
						<g>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								params
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Path parameters
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								extracted from URL
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								e.g. /user/:id
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								params.id
							</text>
						</g>

						{/* query */}
						<g transform={`translate(${cardWidth + cardGap}, 0)`}>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								query
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Query string values
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								after the ? in URL
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								e.g. ?limit=10
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								query.limit
							</text>
						</g>

						{/* body */}
						<g
							transform={`translate(${(cardWidth + cardGap) * 2}, 0)`}
						>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								body
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Request payload
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								JSON, form data,
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								or file uploads
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								body.email
							</text>
						</g>

						{/* Row 2 - Request Input continued */}
						{/* headers */}
						<g transform={`translate(0, ${cardHeight + rowGap})`}>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								headers
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								HTTP request headers
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Content-Type, Auth,
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								User-Agent, etc.
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								headers.auth
							</text>
						</g>

						{/* cookie */}
						<g
							transform={`translate(${cardWidth + cardGap}, ${cardHeight + rowGap})`}
						>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								cookie
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Reactive cookie store
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Read/write cookies
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								via .value property
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								cookie.session
							</text>
						</g>

						{/* path */}
						<g
							transform={`translate(${(cardWidth + cardGap) * 2}, ${cardHeight + rowGap})`}
						>
							<rect
								fill={colors.accent}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accent}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								path
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								URL pathname
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								The resource path
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								being requested
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								/users/123
							</text>
						</g>

						{/* Row 3 - Response Control */}
						{/* set */}
						<g
							transform={`translate(0, ${(cardHeight + rowGap) * 2})`}
						>
							<rect
								fill={colors.accentSecondary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentSecondary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								set
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Response config
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Modify status and
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								response headers
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								set.status = 201
							</text>
						</g>

						{/* status */}
						<g
							transform={`translate(${cardWidth + cardGap}, ${(cardHeight + rowGap) * 2})`}
						>
							<rect
								fill={colors.accentSecondary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentSecondary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								status
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Return with status
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Enables TypeScript
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								type narrowing
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								return status(201)
							</text>
						</g>

						{/* redirect */}
						<g
							transform={`translate(${(cardWidth + cardGap) * 2}, ${(cardHeight + rowGap) * 2})`}
						>
							<rect
								fill={colors.accentSecondary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentSecondary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								redirect
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Redirect to URL
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Supports custom
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								status (301, 302)
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								redirect('/login')
							</text>
						</g>

						{/* Row 4 - Advanced */}
						{/* request */}
						<g
							transform={`translate(0, ${(cardHeight + rowGap) * 3})`}
						>
							<rect
								fill={colors.accentTertiary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentTertiary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								request
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Web Standard
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								Request object for
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								low-level access
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								request.url
							</text>
						</g>

						{/* store */}
						<g
							transform={`translate(${cardWidth + cardGap}, ${(cardHeight + rowGap) * 3})`}
						>
							<rect
								fill={colors.accentTertiary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentTertiary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								store
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Global mutable state
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								for Elysia instance
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								Shared across reqs
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								store.db
							</text>
						</g>

						{/* derived */}
						<g
							transform={`translate(${(cardWidth + cardGap) * 2}, ${(cardHeight + rowGap) * 3})`}
						>
							<rect
								fill={colors.accentTertiary}
								height={cardHeight}
								opacity={0.12}
								rx={8}
								width={cardWidth}
							/>
							<text
								fill={colors.accentTertiary}
								fontFamily="monospace"
								fontSize={14}
								fontWeight={700}
								x={15}
								y={26}
							>
								...derived
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={52}
							>
								Custom properties
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={72}
							>
								added via .derive()
							</text>
							<text
								fill={colors.textMuted}
								fontSize={9}
								x={15}
								y={92}
							>
								or .state()
							</text>
							<text
								fill={colors.text}
								fontFamily="monospace"
								fontSize={10}
								x={15}
								y={122}
							>
								user, auth, etc.
							</text>
						</g>
					</g>
				</g>
			</svg>
		</animated.div>
	);
};
