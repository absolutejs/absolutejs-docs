import { PackageDocData } from '../../../../types/packageDocs';

export const healthPackageData: PackageDocData = {
	category: 'Platform & Infra',
	description:
		'Gives any Elysia app on Bun the /healthz and /readyz endpoints that load balancers and Kubernetes-style orchestrators expect, with a standard application/health+json envelope. createHealthChecker composes named checks with per-check timeouts, and the aggregate status is the worst of any check, so a single failing dependency flips the envelope to 503. Bundled check factories cover downstream HTTP dependencies, arbitrary probes, and metrics() snapshots from other @absolutejs packages.',
	features: [
		{
			description:
				'/healthz answers "is this process alive?" (fail means restart it); /readyz answers "can it serve traffic right now?" (fail means stop routing, keep it running). A draining instance fails readiness while liveness stays green.',
			title: 'Liveness vs readiness'
		},
		{
			description:
				'probeCheck wraps any promise (resolve = pass, throw = fail), httpCheck grades a downstream URL by status code, and metricsCheck evaluates a metrics() snapshot into pass/warn/fail with observed values for dashboards.',
			title: 'Check factories'
		},
		{
			description:
				'The JSON body follows the IETF health-check draft and Kubernetes livez/readyz conventions, served as application/health+json with Cache-Control: no-store.',
			title: 'Standards-compatible envelope'
		},
		{
			description:
				'Status rolls up as fail > warn > pass. warn still returns 200 — the LB keeps routing while your dashboard surfaces the degradation.',
			title: 'Worst-of-any aggregation'
		},
		{
			description:
				"Each check declares a kind ('liveness', 'readiness', or 'both') so heavy downstream checks run only under /readyz and liveness stays a cheap process-responsiveness probe.",
			title: 'Kind filtering'
		}
	],
	installCommand: 'bun add @absolutejs/health',
	links: [
		{
			href: 'https://github.com/absolutejs/health',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/health',
			label: 'npm'
		}
	],
	name: 'Health',
	notes: [
		{
			body: 'The package is pre-1.0. The endpoint semantics follow established conventions and are unlikely to move, but the check-factory signatures may see minor adjustments before a stable release.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/health',
	samples: [
		{
			code: `\
import { Elysia } from 'elysia';
import {
  createHealthChecker,
  healthPlugin,
  metricsCheck,
  probeCheck,
  httpCheck,
} from '@absolutejs/health';

const checker = createHealthChecker({
  checks: [
    // Evaluate a metrics() snapshot into pass/warn/fail.
    metricsCheck('queue', () => worker.metrics(), (m) => ({
      status: m.failed > 100 ? 'warn' : 'pass',
      observed: { runs: m.runs, failed: m.failed },
    })),

    // Wrap an arbitrary probe.
    probeCheck('postgres', () => pg.query('SELECT 1')),

    // Downstream HTTP dependency, readiness only.
    httpCheck('otlp-collector', 'http://collector:4318/healthz', {
      kind: 'readiness',
    }),
  ],
});

const app = new Elysia().use(await healthPlugin({ checker }));
// GET /healthz -> liveness:  200 / 503 with { status, checks, at }
// GET /readyz  -> readiness: same shape, readiness + both checks`,
			description:
				'Compose named checks and mount the plugin — two endpoints with a standard envelope, no per-route wiring.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `\
const checker = createHealthChecker({
  checks: [
    {
      name: 'shutting-down',
      kind: 'readiness',
      check: () => ({ status: draining ? 'fail' : 'pass' }),
    },
  ],
});
// While draining: /readyz -> 503 (LB stops routing),
// /healthz -> 200 (orchestrator does NOT restart the process)`,
			description:
				'A readiness-only check lets an instance drain gracefully: the load balancer stops sending new traffic while in-flight requests finish.',
			heading: 'Drain-Aware Readiness',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Liveness and readiness probes for Bun services — one Elysia plugin exposing /healthz and /readyz with a standard JSON envelope.',
	version: '0.1.0'
};
