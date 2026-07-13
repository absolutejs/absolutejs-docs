import { PackageDocData } from '../../../../types/packageDocs';

export const onchainPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Real chains plug into createOnchain by implementing the adapter contract from @absolutejs/onchain/adapter-kit: WalletProvider, Attester, MintProvider and optionally RandomnessProvider. The core ships a local adapter for dev; these adapters run the same claim API against a live network.',
			heading: 'Chain Adapters',
			items: [
				{
					description:
						'Base (L2) adapter: gasless, soulbound, seed-is-asset minting with un-forgeable attestations. Its Attester only signs when the earned fact (e.g. github:commit:owner/repo@sha) is verified against GitHub, so the app operator cannot conjure a token.',
					name: '@absolutejs/onchain-base',
					version: '0.0.2'
				}
			]
		}
	],
	category: 'On-chain',
	description:
		'Optional on-chain provenance for AbsoluteJS apps: users earn gasless, soulbound (non-transferable) collectibles with real, literal editions. Items are deterministic functions of a seed, so the on-chain record is just the seed, and every mint requires an Attestation bound to an externally verifiable fact — no real fact, no token, even for the app operator. The core is provider-agnostic and ships a working local adapter with zero setup; real chains live in @absolutejs/onchain-adapters.',
	features: [
		{
			description:
				'Items are deterministic functions of a seed — tiny to store and re-derivable forever by anyone. The on-chain record is just the seed.',
			title: 'Seed-is-asset provenance'
		},
		{
			description:
				'Tokens are non-transferable by default, so ownership is earned rather than bought — no market, no speculation.',
			title: 'Soulbound by default'
		},
		{
			description:
				'edition() returns literal strings like "1 of 1" or "#3 of 50" — never a probability. maxSupply: 1 mints a genuine 1-of-1.',
			title: 'Real, literal editions'
		},
		{
			description:
				'claim() only mints against an Attestation tied to an externally verifiable fact, such as a real GitHub commit. There is intentionally no mint-without-earning path.',
			title: 'Un-forgeable attestations'
		},
		{
			description:
				'Embedded wallets and paymaster-sponsored transactions mean users never touch crypto to earn or hold their items.',
			title: 'Gasless and walletless'
		},
		{
			description:
				'The built-in localAdapter is a complete in-memory (optionally file-backed) implementation, so the whole flow runs with zero setup before you wire a real chain.',
			title: 'Zero-setup local adapter'
		}
	],
	installCommand: 'bun add @absolutejs/onchain',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/onchain',
			label: 'npm'
		}
	],
	name: 'Onchain',
	notes: [
		{
			body: 'Pre-0.1 alpha. The local adapter is for dev only: its Attester does not verify facts, so it is fakeable by design. Real integrity comes from a chain adapter (such as @absolutejs/onchain-base) whose Attester re-checks the fact before signing.',
			title: 'Alpha — local adapter is dev-only',
			variant: 'warning'
		},
		{
			body: 'Custom chains, wallets and randomness sources implement the @absolutejs/onchain/adapter-kit contract: WalletProvider, Attester (the integrity gate), MintProvider (uniqueness + serials) and optionally RandomnessProvider (VRF for true 1-of-1 rolls).',
			title: 'Provider-agnostic adapter kit',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/onchain',
	samples: [
		{
			code: `import { createOnchain, edition, localAdapter } from '@absolutejs/onchain';

const onchain = createOnchain(localAdapter({ file: '~/.myapp/ledger.json' }));

// the ONLY path to ownership:
// earn -> attest(verifiable fact) -> mint(soulbound, real serial)
const token = await onchain.claim('user-id', {
	archetype: 'wild-creature',
	fact: 'github:commit:acme/app@abc123', // the real interaction it's earned from
	maxSupply: 1, // a literal 1-of-1
	seed: 'wild:acme/app@abc123' // the deterministic asset
});

edition(token); // "1 of 1"
await onchain.inventory('user-id'); // what they've earned`,
			description:
				'Claim an earned, soulbound 1-of-1 with the built-in local adapter — no chain, wallet or config required.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { createOnchain, edition } from '@absolutejs/onchain';
import { baseAdapter } from '@absolutejs/onchain-base';

const onchain = createOnchain(
	baseAdapter({
		attesterPrivateKey: process.env.ATTESTER_KEY,
		contract: process.env.SOULBOUND_CONTRACT,
		githubToken: process.env.GITHUB_TOKEN,
		paymasterUrl: process.env.PAYMASTER_URL,
		rpcUrl: process.env.BASE_RPC_URL
	})
);

// same claim API — now gasless, soulbound mints on Base,
// and the fact is verified against GitHub before attesting
const token = await onchain.claim('user-id', {
	archetype: 'wild-creature',
	fact: 'github:commit:acme/app@abc123',
	maxSupply: 50,
	seed: 'wild:acme/app@abc123'
});

edition(token); // "#3 of 50"`,
			description:
				'Swap localAdapter for baseAdapter to mint for real on Base — the claim API is identical.',
			heading: 'Swap in a Real Chain',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Earned, gasless, soulbound collectibles with real editions — provenance that cannot be faked, even by the app operator.',
	version: '0.0.2'
};
