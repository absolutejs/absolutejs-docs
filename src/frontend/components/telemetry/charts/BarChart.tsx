import { HALF, TELEMETRY_BAR_CHART_LAYOUT } from '../../../../constants';
import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { getColors, svgContainerStyle } from '../../diagrams/diagramStyles';

type BarChartDatum = {
	label: string;
	value: number;
};

type BarChartProps = {
	data: BarChartDatum[];
	themeSprings: ThemeSprings;
	order?: string[];
};

type ChartPadding = {
	bottom: number;
	left: number;
	right: number;
	top: number;
};

const chartPadding: ChartPadding = { bottom: 50, left: 60, right: 20, top: 20 };
const viewWidth = 500;
const viewHeight = 280;
const chartWidth = viewWidth - chartPadding.left - chartPadding.right;
const chartHeight = viewHeight - chartPadding.top - chartPadding.bottom;

const containerStyle: CSSProperties = {
	minWidth: '400px'
};

export const BarChart = ({ data, themeSprings, order }: BarChartProps) => {
	const ordered = order
		? order.map(
				(label) =>
					data.find((d) => d.label === label) ?? {
						label,
						value: 0
					}
			)
		: data;

	const maxValue = Math.max(...ordered.map((datum) => datum.value), 1);
	const barCount = ordered.length;
	const barGap = 8;
	const barWidth = Math.max(
		(chartWidth - barGap * (barCount - 1)) / barCount,
		TELEMETRY_BAR_CHART_LAYOUT.minBarWidth
	);

	const yTicks = [
		0,
		TELEMETRY_BAR_CHART_LAYOUT.quarterTick,
		HALF,
		TELEMETRY_BAR_CHART_LAYOUT.threeQuarterTick,
		1
	].map((pct) => ({
		value: Math.round(maxValue * pct),
		y: chartPadding.top + chartHeight * (1 - pct)
	}));

	return (
		<animated.div style={containerStyle}>
			<svg
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
			>
				{/* Y-axis ticks and grid lines */}
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
								TELEMETRY_BAR_CHART_LAYOUT.axisLabelOffsetX
							}
							y={
								tick.y +
								TELEMETRY_BAR_CHART_LAYOUT.axisLabelOffsetY
							}
						>
							{tick.value}
						</animated.text>
					</g>
				))}

				{/* Bars */}
				{ordered.map((datum, barIndex) => {
					const barHeight =
						maxValue > 0
							? (datum.value / maxValue) * chartHeight
							: 0;
					const barX =
						chartPadding.left + barIndex * (barWidth + barGap);
					const barY = chartPadding.top + chartHeight - barHeight;

					return (
						<g key={datum.label}>
							<animated.rect
								fill={themeSprings.theme.to((t) => {
									const colors = getColors(
										t.endsWith('dark')
									);

									return colors.accent;
								})}
								height={barHeight}
								opacity={0.85}
								rx={TELEMETRY_BAR_CHART_LAYOUT.barRadius}
								width={barWidth}
								x={barX}
								y={barY}
							/>
							{/* Value label on top of bar */}
							{datum.value > 0 && (
								<animated.text
									fill={themeSprings.theme.to((t) => {
										const colors = getColors(
											t.endsWith('dark')
										);

										return colors.text;
									})}
									fontSize={9}
									fontWeight={600}
									textAnchor="middle"
									x={barX + barWidth / 2}
									y={
										barY -
										TELEMETRY_BAR_CHART_LAYOUT.valueLabelOffsetY
									}
								>
									{datum.value}
								</animated.text>
							)}
							{/* X-axis label */}
							<animated.text
								fill={themeSprings.theme.to((t) => {
									const colors = getColors(
										t.endsWith('dark')
									);

									return colors.textMuted;
								})}
								fontSize={10}
								textAnchor="middle"
								x={barX + barWidth / 2}
								y={
									chartPadding.top +
									chartHeight +
									TELEMETRY_BAR_CHART_LAYOUT.xAxisLabelOffsetY
								}
							>
								{datum.label}
							</animated.text>
						</g>
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
			</svg>
		</animated.div>
	);
};
