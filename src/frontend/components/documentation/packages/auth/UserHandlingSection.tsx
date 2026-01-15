import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import { userManagement } from '../../../../data/authDocsCode';
import {
	sectionStyle,
	paragraphSpacedStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { PrismPlus } from '../../../utils/PrismPlus';

const routeConfigProps = [
	{
		prop: 'authorizeRoute',
		default: '/oauth2/:provider/authorization',
		description: 'Custom authorization route path'
	},
	{
		prop: 'callbackRoute',
		default: '/oauth2/callback',
		description: 'Custom callback route path'
	},
	{
		prop: 'statusRoute',
		default: '/oauth2/status',
		description: 'Custom status check route path'
	},
	{
		prop: 'signoutRoute',
		default: '/oauth2/signout',
		description: 'Custom sign-out route path'
	},
	{
		prop: 'profileRoute',
		default: '/oauth2/profile',
		description: 'Custom profile fetch route path'
	},
	{
		prop: 'refreshRoute',
		default: '/oauth2/tokens',
		description: 'Custom token refresh route path'
	},
	{
		prop: 'revokeRoute',
		default: '/oauth2/revocation',
		description: 'Custom token revocation route path'
	}
];

const lifecycleHooks = [
	{
		hook: 'onAuthorizeSuccess',
		description: 'Called before redirecting to provider'
	},
	{
		hook: 'onAuthorizeError',
		description: 'Called when authorization URL generation fails'
	},
	{
		hook: 'onCallbackSuccess',
		description: 'Called after successful token exchange'
	},
	{
		hook: 'onCallbackError',
		description: 'Called when callback/token exchange fails'
	},
	{
		hook: 'onProfileSuccess',
		description: 'Called after successful profile fetch'
	},
	{
		hook: 'onProfileError',
		description: 'Called when profile fetch fails'
	},
	{
		hook: 'onStatus',
		description: 'Called when checking user session status'
	},
	{
		hook: 'onRefreshSuccess',
		description: 'Called after successful token refresh'
	},
	{
		hook: 'onRefreshError',
		description: 'Called when token refresh fails'
	},
	{
		hook: 'onRevocationSuccess',
		description: 'Called after successful token revocation'
	},
	{
		hook: 'onRevocationError',
		description: 'Called when token revocation fails'
	},
	{
		hook: 'onSignOut',
		description: 'Called before session destruction'
	}
];

export const UserHandlingSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2
			style={gradientHeadingStyle(themeSprings)}
			id="user-handling"
		>
			Custom User Handling
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			Absolute Auth does not provide database adapters. Instead, it
			exposes hooks throughout the OAuth lifecycle, allowing you to
			integrate any persistence layer or user model. These hooks provide
			full control over user creation, updates, and session handling while
			keeping the OAuth flow standardized and database-agnostic.
		</p>

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Core Hook: onCallbackSuccess
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			Called after the provider returns and tokens are exchanged. Use it
			to load or create users via instantiateUserSession:
		</p>
		<PrismPlus
			codeString={userManagement}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Route Configuration Props
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			Customize the route paths for all authentication endpoints:
		</p>
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
						<tr key={index}>
							<animated.td style={tableCellStyle(themeSprings)}>
								<code style={tableCodeStyle}>{item.prop}</code>
							</animated.td>
							<animated.td style={tableCellStyle(themeSprings)}>
								<code style={tableCodeStyle}>
									{item.default}
								</code>
							</animated.td>
							<animated.td style={tableCellStyle(themeSprings)}>
								{item.description}
							</animated.td>
						</tr>
					))}
				</tbody>
			</animated.table>
		</div>

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Lifecycle Hooks
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			Hook into each stage of the OAuth flow for custom behavior:
		</p>
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
						<tr key={index}>
							<animated.td style={tableCellStyle(themeSprings)}>
								<code style={tableCodeStyle}>{item.hook}</code>
							</animated.td>
							<animated.td style={tableCellStyle(themeSprings)}>
								{item.description}
							</animated.td>
						</tr>
					))}
				</tbody>
			</animated.table>
		</div>
	</section>
);
