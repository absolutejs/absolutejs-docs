import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	providerInterface,
	providerAnthropic,
	providerOpenAI,
	providerOpenAIResponses,
	providerGemini,
	providerOllama,
	providerCompatible,
	providerCustom,
	providerMulti
} from '../../../data/documentation/aiProvidersDocsCode';
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
	{ href: '#provider-interface', label: 'Provider Interface' },
	{ href: '#anthropic', label: 'Anthropic' },
	{ href: '#openai', label: 'OpenAI' },
	{ href: '#openai-responses', label: 'OpenAI Responses' },
	{ href: '#gemini', label: 'Gemini' },
	{ href: '#ollama', label: 'Ollama' },
	{ href: '#openai-compatible', label: 'OpenAI-Compatible' },
	{ href: '#custom-provider', label: 'Custom Provider' },
	{ href: '#multi-provider', label: 'Multi-Provider Setup' }
];

export const AIProvidersView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="ai-providers">
						AI Providers
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS ships adapters for 10+ AI providers. Each
						implements a unified streaming interface so you can
						switch providers without changing client code.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="provider-interface"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Provider Interface
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every provider returns an object with a single{' '}
						<code>stream</code> method that yields an{' '}
						<code>AsyncIterable&lt;AIChunk&gt;</code>. The plugin
						handles everything else — parsing, tool execution, and
						message routing.
					</p>
					<PrismPlus
						codeString={providerInterface}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="anthropic"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Anthropic
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Full support for Claude models including tool calling,
						vision, PDF input, and extended thinking with budget
						tokens.
					</p>
					<PrismPlus
						codeString={providerAnthropic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="openai"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OpenAI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Standard OpenAI chat completions API with tool calling
						and vision support.
					</p>
					<PrismPlus
						codeString={providerOpenAI}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="openai-responses"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OpenAI Responses
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Extended OpenAI provider using the Responses API.
						Supports reasoning models (o3, o4-mini) and image
						generation models.
					</p>
					<PrismPlus
						codeString={providerOpenAIResponses}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="gemini"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Gemini
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Google&apos;s Gemini API with tool calling, vision, PDF,
						reasoning, and image generation support.
					</p>
					<PrismPlus
						codeString={providerGemini}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="ollama"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Ollama
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Run local models for free with Ollama. Supports any
						model you&apos;ve pulled locally, with tool calling
						support for compatible models.
					</p>
					<PrismPlus
						codeString={providerOllama}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="openai-compatible"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OpenAI-Compatible Providers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Many providers implement the OpenAI API format.
						AbsoluteJS includes convenience wrappers with the
						correct base URLs pre-configured.
					</p>
					<PrismPlus
						codeString={providerCompatible}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="custom-provider"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Custom Provider
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>openaiCompatible()</code> directly for any
						provider that implements the OpenAI chat completions
						format.
					</p>
					<PrismPlus
						codeString={providerCustom}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="multi-provider"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Provider Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Route messages to different providers dynamically using
						a provider factory and custom message parser. The client
						prefixes each message with the target provider and
						model.
					</p>
					<PrismPlus
						codeString={providerMulti}
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
