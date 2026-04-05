import { ReactNode } from 'react';
import { listItemStyle, strongStyle } from '../../../styles/docsStyles';

type IsrListItemProps = {
	label: string;
	children: ReactNode;
};

export const IsrListItem = ({ label, children }: IsrListItemProps) => (
	<li style={listItemStyle}>
		<strong style={strongStyle}>{label}</strong>
		{children}
	</li>
);
