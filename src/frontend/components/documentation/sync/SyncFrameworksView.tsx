import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncFrameworksAngular,
	syncFrameworksClient,
	syncFrameworksReact,
	syncFrameworksSvelte,
	syncFrameworksVue
} from '../../../data/documentation/syncFrameworksDocsCode';
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
	{ href: '#sync-frameworks', label: 'Framework Hooks' },
	{ href: '#fw-react', label: 'React' },
	{ href: '#fw-vue', label: 'Vue' },
	{ href: '#fw-svelte', label: 'Svelte' },
	{ href: '#fw-angular', label: 'Angular' },
	{ href: '#fw-client', label: 'Plain client (no framework)' }
];

export const SyncFrameworksView = ({
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
						id="sync-frameworks"
						style={h1Style(isMobileOrTablet)}
					>
						Framework Hooks
					</h1>
					<p style={paragraphLargeStyle}>
						Idiomatic bindings for React, Vue, Svelte, and Angular —
						all SSR-safe, all returning the same shape, so swapping
						frameworks in a multi-stack app doesn't change your
						data layer. There's a plain framework-agnostic client
						too.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fw-react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React — <code>@absolutejs/sync/react</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>useSyncCollection</code> returns{' '}
						<code>{'{ data, status, error, mutate }'}</code>;{' '}
						<code>useCollaborativeText</code> returns{' '}
						<code>{'{ text, setText, status }'}</code>. The socket
						opens in an effect, re-opens if the subscription
						identity changes, and closes on unmount.
					</p>
					<PrismPlus
						codeString={syncFrameworksReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fw-vue"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vue — <code>@absolutejs/sync/vue</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Composables returning reactive refs. SSR-safe — the
						socket opens in <code>onMounted</code> and closes in{' '}
						<code>onUnmounted</code>.
					</p>
					<PrismPlus
						codeString={syncFrameworksVue}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fw-svelte"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte — <code>@absolutejs/sync/svelte</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Real Svelte stores — <code>$store</code> gives the live
						state, with <code>mutate</code>/<code>setText</code>/
						<code>destroy</code> attached. Connection opens lazily
						on the first browser subscription.
					</p>
					<PrismPlus
						codeString={syncFrameworksSvelte}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fw-angular"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Angular — <code>@absolutejs/sync/angular</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An injectable service returning Angular signals.
						<code>connect</code> opens a collection;{' '}
						<code>collaborativeText</code> opens a CRDT field. The
						service closes everything on its own destroy.
					</p>
					<PrismPlus
						codeString={syncFrameworksAngular}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fw-client"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Plain client — <code>@absolutejs/sync/client</code>
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every framework binding is a thin wrapper over the
						same framework-agnostic client. Use it directly when
						you don't want a framework binding, or to build your
						own:
					</p>
					<PrismPlus
						codeString={syncFrameworksClient}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
