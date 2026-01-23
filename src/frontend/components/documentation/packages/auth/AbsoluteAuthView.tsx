import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import { DocsNavigation } from '../../DocsNavigation';
import { basicSetup, protectRoute } from '../../../../data/authDocsCode';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	paragraphSpacedStyle,
	paragraphLargeStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { PrismPlus } from '../../../utils/PrismPlus';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { OAuthFlowDiagram } from '../../../diagrams/OAuthFlowDiagram';
import { AuthFeaturesList } from './AuthFeaturesList';
import { AuthFlowSection } from './AuthFlowSection';
import { AuthRoutesTable } from './AuthRoutesTable';
import { SessionManagementSection } from './SessionManagementSection';
import { UserHandlingSection } from './UserHandlingSection';

const tocItems: TocItem[] = [
	{ href: '#key-features', label: 'Key Features' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#basic-setup', label: 'Basic Setup' },
	{ href: '#protect-route', label: 'Protect Route' },
	{ href: '#handle-auth-flow', label: 'Handle Auth Flow' },
	{ href: '#authentication-routes', label: 'Authentication Routes' },
	{ href: '#session-management', label: 'Session Management' },
	{ href: '#user-handling', label: 'Custom User Handling' }
];

export const AbsoluteAuthView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const showDesktopToc = !isMobileOrTablet;

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
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="absolute-auth">
						Absolute Auth
					</h1>
					<p style={paragraphLargeStyle}>
						A comprehensive TypeScript-based authentication system
						built for Elysia applications. Complete OAuth 2.0
						solution with optional OpenID Connect capabilities and
						end-to-end type safety.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="key-features"
					>
						Key Features
					</animated.h2>
					<AuthFeaturesList themeSprings={themeSprings} />
					<OAuthFlowDiagram themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
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
						style={gradientHeadingStyle(themeSprings)}
						id="basic-setup"
					>
						Basic Setup
					</animated.h2>
					<PrismPlus
						codeString={basicSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="protect-route"
					>
						Protect Routes
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The protectRoute helper function protects routes that
						require authentication. It accepts two callbacks with
						fully typed parameters - the user object matches your
						exact user shape, and the error object is one of the
						specific authentication errors, giving you complete type
						safety for both success and failure paths.
					</p>
					<PrismPlus
						codeString={protectRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<AuthFlowSection themeSprings={themeSprings} />

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="authentication-routes"
					>
						Authentication Routes
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The library automatically creates the following routes:
					</p>
					<AuthRoutesTable themeSprings={themeSprings} />
				</section>

				<SessionManagementSection themeSprings={themeSprings} />

				<UserHandlingSection themeSprings={themeSprings} />

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
