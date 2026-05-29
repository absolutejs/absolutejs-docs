import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncUnsafeHostErrors,
	syncUnsafeHostName,
	syncUnsafeHostRetry,
	syncUnsafeHostSignature
} from '../../../data/documentation/syncUnsafeHostDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#unsafe-host', label: 'unsafeHost escape hatch' },
	{ href: '#demo', label: 'Live worked example' },
	{ href: '#when', label: 'When to reach for it' },
	{ href: '#signature', label: 'The signature' },
	{ href: '#name', label: 'Why the loud name' },
	{ href: '#retry', label: 'The retry pitfall' },
	{ href: '#errors', label: 'Failure modes' }
];

export const SyncUnsafeHostView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	void isSizeOrLess;
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
					<h1 id="unsafe-host" style={h1Style(isMobileOrTablet)}>
						unsafeHost escape hatch
					</h1>
					<p style={paragraphLargeStyle}>
						<code>@absolutejs/sync@1.12.0</code> adds an opt-in
						escape hatch on{' '}
						<code>sandboxedHandler</code>. By default, a
						sandboxed mutation is hermetic — it can read{' '}
						<code>args</code> and <code>ctx</code> and call{' '}
						<code>actions.*</code>, nothing else. When a
						handler explicitly needs to reach a third-party
						API, queue, mailer, or any other side effect that
						lives on the host, you declare those host
						functions in <code>sandbox.unsafeHost</code> and
						the engine exposes them to the sandbox-side
						<code>unsafeHost</code> Proxy. The name is loud on
						purpose: every appearance in source code says
						"this leaves the safe-deterministic surface."
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="demo"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Live worked example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The{' '}
						<a
							href="https://github.com/absolutejs/examples/tree/main/sync"
							rel="noopener noreferrer"
							target="_blank"
						>
							<code>examples/sync</code>
						</a>{' '}
						app's React page renders an{' '}
						<code>UnsafeHostPanel</code> with a form that
						fires a sandboxed <code>audit:emit</code>{' '}
						mutation. The handler runs inside isolated-jsc,
						reaches through to{' '}
						<code>unsafeHost.shipToWebhook</code> (a stand-in
						for a real outbound integration), and writes the
						resulting record through{' '}
						<code>actions.insert('audit_log', …)</code>. The
						panel reads two signals: the live{' '}
						<code>audit_log</code> collection (proving the
						transactional write committed) and a host-side
						counter exposed at{' '}
						<code>/sync/audit/webhook-calls</code> (proving
						the host fn fired). The Playwright test asserts
						both effects landed.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="when"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When to reach for it
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Convex calls these "actions" — non-deterministic
						entry points that can talk to the outside world.
						Sync's escape hatch is the same trade with a
						different shape: instead of a separate mutation
						kind, the same{' '}
						<code>sandboxedHandler</code> can interleave
						deterministic writes (via <code>actions.*</code>,
						which the engine batches and rolls back on retry)
						with explicit host calls (via{' '}
						<code>unsafeHost.*</code>, which it does not).
						Use it when:
					</p>
					<ul style={paragraphSpacedStyle}>
						<li>
							You need to charge a card, send an email,
							push to a queue, or otherwise touch the
							outside world during a mutation.
						</li>
						<li>
							The host call has an idempotency story you
							can pass through (Stripe's{' '}
							<code>Idempotency-Key</code>, SQS's{' '}
							<code>MessageDeduplicationId</code>, a
							row-keyed upsert), OR you've turned off
							retries on the mutation.
						</li>
						<li>
							The work belongs inside the mutation's call
							graph — the model or the API caller should
							see one operation, not a chain of two.
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						If the host call shouldn't run on retry at all,
						model it as a follow-up step (a schedule, a
						webhook, an HTTP-route side effect after the
						mutation commits). The escape hatch is for
						"inside the same call graph and we know what
						we're doing" — not for "I needed I/O and
						sandboxedHandler was inconvenient."
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="signature"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The signature
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The wrapped handler signature is now{' '}
						<code>(args, ctx, actions, unsafeHost)</code>.
						Existing handlers ignore the 4th param; the
						change is fully backwards-compatible. Without an{' '}
						<code>unsafeHost</code> map the Proxy throws on
						every access, so a handler that "didn't know it
						was hermetic" can't accidentally pierce the
						sandbox.
					</p>
					<PrismPlus
						codeString={syncUnsafeHostSignature}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="name"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why the loud name
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>unsafeHost</code> is deliberately loud.
						Every appearance in source tells the reader two
						things at once: this call leaves the sandbox,
						and the deterministic-mutation guarantees stop
						here. Grep-friendly for CI, conspicuous in
						review diffs, hard to mistake for a safe primitive.
					</p>
					<PrismPlus
						codeString={syncUnsafeHostName}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="retry"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The retry pitfall
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The engine's per-mutation retry wrapper sits
						OUTSIDE the sandbox. If the handler throws after
						an <code>unsafeHost</code> call has already
						happened, and the engine retries, the host fn
						fires again. The mutation's writes are
						transactional — they rolled back. The host fn's
						side effect is not.
					</p>
					<p style={paragraphSpacedStyle}>
						Three escapes, in order of preference: make the
						host fn idempotent at the protocol layer; turn
						off retries on the mutation; or move the host
						call to a follow-up step that runs after the
						mutation commits.
					</p>
					<PrismPlus
						codeString={syncUnsafeHostRetry}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="errors"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Failure modes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Two failure paths are visible and both are
						actionable. Calling a host fn that wasn't
						declared throws a typo-friendly error with the
						name in it; a host fn that throws propagates the
						error into the sandbox as a normal JS{' '}
						<code>Error</code> the handler can{' '}
						<code>try / catch</code>.
					</p>
					<PrismPlus
						codeString={syncUnsafeHostErrors}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
