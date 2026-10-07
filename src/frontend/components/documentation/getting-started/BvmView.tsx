import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	bvmActivate,
	bvmInstallNpm,
	bvmInstallUnix,
	bvmInstallWindows,
	bvmPinProject,
	bvmQuickstart,
	bvmSelfUpdate,
	bvmUninstall,
	bvmUseShell,
	bvmVerifyOutput
} from '../../../data/documentation/bvmDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { TerminalFrame } from '../../utils/TerminalFrame';

const tocItems: TocItem[] = [
	{ href: '#install', label: 'Install' },
	{ href: '#quickstart', label: 'Quick start' },
	{ href: '#pin-a-project', label: 'Pin a project' },
	{ href: '#patched-builds', label: 'AbsoluteJS builds' },
	{ href: '#verification', label: 'Verification' },
	{ href: '#commands', label: 'Commands' },
	{ href: '#environment', label: 'Environment variables' },
	{ href: '#updating', label: 'Updating and removing' },
	{ href: '#troubleshooting', label: 'Troubleshooting' }
];

const commandItems: DefinitionItem[] = [
	{
		description:
			'Install a version: an exact one (1.4.2, 1.4.2-absolute.1), latest (newest official Bun) or absolute (newest AbsoluteJS build). --default also makes it the default.',
		term: 'bvm install <version> [--default]'
	},
	{
		description:
			'Remove an installed version. The default is refused unless you pass --force, since bun would stop working outside projects that pin a version.',
		term: 'bvm uninstall <version> [--force]'
	},
	{
		description:
			'Use a version in this shell only. Needs the bvm shell function, which the installer sets up.',
		term: 'bvm use <version>'
	},
	{
		description:
			'Set the version used everywhere nothing else selects one.',
		term: 'bvm default <version>'
	},
	{
		description:
			'List installed versions, marking the one selected here and the default.',
		term: 'bvm ls'
	},
	{
		description:
			'List versions available to install; --absolute lists AbsoluteJS builds.',
		term: 'bvm ls-remote [--absolute]'
	},
	{
		description: 'Show the version selected here, and why.',
		term: 'bvm current'
	},
	{
		description:
			'Print the path of the Bun binary selected here, or of a given version.',
		term: 'bvm which [version]'
	},
	{
		description: 'Run one command with a given version.',
		term: 'bvm exec <version> -- <command>'
	},
	{
		description:
			'Print the shell code that puts bvm on PATH (eval "$(bvm env)"); --shell fish or powershell for those shells.',
		term: 'bvm env [--shell sh|fish|powershell]'
	},
	{
		description:
			'Install the bun and bunx shims and add bvm to your shell startup files. The installers run this for you.',
		term: 'bvm setup'
	},
	{
		description:
			'Replace bvm with the newest release, after checking its signature.',
		term: 'bvm self update'
	},
	{
		description:
			'Remove bvm, keeping one Bun in ~/.bun/bin. Choose it with the arrow keys, or pass --keep <version>, --keep-default or --remove-bun; --yes skips the confirmation (required without a terminal).',
		term: 'bvm self uninstall'
	},
	{
		description: 'Print the version of bvm itself.',
		term: 'bvm -v, -V, --version'
	}
];

const environmentItems: DefinitionItem[] = [
	{
		description:
			'Where bvm keeps its shims and Bun versions. Defaults to ~/.bvm (%USERPROFILE%\\.bvm on Windows).',
		term: 'BVM_DIR'
	},
	{
		description:
			'Overrides every other way of choosing a version; bvm use sets it for the current shell.',
		term: 'BVM_BUN_VERSION'
	},
	{
		description:
			'Set to 0 to stop bun from installing a version a project pins the first time it runs there.',
		term: 'BVM_AUTO_INSTALL'
	},
	{
		description:
			'Optional. bvm ls-remote lists releases through the GitHub API, which rate-limits anonymous use; install and self update do not need it.',
		term: 'GITHUB_TOKEN'
	},
	{
		description:
			'Turns off colored output. CLICOLOR_FORCE=1 turns it on where bvm would not, such as a CI log.',
		term: 'NO_COLOR'
	}
];

const troubleshootingItems: DefinitionItem[] = [
	{
		description:
			'The installer could not link bvm into a directory on that terminal\'s PATH. Run the line it printed, eval "$("$HOME/.bvm/bin/bvm" env)", or open a new terminal.',
		term: 'bvm: command not found right after installing'
	},
	{
		description:
			'Another bun earlier on PATH (such as ~/.bun/bin) wins in a terminal opened before bvm was set up. New terminals put ~/.bvm/bin first; bvm current shows which version runs and why.',
		term: 'bun still runs another version'
	},
	{
		description:
			'A program cannot change its parent shell, so bvm use works through a shell function the installer adds. For a single command, use bvm exec.',
		term: 'bvm use says it needs the shell function'
	}
];

export const BvmView = ({
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
					<h1 id="bvm" style={h1Style(isMobileOrTablet)}>
						bvm: Bun versions
					</h1>
					<p style={paragraphLargeStyle}>
						Install, switch and verify Bun versions on Linux, macOS
						and Windows, the way nvm does for Node. Each project
						runs the Bun it pins, and nothing runs until its
						signature checks out.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="install"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Install
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<strong>Linux, macOS and WSL.</strong> The script
						downloads the bvm binary for your machine, checks it
						against the release&apos;s signed checksum list, and
						sets up your shell:
					</p>
					<PrismPlus
						codeString={bvmInstallUnix}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>bvm</code> works in the terminal you installed
						from whenever a directory already on its PATH is yours
						to write, such as <code>~/.local/bin</code> on most
						Linux setups: the installer links bvm there. Otherwise
						it says so and prints one line that activates it in that
						terminal. New terminals are always set up: the installer
						adds bvm to the startup file of the shell you use (
						<code>.bashrc</code>, <code>.zshrc</code>,{' '}
						<code>.bash_profile</code> on macOS, or fish&apos;s{' '}
						<code>conf.d</code>), creating it if it does not exist
						yet.
					</p>
					<PrismPlus
						codeString={bvmActivate}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Already have Bun?</strong> The installer finds
						it (Bun&apos;s own installer, Homebrew, npm or Scoop),
						installs that same version through bvm, verified, and
						makes it your default, so <code>bun</code> keeps meaning
						the version it meant and <code>bvm ls</code> is not
						empty. bvm&apos;s shims go ahead of the old Bun on PATH;
						you can remove the old install whenever you like.
						Output is colored on a terminal; set{' '}
						<code>NO_COLOR</code> to turn that off.
					</p>
					<p style={paragraphSpacedStyle}>
						<strong>Windows (PowerShell).</strong> bvm works in the
						same window right away, and in new ones: the script adds
						it to your user PATH, tells running programs the PATH
						changed, and sets up the PowerShell profile your
						PowerShell actually loads.
					</p>
					<PrismPlus
						codeString={bvmInstallWindows}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>npm.</strong> The <code>@absolutejs/bvm</code>{' '}
						package installs the same signed binary for your
						platform, and npm&apos;s global bin directory is already
						on your PATH. AbsoluteJS projects already depend on it,
						so <code>absolute dev</code> can use bvm without a
						separate install.
					</p>
					<PrismPlus
						codeString={bvmInstallNpm}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quickstart"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>bun</code> and <code>bunx</code> become shims:
						each call runs the version selected for the directory
						you are in.
					</p>
					<PrismPlus
						codeString={bvmQuickstart}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pin-a-project"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pin a project
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						bvm picks the version in this order:{' '}
						<code>BVM_BUN_VERSION</code>, the nearest{' '}
						<code>.bun-version</code> file in this directory or a
						parent, the nearest <code>package.json</code>{' '}
						<code>engines.bun</code> (the newest installed version
						that satisfies it), then your default. A version a
						project pins exactly is installed, and verified, the
						first time it runs there. The same{' '}
						<code>.bun-version</code> file is read by{' '}
						<code>setup-bun</code> in CI, so your machine and CI
						agree.
					</p>
					<PrismPlus
						codeString={bvmPinProject}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={bvmUseShell}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="patched-builds"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AbsoluteJS builds
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Versions such as <code>1.4.2-absolute.1</code> are
						official Bun with one fix: <code>Bun.Transpiler</code>{' '}
						honors <code>reactFastRefresh</code>, so React edits in{' '}
						<code>absolute dev</code> keep component state instead
						of reloading the page (
						<a href="https://github.com/oven-sh/bun/issues/32919">
							oven-sh/bun#32919
						</a>
						). They are built and published at{' '}
						<a href="https://github.com/absolutejs/patched-bun">
							absolutejs/patched-bun
						</a>
						. <code>absolute dev</code> offers to install the right
						one through bvm on stock Bun;{' '}
						<code>absolute bun-patch</code> does it by hand.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="verification"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Verification
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Official Bun is checked against Bun&apos;s own signed
						checksum list (<code>SHASUMS256.txt.asc</code>, PGP key{' '}
						<code>
							F3DC C08A 8572 C074 9B3E 1888 8EAB 4D40 A7B2 2B59
						</code>
						, the key Bun&apos;s Docker images pin). AbsoluteJS
						builds and bvm&apos;s own updates are checked against an
						Ed25519 signature by the AbsoluteJS release key. Both
						keys are compiled into bvm, so a mirror or a modified
						download cannot pass as either; a download that fails is
						never installed.
					</p>
					<TerminalFrame
						command={bvmVerifyOutput.command}
						output={bvmVerifyOutput.output}
					/>
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
					<DefinitionGrid
						items={commandItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="environment"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Environment variables
					</AnchorHeading>
					<DefinitionGrid
						items={environmentItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="updating"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Updating and removing
					</AnchorHeading>
					<PrismPlus
						codeString={bvmSelfUpdate}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>bvm self uninstall</code> removes bvm and keeps
						one Bun where Bun&apos;s own installer puts it (
						<code>~/.bun/bin</code>, or <code>$BUN_INSTALL</code>),
						with <code>bunx</code> beside it, so <code>bun</code>{' '}
						and <code>bun upgrade</code> keep working. On a terminal
						you choose it with the arrow keys: your default is
						preselected, and a Bun you had before bvm is offered as
						it is. bvm shows exactly what it will change and asks
						before doing it. It takes its lines out of your shell
						startup files (on Windows, the user PATH and PowerShell
						profile) and leaves the rest of those files as they
						were. Global packages in <code>~/.bun</code> are never
						touched.
					</p>
					<PrismPlus
						codeString={bvmUninstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="troubleshooting"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Troubleshooting
					</AnchorHeading>
					<DefinitionGrid
						items={troubleshootingItems}
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
