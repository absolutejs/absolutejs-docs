import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	mcpFeedbackClient,
	mcpFeedbackElicitation,
	mcpFeedbackMultiInstance,
	mcpFeedbackTools
} from '../../../data/documentation/mcpSectionDocsCode';
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
import { Callout } from '../../utils/Callout';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const noop = () => undefined;

const tocItems: TocItem[] = [
	{ href: '#mcp-feedback-overview', label: 'Overview' },
	{ href: '#feedback-channel', label: 'The Feedback Channel' },
	{ href: '#feedback-tools', label: 'The Two Tools' },
	{ href: '#elicitation', label: 'Elicitation' },
	{ href: '#session-tradeoff', label: 'The Statefulness Trade-Off' },
	{ href: '#multi-instance', label: 'More Than One Instance' },
	{ href: '#consuming', label: 'Consuming a Server That Elicits' }
];

const feedbackToolRows: DocsTableCell[][] = [
	[
		{ code: 'report_problem' },
		{ code: 'problem' },
		{ code: 'expected, steps, where' },
		'Files a bug on the user’s behalf, in their words, as their account.'
	],
	[
		{ code: 'submit_feedback' },
		{ code: 'rating, reason' },
		{ code: 'tool' },
		'Records the user’s verdict — rating is ‘good’ or ‘bad’, reason stays in their own words.'
	]
];

const elicitAnswerRows: DocsTableCell[][] = [
	[
		{ code: 'accept' },
		'The user answered — the values arrive in content, shaped by requestedSchema.'
	],
	[{ code: 'decline' }, 'They said no.'],
	[{ code: 'cancel' }, 'They dismissed it (or never answered in time).'],
	[
		{ code: 'unsupported' },
		'This client can’t ask anyone — check canElicit and take another path.'
	]
];

const elicitFlowSteps: StepFlowStep[] = [
	{
		actor: 'Server',
		description:
			'A tools/call for a tool marked mayElicit answers over an SSE stream instead of a plain JSON body — the only way to send the user a question mid-call.',
		title: 'The call opens a stream'
	},
	{
		actor: 'Server',
		code: 'elicitation/create',
		description:
			'The question goes out on the stream: a message plus a flat requestedSchema any client can render as a form.',
		title: 'The question goes out'
	},
	{
		actor: 'Client',
		description:
			'The client shows the user the form and POSTs their answer back as a JSON-RPC response — a separate HTTP request, acknowledged with a bare 202.',
		title: 'The answer comes back'
	},
	{
		actor: 'Server',
		description:
			'The answer resolves the promise the tool call is awaiting; the tool finishes and its result closes the stream.',
		title: 'Two requests meet'
	}
];

export const McpFeedbackView = ({
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
						id="mcp-feedback-overview"
						style={h1Style(isMobileOrTablet)}
					>
						MCP Feedback & Elicitation
					</h1>
					<p style={paragraphLargeStyle}>
						A connected AI client renders <strong>no UI</strong> for
						your server — no button to press, no form to fill.{' '}
						<code>feedbackTools</code> gives the model a way to
						carry the user's "that was wrong" back to your team, and
						elicitation lets a tool ask the user a question mid-call
						and wait for the answer.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="feedback-channel"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Feedback Channel
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When a user says <em>"that was wrong"</em>, the only
						path back to you is the model relaying it. Every MCP
						server has this hole, and every one of them hand-rolls
						the same two tools. <code>feedbackTools()</code> is
						those two tools with the storage left to you — spread it
						into your registry and append{' '}
						<code>FEEDBACK_INSTRUCTIONS</code> to your server's{' '}
						<code>instructions</code>:
					</p>
					<PrismPlus
						codeString={mcpFeedbackTools}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="FEEDBACK_INSTRUCTIONS is the load-bearing half"
						variant="warning"
					>
						Without it a model treats a complaint as something to
						apologise for, and the signal dies where it was spoken.
						The sentence tells the model to call{' '}
						<code>submit_feedback</code> or{' '}
						<code>report_problem</code> instead of only apologising
						— and to log the good as well as the bad.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="feedback-tools"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Two Tools
					</AnchorHeading>
					<DocsTable
						columns={['Tool', 'Required', 'Optional', 'Purpose']}
						rows={feedbackToolRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Both store handlers — <code>reportProblem</code> and{' '}
						<code>submitFeedback</code> — return the sentence the
						model relays back to the user, so you control what it
						promises them: a ticket id, an SLA, a thank-you.
						Returning nothing falls back to a sensible default
						("Reported. Tell the user it's been filed with the
						team."). Missing input never throws — the tool answers
						with a prompt-back string the model can act on.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="elicitation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Elicitation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A tool that can't finish without something only the user
						knows can ask them and wait for the answer. Turn it on
						with <code>{'elicitation: { enabled: true }'}</code>,
						mark the tool <code>mayElicit</code>, and use the{' '}
						<code>{'{ canElicit, elicit }'}</code> context passed as
						the handler's second argument:
					</p>
					<PrismPlus
						codeString={mcpFeedbackElicitation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>requestedSchema</code> is a flat object of
						primitives — string, number, integer, boolean, enum —
						because the spec restricts it so any client can render a
						form. The answer's <code>action</code> is one of:
					</p>
					<DocsTable
						columns={['Action', 'Meaning']}
						rows={elicitAnswerRows}
						themeSprings={themeSprings}
					/>
					<Callout
						themeSprings={themeSprings}
						title="Two hard rules from the spec"
						variant="warning"
					>
						Never fabricate an answer for the user, and never elicit{' '}
						<strong>sensitive information</strong>. A client that
						never declared the capability gets{' '}
						<code>unsupported</code> immediately, so a handler that
						checks <code>canElicit</code> always has another path.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="session-tradeoff"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Statefulness Trade-Off
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Elicitation is the one MCP feature a stateless server
						cannot do: the question goes out on the SSE stream of an
						in-flight <code>tools/call</code>, and the client
						answers on a <strong>separate</strong> HTTP POST. Two
						requests have to meet, so the endpoint becomes
						session-stateful (<code>Mcp-Session-Id</code>).
					</p>
					<StepFlow
						steps={elicitFlowSteps}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A question waits <code>timeoutMs</code> (default 2
						minutes) before resolving as <code>cancel</code> — a
						user who walks away must not hold a tool call open
						forever. A POST carrying an unknown{' '}
						<code>Mcp-Session-Id</code> gets a <code>404</code>,
						which tells the client to re-initialize; a{' '}
						<code>DELETE</code> on the endpoint ends the session.
					</p>
					<Callout
						themeSprings={themeSprings}
						title="Off by default, and off means stateless"
						variant="success"
					>
						Leave <code>elicitation</code> off and nothing changes:
						the server stays stateless, <code>tools/call</code>{' '}
						keeps answering with a plain JSON body, and only tools
						marked <code>mayElicit</code> ever stream.
					</Callout>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-instance"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						More Than One Instance
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Behind one server the defaults handle it. Behind
						several, two different things break, and each has a
						seam: a shared <code>store</code> puts session state
						where every instance sees it, and a <code>bus</code>{' '}
						routes the user's answer to the instance whose promise
						is waiting.
					</p>
					<PrismPlus
						codeString={mcpFeedbackMultiInstance}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Supply neither and run a single instance (or pin
						sessions). Supply both and elicitation is safe behind a
						load balancer with <strong>no sticky routing</strong> —
						there is a test for exactly that: instance A asks, the
						answer lands on B, the bus carries it back, and A's call
						finishes.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="consuming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Consuming a Server That Elicits
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createMcpClient()</code> is the other half — a
						streamable-HTTP client for calling other MCP servers.
						Pass <code>onElicit</code> and the client declares the
						elicitation capability, answers the server's questions
						as they arrive on the stream, and posts the verdict
						back:
					</p>
					<PrismPlus
						codeString={mcpFeedbackClient}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A host with no handler declines on the user's behalf —
						the client never answers <em>for</em> them. Safety
						wrapping around untrusted remote tools — namespacing,
						injection defense, approval gating — is the host's job.
					</p>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
