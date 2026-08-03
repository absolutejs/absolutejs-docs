import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const CronJobsConfigOptionsList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						IANA timezone string such as{' '}
						<code>America/New_York</code>
					</>
				),
				term: 'timezone'
			},
			{
				description: 'Delay start until a specific date',
				term: 'startAt'
			},
			{
				description: 'Stop scheduling after a specific date',
				term: 'stopAt'
			},
			{
				description: 'Maximum number of executions',
				term: 'maxRuns'
			},
			{
				description: 'Continue execution after unhandled errors',
				term: 'catch'
			},
			{
				description: 'Minimum interval between runs (seconds)',
				term: 'interval'
			}
		]}
		themeSprings={themeSprings}
	/>
);
