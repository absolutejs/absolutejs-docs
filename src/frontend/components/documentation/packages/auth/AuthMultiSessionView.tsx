import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	guestSession,
	multiSession
} from '../../../../data/documentation/authMultiSessionDocsCode';
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
	{ href: '#multi-session', label: 'Switch accounts' },
	{ href: '#guest', label: 'Guest sessions' }
];

export const AuthMultiSessionView = ({
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
					<h1 id="auth-multi-session" style={h1Style(isMobileOrTablet)}>
						Multi-session &amp; Guest
					</h1>
					<p style={paragraphLargeStyle}>
						Keep several accounts logged in at once with a switcher, and
						mint guest sessions that upgrade to a real account on sign-up.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-session"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Switch accounts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The active session stays in the normal{' '}
						<code>user_session_id</code> cookie; a second{' '}
						<code>ring</code> cookie tracks the full set.{' '}
						<code>addToSessionRing</code> after each login,{' '}
						<code>listRingSessions</code> for the switcher,{' '}
						<code>switchActiveSession</code>, and{' '}
						<code>removeFromSessionRing</code> to sign one out.
					</p>
					<PrismPlus
						codeString={multiSession}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="guest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Guest sessions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createAnonymousSession</code> flags the session{' '}
						<code>anonymous</code> (detect it with{' '}
						<code>isAnonymousSession</code>) for trials or a pre-sign-up
						cart. Upgrading is just a normal login — read the guest
						session first to migrate its data.
					</p>
					<PrismPlus
						codeString={guestSession}
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
