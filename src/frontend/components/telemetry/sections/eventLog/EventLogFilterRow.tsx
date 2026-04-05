import { useQuery } from '@tanstack/react-query';
import { ThemeSprings } from '../../../../../types/springTypes';
import { server } from '../../../../utils/edenTreaty';
import { VersionSelect } from '../../VersionSelect';
import { filterLabelStyle, filterRowStyle, inputStyle } from './eventLogStyles';

type EventLogFilterRowProps = {
	eventFilter: string;
	osFilter: string;
	versions: string[];
	versionFilter: string;
	bunVersionFilter: string;
	fromDate: string;
	toDate: string;
	themeSprings: ThemeSprings;
	onSearchChange: (value: string) => void;
	onEventFilterChange: (value: string) => void;
	onVersionFilterChange: (value: string) => void;
	onOsFilterChange: (value: string) => void;
	onBunVersionFilterChange: (value: string) => void;
	onFromDateChange: (value: string) => void;
	onToDateChange: (value: string) => void;
};

export const EventLogFilterRow = ({
	eventFilter,
	osFilter,
	versions,
	versionFilter,
	bunVersionFilter,
	fromDate,
	toDate,
	themeSprings,
	onSearchChange,
	onEventFilterChange,
	onVersionFilterChange,
	onOsFilterChange,
	onBunVersionFilterChange,
	onFromDateChange,
	onToDateChange
}: EventLogFilterRowProps) => (
	<div style={filterRowStyle}>
		<input
			onChange={(e) => onSearchChange(e.target.value)}
			placeholder="Search by ID, event, user..."
			style={{ ...inputStyle, flex: '1 1 200px' }}
			type="text"
		/>
		<input
			onChange={(e) => onEventFilterChange(e.target.value)}
			placeholder="Event type"
			style={inputStyle}
			type="text"
			value={eventFilter}
		/>
		<VersionSelect
			onChange={onVersionFilterChange}
			themeSprings={themeSprings}
			value={versionFilter}
			versions={versions}
		/>
		<input
			onChange={(e) => onOsFilterChange(e.target.value)}
			placeholder="OS"
			style={inputStyle}
			type="text"
			value={osFilter}
		/>
		<BunVersionSelect
			onChange={onBunVersionFilterChange}
			themeSprings={themeSprings}
			value={bunVersionFilter}
		/>
		<label style={filterLabelStyle}>
			From
			<input
				onChange={(e) => onFromDateChange(e.target.value)}
				style={inputStyle}
				type="date"
				value={fromDate}
			/>
		</label>
		<label style={filterLabelStyle}>
			To
			<input
				onChange={(e) => onToDateChange(e.target.value)}
				style={inputStyle}
				type="date"
				value={toDate}
			/>
		</label>
	</div>
);

type BunVersionSelectProps = {
	onChange: (value: string) => void;
	themeSprings: ThemeSprings;
	value: string;
};

const BunVersionSelect = ({
	onChange,
	themeSprings,
	value
}: BunVersionSelectProps) => {
	const bunVersionsQuery = useQuery({
		queryKey: ['telemetry', 'bun-versions'],
		queryFn: async () => {
			const { data, error } =
				await server.api.v1.telemetry['bun-versions'].get();
			if (error) throw new Error('Failed to fetch bun versions');
			if (!Array.isArray(data))
				throw new Error('Invalid bun versions response');

			return data;
		}
	});

	if (bunVersionsQuery.isPending) {
		return (
			<VersionSelect
				allLabel="Loading bun versions..."
				onChange={onChange}
				themeSprings={themeSprings}
				value={value}
				versions={[]}
			/>
		);
	}

	return (
		<VersionSelect
			allLabel="All bun versions"
			onChange={onChange}
			themeSprings={themeSprings}
			value={value}
			versions={bunVersionsQuery.data ?? []}
		/>
	);
};
