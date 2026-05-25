import { animated } from '@react-spring/web';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { DocsViewProps } from '../../../../../types/springTypes';
import {
	getEslintRule,
	ruleConfigCode
} from '../../../../data/documentation/eslintRulesData';
import {
	githubButtonStyle,
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import { exampleLabelStyle } from '../../../../styles/eslintStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { RichText } from '../../../utils/RichText';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';
import { RuleBadges } from './RuleBadges';
import { RuleExample } from './RuleExample';
import { RuleRelated, RuleResources } from './RuleLinks';
import { RuleOptionsTable } from './RuleOptionsTable';

export const EslintRuleView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const rule = getEslintRule(currentPageId.replace('eslint-', ''));

	if (!rule) {
		return null;
	}

	const showDesktopToc = !isMobileOrTablet;
	const hasOptions = rule.options.length > 0;

	const tocItems: TocItem[] = [
		{ href: '#rule-details', label: 'Rule Details' },
		{ href: '#examples', label: 'Examples' },
		{ href: '#options', label: hasOptions ? 'Options' : 'Configuration' },
		...(rule.related.length > 0
			? [{ href: '#related-rules', label: 'Related Rules' }]
			: []),
		{ href: '#when-not-to-use', label: 'When Not To Use It' },
		{ href: '#resources', label: 'Resources' }
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
					<h1 id={rule.id} style={h1Style(isMobileOrTablet)}>
						{`absolute/${rule.name}`}
					</h1>
					<p style={paragraphLargeStyle}>
						<RichText text={rule.summary} />
					</p>
					<RuleBadges rule={rule} />
					<animated.a
						href={`https://github.com/absolutejs/eslint-plugin-absolute/tree/main/src/rules`}
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
						target="_blank"
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="rule-details"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rule Details
					</AnchorHeading>
					{rule.details.map((paragraph) => (
						<p key={paragraph} style={paragraphSpacedStyle}>
							<RichText text={paragraph} />
						</p>
					))}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="examples"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Examples
					</AnchorHeading>
					<div style={exampleLabelStyle('incorrect')}>
						<FaTimes />
						Incorrect
					</div>
					{rule.incorrect.map((example) => (
						<RuleExample
							example={example}
							key={example.code}
							kind="incorrect"
							language={rule.language}
							themeSprings={themeSprings}
						/>
					))}
					<div style={exampleLabelStyle('correct')}>
						<FaCheck />
						Correct
					</div>
					{rule.correct.map((example) => (
						<RuleExample
							example={example}
							key={example.code}
							kind="correct"
							language={rule.language}
							themeSprings={themeSprings}
						/>
					))}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						{hasOptions ? 'Options' : 'Configuration'}
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						{hasOptions
							? 'This rule accepts the following options:'
							: 'Enable this rule in your ESLint configuration:'}
					</p>
					{hasOptions && (
						<RuleOptionsTable
							options={rule.options}
							themeSprings={themeSprings}
						/>
					)}
					<PrismPlus
						codeString={ruleConfigCode(rule)}
						language="javascript"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				{rule.related.length > 0 && (
					<section style={sectionStyle}>
						<AnchorHeading
							id="related-rules"
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							Related Rules
						</AnchorHeading>
						<RuleRelated
							onNavigate={onNavigate}
							related={rule.related}
						/>
					</section>
				)}

				<section style={sectionStyle}>
					<AnchorHeading
						id="when-not-to-use"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When Not To Use It
					</AnchorHeading>
					{rule.whenNotToUse.map((paragraph) => (
						<p key={paragraph} style={paragraphSpacedStyle}>
							<RichText text={paragraph} />
						</p>
					))}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="resources"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Resources
					</AnchorHeading>
					<RuleResources name={rule.name} />
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
