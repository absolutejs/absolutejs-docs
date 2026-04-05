import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ErrorBoundariesHowItWorksList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Auto-detection</strong> : the build
			scans for <code>error.tsx</code>, <code>*.error.tsx</code>, and{' '}
			<code>not-found.tsx</code> files
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>SSR catch</strong> : when a page throws
			during server-side rendering, the error is caught and the convention
			component receives it as a prop
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Client hydration</strong> : the error
			page hydrates on the client just like any other page
		</li>
	</ul>
);
