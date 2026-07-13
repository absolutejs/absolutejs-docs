import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	tunnelClientConfig,
	tunnelClientEnv,
	tunnelDevOutput,
	tunnelRelayCommand,
	tunnelRelayDeploy,
	tunnelSecurity,
	tunnelWebhookExample,
	tunnelWhy
} from '../../../data/documentation/tunnelDocsCode';
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
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';
import { TerminalFrame } from '../../utils/TerminalFrame';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tunnelFlowSteps: StepFlowStep[] = [
	{
		actor: 'Internet',
		description:
			'Twilio, Stripe, GitHub — any webhook or WebSocket — calls your public URL over HTTPS / WSS.',
		title: 'A provider hits the relay'
	},
	{
		actor: 'Relay',
		description:
			'The only public piece. It holds one control WebSocket that your dev machine opened (outbound, so no inbound firewall rules needed) and serializes every public request over that socket. WebSocket connections are multiplexed over the same control socket by id.',
		title: 'The relay forwards the request down the control socket'
	},
	{
		actor: 'Your laptop',
		code: 'bun run dev → localhost:3000',
		description:
			'The dev client replays the request against your local server and streams the response back up through the relay to the caller.',
		title: 'Your dev server answers'
	}
];

const tocItems: TocItem[] = [
	{ href: '#why', label: 'Why a Tunnel' },
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#deploy-relay', label: 'Deploy the Relay' },
	{ href: '#relay-command', label: 'The Relay Command' },
	{ href: '#dev-client', label: 'Point Your Dev Server At It' },
	{ href: '#dev-output', label: 'Running Dev' },
	{ href: '#webhooks', label: 'Webhook Example' },
	{ href: '#security', label: 'Security' }
];

export const TunnelView = ({
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
					<h1 id="dev-tunnel" style={h1Style(isMobileOrTablet)}>
						Dev Tunnel
					</h1>
					<p style={paragraphLargeStyle}>
						Receive public webhooks and WebSockets on your local dev
						server without deploying — through a self-hosted reverse
						tunnel relay. Pure Bun, no third-party tunnel service.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why a Tunnel
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Providers like Twilio, Stripe, GitHub, and OAuth
						callbacks need a public HTTPS URL to reach your code.
						Your dev machine is behind NAT, so the choice is usually
						redeploy-on-every-change or a third-party tunnel
						service. AbsoluteJS gives you a third option you fully
						own.
					</p>
					<PrismPlus
						codeString={tunnelWhy}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="how-it-works"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						You run a small <code>relay</code> on any always-on host
						with a public URL. Your dev server dials <em>out</em> to
						the relay over a single token-gated control WebSocket;
						the relay replays public requests down that socket and
						streams responses back. WebSocket connections are
						multiplexed over the same control socket by id.
					</p>
					<StepFlow
						steps={tunnelFlowSteps}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="deploy-relay"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Deploy the Relay
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The relay is a one-line app. Deploy it once to any host
						with a public URL (DigitalOcean App Platform shown):
					</p>
					<PrismPlus
						codeString={tunnelRelayDeploy}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="relay-command"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Relay Command
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute tunnel-relay</code> is a built-in CLI
						command — there is no app code to write. It reads its
						configuration from the environment:
					</p>
					<PrismPlus
						codeString={tunnelRelayCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev-client"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Point Your Dev Server At It
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In the consuming app, configure the tunnel under{' '}
						<code>dev</code> in <code>absolute.config.ts</code>:
					</p>
					<PrismPlus
						codeString={tunnelClientConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Or configure it entirely from the environment:
					</p>
					<PrismPlus
						codeString={tunnelClientEnv}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev-output"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Running Dev
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When a tunnel is configured, <code>bun run dev</code>{' '}
						prints a <code>Public:</code> URL alongside the local
						one. It routes straight to your local server — use it as
						any webhook provider&apos;s callback URL and every
						request hits your live code with full HMR, breakpoints,
						and logs:
					</p>
					<TerminalFrame
						command={tunnelDevOutput.command}
						output={tunnelDevOutput.output}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="webhooks"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Webhook Example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Point any provider's callback at the public URL. Both
						HTTP webhooks and provider WebSockets (such as Twilio
						Media Streams) flow through to your local handlers:
					</p>
					<PrismPlus
						codeString={tunnelWebhookExample}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="security"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Security
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The relay is gated by a shared token and is for
						development ingress only:
					</p>
					<PrismPlus
						codeString={tunnelSecurity}
						language="typescript"
						showLineNumbers={false}
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
