import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	memCommand,
	memHeapSnapshot,
	memOutput
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#output', label: 'Reading the output' },
	{ href: '#heap-snapshots', label: 'Heap snapshots' }
];

export const MemView = ({
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
					<h1 id="mem" style={h1Style(isMobileOrTablet)}>
						absolute mem
					</h1>
					<p style={paragraphLargeStyle}>
						A memory report for your running servers — and a one-key
						heap snapshot when something is actually leaking.
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
						<code>absolute mem</code> lists every running AbsoluteJS
						server by resident memory (RSS), biggest first, alongside
						your system&apos;s total usage. It reads RSS externally —
						no server changes needed — so it works on dev, start,
						compiled, and untracked servers alike. Add{' '}
						<code>--json</code> for the per-server and system numbers
						in a scriptable shape (handy for CI memory budgets).
					</p>
					<PrismPlus
						codeString={memCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="output"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reading the output
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each row is a server with its RSS and a bar showing its
						share of total system memory, followed by the resident
						total and the system&apos;s used/free split. One caveat
						specific to Bun: RSS often stays high because the
						allocator doesn&apos;t return freed memory to the OS, so a
						big RSS isn&apos;t necessarily a leak — it&apos;s the
						fast, at-a-glance view. For the real leak signal, take a
						heap snapshot.
					</p>
					<PrismPlus
						codeString={memOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="heap-snapshots"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Heap snapshots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						While <code>absolute dev</code> is running, press{' '}
						<code>m</code> (or type <code>heap</code>) to dump a heap
						snapshot of the server to your project root. It&apos;s a
						standard V8 <code>.heapsnapshot</code> you can load in
						Chrome DevTools under Memory — where{' '}
						<code>heapUsed</code> growing across snapshots is the
						reliable sign of a real leak, unlike RSS. Also wired up:{' '}
						<code>absolute ps --watch</code> shows a live memory peak
						and trend sparkline per server.
					</p>
					<PrismPlus
						codeString={memHeapSnapshot}
						language="bash"
						showLineNumbers={false}
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
