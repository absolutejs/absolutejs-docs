import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	stateBasicUsage,
	stateTypeSafety,
	stateMutationGotcha,
	stateVsDecorate
} from '../../../data/documentation/dataDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
	{ href: '#basic-usage', label: 'Basic Usage' },
	{ href: '#type-safety', label: 'Type Safety' },
	{ href: '#mutation-gotcha', label: 'Mutation Gotcha' },
	{ href: '#state-vs-decorate', label: 'State vs Decorate' }
];

export const ServerStateView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="server-state">
						State
					</h1>
					<p style={paragraphLargeStyle}>
						State is a global mutable object shared across your
						Elysia app. Values assigned via .state() are added to
						the store property and remain accessible in all route
						handlers.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="basic-usage"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use .state() to define values that will be available in
						the store object across all routes:
					</p>
					<PrismPlus
						codeString={stateBasicUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="type-safety"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Safety
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Elysia automatically infers types from your .state()
						calls. No explicit generics needed:
					</p>
					<PrismPlus
						codeString={stateTypeSafety}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="mutation-gotcha"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Mutation Gotcha
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When mutating state, avoid destructuring primitive
						values. Destructuring creates a copy and breaks the
						reference to the original store:
					</p>
					<PrismPlus
						codeString={stateMutationGotcha}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="state-vs-decorate"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						State vs Decorate
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use .state() for mutable primitives and .decorate() for
						objects, classes, and utilities:
					</p>
					<PrismPlus
						codeString={stateVsDecorate}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>.state()</strong>:
							Mutable primitives like counters, flags, and
							configuration values
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>.decorate()</strong>:
							Non-primitive objects like database connections,
							loggers, and service classes
						</li>
					</ul>
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
