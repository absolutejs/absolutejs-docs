import { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	aiToolsDefinition,
	aiToolsType,
	aiToolsUsage,
	aiToolsDynamic
} from '../../../data/documentation/aiDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { ExecutionFlowStep } from './ExecutionFlowStep';

const tocItems: TocItem[] = [
	{ href: '#defining-tools', label: 'Defining Tools' },
	{ href: '#tool-types', label: 'Tool Types' },
	{ href: '#using-tools', label: 'Using Tools' },
	{ href: '#dynamic-tools', label: 'Dynamic Tools' },
	{ href: '#execution-flow', label: 'Execution Flow' }
];

export const AIToolsView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	const steps: Array<{ num: string; text: ReactNode }> = [
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
					<h1 id="ai-tools" style={h1Style(isMobileOrTablet)}>
						AI Tools
					</h1>
					<p style={paragraphLargeStyle}>
						Give AI models the ability to call functions in your
						application. Define tools with a description, JSON
						schema and a handler function. The plugin manages
						multi-turn tool execution automatically.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="defining-tools"
						level="h2"
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
						id="tool-types"
						level="h2"
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
						id="using-tools"
						level="h2"
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
						id="dynamic-tools"
						level="h2"
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
						id="execution-flow"
						level="h2"
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
							<ExecutionFlowStep
								key={step.num}
								num={step.num}
								showConnector={i < steps.length - 1}
								text={step.text}
								themeSprings={themeSprings}
							/>
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
