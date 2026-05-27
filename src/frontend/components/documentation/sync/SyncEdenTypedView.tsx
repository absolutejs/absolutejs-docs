import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncEdenClient,
	syncEdenLayering,
	syncEdenOpenAPI,
	syncEdenReconnect,
	syncEdenServer
} from '../../../data/documentation/syncEdenDocsCode';
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
	{ href: '#sync-eden', label: 'End-to-end types' },
	{ href: '#layering', label: 'The layering' },
	{ href: '#server', label: 'Server — Elysia routes' },
	{ href: '#client', label: 'Client — treaty + syncStore' },
	{ href: '#openapi', label: 'OpenAPI is automatic' },
	{ href: '#reconcile', label: 'Optimism, offline, reconnect' }
];

export const SyncEdenTypedView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
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
					<h1
						id="sync-eden"
						style={h1Style(isMobileOrTablet)}
					>
						End-to-end types
					</h1>
					<p style={paragraphLargeStyle}>
						Sync's typed surface rides Elysia's Eden + TypeBox stack —
						no codegen step. Routes you declare with{' '}
						<code>hydrateRoute</code> / <code>mutateRoute</code> become
						the typed entry points; <code>treaty&lt;typeof app&gt;</code>{' '}
						gives a fully-typed client that <code>syncStore</code>{' '}
						consumes for optimism + reconnect + offline. Row and result
						types flow end-to-end from the route signatures.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="layering"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The layering — Eden owns the typing, sync owns the cache
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The guiding decision behind the typed sync surface:{' '}
						<em>don't build a parallel type system</em> — lean all the
						way into Eden + TypeBox. Eden already solves typed
						transport + validation; the sync engine only owns what Eden
						can't: the stateful client (local cache, diffs, optimistic
						writes, offline).
					</p>
					<PrismPlus
						codeString={syncEdenLayering}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server — ordinary Elysia routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Hydrate and mutate are normal Elysia routes. The{' '}
						<code>hydrateRoute</code> / <code>mutateRoute</code>{' '}
						helpers turn a typed collection or mutation definition into
						a route handler whose <strong>return type carries the row
						or result type</strong>, so{' '}
						<code>treaty&lt;typeof app&gt;()</code> infers it on the
						client. TypeBox (<code>t</code>, re-exported by Elysia)
						validates and types the <code>query</code> /{' '}
						<code>body</code>:
					</p>
					<PrismPlus
						codeString={syncEdenServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>Why explicit routes, not a builder:</strong>{' '}
						TypeScript can't infer route types from a runtime loop over
						definitions. The only way to get Eden types without
						reimplementing Elysia's route-chaining generics (fragile,
						version-coupled) is real chained routes. They're also a
						feature — per-route guards, rate limits, and{' '}
						<code>derive</code> all work because they{' '}
						<em>are</em> Elysia routes.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client — literally Eden + a generic store
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>syncStore</code> is generic: the row type is inferred
						from <code>hydrate</code>'s return, mutate args + result
						from <code>mutate</code>'s signature. No{' '}
						<code>&lt;T&gt;</code>, no parallel schema, no custom
						inference:
					</p>
					<PrismPlus
						codeString={syncEdenClient}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="openapi"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OpenAPI / Scalar UI is automatic
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/absolute</code> auto-mounts{' '}
						<code>@elysiajs/openapi</code> in dev by default. Every
						Elysia route you declared — including the sync hydrate and
						mutate routes — shows up at <code>/openapi</code> with the
						Scalar UI, with its TypeBox schemas surfaced as
						parameters and response types. Visit{' '}
						<code>http://localhost:3000/openapi</code> and explore it
						without any extra wiring. Opt in for production via{' '}
						<code>absolute.config.ts</code>:
					</p>
					<PrismPlus
						codeString={syncEdenOpenAPI}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reconcile"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Optimism, offline, reconnect — what the store does for you
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						All the stateful client work — optimistic overlays,
						roll-back-on-reject, drop-overlay-on-WS-diff, offline
						queueing, reconnect-with-catch-up-diff via the version
						cursor — lives in <code>syncStore</code>. The types come
						from Eden; the runtime semantics come from the store:
					</p>
					<PrismPlus
						codeString={syncEdenReconnect}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If <code>useSyncCollection</code> from the{' '}
						<a href="/documentation/sync-frameworks">Framework Hooks</a>{' '}
						section is the batteries-included quickstart,{' '}
						<code>syncStore</code> + <code>treaty&lt;typeof app&gt;</code>{' '}
						is the path for projects that want end-to-end types and
						control over how Eden is wired. Both rest on the same
						engine and WebSocket protocol.
					</p>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents
					items={tocItems}
					themeSprings={themeSprings}
				/>
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
