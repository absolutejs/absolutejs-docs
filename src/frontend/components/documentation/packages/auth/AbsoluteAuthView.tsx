import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../../types/springTypes';
import {
	basicSetup,
	protectRoute,
	handleAuthFlow,
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

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#key-features', label: 'Key Features' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#quick-start', label: 'Quick Start' },
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
						provides a complete OAuth 2.0 and OpenID Connect
						solution with support for 50+ authentication providers
						including Google, GitHub, Discord, and many more.
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
						id="quick-start"
					>
						Quick Start
					</animated.h2>
					<h3 style={paragraphLargeStyle}>Basic Setup</h3>
					<PrismPlus
						codeString={basicSetup}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>

					<h3 style={paragraphLargeStyle}>Protect Routes</h3>
					<PrismPlus
						codeString={protectRoute}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>

					<h3 style={paragraphLargeStyle}>
						Handle Authentication Flow
					</h3>
					<PrismPlus
						codeString={handleAuthFlow}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

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
