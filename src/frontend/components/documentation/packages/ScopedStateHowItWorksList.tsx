import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const ScopedStateHowItWorksList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Automatic Session ID</strong>: A{' '}
			<code>user_session_id</code> cookie is created on first request
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Server-Side Storage</strong>: State is
			stored in memory on the server, keyed by session ID
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Isolation</strong>: Each session ID maps
			to a completely separate state object
		</li>
	</ul>
);
