import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	mkcertCommand,
	mkcertConfig
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { PrerequisitesList } from './PrerequisitesList';
import { WhyHttpsCards } from './WhyHttpsCards';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#why-https', label: 'Why HTTPS in Dev' },
	{ href: '#prerequisites', label: 'Prerequisites' },
	{ href: '#enabling-https', label: 'Enabling HTTPS' }
];

export const MkcertView = ({
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
					<h1 id="mkcert" style={h1Style(isMobileOrTablet)}>
						absolute mkcert
					</h1>
					<p style={paragraphLargeStyle}>
						Setup trusted HTTPS certificates for local development.
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
					<p style={paragraphSpacedStyle}>
						Creates locally-trusted development certificates so your
						browser accepts HTTPS on localhost without warnings.
					</p>
					<PrismPlus
						codeString={mkcertCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-https"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why HTTPS in Dev
					</AnchorHeading>
					<WhyHttpsCards themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prerequisites"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prerequisites
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Install mkcert on your system before running the
						command:
					</p>
					<PrerequisitesList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enabling-https"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enabling HTTPS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						After generating certificates, enable HTTPS in your
						config:
					</p>
					<PrismPlus
						codeString={mkcertConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The dev server will now use HTTPS with HTTP/2. Your
						browser will trust the certificate automatically.
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
