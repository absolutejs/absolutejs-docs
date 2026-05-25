import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	auditSiem,
	auditTamperEvident,
	auditVerify
} from '../../../../data/documentation/authAuditIntegrityDocsCode';
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
	{ href: '#tamper-evident', label: 'Tamper-evident chain' },
	{ href: '#verify', label: 'Verify the chain' },
	{ href: '#siem', label: 'SIEM streaming' }
];

export const AuthAuditIntegrityView = ({
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
						id="auth-audit-integrity"
						style={h1Style(isMobileOrTablet)}
					>
						Tamper-evident Audit &amp; SIEM
					</h1>
					<p style={paragraphLargeStyle}>
						Hash-chain the audit log so any modified, removed, or
						reordered entry is detectable — something WorkOS&apos;s
						audit product doesn&apos;t offer — and stream every event to
						your SIEM.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="tamper-evident"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tamper-evident chain
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createTamperEvidentSink</code> wraps any audit sink
						and hash-chains each event to the one before it (HMAC-SHA256
						with a secret, so an attacker who can write rows still
						can&apos;t forge the chain). The link is stored under{' '}
						<code>metadata.__integrity</code> — no schema change.
					</p>
					<PrismPlus
						codeString={auditTamperEvident}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="verify"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Verify the chain
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>verifyAuditChain</code> walks the events oldest-first,
						recomputes each link, and returns the index of the first
						break — deterministic even after a jsonb round-trip reorders
						keys.
					</p>
					<PrismPlus
						codeString={auditVerify}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="siem"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						SIEM streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createSiemLogStream</code> forwards every event to
						Datadog, Splunk HEC, or any HTTP collector — the parity
						piece to WorkOS Log Streams. Best-effort and isolated per
						endpoint.
					</p>
					<PrismPlus
						codeString={auditSiem}
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
