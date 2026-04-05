import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const IslandsOverviewList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Host pages stay simple</strong>: render
			normal SSR pages and drop islands in where you need client behavior.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Cross-framework is normal</strong>: a
			React host can render Vue, Svelte, or Angular islands.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>State is store-first</strong>: islands
			do not take state keys in their props. Shared state comes from
			importing the same island store across components.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Zustand powers the store layer</strong>:
			AbsoluteJS uses <code>zustand/vanilla</code> underneath and exposes
			framework-specific selectors on top.
		</li>
	</ul>
);
