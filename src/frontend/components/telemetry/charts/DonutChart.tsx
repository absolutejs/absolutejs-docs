import {
	PERCENT_SCALE,
	TELEMETRY_DONUT_CHART_LAYOUT
} from '../../../../constants';
import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { getColors, svgContainerStyle } from '../../diagrams/diagramStyles';

type DonutChartDatum = {
	label: string;
	value: number;
};

type DonutChartProps = {
	data: DonutChartDatum[];
	themeSprings: ThemeSprings;
};

const viewWidth = 420;
const viewHeight = 260;
const centerX = 130;
const centerY = 130;
const outerR = PERCENT_SCALE;
const innerR = 60;

const sliceColors = [
	'#818CF8',
	'#A5B4FC',
	'#FFD93D',
	'#FF6B6B',
	'#87CEEB',
	'#DDA0DD',
	'#FFB347',
	'#98D8C8'
];

const toRad = (deg: number) =>
	(deg * Math.PI) / TELEMETRY_DONUT_CHART_LAYOUT.halfCircleDegrees;

const polarToCart = (
	chartCenterX: number,
	chartCenterY: number,
	radius: number,
	angleDeg: number
) => ({
	x:
		chartCenterX +
		radius *
			Math.cos(
				toRad(
					angleDeg - TELEMETRY_DONUT_CHART_LAYOUT.quarterTurnDegrees
				)
			),
	y:
		chartCenterY +
		radius *
			Math.sin(
				toRad(
					angleDeg - TELEMETRY_DONUT_CHART_LAYOUT.quarterTurnDegrees
				)
			)
});

const arcPath = (
	chartCenterX: number,
	chartCenterY: number,
	outer: number,
	inner: number,
	startAngle: number,
	endAngle: number
) => {
	const sweep = endAngle - startAngle;

	// Full circle case
	if (sweep >= TELEMETRY_DONUT_CHART_LAYOUT.fullCircleSweepThreshold) {
		const midAngle =
			startAngle + TELEMETRY_DONUT_CHART_LAYOUT.halfCircleDegrees;
		const outerStart = polarToCart(
			chartCenterX,
			chartCenterY,
			outer,
			startAngle
		);
		const outerMidpoint = polarToCart(
			chartCenterX,
			chartCenterY,
			outer,
			midAngle
		);
		const innerStart = polarToCart(
			chartCenterX,
			chartCenterY,
			inner,
			startAngle
		);
		const innerMidpoint = polarToCart(
			chartCenterX,
			chartCenterY,
			inner,
			midAngle
		);

		return [
			`M ${outerStart.x} ${outerStart.y}`,
			`A ${outer} ${outer} 0 0 1 ${outerMidpoint.x} ${outerMidpoint.y}`,
			`A ${outer} ${outer} 0 0 1 ${outerStart.x} ${outerStart.y}`,
			`M ${innerStart.x} ${innerStart.y}`,
			`A ${inner} ${inner} 0 0 0 ${innerMidpoint.x} ${innerMidpoint.y}`,
			`A ${inner} ${inner} 0 0 0 ${innerStart.x} ${innerStart.y}`,
			'Z'
		].join(' ');
	}

	const large =
		sweep > TELEMETRY_DONUT_CHART_LAYOUT.halfCircleDegrees ? 1 : 0;
	const outerStart = polarToCart(
		chartCenterX,
		chartCenterY,
		outer,
		startAngle
	);
	const outerEnd = polarToCart(chartCenterX, chartCenterY, outer, endAngle);
	const innerEnd = polarToCart(chartCenterX, chartCenterY, inner, endAngle);
	const innerStart = polarToCart(
		chartCenterX,
		chartCenterY,
		inner,
		startAngle
	);

	return [
		`M ${outerStart.x} ${outerStart.y}`,
		`A ${outer} ${outer} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
		`L ${innerEnd.x} ${innerEnd.y}`,
		`A ${inner} ${inner} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
		'Z'
	].join(' ');
};

const containerStyle: CSSProperties = {
	minWidth: '350px'
};

export const DonutChart = ({ data, themeSprings }: DonutChartProps) => {
	const total = data.reduce((sum, d) => sum + d.value, 0);
	if (total === 0) return null;

	const slices: {
		datum: DonutChartDatum;
		startAngle: number;
		endAngle: number;
		color: string;
		pct: number;
	}[] = [];
	let currentAngle = 0;

	for (let datumIndex = 0; datumIndex < data.length; datumIndex++) {
		const datum = data[datumIndex];
		if (!datum) continue;
		const pct = datum.value / total;
		const sweep = pct * TELEMETRY_DONUT_CHART_LAYOUT.fullCircleDegrees;
		slices.push({
			color: sliceColors[datumIndex % sliceColors.length] ?? '#818CF8',
			datum,
			endAngle: currentAngle + sweep,
			pct,
			startAngle: currentAngle
		});
		currentAngle += sweep;
	}

	const legendX =
		centerX + outerR + TELEMETRY_DONUT_CHART_LAYOUT.legendOffsetX;
	const { legendStartY } = TELEMETRY_DONUT_CHART_LAYOUT;
	const { legendRowHeight } = TELEMETRY_DONUT_CHART_LAYOUT;

	return (
		<animated.div style={containerStyle}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
			>
				{/* Slices */}
				{slices.map((slice) => (
					<path
						d={arcPath(
							centerX,
							centerY,
							outerR,
							innerR,
							slice.startAngle,
							slice.endAngle
						)}
						fill={slice.color}
						key={slice.datum.label}
						opacity={0.85}
					/>
				))}

				{/* Center total */}
				<animated.text
					fill={themeSprings.theme.to((t) => {
						const colors = getColors(t.endsWith('dark'));

						return colors.textMuted;
					})}
					fontSize={11}
					textAnchor="middle"
					x={centerX}
					y={
						centerY -
						TELEMETRY_DONUT_CHART_LAYOUT.centerLabelOffsetY
					}
				>
					Total
				</animated.text>
				<animated.text
					fill={themeSprings.theme.to((t) => {
						const colors = getColors(t.endsWith('dark'));

						return colors.text;
					})}
					fontSize={18}
					fontWeight={600}
					textAnchor="middle"
					x={centerX}
					y={
						centerY +
						TELEMETRY_DONUT_CHART_LAYOUT.centerValueOffsetY
					}
				>
					{total.toLocaleString()}
				</animated.text>

				{/* Legend */}
				{slices.map((slice, sliceIndex) => {
					const legendY = legendStartY + sliceIndex * legendRowHeight;

					return (
						<g key={slice.datum.label}>
							<rect
								fill={slice.color}
								height={
									TELEMETRY_DONUT_CHART_LAYOUT.legendSwatchSize
								}
								rx={2}
								width={
									TELEMETRY_DONUT_CHART_LAYOUT.legendSwatchSize
								}
								x={legendX}
								y={legendY}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) => {
									const colors = getColors(
										t.endsWith('dark')
									);

									return colors.text;
								})}
								fontSize={11}
								x={
									legendX +
									TELEMETRY_DONUT_CHART_LAYOUT.legendTextOffsetX
								}
								y={
									legendY +
									TELEMETRY_DONUT_CHART_LAYOUT.legendTextOffsetY
								}
							>
								{slice.datum.label ?? 'unknown'}
							</animated.text>
							<animated.text
								dx={TELEMETRY_DONUT_CHART_LAYOUT.legendValueDx}
								fill={themeSprings.theme.to((t) => {
									const colors = getColors(
										t.endsWith('dark')
									);

									return colors.textMuted;
								})}
								fontSize={10}
								textAnchor="end"
								x={
									legendX +
									TELEMETRY_DONUT_CHART_LAYOUT.legendTextOffsetX
								}
								y={
									legendY +
									TELEMETRY_DONUT_CHART_LAYOUT.legendTextOffsetY
								}
							>
								{(slice.pct * PERCENT_SCALE).toFixed(1)}%
							</animated.text>
						</g>
					);
				})}
			</svg>
		</animated.div>
	);
};
