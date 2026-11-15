import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularDeferHandler,
	angularDeferTemplate,
	angularZoneAsync,
	angularZoneConfig,
	angularZoneInstall,
	angularZoneTimer
} from '../../../data/documentation/angularChangeDetectionDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#zoneless', label: 'Zoneless by Default' },
	{ href: '#zone-mode', label: 'Zone Mode' },
	{ href: '#what-changes', label: 'What Changes' },
	{ href: '#islands', label: 'Islands' },
	{ href: '#defer-streaming', label: '@defer Streaming' }
];

const modeRows: DocsTableCell[][] = [
	[
		'Server render',
		'Sends the page once the first render settles',
		'Waits for the timers and HttpClient requests the page starts'
	],
	[
		'Plain field set in a timer',
		'Not painted until something else runs change detection',
		'Painted'
	],
	['NgZone', 'No-op zone', { code: 'NgZone' }],
	[
		'Browser',
		'Angular boots without zone.js',
		'zone.js loads before Angular boots'
	]
];

export const AngularChangeDetectionView = ({
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
						id="angular-change-detection"
						style={h1Style(isMobileOrTablet)}
					>
						Change Detection
					</h1>
					<p style={paragraphLargeStyle}>
						Angular pages in AbsoluteJS run zoneless by default.
						Apps and libraries that rely on zone.js can opt every
						page into zone change detection with one config key.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="zoneless"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Zoneless by Default
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With no config, pages render on the server and hydrate
						in the browser without zone.js. Change detection runs
						after template events and signal updates. Use signals
						for state that changes outside a template event, such as
						a value set in a timer.
					</p>
					<p style={paragraphSpacedStyle}>
						Code written for zone.js often sets a plain field from a
						timer or a manually added event listener. In a zoneless
						page that change doesn&apos;t paint on its own, and the
						server renders the field&apos;s first value.
					</p>
					<PrismPlus
						codeString={angularZoneTimer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="zone-mode"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Zone Mode
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add zone.js to your app, then set{' '}
						<code>angular.changeDetection</code> to{' '}
						<code>&apos;zone&apos;</code> in{' '}
						<code>absolute.config.ts</code>. The setting applies to
						every Angular page. The other value is{' '}
						<code>&apos;zoneless&apos;</code>, the default.
					</p>
					<PrismPlus
						codeString={angularZoneInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={angularZoneConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						With this config the component above renders{' '}
						<code>ready</code> on the server, and the button&apos;s
						delayed update paints in the browser. Hydration and HMR
						keep working, and Elysia routes on the same server are
						unaffected.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-changes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What Changes
					</AnchorHeading>
					<DocsTable
						columns={['Aspect', 'Zoneless', 'Zone']}
						rows={modeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						zone.js can&apos;t follow native <code>await</code>. In
						zone mode AbsoluteJS compiles the async functions in
						your Angular code to generators, so work after an{' '}
						<code>await</code> stays in the zone and the server
						waits for it.
					</p>
					<PrismPlus
						codeString={angularZoneAsync}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						zone.js tracks <code>HttpClient</code> requests but not
						a raw <code>fetch()</code>. Use <code>HttpClient</code>{' '}
						for requests the server render should wait for.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="islands"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Islands
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular islands render zoneless in both modes. Write
						island state with signals so it updates the same way on
						any host page.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="defer-streaming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						@defer Streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS streams Angular <code>@defer</code> blocks.
						The server sends the page with each block&apos;s{' '}
						<code>@placeholder</code>, then streams the resolved
						block into the same response. Deferred sections stay in
						place after the page hydrates.
					</p>
					<PrismPlus
						codeString={angularDeferTemplate}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Streaming needs <code>collectStreamingSlots: true</code>{' '}
						on the page handler. Without it the block stays on its
						placeholder during the server render, and AbsoluteJS
						logs a warning that names the option.
					</p>
					<PrismPlus
						codeString={angularDeferHandler}
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
