import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	nativeNavBrowserInstall,
	nativeNavEvents,
	nativeNavLayout,
	nativeNavLinks,
	nativeNavRestoration,
	nativeNavSafeAreaCss
} from '../../../data/documentation/native/nativeNavigationDocsCode';
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
import { Callout } from '../../utils/Callout';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#navigation', label: 'How navigation works' },
	{ href: '#links', label: 'Links' },
	{ href: '#back', label: 'Android Back' },
	{ href: '#safe-areas', label: 'Safe areas and keyboard' },
	{ href: '#app-layout', label: 'App layout' },
	{ href: '#sheets', label: 'Sheets' },
	{ href: '#restoration', label: 'Scroll, focus and forms' },
	{ href: '#events', label: 'Events' },
	{ href: '#browser', label: 'In the browser' }
];

const navigationSteps: StepFlowStep[] = [
	{
		description:
			'A tap on a link to your own site stays in the app. The page underneath stays usable while the next one loads, and body gets data-absolute-mobile-navigation-pending and aria-busy="true" so you can show progress.',
		title: 'Tap a link'
	},
	{
		description:
			'The app asks your server for the next page’s data. Tap again before it arrives and the first request is cancelled: the latest navigation always wins.',
		title: 'Load the data'
	},
	{
		description:
			'The new page replaces the old one, with a View Transition where the WebView supports it and the user has not asked for reduced motion. React, Svelte, Vue, Angular, HTML and HTMX pages hand over to each other cleanly.',
		title: 'Swap the page'
	},
	{
		description:
			'History is written only once the new page is showing. A new page starts at the top with focus on its heading; Back and Forward bring back scroll, focus and form state.',
		title: 'Record history'
	}
];

const linkRows = [
	[
		{ code: '<a href="/orders">' },
		'Opens the page in the app. Links to your production origin work the same way.'
	],
	[
		{ code: 'data-absolute-link="replace"' },
		'Opens the page in place of the current history entry.'
	],
	[
		{ code: 'data-absolute-link="back"' },
		'Closes an open sheet, otherwise goes back. href is the fallback without JavaScript.'
	],
	[
		{ code: 'data-absolute-link="external"' },
		'Opens an http or https page in the system browser.'
	],
	[
		{ code: '<a target="_blank">' },
		'Any link with a target is left to the WebView.'
	]
];

const backSteps: StepFlowStep[] = [
	{ title: 'An open sheet closes' },
	{ title: 'A page still loading is cancelled' },
	{ title: 'The app goes back one page' },
	{ title: 'On the first page, the app exits as Android expects' }
];

const cssVariableRows = [
	[
		{ code: '--absolute-safe-area-inset-top' },
		'Also -right, -bottom and -left: the notch, status bar and home indicator'
	],
	[
		{ code: '--absolute-keyboard-height' },
		'Height of the on-screen keyboard'
	],
	[{ code: '--absolute-viewport-height' }, 'Also --absolute-viewport-width'],
	[
		{ code: '--absolute-available-height' },
		'Height left for content once the keyboard is open'
	]
];

const dataAttributeRows = [
	[{ code: 'data-absolute-mobile' }, 'Present in the app'],
	[{ code: 'data-absolute-runtime' }, 'capacitor, expo, web or test'],
	[{ code: 'data-absolute-platform' }, 'ios, android and so on'],
	[
		{ code: 'data-absolute-form-factor' },
		'phone, tablet, desktop or unknown'
	],
	[{ code: 'data-absolute-keyboard' }, 'visible or hidden'],
	[{ code: 'data-absolute-network' }, 'online or offline'],
	[
		{ code: 'data-absolute-connection' },
		'wifi, cellular, ethernet, unknown or none'
	],
	[{ code: 'data-absolute-reduced-motion' }, 'reduce or no-preference']
];

const layoutRows = [
	[
		{ code: 'data-absolute-app-shell' },
		'Container',
		'Fills the available height, inside the safe areas'
	],
	[
		{ code: 'data-absolute-app-header' },
		'Header',
		'Clears the status bar and notch'
	],
	[
		{ code: 'data-absolute-app-main' },
		'Main',
		'The scrolling region; its position is restored on Back'
	],
	[
		{ code: 'data-absolute-navigation-stack' },
		'Page view',
		'Slides forward and back with View Transitions'
	],
	[
		{ code: 'data-absolute-tab-bar' },
		'nav',
		'Clears the home indicator and sets aria-current="page" on the active tab'
	],
	[
		{ code: 'data-absolute-tab-match="prefix"' },
		'Tab link',
		'Keeps the tab active on nested routes; exact match otherwise'
	],
	[
		{ code: 'data-absolute-sheet' },
		'dialog',
		'A bottom sheet with focus kept inside it'
	],
	[
		{ code: 'data-absolute-sheet-open="id"' },
		'Button or link',
		'Opens the sheet with that id'
	],
	[
		{ code: 'data-absolute-sheet-close' },
		'Control in a sheet',
		'Closes the sheet and returns focus to what opened it'
	]
];

const restorationRows = [
	[
		{ code: 'data-absolute-navigation-preserve="off"' },
		'Values inside reset when the page is recreated'
	],
	[
		{ code: 'data-absolute-scroll-restoration' },
		'Restores this element’s scroll position too (the main region is automatic)'
	],
	[
		{ code: 'data-absolute-navigation-focus' },
		'Receives focus on a new page, ahead of the first h1 in main, the first h1 and main'
	]
];

const eventRows = [
	[
		{ code: 'absolute:navigation-change' },
		'{ direction: "forward" | "back" | "replace", from, to }',
		'After a new page is showing'
	],
	[
		{ code: 'absolute:sheet-change' },
		'{ id, open }',
		'When a sheet opens or closes'
	],
	[
		{ code: 'absolute:adaptive-shell-change' },
		'{ availableHeight, keyboard, network, platform, viewportHeight, viewportWidth }',
		'On rotation, keyboard, network and safe-area changes'
	],
	[
		{ code: 'absolute:shell-rendered' },
		'none',
		'Once, when the first page has painted'
	]
];

export const NativeNavigationView = ({
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
						id="native-navigation-ui"
						style={h1Style(isMobileOrTablet)}
					>
						Navigation & UI
					</h1>
					<p style={paragraphLargeStyle}>
						Your links already work in the app, and Android Back,
						deep links and transitions behave the way people expect
						from a native app. Add a few attributes to plain HTML
						and you get safe areas, a tab bar and bottom sheets in
						every framework.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="navigation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How navigation works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						You do not change your routes or links. The app keeps
						each page change all-or-nothing, so a slow or failed
						load never leaves half a page on screen.
					</p>
					<StepFlow
						steps={navigationSteps}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="When a page can’t load"
					>
						The current page stays on screen with a retry button:
						“You are offline. Reconnect to load this page.” when the
						device is offline, otherwise “Unable to load this page.”
						A failed Back or Forward puts history back where the
						visible page is.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="links"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Links
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Ordinary anchors are all you need.{' '}
						<code>data-absolute-link</code> changes how one behaves,
						and outside the app each link still works as a normal
						link.
					</p>
					<PrismPlus
						codeString={nativeNavLinks}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Link', 'In the app']}
						rows={linkRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="back"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Android Back
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The hardware Back button and the back gesture are
						handled for you, in this order:
					</p>
					<StepFlow steps={backSteps} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="safe-areas"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Safe areas and keyboard
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every page in the app gets CSS variables and attributes
						on <code>&lt;html&gt;</code> describing the screen, kept
						up to date through rotation, the keyboard and page
						changes. Nothing is padded for you, so an existing
						responsive layout looks the same until you opt in. The
						same CSS works in the browser, in Capacitor and in Expo;
						the fallbacks apply on the web.
					</p>
					<PrismPlus
						codeString={nativeNavSafeAreaCss}
						language="css"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['CSS variable', 'Value']}
						rows={cssVariableRows}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Attribute on <html>', 'Values']}
						rows={dataAttributeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The status and navigation bars follow the system’s light
						or dark appearance; <code>systemBars</code> from{' '}
						<a href="/documentation/native-devices">
							@absolutejs/devices
						</a>{' '}
						changes them.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="app-layout"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						App layout
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mark up a header, a scrolling main area and a tab bar,
						and the app handles safe areas, scrolling, the active
						tab and transitions. These are attributes on ordinary
						elements, not components, so the same markup works in
						JSX, Svelte, Vue and Angular templates, and in HTML and
						HTMX pages. Colors, type and spacing stay in your CSS.
					</p>
					<PrismPlus
						codeString={nativeNavLayout}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Attribute', 'On', 'Does']}
						rows={layoutRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Tab bars stay navigation landmarks and tabs stay links;
						AbsoluteJS does not add <code>tablist</code> roles,
						which describe tabs within one page.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sheets"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sheets
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A sheet is a <code>&lt;dialog&gt;</code> with{' '}
						<code>data-absolute-sheet</code>. It opens from the
						bottom with focus moved inside, and closes from its
						close control, Escape, a tap on the backdrop, Android
						Back or a back link, always before the page changes. One
						sheet is open at a time, and focus returns to the
						control that opened it.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="restoration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scroll, focus and forms
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Back and Forward bring a page back as it was: form
						values, selection, open disclosures, focus and scroll
						position. This state lives only in memory. It is never
						written to history, storage or Sync, and password, file,
						hidden, card-number and one-time-code fields are left
						out entirely. Data that must survive the app being
						closed belongs in your app state or{' '}
						<a href="/documentation/native-auth-sync">Sync</a>.
					</p>
					<PrismPlus
						codeString={nativeNavRestoration}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Attribute', 'Effect']}
						rows={restorationRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						An element with <code>autofocus</code> takes priority
						over all of them.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="events"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Events
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every event is dispatched on <code>window</code> and
						typed in TypeScript, so <code>event.detail</code> needs
						no casting.
					</p>
					<PrismPlus
						codeString={nativeNavEvents}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Event', 'Detail', 'Fires']}
						rows={eventRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="browser"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In the browser
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The app installs all of this for you. To use the same
						layout, sheets and Back handling on your website, call{' '}
						<code>installAbsoluteMobileUiPrimitives</code> from any
						client entry. It returns <code>navigate</code>,{' '}
						<code>refreshDocument</code>, <code>requestBack</code>{' '}
						and <code>dispose</code>; <code>requestBack</code>{' '}
						returns <code>true</code> when an open sheet handled it.
					</p>
					<PrismPlus
						codeString={nativeNavBrowserInstall}
						language="typescript"
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
