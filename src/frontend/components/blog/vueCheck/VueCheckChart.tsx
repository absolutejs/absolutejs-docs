import { vueCheckResults } from './results';

const PERCENT = 100;
const { projects } = vueCheckResults;

type Project = (typeof projects)[number];
type Metric = 'memory' | 'time';
type Measure = {
	caption: string;
	gain: string;
	unit: string;
	valueOf: (measure: Project['vueCheck']) => number;
};

const measures: Record<Metric, Measure> = {
	memory: {
		caption:
			'Peak memory of a whole type-check: the whole process tree, sampled every 20 ms.',
		gain: 'less memory',
		unit: 'MB',
		valueOf: (measure) => measure.mb
	},
	time: {
		caption: 'Wall-clock time of a whole type-check.',
		gain: 'faster',
		unit: 's',
		valueOf: (measure) => measure.s
	}
};

/* The axis of each chart ends at its longest vue-tsc bar. */
const longestOf = (metric: Metric) =>
	Math.max(
		...projects.map((project) => measures[metric].valueOf(project.vueTsc))
	);
const longest: Record<Metric, number> = {
	memory: longestOf('memory'),
	time: longestOf('time')
};

type ChartRowProps = { metric: Metric; project: Project };

// One project: both tools as bars on the same axis, the measured values
// beside them, and what the difference comes to.
const ChartRow = ({ metric, project }: ChartRowProps) => {
	const { gain, unit, valueOf } = measures[metric];
	const before = valueOf(project.vueTsc);
	const after = valueOf(project.vueCheck);
	const widthOf = (value: number) =>
		`${(value / longest[metric]) * PERCENT}%`;

	return (
		<div className="vc-chart-row">
			<span className="vc-chart-name">
				{project.name}
				<small>{project.phases.vueFiles} Vue files</small>
			</span>
			<div aria-hidden="true" className="vc-chart-bars">
				<i style={{ width: widthOf(before) }} />
				<i className="is-fast" style={{ width: widthOf(after) }} />
			</div>
			<span className="vc-chart-values">
				<span>
					{before} {unit}
				</span>
				<span className="is-fast">
					{after} {unit}
				</span>
			</span>
			<span className="vc-chart-ratio">
				<strong>{(before / after).toFixed(1)}×</strong> {gain}
			</span>
		</div>
	);
};

// Every project on one axis, vue-tsc above and vue-check below, for the
// time a type-check takes or for the memory it peaks at.
export const VueCheckChart = ({ metric }: { metric: Metric }) => {
	const { caption } = measures[metric];

	return (
		<figure className="cpr-figure">
			<div className="vc-chart">
				<p className="vc-chart-key">
					<span>vue-tsc</span>
					<span className="is-fast">vue-check</span>
				</p>
				{projects.map((project) => (
					<ChartRow
						key={project.name}
						metric={metric}
						project={project}
					/>
				))}
			</div>
			<figcaption className="cpr-figcaption">
				{caption} Medians of {projects[0]?.runs ?? 0} runs, in the same
				order in both charts. Both tools report the same errors on every
				project.
			</figcaption>
		</figure>
	);
};
