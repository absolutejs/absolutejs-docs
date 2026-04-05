import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ElysiaPageGuideList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Plugin Composition</strong>: how to
			structure and scope plugins
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Validation</strong>: request/response
			schemas and guarded routes
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>CORS</strong>: origin policy,
			credentials, and per-group config
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Cron Jobs</strong>: scheduled tasks with{' '}
			<code>@elysiajs/cron</code>
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Middleware</strong>: hook order and
			guard strategy
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Networking Plugin</strong>: startup
			behavior and host/port exposure
		</li>
	</ul>
);
