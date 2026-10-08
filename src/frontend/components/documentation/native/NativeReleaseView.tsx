import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeReleaseAndroidSigning,
	nativeReleaseBuild,
	nativeReleaseCertificationConfig,
	nativeReleaseCertify,
	nativeReleaseCi,
	nativeReleaseDoctor,
	nativeReleaseIosSigning,
	nativeReleasePromote,
	nativeReleasePublish,
	nativeReleaseRegistryAndroid,
	nativeReleaseRegistryIos
} from '../../../data/documentation/native/nativeReleaseDocsCode';
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
import { ChecklistRows } from '../../utils/ChecklistRows';
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
	{ href: '#path-to-the-stores', label: 'Path to the stores' },
	{ href: '#release-doctor', label: 'Release doctor' },
	{ href: '#build-and-sign', label: 'Build and sign' },
	{ href: '#certify', label: 'Certify' },
	{ href: '#publish', label: 'Publish' },
	{ href: '#ci', label: 'GitHub Actions' },
	{ href: '#promote', label: 'Promote without rebuilding' }
];

const releaseSteps: StepFlowStep[] = [
	{
		code: 'absolute mobile doctor release',
		description:
			'Checks the native projects, config and dependencies for anything that must not reach a store build, such as development servers, debugging flags or cleartext traffic.',
		title: 'Check the release'
	},
	{
		code: 'absolute mobile build android|ios',
		description:
			'Builds your server and pages, syncs the native project, runs the release doctor again and produces a signed Android App Bundle or iOS IPA in its own content-addressed directory.',
		title: 'Build and sign'
	},
	{
		code: 'absolute mobile test --release · mobile certify',
		description:
			'Installs that exact artifact, runs the acceptance checks, and binds the report to the artifact’s digest.',
		title: 'Certify'
	},
	{
		code: 'absolute mobile publish android|ios',
		description:
			'Hands the certified artifact to your release module, which uploads it to Google Play or TestFlight. Version codes and build numbers are allocated for you.',
		title: 'Publish'
	}
];

const doctorGroups: DefinitionItem[] = [
	{
		description:
			'The production origin is HTTPS, deep-link identities are complete, dependency versions are locked, and branding is configured.',
		term: 'App-wide'
	},
	{
		description:
			'App identity, bundle integrity, Content Security Policy, deep links, and the update watchdog matching your updates config.',
		term: 'Each platform'
	},
	{
		description:
			'No HMR assets, development journal, dev certificate authority, cleartext traffic, android:debuggable, WebView debugging or iOS get-task-allow.',
		term: 'Development residue'
	},
	{
		description:
			'Exported Android components are deliberate, and iOS App Transport Security and the marketing version are set.',
		term: 'Platform specifics'
	},
	{
		description:
			'Native packages, permissions, usage strings, the privacy manifest and push setup match the device features your code imports.',
		term: 'Device features'
	},
	{
		description:
			'The offline Sync schema is valid, and the update server uses durable storage that it can actually write to.',
		term: 'Data and updates'
	}
];

const manualReviewItems = [
	'Test on a physical device',
	'Complete the store privacy questionnaires',
	'Publish a privacy policy',
	'Keep signing keys in your custody',
	'Review the data practices of third-party native SDKs'
];

const certificationRows = [
	[
		'installed',
		'Android',
		'The exact AAB is installed through Bundletool and launched, offline and online'
	],
	['simulator', 'iOS', 'The exact archive runs in the iOS Simulator'],
	['device', 'iOS', 'Installed and run on a physical iPhone or iPad'],
	['store', 'iOS', 'Delivered through TestFlight and run on a device']
];

const publishFlagRows = [
	['--play-track', 'internal, alpha, beta, production or a custom track'],
	['--play-rollout', 'Fraction of users for a staged rollout, such as 0.1'],
	['--play-status', 'completed, draft, halted or in-progress'],
	['--play-notes', 'Release notes as language=text; repeatable'],
	['--play-update-priority', 'In-app update priority from 0 to 5'],
	['--testflight-group', 'Beta group name or ID'],
	['--testflight-notes', 'What to Test, as locale=text; repeatable'],
	['--testflight-submit-review', 'Submit the build for beta app review'],
	['--release', 'Publish an existing release directory instead of building'],
	['--registry', 'Release module to use; defaults to mobile.release.ts']
];

const androidSecretRows = [
	['ABSOLUTE_ANDROID_KEYSTORE_BASE64', 'Base64 Android upload keystore'],
	['ABSOLUTE_ANDROID_KEYSTORE_PASSWORD', 'Keystore password'],
	['ABSOLUTE_ANDROID_KEY_ALIAS', 'Upload key alias'],
	['ABSOLUTE_ANDROID_KEY_PASSWORD', 'Upload key password'],
	[
		'ABSOLUTE_GOOGLE_CREDENTIALS_BASE64',
		'Google service-account JSON; only to publish to a Play track'
	]
];

const iosSecretRows = [
	['ABSOLUTE_IOS_CERTIFICATE_BASE64', 'Base64 Apple Distribution .p12'],
	['ABSOLUTE_IOS_CERTIFICATE_PASSWORD', '.p12 password'],
	[
		'ABSOLUTE_IOS_PROVISIONING_PROFILE_BASE64',
		'Base64 App Store provisioning profile'
	],
	['ABSOLUTE_IOS_KEYCHAIN_PASSWORD', 'Password for the temporary keychain'],
	['ABSOLUTE_IOS_DEVELOPMENT_TEAM', 'Ten-character Apple team ID'],
	['APP_STORE_CONNECT_ISSUER_ID', 'App Store Connect API issuer'],
	['APP_STORE_CONNECT_KEY_ID', 'App Store Connect API key ID'],
	[
		'APP_STORE_CONNECT_PRIVATE_KEY_BASE64',
		'Base64 .p8 key; only to publish to TestFlight'
	]
];

export const NativeReleaseView = ({
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
					<h1 id="native-release" style={h1Style(isMobileOrTablet)}>
						Release
					</h1>
					<p style={paragraphLargeStyle}>
						Build signed store artifacts, prove the exact artifact
						works, and publish it to Google Play and TestFlight from
						your machine or from a generated GitHub Actions
						workflow.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="path-to-the-stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Path to the stores
					</AnchorHeading>
					<StepFlow
						steps={releaseSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Run every command from your app&apos;s root, the
						directory with <code>package.json</code> and{' '}
						<code>absolute.config.ts</code>. Each release lands in
						its own directory under{' '}
						<code>.absolutejs/mobile/releases</code>, named by the
						hash of its contents, so the artifact you certify is the
						artifact you publish.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="release-doctor"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Release doctor
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The release doctor runs on its own and as part of every
						build. A failed check stops the build; a warning is
						reported and does not.
					</p>
					<PrismPlus
						codeString={nativeReleaseDoctor}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={doctorGroups}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Some things no tool can check for you. The doctor lists
						them as manual review on every run:
					</p>
					<ChecklistRows
						items={manualReviewItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-and-sign"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build and sign
					</AnchorHeading>
					<PrismPlus
						codeString={nativeReleaseBuild}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Android.</strong> Configure a release{' '}
						<code>signingConfig</code> in the Android project in{' '}
						<code>mobile/android</code>, or set all four of these
						variables and AbsoluteJS signs the bundle with your
						upload key. The bundle must pass signature verification
						before it is kept.
					</p>
					<PrismPlus
						codeString={nativeReleaseAndroidSigning}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>iOS.</strong> Builds use Xcode automatic signing
						and export for App Store Connect. Set your team, and set{' '}
						<code>mobile.ios.version</code> to the marketing version
						you are shipping. On Linux or Windows, the build runs on
						a Mac you have paired over SSH.
					</p>
					<PrismPlus
						codeString={nativeReleaseIosSigning}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Unsigned builds"
					>
						A build that ends up unsigned stops with an error. Pass{' '}
						<code>--unsigned</code> only for a build you will not
						publish.
					</Callout>
					<Callout
						themeSprings={themeSprings}
						title="Apps that use push"
					>
						The iOS project is set up for development push so builds
						from Xcode sign. The App Store distribution profile must
						switch the exported app to production push, or Apple
						rejects every device’s push token and nobody receives
						notifications. The build reads the entitlements signed
						into the exported IPA and stops if{' '}
						<code>aps-environment</code> is not{' '}
						<code>production</code>; enable Push Notifications on
						your App ID and use a distribution profile that includes
						it. Since 0.20.0-beta.136.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="certify"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Certify
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A certification records that a specific artifact passed
						its acceptance checks. It is tied to the artifact&apos;s
						digest, so it cannot be reused for a different build.
						Production releases require one by default: installed
						evidence for Android and store-delivered evidence for
						iOS.
					</p>
					<PrismPlus
						codeString={nativeReleaseCertify}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Evidence', 'Platform', 'What it proves']}
						rows={certificationRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For iOS, stronger evidence satisfies weaker
						requirements: store covers device, and device covers
						simulator. Set the requirement per release channel and
						per Google Play track, or set{' '}
						<code>certification: false</code> to turn the gate off.
					</p>
					<PrismPlus
						codeString={nativeReleaseCertificationConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="publish"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Publish
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Publishing goes through a release module in your
						project, <code>mobile.release.ts</code> by default. It
						keeps every release and its certification in your
						storage, then uploads to the store with{' '}
						<a href="/documentation/deploy">@absolutejs/deploy</a>.
						Credentials stay in the module&apos;s environment and
						are never passed as command-line flags. Google Play uses
						Application Default Credentials.
					</p>
					<PrismPlus
						codeString={nativeReleaseRegistryAndroid}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						TestFlight uses an App Store Connect API key. Keep it in
						a second module and pick it with <code>--registry</code>
						.
					</p>
					<PrismPlus
						codeString={nativeReleaseRegistryIos}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeReleasePublish}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Flag', 'Meaning']}
						rows={publishFlagRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The Play version code and the Apple build number are
						allocated during publishing and recorded, so a retried
						publish reuses them rather than uploading twice.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ci"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						GitHub Actions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One command writes{' '}
						<code>.github/workflows/absolute-mobile.yml</code> with
						validate, Android and iOS jobs. Pull requests build
						without any secrets. Release jobs run in a protected{' '}
						<code>absolute-mobile-release</code> environment, sign
						their certifications through GitHub&apos;s OIDC
						identity, and clean up every credential file when they
						finish. Add <code>--secret-env</code> for each variable
						your release module reads.
					</p>
					<PrismPlus
						codeString={nativeReleaseCi}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Create the <code>absolute-mobile-release</code>{' '}
						environment under Settings › Environments, require a
						reviewer, and store these secrets there:
					</p>
					<DocsTable
						columns={['Android secret', 'Purpose']}
						rows={androidSecretRows}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['iOS secret', 'Purpose']}
						rows={iosSecretRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="promote"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Promote without rebuilding
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Promotion publishes the artifact a CI run already built
						and certified. Every step is recorded locally, so an
						interrupted promotion resumes where it stopped and is
						never dispatched twice.
					</p>
					<PrismPlus
						codeString={nativeReleasePromote}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Fixes that only change your pages do not need a store
						release at all.{' '}
						<a href="/documentation/native-updates">
							Over-the-air updates
						</a>{' '}
						ship them to installed apps directly.
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
