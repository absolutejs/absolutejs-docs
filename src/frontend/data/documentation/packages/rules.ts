import { PackageDocData } from '../../../../types/packageDocs';

export const rulesPackageData: PackageDocData = {
	category: 'AI',
	description:
		'Typed standing automations ("if X do Y") for AI-agent products, designed so the agent itself can safely author rules on a member’s behalf. You define your triggers and actions once as a closed vocabulary with typed, bounded parameters, and everything derives from that single definition: the validator, the LLM tool schemas, and a capped, cooldown-guarded firing engine. A stored rule can never carry behavior your engine does not implement.',
	features: [
		{
			description:
				'defineRuleVocabulary declares triggers and actions with typed, bounded parameters once; validator, tool schemas, and engine all derive from it.',
			title: 'Closed rule vocabulary'
		},
		{
			description:
				'validateRuleInput rejects unknown triggers and actions with the available options spelled out (an error the LLM can relay verbatim), strips unknown params, clamps numbers to bounds, and narrows closed-set strings.',
			title: 'Hallucination-proof validation'
		},
		{
			description:
				'ruleToolSchemas emits create/update tool inputs whose trigger and action fields are enums of your vocabulary, so the agent cannot invent behavior.',
			title: 'Derived LLM tool schemas'
		},
		{
			description:
				'createRuleEngine fires occurrences with per-entity cooldowns via a firing ledger, daily firing and auto-execution caps, a kill switch, and your authoring policy re-checked at fire time.',
			title: 'Guarded firing engine'
		},
		{
			description:
				'Storage plugs in through the small RuleStore interface; createMemoryRuleStore ships for tests, and a Drizzle or Postgres store is a few lines against your own tables.',
			title: 'Pluggable rule storage'
		}
	],
	installCommand: 'bun add @absolutejs/rules',
	links: [
		{
			href: 'https://github.com/absolutejs/rules',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/rules',
			label: 'npm'
		}
	],
	name: 'Rules',
	notes: [
		{
			body: 'This is a 0.0.x release extracted for the AbsoluteJS AI Studio; the vocabulary and engine APIs may change before 0.1. Pin an exact version.',
			title: 'Alpha API',
			variant: 'warning'
		},
		{
			body: 'The only free text a rule carries is guidance, a bounded style note applied to generated copy. It never selects behavior.',
			title: 'Bounded free text',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/rules',
	samples: [
		{
			code: `import {
	createRuleEngine,
	defineRuleVocabulary,
	ruleToolSchemas,
	validateRuleInput
} from '@absolutejs/rules';

const vocabulary = defineRuleVocabulary({
	triggers: {
		no_reply: {
			label: 'My outreach gets no reply',
			paramsHelp: 'days (default 4)',
			params: {
				days: { type: 'number', min: 1, max: 30, defaultValue: 4 }
			}
		}
	},
	actions: {
		draft_followup: {
			label: 'Draft a follow-up for my approval',
			paramsHelp: 'none (guidance styles the copy)',
			capability: 'outbound'
		}
	}
});

// 1. Validate anything that wants to become a rule (AI tool, REST, forms):
const result = validateRuleInput(
	vocabulary,
	{
		trigger: 'no_reply',
		action: 'draft_followup',
		triggerParams: { days: 45 }
	},
	{
		canUseAction: () => true,
		canAutoSend: () => 'Auto-send needs the trusted tier.'
	}
);
// result.ok.triggerParams.days === 30 (clamped)

// 2. Give your agent the tools (schemas only; you own the handlers):
const { createInput, updateInput, help } = ruleToolSchemas(vocabulary);

// 3. Fire occurrences from your signal hooks / sweeps:
const engine = createRuleEngine({
	vocabulary,
	store, // your RuleStore (drizzle, memory, ...)
	executeAction: async (rule, event, { autoSend }) =>
		autoSend ? 'executed' : 'drafted'
});

await engine.fire(
	ownerId,
	{
		trigger: 'no_reply',
		entityId: \`noreply:\${matchId}\`,
		context: 'no reply from Brendan in 5 days',
		signal: { days: 5 }
	},
	{
		killSwitch: false,
		cooldownDays: 3,
		maxFiringsPerDay: 10,
		maxAutoPerDay: 3,
		canUseAction: () => true,
		canAutoSend: () => true
	}
);`,
			description:
				'Define the vocabulary once; validation, agent tool schemas, and the guarded firing engine all derive from it.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Closed, typed trigger/action vocabulary for standing automations that an AI agent can author without hallucinating behavior.',
	version: '0.0.1'
};
