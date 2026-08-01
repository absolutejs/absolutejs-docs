import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const commandRows: DocsTableCell[][] = [
	[
		{ code: 'absolute dev [entry] [--config path]' },
		'Start the development server.'
	],
	[
		{ code: 'absolute workspace dev [--no-tui] [--config path]' },
		'Run every configured workspace service together.'
	],
	[
		{ code: 'absolute build [--outdir dir] [--profile] [--config path]' },
		'Build production assets.'
	],
	[
		{ code: 'absolute prepare [entry] [--outdir dir] [--config path]' },
		'Build production assets and the server without launching it.'
	],
	[
		{
			code: 'absolute start [entry] [--outdir dir] [--prebuilt] [--config path]'
		},
		'Start the production server, optionally from an existing build.'
	],
	[
		{
			code: 'absolute compile [entry] [--outdir dir] [--outfile path] [--config path]'
		},
		'Compile a standalone executable.'
	],
	[
		{
			code: 'absolute generate <page|api|component> <name> [--framework fw]'
		},
		'Scaffold a page, API plugin, or component. The g alias is also supported.'
	],
	[
		{ code: 'absolute add <framework> [--no-install]' },
		'Add framework dependencies, configuration, and a starter page.'
	],
	[
		{ code: 'absolute remove <framework> [--prune]' },
		'Remove a framework from configuration; source is retained unless pruned.'
	],
	[
		{ code: 'absolute config [--port n]' },
		'Open the unified ESLint, TypeScript, and Prettier configuration UI.'
	],
	[
		{ code: 'absolute db <backup|restore|seed>' },
		'Back up or restore PostgreSQL data, or run the project seed script.'
	],
	[
		{ code: 'absolute htmx [version]' },
		'Report, install, or upgrade the self-hosted pinned HTMX copy.'
	],
	[
		{ code: 'absolute analyze [--save] [--json]' },
		'Inspect bundle size and compare it with a saved baseline.'
	],
	[
		{ code: 'absolute api [--open] [--json]' },
		'Inspect the API surface or open the generated OpenAPI UI.'
	],
	[
		{ code: 'absolute routes [--json]' },
		'List page and API routes exposed by a running development server.'
	],
	[
		{ code: 'absolute islands [--sizes] [--json]' },
		'List cross-framework islands, hydration modes, pages, and optional sizes.'
	],
	[
		{ code: 'absolute inspect [--json]' },
		'Inspect live requests handled by a running development server.'
	],
	[
		{ code: 'absolute ls [--sizes] [--budget size] [--json]' },
		'List project pages by framework and optionally enforce a size budget.'
	],
	[
		{ code: 'absolute ps [--watch] [--json] [--kill target] [--kill-all]' },
		'List and manage running AbsoluteJS servers.'
	],
	[
		{ code: 'absolute mem [--json] | absolute mem diff <a> <b>' },
		'Report process memory or compare heap snapshots.'
	],
	[
		{ code: 'absolute logs <name> [-f] [-n lines]' },
		'Read or follow logs for a named running server.'
	],
	[
		{ code: 'absolute doctor [--fix] [--json]' },
		'Diagnose project tools, types, configuration, framework directories, environment, and ports.'
	],
	[
		{ code: 'absolute env [--check] [--json]' },
		'Report environment variables read through getEnv and identify missing values.'
	],
	[{ code: 'absolute eslint' }, 'Run the cached ESLint workflow.'],
	[{ code: 'absolute prettier' }, 'Run the cached Prettier check.'],
	[
		{ code: 'absolute typecheck [--config path]' },
		'Run the type checkers for all configured frameworks.'
	],
	[
		{ code: 'absolute lint-proof <run|verify> -- <command>' },
		'Record or verify an exact-source local lint pass.'
	],
	[
		{ code: 'absolute mkcert' },
		'Set up the local development certificate authority and certificate.'
	],
	[
		{ code: 'absolute telemetry' },
		'Manage anonymous CLI telemetry preferences.'
	],
	[
		{ code: 'absolute info' },
		'Print reproducible system information for bug reports.'
	],
	[
		{ code: 'absolute tunnel-relay' },
		'Run the public reverse-tunnel relay used for webhook development.'
	]
];

const tocItems: TocItem[] = [{ href: '#commands', label: 'Commands' }];

export const CliReferenceView = ({
	currentPageId,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	themeSprings,
	tocOpen
}: DocsViewProps) => (
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
				<h1 id="cli-reference" style={h1Style(isMobileOrTablet)}>
					CLI Reference
				</h1>
				<p style={paragraphLargeStyle}>
					Every command currently shipped by the AbsoluteJS CLI.
				</p>
			</animated.div>

			<section style={sectionStyle}>
				<AnchorHeading
					id="commands"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Commands
				</AnchorHeading>
				<p style={paragraphSpacedStyle}>
					Run commands from an AbsoluteJS project. Use the linked
					topic pages in this section for detailed workflows and
					examples.
				</p>
				<DocsTable
					columns={['Command', 'Purpose']}
					rows={commandRows}
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

		{!isMobileOrTablet && (
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
