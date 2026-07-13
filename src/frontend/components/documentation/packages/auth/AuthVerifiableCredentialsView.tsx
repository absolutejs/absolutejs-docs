import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	issuerOfferFlow,
	issuerSetup,
	statusListFlow,
	verifierFlow
} from '../../../../data/documentation/authVerifiableCredentialsDocsCode';
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
	{ href: '#issuer', label: 'Issuer setup' },
	{ href: '#offer-flow', label: 'Credential offer flow' },
	{ href: '#verifier', label: 'Verifier (OID4VP)' },
	{ href: '#status', label: 'Revocation: Status List' }
];

export const AuthVerifiableCredentialsView = ({
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
					<h1
						id="auth-verifiable-credentials"
						style={h1Style(isMobileOrTablet)}
					>
						Verifiable Credentials
					</h1>
					<p style={paragraphLargeStyle}>
						<code>0.40.0</code> ships a complete SD-JWT VC stack:
						OpenID4VCI issuer (your IdP becomes a credential issuer
						a wallet can collect), OpenID4VP verifier (accept a
						wallet presentation as proof-of-claim), and Bitstring
						Status List for revocation. First OSS TypeScript auth
						library to ship the full issue → present → verify →
						revoke loop. Future EU eIDAS 2.0 wallets, Apple Wallet,
						Google Wallet, and the current EUDI Wallet ecosystem all
						speak this protocol family.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="issuer"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Issuer setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Declare what credentials you offer + a resolver that
						produces the claim bag. The package handles SD-JWT
						signing, selective-disclosure hash math, cnf holder
						binding, and the c_nonce ceremony. Pre-authorized_code
						flow only in this cycle; auth-code flow follows when a
						consumer asks.
					</p>
					<PrismPlus
						codeString={issuerSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="offer-flow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Credential offer flow
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mint an offer, hand the QR / deeplink to the wallet. The
						wallet trades the pre-auth code at the regular OIDC
						<code> /oauth2/token</code> endpoint, then POSTs its
						proof-of-possession JWT to <code>/vci/credential</code>.
						The package verifies the proof signature, mints the
						SD-JWT VC bound to the wallet&apos;s key.
					</p>
					<PrismPlus
						codeString={issuerOfferFlow}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="verifier"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Verifier (OID4VP)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Accept presentations from any wallet. Mint a request
						(returns a <code>request_uri</code> for the wallet
						deeplink), the wallet POSTs back a key-binding-signed
						<code> vp_token</code>, the package verifies every link
						in the chain (issuer signature, holder binding,
						requested-claim coverage, optional status check) and
						fires your hook.
					</p>
					<PrismPlus
						codeString={verifierFlow}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="status"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Revocation: Status List
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Bitstring Status List (draft-ietf-oauth-status-list-12).
						Compressed bitmap in a signed JWT, served from a stable
						URL. Each credential references its slot via the
						<code> status</code> claim; verifiers check the bit at
						verify time. Re-signs on every fetch so revocations land
						immediately. Postgres stores for offers, nonces, and
						presentation requests all ship alongside.
					</p>
					<PrismPlus
						codeString={statusListFlow}
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
