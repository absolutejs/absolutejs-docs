import {
	listStyle,
	listItemStyle,
	strongStyle
} from '../../../../styles/docsStyles';

export const AuthFeaturesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Multi-Provider Support</strong>: 50+
			OAuth 2.0 and OpenID Connect providers
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Type-Safe</strong>: Full TypeScript
			support with comprehensive type definitions
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Session Management</strong>: Built-in
			session handling with automatic expiration
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Token Management</strong>: Automatic
			token refresh and revocation
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Route Protection</strong>: Easy-to-use
			route protection middleware
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Event Hooks</strong>: Customizable event
			handlers for all authentication flows
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>PKCE Support</strong>: Automatic PKCE
			implementation for supported providers
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Security</strong>: Secure cookie
			handling and CSRF protection
		</li>
	</ul>
);
