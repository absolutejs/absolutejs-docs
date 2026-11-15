import { chapterFrameworks, frameworkColor } from './frameworks';

const shared = [
	'Islands in any direction, one shared store',
	'React ↔ Svelte navigation with no reload',
	'One Eden API, typed everywhere',
	'One typecheck across every framework',
	'One CSP, with nonces on everything',
	'One dev loop'
];

// Six frameworks over one server: the frameworks render, the server and
// build underneath are shared, and the shared layer is what they get from
// each other.
export const SharedServer = () => (
	<figure
		aria-label="Six frameworks over one server"
		className="post-figure kyf-hub"
	>
		<ul className="kyf-hub-frameworks">
			{chapterFrameworks.map((framework) => (
				<li key={framework.key} style={frameworkColor(framework.color)}>
					<span className="kyf-hub-name">{framework.name}</span>
					<span className="kyf-hub-file">{framework.file}</span>
				</li>
			))}
		</ul>
		<div className="kyf-hub-server">
			<p className="kyf-hub-title">One Elysia server on Bun</p>
			<ul>
				{shared.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
		<figcaption className="post-figcaption">
			Each framework renders its own pages. Everything underneath is
			shared.
		</figcaption>
	</figure>
);
