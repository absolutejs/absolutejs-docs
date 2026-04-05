import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const CronJobsConfigOptionsList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>timezone</strong>: IANA timezone string
			such as <code>America/New_York</code>
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>startAt</strong>: Delay start until a
			specific date
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>stopAt</strong>: Stop scheduling after a
			specific date
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>maxRuns</strong>: Maximum number of
			executions
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>catch</strong>: Continue execution after
			unhandled errors
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>interval</strong>: Minimum interval
			between runs (seconds)
		</li>
	</ul>
);
