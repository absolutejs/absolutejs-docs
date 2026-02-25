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
const cx = 130;
const cy = 130;
const outerR = 100;
const innerR = 60;

const sliceColors = [
	'#A0E7E5',
	'#B4F8C8',
	'#FFD93D',
	'#FF6B6B',
	'#87CEEB',
	'#DDA0DD',
	'#FFB347',
	'#98D8C8'
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

const polarToCart = (
	centerX: number,
	centerY: number,
	r: number,
	angleDeg: number
) => ({
	x: centerX + r * Math.cos(toRad(angleDeg - 90)),
	y: centerY + r * Math.sin(toRad(angleDeg - 90))
});

const arcPath = (
	centerX: number,
	centerY: number,
	outer: number,
	inner: number,
	startAngle: number,
	endAngle: number
) => {
	const sweep = endAngle - startAngle;

	// Full circle case
	if (sweep >= 359.99) {
		const midAngle = startAngle + 180;
		const os = polarToCart(centerX, centerY, outer, startAngle);
		const om = polarToCart(centerX, centerY, outer, midAngle);
		const is2 = polarToCart(centerX, centerY, inner, startAngle);
		const im = polarToCart(centerX, centerY, inner, midAngle);
		return [
			`M ${os.x} ${os.y}`,
			`A ${outer} ${outer} 0 0 1 ${om.x} ${om.y}`,
			`A ${outer} ${outer} 0 0 1 ${os.x} ${os.y}`,
			`M ${is2.x} ${is2.y}`,
			`A ${inner} ${inner} 0 0 0 ${im.x} ${im.y}`,
			`A ${inner} ${inner} 0 0 0 ${is2.x} ${is2.y}`,
			'Z'
		].join(' ');
	}

	const large = sweep > 180 ? 1 : 0;
	const outerStart = polarToCart(centerX, centerY, outer, startAngle);
	const outerEnd = polarToCart(centerX, centerY, outer, endAngle);
	const innerEnd = polarToCart(centerX, centerY, inner, endAngle);
	const innerStart = polarToCart(centerX, centerY, inner, startAngle);

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

	for (let i = 0; i < data.length; i++) {
		const d = data[i];
		if (!d) continue;
		const pct = d.value / total;
		const sweep = pct * 360;
		slices.push({
			datum: d,
			startAngle: currentAngle,
			endAngle: currentAngle + sweep,
			color: sliceColors[i % sliceColors.length] ?? '#A0E7E5',
			pct
		});
		currentAngle += sweep;
	}

	const legendX = cx + outerR + 40;
	const legendStartY = 30;
	const legendRowHeight = 24;

	return (
		<animated.div style={containerStyle}>
			<svg
				viewBox={`0 0 ${viewWidth} ${viewHeight}`}
				preserveAspectRatio="xMidYMid meet"
				style={svgContainerStyle}
			>
				{/* Slices */}
				{slices.map((slice) => (
					<path
						key={slice.datum.label}
						d={arcPath(
							cx,
							cy,
							outerR,
							innerR,
							slice.startAngle,
							slice.endAngle
						)}
						fill={slice.color}
						opacity={0.85}
					/>
				))}

				{/* Center total */}
				<animated.text
					x={cx}
					y={cy - 6}
					textAnchor="middle"
					fontSize={11}
					fill={themeSprings.theme.to((t) => {
						const c = getColors(t.endsWith('dark'));
						return c.textMuted;
					})}
				>
					Total
				</animated.text>
				<animated.text
					x={cx}
					y={cy + 14}
					textAnchor="middle"
					fontSize={18}
					fontWeight={600}
					fill={themeSprings.theme.to((t) => {
						const c = getColors(t.endsWith('dark'));
						return c.text;
					})}
				>
					{total.toLocaleString()}
				</animated.text>

				{/* Legend */}
				{slices.map((slice, i) => {
					const y = legendStartY + i * legendRowHeight;
					return (
						<g key={slice.datum.label}>
							<rect
								x={legendX}
								y={y}
								width={12}
								height={12}
								rx={2}
								fill={slice.color}
							/>
							<animated.text
								x={legendX + 18}
								y={y + 10}
								fontSize={11}
								fill={themeSprings.theme.to((t) => {
									const c = getColors(t.endsWith('dark'));
									return c.text;
								})}
							>
								{slice.datum.label ?? 'unknown'}
							</animated.text>
							<animated.text
								x={legendX + 18}
								y={y + 10}
								fontSize={10}
								textAnchor="end"
								dx={140}
								fill={themeSprings.theme.to((t) => {
									const c = getColors(t.endsWith('dark'));
									return c.textMuted;
								})}
							>
								{(slice.pct * 100).toFixed(1)}%
							</animated.text>
						</g>
					);
				})}
			</svg>
		</animated.div>
	);
};
