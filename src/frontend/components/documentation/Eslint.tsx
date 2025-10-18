import { animated } from "@react-spring/web";
import { PrismPlus } from "../utils/PrismPlus";
import { ThemeProps } from "../../../types/types";
import type { ThemeSprings } from "../../../types/types";
import { useTheme } from "../../hooks/useTheme";
import { headingStyle, h2Style, h3Style, beforeAfterContainerStyle, beforeAfterColumnStyle, beforeAfterHeadingStyle, sectionStyle, ruleDescriptionStyle, introStyle, tableOfContentsStyle } from "../../styles/styles";

type Props = {
	title: string;
	themeSprings?: ThemeSprings;
}

export const Eslint = ({ title, themeSprings }: Props) => {
	const [fallbackTS] = useTheme(undefined);
	const ts = themeSprings ?? fallbackTS;
	
	return (
		<div
			style={{
				flex: 1,
				padding: '40px 24px', 
				minWidth: 0,
				overflow: 'auto',
				position: 'relative',
				zIndex: 0
			}}
		>
			<animated.h1 style={{ ...headingStyle(ts), textAlign: 'center', marginBottom: 32 }}>
				{title}
			</animated.h1>
			<animated.p style={introStyle(ts)}>
				AbsoluteJS includes first-class support for ESLint to help you maintain clean, consistent, and bug-free code. 
				With the built-in configuration, you can easily enforce best practices and align your project's style across the team.
			</animated.p>

			{/* Table of Contents */}
			<animated.div style={tableOfContentsStyle(ts)}>
				<animated.h2 style={{ ...h2Style(ts), marginTop: 0, marginBottom: '24px' }}>Table of Contents</animated.h2>
				<animated.div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					<animated.a href="#explicit-object-types" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/explicit-object-types</animated.a>
					<animated.a href="#localize-react-props" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/localize-react-props</animated.a>
					<animated.a href="#max-depth-extended" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/max-depth-extended</animated.a>
					<animated.a href="#max-jsxnesting" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/max-jsxnesting</animated.a>
					<animated.a href="#min-var-length" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/min-var-length</animated.a>
					<animated.a href="#no-button-navigation" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-button-navigation</animated.a>
					<animated.a href="#no-explicit-return-type" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-explicit-return-type</animated.a>
					<animated.a href="#no-inline-prop-types" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-inline-prop-types</animated.a>
					<animated.a href="#no-multi-style-objects" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-multi-style-objects</animated.a>
					<animated.a href="#no-nested-jsx-return" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-nested-jsx-return</animated.a>
					<animated.a href="#no-or-none-component" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-or-none-component</animated.a>
					<animated.a href="#no-transition-cssproperties" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-transition-cssproperties</animated.a>
					<animated.a href="#no-unnecessary-div" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-unnecessary-div</animated.a>
					<animated.a href="#no-unnecessary-key" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-unnecessary-key</animated.a>
					<animated.a href="#no-useless-function" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/no-useless-function</animated.a>
					<animated.a href="#seperate-style-files" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/seperate-style-files</animated.a>
					<animated.a href="#sort-exports" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/sort-exports</animated.a>
					<animated.a href="#sort-keys-fixable" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem' }}>• absolute/sort-keys-fixable</animated.a>
				</animated.div>
			</animated.div>
			{/* absolute/explicit-object-types */}
			<animated.section id="explicit-object-types" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/explicit-object-types</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference. 
					This is meant for stricter definitions of objects so the type can be reused. Note that `const` is allowed here because it gives the object a constant shape.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`export const defaultConfig = {
	maxUsers: 10,
	name: "app"
};`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`type Config = {
	maxUsers: number;
	name: string;
};

export const defaultConfig: Config = {
	maxUsers: 10,
	name: "app"
};`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/localize-react-props */}
			<animated.section id="localize-react-props" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/localize-react-props</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					If you declare a variable like `const x = 5` and only use it as a prop in a singular component, then that variable should be declared inside the component instead of passed as a prop.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const title = "Save changes";

function MyComponent() {
	return <Button title={title} />;
}`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`function MyComponent() {
	const title = "Save changes";
	return <Button title={title} />;
}`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/max-depth-extended */}
			<animated.section id="max-depth-extended" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/max-depth-extended</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					This is the exact same rule as max-depth from ESLint except it allows you to break the max-depth if you exit early via a return or throw statement.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`if (a) {
	if (b) {
		doThing();
	}
}`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`if (!a) return;
if (!b) return;
doThing();`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/max-jsxnesting */}
			<animated.section id="max-jsxnesting" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/max-jsxnesting</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const MyComponent = () => (
	<div>
		<section>
			<article>
				<div>
					<span>
						<strong>Deep text</strong>
					</span>
				</div>
			</article>
		</section>
	</div>
);`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const DeepText = () => (
	<span><strong>Deep text</strong></span>
);

const MyComponent = () => (
	<div>
		<section>
			<article>
				<div>
					<DeepText />
				</div>
			</article>
		</section>
	</div>
);`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/min-var-length */}
			<animated.section id="min-var-length" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/min-var-length</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Enforces a minimum variable name length (default: 3). Improves readability and discourages overly short variable names.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const x = fetchData();`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const result = fetchData();`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-button-navigation */}
			<animated.section id="no-button-navigation" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-button-navigation</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
				Specifically checks for operations performed on the browser’s navigator object, not on any routing or navigation library.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<button onClick={() => router.push('/docs')}>Docs</button>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<Link to="/docs">Docs</Link>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-explicit-return-type */}
			<animated.section id="no-explicit-return-type" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-explicit-return-type</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows explicit return types where TypeScript can infer them, as inferred types are more reliable and malleable.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`function add(a: number, b: number): number {
	return a + b;
}`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`function add(a: number, b: number) {
	return a + b;
}`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-inline-prop-types */}
			<animated.section id="no-inline-prop-types" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-inline-prop-types</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
				Enforces the use of named or predefined types for component props, preventing the use of inline type definitions when passing props.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`interface Props {
	style: { marginTop: number };
}

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`interface StyleProps {
	marginTop: number;
}

interface Props {
	style: StyleProps;
}

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-multi-style-objects */}
			<animated.section id="no-multi-style-objects" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-multi-style-objects</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Ensures style objects are centralized and reused rather than scattered across the component. 
					Improves maintainability and performance.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<div style={{ color: 'red', padding: 4 }} />
<div style={{ color: 'blue', margin: 8 }} />
<div style={{ color: 'green', border: '1px solid' }} />`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const styles = {
	redBox: { color: 'red', padding: 4 },
	blueBox: { color: 'blue', margin: 8 },
	greenBox: { color: 'green', border: '1px solid' }
};

<div style={styles.redBox} />
<div style={styles.blueBox} />
<div style={styles.greenBox} />`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-nested-jsx-return */}
			<animated.section id="no-nested-jsx-return" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-nested-jsx-return</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Prevents defining JSX-returning functions inside render logic. Encourages extracting those into separate components.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`function List({ items }) {
	return (
		<ul>{items.map(item => {
			return <li>{() => <span>{item.name}</span>}</li>;
		})}</ul>
	);
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`function Item({ item }) {
	return <li>{item.name}</li>;
}

function List({ items }) {
	return <ul>{items.map(it => <Item key={it.id} item={it} />)}</ul>;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-or-none-component */}
			<animated.section id="no-or-none-component" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-or-none-component</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Prevents components that inconsistently return different types (like a component or null). 
					Encourages conditional rendering instead of “Maybe” component patterns.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`function MaybeButton({ enabled }) {
	if (enabled) return <Button />;
	return null;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`{enabled && <Button />}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-transition-cssproperties */}
			<animated.section id="no-transition-cssproperties" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-transition-cssproperties</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows transitions on non-performant CSS properties (like width, height, top, left) so that it doesn't conflict with react-spring.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="css"
					codeString={`.box {
	transition: width 200ms ease;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="css"
					codeString={`.box {
	transition: transform 200ms ease;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-unnecessary-div */}
			<animated.section id="no-unnecessary-div" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-unnecessary-div</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Removes redundant wrapper &lt;div&gt; elements that add no semantic or layout value. 
					Even if they're wrapping it for style, it encourages them to move that to the child component.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`<div>
	<span>Text</span>
</div>`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`<span>Text</span>`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-unnecessary-key */}
			<animated.section id="no-unnecessary-key" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-unnecessary-key</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows keys where not needed or inappropriate (like static elements). 
					Encourages correct key usage in dynamic lists.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`<div key="static">Hello</div>`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`<div>Hello</div>`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-useless-function */}
			<animated.section id="no-useless-function" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-useless-function</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Prevents trivial wrapper functions that simply call another function without adding logic. 
					Encourages using direct references instead.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`function callFoo(...args) {
	return foo(...args);
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`foo();`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/seperate-style-files */}
			<animated.section id="seperate-style-files" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/seperate-style-files</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Requires that style definitions be located in separate files (e.g., .styles.ts or .css). 
					This keeps component logic and styling concerns separated.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`const styles = { big: { fontSize: 20 } };
export default function Comp() {
	return <div style={styles.big}>x</div>;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`// Comp.styles.ts
export const styles = { big: { fontSize: 20 } };

// Comp.tsx
import { styles } from './Comp.styles';
export default function Comp() {
	return <div style={styles.big}>x</div>;
}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/sort-exports */}
			<animated.section id="sort-exports" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/sort-exports</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Enforces alphabetical sorting of exports. 
					Variables are listed before functions for clarity and consistency.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`export function b() {}
export const a = 1;`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`export const a = 1;
export function b() {}`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/sort-keys-fixable */}
			<animated.section id="sort-keys-fixable" style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/sort-keys-fixable</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					This is just the same as the sort-keys ESLint rule with an addition. While it does enforce consistent key ordering within objects it also provides automatic fixing to sort keys alphabetically (built in function for --fix rather than manual order changes).
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`const obj = { zebra: 1, apple: 2, Beta: 3 };`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="typescript"
					codeString={`const obj = { Beta: 3, apple: 2, zebra: 1 };`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>
		</div>
	);
};

export default Eslint;