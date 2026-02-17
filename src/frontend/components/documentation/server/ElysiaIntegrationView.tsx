import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	elysiaDerive,
	elysiaGroups,
	elysiaPlugins,
	elysiaServer,
	elysiaTypeSafety
} from '../../../data/documentation/elysiaIntegrationDocsCode';
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#elysia-foundation', label: 'Elysia Foundation' },
	{ href: '#type-safety', label: 'End-to-End Type Safety' },
	{ href: '#plugins', label: 'Using Plugins' },
	{ href: '#derive', label: 'Derive & Dependency Injection' },
	{ href: '#groups', label: 'Route Groups' }
];

export const ElysiaIntegrationView = ({
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
					<h1
						style={h1Style(isMobileOrTablet)}
						id="elysia-integration"
					>
						Elysia Integration
					</h1>
					<p style={paragraphLargeStyle}>
						Your AbsoluteJS server IS an Elysia server. Everything
						you know about Elysia works here—plugins, middleware,
						type derivation, and route groups.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="elysia-foundation"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Built on Elysia
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						AbsoluteJS doesn&apos;t wrap or abstract Elysia—it
						enhances it. You write standard Elysia code with
						AbsoluteJS page handlers mixed in:
					</p>
					<PrismPlus
						codeString={elysiaServer}
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
						Elysia&apos;s revolutionary type system integrates
						seamlessly with AbsoluteJS. Schema validation, error
						handling, and data flow are all fully typed.
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
									Schema Validation
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Request bodies, params, and queries are
								validated AND typed automatically.
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
									Typed Errors
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Error responses have proper types—no more
								unknown error shapes.
							</p>
						</animated.div>
					</div>
					<PrismPlus
						codeString={elysiaTypeSafety}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Database → Handler
							</strong>
							: Query results maintain their types
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Handler → Response
							</strong>
							: Return types are inferred and validated
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Error → Client</strong>:
							Error shapes are typed, not unknown
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="plugins"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Using Plugins
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use any Elysia plugin alongside AbsoluteJS:
					</p>
					<PrismPlus
						codeString={elysiaPlugins}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="derive"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Derive &amp; Dependency Injection
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use Elysia&apos;s derive for dependency injection.
						Derived values are available in all subsequent handlers
						with full type inference:
					</p>
					<PrismPlus
						codeString={elysiaDerive}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="groups"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Route Groups
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Organize routes with groups. Each group can have its own
						middleware:
					</p>
					<PrismPlus
						codeString={elysiaGroups}
						language="typescript"
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
