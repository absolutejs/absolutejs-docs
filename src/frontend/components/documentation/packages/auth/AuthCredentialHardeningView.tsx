import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	backgroundEmailScan,
	breachCheckOnLogin,
	compromisedCredential,
	emailValidation,
	pruneInactiveUsersExample
} from '../../../../data/documentation/authCredentialHardeningDocsCode';
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
	{ href: '#email', label: 'Email validation' },
	{ href: '#compromised', label: 'Compromised credentials' },
	{ href: '#background-scan', label: 'Background breach re-scan' },
	{ href: '#prune-inactive', label: 'Prune inactive users' }
];

export const AuthCredentialHardeningView = ({
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
						id="auth-credential-hardening"
						style={h1Style(isMobileOrTablet)}
					>
						Credential Hardening
					</h1>
					<p style={paragraphLargeStyle}>
						Block junk emails at sign-up, and catch passwords that
						show up in a breach after the account already exists.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="email"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Email validation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>validateEmailDeliverability</code> checks format,
						blocks disposable domains (a starter list ships
						built-in; extend it), and optionally confirms the domain
						has MX records. <code>isDisposableEmail</code> is
						exposed on its own too.
					</p>
					<PrismPlus
						codeString={emailValidation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compromised"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Compromised credentials
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Sign-up already blocks breached passwords (the
						credentials policy&apos;s <code>checkBreaches</code>).
						The login-time check is the half of Auth0
						&quot;Credential Guard&quot; a self-hosted library can
						do: catch a password that was fine at sign-up but later
						leaked, and prompt a reset. Fails open on a HIBP outage.
					</p>
					<p style={paragraphSpacedStyle}>
						Turnkey: set <code>checkBreachesOnLogin: true</code> on
						the credentials config. A successful login then carries{' '}
						<code>passwordCompromised</code> in its response (it
						never blocks — the user is already authenticated).
					</p>
					<PrismPlus
						codeString={breachCheckOnLogin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Or call <code>isPasswordCompromised</code> yourself for
						full control over the response:
					</p>
					<PrismPlus
						codeString={compromisedCredential}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="background-scan"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Background breach re-scan
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>0.37.0</code> adds <code>runEmailBreachScan</code>{' '}
						— the email counterpart to the login-time password
						check. Walks your user population in cursor-paged
						batches against HIBP&apos;s <code>breachedaccount</code>{' '}
						API. Wire it up as a cron and notify users whose
						addresses show up in new breaches.
					</p>
					<PrismPlus
						codeString={backgroundEmailScan}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prune-inactive"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prune inactive users
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The other half of <code>0.37.0</code>&apos;s background
						ops: <code>pruneInactiveUsers</code> is a pure
						orchestrator that walks a paged user population,
						identifies anyone past the threshold, and lets you
						decide what &quot;prune&quot; means via the{' '}
						<code>onDelete</code> hook (soft-delete, hard-delete,
						disable + notify). <code>dryRun: true</code> reports
						candidates without touching anything.
					</p>
					<PrismPlus
						codeString={pruneInactiveUsersExample}
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
