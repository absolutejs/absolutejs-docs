import { animated } from "@react-spring/web";
import { PrismPlus } from "../utils/PrismPlus";
import { ThemeProps } from "../../../types/types";
import type { ThemeSprings } from "../../../types/types";
import { useTheme } from "../../hooks/useTheme";
import { headingStyle, h2Style, h3Style, beforeAfterContainerStyle, beforeAfterColumnStyle, beforeAfterHeadingStyle, sectionStyle, ruleDescriptionStyle, introStyle } from "../../styles/styles";

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
				background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				borderRadius: '16px',
				backdropFilter: 'blur(10px)',
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
			{/* absolute/explicit-object-types */}
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/explicit-object-types</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference. 
					This makes APIs clearer and ensures structural consistency across modules.
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/localize-react-props</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Ensures all user-facing strings in React components are localized. Prevents hardcoded strings from appearing in the UI.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<Button title="Save changes" />`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<Button title={t('buttons.saveChanges')} />`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/max-depth-extended */}
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/max-depth-extended</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Restricts how deeply control structures can be nested. Encourages simpler, flatter logic. 
					The default configuration limits nesting to 1 level.
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/max-jsxnesting</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<div>
	<section>
		<article>
			<div>
				<span>
					<strong>Deep text</strong>
				</span>
			</div>
		</article>
	</section>
</div>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`function DeepText() {
	return <span><strong>Deep text</strong></span>;
}

<div>
	<section>
		<article>
			<div>
				<DeepText />
			</div>
		</article>
	</section>
</div>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/min-var-length */}
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-button-navigation</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Prevents using &lt;button&gt; elements for navigation actions. Buttons are for in-app actions; links or router components are for navigation.
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-explicit-return-type</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows explicit return types where TypeScript can infer them. Keeps code concise and avoids redundancy.
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-inline-prop-types</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows inline object literals or anonymous prop type definitions in React components. 
					Encourages stable, memoized, and typed props.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`<MyComp style={{ marginTop: 4 }} />`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`const style = { marginTop: 4 };
<MyComp style={style} />`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-multi-style-objects */}
			<animated.section style={sectionStyle(ts)}>
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
					codeString={`<div style={{ color: 'red' }} />
<div style={{ padding: 4 }} />`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`const styles = {
	redText: { color: 'red' },
	padded: { padding: 4 }
};

<div style={styles.redText} />
<div style={styles.padded} />`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-nested-jsx-return */}
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-transition-cssproperties</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Disallows transitions on non-performant CSS properties (like width, height, top, left). 
					Encourages using transform or opacity for smoother animations.
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/no-unnecessary-div</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Removes redundant wrapper &lt;div&gt; elements that add no semantic or layout value. 
					Encourages fragments or meaningful elements instead.
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
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
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
			<animated.section style={sectionStyle(ts)}>
				<animated.h2 style={h2Style(ts)}>absolute/sort-keys-fixable</animated.h2>
				<animated.p style={ruleDescriptionStyle(ts)}>
					Automatically sorts object keys in ascending order for consistency. 
					Reduces merge conflicts and improves readability.
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