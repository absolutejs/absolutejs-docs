import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	certBoundTokens,
	discoveryAdvert,
	mtlsConfig
} from '../../../../data/documentation/authMtlsDocsCode';
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
	{ href: '#config', label: 'mTLS client auth' },
	{ href: '#cert-bound', label: 'Cert-bound tokens' },
	{ href: '#discovery', label: 'Discovery advertising' }
];

export const AuthMtlsView = ({
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
					<h1 id="auth-mtls" style={h1Style(isMobileOrTablet)}>
						mTLS &amp; Cert-Bound Tokens
					</h1>
					<p style={paragraphLargeStyle}>
						RFC 8705 mutual-TLS client authentication + cert-bound
						access tokens, shipped in <code>0.36.0</code>. Required
						for FAPI 2.0 baseline (open banking, healthcare, anything
						PSD2-aligned). Pairs with the existing DPoP, JAR, PAR,
						private_key_jwt, and dynamic client registration surfaces.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						mTLS client auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your reverse proxy terminates TLS and forwards the client
						cert via a request header. Default reader is RFC 9440&apos;s
						<code> Client-Cert: :&lt;base64-DER&gt;:</code> shape; override
						with <code>extractTlsClientCert</code> when your proxy
						uses something else (nginx X-SSL-Client-Cert, AWS ALB,
						Envoy, Caddy — all common shapes work).
					</p>
					<PrismPlus
						codeString={mtlsConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cert-bound"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cert-bound access tokens
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When mTLS authenticates at <code>/token</code>, the issued
						access token&apos;s <code>cnf</code> claim gets{' '}
						<code>x5t#S256</code> = SHA-256 of the cert DER. Resource
						servers verify the presented cert matches the binding —
						a stolen token is useless without the matching private
						key. Coexists with DPoP&apos;s <code>cnf.jkt</code>; a
						single token can be both DPoP- and cert-bound.
					</p>
					<PrismPlus
						codeString={certBoundTokens}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="discovery"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Discovery advertising
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The OpenID discovery doc auto-advertises mTLS support
						alongside every other token-endpoint auth method the package
						supports. RPs that probe discovery see the FAPI-grade signal
						set in one place.
					</p>
					<PrismPlus
						codeString={discoveryAdvert}
						language="json"
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
