import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	basicSetup,
	protectRoute,
	userManagement,
	reactFrontend
} from '../../../../data/authDocsCode';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	headingStyle,
	paragraphSpacedStyle,
	paragraphLargeStyle
} from '../../../../styles/docsStyles';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { AuthFeaturesList } from './AuthFeaturesList';
import { AuthRoutesTable } from './AuthRoutesTable';
import { AuthFlowSection } from './AuthFlowSection';

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#key-features', label: 'Key Features' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#basic-setup', label: 'Basic Setup' },
	{ href: '#protect-route', label: 'Protect Route' },
	{ href: '#handle-auth-flow', label: 'Handle Auth Flow' },
	{ href: '#authentication-routes', label: 'Authentication Routes' },
	{ href: '#user-management', label: 'User Management' },
	{ href: '#react-frontend-integration', label: 'React Frontend Integration' }
];

export const AbsoluteAuthView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			{/* Main Content - Centered */}
			<div style={mainContentStyle}>
				<h1 style={h1Style} id="absolute-auth">
					Absolute Auth
				</h1>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="overview"
					>
						Overview
					</animated.h2>
					<p style={paragraphLargeStyle}>
						Absolute Auth is a comprehensive TypeScript-based
						authentication system built for Elysia applications. It
						provides a complete OAuth 2.0 solution with optional
						OpenID Connect capabilities for providers that implement
						the OpenID standard.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="key-features"
					>
						Key Features
					</animated.h2>
					<AuthFeaturesList />
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="installation"
					>
						Installation
					</animated.h2>
					<PrismPlus
						codeString={`bun install @absolutejs/auth`}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="basic-setup"
					>
						Basic Setup
					</animated.h2>
					<PrismPlus
						codeString={basicSetup}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="protect-route"
					>
						Protect Routes
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The protectRoute helper function is used to protect
						routes that require authentication, which accepts two
						callbacks. The user object is specifically typed to be the
						exact user shape and the error object is exactly one of
						the specific authentication errors that may be returned,
						giving you complete type safety for both success and
						failure paths.
					</p>
					<PrismPlus
						codeString={protectRoute}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<AuthFlowSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="authentication-routes"
					>
						Authentication Routes
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The library automatically creates the following routes:
					</p>
					<AuthRoutesTable />
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="user-management"
					>
						User Management
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Implement custom user creation and retrieval:
					</p>
					<PrismPlus
						codeString={userManagement}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="react-frontend-integration"
					>
						React Frontend Integration
					</animated.h2>
					<PrismPlus
						codeString={reactFrontend}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
