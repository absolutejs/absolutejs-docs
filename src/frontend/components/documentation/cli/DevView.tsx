import { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	devCommand,
	devOutput,
	devConfigExample,
	devtoolsJsonResponse,
	devtoolsPluginExample
} from '../../../data/documentation/cliDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
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
import { DevCliOptions } from './DevCliOptions';
import { DevFeaturesList } from './DevFeaturesList';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#https-in-dev', label: 'HTTPS in Dev' },
	{ href: '#chrome-devtools', label: 'Chrome DevTools' },
	{ href: '#dev-config', label: 'Dev Config' },
	{ href: '#plugin-usage', label: 'Plugin Usage' },
	{ href: '#options', label: 'Options' },
	{ href: '#features', label: 'Features' }
];

type DevListItem = {
	content: ReactNode;
	id: string;
};

type DevSectionListProps = {
	items: DevListItem[];
};

const DevSectionList = ({ items }: DevSectionListProps) => (
	<ul style={listStyle}>
		{items.map((item) => (
			<li key={item.id} style={listItemStyle}>
				{item.content}
			</li>
		))}
	</ul>
);

const chromeDevtoolsSteps: DevListItem[] = [
	{
		content: 'Open Chrome DevTools on a running AbsoluteJS app.',
		id: 'open-devtools'
	},
	{
		content: 'Chrome requests the well-known devtools JSON route.',
		id: 'request-json'
	},
	{
		content: (
			<>
				In <code>Sources -&gt; Workspaces</code>, Chrome offers a{' '}
				<code>Connect</code> action for the project root.
			</>
		),
		id: 'connect-workspace'
	},
	{
		content: (
			<>
				On Windows-hosted Chrome with WSL or Docker Desktop, AbsoluteJS
				rewrites Linux paths to UNC form so the workspace can mount
				correctly.
			</>
		),
		id: 'windows-paths'
	}
];

const devConfigOptions: DevListItem[] = [
	{
		content: (
			<>
				<code>https</code>: enables HTTPS in dev mode and allows the dev
				server to use local trusted certs and HTTP/2.
			</>
		),
		id: 'https'
	},
	{
		content: (
			<>
				<code>projectRoot</code>: overrides the path reported to Chrome
				DevTools.
			</>
		),
		id: 'project-root'
	},
	{
		content: (
			<>
				<code>uuid</code>: uses a fixed workspace UUID instead of
				generating one.
			</>
		),
		id: 'uuid'
	},
	{
		content: (
			<>
				<code>uuidCachePath</code>: changes where the generated UUID is
				persisted between dev restarts.
			</>
		),
		id: 'uuid-cache-path'
	},
	{
		content: (
			<>
				<code>normalizeForWindowsContainer</code>: rewrites Linux paths
				to UNC form for Chrome on Windows in WSL or Docker Desktop
				environments.
			</>
		),
		id: 'normalize-for-windows-container'
	}
];

export const DevView = ({
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
					<h1 id="dev" style={h1Style(isMobileOrTablet)}>
						absolute dev
					</h1>
					<p style={paragraphLargeStyle}>
						Start the development server with hot module replacement
						across all frameworks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<PrismPlus
						codeString={devCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={devOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="https-in-dev"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTTPS in Dev
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS can run the dev server over HTTPS with local
						trusted certificates and HTTP/2 when you enable{' '}
						<code>dev.https</code>.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Use it to test secure-context browser APIs like
							service workers, Web Crypto, and geolocation.
						</li>
						<li style={listItemStyle}>
							It improves production parity and helps catch
							mixed-content issues earlier.
						</li>
						<li style={listItemStyle}>
							With mkcert configured, localhost runs without
							browser certificate warnings.
						</li>
					</ul>
					<p style={{ ...paragraphSpacedStyle, marginBottom: 0 }}>
						For certificate setup and mkcert prerequisites, see the{' '}
						<code>absolute mkcert</code> documentation.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="chrome-devtools"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Chrome DevTools Workspaces
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In development, AbsoluteJS automatically serves
						<code>
							/.well-known/appspecific/com.chrome.devtools.json
						</code>{' '}
						on localhost so Chrome DevTools can detect your project
						and offer a workspace connection.
					</p>
					<p style={paragraphSpacedStyle}>
						This route is dev-only. It is not served in production.
						Chrome uses it to map network files back to your local
						project root and keeps the mapping stable with a
						persisted UUID.
					</p>
					<DevSectionList items={chromeDevtoolsSteps} />
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Example response:
					</p>
					<PrismPlus
						codeString={devtoolsJsonResponse}
						language="json"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dev Config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses a dedicated <code>dev</code> config
						namespace for development-server-only behavior. Today it
						includes HTTPS and Chrome DevTools workspace settings.
					</p>
					<p style={paragraphSpacedStyle}>
						The DevTools feature works automatically under{' '}
						<code>absolute dev</code>, but you can override its
						behavior with <code>dev.devtools</code>. HTTPS is also
						configured here through <code>dev.https</code>.
					</p>
					<PrismPlus
						codeString={devConfigExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DevSectionList items={devConfigOptions} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="plugin-usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Plugin Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						If you are composing a custom Elysia server instead of
						relying on the built-in dev pipeline, AbsoluteJS also
						exposes the feature as a public plugin.
					</p>
					<PrismPlus
						codeString={devtoolsPluginExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginBottom: 0 }}>
						Use the plugin when you want the same Chrome DevTools
						workspace behavior in a custom server setup without
						depending on <code>prepare()</code> internals.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Options
					</AnchorHeading>
					<DevCliOptions />
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
					<DevFeaturesList />
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
