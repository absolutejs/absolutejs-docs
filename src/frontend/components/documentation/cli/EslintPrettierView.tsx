import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	eslintCommand,
	prettierCommand
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
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#eslint', label: 'ESLint' },
	{ href: '#prettier', label: 'Prettier' }
];

export const EslintPrettierView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="eslint-prettier">
						ESLint & Prettier
					</h1>
					<p style={paragraphLargeStyle}>
						Run linting and formatting with built-in caching for
						fast repeat runs.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="eslint"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						absolute eslint
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Runs ESLint across your project with caching enabled.
						Subsequent runs only check changed files.
					</p>
					<PrismPlus
						codeString={eslintCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Uses the ESLint config from your project root
						</li>
						<li style={listItemStyle}>
							Cache is stored in{' '}
							<code>.absolutejs/eslint-cache</code>
						</li>
						<li style={listItemStyle}>
							All additional arguments are passed through to
							ESLint
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="prettier"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						absolute prettier
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Runs Prettier with caching. Use <code>--write</code> to
						auto-fix formatting.
					</p>
					<PrismPlus
						codeString={prettierCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							Uses the Prettier config from your project root
						</li>
						<li style={listItemStyle}>
							Cache is stored in{' '}
							<code>.absolutejs/prettier.cache.json</code>
						</li>
						<li style={listItemStyle}>
							All additional arguments are passed through to
							Prettier
						</li>
					</ul>
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
