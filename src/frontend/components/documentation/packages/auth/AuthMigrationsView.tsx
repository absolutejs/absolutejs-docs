import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	cliUsage,
	programmaticMigration
} from '../../../../data/documentation/authMigrationsDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#cli', label: 'absolute-auth migrate CLI' },
	{ href: '#programmatic', label: 'Programmatic runner' }
];

export const AuthMigrationsView = ({
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
					<h1 id="auth-migrations" style={h1Style(isMobileOrTablet)}>
						Database Migrations
					</h1>
					<p style={paragraphLargeStyle}>
						<code>0.35.0</code> ships a first-party CLI for the
						package&apos;s Postgres tables. The schema lives in
						Drizzle definitions; the runner enumerates them via{' '}
						<code>getTableConfig</code> and emits idempotent DDL. No
						drizzle-kit, no manual SQL, no schema drift between
						package versions.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cli"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						<code>absolute-auth migrate</code> CLI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						19 blocks of migrations covering every store the package
						ships. Run all at once or scope to the blocks you
						enabled. Works against Neon, Supabase, vanilla Postgres,
						RDS — anything with a standard Postgres wire protocol.
					</p>
					<PrismPlus
						codeString={cliUsage}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="programmatic"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Programmatic runner
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The CLI is a thin wrapper over{' '}
						<code>runMigrations</code>. Drive it from a script for
						test fixtures, or from your server&apos;s boot path for
						&quot;migrate on startup&quot; deployments. Future
						package releases append migrations idempotently —
						re-running is safe.
					</p>
					<PrismPlus
						codeString={programmaticMigration}
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
