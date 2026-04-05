import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const IslandsLooseVsTypedList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Loose Island</strong>: runtime-safe,
			flexible, and useful when the framework/component pairing is chosen
			dynamically.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Typed island wrappers</strong>: exact
			component names and prop shapes inferred from the registry for that
			framework.
		</li>
	</ul>
);
