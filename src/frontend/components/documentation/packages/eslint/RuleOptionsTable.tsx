import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../../types/springTypes';
import { EslintRuleOption } from '../../../../data/documentation/eslintRulesData';
import {
	tableCellStyle,
	tableCodeStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../../styles/docsStyles';
import { RichText } from '../../../utils/RichText';

type RuleOptionRowProps = {
	option: EslintRuleOption;
	themeSprings: ThemeSprings;
};

const RuleOptionRow = ({ option, themeSprings }: RuleOptionRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{option.name}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{option.type}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{option.default}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<RichText text={option.description} />
		</animated.td>
	</tr>
);

type RuleOptionsTableProps = {
	options: EslintRuleOption[];
	themeSprings: ThemeSprings;
};

export const RuleOptionsTable = ({
	options,
	themeSprings
}: RuleOptionsTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Option
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Type
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Default
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{options.map((option) => (
					<RuleOptionRow
						key={option.name}
						option={option}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
