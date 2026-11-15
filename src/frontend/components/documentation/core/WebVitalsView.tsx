import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	vitalsBatchBody,
	vitalsConfig,
	vitalsHtmlTag,
	vitalsOnVital,
	vitalsRemoteEndpoint,
	vitalsReportType,
	vitalsStopHandler
} from '../../../data/documentation/webVitalsDocsCode';
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
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#enable', label: 'Enable' },
	{ href: '#in-the-browser', label: 'In the Browser' },
	{ href: '#on-the-server', label: 'On the Server' },
	{ href: '#on-vital', label: 'onVital' },
	{ href: '#remote-endpoint', label: 'Remote Endpoint' }
];

const optionRows: DocsTableCell[][] = [
	[
		{ code: 'endpoint' },
		{ code: '/__absolute/vitals' },
		'A path is served by the built-in route. A full URL posts elsewhere.'
	],
	[
		{ code: 'sampleRate' },
		{ code: '1' },
		'Share of page loads that report, from 0 to 1.'
	],
	[{ code: 'dev' }, { code: 'false' }, 'Report from absolute dev too.']
];

const MetricsList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Largest Contentful Paint: when the main content shows.',
				term: 'LCP'
			},
			{
				description:
					'Interaction to Next Paint: how fast the page responds to input.',
				term: 'INP'
			},
			{
				description:
					'Cumulative Layout Shift: how much the layout moves.',
				term: 'CLS'
			},
			{
				description:
					'First Contentful Paint: when anything first shows.',
				term: 'FCP'
			},
			{
				description:
					'Time to First Byte: how long the server took to start answering.',
				term: 'TTFB'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const WebVitalsView = ({
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
					<h1 id="web-vitals" style={h1Style(isMobileOrTablet)}>
						Web Vitals
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS can report Core Web Vitals from real visits.
						Turn on <code>vitals</code> in{' '}
						<code>absolute.config.ts</code>, and every page sends
						its metrics to your server, where <code>onVital()</code>{' '}
						hands them to your code.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enable"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enable
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Reporting is off until you set <code>vitals</code>.
					</p>
					<PrismPlus
						codeString={vitalsConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Option', 'Default', 'Meaning']}
						rows={optionRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>Each report covers:</p>
					<MetricsList themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="in-the-browser"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In the Browser
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A production build bundles a small reporter, the{' '}
						<code>web-vitals</code> library plus a sender, to{' '}
						<code>/__absolute/vitals/reporter.js</code>. Every
						framework&apos;s client bundle imports it. Static HTML
						and HTMX pages get a script tag:
					</p>
					<PrismPlus
						codeString={vitalsHtmlTag}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Each page load decides once whether it reports, using{' '}
						<code>sampleRate</code>. A page that reports collects
						every metric with its route (the path the page loaded
						at) and navigation type. It sends them as one batch when
						the page is hidden or closed, with{' '}
						<code>navigator.sendBeacon</code>, falling back to{' '}
						<code>fetch</code> with <code>keepalive</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						With <code>vitals</code> unset, nothing is built or
						added to pages. <code>absolute dev</code> adds nothing
						unless <code>dev: true</code>. Pages with{' '}
						<code>client: &apos;none&apos;</code> ship no client
						bundle, so they don&apos;t report.
					</p>
					<p style={paragraphSpacedStyle}>
						The reporter is part of the page, so pre-rendered pages
						report too. It also works under{' '}
						<code>secureHeaders()</code>: it loads through scripts
						that carry the nonce, and the default endpoint is on
						your own origin.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="on-the-server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						On the Server
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>endpoint</code> set to a path (the default),{' '}
						<code>prepare()</code> serves{' '}
						<code>POST /__absolute/vitals</code> as part of{' '}
						<code>absolutejs</code>. It validates each batch with a
						TypeBox schema, answers <code>204</code>, and stores
						nothing. A batch that fails validation gets a{' '}
						<code>422</code>.
					</p>
					<PrismPlus
						codeString={vitalsBatchBody}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="on-vital"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						onVital
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						To keep the metrics, register a handler. It runs once
						per metric in every batch the endpoint accepts, with the
						report and the incoming request.
					</p>
					<PrismPlus
						codeString={vitalsOnVital}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={vitalsReportType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A handler can be async. <code>onVital</code> returns a
						function that removes the handler. A handler that throws
						is logged and doesn&apos;t affect the response or the
						other handlers.
					</p>
					<PrismPlus
						codeString={vitalsStopHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="remote-endpoint"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Remote Endpoint
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						To send the batches somewhere else, set{' '}
						<code>endpoint</code> to a full URL. The browser posts
						the same JSON there, and the built-in route isn&apos;t
						mounted, so <code>onVital</code> handlers don&apos;t
						run. The other service must accept a cross-origin JSON{' '}
						<code>POST</code>. Under <code>secureHeaders()</code>,
						add its origin to <code>connect-src</code>.
					</p>
					<PrismPlus
						codeString={vitalsRemoteEndpoint}
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
