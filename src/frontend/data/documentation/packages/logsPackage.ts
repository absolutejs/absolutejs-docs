import { PackageDocData } from '../../../../types/packageDocs';

export const logsPackageData: PackageDocData = {
	category: 'Observability',
	description:
		'Structured logging for Bun services: leveled loggers with bound fields, child loggers and swappable sinks (console JSON, console pretty, in-memory, rotating file). It composes with the rest of the AbsoluteJS observability stack — pass a redact function from @absolutejs/secrets so secrets never reach disk, wire readActiveTraceId from @absolutejs/telemetry so every line carries the active OTel trace id, and read logger.metrics() for exposure via @absolutejs/metrics.',
	features: [
		{
			description:
				'Six levels from trace to fatal, filtered at the logger and adjustable at runtime with setLevel for incident triage.',
			title: 'Leveled logging'
		},
		{
			description:
				'log.child({ requestId }) binds extra fields on top of the parent, giving per-request or per-job context without repeating it on every call.',
			title: 'Child loggers'
		},
		{
			description:
				'consoleJsonSink, consolePrettySink, memorySink and rotatingFileSink ship built in; custom sinks implement a small LogSink shape (name, write, flush, close).',
			title: 'Pluggable sinks'
		},
		{
			description:
				'Pass redact from @absolutejs/secrets and every serialized event flows through the redactor before hitting any sink.',
			title: 'Secret redaction'
		},
		{
			description:
				'Pass readTraceId from @absolutejs/telemetry and every event carries the active trace id; a missing provider silently leaves it off and never breaks the log line.',
			title: 'Trace correlation'
		},
		{
			description:
				'Calls are synchronous and return immediately while sink writes run in the background; one sink throwing bumps sinkErrors without blocking the others, and flush() drains before shutdown.',
			title: 'Fire-and-forget writes'
		}
	],
	installCommand: 'bun add @absolutejs/logs',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/logs',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/logs',
			label: 'GitHub'
		}
	],
	name: 'Logs',
	notes: [
		{
			body: 'logger.metrics() returns per-level counts, write totals and per-sink error counts; a dedicated @absolutejs/metrics/logs collector subpath is planned for the next release.',
			title: 'Metrics surface',
			variant: 'info'
		},
		{
			body: 'Pre-1.0: the LogSink contract and metrics shape may change between minor versions. Once close() has run, further log calls are silent no-ops.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/logs',
	samples: [
		{
			code: `import {
	consoleJsonSink,
	createLogger,
	rotatingFileSink
} from '@absolutejs/logs';
import { readActiveTraceId } from '@absolutejs/telemetry';

const log = createLogger({
	fields: { region: 'us-east-2', service: 'api' },
	level: 'info',
	readTraceId: readActiveTraceId, // @absolutejs/telemetry
	redact: (text) => broker.redact(text), // @absolutejs/secrets
	sinks: [
		consoleJsonSink(),
		rotatingFileSink({
			keep: 5,
			maxBytes: 10_000_000,
			path: '/var/log/api/app.log'
		})
	]
});

log.info('User signed in', { tenant: 'acme', userId: 'u_42' });

const requestLog = log.child({ requestId: req.id });
requestLog.warn('rate limit exceeded', { remaining: 0 });`,
			description:
				'Create a logger with JSON and rotating-file sinks, optional redaction and trace correlation, then derive a per-request child.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `logger.metrics();
// {
//   logged: { trace: 0, debug: 0, info: 100, warn: 5, error: 2, fatal: 0 },
//   writes: 214,          // 107 events × 2 sinks
//   writeErrors: 0,
//   sinkErrors: {}
// }

// Drain buffered sink writes before shutdown:
await logger.flush();
await logger.close();`,
			description:
				'Inspect the LoggerMetrics snapshot and flush sinks cleanly on shutdown.',
			heading: 'Metrics and Shutdown',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Structured leveled logging with child loggers, pluggable sinks, secret redaction and OTel trace correlation for Bun services.',
	version: '0.1.0'
};
