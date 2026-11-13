import type { CSSProperties } from 'react';
import { vueCheckResults } from './results';

const PERCENT = 100;
const VALUE_GAP_PX = 10;
const TICK_STEP_SECONDS = 5;

type Bar = {
	detail: string;
	label: string;
	seconds: number;
	fast: boolean;
	text: string;
};

const [largest] = vueCheckResults.projects;

const barsOf = (project: NonNullable<typeof largest>) => [
	{
		detail: 'Bun’s native checker, every core',
		fast: true,
		label: 'vue-check',
		seconds: project.vueCheck.s,
		text: `${project.vueCheck.s} s · ${project.vueCheck.mb} MB`
	},
	{
		detail: 'one thread',
		fast: true,
		label: 'vue-check',
		seconds: project.single.s,
		text: `${project.single.s} s · ${project.single.mb} MB`
	},
	{
		detail: `vue-tsc ${project.vueTsc.version} on Node`,
		fast: false,
		label: 'vue-tsc',
		seconds: project.vueTsc.s,
		text: `${project.vueTsc.s} s · ${project.vueTsc.mb} MB`
	}
];

export const VueCheckScale = () => {
	if (largest === undefined) return null;
	const bars: Bar[] = barsOf(largest);
	const scale =
		Math.ceil(largest.vueTsc.s / TICK_STEP_SECONDS) * TICK_STEP_SECONDS;
	const widthOf = (seconds: number) => (seconds / scale) * PERCENT;
	const valueStyle = (seconds: number): CSSProperties => ({
		left: `calc(${widthOf(seconds)}% + ${VALUE_GAP_PX}px)`
	});
	const ticks = Array.from(
		{ length: scale / TICK_STEP_SECONDS + 1 },
		(_, index) => index * TICK_STEP_SECONDS
	);

	return (
		<figure className="cpr-figure">
			<div className="cpr-scale">
				{bars.map((bar) => (
					<div
						className="cpr-bar-row"
						key={`${bar.label}-${bar.detail}`}
					>
						<span className="cpr-bar-name">
							{bar.label}
							<small>{bar.detail}</small>
						</span>
						<div className="cpr-bar-track">
							<div
								className={`cpr-bar ${bar.fast ? 'is-fast' : 'is-slow'}`}
								style={{ width: `${widthOf(bar.seconds)}%` }}
							/>
							<span
								className="cpr-bar-value"
								style={valueStyle(bar.seconds)}
							>
								{bar.text}
							</span>
						</div>
					</div>
				))}
				<div aria-hidden="true" className="cpr-axis">
					{ticks.map((tick) => (
						<span key={tick} style={{ left: `${widthOf(tick)}%` }}>
							{tick} s
						</span>
					))}
				</div>
			</div>
			<figcaption className="cpr-figcaption">
				Type-checking {largest.name} ({largest.phases.vueFiles} Vue
				files), wall clock and peak memory of the whole process tree,
				medians of {largest.runs} runs. Same errors from both.
			</figcaption>
		</figure>
	);
};
