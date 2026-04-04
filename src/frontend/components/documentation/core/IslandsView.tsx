import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	islandsHtml,
	islandsHydrationModes,
	islandsLoose,
	islandsRegistry,
	islandsSharedStateNote,
	islandsStore,
	islandsStoreUsage,
	islandsTypeSafety,
	islandsTyped
} from '../../../data/documentation/islandsDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
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
	{ href: '#overview', label: 'Overview' },
	{ href: '#registry', label: 'Registry' },
	{ href: '#loose-vs-typed', label: 'Loose vs Typed' },
	{ href: '#island-stores', label: 'Island Stores' },
	{ href: '#hydration', label: 'Hydration Modes' },
	{ href: '#html-htmx', label: 'HTML & HTMX' }
];

export const IslandsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="islands">
						Islands
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS islands let one SSR-first page host
						interactive components from React, Vue, Svelte, and
						Angular without turning the whole page into a client
						app. Page handlers stay pure. AbsoluteJS owns the SSR
						markers, manifest wiring, bootstrap, hydration, and
						cross-framework runtime.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="overview"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use islands when most of a page should remain
						server-rendered HTML, but a few areas need
						interactivity. A host page can stay in its own framework
						while selectively embedding islands from other
						frameworks.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Host pages stay simple
							</strong>
							: render normal SSR pages and drop islands in where
							you need client behavior.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Cross-framework is normal
							</strong>
							: a React host can render Vue, Svelte, or Angular
							islands.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								State is store-first
							</strong>
							: islands do not take state keys in their props.
							Shared state comes from importing the same island
							store across components.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Zustand powers the store layer
							</strong>
							: AbsoluteJS uses <code>zustand/vanilla</code>{' '}
							underneath and exposes framework-specific selectors
							on top.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="registry"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Registry
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define a registry once with direct component imports.
						This is the source of truth for SSR lookup and for the
						optional typed wrappers created with{' '}
						<code>createTypedIsland(registry)</code>.
					</p>
					<PrismPlus
						codeString={islandsRegistry}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The registry accepts real component values directly. No
						source strings, prop builders, or generated binding
						files are required in app code.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="loose-vs-typed"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Loose vs Typed
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each framework exports a built-in <code>Island</code>{' '}
						for loose authoring and a{' '}
						<code>createTypedIsland(registry)</code> helper for
						registry-driven typing. The loose primitive is useful
						when you want dynamic or ad hoc rendering. The typed
						wrapper is the strongest option when you want
						compile-time enforcement of the full{' '}
						<code>framework</code> → <code>component</code> →{' '}
						<code>props</code> chain.
					</p>
					<PrismPlus
						codeString={islandsLoose}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={islandsTyped}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={islandsTypeSafety}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Loose Island</strong>:
							runtime-safe, flexible, and useful when the
							framework/component pairing is chosen dynamically.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Typed island wrappers
							</strong>
							: exact component names and prop shapes inferred
							from the registry for that framework.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="island-stores"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Island Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Shared state is not passed through island props.
						Instead, define a real store with{' '}
						<code>createIslandStore(...)</code> and import that same
						store into any island component that should share it.
						This follows the same store-first mental model you would
						use with Zustand itself.
					</p>
					<PrismPlus
						codeString={islandsStore}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={islandsStoreUsage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={islandsSharedStateNote}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="hydration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hydration Modes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Hydration is per island, not page-wide.
					</p>
					<PrismPlus
						codeString={islandsHydrationModes}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>load</strong>: hydrate
							immediately after bootstrap.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>idle</strong>: wait for
							browser idle time.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>visible</strong>: wait
							until the island enters the viewport.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>none</strong>: render
							SSR HTML only with no client hydration.
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="html-htmx"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTML & HTMX
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTML and HTMX hosts use the platform-native{' '}
						<code>&lt;absolute-island&gt;</code> custom element
						instead of a component import. AbsoluteJS lowers it into
						SSR island markup and wires the runtime automatically.
					</p>
					<PrismPlus
						codeString={islandsHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Because HTML attributes are strings, HTML and HTMX do
						not get the same prop-level inference as{' '}
						<code>createTypedIsland(registry)</code>
						on TS-based component hosts. They still use the same
						runtime, SSR, hydration modes, and island stores.
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
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
