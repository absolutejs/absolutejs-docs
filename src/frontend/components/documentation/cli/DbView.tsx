import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	dbBackupOutput,
	dbCommands,
	dbRestoreOutput
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
	{ href: '#subcommands', label: 'Subcommands' },
	{ href: '#how-it-works', label: 'How it works' }
];

export const DbView = ({
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
					<h1 id="db" style={h1Style(isMobileOrTablet)}>
						absolute db
					</h1>
					<p style={paragraphLargeStyle}>
						Back up, restore, and seed your database — for any ORM.
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
						Run <code>absolute db &lt;backup|restore|seed&gt;</code>{' '}
						from your project root. The connection comes from{' '}
						<code>DATABASE_URL</code> (or <code>POSTGRES_URL</code>
						), or pass <code>--url</code>. Nothing is ORM-specific —
						it talks to Postgres directly, so it behaves the same
						whether you use Drizzle, Prisma, Kysely, or raw SQL.
					</p>
					<PrismPlus
						codeString={dbCommands}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="subcommands"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Subcommands
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>backup</code> dumps every table to a timestamped
						JSON file plus <code>latest.json</code>; scope it with{' '}
						<code>--only</code>, <code>--exclude</code>, and{' '}
						<code>--out</code>. <code>restore</code> is idempotent —
						it upserts each row by its real primary key, ordered so
						parent tables land before the rows that reference them,
						so re-running it changes nothing. Add{' '}
						<code>--truncate</code> for a clean reload (it confirms
						first, or pass <code>-y</code>). <code>seed</code> runs
						your project’s seed script (<code>db/seed.ts</code> by
						default, or a path you pass).
					</p>
					<TerminalFrame
						command={dbBackupOutput.command}
						output={dbBackupOutput.output}
					/>
					<TerminalFrame
						command={dbRestoreOutput.command}
						output={dbRestoreOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How it works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The command introspects your database’s own catalog (
						<code>information_schema</code>) to discover tables,
						primary keys, and foreign keys, then reads and writes
						rows with Bun’s built-in SQL client — no extra
						dependencies and no coupling to your ORM. Because
						restore keys off the real primary key, it is safe to run
						repeatedly and safe to bake a backup into your recovery
						runbook.
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
