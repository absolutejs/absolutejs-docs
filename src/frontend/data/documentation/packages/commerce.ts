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
		'Provider-agnostic commerce primitives (cart, orders, fulfillment, shipping) so every shop is not rebuilding checkout plumbing from scratch. The host package holds the agnostic logic and adapter contracts; provider implementations such as Stripe, EasyPost, and Resend live in the commerce-adapters monorepo. Apps program against contracts like ShippingProvider and PaymentProvider, then plug in whichever carrier or processor account they already use.',
	features: [
		{
			description:
				'Apps program against the carrier-agnostic ShippingProvider contract; an adapter like @absolutejs/commerce-easypost implements it, including buyCheapestLabel across rates.',
			title: 'Shipping contract'
		},
		{
			description:
				'A PaymentProvider contract with a Stripe adapter covers checkout, server-side re-pricing, and webhook fulfillment.',
			title: 'Payment contract'
		},
		{
			description:
				'Branded transactional email rides the same adapter pattern, with a Resend adapter shipped in the adapters monorepo.',
			title: 'Transactional email'
		},
		{
			description:
				'Cart and pricing primitives (variants, options, quantity breaks, setup fees) plus order lifecycle and a production-stage state machine, lifted from real AbsoluteJS shops.',
			title: 'Cart and orders'
		},
		{
			description:
				'Discount-code engine and B2B quote-to-deposit-to-fulfill flows are part of the same host-package surface.',
			title: 'Discounts and quotes'
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
			body: 'The shipping contract is the first stable slice; cart, order lifecycle, payments, discounts, and B2B quotes are being lifted from real AbsoluteJS shops against the same adapter pattern.',
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
		'Provider-agnostic cart, order, fulfillment, and shipping primitives with Stripe, EasyPost, and Resend adapters.',
	version: '0.22.0-beta.0'
};
