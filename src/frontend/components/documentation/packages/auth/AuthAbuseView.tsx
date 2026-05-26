import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	abuseCaptcha,
	abuseGuard,
	abuseLogin
} from '../../../../data/documentation/authAbuseDocsCode';
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
	{ href: '#guard', label: 'The guard' },
	{ href: '#captcha', label: 'CAPTCHA adapters' },
	{ href: '#wire', label: 'Wire into login' }
];

export const AuthAbuseView = ({
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
					<h1 id="auth-abuse" style={h1Style(isMobileOrTablet)}>
						Bot &amp; Abuse Protection
					</h1>
					<p style={paragraphLargeStyle}>
						An allow / challenge / deny pipeline over IP allow-deny
						lists, a CAPTCHA hook, and a bot classifier — the self-hosted
						framework half of WorkOS &quot;Radar&quot; (which is
						hosted-only). Composes with the adaptive risk engine.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="guard"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The guard
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createAbuseGuard</code> owns the decision pipeline; you
						supply the signals: <code>ipDeny</code> / <code>ipAllow</code>{' '}
						(exact or IPv4 CIDR), a <code>verifyCaptcha</code> wrapping
						your provider, and a <code>classifyBot</code> (the built-in
						UA heuristic, or your own AI-agent detector). Honest scope:
						fingerprint-grade detection needs a data network — this is
						the framework and hooks.
					</p>
					<PrismPlus
						codeString={abuseGuard}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="captcha"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CAPTCHA adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Built-in <code>verifyTurnstile</code>,{' '}
						<code>verifyRecaptcha</code> (with an optional v3{' '}
						<code>minScore</code>), and <code>verifyHcaptcha</code> wrap
						each provider&apos;s <code>siteverify</code> call (the client
						IP is taken from the assess context). Drop one into{' '}
						<code>verifyCaptcha</code> — no extra plumbing.
					</p>
					<PrismPlus
						codeString={abuseCaptcha}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wire"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wire into login
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>assess</code> at the top of register / login with
						the request context. The result is the most severe action
						that fired plus every reason; an allow-listed IP
						short-circuits.
					</p>
					<PrismPlus
						codeString={abuseLogin}
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
