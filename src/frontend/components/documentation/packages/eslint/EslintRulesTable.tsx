import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { FaInfoCircle, FaWrench } from 'react-icons/fa';
import { ThemeSprings } from '../../../../../types/springTypes';
import { EslintRule } from '../../../../data/documentation/eslintRulesData';
import { primaryColor } from '../../../../styles/colors';
import {
	tableCellStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../../../styles/docsStyles';
import { fixableColor, typeAwareColor } from '../../../../styles/eslintStyles';
import { RichText } from '../../../utils/RichText';
import { Badge } from './RuleBadges';

const ruleNameButtonStyle: CSSProperties = {
	background: 'transparent',
	border: 'none',
	color: primaryColor,
	cursor: 'pointer',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.9rem',
	fontWeight: 600,
	padding: 0,
	textAlign: 'left'
};
const ruleSummaryStyle: CSSProperties = {
	fontSize: '0.875rem',
	marginTop: '0.35rem',
	opacity: 0.75
};
const badgeCellStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.4rem'
};

type EslintRuleTableRowProps = {
	onNavigate: (pageId: string) => void;
	rule: EslintRule;
	themeSprings: ThemeSprings;
};

const EslintRuleTableRow = ({
	onNavigate,
	rule,
	themeSprings
}: EslintRuleTableRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<button
				onClick={() => onNavigate(rule.id)}
				style={ruleNameButtonStyle}
				type="button"
			>
				{`absolute/${rule.name}`}
			</button>
			<p style={ruleSummaryStyle}>
				<RichText text={rule.summary} />
			</p>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<div style={badgeCellStyle}>
				{rule.fixable && (
					<Badge
						color={fixableColor}
						icon={<FaWrench />}
						label="Fix"
					/>
				)}
				{rule.requiresTypeInfo && (
					<Badge
						color={typeAwareColor}
						icon={<FaInfoCircle />}
						label="Types"
					/>
				)}
				{!rule.fixable && !rule.requiresTypeInfo && '—'}
			</div>
		</animated.td>
	</tr>
);

type EslintRulesTableProps = {
	onNavigate: (pageId: string) => void;
	rules: EslintRule[];
	themeSprings: ThemeSprings;
};

export const EslintRulesTable = ({
	onNavigate,
	rules,
	themeSprings
}: EslintRulesTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Rule
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Notes
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{rules.map((rule) => (
					<EslintRuleTableRow
						key={rule.id}
						onNavigate={onNavigate}
						rule={rule}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
