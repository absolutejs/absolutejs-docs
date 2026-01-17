import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	dataFetchingError,
	dataFetchingServer,
	dataFetchingTyped,
	edenTreatySetup,
	edenTreatyServerExport,
	edenTreatyUsage,
	edenTreatyBenefits
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#server-side', label: 'Server-Side Fetching' },
	{ href: '#eden-treaty', label: 'Eden Treaty' },
	{ href: '#type-flow', label: 'Type Flow' },
	{ href: '#status-responses', label: 'Status Responses' }
];

export const DataFetchingView = ({
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
					<h1 style={h1Style} id="data-fetching">
						Data Fetching
					</h1>
					<p style={paragraphLargeStyle}>
						Server-side data fetching with complete type safety from
						database to component.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="server-side"
					>
						Server-Side Fetching
					</animated.h2>
					<p style={paragraphLargeStyle}>
						All data fetching happens on the server in your route
						handlers. Data is passed to components as type-safe
						props.
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
									No Client Waterfalls
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Data is fetched before rendering. No loading
								states for initial page load.
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
									Secure by Default
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Database queries run on the server. Credentials
								never reach the client.
							</p>
						</animated.div>
					</div>
					<PrismPlus
						codeString={dataFetchingServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="eden-treaty"
					>
						Eden Treaty
					</animated.h2>
					<p style={paragraphLargeStyle}>
						For client-side data fetching, AbsoluteJS uses Eden
						Treaty instead of raw fetch requests. Eden provides
						end-to-end type safety by deriving types directly from
						your Elysia server.
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
									Route Validation
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								TypeScript errors if you try to call a route
								that doesn&apos;t exist on your server.
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
									Request Body Typing
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								POST/PUT bodies are validated at compile time
								against your endpoint&apos;s schema.
							</p>
						</animated.div>
					</div>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Server Setup
					</animated.h3>
					<p style={paragraphSpacedStyle}>
						Export the server type from your Elysia app. This is
						what Eden uses to infer all routes and their types:
					</p>
					<PrismPlus
						codeString={edenTreatyServerExport}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Client Setup
					</animated.h3>
					<p style={paragraphSpacedStyle}>
						Create a treaty client using your server type:
					</p>
					<PrismPlus
						codeString={edenTreatySetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Usage
					</animated.h3>
					<p style={paragraphSpacedStyle}>
						Call your API endpoints with full type safety. Routes,
						params, and request bodies are all validated at compile
						time:
					</p>
					<PrismPlus
						codeString={edenTreatyUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Compile-Time Safety
					</animated.h3>
					<p style={paragraphSpacedStyle}>
						Eden Treaty catches API mistakes before your code runs:
					</p>
					<PrismPlus
						codeString={edenTreatyBenefits}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="type-flow"
					>
						End-to-End Type Flow
					</animated.h2>
					<p style={paragraphLargeStyle}>
						Types flow seamlessly from your database schema through
						your route handlers to your components. TypeScript
						catches mismatches at compile time.
					</p>
					<PrismPlus
						codeString={dataFetchingTyped}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Schema → Types</strong>:
							Drizzle/Prisma infer types from your schema
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Query → Results</strong>
							: Query results are typed based on your schema
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Props → Components
							</strong>
							: handleReactPageRequest validates prop types
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="status-responses"
					>
						Type-Safe Status Responses
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Status responses are also type-safe. Elysia&apos;s
						status() function returns typed responses for any HTTP
						status code:
					</p>
					<PrismPlus
						codeString={dataFetchingError}
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
