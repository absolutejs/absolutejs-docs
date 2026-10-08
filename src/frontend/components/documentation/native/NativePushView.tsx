import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	localNotificationSchedule,
	pushAuthConfig,
	pushEnable,
	pushLifecycleSetup,
	pushMobileConfig,
	pushPwaConfig,
	pushReceive,
	pushSend
} from '../../../data/documentation/native/nativePushDocsCode';
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
import {
	ComparisonTable,
	type ComparisonRow
} from '../../utils/ComparisonTable';
import {
	DefinitionGrid,
	type DefinitionItem
} from '../../utils/DefinitionGrid';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PackageCardGrid, type PackageCard } from '../../utils/PackageCardGrid';
import { PrismPlus } from '../../utils/PrismPlus';
import { StepFlow, type StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How it works' },
	{ href: '#in-your-pages', label: 'In your pages' },
	{ href: '#server', label: 'On your server' },
	{ href: '#sending', label: 'Sending' },
	{ href: '#platform-setup', label: 'Platform setup' },
	{ href: '#delivery', label: 'Delivery guarantees' },
	{ href: '#local-notifications', label: 'Local notifications' },
	{ href: '#packages', label: 'Packages' }
];

const pushSteps: StepFlowStep[] = [
	{
		code: 'await pushNotifications.enable()',
		description:
			'Your page turns notifications on, usually from a button. Permission is requested only if it has not been asked yet.',
		title: 'The page enables push'
	},
	{
		description:
			'The device gets its address from Apple (APNs) or Google (FCM); in a browser it is a Web Push subscription. Your page never sees it.',
		title: 'The device gets an address'
	},
	{
		description:
			'The app sends it to /auth/push as the signed-in user. Your server decides the user, organization and topics; the device cannot choose them.',
		title: 'Your server registers the device'
	},
	{
		description:
			'Dispatch stores the device and, when you send, delivers to every matching device through APNs, FCM or Web Push.',
		title: 'You send to people, not devices'
	}
];

const pageBehaviourItems: DefinitionItem[] = [
	{
		description:
			'When someone signs in and has already allowed notifications, their device is registered again without a prompt.',
		term: 'Follows sign-in'
	},
	{
		description:
			'Signing out removes the device from that account first, so the next person to use the phone gets nothing meant for the last.',
		term: 'Stops at sign-out'
	},
	{
		description:
			'When APNs or FCM rotates the address, the same installation is updated rather than added twice.',
		term: 'Survives token changes'
	}
];

const targetRows = [
	[{ code: '{ tenant, userId }' }, 'Every device of one user.'],
	[{ code: '{ tenant, topic }' }, 'Every device subscribed to a topic.'],
	[{ code: '{ tenant, deviceId }' }, 'One device.'],
	[{ code: '{ tenant, subscriptionIds }' }, 'Specific registrations.']
];

const messageRows = [
	[{ code: 'body' }, 'The text. Required.'],
	[{ code: 'title' }, 'The heading.'],
	[
		{ code: 'deepLink' },
		'Where a tap should go. Arrives as data.absoluteDeepLink in the app, and opens that URL from a browser notification.'
	],
	[
		{ code: 'data' },
		'Extra values your app reads in onReceived or onAction.'
	],
	[{ code: 'badge' }, 'The number on the app icon.'],
	[{ code: 'sound' }, 'A notification sound.'],
	[{ code: 'actions' }, 'Buttons shown on the notification.'],
	[{ code: 'idempotencyKey' }, 'Makes a retry of the same send deliver once.']
];

const platformRows = [
	[
		'iOS',
		'An APNs key (.p8) from your Apple Developer account, with its key ID and your team ID.',
		'The push entitlement and the code that receives the device address are added to the iOS project for you. For builds run from Xcode, create the APNs adapter with environment set to sandbox.'
	],
	[
		'Android',
		'A Firebase project with an Android app whose package name is your appId.',
		'Put its google-services.json in your project; absolute mobile sync checks it matches your appId and copies it in. Your server sends with a Google service account.'
	],
	[
		'Web',
		'A VAPID key pair.',
		'Add a pwa block to absolute.config.ts. Pages that import pushNotifications get Web Push in the browser and the installed web app.'
	]
];

const deliveryItems: DefinitionItem[] = [
	{
		description:
			'An address APNs, FCM or the browser reports as gone is retired, so you stop paying for sends that cannot arrive.',
		term: 'Dead devices removed'
	},
	{
		description:
			'Temporary failures are retried, three attempts by default, with ten sends in flight at once.',
		term: 'Retries with limits'
	},
	{
		description:
			'If a provider’s answer is lost, the send is recorded as indeterminate and not retried, so nobody gets the same alert twice.',
		term: 'No double alerts'
	},
	{
		description:
			'Each registration belongs to one organization. A send can never reach another tenant’s devices.',
		term: 'Tenant isolation'
	}
];

const localVsPushRows: ComparisonRow[] = [
	{
		feature: 'Who sends it',
		values: ['Your app, on the device', 'Your server']
	},
	{
		feature: 'Works with no connection',
		values: [true, false]
	},
	{
		feature: 'Needs Auth and a server',
		values: [false, true]
	},
	{
		feature: 'Typical use',
		values: ['Reminders, timers, pickups', 'Messages, orders, alerts']
	}
];

const packageCards: PackageCard[] = [
	{
		description:
			'The push lifecycle: registration, targeting, retries and retirement.',
		href: '/documentation/dispatch',
		name: 'Dispatch',
		packageName: '@absolutejs/dispatch'
	},
	{
		description: 'Delivery to iPhone and iPad through Apple.',
		href: '/documentation/dispatch-apns',
		name: 'Dispatch APNs',
		packageName: '@absolutejs/dispatch-apns'
	},
	{
		description: 'Delivery to Android through Firebase Cloud Messaging.',
		href: '/documentation/dispatch-fcm',
		name: 'Dispatch FCM',
		packageName: '@absolutejs/dispatch-fcm'
	},
	{
		description: 'PostgreSQL storage for registrations and sends.',
		href: '/documentation/dispatch-push-postgres',
		name: 'Dispatch Push Postgres',
		packageName: '@absolutejs/dispatch-push-postgres'
	},
	{
		description:
			'Web Push, the installable web app and its service worker.',
		href: '/documentation/pwa',
		name: 'PWA',
		packageName: '@absolutejs/pwa'
	}
];

export const NativePushView = ({
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
					<h1 id="native-push" style={h1Style(isMobileOrTablet)}>
						Push notifications
					</h1>
					<p style={paragraphLargeStyle}>
						One call in your page turns on notifications for iOS,
						Android and the web. Devices register as the signed-in
						user, and your server sends to people and topics while
						Dispatch handles APNs, FCM and Web Push.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How it works
					</AnchorHeading>
					<StepFlow steps={pushSteps} themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="in-your-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						In your pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Push uses <code>pushNotifications</code> from{' '}
						<code>@absolutejs/devices</code>. Importing it is what
						adds the native push plugin and its permissions to your
						app.
					</p>
					<PrismPlus
						codeString={pushEnable}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={pageBehaviourItems}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Listen for notifications while the app is open, and for
						taps. The <code>deepLink</code> you sent arrives in{' '}
						<code>notification.data.absoluteDeepLink</code>; route
						to it with your app’s own navigation.
					</p>
					<PrismPlus
						codeString={pushReceive}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						On your server
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Create one push lifecycle with an adapter for each kind
						of device, and storage for registrations. Apply{' '}
						<code>PUSH_SUBSCRIPTION_POSTGRES_SCHEMA</code> from{' '}
						<code>@absolutejs/dispatch-push-postgres</code> and{' '}
						<code>IDEMPOTENT_OPERATION_POSTGRES_SCHEMA</code> from{' '}
						<code>@absolutejs/reliability</code> to your database
						once.
					</p>
					<PrismPlus
						codeString={pushLifecycleSetup}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Then give it to Auth. That mounts{' '}
						<code>/auth/push</code>, which accepts the app’s
						signed-in requests and the browser’s session cookie.
						Push needs Auth’s <code>oidc</code> provider, which your
						app already uses to sign in.
					</p>
					<PrismPlus
						codeString={pushAuthConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="The build checks this"
						variant="warning"
					>
						A mobile build stops with a message if a page imports{' '}
						<code>pushNotifications</code> but{' '}
						<code>@absolutejs/auth</code> is not installed or{' '}
						<code>auth({'{ push }'})</code> is not configured.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sending"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sending
					</AnchorHeading>
					<PrismPlus
						codeString={pushSend}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Send to', 'Reaches']}
						rows={targetRows}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Message field', 'Meaning']}
						rows={messageRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="platform-setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Platform setup
					</AnchorHeading>
					<DocsTable
						columns={[
							'Platform',
							'You need',
							'What AbsoluteJS does'
						]}
						rows={platformRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={pushMobileConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The same <code>pushNotifications</code> code sends Web
						Push to the browser and the installed web app once your
						config has a <code>pwa</code> block and the build has a
						public VAPID key.
					</p>
					<PrismPlus
						codeString={pushPwaConfig}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="delivery"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Delivery guarantees
					</AnchorHeading>
					<DefinitionGrid
						items={deliveryItems}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="local-notifications"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Local notifications
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For reminders the app can schedule itself, use{' '}
						<code>localNotifications</code> instead. They need no
						server and fire with no connection.
					</p>
					<ComparisonTable
						columns={['Local notifications', 'Push notifications']}
						rows={localVsPushRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={localNotificationSchedule}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="packages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Packages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every device feature, including the permission states
						push uses, is on{' '}
						<a href="/documentation/native-devices">Device APIs</a>.
					</p>
					<PackageCardGrid
						items={packageCards}
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
