import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	apiEndpoints,
	authExample,
	drizzleSchema,
	formHandling,
	fullStackReactApp,
	fullStackReactComponents,
	fullStackReactPageTwo
} from '../../../data/documentation/examplesDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
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
	{ href: '#database-schema', label: 'Database Schema' },
	{ href: '#react-components', label: 'React Components' },
	{ href: '#server', label: 'Server' },
	{ href: '#authentication', label: 'Authentication' },
	{ href: '#api-endpoints', label: 'REST API' },
	{ href: '#form-handling', label: 'Form Handling' }
];

export const ExamplesRecipesView = ({
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
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="examples-recipes">
						Examples & Recipes
					</h1>
					<p style={paragraphLargeStyle}>
						Complete examples and common patterns for building
						full-stack applications with AbsoluteJS.
					</p>
				</animated.div>

				<div
					style={{
						display: 'grid',
						gap: '1rem',
						gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
						marginBottom: '2rem'
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
								Full-Stack Patterns
							</strong>
						</p>
						<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
							Complete examples showing database to UI type flow
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
								Copy & Paste Ready
							</strong>
						</p>
						<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
							Working code you can adapt for your projects
						</p>
					</animated.div>
				</div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="database-schema"
					>
						1. Database Schema
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Types originate in your database schema. Define tables
						and export inferred types that flow through your entire
						application:
					</p>
					<PrismPlus
						codeString={drizzleSchema}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="react-components"
					>
						2. React Components
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Import types from the schema file. Components use the
						same types as your database—no redefinition needed:
					</p>
					<PrismPlus
						codeString={fullStackReactComponents}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={fullStackReactPageTwo}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="server"
					>
						3. Server
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Import everything and bring it together. The server
						queries the database and passes typed data to
						components:
					</p>
					<PrismPlus
						codeString={fullStackReactApp}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="authentication"
					>
						Authentication Pattern
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Use Elysia&apos;s derive to extract user from session
						cookies and make it available to all route handlers with
						proper typing:
					</p>
					<PrismPlus
						codeString={authExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="api-endpoints"
					>
						REST API Endpoints
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Build a complete REST API alongside your pages. Request
						bodies are validated with Elysia&apos;s type system, and
						responses are automatically typed:
					</p>
					<PrismPlus
						codeString={apiEndpoints}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="form-handling"
					>
						Form Handling
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Handle form submissions server-side with validation. Use
						POST handlers with typed body schemas for type-safe form
						processing:
					</p>
					<PrismPlus
						codeString={formHandling}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
