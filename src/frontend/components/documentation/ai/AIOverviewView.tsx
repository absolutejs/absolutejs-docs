import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import {
	FaGlobe,
	FaWrench,
	FaBrain,
	FaImage,
	FaPaperclip,
	FaComments
} from 'react-icons/fa';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiOverviewQuickStart,
	aiOverviewClientReact,
	aiImportPaths
} from '../../../data/documentation/aiDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
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
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#architecture', label: 'Architecture' },
	{ href: '#features', label: 'Features' },
	{ href: '#supported-providers', label: 'Supported Providers' },
	{ href: '#client-hooks', label: 'Client Hooks' },
	{ href: '#client-usage', label: 'Client Usage' }
];

const layerNumberStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
	borderRadius: '50%',
	color: '#fff',
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.875rem',
	fontWeight: 700,
	height: '2rem',
	justifyContent: 'center',
	width: '2rem'
};

const layerTitleStyle: CSSProperties = {
	fontSize: '1.1rem',
	fontWeight: 600,
	marginBottom: '0.25rem'
};

const layerDescStyle: CSSProperties = {
	fontSize: '0.95rem',
	lineHeight: 1.5,
	opacity: 0.85
};

const featureIconStyle: CSSProperties = {
	fontSize: '1.5rem',
	marginBottom: '0.5rem'
};

const featureTitleStyle: CSSProperties = {
	fontSize: '1rem',
	fontWeight: 600,
	marginBottom: '0.35rem'
};

const featureDescStyle: CSSProperties = {
	fontSize: '0.9rem',
	lineHeight: 1.5,
	opacity: 0.8
};

const connectorStyle = (themeSprings: ThemeSprings) => ({
	borderLeft: themeSprings.themeTertiary.to((c: string) => `2px dashed ${c}`),
	height: '1.5rem',
	marginLeft: '1rem',
	width: '0'
});

export const AIOverviewView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="ai-overview">
						AI Integration
					</h1>
					<p style={paragraphLargeStyle}>
						Built-in AI streaming with multi-provider support, tool
						calling, extended thinking, and framework-specific
						hooks. Add a real-time AI chat to your app with a single
						Elysia plugin and a one-line hook.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="quick-start"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add AI streaming to your server with the{' '}
						<code>aiChat</code> plugin. It creates a WebSocket
						endpoint and REST routes for conversation management
						automatically.
					</p>
					<PrismPlus
						codeString={aiOverviewQuickStart}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="architecture"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Architecture
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The AI integration is organized in three layers that
						flow from server to client:
					</p>

					<animated.div
						style={{
							...featureCardStyle(themeSprings),
							alignItems: 'flex-start',
							display: 'flex',
							gap: '1rem'
						}}
					>
						<div style={layerNumberStyle}>1</div>
						<div>
							<div style={layerTitleStyle}>Server Plugin</div>
							<div style={layerDescStyle}>
								The <code>aiChat</code> Elysia plugin creates
								WebSocket and REST endpoints, manages
								conversations, and orchestrates streaming with
								tool execution.
							</div>
							<code
								style={{
									...tableCodeStyle,
									display: 'inline-block',
									marginTop: '0.5rem'
								}}
							>
								@absolutejs/absolute/ai
							</code>
						</div>
					</animated.div>

					<animated.div style={connectorStyle(themeSprings)} />

					<animated.div
						style={{
							...featureCardStyle(themeSprings),
							alignItems: 'flex-start',
							display: 'flex',
							gap: '1rem'
						}}
					>
						<div style={layerNumberStyle}>2</div>
						<div>
							<div style={layerTitleStyle}>Provider Layer</div>
							<div style={layerDescStyle}>
								Adapters for each AI service that normalize
								different APIs into a unified{' '}
								<code>AsyncIterable&lt;AIChunk&gt;</code>{' '}
								streaming interface.
							</div>
							<code
								style={{
									...tableCodeStyle,
									display: 'inline-block',
									marginTop: '0.5rem'
								}}
							>
								@absolutejs/absolute/ai/anthropic
							</code>
						</div>
					</animated.div>

					<animated.div style={connectorStyle(themeSprings)} />

					<animated.div
						style={{
							...featureCardStyle(themeSprings),
							alignItems: 'flex-start',
							display: 'flex',
							gap: '1rem'
						}}
					>
						<div style={layerNumberStyle}>3</div>
						<div>
							<div style={layerTitleStyle}>Client Layer</div>
							<div style={layerDescStyle}>
								Framework-specific hooks and composables that
								manage WebSocket connections, auto-reconnect,
								and message state with a reducer pattern.
							</div>
							<code
								style={{
									...tableCodeStyle,
									display: 'inline-block',
									marginTop: '0.5rem'
								}}
							>
								@absolutejs/absolute/react/ai
							</code>
						</div>
					</animated.div>

					<div style={{ marginTop: '1.5rem' }}>
						<PrismPlus
							codeString={aiImportPaths}
							language="typescript"
							showLineNumbers={false}
							themeSprings={themeSprings}
						/>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="features"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Features
					</AnchorHeading>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginTop: '0.5rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaGlobe />
							</div>
							<div style={featureTitleStyle}>Multi-Provider</div>
							<div style={featureDescStyle}>
								Anthropic, OpenAI, Gemini, Ollama, and 7 more
								via OpenAI-compatible adapters
							</div>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaWrench />
							</div>
							<div style={featureTitleStyle}>Tool Calling</div>
							<div style={featureDescStyle}>
								JSON Schema inputs with async handlers.
								Multi-turn tool loops execute automatically.
							</div>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaBrain />
							</div>
							<div style={featureTitleStyle}>
								Extended Thinking
							</div>
							<div style={featureDescStyle}>
								Stream reasoning tokens from Claude, o3, and
								DeepSeek R1 with configurable budgets
							</div>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaImage />
							</div>
							<div style={featureTitleStyle}>
								Image Generation
							</div>
							<div style={featureDescStyle}>
								Generate images with OpenAI and Gemini, streamed
								progressively to the client
							</div>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaPaperclip />
							</div>
							<div style={featureTitleStyle}>
								File Attachments
							</div>
							<div style={featureDescStyle}>
								Send images and PDFs as base64 alongside
								messages for vision and document analysis
							</div>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<div style={featureIconStyle}>
								<FaComments />
							</div>
							<div style={featureTitleStyle}>Conversations</div>
							<div style={featureDescStyle}>
								Server-side history with branching, listing, and
								deletion via REST endpoints
							</div>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="supported-providers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Supported Providers
					</AnchorHeading>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Provider
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Import
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Models
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{[
									[
										'Anthropic',
										'ai/anthropic',
										'Claude Opus 4.6, Sonnet 4.6, Haiku 4.5'
									],
									['OpenAI', 'ai/openai', 'GPT-4o, GPT-5.x'],
									[
										'OpenAI Responses',
										'ai/openai-responses',
										'o3, o4-mini, gpt-image-1.5'
									],
									[
										'Gemini',
										'ai/gemini',
										'Gemini 3 Pro/Flash, 2.5 Pro/Flash'
									],
									['Ollama', 'ai/ollama', 'Any local model'],
									['xAI', 'ai/providers', 'Grok 4, Grok 3'],
									[
										'DeepSeek',
										'ai/providers',
										'DeepSeek V3, R1'
									],
									[
										'Mistral',
										'ai/providers',
										'Large, Small, Codestral'
									],
									[
										'Meta',
										'ai/providers',
										'Llama 4 Maverick/Scout'
									],
									[
										'Alibaba',
										'ai/providers',
										'Qwen Max/Plus/Turbo'
									],
									['Moonshot', 'ai/providers', 'Kimi K2']
								].map(([provider, imp, models]) => (
									<tr key={provider}>
										<animated.td
											style={{
												...tableCellStyle(themeSprings),
												fontWeight: 600
											}}
										>
											{provider}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{imp}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{models}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="client-hooks"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every framework gets an idiomatic binding with the same
						API surface:
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Framework
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Import
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										API
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{[
									[
										'React',
										'react/ai',
										'useAIStream() hook + AIStreamProvider'
									],
									[
										'Vue',
										'vue/ai',
										'useAIStream() composable + provide/inject'
									],
									[
										'Svelte',
										'svelte/ai',
										'createAIStream() with reactive getters'
									],
									[
										'Angular',
										'angular/ai',
										'AIStreamService injectable with signals'
									],
									[
										'Vanilla / HTML',
										'ai/client',
										'createAIStream() with subscribe callback'
									]
								].map(([fw, imp, api]) => (
									<tr key={fw}>
										<animated.td
											style={{
												...tableCellStyle(themeSprings),
												fontWeight: 600
											}}
										>
											{fw}
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{imp}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{api}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="client-usage"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						On the client, a single hook connects to the WebSocket
						and manages all message state. Here is the React example
						— Vue, Svelte, and Angular have the same API:
					</p>
					<PrismPlus
						codeString={aiOverviewClientReact}
						language="tsx"
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
