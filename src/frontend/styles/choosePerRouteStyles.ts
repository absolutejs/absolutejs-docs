// Styles for the "Choose Per Route" post. The article shell (sticky header,
// reading progress, byline row, contents band, footer) mirrors the Citra post
// so the blog reads as one system; everything after `.cpr-` is this post's own.
// Theme colors (--ink, --paper, --paper-deep, --line, --muted, --accent,
// --accent-soft, --accent-surface) are set inline from themeSprings by BlogPost.
export const choosePerRouteStyles = `
:root {
	--ink: #09090b;
	--paper: #fafafa;
	--paper-deep: #f4f4f5;
	--accent: #4f46e5;
	--accent-soft: rgba(99, 102, 241, 0.1);
	--accent-surface: #eef2ff;
	--muted: #52525b;
	--line: rgba(9, 9, 11, 0.16);
	--panel: #111113;
	--panel-ink: #f4f4f5;
	--panel-dim: #a1a1aa;
	--panel-line: rgba(255, 255, 255, 0.09);
	--fw-react: #149eca;
	--fw-svelte: #ff3e00;
	--fw-vue: #42b883;
	--fw-angular: #dd0031;
	--fw-htmx: #5b84e0;
	--fw-server: #a1a1aa;
	--serif: Georgia, 'Times New Roman', serif;
	--sans:
		Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		'Segoe UI', sans-serif;
	--mono: 'SFMono-Regular', ui-monospace, Consolas, 'Liberation Mono', monospace;
	--measure: 680px;
	--wide: 1120px;
	--gutter: max(20px, env(safe-area-inset-left, 0px));
}

* {
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
	scroll-padding-top: 96px;
}

body {
	margin: 0;
	background: var(--paper);
	color: var(--ink);
	font-family: var(--sans);
	font-size: 16px;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
}

a {
	color: inherit;
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
summary:focus-visible {
	outline: 3px solid var(--accent);
	outline-offset: 4px;
}

::selection {
	background: var(--accent-soft);
	color: var(--ink);
}

/* ---------- shared blog shell ---------- */

.blog-sticky-header {
	position: sticky;
	z-index: 100;
	top: 0;
}

.blog-sticky-header > header {
	position: relative !important;
	z-index: auto !important;
}

.reading-progress-track {
	width: 100%;
	height: 4px;
	background: var(--accent-soft);
}

.reading-progress {
	width: 0;
	height: 100%;
	background: var(--accent);
	transition: width 80ms linear;
}

.article-meta {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 28px;
	width: min(100%, 1240px);
	margin: 0 auto;
	padding-bottom: 24px;
	border-bottom: 1px solid var(--line);
}

.author-lockup {
	line-height: 1.25;
}

.author-lockup strong,
.author-lockup span {
	display: block;
}

.author-lockup strong {
	font-size: 1rem;
	letter-spacing: -0.02em;
}

.author-lockup strong a {
	text-decoration-thickness: 1px;
	text-underline-offset: 3px;
}

.byline-label {
	margin-bottom: 5px;
}

.author-lockup span,
.article-details {
	margin-top: 4px;
	color: var(--muted);
	font-family: var(--mono);
	font-size: 0.66rem;
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.article-meta-actions {
	display: flex;
	gap: 22px;
	align-items: center;
}

.source-link {
	padding: 10px 14px;
	border: 1px solid var(--ink);
	background: var(--ink);
	color: var(--paper);
	font-size: 0.78rem;
	font-weight: 750;
	letter-spacing: 0.07em;
	text-decoration: none;
	text-transform: uppercase;
	white-space: nowrap;
}

.article-toc {
	width: min(100%, 1240px);
	margin: 56px auto 0;
	border-top: 1px solid var(--line);
	border-bottom: 1px solid var(--line);
	font-family: var(--mono);
	font-size: 0.67rem;
	letter-spacing: 0.045em;
	text-transform: uppercase;
}

.article-toc p {
	margin: 0;
	padding: 10px 14px;
	background: var(--accent);
	color: var(--paper);
	font-weight: 800;
}

.article-toc ol {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: article-section;
}

.article-toc li {
	min-width: 0;
	border-top: 1px solid var(--line);
	border-left: 1px solid var(--line);
	counter-increment: article-section;
}

.article-toc li:nth-child(4n + 1) {
	border-left: 0;
}

.article-toc a {
	display: flex;
	align-items: center;
	gap: 10px;
	height: 100%;
	padding: 10px 14px;
	color: var(--muted);
	font-weight: 700;
	text-decoration-thickness: 1px;
	text-underline-offset: 4px;
}

.article-toc a::before {
	content: counter(article-section, decimal-leading-zero);
	flex: 0 0 auto;
	color: var(--accent);
	font-weight: 850;
}

.site-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 24px max(20px, calc((100% - 1120px) / 2));
	background: var(--paper-deep);
	color: var(--ink);
	font-family: var(--mono);
	font-size: 0.68rem;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}

.site-footer span:last-child {
	color: var(--accent);
}

/* ---------- this post ---------- */

.cpr-hero {
	padding: 54px var(--gutter) 0;
}

.cpr-hero-inner {
	width: min(100%, var(--wide));
	margin: 80px auto 0;
}

.cpr-hero h1 {
	max-width: 1000px;
	margin: 0;
	font-family: var(--serif);
	font-size: clamp(2.7rem, 6.4vw, 6.2rem);
	font-weight: 400;
	letter-spacing: -0.06em;
	line-height: 0.92;
	text-wrap: balance;
}

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

.cpr-hero-summary {
	max-width: 720px;
	margin: 40px 0 0;
	font-size: clamp(1.15rem, 2vw, 1.45rem);
	letter-spacing: -0.02em;
	line-height: 1.5;
}

.cpr-article {
	padding: 0 var(--gutter);
}

.cpr-section {
	width: min(100%, var(--wide));
	margin: 0 auto;
	padding: 112px 0 0;
}

.cpr-col {
	max-width: var(--measure);
	margin: 0 auto;
}

.cpr-section h2 {
	max-width: var(--measure);
	margin: 0 auto 30px;
	font-family: var(--serif);
	font-size: clamp(2.2rem, 4.6vw, 3.6rem);
	font-weight: 400;
	letter-spacing: -0.05em;
	line-height: 0.98;
	text-wrap: balance;
}

.cpr-col p,
.cpr-col li {
	font-size: 1.125rem;
	line-height: 1.68;
}

.cpr-col p {
	margin: 0 0 22px;
}

.cpr-col ul {
	display: grid;
	gap: 12px;
	margin: 0 0 26px;
	padding-left: 1.2rem;
}

.cpr-col strong {
	font-weight: 650;
}

.cpr-col a {
	color: var(--accent);
	text-underline-offset: 3px;
}

.cpr-nowrap {
	white-space: nowrap;
}

.cpr-article :not(pre) > code {
	padding: 0.08em 0.35em;
	border-radius: 3px;
	background: var(--accent-soft);
	font-family: var(--mono);
	font-size: 0.84em;
	overflow-wrap: anywhere;
}

.cpr-code {
	margin: 30px 0 34px;
	overflow: hidden;
	color-scheme: dark;
	border-radius: 6px;
	background: var(--panel);
	color: var(--panel-ink);
}

.cpr-code-bar {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding: 9px 16px;
	border-bottom: 1px solid var(--panel-line);
	color: var(--panel-dim);
	font: 500 0.72rem / 1.4 var(--mono);
}

.cpr-code pre.shiki {
	margin: 0;
	padding: 16px 0;
	overflow-x: auto;
	background: transparent !important;
	font: 400 0.84rem / 1.7 var(--mono);
	tab-size: 2;
}

.cpr-code pre.shiki code {
	display: block;
	width: fit-content;
	min-width: 100%;
}

.cpr-code pre.shiki .line {
	display: inline-block;
	width: 100%;
	padding: 0 18px;
}

.cpr-code .shiki,
.cpr-code .shiki span {
	color: var(--shiki-dark);
	font-style: var(--shiki-dark-font-style, normal);
	font-weight: var(--shiki-dark-font-weight, inherit);
}

.cpr-figure {
	margin: 44px 0 52px;
}

.cpr-figcaption {
	max-width: var(--measure);
	margin: 14px auto 0;
	color: var(--muted);
	font-size: 0.92rem;
	line-height: 1.5;
}

.cpr-visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
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

.cpr-play .cpr-code {
	margin: 0;
	align-self: start;
}

.cpr-play .cpr-code pre {
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

/* table */
.cpr-table-wrap {
	margin: 34px 0 40px;
	overflow-x: auto;
	border-top: 1px solid var(--ink);
}

.cpr-table-wrap table {
	width: 100%;
	min-width: 560px;
	border-collapse: collapse;
	font-size: 0.98rem;
}

.cpr-table-wrap th,
.cpr-table-wrap td {
	padding: 13px 14px 13px 0;
	border-bottom: 1px solid var(--line);
	text-align: left;
	vertical-align: top;
	line-height: 1.5;
}

.cpr-table-wrap th {
	color: var(--muted);
	font: 650 0.7rem var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.cpr-table-wrap td:first-child {
	width: 36%;
	font-weight: 650;
}

/* questions */
.cpr-questions {
	display: grid;
	gap: 6px;
	margin-top: 8px;
}

.cpr-questions details {
	padding: 4px 18px;
	border-radius: 6px;
	transition: background 200ms ease;
}

.cpr-questions details[open] {
	background: var(--paper-deep);
}

.cpr-questions summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 16px 0;
	font-size: 1.2rem;
	font-weight: 600;
	letter-spacing: -0.015em;
	list-style: none;
	cursor: pointer;
}

.cpr-questions summary::-webkit-details-marker {
	display: none;
}

.cpr-questions summary::after {
	width: 9px;
	height: 9px;
	flex: 0 0 auto;
	border-right: 2px solid currentColor;
	border-bottom: 2px solid currentColor;
	content: '';
	transform: rotate(45deg) translateY(-3px);
	transition: transform 200ms ease;
}

.cpr-questions details[open] summary::after {
	transform: rotate(225deg) translateY(-3px);
}

.cpr-questions details p {
	margin: 0 0 18px;
}

/* close */
.cpr-close {
	margin-top: 140px;
	padding: 120px var(--gutter) 96px;
	background: var(--ink);
	color: var(--paper);
}

.cpr-close-inner {
	display: grid;
	gap: 40px;
	width: min(100%, var(--wide));
	margin: 0 auto;
}

.cpr-close h2 {
	max-width: 900px;
	margin: 0;
	font-family: var(--serif);
	font-size: clamp(3rem, 8vw, 7rem);
	font-weight: 400;
	letter-spacing: -0.065em;
	line-height: 0.9;
	text-wrap: balance;
}

.cpr-close-row {
	display: flex;
	flex-wrap: wrap;
	align-items: end;
	justify-content: space-between;
	gap: 28px;
}

.cpr-close p {
	max-width: 46ch;
	margin: 0;
	font-size: 1.2rem;
	line-height: 1.5;
}

.cpr-command {
	display: inline-flex;
	align-items: center;
	gap: 16px;
	padding: 10px 10px 10px 20px;
	border: 1px solid color-mix(in srgb, var(--paper) 30%, transparent);
	border-radius: 6px;
	font: 500 1.05rem var(--mono);
}

.cpr-command button {
	min-height: 44px;
	padding: 8px 16px;
	border: 0;
	border-radius: 4px;
	background: var(--accent);
	color: var(--paper);
	font: 650 0.9rem var(--sans);
	cursor: pointer;
	transition: transform 120ms ease;
}

.cpr-command button:active {
	transform: scale(0.97);
}

/* entrance */
@media (prefers-reduced-motion: no-preference) {
	.cpr-hero-inner > * {
		animation: cpr-rise 640ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.cpr-hero-inner > *:nth-child(2) {
		animation-delay: 80ms;
	}

	.cpr-hero-inner > *:nth-child(3) {
		animation-delay: 160ms;
	}
}

@keyframes cpr-rise {
	from {
		opacity: 0;
		transform: translateY(18px);
	}
}

@media (max-width: 900px) {
	.article-toc ol {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.article-toc li:nth-child(odd) {
		border-left: 0;
	}

	.article-toc li:nth-child(even) {
		border-left: 1px solid var(--line);
	}

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
	.article-meta {
		align-items: flex-start;
		flex-direction: column;
		gap: 18px;
	}

	.article-meta-actions {
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.article-toc ol {
		grid-template-columns: 1fr;
	}

	.article-toc li,
	.article-toc li:nth-child(even) {
		border-left: 0;
	}

	.cpr-hero-inner {
		margin-top: 48px;
	}

	.cpr-section {
		padding-top: 80px;
	}

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

	.cpr-close {
		padding-top: 88px;
	}

	.cpr-command {
		width: 100%;
		justify-content: space-between;
		font-size: 0.95rem;
	}

	.site-footer {
		align-items: flex-start;
		flex-direction: column;
		gap: 10px;
	}
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}

	.cpr-reel-bar i,
	.cpr-story-stage,
	.cpr-story-steps li,
	.cpr-replaced span {
		transition: none;
	}
}
`;
