import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ElysiaOverviewList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Runtime model</strong>: one long-lived
			Elysia server handles pages, APIs, and background scheduling
			plugins.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Plugin boundaries</strong>: keep
			concerns isolated (CORS, auth, cron, networking) using plugin/group
			scope.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Type flow</strong>: schemas and route
			definitions in Elysia drive end-to-end types through handlers and
			clients.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>AbsoluteJS role</strong>: rendering,
			build/asset pipeline, and framework host integration layered onto
			the same server.
		</li>
	</ul>
);
