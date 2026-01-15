import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	tailwindBuild,
	tailwindConfig,
	tailwindCss
} from '../../../data/documentation/configDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#tailwind-config', label: 'Tailwind Config' },
	{ href: '#css-file', label: 'CSS File' }
];

export const TailwindCSSView = ({
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
					<h1 style={h1Style} id="tailwind-css">
						Tailwind CSS
					</h1>
					<p style={paragraphLargeStyle}>
						Integrate Tailwind CSS with AbsoluteJS for utility-first
						styling.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-config"
					>
						Build Configuration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Enable Tailwind CSS by providing the config and CSS
						paths in your build:
					</p>
					<PrismPlus
						codeString={tailwindBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="tailwind-config"
					>
						Tailwind Config
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Create a standard Tailwind configuration file:
					</p>
					<PrismPlus
						codeString={tailwindConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="css-file"
					>
						CSS File
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Create your CSS entry point with Tailwind directives:
					</p>
					<PrismPlus
						codeString={tailwindCss}
						language="css"
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
