import { PackageDocData } from '../../../../types/packageDocs';

export const commercePackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Provider implementations live in the commerce-adapters monorepo (Apache-2.0) and implement the contracts exported by the host package.',
			heading: 'Commerce Adapters',
			items: [
				{
					description:
						'CustomCat print-on-demand fulfillment adapter for @absolutejs/commerce',
					name: '@absolutejs/commerce-customcat',
					version: '0.6.20-beta.2'
				},
				{
					description:
						'EasyPost shipping adapter for @absolutejs/commerce',
					name: '@absolutejs/commerce-easypost',
					version: '0.16.0-beta.0'
				},
				{
					description:
						'Resend transactional-email adapter for @absolutejs/commerce',
					name: '@absolutejs/commerce-resend',
					version: '0.16.0-beta.0'
				},
				{
					description:
						'Stripe payment + checkout adapter for @absolutejs/commerce',
					name: '@absolutejs/commerce-stripe',
					version: '0.16.0-beta.0'
				}
			]
		}
	],
	category: 'Commerce & Growth',
	description:
		'Provider-agnostic commerce primitives for multi-store catalogs, storefront merchandising, trusted server-side cart resolution, payments, fulfillment, order aftercare, decoration previews, and production packets. The host package owns the domain logic and adapter contracts; CustomCat, EasyPost, Resend, and Stripe integrations live in the commerce-adapters monorepo.',
	features: [
		{
			description:
				'Canonical supplier products and variants stay separate from tenant-specific listings, collections, pricing, artwork, customization rules, and publication state.',
			title: 'Multi-store catalogs'
		},
		{
			description:
				'The server resolves browser cart identities against ready storefront projections, rechecks policy and availability, and calculates canonical pricing before checkout.',
			title: 'Trusted checkout boundary'
		},
		{
			description:
				'Tenant-fenced provider installations, idempotent checkout intents, signed and deduplicated webhooks, durable receipts, refunds, and quarantine-safe retries.',
			title: 'Payments and evidence'
		},
		{
			description:
				'Leased fulfillment jobs, provider reconciliation, guest-safe order access, lifecycle notifications, cancellation coordination, and return or dispute cases.',
			title: 'Fulfillment and aftercare'
		},
		{
			description:
				'Product-photo and optional 3D decoration previews share placement geometry with production specifications and printable work orders.',
			title: 'Decoration and production'
		}
	],
	installCommand: 'bun add @absolutejs/commerce',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/commerce',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/commerce',
			label: 'GitHub'
		}
	],
	name: 'Commerce',
	notes: [
		{
			body: 'Commerce is still beta. Its catalog, checkout, payments, fulfillment, order, aftercare, evidence, and decoration surfaces are shipping together and may continue to evolve before a stable release.',
			title: 'Beta surface',
			variant: 'warning'
		},
		{
			body: 'Follows the same shape as @absolutejs/voice: a BSL-1.1 host package holds the agnostic logic and adapter contracts, while Apache-2.0 provider adapters live in the commerce-adapters monorepo.',
			title: 'Host + adapters pattern',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/commerce',
	samples: [
		{
			code: `import type { ShippingProvider } from '@absolutejs/commerce';
import { createEasyPostProvider } from '@absolutejs/commerce-easypost';

const shipping: ShippingProvider = createEasyPostProvider({
	apiKey: process.env.EASYPOST_API_KEY ?? ''
});

const label = await shipping.buyCheapestLabel({ from, to, parcel });
// → { trackingNumber, labelUrl, carrier, service, amount, … }`,
			description:
				'Program against the ShippingProvider contract and plug in a carrier adapter — the shop code never knows which carrier account is behind it.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Provider-agnostic catalogs, checkout, payments, fulfillment, and aftercare with CustomCat, EasyPost, Resend, and Stripe adapters.',
	version: '0.22.0-beta.0'
};
