import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	vaultFederatedTokens,
	vaultRotation,
	vaultUsage
} from '../../../../data/documentation/authVaultDocsCode';
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
	{ href: '#vault', label: 'Vault' },
	{ href: '#federated-tokens', label: 'Federated tokens' },
	{ href: '#rotation', label: 'Key rotation' }
];

export const AuthVaultView = ({
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
					<h1 id="auth-vault" style={h1Style(isMobileOrTablet)}>
						Vault
					</h1>
					<p style={paragraphLargeStyle}>
						Managed encrypted-blob storage on top of{' '}
						<code>createSecretCipher</code>. The
						small-managed-product version of WorkOS Vault:
						store/retrieve sensitive values (Stripe customer ids,
						Notion tokens, …) per owner with AES-GCM at rest and
						turnkey key rotation.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="vault"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vault
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createVault</code> pairs a cipher with a store and
						returns <code>put</code> / <code>get</code> /{' '}
						<code>list</code> / <code>delete</code> scoped to an{' '}
						<code>ownerId</code> (typically a userId). The
						ciphertext lives in the store; the key lives in your
						env.
					</p>
					<PrismPlus
						codeString={vaultUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="federated-tokens"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Federated tokens
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createFederatedTokenStore</code> +{' '}
						<code>getOrRefreshFederatedTokens</code> wrap the vault
						into Auth0&apos;s &quot;Token Vault&quot;: stash a
						user&apos;s third-party OAuth tokens (Google Drive,
						Slack, GitHub) so background jobs and AI agents can call
						those APIs as the user, with automatic refresh ~30s
						before expiry. The package never bundles a provider
						list; you bring the citra <code>providerInstance</code>{' '}
						you already use for sign-in.
					</p>
					<PrismPlus
						codeString={vaultFederatedTokens}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rotation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Key rotation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>rotateVaultKey</code> re-encrypts every entry from{' '}
						<code>oldKey</code> to <code>newKey</code>, then you
						swap your env to <code>newKey</code>. Same shape as{' '}
						<code>rotateMfaEncryptionKey</code>; run from a script.
					</p>
					<PrismPlus
						codeString={vaultRotation}
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
