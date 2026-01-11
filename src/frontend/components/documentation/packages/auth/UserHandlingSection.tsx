import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import { userManagement } from '../../../../data/authDocsCode';
import {
	sectionStyle,
	headingStyle,
	paragraphSpacedStyle,
	listStyle,
	strongStyle,
	listItemStyle
} from '../../../../styles/docsStyles';
import { PrismPlus } from '../../../utils/PrismPlus';
export const UserHandlingSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={headingStyle(themeSprings)} id="user-handling">
			Custom User Handling
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			Absolute Auth does not provide database adapters. Instead, it
			exposes hooks throughout the OAuth lifecycle, allowing you to
			integrate any persistence layer or user model. These hooks provide
			full control over user creation, updates, and session handling while
			keeping the OAuth flow standardized and database-agnostic.
		</p>
		<animated.h2 style={headingStyle(themeSprings, true)}>
			Core Hook: onCallbackSuccess
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			Called after the provider returns and tokens are exchanged
			<br />
			Use it to load or create users via instantiateUserSession
		</p>
		<PrismPlus
			codeString={userManagement}
			language="typescript"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
		<animated.h2 style={headingStyle(themeSprings, true)}>
			AbsoluteAuth Configuration Props
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			The absoluteAuth plugin accepts the following configuration
			options:
		</p>
		<animated.h3
			style={Object.assign({}, headingStyle(themeSprings, true), {
				marginTop: '1.5rem'
			})}
		>
			Required Props
		</animated.h3>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>providersConfiguration</strong>:
				OAuth provider credentials and settings
			</li>
		</ul>
		<animated.h3
			style={Object.assign({}, headingStyle(themeSprings, true), {
				marginTop: '1.5rem'
			})}
		>
			Route Configuration
		</animated.h3>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>authorizeRoute</strong>: Custom
				authorization route (default: /oauth2/:provider/authorization)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>callbackRoute</strong>: Custom
				callback route (default: /oauth2/callback)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>statusRoute</strong>: Custom status
				route (default: /oauth2/status)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>signoutRoute</strong>: Custom
				sign-out route (default: /oauth2/signout)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>profileRoute</strong>: Custom
				profile route (default: /oauth2/profile)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>refreshRoute</strong>: Custom
				refresh route (default: /oauth2/tokens)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>revokeRoute</strong>: Custom
				revocation route (default: /oauth2/revocation)
			</li>
		</ul>
		<animated.h3
			style={Object.assign({}, headingStyle(themeSprings, true), {
				marginTop: '1.5rem'
			})}
		>
			Lifecycle Hooks
		</animated.h3>
		<ul style={{ ...listStyle, marginBottom: '2rem' }}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onAuthorizeSuccess</strong>: Called
				before redirecting to provider
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onAuthorizeError</strong>: Called
				when it fails to generate an authorization url
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onCallbackSuccess</strong>: Called
				after successful token exchange
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onCallbackError</strong>: Called
				when callback fails
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>
					onProfileSuccess / onProfileError
				</strong>
				: Called when fetching provider profile
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onStatus</strong>: Called when
				checking user session
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>
					onRefreshSuccess / onRefreshError
				</strong>
				: Called when refreshing tokens
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>
					onRevocationSuccess / onRevocationError
				</strong>
				: Called when revoking tokens
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>onSignOut</strong>: Called before
				session destruction
			</li>
		</ul>
	</section>
);
