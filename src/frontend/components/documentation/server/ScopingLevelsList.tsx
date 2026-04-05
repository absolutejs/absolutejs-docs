import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ScopingLevelsList = () => (
	<ul style={{ ...listStyle, marginBottom: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>local</strong> (default): Hooks stay in
			the current plugin instance and its descendants.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>scoped</strong>: Hooks propagate one
			level up to the parent instance.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>global</strong>: Hooks apply to all
			instances everywhere.
		</li>
	</ul>
);
