import type { ArticleContentProps } from '../postRegistry';
import { CodeSample } from '../choosePerRoute/CodeSample';
import { SectionRail } from '../choosePerRoute/SectionRail';
import { SideNote } from '../choosePerRoute/SideNote';
import { CommandBlock } from './CommandBlock';
import { DataTable } from './DataTable';
import { Pipeline } from './Pipeline';
import { vueCheckResults } from './results';
import { VueCheckChart } from './VueCheckChart';
import { VueCheckScale } from './VueCheckScale';
import { CodegenTable, PhaseTable, ProofTable } from './VueCheckTables';

const RUN_COMMAND = 'bunx @absolutejs/vue-check -p tsconfig.json';

type Section = { id: string; title: string };

const sections: Section[] = [
	{ id: 'vue-tsc', title: 'What vue-tsc does' },
	{ id: 'use', title: 'Use it' },
	{ id: 'how', title: 'How it works' },
	{ id: 'native', title: 'Codegen in Rust' },
	{ id: 'proof', title: 'How it’s proven' },
	{ id: 'results', title: 'Results' },
	{ id: 'time', title: 'Where the time goes' },
	{ id: 'differences', title: 'Known differences' }
];

const { codegen, conformance, environment, planted, projects } =
	vueCheckResults;
const range = (values: number[]) =>
	`${Math.min(...values).toFixed(1)}× to ${Math.max(...values).toFixed(1)}×`;
const memory = projects.map(
	(project) => project.vueTsc.mb / project.vueCheck.mb
);
/* Below this, both tools are dominated by startup: see Results. */
const LARGE_SECONDS = 5;
const largeProjects = projects.filter(
	(project) => project.vueTsc.s >= LARGE_SECONDS
);
const largeSpeedups = largeProjects.map(
	(project) => project.vueTsc.s / project.vueCheck.s
);
const identicalProjects = projects.filter(
	(project) => project.identical && project.bunMatchesTsc7
).length;
const codegenSpeedups = codegen.map(
	(project) => project.javascriptMs / project.nativeMs
);
const nativeNames = new Set(codegen.map((project) => project.name));
const javascriptProjects = projects.filter(
	(project) => !nativeNames.has(project.name)
);
const [smallest] = [...projects].sort(
	(first, second) => first.phases.vueFiles - second.phases.vueFiles
);

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

const reproduceCode = `git clone https://github.com/absolutejs/vue-check
cd vue-check && bun install

# clone and install every project, in containers
bench/setup-corpus.sh <corpus-dir>

# the four-way differential on all of them
bench/sweep.sh <corpus-dir> --runs=5

# native codegen against Vue's, file for file
bench/codegen-bar.sh <project> <tsconfig> <out>`;

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

const Hero = ({ post, readingTime }: ArticleContentProps) => (
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
				vue-check type-checks a Vue project and reports what vue-tsc
				reports. Vue’s codegen runs as a native port, the checking is
				Bun’s native TypeScript 7 checker, and every result is proven
				equal to vue-tsc’s.
			</p>
			<CommandBlock command={RUN_COMMAND} />
			<ul className="vc-stats">
				<li>
					<strong>{range(memory)}</strong>
					<span>less peak memory, on every project measured</span>
				</li>
				<li>
					<strong>{range(largeSpeedups)}</strong>
					<span>
						faster, on the {largeProjects.length} projects where
						vue-tsc takes {LARGE_SECONDS} seconds or more
					</span>
				</li>
				<li>
					<strong>
						{identicalProjects} of {projects.length}
					</strong>
					<span>
						real projects with identical errors, plus{' '}
						{planted.reported} planted ones
					</span>
				</li>
				<li>
					<strong>
						{conformance.identical} of {conformance.cases}
					</strong>
					<span>
						cases of Vue’s own conformance suite; the other one is
						documented below
					</span>
				</li>
			</ul>
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

const WhatVueTscDoes = () => (
	<section className="cpr-section" id="vue-tsc">
		<h2>What vue-tsc does</h2>
		<div className="cpr-col">
			<p>
				<code>vue-tsc</code> doesn’t type-check Vue itself. Vue’s
				codegen, <code>@vue/language-core</code>, turns each{' '}
				<code>.vue</code> file into TypeScript, with a source map back
				to the template and script it came from. Then <code>tsc</code>{' '}
				checks that TypeScript with the rest of the project, and each
				error is mapped back to its line in the <code>.vue</code> file.
			</p>
			<p>
				Both halves run in Node, in one process, on one thread. Bun
				1.4.3 shipped <code>bun check</code>: TypeScript 7’s checker,
				native and parallel, reading the same <code>tsconfig.json</code>{' '}
				and reporting the same errors as <code>tsc</code>. vue-check
				gives the checking to <code>bun check</code>, generates the
				TypeScript with a native port of Vue’s codegen, and keeps the
				output exactly what <code>vue-tsc</code> would print.
			</p>
		</div>
		<VueCheckScale />
	</section>
);

const UseIt = () => (
	<section className="cpr-section" id="use">
		<h2>Use it</h2>
		<div className="cpr-col">
			<p>
				Run it where you run <code>vue-tsc --noEmit</code>. It takes the
				same flags and prints errors in the same format, so editors and
				CI read its output unchanged.
			</p>
			<CommandBlock command={RUN_COMMAND} />
			<p>Or make it the project’s type-check script:</p>
		</div>
		<CodeSample code={scriptCode} file="package.json" language="json" />
		<div className="cpr-col">
			<ul>
				<li>
					It needs Bun 1.4.4 or newer and a project that has{' '}
					<code>vue-tsc</code> 3 installed: vue-check reads the
					project’s own Vue packages and TypeScript.
				</li>
				<li>
					The native codegen ships as a prebuilt binary for Linux,
					macOS and Windows, installed with the package. There is
					nothing to compile.
				</li>
				<li>It’s MIT licensed.</li>
			</ul>
		</div>
	</section>
);

const HowItWorks = () => (
	<section className="cpr-section" id="how">
		<h2>How it works</h2>
		<div className="cpr-col">
			<p>
				vue-check runs three steps. Each starts after the one before it
				has exited, so peak memory is the largest step and not their
				sum: everything codegen holds is returned to the system before
				the check starts.
			</p>
		</div>
		<Pipeline />
		<div className="cpr-col">
			<p>
				Being fast is the easy part. The work is in three things that
				each have to match <code>vue-tsc</code> exactly: the code that
				gets checked, the program it’s checked in, and the errors that
				come back.
			</p>
		</div>

		<h3 className="vc-sub">The same code</h3>
		<div className="cpr-col">
			<p>
				The generated TypeScript is what the project’s own{' '}
				<code>@vue/language-core</code> writes, set up the way{' '}
				<code>vue-tsc</code> sets it up: the project’s{' '}
				<code>vueCompilerOptions</code>, every extension Vue is
				configured for (<code>.md</code> in a VitePress site), and the
				language Vue gives each block.
			</p>
			<p>
				The one place vue-check touches that code is two patterns that
				aren’t valid TypeScript. It rewrites each to valid code of
				exactly the same length, so every source-map offset stays where
				it was. One of them changes a result, which is listed under{' '}
				<a href="#differences">Known differences</a>.
			</p>
		</div>

		<h3 className="vc-sub">The same program</h3>
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
		</div>
		<dl className="vc-points">
			<div>
				<dt>The same root files, in the same order</dt>
				<dd>
					They’re listed in the order <code>tsc</code> lists the
					project’s, each Vue file replaced in place by its generated
					TypeScript. On vue-pure-admin, <code>tsc --listFiles</code>{' '}
					prints the same 3,174 files in the same order for both
					programs.
				</dd>
			</div>
			<div>
				<dt>The same imports</dt>
				<dd>
					<code>rootDirs</code> makes every folder and its mirror one
					directory, so <code>import Foo from './Foo.vue'</code> finds{' '}
					<code>Foo.vue.ts</code>, and path aliases get the same join.
					Each folder above a source that has a{' '}
					<code>node_modules</code> is linked into the mirror at the
					same place, so a bare import resolves to the file it would
					from the source.
				</dd>
			</div>
			<div>
				<dt>Every Vue file the program reaches</dt>
				<dd>
					<code>vue-tsc</code> makes a virtual file for any Vue file
					its program resolves, such as a monorepo’s workspace
					packages. vue-check follows imports the same way and
					generates each one.
				</dd>
			</div>
		</dl>

		<h3 className="vc-sub">The same errors</h3>
		<div className="cpr-col">
			<p>
				Vue’s source maps carry, per segment, which errors{' '}
				<code>vue-tsc</code> reports there: never inside Vue’s
				scaffolding, some codes not on props. vue-check maps each error
				with Volar’s own <code>SourceMap</code>, loaded from the
				project, making the call <code>vue-tsc</code> makes.
			</p>
			<p>
				The maps travel from the first step to the third as data, so
				mapping doesn’t load Vue’s codegen again. The one kind of rule
				that can’t be data is the one that counts the errors it sees,
				under <code>@vue-expect-error</code>: a file that has one is
				generated again and asked of Volar directly.
			</p>
		</div>

		<h3 className="vc-sub">Never a false clean</h3>
		<div className="cpr-col">
			<p>
				A type checker that prints nothing has to mean the project is
				clean. vue-check exits with code 3, naming the cause, whenever
				it can’t be sure the check ran:
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
		</div>
	</section>
);

const NativeCodegen = () => (
	<section className="cpr-section" id="native">
		<h2>Vue’s codegen, in Rust</h2>
		<div className="cpr-col">
			<p>
				With the check native, Vue’s codegen became most of the run. So
				the first step is now a Rust port of{' '}
				<code>@vue/language-core</code>’s codegen and of the template
				parser it uses, <code>@vue/compiler-dom</code>, built on the{' '}
				<a href="https://oxc.rs">oxc</a> parser and run across every
				core.
			</p>
			<p>
				It isn’t a new implementation of Vue’s type-checking. It’s a
				port of specific releases, held to one bar: for every file, the
				same generated code and the same source map as the JavaScript it
				replaces.
			</p>
		</div>
		<dl className="vc-points">
			<div>
				<dt>It only runs where it’s been proven</dt>
				<dd>
					The port covers <code>@vue/language-core</code> 3.3.9 to
					3.3.14 with <code>@vue/compiler-dom</code> 3.5.35 to 3.5.45.
					vue-check reads which versions the project resolves and
					which options it sets; anything outside what’s ported uses
					the project’s own JavaScript codegen.
				</dd>
			</div>
			<div>
				<dt>It declines what it can’t stand behind</dt>
				<dd>
					A single file the port isn’t sure of is handed to the
					JavaScript codegen, and the rest stay native. So an
					unsupported project or file is slower, never different.
				</dd>
			</div>
			<div>
				<dt>A new Vue release can’t make it wrong</dt>
				<dd>
					A version that hasn’t been ported falls back the same way,
					until its codegen changes are ported and pass the same
					comparison.
				</dd>
			</div>
		</dl>
		<div className="cpr-col">
			<p>
				On the {codegen.length} of {projects.length} benchmark projects
				whose versions are ported, the whole codegen step is{' '}
				{range(codegenSpeedups)} faster, and the folder it writes is
				identical to the one the JavaScript codegen writes:
			</p>
		</div>
		<CodegenTable />
		<div className="cpr-col">
			<p>
				The step includes starting up, reading the project and following
				imports, which is why a project with four Vue files still takes
				half a second.
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
				of every code, message, file, line and column.
			</p>
		</div>

		<h3 className="vc-sub">The errors: four runs per project</h3>
		<div className="cpr-col">
			<p>
				The checker is the one thing vue-check lets you swap, so every
				project is checked four ways, and each pair isolates one part:
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
		</div>
		<dl className="vc-points">
			<div>
				<dt>Real projects</dt>
				<dd>
					{projects.length} open-source Vue codebases at pinned
					commits: admin templates, component libraries, VitePress,
					and the frontends of Directus, Misskey, Gitea, Vikunja and
					1Panel.
				</dd>
			</div>
			<div>
				<dt>Planted errors</dt>
				<dd>
					A clean project only proves that both tools print nothing,
					so the benchmark plants errors across a copy of a large app,
					in 12 kinds that each exercise a different part of the
					mapping: template bindings, <code>v-if</code> and{' '}
					<code>v-for</code>, event handlers, component props,{' '}
					<code>@vue-expect-error</code> used and unused. All{' '}
					{planted.reported} errors <code>vue-tsc</code> reports come
					out identically.
				</dd>
			</div>
			<div>
				<dt>Vue’s conformance suite</dt>
				<dd>
					<code>vuejs/language-tools</code> keeps a test project per
					behavior and per fixed bug, the cases <code>vue-tsc</code>’s
					own tests run. {conformance.identical} of{' '}
					{conformance.cases} are identical on every run, and{' '}
					<code>bun check</code> equals <code>tsc</code> 7 on{' '}
					{conformance.bunMatchesTsc7}.
				</dd>
			</div>
		</dl>

		<h3 className="vc-sub">The native codegen: output for output</h3>
		<div className="cpr-col">
			<p>
				The port is compared with the project’s own packages at every
				layer, value for value, before its output is ever checked:
			</p>
			<ul>
				<li>
					<strong>The parse.</strong> The syntax tree of every block
					and template, with every location and every parse error.
				</li>
				<li>
					<strong>Each expression and each template.</strong> The code
					written for it, piece by piece, with its mappings.
				</li>
				<li>
					<strong>The whole file.</strong> The generated TypeScript
					and the source map Volar hands to TypeScript.
				</li>
				<li>
					<strong>The whole project.</strong> The folder native
					codegen writes against the folder JavaScript codegen writes,
					on every benchmark project, the planted-error copy and all{' '}
					{conformance.cases} conformance cases.
				</li>
			</ul>
			<p>
				Real projects contain almost no malformed templates, so a seeded
				generator writes them: unclosed tags, every kind of attribute
				and directive, entities, comments, characters outside ASCII, and
				files cut off at any point, tens of thousands per version. With
				native codegen on, the four-way differential above is run again
				and has to come out the same.
			</p>
		</div>

		<h3 className="vc-sub">The measurements</h3>
		<div className="cpr-col">
			<p>
				Every run is isolated in a container with no network and a{' '}
				{environment.containerMemoryLimit} memory cap. Memory is the
				peak of the whole process tree, sampled every 20 ms, so every
				vue-check process counts. A run that didn’t finish a check is
				invalid, never zero errors. To run all of it yourself:
			</p>
		</div>
		<CodeSample code={reproduceCode} file="terminal" language="bash" />
	</section>
);

const Results = () => (
	<section className="cpr-section" id="results">
		<h2>Results</h2>
		<div className="cpr-col">
			<p>
				Medians of {projects[0]?.runs ?? 0} runs on {environment.cpu} (
				{environment.totalMemoryGB} GB), Bun {environment.bun}, Node{' '}
				{environment.node}.
			</p>
		</div>

		<h3 className="vc-sub">Memory</h3>
		<div className="cpr-col">
			<p>
				Memory is why vue-check exists. <code>vue-tsc</code> holds Vue’s
				codegen, TypeScript and the whole program in one Node process,
				and on a large project that is gigabytes: enough to push a
				laptop into swap or a CI runner past its limit. vue-check’s peak
				is its largest single step, and it uses {range(memory)} less on
				every project measured.
			</p>
		</div>
		<VueCheckChart metric="memory" />

		<h3 className="vc-sub">Time</h3>
		<div className="cpr-col">
			<p>
				It’s {range(largeSpeedups)} faster on the {largeProjects.length}{' '}
				projects where <code>vue-tsc</code> takes {LARGE_SECONDS}{' '}
				seconds or more. The gain grows with the project, because
				vue-check has a fixed cost of about half a second to start its
				steps.
			</p>
		</div>
		<VueCheckChart metric="time" />

		<h3 className="vc-sub">The same errors</h3>
		<div className="cpr-col">
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

const WhereTimeGoes = () => (
	<section className="cpr-section" id="time">
		<h2>Where the time goes</h2>
		<div className="cpr-col">
			<p>
				Each step is timed and measured on its own. With codegen and the
				check both native, no step dominates any more: where codegen
				runs natively, the three are within a second of each other.
			</p>
		</div>
		<PhaseTable />
		<div className="cpr-col">
			<p>
				Two things stand out.{' '}
				{javascriptProjects.map((project) => project.name).join(', ')}{' '}
				run versions that aren’t ported, so their codegen is still
				JavaScript and is their slowest step. And the floor is the fixed
				cost
				{smallest === undefined ? null : (
					<>
						: {smallest.name}, with {smallest.phases.vueFiles} Vue
						files, spends {smallest.phases.codegenS} s in codegen
					</>
				)}
				, nearly all of it starting up.
			</p>
		</div>
	</section>
);

const Differences = () => (
	<section className="cpr-section" id="differences">
		<h2>Known differences</h2>
		<div className="cpr-col">
			<p>
				Identical doesn’t mean there’s nothing to know. These are all of
				the places where vue-check’s output can differ from your current{' '}
				<code>vue-tsc</code> run:
			</p>
		</div>
		<dl className="vc-points">
			<div>
				<dt>TypeScript 7’s semantics</dt>
				<dd>
					vue-check checks your code the way TypeScript 7 does. Where
					that differs from your TypeScript 5 or 6, it reports what{' '}
					<code>tsc</code> 7 reports; the benchmark verifies each case
					against real <code>tsc</code> {environment.tsc7}.
				</dd>
			</div>
			<div>
				<dt>A URL before a prop</dt>
				<dd>
					Vue’s codegen turns the <code>//</code> in a URL prop into
					the start of a comment, which hides the props after it. In{' '}
					<code>{`<Child href="https://example.com" :count="'text'" />`}</code>
					, <code>vue-tsc</code> never checks <code>count</code>.
					vue-check restores the URL before checking, so it reports
					the error, as <code>vue-tsc</code> does when{' '}
					<code>count</code> comes first. Reported upstream as{' '}
					<a href="https://github.com/vuejs/language-tools/issues/6360">
						vuejs/language-tools#6360
					</a>
					.
				</dd>
			</div>
			<div>
				<dt>An empty event handler</dt>
				<dd>
					For <code>{'@click=""'}</code>, with or without a modifier,
					Vue’s codegen writes code that doesn’t parse. vue-check
					rewrites it to valid code of the same length so the check
					can run. No error is added or removed. Reported upstream as{' '}
					<a href="https://github.com/vuejs/language-tools/issues/6361">
						vuejs/language-tools#6361
					</a>
					.
				</dd>
			</div>
			<div>
				<dt>Vue files in a linked workspace package</dt>
				<dd>
					A Vue file reached through a workspace package’s link in{' '}
					<code>node_modules</code> is checked at its real path by
					vue-check and at the linked path by <code>vue-tsc</code>, so
					an error in it is reported under the other path.
				</dd>
			</div>
			<div>
				<dt>One conformance case</dt>
				<dd>
					<code>{conformance.different.join(', ')}</code>, which Vue’s
					own suite marks as a known failure, reports one declaration
					error on a different line.
				</dd>
			</div>
		</dl>
	</section>
);

const Close = () => (
	<section aria-labelledby="close-title" className="cpr-close">
		<div className="cpr-close-inner">
			<h2 id="close-title">The same errors. A fraction of the wait.</h2>
			<div className="cpr-close-row">
				<p>
					Run it next to <code>vue-tsc</code> on your own project and
					compare the output. If the two ever disagree, that’s a bug
					we want to hear about.
				</p>
				<CommandBlock className="cpr-command" command={RUN_COMMAND} />
			</div>
		</div>
	</section>
);

export const VueCheckContent = (props: ArticleContentProps) => (
	<>
		<Hero {...props} />
		<SectionRail sections={sections} />
		<article className="cpr-article">
			<WhatVueTscDoes />
			<UseIt />
			<HowItWorks />
			<NativeCodegen />
			<Proof />
			<Results />
			<WhereTimeGoes />
			<Differences />
		</article>
		<Close />
	</>
);
