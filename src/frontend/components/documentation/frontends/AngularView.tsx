import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularBuild,
	angularClientScripts,
	angularComponent,
	angularHandler,
	angularHydration,
	angularMultiFramework,
	angularTypeSafety,
	angularViewTransitions
} from '../../../data/documentation/angularDocsCode';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#components', label: 'Components' },
	{ href: '#type-safety', label: 'Type Safety' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#view-transitions', label: 'View Transitions HMR' },
	{ href: '#client-scripts', label: 'Client Scripts' },
	{ href: '#multi-framework', label: 'Multi-Framework' }
];

export const AngularView = ({
	currentPageId,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	themeSprings,
	tocOpen
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
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="angular">
						Angular
					</h1>
					<p style={paragraphLargeStyle}>
						Build server-rendered Angular applications with full
						type safety, zoneless change detection, and automatic
						hydration.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="build-config"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add Angular to your build by specifying the directory
						containing your Angular components in{' '}
						<code>absolute.config.ts</code>:
					</p>
					<PrismPlus
						codeString={angularBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="page-handler"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>handleAngularPageRequest</code> from{' '}
						<code>@absolutejs/absolute/angular</code> to render your
						components. Pass a page importer function, compiled
						paths, an optional head tag, and optional props:
					</p>
					<PrismPlus
						codeString={angularHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="components"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Components
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Angular components in AbsoluteJS use standalone
						components with <code>@Input()</code> decorators for
						props. Each page exports a factory function that the
						page handler uses for rendering.
					</p>
					<p style={paragraphSpacedStyle}>
						Props passed from your server are available via{' '}
						<code>@Input()</code> decorators:
					</p>
					<PrismPlus
						codeString={angularComponent}
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
						End-to-End Type Safety
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides complete type safety from your
						server handlers through to your Angular components.
						TypeScript catches mismatched props at compile time.
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Compile-Time Errors
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Missing or incorrectly typed props are caught by
								TypeScript before your code runs.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Zoneless by Default
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Uses{' '}
								<code>provideZonelessChangeDetection()</code>{' '}
								for optimal performance without Zone.js.
							</p>
						</animated.div>
					</div>
					<PrismPlus
						codeString={angularTypeSafety}
						language="typescript"
						showLineNumbers={true}
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
						Hydration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically handles Angular SSR and
						hydration. AOT compilation is used for production
						builds, while JIT compilation enables fast HMR during
						development:
					</p>
					<PrismPlus
						codeString={angularHydration}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="view-transitions"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						View Transitions HMR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						CSS-only changes are hot-swapped instantly without
						touching the app. For template and logic changes,
						AbsoluteJS uses the browser&apos;s native View
						Transitions API. Instead of the page going blank while
						the app re-bootstraps with the new module, the browser
						holds a screenshot and crossfades to the new content
						once it&apos;s ready:
					</p>
					<PrismPlus
						codeString={angularViewTransitions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="client-scripts"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Scripts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For adding dynamic client-side behavior after hydration,
						use the <code>registerClientScript</code> utility:
					</p>
					<PrismPlus
						codeString={angularClientScripts}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="multi-framework"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular works alongside other frameworks in the same
						AbsoluteJS application. Each route can use a different
						framework:
					</p>
					<PrismPlus
						codeString={angularMultiFramework}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								AOT in Production
							</strong>
							: Angular Linker plugin removes the compiler from
							browser bundles
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>JIT in Dev</strong>:
							Faster rebuilds during development with HMR support
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								DOM State Preservation
							</strong>
							: Form inputs and scroll positions are preserved
							during HMR
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
