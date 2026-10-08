import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	configExpo,
	configFull,
	configMinimal
} from '../../../data/documentation/native/nativeConfigDocsCode';
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
import { DocsTable, type DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#examples', label: 'Examples' },
	{ href: '#required', label: 'Required' },
	{ href: '#app', label: 'App and projects' },
	{ href: '#deep-links', label: 'Deep links' },
	{ href: '#branding', label: 'Branding' },
	{ href: '#push', label: 'Push notifications' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#updates', label: 'Updates' },
	{ href: '#release', label: 'Release policy' },
	{ href: '#expo', label: 'Expo only' }
];

const columns = ['Field', 'Type', 'Default', 'What it does'];

const field = (name: string) => ({ code: name });

const requiredRows: DocsTableCell[][] = [
	[
		field('appId'),
		'string',
		'Required',
		'Store identifier in reverse-domain form, such as com.example.shop. Each segment starts with a letter.'
	],
	[
		field('appName'),
		'string',
		'Required',
		'The name shown under the app icon.'
	],
	[
		field('server.productionOrigin'),
		'string',
		'Required',
		'Your deployed server, where the app loads page data and calls your API. HTTPS only (http is allowed on localhost), with no path, query, fragment or credentials.'
	]
];

const appRows: DocsTableCell[][] = [
	[
		field('engine'),
		"'capacitor' | 'expo'",
		"'capacitor'",
		'Capacitor builds every app. Choose Expo to write some screens in React Native.'
	],
	[
		field('entry'),
		'string',
		"'/'",
		'The route the app opens on. It must be one of your page routes.'
	],
	[
		field('platforms'),
		"('ios' | 'android')[]",
		"['ios', 'android']",
		'Which native projects to generate and build. At least one.'
	],
	[
		field('ios.version'),
		'string',
		'None',
		'App Store version, one to three numbers such as 1.4.0. Needed for App Store builds; build numbers are assigned for you.'
	],
	[
		field('nativeProject.directory'),
		'string',
		"'mobile'",
		'Where the android and ios projects live. With Expo the generated project defaults to .absolutejs/mobile/expo.'
	],
	[
		field('bundleDirectory'),
		'string',
		"'.absolutejs/mobile/web'",
		'Where the packaged interface is written before it is copied into the native projects. Must stay inside the project.'
	],
	[
		field('compatibility.store'),
		'string',
		'None',
		'Module whose default export is a blob store, such as awsS3BlobStore from @absolutejs/blob/aws-s3. Builds keep their release history there, so a fresh CI checkout still serves apps already installed. Since 0.20.0-beta.134.'
	],
	[
		field('compatibility.prefix'),
		'string',
		"'absolutejs/mobile-compatibility'",
		'Key prefix inside the store, for several apps or environments sharing one bucket.'
	]
];

const deepLinkRows: DocsTableCell[][] = [
	[
		field('deepLinks.scheme'),
		'string',
		'appId, lowercased',
		'Custom URL scheme such as shop://, also used for the sign-in callback.'
	],
	[
		field('deepLinks.hosts'),
		'string[]',
		'Your production host',
		'Extra HTTPS hosts whose links open the app. Plain hostnames: no port, wildcard or path. Your production host is always included.'
	],
	[
		field('deepLinks.apple.appIdPrefix'),
		'string',
		'None',
		'Your Apple App ID prefix, usually the ten-character Team ID. Required in production when iOS is a platform.'
	],
	[
		field('deepLinks.android.sha256CertificateFingerprints'),
		'string[]',
		'None',
		'SHA-256 fingerprints of every certificate that signs your Android builds, including Play App Signing. Colons are optional. Required in production when Android is a platform.'
	]
];

const brandingRows: DocsTableCell[][] = [
	[
		field('branding.icon'),
		'string',
		'Required if branding is set',
		'Square PNG, at least 1024×1024. Used for iOS and as the base of the Android icon.'
	],
	[
		field('branding.android.backgroundColor'),
		'#RRGGBB',
		"'#FFFFFF'",
		'Adaptive icon background colour.'
	],
	[
		field('branding.android.backgroundImage'),
		'string',
		'None',
		'Opaque 1024×1024 PNG used as the adaptive icon background instead of a colour.'
	],
	[
		field('branding.android.foreground'),
		'string',
		'Derived from icon',
		'Transparent 1024×1024 PNG kept inside Android’s safe zone.'
	],
	[
		field('branding.android.monochrome'),
		'string',
		'None',
		'Transparent single-colour 1024×1024 PNG for themed icons.'
	],
	[
		field('branding.ios.darkIcon'),
		'string',
		'None',
		'1024×1024 PNG for the dark appearance.'
	],
	[
		field('branding.ios.tintedIcon'),
		'string',
		'None',
		'1024×1024 PNG for the tinted appearance.'
	],
	[
		field('branding.splash.backgroundColor'),
		'#RRGGBB',
		"'#FFFFFF'",
		'Launch screen background in light mode.'
	],
	[
		field('branding.splash.darkBackgroundColor'),
		'#RRGGBB',
		"'#111111'",
		'Launch screen background in dark mode.'
	],
	[
		field('branding.splash.image'),
		'string',
		'None',
		'A finished square launch image, at least 2732×2732. Without one, your icon is centred on the background.'
	],
	[
		field('branding.splash.darkImage'),
		'string',
		'None',
		'The dark-mode launch image, at least 2732×2732.'
	],
	[
		field('branding.splash.logoScale'),
		'number',
		'0.2',
		'Size of the centred icon relative to the screen, from 0.1 to 0.4.'
	]
];

const pushRows: DocsTableCell[][] = [
	[
		field('pushNotifications.android.googleServicesFile'),
		'string',
		"'google-services.json'",
		'Firebase config for Android push. It must contain a client for your appId, and is copied into the Android project when you use pushNotifications.'
	]
];

const observabilityRows: DocsTableCell[][] = [
	[
		field('observability.project'),
		'string',
		'Required if observability is set',
		'Project name attached to every report, up to 255 characters.'
	],
	[
		field('observability.environment'),
		'string',
		'None',
		'Environment attached to reports, such as production. 1 to 64 characters.'
	],
	[
		field('observability.route'),
		'string',
		"'/api/observability/errors'",
		'The route on your production server that receives errors and native crash reports. Your server provides it.'
	],
	[
		field('observability.sampleRate'),
		'number',
		'1',
		'Fraction of errors sent, from 0 to 1.'
	]
];

const updateRows: DocsTableCell[][] = [
	[
		field('updates.publicKeys'),
		'Record<string, string>',
		'Required if updates is set',
		'Base64 DER ECDSA P-256 public keys, by key ID. Keep old IDs while installed apps still trust them.'
	],
	[
		field('updates.channel'),
		'string',
		"'production'",
		'The release channel this build follows.'
	],
	[
		field('updates.manifestUrl'),
		'string',
		'/__absolute/mobile/updates/<channel>/update.json on your server',
		'Where the app looks for updates. HTTPS only outside localhost.'
	],
	[
		field('updates.bootTimeoutMs'),
		'number',
		'20000',
		'How long a new update has to show its first page before the app rolls back. 5000 to 120000.'
	],
	[
		field('updates.expoCodeSigning'),
		'{ certificatePath, keyId? }',
		"keyId 'main'",
		'Expo only. The certificate Expo uses to verify updates; its private key stays on your server.'
	],
	[
		field('updates.server.autoMount'),
		'boolean',
		'true',
		'Serve updates from your AbsoluteJS server. The manifest must then be on productionOrigin and end in /update.json.'
	],
	[
		field('updates.server.registry'),
		'string',
		"'mobile.update.ts'",
		'The module that stores releases, created by absolute mobile update provision.'
	],
	[
		field('updates.server.health'),
		'false | { failureRate?, minimumReports?, secretEnv? }',
		'On: 0.2, 20, ABSOLUTE_MOBILE_UPDATE_HEALTH_SECRET',
		'Installed apps report whether updates start. A release whose failure rate passes failureRate after minimumReports is paused.'
	],
	[
		field('updates.server.rollout'),
		'false | { automatic?, stages? }',
		'Off',
		'Staged rollout. Default stages are 5%, 25% and 100%, each observed for 60 minutes with at most 5% failures. automatic moves through them on its own. Requires health.'
	],
	[
		field('updates.server.expoPrivateKeyEnv'),
		'string',
		"'ABSOLUTE_EXPO_UPDATE_PRIVATE_KEY'",
		'Expo only. Environment variable holding the private key that signs updates.'
	],
	[
		field('updates.server.expoCodeSigningKeys'),
		'Record<string, { certificatePath, privateKeyEnv }>',
		'None',
		'Expo only. Previous signing keys, kept while apps signed with them are still installed.'
	]
];

const releaseRows: DocsTableCell[][] = [
	[
		field('release.certification'),
		'false | { channels?, googlePlayTracks? }',
		'production: Android installed, iOS store',
		'What testing a release needs before it is published to a channel or Play track. channels maps a channel to android: installed and ios: simulator, device or store. false turns the requirement off.'
	]
];

const expoRows: DocsTableCell[][] = [
	[
		field('routes.native'),
		'Record<string, string>',
		'None',
		'Route patterns rendered by a React Native module. :name matches one segment; a final * matches the rest. Every other route stays your AbsoluteJS page.'
	],
	[
		field('routes.default'),
		"'web'",
		"'web'",
		'Routes not listed under native are your AbsoluteJS pages.'
	],
	[
		field('expo.sdkVersion'),
		'57',
		'57',
		'The Expo SDK the generated project uses.'
	]
];

type ConfigSectionProps = {
	id: string;
	intro?: string;
	rows: DocsTableCell[][];
	themeSprings: DocsViewProps['themeSprings'];
	title: string;
};

const ConfigSection = ({
	id,
	intro,
	rows,
	themeSprings,
	title
}: ConfigSectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id={id}
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			{title}
		</AnchorHeading>
		{intro && <p style={paragraphSpacedStyle}>{intro}</p>}
		<DocsTable columns={columns} rows={rows} themeSprings={themeSprings} />
	</section>
);

export const NativeConfigView = ({
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
					<h1 id="native-config" style={h1Style(isMobileOrTablet)}>
						Mobile Config Reference
					</h1>
					<p style={paragraphLargeStyle}>
						Every field of the <code>mobile</code> block in{' '}
						<code>absolute.config.ts</code>. Three are required;
						everything else has a default or is only needed for the
						feature it configures. After a change, run{' '}
						<code>bunx absolute mobile sync</code> to apply it to
						the native projects.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="examples"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Examples
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<strong>Minimal.</strong> Enough to develop and run on
						emulators, simulators and devices.
					</p>
					<PrismPlus
						codeString={configMinimal}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Ready for the stores.</strong> Branding, deep
						links, push, error reporting and over-the-air updates.
					</p>
					<PrismPlus
						codeString={configFull}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<ConfigSection
					id="required"
					rows={requiredRows}
					themeSprings={themeSprings}
					title="Required"
				/>
				<ConfigSection
					id="app"
					rows={appRows}
					themeSprings={themeSprings}
					title="App and projects"
				/>
				<ConfigSection
					id="deep-links"
					intro="Your server publishes the Apple and Android association files for these hosts automatically. A production server will not start while the identity for a configured platform is missing."
					rows={deepLinkRows}
					themeSprings={themeSprings}
					title="Deep links"
				/>
				<ConfigSection
					id="branding"
					intro="absolute mobile assets generates every icon and splash size from these images. Colours are #RRGGBB."
					rows={brandingRows}
					themeSprings={themeSprings}
					title="Branding"
				/>
				<ConfigSection
					id="push"
					intro="iOS push needs no config. Page code uses pushNotifications from @absolutejs/devices; the server side is set up in @absolutejs/auth."
					rows={pushRows}
					themeSprings={themeSprings}
					title="Push notifications"
				/>
				<ConfigSection
					id="observability"
					intro="JavaScript errors and native crashes, hangs and ANRs are sent to a route on your production server."
					rows={observabilityRows}
					themeSprings={themeSprings}
					title="Observability"
				/>
				<ConfigSection
					id="updates"
					intro="Signed over-the-air updates for your interface. Changes to native features still need a store build."
					rows={updateRows}
					themeSprings={themeSprings}
					title="Updates"
				/>
				<ConfigSection
					id="release"
					rows={releaseRows}
					themeSprings={themeSprings}
					title="Release policy"
				/>

				<section style={sectionStyle}>
					<AnchorHeading
						id="expo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Expo only
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>engine: &apos;expo&apos;</code>, two more
						fields are available. Every shared field above works the
						same way.
					</p>
					<PrismPlus
						codeString={configExpo}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={columns}
						rows={expoRows}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} title="Native routes">
						Patterns are canonical paths with no query or trailing
						slash, and a parameter name can appear only once. A root{' '}
						<code>/*</code> is not allowed, and{' '}
						<code>/__absolute/native</code> is reserved.{' '}
						<a href="/documentation/native-expo">Expo</a> covers
						writing these screens.
					</Callout>
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
