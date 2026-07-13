import { PackageDocData } from '../../../../types/packageDocs';

export const emailPackageData: PackageDocData = {
	category: 'Messaging',
	description:
		'Provider-neutral email sync adapters for AbsoluteJS applications, covering Gmail REST sync, Microsoft Graph delta sync, and IMAP over TLS. The package owns the provider mechanics — history and delta cursors, webhook payload parsing, and normalized message shapes — while your host app keeps ownership of consent, credential storage, persistence, and scheduling. Normalized messages come out in one shape regardless of provider, ready to persist, score, filter, or enrich.',
	features: [
		{
			description:
				'createGmailClient handles Gmail REST history sync, users.watch registration, and Pub/Sub webhook payload parsing via parseGmailPubSubWebhook.',
			title: 'Gmail sync'
		},
		{
			description:
				'createMicrosoftGraphEmailClient drives Graph message delta sync and parses subscription notifications for Microsoft 365 mailboxes.',
			title: 'Microsoft Graph sync'
		},
		{
			description:
				'fetchImapMessages pulls mail over IMAP with TLS for Fastmail, self-hosted, and other custom mailbox providers.',
			title: 'IMAP over TLS'
		},
		{
			description:
				'gmailMessagesToNormalized and microsoftMessagesToNormalized convert provider payloads into one message shape your app can persist or score.',
			title: 'Normalized message shapes'
		},
		{
			description:
				'The package never touches credential storage, consent, relevance scoring, or persistence — those stay in your application where product policy belongs.',
			title: 'Host app owns policy'
		}
	],
	installCommand: 'bun add @absolutejs/email',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/email',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/email',
			label: 'GitHub'
		}
	],
	name: 'Email',
	notes: [
		{
			body: '@absolutejs/email is 0.0.x — client options and normalized message shapes may change between releases while the adapters harden against real provider traffic.',
			title: 'Early alpha',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/email',
	samples: [
		{
			code: `import {
	createGmailClient,
	gmailMessagesToNormalized
} from '@absolutejs/email';

const client = createGmailClient({ accessToken });

const { messages, cursor } = await client.listHistory({
	cursor: historyId
});

const normalized = await gmailMessagesToNormalized(client, messages, {
	accountEmail: 'member@example.com'
});`,
			description:
				'Sync a Gmail mailbox from a history cursor and normalize the results. Persist the returned cursor and pass it back on the next sync.',
			heading: 'Quick Start (Gmail)',
			language: 'typescript'
		},
		{
			code: `import {
	createMicrosoftGraphEmailClient,
	microsoftMessagesToNormalized
} from '@absolutejs/email';

const client = createMicrosoftGraphEmailClient({ accessToken });
const { messages, cursor } = await client.listDelta();

const normalized = microsoftMessagesToNormalized(messages, {
	accountEmail: 'member@example.com'
});`,
			description:
				'Microsoft 365 mailboxes sync through Graph delta queries — the first listDelta call returns everything plus a delta cursor for incremental follow-ups.',
			heading: 'Microsoft Graph',
			language: 'typescript'
		},
		{
			code: `import { fetchImapMessages } from '@absolutejs/email';

const result = await fetchImapMessages({
	accountEmail: 'member@example.com',
	auth: { pass: appPassword, user: 'member@example.com' },
	host: 'imap.fastmail.com',
	port: 993,
	secure: true
});`,
			description:
				'For providers without a REST API, fetchImapMessages connects over IMAP with TLS and returns messages in the same normalized shape.',
			heading: 'IMAP',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Gmail, Microsoft Graph, and IMAP sync clients that return one normalized message shape.',
	version: '0.0.2'
};
