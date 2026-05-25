import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	doctorCommand,
	doctorOutput
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
	{ href: '#checks', label: 'What it checks' }
];

export const DoctorView = ({
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
					<h1 id="doctor" style={h1Style(isMobileOrTablet)}>
						absolute doctor
					</h1>
					<p style={paragraphLargeStyle}>
						One command to answer “why won’t it start?” — a health
						check of your project and environment.
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
						Run <code>absolute doctor</code> from your project root.
						Each check is green (ok), yellow (warning), or red
						(failure); the command exits non-zero if anything fails,
						so it doubles as a CI gate. <code>--json</code> emits the
						checks for scripting.
					</p>
					<PrismPlus
						codeString={doctorCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="checks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What it checks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Bun runtime, that <code>@absolutejs/absolute</code>{' '}
						and the platform native binary resolve, that{' '}
						<code>absolute.config.ts</code> loads, that each
						configured framework’s <code>pages</code> directory
						exists, that every <code>getEnv()</code> variable is set,
						and whether the dev port is free.
					</p>
					<PrismPlus
						codeString={doctorOutput}
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
