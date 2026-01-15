import { animated } from '@react-spring/web';
import { providers } from 'citra';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	strongStyle,
	paragraphSpacedStyle
} from '../../../../styles/docsStyles';
import { featureCardStyle } from '../../../../styles/gradientStyles';

const features = [
	{
		title: 'Multi-Provider Support',
		description: `${Object.keys(providers).length} OAuth 2.0 providers with OpenID Connect support`
	},
	{
		title: 'Type-Safe',
		description:
			'Full TypeScript support with comprehensive type definitions'
	},
	{
		title: 'Session Management',
		description: 'Built-in session handling with automatic expiration'
	},
	{
		title: 'Token Management',
		description: 'Automatic token refresh and revocation support'
	},
	{
		title: 'Route Protection',
		description: 'Easy-to-use route protection with typed callbacks'
	},
	{
		title: 'Event Hooks',
		description: 'Customizable handlers for all authentication flows'
	},
	{
		title: 'PKCE Support',
		description: 'Automatic PKCE implementation for supported providers'
	},
	{
		title: 'Security',
		description: 'Secure cookie handling and CSRF protection built-in'
	}
];

export const AuthFeaturesList = ({ themeSprings }: ThemeProps) => (
	<div
		style={{
			display: 'grid',
			gap: '1rem',
			gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			marginBottom: '1.5rem',
			marginTop: '1rem'
		}}
	>
		{features.map((feature, index) => (
			<animated.div key={index} style={featureCardStyle(themeSprings)}>
				<p style={{ ...paragraphSpacedStyle, marginBottom: '0.5rem' }}>
					<strong style={strongStyle}>{feature.title}</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
					{feature.description}
				</p>
			</animated.div>
		))}
	</div>
);
