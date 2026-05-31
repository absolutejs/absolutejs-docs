import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	auditEventShape,
	auditIntegrity,
	auditLiveWires,
	auditMetrics,
	auditQuickStart,
	auditSinks,
	auditTesting
} from '../../../data/documentation/auditDocsCode';
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
	{ href: '#audit-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#event-shape', label: 'Event Shape' },
	{ href: '#sinks', label: 'Sinks' },
	{ href: '#integrity', label: 'Hash-chain Integrity' },
	{ href: '#live-wires', label: 'Live-Wire Helpers' },
	{ href: '#metrics', label: 'Metrics & Close' },
	{ href: '#testing', label: 'Testing' }
];

export const AuditOverviewView = ({
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
					<h1 id="audit-overview" style={h1Style(isMobileOrTablet)}>
						Audit
					</h1>
					<p style={paragraphLargeStyle}>
						Append-only audit log substrate. Many sinks behind
						one fan-out, optional per-writer hash-chain
						integrity (SHA-256 or HMAC-SHA256), live-wire helpers
						for runtime / queue / secrets / sync events, and an
						open <code>kind: string</code> shape so any source
						can emit anything without an enforced enum.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createAudit({'{ sinks: [...] }'})</code> returns
						a handle with{' '}
						<code>append() / metrics() / flush() / close()</code>.
						Every append fans out to every sink concurrently;
						one sink throwing doesn't cancel the others.
					</p>
					<PrismPlus
						codeString={auditQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="event-shape"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Event Shape
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Open by design — no enforced enum on{' '}
						<code>kind</code>. Convention is{' '}
						<code>"&lt;source&gt;.&lt;event&gt;"</code> (e.g.{' '}
						<code>"auth.login"</code>,{' '}
						<code>"queue.job.failed"</code>) so kind filters
						match a whole source.
					</p>
					<PrismPlus
						codeString={auditEventShape}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="sinks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Sinks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An <code>AuditSink</code> implements{' '}
						<code>append()</code>; <code>list / prune / flush /
						close</code> are optional for stores that support
						them. Bundled core sinks plus sibling packages for
						Postgres and Elysia request tracing.
					</p>
					<PrismPlus
						codeString={auditSinks}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="integrity"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hash-chain Integrity
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>withIntegrity(sink)</code> decorates any sink
						with a per-writer hash chain.{' '}
						<code>verifyChain(events)</code> detects modification,
						removal, or reordering. SHA-256 by default; pass{' '}
						<code>secret</code> for HMAC-SHA256 (only secret
						holders can forge a valid chain). Multi-writer safe
						— each writer owns a sub-chain via{' '}
						<code>writerId</code>.
					</p>
					<PrismPlus
						codeString={auditIntegrity}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="live-wires"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Live-Wire Helpers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Bundled helpers return plain callbacks you wire into
						the source package's existing listener API. Audit
						doesn't reach into the substrate's lifecycle — the
						host stays in control.
					</p>
					<PrismPlus
						codeString={auditLiveWires}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="metrics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Metrics &amp; Close
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>audit.metrics()</code> returns cumulative
						counters with per-sink error breakdown. Sink errors
						are NOT fatal — every sink still receives the event;
						errors fire <code>onError</code> and bump per-sink
						counters. <code>flush()</code> + <code>close()</code>{' '}
						drain every sink that supports them.
					</p>
					<PrismPlus
						codeString={auditMetrics}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="testing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Testing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>memorySink()</code> implements{' '}
						<code>list()</code> so tests assert exactly what was
						appended, without coupling to a particular store.
						<code>verifyChain</code> over a tampered event
						surfaces <code>brokenAt</code> for tamper-evidence
						tests.
					</p>
					<PrismPlus
						codeString={auditTesting}
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
