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
import { PrismPlus } from '../../utils/PrismPlus';
import { TypeSafetyFlowDiagram } from '../../diagrams/TypeSafetyFlowDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DataFetchingFeatureCard } from './DataFetchingFeatureCard';
import { DataFetchingTypeFlowList } from './DataFetchingTypeFlowList';

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
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="data-fetching" style={h1Style(isMobileOrTablet)}>
						Data Fetching
					</h1>
					<p style={paragraphLargeStyle}>
						Server-side data fetching with complete type safety from
						database to component.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server-side"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Server-Side Fetching
					</AnchorHeading>
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
						<DataFetchingFeatureCard
							themeSprings={themeSprings}
							title="No Client Waterfalls"
						>
							Data is fetched before rendering. No loading states
							for initial page load.
						</DataFetchingFeatureCard>
						<DataFetchingFeatureCard
							themeSprings={themeSprings}
							title="Secure by Default"
						>
							Database queries run on the server. Credentials
							never reach the client.
						</DataFetchingFeatureCard>
					</div>
					<PrismPlus
						codeString={dataFetchingServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="eden-treaty"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Eden Treaty
					</AnchorHeading>
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
						<DataFetchingFeatureCard
							themeSprings={themeSprings}
							title="Route Validation"
						>
							TypeScript errors if you try to call a route that
							doesn&apos;t exist on your server.
						</DataFetchingFeatureCard>
						<DataFetchingFeatureCard
							themeSprings={themeSprings}
							title="Request Body Typing"
						>
							POST/PUT bodies are validated at compile time
							against your endpoint&apos;s schema.
						</DataFetchingFeatureCard>
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
					<AnchorHeading
						id="type-flow"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						End-to-End Type Flow
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Types flow seamlessly from your database schema through
						your route handlers to your components. TypeScript
						catches mismatches at compile time.
					</p>
					<TypeSafetyFlowDiagram themeSprings={themeSprings} />
					<PrismPlus
						codeString={dataFetchingTyped}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DataFetchingTypeFlowList
						items={[
							{
								description:
									'Drizzle/Prisma infer types from your schema',
								label: 'Schema \u2192 Types'
							},
							{
								description:
									'Query results are typed based on your schema',
								label: 'Query \u2192 Results'
							},
							{
								description:
									'handleReactPageRequest validates prop types',
								label: 'Props \u2192 Components'
							}
						]}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="status-responses"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type-Safe Status Responses
					</AnchorHeading>
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
