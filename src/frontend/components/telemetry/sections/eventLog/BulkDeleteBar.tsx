import {
	bulkDeleteBarStyle,
	buttonStyle,
	deleteButtonStyle
} from './eventLogStyles';

type BulkDeleteBarProps = {
	selectedCount: number;
	allMatchingSelected: boolean;
	totalMatching: number;
	visibleCount: number;
	allVisibleSelected: boolean;
	onSelectAllMatching: () => void;
	onOpenBulkDelete: () => void;
};

export const BulkDeleteBar = ({
	selectedCount,
	allMatchingSelected,
	totalMatching,
	visibleCount,
	allVisibleSelected,
	onSelectAllMatching,
	onOpenBulkDelete
}: BulkDeleteBarProps) => (
	<div style={bulkDeleteBarStyle}>
		<span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
			{selectedCount} event
			{selectedCount === 1 ? '' : 's'} selected
		</span>
		{!allMatchingSelected &&
			totalMatching > visibleCount &&
			visibleCount > 0 &&
			allVisibleSelected && (
				<button
					onClick={onSelectAllMatching}
					style={{ ...buttonStyle, fontSize: '0.75rem' }}
				>
					Select all {totalMatching} matching events
				</button>
			)}
		<button onClick={onOpenBulkDelete} style={deleteButtonStyle}>
			Delete Selected
		</button>
	</div>
);
