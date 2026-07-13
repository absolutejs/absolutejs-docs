import { PackageDocData } from '../../../../types/packageDocs';

export const enrichPackageData: PackageDocData = {
	category: 'Commerce & Growth',
	description:
		'In-house B2B email verification and discovery — the engine commercial enrichment APIs (PDL, Apollo, Hunter, Clearbit) charge per lookup. You bring a name and a company domain; findEmail generates the corporate patterns and verifyEmail runs the full local pipeline from syntax and MX checks to an opt-in SMTP probe. A browser-safe /profile subpath adds keyless public-profile enrichment: avatars, company logos, and social-handle extraction with no per-lookup API.',
	features: [
		{
			description:
				'findEmail generates corporate patterns (first.last, flast, …), applies a knownPattern directly when you have one, and confirms candidates best-first through an optional verifier.',
			title: 'Email discovery'
		},
		{
			description:
				'verifyEmail runs syntax, disposable/free/role, and MX checks, plus an opt-in catch-all and SMTP probe, returning a 0-100 confidence and status.',
			title: 'Local verification pipeline'
		},
		{
			description:
				'The confirm step is an EmailVerifier interface — bring a thin wrapper over ZeroBounce, NeverBounce, Hunter, or your ESP so specialists carry the SMTP-probing blacklist risk.',
			title: 'Pluggable verifier'
		},
		{
			description:
				'Every result carries a template (for example "first.last") — store it per domain and pass it back as knownPattern to skip probing for everyone else there.',
			title: 'Learnable pattern templates'
		},
		{
			description:
				'personAvatarCandidates, personAvatarUrl, and companyLogoUrl derive avatars and logos from identifiers you already have, keylessly, from a browser-safe subpath.',
			title: 'Keyless profile enrichment'
		},
		{
			description:
				'socialUrlsFromLinks and socialHandle sort loose link lists into canonical per-platform URL fields and extract clean handles.',
			title: 'Social link normalization'
		}
	],
	installCommand: 'bun add @absolutejs/enrich',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/enrich',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/enrich',
			label: 'GitHub'
		}
	],
	name: 'Enrich',
	notes: [
		{
			body: 'The built-in smtpVerifier is deliberately not the default: it needs outbound port 25 (blocked by AWS/GCP/DigitalOcean), risks blacklisting your IP, and the biggest mail hosts return ambiguous answers to defeat harvesters. Only use it from a host whose reputation you are willing to spend.',
			title: 'SMTP probing is opt-in',
			variant: 'warning'
		},
		{
			body: 'The intended loop: findEmail discovers the pattern for free, a specialist verifier confirms it, and you store the confirmed template per domain — that learned dataset is the moat the paid providers actually have.',
			title: 'Discover, confirm, learn',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/enrich',
	samples: [
		{
			code: `import { findEmail } from '@absolutejs/enrich';

// Discovery-only — no SMTP, no third-party call:
await findEmail({ domain: 'acme.com', fullName: 'Jane Doe' });
// → { email: 'jane.doe@acme.com', status: 'unknown',
//     confidence: 45, template: 'first.last' }

// With a verifier you bring (ZeroBounce / Hunter / your ESP):
await findEmail(
	{ domain: 'acme.com', fullName: 'Jane Doe' },
	{ verifier }
);
// → { email: 'jane.doe@acme.com', status: 'deliverable',
//     confidence: 95, template: 'first.last' }`,
			description:
				'Pattern generation is free and carries zero abuse signature; the pluggable verifier upgrades a candidate to SMTP-confirmed confidence.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	companyLogoUrl,
	personAvatarUrl
} from '@absolutejs/enrich/profile';

const avatar = personAvatarUrl({
	email: 'jane.doe@acme.com',
	githubUrl: 'https://github.com/janedoe'
});
// First (most trusted) derivable avatar URL, or null.

const logo = companyLogoUrl('https://acme.com', 128);
// Company logo via Google's keyless favicon service.`,
			description:
				'The /profile subpath has no node: imports, so the same module runs in your backend and your frontend bundle.',
			heading: 'Keyless profile enrichment',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Email verification, decision-maker email finding, and keyless profile enrichment without per-lookup API fees.',
	version: '0.1.1'
};
