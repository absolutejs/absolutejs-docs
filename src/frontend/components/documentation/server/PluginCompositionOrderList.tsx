import { ReactNode } from 'react';
import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const PluginCompositionOrderList = () => (
	<ul style={listStyle}>
		<OrderItem label="Plugin before route">
			: Plugin behavior applies
		</OrderItem>
		<OrderItem label="Plugin after route">
			: Existing route is unaffected
		</OrderItem>
	</ul>
);

type OrderItemProps = {
	label: string;
	children: ReactNode;
};

const OrderItem = ({ label, children }: OrderItemProps) => (
	<li style={listItemStyle}>
		<strong style={strongStyle}>{label}</strong>
		{children}
	</li>
);
