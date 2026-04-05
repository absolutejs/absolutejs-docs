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

type AIOverviewSectionBlockProps = {
	section: 'architecture' | 'features' | 'providers' | 'hooks';
	themeSprings: ThemeSprings;
	isMobile: boolean;
};

const architectureLayers: Array<{
	code: string;
	description: string;
	number: string;
	title: string;
}> = [
	{
		code: '@absolutejs/absolute/ai',
		description:
			'The aiChat Elysia plugin creates WebSocket and REST endpoints, manages conversations, and orchestrates streaming with tool execution.',
		number: '1',
		title: 'Server Plugin'
	},
	{
		code: '@absolutejs/absolute/ai/anthropic',
		description:
			'Adapters for each AI service that normalize different APIs into a unified AsyncIterable<AIChunk> streaming interface.',
		number: '2',
		title: 'Provider Layer'
	},
	{
		code: '@absolutejs/absolute/react/ai',
		description:
			'Framework-specific hooks and composables that manage WebSocket connections, auto-reconnect, and message state with a reducer pattern.',
		number: '3',
		title: 'Client Layer'
	}
];

const featureItems: Array<{
	description: string;
	icon: 'brain' | 'comments' | 'globe' | 'image' | 'paperclip' | 'wrench';
	title: string;
}> = [
	{
		description:
			'Anthropic, OpenAI, Gemini, Ollama, and 7 more via OpenAI-compatible adapters',
		icon: 'globe',
		title: 'Multi-Provider'
	},
	{
		description:
			'JSON Schema inputs with async handlers. Multi-turn tool loops execute automatically.',
		icon: 'wrench',
		title: 'Tool Calling'
	},
	{
		description:
			'Stream reasoning tokens from Claude, o3, and DeepSeek R1 with configurable budgets',
		icon: 'brain',
		title: 'Extended Thinking'
	},
	{
		description:
			'Generate images with OpenAI and Gemini, streamed progressively to the client',
		icon: 'image',
		title: 'Image Generation'
	},
	{
		description:
			'Send images and PDFs as base64 alongside messages for vision and document analysis',
		icon: 'paperclip',
		title: 'File Attachments'
	},
	{
		description:
			'Server-side history with branching, listing, and deletion via REST endpoints',
		icon: 'comments',
		title: 'Conversations'
	}
];

const renderFeatureIcon = (
	icon: 'brain' | 'comments' | 'globe' | 'image' | 'paperclip' | 'wrench'
) => {
	if (icon === 'brain') {
		return <FaBrain />;
	}

	if (icon === 'comments') {
		return <FaComments />;
	}

	if (icon === 'globe') {
		return <FaGlobe />;
	}

	if (icon === 'image') {
		return <FaImage />;
	}

	if (icon === 'paperclip') {
		return <FaPaperclip />;
	}

	return <FaWrench />;
};

const providerRows: Array<[string, string, string]> = [
	['Anthropic', 'ai/anthropic', 'Claude Opus 4.6, Sonnet 4.6, Haiku 4.5'],
	['OpenAI', 'ai/openai', 'GPT-4o, GPT-5.x'],
	['OpenAI Responses', 'ai/openai-responses', 'o3, o4-mini, gpt-image-1.5'],
	['Gemini', 'ai/gemini', 'Gemini 3 Pro/Flash, 2.5 Pro/Flash'],
	['Ollama', 'ai/ollama', 'Any local model'],
	['xAI', 'ai/providers', 'Grok 4, Grok 3'],
	['DeepSeek', 'ai/providers', 'DeepSeek V3, R1'],
	['Mistral', 'ai/providers', 'Large, Small, Codestral'],
	['Meta', 'ai/providers', 'Llama 4 Maverick/Scout'],
	['Alibaba', 'ai/providers', 'Qwen Max/Plus/Turbo'],
	['Moonshot', 'ai/providers', 'Kimi K2']
];

const clientHookRows: Array<[string, string, string]> = [
	['React', 'react/ai', 'useAIStream() hook + AIStreamProvider'],
	['Vue', 'vue/ai', 'useAIStream() composable + provide/inject'],
	['Svelte', 'svelte/ai', 'createAIStream() with reactive getters'],
	['Angular', 'angular/ai', 'AIStreamService injectable with signals'],
	['Vanilla / HTML', 'ai/client', 'createAIStream() with subscribe callback']
];

const renderOverviewRows = (
	rows: Array<[string, string, string]>,
	themeSprings: ThemeSprings
) => (
	<tbody>
		{rows.map(([first, importPath, third]) => (
			<tr key={first}>
				<animated.td
					style={{
						...tableCellStyle(themeSprings),
						fontWeight: 600
					}}
				>
					{first}
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					<code style={tableCodeStyle}>{importPath}</code>
				</animated.td>
				<animated.td style={tableCellStyle(themeSprings)}>
					{third}
				</animated.td>
			</tr>
		))}
	</tbody>
);

const AIOverviewSectionBlock = ({
	section,
	themeSprings,
	isMobile
}: AIOverviewSectionBlockProps) => {
	if (section === 'architecture') {
		return (
			<>
				{architectureLayers.map((layer, index) => (
					<div key={layer.number}>
						<animated.div
							style={{
								...featureCardStyle(themeSprings),
								alignItems: 'flex-start',
								display: 'flex',
								gap: '1rem'
							}}
						>
							<div style={layerNumberStyle}>{layer.number}</div>
							<div>
								<div style={layerTitleStyle}>{layer.title}</div>
								<div style={layerDescStyle}>
									{layer.description}
								</div>
								<code
									style={{
										...tableCodeStyle,
										display: 'inline-block',
										marginTop: '0.5rem'
									}}
								>
									{layer.code}
								</code>
							</div>
						</animated.div>
						{index < architectureLayers.length - 1 && (
							<animated.div
								style={connectorStyle(themeSprings)}
							/>
						)}
					</div>
				))}
				<div style={{ marginTop: '1.5rem' }}>
					<PrismPlus
						codeString={aiImportPaths}
						language="typescript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</div>
			</>
		);
	}

	if (section === 'features') {
		return (
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
					marginTop: '0.5rem'
				}}
			>
				{featureItems.map((item) => (
					<animated.div
						key={item.title}
						style={featureCardStyle(themeSprings)}
					>
						<div style={featureIconStyle}>
							{renderFeatureIcon(item.icon)}
						</div>
						<div style={featureTitleStyle}>{item.title}</div>
						<div style={featureDescStyle}>{item.description}</div>
					</animated.div>
				))}
			</div>
		);
	}

	const rows = section === 'providers' ? providerRows : clientHookRows;
	const firstHeader = section === 'providers' ? 'Provider' : 'Framework';
	const thirdHeader = section === 'providers' ? 'Models' : 'API';

	return (
		<div style={tableContainerStyle}>
			<animated.table style={tableStyle(themeSprings)}>
				<thead>
					<tr>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							{firstHeader}
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							Import
						</animated.th>
						<animated.th style={tableHeaderStyle(themeSprings)}>
							{thirdHeader}
						</animated.th>
					</tr>
				</thead>
				{renderOverviewRows(rows, themeSprings)}
			</animated.table>
		</div>
	);
};

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
					<h1 id="ai-overview" style={h1Style(isMobileOrTablet)}>
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
						id="quick-start"
						level="h2"
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
						id="architecture"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Architecture
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The AI integration is organized in three layers that
						flow from server to client:
					</p>
					<AIOverviewSectionBlock
						isMobile={isMobile}
						section="architecture"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="features"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Features
					</AnchorHeading>
					<AIOverviewSectionBlock
						isMobile={isMobile}
						section="features"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="supported-providers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Supported Providers
					</AnchorHeading>
					<AIOverviewSectionBlock
						isMobile={isMobile}
						section="providers"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-hooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every framework gets an idiomatic binding with the same
						API surface:
					</p>
					<AIOverviewSectionBlock
						isMobile={isMobile}
						section="hooks"
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						On the client, a single hook connects to the WebSocket
						and manages all message state. Here is the React
						example. Vue, Svelte, and Angular have the same API:
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
