import { ReactNode } from 'react';
import {
	FaExclamationCircle,
	FaInfoCircle,
	FaLightbulb,
	FaWrench
} from 'react-icons/fa';
import { EslintRule } from '../../../../data/documentation/eslintRulesData';
import {
	eslintCategoryColors,
	fixableColor,
	problemColor,
	ruleBadgeRowStyle,
	ruleBadgeStyle,
	suggestionColor,
	typeAwareColor
} from '../../../../styles/eslintStyles';

type BadgeProps = {
	color: string;
	icon?: ReactNode;
	label: string;
};

export const Badge = ({ color, icon, label }: BadgeProps) => (
	<span style={ruleBadgeStyle(color)}>
		{icon}
		{label}
	</span>
);

type RuleBadgesProps = {
	rule: EslintRule;
};

export const RuleBadges = ({ rule }: RuleBadgesProps) => {
	const isProblem = rule.problemType === 'problem';

	return (
		<div style={ruleBadgeRowStyle}>
			<Badge
				color={eslintCategoryColors[rule.category]}
				label={rule.category}
			/>
			{isProblem ? (
				<Badge
					color={problemColor}
					icon={<FaExclamationCircle />}
					label="Problem"
				/>
			) : (
				<Badge
					color={suggestionColor}
					icon={<FaLightbulb />}
					label="Suggestion"
				/>
			)}
			{rule.fixable && (
				<Badge
					color={fixableColor}
					icon={<FaWrench />}
					label="Fixable"
				/>
			)}
			{rule.requiresTypeInfo && (
				<Badge
					color={typeAwareColor}
					icon={<FaInfoCircle />}
					label="Type-aware"
				/>
			)}
			{!rule.requiresTypeInfo && rule.typeInfoNote && (
				<Badge
					color={typeAwareColor}
					icon={<FaInfoCircle />}
					label="Type-aware (optional)"
				/>
			)}
		</div>
	);
};
