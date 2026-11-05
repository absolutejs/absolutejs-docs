import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	isolateCapabilities,
	isolateDeclaration,
	isolateHandler,
	isolateOptions
} from '../../../data/documentation/isolateAppsDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#when-to-use', label: 'When to use one' },
	{ href: '#first-app', label: 'Your first app' },
	{ href: '#state', label: 'State and sleep' },
	{ href: '#capabilities', label: 'Database and fetch' },
	{ href: '#limits', label: 'Limits' },
	{ href: '#logs', label: 'Logs and errors' },
	{ href: '#pricing', label: 'Pricing' }
];

type BulletsProps = { items: readonly (readonly [string, string])[] };

const Bullets = ({ items }: BulletsProps) => (
	<ul style={listStyle}>
		{items.map(([title, text]) => (
			<li key={title} style={listItemStyle}>
				<strong style={strongStyle}>{title}</strong> {text}
			</li>
		))}
	</ul>
);

export const IsolateAppsView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const heading = (id: string, text: string) => (
		<AnchorHeading
			id={id}
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			{text}
		</AnchorHeading>
	);
	const code = (codeString: string, language: string) => (
		<PrismPlus
			codeString={codeString}
			language={language}
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
	);

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
					<h1 id="isolate-apps" style={h1Style(isMobileOrTablet)}>
						Isolate Apps
					</h1>
					<p style={paragraphLargeStyle}>
						Small handlers on absolutejs.ai that sleep when nobody
						is using them and wake on the next request. You pay for
						the requests and CPU they use, not for a server waiting
						around.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					{heading('when-to-use', 'When to use one')}
					<p style={paragraphSpacedStyle}>
						Isolate apps suit webhooks, small APIs and handlers that
						run for a moment and go quiet. They run with Web APIs
						only, so anything that needs Bun APIs,{' '}
						<code>node:</code> modules, native addons or the
						filesystem should stay a regular server. An app only
						runs this way if you declare it.
					</p>
				</section>

				<section style={sectionStyle}>
					{heading('first-app', 'Your first app')}
					<p style={paragraphSpacedStyle}>
						Declare the runtime in{' '}
						<code>absolute.hosting.json</code>:
					</p>
					{code(isolateDeclaration, 'json')}
					<p style={paragraphSpacedStyle}>
						Then export a <code>fetch</code> handler from your
						entrypoint:
					</p>
					{code(isolateHandler, 'typescript')}
					<p style={paragraphSpacedStyle}>
						Publish as usual. The build bundles your app into one
						file. If it imports something an isolate can&apos;t run,
						the build fails and names each import.
					</p>
				</section>

				<section style={sectionStyle}>
					{heading('state', 'State and sleep')}
					<p style={paragraphSpacedStyle}>
						An app sleeps after <code>hibernateAfterMs</code>{' '}
						without a request, 5 minutes by default, and wakes on
						the next one. Health checks don&apos;t wake it.
					</p>
					<Bullets
						items={[
							[
								'ctx.state',
								'is an object that survives sleep, restarts and new releases, up to 256 KiB as JSON. It is saved at most every 10 seconds while the app serves, so a crash can lose the last few seconds. Keep anything you can’t lose in a database.'
							],
							[
								'ctx.waitUntil(promise)',
								'lets work finish after the response is sent.'
							]
						]}
					/>
				</section>

				<section style={sectionStyle}>
					{heading('capabilities', 'Database and fetch')}
					<p style={paragraphSpacedStyle}>
						An isolate app has no network of its own, and the global{' '}
						<code>fetch</code> doesn&apos;t exist. It reaches the
						outside only through capabilities you declare. Each one
						appears on <code>env</code> only if it is declared:
					</p>
					{code(isolateOptions, 'json')}
					{code(isolateCapabilities, 'typescript')}
					<Bullets
						items={[
							[
								'env.database.execute(statement, parameters)',
								'runs SQL and resolves to { rows }. Set up a database for the environment in the project’s Data settings first, or the release is refused. maxRows defaults to 100 (up to 1,000), and going over is an error rather than a cut-off result. timeoutMs defaults to 1 second.'
							],
							[
								'env.fetch(url, { method, headers, body })',
								'resolves to { status, headers, body }, with body as text. It only reaches HTTPS on port 443, at hosts in egress.hosts, with the methods you listed. Private and internal addresses are refused. requestsPerMinute defaults to 60 (up to 1,000), and maxResponseBytes to 256 KiB (up to 1 MiB).'
							]
						]}
					/>
					<p style={paragraphSpacedStyle}>
						Storage and Sync capabilities aren&apos;t available to
						isolate apps yet, and a release that declares storage is
						refused.
					</p>
				</section>

				<section style={sectionStyle}>
					{heading('limits', 'Limits')}
					<Bullets
						items={[
							[
								'Time:',
								'timeoutMs defaults to 1 second, from 25 ms up to 30 seconds per request.'
							],
							['Memory:', '64 MB for each app.'],
							['Request and response bodies:', '1 MiB each.'],
							[
								'Console:',
								'100 lines a second, and 8 KiB a line. Extra lines are dropped and counted in your logs.'
							],
							[
								'Sleep:',
								'hibernateAfterMs can be set from 1 second to 1 hour.'
							]
						]}
					/>
				</section>

				<section style={sectionStyle}>
					{heading('logs', 'Logs and errors')}
					<p style={paragraphSpacedStyle}>
						Your project&apos;s logs show console output, starts and
						sleeps, failures, and any answer of 500 or above. The
						latest 500 lines are kept while the app sleeps. They
						don&apos;t survive a host restart or a move to another
						host, so send anything you need to keep somewhere of
						your own.
					</p>
					<Bullets
						items={[
							[
								'504',
								'means the app didn’t answer within its time limit. The app is restarted.'
							],
							[
								'503',
								'means the app ran out of memory and was stopped. It starts again on the next request.'
							]
						]}
					/>
				</section>

				<section style={sectionStyle}>
					{heading('pricing', 'Pricing')}
					<p style={paragraphSpacedStyle}>
						Isolate apps come with Pro and Scale, don&apos;t use
						your project slots, and aren&apos;t limited in number.
						Your billing page shows your use once you have any.
					</p>
					<Bullets
						items={[
							[
								'Pro:',
								'3 million requests and 25 CPU-hours a month.'
							],
							[
								'Scale:',
								'20 million requests and 150 CPU-hours a month.'
							],
							[
								'Beyond that:',
								'$0.30 per million requests and $0.05 per CPU-hour. Apps keep serving, and the extra goes on your next bill.'
							]
						]}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
};
