import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	adaptiveEngine,
	adaptiveLogin,
	adaptiveTrust,
	adaptiveWeighted
} from '../../../../data/documentation/authAdaptiveDocsCode';
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
	{ href: '#engine', label: 'Engine & Rules' },
	{ href: '#assess', label: 'Assess & Act' },
	{ href: '#trust', label: 'Trusting Devices' },
	{ href: '#weighted', label: 'Weighted scoring & fingerprint' }
];

export const AuthAdaptiveView = ({
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
					<h1 id="auth-adaptive" style={h1Style(isMobileOrTablet)}>
						Adaptive Auth
					</h1>
					<p style={paragraphLargeStyle}>
						Score every login by risk — new device, new country,
						impossible travel, attempt velocity — and react: allow,
						force a step-up, or deny. An opinionated engine that builds
						on the step-up and MFA gates, with geo you supply (no
						bundled GeoIP).
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="engine"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Engine &amp; Rules
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Bind the known-device and login-history stores once with{' '}
						<code>createRiskEngine</code>. Four rules ship in-box —{' '}
						<code>new_device</code>, <code>new_country</code>,{' '}
						<code>impossible_travel</code>, <code>velocity</code> — and
						every rule&apos;s action and threshold is overridable. The
						verdict is the most severe rule that fired (allow &lt;
						step_up &lt; deny).
					</p>
					<PrismPlus
						codeString={adaptiveEngine}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="assess"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Assess &amp; Act
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>assessRisk</code> in your login or OAuth-callback
						handler, where the request context (device, IP, geo) is
						available — the credentials MFA gate only sees the user, so
						adaptive auth is consumer-invoked by design. Record the
						attempt, then act: <code>deny</code> blocks,{' '}
						<code>step_up</code> routes into the MFA gate,{' '}
						<code>allow</code> proceeds.
					</p>
					<PrismPlus
						codeString={adaptiveLogin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="trust"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Trusting Devices
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Once the user clears the step-up, call{' '}
						<code>trustDevice</code> — the &quot;remember this
						device&quot; action — so the <code>new_device</code> rule
						stops firing for it. Device first/last-seen and the full
						attempt history persist in the two stores (in-memory for
						dev, Postgres/Neon for production).
					</p>
					<PrismPlus
						codeString={adaptiveTrust}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="weighted"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Weighted scoring &amp; fingerprint
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>scoreRisk</code> is an Auth0-style alternative to the
						per-rule actions: each fired signal adds its weight and the
						summed score maps to an action via thresholds. It adds two
						consumer-fed signals — <code>proxy</code> and{' '}
						<code>off_hours</code> (from <code>isProxy</code> /{' '}
						<code>localHour</code>). <code>fingerprintDevice</code> hashes
						client signals into a stable <code>deviceId</code> — a stronger
						default than a User-Agent string alone.
					</p>
					<PrismPlus
						codeString={adaptiveWeighted}
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
