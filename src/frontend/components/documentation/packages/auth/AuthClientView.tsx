import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	clientUsage,
	reactHooks
} from '../../../../data/documentation/authClientDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#client', label: 'createAuthClient' },
	{ href: '#react', label: 'React hooks' }
];

export const AuthClientView = ({
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
					<h1 id="auth-client" style={h1Style(isMobileOrTablet)}>
						Client SDK &amp; Hooks
					</h1>
					<p style={paragraphLargeStyle}>
						Primitives, not components. A framework-agnostic client (
						<code>createAuthClient</code>) over every endpoint plus thin
						React hooks (<code>./react</code>) — your forms, your
						styling, your decisions. HTMX is the special case (declarative
						server fragments); everything else gets the client + a hook /
						composable.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						createAuthClient
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every method returns <code>{'{ data, error }'}</code> so you
						branch without try/catch. Routes are configurable (override
						the ones you mounted on a custom path) and{' '}
						<code>fetch</code> is injectable for tests. Same-origin
						cookies are sent by default.
					</p>
					<PrismPlus
						codeString={clientUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React hooks
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>@absolutejs/auth/react</code> sub-export ships
						thin hooks over the client:{' '}
						<code>{'{ isPending, data, error, mutate, reset }'}</code>{' '}
						(mutations) or{' '}
						<code>{'{ isPending, data, error, refetch, revoke }'}</code>{' '}
						(<code>useSessions</code>). React is an optional peer
						dependency — install it if you use the hooks. Vue
						composables, Solid signals, and Svelte stores will land as
						sibling sub-exports wrapping the same client.
					</p>
					<PrismPlus
						codeString={reactHooks}
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
