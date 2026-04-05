import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	corsBasic,
	corsDynamicOrigin,
	corsInstall,
	corsPerGroup,
	corsRestrictedOrigins
} from '../../../data/documentation/elysiaCorsDocsCode';
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

const tocItems: TocItem[] = [
	{ href: '#install', label: 'Install' },
	{ href: '#basic', label: 'Basic Usage' },
	{ href: '#restricted-origins', label: 'Restricted Origins' },
	{ href: '#dynamic-origin', label: 'Dynamic Origin Logic' },
	{ href: '#per-group', label: 'Per-Group CORS' },
	{ href: '#references', label: 'References' }
];

export const ElysiaCorsView = ({
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
					<h1 id="elysia-cors" style={h1Style(isMobileOrTablet)}>
						CORS
					</h1>
					<p style={paragraphLargeStyle}>
						Use <code>@elysiajs/cors</code> for predictable
						cross-origin behavior in AbsoluteJS APIs.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="install"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Install
					</AnchorHeading>
					<PrismPlus
						codeString={corsInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="basic"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Usage
					</AnchorHeading>
					<PrismPlus
						codeString={corsBasic}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="restricted-origins"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Restricted Origins
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Restrict CORS to known frontends and explicitly list
						methods and headers:
					</p>
					<PrismPlus
						codeString={corsRestrictedOrigins}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dynamic-origin"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dynamic Origin Logic
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use a function for environment-aware origin rules:
					</p>
					<PrismPlus
						codeString={corsDynamicOrigin}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="per-group"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-Group CORS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Apply different CORS policies to separate route groups:
					</p>
					<PrismPlus
						codeString={corsPerGroup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="references"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						References
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<a
							href="https://elysiajs.com/plugins/cors"
							rel="noopener noreferrer"
							target="_blank"
						>
							Elysia CORS plugin docs
						</a>
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
