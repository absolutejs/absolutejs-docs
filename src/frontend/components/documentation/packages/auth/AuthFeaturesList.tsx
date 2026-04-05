import { animated } from '@react-spring/web';
import { providers } from 'citra';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	strongStyle,
	paragraphSpacedStyle
} from '../../../../styles/docsStyles';
import { featureCardStyle } from '../../../../styles/gradientStyles';

type AuthFeature = {
	description: string;
	title: string;
};

const features: AuthFeature[] = [
	{
		description: `${Object.keys(providers).length} OAuth 2.0 providers with OpenID Connect support`,
		title: 'Multi-Provider Support'
	},
	{
		description:
			'Full TypeScript support with comprehensive type definitions',
		title: 'Type-Safe'
	},
	{
		description: 'Built-in session handling with automatic expiration',
		title: 'Session Management'
	},
	{
		description: 'Automatic token refresh and revocation support',
		title: 'Token Management'
	},
	{
		description: 'Easy-to-use route protection with typed callbacks',
		title: 'Route Protection'
	},
	{
		description: 'Customizable handlers for all authentication flows',
		title: 'Event Hooks'
	},
	{
		description: 'Automatic PKCE implementation for supported providers',
		title: 'PKCE Support'
	},
	{
		description: 'Secure cookie handling and CSRF protection built-in',
		title: 'Security'
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
