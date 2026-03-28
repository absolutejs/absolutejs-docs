import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	mkcertCommand,
	mkcertConfig
} from '../../../data/documentation/cliUtilityDocsCode';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

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
					<h1 style={h1Style(isMobileOrTablet)} id="mkcert">
						absolute mkcert
					</h1>
					<p style={paragraphLargeStyle}>
						Setup trusted HTTPS certificates for local development.
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
						level="h2"
						id="why-https"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why HTTPS in Dev
					</AnchorHeading>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: '1fr 1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									HTTP/2 Multiplexing
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Faster HMR on pages with many imports — HTTP/2
								sends all modules over a single connection.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Secure Context APIs
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Test APIs that require HTTPS like service
								workers, Web Crypto, and geolocation.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Production Parity
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Catch mixed-content issues and CORS problems
								before they hit production.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="prerequisites"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prerequisites
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Install mkcert on your system before running the
						command:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>macOS</strong>:{' '}
							<code>brew install mkcert</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Linux</strong>:{' '}
							<code>sudo apt install mkcert</code> or{' '}
							<code>yay -S mkcert</code>
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Windows</strong>:{' '}
							<code>choco install mkcert</code>
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="enabling-https"
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
