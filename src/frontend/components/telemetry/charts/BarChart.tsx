import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import {
	diagramColors,
	getColors,
	svgContainerStyle
} from '../../diagrams/diagramStyles';

type BarChartDatum = {
	label: string;
	value: number;
};

type BarChartProps = {
	data: BarChartDatum[];
	themeSprings: ThemeSprings;
	order?: string[];
};

const chartPadding = { top: 20, right: 20, bottom: 50, left: 60 };
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

	const maxValue = Math.max(...ordered.map((d) => d.value), 1);
	const barCount = ordered.length;
	const barGap = 8;
	const barWidth = Math.max(
		(chartWidth - barGap * (barCount - 1)) / barCount,
		10
	);

	const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
		value: Math.round(maxValue * pct),
		y: chartPadding.top + chartHeight * (1 - pct)
	}));

	return (
		<animated.div style={containerStyle}>
			<svg
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
			>
				{/* Y-axis ticks and grid lines */}
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

				{/* Bars */}
				{ordered.map((d, i) => {
					const barHeight =
						maxValue > 0 ? (d.value / maxValue) * chartHeight : 0;
					const x = chartPadding.left + i * (barWidth + barGap);
					const y = chartPadding.top + chartHeight - barHeight;

					return (
						<g key={d.label}>
							<animated.rect
								x={x}
								y={y}
								width={barWidth}
								height={barHeight}
								rx={3}
								fill={themeSprings.theme.to((t) => {
									const c = getColors(t.endsWith('dark'));
									return c.accent;
								})}
								opacity={0.85}
							/>
							{/* Value label on top of bar */}
							{d.value > 0 && (
								<animated.text
									x={x + barWidth / 2}
									y={y - 5}
									textAnchor="middle"
									fontSize={9}
									fontWeight={600}
									fill={themeSprings.theme.to((t) => {
										const c = getColors(t.endsWith('dark'));
										return c.text;
									})}
								>
									{d.value}
								</animated.text>
							)}
							{/* X-axis label */}
							<animated.text
								x={x + barWidth / 2}
								y={chartPadding.top + chartHeight + 16}
								textAnchor="middle"
								fontSize={10}
								fill={themeSprings.theme.to((t) => {
									const c = getColors(t.endsWith('dark'));
									return c.textMuted;
								})}
							>
								{d.label}
							</animated.text>
						</g>
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
			</svg>
		</animated.div>
	);
};
