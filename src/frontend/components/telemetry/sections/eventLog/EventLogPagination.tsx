import { buttonStyle, paginationStyle } from './eventLogStyles';

type EventLogPaginationProps = {
	page: number;
	totalPages: number;
	totalEvents: number | undefined;
	onPageChange: (direction: 'prev' | 'next') => void;
};

export const EventLogPagination = ({
	page,
	totalPages,
	totalEvents,
	onPageChange
}: EventLogPaginationProps) => (
	<div style={{ ...paginationStyle, marginTop: '1rem' }}>
		<button
			disabled={page <= 1}
			onClick={() => onPageChange('prev')}
			style={buttonStyle}
		>
			Prev
		</button>
		<span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
			Page {page} of {totalPages} ({totalEvents} total)
		</span>
		<button
			disabled={page >= totalPages}
			onClick={() => onPageChange('next')}
			style={buttonStyle}
		>
			Next
		</button>
	</div>
);
