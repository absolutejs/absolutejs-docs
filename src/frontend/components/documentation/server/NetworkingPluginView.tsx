import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	networkingBasic,
	networkingEnv,
	networkingExplained,
	networkingFull,
	networkingHost,
	networkingLogging
} from '../../../data/documentation/networkingPluginDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
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
	{ href: '#usage', label: 'Usage' },
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#environment', label: 'Environment Variables' },
	{ href: '#host-flag', label: 'The --host Flag' },
	{ href: '#logging', label: 'Startup Logging' },
	{ href: '#full-example', label: 'Full Example' }
];

export const NetworkingPluginView = ({
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
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1
						style={h1Style(isMobileOrTablet)}
						id="networking-plugin"
					>
						Networking Plugin
					</h1>
					<p style={paragraphLargeStyle}>
						Start your server with automatic environment
						configuration and network exposure via the --host flag.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="usage"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add the networking plugin at the end of your Elysia
						chain with <code>.use(networking)</code>:
					</p>
					<PrismPlus
						codeString={networkingBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The networking plugin replaces <code>.listen()</code>.
						It reads your environment configuration and starts the
						server automatically.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When you <code>.use(networking)</code>, the plugin
						handles server startup:
					</p>
					<PrismPlus
						codeString={networkingExplained}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Reads environment
							</strong>
							: Gets HOST and PORT from your .env file
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Checks --host flag
							</strong>
							: Binds to 0.0.0.0 if --host is passed
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Starts server</strong>:
							Calls .listen() internally with the correct
							configuration
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Logs info</strong>:
							Outputs the server URL and network address
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="environment"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Environment Variables
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The plugin reads HOST and PORT from your environment:
					</p>
					<PrismPlus
						codeString={networkingEnv}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="host-flag"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The --host Flag
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use the --host flag to expose your server to the
						network:
					</p>
					<PrismPlus
						codeString={networkingHost}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="logging"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Startup Logging
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The plugin logs connection information when the server
						starts:
					</p>
					<PrismPlus
						codeString={networkingLogging}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="full-example"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Full Example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A complete server setup with the networking plugin:
					</p>
					<PrismPlus
						codeString={networkingFull}
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
