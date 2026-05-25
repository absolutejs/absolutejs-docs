import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	impersonationEnd,
	impersonationStart
} from '../../../../data/documentation/authImpersonationDocsCode';
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
	{ href: '#start', label: 'Start (audited, step-up)' },
	{ href: '#exit', label: 'Exit & detect' }
];

export const AuthImpersonationView = ({
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
					<h1 id="auth-impersonation" style={h1Style(isMobileOrTablet)}>
						Admin Impersonation
					</h1>
					<p style={paragraphLargeStyle}>
						Scoped, audited &quot;log in as user&quot; for support and
						ops. Short-lived, step-up-gated, fully audit-logged, with a
						one-click return to the admin&apos;s own session.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Start (audited, step-up)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>startImpersonation</code> mints a short-lived session
						for the target, stamped with an <code>impersonator</code>{' '}
						(RFC 8693 actor semantics: who, and a required reason),
						captures the admin&apos;s session to return to, and emits an{' '}
						<code>impersonation_started</code> event. Gate it behind
						your admin auth and a step-up — it&apos;s privileged.
					</p>
					<PrismPlus
						codeString={impersonationStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="exit"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Exit &amp; detect
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>endImpersonation</code> restores the admin&apos;s
						original session (or clears the cookie) and emits{' '}
						<code>impersonation_ended</code>.{' '}
						<code>isImpersonating</code> flags any impersonated session
						so your UI can show a banner.
					</p>
					<PrismPlus
						codeString={impersonationEnd}
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
