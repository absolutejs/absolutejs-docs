import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ProductionBuildOptimizationTips = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Environment variables</strong>: Set
			NODE_ENV=production to enable optimizations
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Process manager</strong>: Use PM2 or
			systemd for automatic restarts and logging
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Reverse proxy</strong>: Put nginx or
			Caddy in front for SSL termination and caching
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Health checks</strong>: Add a /health
			endpoint for load balancer health checks
		</li>
	</ul>
);
