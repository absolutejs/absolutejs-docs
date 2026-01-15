import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../../styles/docsStyles';

const routes = [
	{
		route: '/oauth2/:provider/authorization',
		method: 'GET',
		description: 'Initiate OAuth flow with specified provider'
	},
	{
		route: '/oauth2/callback',
		method: 'GET',
		description: 'Handle OAuth callback and token exchange'
	},
	{
		route: '/oauth2/status',
		method: 'GET',
		description: 'Check current user authentication status'
	},
	{
		route: '/oauth2/profile',
		method: 'GET',
		description: 'Fetch user profile from OAuth provider'
	},
	{
		route: '/oauth2/tokens',
		method: 'POST',
		description: 'Refresh access token using refresh token'
	},
	{
		route: '/oauth2/revocation',
		method: 'POST',
		description: 'Revoke access or refresh token'
	},
	{
		route: '/oauth2/signout',
		method: 'DELETE',
		description: 'Sign out user and clear session'
	}
];

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
			<tbody>
				{routes.map((route, index) => (
					<tr key={index}>
						<animated.td style={tableCellStyle(themeSprings)}>
							<code style={tableCodeStyle}>{route.route}</code>
						</animated.td>
						<animated.td style={tableCellStyle(themeSprings)}>
							<span
								style={{
									background:
										route.method === 'GET'
											? 'rgba(76, 175, 80, 0.2)'
											: route.method === 'POST'
												? 'rgba(33, 150, 243, 0.2)'
												: 'rgba(244, 67, 54, 0.2)',
									borderRadius: '0.25rem',
									color:
										route.method === 'GET'
											? '#4CAF50'
											: route.method === 'POST'
												? '#2196F3'
												: '#F44336',
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
				))}
			</tbody>
		</animated.table>
	</div>
);
