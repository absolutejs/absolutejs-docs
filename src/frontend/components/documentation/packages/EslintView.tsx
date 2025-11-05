import { animated } from "@react-spring/web";
import { PrismPlus } from "../../utils/PrismPlus";
import { ThemeProps } from "../../../../types/springTypes";
import * as styles from "../../../styles/docsStyles";
import { TableOfContents, TocItem } from "../../utils/TableOfContents";
import { CSSProperties } from "react";

const tocItems: TocItem[] = [
	{ label: "explicit-object-types", href: "#explicit-object-types" },
	{ label: "localize-react-props", href: "#localize-react-props" },
	{ label: "max-depth-extended", href: "#max-depth-extended" },
	{ label: "max-jsxnesting", href: "#max-jsxnesting" },
	{ label: "min-var-length", href: "#min-var-length" },
	{ label: "no-button-navigation", href: "#no-button-navigation" },
	{ label: "no-explicit-return-type", href: "#no-explicit-return-type" },
	{ label: "no-inline-prop-types", href: "#no-inline-prop-types" },
	{ label: "no-multi-style-objects", href: "#no-multi-style-objects" },
	{ label: "no-nested-jsx-return", href: "#no-nested-jsx-return" },
	{ label: "no-or-none-component", href: "#no-or-none-component" },
	{ label: "no-transition-cssproperties", href: "#no-transition-cssproperties" },
	{ label: "no-unnecessary-div", href: "#no-unnecessary-div" },
	{ label: "no-unnecessary-key", href: "#no-unnecessary-key" },
	{ label: "no-useless-function", href: "#no-useless-function" },
	{ label: "seperate-style-files", href: "#seperate-style-files" },
	{ label: "sort-exports", href: "#sort-exports" },
	{ label: "sort-keys-fixable", href: "#sort-keys-fixable" }
];

const beforeAfterContainerStyle: CSSProperties = {
	display: "flex",
	flex: 1,
	justifyContent: "space-between",
	gap: "1rem"
}

export const EslintView = ({ themeSprings }: ThemeProps) => (
	// TODO: Fix div sizing (main content overflowing to table of contents due to codeblocks)
	<div
		style={{
			display: "flex",
			flex: 1,
			position: "relative",
			overflowX: "hidden",
			overflowY: "auto"
		}}
	>
		<div style={styles.mainContentStyle}>
			<h1 style={styles.h1Style}>
				ESLint
			</h1>
			<p style={styles.paragraphLargeStyle}>
				ESLint is a static code analysis tool for identifying and fixing
				problems in JavaScript code. It helps maintain code quality and
				consistency by enforcing coding standards and best practices.
			</p>

			{/* absolute/explicit-object-types */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="explicit-object-types">
					absolute/explicit-object-types
				</animated.h2>
				<p style={styles.paragraphStyle}>
					Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference.
					This is meant for stricter definitions of objects so the type can be reused. Note that `as const` is allowed here because it gives the object a constant shape.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`export const defaultConfig = {
	maxUsers: 10,
	name: "app"
};`}
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>
				</div>
				<div>
					<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
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
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>
				</div>
				</div>
			</section>

			{/* absolute/localize-react-props */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="localize-react-props">
					absolute/localize-react-props
				</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule encourages keeping component logic and data as close to where they're used as possible. If a variable is only used as a prop for a single component, it should be defined inside that component rather than being passed down as a prop.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const x = 5;

<MyComponent value={x} />;`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const MyComponent = () => {
  const value = 5;
  return <div>{value}</div>;
};`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/max-depth-extended */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/max-depth-extended</animated.h2>
				<p style={styles.paragraphStyle}>
					This is the exact same rule as max-depth from ESLint except it allows you to break the max-depth if you exit early via a return or throw statement.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`if (a) {
	if (b) {
		doThing();
	}
}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`if (!a) return;
if (!b) return;
doThing();`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/max-jsxnesting */}
			<section id="max-jsxnesting" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/max-jsxnesting</animated.h2>
				<p style={styles.paragraphStyle}>
					Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
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
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div>
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
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
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/min-var-length */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="min-var-length">absolute/min-var-length</animated.h2>
				<p style={styles.paragraphStyle}>
					Enforces a minimum variable name length, like default: 3. Improves readability and discourages overly short variable names.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const x = fetchData();`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const result = fetchData();`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-button-navigation */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="no-button-navigation">absolute/no-button-navigation</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule prevents using button clicks, or other UI event handlers, to directly manipulate the browser's navigator object. In other words, you shouldn't perform navigation actions like window.location, navigator.pushState, or similar operations inside button event handlers.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<button onClick={() => (window.location.href = '/home')}>
  Go Home
</button>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<Button onClick={handleNavigateToHome}>Go Home</Button>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-explicit-return-type */}
			<section id="no-explicit-return-type" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-explicit-return-type</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule disallows adding explicit return type annotations to functions when TypeScript can already infer the type automatically. TypeScript's type inference system is highly accurate and adapts as your code changes — meaning that explicitly declaring return types in these cases can make your code more rigid and harder to maintain.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const getUserName = (user: User): string => {
  return user.name;
};`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const getUserName = (user: User) => {
  return user.name;
};`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-inline-prop-types */}
			<section id="no-inline-prop-types" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-inline-prop-types</animated.h2>
				<p style={styles.paragraphStyle}>
					Enforces the use of named or predefined types for component props, preventing the use of inline type definitions when passing props.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`type Props = {
  style: { marginTop: number };
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`type StyleProps = {
  marginTop: number;
};

type Props = {
  style: StyleProps;
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-multi-style-objects */}
			<section id="no-multi-style-objects" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-multi-style-objects</animated.h2>
				<p style={styles.paragraphStyle}>
					Ensures style objects are centralized and reused rather than scattered across the component.
					Improves maintainability and performance.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const styles = {
  redBox: { color: 'red', padding: 4 },
  blueBox: { color: 'blue', margin: 8 },
  greenBox: { color: 'green', border: '1px solid' },
};

<div style={styles.redBox} />
<div style={styles.blueBox} />
<div style={styles.greenBox} />`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const redBox = { color: 'red', padding: 4 };
const blueBox = { color: 'blue', margin: 8 };
const greenBox = { color: 'green', border: '1px solid' };

<div style={redBox} />
<div style={blueBox} />
<div style={greenBox} />`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-nested-jsx-return */}
			<section id="no-nested-jsx-return" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-nested-jsx-return</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule prevents returning multiple nested elements inside a loop, like .map(). When rendering lists, each loop should return only one top-level element. If you need to return something more complex, move it into its own component to keep your code clean and easy to understand.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const items = ['apple', 'banana', 'cherry'];

const List = () => (
  <div>
    {items.map((item) => (
      <div>
        <h3>{item}</h3>
        <p>Delicious fruit</p>
      </div>
    ))}
  </div>
);`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const items = ['apple', 'banana', 'cherry'];

const FruitItem = ({ name }: { name: string }) => (
  <div>
    <h3>{name}</h3>
    <p>Delicious fruit</p>
  </div>
);

const List = () => (
  <div>
    {items.map((item) => (
      <FruitItem key={item} name={item} />
    ))}
  </div>
);`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-or-none-component */}
			<section id="no-or-none-component" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-or-none-component</animated.h2>
				<p style={styles.paragraphStyle}>
					Prevents components that inconsistently return different types, like a component or null.
					Encourages conditional rendering instead of “Maybe” component patterns.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const MaybeButton({ enabled }) {
	if (enabled) return <Button />;
	return null;
}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`{enabled && <Button />}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-transition-cssproperties */}
			<section id="no-transition-cssproperties" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-transition-cssproperties</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule prevents using the transition CSS property completely. Using CSS transitions can interfere with React Spring's animation system, causing unexpected or broken animations. All animations and transitions should be handled through React Spring instead of native CSS transitions.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="css"
							codeString={`<div style={{ transition: 'all 0.3s ease' }} />`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="css"
							codeString={`import { animated } from '@react-spring/web';

const Box = () => <animated.div style={{ opacity: 1 }} />;`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-unnecessary-div */}
			<section id="no-unnecessary-div" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-unnecessary-div</animated.h2>
				<p style={styles.paragraphStyle}>
					This rule removes unnecessary wrapper &lt;div&gt elements that don't provide meaningful structure or purpose.
					If a wrapper is only used for styling, that styling should be moved into the child component instead.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<div>
	<span>Text</span>
</div>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<span>Text</span>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-unnecessary-key */}
			<section id="no-unnecessary-key" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-unnecessary-key</animated.h2>
				<p style={styles.paragraphStyle}>
					Disallows keys where not needed or inappropriate, like static elements.
					Encourages correct key usage in dynamic lists.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<div key="static">Hello</div>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<div>Hello</div>`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/no-useless-function */}
			<section id="no-useless-function" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-useless-function</animated.h2>
				<p style={styles.paragraphStyle}>
					Prevents trivial wrapper functions that simply call another function without adding logic.
					Encourages using direct references instead.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`function callFoo(...args) {
	return foo(...args);
}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`foo();`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/seperate-style-files */}
			<section id="seperate-style-files" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/seperate-style-files</animated.h2>
				<p style={styles.paragraphStyle}>
					Requires that style definitions be located in separate files, like .styles.ts or .css.
					This keeps component logic and styling concerns separated.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`// Comp.tsx
const styles = {
  big: { fontSize: 20 },
};

export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`// Comp.styles.ts
export const big = { fontSize: 20 };

// Comp.tsx
import * as styles from './Comp.styles';

export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/sort-exports */}
			<section id="sort-exports" style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/sort-exports</animated.h2>
				<p style={styles.paragraphStyle}>
					Enforces alphabetical sorting of exports.
					Variables are listed before functions for clarity and consistency.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`export function b() {}
export const a = 1;`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`export const a = 1;
export function b() {}`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>

			{/* absolute/sort-keys-fixable */}
			<section style={styles.sectionStyle}>
				<animated.h2 style={styles.headingStyle(themeSprings)}id="sort-keys-fixable">absolute/sort-keys-fixable</animated.h2>
				<p style={styles.paragraphLargeStyle}>
					This is just the same as the sort-keys ESLint rule with an addition. While it does enforce consistent key ordering within objects it also provides automatic fixing to sort keys alphabetically, the built in function for --fix rather than manual order changes.
				</p>
				<div style={beforeAfterContainerStyle}>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const obj = { zebra: 1, apple: 2, Beta: 3 };`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
					<div >
						<animated.h3 style={styles.headingStyle(themeSprings)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const obj = { Beta: 3, apple: 2, zebra: 1 };`}
							themeSprings={themeSprings}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</section>
		</div>
		<TableOfContents items={tocItems} themeSprings={themeSprings} />
	</div>
);