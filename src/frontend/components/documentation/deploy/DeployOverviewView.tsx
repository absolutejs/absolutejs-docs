import { animated } from '@react-spring/web';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#deploy-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#targets', label: 'Targets' },
	{ href: '#pipeline', label: 'Pipeline' },
	{ href: '#process-managers', label: 'Process Managers' },
	{ href: '#verify', label: 'Verify' },
	{ href: '#annotations', label: 'Annotations & Resume' },
	{ href: '#rollback', label: 'Rollback & Prune' }
];

export const DeployOverviewView = ({
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
						. Two are bundled. Anything else that satisfies that
						contract is a valid target — Cloudflare Workers API, Fly
						Machines API, AWS Fargate task-run all ship as sibling
						packages because they don't fit the exec+upload shape.
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
