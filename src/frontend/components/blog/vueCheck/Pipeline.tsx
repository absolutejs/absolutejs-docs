import type { ReactNode } from 'react';

type Step = { body: ReactNode; kind: string; title: string };

const steps: Step[] = [
	{
		body: (
			<>
				Every <code>.vue</code> file becomes the TypeScript{' '}
				<code>vue-tsc</code> would check, with its source map, written
				to <code>.vue-check/</code>.
			</>
		),
		kind: 'Rust',
		title: 'Vue’s codegen'
	},
	{
		body: (
			<>
				<code>bun check</code> type-checks the generated files with the
				rest of the project, as one program.
			</>
		),
		kind: 'Native, parallel',
		title: 'The check'
	},
	{
		body: (
			<>
				Each error is mapped back to its place in the <code>.vue</code>{' '}
				file, or dropped where <code>vue-tsc</code> drops it.
			</>
		),
		kind: 'Volar’s source maps',
		title: 'Mapping'
	}
];

// vue-check's three steps, in the order they run.
export const Pipeline = () => (
	<figure className="cpr-figure">
		<ol className="vc-pipeline">
			{steps.map((step) => (
				<li key={step.title}>
					<span className="vc-pipeline-kind">{step.kind}</span>
					<strong>{step.title}</strong>
					<p>{step.body}</p>
				</li>
			))}
		</ol>
	</figure>
);
