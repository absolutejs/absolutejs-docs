import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiToolsDefinition,
	aiToolsType,
	aiToolsUsage,
	aiToolsDynamic
} from '../../../data/documentation/aiDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
	{ href: '#defining-tools', label: 'Defining Tools' },
	{ href: '#tool-types', label: 'Tool Types' },
	{ href: '#using-tools', label: 'Using Tools' },
	{ href: '#dynamic-tools', label: 'Dynamic Tools' },
	{ href: '#execution-flow', label: 'Execution Flow' }
];

const stepCircleStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
	borderRadius: '50%',
	color: '#fff',
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.75rem',
	fontWeight: 700,
	height: '1.75rem',
	justifyContent: 'center',
	width: '1.75rem'
};

const stepTextStyle: CSSProperties = {
	fontSize: '0.95rem',
	lineHeight: 1.5
};

const connectorStyle = (themeSprings: ThemeSprings) => ({
	borderLeft: themeSprings.themeTertiary.to((c: string) => `2px dashed ${c}`),
	height: '1rem',
	marginLeft: '0.85rem',
	width: '0'
});

export const AIToolsView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	const steps = [
		{
			num: '1',
			text: (
				<>
					Model returns a tool call with a{' '}
					<code style={tableCodeStyle}>name</code> and{' '}
					<code style={tableCodeStyle}>input</code>
				</>
			)
		},
		{
			num: '2',
			text: (
				<>
					Plugin sends{' '}
					<code style={tableCodeStyle}>
						tool_status: &apos;running&apos;
					</code>{' '}
					to the client
				</>
			)
		},
		{
			num: '3',
			text: 'Handler executes and returns a string result'
		},
		{
			num: '4',
			text: (
				<>
					Plugin sends{' '}
					<code style={tableCodeStyle}>
						tool_status: &apos;complete&apos;
					</code>{' '}
					with the result
				</>
			)
		},
		{
			num: '5',
			text: 'Tool result is fed back to the model for the next turn'
		},
		{
			num: '6',
			text: 'Model calls more tools or generates a final text response'
		}
	];

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
					<h1 style={h1Style(isMobileOrTablet)} id="ai-tools">
						AI Tools
					</h1>
					<p style={paragraphLargeStyle}>
						Give AI models the ability to call functions in your
						application. Define tools with a description, JSON
						Schema input, and a handler function — the plugin
						manages multi-turn tool execution automatically.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="defining-tools"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Defining Tools
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A tool has three parts: a description the model reads to
						decide when to use it, a JSON Schema describing the
						expected input, and a handler function that executes the
						tool and returns a string result.
					</p>
					<PrismPlus
						codeString={aiToolsDefinition}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="tool-types"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tool Types
					</AnchorHeading>
					<PrismPlus
						codeString={aiToolsType}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="using-tools"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Using Tools
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass your tool map to the <code>aiChat</code> plugin.
						The plugin sends tool definitions to the model and
						executes handlers when the model calls them.
					</p>
					<PrismPlus
						codeString={aiToolsUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="dynamic-tools"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dynamic Tools
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Not all models support tool calling. Pass a function
						instead of a static map to provide tools only when the
						model supports them.
					</p>
					<PrismPlus
						codeString={aiToolsDynamic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="execution-flow"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Execution Flow
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When a model decides to call a tool, the plugin handles
						the full execution loop:
					</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '0.5rem'
						}}
					>
						{steps.map((step, i) => (
							<div key={step.num}>
								<animated.div
									style={{
										...featureCardStyle(themeSprings),
										alignItems: 'center',
										display: 'flex',
										gap: '0.75rem',
										padding: '0.75rem 1rem'
									}}
								>
									<div style={stepCircleStyle}>
										{step.num}
									</div>
									<div style={stepTextStyle}>{step.text}</div>
								</animated.div>
								{i < steps.length - 1 && (
									<animated.div
										style={connectorStyle(themeSprings)}
									/>
								)}
							</div>
						))}
					</div>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.25rem'
						}}
					>
						The <code>maxTurns</code> option (default: 10) prevents
						infinite loops. The plugin also detects repeated
						identical tool calls and stops early.
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
