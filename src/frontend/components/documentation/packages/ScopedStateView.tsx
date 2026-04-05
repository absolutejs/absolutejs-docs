import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	scopedStateAccess,
	scopedStateHtmxExample,
	scopedStateHtmxHtml,
	scopedStateInstallation,
	scopedStatePreserve,
	scopedStateReset,
	scopedStateSetup
} from '../../../data/documentation/scopedStateDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	githubButtonStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { ScopedStateFeatureCards } from './ScopedStateFeatureCards';
import { ScopedStateUserCards } from './ScopedStateUserCards';
import { ScopedStateHtmxList } from './ScopedStateHtmxList';
import { ScopedStateHowItWorksSteps } from './ScopedStateHowItWorksSteps';
import { ScopedStateHowItWorksList } from './ScopedStateHowItWorksList';

const tocItems: TocItem[] = [
	{ href: '#why-scoped-state', label: 'Why Scoped State?' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#getting-started', label: 'Getting Started' },
	{ href: '#accessing-state', label: 'Accessing State' },
	{ href: '#preserve-option', label: 'Preserve Option' },
	{ href: '#resetting-state', label: 'Resetting State' },
	{ href: '#htmx-integration', label: 'HTMX Integration' },
	{ href: '#how-it-works', label: 'How It Works' }
];

export const ScopedStateView = ({
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
					<h1 id="scoped-state" style={h1Style(isMobileOrTablet)}>
						Elysia Scoped State
					</h1>
					<p style={paragraphLargeStyle}>
						An Elysia plugin for per-user session state management.
						Store and retrieve data tied to individual users across
						requests with automatic session handling.
					</p>
					<animated.a
						href="https://github.com/alexkahndev/elysia-scoped-state"
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
						target="_blank"
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-scoped-state"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why Scoped State?
					</AnchorHeading>
					<ScopedStateFeatureCards
						isMobile={isMobile}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="installation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<PrismPlus
						codeString={scopedStateInstallation}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="getting-started"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Getting Started
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Initialize the plugin with your state schema. Each key
						defines a piece of state with an initial value:
					</p>
					<PrismPlus
						codeString={scopedStateSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="accessing-state"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Accessing State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Access your scoped state through the{' '}
						<code>scopedStore</code> context property. Each user
						sees and modifies only their own state:
					</p>
					<PrismPlus
						codeString={scopedStateAccess}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="preserve-option"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Preserve Option
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mark state as <code>preserve: true</code> to keep it
						across page refreshes and navigation. Without this,
						state resets when users refresh the page or navigate
						away. Useful for user preferences and session data that
						should persist:
					</p>
					<PrismPlus
						codeString={scopedStatePreserve}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="resetting-state"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Resetting State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>resetScopedStore()</code> to programmatically
						reset the user&apos;s state to initial values. This
						respects preserve flags by default. Pass{' '}
						<code>true</code> to ignore preserve flags and reset
						everything:
					</p>
					<PrismPlus
						codeString={scopedStateReset}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="htmx-integration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX Integration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Scoped state shines with HTMX. Each user&apos;s button
						clicks and interactions only affect their own count,
						cart, or other state:
					</p>
					<PrismPlus
						codeString={scopedStateHtmxExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						The HTML uses HTMX attributes to call these endpoints:
					</p>
					<PrismPlus
						codeString={scopedStateHtmxHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ScopedStateHtmxList />
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
						The plugin uses a secure session cookie to identify
						users and maintain their state server-side:
					</p>
					<ScopedStateHowItWorksSteps />
					<ScopedStateUserCards
						isMobile={isMobile}
						themeSprings={themeSprings}
					/>
					<ScopedStateHowItWorksList />
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
