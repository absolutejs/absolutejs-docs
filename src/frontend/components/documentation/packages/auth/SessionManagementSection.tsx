import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	sessionConfigExample,
	cleanupSessionsExample
} from '../../../../data/authDocsCode';
import {
	sectionStyle,
	paragraphSpacedStyle,
	listStyle,
	listItemStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { PrismPlus } from '../../../utils/PrismPlus';

export const SessionManagementSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2
			style={gradientHeadingStyle(themeSprings)}
			id="session-management"
		>
			Session Management
		</animated.h2>
		<p style={paragraphSpacedStyle}>
			Absolute Auth provides automatic session management with
			configurable lifetimes and cleanup. Sessions are automatically
			cleaned up at regular intervals, and you can also trigger cleanup
			manually using the derived cleanupSessions function.
		</p>

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			Configuration
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			Configure session behavior using millisecond-based options:
		</p>
		<PrismPlus
			codeString={sessionConfigExample}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>The cleanup process:</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				Runs automatically at the interval specified by
				cleanupIntervalMs
			</li>
			<li style={listItemStyle}>
				Removes sessions older than sessionDurationMs
			</li>
			<li style={listItemStyle}>
				Removes unregistered sessions older than
				unregisteredSessionDurationMs
			</li>
			<li style={listItemStyle}>
				Enforces the maxSessions limit per user, removing oldest
				sessions first
			</li>
			<li style={listItemStyle}>
				Calls the onSessionCleanup hook with maps of removed sessions
			</li>
		</ul>

		<animated.h3 style={gradientHeadingStyle(themeSprings, true)}>
			The cleanupSessions Derived Function
		</animated.h3>
		<p style={paragraphSpacedStyle}>
			When you use absoluteAuth, a cleanupSessions function is derived and
			made available in all your route handlers. This allows you to
			trigger cleanup programmatically:
		</p>
		<PrismPlus
			codeString={cleanupSessionsExample}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			The derived function follows Elysia's plugin pattern - it captures
			the session configuration from when absoluteAuth was initialized and
			provides a simple async function you can call from any route.
		</p>
	</section>
);
