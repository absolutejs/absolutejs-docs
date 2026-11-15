// Shared styles for long-form blog posts: theme tokens, the article shell
// (sticky header, reading progress, byline row, contents band, footer) and the
// article system (hero, sections, reading column, code panels, figures, margin
// notes, section rail, tables, questions, the inverted close). Each post adds
// its own styles after these, under its own class prefix.
// Theme colors (--ink, --paper, --paper-deep, --line, --muted, --accent,
// --accent-soft, --accent-surface) are set inline from themeSprings by BlogPost.
export const blogPostBaseStyles = `
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
	--fw-html: #e34f26;
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

.post-hero {
	padding: 54px var(--gutter) 0;
}

.post-hero-inner {
	width: min(100%, var(--wide));
	margin: 80px auto 0;
}

.post-hero h1 {
	max-width: 1000px;
	margin: 0;
	font-family: var(--serif);
	font-size: clamp(2.7rem, 6.4vw, 6.2rem);
	font-weight: 400;
	letter-spacing: -0.06em;
	line-height: 0.92;
	text-wrap: balance;
}


.post-hero-summary {
	max-width: 720px;
	margin: 40px 0 0;
	font-size: clamp(1.15rem, 2vw, 1.45rem);
	letter-spacing: -0.02em;
	line-height: 1.5;
}

.post-article {
	padding: 0 var(--gutter);
}

.post-section {
	width: min(100%, var(--wide));
	margin: 0 auto;
	padding: 112px 0 0;
}

.post-col {
	max-width: var(--measure);
	margin: 0 auto;
}

.post-section h2 {
	max-width: var(--measure);
	margin: 0 auto 30px;
	font-family: var(--serif);
	font-size: clamp(2.2rem, 4.6vw, 3.6rem);
	font-weight: 400;
	letter-spacing: -0.05em;
	line-height: 0.98;
	text-wrap: balance;
}

.post-col p,
.post-col li {
	font-size: 1.125rem;
	line-height: 1.68;
}

.post-col p {
	margin: 0 0 22px;
}

.post-col ul {
	display: grid;
	gap: 12px;
	margin: 0 0 26px;
	padding-left: 1.2rem;
}

.post-col strong {
	font-weight: 650;
}

.post-col a {
	color: var(--accent);
	text-underline-offset: 3px;
}

.post-nowrap {
	white-space: nowrap;
}

.post-article :not(pre) > code {
	padding: 0.08em 0.35em;
	border-radius: 3px;
	background: var(--accent-soft);
	font-family: var(--mono);
	font-size: 0.84em;
	overflow-wrap: anywhere;
}

.post-code {
	margin: 30px 0 34px;
	overflow: hidden;
	color-scheme: dark;
	border-radius: 6px;
	background: var(--panel);
	color: var(--panel-ink);
}

.post-code-bar {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding: 9px 16px;
	border-bottom: 1px solid var(--panel-line);
	color: var(--panel-dim);
	font: 500 0.72rem / 1.4 var(--mono);
}

.post-code pre.shiki {
	margin: 0;
	padding: 16px 0;
	overflow-x: auto;
	background: transparent !important;
	font: 400 0.84rem / 1.7 var(--mono);
	tab-size: 2;
}

.post-code pre.shiki code {
	display: block;
	width: fit-content;
	min-width: 100%;
}

.post-code pre.shiki .line {
	display: inline-block;
	width: 100%;
	padding: 0 18px;
}

.post-code .shiki,
.post-code .shiki span {
	color: var(--shiki-dark);
	font-style: var(--shiki-dark-font-style, normal);
	font-weight: var(--shiki-dark-font-weight, inherit);
}

.post-figure {
	margin: 44px 0 52px;
}

.post-figcaption {
	max-width: var(--measure);
	margin: 14px auto 0;
	color: var(--muted);
	font-size: 0.92rem;
	line-height: 1.5;
}

.post-visually-hidden {
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

/* table */
.post-table-wrap {
	margin: 34px 0 40px;
	overflow-x: auto;
	border-top: 1px solid var(--ink);
}

.post-table-wrap table {
	width: 100%;
	min-width: 560px;
	border-collapse: collapse;
	font-size: 0.98rem;
}

.post-table-wrap th,
.post-table-wrap td {
	padding: 13px 14px 13px 0;
	border-bottom: 1px solid var(--line);
	text-align: left;
	vertical-align: top;
	line-height: 1.5;
}

.post-table-wrap th {
	color: var(--muted);
	font: 650 0.7rem var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.post-table-wrap td:first-child {
	width: 36%;
	font-weight: 650;
}

/* questions */
.post-questions {
	display: grid;
	gap: 6px;
	margin-top: 8px;
}

.post-questions details {
	padding: 4px 18px;
	border-radius: 6px;
	transition: background 200ms ease;
}

.post-questions details[open] {
	background: var(--paper-deep);
}

.post-questions summary {
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

.post-questions summary::-webkit-details-marker {
	display: none;
}

.post-questions summary::after {
	width: 9px;
	height: 9px;
	flex: 0 0 auto;
	border-right: 2px solid currentColor;
	border-bottom: 2px solid currentColor;
	content: '';
	transform: rotate(45deg) translateY(-3px);
	transition: transform 200ms ease;
}

.post-questions details[open] summary::after {
	transform: rotate(225deg) translateY(-3px);
}

.post-questions details p {
	margin: 0 0 18px;
}

/* close */
.post-close {
	margin-top: 140px;
	padding: 120px var(--gutter) 96px;
	background: var(--ink);
	color: var(--paper);
}

.post-close-inner {
	display: grid;
	gap: 40px;
	width: min(100%, var(--wide));
	margin: 0 auto;
}

.post-close h2 {
	max-width: 900px;
	margin: 0;
	font-family: var(--serif);
	font-size: clamp(3rem, 8vw, 7rem);
	font-weight: 400;
	letter-spacing: -0.065em;
	line-height: 0.9;
	text-wrap: balance;
}

.post-close-row {
	display: flex;
	flex-wrap: wrap;
	align-items: end;
	justify-content: space-between;
	gap: 28px;
}

.post-close p {
	max-width: 46ch;
	margin: 0;
	font-size: 1.2rem;
	line-height: 1.5;
}

.post-command {
	display: inline-flex;
	align-items: center;
	gap: 16px;
	padding: 10px 10px 10px 20px;
	border: 1px solid color-mix(in srgb, var(--paper) 30%, transparent);
	border-radius: 6px;
	font: 500 1.05rem var(--mono);
}

.post-command button {
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

.post-command button:active {
	transform: scale(0.97);
}

/* margin notes: inline by default, in the right margin on wide screens */
.post-note {
	display: grid;
	gap: 6px;
	margin: 0 0 22px;
	padding: 2px 0 2px 14px;
	border-left: 2px solid var(--accent);
	color: var(--muted);
	font-size: 0.86rem;
	line-height: 1.5;
}

.post-col .post-note p {
	margin: 0;
	font-size: 0.86rem;
	line-height: 1.5;
}

.post-note-label {
	color: var(--ink);
	font-size: 0.78rem;
	font-weight: 650;
}

.post-article .post-note code {
	padding: 0;
	background: none;
	color: var(--ink);
	font-size: 0.92em;
}

.post-col .post-note-links {
	display: grid;
	gap: 4px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.post-col .post-note-links li {
	font-size: 0.86rem;
	line-height: 1.4;
}

.post-col .post-note-links a {
	color: var(--accent);
	font-weight: 600;
	text-decoration: none;
}

.post-col .post-note-links a:hover {
	text-decoration: underline;
}

/* section list: only on wide screens, only inside the article */
.post-rail {
	display: none;
}

.post-figure,
.post-figure {
	clear: both;
}

@media (min-width: 1280px) {
	.post-note {
		float: right;
		clear: right;
		width: 220px;
		margin: 6px -260px 16px 0;
	}

	.post-rail {
		position: fixed;
		z-index: 5;
		top: 140px;
		left: max(24px, calc(50% - 340px - 64px - 190px));
		display: block;
		width: 190px;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 200ms ease,
			visibility 200ms;
	}

	.post-rail[data-visible='true'] {
		opacity: 1;
		visibility: visible;
	}

	.post-rail ol {
		display: grid;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.post-rail a {
		display: block;
		padding: 5px 0 5px 14px;
		border-left: 2px solid var(--line);
		color: var(--muted);
		font-size: 0.82rem;
		line-height: 1.35;
		text-decoration: none;
		transition:
			color 160ms ease,
			border-color 160ms ease;
	}

	.post-rail a:hover {
		color: var(--ink);
	}

	.post-rail a[aria-current='location'] {
		border-left-color: var(--accent);
		color: var(--ink);
		font-weight: 650;
	}
}

/* entrance */
@media (prefers-reduced-motion: no-preference) {
	.post-hero-inner > * {
		animation: post-rise 640ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.post-hero-inner > *:nth-child(2) {
		animation-delay: 80ms;
	}

	.post-hero-inner > *:nth-child(3) {
		animation-delay: 160ms;
	}
}

@keyframes post-rise {
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

	.post-hero-inner {
		margin-top: 48px;
	}

	.post-section {
		padding-top: 80px;
	}

	.post-close {
		padding-top: 88px;
	}

	.post-command {
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

	.post-rail,
	.post-rail a {
		transition: none;
	}
}
`;
