import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	pluginCompositionBasic,
	pluginCompositionEncapsulation,
	pluginCompositionOrder,
	pluginCompositionScopedHooks
} from '../../../data/documentation/elysiaPluginCompositionDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { PluginCompositionOrderList } from './PluginCompositionOrderList';
import { PluginCompositionReferencesList } from './PluginCompositionReferencesList';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#basics', label: 'Basics' },
	{ href: '#encapsulation', label: 'Encapsulation' },
	{ href: '#scoped-hooks', label: 'Scoped Hooks' },
	{ href: '#order', label: 'Registration Order' },
	{ href: '#references', label: 'References' }
];

export const ElysiaPluginCompositionView = ({
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
						id="elysia-plugin-composition"
						style={h1Style(isMobileOrTablet)}
					>
						Plugin Composition
					</h1>
					<p style={paragraphLargeStyle}>
						Compose Elysia plugins directly in AbsoluteJS with clear
						boundaries and predictable hook behavior.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Stack plugins in the same Elysia chain:
					</p>
					<PrismPlus
						codeString={pluginCompositionBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="encapsulation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Encapsulation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use sub-plugins to isolate API and background job
						behavior:
					</p>
					<PrismPlus
						codeString={pluginCompositionEncapsulation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scoped-hooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scoped Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Hooks defined in a plugin apply to routes in that plugin
						scope:
					</p>
					<PrismPlus
						codeString={pluginCompositionScopedHooks}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="order"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Registration Order
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Registration order determines what hooks and plugins
						apply to each route:
					</p>
					<PrismPlus
						codeString={pluginCompositionOrder}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PluginCompositionOrderList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="references"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						References
					</AnchorHeading>
					<PluginCompositionReferencesList />
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
