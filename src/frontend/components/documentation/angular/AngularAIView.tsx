import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	angularAIStreamService,
	angularAIStreamReturn
} from '../../../data/documentation/aiFrameworkDocsCode';
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
	{ href: '#ai-stream-service', label: 'AIStreamService' },
	{ href: '#return-type', label: 'Return Type' }
];

export const AngularAIView = ({
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
					<h1 id="angular-ai" style={h1Style(isMobileOrTablet)}>
						Angular AI
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>AIStreamService</code> injectable connects
						Angular components to the AI streaming WebSocket using
						Angular signals. Import from{' '}
						<code>@absolutejs/absolute/angular/ai</code>.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ai-stream-service"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AIStreamService
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Inject <code>AIStreamService</code> and call{' '}
						<code>connect()</code> with the WebSocket path. It
						returns an object with Angular computed signals for
						messages, streaming state, and errors. The service is
						provided in root and manages connection lifecycle :
						calling <code>connect()</code> with the same path reuses
						the existing connection.
					</p>
					<PrismPlus
						codeString={angularAIStreamService}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="return-type"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Return Type
					</AnchorHeading>
					<PrismPlus
						codeString={angularAIStreamReturn}
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
