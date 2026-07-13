import { PackageDocData } from '../../../../types/packageDocs';

export const billingPackageData: PackageDocData = {
	category: 'Platform & Infra',
	description:
		'Turns metered usage into invoices without float drift or vendor lock-in. createPlan declares a priced product — flat base fee, per-dimension unit prices, graduated tiers, free allowances — and computeInvoice is a pure function from a usage snapshot to line items and a total, all in integer micros. It pairs with @absolutejs/metering for usage collection and keeps the Stripe or QuickBooks push in separate adapters, so previewing an upcoming invoice, re-pricing a past period, or dry-running a plan change is a plain function call.',
	features: [
		{
			description:
				'All prices are integer micros (1/1,000,000 of a currency unit — the same denomination Stripe stores internally), so float drift is structurally impossible and rounding policy is explicit.',
			title: 'Integer-micro money math'
		},
		{
			description:
				'Each dimension is flat per-unit, graduated tiers, or a custom price function — the escape hatch for surge pricing, caps, and other non-monotonic schemes.',
			title: 'Flexible pricing shapes'
		},
		{
			description:
				'Per-dimension free allowances subtract before pricing, a plan-level base fee charges per period, and minimumChargeMicros floors the total with an adjustment line item.',
			title: 'Free tiers and minimums'
		},
		{
			description:
				'computeInvoice has no IO and no side effects, so you can preview invoices before the period closes, re-price history under a proposed plan, and dry-run changes before publishing.',
			title: 'Pure invoice computation'
		},
		{
			description:
				'Consumes Usage snapshots from @absolutejs/metering directly, and unit divisors let you price bytesEgress per MB or cpuMs per second without pre-converting.',
			title: 'Metering integration'
		}
	],
	installCommand: 'bun add @absolutejs/billing',
	links: [
		{
			href: 'https://github.com/absolutejs/billing',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/billing',
			label: 'npm'
		}
	],
	name: 'Billing',
	notes: [
		{
			body: 'This package is the cost model only. Pushing the computed invoice to Stripe, QuickBooks, or a PDF generator happens in @absolutejs/billing-adapters/* — keeping the pricing math pure and testable.',
			title: 'Sinks live in adapters',
			variant: 'info'
		},
		{
			body: 'The package is pre-1.0. The plan and invoice shapes are settling, but expect minor API adjustments before a stable release.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/billing',
	samples: [
		{
			code: `\
import {
  createPlan,
  computeInvoice,
  formatMicros,
} from '@absolutejs/billing';

const plan = createPlan({
  name: 'pro',
  currency: 'usd',
  basePriceMicros: 20_000_000, // $20/mo
  pricedDimensions: {
    requests: { perUnitMicros: 200, freeTier: 1_000_000 },
    cpuMs: {
      perUnitMicros: 50,
      unit: 1000,
      freeTier: 60_000 * 60 * 10,
    },
    bytesEgress: {
      perUnitMicros: 100,
      unit: 1024 * 1024,
      freeTier: 100 * 1024 * 1024,
    },
  },
});

const invoice = computeInvoice({
  plan,
  tenant: 'acme',
  period: { start, end },
  usage, // a Usage from @absolutejs/metering
});

console.log(formatMicros(invoice.totalMicros, invoice.currency));
// "27.50 USD"`,
			description:
				'Declare a plan with a base fee, per-dimension prices, and free allowances, then compute an invoice from a metering snapshot.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `\
const plan = createPlan({
  name: 'scale',
  currency: 'usd',
  pricedDimensions: {
    requests: {
      tiers: [
        { upTo: 1_000_000, perUnitMicros: 200 },
        { upTo: Infinity, perUnitMicros: 100 },
      ],
    },
  },
});`,
			description:
				'Graduated tiers price each band separately — the first million requests at one rate, everything beyond at another.',
			heading: 'Tiered Pricing',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Pure-function usage billing for Bun apps — declare a priced plan, compute invoices in integer micros, push to Stripe via adapters.',
	version: '0.2.1'
};
