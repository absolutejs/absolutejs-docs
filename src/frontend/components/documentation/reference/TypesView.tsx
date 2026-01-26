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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
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
					<AnchorHeading
						level="h2"
						id="manifest"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Manifest Type
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="build-options"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Config
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="page-handlers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler Types
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="elysia"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Elysia Type Integration
					</AnchorHeading>
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
