import { CSSProperties, ReactNode } from 'react';
import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

type TypeSafetyFlowItem = {
	description: ReactNode;
	label: ReactNode;
};

type TypeSafetyFlowListProps = {
	items: TypeSafetyFlowItem[];
	style?: CSSProperties;
};

export const TypeSafetyFlowList = ({
	items,
	style
}: TypeSafetyFlowListProps) => (
	<ul style={{ ...listStyle, ...style }}>
		{items.map((item, index) => (
			<li key={index} style={listItemStyle}>
				<strong style={strongStyle}>{item.label}</strong>
				{item.description}
			</li>
		))}
	</ul>
);
