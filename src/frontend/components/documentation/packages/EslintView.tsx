import { animated } from "@react-spring/web";
import React from "react";
import { PrismPlus } from "../../utils/PrismPlus";
import { ThemeProps } from "../../../../types/springTypes";
import type { ThemeSprings } from "../../../../types/springTypes";
import { useTheme } from "../../../hooks/useTheme";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { headingStyle, h2Style, h3Style, beforeAfterContainerStyle, beforeAfterColumnStyle, beforeAfterHeadingStyle, sectionStyle, ruleDescriptionStyle, introStyle, tableOfContentsStyle } from "../../../styles/styles";

export const EslintView = ({ themeSprings }: { themeSprings?: ThemeSprings }) => {
	// Use the passed themeSprings if available, otherwise fallback to current theme
	// The fallback ensures backward compatibility but the passed themeSprings should be used
	const [fallbackTS] = useTheme(undefined);
	const ts = themeSprings ?? fallbackTS;
	const { isSizeOrLess } = useMediaQuery();

	// Responsive breakpoints
	const isMobile = isSizeOrLess('sm'); // 640px and below
	const isTablet = isSizeOrLess('md'); // 768px and below

	return (
	<>
		<style>
			{`.eslint-scroll-container::-webkit-scrollbar {
				display: none;
			}`}
		</style>
		<div
			className="eslint-scroll-container"
			style={{
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
				padding: isMobile ? '0.5rem 1rem' : isTablet ? '1rem 1.5rem' : '1rem 2rem',
				overflow: 'auto',
				minHeight: 0,
				minWidth: 0, // Allow shrinking
				width: '100%', // Ensure it takes available width
				scrollbarWidth: 'none', // Firefox
				msOverflowStyle: 'none', // IE/Edge
			}}
		>
		<animated.h1 style={{ ...headingStyle(ts), textAlign: 'center', marginBottom: 32, color: ts.contrastPrimary }}>
			ESLint
		</animated.h1>
			<animated.p style={{ ...introStyle(ts), color: ts.contrastSecondary }}>
			ESLint is a static code analysis tool for identifying and fixing
			problems in JavaScript code. It helps maintain code quality and
			consistency by enforcing coding standards and best practices.
			</animated.p>

			{/* Table of Contents */}
			<animated.div style={{
				...tableOfContentsStyle(ts),
				position: 'relative', // Override the sticky positioning
				top: 'auto',
				backgroundColor: ts.themeTertiary, // Use themeTertiary which was working well in dark mode and should switch properly now
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				<animated.h2 style={{ ...h2Style(ts), marginTop: 0, marginBottom: '24px', color: ts.contrastPrimary }}>Table of Contents</animated.h2>
				<animated.div style={{ 
					display: 'flex', 
					flexDirection: isMobile ? 'column' : isTablet ? 'column' : 'row',
					gap: isMobile ? '12px' : isTablet ? '12px' : '24px',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'flex-start'
				}}>
					<animated.div style={{ 
						display: 'flex', 
						flexDirection: 'column', 
						gap: '12px',
						flex: isMobile || isTablet ? 'none' : '1',
						alignItems: 'center'
					}}>
						<animated.a href="#explicit-object-types" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/explicit-object-types</animated.a>
						<animated.a href="#localize-react-props" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/localize-react-props</animated.a>
						<animated.a href="#max-depth-extended" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/max-depth-extended</animated.a>
						<animated.a href="#max-jsxnesting" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/max-jsxnesting</animated.a>
						<animated.a href="#min-var-length" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/min-var-length</animated.a>
						<animated.a href="#no-button-navigation" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-button-navigation</animated.a>
						<animated.a href="#no-explicit-return-type" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-explicit-return-type</animated.a>
						<animated.a href="#no-inline-prop-types" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-inline-prop-types</animated.a>
						<animated.a href="#no-multi-style-objects" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-multi-style-objects</animated.a>
					</animated.div>
					<animated.div style={{ 
						display: 'flex', 
						flexDirection: 'column', 
						gap: '12px',
						flex: isMobile || isTablet ? 'none' : '1',
						alignItems: 'center'
					}}>
						<animated.a href="#no-nested-jsx-return" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-nested-jsx-return</animated.a>
						<animated.a href="#no-or-none-component" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-or-none-component</animated.a>
						<animated.a href="#no-transition-cssproperties" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-transition-cssproperties</animated.a>
						<animated.a href="#no-unnecessary-div" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-unnecessary-div</animated.a>
						<animated.a href="#no-unnecessary-key" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-unnecessary-key</animated.a>
						<animated.a href="#no-useless-function" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/no-useless-function</animated.a>
						<animated.a href="#seperate-style-files" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/seperate-style-files</animated.a>
						<animated.a href="#sort-exports" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/sort-exports</animated.a>
						<animated.a href="#sort-keys-fixable" style={{ color: ts.contrastSecondary, textDecoration: 'none', fontSize: '1.1rem', textAlign: 'center' }}>absolute/sort-keys-fixable</animated.a>
					</animated.div>
				</animated.div>
			</animated.div>
			{/* absolute/explicit-object-types */}
			<animated.section id="explicit-object-types" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/explicit-object-types</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					Requires objects to have explicit TypeScript type annotations instead of relying on implicit inference. 
					This is meant for stricter definitions of objects so the type can be reused. Note that `as const` is allowed here because it gives the object a constant shape.
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
			<animated.section id="localize-react-props" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/localize-react-props</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					This rule encourages keeping component logic and data as close to where they’re used as possible. If a variable is only used as a prop for a single component, it should be defined inside that component rather than being passed down as a prop.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const x = 5;

<MyComponent value={x} />;`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const MyComponent = () => {
  const value = 5;
  return <div>{value}</div>;
};`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/max-depth-extended */}
			<animated.section id="max-depth-extended" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/max-depth-extended</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="max-jsxnesting" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/max-jsxnesting</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="min-var-length" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/min-var-length</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="no-button-navigation" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-button-navigation</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
				This rule prevents using button clicks (or other UI event handlers) to directly manipulate the browser’s navigator object. In other words, you shouldn’t perform navigation actions like window.location, navigator.pushState, or similar operations inside button event handlers.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<button onClick={() => (window.location.href = '/home')}>
  Go Home
</button>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`<Button onClick={handleNavigateToHome}>Go Home</Button>`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-explicit-return-type */}
			<animated.section id="no-explicit-return-type" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-explicit-return-type</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
				This rule disallows adding explicit return type annotations to functions when TypeScript can already infer the type automatically. TypeScript’s type inference system is highly accurate and adapts as your code changes — meaning that explicitly declaring return types in these cases can make your code more rigid and harder to maintain.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const getUserName = (user: User): string => {
  return user.name;
};`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="typescript"
							codeString={`const getUserName = (user: User) => {
  return user.name;
};`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-inline-prop-types */}
			<animated.section id="no-inline-prop-types" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-inline-prop-types</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
				Enforces the use of named or predefined types for component props, preventing the use of inline type definitions when passing props.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`type Props = {
  style: { marginTop: number };
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`type StyleProps = {
  marginTop: number;
};

type Props = {
  style: StyleProps;
};

const MyComp = ({ style }: Props) => <div style={style} />;`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-multi-style-objects */}
			<animated.section id="no-multi-style-objects" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-multi-style-objects</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					Ensures style objects are centralized and reused rather than scattered across the component. 
					Improves maintainability and performance.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
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
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
						<PrismPlus
							language="tsx"
							codeString={`const redBox = { color: 'red', padding: 4 };
const blueBox = { color: 'blue', margin: 8 };
const greenBox = { color: 'green', border: '1px solid' };

<div style={redBox} />
<div style={blueBox} />
<div style={greenBox} />`}
							themeSprings={ts}
							showLineNumbers={false}
						/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-nested-jsx-return */}
			<animated.section id="no-nested-jsx-return" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-nested-jsx-return</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					This rule prevents returning multiple nested elements inside a loop (like .map()). When rendering lists, each loop should return only one top-level element. If you need to return something more complex, move it into its own component to keep your code clean and easy to understand.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
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
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
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
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-or-none-component */}
			<animated.section id="no-or-none-component" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-or-none-component</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					Prevents components that inconsistently return different types (like a component or null). 
					Encourages conditional rendering instead of “Maybe” component patterns.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`const MaybeButton({ enabled }) {
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
			<animated.section id="no-transition-cssproperties" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-transition-cssproperties</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					This rule prevents using the transition CSS property completely. Using CSS transitions can interfere with React Spring’s animation system, causing unexpected or broken animations. All animations and transitions should be handled through React Spring instead of native CSS transitions.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="css"
					codeString={`<div style={{ transition: 'all 0.3s ease' }} />`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>After</animated.h3>
				<PrismPlus
					language="css"
					codeString={`import { animated } from '@react-spring/web';

const Box = () => <animated.div style={{ opacity: 1 }} />;`}
					themeSprings={ts}
					showLineNumbers={false}
				/>
					</div>
				</div>
			</animated.section>

			{/* absolute/no-unnecessary-div */}
			<animated.section id="no-unnecessary-div" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-unnecessary-div</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					This rule removes unnecessary wrapper &lt;div&gt elements that don’t provide meaningful structure or purpose.
					If a wrapper is only used for styling, that styling should be moved into the child component instead.
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
			<animated.section id="no-unnecessary-key" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-unnecessary-key</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="no-useless-function" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/no-useless-function</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="seperate-style-files" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/seperate-style-files</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
					Requires that style definitions be located in separate files (e.g., .styles.ts or .css). 
					This keeps component logic and styling concerns separated.
				</animated.p>
				<div style={beforeAfterContainerStyle}>
					<div style={beforeAfterColumnStyle}>
						<animated.h3 style={beforeAfterHeadingStyle(ts)}>Before</animated.h3>
				<PrismPlus
					language="tsx"
					codeString={`// Comp.tsx
const styles = {
  big: { fontSize: 20 },
};

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
export const big = { fontSize: 20 };

// Comp.tsx
import * as styles from './Comp.styles';

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
			<animated.section id="sort-exports" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/sort-exports</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
			<animated.section id="sort-keys-fixable" style={{
				...sectionStyle(ts),
				overflow: 'visible', // Override overflow hidden to show content
				backgroundColor: ts.themeTertiary // Use themeTertiary which was working well in dark mode and should switch properly now
			}}>
				<animated.h2 style={{ ...h2Style(ts), color: ts.contrastPrimary }}>absolute/sort-keys-fixable</animated.h2>
				<animated.p style={{ ...ruleDescriptionStyle(ts), color: ts.contrastSecondary }}>
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
	</>
	);
};
