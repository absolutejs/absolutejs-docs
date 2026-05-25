import { ThemeSprings } from '../../../../../types/springTypes';
import { EslintRuleExample } from '../../../../data/documentation/eslintRulesData';
import {
	exampleCaptionStyle,
	exampleWrapperStyle
} from '../../../../styles/eslintStyles';
import { PrismPlus } from '../../../utils/PrismPlus';

type RuleExampleProps = {
	example: EslintRuleExample;
	kind: 'correct' | 'incorrect';
	language: 'tsx' | 'typescript';
	themeSprings: ThemeSprings;
};

export const RuleExample = ({
	example,
	kind,
	language,
	themeSprings
}: RuleExampleProps) => (
	<div style={exampleWrapperStyle(kind)}>
		{example.label && <p style={exampleCaptionStyle}>{example.label}</p>}
		<PrismPlus
			codeString={example.code}
			language={language}
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
	</div>
);
