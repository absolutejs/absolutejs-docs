import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../../styles/docsStyles';

type AuthRoute = {
	description: string;
	method: string;
	route: string;
};

const routes: AuthRoute[] = [
	{
		description: 'Initiate OAuth flow with specified provider',
		method: 'GET',
		route: '/oauth2/:provider/authorization'
	},
	{
		description: 'Handle OAuth callback and token exchange',
		method: 'GET',
		route: '/oauth2/callback'
	},
	{
		description: 'Check current user authentication status',
		method: 'GET',
		route: '/oauth2/status'
	},
	{
		description: 'Fetch user profile from OAuth provider',
		method: 'GET',
		route: '/oauth2/profile'
	},
	{
		description: 'Refresh access token using refresh token',
		method: 'POST',
		route: '/oauth2/tokens'
	},
	{
		description: 'Revoke access or refresh token',
		method: 'POST',
		route: '/oauth2/revocation'
	},
	{
		description: 'Sign out user and clear session',
		method: 'DELETE',
		route: '/oauth2/signout'
	}
];

const getMethodBadgeColors = (method: string) => {
	if (method === 'GET') {
		return {
			background: 'rgba(76, 175, 80, 0.2)',
			color: '#4CAF50'
		};
	}

	if (method === 'POST') {
		return {
			background: 'rgba(33, 150, 243, 0.2)',
			color: '#2196F3'
		};
	}

	return {
		background: 'rgba(244, 67, 54, 0.2)',
		color: '#F44336'
	};
};

const renderAuthRouteRows = (themeSprings: ThemeProps['themeSprings']) =>
	routes.map((route) => {
		const badgeColors = getMethodBadgeColors(route.method);

		return (
			<tr key={route.route}>
				<animated.td style={tableCellStyle(themeSprings)}>
					<code style={tableCodeStyle}>{route.route}</code>
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					<span
						style={{
							background: badgeColors.background,
							borderRadius: '0.25rem',
							color: badgeColors.color,
							fontFamily: 'monospace',
							fontSize: '0.8rem',
							fontWeight: 600,
							padding: '0.2rem 0.5rem'
						}}
					>
						{route.method}
					</span>
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					{route.description}
				</animated.td>
			</tr>
		);
	});

export const AuthRoutesTable = ({ themeSprings }: ThemeProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Route
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Method
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>{renderAuthRouteRows(themeSprings)}</tbody>
		</animated.table>
	</div>
);
