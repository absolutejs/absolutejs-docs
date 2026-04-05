import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import { userManagement } from '../../../../data/authDocsCode';
import {
	sectionStyle,
	paragraphSpacedStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { PrismPlus } from '../../../utils/PrismPlus';
import { LifecycleHooksTable } from './LifecycleHooksTable';
import { RouteConfigTable } from './RouteConfigTable';

export const UserHandlingSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="user-handling"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Custom User Handling
		</AnchorHeading>
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
		<RouteConfigTable themeSprings={themeSprings} />

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Lifecycle Hooks
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			Hook into each stage of the OAuth flow for custom behavior:
		</p>
		<LifecycleHooksTable themeSprings={themeSprings} />
	</section>
);
