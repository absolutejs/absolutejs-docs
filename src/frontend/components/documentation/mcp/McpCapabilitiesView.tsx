import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	mcpCapabilitiesGuards,
	mcpCapabilitiesMeta,
	mcpCapabilitiesPrompts,
	mcpCapabilitiesResources,
	mcpCapabilitiesScopes
} from '../../../data/documentation/mcpSectionDocsCode';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#mcp-capabilities-overview', label: 'Overview' },
	{ href: '#per-call-guards', label: 'Per-Call Guards' },
	{ href: '#meta-scratchpad', label: 'The meta Scratchpad' },
	{ href: '#scope-gating', label: 'Scope Gating' },
	{ href: '#prompts', label: 'Prompts' },
	{ href: '#resources', label: 'Resources' },
	{ href: '#capability-advertisement', label: 'Capability Advertisement' }
];

const guardHookRows: DocsTableCell[][] = [
	[
		{ code: 'beforeCall' },
		{ code: '({ args, caller, meta, name })' },
		'Refuse a single tools/call before it runs (credits exhausted, rate limited). Return { block } to short-circuit; return nothing to proceed.'
	],
	[
		{ code: 'onCall' },
		{ code: '({ args, caller, meta, name, ok })' },
		'Fired after every tools/call for auditing — ok reflects whether the result was an error, and meta carries anything the handler wrote.'
	]
];

const promptDefinitionRows: DocsTableCell[][] = [
	[{ code: 'title' }, 'The display name the client shows in its picker.'],
	[{ code: 'description' }, 'What the prompt does.'],
	[
		{ code: 'arguments', suffix: 'optional' },
		'A list of { name, description, required? } entries advertised on prompts/list.'
	]
];

const resourceFieldRows: DocsTableCell[][] = [
	[{ code: 'uri' }, 'The identifier a client passes to resources/read.'],
	[{ code: 'name' }, 'The display name.'],
	[{ code: 'description', suffix: 'optional' }, 'What the resource holds.'],
	[{ code: 'mimeType', suffix: 'optional' }, 'The content type.']
];

const capabilityRows: DocsTableCell[][] = [
	[{ code: 'tools' }, 'Always', { code: '{ listChanged: false }' }],
	[
		{ code: 'prompts' },
		{ code: 'prompts', suffix: 'configured' },
		{ code: '{ listChanged: false }' }
	],
	[
		{ code: 'resources' },
		{ code: 'resources', suffix: 'configured' },
		{ code: '{ listChanged: false, subscribe: false }' }
	]
];

export const McpCapabilitiesView = ({
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
						id="mcp-capabilities-overview"
						style={h1Style(isMobileOrTablet)}
					>
						MCP Guards, Prompts & Resources
					</h1>
					<p style={paragraphLargeStyle}>
						Everything beyond tools is a hook — the package ships{' '}
						<strong>no opinion</strong> about billing, storage, or
						auditing. <code>beforeCall</code> gates a call before it
						runs, <code>onCall</code> audits it after, a per-call{' '}
						<code>meta</code> scratchpad ties the two to the
						handler, per-tool <code>scope</code> gating fails
						closed, and optional <code>prompts</code> and{' '}
						<code>resources</code> round out the capability set.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="per-call-guards"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-Call Guards
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Two symmetric hooks wrap every <code>tools/call</code>:
					</p>
					<DocsTable
						columns={['Hook', 'Receives', 'Purpose']}
						rows={guardHookRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={mcpCapabilitiesGuards}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="A block is a message, not a crash"
						variant="info"
					>
						The <code>block</code> string comes back as an{' '}
						<code>isError</code> tool result — a paused or
						rate-limited notice the model can relay to the user —
						not a transport error that kills the conversation.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="meta-scratchpad"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The meta Scratchpad
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each <code>tools/call</code> gets a fresh{' '}
						<code>meta</code> object shared between{' '}
						<code>tools</code>, <code>beforeCall</code>, and{' '}
						<code>onCall</code>. A tool handler can record what it
						touched, and your audit hook can read it back:
					</p>
					<PrismPlus
						codeString={mcpCapabilitiesMeta}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scope-gating"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scope Gating
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When <code>authorize</code> returns the caller's{' '}
						<code>scopes</code>, any tool that declares a{' '}
						<code>scope</code> is only listed on{' '}
						<code>tools/list</code> and callable on{' '}
						<code>tools/call</code> when the caller holds it. Tools
						without a scope are always available.
					</p>
					<PrismPlus
						codeString={mcpCapabilitiesScopes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Fails closed, hides completely"
						variant="warning"
					>
						A scoped tool is hidden when the caller's scopes are
						unknown, and calling a hidden tool answers{' '}
						<code>Unknown tool</code> — indistinguishable from a
						tool that doesn't exist.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prompts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prompts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Server-side prompts are recipes the client shows in its
						picker. Declare the definitions once and implement one{' '}
						<code>get</code> function; the package serves{' '}
						<code>prompts/list</code> (paginated) and{' '}
						<code>prompts/get</code> from them.
					</p>
					<DocsTable
						columns={['Definition field', 'Meaning']}
						rows={promptDefinitionRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={mcpCapabilitiesPrompts}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>get</code> receives{' '}
						<code>{'{ args, caller, name }'}</code> and returns the
						prompt text, delivered to the client as a single{' '}
						<code>user</code> message with one text content block.
						Returning <code>null</code> fails the request; an
						unknown prompt name is an invalid-params error.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="resources"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Resources
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Readable resources are two functions: <code>list</code>{' '}
						returns the <code>McpResource</code> entries visible to
						this caller (served paginated on{' '}
						<code>resources/list</code>), and <code>read</code>{' '}
						resolves one <code>uri</code> to its text — or{' '}
						<code>null</code>, which answers{' '}
						<code>Unknown resource</code>.
					</p>
					<DocsTable
						columns={['Resource field', 'Meaning']}
						rows={resourceFieldRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={mcpCapabilitiesResources}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>resources/read</code> answers with the text and
						the configured <code>mimeType</code>, which defaults to{' '}
						<code>text/markdown</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="capability-advertisement"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Capability Advertisement
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The capabilities advertised on <code>initialize</code>{' '}
						are derived from what the config actually provides — a
						client never sees a prompts or resources capability this
						endpoint can't serve. <code>instructions</code> and{' '}
						<code>serverInfo</code> ride along in the same response.
					</p>
					<DocsTable
						columns={['Capability', 'Advertised when', 'Flags']}
						rows={capabilityRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="One page size for every list"
						variant="note"
					>
						<code>listPageSize</code> (default 50) paginates{' '}
						<code>tools/list</code>, <code>prompts/list</code>, and{' '}
						<code>resources/list</code> alike, with an opaque cursor
						— a malformed or foreign cursor reads as page zero
						rather than erroring, as the spec treats cursors as
						opaque.
					</Callout>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
