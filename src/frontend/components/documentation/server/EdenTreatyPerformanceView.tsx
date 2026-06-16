import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	edenBackendReturnType,
	edenTreatyComposedClient,
	edenTreatySubApp,
	edenTreatyWholeApp
} from '../../../data/documentation/edenTreatyPerformanceDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#symptom', label: 'The Symptom' },
	{ href: '#why', label: 'Why It Happens' },
	{ href: '#frontend', label: 'Fix: Per-Plugin Clients' },
	{ href: '#backend', label: 'Fix: Cheap Return Types' },
	{ href: '#notes', label: 'Notes' }
];

export const EdenTreatyPerformanceView = ({
	currentPageId,
	onNavigate,
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
					<h1
						id="eden-treaty-performance"
						style={h1Style(isMobileOrTablet)}
					>
						Eden Treaty Type Performance
					</h1>
					<p style={paragraphLargeStyle}>
						Eden Treaty gives you end-to-end type safety by typing the
						client over your whole server. On a large app that type
						gets expensive — here is why, and how to keep it fast
						without giving up inference.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="symptom"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Symptom
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						As an app grows, `absolute typecheck` (which runs `tsc`)
						slows to a crawl and eventually fails with
						`JavaScript heap out of memory` — even with a large
						`--max-old-space-size`. Crucially, the app still builds
						and runs fine: Bun bundles without a full type check, so
						only the batch type-check gate is affected.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why It Happens
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Typing the client over the whole server instantiates the
						params, body, response, and header types of every route in
						one giant nested type. A batch `tsc` run builds all of it
						eagerly, and composing
						many plugins through the `.use()` chain is closer to
						multiplicative than additive — so cost explodes well
						before you hit any documented route ceiling.
					</p>
					<PrismPlus
						codeString={edenTreatyWholeApp}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Your editor stays fast because the TypeScript language
						server is lazy — it only instantiates the slice for the
						file you are editing. It is the eager, whole-program batch
						check that runs out of memory.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="frontend"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fix: Per-Plugin Clients
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Elysia&apos;s recommendation is to type Eden over a
						sub-app instead of the whole server. You keep full type
						safety for those routes; TypeScript just evaluates one
						plugin&apos;s type at a time.
					</p>
					<PrismPlus
						codeString={edenTreatySubApp}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						To keep the ergonomic `server.*` surface with zero
						call-site changes, build one client per plugin and compose
						them back into the same shape with explicit leaf
						assignment. Never object-spread an Eden client — it is a
						URL-building Proxy, so spreading drops the routes at
						runtime.
					</p>
					<PrismPlus
						codeString={edenTreatyComposedClient}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="backend"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fix: Cheap Return Types
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Fixing the client is only half of it, and the server entry
						is where most teams reach for casts. Resist that. The cause
						is the plugin&apos;s own return type: a config-conditional
						plugin (`config.x ? routes(x) : new Elysia()`) produces a
						union at every branch, and `.use()` distributes over unions
						— so the merged type trends toward 2^N and eventually can&apos;t
						even be serialized (`TS7056`). Casting it to `AnyElysia` at
						each call site hides the symptom but throws the types away.
					</p>
					<p style={paragraphSpacedStyle}>
						The cure is to give the plugin an explicit return type that
						exposes only what consumers actually read. `@absolutejs/auth`
						is the worked example: its route paths are configurable, so
						Elysia keys them by `string` (never a literal) — there is no
						precise route type to expose anyway. What is precise is the
						typed `protectRoute` context, so `auth()` returns that, and
						`User` is inferred from your `getUser`. Consumers just
						`.use(authPlugin)` — no cast, full inference, instant
						type-check.
					</p>
					<PrismPlus
						codeString={edenBackendReturnType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="notes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Notes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Do not reach for this on a small app — a handful of plugins
						type-checks fine. Prefer plain `fetch` for one-off or
						bearer-authenticated calls, since those add nothing to the
						treaty type. And prefer a cheap, explicit return type at the
						plugin boundary over a cast at the call site: a cast erases
						the types for everyone, while a well-chosen return type
						keeps exactly the surface consumers need and nothing they
						don&apos;t.
					</p>
					<p style={paragraphSpacedStyle}>
						This is how the AbsoluteJS route plugins are built, so you
						never cast them: `@absolutejs/auth` returns its typed
						`protectRoute` context, `@absolutejs/voice` returns a base
						Elysia (its Twilio routes are reached by path), and so on.
						Mount them and keep your own typed surface fully inferred.
					</p>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
