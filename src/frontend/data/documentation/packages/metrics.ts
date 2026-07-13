import { PackageDocData } from '../../../../types/packageDocs';

export const metricsPackageData: PackageDocData = {
	category: 'Observability',
	description:
		'Prometheus / OpenMetrics exposure for Bun and Elysia apps. Every AbsoluteJS package already exposes a typed metrics() snapshot; this package standardizes those shapes into MetricSample[], renders Prometheus text format and mounts a single GET /metrics via an Elysia plugin — no hand-rolled endpoint per service. Anything that scrapes Prometheus text (Prometheus, VictoriaMetrics, Grafana Agent, OTLP collectors) can consume it, and counter/gauge helpers cover your own app metrics.',
	features: [
		{
			description:
				'metricsPlugin({ registry }) mounts GET /metrics on any Elysia app and serves Prometheus text format; elysia is an optional peer needed only for the plugin.',
			title: 'One-line /metrics endpoint'
		},
		{
			description:
				'Subpath collectors (runtime, queue, sync, secrets, rate-limit, audit, dispatch) adapt each substrate package metrics() shape; each takes a plain snapshot function, so the source packages are never hard dependencies.',
			title: 'Per-source collectors'
		},
		{
			description:
				'counter() and gauge() build MetricSample values with help text and labels, so app-specific metrics register alongside substrate ones.',
			title: 'Custom metric helpers'
		},
		{
			description:
				'Substrate metrics follow abs_<source>_<metric> with counters ending in _total, matching Prometheus naming conventions and avoiding collisions with your app metrics.',
			title: 'Consistent naming'
		}
	],
	installCommand: 'bun add @absolutejs/metrics',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/metrics',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/metrics',
			label: 'GitHub'
		}
	],
	name: 'Metrics',
	notes: [
		{
			body: 'Collectors rely on TypeScript structural typing: pass () => instance.metrics() from @absolutejs/runtime, queue, sync, secrets, rate-limit, audit or dispatch and the shapes line up without importing those packages here.',
			title: 'Loose coupling by design',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/metrics',
	samples: [
		{
			code: `import { createMetricsRegistry, metricsPlugin } from '@absolutejs/metrics';
import { auditCollector } from '@absolutejs/metrics/audit';
import { queueCollector } from '@absolutejs/metrics/queue';
import { runtimeCollector } from '@absolutejs/metrics/runtime';
import { syncCollector } from '@absolutejs/metrics/sync';
import { Elysia } from 'elysia';

const registry = createMetricsRegistry();
registry.register('audit', auditCollector(() => audit.metrics()));
registry.register('queue', queueCollector(() => worker.metrics()));
registry.register('runtime', runtimeCollector(() => runtime.metrics()));
registry.register('sync', syncCollector(() => engine.metrics()));

const app = new Elysia().use(await metricsPlugin({ registry }));
// GET /metrics → Prometheus text`,
			description:
				'Register a collector per source and mount the scrape endpoint with one plugin.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import { counter, gauge } from '@absolutejs/metrics';

registry.register('app', () => [
	counter('myapp_requests_total', requestCount, {
		help: 'Total HTTP requests',
		labels: { route: '/api/users' }
	}),
	gauge('myapp_workers', activeWorkers, {
		help: 'Currently running workers'
	})
]);`,
			description:
				'Expose your own counters and gauges next to the substrate metrics.',
			heading: 'Custom Metrics',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Turn every metrics() snapshot in your app into a Prometheus scrape target through one Elysia plugin.',
	version: '0.1.0'
};
