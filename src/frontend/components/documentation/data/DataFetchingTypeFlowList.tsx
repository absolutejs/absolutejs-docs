import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

type DataFetchingTypeFlowListProps = {
	items: { label: string; description: string }[];
};

export const DataFetchingTypeFlowList = ({
	items
}: DataFetchingTypeFlowListProps) => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		{items.map((item) => (
			<li key={item.label} style={listItemStyle}>
				<strong style={strongStyle}>{item.label}</strong>:{' '}
				{item.description}
			</li>
		))}
	</ul>
);
