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
			Other Available Hooks
		</animated.h2>
		<ul style={{ ...listStyle, marginBottom: '2rem' }}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>
					onAuthorizeSuccess / onAuthorizeError
				</strong>
				: Called before redirected to provider
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
