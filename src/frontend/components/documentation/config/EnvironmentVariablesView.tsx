import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	envRequired,
	envTypeSafe,
	envUsage
} from '../../../data/documentation/configDocsCode';
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
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#accessing-env', label: 'Accessing Variables' },
	{ href: '#required-vars', label: 'Required Variables' },
	{ href: '#type-safety', label: 'Fail-Fast Validation' }
];

const RequiredEnvList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'Connection string for your database',
				term: 'DATABASE_URL'
			},
			{
				description: 'Server host (default: localhost)',
				term: 'HOST'
			},
			{
				description: 'Server port (default: 3000)',
				term: 'PORT'
			},
			{
				description:
					'Callback URL for OAuth providers (e.g., http://localhost:3000/auth/callback)',
				term: 'OAUTH2_CALLBACK_URI'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const EnvironmentVariablesView = ({
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
					<h1
						id="environment-variables"
						style={h1Style(isMobileOrTablet)}
					>
						Environment Variables
					</h1>
					<p style={paragraphLargeStyle}>
						Safe environment variable access with getEnv from
						@absolutejs/absolute.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="accessing-env"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Accessing Environment Variables
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use getEnv to read environment variables from your .env
						file. It throws an error if the variable is missing,
						catching configuration errors at startup:
					</p>
					<PrismPlus
						codeString={envUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="required-vars"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Required Variables
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Common environment variables for AbsoluteJS
						applications:
					</p>
					<PrismPlus
						codeString={envRequired}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<RequiredEnvList themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="type-safety"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fail-Fast Validation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						getEnv validates environment variables at startup. If a
						variable is missing, your server fails immediately with
						a clear error message instead of crashing later at
						runtime:
					</p>
					<PrismPlus
						codeString={envTypeSafe}
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
