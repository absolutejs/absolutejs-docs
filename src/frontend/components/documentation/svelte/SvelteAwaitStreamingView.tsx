import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteAwaitBuildError,
	svelteAwaitPlain,
	svelteAwaitStreamBlock,
	svelteAwaitStreamHandler
} from '../../../data/documentation/svelteAwaitStreamingDocsCode';
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
	{ href: '#plain-await', label: 'Plain {#await}' },
	{ href: '#streaming', label: 'Streaming a Block' },
	{ href: '#handler', label: 'Handler Option' },
	{ href: '#streamed-branches', label: 'Streamed Branches' },
	{ href: '#choosing', label: 'Choosing' }
];

const comparisonRows: DocsTableCell[][] = [
	[
		'First HTML',
		'Pending branch',
		'Pending branch, then the resolved branch in the same response'
	],
	[
		'Where the promise resolves',
		'In the browser, after hydration',
		'On the server'
	],
	[
		'Branch content',
		'Any Svelte markup',
		'Elements, {expressions} and {@html} only'
	],
	['Page hydration', 'Yes', 'No'],
	['Handler option', 'None', { code: 'collectStreamingSlots: true' }]
];

export const SvelteAwaitStreamingView = ({
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
						id="svelte-await-streaming"
						style={h1Style(isMobileOrTablet)}
					>
						Await &amp; Streaming
					</h1>
					<p style={paragraphLargeStyle}>
						A plain <code>{'{#await}'}</code> block works the way
						Svelte defines it: the server renders the pending branch
						and the browser resolves the promise after hydrating. To
						resolve a block on the server and stream the result in
						the same response, mark it with{' '}
						<code>{'<!-- absolute:stream -->'}</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="plain-await"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Plain {'{#await}'}
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Write <code>{'{#await}'}</code> as you would in any
						Svelte app. The server sends the pending branch. The
						page hydrates, the promise resolves in the browser, and
						Svelte renders the <code>{'{:then}'}</code> or{' '}
						<code>{'{:catch}'}</code> branch. Branches can hold
						components and logic blocks. No handler option is
						needed.
					</p>
					<PrismPlus
						codeString={svelteAwaitPlain}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="streaming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming a Block
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Put <code>{'<!-- absolute:stream -->'}</code> directly
						before an <code>{'{#await}'}</code> block. The server
						sends the page with the pending branch, resolves the
						promise itself, and streams the resolved HTML into the
						same response. The pending branch is replaced without a
						second request.
					</p>
					<PrismPlus
						codeString={svelteAwaitStreamBlock}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handler Option
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A streamed block needs{' '}
						<code>collectStreamingSlots: true</code> on the
						page&apos;s handler. Without it the block stays on its
						pending branch, and AbsoluteJS logs a warning that names
						the option.
					</p>
					<PrismPlus
						codeString={svelteAwaitStreamHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="streamed-branches"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streamed Branches
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A streamed block&apos;s branches are sent as HTML, not
						Svelte markup. Each branch can hold elements,{' '}
						<code>{'{expressions}'}</code> and{' '}
						<code>{'{@html}'}</code>. Expressions are escaped the
						way Svelte escapes them, in text and in attribute
						values, so a value with markup in it shows as text.{' '}
						<code>{'{@html value}'}</code> is inserted as it is, as
						in Svelte.
					</p>
					<p style={paragraphSpacedStyle}>
						The component&apos;s <code>{'<style>'}</code> applies
						inside streamed branches, as it does in the rest of the
						component. Elements in the pending,{' '}
						<code>{'{:then}'}</code> and <code>{'{:catch}'}</code>{' '}
						branches get the component&apos;s scoped class.
					</p>
					<p style={paragraphSpacedStyle}>
						A component, <code>{'{#if}'}</code>,{' '}
						<code>{'{#each}'}</code> or another logic block inside a
						streamed branch fails the build:
					</p>
					<PrismPlus
						codeString={svelteAwaitBuildError}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						An event handler such as <code>{'onclick={…}'}</code>, a
						directive such as <code>{'class:active={…}'}</code> or a
						spread fails the build too. They need Svelte to run in
						the browser.
					</p>
					<p style={paragraphSpacedStyle}>
						A streamed block needs a pending branch, one{' '}
						<code>{'{:then}'}</code> and at most one{' '}
						<code>{'{:catch}'}</code>, in that order. The shorthand{' '}
						<code>{'{#await promise then value}'}</code> has no
						pending branch, so it can&apos;t be streamed. A page
						that streams a block is not hydrated, because the
						streamed HTML isn&apos;t Svelte&apos;s to claim. Pages
						that only use plain <code>{'{#await}'}</code> hydrate as
						usual.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="choosing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Choosing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use a plain block when the result needs components,
						logic or interactivity. Stream a block when the result
						is simple HTML and you want it in the first response.
					</p>
					<DocsTable
						columns={[
							'Aspect',
							'Plain {#await}',
							'absolute:stream'
						]}
						rows={comparisonRows}
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
