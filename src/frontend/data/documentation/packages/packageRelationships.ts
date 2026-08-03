import type { PackageRelationship } from '../../../../types/packageDocs';

export const packageRelationshipsByName: Record<string, PackageRelationship[]> =
	{
		'@absolutejs/admin': [
			{
				detail: 'Admin consumes authenticated project and role context; it does not implement login or session persistence.',
				kind: 'requires',
				label: '@absolutejs/auth or equivalent host authentication',
				view: 'absolute-auth'
			},
			{
				detail: 'Navigation filtering is presentation only. Enforce every capability again before querying or mutating project data.',
				kind: 'doNotUseFor',
				label: 'Client-side authorization'
			},
			{
				detail: 'Follow the tenant request through policy, usage, health, and release gates.',
				kind: 'continuesAt',
				label: 'Ship a SaaS platform',
				view: 'playbook-saas-platform'
			}
		],
		'@absolutejs/agent': [
			{
				detail: 'Use one shared Agency owner for protected actions instead of constructing policy owners independently inside tools.',
				kind: 'requires',
				label: '@absolutejs/agency',
				view: 'agency'
			},
			{
				detail: 'Move consequential effects from inline execution to durable leases and reconciliation.',
				kind: 'productionReplacement',
				label: '@absolutejs/execution',
				view: 'execution'
			},
			{
				detail: 'Build the complete authorization, execution, and evidence path.',
				kind: 'continuesAt',
				label: 'Govern an AI agent',
				view: 'playbook-governed-agent'
			}
		],
		'@absolutejs/commerce': [
			{
				detail: 'Use Dispatch for transactional notifications while Commerce remains the owner of order truth.',
				kind: 'optionalWith',
				label: '@absolutejs/dispatch',
				view: 'dispatch'
			},
			{
				detail: 'Exercise the whole sourced-customer-to-reconciled-order path.',
				kind: 'continuesAt',
				label: 'Build commerce growth',
				view: 'playbook-commerce-growth'
			}
		],
		'@absolutejs/dispatch': [
			{
				detail: 'Keep channel consent and revocation outside provider adapters.',
				kind: 'optionalWith',
				label: '@absolutejs/compliance',
				view: 'compliance'
			},
			{
				detail: 'Replace inline callback effects with durable intake and retryable drains.',
				kind: 'productionReplacement',
				label: '@absolutejs/reliability',
				view: 'reliability'
			},
			{
				detail: 'Start locally, enforce consent, then add one provider and callback path.',
				kind: 'continuesAt',
				label: 'Deliver messages safely',
				view: 'playbook-messaging'
			}
		],
		'@absolutejs/sync': [
			{
				detail: 'Add a Postgres or Redis cluster bus when multiple processes own live subscribers.',
				kind: 'productionReplacement',
				label: 'Cluster bus adapters',
				view: 'cluster-bus-overview'
			},
			{
				detail: 'Run external post-commit effects as durable, idempotent jobs.',
				kind: 'optionalWith',
				label: '@absolutejs/queue',
				view: 'queue-overview'
			},
			{
				detail: 'Verify authoritative hydration and convergence end to end.',
				kind: 'continuesAt',
				label: 'Add realtime collaboration',
				view: 'playbook-realtime-collaboration'
			}
		],
		'@absolutejs/voice': [
			{
				detail: 'Install explicit STT/TTS or realtime provider adapters; the core package does not supply provider credentials or hosted inference.',
				kind: 'requires',
				label: 'Voice provider adapters',
				view: 'voice-adapters'
			},
			{
				detail: 'Exercise calls with deterministic, WebSocket, Discord, or phone scenarios.',
				kind: 'optionalWith',
				label: '@absolutejs/voice-tester',
				view: 'voice-tester'
			},
			{
				detail: 'Choose providers, complete a turn, then retain operational proof.',
				kind: 'continuesAt',
				label: 'Build a voice agent',
				view: 'playbook-voice-agent'
			}
		],
		'@absolutejs/vulnerabilities': [
			{
				detail: 'Bind the evaluated evidence to the exact artifact digest with a signed statement.',
				kind: 'optionalWith',
				label: '@absolutejs/attest',
				view: 'attest'
			},
			{
				detail: 'Require verified evidence during deployment promotion.',
				kind: 'continuesAt',
				label: 'Prove a safe release',
				view: 'playbook-release-assurance'
			}
		]
	};
