import { CSSProperties } from 'react';
import { listItemStyle, listStyle } from '../../../../styles/docsStyles';
import { primaryColor } from '../../../../styles/colors';
import { ruleBadgeStyle } from '../../../../styles/eslintStyles';

const repoUrl = 'https://github.com/absolutejs/eslint-plugin-absolute';

const fileOverrides: Record<string, string> = {
	'max-jsxnesting': 'max-jsx-nesting',
	'no-explicit-return-type': 'no-explicit-return-types'
};

const sourceFileName = (name: string) => fileOverrides[name] ?? name;

const resourceLinkStyle: CSSProperties = {
	color: primaryColor,
	fontWeight: 500
};

type RuleRelatedProps = {
	onNavigate: (pageId: string) => void;
	related: string[];
};

export const RuleRelated = ({ onNavigate, related }: RuleRelatedProps) => (
	<div
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.5rem',
			marginTop: '0.5rem'
		}}
	>
		{related.map((name) => (
			<button
				key={name}
				onClick={() => onNavigate(`eslint-${name}`)}
				style={{
					...ruleBadgeStyle(primaryColor),
					cursor: 'pointer'
				}}
				type="button"
			>
				{`absolute/${name}`}
			</button>
		))}
	</div>
);

type RuleResourcesProps = {
	name: string;
};

export const RuleResources = ({ name }: RuleResourcesProps) => {
	const file = sourceFileName(name);

	return (
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<a
					href={`${repoUrl}/blob/main/src/rules/${file}.ts`}
					rel="noopener noreferrer"
					style={resourceLinkStyle}
					target="_blank"
				>
					Rule source
				</a>
			</li>
			<li style={listItemStyle}>
				<a
					href={`${repoUrl}/blob/main/tests/${file}.test.ts`}
					rel="noopener noreferrer"
					style={resourceLinkStyle}
					target="_blank"
				>
					Test source
				</a>
			</li>
		</ul>
	);
};
