import { listItemStyle, listStyle } from '../../../styles/docsStyles';

export const ScopedStateHowItWorksSteps = () => (
	<ol style={{ ...listStyle, marginTop: '1rem' }}>
		<li style={listItemStyle}>
			On first request, a secure <code>user_session_id</code> cookie is
			created
		</li>
		<li style={listItemStyle}>
			Each subsequent request uses this cookie to retrieve the user&apos;s
			state
		</li>
		<li style={listItemStyle}>
			State is stored server-side, keyed by session ID
		</li>
	</ol>
);
