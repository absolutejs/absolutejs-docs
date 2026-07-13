import { PackageDocData } from '../../../../types/packageDocs';

export const engagementPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Provider adapters live in the engagement-adapters monorepo (Apache-2.0). Add a provider by implementing EngagementSource in a new workspace publishing as @absolutejs/engagement-<name> — the same shape as every other adapter monorepo in the ecosystem.',
			heading: 'Engagement Adapters',
			items: [
				{
					description:
						'Apollo.io EngagementSource adapter — person/company enrichment and outreach activity (emails sent/opened/replied) from the Apollo API.',
					name: '@absolutejs/engagement-apollo',
					version: '0.0.6'
				}
			]
		}
	],
	category: 'Commerce & Growth',
	description:
		'The EngagementSource contract plus normalized types for sales-engagement adapters. A platform like Apollo, Outreach, or Salesloft is two things at once — an enrichment source (who is this person or company) and an activity source (what outreach actually happened: emails sent, opened, replied; LinkedIn touches; calls) — and each adapter normalizes one provider to this single contract so a consuming app can pull both onto a unified deal timeline without knowing which vendor is behind it.',
	features: [
		{
			description:
				'One EngagementSource type covers enrichPerson, enrichCompany, searchPeople, and listActivities; every capability is optional so an adapter implements only what its provider and plan support.',
			title: 'Single provider contract'
		},
		{
			description:
				'NormalizedPerson and NormalizedCompany make every possibly-missing field explicitly null rather than optional, and preserve the untyped provider payload on raw.',
			title: 'Normalized enrichment types'
		},
		{
			description:
				'EngagementActivity keeps the provider event name verbatim in kind while normalizing channel (call, email, linkedin, meeting, other) and direction as reliable axes.',
			title: 'Unified activity timeline'
		},
		{
			description:
				'searchPeople returns PersonSearchResult with revealsAttempted and searchRequests counts, so a metered caller bills the paid work that actually happened.',
			title: 'Metered people search'
		},
		{
			description:
				'Adapters throw RateLimitError on an explicit provider rate limit so consumers can defer and retry; every other failure resolves to null or an empty list.',
			title: 'Rate-limit signaling'
		}
	],
	installCommand: 'bun add @absolutejs/engagement',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/engagement',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/engagement-adapters',
			label: 'GitHub'
		}
	],
	name: 'Engagement',
	notes: [
		{
			body: 'Early 0.0.x release — the contract is settling as adapters beyond Apollo land. Consumers should check for an optional capability before calling it.',
			title: 'Alpha status',
			variant: 'warning'
		},
		{
			body: 'The point is not another enrichment vendor — it is that a rep’s real outreach activity lives in these platforms, and pulling it onto a unified deal timeline tells you which deals to keep driving and which to let cool.',
			title: 'Why it exists',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/engagement',
	samples: [
		{
			code: `import type { EngagementSource } from '@absolutejs/engagement';
import { apolloSource } from '@absolutejs/engagement-apollo';

const source: EngagementSource = apolloSource({
	apiKey: process.env.APOLLO_API_KEY ?? ''
});

const person = await source.enrichPerson?.({
	domain: 'acme.com',
	name: 'Jane Doe'
});

const activities = await source.listActivities?.({
	contactEmail: person?.emails[0],
	since: '2026-01-01T00:00:00Z'
});
// → normalized touchpoints: channel, direction, kind
//   ('email_sent', 'email_opened', 'email_replied', …)`,
			description:
				'Consume a provider through the contract: enrich a person, then pull their normalized outreach activity — capabilities are optional, so check before calling.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'One EngagementSource contract normalizing sales-engagement providers into enrichment plus outreach-activity data.',
	version: '0.0.6'
};
