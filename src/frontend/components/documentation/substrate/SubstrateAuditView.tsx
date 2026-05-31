import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	substrateAuditG1,
	substrateAuditG2,
	substrateAuditG3,
	substrateAuditG4,
	substrateAuditG5,
	substrateAuditG6,
	substrateAuditG7,
	substrateAuditMatrix,
	substrateAuditNext,
	substrateAuditNotInTree,
	substrateAuditPremise
} from '../../../data/documentation/substrateAuditDocsCode';
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
	{ href: '#substrate-audit', label: 'Overview' },
	{ href: '#premise', label: 'What the audit said' },
	{ href: '#matrix', label: 'Coverage matrix' },
	{ href: '#g1', label: 'G1 — Audit log' },
	{ href: '#g2', label: 'G2 — OpenTelemetry' },
	{ href: '#g3', label: 'G3 — Stripe meter sink' },
	{ href: '#g4', label: 'G4 — Dispatch' },
	{ href: '#g5', label: 'G5 — Cluster bus' },
	{ href: '#g6', label: 'G6 — Point-in-time replay' },
	{ href: '#g7', label: 'G7 — Tenant migration' },
	{ href: '#not-in-tree', label: 'What is NOT in-tree' },
	{ href: '#next', label: 'Where to start' }
];

export const SubstrateAuditView = ({
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
					<h1 id="substrate-audit" style={h1Style(isMobileOrTablet)}>
						Substrate complete (G1–G7)
					</h1>
					<p style={paragraphLargeStyle}>
						The deep-research audit of the AbsoluteJS substrate
						named seven cross-cutting gaps. As of 2026-05-31 every
						gap is addressed in-tree. This page consolidates what
						the audit asked for, what shipped against each, and
						the three host-operator concerns that remain outside
						the substrate by design.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="premise"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What the audit said
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The audit framed seven gaps blocking the "can the
						substrate host other teams' production tenants"
						question.
					</p>
					<PrismPlus
						codeString={substrateAuditPremise}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="matrix"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Coverage matrix
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One row per G-gap, mapping the audit's ask to the
						shipped package and version.
					</p>
					<PrismPlus
						codeString={substrateAuditMatrix}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g1"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G1 — Cross-surface audit log
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One <code>Audit</code> handle fanning out to many
						sinks. Open <code>kind: string</code> shape, optional
						hash-chain integrity decorator, live-wire helpers
						that attach to the substrate packages' existing
						listener APIs.
					</p>
					<PrismPlus
						codeString={substrateAuditG1}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g2"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G2 — OpenTelemetry across the substrate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Type-replicated OTel surface, a noop tracer for "no
						provider wired,"{' '}
						<code>tracerOrNoop(provider, name)</code> as the
						canonical entry, and <code>ABS_ATTRS</code> shared
						semantic conventions so spans across substrate
						packages correlate.
					</p>
					<PrismPlus
						codeString={substrateAuditG2}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g3"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G3 — Stripe meter sink (deferred, by design)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The only gap closed by "no, we don't need to ship
						that." <code>@absolutejs/metering</code> was already
						pluggable; a Stripe sink is a 30-line adapter inside
						the host control plane, not a substrate dependency.
					</p>
					<PrismPlus
						codeString={substrateAuditG3}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g4"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G4 — Outbound message dispatch
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						One factory{' '}
						<code>createDispatcher</code> with email / SMS / push
						channels; three first-party vendor adapters
						(Resend, Postmark, Twilio) each a separate npm
						package with the SDK as a true peer dep.
					</p>
					<PrismPlus
						codeString={substrateAuditG4}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g5"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G5 — Multi-region cluster bus
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/sync-bus-redis</code> sibling to{' '}
						<code>sync-bus-pg</code>. Same <code>ClusterBus</code>{' '}
						interface; swap is one constructor change. Native
						geo-replication on managed Redis offerings.
					</p>
					<PrismPlus
						codeString={substrateAuditG5}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g6"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G6 — Point-in-time replay
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>engine.replayTo({'{ at, tables? }'})</code> walks
						the bounded change log forward to a target
						timestamp. <code>syncDevtools</code> Replay panel
						makes it a clickable demo. Forensic incident response
						+ restore-from-time become substrate primitives.
					</p>
					<PrismPlus
						codeString={substrateAuditG6}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="g7"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						G7 — Tenant migration primitives
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three composable verbs —{' '}
						<code>engine.fence</code>,{' '}
						<code>exportSnapshot</code>,{' '}
						<code>importSnapshot</code> — rather than one
						monolithic <code>migrate()</code>. Reads stay open
						under fence so live subscribers don't go dark during
						the transfer.
					</p>
					<PrismPlus
						codeString={substrateAuditG7}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="not-in-tree"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What is NOT in-tree
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three real gaps remain — all host-operator concerns,
						not library concerns. The absolutejs.ai hosted PaaS
						picks them up; the substrate doesn't.
					</p>
					<PrismPlus
						codeString={substrateAuditNotInTree}
						language="markdown"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="next"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Where to start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every G-gap has a dedicated docs page. The clickable
						demo of G6 lives in the sync example app — open the
						Devtools tab and click Replay.
					</p>
					<PrismPlus
						codeString={substrateAuditNext}
						language="markdown"
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
