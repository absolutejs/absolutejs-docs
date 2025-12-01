import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	startOAuthFlow,
	checkStatus,
	signout
} from '../../../../data/authDocsCode';
import {
	sectionStyle,
	headingStyle,
	paragraphSpacedStyle,
	listStyle,
	listItemStyle
} from '../../../../styles/docsStyles';
import { PrismPlus } from '../../../utils/PrismPlus';

export const AuthFlowSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={headingStyle(themeSprings)} id="handle-auth-flow">
			Handle Authentication Flow
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			When you use the Absolute Auth plugin, it automatically creates all
			the authentication routes you need. You do not implement your own
			login, status, or sign-out routes, you simply call the ones already
			provided.
		</p>
		<animated.h3 style={headingStyle(themeSprings, true)}>
			Start the OAuth flow
		</animated.h3>
		<PrismPlus
			codeString={startOAuthFlow}
			language="typescript"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			This triggers the built-in authorization route, which handles:
			<ul style={listStyle}>
				<li style={listItemStyle}>
					generating state + PKCE (if required)
				</li>
				<li style={listItemStyle}>storing the provider name</li>
				<li style={listItemStyle}>storing the origin URL</li>
				<li style={listItemStyle}>
					building and redirecting to the provider's authorization URL
				</li>
			</ul>
		</p>
		<animated.h3
			style={headingStyle(themeSprings, true)}
			id="handle-auth-flow"
		>
			Check whether the user is logged in
		</animated.h3>
		<PrismPlus
			codeString={checkStatus}
			language="typescript"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
		<animated.h3
			style={headingStyle(themeSprings, true)}
			id="handle-auth-flow"
		>
			Sign the user out
		</animated.h3>
		<PrismPlus
			codeString={signout}
			language="typescript"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			This calls the built-in sign-out route, which:
			<ul style={listStyle}>
				<li style={listItemStyle}>
					runs your onSignOut hook (if provided)
				</li>
				<li style={listItemStyle}>deletes the user session</li>
				<li style={listItemStyle}>clears authentication cookies</li>
			</ul>
		</p>
	</section>
);
