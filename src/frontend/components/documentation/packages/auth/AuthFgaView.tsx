import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	fgaCheck,
	fgaSchema
} from '../../../../data/documentation/authFgaDocsCode';
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
	{ href: '#schema', label: 'Schema & inheritance' },
	{ href: '#check', label: 'Warrants, check & query' }
];

export const AuthFgaView = ({
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
					<h1 id="auth-fga" style={h1Style(isMobileOrTablet)}>
						Fine-Grained Authorization
					</h1>
					<p style={paragraphLargeStyle}>
						Relationship-based access control — the WorkOS FGA / Google
						Zanzibar model. Permissions are relationship tuples
						(&quot;warrants&quot;), and a schema lets relations inherit,
						so you don&apos;t write a warrant for every permission.
						Self-hosted, no per-check pricing.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="schema"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Schema &amp; inheritance
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The schema declares each resource type&apos;s relations and
						how they derive: <code>self</code> (direct warrants),{' '}
						<code>computedUserset</code> (an editor is also a viewer),{' '}
						<code>tupleToUserset</code> (a doc inherits its parent
						folder&apos;s viewers), and <code>union</code>. Usersets like{' '}
						<code>group#member</code> expand recursively.
					</p>
					<PrismPlus
						codeString={fgaSchema}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="check"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Warrants, check &amp; query
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Write warrants, then <code>check</code> (does X have a
						relation on Y?) or <code>listSubjects</code> (who has it?).
						The engine follows the schema&apos;s inheritance, with cycle
						protection and a depth limit. v1 is a correct ReBAC engine —
						not yet Zanzibar-scale throughput.
					</p>
					<PrismPlus
						codeString={fgaCheck}
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
