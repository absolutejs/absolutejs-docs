import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	buildOptionsType,
	elysiaIntegration,
	manifestType,
	pageHandlerTypes
} from '../../../data/documentation/typesDocsCode';
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
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#manifest', label: 'Manifest' },
	{ href: '#build-options', label: 'Build Config' },
	{ href: '#page-handlers', label: 'Page Handlers' },
	{ href: '#elysia', label: 'Elysia Integration' }
];

export const TypesView = ({
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
					<h1 style={h1Style} id="types">
						Types Reference
					</h1>
					<p style={paragraphLargeStyle}>
						Complete TypeScript type definitions for the AbsoluteJS
						API. All types are fully exported for use in your
						applications.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="manifest"
					>
						Manifest Type
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The Manifest type represents the build output mapping
						entry names to their bundled asset paths. Currently this
						is a simple Record&lt;string, string&gt;. Type-safe
						manifest keys that validate against your actual entry
						points are in development.
					</p>
					<PrismPlus
						codeString={manifestType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-options"
					>
						Build Config
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Configuration options for the build() function:
					</p>
					<PrismPlus
						codeString={buildOptionsType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="page-handlers"
					>
						Page Handler Types
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Type signatures for all framework-specific page
						handlers. Each handler is generic over the props type,
						ensuring type safety from server to client:
					</p>
					<PrismPlus
						codeString={pageHandlerTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="elysia"
					>
						Elysia Type Integration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS leverages Elysia&apos;s powerful type system
						for end-to-end type safety. Route parameters, request
						bodies, and error responses are all fully typed:
					</p>
					<PrismPlus
						codeString={elysiaIntegration}
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

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
