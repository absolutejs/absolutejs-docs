import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ScopedStateHtmxList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>User A</strong> clicks increment 3 times
			→ sees count of 3
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>User B</strong> visits the same page →
			sees count of 0 (their own state)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>User B</strong> clicks increment → sees
			count of 1 (independent from User A)
		</li>
	</ul>
);
