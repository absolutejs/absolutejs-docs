import { listItemStyle, listStyle } from '../../../styles/docsStyles';

export const CronJobsReferencesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<a
				href="https://elysiajs.com/plugins/cron"
				rel="noopener noreferrer"
				target="_blank"
			>
				Elysia Cron Plugin docs
			</a>
		</li>
		<li style={listItemStyle}>
			<a
				href="https://crontab.guru"
				rel="noopener noreferrer"
				target="_blank"
			>
				Crontab Guru
			</a>
		</li>
	</ul>
);
