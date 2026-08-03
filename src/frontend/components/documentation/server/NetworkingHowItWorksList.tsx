import { ThemeProps } from '../../../../types/springTypes';
import { StepFlow } from '../../utils/StepFlow';

export const NetworkingHowItWorksList = ({ themeSprings }: ThemeProps) => (
	<StepFlow
		steps={[
			{
				description: 'Gets HOST and PORT from your .env file',
				title: 'Reads environment'
			},
			{
				description: 'Binds to 0.0.0.0 if --host is passed',
				title: 'Checks --host flag'
			},
			{
				description:
					'Calls .listen() internally with the correct configuration',
				title: 'Starts server'
			},
			{
				description: 'Outputs the server URL and network address',
				title: 'Logs info'
			}
		]}
		themeSprings={themeSprings}
	/>
);
