import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	guestSession,
	multiSession,
	refreshSessionUser
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
import { DefinitionGrid, DefinitionItem } from '../../../utils/DefinitionGrid';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { TriageItem, TriageList } from '../../../utils/TriageList';
import { DocsNavigation } from '../../DocsNavigation';

const ringApiItems: DefinitionItem[] = [
	{
		description: 'Call after each login.',
		term: 'addToSessionRing',
		tone: 'info'
	},
	{
		description: 'Lists the full set, for the switcher UI.',
		term: 'listRingSessions',
		tone: 'info'
	},
	{
		description: 'Makes another ring session the active one.',
		term: 'switchActiveSession',
		tone: 'info'
	},
	{
		description: 'Signs one account out of the ring.',
		term: 'removeFromSessionRing',
		tone: 'info'
	}
];

const staleUserTriage: TriageItem[] = [
	{
		problem:
			'Role-gated routes keep returning 403 after a role grant, ban, or tier change',
		steps: [
			{
				action: (
					<>
						The <code>user</code> that <code>protectRoute</code> and{' '}
						<code>userStatus</code> hand you is the snapshot
						serialized into the session at login — it is not re-read
						from your user table per request, so a change made after
						login stays invisible to that user&apos;s live sessions
						even though the row is correct.
					</>
				),
				label: 'Cause'
			},
			{
				action: (
					<>
						Call <code>refreshUserSessions</code> from your own
						mutator after the write to push the fresh{' '}
						<code>user</code> into every active session for that
						user.
					</>
				),
				label: 'Fix'
			}
		]
	}
];

const tocItems: TocItem[] = [
	{ href: '#multi-session', label: 'Switch accounts' },
	{ href: '#guest', label: 'Guest sessions' },
	{ href: '#refresh-user', label: 'Refresh session user' }
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
					<h1
						id="auth-multi-session"
						style={h1Style(isMobileOrTablet)}
					>
						Multi-session &amp; Guest
					</h1>
					<p style={paragraphLargeStyle}>
						Keep several accounts logged in at once with a switcher,
						and mint guest sessions that upgrade to a real account
						on sign-up.
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
						<code>ring</code> cookie tracks the full set.
					</p>
					<DefinitionGrid
						items={ringApiItems}
						themeSprings={themeSprings}
					/>
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
						<code>isAnonymousSession</code>) for trials or a
						pre-sign-up cart. Upgrading is just a normal login —
						read the guest session first to migrate its data.
					</p>
					<PrismPlus
						codeString={guestSession}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="refresh-user"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Refresh session user
					</AnchorHeading>
					<TriageList
						items={staleUserTriage}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={refreshSessionUser}
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
