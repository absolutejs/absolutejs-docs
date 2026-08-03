import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	startOAuthFlow,
	checkStatus,
	signout
} from '../../../../data/authDocsCode';
import {
	sectionStyle,
	paragraphSpacedStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { PrismPlus } from '../../../utils/PrismPlus';
import { StepFlow, StepFlowStep } from '../../../utils/StepFlow';

const authorizationRouteSteps: StepFlowStep[] = [
	{ title: 'Generating state + PKCE (if required)' },
	{ title: 'Storing the provider name' },
	{ title: 'Storing the origin URL' },
	{ title: "Building and redirecting to the provider's authorization URL" }
];

const signOutRouteSteps: StepFlowStep[] = [
	{ title: 'Runs your onSignOut hook (if provided)' },
	{ title: 'Deletes the user session' },
	{ title: 'Clears authentication cookies' }
];

export const AuthFlowSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="handle-auth-flow"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Handle Authentication Flow
		</AnchorHeading>
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
		<StepFlow steps={authorizationRouteSteps} themeSprings={themeSprings} />
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
		<StepFlow steps={signOutRouteSteps} themeSprings={themeSprings} />
	</section>
);
