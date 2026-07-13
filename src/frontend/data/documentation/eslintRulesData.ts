export type EslintRuleExample = {
	label?: string;
	code: string;
};

export type EslintRuleOption = {
	name: string;
	type: string;
	default: string;
	description: string;
};

export type EslintRuleCategory =
	| 'React & JSX'
	| 'Styling'
	| 'react-spring'
	| 'TypeScript'
	| 'Angular'
	| 'Imports & Exports'
	| 'Code Quality';

export type EslintRule = {
	/** Routing id, always `eslint-<name>`. Must match the docsViews key and the sidebar button id. */
	id: string;
	/** Bare rule name, e.g. `no-import-meta-path`. The configured name is `absolute/<name>`. */
	name: string;
	category: EslintRuleCategory;
	/** One-line summary rendered under the title, mirroring the rule’s `meta.docs.description`. */
	summary: string;
	/** `meta.type` — drives the Problem / Suggestion badge. */
	problemType: 'problem' | 'suggestion';
	/** Whether ESLint `--fix` can repair reports from this rule. */
	fixable: boolean;
	/** Whether the rule reads the TypeScript type checker (`parserOptions.project`). */
	requiresTypeInfo: boolean;
	/** Clarifies a soft type-info dependency when `requiresTypeInfo` is false. */
	typeInfoNote?: string;
	/** Language hint for the example code blocks. */
	language: 'tsx' | 'typescript';
	/** Rationale paragraphs ("Rule Details"). */
	details: string[];
	/** Snippets the rule flags. */
	incorrect: EslintRuleExample[];
	/** Snippets the rule allows. */
	correct: EslintRuleExample[];
	/** Configurable options, empty when the rule takes none. */
	options: EslintRuleOption[];
	/** Optional flat-config snippet shown in the Configuration section. */
	optionsExample?: string;
	/** "When Not To Use It" paragraphs. */
	whenNotToUse: string[];
	/** Bare names of related rules to cross-link. */
	related: string[];
};

export const eslintRules: EslintRule[] = [
	{
		category: 'Angular',
		correct: [
			{
				code: `@Component({ selector: 'app-card', template: '' })
export class CardComponent {
	@Input() title = '';
	@Output() select = new EventEmitter<string>();
	@HostListener('click') onClick() {}
}`,
				label: 'One feature class — member decorators are fine'
			},
			{
				code: `@Component({ selector: 'app-card', template: '' })
export class CardComponent {}

// Undecorated helpers can live alongside it
class CardLayout {}
class CardData {}`,
				label: 'Plain helper classes are ignored'
			}
		],
		details: [
			'Mirrors the Angular Style Guide’s Single Responsibility / "Rule of One": every Angular feature gets its own file. The rule counts classes carrying a class-level feature decorator — `@Component`, `@Directive`, `@Pipe`, `@Injectable`, or `@NgModule`. The first one in a file is fine; every additional feature class is reported.',
			'Member decorators such as `@Input`, `@Output`, and `@HostListener` are not features and never count, so a fully decorated component with many inputs is still a single feature. Undecorated helper classes are ignored entirely, so you can keep small private classes next to the feature they support.',
			'Decorators are matched by their local name, so an aliased import (`import { Component as NgComponent }`) is not recognized. Spec and Storybook files routinely declare stub or host classes beside the subject under test — disable the rule for those globs with an override.'
		],
		fixable: false,
		id: 'eslint-angular-one-feature-per-file',
		incorrect: [
			{
				code: `@Component({ selector: 'app-card', template: '' })
class CardComponent {}

@Injectable({ providedIn: 'root' })
class CardService {} // flagged: second feature class in the file`
			},
			{
				code: `@Pipe({ name: 'currency' })
class CurrencyPipe {}

@Directive({ selector: '[appHighlight]' })
class HighlightDirective {} // flagged`
			}
		],
		language: 'typescript',
		name: 'angular-one-feature-per-file',
		options: [],
		optionsExample: `// eslint.config.js
export default [
	{
		rules: {
			'absolute/angular-one-feature-per-file': 'error'
		}
	},
	{
		// Specs and stories legitimately co-locate stub classes
		files: ['**/*.spec.ts', '**/*.stories.ts'],
		rules: {
			'absolute/angular-one-feature-per-file': 'off'
		}
	}
];`,
		problemType: 'problem',
		related: ['no-nondeterministic-render'],
		requiresTypeInfo: false,
		summary:
			'Disallow defining more than one Angular feature class (@Component, @Directive, @Pipe, @Injectable, @NgModule) per file.',
		whenNotToUse: [
			'If you intentionally co-locate several small features in one file — for example test doubles, Storybook host components, or a tightly coupled directive plus its module — turn the rule off for those files with an ESLint override rather than disabling it project-wide.'
		]
	},
	{
		category: 'TypeScript',
		correct: [
			{
				code: `type Point = { x: number; y: number };
const origin: Point = { x: 0, y: 0 };

const items: MenuItem[] = [{ id: 'a' }, { id: 'b' }];`,
				label: 'Annotated object and array'
			},
			{
				code: `const config = { mode: 'dark' } as const; // constant shape
const { x } = origin;                      // destructuring is not flagged
const count = 42;                          // non-object initializer`
			}
		],
		details: [
			'Requires object literals (and arrays of object literals) assigned to a variable to carry an explicit type annotation rather than relying on inference. Naming the shape makes it reusable, surfaces it in editor tooltips, and turns a loose literal into a contract the rest of the codebase can depend on.',
			'Only the outermost literal of a `const`/`let` declarator is checked. Destructuring patterns and declarations without an initializer are left alone, and `as const` is accepted because it already pins the object to a constant, fully-known shape.'
		],
		fixable: false,
		id: 'eslint-explicit-object-types',
		incorrect: [
			{
				code: `const user = { id: '1', name: 'Ada' };        // objectLiteralNeedsType
const rows = [{ id: 1 }, { id: 2 }];          // arrayOfObjectLiteralsNeedsType
const merged = [...others, { id: 3 }];        // arrayOfObjectLiteralsNeedsType`
			}
		],
		language: 'typescript',
		name: 'explicit-object-types',
		options: [],
		problemType: 'problem',
		related: ['no-inline-object-types', 'no-redundant-type-annotation'],
		requiresTypeInfo: false,
		summary:
			'Require explicit type annotations for object literals and arrays of object literals.',
		whenNotToUse: [
			'Local, throwaway objects that are never reused can make this rule feel noisy. If your project leans heavily on inference for one-off config objects, scope the rule to shared modules instead of enabling it everywhere.'
		]
	},
	{
		category: 'Styling',
		correct: [
			{
				code: `// Exactly at the default limit of 3 keys
const Badge = () => <span style={{ color: 'red', fontSize: 14, margin: 4 }} />;`
			},
			{
				code: `// Extracted to a named style object
const cardStyle: CSSProperties = {
	background: 'white',
	borderRadius: 8,
	boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
	padding: 16
};

const Card = () => <div style={cardStyle} />;`,
				label: 'Extract once it grows'
			},
			{
				code: `const Spread = () => <div style={{ ...base, color: 'red' }} />; // spreads are not counted`
			}
		],
		details: [
			'Flags inline `style={{ ... }}` objects on JSX elements once they exceed `maxKeys` properties (default 3). A handful of properties inline is convenient; a large style object inline hurts readability, allocates a fresh object on every render, and is better lifted into a named constant or a dedicated style file.',
			'Only literal `style` objects are inspected. Spread elements do not count toward the key total, and `style={someVariable}` is ignored entirely, so already-extracted styles never trip the rule.'
		],
		fixable: false,
		id: 'eslint-inline-style-limit',
		incorrect: [
			{
				code: `// 4 keys exceeds the default limit of 3
const Box = () => (
	<div style={{ color: 'red', fontSize: 14, margin: 4, padding: 8 }} />
);`
			},
			{
				code: `// With { maxKeys: 2 } — 3 keys exceeds 2
const Box = () => <div style={{ color: 'red', fontSize: 14, margin: 4 }} />;`,
				label: 'Stricter limit'
			}
		],
		language: 'tsx',
		name: 'inline-style-limit',
		options: [
			{
				default: '3',
				description:
					'Maximum number of keys allowed in an inline style object before it must be extracted. May be passed as a bare number (`["warn", 5]`) or an object (`{ maxKeys: 5 }`).',
				name: 'maxKeys',
				type: 'number'
			}
		],
		optionsExample: `{
	rules: {
		// Allow up to 5 inline keys before requiring extraction
		'absolute/inline-style-limit': ['warn', { maxKeys: 5 }]
		// shorthand form: ['warn', 5]
	}
}`,
		problemType: 'suggestion',
		related: ['seperate-style-files', 'no-multi-style-objects'],
		requiresTypeInfo: false,
		summary:
			'Disallow inline style objects with too many keys and encourage extracting them.',
		whenNotToUse: [
			'If your team prefers fully inline styling (for example a utility-first or styled-system approach where inline objects are intentional), this rule will fight that convention — leave it off or raise `maxKeys` substantially.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `function Toolbar() {
	const label = 'Save';
	// Passed to two different children → assumed shared, not flagged
	return (
		<div>
			<PrimaryButton text={label} />
			<MenuItem text={label} />
		</div>
	);
}`
			},
			{
				code: `function Profile() {
	const firstName = 'Ada';
	const lastName = 'Lovelace';
	// Two candidates for the same component → treated as parent-owned settings
	return <NameTag firstName={firstName} lastName={lastName} />;
}`
			},
			{
				code: `function Feed() {
	const data = useFetch('/api/posts'); // hook-derived
	const posts = data.posts;            // references a hook result → exempt
	return <PostList posts={posts} />;
}`,
				label: 'Hook-derived values are exempt'
			}
		],
		details: [
			'Encourages colocating state and data with the component that actually consumes it. If a variable — or a `useState` pair — is only ever passed to a single custom child, the rule suggests moving the declaration into that child instead of threading it through the parent as a prop.',
			'For `useState`, both the state value and its setter must be used exclusively inside one custom (uppercase-tagged) child element before the rule fires. For plain variables, the rule waits until the end of the file and only reports a value when it is the sole candidate for a given child component — if two or more values flow to the same component, they are assumed to be settings that belong on the parent.',
			'There are deliberate escape hatches: anything derived from a custom hook (`useX`) is exempt, usage on a native lowercase element counts as "used outside" and suppresses the report, and values passed to a `*Provider`/`*Context` `value` prop are ignored.'
		],
		fixable: false,
		id: 'eslint-localize-react-props',
		incorrect: [
			{
				code: `function Counter() {
	const [count, setCount] = useState(0);
	// Both state and setter only reach <Display /> → move them inside it
	return <Display count={count} setCount={setCount} />;
}`,
				label: 'State + setter to a single child'
			},
			{
				code: `function Page() {
	const heading = 'Welcome';
	return (
		<section>
			<Header title={heading} /> {/* only consumer */}
		</section>
	);
}`
			}
		],
		language: 'tsx',
		name: 'localize-react-props',
		options: [],
		problemType: 'suggestion',
		related: ['no-nested-jsx-return'],
		requiresTypeInfo: false,
		summary:
			'Disallow variables that are only passed to a single custom child component; move them into that component instead.',
		whenNotToUse: [
			'Container/presentational architectures intentionally hoist state into a parent and pass it down to a single dumb child. If that pattern is core to your codebase, this rule will produce false positives — disable it or restrict it to leaf modules.'
		]
	},
	{
		category: 'Code Quality',
		correct: [
			{
				code: `// options: [1]
function save() {
	if (!user) return;          // guard clause — early-exit block is not counted
	if (!user.email) throw new Error('missing email');
	persist(user);
}`,
				label: 'Guard clauses do not count'
			},
			{
				code: `function outer() {
	if (ready) {
		function inner() {       // a nested function resets the depth counter
			if (valid) run();
		}
	}
}`
			}
		],
		details: [
			'A drop-in replacement for ESLint’s core `max-depth` with one important escape hatch: a nested block is not counted when its only statement is an early exit (`return` or `throw`). That keeps guard clauses — the recommended way to flatten code — from being penalized while still discouraging genuinely deep nesting.',
			'Depth is tracked per function: entering any function resets the counter, so a deeply nested callback does not inherit its parent’s depth. The function’s own body block is free; each additional non-guard block adds one level, and exceeding the configured maximum is reported.'
		],
		fixable: false,
		id: 'eslint-max-depth-extended',
		incorrect: [
			{
				code: `// options: [1] — two nested if-blocks reach depth 2
function process() {
	if (enabled) {
		if (ready) {
			run();
		}
	}
}`
			}
		],
		language: 'typescript',
		name: 'max-depth-extended',
		options: [
			{
				default: '1',
				description:
					'Maximum block nesting depth allowed per function before a report. Blocks whose single statement is a `return` or `throw` are exempt.',
				name: '(positional number)',
				type: 'number'
			}
		],
		optionsExample: `{
	rules: {
		// Allow up to 2 levels of nesting (plus guard-clause early exits)
		'absolute/max-depth-extended': ['warn', 2]
	}
}`,
		problemType: 'suggestion',
		related: ['min-var-length'],
		requiresTypeInfo: false,
		summary:
			'Disallow too many nested blocks, except when the block only contains an early exit (return or throw).',
		whenNotToUse: [
			'If you already use the core `max-depth` rule and do not want guard-clause exemptions, prefer that rule instead. Algorithms that are genuinely tree- or matrix-shaped may also need a higher limit rather than this rule.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `// options: [2]
const Row = () => (
	<div>
		<span>Hello</span>
	</div>
);`
			},
			{
				code: `// Deep markup extracted into its own component
const ProfileCard = () => (
	<Card>
		<ProfileHeader />
	</Card>
);`,
				label: 'Refactor depth into components'
			}
		],
		details: [
			'Caps how deeply JSX elements may nest before the markup should be broken into smaller components. The element itself is level 1, and every ancestor `JSXElement` or `JSXFragment` adds a level — fragments count too, since they still represent a layer of structure.',
			'Each element that is too deep is reported individually, so a long chain produces several reports that all point at the layers worth extracting. Note the configured rule name has no hyphen: `absolute/max-jsxnesting`.'
		],
		fixable: false,
		id: 'eslint-max-jsxnesting',
		incorrect: [
			{
				code: `// options: [2] — <span> sits at level 3
const Panel = () => (
	<div>
		<section>
			<span />
		</section>
	</div>
);`
			},
			{
				code: `// options: [2] — the fragment counts as a level, so <span> is level 3
const Panel = () => (
	<>
		<div>
			<span />
		</div>
	</>
);`,
				label: 'Fragments count as a level'
			}
		],
		language: 'tsx',
		name: 'max-jsxnesting',
		options: [
			{
				default: '1',
				description:
					'Maximum JSX nesting level allowed (minimum 1). The element itself is level 1; each ancestor element or fragment adds one.',
				name: '(positional number)',
				type: 'number'
			}
		],
		optionsExample: `{
	rules: {
		// Allow up to 3 levels of JSX nesting
		'absolute/max-jsxnesting': ['warn', 3]
	}
}`,
		problemType: 'suggestion',
		related: ['no-nested-jsx-return', 'no-unnecessary-div'],
		requiresTypeInfo: false,
		summary:
			'Warn when JSX elements are nested too deeply, suggesting refactoring into a separate component.',
		whenNotToUse: [
			'Layout-heavy pages sometimes need several real wrapper layers (grids inside cards inside sections). If extracting them adds indirection without value, raise the limit rather than fighting the rule on every page.'
		]
	},
	{
		category: 'Code Quality',
		correct: [
			{
				code: `// options: [{ minLength: 3 }]
const total = 0;
function process(items: number[]) {
	return items.map((i) => i * 2); // 'i' allowed: outer 'items' starts with "i"
}`,
				label: 'Abbreviation of an outer name'
			},
			{
				code: `// options: [{ minLength: 3, allowedVars: ['id'] }]
const id = '42'; // exempted by allowedVars`
			}
		],
		details: [
			'Disallows variable names shorter than `minLength`, which pushes toward names that read on their own. It covers declarators (including destructured and defaulted bindings), function and arrow parameters, and `catch` clause parameters.',
			'A short name is allowed when it is a clear abbreviation of an outer name — an outer identifier that is at least `minLength` long, longer than the short name, and starts with the same characters (so `i` is fine inside a scope that has `items`). You can also exempt exact names with `allowedVars`.'
		],
		fixable: false,
		id: 'eslint-min-var-length',
		incorrect: [
			{
				code: `// options: [{ minLength: 3 }]
const x = 1;
function fn(a) { return a; }
const { q } = query;
const [p, c] = pair;     // two reports
try {} catch (e) {}      // 'e' is too short`
			}
		],
		language: 'typescript',
		name: 'min-var-length',
		options: [
			{
				default: '1',
				description:
					'Minimum allowed identifier length. Names shorter than this are reported unless exempted.',
				name: 'minLength',
				type: 'number'
			},
			{
				default: '[]',
				description:
					'Exact identifier names that are always permitted regardless of length.',
				name: 'allowedVars',
				type: 'string[]'
			}
		],
		optionsExample: `{
	rules: {
		'absolute/min-var-length': [
			'error',
			{ minLength: 3, allowedVars: ['_', 'id', 't'] }
		]
	}
}`,
		problemType: 'problem',
		related: ['max-depth-extended'],
		requiresTypeInfo: false,
		summary:
			'Disallow variable names shorter than the configured minimum length, unless an outer variable with a longer name starting with the same characters exists.',
		whenNotToUse: [
			'Math-heavy code, short-lived loop indices, and well-known conventions (`x`/`y` coordinates, `e` for events) can read better short. Use `allowedVars` to carve out exceptions, or keep `minLength` at 1 if terse names are the house style.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `const Link = () => <a href="/dashboard">Dashboard</a>;`,
				label: 'Use an anchor for navigation'
			},
			{
				code: `// Query/hash-only update that preserves the path is allowed
const TabButton = () => (
	<button
		onClick={() => {
			const path = window.location.pathname;
			window.history.replaceState({}, '', path + '?tab=settings');
		}}
	>
		Settings
	</button>
);`,
				label: 'Reading the path whitelists replaceState'
			},
			{
				code: `const Logger = () => (
	<button onClick={() => console.log('clicked')}>Click</button>
);`
			}
		],
		details: [
			'Pushes real navigation onto anchor tags instead of `onClick` handlers that change the path imperatively. Anchors are accessible, work with middle-click and "open in new tab", and let the browser and crawlers see where a link goes. The rule inspects `onClick` handlers attached directly to a lowercase `<button>` and flags path-changing calls.',
			'It reports assignments to `window.location` (or its `href`/`pathname` sub-properties), `window.location.replace(...)`, `window.open(...)`, and `history.pushState`/`replaceState` calls. The escape hatch: if the handler reads `window.location.search`, `.pathname`, or `.hash`, an accompanying `pushState`/`replaceState` is allowed — that pattern updates the query or hash while preserving the path, which anchors cannot express.'
		],
		fixable: false,
		id: 'eslint-no-button-navigation',
		incorrect: [
			{
				code: `const Go = () => (
	<button onClick={() => { window.location = '/dashboard'; }}>Go</button>
);`,
				label: 'Assigning window.location'
			},
			{
				code: `const Go = () => (
	<button onClick={() => { window.location.replace('/dashboard'); }}>Go</button>
);`
			},
			{
				code: `const Go = () => (
	<button onClick={() => { window.history.pushState({}, '', '/new'); }}>
		Go
	</button>
);`,
				label: 'pushState without reading the current path'
			}
		],
		language: 'tsx',
		name: 'no-button-navigation',
		options: [],
		problemType: 'suggestion',
		related: [],
		requiresTypeInfo: false,
		summary:
			'Enforce using anchor tags for navigation instead of buttons whose onClick handlers change the path.',
		whenNotToUse: [
			'If you use a router whose navigation API genuinely requires a button handler and cannot be expressed as an anchor, or you have an established design-system button that performs navigation, disable the rule for those components.'
		]
	},
	{
		category: 'TypeScript',
		correct: [
			{
				code: `function getName() {
	return 'Ada'; // inferred as string
}

const toUpper = (value: string) => value.toUpperCase();`
			},
			{
				code: `// Type guards keep their predicate annotation
function isString(value: unknown): value is string {
	return typeof value === 'string';
}`,
				label: 'Type predicates are allowed'
			},
			{
				code: `// Inline object returns (e.g. style objects) are allowed
const getStyle = (): CSSProperties => ({ color: 'red' });

// Recursive functions require the annotation, so it is allowed
function depth(node: TreeNode): number {
	return node.children.reduce((sum, child) => sum + depth(child), 0);
}`
			}
		],
		details: [
			'Removes explicit return-type annotations where TypeScript already infers the type accurately. Inference stays correct as the implementation changes, so a hand-written return type is redundant maintenance that can silently drift from the real return value.',
			'Four cases are intentionally allowed: type-predicate guards (`x is T`), arrows that directly return an object literal (`(): T => ({ ... })`), block-bodied functions whose single statement returns an object literal (the style-object pattern), and recursive/self-referential functions, where TypeScript actually requires the annotation.'
		],
		fixable: false,
		id: 'eslint-no-explicit-return-type',
		incorrect: [
			{
				code: `function getName(): string {
	return 'Ada';
}

const toUpper = (value: string): string => value.toUpperCase();

const load = function (): number { return 1; };`
			}
		],
		language: 'typescript',
		name: 'no-explicit-return-type',
		options: [],
		problemType: 'suggestion',
		related: ['no-redundant-type-annotation', 'no-trivial-alias'],
		requiresTypeInfo: false,
		summary:
			'Disallow explicit return type annotations on functions, except for type-predicate guards and inline object-literal returns.',
		whenNotToUse: [
			'On a public library surface you may want explicit return types so the published `.d.ts` is stable and reviewable, and so refactors that change an inferred type fail loudly. In that case prefer requiring return types instead of forbidding them.'
		]
	},
	{
		category: 'Code Quality',
		correct: [
			{
				code: `import { projectRoot } from '@absolutejs/absolute';
import { join } from 'node:path';

const dbPath = join(projectRoot, 'app.sqlite'); // anchored to the app root`,
				label: 'Anchor to projectRoot'
			},
			{
				code: `// Bundler-safe asset reference — rewritten at build time
const worker = new URL${''}('./worker.js', import.meta.url);

const mode = import.meta.env.MODE; // not a filesystem path
const base = process.cwd();        // also fine`
			}
		],
		details: [
			'Disallows deriving filesystem paths from a module’s own location: `import.meta.dir`, `import.meta.dirname`, `import.meta.filename`, and `fileURLToPath(import.meta.url)`. These resolve relative to the current file — your `src/` tree under `absolute dev`, but the bundled `dist/` under `absolute start` — so module-relative runtime and data paths silently break in production, and only there, since dev runs from source.',
			'Anchor runtime paths to `projectRoot` from `@absolutejs/absolute` (or `process.cwd()`) instead. The bundler-safe asset form — `new URL` with a literal path and `import.meta.url` — is explicitly allowed, as are bare `import.meta.url` and `import.meta.env`.',
			'This targets application server code. A library that locates its own shipped assets is a legitimate exception — `projectRoot` points at the consuming app, not the package — so disable the rule for those files via an override.'
		],
		fixable: false,
		id: 'eslint-no-import-meta-path',
		incorrect: [
			{
				code: `const dir = import.meta.dir;
const file = import.meta.filename;
const dataDir = resolve(import.meta.dir, '..', 'data');`,
				label: 'import.meta path properties'
			},
			{
				code: `import { fileURLToPath } from 'node:url';

const here = fileURLToPath(import.meta.url);`,
				label: 'fileURLToPath(import.meta.url)'
			}
		],
		language: 'typescript',
		name: 'no-import-meta-path',
		options: [],
		optionsExample: `{
	rules: {
		'absolute/no-import-meta-path': 'error'
	},
	overrides: [
		{
			// A library locating its own shipped assets is a valid exception
			files: ['packages/*/src/assets.ts'],
			rules: { 'absolute/no-import-meta-path': 'off' }
		}
	]
}`,
		problemType: 'problem',
		related: [],
		requiresTypeInfo: false,
		summary:
			"Disallow deriving filesystem paths from a module's own location, which break when the server is bundled.",
		whenNotToUse: [
			'In code that is never bundled — one-off scripts, or a published library that intentionally resolves its own package directory — module-relative paths are safe. Disable the rule for those files instead of globally.'
		]
	},
	{
		category: 'TypeScript',
		correct: [
			{
				code: `type User = { name: string; age: number };
const user: User = { name: 'Ada', age: 36 };

type Item = { id: string; name: string };
const items: Item[] = [];`,
				label: 'Extract to a named alias'
			},
			{
				code: `const point: { x: number } = { x: 1 };          // single property < threshold 2
const dict: { [key: string]: number } = {};      // index signature only → Record-shaped
const value = input as { a: string; b: number }; // an as-cast is not an annotation`
			}
		],
		details: [
			'Disallows inline object type literals in annotation positions and nudges them toward a named `type` alias. A named shape is reusable, shows up by name in tooltips and errors, and keeps signatures readable. The rule descends through wrappers — `T[]`, `Array<T>`, `Promise<T>`, `Record<K, V>`, `Map<K, V>`, unions, and intersections — so the inner shape is still caught.',
			'It checks variable annotations, class field annotations, function/method/constructor parameter annotations, and explicit generic type arguments on calls and `new` expressions. A literal is only flagged once it has at least `minProperties` members (default 2), and index-signature-only literals are skipped because they are really `Record` shapes. `as`-casts are not annotations and are left alone.'
		],
		fixable: false,
		id: 'eslint-no-inline-object-types',
		incorrect: [
			{
				code: `const config: { item: string; test: number } = { item: 'a', test: 1 };
const items: Array<{ id: string; name: string }> = [];
const lookup: Record<string, { id: string; name: string }> = {};

function update(opts: { delay: number; retries: number }) {
	return opts;
}`
			}
		],
		language: 'typescript',
		name: 'no-inline-object-types',
		options: [
			{
				default: '2',
				description:
					'Minimum number of members an inline object type must have before it is flagged. Set to 1 to also catch single-property literals.',
				name: 'minProperties',
				type: 'number'
			}
		],
		optionsExample: `{
	rules: {
		// Only flag inline object types with 3+ members
		'absolute/no-inline-object-types': ['warn', { minProperties: 3 }]
	}
}`,
		problemType: 'suggestion',
		related: ['explicit-object-types', 'no-redundant-type-annotation'],
		requiresTypeInfo: false,
		summary:
			'Disallow inline object type literals on annotations; prefer extracting them to a named type alias.',
		whenNotToUse: [
			'Small, local callback signatures sometimes read better with an inline shape than with a one-off named alias. Raise `minProperties` if you only care about larger shapes, or disable the rule where inline types are idiomatic.'
		]
	},
	{
		category: 'Styling',
		correct: [
			{
				code: `export const headerStyle: CSSProperties = { color: 'red' };
export const footerStyle: CSSProperties = { color: 'blue' };`,
				label: 'Export each style separately'
			},
			{
				code: `export default { headerStyle: {}, version: 1 }; // only one *Style key`
			}
		],
		details: [
			'Disallows grouping multiple CSS style objects under a single `export default` object or a single returned object. The rule counts properties whose key ends in `Style`; when more than one such property shares an object, it asks you to export each style on its own.',
			'Separate exports keep styles individually importable and tree-shakeable, make diffs smaller, and pair naturally with `sort-exports`. Objects with at most one `*Style` key, and properties with other names, are left alone.'
		],
		fixable: false,
		id: 'eslint-no-multi-style-objects',
		incorrect: [
			{
				code: `export default {
	headerStyle: { color: 'red' },
	footerStyle: { color: 'blue' }
};`
			},
			{
				code: `function getStyles() {
	return { headerStyle: {}, footerStyle: {} };
}`
			}
		],
		language: 'typescript',
		name: 'no-multi-style-objects',
		options: [],
		problemType: 'problem',
		related: ['seperate-style-files', 'sort-exports'],
		requiresTypeInfo: false,
		summary:
			'Disallow grouping CSS style objects in a single export; export each style separately.',
		whenNotToUse: [
			'If you deliberately bundle related styles into a single theme object that is consumed as a unit, this rule works against that pattern — disable it for those modules.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `function App() {
	return (
		<div>
			<span>Hello</span>
		</div>
	); // top-level component is exempt
}`
			},
			{
				code: `function App() {
	const renderIcon = () => <Icon />;   // single component element
	const renderBox = () => <div />;     // singular empty element
	return <Toolbar />;
}`,
				label: 'Components and singular elements are allowed'
			}
		],
		details: [
			'Enforces one component per file by flagging nested functions that return complex JSX. A render path that produces real markup deserves to be its own named component — it is easier to test, memoize, and reuse than a closure buried inside another component.',
			'A nested function is allowed when it returns a single component element (uppercase tag, including `Ns.Component`) or a "singular" element (zero or one non-whitespace child, where a single child element has no meaningful children of its own). Anything richer — multiple children, or a multi-child fragment — is reported. The top-level component function itself is always exempt.'
		],
		fixable: false,
		id: 'eslint-no-nested-jsx-return',
		incorrect: [
			{
				code: `function App() {
	const renderHeader = () => (
		<div>
			<span>A</span>
			<span>B</span>
		</div>
	); // nested arrow returning multi-child JSX
	return <div />;
}`
			},
			{
				code: `function App() {
	function renderHeader() {
		return (
			<>
				<span>A</span>
				<span>B</span>
			</>
		); // nested function returning a multi-child fragment
	}
	return <div />;
}`
			}
		],
		language: 'tsx',
		name: 'no-nested-jsx-return',
		options: [],
		problemType: 'problem',
		related: [
			'no-unnecessary-div',
			'max-jsxnesting',
			'localize-react-props'
		],
		requiresTypeInfo: false,
		summary:
			'Disallow nested functions that return non-component, non-singular JSX, to enforce one component per file.',
		whenNotToUse: [
			'Render-prop and "render helper" patterns rely on inline functions that return markup. If those patterns are central to your codebase, this rule will be noisy — disable it or limit it to specific directories.'
		]
	},
	{
		category: 'Angular',
		correct: [
			{
				code: `@Component({ template: '<button (click)="shuffle()">Shuffle</button>' })
export class Dashboard {
	shuffle() {
		return Math.random(); // inside a method/event handler — fine
	}
}`,
				label: 'Nondeterminism inside methods is allowed'
			},
			{
				code: `@Component({ template: '<p>Created</p>' })
export class Dashboard {
	// Explicit argument makes it deterministic
	readonly createdAt = new Date('2026-04-29T12:00:00.000Z');
}`
			}
		],
		details: [
			'Disallows nondeterministic values in Angular render paths, because they produce different output on the server and the client and therefore cause SSR hydration mismatches. It targets `@Component` classes specifically.',
			'Two positions are checked: inline `template` strings (scanned for `Math.random(`, `Date.now(`, `new Date()`, `crypto.randomUUID(`, and `performance.now(`), and class field initializers using those same expressions. The same calls inside methods or event handlers are fine, `new Date(...)` with an explicit argument is deterministic, and `templateUrl` external templates are not inspected.',
			'Inject a deterministic token (so the server and client agree on a value) or compute the value before render instead of generating it during render.'
		],
		fixable: false,
		id: 'eslint-no-nondeterministic-render',
		incorrect: [
			{
				code: `@Component({ template: '<p>{{ Math.random() }}</p>' })
export class Dashboard {} // nondeterministicTemplate`
			},
			{
				code: `@Component({ template: '<p>Hello</p>' })
export class Dashboard {
	readonly id = crypto.randomUUID(); // nondeterministicField
	readonly createdAt = new Date();   // nondeterministicField
}`
			}
		],
		language: 'typescript',
		name: 'no-nondeterministic-render',
		options: [],
		problemType: 'problem',
		related: ['angular-one-feature-per-file'],
		requiresTypeInfo: false,
		summary:
			'Disallow nondeterministic values in Angular render paths that can cause SSR hydration mismatches.',
		whenNotToUse: [
			'If a given Angular app is rendered purely client-side and never server-rendered, hydration mismatches are not a concern — disable the rule for that project.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `const Panel = () => <div>{isOpen && <Modal />}</div>;`,
				label: 'Logical && for conditional rendering'
			},
			{
				code: `const Panel = () => <div>{isOpen ? <Open /> : <Closed />}</div>; // real alternate
const Host = () => <Slot render={flag ? <A /> : null} />;        // used as a prop`
			}
		],
		details: [
			'Prefers the `&&` short-circuit over a ternary whose alternate is `null`/`undefined` for conditional JSX. `{cond && <X />}` expresses "render X when cond" more directly than `{cond ? <X /> : null}`, with less to read.',
			'The rule only fires on a ternary used as a JSX child (inside an expression container that is not a prop) whose alternate is exactly `null` or `undefined`. Ternaries with a real alternate, ternaries used as prop values, and `false`/`0` alternates are left alone. There is intentionally no autofix, to avoid conflicting with `react/jsx-no-leaked-render`.'
		],
		fixable: false,
		id: 'eslint-no-or-none-component',
		incorrect: [
			{
				code: `const Panel = () => <div>{isOpen ? <Modal /> : null}</div>;
const Panel2 = () => <div>{isOpen ? <Modal /> : undefined}</div>;`
			}
		],
		language: 'tsx',
		name: 'no-or-none-component',
		options: [],
		problemType: 'suggestion',
		related: ['no-unnecessary-key'],
		requiresTypeInfo: false,
		summary:
			'Prefer the logical && operator over a ternary with null/undefined for conditional JSX rendering.',
		whenNotToUse: [
			'If you rely on `react/jsx-no-leaked-render` and prefer the explicit ternary form to avoid rendering falsy values like `0`, keep using ternaries and leave this rule off.'
		]
	},
	{
		category: 'TypeScript',
		correct: [
			{
				code: `const greeting: string = 'hello'; // literal widening — annotation does work
const ids: string[] = [];          // array literal is not in the allow-list

type ID = string;
declare function loadId(): string;
const id: ID = loadId();           // the alias documents intent`
			},
			{
				code: `const el: HTMLInputElement | null = document.querySelector('input');
// the annotation steers the generic, so it is kept`
			}
		],
		details: [
			'A type-aware rule that removes a variable’s type annotation when the initializer already produces exactly that type, then autofixes by deleting the annotation. It only considers initializers whose inferred type is independent of context — calls, identifiers, member access, `new` expressions, and `as` casts — so it never strips an annotation that is doing widening work.',
			'Several cases are deliberately preserved: a literal initializer (where `: string` widens `"hello"`), object/array literals (which are contextually typed), an annotation that references a type alias the initializer does not carry (the alias documents intent), and generics whose type parameter is steered by the annotation (like `querySelector<E>`), where removing it would change the result.',
			'This rule requires type information. Set `parserOptions.project` to your `tsconfig.json`; without typed services it becomes a no-op.'
		],
		fixable: true,
		id: 'eslint-no-redundant-type-annotation',
		incorrect: [
			{
				code: `function makeUser(): User { /* ... */ }
const user: User = makeUser();   // → const user = makeUser();

class Box {}
const box: Box = new Box();      // → const box = new Box();

declare const count: number;
const total: number = count;     // → const total = count;`
			}
		],
		language: 'typescript',
		name: 'no-redundant-type-annotation',
		options: [],
		optionsExample: `// Requires typed linting
{
	languageOptions: {
		parserOptions: { project: './tsconfig.json' }
	},
	rules: {
		'absolute/no-redundant-type-annotation': 'warn'
	}
}`,
		problemType: 'suggestion',
		related: [
			'no-explicit-return-type',
			'no-trivial-alias',
			'explicit-object-types'
		],
		requiresTypeInfo: true,
		summary:
			'Disallow type annotations on variable declarations whose initializer already has the same inferred type.',
		whenNotToUse: [
			'If you cannot enable type-aware linting (no `parserOptions.project`), the rule does nothing. Teams that prefer explicit annotations as living documentation — even when redundant — should leave it off.'
		]
	},
	{
		category: 'Styling',
		correct: [
			{
				code: `const fadeStyle: CSSProperties = { color: 'red', opacity: 1 };`,
				label: 'No transition property'
			},
			{
				code: `// Drive the animation through react-spring instead
const [fadeSprings, fadeApi] = useSpring(() => ({ opacity: 0 }));`
			}
		],
		details: [
			'Forbids a `transition` property on objects typed as `CSSProperties` (or `React.CSSProperties`). In an AbsoluteJS UI, animation is owned by react-spring; a CSS `transition` competes with the spring for the same properties and produces janky or canceled animations.',
			'The rule matches the annotation by type reference or by a `CSSProperties` substring in the annotation text, then reports any property whose key is exactly `transition`. Related keys like `transitionDelay` are not flagged, and untyped objects are ignored. Move motion into a `useSpring`/`useSprings` animation instead.'
		],
		fixable: false,
		id: 'eslint-no-transition-cssproperties',
		incorrect: [
			{
				code: `const fadeStyle: CSSProperties = {
	color: 'red',
	transition: 'all 0.3s ease'
};

const panelStyle: React.CSSProperties = { transition: 'opacity 0.5s' };`
			}
		],
		language: 'typescript',
		name: 'no-transition-cssproperties',
		options: [],
		problemType: 'problem',
		related: ['spring-naming-convention', 'seperate-style-files'],
		requiresTypeInfo: false,
		summary:
			"Objects typed as CSSProperties must not include a 'transition' property, which conflicts with react-spring.",
		whenNotToUse: [
			'If a project does not use react-spring and relies on native CSS transitions for animation, this rule does not apply — leave it off.'
		]
	},
	{
		category: 'TypeScript',
		correct: [
			{
				code: `type Names = Array<string>;          // generic application
type Id = string | number;           // union
type Summary = Pick<Account, 'id'>;  // type operator
type Brand = string & { readonly __brand: 'UserId' }; // real branding`,
				label: 'Transformations are allowed'
			},
			{
				code: `const value = compute();   // call initializer
const field = config.mode; // member access can carry meaning`
			}
		],
		details: [
			'Disallows identity aliases that rename a type or value without transforming it — `type X = Y` and `const x = y`. Two names for the same thing drift apart: someone updates one and forgets the other. Pick one name and use it at the consumer.',
			'For types, a bare `TSTypeReference` with no type arguments, or a bare primitive keyword (a "branded primitive" that forgot the brand), is flagged. Any transformation passes: generic application, unions, intersections, type operators (`Pick`, `Partial`, `ReturnType`, `Awaited`), template-literal types, indexed access, and object literal types.',
			'For values, an un-annotated `const x = y` where `y` resolves to another `const` binding is flagged. Member-access initializers (`const x = obj.foo`) are excluded because they can carry meaning, and `let`/`var`/parameter sources are skipped because they may be deliberate save-before-mutation captures. Annotated declarations are deferred to `no-redundant-type-annotation`.'
		],
		fixable: false,
		id: 'eslint-no-trivial-alias',
		incorrect: [
			{
				code: `type Tag = TagWithCount; // pure rename
type AccountId = string; // branded primitive without the brand

declare const original: number;
const alias = original;  // trivial const alias`
			}
		],
		language: 'typescript',
		name: 'no-trivial-alias',
		options: [],
		problemType: 'suggestion',
		related: ['no-redundant-type-annotation', 'no-explicit-return-type'],
		requiresTypeInfo: false,
		summary:
			'Disallow identity aliases that rename a type or value without transforming it.',
		whenNotToUse: [
			'If you use bare aliases as a migration shim (re-pointing a name during a refactor) or to centralize a primitive you plan to brand later, the rule will flag those intentional placeholders — disable it for those lines or files.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `const Row = () => (
	<div>
		<Avatar />
		<Name />
	</div>
); // multiple children — the div is doing real work`
			},
			{
				code: `const Banner = () => <section><Logo /></section>; // semantic wrapper
const Label = () => <span />;                       // not a div`
			}
		],
		details: [
			'Flags a `<div>` whose only meaningful child is a single JSX element — a wrapper that adds a DOM node without adding structure or meaning. Either drop the wrapper, or replace it with a semantic element (`<section>`, `<header>`, `<nav>`, ...) that reflects its purpose.',
			'Whitespace-only text is ignored when counting children, and attributes on the div (like `className`) do not exempt it. Divs with zero or multiple meaningful children, text content, an expression-container child (`{value}`), or a fragment child are not flagged.'
		],
		fixable: false,
		id: 'eslint-no-unnecessary-div',
		incorrect: [
			{
				code: `const Wrapper = () => (
	<div>
		<Avatar />
	</div>
);

const Styled = () => (
	<div className="wrapper">
		<Avatar />
	</div>
); // attributes do not make the wrapper necessary`
			}
		],
		language: 'tsx',
		name: 'no-unnecessary-div',
		options: [],
		problemType: 'suggestion',
		related: ['no-nested-jsx-return', 'max-jsxnesting'],
		requiresTypeInfo: false,
		summary:
			'Flag unnecessary <div> wrappers that enclose a single JSX element.',
		whenNotToUse: [
			'Some layout techniques (fl/grid containers, scroll wrappers, libraries that require a host node) need a wrapper element even around a single child. Replace those with a semantic element, or disable the rule where a bare wrapper is genuinely required.'
		]
	},
	{
		category: 'React & JSX',
		correct: [
			{
				code: `const List = () => items.map((item) => <Row key={item.id} {...item} />);`,
				label: 'key inside an array mapping'
			},
			{
				code: `function renderRow() {
	return <Row key="header" />; // directly returned from a function
}

const Solo = () => <Row />; // no key needed`
			}
		],
		details: [
			'Enforces that the React `key` prop is only used where it is meaningful: on elements rendered as part of an array mapping. A `key` on a static, one-off element is noise — it implies a list that is not there and can mask real reconciliation bugs.',
			'An element with `key` is allowed when an ancestor is a `.map(...)` call (including nested maps) or a `return` statement (a render helper). A `key` on an element that is assigned to a variable and then returned, or otherwise sits outside a map/return, is reported.'
		],
		fixable: false,
		id: 'eslint-no-unnecessary-key',
		incorrect: [
			{
				code: `const Header = () => <div key="main">Hello</div>;

const Build = () => {
	const el = <div key="a" />; // key is not directly in a map or return
	return el;
};`
			}
		],
		language: 'tsx',
		name: 'no-unnecessary-key',
		options: [],
		problemType: 'problem',
		related: ['no-or-none-component'],
		requiresTypeInfo: false,
		summary:
			'Enforce that the key prop is only used on elements rendered as part of an array mapping.',
		whenNotToUse: [
			'If you use `key` deliberately outside of lists to force remounts (resetting component state by changing the key), this rule will flag that valid pattern — disable it on those lines.'
		]
	},
	{
		category: 'Code Quality',
		correct: [
			{
				code: `try {
	await save();
} catch (error) {
	throw error;
}`,
				label: 'Rethrow the error'
			},
			{
				code: `try {
	await save();
} catch (error) {
	console.error(error);
	return null;
}`,
				label: 'Handle or record the failure'
			},
			{
				code: `try {
	await save();
} catch (error) {
	failed = true;
}`
			}
		],
		details: [
			'Disallows `catch` blocks that do not do real work. Core ESLint’s `no-empty` rule allows comment-only blocks, which makes it easy for generated code to silence an error path with `// ignore` while still swallowing the exception. This rule treats comments as non-work and requires the catch body to handle, propagate, or record the failure.',
			'The rule reports empty blocks, comment-only blocks, `EmptyStatement`s, and expression statements with no side effect such as `error;`, `error.message;`, or `void error;`. It allows statements that change control flow or have observable effects: `throw`, `return`, function calls, assignments, updates, declarations, and other real statements.'
		],
		fixable: false,
		id: 'eslint-no-useless-catch',
		incorrect: [
			{
				code: `try {
	await save();
} catch (error) {
	// ignore
}`
			},
			{
				code: `try {
	await save();
} catch (error) {
	error;
	error.message;
	void error;
}`,
				label: 'No-op expressions are not handling'
			}
		],
		language: 'typescript',
		name: 'no-useless-catch',
		options: [],
		problemType: 'problem',
		related: ['no-useless-function'],
		requiresTypeInfo: false,
		summary:
			'Disallow catch blocks that contain only comments or no-op statements.',
		whenNotToUse: [
			'If a boundary intentionally swallows a failure, still prefer a real statement that records the decision, returns a fallback, or rethrows a wrapped error. Disable the rule only for code where silent failure is an explicit API contract.'
		]
	},
	{
		category: 'Code Quality',
		correct: [
			{
				code: `// Export the object directly
export const springConfig = { tension: 200, friction: 20 };

const withArg = (x: number) => ({ value: x }); // has a parameter`
			},
			{
				code: `// Used as a callback — allowed (covers react-spring)
const [boxSprings, boxApi] = useSpring(() => ({ opacity: 1 }));`,
				label: 'Callback arguments are exempt'
			}
		],
		details: [
			'Flags a zero-parameter arrow function whose concise body is an object literal (`() => ({ ... })`). Wrapping a constant object in a parameterless function adds a call with no benefit — export the object directly so callers reference the value, not a thunk.',
			'The important exception is when the arrow is passed directly as a callback argument to a function call. That covers react-spring’s `useSpring(() => ({ ... }))`, where the function form is required. Arrows with parameters, block bodies, or non-object returns are never flagged.'
		],
		fixable: false,
		id: 'eslint-no-useless-function',
		incorrect: [
			{
				code: `const getConfig = () => ({ tension: 200, friction: 20 });`
			}
		],
		language: 'typescript',
		name: 'no-useless-function',
		options: [],
		problemType: 'suggestion',
		related: ['prefer-inline-exports'],
		requiresTypeInfo: false,
		summary:
			'Disallow functions that take no parameters and just return an object literal, unless used as a callback.',
		whenNotToUse: [
			'If you intentionally return fresh object instances to avoid shared-reference mutation (each call producing a new object), keep the function and disable the rule for it.'
		]
	},
	{
		category: 'Imports & Exports',
		correct: [
			{
				code: `export const foo = 1;
function bar() {}
export { bar as renamed };           // renamed specifier
export { helper } from './helper';   // re-export with a source

import { Sentry } from '@sentry/node';
export { Sentry };                   // re-exporting an imported binding`
			}
		],
		details: [
			'Prefers inlining `export` at the declaration over a trailing `export { name }` statement when `name` is a local declaration in the same file. The inline form keeps a symbol’s exported-ness next to its definition, so you never have to scroll to the bottom of a file to learn what is public.',
			'The autofix prepends `export` to each fixable declaration and removes (or trims) the trailing statement. Forms with distinct semantics are left alone: re-exports with `from`, renamed specifiers (`export { foo as bar }`), type-only exports, imported bindings, declarations already exported elsewhere, and shared multi-declarator declarations. AI tooling commonly emits the trailing form when rewriting `export default`, and this rule cleans that up.'
		],
		fixable: true,
		id: 'eslint-prefer-inline-exports',
		incorrect: [
			{
				code: `const foo = 1;
export { foo };          // → export const foo = 1;

function helper() {}
export { helper };       // → export function helper() {}`
			}
		],
		language: 'typescript',
		name: 'prefer-inline-exports',
		options: [],
		problemType: 'suggestion',
		related: ['sort-exports', 'no-useless-function'],
		requiresTypeInfo: false,
		summary:
			'Prefer inlining export at a declaration site over a trailing export { name } statement for local declarations.',
		whenNotToUse: [
			'If your team prefers a single "barrel" of exports at the bottom of each file as an at-a-glance public API, that convention conflicts with inlining — leave the rule off.'
		]
	},
	{
		category: 'Styling',
		correct: [
			{
				code: `// button.styles.ts
export const buttonStyle: CSSProperties = { padding: '0.5rem 1rem' };`,
				label: 'Styles live in a .styles.ts file'
			},
			{
				code: `// Button.tsx — no CSSProperties-typed object here
const Button = () => <button style={buttonStyle}>Save</button>;`
			}
		],
		details: [
			'Warns when a component file (`.tsx` or `.jsx`) declares a variable typed as `CSSProperties` (or `React.CSSProperties`). Style objects belong in their own file under a style folder, so component files stay focused on behavior and markup while styles can be shared and reviewed independently.',
			'The rule only runs in `.tsx`/`.jsx` files and matches the annotation as a type reference — there is no raw-text fallback, so only genuinely `CSSProperties`-typed declarations are reported. Move the object to a co-located `*.styles.ts` (or `.css`) module and import it.'
		],
		fixable: false,
		id: 'eslint-seperate-style-files',
		incorrect: [
			{
				code: `// Card.tsx
const cardStyle: CSSProperties = { display: 'flex', gap: '1rem' };

const Card = () => <div style={cardStyle} />;`
			}
		],
		language: 'tsx',
		name: 'seperate-style-files',
		options: [],
		problemType: 'suggestion',
		related: [
			'inline-style-limit',
			'no-multi-style-objects',
			'no-transition-cssproperties'
		],
		requiresTypeInfo: false,
		summary:
			'Warn when a component file (.tsx/.jsx) contains a style object typed as CSSProperties; move it to a style file.',
		whenNotToUse: [
			'Small components whose styles are never reused may not benefit from a separate file. If co-locating a single style object with its component is your convention, disable the rule.'
		]
	},
	{
		category: 'Imports & Exports',
		correct: [
			{
				code: `export const alpha = 1;
export const beta = 2;
export const gamma = 3;`,
				label: 'Sorted ascending'
			},
			{
				code: `// A forward dependency is detected, so the block is left unsorted
export const doubled = base * 2;
export const base = 21;`
			}
		],
		details: [
			'Enforces that contiguous blocks of top-level named exports are sorted by exported name, with an autofix that reorders the block. Consistent export order makes files scannable and keeps diffs small. Only blocks with at least `minKeys` exports are checked, and `export type` aliases break a block (they are ignored).',
			'Sorting respects several toggles: `order` (asc/desc), `caseSensitive`, `natural` (numeric-aware), and `variablesBeforeFunctions` (non-function exports first). The rule is dependency-safe — it will not reorder when the current order has a forward reference between exports, nor when sorting would create one — and decorators move with their class.'
		],
		fixable: true,
		id: 'eslint-sort-exports',
		incorrect: [
			{
				code: `export const gamma = 3;
export const alpha = 1;   // → reordered to alpha, beta, gamma
export const beta = 2;`
			},
			{
				code: `// options: [{ variablesBeforeFunctions: true }]
export function build() {}
export const config = {}; // → const sorts before function`,
				label: 'variablesBeforeFunctions'
			}
		],
		language: 'typescript',
		name: 'sort-exports',
		options: [
			{
				default: "'asc'",
				description: 'Sort direction: `"asc"` or `"desc"`.',
				name: 'order',
				type: "'asc' | 'desc'"
			},
			{
				default: 'false',
				description:
					'When false, names are lowercased before comparison (case-insensitive sort).',
				name: 'caseSensitive',
				type: 'boolean'
			},
			{
				default: 'false',
				description:
					'Numeric-aware comparison so `export2` sorts before `export10`.',
				name: 'natural',
				type: 'boolean'
			},
			{
				default: '2',
				description:
					'Minimum number of named exports in a contiguous block before it is checked (minimum 2).',
				name: 'minKeys',
				type: 'integer'
			},
			{
				default: 'false',
				description:
					'When true, non-function exports are sorted before function exports.',
				name: 'variablesBeforeFunctions',
				type: 'boolean'
			}
		],
		optionsExample: `{
	rules: {
		'absolute/sort-exports': [
			'warn',
			{ order: 'asc', natural: true, variablesBeforeFunctions: true }
		]
	}
}`,
		problemType: 'suggestion',
		related: [
			'sort-keys-fixable',
			'prefer-inline-exports',
			'no-multi-style-objects'
		],
		requiresTypeInfo: false,
		summary:
			'Enforce that top-level export declarations are sorted by exported name, optionally variables before functions.',
		whenNotToUse: [
			'If you group exports semantically (by feature or by call order) rather than alphabetically, sorting will fight that structure — leave the rule off or raise `minKeys`.'
		]
	},
	{
		category: 'Imports & Exports',
		correct: [
			{
				code: `const palette = { danger: 'red', primary: 'blue', success: 'green' };`,
				label: 'Sorted keys'
			},
			{
				code: `// options: [{ minKeys: 3 }]
const pair = { b: 1, a: 2 }; // below minKeys, not checked`
			}
		],
		details: [
			'Mirrors ESLint’s built-in `sort-keys`, reporting out-of-order keys in objects with at least `minKeys` properties, but adds a comment-preserving autofix — the core rule has none. It also covers object literals inside JSX prop expression containers and JSX attribute lists.',
			'The autofix only runs when reordering is provably safe. It backs off (report-only) when a property is a spread, computed, or non-identifier key; when duplicate names exist (accessor pairs aside); or when two or more property values are side-effecting. A single impure value still autofixes, since it executes once regardless of position.',
			'Purity analysis is conservative but smart — literals, stable reads, pure global/member calls, and provably-pure local helpers are safe. For imported helpers you know are pure (such as TypeBox’s `t.Object`), list them in `pureImports` so the fixer can reorder objects that use them. With `parserOptions.project` set, the rule can resolve imported-callee purity automatically.'
		],
		fixable: true,
		id: 'eslint-sort-keys-fixable',
		incorrect: [
			{
				code: `const palette = { primary: 'blue', danger: 'red' }; // → { danger, primary }`
			},
			{
				code: `// options: [{ pureImports: ['t.Object', 't.String', 't.Optional'] }]
import { t } from 'elysia';

const schema = {
	name: t.String(),
	id: t.Optional(t.String())
}; // → { id, name } once the imports are marked pure`,
				label: 'pureImports lets the fixer reorder'
			}
		],
		language: 'typescript',
		name: 'sort-keys-fixable',
		options: [
			{
				default: "'asc'",
				description: 'Sort direction: `"asc"` or `"desc"`.',
				name: 'order',
				type: "'asc' | 'desc'"
			},
			{
				default: 'false',
				description: 'Case-sensitive comparison when true.',
				name: 'caseSensitive',
				type: 'boolean'
			},
			{
				default: 'false',
				description: 'Numeric-aware comparison (`a2` before `a10`).',
				name: 'natural',
				type: 'boolean'
			},
			{
				default: '2',
				description:
					'Minimum number of properties before an object is checked (minimum 2).',
				name: 'minKeys',
				type: 'integer'
			},
			{
				default: 'false',
				description:
					'When true, non-function values are sorted before function values.',
				name: 'variablesBeforeFunctions',
				type: 'boolean'
			},
			{
				default: '[]',
				description:
					'Callee names or member paths (e.g. `"t.Object"`) to treat as side-effect-free, so the autofix may reorder objects containing those calls.',
				name: 'pureImports',
				type: 'string[]'
			}
		],
		optionsExample: `{
	rules: {
		'absolute/sort-keys-fixable': [
			'warn',
			{ natural: true, pureImports: ['t.Object', 't.String'] }
		]
	}
}`,
		problemType: 'suggestion',
		related: ['sort-exports'],
		requiresTypeInfo: false,
		summary:
			'Enforce sorted keys in object literals with a comment-preserving auto-fix for provably safe cases.',
		typeInfoNote:
			'Works without type information, but setting parserOptions.project lets it resolve imported-callee purity automatically (otherwise use pureImports).',
		whenNotToUse: [
			'Objects whose key order is meaningful (ordered form fields, prioritized config) should not be sorted. Disable the rule for those files, or keep the order intentional with an inline disable comment.'
		]
	},
	{
		category: 'react-spring',
		correct: [
			{
				code: `const [fadeSprings, fadeApi] = useSpring(() => ({ opacity: 0 }));
const [itemsSprings, itemsApi] = useSprings(3, () => ({ x: 0 }));`,
				label: 'Correct Springs / Api naming'
			},
			{
				code: `const [count, setCount] = useState(0); // non-spring hooks are ignored
const springs = useSpring(() => ({}));  // no array destructuring`
			}
		],
		details: [
			'Enforces a consistent naming convention for `useSpring` and `useSprings` array destructuring so spring identity is obvious at every call site. The first variable must end with `Springs` (with a non-empty base), and the second must be the matching `<base>Api`.',
			'For the plural `useSprings`, the base must itself be plural (end in `s`), giving pairs like `itemsSprings` / `itemsApi`. Single-element destructuring, non-array destructuring, and non-spring hooks are ignored.'
		],
		fixable: false,
		id: 'eslint-spring-naming-convention',
		incorrect: [
			{
				code: `const [fade, fadeApi] = useSpring(() => ({}));          // firstMustEndWithSprings
const [fadeSprings, controller] = useSpring(() => ({})); // secondMustMatch → fadeApi
const [itemSprings, itemApi] = useSprings(3, () => ({})); // pluralRequired → itemsSprings`
			}
		],
		language: 'typescript',
		name: 'spring-naming-convention',
		options: [],
		problemType: 'problem',
		related: ['no-transition-cssproperties'],
		requiresTypeInfo: false,
		summary:
			'Enforce correct naming for useSpring and useSprings hook destructuring (`<base>Springs` / `<base>Api`).',
		whenNotToUse: [
			'If a project does not use react-spring, or follows a different established naming scheme for animation state, this rule does not apply — leave it off.'
		]
	}
];

export const eslintRulesByCategory = (
	[
		'React & JSX',
		'Styling',
		'react-spring',
		'TypeScript',
		'Angular',
		'Imports & Exports',
		'Code Quality'
	] satisfies EslintRuleCategory[]
).map((category) => ({
	category,
	rules: eslintRules.filter((rule) => rule.category === category)
}));

export const categorySlug = (category: string) =>
	category
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

export const getEslintRule = (name: string) =>
	eslintRules.find((rule) => rule.name === name);

export const ruleConfigCode = (rule: EslintRule) =>
	rule.optionsExample ??
	`{
	rules: {
		'absolute/${rule.name}': 'error'
	}
}`;
