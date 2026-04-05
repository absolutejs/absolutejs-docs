import { TELEMETRY_USER_DRILLDOWN_LAYOUT } from '../../../../../constants';
import { animated } from '@react-spring/web';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeSprings } from '../../../../../types/springTypes';
import { server } from '../../../../utils/edenTreaty';
import { DrilldownTable } from './DrilldownTable';
import { UserEvent } from './uniqueUsersTypes';
import {
	EventColumn,
	HALF,
	buttonStyle,
	drilldownStyle,
	paginationStyle,
	sectionStyle
} from './uniqueUsersStyles';

type UserDrilldownProps = {
	anonymousId: string;
	themeSprings: ThemeSprings;
};

export const UserDrilldown = ({
	anonymousId,
	themeSprings
}: UserDrilldownProps) => {
	const [page, setPage] = useState(1);

	const eventsQuery = useQuery({
		queryKey: ['user-events', anonymousId, page],
		queryFn: async () => {
			const { data, error } = await server.api.v1.telemetry
				.users({ anonymousId })
				.events.get({
					query: {
						page: String(page),
						pageSize: '20'
					}
				});
			if (error) throw new Error('Failed to fetch user events');
			if (!('rows' in data))
				throw new Error('Invalid user events response');

			return data;
		}
	});

	if (eventsQuery.isPending) {
		return (
			<div style={drilldownStyle}>
				<div
					style={{
						opacity: HALF,
						padding: '1rem',
						textAlign: 'center'
					}}
				>
					Loading events...
				</div>
			</div>
		);
	}

	const { data } = eventsQuery;
	const rows = data?.rows ?? [];
	const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

	const formatCell = (row: UserEvent, col: EventColumn) => {
		const value = row[col];
		if (col === 'payload') {
			const str = JSON.stringify(value);

			return str.length >
				TELEMETRY_USER_DRILLDOWN_LAYOUT.payloadPreviewLength
				? `${str.slice(0, TELEMETRY_USER_DRILLDOWN_LAYOUT.payloadPreviewLength)}...`
				: str;
		}
		if (col === 'client_timestamp' && value) {
			const raw = String(value);
			const utc = raw.endsWith('Z') ? raw : `${raw}Z`;

			return new Date(utc).toLocaleString();
		}

		return value === null || value === undefined ? '-' : String(value);
	};

	return (
		<div style={drilldownStyle}>
			<animated.div
				style={{
					...sectionStyle(themeSprings),
					padding: '1rem'
				}}
			>
				<DrilldownTable formatCell={formatCell} rows={rows} />

				{totalPages > 1 && (
					<div style={paginationStyle}>
						<button
							disabled={page <= 1}
							onClick={() =>
								setPage((previousPage) => previousPage - 1)
							}
							style={buttonStyle}
						>
							Prev
						</button>
						<span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
							Page {page} of {totalPages}
						</span>
						<button
							disabled={page >= totalPages}
							onClick={() =>
								setPage((previousPage) => previousPage + 1)
							}
							style={buttonStyle}
						>
							Next
						</button>
					</div>
				)}
			</animated.div>
		</div>
	);
};
