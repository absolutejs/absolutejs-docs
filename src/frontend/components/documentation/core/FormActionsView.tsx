import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	formActionsDefine,
	formActionsEden,
	formActionsEnhanceScript,
	formActionsHtmlPage,
	formActionsHtmxAction,
	formActionsHtmxPage,
	formActionsOptions,
	formActionsReactPage,
	formActionsRedirect,
	formActionsServer,
	formActionsStateTypes
} from '../../../data/documentation/formActionsDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const responseRows: DocsTableCell[][] = [
	[
		'Plain form post (no JavaScript)',
		'303 to the page the form was on, or to redirect. The result rides in a short-lived cookie.'
	],
	[
		{ code: 'useFormAction', suffix: ' or enhanceForms' },
		'JSON result with status 200, valid or not'
	],
	['Eden, fetch, or any JSON client', 'JSON result, 422 on error'],
	[
		{ code: 'HX-Request: true' },
		'The htmx fragment with status 200, or HX-Redirect when there is no fragment'
	],
	['Cross-site post', '403 before the body is read'],
	[{ code: 'Content-Length', suffix: ' over maxBodySize' }, '413']
];

const optionRows: DocsTableCell[][] = [
	[{ code: 'body' }, 'An Elysia t.Object. Its keys are the field names.'],
	[
		{ code: 'handler' },
		'Gets body, fail, request, set and the Elysia context. Returns data, fail(...), or a Response.'
	],
	[
		{ code: 'redirect' },
		'A path, or a function of the returned data. Default: back to the form page.'
	],
	[
		{ code: 'htmx' },
		'Returns the HTML fragment for HTMX requests, or undefined.'
	],
	[
		{ code: 'beforeHandle' },
		'Runs after validation. Return a response to stop.'
	],
	[
		{ code: 'csrf' },
		'{ trustedOrigins } to allow other origins, or false to turn the check off.'
	],
	[{ code: 'maxBodySize' }, 'Bytes. Default 10 MiB.'],
	[
		{ code: 'preserveValues' },
		'Echo typed values after a failed post without JavaScript. Default true.'
	]
];

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#define-action', label: 'Define an Action' },
	{ href: '#react', label: 'React' },
	{ href: '#without-javascript', label: 'Without JavaScript' },
	{ href: '#redirects', label: 'Redirects' },
	{ href: '#html', label: 'HTML Pages' },
	{ href: '#htmx', label: 'HTMX Pages' },
	{ href: '#eden-json', label: 'Eden and JSON' },
	{ href: '#responses', label: 'Responses' },
	{ href: '#options', label: 'Options' },
	{ href: '#result-types', label: 'Result Types' }
];

export const FormActionsView = ({
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
					<h1 id="form-actions" style={h1Style(isMobileOrTablet)}>
						Form Actions
					</h1>
					<p style={paragraphLargeStyle}>
						A form action is one POST handler that serves a plain
						HTML form, a form enhanced with JavaScript, an HTMX
						form, and a typed Eden call. Forms keep working when
						JavaScript is off.
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
					<p style={paragraphSpacedStyle}>
						You define an action with <code>defineAction</code> and
						mount it like any Elysia plugin. The body schema
						validates the form, and each invalid field gets its own
						message. The same action answers each caller in the way
						that caller expects.
					</p>
					<p style={paragraphSpacedStyle}>
						Form actions work on React, HTML and HTMX pages. React
						uses the <code>useFormAction</code> hook. HTML pages use{' '}
						<code>enhanceForms</code>. HTMX forms use{' '}
						<code>hx-post</code> and the action&apos;s{' '}
						<code>htmx</code> renderer.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-action"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Define an Action
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>defineAction(path, options)</code> takes the route
						path and an options object. <code>body</code> is an
						Elysia <code>t.Object</code>. Add an <code>error</code>{' '}
						string to a property to replace the validator&apos;s
						message for that field.
					</p>
					<PrismPlus
						codeString={formActionsDefine}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The handler runs only when the body is valid. Return
						data for success. Return{' '}
						<code>fail(errors, message?)</code> for errors you find
						yourself, such as a taken email. The keys of{' '}
						<code>errors</code> are typed to the schema&apos;s
						fields.
					</p>
					<p style={paragraphSpacedStyle}>
						Browser forms send strings. Before validation, an
						unchecked checkbox becomes <code>false</code>,{' '}
						<code>on</code> becomes <code>true</code>, a numeric
						string becomes a number, and an empty file input is
						dropped.
					</p>
					<p style={paragraphSpacedStyle}>
						Mount the action with <code>.use()</code>. A page route
						reads the result of the last post without JavaScript
						with <code>getActionState(action)</code> and passes it
						to the page as a prop. It returns <code>undefined</code>{' '}
						when there is none.
					</p>
					<PrismPlus
						codeString={formActionsServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>useFormAction</code> comes from{' '}
						<code>@absolutejs/absolute/react/hooks</code>. Pass the
						action&apos;s type with <code>import type</code>, so no
						server code reaches the browser bundle. The path is
						type-checked against the action.
					</p>
					<PrismPlus
						codeString={formActionsReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>formProps</code> renders a real form with{' '}
						<code>method=&quot;post&quot;</code>, the action path
						and <code>multipart/form-data</code>. Before hydration,
						or with JavaScript off, the browser posts it normally.
						Once hydrated, a submit goes through fetch and the page
						does not reload.
					</p>
					<p style={paragraphSpacedStyle}>
						The hook returns <code>state</code>,{' '}
						<code>pending</code>, <code>errors</code>,{' '}
						<code>values</code>, <code>data</code>,{' '}
						<code>message</code>, <code>submit</code> and{' '}
						<code>reset</code>. A newer submit aborts an older one.
						On success the form resets, unless the action redirects
						or you pass <code>resetOnSuccess: false</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="without-javascript"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Without JavaScript
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A plain post gets a <code>303</code> back to the page
						the form was on. The result travels in a cookie named{' '}
						<code>absolute_action</code> that lasts 60 seconds. The
						next HTML page served reads it once, clears it, and is
						sent with <code>Cache-Control: no-store</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						On error, the result holds the field errors and what the
						user typed, so the form shows both. Files and fields
						whose names look secret, such as <code>password</code>{' '}
						or <code>token</code>, are never echoed. In the React
						example, <code>form.values.email</code> and{' '}
						<code>form.errors.email</code> come from{' '}
						<code>initialState</code>, so the server render and
						hydration match.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redirects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redirects
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Set <code>redirect</code> to send the browser somewhere
						else after success. Without JavaScript, the{' '}
						<code>303</code> goes there. With JavaScript, the
						helpers navigate there.
					</p>
					<PrismPlus
						codeString={formActionsRedirect}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="html"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTML Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Static HTML pages can&apos;t run code on the server, so
						AbsoluteJS writes the result into the form for you. Mark
						the form with <code>data-absolute-action</code> and add
						elements for the messages.
					</p>
					<PrismPlus
						codeString={formActionsHtmlPage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						After a post without JavaScript, the server fills each{' '}
						<code>[data-action-error=&quot;field&quot;]</code> and
						removes its <code>hidden</code>, fills{' '}
						<code>[data-action-message]</code>, shows{' '}
						<code>[data-action-success]</code> on success, sets{' '}
						<code>aria-invalid</code> on invalid fields, sets{' '}
						<code>data-action-status</code> on the form, and puts
						the typed values back.
					</p>
					<p style={paragraphSpacedStyle}>
						To submit without a reload, call{' '}
						<code>enhanceForms()</code> from{' '}
						<code>@absolutejs/absolute/client</code>. It applies the
						same markup changes in the browser, sets{' '}
						<code>aria-busy</code> and disables submit buttons while
						pending, focuses the first invalid field, and fires an{' '}
						<code>absolute:form-action</code> event on the form. It
						skips forms that have <code>hx-post</code>.
					</p>
					<PrismPlus
						codeString={formActionsEnhanceScript}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="htmx"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Give the action an <code>htmx</code> renderer. It
						receives the result and returns the HTML fragment that
						HTMX swaps in. The answer is a <code>200</code>, so HTMX
						swaps errors too.
					</p>
					<PrismPlus
						codeString={formActionsHtmxAction}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Keep <code>method</code>, <code>action</code> and{' '}
						<code>data-absolute-action</code> on the form next to{' '}
						<code>hx-post</code>. With JavaScript, HTMX posts and
						swaps the fragment. Without it, the form posts normally
						and the server writes the result into the form, as on an
						HTML page.
					</p>
					<PrismPlus
						codeString={formActionsHtmxPage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If the renderer returns <code>undefined</code>, or the
						action has none, an HTMX request gets an{' '}
						<code>HX-Redirect</code> and the result cookie, which
						behaves like a post without JavaScript.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="eden-json"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Eden and JSON
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An action is a normal Elysia route with a body schema,
						so Eden sees it. A missing or mistyped field is a type
						error. JSON clients get the result as JSON, with{' '}
						<code>422</code> when it is an error.
					</p>
					<PrismPlus
						codeString={formActionsEden}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A request counts as JSON when it sends a JSON body, or
						when its <code>Accept</code> header asks for JSON and
						not HTML.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="responses"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Responses
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One action, one handler. The caller decides the shape of
						the answer.
					</p>
					<DocsTable
						columns={['Caller', 'Answer']}
						rows={responseRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Cross-site protection is on by default. A post passes
						when its <code>Sec-Fetch-Site</code> is{' '}
						<code>same-origin</code> or <code>none</code>, when its{' '}
						<code>Origin</code> matches the host or a trusted
						origin, or when it sends neither header.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Options
					</AnchorHeading>
					<PrismPlus
						codeString={formActionsOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Option', 'What it does']}
						rows={optionRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="result-types"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Result Types
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>ActionStateOf&lt;typeof action&gt;</code> is the
						state a form can be in. Use it to type the prop that
						carries <code>getActionState</code>. The success data
						comes from what the handler returns, and the error keys
						come from the body schema.
					</p>
					<PrismPlus
						codeString={formActionsStateTypes}
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
