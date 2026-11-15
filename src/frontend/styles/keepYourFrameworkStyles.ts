import { blogPostBaseStyles } from './blogPostBaseStyles';

// Styles for "Keep Your Framework, Lose the Package Deal": the shared blog
// post styles, then this post's own (`.kyf-`). The one recurring shape is the
// editor file tab, in each framework's color: the hero folder stack, every
// chapter opener, the route switcher and the closing command.
export const keepYourFrameworkStyles = `${blogPostBaseStyles}
/* contents band: nine sections read as three rows of three */
.kyf-blog-document .article-toc ol {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kyf-blog-document .article-toc li:nth-child(4n + 1) {
	border-left: 1px solid var(--line);
}

.kyf-blog-document .article-toc li:nth-child(3n + 1) {
	border-left: 0;
}

/* the file tab */
.kyf-tab {
	display: inline-flex;
	align-items: center;
	min-height: 40px;
	padding: 8px 14px 7px;
	border: 1px solid var(--line);
	border-top: 3px solid var(--fw-color);
	border-bottom: 0;
	border-radius: 7px 7px 0 0;
	background: var(--paper-deep);
	color: var(--muted);
	font: 500 0.78rem / 1.2 var(--mono);
	letter-spacing: 0;
	white-space: nowrap;
	cursor: pointer;
	transition:
		background 160ms ease,
		color 160ms ease;
}

.kyf-tab:hover {
	color: var(--ink);
}

.kyf-tab[aria-selected='true'],
.kyf-tab[aria-pressed='true'],
.kyf-tab-static {
	background: var(--paper);
	color: var(--ink);
	font-weight: 650;
}

.kyf-tab-static {
	cursor: default;
}

/* an open tab joins the sheet below it, covering the sheet's top rule */
.kyf-folder-tabs .kyf-tab[aria-selected='true'],
.kyf-move-tabs .kyf-tab[aria-pressed='true'] {
	position: relative;
	z-index: 1;
	margin-bottom: -3px;
	padding-bottom: 10px;
}

/* hero: the folder stack */
.kyf-hero-inner .post-hero-summary {
	margin-bottom: 48px;
}

.kyf-folders {
	max-width: 920px;
}

.kyf-folder-tabs {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	gap: 6px 4px;
	padding-left: 12px;
}

.kyf-folder-sheet {
	display: grid;
	gap: 10px;
	position: relative;
	padding: 26px 28px 24px;
	border: 1px solid var(--line);
	border-top: 3px solid var(--fw-color);
	background: var(--paper);
	box-shadow: 0 18px 40px -28px rgba(9, 9, 11, 0.35);
}

.kyf-folder-name {
	margin: 0;
	color: var(--fw-color);
	font-family: var(--serif);
	font-size: clamp(1.6rem, 3vw, 2.2rem);
	letter-spacing: -0.04em;
	line-height: 1;
}

.kyf-folder-gain {
	max-width: 52ch;
	margin: 0;
	font-size: clamp(1.05rem, 1.6vw, 1.25rem);
	letter-spacing: -0.015em;
	line-height: 1.5;
}

.kyf-folder-sheet a {
	justify-self: start;
	color: var(--accent);
	font-weight: 650;
	text-underline-offset: 3px;
}

/* chapter index */
.kyf-index {
	width: min(100%, 920px);
	margin: 36px auto 0;
}

.kyf-index ol {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 0 24px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.kyf-index a {
	display: grid;
	gap: 4px;
	height: 100%;
	padding: 14px 0 22px;
	border-top: 3px solid var(--fw-color);
	color: var(--ink);
	text-decoration: none;
}

.kyf-index-name {
	font-family: var(--serif);
	font-size: 1.45rem;
	letter-spacing: -0.035em;
}

.kyf-index-home {
	color: var(--muted);
	font: 500 0.7rem / 1.4 var(--mono);
	letter-spacing: 0.04em;
	text-transform: uppercase;
}

.kyf-index-gain {
	color: var(--muted);
	font-size: 0.95rem;
	line-height: 1.45;
}

.kyf-index a:hover .kyf-index-name {
	color: var(--fw-color);
}

/* chapter opener and ledger: the file tab sits on a rule in its color */
.kyf-chapter-head {
	max-width: var(--measure);
	margin: 0 auto 30px;
}

.kyf-chapter-tabrow {
	display: flex;
	border-bottom: 3px solid var(--fw-color);
}

.kyf-chapter-head h2 {
	margin: 24px 0 0;
}

.kyf-ledger {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
	gap: 0;
	width: min(100%, 920px);
	margin: 0 auto 44px;
	border: 1px solid var(--line);
}

.kyf-ledger > div {
	padding: 22px 24px 18px;
}

.kyf-ledger ul {
	display: grid;
	gap: 10px;
	margin: 0;
	padding-left: 1.1rem;
}

.kyf-ledger li {
	font-size: 0.98rem;
	line-height: 1.5;
}

.kyf-ledger-label {
	margin: 0 0 12px;
	font: 650 0.7rem / 1.3 var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.kyf-ledger-home {
	background: var(--paper-deep);
	color: var(--muted);
}

.kyf-ledger-here {
	border-left: 3px solid var(--fw-color);
	color: var(--ink);
}

.kyf-ledger-here .kyf-ledger-label {
	color: var(--fw-color);
}

.kyf-ledger code {
	padding: 0.05em 0.3em;
	border-radius: 3px;
	background: var(--accent-soft);
	font-family: var(--mono);
	font-size: 0.86em;
}

/* six frameworks over one server */
.kyf-hub {
	width: min(100%, 920px);
	margin-inline: auto;
}

.kyf-hub-frameworks {
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	gap: 8px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.kyf-hub-frameworks li {
	display: grid;
	gap: 2px;
	padding: 12px 12px 14px;
	border: 1px solid var(--line);
	border-top: 3px solid var(--fw-color);
	border-bottom: 0;
	border-radius: 7px 7px 0 0;
	background: var(--paper);
}

.kyf-hub-name {
	font-weight: 650;
}

.kyf-hub-file {
	overflow: hidden;
	color: var(--muted);
	font: 500 0.7rem / 1.3 var(--mono);
	text-overflow: ellipsis;
	white-space: nowrap;
}

.kyf-hub-server {
	padding: 22px 24px 24px;
	border-radius: 0 0 6px 6px;
	background: var(--panel);
	color: var(--panel-ink);
}

.kyf-hub-title {
	margin: 0 0 14px;
	font-family: var(--serif);
	font-size: 1.5rem;
	letter-spacing: -0.03em;
}

.kyf-hub-server ul {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 10px 24px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.kyf-hub-server li {
	padding-left: 14px;
	border-left: 2px solid var(--panel-line);
	color: var(--panel-dim);
	font-size: 0.92rem;
	line-height: 1.4;
}

/* move this route */
.kyf-move {
	width: min(100%, var(--wide));
	margin-inline: auto;
}

.kyf-move-tabs,
.kyf-create-tabs {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	gap: 6px 4px;
	margin: 0;
	padding: 0 0 0 12px;
	border: 0;
}

.kyf-move-tabs legend,
.kyf-create-tabs legend {
	float: left;
	align-self: center;
	margin-right: 10px;
	color: var(--muted);
	font: 650 0.7rem / 40px var(--mono);
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.kyf-move-body {
	display: grid;
	grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
	border: 1px solid var(--line);
	border-top: 3px solid var(--fw-color);
}

.kyf-move-code {
	margin: 0;
	padding: 22px 0;
	overflow-x: auto;
	background: var(--panel);
	color: var(--panel-ink);
	font: 400 0.84rem / 1.75 var(--mono);
	tab-size: 2;
	color-scheme: dark;
}

.kyf-move-code code {
	display: block;
	width: fit-content;
	min-width: 100%;
	padding: 0 20px;
	white-space: pre;
}

.kyf-dim {
	color: var(--panel-dim);
}

.kyf-hot {
	padding: 2px 4px;
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
	border-radius: 3px;
	background: color-mix(in srgb, var(--fw-color) 30%, transparent);
	color: var(--panel-ink);
	transition: background 200ms ease;
}

.kyf-move-list {
	display: grid;
	align-content: start;
	gap: 6px;
	padding: 22px 24px;
	background: var(--paper);
	font-size: 0.98rem;
	line-height: 1.5;
}

.kyf-move-list p {
	margin: 0;
}

.kyf-move-same {
	margin-top: 10px !important;
	color: var(--muted);
}

.kyf-move-list ul {
	display: grid;
	gap: 6px;
	margin: 0;
	padding-left: 1.1rem;
	color: var(--muted);
}

.kyf-move-list code,
.kyf-hub code {
	font-family: var(--mono);
	font-size: 0.86em;
}

/* the close: tabs and command on the inverted band */
.kyf-create {
	display: grid;
	gap: 0;
	justify-items: start;
}

.kyf-close .kyf-create-tabs legend {
	color: color-mix(in srgb, var(--paper) 60%, transparent);
}

.kyf-close .kyf-tab {
	border-color: color-mix(in srgb, var(--paper) 24%, transparent);
	border-top-color: var(--fw-color);
	background: transparent;
	color: color-mix(in srgb, var(--paper) 70%, transparent);
}

.kyf-close .kyf-tab[aria-pressed='true'] {
	background: var(--paper);
	color: var(--ink);
}

.kyf-close .post-command {
	border-top: 3px solid var(--fw-color);
	border-radius: 0 6px 6px 6px;
}

.kyf-nowrap {
	white-space: nowrap;
}

@media (max-width: 900px) {
	.kyf-blog-document .article-toc ol {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.kyf-blog-document .article-toc li:nth-child(3n + 1) {
		border-left: 1px solid var(--line);
	}

	.kyf-blog-document .article-toc li:nth-child(odd) {
		border-left: 0;
	}

	.kyf-index ol {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.kyf-hub-frameworks {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.kyf-hub-frameworks li {
		border-bottom: 1px solid var(--line);
		border-radius: 7px 7px 0 0;
	}

	.kyf-hub-server ul {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.kyf-move-body {
		grid-template-columns: minmax(0, 1fr);
	}
}

@media (max-width: 620px) {
	.kyf-blog-document .article-toc ol {
		grid-template-columns: 1fr;
	}

	.kyf-blog-document .article-toc li {
		border-left: 0;
	}

	.kyf-index ol,
	.kyf-ledger,
	.kyf-hub-server ul {
		grid-template-columns: minmax(0, 1fr);
	}

	.kyf-ledger-here {
		border-top: 3px solid var(--fw-color);
		border-left: 0;
	}

	.kyf-hub-frameworks {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.kyf-folder-sheet {
		padding: 20px 18px;
	}

	/* on phones the tabs become a tidy grid instead of ragged rows */
	.kyf-folder-tabs,
	.kyf-move-tabs,
	.kyf-create-tabs {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 4px;
		padding: 0 0 8px;
	}

	.kyf-create-tabs {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.kyf-move-tabs legend,
	.kyf-create-tabs legend {
		float: none;
		margin: 0 0 6px;
		line-height: 1.4;
	}

	.kyf-tab {
		justify-content: center;
		min-width: 0;
		padding-inline: 8px;
		border-bottom: 1px solid var(--line);
		border-radius: 6px;
		font-size: 0.72rem;
	}

	.kyf-folder-tabs .kyf-tab[aria-selected='true'],
	.kyf-move-tabs .kyf-tab[aria-pressed='true'] {
		margin-bottom: 0;
		padding-bottom: 7px;
	}

	.kyf-close .post-command {
		border-radius: 6px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.kyf-tab,
	.kyf-hot {
		transition: none;
	}
}
`;
