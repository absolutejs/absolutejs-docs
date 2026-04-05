import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { telemetryCommand } from '../../../data/documentation/cliUtilityDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
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
	{ href: '#what-is-collected', label: 'What Is Collected' },
	{ href: '#opting-out', label: 'Opting Out' }
];

const TelemetryCollectedList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>CLI commands used</strong> : which
			commands are run (dev, start, compile)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Build metrics</strong> : build duration
			and which frameworks are used
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Error types</strong> : what kind of
			errors occur (not the error content)
		</li>
	</ul>
);

export const TelemetryView = ({
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
					<h1 id="telemetry" style={h1Style(isMobileOrTablet)}>
						absolute telemetry
					</h1>
					<p style={paragraphLargeStyle}>
						Manage anonymous usage telemetry.
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
					<PrismPlus
						codeString={telemetryCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-is-collected"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What Is Collected
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS collects anonymous usage data to help improve
						the framework. No personal data, source code, or project
						details are ever collected.
					</p>
					<TelemetryCollectedList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="opting-out"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Opting Out
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Telemetry can be disabled at any time:
					</p>
					<PrismPlus
						codeString="absolute telemetry off"
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						You can also set the <code>TELEMETRY_OFF=1</code>{' '}
						environment variable to disable telemetry without
						running the command.
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
