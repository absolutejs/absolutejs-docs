import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const LifecycleHooksList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onRequest</strong>: Runs first on every
			request. Minimal context. Best for rate limiting, analytics, and
			custom headers.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onBeforeHandle</strong>: Runs after
			validation. Return a value to skip the handler. This is your primary
			auth/access control hook.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>resolve</strong>: Like{' '}
			<code>derive</code> but runs after validation, so types are
			guaranteed. Preferred for type-safe context values.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onAfterHandle</strong>: Inspect or
			transform the response after the handler runs.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onAfterResponse</strong>: Runs after the
			response is sent. Use for cleanup and logging.
		</li>
	</ul>
);
