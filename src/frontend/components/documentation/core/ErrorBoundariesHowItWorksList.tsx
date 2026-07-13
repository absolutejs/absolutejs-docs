import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ErrorBoundariesHowItWorksList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Auto-detection</strong> : the build
			scans for <code>error.tsx</code>, <code>*.error.tsx</code>,{' '}
			<code>not-found.tsx</code>, and the universal{' '}
			<code>error.html</code> / <code>not-found.html</code> fallbacks
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Typed render contract</strong> : page
			components receive a flat <code>ErrorPageProps</code> shape (
			<code>name</code>, <code>message</code>, optional <code>stack</code>
			). Helper functions <code>defineRenderErrorPage</code> and{' '}
			<code>defineRenderNotFoundPage</code> type the return as a real HTML
			document
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>SSR catch</strong> : when a page throws
			during server-side rendering, the error is caught and the matching
			convention component receives the typed props
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Client hydration</strong> : the error
			page hydrates on the client just like any other page
		</li>
	</ul>
);
