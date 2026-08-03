export type PackageDocumentationContract = {
	directory: string;
	requiredEvidence: string[];
	requiredSampleEvidence: string[];
};

export const flagshipDocumentationContract: PackageDocumentationContract[] = [
	{
		directory: 'absolutejs',
		requiredEvidence: ['Quick Start', 'Immutable production images'],
		requiredSampleEvidence: ['Quick Start']
	},
	{
		directory: 'auth',
		requiredEvidence: ['Expired browser sessions', 'Delegated AI agents'],
		requiredSampleEvidence: ['Expired browser sessions']
	},
	{
		directory: 'ai',
		requiredEvidence: ['Conversation turn queues', 'streamAIToSSE'],
		requiredSampleEvidence: ['Conversation turn queues']
	},
	{
		directory: 'sync',
		requiredEvidence: ['Reactive push', 'Live collections'],
		requiredSampleEvidence: ['Reactive push']
	},
	{
		directory: 'voice',
		requiredEvidence: [
			'browser and phone voice agents',
			'Production Checklist'
		],
		requiredSampleEvidence: ['Production Readiness', 'Call Debugger']
	},
	{
		directory: 'rag',
		requiredEvidence: ['Quick start', 'Quality and evaluation'],
		requiredSampleEvidence: ['Quick start']
	},
	{
		directory: 'queue',
		requiredEvidence: ['Usage', 'How it works'],
		requiredSampleEvidence: ['Usage']
	},
	{
		directory: 'deploy',
		requiredEvidence: ['Global edge ingress', 'Verify'],
		requiredSampleEvidence: ['Verify']
	},
	{
		directory: 'billing',
		requiredEvidence: ['Pricing shapes', 'Why pure'],
		requiredSampleEvidence: ['computeInvoice']
	},
	{
		directory: 'commerce',
		requiredEvidence: ['Multi-store product catalogs', 'shipping contract'],
		requiredSampleEvidence: ['Multi-store product catalogs']
	},
	{
		directory: 'mcp',
		requiredEvidence: ['Durable Tasks', 'OAuth-native MCP client'],
		requiredSampleEvidence: ['Define an endpoint']
	},
	{
		directory: 'observability',
		requiredEvidence: ['Quick start', 'Server configuration'],
		requiredSampleEvidence: ['Quick start']
	},
	{
		directory: 'agency',
		requiredEvidence: [
			'Agentic control plane',
			'PostgreSQL production state'
		],
		requiredSampleEvidence: ['PostgreSQL production state']
	},
	{
		directory: 'agent',
		requiredEvidence: ['Stable subpaths', 'authenticated delegation'],
		requiredSampleEvidence: ['assertProductionReady']
	},
	{
		directory: 'a2a',
		requiredEvidence: ['Security boundaries', 'Task isolation'],
		requiredSampleEvidence: ['Security boundaries']
	}
];
