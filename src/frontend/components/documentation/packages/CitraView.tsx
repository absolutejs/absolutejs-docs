import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	buildingAuthUrl,
	callback,
	fetchUserProfile,
	gettingStarted,
	refreshAccessToken,
	revokeToken
} from '../../../data/citraDocsCode';
import { providerData } from '../../../data/providerData';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	paragraphLargeStyle,
	strongStyle,
	paragraphSpacedStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	githubButtonStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle,
	featureCardStyle
} from '../../../styles/gradientStyles';
import { DARK_LOGO_PROVIDERS } from '../../../styles/authModalStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#why-citra', label: 'Why Citra?' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#getting-started', label: 'Getting Started' },
	{ href: '#building-auth-url', label: 'Authorization URL' },
	{ href: '#handling-callback', label: 'Handling Callback' },
	{ href: '#fetching-user-profile', label: 'User Profile' },
	{ href: '#refreshing-revoking-tokens', label: 'Token Management' },
	{ href: '#supported-providers', label: 'Supported Providers' }
];

export const CitraView = ({
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

	const providers = Object.values(providerData);
	const providersCount = providers.length;

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
					<h1 style={h1Style(isMobileOrTablet)} id="citra">
						Citra
					</h1>
					<p style={paragraphLargeStyle}>
						A curated collection of OAuth 2.0 provider
						configurations, each bundled with the correct endpoints
						and request details. Ready-to-use foundation for secure
						authentication in TypeScript applications.
					</p>
					<animated.a
						href="https://github.com/absolutejs/citra"
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
						id="why-citra"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why Citra?
					</AnchorHeading>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Interchangeability
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								All OAuth 2.0 providers follow the same flow.
								Citra abstracts this into a unified interface.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Type Safety</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								TypeScript generics and type guards catch
								configuration mistakes at compile time.
							</p>
						</animated.div>
					</div>
					<p style={paragraphSpacedStyle}>
						Inspired by Arctic, Citra reduces boilerplate and
						minimizes integration errors by enforcing a uniform
						configuration approach.
					</p>
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
						codeString={`bun install citra`}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="getting-started"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Getting Started
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Citra uses strong TypeScript typing to help you build
						OAuth clients safely. Each provider includes its own
						typed configuration schema, ensuring you can't pass
						unsupported parameters or omit required ones.
					</p>
					<PrismPlus
						codeString={gettingStarted}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="building-auth-url"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Building the Authorization URL
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Generate a fully customized authorization URL for
						redirecting users to the provider's login page. Every
						option is strongly typed and context-aware, with full
						control over PKCE, scopes, and provider-specific
						parameters.
					</p>
					<PrismPlus
						codeString={buildingAuthUrl}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="handling-callback"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handling the Callback
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Exchange the authorization code and PKCE verifier for an
						OAuth2 token response:
					</p>
					<PrismPlus
						codeString={callback}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="fetching-user-profile"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fetching the User Profile
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Exchange the access token for user information:
					</p>
					<PrismPlus
						codeString={fetchUserProfile}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="refreshing-revoking-tokens"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Token Management
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						If supported by the provider, you can refresh and revoke
						tokens:
					</p>
					<PrismPlus
						codeString={refreshAccessToken}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={revokeToken}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="supported-providers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Supported Providers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Citra supports {providersCount} OAuth 2.0 providers:
					</p>
					<div
						style={{
							display: 'grid',
							gap: '0.75rem',
							gridTemplateColumns: isMobile
								? 'repeat(2, 1fr)'
								: 'repeat(auto-fill, minmax(180px, 1fr))',
							marginTop: '1rem'
						}}
					>
						{providers.map((provider) => {
							const providerKey = Object.keys(providerData).find(
								(key) =>
									providerData[
										key as keyof typeof providerData
									].name === provider.name
							);
							const needsInvert =
								providerKey &&
								DARK_LOGO_PROVIDERS.has(providerKey);

							return (
								<animated.div
									key={provider.name}
									style={{
										...featureCardStyle(themeSprings),
										alignItems: 'center',
										display: 'flex',
										gap: '0.75rem',
										padding: '0.75rem 1rem'
									}}
								>
									<animated.img
										src={provider.logoUrl}
										alt={`${provider.name} logo`}
										style={{
											borderRadius: '4px',
											filter: needsInvert
												? themeSprings.theme.to((t) =>
														t.endsWith('dark')
															? 'brightness(0) invert(1)'
															: 'none'
													)
												: 'none',
											flexShrink: 0,
											height: '24px',
											objectFit: 'contain',
											width: '24px'
										}}
									/>
									<span
										style={{
											fontSize: '0.9rem',
											fontWeight: 500,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap'
										}}
									>
										{provider.name}
									</span>
								</animated.div>
							);
						})}
					</div>
				</section>

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
