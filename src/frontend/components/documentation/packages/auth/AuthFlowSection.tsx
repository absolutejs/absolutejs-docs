import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	startOAuthFlow,
	checkStatus,
	signout
} from '../../../../data/authDocsCode';
import {
	sectionStyle,
	paragraphSpacedStyle,
	listStyle,
	listItemStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { PrismPlus } from '../../../utils/PrismPlus';

export const AuthFlowSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2
			style={gradientHeadingStyle(themeSprings)}
			id="handle-auth-flow"
		>
			Handle Authentication Flow
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			When you use the Absolute Auth plugin, it automatically creates all
			the authentication routes you need. You do not implement your own
			login, status, or sign-out routes, you simply call the ones already
			provided.
		</p>
		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Start the OAuth flow
		</animated.h3>
		<PrismPlus
			codeString={startOAuthFlow}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			This triggers the built-in authorization route, which handles:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>Generating state + PKCE (if required)</li>
			<li style={listItemStyle}>Storing the provider name</li>
			<li style={listItemStyle}>Storing the origin URL</li>
			<li style={listItemStyle}>
				Building and redirecting to the provider's authorization URL
			</li>
		</ul>
		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Check whether the user is logged in
		</animated.h3>
		<PrismPlus
			codeString={checkStatus}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Sign the user out
		</animated.h3>
		<PrismPlus
			codeString={signout}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			This calls the built-in sign-out route, which:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				Runs your onSignOut hook (if provided)
			</li>
			<li style={listItemStyle}>Deletes the user session</li>
			<li style={listItemStyle}>Clears authentication cookies</li>
		</ul>
	</section>
);
