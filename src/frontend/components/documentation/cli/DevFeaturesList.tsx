import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const DevFeaturesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>HMR</strong>: Hot module replacement for
			React, Svelte, Vue, Angular, HTML, and HTMX
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Module server</strong> : Unbundled
			source serving for fast refresh
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Error overlay</strong> : Compilation and
			runtime errors displayed in the browser
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>File watching</strong> : Automatic
			rebuild on file changes
		</li>
	</ul>
);
