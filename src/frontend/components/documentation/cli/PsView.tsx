import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	psCommand,
	psKillCommand,
	psOutput,
	psPortConflict
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { TerminalFrame } from '../../utils/TerminalFrame';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#orphans', label: 'Catching orphans' },
	{ href: '#stopping', label: 'Stopping servers' },
	{ href: '#port-conflicts', label: 'Port conflicts' }
];

export const PsView = ({
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
					<h1 id="ps" style={h1Style(isMobileOrTablet)}>
						absolute ps
					</h1>
					<p style={paragraphLargeStyle}>
						List and manage every running AbsoluteJS server on the
						machine — including orphans no registry knows about.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute ps</code> prints a table of the dev,
						start, and compiled servers currently running — name,
						port, pid, uptime, memory, and status. Add{' '}
						<code>--watch</code> for an auto-refreshing dashboard
						that adds a memory peak and trend sparkline per server,
						and lets you stop the highlighted server (<code>s</code>
						) or free its port (<code>f</code>, prefilled) without
						typing it, or <code>--json</code> for scripting.
					</p>
					<PrismPlus
						codeString={psCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="orphans"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Catching orphans
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Rather than trusting a registry file, <code>ps</code>{' '}
						scans the machine&apos;s listening sockets (via{' '}
						<code>lsof</code>, falling back to <code>ss</code>) and
						unions the result with the servers AbsoluteJS launched.
						So it still shows a server whose dev controller died, a
						hand-run <code>bun dist/server.js</code> build, or
						anything else holding a port — these appear with the{' '}
						<code>untracked</code> source so you always know what is
						actually running.
					</p>
					<TerminalFrame
						command={psOutput.command}
						output={psOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stopping"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stopping servers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass <code>--kill</code> a pid or a port to stop a
						single server (handy for freeing a port an orphan is
						squatting), or <code>--kill-all</code> to clear every
						running server at once.
					</p>
					<PrismPlus
						codeString={psKillCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="port-conflicts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Port conflicts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When <code>absolute dev</code> finds its port already
						taken, it names the process holding it before falling
						back to the next port — so you can decide whether to{' '}
						<code>absolute ps --kill</code> it or move on.
					</p>
					<TerminalFrame
						command={psPortConflict.command}
						output={psPortConflict.output}
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
