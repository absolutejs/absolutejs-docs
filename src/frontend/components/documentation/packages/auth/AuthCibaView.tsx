import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	cibaApproval,
	cibaConfig,
	cibaFlow
} from '../../../../data/documentation/authCibaDocsCode';
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
	{ href: '#config', label: 'Configure CIBA' },
	{ href: '#approval', label: 'Approval UI' },
	{ href: '#flow', label: 'Wire flow' }
];

export const AuthCibaView = ({
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
					<h1 id="auth-ciba" style={h1Style(isMobileOrTablet)}>
						CIBA — Approve On Your Phone
					</h1>
					<p style={paragraphLargeStyle}>
						OpenID Client-Initiated Backchannel Authentication, poll
						mode. The user isn&apos;t at a browser — a call-center
						agent, an ATM, a kiosk requests auth on their behalf;
						the user approves on their second device. Banking,
						healthcare, high-trust enterprise scenarios. Shipped in{' '}
						<code>0.36.0</code> as part of the FAPI 2.0
						baseline-ready cycle.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configure CIBA
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						You provide the user-resolver (login_hint → user) and
						the push-notification hook. The package owns the authReq
						lifecycle (storage, expiry, poll-rate enforcement) and
						the new endpoints.
					</p>
					<PrismPlus
						codeString={cibaConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="approval"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Approval UI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your approval screen calls{' '}
						<code>approveBackchannelAuth</code> or{' '}
						<code>denyBackchannelAuth</code>. The package handles
						the rest — the polling client&apos;s next call to{' '}
						<code>/oauth2/token</code> receives the token set (or
						the denial) automatically.
					</p>
					<PrismPlus
						codeString={cibaApproval}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="flow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wire flow
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three protocol responses the client polls through:{' '}
						<code>authorization_pending</code> while the user
						decides, <code>slow_down</code> if poll-rate enforcement
						trips, then the token set on approval. Ping + push
						delivery modes follow when a consumer asks.
					</p>
					<PrismPlus
						codeString={cibaFlow}
						language="bash"
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
