import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle
} from '../../../../styles/docsStyles';
import { LifecycleHookRow } from './LifecycleHookRow';

type LifecycleHookItem = {
	description: string;
	hook: string;
};

const lifecycleHooks: LifecycleHookItem[] = [
	{
		description: 'Called before redirecting to provider',
		hook: 'onAuthorizeSuccess'
	},
	{
		description: 'Called when authorization URL generation fails',
		hook: 'onAuthorizeError'
	},
	{
		description: 'Called after successful token exchange',
		hook: 'onCallbackSuccess'
	},
	{
		description: 'Called when callback/token exchange fails',
		hook: 'onCallbackError'
	},
	{
		description: 'Called after successful profile fetch',
		hook: 'onProfileSuccess'
	},
	{
		description: 'Called when profile fetch fails',
		hook: 'onProfileError'
	},
	{
		description: 'Called when checking user session status',
		hook: 'onStatus'
	},
	{
		description: 'Called after successful token refresh',
		hook: 'onRefreshSuccess'
	},
	{
		description: 'Called when token refresh fails',
		hook: 'onRefreshError'
	},
	{
		description: 'Called after successful token revocation',
		hook: 'onRevocationSuccess'
	},
	{
		description: 'Called when token revocation fails',
		hook: 'onRevocationError'
	},
	{
		description: 'Called before session destruction',
		hook: 'onSignOut'
	},
	{
		description: 'Called when expired sessions are removed during cleanup',
		hook: 'onSessionCleanup'
	}
];

export const LifecycleHooksTable = ({ themeSprings }: ThemeProps) => (
	<div style={{ ...tableContainerStyle, marginBottom: '2rem' }}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Hook
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{lifecycleHooks.map((item, index) => (
					<LifecycleHookRow
						item={item}
						key={index}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
