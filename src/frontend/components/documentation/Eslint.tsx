const Eslint = () => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			padding: '1rem 2rem',
			gap: '1.5rem'
		}}
	>
		<h1>ESLint Rules</h1>
		<p>
			AbsoluteJS includes first-class support for ESLint to help you maintain clean, consistent, and bug-free code. 
			With the built-in configuration, you can easily enforce best practices and align your project’s style across the team. 
			The setup is optimized for modern JavaScript and TypeScript workflows, ensuring smooth integration with your development environment. 
			You can also extend or override the default rules to fit your team’s specific coding standards.
		</p>
        {/* absolute/explicit-object-types */}
		<section>
			<h2>absolute/explicit-object-types</h2>
			<p>
				Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference. 
				This makes APIs clearer and ensures structural consistency across modules.
			</p>
			<h3>Before</h3>
			<pre><code>{`export const defaultConfig = {
                maxUsers: 10,
                name: "app"
            };`}</code></pre>
			<h3>After</h3>
			<pre><code>{`type Config = {
                maxUsers: number;
                name: string;
                };

                export const defaultConfig: Config = {
                maxUsers: 10,
                name: "app"
                };`}</code></pre>
		</section>

		{/* absolute/localize-react-props */}
		<section>
			<h2>absolute/localize-react-props</h2>
			<p>
				Ensures all user-facing strings in React components are localized. Prevents hardcoded strings from appearing in the UI.
			</p>
			<h3>Before</h3>
			<pre><code>{`<Button title="Save changes" />`}</code></pre>
			<h3>After</h3>
			<pre><code>{`<Button title={t('buttons.saveChanges')} />`}</code></pre>
		</section>

		{/* absolute/max-depth-extended */}
		<section>
			<h2>absolute/max-depth-extended</h2>
			<p>
				Restricts how deeply control structures can be nested. Encourages simpler, flatter logic. 
				The default configuration limits nesting to 1 level.
			</p>
			<h3>Before</h3>
			<pre><code>{`if (a) {
  if (b) {
    doThing();
  }
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`if (!a) return;
if (!b) return;
doThing();`}</code></pre>
		</section>

		{/* absolute/max-jsxnesting */}
		<section>
			<h2>absolute/max-jsxnesting</h2>
			<p>
				Limits JSX nesting depth to improve readability and maintainability. Deeply nested markup should be broken into smaller components.
			</p>
			<h3>Before</h3>
			<pre><code>{`<div>
  <section>
    <article>
      <div>
        <span>
          <strong>Deep text</strong>
        </span>
      </div>
    </article>
  </section>
</div>`}</code></pre>
			<h3>After</h3>
			<pre><code>{`function DeepText() {
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
</div>`}</code></pre>
		</section>

		{/* absolute/min-var-length */}
		<section>
			<h2>absolute/min-var-length</h2>
			<p>
				Enforces a minimum variable name length (default: 3). Improves readability and discourages overly short variable names.
			</p>
			<h3>Before</h3>
			<pre><code>{`const x = fetchData();`}</code></pre>
			<h3>After</h3>
			<pre><code>{`const result = fetchData();`}</code></pre>
		</section>

		{/* absolute/no-button-navigation */}
		<section>
			<h2>absolute/no-button-navigation</h2>
			<p>
				Prevents using &lt;button&gt; elements for navigation actions. Buttons are for in-app actions; links or router components are for navigation.
			</p>
			<h3>Before</h3>
			<pre><code>{`<button onClick={() => router.push('/docs')}>Docs</button>`}</code></pre>
			<h3>After</h3>
			<pre><code>{`<Link to="/docs">Docs</Link>`}</code></pre>
		</section>

		{/* absolute/no-explicit-return-type */}
		<section>
			<h2>absolute/no-explicit-return-type</h2>
			<p>
				Disallows explicit return types where TypeScript can infer them. Keeps code concise and avoids redundancy.
			</p>
			<h3>Before</h3>
			<pre><code>{`function add(a: number, b: number): number {
  return a + b;
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`function add(a: number, b: number) {
  return a + b;
}`}</code></pre>
		</section>

		{/* absolute/no-inline-prop-types */}
		<section>
			<h2>absolute/no-inline-prop-types</h2>
			<p>
				Disallows inline object literals or anonymous prop type definitions in React components. 
				Encourages stable, memoized, and typed props.
			</p>
			<h3>Before</h3>
			<pre><code>{`<MyComp style={{ marginTop: 4 }} />`}</code></pre>
			<h3>After</h3>
			<pre><code>{`const style = { marginTop: 4 };
<MyComp style={style} />`}</code></pre>
		</section>

		{/* absolute/no-multi-style-objects */}
		<section>
			<h2>absolute/no-multi-style-objects</h2>
			<p>
				Ensures style objects are centralized and reused rather than scattered across the component. 
				Improves maintainability and performance.
			</p>
			<h3>Before</h3>
			<pre><code>{`<div style={{ color: 'red' }} />
<div style={{ padding: 4 }} />`}</code></pre>
			<h3>After</h3>
			<pre><code>{`const styles = {
  redText: { color: 'red' },
  padded: { padding: 4 }
};

<div style={styles.redText} />
<div style={styles.padded} />`}</code></pre>
		</section>

		{/* absolute/no-nested-jsx-return */}
		<section>
			<h2>absolute/no-nested-jsx-return</h2>
			<p>
				Prevents defining JSX-returning functions inside render logic. Encourages extracting those into separate components.
			</p>
			<h3>Before</h3>
			<pre><code>{`function List({ items }) {
  return (
    <ul>{items.map(item => {
      return <li>{() => <span>{item.name}</span>}</li>;
    })}</ul>
  );
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`function Item({ item }) {
  return <li>{item.name}</li>;
}

function List({ items }) {
  return <ul>{items.map(it => <Item key={it.id} item={it} />)}</ul>;
}`}</code></pre>
		</section>

		{/* absolute/no-or-none-component */}
		<section>
			<h2>absolute/no-or-none-component</h2>
			<p>
				Prevents components that inconsistently return different types (like a component or null). 
				Encourages conditional rendering instead of “Maybe” component patterns.
			</p>
			<h3>Before</h3>
			<pre><code>{`function MaybeButton({ enabled }) {
  if (enabled) return <Button />;
  return null;
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`{enabled && <Button />}`}</code></pre>
		</section>

		{/* absolute/no-transition-cssproperties */}
		<section>
			<h2>absolute/no-transition-cssproperties</h2>
			<p>
				Disallows transitions on non-performant CSS properties (like width, height, top, left). 
				Encourages using transform or opacity for smoother animations.
			</p>
			<h3>Before</h3>
			<pre><code>{`.box {
  transition: width 200ms ease;
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`.box {
  transition: transform 200ms ease;
}`}</code></pre>
		</section>

		{/* absolute/no-unnecessary-div */}
		<section>
			<h2>absolute/no-unnecessary-div</h2>
			<p>
				Removes redundant wrapper &lt;div&gt; elements that add no semantic or layout value. 
				Encourages fragments or meaningful elements instead.
			</p>
			<h3>Before</h3>
			<pre><code>{`<div>
  <span>Text</span>
</div>`}</code></pre>
			<h3>After</h3>
			<pre><code>{`<span>Text</span>`}</code></pre>
		</section>

		{/* absolute/no-unnecessary-key */}
		<section>
			<h2>absolute/no-unnecessary-key</h2>
			<p>
				Disallows keys where not needed or inappropriate (like static elements). 
				Encourages correct key usage in dynamic lists.
			</p>
			<h3>Before</h3>
			<pre><code>{`<div key="static">Hello</div>`}</code></pre>
			<h3>After</h3>
			<pre><code>{`<div>Hello</div>`}</code></pre>
		</section>

		{/* absolute/no-useless-function */}
		<section>
			<h2>absolute/no-useless-function</h2>
			<p>
				Prevents trivial wrapper functions that simply call another function without adding logic. 
				Encourages using direct references instead.
			</p>
			<h3>Before</h3>
			<pre><code>{`function callFoo(...args) {
  return foo(...args);
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`foo();`}</code></pre>
		</section>

		{/* absolute/seperate-style-files */}
		<section>
			<h2>absolute/seperate-style-files</h2>
			<p>
				Requires that style definitions be located in separate files (e.g., .styles.ts or .css). 
				This keeps component logic and styling concerns separated.
			</p>
			<h3>Before</h3>
			<pre><code>{`const styles = { big: { fontSize: 20 } };
export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}</code></pre>
			<h3>After</h3>
			<pre><code>{`// Comp.styles.ts
export const styles = { big: { fontSize: 20 } };

// Comp.tsx
import { styles } from './Comp.styles';
export default function Comp() {
  return <div style={styles.big}>x</div>;
}`}</code></pre>
		</section>

		{/* absolute/sort-exports */}
		<section>
			<h2>absolute/sort-exports</h2>
			<p>
				Enforces alphabetical sorting of exports. 
				Variables are listed before functions for clarity and consistency.
			</p>
			<h3>Before</h3>
			<pre><code>{`export function b() {}
export const a = 1;`}</code></pre>
			<h3>After</h3>
			<pre><code>{`export const a = 1;
export function b() {}`}</code></pre>
		</section>

		{/* absolute/sort-keys-fixable */}
		<section>
			<h2>absolute/sort-keys-fixable</h2>
			<p>
				Automatically sorts object keys in ascending order for consistency. 
				Reduces merge conflicts and improves readability.
			</p>
			<h3>Before</h3>
			<pre><code>{`const obj = { zebra: 1, apple: 2, Beta: 3 };`}</code></pre>
			<h3>After</h3>
			<pre><code>{`const obj = { Beta: 3, apple: 2, zebra: 1 };`}</code></pre>
		</section>
	</div>
);

export default Eslint;