import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const IslandsHydrationModesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>load</strong>: hydrate immediately after
			bootstrap.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>idle</strong>: wait for browser idle
			time.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>visible</strong>: wait until the island
			enters the viewport.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>none</strong>: render SSR HTML only with
			no client hydration.
		</li>
	</ul>
);
