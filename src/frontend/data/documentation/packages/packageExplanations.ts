import type { PackageExplanation } from '../../../../types/packageDocs';

export const packageExplanationsByName: Record<string, PackageExplanation[]> = {
	'@absolutejs/admin': [
		{
			columns: ['Viewer', 'Operator', 'Administrator'],
			description:
				'Authorization belongs on the server. The UI may hide unavailable actions, but every mutation must enforce the same capability contract again.',
			id: 'role-capability-model',
			kind: 'matrix',
			rows: [
				{
					label: 'View operational state',
					values: ['Yes', 'Yes', 'Yes']
				},
				{
					label: 'Run bounded operations',
					values: ['No', 'Yes', 'Yes']
				},
				{ label: 'Change access policy', values: ['No', 'No', 'Yes'] }
			],
			title: 'Role and capability model'
		}
	],
	'@absolutejs/autoscaler': [
		{
			description:
				'Every evaluation turns provider-neutral signals into an explicit, bounded scaling decision.',
			id: 'scaling-decision-loop',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Read CPU, latency, queue depth, or a custom signal.',
					label: 'Observe'
				},
				{
					detail: 'Combine and normalize signals into the configured score.',
					label: 'Score'
				},
				{
					detail: 'Apply thresholds, minimums, maximums, and cooldowns.',
					label: 'Decide'
				},
				{
					detail: 'Call the replaceable infrastructure actuator.',
					label: 'Act'
				},
				{
					detail: 'Emit the decision and evidence for audit and tuning.',
					label: 'Measure'
				}
			],
			title: 'Scaling decision loop'
		}
	],
	'@absolutejs/blob': [
		{
			columns: ['Local', 'Generic S3', 'AWS SDK', 'UploadThing'],
			description:
				'Choose an adapter by deployment and upload requirements without changing the BlobStore contract used by application code.',
			id: 'adapter-capabilities',
			kind: 'matrix',
			rows: [
				{
					label: 'Streaming reads',
					values: ['Yes', 'Yes', 'Yes', 'Yes']
				},
				{
					label: 'Presigned transfer',
					values: ['No', 'Yes', 'Yes', 'Signed reads']
				},
				{
					label: 'Multipart upload',
					values: ['No', 'Manual', 'Built in', 'Provider managed']
				},
				{
					label: 'Best fit',
					values: [
						'Dev/single host',
						'S3-compatible clouds',
						'AWS production',
						'Managed uploads'
					]
				}
			],
			title: 'Adapter capability matrix'
		},
		{
			description:
				'Treat uploaded bytes as untrusted until bounded inspection succeeds.',
			id: 'upload-inspection-lifecycle',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Write to a quarantine key or isolated bucket.',
					label: 'Quarantine'
				},
				{
					detail: 'Enforce byte, duration, and decompression limits.',
					label: 'Bound'
				},
				{
					detail: 'Run provider-neutral inspectors such as ClamAV INSTREAM.',
					label: 'Inspect'
				},
				{
					detail: 'Promote clean content or retain rejection evidence.',
					label: 'Decide'
				}
			],
			title: 'Safe upload lifecycle'
		}
	],
	'@absolutejs/commerce': [
		{
			description:
				'Commerce coordinates durable boundaries instead of treating checkout as one provider call.',
			id: 'order-lifecycle',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Resolve supplier truth and tenant merchandising.',
					label: 'Catalog'
				},
				{
					detail: 'Resolve price, inventory, policy, and shipping on the server.',
					label: 'Cart'
				},
				{
					detail: 'Create an idempotent payment attempt.',
					label: 'Payment'
				},
				{
					detail: 'Verify and durably record provider callbacks.',
					label: 'Webhook'
				},
				{
					detail: 'Lease fulfillment and preserve provider evidence.',
					label: 'Fulfillment'
				},
				{
					detail: 'Handle returns, disputes, refunds, and aftercare.',
					label: 'Aftercare'
				}
			],
			title: 'Order lifecycle'
		},
		{
			columns: ['Allowed', 'Required evidence', 'Use'],
			description:
				'Exact-product media may come from a supplier or an authorized store source when it is verified and licensed for the exact SKU. Decorative or generated imagery must not silently replace product truth.',
			id: 'product-media-evidence',
			kind: 'matrix',
			rows: [
				{
					label: 'Supplier photograph',
					values: [
						'Yes',
						'Supplier + exact SKU',
						'Default product truth'
					]
				},
				{
					label: 'Store photograph',
					values: [
						'Yes',
						'Authorization + verification + license + exact SKU',
						'Store-owned product truth'
					]
				},
				{
					label: 'Generated/styled image',
					values: [
						'Conditional',
						'Clearly labeled; never exact-product evidence',
						'Merchandising only'
					]
				},
				{
					label: 'Mismatched variant',
					values: ['No', 'Cannot prove color/style/view', 'Reject']
				}
			],
			title: 'Product media evidence decision'
		}
	],
	'@absolutejs/execution': [
		{
			description:
				'Execution distinguishes known failure from unknown provider outcomes so retries cannot duplicate consequential effects.',
			id: 'effect-state-machine',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Bind the exact authorized effect and idempotency identity.',
					label: 'Intent'
				},
				{
					detail: 'Persist work before publishing it to a worker.',
					label: 'Outbox'
				},
				{ detail: 'Acquire a fenced execution lease.', label: 'Lease' },
				{
					detail: 'Perform the provider action and capture raw evidence.',
					label: 'Execute'
				},
				{
					detail: 'Quarantine timeouts or ambiguous responses.',
					label: 'Unknown'
				},
				{
					detail: 'Reconcile, settle, retry safely, or compensate.',
					label: 'Resolve'
				}
			],
			title: 'Effect state machine'
		}
	],
	'@absolutejs/mcp': [
		{
			description:
				'Protected tools bind authorization to the exact action and consume a short-lived execution lease before effects occur.',
			id: 'protected-tool-sequence',
			kind: 'flow',
			steps: [
				{
					detail: 'Validate the MCP request, caller, schema, and declared action.',
					label: 'Receive'
				},
				{
					detail: 'Ask Agency to approve the canonical action binding.',
					label: 'Authorize'
				},
				{
					detail: 'Issue and consume a single-use execution lease.',
					label: 'Fence'
				},
				{
					detail: 'Run the handler and persist its receipt.',
					label: 'Execute'
				},
				{
					detail: 'Return a result or a durable task reference.',
					label: 'Respond'
				}
			],
			title: 'Protected tool sequence'
		},
		{
			description:
				'MCP 2025-11-25 tasks let long-running tools survive transport and process boundaries.',
			id: 'durable-task-lifecycle',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Create a task with caller ownership, authorization binding, and TTL.',
					label: 'Create'
				},
				{
					detail: 'Persist task and session state in a durable store.',
					label: 'Persist'
				},
				{
					detail: 'Poll, list, or subscribe without losing ownership checks.',
					label: 'Observe'
				},
				{
					detail: 'Complete, fail, expire, or cancel with a terminal record.',
					label: 'Finish'
				}
			],
			title: 'Durable task lifecycle'
		}
	],
	'@absolutejs/outcomes': [
		{
			description:
				'Outcomes turn production results into evidence without allowing mutable features to rewrite history.',
			id: 'outcome-feedback-loop',
			kind: 'flow',
			steps: [
				{
					detail: 'Create an artifact and freeze its feature snapshot.',
					label: 'Artifact'
				},
				{
					detail: 'Record later business or user outcome signals.',
					label: 'Signal'
				},
				{
					detail: 'Join attribution using stable identities and windows.',
					label: 'Attribute'
				},
				{
					detail: 'Apply minimum-sample and privacy gates.',
					label: 'Gate'
				},
				{
					detail: 'Produce evidence for the next generation or decision.',
					label: 'Learn'
				}
			],
			title: 'Outcome feedback loop'
		}
	],
	'@absolutejs/pwa': [
		{
			description:
				'Feature checks are authoritative. Embedded-browser identity should only explain why an action is unavailable.',
			id: 'capability-first-ux',
			kind: 'flow',
			steps: [
				{
					detail: 'Read the current browser capability snapshot.',
					label: 'Detect'
				},
				{
					detail: 'Offer install, push, sharing, passkeys, or media only when supported.',
					label: 'Offer'
				},
				{
					detail: 'Use conservative host-app detection to explain unavailable actions.',
					label: 'Explain'
				},
				{
					detail: 'Provide an open-in-browser or alternate-channel fallback.',
					label: 'Recover'
				}
			],
			title: 'Capability-first browser UX'
		}
	],
	'@absolutejs/vulnerabilities': [
		{
			description:
				'The security result is an independently verifiable evidence chain, not merely a scanner report.',
			id: 'evidence-trust-chain',
			kind: 'lifecycle',
			steps: [
				{
					detail: 'Normalize findings with deterministic identities.',
					label: 'Findings'
				},
				{
					detail: 'Freeze intelligence and admission inputs.',
					label: 'Snapshot'
				},
				{
					detail: 'Sign the decision and remediation evidence.',
					label: 'Bundle'
				},
				{
					detail: 'Append the evidence to a transparency log.',
					label: 'Publish'
				},
				{
					detail: 'Collect independent witness receipts and verify quorum.',
					label: 'Witness'
				}
			],
			title: 'Evidence trust chain'
		}
	]
};
