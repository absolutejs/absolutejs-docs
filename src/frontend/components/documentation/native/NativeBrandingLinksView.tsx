import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeAndroidFingerprint,
	nativeAppleAssociation,
	nativeAssociationCommands,
	nativeBrandingCommands,
	nativeBrandingConfig,
	nativeDeepLinksConfig,
	nativeLinksCode
} from '../../../data/documentation/native/nativeBrandingDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import {
	ComparisonTable,
	type ComparisonRow
} from '../../utils/ComparisonTable';
import {
	DefinitionGrid,
	type DefinitionItem
} from '../../utils/DefinitionGrid';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#artwork', label: 'Icons and splash' },
	{ href: '#generate', label: 'Generate' },
	{ href: '#deep-links', label: 'Deep links' },
	{ href: '#identities', label: 'Team ID and fingerprints' },
	{ href: '#association-files', label: 'Association files' },
	{ href: '#reading-links', label: 'Reading links in code' }
];

const artworkRows = [
	[
		{ code: 'icon' },
		'Required. The app icon on iOS and older Android launchers',
		'Square PNG, at least 1024×1024'
	],
	[
		{ code: 'android.foreground' },
		'Adaptive-icon artwork; keep it inside Android’s safe zone',
		'Transparent PNG, 1024×1024'
	],
	[
		{ code: 'android.backgroundColor' },
		'Adaptive-icon background color',
		'#RRGGBB, default #FFFFFF'
	],
	[
		{ code: 'android.backgroundImage' },
		'Adaptive-icon background image, in place of a color',
		'Opaque PNG, 1024×1024'
	],
	[
		{ code: 'android.monochrome' },
		'Turns on Android themed icons',
		'Transparent PNG, 1024×1024'
	],
	[
		{ code: 'ios.darkIcon' },
		'The iOS dark-appearance icon',
		'PNG, 1024×1024'
	],
	[
		{ code: 'ios.tintedIcon' },
		'The iOS tinted-appearance icon',
		'PNG, 1024×1024'
	],
	[
		{ code: 'splash.backgroundColor' },
		'Launch screen background, light mode',
		'#RRGGBB, default #FFFFFF'
	],
	[
		{ code: 'splash.darkBackgroundColor' },
		'Launch screen background, dark mode',
		'#RRGGBB, default #111111'
	],
	[
		{ code: 'splash.logoScale' },
		'Size of the centered icon on the launch screen',
		'0.1 to 0.4, default 0.2'
	],
	[
		{ code: 'splash.image' },
		'A finished launch image, used instead of the centered icon',
		'Square PNG, at least 2732×2732 (also splash.darkImage)'
	]
];

const assetsFlagItems: DefinitionItem[] = [
	{
		description:
			'Also writes .absolutejs/mobile/branding/preview.html, showing the icon in each launcher mask and the launch screens.',
		term: '--preview'
	},
	{
		description:
			'Fails if any platform in mobile.platforms is out of date with your artwork. Good for CI.',
		term: '--check'
	},
	{
		description:
			'Installs the pinned icon generator without asking, on the first run.',
		term: '--yes'
	},
	{
		description: 'Prints the status as JSON for scripts.',
		term: '--json'
	}
];

const linkKindRows: ComparisonRow[] = [
	{
		feature: 'Example',
		values: ['https://shop.example.com/orders/42', 'shop://open/orders/42']
	},
	{
		feature: 'Opens the app from a browser, email or message',
		values: [true, true]
	},
	{
		feature: 'Falls back to your website without the app',
		values: [true, false]
	},
	{
		feature: 'Proves you own the domain',
		values: [true, false]
	},
	{
		feature: 'Configured by',
		values: ['deepLinks.hosts and your server', 'deepLinks.scheme']
	}
];

const deepLinkFieldRows = [
	[
		{ code: 'scheme' },
		'The custom URL scheme. Defaults to your appId in lowercase.'
	],
	[
		{ code: 'hosts' },
		'Extra domains that open the app. Your productionOrigin host is always included. Hostnames only: no ports, wildcards or paths.'
	],
	[
		{ code: 'apple.appIdPrefix' },
		'Your Apple Team ID, ten letters or digits. Required in production when iOS is a platform.'
	],
	[
		{ code: 'android.sha256CertificateFingerprints' },
		'The SHA-256 fingerprint of every certificate that signs a build people install. Required in production when Android is a platform.'
	]
];

const identitySteps: StepFlowStep[] = [
	{
		description:
			'Sign in to developer.apple.com and open Account → Membership details. The Team ID is your appIdPrefix.',
		title: 'Apple Team ID'
	},
	{
		code: nativeAndroidFingerprint,
		description:
			'Read the SHA-256 fingerprint of the key you sign releases with from its keystore.',
		title: 'Your Android signing key'
	},
	{
		description:
			'If Google Play signs your app, also add the app signing key’s SHA-256 from the App integrity page in Play Console. People who install from Play get builds signed with that key.',
		title: 'Google Play’s signing key'
	}
];

const associationRows = [
	[
		{ code: '/.well-known/apple-app-site-association' },
		'iOS universal links',
		'Your Team ID and appId, matching every path'
	],
	[
		{ code: '/.well-known/assetlinks.json' },
		'Android app links',
		'Your appId and certificate fingerprints'
	]
];

export const NativeBrandingLinksView = ({
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
						id="native-branding-links"
						style={h1Style(isMobileOrTablet)}
					>
						Branding & Deep Links
					</h1>
					<p style={paragraphLargeStyle}>
						One PNG becomes every icon and launch screen on iOS and
						Android, and links to your site open the right screen in
						your app. Both are configured in{' '}
						<code>absolute.config.ts</code>; you never edit an asset
						catalog or an intent filter.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="artwork"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Icons and splash
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Only <code>icon</code> is required. Each optional field
						refines one platform, and anything you leave out is made
						from the icon. Paths are relative to the project, and
						each file can be up to 32 MiB.
					</p>
					<PrismPlus
						codeString={nativeBrandingConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['branding.', 'What it is', 'Format']}
						rows={artworkRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="generate"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Generate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>mobile assets</code> produces every size each
						platform needs, including Android’s monochrome icon and
						iOS’s dark and tinted icons. <code>mobile sync</code>{' '}
						runs it for you whenever the artwork or config changes.
					</p>
					<PrismPlus
						codeString={nativeBrandingCommands}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={assetsFlagItems}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Edit the source, not the output"
					>
						Commit your source artwork and the generated native
						files, but change only the artwork and config: rerun{' '}
						<code>mobile assets</code> instead of editing Android
						launcher resources or the iOS{' '}
						<code>AppIcon.appiconset</code> by hand. The release
						check warns when branding is missing and fails when it
						is invalid or out of date.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="deep-links"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Deep links
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A link to{' '}
						<code>https://shop.example.com/orders/42</code> opens
						the app on the same page your site shows at{' '}
						<code>/orders/42</code>, whether the app was closed or
						already running. Universal links on iOS and app links on
						Android are the HTTPS kind; a custom scheme is the
						shorter fallback. In a custom-scheme link the word right
						after <code>shop://</code> is ignored and the path
						follows it, so <code>shop://open/orders/42</code> opens{' '}
						<code>/orders/42</code>; so does{' '}
						<code>shop:///orders/42</code>.
					</p>
					<ComparisonTable
						columns={['HTTPS links', 'Custom scheme']}
						rows={linkKindRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeDeepLinksConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['deepLinks.', 'Meaning']}
						rows={deepLinkFieldRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>mobile sync</code> writes these into the native
						projects: Android intent filters with automatic
						verification, and the iOS URL scheme and associated
						domains entitlement. Links that carry a username or
						password are refused. The sign-in callback uses the same
						scheme and is handled by{' '}
						<a href="/documentation/native-auth-sync">Auth</a>, not
						your pages.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="identities"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Team ID and fingerprints
					</AnchorHeading>
					<StepFlow
						steps={identitySteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Fingerprints can be written with or without colons and
						in any case.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="association-files"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Association files
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Apple and Google check that you own a domain by fetching
						a file from it. Your AbsoluteJS server serves both,
						built from your config, with no route to write:
					</p>
					<DocsTable
						columns={['Path', 'For', 'Contains']}
						rows={associationRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeAppleAssociation}
						language="json"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Required before production"
						variant="warning"
					>
						A production server will not start without{' '}
						<code>deepLinks.apple.appIdPrefix</code> when{' '}
						<code>mobile.platforms</code> includes iOS, or without{' '}
						<code>
							deepLinks.android.sha256CertificateFingerprints
						</code>{' '}
						when it includes Android, so a release never ships with
						links that silently open the browser. Development works
						without them.
					</Callout>
					<p style={paragraphSpacedStyle}>
						Every domain in <code>hosts</code> must serve the same
						files. If another server hosts one of them, write the
						files out and deploy them there. Once deployed,{' '}
						<code>--verify</code> fetches each host’s files and
						checks they match exactly, with no redirects.
					</p>
					<PrismPlus
						codeString={nativeAssociationCommands}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reading-links"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reading links in code
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Routing needs no code: the page for the link’s path
						opens by itself. To react to the link as well, such as
						recording where a visit came from, use{' '}
						<code>links</code> from{' '}
						<a href="/documentation/devices">@absolutejs/devices</a>
						. It works the same on the web, where the launch link is
						the page’s own URL.
					</p>
					<PrismPlus
						codeString={nativeLinksCode}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>openExternal</code> opens http and https links in
						the system browser in the app; on the web it also allows{' '}
						<code>mailto:</code> and <code>tel:</code>.
					</p>
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
