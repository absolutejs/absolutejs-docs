import { Fragment, useState } from 'react';
import {
	chapterFrameworks,
	frameworkColor,
	type FrameworkKey
} from './frameworks';

// The handler call each framework needs for the same /dashboard route.
const handlerCalls: Record<FrameworkKey, string> = {
	angular: `handleAngularPageRequest<Dash.Context>({
      indexPath,
      pagePath,
      requestContext: { stats }
    })`,
	html: "handleHTMLPageRequest(asset(manifest, 'Dashboard'))",
	htmx: "handleHTMXPageRequest(asset(manifest, 'Dashboard'))",
	react: `handleReactPageRequest({
      Page: Dashboard,
      index: asset(manifest, 'DashboardIndex'),
      props: { stats }
    })`,
	svelte: `handleSveltePageRequest<typeof Dashboard>({
      indexPath,
      pagePath,
      props: { stats }
    })`,
	vue: `handleVuePageRequest<typeof Dashboard>({
      indexPath,
      pagePath,
      props: { stats }
    })`
};

// Highlight each line from its first character, so the indentation of a
// multi-line call stays unmarked.
const highlightLines = (code: string) =>
	code.split('\n').map((line, index) => (
		<Fragment key={line}>
			{index === 0 ? null : '\n'}
			{line.slice(0, line.length - line.trimStart().length)}
			<span className="kyf-hot">{line.trimStart()}</span>
		</Fragment>
	));

const unchanged = [
	<>
		The auth guard, <code>beforeHandle</code>
	</>,
	<>
		The data loading, <code>getStats(user)</code>
	</>,
	'The Eden API every page calls',
	<>
		The dev server, HMR and <code>absolute typecheck</code>
	</>,
	'The deploy: still one server'
];

// The thesis as an interaction: the framework is one swappable layer.
// Only the handler line takes the framework's color; the route around it
// stays put. Server-rendered on React, readable without JavaScript.
export const MoveThisRoute = () => {
	const [active, setActive] = useState(0);
	const framework = chapterFrameworks[active] ?? chapterFrameworks[0];
	if (framework === undefined) return null;

	return (
		<figure
			aria-label="Move this route between frameworks"
			className="post-figure kyf-move"
			style={frameworkColor(framework.color)}
		>
			<fieldset className="kyf-move-tabs">
				<legend>Serve /dashboard with</legend>
				{chapterFrameworks.map((item, index) => (
					<button
						aria-pressed={index === active}
						className="kyf-tab"
						key={item.key}
						onClick={() => setActive(index)}
						style={frameworkColor(item.color)}
						type="button"
					>
						{item.file}
					</button>
				))}
			</fieldset>
			<div className="kyf-move-body">
				<pre className="kyf-move-code">
					<code>
						<span className="kyf-dim">
							{
								"new Elysia()\n  .use(absolutejs)\n  .use(api)\n  .get('/dashboard', async ({ user }) => {\n    const stats = await getStats(user);\n\n    return "
							}
						</span>
						{highlightLines(handlerCalls[framework.key])}
						<span className="kyf-dim">
							{';\n  }, { beforeHandle: requireUser })'}
						</span>
					</code>
				</pre>
				<div className="kyf-move-list">
					<p>
						<strong>Changes:</strong> the handler call and the page
						file, now <code>{framework.file}</code>.
					</p>
					<p className="kyf-move-same">Stays the same:</p>
					<ul>
						{unchanged.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</div>
			<figcaption className="post-figcaption">
				Pick a framework. Only the handler line changes.
			</figcaption>
		</figure>
	);
};
