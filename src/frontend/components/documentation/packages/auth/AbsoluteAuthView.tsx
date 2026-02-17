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
	paragraphLargeStyle,
	githubButtonStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
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
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="absolute-auth">
						Absolute Auth
					</h1>
					<p style={paragraphLargeStyle}>
						A comprehensive TypeScript-based authentication system
						built for Elysia applications. Complete OAuth 2.0
						solution with optional OpenID Connect capabilities and
						end-to-end type safety.
					</p>
					<animated.a
						href="https://github.com/absolutejs/absolute-auth"
						target="_blank"
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="key-features"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Key Features
					</AnchorHeading>
					<AuthFeaturesList themeSprings={themeSprings} />
					<OAuthFlowDiagram themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="installation"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<PrismPlus
						codeString={`bun install @absolutejs/auth`}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="basic-setup"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Setup
					</AnchorHeading>
					<PrismPlus
						codeString={basicSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="protect-route"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Protect Routes
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="authentication-routes"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authentication Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The library automatically creates the following routes:
					</p>
					<AuthRoutesTable themeSprings={themeSprings} />
				</section>

				<SessionManagementSection themeSprings={themeSprings} />

				<UserHandlingSection themeSprings={themeSprings} />

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
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
