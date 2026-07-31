export const citraArticleStyles = `
:root {
				--ink: #171a17;
				--paper: #f4f0e6;
				--paper-deep: #e6dfcf;
				--lime: #cbf43c;
				--orange: #ff714b;
				--mint: #a9e6cb;
				--accent: #4f46e5;
				--accent-soft: rgba(99, 102, 241, 0.1);
				--accent-surface: #eef2ff;
				--danger: #b93822;
				--dark-panel: #111113;
				--dark-panel-ink: #f7f3e9;
				--muted: #666b63;
				--line: rgba(23, 26, 23, 0.18);
				--serif: Georgia, 'Times New Roman', serif;
				--sans:
					Inter, ui-sans-serif, system-ui, -apple-system,
					BlinkMacSystemFont, 'Segoe UI', sans-serif;
				--mono:
					'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
			}

			* {
				box-sizing: border-box;
			}

			html {
				scroll-behavior: smooth;
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
			button:focus-visible {
				outline: 3px solid var(--orange);
				outline-offset: 4px;
			}

			::selection {
				background: var(--accent-soft);
				color: var(--ink);
			}

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
				left: 0;
				width: 0;
				height: 100%;
				background: var(--accent);
				transition: width 80ms linear;
			}

			.article-meta {
				position: relative;
				z-index: 1;
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

			.byline-label {
				margin-bottom: 5px;
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
			}

			.article-toc {
				position: relative;
				z-index: 1;
				width: min(100%, 1240px);
				margin: 38px auto 0;
				padding: 0;
				border-top: 1px solid var(--line);
				border-bottom: 1px solid var(--line);
				font-family: var(--mono);
				font-size: 0.67rem;
				letter-spacing: 0.045em;
				text-transform: uppercase;
			}

			.article-toc p {
				display: flex;
				align-items: center;
				margin: 0;
				padding: 10px 14px;
				background: var(--accent);
				color: #ffffff;
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

			.hero {
				position: relative;
				isolation: isolate;
				overflow: hidden;
				padding: 54px 20px 72px;
			}

			.hero::before {
				position: absolute;
				z-index: 0;
				top: -210px;
				right: -170px;
				width: 520px;
				height: 520px;
				border: 1px solid var(--line);
				border-radius: 50%;
				box-shadow:
					0 0 0 54px var(--paper),
					0 0 0 55px var(--line),
					0 0 0 110px var(--paper),
					0 0 0 111px var(--line);
				content: '';
				pointer-events: none;
			}

			.hero-inner {
				position: relative;
				z-index: 1;
				width: min(100%, 1100px);
				margin: 72px auto 0;
			}

			.citra-lockup {
				display: flex;
				gap: 18px;
				align-items: center;
				margin-bottom: 26px;
			}

			.citra-logo {
				width: 58px;
				height: 87px;
				border: 1px solid var(--line);
				border-radius: 14px;
				box-shadow: 6px 6px 0 var(--orange);
				object-fit: cover;
			}

			.eyebrow {
				display: flex;
				gap: 12px;
				align-items: center;
				margin: 0;
				font-family: var(--mono);
				font-size: 0.76rem;
				font-weight: 700;
				letter-spacing: 0.07em;
				text-transform: uppercase;
			}

			.eyebrow::before {
				width: 28px;
				height: 8px;
				background: var(--orange);
				content: '';
			}

			h1 {
				max-width: 1050px;
				margin: 0;
				font-family: var(--serif);
				font-size: clamp(4rem, 8vw, 8.6rem);
				font-weight: 400;
				letter-spacing: -0.075em;
				line-height: 0.82;
			}

			h1 em {
				color: var(--orange);
				font-weight: 400;
			}

			.hero-summary {
				max-width: 760px;
				margin: 42px 0 0;
				font-size: clamp(1.15rem, 2vw, 1.55rem);
				letter-spacing: -0.025em;
				line-height: 1.45;
			}

			.hero-summary strong {
				font-weight: 800;
			}

			.code-window {
				border: 1px solid var(--dark-panel);
				background: var(--dark-panel);
				box-shadow: 10px 10px 0 var(--accent);
				color: var(--dark-panel-ink);
			}

			.window-bar {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 12px 15px;
				border-bottom: 1px solid rgba(244, 240, 230, 0.2);
				color: #c7c9c3;
				font-family: var(--mono);
				font-size: 0.7rem;
			}

			.dots {
				display: flex;
				gap: 6px;
			}

			.dots i {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: var(--orange);
			}

			.dots i:nth-child(2) {
				background: var(--lime);
			}

			.dots i:nth-child(3) {
				background: var(--mint);
			}

			pre {
				margin: 0;
				overflow-x: auto;
			}

			.code-window pre {
				padding: 28px 24px 32px;
				font-family: var(--mono);
				font-size: 0.77rem;
				line-height: 1.75;
			}

			.token-keyword {
				color: #f4947a;
			}

			.token-function {
				color: var(--lime);
			}

			.token-string {
				color: var(--mint);
			}

			.token-comment {
				color: #90958d;
			}

			.stats {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				width: min(100% - 40px, 1240px);
				margin: 44px auto 0;
				border: 1px solid var(--ink);
				background: var(--paper);
			}

			.stat {
				padding: 24px 26px;
				border-right: 1px solid var(--ink);
			}

			.stat:last-child {
				border-right: 0;
			}

			.stat strong {
				display: block;
				font-family: var(--serif);
				font-size: 3rem;
				font-weight: 400;
				letter-spacing: -0.06em;
				line-height: 1;
			}

			.stat span {
				display: block;
				margin-top: 8px;
				color: var(--muted);
				font-family: var(--mono);
				font-size: 0.67rem;
				font-weight: 700;
				letter-spacing: 0.06em;
				text-transform: uppercase;
			}

			article {
				overflow: hidden;
			}

			.section {
				padding: 108px 20px;
				border-top: 1px solid var(--line);
			}

			.section-inner {
				width: min(100%, 1120px);
				margin: 0 auto;
			}

			.section-label {
				margin: 0 0 20px;
				color: var(--muted);
				font-family: var(--mono);
				font-size: 0.72rem;
				font-weight: 700;
				letter-spacing: 0.08em;
				text-transform: uppercase;
			}

			h2 {
				max-width: 960px;
				margin: 0;
				font-family: var(--serif);
				font-size: clamp(2.8rem, 6vw, 5.8rem);
				font-weight: 400;
				letter-spacing: -0.065em;
				line-height: 0.96;
			}

			.lede {
				max-width: 760px;
				margin: 34px auto 0;
				font-size: clamp(1.15rem, 2vw, 1.45rem);
				letter-spacing: -0.025em;
				line-height: 1.6;
				text-align: center;
			}

			.argument {
				background: var(--paper-deep);
				color: var(--ink);
			}

			.argument .section-label {
				color: var(--accent);
			}

			.exchange {
				display: grid;
				grid-template-columns: 0.95fr 1.05fr;
				gap: 56px;
				margin-top: 70px;
			}

			.quote-card {
				position: relative;
				padding: 40px;
				border: 1px solid var(--line);
				background: var(--paper);
			}

			.quote-card::before {
				position: absolute;
				top: -29px;
				left: 28px;
				color: var(--orange);
				font-family: var(--serif);
				font-size: 6rem;
				content: '“';
			}

			blockquote {
				margin: 0;
				font-family: var(--serif);
				font-size: 1.65rem;
				letter-spacing: -0.03em;
				line-height: 1.25;
			}

			.quote-card footer {
				margin-top: 28px;
				color: var(--muted);
				font-family: var(--mono);
				font-size: 0.7rem;
				line-height: 1.5;
				text-transform: uppercase;
			}

			.quote-card footer a {
				text-underline-offset: 4px;
			}

			.counterpoint {
				padding: 24px 0;
			}

			.counterpoint h3,
			.definition-copy h3 {
				margin: 0 0 18px;
				font-size: 1.3rem;
				letter-spacing: -0.035em;
			}

			.counterpoint p {
				margin: 0 0 20px;
				color: var(--muted);
				font-size: 1.02rem;
				line-height: 1.7;
			}

			.counterpoint .thesis {
				padding-left: 20px;
				border-left: 4px solid var(--accent);
				color: var(--ink);
				font-weight: 750;
			}

			.definition-demo {
				display: grid;
				grid-template-columns: 1.15fr 0.85fr;
				gap: 48px;
				margin-top: 70px;
				align-items: start;
			}

			.definition-code {
				box-shadow: -10px 10px 0 var(--accent);
			}

			.definition-copy {
				border-top: 1px solid var(--ink);
			}

			.definition-copy h3 {
				margin: 0;
				padding-top: 23px;
			}

			.definition-copy h3 code {
				font-size: 0.85em;
			}

			.definition-copy p {
				margin: 10px 0 0;
				padding-bottom: 23px;
				border-bottom: 1px solid var(--line);
				color: var(--muted);
				font-size: 0.92rem;
				line-height: 1.6;
			}

			.definition-copy p code {
				color: var(--danger);
				font-size: 0.86em;
			}

			.withings {
				background: var(--paper-deep);
			}

			.request-map {
				display: grid;
				grid-template-columns: 0.75fr 1fr;
				gap: 56px;
				margin-top: 64px;
				align-items: start;
			}

			.request-explanation {
				position: sticky;
				top: 36px;
			}

			.request-explanation p {
				margin: 0 0 22px;
				color: var(--muted);
				line-height: 1.7;
			}

			.mini-kicker {
				display: inline-block;
				margin-bottom: 18px;
				padding: 7px 10px;
				background: var(--accent-surface);
				color: var(--accent);
				font-family: var(--mono);
				font-size: 0.66rem;
				font-weight: 800;
				letter-spacing: 0.07em;
				text-transform: uppercase;
			}

			.request-stack {
				display: grid;
				gap: 12px;
			}

			.request-row {
				display: grid;
				grid-template-columns: 132px 1fr;
				border: 1px solid var(--ink);
				background: var(--paper);
			}

			.request-row dt,
			.request-row dd {
				margin: 0;
				padding: 19px 20px;
			}

			.request-row dt {
				border-right: 1px solid var(--ink);
				color: var(--muted);
				font-family: var(--mono);
				font-size: 0.68rem;
				font-weight: 700;
				letter-spacing: 0.06em;
				text-transform: uppercase;
			}

			.request-row dd {
				font-family: var(--mono);
				font-size: 0.79rem;
				line-height: 1.55;
			}

			.request-row dd strong {
				color: var(--danger);
			}

			.request-row:last-child {
				border-color: var(--accent);
				background: var(--accent-surface);
				color: var(--ink);
			}

			.quirk-ledger {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 1px;
				margin-top: 28px;
				border: 1px solid var(--ink);
				background: var(--ink);
			}

			.quirk-ledger > * {
				padding: 28px;
				background: var(--paper);
			}

			.quirk-intro {
				max-width: 680px;
				margin-top: 70px;
				color: var(--ink);
			}

			.quirk-intro h3 {
				margin: 10px 0 0;
				font-family: var(--serif);
				font-size: 2rem;
				font-weight: 400;
				letter-spacing: -0.04em;
				line-height: 1.1;
			}

			.quirk-ledger article > strong,
			.quirk-ledger article > code {
				display: block;
			}

			.quirk-ledger article > strong {
				margin-bottom: 12px;
			}

			.quirk-ledger article code {
				margin-bottom: 14px;
				color: var(--danger);
				font-family: var(--mono);
				font-size: 0.68rem;
				line-height: 1.45;
			}

			.quirk-ledger article p {
				margin: 0;
				color: var(--muted);
				font-size: 0.82rem;
				line-height: 1.55;
			}

			.daily-tools {
				display: grid;
				grid-template-columns: 1.15fr repeat(2, 1fr);
				gap: 1px;
				margin-top: 54px;
				border: 1px solid var(--ink);
				background: var(--ink);
			}

			.daily-tools > * {
				padding: 26px;
				background: var(--paper);
			}

			.daily-tools-intro {
				grid-row: span 2;
				background: var(--accent-surface);
				color: var(--ink);
			}

			.daily-tools-intro h3 {
				margin: 12px 0 0;
				font-family: var(--serif);
				font-size: 2rem;
				font-weight: 400;
				letter-spacing: -0.04em;
				line-height: 1.1;
			}

			.daily-tools article > code,
			.daily-tools article > strong {
				display: block;
				margin-bottom: 8px;
				font-size: 0.78rem;
			}

			.daily-tools article > code {
				color: var(--danger);
				font-family: var(--mono);
			}

			.daily-tools article p {
				margin: 14px 0 0;
				color: var(--muted);
				font-size: 0.8rem;
				line-height: 1.55;
			}

			.type-section {
				background: var(--paper);
			}

			.type-grid {
				display: grid;
				grid-template-columns: 0.85fr 1.15fr;
				gap: 68px;
				margin-top: 72px;
				align-items: start;
			}

			.type-notes {
				display: grid;
				gap: 0;
				border-top: 1px solid var(--ink);
			}

			.type-note {
				display: grid;
				grid-template-columns: 36px 1fr;
				gap: 14px;
				padding: 23px 0;
				border-bottom: 1px solid var(--line);
			}

			.type-note b {
				font-family: var(--mono);
				font-size: 0.72rem;
			}

			.type-note h3 {
				margin: 0 0 8px;
				font-size: 1rem;
			}

			.type-note p {
				margin: 0;
				color: var(--muted);
				font-size: 0.92rem;
				line-height: 1.55;
			}

			.type-code {
				overflow: hidden;
				border: 1px solid var(--ink);
				background: var(--dark-panel);
				color: #f7f3e9;
				box-shadow: -12px 12px 0 var(--orange);
			}

			.type-code pre {
				padding: 28px;
				font-family: var(--mono);
				font-size: 0.76rem;
				line-height: 1.75;
			}

			.code-case + .code-case {
				border-top: 1px solid rgba(244, 240, 230, 0.2);
			}

			.code-case pre {
				padding-bottom: 18px;
			}

			.error-target {
				padding: 2px 3px;
				border: 1px solid #ff7955;
				background: rgba(255, 69, 45, 0.18);
				color: #ff9b81;
			}

			.diagnostic {
				margin: 0 28px 28px;
				padding: 14px 16px;
				border-left: 5px solid #ff3f2e;
				background: #7e1f17;
				color: #fff4ef;
				font-family: var(--mono);
			}

			.diagnostic strong {
				display: block;
				margin-bottom: 8px;
				color: #ffb4a3;
				font-size: 0.68rem;
				letter-spacing: 0.08em;
				text-transform: uppercase;
			}

			.diagnostic p {
				margin: 0;
				font-size: 0.72rem;
				line-height: 1.55;
			}

			.validation-band {
				margin-top: 84px;
				padding: 34px 38px;
				border: 1px solid var(--accent);
				background: var(--accent-surface);
				color: var(--ink);
			}

			.validation-band h3 {
				margin: 0 0 18px;
				font-family: var(--serif);
				font-size: 2rem;
				font-weight: 400;
				letter-spacing: -0.045em;
			}

			.validation-band p {
				max-width: 880px;
				margin: 0;
				line-height: 1.65;
			}

			.constructor-proof,
			.runtime-narrowing {
				display: grid;
				grid-template-columns: 0.72fr 1.28fr;
				gap: 54px;
				margin-top: 82px;
				align-items: start;
			}

			.constructor-intro h3,
			.runtime-narrowing h3,
			.custom-proof-copy h3 {
				margin: 12px 0 16px;
				font-family: var(--serif);
				font-size: clamp(1.8rem, 3vw, 2.65rem);
				font-weight: 400;
				letter-spacing: -0.045em;
				line-height: 1.08;
			}

			.constructor-intro > p:last-child,
			.runtime-narrowing > div:first-child > p:last-child,
			.custom-proof-copy > p {
				color: var(--muted);
				line-height: 1.65;
			}

			.constructor-errors {
				display: grid;
				gap: 14px;
			}

			.compiler-card {
				overflow: hidden;
				border: 1px solid var(--ink);
				background: var(--dark-panel);
				color: #f7f3e9;
			}

			.compiler-card pre {
				padding: 24px 28px 18px;
				font-family: var(--mono);
				font-size: 0.74rem;
				line-height: 1.7;
			}

			.compiler-card .diagnostic {
				margin-bottom: 24px;
			}

			.runtime-narrowing {
				grid-template-columns: 0.65fr 1.35fr;
				padding-top: 72px;
				border-top: 1px solid var(--ink);
			}

			.oidc-section {
				background: var(--paper-deep);
			}

			.oidc-demo {
				display: grid;
				grid-template-columns: 1.1fr 0.9fr;
				gap: 48px;
				margin-top: 68px;
				align-items: start;
			}

			.oidc-demo > .type-code {
				box-shadow: -10px 10px 0 var(--accent);
			}

			.oidc-facts {
				display: grid;
				grid-template-columns: 1fr 1fr;
				border-top: 1px solid var(--ink);
			}

			.oidc-facts article {
				padding: 22px 20px;
				border-right: 1px solid var(--line);
				border-bottom: 1px solid var(--line);
			}

			.oidc-facts article:nth-child(2n) {
				border-right: 0;
			}

			.oidc-facts h3 {
				margin: 0 0 9px;
				font-size: 0.95rem;
			}

			.oidc-facts article p {
				margin: 0;
				color: var(--muted);
				font-size: 0.8rem;
				line-height: 1.55;
			}

			.oidc-note {
				grid-column: 1 / -1;
				margin: 18px 0 0;
				padding: 18px 20px;
				border: 1px solid var(--ink);
				background: var(--paper);
				font-size: 0.83rem;
				line-height: 1.6;
			}

			.identity-section {
				background: var(--paper);
			}

			.identity-stage {
				display: grid;
				grid-template-columns: 1.05fr 0.95fr;
				gap: 30px;
				margin-top: 68px;
			}

			.provider-paths {
				display: grid;
				gap: 10px;
			}

			.provider-path {
				display: grid;
				grid-template-columns: 110px minmax(0, 1fr) 28px 76px;
				gap: 12px;
				align-items: center;
				padding: 17px 18px;
				border: 1px solid var(--ink);
				background: var(--paper);
			}

			.provider-path strong {
				font-size: 0.78rem;
			}

			.provider-path code {
				font-family: var(--mono);
				font-size: 0.66rem;
				line-height: 1.35;
				overflow-wrap: anywhere;
			}

			.provider-path .arrow {
				color: var(--accent);
				font-size: 1.2rem;
				font-weight: 800;
				text-align: center;
			}

			.provider-path .value-type {
				padding: 5px 7px;
				background: var(--paper-deep);
				font-family: var(--mono);
				font-size: 0.62rem;
				font-weight: 700;
				text-align: center;
				text-transform: uppercase;
			}

			.identity-engine {
				display: flex;
				flex-direction: column;
				padding: 28px;
				border: 1px solid var(--ink);
				background: var(--dark-panel);
				box-shadow: 10px 10px 0 var(--accent);
				color: var(--dark-panel-ink);
			}

			.identity-engine .engine-label {
				margin-bottom: 28px;
				color: #a5b4fc;
				font-family: var(--mono);
				font-size: 0.68rem;
				font-weight: 700;
				letter-spacing: 0.07em;
				text-transform: uppercase;
			}

			.engine-step {
				display: grid;
				grid-template-columns: 28px 1fr;
				gap: 12px;
				padding: 15px 0;
				border-top: 1px solid rgba(244, 240, 230, 0.18);
			}

			.engine-step b {
				color: var(--orange);
				font-family: var(--mono);
				font-size: 0.7rem;
			}

			.engine-step h3 {
				margin: 0 0 6px;
				font-size: 0.9rem;
			}

			.engine-step p {
				margin: 0;
				color: #b9bdb5;
				font-size: 0.78rem;
				line-height: 1.5;
			}

			.canonical-result {
				margin-top: auto;
				padding: 16px 18px;
				border: 1px solid #a5b4fc;
				background: rgba(99, 102, 241, 0.12);
				font-family: var(--mono);
				font-size: 0.75rem;
				line-height: 1.6;
			}

			.canonical-result span {
				color: #a5b4fc;
			}

			.identity-fields {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				gap: 1px;
				margin-top: 40px;
				border: 1px solid var(--ink);
				background: var(--ink);
			}

			.identity-caveat {
				margin: 38px 0 0;
				padding: 20px 24px;
				border-left: 5px solid var(--accent);
				background: var(--paper-deep);
				font-size: 0.9rem;
				line-height: 1.65;
			}

			.identity-field {
				min-width: 0;
				padding: 22px 18px;
				background: var(--paper);
			}

			.identity-field code {
				display: block;
				margin-bottom: 10px;
				color: var(--danger);
				font-family: var(--mono);
				font-size: 0.68rem;
				font-weight: 700;
			}

			.identity-field span {
				color: var(--muted);
				font-size: 0.78rem;
				line-height: 1.45;
			}

			.extractor-payoff {
				display: grid;
				grid-template-columns: 0.8fr 1.2fr;
				gap: 46px;
				align-items: center;
				margin-top: 54px;
			}

			.extractor-payoff h3 {
				margin: 0;
				font-family: var(--serif);
				font-size: clamp(2rem, 4vw, 3.5rem);
				font-weight: 400;
				letter-spacing: -0.05em;
				line-height: 1;
			}

			.extractor-payoff p {
				margin: 0;
				font-size: 1.05rem;
				line-height: 1.7;
			}

			.custom {
				background: var(--paper-deep);
			}

			.custom .lede {
				max-width: 820px;
			}

			.custom-code {
				margin-top: 60px;
				border: 1px solid var(--ink);
				background: var(--paper);
				box-shadow: 10px 10px 0 var(--accent);
			}

			.custom-code .window-bar {
				border-bottom-color: var(--ink);
				color: var(--muted);
			}

			.custom-code pre {
				padding: 34px;
				font-family: var(--mono);
				font-size: clamp(0.7rem, 1.4vw, 0.86rem);
				line-height: 1.75;
			}

			.custom-code .token-keyword {
				color: var(--danger);
			}

			.custom-code .token-function {
				color: var(--accent);
			}

			.custom-code .token-string {
				color: var(--accent);
			}

			.custom-code .token-comment {
				color: var(--muted);
			}

			.custom-proof {
				display: grid;
				grid-template-columns: 0.72fr 1.28fr;
				gap: 54px;
				margin-top: 76px;
				padding-top: 64px;
				border-top: 1px solid var(--ink);
				align-items: start;
			}

			.custom-proof-copy .custom-limit {
				margin-top: 24px;
				padding: 18px 20px;
				border: 1px solid var(--ink);
				background: var(--paper);
				color: var(--ink);
				font-size: 0.85rem;
			}

			.custom-errors {
				display: grid;
				gap: 14px;
			}

			.history {
				background: var(--paper-deep);
			}

			.history .lede a {
				text-underline-offset: 4px;
			}

			.history-context {
				display: grid;
				grid-template-columns: 0.9fr 1.1fr;
				gap: 1px;
				margin-top: 64px;
				border: 1px solid var(--ink);
				background: var(--ink);
			}

			.history-context > div {
				padding: 34px;
				background: var(--paper);
			}

			.history-context h3 {
				margin: 12px 0 22px;
				font-family: var(--serif);
				font-size: clamp(1.8rem, 3vw, 2.7rem);
				font-weight: 400;
				letter-spacing: -0.045em;
				line-height: 1.05;
			}

			.history-context-copy p {
				margin: 0;
				color: var(--muted);
				font-size: 0.95rem;
				line-height: 1.7;
			}

			.history-context-copy p + p {
				margin-top: 18px;
			}

			.history-friction dl {
				margin: 18px 0 0;
			}

			.history-friction dl > div {
				display: grid;
				grid-template-columns: 108px 1fr;
				gap: 20px;
				padding: 16px 0;
				border-top: 1px solid var(--line);
			}

			.history-friction dt {
				color: var(--accent);
				font-family: var(--mono);
				font-size: 0.7rem;
				font-weight: 800;
				letter-spacing: 0.05em;
				text-transform: uppercase;
			}

			.history-friction dd {
				margin: 0;
				color: var(--muted);
				font-size: 0.86rem;
				line-height: 1.55;
			}

			.history-friction code {
				color: var(--ink);
				font-size: 0.8em;
			}

			.history-timeline {
				position: relative;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 0;
				margin-top: 72px;
				border-top: 1px solid var(--ink);
			}

			.history-event {
				position: relative;
				padding: 34px 28px 28px 0;
			}

			.history-event::before {
				position: absolute;
				top: -8px;
				left: 0;
				width: 13px;
				height: 13px;
				border: 1px solid var(--ink);
				border-radius: 50%;
				background: var(--orange);
				content: '';
			}

			.history-event:not(:last-child) {
				border-right: 1px solid var(--line);
			}

			.history-event:not(:first-child) {
				padding-left: 28px;
			}

			.history-event:not(:first-child)::before {
				left: 28px;
			}

			.history-date {
				display: block;
				margin-bottom: 34px;
				color: var(--muted);
				font-family: var(--mono);
				font-size: 0.68rem;
				font-weight: 700;
				letter-spacing: 0.07em;
				text-transform: uppercase;
			}

			.history-event h3 {
				margin: 0 0 14px;
				font-family: var(--serif);
				font-size: 1.55rem;
				font-weight: 400;
				letter-spacing: -0.04em;
				line-height: 1.05;
			}

			.history-event p {
				margin: 0;
				color: var(--muted);
				font-size: 0.9rem;
				line-height: 1.6;
			}

			.history-event p + p {
				margin-top: 16px;
			}

			.history-event a {
				text-underline-offset: 3px;
			}

			.history-maintenance {
				max-width: 820px;
				margin: 36px auto 0;
				color: var(--muted);
				font-size: 0.9rem;
				line-height: 1.65;
				text-align: center;
			}

			.history-today {
				margin-top: 48px;
				padding: 28px 32px;
				border: 1px solid var(--accent);
				background: var(--accent-surface);
				color: var(--ink);
				font-family: var(--serif);
				font-size: clamp(1.45rem, 2.8vw, 2.25rem);
				letter-spacing: -0.035em;
				line-height: 1.3;
				text-align: center;
			}

			.verdict {
				background: var(--paper);
				color: var(--ink);
				text-align: center;
			}

			.verdict .section-inner {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.verdict .section-label {
				color: var(--accent);
			}

			.verdict h2 {
				max-width: 900px;
			}

			.verdict p {
				max-width: 750px;
				margin: 36px auto 0;
				color: var(--muted);
				font-size: 1.15rem;
				line-height: 1.7;
			}

			.cta-row {
				display: flex;
				gap: 14px;
				justify-content: center;
				margin-top: 44px;
			}

			.install-command {
				display: flex;
				align-items: stretch;
				min-width: 280px;
				min-height: 50px;
				border: 1px solid rgba(244, 240, 230, 0.5);
				background: var(--dark-panel);
				color: var(--dark-panel-ink);
				text-align: left;
			}

			.install-command code {
				display: flex;
				flex: 1;
				gap: 10px;
				align-items: center;
				padding: 0 16px;
				font-family: var(--mono);
				font-size: 0.78rem;
			}

			.command-prompt {
				color: #a5b4fc;
				user-select: none;
			}

			.copy-command {
				display: inline-flex;
				gap: 7px;
				align-items: center;
				justify-content: center;
				min-width: 88px;
				padding: 0 13px;
				border: 0;
				border-left: 1px solid rgba(244, 240, 230, 0.25);
				background: transparent;
				color: #bfc3ba;
				cursor: pointer;
				font-family: var(--mono);
				font-size: 0.66rem;
				font-weight: 700;
				letter-spacing: 0.05em;
				text-transform: uppercase;
			}

			.copy-command:hover {
				background: rgba(244, 240, 230, 0.08);
				color: var(--paper);
			}

			.copy-command.copied {
				background: #a5b4fc;
				color: var(--dark-panel);
			}

			.copy-command svg {
				width: 15px;
				height: 15px;
				fill: none;
				stroke: currentColor;
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke-width: 1.7;
			}

			.button {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-height: 50px;
				padding: 0 20px;
				border: 1px solid var(--ink);
				font-family: var(--mono);
				font-size: 0.72rem;
				font-weight: 800;
				letter-spacing: 0.04em;
				text-decoration: none;
				text-transform: uppercase;
			}

			.sources {
				padding: 46px 20px;
				border-top: 1px solid var(--line);
				background: var(--paper-deep);
				color: var(--muted);
			}

			.sources-inner {
				display: grid;
				grid-template-columns: 140px 1fr;
				gap: 30px;
				width: min(100%, 1120px);
				margin: 0 auto;
			}

			.sources h2 {
				font-family: var(--mono);
				font-size: 0.7rem;
				font-weight: 700;
				letter-spacing: 0.08em;
				text-transform: uppercase;
			}

			.sources ol {
				display: grid;
				gap: 10px;
				margin: 0;
				padding-left: 20px;
				font-family: var(--mono);
				font-size: 0.72rem;
				line-height: 1.55;
			}

			.sources a {
				color: var(--ink);
				text-underline-offset: 3px;
			}

			.site-footer {
				display: flex;
				align-items: center;
				justify-content: space-between;
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

			@media (max-width: 900px) {
				.hero {
					padding-top: 36px;
				}

				.hero-inner,
				.exchange,
				.request-map,
				.type-grid,
				.definition-demo,
				.constructor-proof,
				.runtime-narrowing,
				.oidc-demo,
				.custom-proof {
					grid-template-columns: minmax(0, 1fr);
				}

				.hero-inner > *,
				.code-window,
				.type-code,
				.custom-code {
					min-width: 0;
				}

				.hero-inner {
					gap: 58px;
				}

				.history-context {
					grid-template-columns: 1fr;
				}

				.article-toc ol {
					grid-template-columns: repeat(2, minmax(0, 1fr));
				}

				.article-toc li:nth-child(odd) {
					border-left: 0;
				}

				.article-toc li:nth-child(even) {
					border-left: 1px solid var(--line);
				}

				.code-window {
					max-width: 640px;
				}

				.request-explanation {
					position: static;
				}

				.quirk-ledger {
					grid-template-columns: 1fr 1fr;
				}

				.daily-tools {
					grid-template-columns: 1fr 1fr;
				}

				.daily-tools-intro {
					grid-column: 1 / -1;
					grid-row: auto;
				}
			}

			@media (max-width: 620px) {
				.history-context > div {
					padding: 26px 22px;
				}

				.history-friction dl > div {
					grid-template-columns: 1fr;
					gap: 7px;
				}

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

				.article-details {
					text-align: left;
				}

				.article-toc ol {
					grid-template-columns: 1fr;
				}

				.article-toc li,
				.article-toc li:nth-child(even) {
					border-left: 0;
				}

				h1 {
					font-size: clamp(3.55rem, 18vw, 6rem);
				}

				.hero,
				.section {
					padding-right: 14px;
					padding-left: 14px;
				}

				.section {
					padding-top: 78px;
					padding-bottom: 78px;
				}

				.stats {
					grid-template-columns: 1fr;
					width: calc(100% - 28px);
				}

				.stat {
					border-right: 0;
					border-bottom: 1px solid var(--ink);
				}

				.stat:last-child {
					border-bottom: 0;
				}

				.quirk-ledger,
				.oidc-facts,
				.daily-tools {
					grid-template-columns: 1fr;
				}

				.identity-stage,
				.extractor-payoff {
					grid-template-columns: 1fr;
				}

				.identity-fields {
					grid-template-columns: 1fr 1fr;
				}

				.history-timeline {
					grid-template-columns: 1fr;
					border-top: 0;
					border-left: 1px solid var(--ink);
				}

				.history-event,
				.history-event:not(:first-child) {
					padding: 0 0 38px 28px;
					border-right: 0;
				}

				.history-event::before,
				.history-event:not(:first-child)::before {
					top: 0;
					left: -7px;
				}

				.history-date {
					margin-bottom: 14px;
				}

				.quirk-intro {
					grid-column: auto;
				}

				.daily-tools-intro {
					grid-column: auto;
				}

				.oidc-facts article {
					border-right: 0;
				}

				.quote-card,
				.validation-band {
					padding: 30px 24px;
				}

				.request-row {
					grid-template-columns: 1fr;
				}

				.request-row dt {
					padding-bottom: 8px;
					border-right: 0;
				}

				.request-row dd {
					padding-top: 6px;
				}

				.custom-code pre,
				.type-code pre {
					padding: 22px 18px;
					font-size: 0.68rem;
				}

				.diagnostic {
					margin: 0 18px 22px;
				}

				.constructor-proof,
				.runtime-narrowing,
				.custom-proof {
					gap: 34px;
				}

				.provider-path {
					grid-template-columns: 96px minmax(0, 1fr) 60px;
					gap: 7px;
					padding: 14px 10px;
				}

				.provider-path .arrow {
					display: none;
				}

				.provider-path code {
					font-size: 0.6rem;
				}

				.provider-path .value-type {
					font-size: 0.54rem;
				}

				.identity-engine {
					padding: 22px 20px;
				}

				.identity-field:last-child {
					grid-column: 1 / -1;
				}

				.cta-row {
					flex-direction: column;
					width: 100%;
				}

				.install-command {
					width: 100%;
				}

				.sources-inner {
					grid-template-columns: 1fr;
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
			}
`;
