import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteIslandsHost,
	svelteIslandsStore
} from '../../../data/documentation/islandsDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#authoring', label: 'Authoring' },
	{ href: '#stores', label: 'Stores' }
];

export const SvelteIslandsView = ({
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
					<h1 id="svelte-islands" style={h1Style(isMobileOrTablet)}>
						Svelte Islands
					</h1>
					<p style={paragraphLargeStyle}>
						Svelte hosts use the built-in <code>Island</code>{' '}
						component directly. The same runtime can mount React,
						Vue, Svelte, or Angular islands inside a Svelte page.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="authoring"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authoring
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Write normal Svelte pages and place <code>Island</code>{' '}
						where you want mixed-framework interactivity. AbsoluteJS
						lowers the island blocks and handles the SSR/bootstrap
						path for you.
					</p>
					<PrismPlus
						codeString={svelteIslandsHost}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Svelte islands consume shared state with{' '}
						<code>useIslandStore</code>. It returns a Svelte
						store-like object, so you use it with the normal
						<code>$store</code> syntax.
					</p>
					<PrismPlus
						codeString={svelteIslandsStore}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
