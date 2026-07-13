import { PackageDocData } from '../../../../types/packageDocs';

export const opsCliPackageData: PackageDocData = {
	category: 'Platform & Infra',
	description:
		'The absolutejs binary is the operations CLI for running Bun apps on servers you manage — distinct from the framework CLI (the absolute binary from @absolutejs/absolute, which handles dev, start, and compile). It puts command-line verbs over @absolutejs/secrets, @absolutejs/deploy, and @absolutejs/audit: list and rotate secrets, push and diff environment files on remote stages, inspect release history, and roll back. One absolutejs.config.ts in your project root wires the secret broker and deployment targets, and remote-touching config is lazy, so local verbs never provision infrastructure by accident.',
	features: [
		{
			description:
				'list, get, set, and rotate against whatever secrets adapter you configure. Output shows fingerprints by default — plaintext only appears with an explicit --show.',
			title: 'Secrets management verbs'
		},
		{
			description:
				'env push resolves secrets plus extras for a stage, atomically writes the remote env file, and runs your reload command. env diff shows exactly what a push would add, change, or remove before you run it.',
			title: 'Environment push and diff'
		},
		{
			description:
				'deploy releases, deploy status, and deploy rollback --to give per-stage release history and one-command rollback to any previous release.',
			title: 'Release history and rollback'
		},
		{
			description:
				'Deployment target and deployer fields in the config are factories, invoked only by verbs that touch a remote — running secrets list will never spin up a cloud server.',
			title: 'Lazy remote config'
		},
		{
			description:
				'A global --json flag switches every verb to machine-readable output for scripting and CI pipelines.',
			title: 'Machine-readable output'
		}
	],
	installCommand: 'bun add -d @absolutejs/cli',
	links: [
		{
			href: 'https://github.com/absolutejs/cli',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/cli',
			label: 'npm'
		}
	],
	name: 'Ops CLI',
	notes: [
		{
			body: "Two CLIs, two jobs: absolute (from @absolutejs/absolute) is the framework CLI for dev, build, and codegen; absolutejs (this package) is the ops CLI for secrets, env, and deploy. They're complementary and usually installed side by side.",
			title: 'Not the framework CLI',
			variant: 'info'
		},
		{
			body: 'The package is pre-1.0. Verb names and config shape are settling, but expect minor adjustments before a stable release.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/cli',
	samples: [
		{
			code: `\
absolutejs secrets list              # secret names + fingerprints
absolutejs secrets rotate STRIPE_KEY # generate + persist a new value
absolutejs env diff prod             # preview what env push would change
absolutejs env push prod             # push resolved env file to a stage
absolutejs deploy rollback prod      # roll back to the previous release`,
			description:
				'The core verbs. Run via bunx absolutejs, npx absolutejs, or alias the node_modules/.bin binary in your shell.',
			heading: 'Everyday Commands',
			language: 'bash'
		},
		{
			code: `\
import { defineConfig } from '@absolutejs/cli';
import {
  createSecretBroker,
  encryptedFileAdapter,
} from '@absolutejs/secrets';
import { hetznerTarget } from '@absolutejs/deploy/hetzner';
import { createDeployer } from '@absolutejs/deploy';

const adapter = encryptedFileAdapter({
  path: './.secrets.enc.json',
  key: {
    type: 'passphrase',
    passphrase: process.env.SECRETS_MASTER!,
  },
});

const broker = createSecretBroker({ adapter });

const prodTarget = () =>
  hetznerTarget({
    token: process.env.HETZNER_TOKEN!,
    name: 'api-prod-1',
    region: 'nbg1',
    serverType: 'cx22',
    image: 'ubuntu-22.04',
    sshKeys: [process.env.HETZNER_KEY_FINGERPRINT!],
  });

export default defineConfig({
  secrets: broker,
  secretAdapter: adapter,
  deployments: [
    {
      name: 'prod',
      target: prodTarget,
      remotePath: '/etc/api.env',
      secretNames: ['DATABASE_URL', 'STRIPE_KEY'],
      extras: { NODE_ENV: 'production' },
      reload: 'systemctl reload api',
      deployer: async () =>
        createDeployer({
          appName: 'api',
          target: await prodTarget(),
        }),
    },
  ],
});`,
			description:
				'Drop absolutejs.config.ts in your project root — the CLI walks up from the cwd to find it. target and deployer are lazy factories, so local-only verbs never touch the remote.',
			heading: 'Config — absolutejs.config.ts',
			language: 'typescript'
		},
		{
			code: `\
# Rotate STRIPE_KEY in the broker — in-process onRotate
# listeners swap credentials in place.
absolutejs secrets rotate STRIPE_KEY

# Propagate to every stage that uses it: atomic remote
# env-file write, then the configured reload command.
absolutejs env push prod
absolutejs env push staging`,
			description:
				'Rotation and propagation compose: rotate updates the broker and notifies live listeners, then env push carries the new value to each remote box.',
			heading: 'Rotate and Propagate',
			language: 'bash'
		}
	],
	status: 'beta',
	tagline:
		'Config-driven ops CLI for Bun apps on your own servers — secrets rotation, environment pushes, and deploy rollbacks in one binary.',
	version: '0.1.0'
};
