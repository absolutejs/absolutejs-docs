import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeUpdatesBuildPublish,
	nativeUpdatesConfig,
	nativeUpdatesEvents,
	nativeUpdatesExpoConfig,
	nativeUpdatesExpoSigning,
	nativeUpdatesKeys,
	nativeUpdatesOperate,
	nativeUpdatesProvision,
	nativeUpdatesRolloutConfig
} from '../../../data/documentation/native/nativeUpdatesDocsCode';
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
	{ href: '#what-can-update', label: 'What can update' },
	{ href: '#store-policy', label: 'Store policy' },
	{ href: '#keys', label: 'Signing keys' },
	{ href: '#update-server', label: 'Update server' },
	{ href: '#ship-an-update', label: 'Ship an update' },
	{ href: '#rollout', label: 'Staged rollout' },
	{ href: '#safety', label: 'Automatic rollback' },
	{ href: '#commands', label: 'Commands' },
	{ href: '#events', label: 'Events' }
];

const updateScopeRows: ComparisonRow[] = [
	{ feature: 'Page JavaScript and CSS', values: [true, false] },
	{
		feature: 'HTML, HTMX documents and static assets',
		values: [true, false]
	},
	{
		feature: 'Device features, plugins and permissions',
		values: [false, true]
	},
	{ feature: 'Deep-link hosts and scheme', values: [false, true] },
	{ feature: 'Auth client and offline Sync schema', values: [false, true] },
	{
		feature: 'Update endpoint, channel and public keys',
		values: [false, true]
	}
];

const classificationItems: DefinitionItem[] = [
	{
		description: 'Fixes to behaviour the reviewed app already has.',
		term: 'bug-fix'
	},
	{
		description: 'Security fixes to the reviewed app.',
		term: 'security'
	},
	{
		description:
			'New content within the app’s reviewed purpose, such as copy, images or catalogue pages.',
		term: 'content'
	}
];

const storageRows = [
	['ABSOLUTE_MOBILE_UPDATE_S3_BUCKET', 'Bucket for releases and receipts'],
	[
		'ABSOLUTE_MOBILE_UPDATE_S3_REGION',
		'Bucket region; auto for Cloudflare R2'
	],
	[
		'ABSOLUTE_MOBILE_UPDATE_S3_ENDPOINT',
		'Endpoint for R2, MinIO, Backblaze B2 and other S3-compatible services'
	],
	[
		'ABSOLUTE_MOBILE_UPDATE_S3_FORCE_PATH_STYLE',
		'Set to 1 for services that need path-style URLs, such as MinIO'
	],
	[
		'ABSOLUTE_MOBILE_UPDATE_HEALTH_SECRET',
		'At least 32 random characters; signs health receipts'
	],
	['ABSOLUTE_EXPO_UPDATE_PRIVATE_KEY', 'Expo only: the RSA private key PEM']
];

const shipSteps: StepFlowStep[] = [
	{
		code: 'absolute mobile update build',
		description:
			'Builds your pages from unchanged app code, records the native fingerprint, and signs the manifest with your private key. The result is an immutable amu_ release directory.',
		title: 'Build and sign'
	},
	{
		code: 'absolute mobile update publish',
		description:
			'Uploads the release. Files are stored by their SHA-256, so bytes an earlier release already uploaded are not stored again.',
		title: 'Publish to a fraction of installs'
	},
	{
		code: 'absolute mobile update promote',
		description:
			'Widens the rollout. Each installation falls in a stable cohort, so the same devices stay in as the fraction grows.',
		title: 'Promote'
	}
];

const safetyItems: DefinitionItem[] = [
	{
		description:
			'Apps check the manifest signature against the public keys built into them, then check every file’s SHA-256 before using it.',
		term: 'Verified before use'
	},
	{
		description:
			'Only changed files are downloaded, six at a time on Wi-Fi and 4G, two on 3G and one on 2G or with data saver. Interrupted downloads resume where they stopped.',
		term: 'Efficient downloads'
	},
	{
		description:
			'A new release must render its first page within bootTimeoutMs (20 seconds by default, 5 to 120). If it does not, the app restores the previous release and quarantines the new one.',
		term: 'Boot watchdog'
	},
	{
		description:
			'Installs report downloaded, activated, rolled-back and quarantined anonymously. When 20% of at least 20 installs roll back, the rollout pauses and new checks get the previous release.',
		term: 'Fleet health'
	}
];

const commandRows = [
	['update provision', 'Create mobile.update.ts with local or S3 storage'],
	['update signing generate', 'Expo: create the RSA key and certificate'],
	['update build', 'Build and sign a release from your server entry'],
	['update publish <dir>', 'Upload a release, optionally with --rollout'],
	['update promote', 'Point the channel at a release, at a rollout fraction'],
	['update advance', 'Move to the next rollout stage'],
	['update pause · resume · cancel', 'Control the current rollout'],
	['update reconcile', 'Bring the rollout state up to date'],
	['update rollback', 'Return to an earlier release or the store build'],
	['update status', 'Show the active release, rollout and health'],
	['update storage', 'Report storage use and what could be pruned'],
	['update gc', 'Delete unreferenced releases; dry run unless --apply']
];

export const NativeUpdatesView = ({
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
					<h1 id="native-updates" style={h1Style(isMobileOrTablet)}>
						Over-the-air updates
					</h1>
					<p style={paragraphLargeStyle}>
						Ship fixes to installed apps without a store release.
						Updates are signed on your machine, served by your own
						server, rolled out in stages and rolled back
						automatically if a release fails to start. The same
						commands work for Capacitor and Expo.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-can-update"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What can update
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every store build carries a fingerprint of its native
						side, computed for you from your config and the device
						features you use. An update reaches only apps with the
						same fingerprint. Change anything native and you ship a
						store build; an app never receives code it might not be
						able to run.
					</p>
					<ComparisonTable
						columns={['Over the air', 'Needs a store build']}
						firstColumnLabel="Change"
						rows={updateScopeRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="store-policy"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Store policy
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Updates are for fixes and in-scope content, not for
						changing what the app does. Apple&apos;s App Review
						Guideline 2.5.2 does not allow downloaded code that
						introduces or changes features. Every update therefore
						carries a classification and your confirmation that it
						stays within the app&apos;s submitted purpose.
					</p>
					<DefinitionGrid
						items={classificationItems}
						themeSprings={themeSprings}
					/>
					<Callout themeSprings={themeSprings} title="When in doubt">
						Ship a normal App Store and Google Play build. You are
						responsible for whether a change needs review.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="keys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Signing keys
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Updates are signed with an ECDSA P-256 key. The private
						key stays on the machine that builds updates; only the
						public key goes in your config and your app.
					</p>
					<PrismPlus
						codeString={nativeUpdatesKeys}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeUpdatesConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>publicKeys</code> maps a key ID to a key. To
						rotate, add the new key, ship a store build, and start
						signing with the new ID; drop the old key once no
						installed version needs it.
					</p>
					<p style={paragraphSpacedStyle}>
						<strong>Expo</strong> also verifies the update response
						with an RSA certificate. Generate it once; the private
						key must live outside your project, and the certificate
						is committed and built into the app.
					</p>
					<PrismPlus
						codeString={nativeUpdatesExpoSigning}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={nativeUpdatesExpoConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="update-server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Update server
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your AbsoluteJS server hosts the updates itself, at{' '}
						<code>
							/__absolute/mobile/updates/production/update.json
						</code>{' '}
						on your production origin. Provisioning writes{' '}
						<code>mobile.update.ts</code>, the module that decides
						where releases are stored.
					</p>
					<PrismPlus
						codeString={nativeUpdatesProvision}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Local storage is refused in production. With S3, the
						server writes, reads and deletes a test object at
						startup, so a wrong bucket or missing permission fails
						before any app asks for an update. Grant it{' '}
						<code>GetObject</code>, <code>PutObject</code> and{' '}
						<code>DeleteObject</code>, and set these on the server
						only:
					</p>
					<DocsTable
						columns={['Variable', 'Purpose']}
						rows={storageRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ship-an-update"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Ship an update
					</AnchorHeading>
					<StepFlow steps={shipSteps} themeSprings={themeSprings} />
					<PrismPlus
						codeString={nativeUpdatesBuildPublish}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Apps check for an update after they start. A verified
						update is applied as soon as it finishes downloading,
						and Sync data and the signed-in session carry over.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rollout"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Staged rollout
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Configure stages and each promotion moves through them:
						5% for an hour with 20 reports, then 25% for six hours
						with 100 reports, then everyone, as long as no more than
						5% of installs roll back. With{' '}
						<code>automatic: true</code> the server advances
						qualifying stages itself; otherwise run{' '}
						<code>update advance</code>.
					</p>
					<PrismPlus
						codeString={nativeUpdatesRolloutConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Stages must increase and end at 1. A stage&apos;s
						failure ceiling must sit below the health{' '}
						<code>failureRate</code>, and staged rollout needs
						health reporting on.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="safety"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Automatic rollback
					</AnchorHeading>
					<DefinitionGrid
						items={safetyItems}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Health reports carry an anonymous installation ID and
						the outcome, nothing about the user, their session or
						their data.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="commands"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Commands
					</AnchorHeading>
					<PrismPlus
						codeString={nativeUpdatesOperate}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['absolute mobile …', 'What it does']}
						rows={commandRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="events"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Events
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pages can follow updates through the{' '}
						<code>absolute:mobile-update</code> event. Its{' '}
						<code>kind</code> is <code>download-progress</code>,{' '}
						<code>downloaded</code>, <code>activated</code>,{' '}
						<code>rolled-back</code>, <code>quarantined</code> or{' '}
						<code>failed</code>. Transfer details are counts and
						sizes only, never URLs or paths.
					</p>
					<PrismPlus
						codeString={nativeUpdatesEvents}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Updates that need new native code go through a{' '}
						<a href="/documentation/native-release">
							store release
						</a>
						.
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
