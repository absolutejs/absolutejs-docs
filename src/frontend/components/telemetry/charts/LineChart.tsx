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

const chartPadding = { top: 20, right: 20, bottom: 50, left: 60 };
const viewWidth = 600;
const viewHeight = 260;
const chartWidth = viewWidth - chartPadding.left - chartPadding.right;
const chartHeight = viewHeight - chartPadding.top - chartPadding.bottom;

const seriesColors = [
	'#A0E7E5',
	'#FFD93D',
	'#FF6B6B',
	'#B4F8C8',
	'#87CEEB',
	'#DDA0DD'
];

const containerStyle: CSSProperties = {
	minWidth: '450px'
};

export const LineChart = ({ series, themeSprings }: LineChartProps) => {
	// Build unified date axis from all series
	const allDates = [
		...new Set(series.flatMap((s) => s.data.map((d) => d.date)))
	].sort();

	if (allDates.length === 0) return null;

	const maxValue = Math.max(
		...series.flatMap((s) => s.data.map((d) => d.value)),
		1
	);

	const xScale = (dateIndex: number) =>
		chartPadding.left +
		(allDates.length > 1
			? (dateIndex / (allDates.length - 1)) * chartWidth
			: chartWidth / 2);

	const yScale = (value: number) =>
		chartPadding.top + chartHeight - (value / maxValue) * chartHeight;

	const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
		value: Math.round(maxValue * pct),
		y: chartPadding.top + chartHeight * (1 - pct)
	}));

	// Show a subset of date labels to avoid overlap
	const maxLabels = 8;
	const labelStep = Math.max(1, Math.ceil(allDates.length / maxLabels));

	return (
		<animated.div style={containerStyle}>
			<svg
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
			>
				{/* Grid lines */}
				{yTicks.map((tick) => (
					<g key={tick.value}>
						<animated.line
							x1={chartPadding.left}
							y1={tick.y}
							x2={viewWidth - chartPadding.right}
							y2={tick.y}
							stroke={themeSprings.theme.to((t) => {
								const c = getColors(t.endsWith('dark'));
								return c.border;
							})}
							strokeWidth={0.5}
						/>
						<animated.text
							x={chartPadding.left - 8}
							y={tick.y + 4}
							textAnchor="end"
							fontSize={10}
							fill={themeSprings.theme.to((t) => {
								const c = getColors(t.endsWith('dark'));
								return c.textMuted;
							})}
						>
							{tick.value}
						</animated.text>
					</g>
				))}

				{/* Series lines and area fills */}
				{series.map((s, si) => {
					const color = seriesColors[si % seriesColors.length];
					const dateValueMap = new Map(
						s.data.map((d) => [d.date, d.value])
					);

					const points = allDates.map((date, i) => ({
						x: xScale(i),
						y: yScale(dateValueMap.get(date) ?? 0)
					}));

					const linePoints = points
						.map((p) => `${p.x},${p.y}`)
						.join(' ');

					const firstPoint = points[0];
					const lastPoint = points[points.length - 1];
					if (!firstPoint || !lastPoint) return null;

					const areaPoints = [
						`${firstPoint.x},${chartPadding.top + chartHeight}`,
						...points.map((p) => `${p.x},${p.y}`),
						`${lastPoint.x},${chartPadding.top + chartHeight}`
					].join(' ');

					return (
						<g key={s.label}>
							<polygon
								points={areaPoints}
								fill={color}
								opacity={0.12}
							/>
							<polyline
								points={linePoints}
								fill="none"
								stroke={color}
								strokeWidth={2}
								strokeLinejoin="round"
							/>
							{/* Data points */}
							{points.map((p, i) => (
								<circle
									key={i}
									cx={p.x}
									cy={p.y}
									r={3}
									fill={color}
								/>
							))}
						</g>
					);
				})}

				{/* X-axis date labels */}
				{allDates.map((date, i) => {
					if (i % labelStep !== 0) return null;
					const shortDate = date.slice(5); // MM-DD
					return (
						<animated.text
							key={date}
							x={xScale(i)}
							y={chartPadding.top + chartHeight + 20}
							textAnchor="middle"
							fontSize={9}
							fill={themeSprings.theme.to((t) => {
								const c = getColors(t.endsWith('dark'));
								return c.textMuted;
							})}
							transform={`rotate(-30, ${xScale(i)}, ${chartPadding.top + chartHeight + 20})`}
						>
							{shortDate}
						</animated.text>
					);
				})}

				{/* Y-axis line */}
				<animated.line
					x1={chartPadding.left}
					y1={chartPadding.top}
					x2={chartPadding.left}
					y2={chartPadding.top + chartHeight}
					stroke={themeSprings.theme.to((t) => {
						const c = getColors(t.endsWith('dark'));
						return c.border;
					})}
					strokeWidth={1}
				/>

				{/* Legend (only if multiple series) */}
				{series.length > 1 &&
					series.map((s, i) => (
						<g key={s.label}>
							<rect
								x={chartPadding.left + i * 100}
								y={viewHeight - 12}
								width={10}
								height={10}
								rx={2}
								fill={seriesColors[i % seriesColors.length]}
							/>
							<animated.text
								x={chartPadding.left + i * 100 + 14}
								y={viewHeight - 3}
								fontSize={10}
								fill={themeSprings.theme.to((t) => {
									const c = getColors(t.endsWith('dark'));
									return c.text;
								})}
							>
								{s.label}
							</animated.text>
						</g>
					))}
			</svg>
		</animated.div>
	);
};
