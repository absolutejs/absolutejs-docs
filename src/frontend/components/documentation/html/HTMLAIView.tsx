import { animated } from '@react-spring/web';
import { FaExchangeAlt } from 'react-icons/fa';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	vanillaCreateAIStream,
	vanillaCreateAIStreamReturn,
	vanillaRenderExample,
	vanillaAttachments
} from '../../../data/documentation/aiFrameworkDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableCodeStyle
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
	{ href: '#create-ai-stream', label: 'createAIStream' },
	{ href: '#return-type', label: 'Return Type' },
	{ href: '#rendering', label: 'Rendering Messages' },
	{ href: '#attachments', label: 'File Attachments' }
];

type ClientNoteProps = Pick<DocsViewProps, 'themeSprings'>;

const ClientNote = ({ themeSprings }: ClientNoteProps) => (
	<animated.div
		style={{
			...featureCardStyle(themeSprings),
			alignItems: 'center',
			display: 'flex',
			gap: '1rem',
			marginBottom: '1.5rem',
			padding: '1rem 1.25rem'
		}}
	>
		<FaExchangeAlt
			style={{
				flexShrink: 0,
				opacity: 0.6
			}}
		/>
		<div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
			The framework hooks (<code style={tableCodeStyle}>useAIStream</code>
			, <code style={tableCodeStyle}>createAIStream</code>,{' '}
			<code style={tableCodeStyle}>AIStreamService</code>) are thin
			wrappers around this same client. The only addition here is a{' '}
			<code style={tableCodeStyle}>subscribe</code> callback so you can
			react to state changes without framework reactivity.
		</div>
	</animated.div>
);

export const HTMLAIView = ({
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
					<h1 id="html-ai" style={h1Style(isMobileOrTablet)}>
						HTML / Vanilla AI
					</h1>
					<p style={paragraphLargeStyle}>
						The <code>createAIStream</code> function from{' '}
						<code>@absolutejs/absolute/ai/client</code> is the
						framework-agnostic AI client. It works with plain HTML,
						HTMX, or any environment without a framework: same API
						surface as the React, Vue, Svelte, and Angular bindings.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<ClientNote themeSprings={themeSprings} />

					<AnchorHeading
						id="create-ai-stream"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						createAIStream
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>createAIStream</code> with the WebSocket
						path. Use <code>subscribe()</code> to re-render when
						state changes, then read <code>messages</code>,{' '}
						<code>isStreaming</code>, and <code>error</code> as
						getter properties.
					</p>
					<PrismPlus
						codeString={vanillaCreateAIStream}
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
						codeString={vanillaCreateAIStreamReturn}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rendering"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rendering Messages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Build your own render loop inside the subscribe
						callback. Each message has <code>content</code>,{' '}
						<code>thinking</code>, and <code>toolCalls</code> you
						can display however you want.
					</p>
					<PrismPlus
						codeString={vanillaRenderExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="attachments"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						File Attachments
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Send images and PDFs alongside messages by converting
						files to base64 and passing them as the second argument
						to <code>send()</code>.
					</p>
					<PrismPlus
						codeString={vanillaAttachments}
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
