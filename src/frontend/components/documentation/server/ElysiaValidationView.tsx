import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	validationBasics,
	validationGuard,
	validationParamsAndQuery,
	validationTypedResponses
} from '../../../data/documentation/elysiaValidationDocsCode';
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
	{ href: '#basics', label: 'Basics' },
	{ href: '#params-query', label: 'Params & Query' },
	{ href: '#responses', label: 'Typed Responses' },
	{ href: '#guard', label: 'Guarded Validation' },
	{ href: '#references', label: 'References' }
];

export const ElysiaValidationView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
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
					<h1
						id="elysia-validation"
						style={h1Style(isMobileOrTablet)}
					>
						Validation
					</h1>
					<p style={paragraphLargeStyle}>
						Use Elysia schemas directly for request validation and
						end-to-end inferred types.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basics"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basics
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Validate request bodies where the route is defined:
					</p>
					<PrismPlus
						codeString={validationBasics}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="params-query"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Params &amp; Query
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define params and query schema together to avoid untyped
						request parsing:
					</p>
					<PrismPlus
						codeString={validationParamsAndQuery}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="responses"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Typed Responses
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Attach response schemas for status-specific return
						shapes:
					</p>
					<PrismPlus
						codeString={validationTypedResponses}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="guard"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Guarded Validation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>guard</code> to enforce shared constraints for
						route groups:
					</p>
					<PrismPlus
						codeString={validationGuard}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="references"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						References
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<a
							href="https://elysiajs.com/essential/validation"
							rel="noopener noreferrer"
							target="_blank"
						>
							Elysia Validation docs
						</a>
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
