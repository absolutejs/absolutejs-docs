import type { PackageDocData } from '../../../../types/packageDocs';

export const researchGuideData: PackageDocData = {
	category: 'AI',
	description:
		'Configure a search provider, model, tasks and evidence policy once. AbsoluteJS runs bounded follow-up searches, primary-page reading, schema-shaped extraction and separate field review. The same authorized Elysia plugin serves React, Vue, Svelte, Angular, HTML and HTMX, while server functions handle company discovery, resumable batches and event monitoring.',
	features: [
		{
			description:
				'createResearch owns provider configuration, registered task schemas, context and operation limits. researchPlugin exposes JSON, streaming progress and HTML. Browser callers select a query and registered task; models, credentials and policy stay on the server.',
			title: 'Configure once, call functions'
		},
		{
			description:
				'Inspect status, fields, sources, operations and limitations. data is non-null only when every primitive field passes review. Each field retains a JSON-pointer path, value, verdict, reasons and quotations tied to source passages. Supported, unsupported, conflicting and unknown remain distinct.',
			title: 'Field evidence review'
		},
		{
			description:
				'The default reader uses protected public web transport. createWebpageReaderClient connects a host-managed isolated browser service, checks single-page attribution and preserves static-fallback limitations. A browser process is configured and operated by the host.',
			title: 'Primary-page reading'
		},
		{
			description:
				'Authorization runs before selecting a request-specific runtime. Scope caches, workflow storage and budget ledgers to that identity. Operation limits bound each research call. Optional billing admission reserves search/read/plan/extract/review costs; unknown costs retain their reservation.',
			title: 'Tenant and spending policy'
		},
		{
			description:
				'PostgreSQL stores completed batch items, monitor baselines and pending deliveries with fenced leases. Queue jobs or an existing scheduler invoke these functions. The host controls cadence, recipients, retention and delivery policy.',
			title: 'Durable workflows'
		},
		{
			description:
				'Citation checks establish where quoted text came from; model review remains fallible. evaluateResearch supports representative cases, independent human review and total measured cost. Keep task, models, prompts and budget policy constant when comparing search providers.',
			title: 'Evaluate the whole result'
		}
	],
	installCommand:
		'bun add @absolutejs/rag@0.22.1 @absolutejs/search@0.2.0 @absolutejs/ai@0.2.7 elysia@2.0.0-beta.6',
	links: [
		{
			href: '/documentation/search',
			label: 'Search provider guide'
		},
		{
			href: '/documentation/rag-web-index',
			label: 'Owned web indexes'
		},
		{
			href: '/documentation/discover',
			label: 'Contact discovery'
		},
		{
			href: 'https://github.com/absolutejs/rag/blob/v0.22.1/RESEARCH.md',
			label: 'Research source guide'
		}
	],
	name: 'Web Research',
	notes: [
		{
			body: 'A repeated batch/item ID reuses its recorded outcome; changed input or task version fails. Use new IDs for intentional reruns. The first successful monitor run establishes a silent baseline, including a successful empty result. Incomplete runs preserve the old baseline. Delivery is at-least-once. The event selector deduplicates normalized entity/type/summary/date, not semantic paraphrases.',
			title: 'Batch and monitor semantics',
			variant: 'info'
		},
		{
			body: 'An outage is not a successful empty result. A quotation is not independent factual verification. A funding round or hire does not prove buying or partnership intent. Explicit source publication dates and fetch times do not establish the date of an event.',
			title: 'Interpreting evidence',
			variant: 'note'
		}
	],
	npmName: '@absolutejs/rag',
	samples: [
		{
			code: `import { Elysia, t } from "elysia";
import { anthropic } from "@absolutejs/ai/anthropic";
import { createBraveSearch } from "@absolutejs/search/brave";
import {
  createResearch,
  researchPlugin,
  researchMonitorTask,
} from "@absolutejs/rag/research";

const provider = anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const research = createResearch({
  search: createBraveSearch({ apiKey: process.env.BRAVE_SEARCH_API_KEY! }),
  provider,
  reviewer: { provider, model: process.env.RESEARCH_REVIEW_MODEL! },
  model: process.env.RESEARCH_MODEL!,
  tasks: {
    company: {
      schema: t.Object({ name: t.String(), description: t.String() }),
    },
    signals: researchMonitorTask,
  },
  limits: { searches: 4, reads: 4, rounds: 2, timeoutMs: 90_000 },
  // Optional: explicitly scoped public evidence, never implicit tenant sharing.
  cache: { scope: "public-company-evidence", ttlMs: 300_000 },
});

// In an existing app, use its actual session/agent authorization here.
const plugin = researchPlugin({
  runtime: research,
  authorize: authorizeResearchRequest,
});
const app = new Elysia().use(plugin);

const result = await research.run({
  query: "Example company",
  task: "company",
});
`,
			description:
				'Server composition. Set BRAVE_SEARCH_API_KEY, ANTHROPIC_API_KEY, RESEARCH_MODEL and RESEARCH_REVIEW_MODEL. Implement authorizeResearchRequest using the application session or agent policy, then mount the plugin in the existing Elysia app. This function is host code, not a package export.',
			heading: 'Configure the research plugin',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { createWebpageReaderClient, readRAGWebsite } from '@absolutejs/rag/web';

const reader = createWebpageReaderClient({
  endpoint: readerServiceUrl,
  fallback: input => readRAGWebsite({ ...input, maxChars: 48_000 })
});
// createResearch({ search, provider, model, reader });`,
			description:
				'Optional server composition: readerServiceUrl is the trusted internal reader endpoint, not user input. Pass reader into createResearch. The fallback preserves static-page evidence if the browser service is unavailable; saturation and cancellation remain explicit.',
			heading: 'Read through an isolated browser service',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { useResearch } from "@absolutejs/rag/react";
function ResearchButton() {
  const { run, cancel, state } = useResearch("/research");
  return (
    <>
      <button
        onClick={() =>
          void run({ query: "Example company", task: "company" }).catch(
            () => {},
          )
        }
      >
        Research
      </button>
      <button onClick={cancel}>Cancel</button>
      <pre>{JSON.stringify(state.result ?? state.progress ?? state.error)}</pre>
    </>
  );
}
`,
			description:
				'Inside a mounted component, useResearch exposes progress, results and cancellation. Unmounting cancels work; a superseded request cannot overwrite a newer result.',
			heading: 'React research hook',
			intent: 'partial',
			language: 'tsx'
		},
		{
			code: `import { useResearch } from "@absolutejs/rag/vue";
// Within setup/effect scope; state is a shallow ref. Scope disposal cancels work.
const { run, cancel, state } = useResearch("/research");
await run({ query: "Example company", task: "company" });
console.log(state.value.result);
`,
			description:
				'Use within setup or an effect scope. state is a shallow ref and scope disposal cancels the request.',
			heading: 'Vue research composable',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `<script lang="ts">
  import { onDestroy } from 'svelte';
  import { createResearchStore } from '@absolutejs/rag/svelte';
  const research = createResearchStore('/research');
  const { state } = research;
  onDestroy(research.dispose);
</script>
<button onclick={() => research.run({ query: 'Example company' }).catch(() => {})}>Research</button>
<button onclick={research.cancel}>Cancel</button>
<pre>{JSON.stringify($state.result ?? $state.progress ?? $state.error)}</pre>
`,
			description:
				'Bind the readable state and dispose on component teardown.',
			heading: 'Svelte research store',
			intent: 'partial',
			language: 'svelte'
		},
		{
			code: `import { DestroyRef, inject } from "@angular/core";
import { ResearchService } from "@absolutejs/rag/angular";
// Component field initializers; DestroyRef binds cancellation to this component.
research = inject(ResearchService).connect("/research", inject(DestroyRef));
// this.research.run({ query: 'Example company', task: 'company' });
// this.research.state().result; this.research.cancel();
`,
			description:
				'Component field initializers use DestroyRef to bind request cancellation to the component lifetime.',
			heading: 'Angular research service',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `<form id="research">
  <input name="query" required /><button>Research</button>
</form>
<pre id="result" aria-live="polite"></pre>
`,
			description:
				'Add the form and result element to the page, then bundle the following client binding with the application.',
			heading: 'HTML research form',
			intent: 'partial',
			language: 'html'
		},
		{
			code: `import { bindResearchForm } from "@absolutejs/rag/research/client";
const research = bindResearchForm(
  document.querySelector<HTMLFormElement>("#research")!,
  document.querySelector<HTMLElement>("#result")!,
);
// research.cancel(); research.dispose() when removing the form.
`,
			description:
				'The binding writes textContent. Dispose it when removing the form. For custom presentation, use createResearchClient({ path, fetch, headers }).',
			heading: 'Bind the HTML form',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `<form
  hx-post="/research/html"
  hx-target="#result"
  hx-indicator="#researching"
  hx-sync="this:replace"
>
  <input name="query" required />
  <button>Research</button>
</form>
<span id="researching" class="htmx-indicator">Researching…</span>
<section id="result" aria-live="polite"></section>
`,
			description:
				'Load HTMX through the application. The same authorized server runtime returns escaped HTML containing field verdicts and citation links.',
			heading: 'HTMX research form',
			intent: 'partial',
			language: 'html'
		},
		{
			code: `import { discoverResearchCompanies } from "@absolutejs/rag/research";
const found = await discoverResearchCompanies(research, {
  query: "Companies manufacturing grid-scale battery storage in Germany",
  criteria: [
    {
      id: "manufactures",
      description: "Manufactures grid-scale battery storage equipment",
    },
  ],
  limit: 5,
});
// found.candidates includes evidence per criterion; found.accepted requires all to match.
`,
			description:
				'Uses the research runtime from the server example. Candidate identity and each criterion receive evidence review. accepted requires every criterion to match; absent evidence remains unknown. Contact discovery is supplied separately by @absolutejs/discover.',
			heading: 'Discover companies against criteria',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { SQL } from "bun";
import {
  createPostgresResearchWorkflowStore,
  researchWorkflowPostgresSchemaSql,
  createResearchWorkflows,
  selectResearchMonitorEvents,
} from "@absolutejs/rag/research";

const sql = new SQL(process.env.DATABASE_URL!);
// Apply researchWorkflowPostgresSchemaSql() using your normal migration system.
const store = createPostgresResearchWorkflowStore({
  unsafe: (query, parameters) => sql.unsafe(query, parameters),
});
const workflows = createResearchWorkflows({
  runtime: research,
  store,
  scope: "tenant:resolved-id",
  version: "company-research-v1",
  leaseMs: 120_000, // must exceed the configured runtime deadline
});

await workflows.batch({
  id: "import-2026-09",
  items: [{ id: "example", query: "Example company", task: "company" }],
});
await workflows.monitor({
  id: "example-signals",
  query: "New events at Example company",
  task: "signals",
  select: selectResearchMonitorEvents,
});
await workflows.deliverMonitor("example-signals", async (event) => {
  // Deliver through your existing Dispatch/Execution adapter.
  // Receiver MUST deduplicate with event.id: delivery is at-least-once.
  await deliverYourNotification(event.id, event.payload);
});
`,
			description:
				'Apply researchWorkflowPostgresSchemaSql() through the deployment migration system. Set DATABASE_URL to PostgreSQL. Invoke these functions in existing background workers, with the tenant scope resolved server-side. deliverYourNotification is the host delivery adapter and must deduplicate event.id.',
			heading: 'Resume batches and monitor events',
			intent: 'partial',
			language: 'typescript'
		},
		{
			code: `import { researchManifest } from "@absolutejs/rag/research";
import { toAIToolMap, toMcpToolRegistry } from "@absolutejs/manifest";
const aiTools = toAIToolMap(researchManifest, { runtime: research, enforce });
const mcpTools = toMcpToolRegistry(researchManifest, {
  runtime: research,
  enforce,
});
`,
			description:
				'Install @absolutejs/manifest and bind enforce to the host policy. Guarded research tools require research:run. An unguarded bridge omits them.',
			heading: 'Expose authorized agent tools',
			intent: 'partial',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Search, read, extract and review evidence through one reusable server workflow.',
	version: '0.22.1'
};
