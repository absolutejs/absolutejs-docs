import { HALF, TELEMETRY_LINE_CHART_LAYOUT } from '../../../../constants';
import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { getColors, svgContainerStyle } from '../../diagrams/diagramStyles';

type LineChartSeries = {
	label: string;
	data: { date: string; value: number }[];
};

type LineChartProps = {
	series: LineChartSeries[];
	themeSprings: ThemeSprings;
};

type ChartPadding = {
	bottom: number;
	left: number;
	right: number;
	top: number;
};

const chartPadding: ChartPadding = { bottom: 50, left: 60, right: 20, top: 20 };
const viewWidth = 600;
const viewHeight = 260;
const chartWidth = viewWidth - chartPadding.left - chartPadding.right;
const chartHeight = viewHeight - chartPadding.top - chartPadding.bottom;

const seriesColors = [
	'#818CF8',
	'#FFD93D',
	'#FF6B6B',
	'#A5B4FC',
	'#87CEEB',
	'#DDA0DD'
];

const containerStyle: CSSProperties = {
	minWidth: '450px'
};

export const LineChart = ({ series, themeSprings }: LineChartProps) => {
	// Build unified date axis from all series
	const allDates = [
		...new Set(
			series.flatMap((lineSeries) =>
				lineSeries.data.map((datum) => datum.date)
			)
		)
	].sort();

	if (allDates.length === 0) return null;

	const maxValue = Math.max(
		...series.flatMap((lineSeries) =>
			lineSeries.data.map((datum) => datum.value)
		),
		1
	);

	const xScale = (dateIndex: number) =>
		chartPadding.left +
		(allDates.length > 1
			? (dateIndex / (allDates.length - 1)) * chartWidth
			: chartWidth / 2);

	const yScale = (value: number) =>
		chartPadding.top + chartHeight - (value / maxValue) * chartHeight;

	const yTicks = [
		0,
		TELEMETRY_LINE_CHART_LAYOUT.quarterTick,
		HALF,
		TELEMETRY_LINE_CHART_LAYOUT.threeQuarterTick,
		1
	].map((pct) => ({
		value: Math.round(maxValue * pct),
		y: chartPadding.top + chartHeight * (1 - pct)
	}));

	// Show a subset of date labels to avoid overlap
	const maxLabels = TELEMETRY_LINE_CHART_LAYOUT.maxDateLabels;
	const labelStep = Math.max(1, Math.ceil(allDates.length / maxLabels));

	return (
		<animated.div style={containerStyle}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
			>
				{/* Grid lines */}
				{yTicks.map((tick) => (
					<g key={tick.value}>
						<animated.line
							stroke={themeSprings.theme.to((t) => {
								const colors = getColors(t.endsWith('dark'));

								return colors.border;
							})}
							strokeWidth={HALF}
							x1={chartPadding.left}
							x2={viewWidth - chartPadding.right}
							y1={tick.y}
							y2={tick.y}
						/>
						<animated.text
							fill={themeSprings.theme.to((t) => {
								const colors = getColors(t.endsWith('dark'));

								return colors.textMuted;
							})}
							fontSize={10}
							textAnchor="end"
							x={
								chartPadding.left -
								TELEMETRY_LINE_CHART_LAYOUT.axisLabelOffsetX
							}
							y={
								tick.y +
								TELEMETRY_LINE_CHART_LAYOUT.axisLabelOffsetY
							}
						>
							{tick.value}
						</animated.text>
					</g>
				))}

				{/* Series lines and area fills */}
				{series.map((lineSeries, seriesIndex) => {
					const color =
						seriesColors[seriesIndex % seriesColors.length];
					const dateValueMap = new Map(
						lineSeries.data.map((datum) => [
							datum.date,
							datum.value
						])
					);

					const points = allDates.map((date, dateIndex) => ({
						x: xScale(dateIndex),
						y: yScale(dateValueMap.get(date) ?? 0)
					}));

					const linePoints = points
						.map((point) => `${point.x},${point.y}`)
						.join(' ');

					const [firstPoint] = points;
					const lastPointIndex = points.length - 1;
					const lastPoint = points[lastPointIndex];
					if (!firstPoint || !lastPoint) return null;

					const areaPoints = [
						`${firstPoint.x},${chartPadding.top + chartHeight}`,
						...points.map((point) => `${point.x},${point.y}`),
						`${lastPoint.x},${chartPadding.top + chartHeight}`
					].join(' ');

					return (
						<g key={lineSeries.label}>
							<polygon
								fill={color}
								opacity={0.12}
								points={areaPoints}
							/>
							<polyline
								fill="none"
								points={linePoints}
								stroke={color}
								strokeLinejoin="round"
								strokeWidth={2}
							/>
							{/* Data points */}
							{points.map((point, pointIndex) => (
								<circle
									cx={point.x}
									cy={point.y}
									fill={color}
									key={pointIndex}
									r={TELEMETRY_LINE_CHART_LAYOUT.pointRadius}
								/>
							))}
						</g>
					);
				})}

				{/* X-axis date labels */}
				{allDates.map((date, dateIndex) => {
					if (dateIndex % labelStep !== 0) return null;
					const shortDate = date.slice(
						TELEMETRY_LINE_CHART_LAYOUT.dateLabelSliceStartIndex
					); // MM-DD

					return (
						<animated.text
							fill={themeSprings.theme.to((t) => {
								const colors = getColors(t.endsWith('dark'));

								return colors.textMuted;
							})}
							fontSize={9}
							key={date}
							textAnchor="middle"
							transform={`rotate(-${TELEMETRY_LINE_CHART_LAYOUT.xAxisLabelRotationDegrees}, ${xScale(dateIndex)}, ${chartPadding.top + chartHeight + TELEMETRY_LINE_CHART_LAYOUT.xAxisLabelOffsetY})`}
							x={xScale(dateIndex)}
							y={
								chartPadding.top +
								chartHeight +
								TELEMETRY_LINE_CHART_LAYOUT.xAxisLabelOffsetY
							}
						>
							{shortDate}
						</animated.text>
					);
				})}

				{/* Y-axis line */}
				<animated.line
					stroke={themeSprings.theme.to((t) => {
						const colors = getColors(t.endsWith('dark'));

						return colors.border;
					})}
					strokeWidth={1}
					x1={chartPadding.left}
					x2={chartPadding.left}
					y1={chartPadding.top}
					y2={chartPadding.top + chartHeight}
				/>

				{/* Legend (only if multiple series) */}
				{series.length > 1 &&
					series.map((lineSeries, legendIndex) => (
						<g key={lineSeries.label}>
							<rect
								fill={
									seriesColors[
										legendIndex % seriesColors.length
									]
								}
								height={
									TELEMETRY_LINE_CHART_LAYOUT.legendSwatchSize
								}
								rx={2}
								width={
									TELEMETRY_LINE_CHART_LAYOUT.legendSwatchSize
								}
								x={
									chartPadding.left +
									legendIndex *
										TELEMETRY_LINE_CHART_LAYOUT.legendStepX
								}
								y={
									viewHeight -
									TELEMETRY_LINE_CHART_LAYOUT.legendBottomOffsetY
								}
							/>
							<animated.text
								fill={themeSprings.theme.to((t) => {
									const colors = getColors(
										t.endsWith('dark')
									);

									return colors.text;
								})}
								fontSize={10}
								x={
									chartPadding.left +
									legendIndex *
										TELEMETRY_LINE_CHART_LAYOUT.legendStepX +
									TELEMETRY_LINE_CHART_LAYOUT.legendLabelOffsetX
								}
								y={
									viewHeight -
									TELEMETRY_LINE_CHART_LAYOUT.legendBaselineOffsetY
								}
							>
								{lineSeries.label}
							</animated.text>
						</g>
					))}
			</svg>
		</animated.div>
	);
};
