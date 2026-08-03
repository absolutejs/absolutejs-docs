import type { PackageCodeSample } from '../../../../types/packageDocs';

export const firstSuccessSamplesByPackage: Record<string, PackageCodeSample> = {
	'@absolutejs/admin': {
		code: `import {
  authorizeSiteAdmin as authorizeAdmin,
  capabilitiesForRole,
  navigationForCapabilities
} from '@absolutejs/admin';

const capabilities = capabilitiesForRole('developer');
authorizeAdmin('developer', 'site.deploy');

console.log(navigationForCapabilities(capabilities));`,
		description:
			'Run the framework-neutral policy locally. The exported authorizeSiteAdmin identifier is aliased to the current Admin terminology until the compatibility API can be retired.',
		expectedResult:
			'The developer role passes the deployment capability check and produces capability-filtered navigation. Changing the role to viewer makes the authorization call fail.',
		heading: 'Runnable Admin policy check',
		intent: 'runnable',
		language: 'typescript',
		prerequisites: ['bun add @absolutejs/admin']
	},
	'@absolutejs/agent': {
		code: `import {
  allowAllPolicy,
  createAgency,
  createMemoryAgencyStore
} from '@absolutejs/agent/actions';

const agency = createAgency({
  policy: allowAllPolicy(),
  store: createMemoryAgencyStore()
});

const { action, decision } = await agency.request({
  action: 'write_fixture',
  actor: { agentId: 'local-agent', scopes: ['fixture:write'], userId: 'user-1' },
  effects: ['write'],
  input: { value: 42 },
  resource: { id: 'fixture-1', type: 'fixture' }
});

if (decision.kind !== 'allow') throw new Error('expected local allow');
const lease = await agency.issueLease(action.actionId);
const executed = await agency.execute({
  executor: 'local-fixture',
  leaseId: lease.leaseId,
  run: async () => ({ stored: true, value: 42 })
});

console.log(executed.receipt.status);`,
		description:
			'Exercise one exact action through the facade-owned Agency subpath with memory storage and no credentials. allowAllPolicy is appropriate only for this local proof.',
		expectedResult:
			'The script prints the successful receipt status. Reusing the single-use lease fails instead of repeating the effect.',
		heading: 'Runnable governed action',
		intent: 'runnable',
		language: 'typescript',
		prerequisites: ['bun add @absolutejs/agent']
	},
	'@absolutejs/vulnerabilities': {
		code: `import {
  createVulnerabilityEvidence,
  summarizeGrypeReport
} from '@absolutejs/vulnerabilities';

const report = {
  matches: [{
    artifact: { name: 'openssl', type: 'deb', version: '3.0.0' },
    vulnerability: {
      id: 'CVE-LOCAL-1',
      namespace: 'fixture',
      severity: 'High'
    }
  }]
};

const counts = summarizeGrypeReport(report);
const evidence = createVulnerabilityEvidence({
  asset: { id: 'sha256:local-fixture', kind: 'container' },
  scan: {
    ...counts,
    databaseBuiltAt: null,
    scannedAt: new Date().toISOString(),
    scanner: 'fixture'
  }
});

console.log(evidence.result.status, evidence.result.violations);`,
		description:
			'Run the policy engine against a deterministic Grype-shaped fixture before connecting a real scanner or signing release evidence.',
		expectedResult:
			'The default policy prints failed with one high-severity violation. Removing the fixture match prints passed.',
		heading: 'Runnable policy proof',
		intent: 'runnable',
		language: 'typescript',
		prerequisites: ['bun add @absolutejs/vulnerabilities']
	}
};
