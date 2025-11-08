import { animated } from "@react-spring/web";
import { ThemeProps, ThemeSprings } from "../../../../types/springTypes";
import { useTabSprings } from "../../../hooks/springs/useTabSprings";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import * as styles from "../../../styles/docsStyles";
import { CodeSlider } from "../../home/CodeSlider";
import { PrismPlus } from "../../utils/PrismPlus";
import { TableOfContents, TocItem } from "../../utils/TableOfContents";

const tocItems: TocItem[] = [
	{ href: "#explicit-object-types", label: "explicit-object-types" },
	{ href: "#localize-react-props", label: "localize-react-props" },
	{ href: "#max-depth-extended", label: "max-depth-extended" },
	{ href: "#max-jsxnesting", label: "max-jsxnesting" },
	{ href: "#min-var-length", label: "min-var-length" },
	{ href: "#no-button-navigation", label: "no-button-navigation" },
	{ href: "#no-explicit-return-type", label: "no-explicit-return-type" },
	{ href: "#no-inline-prop-types", label: "no-inline-prop-types" },
	{ href: "#no-multi-style-objects", label: "no-multi-style-objects" },
	{ href: "#no-nested-jsx-return", label: "no-nested-jsx-return" },
	{ href: "#no-or-none-component", label: "no-or-none-component" },
	{ href: "#no-transition-cssproperties", label: "no-transition-cssproperties" },
	{ href: "#no-unnecessary-div", label: "no-unnecessary-div" },
	{ href: "#no-unnecessary-key", label: "no-unnecessary-key" },
	{ href: "#no-useless-function", label: "no-useless-function" },
	{ href: "#seperate-style-files", label: "seperate-style-files" },
	{ href: "#sort-exports", label: "sort-exports" },
	{ href: "#sort-keys-fixable", label: "sort-keys-fixable" }
];

interface BeforeAfterContainerProps {
	beforeCode: string;
	afterCode: string;
	themeSprings: ThemeSprings;
}

const BeforeAfterContainer = ({ beforeCode, afterCode, themeSprings }: BeforeAfterContainerProps) => {
	const { handleTabClick, currentTab, sliderSprings } = useTabSprings(2);

	return (
		<>
			<CodeSlider
				handleTabClick={handleTabClick}
				sliderSprings={sliderSprings}
				tabs={["Before", "After"]}
				themeSprings={themeSprings}
			/>
			<PrismPlus
				codeString={currentTab === 0 ? beforeCode : afterCode}
				language="typescript"
				showLineNumbers={false}
				themeSprings={themeSprings}
			/>
		</>
	)
}

export const EslintView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: "flex", flex: 1, overflowX: "hidden", overflowY: "auto", position: "relative"
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
					<BeforeAfterContainer
						beforeCode={`export const defaultConfig = {
	maxUsers: 10,
	name: "app"
};`}
						afterCode={`type Config = {
	maxUsers: number;
	name: string;
};

export const defaultConfig: Config = {
	maxUsers: 10,
	name: "app"
};`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/localize-react-props */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="localize-react-props">
						absolute/localize-react-props
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule encourages keeping component logic and data as close to where they're used as possible. If a variable is only used as a prop for a single component, it should be defined inside that component rather than being passed down as a prop.
					</p>
					<BeforeAfterContainer
						beforeCode={`const x = 5;

<MyComponent value={x} />;`}
						afterCode={`const MyComponent = () => {
  const value = 5;
  return <div>{value}</div>;
};`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/max-depth-extended */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="max-depth-extended">
						absolute/max-depth-extended
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This is the exact same rule as max-depth from ESLint except it allows you to break the max-depth if you exit early via a return or throw statement.
					</p>
					<BeforeAfterContainer
						beforeCode={`\
if (a) {
	if (b) {
		doThing();
	}
}`}
						afterCode={`\
if (!a) return;
if (!b) return;
doThing();`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/max-jsxnesting */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="max-jsxnesting">
						absolute/max-jsxnesting
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.
					</p>
					<BeforeAfterContainer
						beforeCode={`const MyComponent = () => (
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
						afterCode={`const DeepText = () => (
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
					/>
				</section>

				{/* absolute/min-var-length */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="min-var-length">
						absolute/min-var-length
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Enforces a minimum variable name length, like default: 3. Improves readability and discourages overly short variable names.
					</p>
					<BeforeAfterContainer
						beforeCode={`const x = fetchData();`}
						afterCode={`const result = fetchData();`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-button-navigation */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-button-navigation">
						absolute/no-button-navigation
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule prevents using button clicks, or other UI event handlers, to directly manipulate the browser's navigator object. In other words, you shouldn't perform navigation actions like window.location, navigator.pushState, or similar operations inside button event handlers.
					</p>
					<BeforeAfterContainer
						beforeCode={`<button onClick={() => (window.location.href = '/home')}>
	Go Home
</button>`}
						afterCode={`<Button onClick={handleNavigateToHome}>Go Home</Button>`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-explicit-return-type */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-explicit-return-type">
						absolute/no-explicit-return-type
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule disallows adding explicit return type annotations to functions when TypeScript can already infer the type automatically. TypeScript's type inference system is highly accurate and adapts as your code changes — meaning that explicitly declaring return types in these cases can make your code more rigid and harder to maintain.
					</p>
					<BeforeAfterContainer
						beforeCode={`const getUserName = (user: User): string => {
  return user.name;
};`}
						afterCode={`const getUserName = (user: User) => {
  return user.name;
};`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-inline-prop-types */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-inline-prop-types">
						absolute/no-inline-prop-types
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Enforces the use of named or predefined types for component props, preventing the use of inline type definitions when passing props.
					</p>
					<BeforeAfterContainer
						beforeCode={`type Props = {
  style: { marginTop: number };
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
						afterCode={`type StyleProps = {
  marginTop: number;
};

type Props = {
  style: StyleProps;
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-multi-style-objects */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-multi-style-objects">
						absolute/no-multi-style-objects
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Ensures style objects are centralized and reused rather than scattered across the component.
						Improves maintainability and performance.
					</p>
					<BeforeAfterContainer
						beforeCode={`const styles = {
  redBox: { color: 'red', padding: 4 },
  blueBox: { color: 'blue', margin: 8 },
  greenBox: { color: 'green', border: '1px solid' },
};

<div style={styles.redBox} />
<div style={styles.blueBox} />
<div style={styles.greenBox} />`}
						afterCode={`const redBox = { color: 'red', padding: 4 };
const blueBox = { color: 'blue', margin: 8 };
const greenBox = { color: 'green', border: '1px solid' };

<div style={redBox} />
<div style={blueBox} />
<div style={greenBox} />`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-nested-jsx-return */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-nested-jsx-return">
						absolute/no-nested-jsx-return
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule prevents returning multiple nested elements inside a loop, like .map(). When rendering lists, each loop should return only one top-level element. If you need to return something more complex, move it into its own component to keep your code clean and easy to understand.
					</p>
					<BeforeAfterContainer
						beforeCode={`const items = ['apple', 'banana', 'cherry'];

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
						afterCode={`const items = ['apple', 'banana', 'cherry'];

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
					/>
				</section>

				{/* absolute/no-or-none-component */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-or-none-component">
						absolute/no-or-none-component
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Prevents components that inconsistently return different types, like a component or null.
						Encourages conditional rendering instead of “Maybe” component patterns.
					</p>
					<BeforeAfterContainer
						beforeCode={`const MaybeButton({ enabled }) {
	if (enabled) return <Button />;
	return null;
}`}
						afterCode={`{enabled && <Button />}`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-transition-cssproperties */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-transition-cssproperties">
						absolute/no-transition-cssproperties
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule prevents using the transition CSS property completely. Using CSS transitions can interfere with React Spring's animation system, causing unexpected or broken animations. All animations and transitions should be handled through React Spring instead of native CSS transitions.
					</p>
					<BeforeAfterContainer
						beforeCode={`const styles = {
	box: {
		transition: 'all 0.3s ease',
		backgroundColor: 'blue',
		height: '100px',
		width: '100px',
	},
};`}
						afterCode={`const styles = {
	box: {
		backgroundColor: 'blue',
		height: '100px',
		width: '100px',
	},
};`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-unnecessary-div */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)}>absolute/no-unnecessary-div</animated.h2>
					<p style={styles.paragraphStyle}>
						This rule removes unnecessary wrapper &lt;div&gt; elements that don't provide meaningful structure or purpose.
						If a wrapper is only used for styling, that styling should be moved into the child component instead.
					</p>
					<BeforeAfterContainer
						beforeCode={`<div>
	<span>Text</span>
</div>`}
						afterCode={`<span>Text</span>`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-unnecessary-key */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-unnecessary-key">
						absolute/no-unnecessary-key
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Disallows keys where not needed or inappropriate, like static elements.
						Encourages correct key usage in dynamic lists.
					</p>
					<BeforeAfterContainer
						beforeCode={`<div key="static">Hello</div>`}
						afterCode={`<div>Hello</div>`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/no-useless-function */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="no-useless-function">
						absolute/no-useless-function
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Prevents trivial wrapper functions that simply call another function without adding logic.
						Encourages using direct references instead.
					</p>
					<BeforeAfterContainer
						beforeCode={`function callFoo(...args) {
	return foo(...args);
}`}
						afterCode={`foo();`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/seperate-style-files */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="seperate-style-files">
						absolute/seperate-style-files
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Requires that style definitions be located in separate files, like .styles.ts or .css.
						This keeps component logic and styling concerns separated.
					</p>
					<BeforeAfterContainer
						beforeCode={`// Comp.tsx
const styles = {
  big: { fontSize: 20 },
};

export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}
						afterCode={`// Comp.styles.ts
export const big = { fontSize: 20 };

// Comp.tsx
import * as styles from './Comp.styles';

export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/sort-exports */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="sort-exports">
						absolute/sort-exports
					</animated.h2>
					<p style={styles.paragraphStyle}>
						Sorts exports alphabetically to improve code organization and maintainability.
						Encourages a consistent and predictable export order.
					</p>
					<BeforeAfterContainer
						beforeCode={`export function b() {}
export const a = 1;`}
						afterCode={`export const a = 1;
export function b() {}`}
						themeSprings={themeSprings}
					/>
				</section>

				{/* absolute/sort-keys-fixable */}
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="sort-keys-fixable">
						absolute/sort-keys-fixable
					</animated.h2>
					<p style={styles.paragraphStyle}>
						This is just the same as the sort-keys ESLint rule with an addition. While it does enforce consistent key ordering within objects it also provides automatic fixing to sort keys alphabetically, the built in function for --fix rather than manual order changes.
					</p>
					<BeforeAfterContainer
						beforeCode={`const obj = { zebra: 1, apple: 2, Beta: 3 };`}
						afterCode={`const obj = { Beta: 3, apple: 2, zebra: 1 };`}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{!isMobile && <TableOfContents items={tocItems} themeSprings={themeSprings} />}
		</div>
	);
}