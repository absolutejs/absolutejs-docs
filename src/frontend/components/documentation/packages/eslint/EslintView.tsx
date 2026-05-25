import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { IconType } from 'react-icons';
import {
	FaExclamationCircle,
	FaInfoCircle,
	FaLightbulb,
	FaWrench
} from 'react-icons/fa';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	categorySlug,
	eslintRules,
	eslintRulesByCategory
} from '../../../../data/documentation/eslintRulesData';
import {
	githubButtonStyle,
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	fixableColor,
	problemColor,
	suggestionColor,
	typeAwareColor
} from '../../../../styles/eslintStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';
import { EslintCategorySection } from './EslintCategorySection';
import { Badge } from './RuleBadges';

const installCommand = 'bun add --dev eslint-plugin-absolute';
const configExample = `// eslint.config.js
import absolute from 'eslint-plugin-absolute';

export default [
	{
		plugins: { absolute },
		rules: {
			'absolute/no-import-meta-path': 'error',
			'absolute/sort-keys-fixable': 'error',
			'absolute/no-explicit-return-type': 'error'
		}
	}
];`;

const legendListStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
	marginTop: '0.5rem'
};
const legendItemStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem'
};
const legendTextStyle: CSSProperties = {
	fontSize: '0.95rem'
};

type LegendItemProps = {
	color: string;
	description: string;
	icon: IconType;
	label: string;
};

const LegendItem = ({
	color,
	description,
	icon: Icon,
	label
}: LegendItemProps) => (
	<div style={legendItemStyle}>
		<Badge color={color} icon={<Icon />} label={label} />
		<span style={legendTextStyle}>{description}</span>
	</div>
);

export const EslintView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	const tocItems: TocItem[] = [
		{ href: '#installation', label: 'Installation' },
		{ href: '#legend', label: 'Legend' },
		...eslintRulesByCategory.map(({ category }) => ({
			href: `#${categorySlug(category)}`,
			label: category
		}))
	];

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
					<h1 id="eslint" style={h1Style(isMobileOrTablet)}>
						ESLint
					</h1>
					<p style={paragraphLargeStyle}>
						{`eslint-plugin-absolute ships ${eslintRules.length} rules that enforce AbsoluteJS conventions — SSR-safe paths, react-spring-friendly styling, leaner TypeScript, and consistent project structure. Each rule has its own page with examples, options, and guidance below.`}
					</p>
					<animated.a
						href="https://github.com/absolutejs/eslint-plugin-absolute"
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
						target="_blank"
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="installation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Install the plugin, register it under the{' '}
						<code>absolute</code> namespace, and enable the rules
						you want:
					</p>
					<PrismPlus
						codeString={installCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={configExample}
						language="javascript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="legend"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Legend
					</AnchorHeading>
					<div style={legendListStyle}>
						<LegendItem
							color={problemColor}
							description="Reports a likely bug or correctness issue."
							icon={FaExclamationCircle}
							label="Problem"
						/>
						<LegendItem
							color={suggestionColor}
							description="Reports a stylistic or best-practice improvement."
							icon={FaLightbulb}
							label="Suggestion"
						/>
						<LegendItem
							color={fixableColor}
							description="Reports can be repaired automatically with eslint --fix."
							icon={FaWrench}
							label="Fixable"
						/>
						<LegendItem
							color={typeAwareColor}
							description="Uses the TypeScript type checker; set parserOptions.project."
							icon={FaInfoCircle}
							label="Type-aware"
						/>
					</div>
				</section>

				{eslintRulesByCategory.map(({ category, rules }) => (
					<EslintCategorySection
						category={category}
						key={category}
						onNavigate={onNavigate}
						rules={rules}
						themeSprings={themeSprings}
					/>
				))}

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
