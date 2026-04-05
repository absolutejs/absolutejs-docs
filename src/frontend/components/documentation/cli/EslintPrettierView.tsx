import type { ReactNode } from 'react';
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
	{ href: '#eslint', label: 'ESLint' },
	{ href: '#prettier', label: 'Prettier' }
];

type CliFeatureListProps = {
	items: Array<{
		description: string;
		highlight?: ReactNode;
	}>;
};

const CliFeatureList = ({ items }: CliFeatureListProps) => (
	<ul style={listStyle}>
		{items.map((item, index) => (
			<li key={index} style={listItemStyle}>
				{item.highlight ? (
					<>
						{item.description} <code>{item.highlight}</code>
					</>
				) : (
					item.description
				)}
			</li>
		))}
	</ul>
);

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
					<h1 id="eslint-prettier" style={h1Style(isMobileOrTablet)}>
						ESLint & Prettier
					</h1>
					<p style={paragraphLargeStyle}>
						Run linting and formatting with built-in caching for
						fast repeat runs.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="eslint"
						level="h2"
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
					<CliFeatureList
						items={[
							{
								description:
									'Uses the ESLint config from your project root'
							},
							{
								description: 'Cache is stored in',
								highlight: '.absolutejs/eslint-cache'
							},
							{
								description:
									'All additional arguments are passed through to ESLint'
							}
						]}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prettier"
						level="h2"
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
					<CliFeatureList
						items={[
							{
								description:
									'Uses the Prettier config from your project root'
							},
							{
								description: 'Cache is stored in',
								highlight: '.absolutejs/prettier.cache.json'
							},
							{
								description:
									'All additional arguments are passed through to Prettier'
							}
						]}
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
