import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	auditSetup,
	complianceSetup,
	sessionsSetup,
	webhooksSetup
} from '../../../../data/documentation/authComplianceDocsCode';
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
	{ href: '#audit', label: 'Audit Logging' },
	{ href: '#sessions', label: 'Session Management' },
	{ href: '#compliance', label: 'GDPR Compliance' },
	{ href: '#webhooks', label: 'Signed Webhooks' }
];

export const AuthComplianceView = ({
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
					<h1 id="auth-compliance" style={h1Style(isMobileOrTablet)}>
						Audit, Compliance &amp; Webhooks
					</h1>
					<p style={paragraphLargeStyle}>
						The SOC 2 / GDPR tail: an append-only audit trail with PII
						redaction, self-service session management, data
						export/erasure, field encryption, and signed outbound
						webhooks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="audit"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Audit Logging
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An AuditSink (in-memory or Postgres) receives structured,
						append-only events from every flow. Redaction runs before
						any sink sees an event, dropping or pseudonymizing PII
						while keeping events correlatable.
					</p>
					<PrismPlus
						codeString={auditSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sessions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Session Management
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Let users list and revoke their own active sessions, and
						revoke all of a user&apos;s sessions on password reset.
						Requires an authSessionStore that can enumerate sessions.
					</p>
					<PrismPlus
						codeString={sessionsSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compliance"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						GDPR Compliance
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Self-service right-to-access (export) and right-to-erasure
						(delete) routes, delegated to your hooks — erasure also
						revokes the user&apos;s sessions and clears the cookie.
						createSecretCipher binds an AES-GCM key for encrypting
						sensitive fields at rest.
					</p>
					<PrismPlus
						codeString={complianceSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="webhooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Signed Webhooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Forward every auth event to your endpoints, HMAC-signed
						with the Standard Webhooks scheme (Svix-compatible).
						Delivery is best-effort and per-endpoint isolated, so a
						dead endpoint never breaks the auth flow.
					</p>
					<PrismPlus
						codeString={webhooksSetup}
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
