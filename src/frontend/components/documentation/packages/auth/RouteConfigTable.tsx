import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle
} from '../../../../styles/docsStyles';
import { RouteConfigRow } from './RouteConfigRow';

type RouteConfigItem = {
	default: string;
	description: string;
	prop: string;
};

const routeConfigProps: RouteConfigItem[] = [
	{
		default: '/oauth2/:provider/authorization',
		description: 'Custom authorization route path',
		prop: 'authorizeRoute'
	},
	{
		default: '/oauth2/callback',
		description: 'Custom callback route path',
		prop: 'callbackRoute'
	},
	{
		default: '/oauth2/status',
		description: 'Custom status check route path',
		prop: 'statusRoute'
	},
	{
		default: '/oauth2/signout',
		description: 'Custom sign-out route path',
		prop: 'signoutRoute'
	},
	{
		default: '/oauth2/profile',
		description: 'Custom profile fetch route path',
		prop: 'profileRoute'
	},
	{
		default: '/oauth2/tokens',
		description: 'Custom token refresh route path',
		prop: 'refreshRoute'
	},
	{
		default: '/oauth2/revocation',
		description: 'Custom token revocation route path',
		prop: 'revokeRoute'
	}
];

export const RouteConfigTable = ({ themeSprings }: ThemeProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Prop
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Default
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{routeConfigProps.map((item, index) => (
					<RouteConfigRow
						item={item}
						key={index}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
