import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
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
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#whats-coming', label: "What's Coming" },
	{ href: '#framework-support', label: 'Framework Support' }
];

const FrameworkSupportList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						<code>Suspense</code> boundaries with streaming SSR
					</>
				),
				term: 'React'
			},
			{
				description: (
					<>
						<code>Suspense</code> component with async setup
					</>
				),
				term: 'Vue'
			},
			{
				description: (
					<>
						<code>{'#await'}</code> blocks for async data
					</>
				),
				term: 'Svelte'
			},
			{
				description: (
					<>
						<code>@defer</code> blocks with placeholder and loading
						states
					</>
				),
				term: 'Angular'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const LoadingStatesView = ({
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
					<h1 id="loading-states" style={h1Style(isMobileOrTablet)}>
						Loading States{' '}
						<span
							style={{
								background:
									'linear-gradient(135deg, #667eea, #764ba2)',
								borderRadius: '6px',
								color: '#fff',
								display: 'inline-block',
								fontSize: '0.4em',
								fontWeight: 600,
								letterSpacing: '0.05em',
								marginLeft: '0.5em',
								padding: '4px 12px',
								textTransform: 'uppercase',
								verticalAlign: 'middle'
							}}
						>
							Coming Soon
						</span>
					</h1>
					<p style={paragraphLargeStyle}>
						Convention-based loading states that display
						automatically during page transitions. Shipping
						alongside client-side navigation.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="whats-coming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What's Coming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Loading state support will ship alongside the{' '}
						<code>{'<Link>'}</code> component for client-side
						navigation. The same file convention pattern used by
						error boundaries will apply: drop a{' '}
						<code>loading.tsx</code> file next to your pages and
						AbsoluteJS will render it as a fallback while the next
						page loads.
					</p>
					<p style={paragraphSpacedStyle}>
						This pairs naturally with streaming SSR. When a page
						component suspends during server rendering, the loading
						convention file provides the shell that streams to the
						client immediately.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="framework-support"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Framework Support
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each framework has its own async primitives that loading
						states will integrate with:
					</p>
					<FrameworkSupportList themeSprings={themeSprings} />
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
