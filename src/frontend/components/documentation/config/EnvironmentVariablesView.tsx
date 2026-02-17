import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	envRequired,
	envTypeSafe,
	envUsage
} from '../../../data/documentation/configDocsCode';
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
	{ href: '#accessing-env', label: 'Accessing Variables' },
	{ href: '#required-vars', label: 'Required Variables' },
	{ href: '#type-safety', label: 'Fail-Fast Validation' }
];

export const EnvironmentVariablesView = ({
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
						id="environment-variables"
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
						level="h2"
						id="accessing-env"
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
						level="h2"
						id="required-vars"
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
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>DATABASE_URL</strong>:
							Connection string for your database
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>HOST</strong>: Server
							host (default: localhost)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>PORT</strong>: Server
							port (default: 3000)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								OAUTH2_CALLBACK_URI
							</strong>
							: Callback URL for OAuth providers (e.g.,
							http://localhost:3000/auth/callback)
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="type-safety"
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
