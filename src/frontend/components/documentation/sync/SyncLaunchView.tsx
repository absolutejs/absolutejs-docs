import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle,
	tableCellStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DocsNavigation } from '../DocsNavigation';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#sync-179-launch', label: 'Sync 1.7.9 launch' },
	{ href: '#what-shipped', label: 'What shipped' },
	{ href: '#benchmarks', label: 'Benchmarks' },
	{ href: '#why-it-matters', label: 'Why it matters' },
	{ href: '#start-here', label: 'Start here' }
];

const shippedItems = [
	{
		packageName: '@absolutejs/ai',
		version: '0.0.12',
		feature: 'Code Mode host tools',
		result: 'Expose one run_code tool with typed TypeScript signatures for host capabilities, so an agent can chain multiple calls inside one sandboxed function.'
	},
	{
		packageName: '@absolutejs/sync',
		version: '1.7.6',
		feature: 'Handler metrics',
		result: 'Capture per-call duration, CPU, heap, success, and error data for sandboxed mutations without letting telemetry failures break user traffic.'
	},
	{
		packageName: '@absolutejs/sync',
		version: '1.7.7',
		feature: 'actions.now()',
		result: 'Move mutation time reads behind an engine-controlled API, setting up deterministic replay and optimistic rebase work.'
	},
	{
		packageName: '@absolutejs/sync',
		version: '1.7.8',
		feature: 'bridgeFetch',
		result: 'Let sandboxed mutations call allowlisted HTTP APIs while the host injects credentials that never enter the sandbox.'
	},
	{
		packageName: '@absolutejs/sync',
		version: '1.7.9',
		feature: 'MCP server',
		result: 'Expose collections, mutations, snapshots, inspection, and mutation runs through @absolutejs/sync/mcp for MCP-aware clients.'
	},
	{
		packageName: '@absolutejs/isolated-jsc',
		version: '0.6.0',
		feature: 'Context.compileCallable',
		result: 'Compile a sandboxed function once and call it repeatedly, which became the hot path for sync sandboxedHandler.'
	}
];

export const SyncLaunchView = ({
	currentPageId,
	themeSprings,
	tocOpen,
	onTocToggle,
	onNavigate,
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
					<h1 id="sync-179-launch" style={h1Style(isMobileOrTablet)}>
						Sync 1.7.9 Launch
					</h1>
					<p style={paragraphLargeStyle}>
						This release batch turns the competitive sync-engine
						complaints we keep hearing into shipped surface area:
						correct reconnect catch-up, fast in-process sandboxes,
						sandboxed user mutations, credential-brokered HTTP,
						per-call metrics, MCP access, and Code Mode for AI
						tools.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-shipped"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What shipped
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The batch spans three packages because the sync story
						now includes the engine, the sandbox runtime underneath
						it, and the AI tooling that can drive it.
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Package
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Feature
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Why it matters
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{shippedItems.map((item) => (
									<tr
										key={`${item.packageName}-${item.version}-${item.feature}`}
									>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code>{item.packageName}</code>
											<br />
											<span>{item.version}</span>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.feature}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{item.result}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="benchmarks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The benchmark hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The headline numbers are intentionally simple because
						they map to real trust decisions:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<span style={strongStyle}>
								Reconnect correctness:
							</span>{' '}
							800 of 800 writes delivered across 100 disconnect
							iterations, with 0 dropped writes.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Sandbox cold start:</span>{' '}
							isolated-jsc FFI measured a 2 ms median cold spawn
							in the shootout bench.
						</li>
						<li style={listItemStyle}>
							<span style={strongStyle}>Test coverage:</span> the
							sync suite covers the shipped engine path, including
							sandbox actions, metrics, bridgeFetch, and MCP
							registration behavior.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						The benchmark work is tracked in{' '}
						<a
							href="https://github.com/absolutejs/benchmarks/pull/13"
							rel="noopener noreferrer"
							target="_blank"
						>
							absolutejs/benchmarks PR #13
						</a>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-it-matters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why it matters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Most sync engines make one of three trade-offs: they
						require a hosted control plane, they need a sidecar
						service, or they only solve the client cache while
						leaving server authority and operational boundaries to
						the application. Sync is built to run inside your
						existing Elysia process, next to your database, with
						server-authoritative mutations as the default.
					</p>
					<p style={paragraphSpacedStyle}>
						This release batch strengthens that position. The same
						engine can now run tenant-provided mutation code in an
						isolated JavaScriptCore sandbox, measure it, broker HTTP
						credentials for it, expose it to MCP clients, and prove
						reconnect catch-up with a repeatable benchmark.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="start-here"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Start here
					</AnchorHeading>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Read{' '}
							<a href="/documentation/sync-we-heard-you">
								We Heard You
							</a>{' '}
							for the pain-point map and source links.
						</li>
						<li style={listItemStyle}>
							Read{' '}
							<a href="/documentation/sync-vs-firebase">
								vs Firebase
							</a>{' '}
							if you are migrating away from Firestore or Realtime
							Database.
						</li>
						<li style={listItemStyle}>
							Read{' '}
							<a href="/documentation/sync-sandbox">
								Sandboxed Mutations
							</a>{' '}
							for isolated handlers, backend choices, metrics,
							bridgeFetch, and MCP.
						</li>
					</ul>
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
