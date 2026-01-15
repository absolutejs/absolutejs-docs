import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	htmxApiEndpoint,
	htmxBuild,
	htmxExample,
	htmxHandler
} from '../../../data/documentation/htmlHtmxDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#example', label: 'Example' },
	{ href: '#api-endpoints', label: 'API Endpoints' }
];

export const HTMXView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

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
					<h1 style={h1Style} id="htmx">
						HTMX
					</h1>
					<p style={paragraphLargeStyle}>
						Build interactive applications with HTMX&apos;s
						HTML-over-the-wire approach.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-config"
					>
						Build Configuration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Add HTMX to your build by specifying the directory
						containing your HTMX pages:
					</p>
					<PrismPlus
						codeString={htmxBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="page-handler"
					>
						Page Handler
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Pass the path to the built HTML file to{' '}
						<code>handleHTMXPageRequest</code>:
					</p>
					<PrismPlus
						codeString={htmxHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="example"
					>
						Example
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						HTMX pages use HTML attributes to trigger server
						requests and update the DOM:
					</p>
					<PrismPlus
						codeString={htmxExample}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="api-endpoints"
					>
						API Endpoints
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						HTMX requests are handled by regular Elysia endpoints
						that return HTML fragments:
					</p>
					<PrismPlus
						codeString={htmxApiEndpoint}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Return HTML</strong>:
							Endpoints return HTML strings that HTMX injects into
							the page
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Type-safe data</strong>:
							Your data fetching is still fully typed even though
							the response is HTML
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								No JSON serialization
							</strong>
							: Skip the JSON/parse cycle for simpler data flow
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
