import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	reactTypeSafetyServer,
	reactTypeSafetyTypes
} from '../../../data/documentation/reactDocsCode';
import {
	svelteTypeSafetyServer,
	svelteTypeSafetyTypes
} from '../../../data/documentation/svelteDocsCode';
import { vueTypeSafety } from '../../../data/documentation/vueDocsCode';
import { angularTypeSafety } from '../../../data/documentation/angularDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { TypeSafetyFeatureCard } from './TypeSafetyFeatureCard';
import { TypeSafetyFlowList } from './TypeSafetyFlowList';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#schema-to-types', label: 'Schema to Types' },
	{ href: '#react', label: 'React' },
	{ href: '#svelte', label: 'Svelte' },
	{ href: '#vue', label: 'Vue' },
	{ href: '#angular', label: 'Angular' },
	{ href: '#propsof-utilities', label: 'PropsOf Utilities' }
];

export const TypeSafetyView = ({
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
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="type-safety" style={h1Style(isMobileOrTablet)}>
						End-to-End Type Safety
					</h1>
					<p style={paragraphLargeStyle}>
						Types flow from your database schema through server
						handlers to frontend components across all frameworks :
						React, Svelte, Vue, and Angular.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS enforces a single type flow across your
						entire stack: Database Schema → Inferred Types → Server
						Handler → Page Component. Every step is validated by
						TypeScript at compile time.
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
						<TypeSafetyFeatureCard
							themeSprings={themeSprings}
							title="Compile-Time Errors"
						>
							Missing or incorrectly typed props are caught by
							TypeScript before your code runs. No runtime
							surprises.
						</TypeSafetyFeatureCard>
						<TypeSafetyFeatureCard
							themeSprings={themeSprings}
							title="Refactoring Safety"
						>
							Rename a field in your database schema and
							TypeScript shows every place that needs updating
							across your entire application.
						</TypeSafetyFeatureCard>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="schema-to-types"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Schema to Types
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define your database schema with Drizzle and infer
						TypeScript types directly from your table definitions.
						These types are the single source of truth for your
						entire application.
					</p>
					<PrismPlus
						codeString={reactTypeSafetyTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<TypeSafetyFlowList
						items={[
							{
								description:
									' : the type you get back when querying rows',
								label: '$inferSelect'
							},
							{
								description:
									' : the type required when inserting new rows (optional fields with defaults are made optional)',
								label: '$inferInsert'
							}
						]}
						style={{ marginTop: '1.5rem' }}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>handleReactPageRequest</code> with a generic{' '}
						<code>Props</code> parameter to enforce type safety at
						the server boundary. TypeScript ensures the props you
						pass match the component's expected types exactly.
					</p>
					<PrismPlus
						codeString={reactTypeSafetyServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<TypeSafetyFlowList
						items={[
							{
								description:
									': Drizzle infers types directly from your table definitions',
								label: 'Schema → Types'
							},
							{
								description:
									': Your inferred types flow into route handlers and props',
								label: 'Types → Server'
							},
							{
								description:
									': React receives correctly typed props on both server and client',
								label: 'Props → Component'
							}
						]}
						style={{ marginTop: '1.5rem' }}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Svelte components enjoy the same end-to-end type safety
						as React. Define your database schema and infer types
						directly from your table definitions using Drizzle:
					</p>
					<PrismPlus
						codeString={svelteTypeSafetyTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Use those types in your server handlers to ensure props
						match your components:
					</p>
					<PrismPlus
						codeString={svelteTypeSafetyServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<TypeSafetyFlowList
						items={[
							{
								description:
									': Drizzle infers types directly from your table definitions',
								label: 'Schema → Types'
							},
							{
								description:
									': Your inferred types flow into route handlers and props',
								label: 'Types → Server'
							},
							{
								description:
									': Svelte receives correctly typed props on both server and client',
								label: 'Props → Component'
							}
						]}
						style={{ marginTop: '1.5rem' }}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="vue"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vue
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Vue 3's <code>defineProps{'<T>'}</code> with TypeScript
						generics provides complete compile-time type checking.
						The generic parameter is validated against the props
						passed from the server, so errors are caught before your
						code runs.
					</p>
					<PrismPlus
						codeString={vueTypeSafety}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<TypeSafetyFlowList
						items={[
							{
								description:
									': Props types are validated end-to-end',
								label: 'Server to client'
							},
							{
								description:
									': Derived values maintain type safety',
								label: 'Computed properties'
							},
							{
								description:
									': Vue Language Server validates template bindings',
								label: 'Template type checking'
							}
						]}
						style={{ marginTop: '1.5rem' }}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="angular"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Angular
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular components receive typed props via{' '}
						<code>@Input()</code> decorators. The page handler acts
						as a typed provider, injecting props into the component
						at render time. TypeScript catches mismatched props at
						compile time.
					</p>
					<PrismPlus
						codeString={angularTypeSafety}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="propsof-utilities"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						PropsOf Utilities
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS provides helper types that extract the prop
						types from any component. Use these when you need to
						reference a component's props without importing the type
						definition directly.
					</p>
					<TypeSafetyFlowList
						items={[
							{
								description:
									' extracts props from a React component type. Works with function components and class components.',
								label: <>ReactPropsOf{'<C>'}</>
							},
							{
								description:
									' extracts props from a compiled Svelte component. Infers the exported prop types from the component module.',
								label: <>SveltePropsOf{'<C>'}</>
							},
							{
								description:
									' extracts props from a Vue component defined with defineProps. Works with both runtime and type-only prop declarations.',
								label: <>VuePropsOf{'<C>'}</>
							}
						]}
					/>
					<p style={paragraphSpacedStyle}>
						These utility types are especially useful when building
						shared layouts or higher-order components that need to
						pass through props without manually duplicating type
						definitions.
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
