import { useState } from 'react';
import type { ArticleContentProps } from '../postRegistry';
import { CodeSample } from '../choosePerRoute/CodeSample';
import { SideNote } from '../choosePerRoute/SideNote';
import { vueCheckResults } from './results';
import { VueCheckScale } from './VueCheckScale';
import { DataTable } from './DataTable';
import { PerformanceTable, PhaseTable, ProofTable } from './VueCheckTables';

const COPY_FEEDBACK_DURATION_MS = 1600;
const RUN_COMMAND = 'bunx @absolutejs/vue-check -p tsconfig.json';
const PERCENT = 100;

type Section = { id: string; title: string };

const sections: Section[] = [
	{ id: 'vue-tsc', title: 'What vue-tsc does' },
	{ id: 'steps', title: 'Three steps' },
	{ id: 'program', title: 'The same program' },
	{ id: 'errors', title: 'The same errors' },
	{ id: 'guarantees', title: 'Never a false clean' },
	{ id: 'proof', title: 'How it’s proven' },
	{ id: 'results', title: 'Results' },
	{ id: 'next', title: 'Where the time goes now' },
	{ id: 'try', title: 'Try it' }
];

const { conformance, environment, planted, projects } = vueCheckResults;
const ratios = (
	pick: (project: (typeof projects)[number]) => [number, number]
) =>
	projects.map((project) => {
		const [ours, theirs] = pick(project);

		return theirs / ours;
	});
const memory = ratios((project) => [project.vueCheck.mb, project.vueTsc.mb]);
const range = (values: number[]) =>
	`${Math.min(...values).toFixed(1)}× to ${Math.max(...values).toFixed(1)}×`;
/* Below this, both tools are dominated by startup: see Results. */
const LARGE_SECONDS = 5;
const largeProjects = projects.filter(
	(project) => project.vueTsc.s >= LARGE_SECONDS
);
const largeSpeedups = largeProjects.map(
	(project) => project.vueTsc.s / project.vueCheck.s
);
const largeMemory = largeProjects.map(
	(project) => project.vueTsc.mb / project.vueCheck.mb
);
const slower = projects.filter(
	(project) => project.vueCheck.s >= project.vueTsc.s
);
const mappingHeavy = projects.filter(
	(project) => project.phases.mapMB > project.phases.codegenMB
);
const identicalProjects = projects.filter(
	(project) => project.identical && project.bunMatchesTsc7
).length;
const codegenShares = projects.map(
	(project) =>
		project.phases.codegenS /
		(project.phases.codegenS + project.phases.checkS + project.phases.mapS)
);
const medianShare =
	[...codegenShares].sort((first, second) => first - second)[
		Math.floor(codegenShares.length / 2)
	] ?? 0;

const formatPostDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(new Date(value));

const scriptCode = `{
  "scripts": {
    "typecheck": "vue-check -p tsconfig.json"
  }
}`;

const configCode = `{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "rootDirs": ["/", "<project>/.vue-check"],
    "paths": {
      "@/*": ["<project>/src/*", "<project>/.vue-check/<project>/src/*"]
    }
  },
  "files": ["../src/main.ts", "<project>/src/App.vue.ts", "..."],
  "include": []
}`;

const reproduceCode = `git clone https://github.com/absolutejs/vue-check && cd vue-check && bun install
bench/run-in-docker.sh <vue-project> <name> --runs=5 --vue-tsc-args=--skipLibCheck
bun bench/table.ts`;

const Byline = ({ name, url }: { name: string; url?: string }) => (
	<div className="author-lockup">
		<div>
			<span className="byline-label">Written by</span>
			<strong>
				{url === undefined ? name : <a href={url}>{name}</a>}
			</strong>
		</div>
	</div>
);

const Hero = ({ post, readingTime }: ArticleContentProps) => {
	const [copied, setCopied] = useState(false);
	const copyCommand = async () => {
		await navigator.clipboard.writeText(RUN_COMMAND);
		setCopied(true);
		window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
	};

	return (
		<section aria-labelledby="page-title" className="cpr-hero">
			<div className="article-meta">
				<Byline name={post.author.name} url={post.author.url} />
				<div className="article-meta-actions">
					<span className="article-details">
						Published{' '}
						<time dateTime={post.publishedAt}>
							{formatPostDate(post.publishedAt)}
						</time>
						{' · '}
						{readingTime?.text ?? 'Estimating read'}
					</span>
					<a
						className="source-link"
						href="https://github.com/absolutejs/vue-check"
						rel="noreferrer"
						target="_blank"
					>
						View source ↗
					</a>
				</div>
			</div>
			<div className="cpr-hero-inner">
				<h1 id="page-title">
					vue-check: vue-tsc’s Errors, From Bun’s Native Type Checker
				</h1>
				<p className="cpr-hero-summary">
					vue-check type-checks a Vue project with Bun’s native
					checker and reports what vue-tsc reports. On the{' '}
					{largeProjects.length} projects where vue-tsc takes{' '}
					{LARGE_SECONDS} seconds or more, it’s {range(largeSpeedups)}{' '}
					faster with {range(largeMemory)} less memory. Its errors are
					identical on {identicalProjects} of {projects.length} real
					projects, on {planted.reported} planted errors, and on{' '}
					{conformance.identical} of {conformance.cases} cases of
					Vue’s own conformance suite.
				</p>
				<div className="cpr-command">
					<code>{RUN_COMMAND}</code>
					<button onClick={copyCommand} type="button">
						{copied ? 'Copied' : 'Copy'}
					</button>
				</div>
			</div>
			<nav aria-label="In this article" className="article-toc">
				<p>In this article</p>
				<ol>
					{sections.map((section) => (
						<li key={section.id}>
							<a href={`#${section.id}`}>{section.title}</a>
						</li>
					))}
				</ol>
			</nav>
		</section>
	);
};

const WhatVueTscDoes = () => (
	<section className="cpr-section" id="vue-tsc">
		<h2>What vue-tsc does</h2>
		<div className="cpr-col">
			<p>
				<code>vue-tsc</code> doesn’t type-check Vue itself. Vue’s
				codegen, <code>@vue/language-core</code>, turns each{' '}
				<code>.vue</code> file into TypeScript, with a source map back
				to the template and script it came from. Then <code>tsc</code>{' '}
				checks that TypeScript together with the rest of the project,
				and each error is mapped back to its line in the{' '}
				<code>.vue</code> file.
			</p>
			<p>
				Both halves run in Node, in one process, over the whole project.
				Bun 1.4.3 shipped <code>bun check</code>: TypeScript 7’s
				checker, native and parallel, reading the same{' '}
				<code>tsconfig.json</code> and reporting the same errors as{' '}
				<code>tsc</code>. vue-check keeps Vue’s codegen exactly as it is
				and gives the checking to <code>bun check</code>.
			</p>
		</div>
		<VueCheckScale />
	</section>
);

const ThreeSteps = () => (
	<section className="cpr-section" id="steps">
		<h2>Three steps, each in its own process</h2>
		<div className="cpr-col">
			<p>
				vue-check runs three steps. Each starts after the previous one
				has exited, so its peak memory is the largest step, not their
				sum: everything codegen holds is returned to the system before
				the check starts.
			</p>
		</div>
		<DataTable
			columns={['Step', 'Process', 'What it holds']}
			rows={[
				{
					cells: [
						'1. Vue’s codegen',
						'codegen.ts (JavaScript)',
						'TypeScript’s parser, Vue’s compiler, every parsed Vue file'
					],
					key: 'codegen'
				},
				{
					cells: [
						'2. The check',
						'bun check (native)',
						'the program'
					],
					key: 'check'
				},
				{
					cells: [
						'3. Mapping',
						'the CLI',
						'the errors and the source maps'
					],
					key: 'mapping'
				}
			]}
		/>
		<div className="cpr-col">
			<p>
				Step one runs <strong>the project’s own</strong>{' '}
				<code>@vue/language-core</code>, resolved through its{' '}
				<code>vue-tsc</code>, set up as <code>vue-tsc</code> sets it up:
				the project’s <code>vueCompilerOptions</code>, every extension
				Vue is configured for (<code>.md</code> in a VitePress site),
				and the language Vue gives each block (a plain{' '}
				<code>{'<script>'}</code> is JavaScript). The generated code is
				the code <code>vue-tsc</code> checks, byte for byte, apart from
				two codegen patterns normalized to valid TypeScript of exactly
				the same length.
			</p>
			<p>
				One of them changes a result. Vue’s codegen turns the{' '}
				<code>//</code> in a URL prop into the start of a comment, so in{' '}
				<code>{`<Child href="https://example.com" :count="'text'" />`}</code>{' '}
				<code>vue-tsc</code> 3.3.14 never checks <code>count</code>.
				vue-check restores the URL, so it reports the error, as{' '}
				<code>vue-tsc</code> does when <code>count</code> comes first.
				Both patterns are reported upstream (
				<a href="https://github.com/vuejs/language-tools/issues/6360">
					vuejs/language-tools#6360
				</a>
				,{' '}
				<a href="https://github.com/vuejs/language-tools/issues/6361">
					#6361
				</a>
				).
			</p>
		</div>
	</section>
);

const SameProgram = () => (
	<section className="cpr-section" id="program">
		<h2>The same program, file for file</h2>
		<div className="cpr-col">
			<p>
				The generated files live in <code>.vue-check/</code>, each at
				its source’s absolute path. A generated tsconfig extends the
				project’s and makes the program the one <code>vue-tsc</code>{' '}
				builds:
			</p>
		</div>
		<CodeSample
			code={configCode}
			file=".vue-check/tsconfig.json"
			language="json"
		/>
		<div className="cpr-col">
			<SideNote label="Why order matters">
				TypeScript prints types in the order it created them, and it
				creates them in the order files enter the program. The same
				files in a different order can print the same error with a
				different message.
			</SideNote>
			<p>
				<strong>The same root files, in the same order.</strong> They’re
				listed in the order <code>tsc</code> lists the project’s, each
				Vue file replaced in place by its generated TypeScript. On
				vue-pure-admin, <code>tsc --listFiles</code> prints the same
				3,174 files in the same order for both programs.
			</p>
			<p>
				<strong>The same imports.</strong> <code>rootDirs</code> makes
				every folder and its mirror one directory, so{' '}
				<code>import Foo from './Foo.vue'</code> finds{' '}
				<code>Foo.vue.ts</code>, and path aliases get the same join. A
				generated file resolves bare imports from its own folder, so
				each folder above a source that has a <code>node_modules</code>{' '}
				or <code>package.json</code> is linked into the mirror at the
				same place: every import resolves to exactly the file it would
				from the source.
			</p>
			<p>
				<strong>Every Vue file the program reaches.</strong>{' '}
				<code>vue-tsc</code> makes a virtual file for any Vue file its
				program resolves, such as a monorepo’s workspace packages.
				vue-check follows imports the same way, with TypeScript’s{' '}
				<code>preProcessFile</code> (a scan, not a parse), and generates
				each one.
			</p>
		</div>
	</section>
);

const SameErrors = () => (
	<section className="cpr-section" id="errors">
		<h2>The same errors, mapped by Volar itself</h2>
		<div className="cpr-col">
			<p>
				Vue’s source maps carry, per segment, which errors{' '}
				<code>vue-tsc</code> reports there: never inside Vue’s
				scaffolding, some codes not on props. vue-check maps each error
				with{' '}
				<strong>
					Volar’s own <code>SourceMap</code>
				</strong>
				, loaded from the project, making the call <code>vue-tsc</code>{' '}
				makes: <code>toSourceRange</code> with its diagnostic filter.
			</p>
			<p>
				The maps travel from step one to step three as data. A segment’s
				rule is kept as Volar evaluates it: true or false; one of Vue’s
				fixed rules, matched by identity and evaluated for every
				TypeScript error code; or, for the rules that count the errors
				they see (under <code>@vue-expect-error</code>), a mark that has
				that one file regenerated and asked of Volar directly, in{' '}
				<code>vue-tsc</code>’s order.
			</p>
			<p>
				tsc-style output gives where an error starts, not its length,
				and the length decides which segments it touches. vue-check
				takes it from TypeScript’s parser on the generated file: the
				parser’s own diagnostic for a syntax error, the innermost syntax
				node that starts there for any other, and the comment for an
				unused directive.
			</p>
		</div>
	</section>
);

const Guarantees = () => (
	<section className="cpr-section" id="guarantees">
		<h2>Never a false clean</h2>
		<div className="cpr-col">
			<p>
				A type checker that prints nothing has to mean the project is
				clean. vue-check exits 3, naming the cause, whenever it can’t be
				sure the check ran:
			</p>
			<ul>
				<li>
					generated code with a syntax error that maps nowhere, which
					would stop the checker on Vue’s text (one that maps is the
					user’s, and is reported as <code>vue-tsc</code> reports it);
				</li>
				<li>a checker that fails without printing a single error;</li>
				<li>codegen that fails.</li>
			</ul>
			<p>
				It always runs <code>bun check --no-script</code>, so it
				type-checks even when a project defines its own{' '}
				<code>check</code> script.
			</p>
		</div>
	</section>
);

const Proof = () => (
	<section className="cpr-section" id="proof">
		<h2>How it’s proven</h2>
		<div className="cpr-col">
			<p>
				The same way Bun proved <code>bun check</code> against
				TypeScript: a differential. Reference tools are the oracles, no
				expected output is stored, and every claim is an exact equality
				of every code, message, file, line and column. The checker is
				the one thing vue-check lets you swap, so every project is
				checked four ways:
			</p>
		</div>
		<DataTable
			columns={['Run', 'Checker', 'Must equal', 'Proves']}
			rows={[
				{
					cells: [
						'vue-tsc',
						'project’s TypeScript',
						'the oracle',
						''
					],
					key: 'oracle'
				},
				{
					cells: [
						'vue-check',
						'project’s TypeScript',
						'vue-tsc',
						'the Vue handling'
					],
					key: 'handling'
				},
				{
					cells: [
						'vue-check',
						`tsc ${environment.tsc7}`,
						'vue-check on bun check',
						'Bun’s checker'
					],
					key: 'checker'
				},
				{
					cells: [
						'vue-check',
						'bun check',
						'vue-tsc, with exactly TypeScript 7’s changes',
						'end to end'
					],
					key: 'end-to-end'
				}
			]}
		/>
		<div className="cpr-col">
			<p>
				TypeScript 7’s changes are measured, not chosen: they’re
				whatever the same generated program gives on the project’s
				TypeScript and on <code>tsc</code> {environment.tsc7}, the
				version Bun’s own differential tests use.
			</p>
			<p>
				<strong>Planted errors.</strong> A clean project only proves
				that both tools print nothing, so the benchmark plants hundreds
				of errors across a copy of a large app, in 12 kinds that each
				exercise a different part of the mapping: script setup, template
				bindings and interpolations, <code>v-if</code> and{' '}
				<code>v-for</code>, event handlers, props on components,{' '}
				<code>@vue-expect-error</code> used and unused, plain{' '}
				<code>.ts</code> files, and component props typed from a{' '}
				<code>.ts</code> file. All {planted.reported} errors{' '}
				<code>vue-tsc</code> reports come out identically.
			</p>
			<p>
				<strong>Vue’s conformance suite.</strong>{' '}
				<code>vuejs/language-tools</code> keeps a test project per
				behavior and per fixed bug: the cases <code>vue-tsc</code>’s own
				type-check test runs. Most assert their errors in place with{' '}
				<code>@vue-expect-error</code>, so a clean result proves both no
				false errors and every expected one. {conformance.identical} of{' '}
				{conformance.cases} are identical on every leg, and{' '}
				<code>bun check</code> equals <code>tsc</code> 7 on{' '}
				{conformance.bunMatchesTsc7}.
			</p>
			<p>
				<strong>Every run is isolated</strong> in a container with no
				network and a {environment.containerMemoryLimit} memory cap.
				Memory is the peak RSS of the whole process tree, sampled every
				20 ms, so every vue-check process counts. A run that didn’t
				finish a check is invalid, never zero errors.
			</p>
		</div>
	</section>
);

const Results = () => (
	<section className="cpr-section" id="results">
		<h2>Results</h2>
		<div className="cpr-col">
			<p>
				{projects.length} open-source Vue projects, from admin templates
				to a monorepo, a component library, VitePress and Gitea’s
				frontend. Medians of 5 runs on {environment.cpu} (
				{environment.totalMemoryGB} GB), Bun {environment.bun}, Node{' '}
				{environment.node}.
			</p>
		</div>
		<PerformanceTable />
		<div className="cpr-col">
			<p>
				The gain grows with the project. vue-check starts two processes
				of its own (codegen, then the check), which costs a fixed part
				of a second
				{slower.length > 0 ? (
					<>
						: on{' '}
						{slower.map((project) => project.name).join(' and ')},
						where vue-tsc finishes in{' '}
						{slower
							.map((project) => `${project.vueTsc.s} s`)
							.join(' and ')}
						, that fixed cost makes vue-check no faster, though it
						still uses less memory
					</>
				) : null}
				. Every project uses less memory: {range(memory)}.
			</p>
			<p>
				Identical on {identicalProjects} of {projects.length}: the Vue
				handling equals <code>vue-tsc</code> exactly,{' '}
				<code>bun check</code> equals <code>tsc</code>{' '}
				{environment.tsc7} exactly, and the end result is{' '}
				<code>vue-tsc</code>’s with exactly TypeScript 7’s changes.
			</p>
		</div>
		<ProofTable />
	</section>
);

const Next = () => (
	<section className="cpr-section" id="next">
		<h2>Where the time goes now</h2>
		<div className="cpr-col">
			<p>
				Each step is timed and measured on its own. With the check
				native, the time has moved: Vue’s codegen, still JavaScript, is
				now about {Math.round(medianShare * PERCENT)}% of vue-check’s
				run on the median project, and usually its peak memory too.
			</p>
		</div>
		<PhaseTable />
		<div className="cpr-col">
			<p>
				That makes codegen the next step. A native codegen would be
				checked the way this one is: against Vue’s, output for output,
				by the same differential.
			</p>
			{mappingHeavy.length > 0 ? (
				<p>
					On {mappingHeavy.map((project) => project.name).join(', ')},
					mapping takes the most memory: errors that fall under Vue’s
					stateful rules have their file regenerated so Volar itself
					can decide them, which loads the codegen a second time.
					Deciding them in the codegen process instead is the step
					after.
				</p>
			) : null}
		</div>
	</section>
);

const TryIt = () => (
	<section className="cpr-section" id="try">
		<h2>Try it</h2>
		<div className="cpr-col">
			<p>
				vue-check takes the same flags as <code>vue-tsc --noEmit</code>{' '}
				and prints errors in the same format, so it replaces it in a{' '}
				<code>typecheck</code> script. It needs Bun 1.4.4 or newer and a
				project on <code>vue-tsc</code> 3; it’s MIT licensed.
			</p>
		</div>
		<CodeSample code={scriptCode} file="package.json" language="json" />
		<div className="cpr-col">
			<p>
				Every number here comes from the benchmark’s result files. To
				reproduce one:
			</p>
		</div>
		<CodeSample code={reproduceCode} file="terminal" language="bash" />
	</section>
);

export const VueCheckContent = (props: ArticleContentProps) => (
	<>
		<Hero {...props} />
		<article className="cpr-article">
			<WhatVueTscDoes />
			<ThreeSteps />
			<SameProgram />
			<SameErrors />
			<Guarantees />
			<Proof />
			<Results />
			<Next />
			<TryIt />
		</article>
	</>
);
