import * as eslintDocsCode from './eslintDocsCode';

export type EslintDocsSection = {
	title: string;
	description: string;
	beforeCode: string;
	afterCode: string;
	href: string;
};

export const eslintDocsData: EslintDocsSection[] = [
	{
		afterCode: eslintDocsCode.angularOneFeaturePerFile.afterCode,
		beforeCode: eslintDocsCode.angularOneFeaturePerFile.beforeCode,
		description:
			'Angular-only. Disallows defining more than one Angular feature class (`@Component`, `@Directive`, `@Pipe`, `@Injectable`, `@NgModule`) per file. Mirrors the Angular Style Guide\'s Single Responsibility / Rule of One. Member decorators like `@Input` and `@Output` are not features and are ignored. Spec and Storybook files legitimately define stub/host classes alongside the subject under test — disable the rule for those files via an ESLint override (e.g., `{ files: ["**/*.spec.ts", "**/*.stories.ts"], rules: { "absolute/angular-one-feature-per-file": "off" } }`).',
		href: '#angular-one-feature-per-file',
		title: 'absolute/angular-one-feature-per-file'
	},
	{
		afterCode: eslintDocsCode.explicitObjectTypes.afterCode,
		beforeCode: eslintDocsCode.explicitObjectTypes.beforeCode,
		description:
			'Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference. This is meant for stricter definitions of objects so the type can be reused. Note that `as const` is allowed here because it gives the object a constant shape.',
		href: '#explicit-object-types',
		title: 'absolute/explicit-object-types'
	},
	{
		afterCode: eslintDocsCode.inlineStyleLimit.afterCode,
		beforeCode: eslintDocsCode.inlineStyleLimit.beforeCode,
		description:
			'Disallows inline JSX style objects with too many keys (default: 3) and encourages extracting them into a named constant or a styles file. Configurable via a number (`["error", 5]`) or an object (`{ maxKeys: 5 }`).',
		href: '#inline-style-limit',
		title: 'absolute/inline-style-limit'
	},
	{
		afterCode: eslintDocsCode.localizeReactProps.afterCode,
		beforeCode: eslintDocsCode.localizeReactProps.beforeCode,
		description:
			"This rule encourages keeping component logic and data as close to where they're used as possible. If a variable is only used as a prop for a single component, it should be defined inside that component rather than being passed down as a prop.",
		href: '#localize-react-props',
		title: 'absolute/localize-react-props'
	},
	{
		afterCode: eslintDocsCode.maxDepthExtended.afterCode,
		beforeCode: eslintDocsCode.maxDepthExtended.beforeCode,
		description:
			'This is the exact same rule as max-depth from ESLint except it allows you to break the max-depth if you exit early via a return or throw statement.',
		href: '#max-depth-extended',
		title: 'absolute/max-depth-extended'
	},
	{
		afterCode: eslintDocsCode.maxJsxNesting.afterCode,
		beforeCode: eslintDocsCode.maxJsxNesting.beforeCode,
		description:
			'Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.',
		href: '#max-jsxnesting',
		title: 'absolute/max-jsxnesting'
	},
	{
		afterCode: eslintDocsCode.minVarLength.afterCode,
		beforeCode: eslintDocsCode.minVarLength.beforeCode,
		description:
			'Enforces a minimum variable name length, like default: 3. Improves readability and discourages overly short variable names.',
		href: '#min-var-length',
		title: 'absolute/min-var-length'
	},
	{
		afterCode: eslintDocsCode.noButtonNavigation.afterCode,
		beforeCode: eslintDocsCode.noButtonNavigation.beforeCode,
		description:
			"This rule prevents using button clicks, or other UI event handlers, to directly manipulate the browser's navigator object. In other words, you shouldn't perform navigation actions like window.location, navigator.pushState, or similar operations inside button event handlers.",
		href: '#no-button-navigation',
		title: 'absolute/no-button-navigation'
	},
	{
		afterCode: eslintDocsCode.noExplicitReturnType.afterCode,
		beforeCode: eslintDocsCode.noExplicitReturnType.beforeCode,
		description:
			"This rule disallows adding explicit return type annotations to functions when TypeScript can already infer the type automatically. TypeScript's type inference system is highly accurate and adapts as your code changes : meaning that explicitly declaring return types in these cases can make your code more rigid and harder to maintain.",
		href: '#no-explicit-return-type',
		title: 'absolute/no-explicit-return-type'
	},
	{
		afterCode: eslintDocsCode.noInlineObjectTypes.afterCode,
		beforeCode: eslintDocsCode.noInlineObjectTypes.beforeCode,
		description:
			'Disallows inline object type literals on variable annotations, class fields, function/method/constructor parameters, and generic type arguments on calls or `new` expressions. Descends through wrappers like `T[]`, `Array<T>`, `Promise<T>`, `Record<K, V>`, unions, and intersections so the inner shape still gets caught. Configurable via `minProperties` (default 2) — set to 1 to also flag single-property cases. Index-signature-only types are skipped.',
		href: '#no-inline-object-types',
		title: 'absolute/no-inline-object-types'
	},
	{
		afterCode: eslintDocsCode.noMultiStyleObjects.afterCode,
		beforeCode: eslintDocsCode.noMultiStyleObjects.beforeCode,
		description:
			'Ensures style objects are centralized and reused rather than scattered across the component. Improves maintainability and performance.',
		href: '#no-multi-style-objects',
		title: 'absolute/no-multi-style-objects'
	},
	{
		afterCode: eslintDocsCode.noNestedJsxReturn.afterCode,
		beforeCode: eslintDocsCode.noNestedJsxReturn.beforeCode,
		description:
			'Prevents nested JSX return statements, which can make code less readable and harder to maintain.',
		href: '#no-nested-jsx-return',
		title: 'absolute/no-nested-jsx-return'
	},
	{
		afterCode: eslintDocsCode.noNondeterministicRender.afterCode,
		beforeCode: eslintDocsCode.noNondeterministicRender.beforeCode,
		description:
			'Disallows nondeterministic values like Math.random, Date.now, performance.now, crypto.randomUUID, and new Date() inside Angular component field initializers and inline templates. These cause SSR hydration mismatches between server and client renders. Use injected deterministic tokens or compute the value before render instead.',
		href: '#no-nondeterministic-render',
		title: 'absolute/no-nondeterministic-render'
	},
	{
		afterCode: eslintDocsCode.noOrNoneComponent.afterCode,
		beforeCode: eslintDocsCode.noOrNoneComponent.beforeCode,
		description:
			'Prevents components that inconsistently return different types, like a component or null. Encourages conditional rendering instead of “Maybe” component patterns.',
		href: '#no-or-none-component',
		title: 'absolute/no-or-none-component'
	},
	{
		afterCode: eslintDocsCode.noRedundantTypeAnnotation.afterCode,
		beforeCode: eslintDocsCode.noRedundantTypeAnnotation.beforeCode,
		description:
			"Type-aware rule that flags variable annotations whose type already matches what TypeScript would infer from the initializer. Fires on `const foo: T = bar()` when `bar()` already returns `T`, on `const foo: Foo = new Foo()`, on identifier and member-access initializers, and on `as` casts. Skips literal initializers (where the annotation does widening work like `const foo: string = 'hello'`), object/array literals (contextually typed), and aliased annotations whose alias the initializer doesn't carry. Requires `parserOptions.project` for typed services; falls back to a no-op without them.",
		href: '#no-redundant-type-annotation',
		title: 'absolute/no-redundant-type-annotation'
	},
	{
		afterCode: eslintDocsCode.noTransitionCssProperties.afterCode,
		beforeCode: eslintDocsCode.noTransitionCssProperties.beforeCode,
		description:
			"This rule prevents using the transition CSS property completely. Using CSS transitions can interfere with React Spring's animation system, causing unexpected or broken animations. All animations and transitions should be handled through React Spring instead of native CSS transitions.",
		href: '#no-transition-cssproperties',
		title: 'absolute/no-transition-cssproperties'
	},
	{
		afterCode: eslintDocsCode.noUnnecessaryDiv.afterCode,
		beforeCode: eslintDocsCode.noUnnecessaryDiv.beforeCode,
		description:
			"This rule removes unnecessary wrapper &lt;div&gt; elements that don't provide meaningful structure or purpose. If a wrapper is only used for styling, that styling should be moved into the child component instead.",
		href: '#no-unnecessary-div',
		title: 'absolute/no-unnecessary-div'
	},
	{
		afterCode: eslintDocsCode.noUnnecessaryKey.afterCode,
		beforeCode: eslintDocsCode.noUnnecessaryKey.beforeCode,
		description:
			'Disallows keys where not needed or inappropriate, like static elements. Encourages correct key usage in dynamic lists.',
		href: '#no-unnecessary-key',
		title: 'absolute/no-unnecessary-key'
	},
	{
		afterCode: eslintDocsCode.noUselessFunction.afterCode,
		beforeCode: eslintDocsCode.noUselessFunction.beforeCode,
		description:
			'Prevents trivial wrapper functions that simply call another function without adding logic. Encourages using direct references instead.',
		href: '#no-useless-function',
		title: 'absolute/no-useless-function'
	},
	{
		afterCode: eslintDocsCode.preferInlineExports.afterCode,
		beforeCode: eslintDocsCode.preferInlineExports.beforeCode,
		description:
			'Flags trailing `export { foo }` statements when `foo` is a local declaration in the same file and could just have `export` prepended at the declaration site. Allows `export { foo } from "..."` (re-exports), aliased forms like `export { foo as bar }`, and type-only exports — those have distinct semantics. AI tooling commonly emits the trailing form when mechanically rewriting `export default`, and this rule cleans it up.',
		href: '#prefer-inline-exports',
		title: 'absolute/prefer-inline-exports'
	},
	{
		afterCode: eslintDocsCode.seperateStyleFiles.afterCode,
		beforeCode: eslintDocsCode.seperateStyleFiles.beforeCode,
		description:
			'Requires that style definitions be located in separate files, like .styles.ts or .css. This keeps component logic and styling concerns separated.',
		href: '#seperate-style-files',
		title: 'absolute/seperate-style-files'
	},
	{
		afterCode: eslintDocsCode.sortExports.afterCode,
		beforeCode: eslintDocsCode.sortExports.beforeCode,
		description:
			'Enforces alphabetical sorting of exports. Variables are listed before functions for clarity and consistency.',
		href: '#sort-exports',
		title: 'absolute/sort-exports'
	},
	{
		afterCode: eslintDocsCode.sortKeys.afterCode,
		beforeCode: eslintDocsCode.sortKeys.beforeCode,
		description:
			'This is just the same as the sort-keys ESLint rule with an addition. While it does enforce consistent key ordering within objects it also provides automatic fixing to sort keys alphabetically, the built in function for --fix rather than manual order changes.',
		href: '#sort-keys-fixable',
		title: 'absolute/sort-keys-fixable'
	},
	{
		afterCode: eslintDocsCode.springNamingConvention.afterCode,
		beforeCode: eslintDocsCode.springNamingConvention.beforeCode,
		description:
			"Enforces a naming convention for `useSpring` and `useSprings` hook destructuring. The first variable must end with `Springs` (e.g., `boxSprings`); the second must be the matching `<base>Api` (e.g., `boxApi`). For `useSprings` (plural), the base must itself end in `s` (e.g., `itemsSprings` / `itemsApi`). Keeps spring identity readable at call sites and consistent across the codebase.",
		href: '#spring-naming-convention',
		title: 'absolute/spring-naming-convention'
	}
];
