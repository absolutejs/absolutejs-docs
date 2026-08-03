import { animated } from '@react-spring/web';
import { PackageExplanation } from '../../../../types/packageDocs';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { PackageExplanationBlocks } from '../packages/PackageExplanationBlocks';
import { DocumentationModeNav } from '../packages/DocumentationModeNav';
import {
	dispatchChannelUsage,
	dispatchAws,
	dispatchAwsOperations,
	dispatchConsent,
	dispatchInfobip,
	dispatchInfobipOperations,
	dispatchInstall,
	dispatchPostmark,
	dispatchPushLifecycle,
	dispatchPushProviders,
	dispatchQuickStart,
	dispatchSinch,
	dispatchTelnyx,
	dispatchTesting,
	dispatchTwilio,
	dispatchVonage
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
	{ href: '#channel-decision', label: 'Choose a Channel' },
	{ href: '#delivery-lifecycle', label: 'Delivery Lifecycle' },
	{ href: '#install', label: 'Install' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#production-model', label: 'Production model' },
	{ href: '#consent', label: 'Consent' },
	{ href: '#webhook-lifecycle', label: 'Webhook lifecycle' },
	{ href: '#push-lifecycle', label: 'Push lifecycle' },
	{ href: '#push-providers', label: 'APNs and FCM' },
	{ href: '#aws', label: 'AWS' },
	{ href: '#infobip', label: 'Infobip' },
	{ href: '#channels', label: 'Channels' },
	{ href: '#adapters', label: 'Adapters' },
	{ href: '#observability', label: 'Observability' },
	{ href: '#postmark', label: 'Postmark' },
	{ href: '#telnyx', label: 'Telnyx' },
	{ href: '#twilio', label: 'Twilio' },
	{ href: '#vonage', label: 'Vonage' },
	{ href: '#sinch', label: 'Sinch' },
	{ href: '#testing', label: 'Testing' }
];

const dispatchExplanations: PackageExplanation[] = [
	{
		columns: ['Use when', 'Portable content', 'Typical adapters'],
		description:
			'Choose the application-level channel first; provider adapters remain replaceable beneath the same policy and evidence boundary.',
		id: 'channel-decision',
		kind: 'matrix',
		rows: [
			{
				label: 'Email',
				values: [
					'Rich transactional or lifecycle communication',
					'Subject, text/HTML, sender, recipients, headers',
					'Postmark, AWS SES, Resend'
				]
			},
			{
				label: 'Messaging',
				values: [
					'SMS, MMS, RCS, WhatsApp, and social conversations',
					'Content, fallbacks, consent, privacy, schedule',
					'Twilio, Telnyx, Vonage, Sinch, Infobip'
				]
			},
			{
				label: 'Push',
				values: [
					'Device notifications and deep-link re-engagement',
					'Title, body, data, actions, badge, sound',
					'APNs, FCM'
				]
			}
		],
		title: 'Channel and provider are separate decisions'
	},
	{
		description:
			'One send produces a consistent policy, provider, observability, and callback trail across every adapter.',
		id: 'delivery-lifecycle',
		kind: 'lifecycle',
		steps: [
			{
				detail: 'Normalize the typed message and derive tenant, consent, privacy, and idempotency context.',
				label: 'Normalize'
			},
			{
				detail: 'Run ordered application policies before revealing content to a provider.',
				label: 'Authorize'
			},
			{
				detail: 'Translate through the selected channel adapter and invoke the provider.',
				label: 'Deliver'
			},
			{
				detail: 'Emit a typed result, metrics, trace span, and audit event together.',
				label: 'Evidence'
			},
			{
				detail: 'Verify, persist, deduplicate, and drain provider callbacks into normalized events.',
				label: 'Reconcile'
			}
		],
		title: 'From application intent to durable provider evidence'
	}
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
		call: 'dispatch.messaging(message)',
		fields: 'to, content, fallbacks?, sendAt?, idempotencyKey?, consent?, privacy?, from?, tenant?, extensions?, metadata?',
		title: 'Messaging'
	},
	{
		call: 'dispatch.push(message)',
		fields: 'to, title?, body, data?, actions?, badge?, deepLink?, sound?, idempotencyKey?, tenant?, metadata?',
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
		{ code: 'email / messaging / push' },
		'One optional adapter per channel. Only the channels you configure become callable.'
	],
	[
		{ code: 'defaultFrom' },
		'Fallback sender per channel ({ email?, messaging? }) when a message omits from.'
	],
	[
		{ code: 'policies' },
		'Ordered synchronous or asynchronous authorization checks that run before any adapter or provider receives the message.'
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

const productionBoundaryRows: DocsTableCell[][] = [
	[
		{ code: '@absolutejs/dispatch' },
		'Application-authored email, carrier/rich messaging, and push. It owns typed messages, policy evaluation, results, metrics, tracing, and audit emission.'
	],
	[
		{ code: '@absolutejs/compliance' },
		'Provider-neutral consent evidence and a pre-send policy that rejects missing or revoked recipient/program/purpose/transport scopes.'
	],
	[
		{ code: '@absolutejs/reliability' },
		'Durable webhook inboxes, checked-out PostgreSQL transactions, and fenced idempotent operations shared by provider adapters.'
	],
	[
		{ code: '@absolutejs/auth-twilio' },
		'Provider-owned OTP generation, delivery, fraud checks, and code verification through Twilio Verify. Auth owns enrollment and session promotion.'
	],
	[
		{ code: '@absolutejs/voice' },
		'Twilio voice calls and Media Streams. Voice is intentionally outside Dispatch messaging and Auth verification.'
	]
];

const pushOutcomeRows: DocsTableCell[][] = [
	[
		{ code: 'delivered' },
		'The provider accepted the send and the claim completed.'
	],
	[
		{ code: 'retired' },
		'The provider reported an invalid token; the registration was disabled.'
	],
	[
		{ code: 'skipped' },
		'A completed or in-flight fenced claim already owns this fanout item.'
	],
	[
		{ code: 'failed' },
		'A definite failure exhausted bounded retries; a fresh operation may decide whether to resend.'
	],
	[
		{ code: 'indeterminate' },
		'The provider acknowledgement was ambiguous. Reconcile it operationally; never convert it into an automatic duplicate send.'
	]
];

const webhookLifecycleRows: DocsTableCell[][] = [
	[
		'1. Verify',
		'Authenticate the exact raw request using the provider signature, JWT, HMAC, or the trusted gateway/EventBridge boundary.'
	],
	[
		'2. Persist',
		'Write the raw payload and stable provider event id to a durable WebhookInboxStore before performing application effects.'
	],
	[
		'3. Acknowledge',
		'Return 202 as soon as durable intake succeeds so slow consent, lifecycle, and application work cannot trigger provider retry storms.'
	],
	[
		'4. Drain',
		'Claim with a fencing token, normalize into delivery/inbound/consent events, apply idempotent effects in a worker, then complete or release.'
	]
];

const messagingEventRows: DocsTableCell[][] = [
	[
		{ code: 'delivery' },
		'Normalized provider status, requested/actual transport, attempt history, failure detail, carrier/economics metadata when available.'
	],
	[
		{ code: 'inbound' },
		'Typed sender/recipient endpoints, portable text/media content, and interaction payloads for replies and rich actions.'
	],
	[
		{ code: 'consent' },
		'Grant, revoke, or help intent from provider opt-in/opt-out signals; adapters can apply these to the shared consent ledger.'
	]
];

const vendorAdapterRows: DocsTableCell[][] = [
	[
		{ code: '@absolutejs/dispatch-resend' },
		'0.7.0',
		'Email',
		'createResendAdapter — takes your Resend client; the Resend message id becomes the result id.'
	],
	[
		{ code: '@absolutejs/dispatch-postmark' },
		'0.1.0',
		'Email',
		'createPostmarkAdapter — transactional + broadcast streams; the MessageID becomes the result id.'
	],
	[
		{ code: '@absolutejs/dispatch-apns' },
		'0.2.0',
		'Apple push',
		'HTTP/2 APNs delivery with ES256 provider-token rotation, alert/background modes, payload validation, and normalized provider errors.'
	],
	[
		{ code: '@absolutejs/dispatch-fcm' },
		'0.2.0',
		'Android / Apple / web push',
		'FCM HTTP v1 delivery with Application Default Credentials, short-lived OAuth tokens, token/topic/condition targets, and platform payloads.'
	],
	[
		{ code: '@absolutejs/dispatch-push-postgres' },
		'0.1.0',
		'Push lifecycle storage',
		'Tenant-isolated device registry plus fenced, indeterminate-safe fanout claims on PostgreSQL.'
	],
	[
		{ code: '@absolutejs/dispatch-aws-end-user-messaging' },
		'0.1.0',
		'SMS / MMS / RCS / WhatsApp',
		'AWS SDK v3, phone-pool RCS fallback, Protect fraud controls, Notify templates, event ingress, readiness, and registration workflows.'
	],
	[
		{ code: '@absolutejs/dispatch-infobip' },
		'0.1.0',
		'Global carrier / conversational messaging',
		'Messages API validation, portable rich content, scheduling, authenticated durable callbacks, and US brand/campaign/number operations.'
	],
	[
		{ code: '@absolutejs/dispatch-telnyx' },
		'0.3.0',
		'SMS / MMS / RCS',
		'Direct rich RCS, capability checks, SMS/MMS fallback, Ed25519 webhooks, scheduling, carrier registration, and shared atomic reliability.'
	],
	[
		{ code: '@absolutejs/dispatch-twilio' },
		'0.7.0',
		'SMS / MMS / RCS / WhatsApp',
		'Rich Messaging Service sending, signed delivery, inbound, and consent webhooks, durable idempotency/lifecycle stores, tenant routing, and API-inspected readiness.'
	],
	[
		{ code: '@absolutejs/dispatch-vonage' },
		'0.2.0',
		'SMS / MMS / RCS / WhatsApp / Viber / Messenger',
		'Ordered native failover, rich RCS, capability checks and revocation, signed JWT webhooks, durable reliability, tenant routing, and 10DLC workflows.'
	],
	[
		{ code: '@absolutejs/dispatch-sinch' },
		'0.3.0',
		'SMS / MMS / RCS / WhatsApp / social messaging',
		'Conversation API channel-priority fallback, rich transcoding, fast durable HMAC intake, capability lookup, tenant routing, and concrete OAuth 10DLC/toll-free operations.'
	]
];

const builtInAdapterRows: DocsTableCell[][] = [
	[
		{
			code: 'memoryEmailAdapter / memoryMessagingAdapter / memoryPushAdapter'
		},
		'In-process FIFO buffer (default 1000 messages). Call .inspect() to read a copy, .clear() to reset between tests.'
	],
	[
		{
			code: 'consoleEmailAdapter / consoleMessagingAdapter / consolePushAdapter'
		},
		'Prints the message as JSON to stdout and returns immediately. Handy for local dev without a vendor account.'
	]
];

const spanAttributeRows: DocsTableCell[][] = [
	[{ code: 'dispatch.channel' }, "'email' | 'messaging' | 'push'"],
	[
		{ code: 'dispatch.provider' },
		"Adapter name — 'resend', 'postmark', 'twilio', …"
	],
	[
		{ code: 'dispatch.recipient_count' },
		'Recipient count only; addresses and device tokens are excluded.'
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
		'Per-channel { sent, failed } breakdown for email, messaging, and push.'
	]
];

export const DispatchOverviewView = ({
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
						id="dispatch-overview"
						style={h1Style(isMobileOrTablet)}
					>
						Dispatch
					</h1>
					<p style={paragraphLargeStyle}>
						Provider-agnostic outbound dispatcher for Bun + Elysia —
						send email, carrier/rich messaging, and push through one
						typed interface. Swap Resend, Postmark, AWS, Infobip,
						Sinch, Telnyx, Twilio, or Vonage without touching call
						sites, test with the bundled in-memory adapters, and get
						OpenTelemetry spans and audit events on every send.
					</p>
				</animated.div>
				<DocumentationModeNav
					productionHref="#production-model"
					referenceHref="#channels"
					runHref="#quick-start"
					themeSprings={themeSprings}
				/>

				<PackageExplanationBlocks
					explanations={dispatchExplanations}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<AnchorHeading
						id="install"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Install
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Install the core and only the provider, persistence, and
						policy packages your application uses. Every package is
						a real npm release; the ecosystem does not rely on local
						file dependencies, overrides, or publish-time workspace
						tricks.
					</p>
					<PrismPlus
						codeString={dispatchInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<Callout
						themeSprings={themeSprings}
						title="Runnable · zero credentials"
						variant="success"
					>
						Run this with only @absolutejs/dispatch installed.
						Success is proved by provider === memory and one
						captured message from email.inspect().
					</Callout>
					<p style={paragraphSpacedStyle}>
						<code>createDispatcher()</code> takes one optional
						adapter per channel. Each channel becomes a top-level
						callable — <code>dispatch.email(message)</code>,{' '}
						<code>dispatch.messaging(message)</code>,{' '}
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
						id="production-model"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Production model
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The ecosystem separates authored messages, consent,
						durability, provider-managed verification, and voice
						into explicit contracts. This keeps OTP out of the
						alerting layer and carrier compliance out of individual
						call sites.
					</p>
					<DocsTable
						columns={['Package', 'Responsibility']}
						rows={productionBoundaryRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Alerts and OTP are different products"
						variant="info"
					>
						Use <code>@absolutejs/dispatch-twilio</code> for copy
						your application authors. Use{' '}
						<code>@absolutejs/auth-twilio</code> when Twilio Verify
						must generate and validate the secret. The Auth MFA
						guide contains the complete Verify setup.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="consent"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Consent before delivery
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compliance ledger keys evidence by tenant,
						recipient, program, purpose, and every transport the
						provider may use. The Dispatch policy performs the
						durable lookup before the adapter runs. Signed
						STOP/START callbacks from Twilio, Telnyx, Vonage, and
						Sinch can update the same ledger.
					</p>
					<PrismPlus
						codeString={dispatchConsent}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Registration is not consent"
						variant="warning"
					>
						10DLC, toll-free, RCS, WhatsApp, and sender approval
						make a traffic program eligible for a carrier channel.
						They do not replace recipient-level evidence, opt-out
						handling, privacy terms, or the application's legal
						review.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="webhook-lifecycle"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Durable webhook lifecycle
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Messaging adapters normalize provider callbacks into one
						event model, but durability is deliberately split from
						HTTP intake. Use the PostgreSQL inbox and transaction
						runner from <code>@absolutejs/reliability</code> in
						production; the memory store is for tests and local
						development.
					</p>
					<DocsTable
						columns={['Stage', 'Requirement']}
						rows={webhookLifecycleRows}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Event kind', 'Normalized meaning']}
						rows={messagingEventRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="push-lifecycle"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Push lifecycle
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createPushLifecycle()</code> adds the shared layer
						above APNs and FCM: tenant-safe device registration,
						user/device/topic targeting, multi-tenant adapter
						resolution, bounded retries and concurrency,
						invalid-token retirement, and portable badges, sounds,
						actions, and deep links. PostgreSQL persistence keeps
						registrations durable and uses fenced claims so
						ambiguous sends become
						<code>indeterminate</code> instead of double-delivering.
					</p>
					<PrismPlus
						codeString={dispatchPushLifecycle}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Fanout status', 'Meaning']}
						rows={pushOutcomeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Apply <code>PUSH_SUBSCRIPTION_POSTGRES_SCHEMA</code> and{' '}
						<code>IDEMPOTENT_OPERATION_POSTGRES_SCHEMA</code> before
						starting workers. Registration atomically reconciles the
						stable tenant/platform/device identity with provider
						token rotation, retaining the subscription identity and
						removing superseded token records.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="push-providers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						APNs and FCM
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						APNs uses short-lived ES256 provider tokens and pooled
						HTTP/2 sessions. FCM uses HTTP v1 with Application
						Default Credentials. Portable actions, badges, sounds,
						and deep links are translated for both providers;
						advanced provider objects remain available through
						message metadata.
					</p>
					<PrismPlus
						codeString={dispatchPushProviders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="aws"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AWS End User Messaging
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The AWS adapter uses SDK v3 and workload IAM for SMS,
						MMS, plain or rich RCS, managed Notify templates, and
						WhatsApp. Use one phone pool per consented use case: a
						pool containing an approved RCS agent and SMS identity
						gives AWS-managed RCS fallback without application-side
						duplicate routing. Readiness checks cover the pool,
						event configuration set, and Protect fraud controls;
						registration helpers drive AWS's dynamic regulatory
						forms.
					</p>
					<PrismPlus
						codeString={dispatchAws}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Delivery events use the shared durable inbox pattern:
						verify the deployment's authenticated AWS ingress,
						persist the raw event before returning <code>202</code>,
						then normalize and apply effects from a retryable
						worker. The registration manager exposes AWS's dynamic
						field workflow without hiding provider-specific
						requirements.
					</p>
					<PrismPlus
						codeString={dispatchAwsOperations}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="infobip"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Infobip
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Infobip's Messages API provides one global surface for
						SMS, MMS, RCS, WhatsApp, Viber, Apple Messages for
						Business, Instagram, LINE, and Messenger. The adapter
						can validate the exact request before sending, maps
						portable rich content, and stores authenticated delivery
						callbacks before effects run. Operations cover 10DLC
						brands and campaigns plus number resource requests.
						Provider failover details must be supplied and validated
						for the channels enabled on the account.
					</p>
					<PrismPlus
						codeString={dispatchInfobip}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Inbound messages and delivery/seen receipts normalize
						into different event kinds. Portable media accepts
						exactly one URL so additional parts are never silently
						discarded; validated provider-specific payloads belong
						under <code>extensions.infobip</code>. Use the
						operations client for US brand, campaign, registration,
						and number workflows.
					</p>
					<PrismPlus
						codeString={dispatchInfobipOperations}
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
						webhook. Messaging additionally returns requested/actual
						transports and normalized primary/fallback attempts. The{' '}
						<code>privacy</code> field declares address/content
						retention preferences for adapters that expose provider
						retention controls.
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
						title="Provider SDK ownership is explicit"
						variant="info"
					>
						Adapters that expect an application-owned SDK expose a
						narrow <code>ClientLike</code> contract and declare that
						SDK as a peer. AWS ships its exact SDK v3 command
						clients as adapter dependencies, while Infobip uses the
						standard fetch contract. No adapter reaches through an
						undocumented client shape.
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
						<code>dispatch.messaging.send</code>, or{' '}
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
						recipient as the target for email/messaging and a safe
						subscription identifier for push. Raw device tokens are
						never written to default logs, spans, or audit targets.
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
						id="telnyx"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Telnyx
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>@absolutejs/dispatch-telnyx</code> for SMS,
						MMS, and direct rich RCS. It maps portable cards and
						actions to Telnyx RCS, supports explicit SMS/MMS
						fallback routes and recipient capability checks, and
						uses the shared atomic reliability package for scoped
						idempotency and durable webhook recovery.
					</p>
					<p style={paragraphSpacedStyle}>
						The webhook handler verifies Telnyx Ed25519 signatures
						over the raw request, supports bounded public-key
						rotation, normalizes delivery and interactive inbound
						events, and can apply STOP/START events to every
						resolved consent program. Registration and readiness
						helpers cover 10DLC, toll-free, Messaging Profile
						binding, and explicit RCS approval.
					</p>
					<PrismPlus
						codeString={dispatchTelnyx}
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
						Use <code>@absolutejs/dispatch-twilio</code> for
						application-authored SMS alerts, MMS, RCS with SMS/MMS
						fallback, WhatsApp, and Twilio Content templates. Use{' '}
						<code>@absolutejs/auth-twilio</code> for Verify-managed
						OTP, MFA, recovery, and step-up challenges. Twilio voice
						calls and Media Streams remain in{' '}
						<code>@absolutejs/voice</code>; they are not messaging
						or auth adapters.
					</p>
					<p style={paragraphSpacedStyle}>
						Messaging requires a Twilio Messaging Service and HTTPS
						status callback. The signed webhook handler normalizes
						delivery states, ordinary inbound replies and media,
						plus Advanced Opt-Out <code>STOP</code>,{' '}
						<code>START</code>, and <code>HELP</code> events. Its
						atomic lifecycle-store contract deduplicates retries and
						rejects stale status transitions. Signed START/STOP
						events can update the provider-neutral consent ledger,
						whose dispatch policy blocks missing or revoked consent
						before a provider call.
					</p>
					<PrismPlus
						codeString={dispatchTwilio}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Production readiness"
						variant="note"
					>
						The readiness report inspects the real account/service
						binding, callbacks, sender pool, optional RCS sender,
						and US A2P attachment. The compliance manager submits
						A2P brand/campaign and toll-free verification requests
						and inspects their live status. Consent evidence,
						opt-out testing, privacy, and messaging terms remain
						operator responsibilities. Reports are operational, not
						legal certification.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="vonage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vonage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>@absolutejs/dispatch-vonage</code> for SMS,
						MMS, RCS, WhatsApp, Viber, and Messenger through the
						Messages API. The adapter supports ordered
						provider-native failover, rich RCS cards and actions,
						WhatsApp templates, multi-account tenant routing, and
						scoped atomic idempotency.
					</p>
					<p style={paragraphSpacedStyle}>
						Signed JWT webhooks are validated against the exact raw
						body and normalized into shared delivery, inbound,
						interaction, and STOP/START consent events. Operational
						helpers cover application readiness, complete 10DLC
						brand/campaign/number workflows, RCS device capabilities
						and revocation, and WhatsApp read receipts.
					</p>
					<PrismPlus
						codeString={dispatchVonage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sinch"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sinch
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>@absolutejs/dispatch-sinch</code> with Sinch's
						recommended Conversation API for SMS, MMS, RCS,
						WhatsApp, Viber Business, Messenger, Instagram,
						Telegram, KakaoTalk, LINE, and WeChat. One portable
						message is transcoded across an ordered channel-priority
						fallback route.
					</p>
					<p style={paragraphSpacedStyle}>
						The adapter resolves app-scoped social identities
						explicitly, verifies HMAC callbacks over the exact raw
						body, persists callbacks atomically with stable retry
						identifiers, and normalizes delivery, inbound, choice,
						capability, provider opt-in/out, WhatsApp preference,
						and SMS STOP/START events. Operational helpers cover
						live app/webhook readiness, asynchronous channel
						capabilities, plus a concrete OAuth client for 10DLC,
						number linking, and toll-free verification. HTTP intake
						returns after durable storage; consent and application
						effects run through the retryable drain.
					</p>
					<PrismPlus
						codeString={dispatchSinch}
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

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
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
