import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	cliEverydayFlow,
	cliUpdateFlow
} from '../../../data/documentation/native/nativeCliDocsCode';
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
import {
	DefinitionGrid,
	type DefinitionItem
} from '../../utils/DefinitionGrid';
import { DocsTable, type DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#everyday', label: 'Everyday flow' },
	{ href: '#dev', label: 'absolute dev' },
	{ href: '#setup', label: 'Setup and sync' },
	{ href: '#remote-mac', label: 'Remote Mac' },
	{ href: '#testing', label: 'Testing on devices' },
	{ href: '#release', label: 'Build and publish' },
	{ href: '#ci', label: 'CI' },
	{ href: '#updates', label: 'Over-the-air updates' },
	{ href: '#environment', label: 'Environment variables' }
];

const devItems: DefinitionItem[] = [
	{
		description:
			'Start the web server plus every configured mobile target: an Android emulator, and an iOS Simulator on macOS or a paired Mac. Mobile targets start only in an interactive terminal.',
		term: 'absolute dev [entry]'
	},
	{
		description:
			'Run on a connected Android phone. The serial comes from adb devices.',
		term: '--android-device <serial>'
	},
	{
		description:
			'Run on a connected iPhone, by identifier or name from xcrun devicectl list devices. Needs macOS or a paired Mac.',
		term: '--ios-device <identifier>'
	},
	{
		description:
			'Web only. Cannot be combined with the device flags. ABSOLUTE_NO_MOBILE=1 does the same.',
		term: '--no-mobile'
	},
	{
		description:
			'While running: press d for each device’s status, or type relaunch to restart the app.',
		term: 'd, relaunch'
	}
];

const setupItems: DefinitionItem[] = [
	{
		description:
			'Install the pinned native packages, write capacitor.config.ts and create the iOS and Android projects, then apply branding, deep links, permissions and the rest of your config. --no-native writes the config without creating projects; --force replaces a capacitor.config.ts you edited; --yes approves package installs.',
		term: 'mobile init [--no-native] [--force] [--yes]'
	},
	{
		description:
			'Bring the native projects up to date with your config and the device features your code imports. Run it after changing either.',
		term: 'mobile sync [ios|android] [--yes] [--force]'
	},
	{
		description:
			'Generate every icon and splash size from mobile.branding. --preview writes an HTML preview of the results; --check fails if the generated files are out of date.',
		term: 'mobile assets [ios|android] [--check] [--preview] [--json] [--yes]'
	},
	{
		description:
			'Read-only report of the mobile setup: config, native projects, packages and the packaged interface. --require-bundle fails unless the packaged interface is valid.',
		term: 'mobile inspect [--json] [--require-bundle]'
	},
	{
		description:
			'Check the Android SDK, emulator, Java and Xcode. --fix installs what is missing, after showing the plan.',
		term: 'mobile doctor [ios|android] [--remote name] [--json | --fix [--yes]]'
	},
	{
		description:
			'Write the Apple and Android association files for your deep-link hosts, or with --verify fetch them from each host and compare.',
		term: 'mobile associations [--outdir dir] [--verify]'
	}
];

const remoteItems: DefinitionItem[] = [
	{
		description:
			'Pair a Mac over SSH for iOS builds and simulators from Linux or Windows. The Mac needs Xcode, Bun and Remote Login. The last Mac you pair becomes the default.',
		term: 'mobile pair mac <name> <user@host> [--port n] [--workspace path]'
	},
	{
		description:
			'List paired Macs, inspect one, or remove abandoned project copies from it.',
		term: 'mobile remotes [inspect [name] | clean [name] --yes] [--json]'
	},
	{
		description: 'Forget a paired Mac.',
		term: 'mobile unpair mac <name>'
	}
];

const testItems: DefinitionItem[] = [
	{
		description:
			'Check routes in the running dev app, or install a release build and test it end to end: offline launch, live data and the network. --report writes evidence for mobile certify.',
		term: 'mobile test android [--release dir [--yes] | --route path [--wait-for-hmr] [--port n]] [--report [dir]] [--serial id] [--artifacts dir] [--json]'
	},
	{
		description:
			'The same for iOS, on a simulator or with --device on a real iPhone, optionally installed through TestFlight.',
		term: 'mobile test ios [--release dir [--remote name] [--device id [--testflight] --yes] | --wait-for-hmr] [--report [dir]] [--udid id] [--artifacts dir] [--json]'
	}
];

const releaseItems: DefinitionItem[] = [
	{
		description:
			'Check a release build for anything that must not ship: dev servers, debug flags, cleartext traffic, development certificates, missing link identities. Fails the build on errors.',
		term: 'mobile doctor release [ios|android] [--json]'
	},
	{
		description:
			'Build a signed Android App Bundle or iOS archive. --unsigned builds one that cannot be published; --registered-device-artifact also exports an IPA for registered test devices.',
		term: 'mobile build <android|ios> [server-entry] [--remote name] [--registered-device-artifact] [--outdir dir] [--web-outdir dir] [--unsigned]'
	},
	{
		description:
			'Bind test reports to one exact build. --require sets the evidence needed: installed (Android), or simulator, device or store (iOS). --verify checks an existing certification.',
		term: 'mobile certify <release-dir> [--evidence dir]... [--require level] [--outdir dir] [--json]'
	},
	{
		description:
			'Publish to Google Play: track, status, staged rollout fraction, release name and notes, update priority, and review options. Builds first unless --release is given.',
		term: 'mobile publish android [server-entry] [--release dir] [--certification dir] [--play-track track] [--play-status status] [--play-rollout fraction] [--play-name name] [--play-notes lang=text] [--play-update-priority 0..5] [--play-hold-review] [--play-cancel-existing-review]'
	},
	{
		description:
			'Publish to TestFlight, optionally to a group with notes, and submit for beta review.',
		term: 'mobile publish ios [server-entry] [--release dir] [--certification dir] [--remote name] [--testflight-group name] [--testflight-notes locale=text] [--testflight-submit-review]'
	}
];

const ciItems: DefinitionItem[] = [
	{
		description:
			'Write .github/workflows/absolute-mobile.yml: validation on pull requests, and signed Android and iOS builds in a protected environment. --publish adds store publishing; --secret-env passes extra secrets.',
		term: 'mobile ci github [server-entry] [--publish] [--registry module] [--secret-env NAME] [--output path] [--force] [--json]'
	},
	{
		description:
			'Publish a build that CI already made and tested, without rebuilding it. --resume continues a promotion that was interrupted.',
		term: 'mobile ci promote <android|ios> --run-id id --certification path [--channel] [--play-track | --testflight-group] [--watch] [--audit]'
	},
	{
		description:
			'List promotions, follow a workflow run, or download a run’s audit record.',
		term: 'mobile ci promotions | ci status --run-id id | ci audit --run-id id'
	}
];

const updateItems: DefinitionItem[] = [
	{
		description:
			'Create the mobile.update.ts registry that stores releases: local for development, s3 for production.',
		term: 'mobile update provision [--storage local|s3] [--registry module] [--force] [--yes]'
	},
	{
		description:
			'Expo only: create the certificate and private key Expo uses to verify updates. The key must be written outside your project.',
		term: 'mobile update signing generate --private-key path [--certificate path] [--key-id id] [--common-name name] [--validity-years n]'
	},
	{
		description:
			'Build and sign an update. You state what kind of change it is and confirm it stays within what the stores reviewed.',
		term: 'mobile update build [server-entry] --classification bug-fix|content|security --key-id id --signing-key path --within-submitted-purpose'
	},
	{
		description:
			'Upload an update and offer it to a fraction of installations.',
		term: 'mobile update publish <release-dir> [--rollout fraction]'
	},
	{
		description:
			'Change who gets an update: promote a release to a new fraction, move to the next stage, pause, resume or cancel a rollout.',
		term: 'mobile update promote | advance | pause | resume | cancel | reconcile'
	},
	{
		description:
			'Go back to a previous update, or with no --release, to the version that shipped in the store build.',
		term: 'mobile update rollback [--release id]'
	},
	{
		description:
			'See the current release, rollout and health; inspect storage; delete releases no longer needed (dry run unless --apply).',
		term: 'mobile update status | storage | gc [--retain n] [--min-age-days d] [--apply]'
	}
];

const environmentRows: DocsTableCell[][] = [
	[
		{ code: 'ABSOLUTE_NO_MOBILE' },
		'Set to 1 to start absolute dev without mobile targets.'
	],
	[
		{ code: 'ABSOLUTE_IOS_REMOTE' },
		'The paired Mac to use, instead of the default.'
	],
	[
		{ code: 'ABSOLUTE_IOS_DEVELOPMENT_TEAM' },
		'Your Apple team ID, used to sign iOS builds.'
	],
	[
		{ code: 'ANDROID_HOME' },
		'An existing Android SDK. Otherwise AbsoluteJS uses its own under ~/.absolutejs. ANDROID_SDK_ROOT also works.'
	],
	[
		{ code: 'ABSOLUTE_ANDROID_KEYSTORE_PATH' },
		'Sign Android release builds with this keystore. Set it with ABSOLUTE_ANDROID_KEYSTORE_PASSWORD, ABSOLUTE_ANDROID_KEY_ALIAS and ABSOLUTE_ANDROID_KEY_PASSWORD.'
	],
	[
		{ code: 'ABSOLUTE_MOBILE_UPDATE_S3_BUCKET' },
		'Where the update server stores releases, with standard AWS credentials. Optional: ABSOLUTE_MOBILE_UPDATE_S3_REGION, _ENDPOINT and _FORCE_PATH_STYLE=1 for S3-compatible storage.'
	],
	[
		{ code: 'ABSOLUTE_MOBILE_UPDATE_LOCAL_ROOT' },
		'Folder for update releases when the registry uses local storage.'
	],
	[
		{ code: 'ABSOLUTE_MOBILE_UPDATE_HEALTH_SECRET' },
		'Secret for update health reports, on the server only. Rename it with updates.server.health.secretEnv.'
	],
	[
		{ code: 'ABSOLUTE_EXPO_UPDATE_PRIVATE_KEY' },
		'Expo only: the private key that signs updates, on the server only.'
	]
];

type CommandSectionProps = {
	children?: ReactNode;
	id: string;
	items: DefinitionItem[];
	themeSprings: DocsViewProps['themeSprings'];
	title: string;
};

const CommandSection = ({
	children,
	id,
	items,
	themeSprings,
	title
}: CommandSectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id={id}
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			{title}
		</AnchorHeading>
		{children}
		<DefinitionGrid items={items} themeSprings={themeSprings} />
	</section>
);

export const NativeCliView = ({
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
					<h1 id="native-cli" style={h1Style(isMobileOrTablet)}>
						Mobile CLI Reference
					</h1>
					<p style={paragraphLargeStyle}>
						Every <code>absolute mobile</code> command, and the
						mobile flags of <code>absolute dev</code>. Run them from
						your project root with <code>bunx absolute</code>; each
						accepts <code>--config path</code> when your config is
						not <code>absolute.config.ts</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="everyday"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Everyday flow
					</AnchorHeading>
					<PrismPlus
						codeString={cliEverydayFlow}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<CommandSection
					id="dev"
					items={devItems}
					themeSprings={themeSprings}
					title="absolute dev"
				/>
				<CommandSection
					id="setup"
					items={setupItems}
					themeSprings={themeSprings}
					title="Setup and sync"
				/>
				<CommandSection
					id="remote-mac"
					items={remoteItems}
					themeSprings={themeSprings}
					title="Remote Mac"
				/>
				<CommandSection
					id="testing"
					items={testItems}
					themeSprings={themeSprings}
					title="Testing on devices"
				/>
				<CommandSection
					id="release"
					items={releaseItems}
					themeSprings={themeSprings}
					title="Build and publish"
				>
					<p style={paragraphSpacedStyle}>
						Store credentials live in your release module,{' '}
						<code>mobile.release.ts</code> by default (choose
						another with <code>--registry</code>), never on the
						command line.{' '}
						<a href="/documentation/native-release">Release</a>{' '}
						walks through signing and publishing.
					</p>
				</CommandSection>
				<CommandSection
					id="ci"
					items={ciItems}
					themeSprings={themeSprings}
					title="CI"
				/>
				<CommandSection
					id="updates"
					items={updateItems}
					themeSprings={themeSprings}
					title="Over-the-air updates"
				>
					<p style={paragraphSpacedStyle}>
						Every update command accepts{' '}
						<code>--registry module</code>, and the read commands
						accept <code>--json</code>. <code>update build</code>{' '}
						prints the release folder to publish.{' '}
						<a href="/documentation/native-updates">
							Over-the-air updates
						</a>{' '}
						covers keys and rollouts.
					</p>
					<PrismPlus
						codeString={cliUpdateFlow}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</CommandSection>

				<section style={sectionStyle}>
					<AnchorHeading
						id="environment"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Environment variables
					</AnchorHeading>
					<DocsTable
						columns={['Variable', 'What it does']}
						rows={environmentRows}
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
