import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { elysiaServer } from '../../../data/documentation/elysiaIntegrationDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { ElysiaOverviewList } from './ElysiaOverviewList';
import { ElysiaPageGuideList } from './ElysiaPageGuideList';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#elysia-foundation', label: 'Foundation' },
	{ href: '#page-guide', label: 'Page Guide' },
	{ href: '#baseline', label: 'Integration Baseline' }
];

export const ElysiaIntegrationView = ({
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
					<h1
						id="elysia-integration"
						style={h1Style(isMobileOrTablet)}
					>
						Elysia Integration
					</h1>
					<p style={paragraphLargeStyle}>
						Your AbsoluteJS server IS an Elysia server. Everything
						you know about Elysia works here.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="overview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overview
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS runs on top of Elysia without hiding Elysia.
						Your app architecture is still standard Elysia: compose
						plugins, define routes, validate data, and use lifecycle
						hooks for cross-cutting behavior.
					</p>
					<ElysiaOverviewList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="elysia-foundation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Foundation
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS doesn&apos;t wrap or abstract Elysia: it
						enhances it. You write standard Elysia code with
						AbsoluteJS-specific rendering and build utilities mixed
						in:
					</p>
					<PrismPlus
						codeString={elysiaServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-guide"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Guide
					</AnchorHeading>
					<ElysiaPageGuideList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="baseline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Integration Baseline
					</AnchorHeading>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Start from Elysia defaults, then add only required
							plugins.
						</li>
						<li style={listItemStyle}>
							Keep route-level validation next to handlers.
						</li>
						<li style={listItemStyle}>
							Use plugin/group scope boundaries to avoid
							cross-cutting side effects.
						</li>
						<li style={listItemStyle}>
							Keep recurring jobs in the cron page and request
							lifecycle concerns in middleware.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						Reference:{' '}
						<a
							href="https://elysiajs.com"
							rel="noopener noreferrer"
							target="_blank"
						>
							Elysia docs
						</a>
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
