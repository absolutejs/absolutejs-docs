import { ThemeSprings } from '../../../../../types/springTypes';
import {
	EslintRule,
	EslintRuleCategory,
	categorySlug
} from '../../../../data/documentation/eslintRulesData';
import {
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { EslintRulesTable } from './EslintRulesTable';

type EslintCategorySectionProps = {
	category: EslintRuleCategory;
	onNavigate: (pageId: string) => void;
	rules: EslintRule[];
	themeSprings: ThemeSprings;
};

export const EslintCategorySection = ({
	category,
	onNavigate,
	rules,
	themeSprings
}: EslintCategorySectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id={categorySlug(category)}
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			{category}
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			{`${rules.length} ${rules.length === 1 ? 'rule' : 'rules'}.`}
		</p>
		<EslintRulesTable
			onNavigate={onNavigate}
			rules={rules}
			themeSprings={themeSprings}
		/>
	</section>
);
