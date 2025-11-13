import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	buildingAuthUrl,
	callback,
	fetchUserProfile,
	gettingStarted,
	refreshAccessToken,
	revokeToken
} from '../../../data/citraDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	paragraphStyle,
	sectionStyle,
	headingStyle,
	paragraphLargeStyle,
	strongStyle,
	paragraphSpacedStyle,
	listItemStyle,
	listStyle
} from '../../../styles/docsStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#introduction', label: 'Introduction' },
	{ href: '#why-citra', label: 'Why Citra?' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#getting-started', label: 'Getting Started' },
	{ href: '#building-auth-url', label: 'Building the Authorization URL' },
	{ href: '#handling-callback', label: 'Handling the Callback' },
	{ href: '#fetching-user-profile', label: 'Fetching the User Profile' },
	{
		href: '#refreshing-revoking-tokens',
		label: 'Refreshing and Revoking Tokens'
	},
	{ href: '#supported-providers', label: 'Supported Providers' }
];

export const CitraView = ({ themeSprings }: ThemeProps) => {
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
				<h1 style={h1Style} id="citra">
					Citra
				</h1>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="introduction"
					>
						Introduction
					</animated.h2>
					<p style={paragraphLargeStyle}>
						Citra is a curated collection of OAuth 2.0 provider
						configurations, each bundled with the correct endpoints
						and request details. It provides a ready-to-use
						foundation for integrating secure authentication into
						JavaScript and TypeScript applications.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="why-citra"
					>
						Why Citra?
					</animated.h2>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Interchangeability</strong>:
						All OAuth 2.0 providers follow the same authorization
						flow, and Citra abstracts this process into a unified
						interface.
					</p>
					<p style={paragraphStyle}>
						<strong style={strongStyle}>Type Safety</strong>:
						Leverage TypeScript generics and type guards to catch
						configuration mistakes at compile time.
					</p>
					<p style={paragraphStyle}>
						Inspired by Arctic, Citra reduces boilerplate and
						minimizes integration errors by enforcing a uniform
						configuration approach.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="installation"
					>
						Installation
					</animated.h2>
					<PrismPlus
						codeString={`bun install citra`}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="getting-started"
					>
						Getting Started
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Citra uses strong TypeScript typing to help you build
						OAuth clients safely and correctly. Each supported
						provider includes its own typed configuration schema,
						ensuring you can't accidentally pass unsupported
						parameters or omit required ones.
					</p>
					<PrismPlus
						codeString={gettingStarted}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="building-auth-url"
					>
						Building the Authorization URL
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Once your client is initialized, you can generate a
						fully customized authorization URL for redirecting users
						to the provider's login page. Every option is strongly
						typed and context-aware, but you retain full control
						over advanced parameters like PKCE, scopes, and
						provider-specific query strings.
					</p>
					<PrismPlus
						codeString={buildingAuthUrl}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="handling-callback"
					>
						Handling the Callback
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Exchange the code and verifier for an
						OAuth2TokenResponse:
					</p>
					<PrismPlus
						codeString={callback}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="fetching-user-profile"
					>
						Fetching the User Profile
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Exchange the access token for user information:
					</p>
					<PrismPlus
						codeString={fetchUserProfile}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="refreshing-revoking-tokens"
					>
						Refreshing and Revoking Tokens
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						If supported by the provider, you can refresh and revoke
						tokens:
					</p>
					<PrismPlus
						codeString={refreshAccessToken}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={revokeToken}
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="supported-providers"
					>
						Supported Providers
					</animated.h2>
					<p style={paragraphStyle}>
						Citra supports 50+ OAuth 2.0 providers including:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Google, GitHub, Discord, Microsoft Entra ID
						</li>
						<li style={listItemStyle}>
							Apple, Facebook, Twitter, LinkedIn
						</li>
						<li style={listItemStyle}>
							Auth0, Okta, Keycloak, WorkOS
						</li>
						<li style={listItemStyle}>
							Twitch, Steam, Epic Games, Battle.net
						</li>
						<li style={listItemStyle}>
							GitLab, Bitbucket, Linear, Notion
						</li>
						<li style={listItemStyle}>And many more...</li>
					</ul>
				</section>

				{/* <section>
			<h2>Type Safety</h2>
			<p>Citra provides comprehensive TypeScript definitions:</p>
			<ul>
				<li><strong>PKCEProvider</strong>: Providers with PKCE support</li>
				<li><strong>OIDCProvider</strong>: Providers with OpenID Connect</li>
				<li><strong>RefreshableProvider</strong>: Providers supporting token refresh</li>
				<li><strong>RevocableProvider</strong>: Providers supporting token revocation</li>
				<li><strong>ScopeRequiredProvider</strong>: Providers requiring explicit scopes</li>
			</ul>
		</section> */}
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
