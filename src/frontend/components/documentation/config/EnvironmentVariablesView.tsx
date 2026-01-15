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
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#accessing-env', label: 'Accessing Variables' },
	{ href: '#required-vars', label: 'Required Variables' },
	{ href: '#type-safety', label: 'Fail-Fast Validation' }
];

export const EnvironmentVariablesView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="environment-variables">
						Environment Variables
					</h1>
					<p style={paragraphLargeStyle}>
						Safe environment variable access with getEnv from
						@absolutejs/absolute.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="accessing-env"
					>
						Accessing Environment Variables
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="required-vars"
					>
						Required Variables
					</animated.h2>
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
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="type-safety"
					>
						Fail-Fast Validation
					</animated.h2>
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
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
