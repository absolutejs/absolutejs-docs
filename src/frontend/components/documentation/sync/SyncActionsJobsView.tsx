import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncActionsMutations,
	syncJobsDefine,
	syncJobsEnqueue
} from '../../../data/documentation/syncActionsJobsDocsCode';
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
import { ComparisonRow, ComparisonTable } from '../../utils/ComparisonTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#sync-actions', label: 'Actions, jobs & schedules' },
	{ href: '#mutations-as-actions', label: 'Mutations ARE actions' },
	{ href: '#define-jobs', label: 'defineJobs — typed registry' },
	{ href: '#enqueue', label: 'Enqueueing work' },
	{ href: '#convex-map', label: 'Map to Convex primitives' }
];

const convexMapRows: ComparisonRow[] = [
	{
		feature: 'Define an action',
		note: 'Emitted changes buffer via actions.change and commit as one applyChangeBatch on resolve.',
		values: [
			'defineAction(handler)',
			'defineMutation — the async handler IS the action'
		]
	},
	{
		feature: 'Call from the client',
		values: [
			'useAction(api.foo, args)',
			"syncStore.mutate('foo', args) via treaty<typeof app>"
		]
	},
	{
		feature: 'Immediate follow-up work',
		values: [
			'ctx.scheduler.runAfter(0, internal.x)',
			"app.queue.enqueue('x', args) from the mutation handler"
		]
	},
	{
		feature: 'Delayed one-shots',
		values: [
			'ctx.scheduler.runAfter(ms, internal.x)',
			"app.queue.enqueue('x', args, { runAt })"
		]
	},
	{
		feature: 'Cron triggers',
		values: [
			'Cron definitions',
			'engine.registerSchedule + @elysiajs/cron (via the scheduled plugin)'
		]
	},
	{
		feature: 'Durable, retried background jobs',
		values: [
			'Workpool (durable, retried, deduped)',
			'@absolutejs/queue — typed registry, exponentialBackoff, dead-letter, in-memory + Postgres stores'
		]
	},
	{
		feature: 'Action calls a mutation',
		values: [
			'ctx.runMutation from an action',
			'Job handler calls engine.runMutation(...) directly'
		]
	}
];

export const SyncActionsJobsView = ({
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
					<h1 id="sync-actions" style={h1Style(isMobileOrTablet)}>
						Actions, jobs & schedules
					</h1>
					<p style={paragraphLargeStyle}>
						Long-running work (AI streaming, email, webhooks),
						durable retryable background jobs (with backoff +
						dead-letter), and cron-triggered work that writes back
						to live tables — all without a new framework. Sync's
						mutations already work like Convex actions; pair them
						with <code>defineSchedule</code> for cron and{' '}
						<code>@absolutejs/queue</code> for durable jobs and the
						story is complete.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="mutations-as-actions"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Mutations ARE actions
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex splits the surface into <em>mutations</em>{' '}
						(transactional, no side effects) and <em>actions</em>{' '}
						(can call external APIs, not transactional). Sync's{' '}
						<code>defineMutation</code> handler is async and can do
						anything — call HTTP, stream from an AI provider, send
						an email — and emit changes back to live tables via{' '}
						<code>actions.change/insert/update/delete</code>. The
						engine buffers those emitted changes and commits them as
						one <code>applyChangeBatch</code> only AFTER the handler
						resolves; if the handler throws, the buffered changes
						don't fan out. One concept, both behaviours:
					</p>
					<PrismPlus
						codeString={syncActionsMutations}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-jobs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						<code>defineJobs</code> — typed, durable, retryable
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/queue</code> is the durable-job piece:
						typed registry, exponential backoff, dead-letter,
						delayed one-shots, concurrency control, leases, and a
						standalone worker. In-memory store for dev;{' '}
						<code>@absolutejs/queue-postgres</code> for production
						(jobs survive restarts, multiple workers claim safely).
					</p>
					<PrismPlus
						codeString={syncJobsDefine}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enqueue"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enqueueing — from mutations, schedules, or anywhere
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A mutation can enqueue durable follow-up work, a
						scheduled cron can fan out a batch of jobs, and any HTTP
						route can enqueue too. Job handlers can run sync
						mutations to write back to live tables — so the
						subscriber a user has open sees the result the moment
						the worker finishes.
					</p>
					<PrismPlus
						codeString={syncJobsEnqueue}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="convex-map"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Map to Convex's primitives
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A direct translation table for teams comparing the two
						stacks. Different machinery, equivalent capability:
					</p>
					<ComparisonTable
						columns={['Convex', 'AbsoluteJS Sync']}
						firstColumnLabel="Capability"
						rows={convexMapRows}
						themeSprings={themeSprings}
					/>
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
