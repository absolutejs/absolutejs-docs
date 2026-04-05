import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ErrorBoundariesConventionFilesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>error.tsx</strong> : default error page
			for all pages in that framework directory
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Page.error.tsx</strong> : page-specific
			error boundary that overrides the default for that page only
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>not-found.tsx</strong> : custom 404 page
			rendered when no route matches
		</li>
	</ul>
);
