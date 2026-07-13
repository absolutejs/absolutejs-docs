import { PackageDocData } from '../../../../types/packageDocs';

export const compliancePackageData: PackageDocData = {
	category: 'Auth & Identity',
	description:
		'Framework-agnostic compliance substrate for the AbsoluteJS PaaS: declarative data classification, residency, and retention policies plus orchestrators for retention sweeps, Subject Access Requests, right-to-erasure, and auditor evidence bundles. None of the primitives hard-code a framework — SOC2, HIPAA, ISO 27001, and GDPR all map onto the same policy shape. It composes onto @absolutejs/audit for event logging, and per-tenant overrides let GDPR-strict tenants get their own residency and retention without forking the platform policy.',
	features: [
		{
			description:
				'createCompliancePolicy assigns each data classification a retention window, optional residency region, erasure exemption, and an open flags bag — with per-tenant overrides.',
			title: 'Declarative policies'
		},
		{
			description:
				'createResidencyGuard gives runtime, sync, queue, and blob layers a pure check before data moves; mismatches throw ResidencyViolation or return via a non-throwing inspect.',
			title: 'Residency guard'
		},
		{
			description:
				'runRetention streams expired records through per-classification scanners and batched deleters, isolating per-scanner failures and supporting dryRun counts.',
			title: 'Retention sweeps'
		},
		{
			description:
				'runSubjectAccess composes collectors across packages into one structured bundle; runErasure routes erasure-exempt classifications to anonymizers instead of deleters.',
			title: 'SAR and erasure pipelines'
		},
		{
			description:
				'collectEvidence bundles per-source JSON for a period into a single structure an external SOC2, ISO, or HIPAA auditor can read, with auditEvidenceSource covering the audit-events case.',
			title: 'Evidence bundles'
		},
		{
			description:
				'Retention sweeps and erasure runs log compliance events through an optional @absolutejs/audit broker, so the compliance actions are themselves evidenced.',
			title: 'Audit integration'
		}
	],
	installCommand: 'bun add @absolutejs/compliance',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/compliance',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/compliance',
			label: 'GitHub'
		}
	],
	name: 'Compliance',
	notes: [
		{
			body: 'This package provides the mechanical substrate — policies, guards, and orchestrators. Mapping your controls onto SOC2, HIPAA, ISO 27001, or GDPR requirements remains your responsibility.',
			title: 'Substrate, not certification',
			variant: 'info'
		},
		{
			body: '@absolutejs/compliance is 0.x — orchestrator option shapes and report structures may still change between minor versions.',
			title: 'Beta surface',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/compliance',
	samples: [
		{
			code: `import {
	createCompliancePolicy,
	createResidencyGuard
} from '@absolutejs/compliance';

const DAY = 86_400_000;

const policy = createCompliancePolicy({
	classifications: {
		'audit-log': {
			erasureExempt: true, // regulators often require 7+ years
			flags: { immutable: true },
			id: 'audit-log',
			retentionMs: Infinity
		},
		operational: { id: 'operational', retentionMs: 90 * DAY },
		pii: { id: 'pii', residency: 'eu', retentionMs: 730 * DAY }
	},
	tenantOverrides: {
		'gdpr-strict-tenant': { pii: { retentionMs: 90 * DAY } }
	}
});

const guard = createResidencyGuard(policy);

// throws ResidencyViolation if policy says 'eu'
guard.check({ classification: 'pii', region: 'us-east' });

// non-throwing variant
const violation = guard.inspect({
	classification: 'pii',
	region: 'eu',
	tenant: 'acme'
});
if (violation !== null) {
	return new Response(violation.message, { status: 451 });
}`,
			description:
				'Declare classifications once, then let the residency guard gate data movement everywhere. Per-tenant overrides win over class defaults, so strict tenants ride the same policy object.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { runRetention } from '@absolutejs/compliance';

const report = await runRetention({
	audit: broker,
	deleters: {
		'audit-log': (rows) => auditTable.delete(rows.map((r) => r.id)),
		pii: (rows) => userTable.delete(rows.map((r) => r.id))
	},
	policy,
	scanners: [
		{ classification: 'audit-log', scan: auditTable.scan },
		{ classification: 'pii', scan: userTable.scan }
	]
});
// report.byClassification.pii = { scanned, deleted, durationMs }`,
			description:
				'Each scanner streams expired records for its classification and each deleter removes them in batches. Failures are isolated per scanner, and dryRun: true counts without deleting.',
			heading: 'Retention Sweeps',
			language: 'typescript'
		},
		{
			code: `import {
	runErasure,
	runSubjectAccess
} from '@absolutejs/compliance';

const bundle = await runSubjectAccess({
	collectors: [
		{
			classification: 'pii',
			collect: userTable.findBySubject,
			name: 'profile'
		},
		{
			classification: 'audit-log',
			collect: auditTable.findBySubject,
			name: 'audit'
		}
	],
	subject: { subjectId: 'u-1', tenant: 'acme' }
});

await runErasure({
	audit: broker,
	erasers: [
		{
			classification: 'pii',
			erase: userTable.deleteBySubject,
			name: 'profile'
		},
		{
			anonymize: auditTable.anonymizeSubject,
			classification: 'audit-log',
			name: 'audit'
		}
	],
	policy,
	subject: { subjectId: 'u-1', tenant: 'acme' }
});`,
			description:
				'Each package contributes a collector and eraser pair. runErasure automatically routes erasure-exempt classifications to their anonymizer — audit-log subject references get anonymized rather than deleting the log itself.',
			heading: 'SAR and Erasure',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Declarative classification, residency, and retention policies with orchestrators for sweeps, SARs, erasure, and auditor evidence.',
	version: '0.1.0'
};
