import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	cronBasicUsage,
	cronConfig,
	cronInstall,
	cronPatterns,
	cronStopJob
} from '../../../data/documentation/cronJobsDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { CronJobsConfigOptionsList } from './CronJobsConfigOptionsList';
import { CronJobsReferencesList } from './CronJobsReferencesList';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#install', label: 'Install' },
	{ href: '#basic-usage', label: 'Basic Usage' },
	{ href: '#config-options', label: 'Config Options' },
	{ href: '#stop-job', label: 'Stop a Job' },
	{ href: '#predefined-patterns', label: 'Predefined Patterns' },
	{ href: '#references', label: 'References' }
];

export const CronJobsView = ({
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
					<h1 id="cron-jobs" style={h1Style(isMobileOrTablet)}>
						Cron Jobs
					</h1>
					<p style={paragraphLargeStyle}>
						For scheduled jobs in AbsoluteJS, use Elysia&apos;s
						official cron plugin directly.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="install"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Install
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add the plugin to your app:
					</p>
					<PrismPlus
						codeString={cronInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basic-usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Register a cron job with a name, pattern, and handler:
					</p>
					<PrismPlus
						codeString={cronBasicUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Config Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In addition to <code>name</code>, <code>pattern</code>,
						and <code>run</code>, the plugin supports schedule
						controls:
					</p>
					<CronJobsConfigOptionsList />
					<PrismPlus
						codeString={cronConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stop-job"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stop a Job
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Cron instances are available in{' '}
						<code>store.cron.[name]</code>, so you can stop them at
						runtime:
					</p>
					<PrismPlus
						codeString={cronStopJob}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="predefined-patterns"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Predefined Patterns
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>Patterns</code> helpers from{' '}
						<code>@elysiajs/cron</code> for common schedules:
					</p>
					<PrismPlus
						codeString={cronPatterns}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="references"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						References
					</AnchorHeading>
					<CronJobsReferencesList />
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
