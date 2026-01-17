import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	buildOnce,
	hydrationExample,
	propsInjection,
	renderToStream
} from '../../../data/documentation/ssrModelDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { primaryColor } from '../../../styles/colors';

const tocItems: TocItem[] = [
	{ href: '#how-ssr-works', label: 'How SSR Works' },
	{ href: '#build-once', label: 'Build Once, Serve Many' },
	{ href: '#streaming', label: 'Streaming Responses' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#props-serialization', label: 'Props Serialization' }
];

export const SSRModelView = ({
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
					<h1 style={h1Style} id="ssr-model">
						SSR Model
					</h1>
					<p style={paragraphLargeStyle}>
						Understanding how AbsoluteJS handles server-side
						rendering across multiple frameworks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="how-ssr-works"
					>
						How SSR Works in AbsoluteJS
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS provides a unified SSR model that works the
						same way regardless of which frontend framework you use.
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						{[
							{
								step: 1,
								title: 'Request',
								description:
									'A request comes in to your Elysia server'
							},
							{
								step: 2,
								title: 'Build',
								description:
									'Server runs build() once at startup to create the manifest'
							},
							{
								step: 3,
								title: 'Route',
								description:
									'Route handler calls the page handler (handleReactPageRequest, etc.)'
							},
							{
								step: 4,
								title: 'Render',
								description:
									'Page handler renders your component to an HTML stream'
							},
							{
								step: 5,
								title: 'Stream',
								description:
									'HTML is sent to the client with hydration scripts'
							},
							{
								step: 6,
								title: 'Hydrate',
								description:
									'Client hydrates the page, making it fully interactive'
							}
						].map((item) => (
							<animated.div
								key={item.step}
								style={{
									...featureCardStyle(themeSprings),
									alignItems: 'center',
									display: 'flex',
									gap: '1rem'
								}}
							>
								<div
									style={{
										alignItems: 'center',
										background: `linear-gradient(135deg, ${primaryColor} 0%, rgba(180,248,200,1) 100%)`,
										borderRadius: '50%',
										color: '#0B0B0B',
										display: 'flex',
										flexShrink: 0,
										fontSize: '1rem',
										fontWeight: 700,
										height: '2rem',
										justifyContent: 'center',
										width: '2rem'
									}}
								>
									{item.step}
								</div>
								<div>
									<strong style={strongStyle}>
										{item.title}
									</strong>
									<span style={{ marginLeft: '0.5rem' }}>
										— {item.description}
									</span>
								</div>
							</animated.div>
						))}
					</div>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-once"
					>
						Build Once, Serve Many
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The build() function runs once when your server starts.
						It scans your frontend directories, bundles all
						components, and returns a manifest:
					</p>
					<PrismPlus
						codeString={buildOnce}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1.5rem' }}>
						This manifest is then used by page handlers to locate
						the correct assets for each route.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="streaming"
					>
						Streaming Responses
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses streaming to send HTML progressively to
						the browser. This means users see content faster, even
						for complex pages:
					</p>
					<PrismPlus
						codeString={renderToStream}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="hydration"
					>
						Hydration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						After the HTML arrives, the client-side JavaScript
						&quot;hydrates&quot; the page, attaching event handlers
						and making it interactive:
					</p>
					<PrismPlus
						codeString={hydrationExample}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="props-serialization"
					>
						Props Serialization
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Props passed to your components are automatically
						serialized and made available on both server and client:
					</p>
					<PrismPlus
						codeString={propsInjection}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1.5rem' }}>
						Props must be serializable (no functions, circular
						references, or class instances).
					</p>
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
