import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	queueDefineJobs,
	queueHandlerTimeout,
	queueOneShot,
	queueRecurringCron,
	queueRegistry,
	queueRetryPolicy,
	queueRunHandlerOnce
} from '../../../data/documentation/queueDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#queue-jobs', label: 'Overview' },
	{ href: '#define-jobs', label: 'defineJobs' },
	{ href: '#registry', label: 'Handlers & Registry' },
	{ href: '#retries', label: 'Retries & Dead-letter' },
	{ href: '#recurring', label: 'Recurring Jobs (cron)' },
	{ href: '#one-shot', label: 'One-shot Triggers' },
	{ href: '#timeouts', label: 'Timeouts & Abort Signal' }
];

export const QueueJobsView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="queue-jobs" style={h1Style(isMobileOrTablet)}>
						Queue Jobs
					</h1>
					<p style={paragraphLargeStyle}>
						Everything about defining work: schema-defined jobs,
						typed handlers, the retry policy that kicks in when a
						handler throws, recurring triggers via cron, one-shot
						and delayed runs, and how handlers cooperate with
						timeouts through the abort signal.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-jobs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						defineJobs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>defineJobs</code> takes a kind → TypeBox-schema
						map. The result is the single source of truth for both{' '}
						<strong>inferred payload types</strong> — every{' '}
						<code>enqueue(kind, payload)</code> call and every
						handler is auto-typed, no hand-written job map, no
						generics — and <strong>runtime validation</strong> —
						payloads are validated at enqueue and dequeue, so a
						buggy caller can't push junk into the durable store and
						break the worker.
					</p>
					<PrismPlus
						codeString={queueDefineJobs}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Use the re-exported t"
						variant="note"
					>
						The package re-exports TypeBox's <code>t</code> so every
						schema shares one TypeBox instance — mixing TypeBox
						versions silently breaks type narrowing.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="registry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Handlers &amp; Registry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createJobRegistry(jobs)</code> is a fluent
						registry — chain <code>.on(kind, handler)</code> per
						kind. Each handler receives the typed payload and a{' '}
						<code>JobContext</code> with <code>id</code>,{' '}
						<code>kind</code>, <code>attempts</code>,{' '}
						<code>maxAttempts</code>, and <code>signal</code>.
					</p>
					<PrismPlus
						codeString={queueRegistry}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A claimed job whose kind has no registered handler is
						dead-lettered rather than silently dropped — register a
						handler for every kind in the definition before the
						worker starts.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="retries"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Retries &amp; Dead-letter
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Throwing from a handler triggers the retry policy —
						exponential backoff (configurable via the worker's{' '}
						<code>backoff</code> option) up to{' '}
						<code>maxAttempts</code> (set per job at enqueue,
						default 5). After the final attempt the job moves to{' '}
						<code>dead</code>, surfaced separately in the worker
						metrics and listable via <code>store.listByKind</code>.
					</p>
					<PrismPlus
						codeString={queueRetryPolicy}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Schema drift dead-letters too"
						variant="info"
					>
						The worker re-validates each claimed payload against the
						registry's schema before running the handler. A
						persisted job that no longer matches (stale data after a
						schema change) is dead-lettered instead of crashing the
						handler.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="recurring"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Recurring Jobs (cron)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The queue deliberately does not reinvent cron — pair it
						with <code>@elysiajs/cron</code> for recurring triggers.
						Cron decides <em>when</em>; the queue guarantees the
						work <em>happens</em> — once, surviving restarts, with
						retries and dead-lettering.
					</p>
					<PrismPlus
						codeString={queueRecurringCron}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Tag recurring enqueues with an idempotencyKey"
						variant="note"
					>
						A per-day <code>idempotencyKey</code> means a cron
						misfire (or an extra process running the same schedule)
						doesn't double-run the job — the store returns the
						existing job's id instead of enqueuing a duplicate.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="one-shot"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						One-shot Triggers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Delayed one-shots are just enqueues with a future{' '}
						<code>runAt</code> — the job persists immediately and
						the worker claims it once due:
					</p>
					<PrismPlus
						codeString={queueOneShot}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For manual backfills, admin re-runs, unit tests, or{' '}
						<code>bun scripts/foo.ts</code> wrappers that share
						logic with a cron, use <code>runHandlerOnce</code> — it
						invokes a registered handler directly, without spinning
						up the worker or the plugin:
					</p>
					<PrismPlus
						codeString={queueRunHandlerOnce}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Don't import the plugin barrel in scripts"
						variant="warning"
					>
						Importing the module that exports your Elysia plugin
						pulls in <code>@elysiajs/cron</code>, whose timers keep
						the process alive and prevent a one-shot script from
						exiting. Export the <code>registry</code> from a
						separate file, or <code>process.exit(0)</code> at the
						end of the script.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="timeouts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Timeouts &amp; Abort Signal
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>handlerTimeoutMs</code> bounds the wall-clock time
						a handler may run before the worker aborts its{' '}
						<code>ctx.signal</code> and fails the job through the
						normal retry / dead-letter path — so a hung handler
						frees its worker slot instead of holding it for the full
						lease.
					</p>
					<PrismPlus
						codeString={queueHandlerTimeout}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Honor the signal"
						variant="info"
					>
						The timeout only bounds how long the worker waits —
						check <code>ctx.signal</code> on cooperative paths and
						pass it to in-flight HTTP calls so the handler's work
						actually stops when it fires.
					</Callout>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
