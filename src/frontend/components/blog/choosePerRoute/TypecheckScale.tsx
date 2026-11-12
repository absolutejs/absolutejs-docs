import type { CSSProperties } from 'react';

// Measured on the AbsoluteJS repository at 0.20.0-beta.167 on an Apple M4:
// `bun check` took 0.6 s cold (0.44 GB), `tsc` 5.9.3 took 7.2 to 9.7 s
// (about 1 GB). The slow bar uses the midpoint so both share one scale.
const FAST_SECONDS = 0.6;
const SLOW_SECONDS = 8.5;
const TICK_STEP_SECONDS = 2;
const TICK_COUNT = 5;
const AXIS_TICKS = Array.from(
	{ length: TICK_COUNT },
	(_, index) => index * TICK_STEP_SECONDS
);
const PERCENT = 100;
const VALUE_GAP_PX = 10;

const widthOf = (seconds: number) => (seconds / SLOW_SECONDS) * PERCENT;

const valueStyle = (seconds: number): CSSProperties => ({
	left: `calc(${widthOf(seconds)}% + ${VALUE_GAP_PX}px)`
});

export const TypecheckScale = () => (
	<figure className="cpr-figure">
		<div className="cpr-scale">
			<div className="cpr-bar-row">
				<span className="cpr-bar-name">
					absolute typecheck
					<small>bun check on Bun 1.4.3+</small>
				</span>
				<div className="cpr-bar-track">
					<div
						className="cpr-bar is-fast"
						style={{ width: `${widthOf(FAST_SECONDS)}%` }}
					/>
					<span
						className="cpr-bar-value"
						style={valueStyle(FAST_SECONDS)}
					>
						0.6 s · 0.44 GB
					</span>
				</div>
			</div>
			<div className="cpr-bar-row">
				<span className="cpr-bar-name">
					tsc 5.9
					<small>same files, same errors</small>
				</span>
				<div className="cpr-bar-track">
					<div className="cpr-bar is-slow" style={{ width: '100%' }}>
						7 to 10 s · about 1 GB
					</div>
				</div>
			</div>
			<div aria-hidden="true" className="cpr-axis">
				{AXIS_TICKS.map((tick) => (
					<span key={tick} style={{ left: `${widthOf(tick)}%` }}>
						{tick} s
					</span>
				))}
			</div>
		</div>
		<figcaption className="cpr-figcaption">
			1,200 source files on the AbsoluteJS repository, measured on an
			Apple M4. tsc took 7 to 10 seconds and about 1 GB across runs; the
			grey bar shows the middle of that range.
		</figcaption>
	</figure>
);
