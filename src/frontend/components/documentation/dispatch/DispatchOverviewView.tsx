import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	dispatchAdapters,
	dispatchChannels,
	dispatchPostmark,
	dispatchQuickStart,
	dispatchSpans,
	dispatchTesting,
	dispatchTwilio
} from '../../../data/documentation/dispatchDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#dispatch-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#channels', label: 'Channels' },
	{ href: '#adapters', label: 'Adapters' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#postmark', label: 'Postmark' },
	{ href: '#twilio', label: 'Twilio' },
	{ href: '#testing', label: 'Testing' }
];

export const DispatchOverviewView = ({
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
					<h1 id="dispatch-overview" style={h1Style(isMobileOrTablet)}>
						Dispatch
					</h1>
					<p style={paragraphLargeStyle}>
						Outbound message dispatcher for Bun + Elysia — email,
						SMS, and push behind one interface, with vendor adapter
						siblings for Resend, Postmark, and Twilio. Built-in
						OTel spans, audit-event integration, in-memory testing
						adapters, and a narrow ClientLike interface per
						adapter so vendor SDKs stay TRUE peer deps.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createDispatcher()</code> takes one optional
						adapter per channel. Each channel becomes a top-level
						callable —{' '}
						<code>dispatch.email(message)</code>,{' '}
						<code>dispatch.sms(message)</code>,{' '}
						<code>dispatch.push(message)</code>. Calling a
						channel you didn't configure throws{' '}
						<code>DispatchUnsupportedError</code>.
					</p>
					<PrismPlus
						codeString={dispatchQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="channels"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Channels
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three channels — email, SMS, push — all optional.
						Each message shape carries an optional{' '}
						<code>tenant</code> field that propagates to OTel
						spans and audit events, plus an open{' '}
						<code>metadata</code> record adapters can interpret.
					</p>
					<PrismPlus
						codeString={dispatchChannels}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="adapters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each vendor adapter is its own npm package — install
						only the ones you wire. In-memory and console
						adapters ship with the core package for tests + local
						dev.
					</p>
					<PrismPlus
						codeString={dispatchAdapters}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="observability"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Observability
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every send fans out an OTel span with{' '}
						<code>ABS_ATTRS</code>-shaped attributes plus
						cumulative counters via{' '}
						<code>dispatcher.metrics()</code>. Wiring{' '}
						<code>{'{ audit }'}</code> from{' '}
						<code>@absolutejs/audit</code> appends a{' '}
						<code>dispatch.&lt;channel&gt;.sent</code> /{' '}
						<code>.failed</code> event for every send.
					</p>
					<PrismPlus
						codeString={dispatchSpans}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="postmark"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Postmark
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Transactional + broadcast streams via{' '}
						<code>messageStream</code>. Default metadata mapping
						routes <code>metadata.tag</code> to Postmark's{' '}
						<code>Tag</code> and string-valued entries to its{' '}
						<code>Metadata</code> map. Custom headers
						auto-convert to Postmark's{' '}
						<code>{'[{Name, Value}]'}</code> shape.
					</p>
					<PrismPlus
						codeString={dispatchPostmark}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="twilio"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Twilio
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						SMS via single-number routing or Messaging Service
						SID, with sender precedence{' '}
						<code>message.from</code> {'>'}{' '}
						<code>defaultFrom</code> {'>'}{' '}
						<code>messagingServiceSid</code>. Pass{' '}
						<code>statusCallback</code> to thread delivery
						webhooks through every send.
					</p>
					<PrismPlus
						codeString={dispatchTwilio}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="testing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Testing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The in-memory adapters keep an in-process FIFO buffer
						— call <code>.inspect()</code> to assert what would
						have shipped, <code>.clear()</code> to reset between
						tests. No vendor mocks needed.
					</p>
					<PrismPlus
						codeString={dispatchTesting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
