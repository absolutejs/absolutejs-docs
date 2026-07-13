import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	secretsAdapters,
	secretsQuickStart,
	secretsRedact,
	secretsRotation,
	secretsTtlOverride
} from '../../../data/documentation/secretsDocsCode';
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

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#secrets-overview', label: 'Overview' },
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#redact', label: 'Redaction' },
	{ href: '#rotation', label: 'Rotation Watch' },
	{ href: '#ttl', label: 'Per-Name TTL' },
	{ href: '#adapters', label: 'Adapters' }
];

export const SecretsOverviewView = ({
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
					<h1 id="secrets-overview" style={h1Style(isMobileOrTablet)}>
						Secrets
					</h1>
					<p style={paragraphLargeStyle}>
						Host-side secret broker for multi-tenant Bun runtimes.
						Resolve credentials through a pluggable adapter, cache
						them, return safe-for-log sha256 fingerprints, redact
						known secrets out of arbitrary text BEFORE it reaches
						any log sink, and rotate through the adapter on demand.
						Pure host-side — plaintext never crosses the sandbox
						boundary into tenant code.
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
						<code>resolve(name)</code> returns{' '}
						<code>{`{ value, fingerprint }`}</code> where{' '}
						<code>fingerprint</code> is a sha256 prefix safe to log.
						Cache TTL is configurable; <code>rotate()</code> calls
						the adapter and invalidates the cache. Adapters compose
						via <code>compositeAdapter</code> — env-var fallback to
						in-memory dev values, etc.
					</p>
					<PrismPlus
						codeString={secretsQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redact"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redaction — Whole String and Streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>redact(text)</code> walks every cached secret out
						of an arbitrary string (longest-first so nested matches
						don't break). <code>redactStream()</code> is the
						streaming variant — a{' '}
						<code>TransformStream&lt;string, string&gt;</code> that
						catches secrets straddling chunk boundaries via a
						lookback buffer. Drop it into a log forwarder so
						plaintext never reaches the sink. Opt in to{' '}
						<code>redactionEncodings: ['plain', 'base64']</code> to
						also catch base64-encoded forms inside JWTs and cookies.
					</p>
					<PrismPlus
						codeString={secretsRedact}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rotation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rotation Watch
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Long-lived connections (database pools, AI SDK
						instances, per-tenant WebSocket servers) need to swap
						credentials in-place — without it, every active
						connection breaks until the next <code>resolve()</code>{' '}
						lands the new value.{' '}
						<code>onRotate(name, listener)</code> fires AFTER the
						new value is in the cache; returns an unsubscribe
						handle.
					</p>
					<PrismPlus
						codeString={secretsRotation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ttl"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-Name TTL Override
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						High-blast-radius secrets (admin tokens, signing keys,
						kill-switch flags) refresh more often than the global
						default. Pair with <code>onRotate</code> to plumb new
						values into in-process clients.
					</p>
					<PrismPlus
						codeString={secretsTtlOverride}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="adapters"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Adapters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						v0.1.0 bundles three adapters covering dev, test, and
						simple prod. AWS Secrets Manager, HashiCorp Vault,
						Doppler, Infisical, GCP Secret Manager, and Azure Key
						Vault adapters ship as sibling packages — they're where
						the real auth surface lives, so they don't belong in the
						core.
					</p>
					<PrismPlus
						codeString={secretsAdapters}
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
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
