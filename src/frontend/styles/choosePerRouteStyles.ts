import { blogPostBaseStyles } from './blogPostBaseStyles';

// Styles for the "Choose Per Route" post: the shared blog post styles, then
// this post's own (`.cpr-`): the framework reel, manifest playground,
// typecheck scale, save storyboard and replaced sentence.
export const choosePerRouteStyles = `${blogPostBaseStyles}
.cpr-sentence {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.1em 0.24em;
	margin: 0 0 40px;
	font-family: var(--serif);
	font-size: clamp(1.9rem, 4.4vw, 3.6rem);
	letter-spacing: -0.045em;
	line-height: 1;
	color: var(--muted);
}

.cpr-reel {
	display: inline-grid;
	grid-template-rows: 26% 1fr;
	width: 3.2em;
	height: 0.92em;
	overflow: hidden;
	border-radius: 6px;
	background: var(--panel);
	color: var(--panel-ink);
	font-family: var(--sans);
	letter-spacing: 0;
	transform: translateY(0.04em);
}

.cpr-reel-bar {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 0 8%;
	border-bottom: 1px solid var(--panel-line);
	color: var(--panel-dim);
	font: 500 clamp(8px, 0.8vw, 11px) / 1 var(--mono);
}

.cpr-reel-bar i {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--fw-color, var(--fw-react));
	transition: background 400ms ease;
}

.cpr-reel-body {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	padding: 0 8%;
}

.cpr-reel-name {
	font: 600 clamp(11px, 1.2vw, 16px) / 1.1 var(--sans);
}

.cpr-reel-count {
	font: 650 clamp(16px, 2vw, 28px) / 1 var(--sans);
	font-variant-numeric: tabular-nums;
}

/* manifest playground */
.cpr-play {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
	gap: 32px;
	padding: clamp(20px, 3vw, 36px);
	background: var(--paper-deep);
}

.cpr-play-input {
	display: grid;
	gap: 16px;
	align-content: start;
}

.cpr-play label {
	color: var(--muted);
	font-size: 0.9rem;
	font-weight: 600;
}

.cpr-name-input {
	width: 100%;
	padding: 4px 0;
	border: 0;
	border-bottom: 2px solid var(--ink);
	border-radius: 0;
	background: transparent;
	color: var(--ink);
	font-family: var(--serif);
	font-size: clamp(2rem, 4.6vw, 3.4rem);
	letter-spacing: -0.04em;
	line-height: 1.1;
}

.cpr-name-input:focus-visible {
	outline: none;
	border-bottom-color: var(--accent);
}

.cpr-fw-row {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	min-width: 0;
	margin: 0;
	padding: 0;
	border: 0;
}

.cpr-fw-row button {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	min-height: 36px;
	padding: 6px 12px;
	border: 1px solid var(--line);
	border-radius: 999px;
	background: var(--paper);
	color: var(--ink);
	font: 500 0.85rem var(--sans);
	cursor: pointer;
	transition:
		border-color 160ms ease,
		transform 120ms ease;
}

.cpr-fw-row button:hover {
	border-color: var(--ink);
}

.cpr-fw-row button:active {
	transform: scale(0.97);
}

.cpr-fw-row button[aria-pressed='true'] {
	border-color: var(--ink);
	font-weight: 650;
}

.cpr-dot {
	width: 8px;
	height: 8px;
	flex: 0 0 auto;
	border-radius: 50%;
	background: var(--fw-color);
}

.cpr-keys {
	margin: 0;
	font-family: var(--mono);
	font-size: 0.8rem;
}

.cpr-keys div {
	display: grid;
	grid-template-columns: minmax(0, 11rem) minmax(0, 1fr);
	gap: 12px;
	padding: 8px 0;
	border-bottom: 1px solid var(--line);
}

.cpr-keys dt {
	font-weight: 650;
	overflow-wrap: anywhere;
}

.cpr-keys dd {
	margin: 0;
	color: var(--muted);
	overflow-wrap: anywhere;
}

.cpr-play-note {
	margin: 0;
	color: var(--muted);
	font-size: 0.8rem;
}

.cpr-play .post-code {
	margin: 0;
	align-self: start;
}

.cpr-play .post-code pre {
	margin: 0;
	padding: 16px 18px;
	overflow-x: auto;
	font: 400 0.8rem / 1.7 var(--mono);
	white-space: pre;
}

.cpr-tok-fn {
	color: #fde68a;
}

.cpr-tok-str {
	color: #86efac;
}

.cpr-tok-kw {
	color: #a5b4fc;
}

.cpr-tok-com {
	color: #71717a;
	font-style: italic;
}

/* typecheck scale */
.cpr-scale {
	display: grid;
	gap: 18px;
	padding: clamp(20px, 3vw, 36px);
	background: var(--paper-deep);
}

.cpr-bar-row {
	display: grid;
	grid-template-columns: 11rem minmax(0, 1fr);
	gap: 16px;
	align-items: center;
}

.cpr-bar-name {
	font-size: 0.95rem;
	font-weight: 650;
}

.cpr-bar-name small {
	display: block;
	color: var(--muted);
	font-size: 0.8rem;
	font-weight: 400;
}

.cpr-bar-track {
	position: relative;
	height: 48px;
	background: var(--paper);
}

.cpr-bar {
	height: 100%;
}

.cpr-bar.is-fast {
	background: var(--accent);
}

.cpr-bar.is-slow {
	background: var(--muted);
	display: flex;
	align-items: center;
	padding-left: 14px;
	color: var(--paper);
	font-size: 0.9rem;
	font-weight: 650;
	font-variant-numeric: tabular-nums;
	white-space: nowrap;
}

.cpr-bar-value {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 0.9rem;
	font-weight: 650;
	font-variant-numeric: tabular-nums;
	white-space: nowrap;
}

.cpr-axis {
	position: relative;
	height: 1.2em;
	margin-left: calc(11rem + 16px);
	color: var(--muted);
	font: 400 0.72rem var(--mono);
	font-variant-numeric: tabular-nums;
}

.cpr-axis span {
	position: absolute;
	top: 0;
	transform: translateX(-50%);
	white-space: nowrap;
}

.cpr-axis span:first-child {
	transform: none;
}

/* save storyboard */
.cpr-story {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	gap: 48px;
	width: min(100%, var(--wide));
	margin: 44px auto 52px;
}

.cpr-story-stage {
	position: sticky;
	top: 120px;
	align-self: start;
	display: grid;
	gap: 18px;
	padding: 28px;
	border-top: 6px solid var(--fw-color, var(--fw-react));
	border-radius: 6px;
	background: var(--panel);
	color: var(--panel-ink);
	transition: border-color 300ms ease;
}

.cpr-story-path {
	color: var(--panel-dim);
	font: 500 0.8rem var(--mono);
}

.cpr-story-count {
	font: 650 clamp(4rem, 9vw, 7rem) / 0.9 var(--sans);
	font-variant-numeric: tabular-nums;
}

.cpr-story-state {
	font: 650 0.78rem var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.cpr-story-state.is-kept {
	color: #86efac;
}

.cpr-story-state.is-optin {
	color: #fcd34d;
}

.cpr-story-steps {
	display: grid;
	gap: 0;
	margin: 0;
	padding: 0;
	list-style: none;
}

.cpr-story-steps li {
	display: grid;
	gap: 8px;
	align-content: center;
	min-height: 30vh;
	padding: 24px 0 24px 22px;
	border-left: 3px solid var(--line);
	transition: border-color 300ms ease;
}

.cpr-story-steps li[data-active='true'] {
	border-left-color: var(--fw-color);
}

.cpr-story-steps h3 {
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0;
	font-size: 1.2rem;
	letter-spacing: -0.015em;
}

.cpr-story-steps a {
	color: var(--accent);
	text-underline-offset: 3px;
}

.cpr-story-steps p {
	margin: 0;
	font-size: 1.05rem;
	line-height: 1.6;
}

/* replaced sentence */
.cpr-replaced {
	max-width: 30ch;
	margin: 40px 0 28px;
	color: color-mix(in srgb, var(--ink) 38%, transparent);
	font-family: var(--serif);
	font-size: clamp(1.6rem, 3.2vw, 2.4rem);
	letter-spacing: -0.035em;
	line-height: 1.2;
}

.cpr-replaced b {
	color: var(--ink);
	font-weight: 400;
}

.cpr-replaced span {
	transition: color 400ms ease;
}

.cpr-replaced span[data-lit='true'] {
	color: var(--ink);
}

.cpr-story {
	clear: both;
}

@media (max-width: 900px) {
	.cpr-play,
	.cpr-story {
		grid-template-columns: minmax(0, 1fr);
	}

	.cpr-story-stage {
		top: 88px;
		z-index: 2;
		padding: 18px 20px;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 6px 16px;
	}

	.cpr-story-count {
		grid-row: span 2;
		font-size: 3rem;
	}

	.cpr-story-steps li {
		min-height: 0;
		padding-block: 28px;
	}
}

@media (max-width: 620px) {
	.cpr-bar-row {
		grid-template-columns: minmax(0, 1fr);
		gap: 8px;
	}

	.cpr-axis {
		margin-left: 0;
	}

	.cpr-keys div {
		grid-template-columns: minmax(0, 1fr);
		gap: 2px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.cpr-reel-bar i,
	.cpr-story-stage,
	.cpr-story-steps li,
	.cpr-replaced span {
		transition: none;
	}
}
`;
