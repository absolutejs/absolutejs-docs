// The vue-check post's own pieces, on top of the shared article styles
// (choosePerRouteStyles). Everything here is prefixed `.vc-`.
export const vueCheckStyles = `
/* a command with a copy button, on the page's own background */
.vc-command {
	display: flex;
	align-items: center;
	gap: 14px;
	width: fit-content;
	max-width: 100%;
	margin: 36px auto 0;
	padding: 8px 8px 8px 18px;
	border-radius: 6px;
	background: var(--panel);
	color: var(--panel-ink);
	color-scheme: dark;
	font: 500 1rem var(--mono);
}

.cpr-col .vc-command {
	margin: 30px auto 34px;
}

.vc-command code {
	overflow-x: auto;
	padding: 8px 0;
	white-space: nowrap;
}

.vc-command code::before {
	content: '$ ';
	color: var(--panel-dim);
	user-select: none;
}

.vc-command button {
	flex: none;
	min-height: 40px;
	min-width: 76px;
	padding: 8px 14px;
	border: 1px solid var(--panel-line);
	border-radius: 4px;
	background: transparent;
	color: var(--panel-ink);
	font: 650 0.85rem var(--sans);
	cursor: pointer;
	transition:
		background 120ms ease,
		transform 120ms ease;
}

.vc-command button:hover {
	background: var(--panel-line);
}

.vc-command button:active {
	transform: scale(0.97);
}

/* the headline numbers under the summary */
.vc-stats {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 0 28px;
	max-width: 1000px;
	margin: 56px 0 0;
	padding: 0;
	list-style: none;
}

.vc-stats li {
	padding: 16px 0 0;
	border-top: 1px solid var(--ink);
}

.vc-stats strong {
	display: block;
	font-family: var(--serif);
	font-size: clamp(1.7rem, 2.8vw, 2.5rem);
	font-weight: 400;
	letter-spacing: -0.04em;
	line-height: 1;
	white-space: nowrap;
}

.vc-stats span {
	display: block;
	margin-top: 10px;
	color: var(--muted);
	font-size: 0.9rem;
	line-height: 1.45;
}

/* a heading inside a section */
.vc-sub {
	max-width: var(--measure);
	margin: 56px auto 18px;
	font-family: var(--serif);
	font-size: clamp(1.5rem, 2.6vw, 2rem);
	font-weight: 400;
	letter-spacing: -0.03em;
	line-height: 1.1;
}

/* the three steps, left to right */
.vc-pipeline {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14px;
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: vc-step;
}

.vc-pipeline li {
	position: relative;
	display: grid;
	align-content: start;
	gap: 10px;
	padding: 22px 22px 24px;
	background: var(--paper-deep);
	counter-increment: vc-step;
}

.vc-pipeline li + li::before {
	content: '→';
	position: absolute;
	top: 20px;
	left: -14px;
	width: 14px;
	color: var(--muted);
	font-size: 0.9rem;
	text-align: center;
}

.vc-pipeline-kind {
	color: var(--accent);
	font: 650 0.7rem var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.vc-pipeline-kind::before {
	content: counter(vc-step) ' · ';
	color: var(--muted);
}

.vc-pipeline strong {
	font-family: var(--serif);
	font-size: 1.45rem;
	font-weight: 400;
	letter-spacing: -0.03em;
	line-height: 1.1;
}

.vc-pipeline p {
	margin: 0;
	color: var(--muted);
	font-size: 0.95rem;
	line-height: 1.55;
}

.vc-pipeline code {
	font-size: 0.86em;
}

/* a short list of named points */
.vc-points {
	display: grid;
	gap: 22px;
	max-width: var(--measure);
	margin: 0 auto 26px;
}

.vc-points div {
	padding-left: 16px;
	border-left: 2px solid var(--line);
}

.vc-points dt {
	margin: 0 0 4px;
	font-size: 1.125rem;
	font-weight: 650;
}

.vc-points a {
	color: var(--accent);
	text-underline-offset: 3px;
}

.vc-points dd {
	margin: 0;
	font-size: 1.05rem;
	line-height: 1.62;
}

/* every project, both tools, on one time axis */
.vc-chart {
	display: grid;
	gap: 14px;
	padding: clamp(20px, 3vw, 36px);
	background: var(--paper-deep);
}

.vc-chart-row {
	display: grid;
	grid-template-columns: 14rem minmax(0, 1fr) 5.5rem 9.5rem;
	gap: 16px;
	align-items: center;
}

.vc-chart-name {
	overflow: hidden;
	font-size: 0.9rem;
	font-weight: 650;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.vc-chart-name small {
	display: block;
	color: var(--muted);
	font-size: 0.76rem;
	font-weight: 400;
}

.vc-chart-bars {
	display: grid;
	gap: 5px;
}

.vc-chart-bars i {
	display: block;
	height: 12px;
	min-width: 2px;
	background: color-mix(in srgb, var(--ink) 55%, transparent);
}

.vc-chart-bars i.is-fast {
	background: var(--accent);
}

.vc-chart-values {
	display: grid;
	gap: 1px;
	color: var(--muted);
	font: 500 0.76rem / 1.35 var(--mono);
	font-variant-numeric: tabular-nums;
	white-space: nowrap;
}

.vc-chart-values .is-fast {
	color: var(--ink);
	font-weight: 650;
}

.vc-chart-ratio {
	font-size: 0.86rem;
	line-height: 1.3;
	white-space: nowrap;
}

.vc-chart-ratio strong {
	font-weight: 650;
}

.vc-chart-key {
	display: flex;
	flex-wrap: wrap;
	gap: 6px 22px;
	margin: 0 0 8px;
	color: var(--muted);
	font-size: 0.82rem;
}

.vc-chart-key span::before {
	content: '';
	display: inline-block;
	width: 18px;
	height: 9px;
	margin-right: 8px;
	background: color-mix(in srgb, var(--ink) 55%, transparent);
}

.vc-chart-key span.is-fast::before {
	background: var(--accent);
}

@media (max-width: 1000px) {
	.vc-chart-row {
		grid-template-columns: minmax(0, 1fr) 9.5rem;
		gap: 6px 16px;
	}

	.vc-chart-name {
		grid-column: 1;
	}

	.vc-chart-ratio {
		grid-column: 2;
		grid-row: 1;
	}

	.vc-chart-bars {
		grid-column: 1;
	}

	.vc-chart-row + .vc-chart-row {
		padding-top: 12px;
		border-top: 1px solid var(--line);
	}
}

@media (max-width: 760px) {
	.vc-stats {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 28px 20px;
	}

	.vc-pipeline {
		grid-template-columns: minmax(0, 1fr);
	}

	.vc-pipeline li + li::before {
		content: '↓';
		top: -15px;
		left: 22px;
	}

	.vc-command {
		width: 100%;
		justify-content: space-between;
		font-size: 0.88rem;
	}
}
`;
