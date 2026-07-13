import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	dispatchChannelUsage,
	dispatchPostmark,
	dispatchQuickStart,
	dispatchTesting,
	dispatchTwilio
} from '../../../data/documentation/dispatchDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
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
	{ href: '#dispatch-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#channels', label: 'Channels' },
	{ href: '#adapters', label: 'Adapters' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#postmark', label: 'Postmark' },
	{ href: '#twilio', label: 'Twilio' },
	{ href: '#testing', label: 'Testing' }
];

type ChannelCardData = {
	call: string;
	fields: string;
	title: string;
};

const channelCards: ChannelCardData[] = [
	{
		call: 'dispatch.email(message)',
		fields: 'to, subject, text?, html?, from?, replyTo?, cc?, bcc?, headers?, tenant?, metadata?',
		title: 'Email'
	},
	{
		call: 'dispatch.sms(message)',
		fields: 'to, body, from?, tenant?, metadata?',
		title: 'SMS'
	},
	{
		call: 'dispatch.push(message)',
		fields: 'to, title?, body, data?, tenant?, metadata?',
		title: 'Push'
	}
];

type ChannelCardProps = ChannelCardData & {
	themeSprings: ThemeSprings;
};

const ChannelCard = ({
	call,
	fields,
	themeSprings,
	title
}: ChannelCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				...paragraphSpacedStyle,
				marginBottom: '0.5rem'
			}}
		>
			<strong style={strongStyle}>{title}</strong>
		</p>
		<p
			style={{
				fontSize: '0.85rem',
				marginBottom: '0.75rem'
			}}
		>
			<code>{call}</code>
		</p>
		<p
			style={{
				fontFamily: 'JetBrains Mono, monospace',
				fontSize: '0.8rem',
				lineHeight: 1.7,
				opacity: 0.85,
				overflowWrap: 'break-word'
			}}
		>
			{fields}
		</p>
	</animated.div>
);

const dispatcherOptionRows: DocsTableCell[][] = [
	[
		{ code: 'email / sms / push' },
		'One optional adapter per channel. Only the channels you configure become callable.'
	],
	[
		{ code: 'defaultFrom' },
		'Fallback sender per channel ({ email?, sms? }) when a message omits from.'
	],
	[
		{ code: 'audit' },
		'Audit writer from @absolutejs/audit — appends a sent/failed event for every send.'
	],
	[
		{ code: 'tracerProvider' },
		'OpenTelemetry TracerProvider (via @absolutejs/telemetry) — one span per send.'
	],
	[
		{ code: 'onError' },
		'(err, channel, message) => void hook that fires on every failed send.'
	]
];

const vendorAdapterRows: DocsTableCell[][] = [
	[
		{ code: '@absolutejs/dispatch-resend' },
		'0.0.1',
		'Email',
		'createResendAdapter — takes your Resend client; the Resend message id becomes the result id.'
	],
	[
		{ code: '@absolutejs/dispatch-postmark' },
		'0.0.1',
		'Email',
		'createPostmarkAdapter — transactional + broadcast streams; the MessageID becomes the result id.'
	],
	[
		{ code: '@absolutejs/dispatch-twilio' },
		'0.0.1',
		'SMS',
		'createTwilioAdapter — single-number or Messaging Service routing; the Message SID becomes the result id.'
	]
];

const builtInAdapterRows: DocsTableCell[][] = [
	[
		{ code: 'memoryEmailAdapter / memorySmsAdapter / memoryPushAdapter' },
		'In-process FIFO buffer (default 1000 messages). Call .inspect() to read a copy, .clear() to reset between tests.'
	],
	[
		{
			code: 'consoleEmailAdapter / consoleSmsAdapter / consolePushAdapter'
		},
		'Prints the message as JSON to stdout and returns immediately. Handy for local dev without a vendor account.'
	]
];

const spanAttributeRows: DocsTableCell[][] = [
	[{ code: 'dispatch.channel' }, "'email' | 'sms' | 'push'"],
	[
		{ code: 'dispatch.provider' },
		"Adapter name — 'resend', 'postmark', 'twilio', …"
	],
	[
		{ code: 'dispatch.recipient' },
		'message.to (CSV-joined when to is an array)'
	],
	[
		{ code: 'dispatch.message_id' },
		'Vendor id, set after the adapter returns one'
	],
	[{ code: 'abs.tenant' }, 'message.tenant when set']
];

const metricsCounterRows: DocsTableCell[][] = [
	[{ code: 'sent' }, 'Cumulative successful sends across every channel.'],
	[{ code: 'failed' }, 'Cumulative failed sends across every channel.'],
	[
		{ code: 'byChannel' },
		'Per-channel { sent, failed } breakdown for email, sms, and push.'
	]
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
					<h1
						id="dispatch-overview"
						style={h1Style(isMobileOrTablet)}
					>
						Dispatch
					</h1>
					<p style={paragraphLargeStyle}>
						Provider-agnostic outbound dispatcher for Bun + Elysia —
						send email, SMS, and push through one typed interface.
						Swap Resend, Postmark, or Twilio without touching call
						sites, test with the bundled in-memory adapters, and get
						OpenTelemetry spans and audit events on every send.
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
						callable — <code>dispatch.email(message)</code>,{' '}
						<code>dispatch.sms(message)</code>,{' '}
						<code>dispatch.push(message)</code>. Calling a channel
						you didn't configure throws{' '}
						<code>DispatchUnsupportedError</code>, so the omission
						is loud, not silent.
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
						Three channels, all optional — configure only the ones
						you use. Every message shape carries an optional{' '}
						<code>tenant</code> field that propagates to spans and
						audit events, plus an open <code>metadata</code> record
						adapters can interpret.
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobileOrTablet
								? '1fr'
								: 'repeat(3, 1fr)',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						{channelCards.map((card) => (
							<ChannelCard
								call={card.call}
								fields={card.fields}
								key={card.title}
								themeSprings={themeSprings}
								title={card.title}
							/>
						))}
					</div>
					<p style={paragraphSpacedStyle}>
						Besides the per-channel adapters,{' '}
						<code>createDispatcher()</code> accepts:
					</p>
					<DocsTable
						columns={['Option', 'Description']}
						rows={dispatcherOptionRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every channel call resolves to a{' '}
						<code>{'DispatchResult { at, id?, provider }'}</code> so
						you can correlate the send with the vendor's delivery
						webhook.
					</p>
					<PrismPlus
						codeString={dispatchChannelUsage}
						language="typescript"
						showLineNumbers={true}
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
						only the ones you wire.
					</p>
					<DocsTable
						columns={[
							'Package',
							'Version',
							'Channel',
							'Description'
						]}
						rows={vendorAdapterRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Vendor SDKs stay peer dependencies"
						variant="info"
					>
						Each adapter accepts a narrow <code>ClientLike</code>{' '}
						interface instead of importing the vendor SDK, so
						installing an adapter never pulls in{' '}
						<code>postmark</code> or <code>twilio</code>{' '}
						transitively. You construct the client and hand it to
						the adapter.
					</Callout>
					<p style={paragraphSpacedStyle}>
						In-memory and console adapters ship with the core
						package for tests and local dev:
					</p>
					<DocsTable
						columns={['Adapters', 'Behavior']}
						rows={builtInAdapterRows}
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
						Every send is wrapped in a single OpenTelemetry span —{' '}
						<code>dispatch.email.send</code>,{' '}
						<code>dispatch.sms.send</code>, or{' '}
						<code>dispatch.push.send</code> — carrying these
						attributes:
					</p>
					<DocsTable
						columns={['Attribute', 'Value']}
						rows={spanAttributeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>dispatcher.metrics()</code> returns cumulative
						counters since the dispatcher was created:
					</p>
					<DocsTable
						columns={['Counter', 'Meaning']}
						rows={metricsCounterRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Pass an <code>{'{ audit }'}</code> writer shaped like{' '}
						<code>@absolutejs/audit</code>'s and every send appends
						a <code>dispatch.&lt;channel&gt;.sent</code> or{' '}
						<code>dispatch.&lt;channel&gt;.failed</code> event —
						with the provider and message id in metadata,{' '}
						<code>message.tenant</code> as the actor (
						<code>'system'</code> when no tenant is set), and the
						recipient as the target.
					</p>
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
						Transactional and broadcast streams via{' '}
						<code>messageStream</code>. By default the adapter
						extracts a <code>tag</code> field from{' '}
						<code>message.metadata</code> into Postmark's{' '}
						<code>Tag</code> (used for analytics segmentation) and
						routes every other string-valued metadata entry into
						Postmark's <code>Metadata</code> map — override the
						mapping with <code>mapMetadata</code>.
					</p>
					<PrismPlus
						codeString={dispatchPostmark}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Postmark requires a From address"
						variant="warning"
					>
						Pass it per-message or via <code>defaultFrom</code> —
						otherwise the adapter throws a clear error before the
						send.
					</Callout>
					<p style={paragraphSpacedStyle}>
						Custom headers on the <code>EmailMessage</code>{' '}
						auto-convert to Postmark's{' '}
						<code>{'[{Name, Value}]'}</code> array shape. SDK errors
						propagate, so the dispatcher's <code>onError</code> hook
						and span error capture kick in.
					</p>
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
						SMS via single-number routing or a Messaging Service
						SID, with sender precedence <code>message.from</code>{' '}
						{'>'} <code>defaultFrom</code> {'>'}{' '}
						<code>messagingServiceSid</code> — if none resolves, the
						adapter throws. Pass <code>statusCallback</code> to
						thread Twilio's delivery webhooks through every send to
						your own ingest URL.
					</p>
					<PrismPlus
						codeString={dispatchTwilio}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Bulk-send error normalization"
						variant="note"
					>
						Twilio can return <code>errorCode != null</code> in an
						otherwise-successful response body (rare but real). The
						adapter throws in that case, so the dispatcher's failed
						counter and audit failure event still fire.
					</Callout>
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
						No vendor mocks needed. The in-memory adapters keep an
						in-process FIFO buffer — call <code>.inspect()</code> to
						assert what would have shipped, <code>.clear()</code> to
						reset between tests.
					</p>
					<PrismPlus
						codeString={dispatchTesting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For error-path tests, wrap an adapter and have its{' '}
						<code>.send()</code> reject — the dispatcher's failed
						counter, span error, audit failure event, and{' '}
						<code>onError</code> hook all fire on the same
						rejection.
					</p>
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
