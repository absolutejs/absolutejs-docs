import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	apiKeyGuard,
	clientCredentials,
	staticApiKeys
} from '../../../../data/documentation/authApiKeysDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#static-keys', label: 'Static API Keys' },
	{ href: '#guarding', label: 'Guarding Requests' },
	{ href: '#client-credentials', label: 'Client Credentials (M2M)' }
];

export const AuthApiKeysView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="auth-apikeys" style={h1Style(isMobileOrTablet)}>
						API Keys &amp; M2M
					</h1>
					<p style={paragraphLargeStyle}>
						Authenticate software, not people — long-lived static API
						keys and the OAuth2 client_credentials grant for
						short-lived machine-to-machine tokens. Secrets are stored
						only as hashes; one guard accepts either.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="static-keys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Static API Keys
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mint a long-lived <code>sk_…</code> key bound to any owner
						id, with string scopes and an optional expiry. Only the
						hash is persisted; the plaintext is shown once and the
						stored prefix lets you list keys in a UI. The package
						gives you the helpers — you wire creation behind your own
						admin route, exactly like SCIM tokens.
					</p>
					<PrismPlus
						codeString={staticApiKeys}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="guarding"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Guarding Requests
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>resolveApiPrincipal</code> reads the credential from{' '}
						<code>Authorization: Bearer</code> or the{' '}
						<code>X-API-Key</code> header and routes it by prefix to
						the right store, returning a single <code>ApiPrincipal</code>{' '}
						(its <code>kind</code>, <code>ownerId</code>, and{' '}
						<code>scopes</code>) regardless of whether a static key or
						an access token was presented. <code>hasScopes</code>{' '}
						enforces AND-scope checks.
					</p>
					<PrismPlus
						codeString={apiKeyGuard}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-credentials"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Credentials (M2M)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For the OAuth2 client_credentials grant, register a client
						(public <code>cid_…</code> + one-time <code>cs_…</code>{' '}
						secret) and let it trade those for a short-lived{' '}
						<code>at_…</code> access token at{' '}
						<code>/oauth2/token</code>. Tokens are opaque and stored by
						hash with an expiry, so they remain revocable — no JWKS to
						publish. Credentials may arrive in the body or as an HTTP
						Basic header.
					</p>
					<PrismPlus
						codeString={clientCredentials}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
