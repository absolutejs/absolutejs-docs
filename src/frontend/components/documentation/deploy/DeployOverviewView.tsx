import { animated } from '@react-spring/web';
import { PackageExplanation } from '../../../../types/packageDocs';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	deployAnnotations,
	deployPipeline,
	deployProcessManagers,
	deployQuickStart,
	deployRollback,
	deployTargets,
	deployVerify
} from '../../../data/documentation/deployDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';
import { PackageExplanationBlocks } from '../packages/PackageExplanationBlocks';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#deploy-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#infrastructure-providers', label: 'Infrastructure Providers' },
	{ href: '#release-control-plane', label: 'Release Control Plane' },
	{ href: '#global-ingress-lifecycle', label: 'Global Edge Ingress' },
	{ href: '#managed-preview-lifecycle', label: 'Managed Previews' },
	{ href: '#targets', label: 'Targets' },
	{ href: '#pipeline', label: 'Pipeline' },
	{ href: '#process-managers', label: 'Process Managers' },
	{ href: '#verify', label: 'Verify' },
	{ href: '#annotations', label: 'Annotations & Resume' },
	{ href: '#rollback', label: 'Rollback & Prune' }
];

const infrastructureRows: string[][] = [
	[
		'DigitalOcean',
		'@absolutejs/deploy/digitalocean-infrastructure',
		'Droplets and regional placement'
	],
	[
		'Google Cloud',
		'@absolutejs/deploy/gcp',
		'Immutable templates and managed operations'
	],
	[
		'Hetzner',
		'@absolutejs/deploy/hetzner-infrastructure',
		'Cloud servers and locations'
	],
	[
		'Linode',
		'@absolutejs/deploy/linode-infrastructure',
		'Instances and regional placement'
	],
	[
		'Vultr',
		'@absolutejs/deploy/vultr-infrastructure',
		'Instances and regional placement'
	]
];

const deployExplanations: PackageExplanation[] = [
	{
		description:
			'Releases are immutable inputs whose transitions remain observable and recoverable.',
		id: 'release-control-plane',
		kind: 'lifecycle',
		steps: [
			{
				detail: 'Create or stream an immutable artifact with integrity metadata.',
				label: 'Artifact'
			},
			{
				detail: 'Upload into a versioned release directory without mutating current.',
				label: 'Stage'
			},
			{
				detail: 'Install, build, and verify before publication.',
				label: 'Verify'
			},
			{
				detail: 'Atomically move the current pointer and restart.',
				label: 'Publish'
			},
			{
				detail: 'Retain evidence, stop superseded releases, or roll back by id.',
				label: 'Operate'
			}
		],
		title: 'Release control plane'
	},
	{
		description:
			'Global ingress normalizes provider resources while preserving TLS termination at the regional edge.',
		id: 'global-ingress-lifecycle',
		kind: 'flow',
		steps: [
			{
				detail: 'Declare listeners, health checks, and ordered regional backends.',
				label: 'Desired state'
			},
			{
				detail: 'Construct DigitalOcean or GCP provider resources idempotently.',
				label: 'Reconcile'
			},
			{
				detail: 'Wait for provider operations before exposing dependent resources.',
				label: 'Converge'
			},
			{
				detail: 'Return normalized addresses, state, and provider references.',
				label: 'Observe'
			}
		],
		title: 'Global edge ingress lifecycle'
	},
	{
		description:
			'Managed previews make temporary environments explicit resources with ownership and garbage collection.',
		id: 'managed-preview-lifecycle',
		kind: 'lifecycle',
		steps: [
			{
				detail: 'Bind a commit, artifact, owner, expiry, and idempotency key.',
				label: 'Request'
			},
			{
				detail: 'Provision ephemeral infrastructure and encrypted storage when required.',
				label: 'Provision'
			},
			{
				detail: 'Deploy, verify, publish DNS/TLS, and expose the preview URL.',
				label: 'Publish'
			},
			{
				detail: 'Reconcile expiry or closure and clean every provider resource.',
				label: 'Collect'
			}
		],
		title: 'Managed preview lifecycle'
	}
];

export const DeployOverviewView = ({
	currentPageId,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet,
	onNavigate
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
					<h1 id="deploy-overview" style={h1Style(isMobileOrTablet)}>
						Deploy
					</h1>
					<p style={paragraphLargeStyle}>
						A deploy pipeline for Bun projects on your own servers.
						A <code>Target</code> is anywhere you can run a command
						and copy a file — a DigitalOcean Droplet over SSH, a
						Linode box, your own laptop. Two ops, four words:
						<strong> exec and upload</strong>. Zero{' '}
						<code>ssh2</code> npm dependency — the bundled{' '}
						<code>sshTarget</code> shells out to the system{' '}
						<code>ssh</code> + <code>rsync</code> binaries.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default pipeline for a Bun project on Linux:
						<code>
							{' '}
							prepare → upload → install → build → link → restart
							→ verify
						</code>
						. Releases live in <code>releases/&lt;id&gt;/</code>, a{' '}
						<code>current</code> symlink swaps atomically,{' '}
						<code>rollback(id)</code> re-points the symlink and
						restarts without re-uploading.
					</p>
					<PrismPlus
						codeString={deployQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="infrastructure-providers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Infrastructure Providers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The normalized <code>InfrastructureProvider</code>{' '}
						contract covers declared capabilities, node identity and
						state, inventory, idempotent provisioning, termination,
						and regional placement across five clouds.
					</p>
					<DocsTable
						columns={['Provider', 'Import', 'Surface']}
						rows={infrastructureRows}
						themeSprings={themeSprings}
					/>
				</section>

				<PackageExplanationBlocks
					explanations={deployExplanations}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<AnchorHeading
						id="targets"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Targets
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A <code>Target</code> is just{' '}
						<code>
							{`{ exec(cmd, opts?), upload(local, remote, opts?), close?() }`}
						</code>
						. Two are bundled. Provider-native control planes that
						do not fit the exec-and-upload shape use typed adapters
						and package entry points, while infrastructure providers
						expose a shared reconciliation contract.
					</p>
					<PrismPlus
						codeString={deployTargets}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pipeline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pipeline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default pipeline is a plain array of{' '}
						<code>DeployStep</code> objects — splice in your own,
						drop ones you don't want, replace the lot. Each step
						receives a <code>DeployContext</code> with{' '}
						<code>{`{ target, source, releaseId, releasePath, currentPath, env, hooks, annotations, dryRun }`}</code>
						.
					</p>
					<PrismPlus
						codeString={deployPipeline}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="process-managers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Process Managers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						How files-on-disk become a running process is pluggable.
						<code> bareManager</code> is the zero-dep default (nohup
						+ pid file). <code>systemdManager</code> generates a
						templated unit pointing at <code>current/</code> and
						runs the daemon-reload + restart dance. Anything that
						implements <code>{`{ reload, stop?, status? }`}</code>{' '}
						against a <code>Target</code> works — wrap PM2,
						supervisord, runit, or <code>@absolutejs/runtime</code>{' '}
						as needed.
					</p>
					<PrismPlus
						codeString={deployProcessManagers}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="verify"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Verify
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTTP / TCP / custom probes with retries. The deploy is
						only successful after verify passes — a green deploy
						that nobody can reach is a yellow deploy. Recommend
						always wiring one.
					</p>
					<PrismPlus
						codeString={deployVerify}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="annotations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Annotations, Dry-Run, Resume
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Per-release metadata persists as{' '}
						<code>releases/&lt;id&gt;/.deploy-meta.json</code>:
						commit SHA, ref, message, author, arbitrary tags.{' '}
						<code>dryRun: true</code> logs the plan without mutating
						the target — verify pipeline shape from CI before
						flipping a real <code>current</code> symlink. If a
						deploy fails on <code>verify</code> (slow health check)
						but the release is intact on disk,{' '}
						<code>resumeReleaseId</code> restarts from the dead
						step.
					</p>
					<PrismPlus
						codeString={deployAnnotations}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rollback"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rollback & Prune
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Rollback re-points <code>current</code> at a previous
						release and restarts — no re-upload, no re-install, no
						re-build. <code>prune({'{ keep: N }'})</code> drops the
						oldest releases. Every deploy + rollback auto-cleans a
						dangling <code>current.next</code> from a prior crash.
					</p>
					<PrismPlus
						codeString={deployRollback}
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
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
