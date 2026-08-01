import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
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
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const exportRows: DocsTableCell[][] = [
	[
		{ code: '@absolutejs/absolute' },
		'Framework-neutral server APIs and shared types.'
	],
	[
		{ code: '@absolutejs/absolute/build' },
		'Programmatic production build entry point.'
	],
	[
		{ code: '@absolutejs/absolute/client' },
		'Framework-neutral browser runtime APIs.'
	],
	[
		{ code: '@absolutejs/absolute/image' },
		'Client-side image URL and optimization helpers.'
	],
	[
		{ code: '@absolutejs/absolute/islands' },
		'Framework-neutral island runtime and contracts.'
	],
	[
		{ code: '@absolutejs/absolute/angular' },
		'Angular browser integration and public APIs.'
	],
	[
		{ code: '@absolutejs/absolute/angular/components' },
		'Angular components supplied by AbsoluteJS.'
	],
	[
		{ code: '@absolutejs/absolute/angular/server' },
		'Angular server-rendering integration.'
	],
	[
		{ code: '@absolutejs/absolute/react' },
		'React browser integration and public APIs.'
	],
	[
		{ code: '@absolutejs/absolute/react/components' },
		'React components supplied by AbsoluteJS.'
	],
	[
		{ code: '@absolutejs/absolute/react/hooks' },
		'React hooks supplied by AbsoluteJS.'
	],
	[
		{ code: '@absolutejs/absolute/react/router' },
		'React Router integration for client navigation.'
	],
	[
		{ code: '@absolutejs/absolute/react/server' },
		'React server-rendering integration.'
	],
	[
		{ code: '@absolutejs/absolute/svelte' },
		'Svelte browser integration and public APIs.'
	],
	[
		{ code: '@absolutejs/absolute/svelte/server' },
		'Svelte server-rendering integration.'
	],
	[
		{ code: '@absolutejs/absolute/svelte/router' },
		'Svelte client router primitives.'
	],
	[
		{ code: '@absolutejs/absolute/svelte/components/*.svelte' },
		'Direct Svelte component entry points, including Island, Head, Image, JsonLd, AwaitSlot, and StreamSlot.'
	],
	[
		{ code: '@absolutejs/absolute/svelte/router/*.svelte' },
		'Direct Svelte Link, Route, and Router component entry points.'
	],
	[
		{ code: '@absolutejs/absolute/vue' },
		'Vue browser integration and public APIs.'
	],
	[
		{ code: '@absolutejs/absolute/vue/components' },
		'Vue components supplied by AbsoluteJS.'
	],
	[
		{ code: '@absolutejs/absolute/vue/components/Image.vue' },
		'Direct Vue image component entry point.'
	],
	[
		{ code: '@absolutejs/absolute/vue/server' },
		'Vue server-rendering integration.'
	],
	[
		{ code: '@absolutejs/absolute/style-module-shim' },
		'Type declarations for imported style modules.'
	]
];

const tocItems: TocItem[] = [
	{ href: '#public-exports', label: 'Public exports' }
];

export const PackageExportsView = ({
	currentPageId,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	themeSprings,
	tocOpen
}: DocsViewProps) => (
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
				<h1 id="package-exports" style={h1Style(isMobileOrTablet)}>
					Package Exports
				</h1>
				<p style={paragraphLargeStyle}>
					Supported import paths exposed by the core framework
					package.
				</p>
			</animated.div>

			<section style={sectionStyle}>
				<AnchorHeading
					id="public-exports"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Public exports
				</AnchorHeading>
				<p style={paragraphSpacedStyle}>
					Import from these subpaths instead of reaching into package
					internals. The package selects browser and server
					implementations where an export provides conditional entry
					points.
				</p>
				<DocsTable
					columns={['Import path', 'Purpose']}
					rows={exportRows}
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

		{!isMobileOrTablet && (
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
