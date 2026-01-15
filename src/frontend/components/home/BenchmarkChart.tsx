import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/springTypes';
import {
	sectionStyle,
	sectionSubtitleStyle,
	sectionTitleStyle
} from '../../styles/homeStyles';

type BenchmarkData = {
	name: string;
	value: number;
	color: string;
};

const httpBenchmarks: BenchmarkData[] = [
	{ name: 'Elysia (Bun)', value: 2454631, color: '#8b5cf6' },
	{ name: 'Gin (Go)', value: 676019, color: '#64748b' },
	{ name: 'Spring (Java)', value: 506087, color: '#64748b' },
	{ name: 'Fastify (Node)', value: 415600, color: '#64748b' },
	{ name: 'Express (Node)', value: 113117, color: '#64748b' }
];

const maxValue = Math.max(...httpBenchmarks.map((b) => b.value));

type BarProps = {
	data: BenchmarkData;
	maxVal: number;
	themeSprings: ThemeProps['themeSprings'];
};

const Bar = ({ data, maxVal, themeSprings }: BarProps) => {
	const percentage = (data.value / maxVal) * 100;
	const formattedValue =
		data.value >= 1000000
			? `${(data.value / 1000000).toFixed(1)}M`
			: `${(data.value / 1000).toFixed(0)}K`;

	return (
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				gap: '1rem',
				marginBottom: '1rem',
				width: '100%'
			}}
		>
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.9rem',
					minWidth: '120px',
					textAlign: 'right'
				}}
			>
				{data.name}
			</animated.span>
			<div
				style={{
					backgroundColor: 'rgba(100, 116, 139, 0.1)',
					borderRadius: '6px',
					flex: 1,
					height: '32px',
					overflow: 'hidden',
					position: 'relative'
				}}
			>
				<div
					style={{
						background:
							data.color === '#8b5cf6'
								? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
								: data.color,
						borderRadius: '6px',
						height: '100%',
						transition: 'width 0.8s ease-out',
						width: `${percentage}%`
					}}
				/>
			</div>
			<animated.span
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '0.9rem',
					fontWeight: 600,
					minWidth: '70px'
				}}
			>
				{formattedValue}
			</animated.span>
		</div>
	);
};

export const BenchmarkChart = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={sectionTitleStyle(themeSprings)}>
			Unmatched Performance
		</animated.h2>
		<animated.p style={sectionSubtitleStyle(themeSprings)}>
			Built on Elysia + Bun for industry-leading speed
		</animated.p>

		<animated.div
			style={{
				background: themeSprings.themeTertiary,
				borderRadius: '20px',
				boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
				maxWidth: '900px',
				padding: '2rem',
				width: '100%'
			}}
		>
			<animated.h3
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.1rem',
					fontWeight: 600,
					marginBottom: '0.5rem',
					textAlign: 'center'
				}}
			>
				HTTP Requests per Second
			</animated.h3>
			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.85rem',
					marginBottom: '1.5rem',
					textAlign: 'center'
				}}
			>
				TechEmpower Benchmark Round 22 - Plaintext
			</animated.p>

			{httpBenchmarks.map((benchmark, index) => (
				<Bar
					key={index}
					data={benchmark}
					maxVal={maxValue}
					themeSprings={themeSprings}
				/>
			))}

			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					gap: '2rem',
					justifyContent: 'center',
					marginTop: '1.5rem'
				}}
			>
				<animated.div
					style={{
						alignItems: 'center',
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.9rem',
						gap: '0.5rem'
					}}
				>
					<span
						style={{
							background:
								'linear-gradient(135deg, #6366f1, #8b5cf6)',
							borderRadius: '4px',
							display: 'inline-block',
							height: '12px',
							width: '12px'
						}}
					/>
					21x faster than Express
				</animated.div>
				<animated.div
					style={{
						alignItems: 'center',
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.9rem',
						gap: '0.5rem'
					}}
				>
					<span
						style={{
							background:
								'linear-gradient(135deg, #6366f1, #8b5cf6)',
							borderRadius: '4px',
							display: 'inline-block',
							height: '12px',
							width: '12px'
						}}
					/>
					6x faster than Fastify
				</animated.div>
			</div>
		</animated.div>
	</section>
);
