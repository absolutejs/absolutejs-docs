import { ThemeProps } from '../../../../types/springTypes';
import { StepFlow } from '../../utils/StepFlow';

export const ScopedStateHowItWorksSteps = ({ themeSprings }: ThemeProps) => (
	<StepFlow
		steps={[
			{
				description: (
					<>
						On first request, a secure <code>user_session_id</code>{' '}
						cookie is created
					</>
				),
				title: 'First request'
			},
			{
				description: (
					<>
						Each subsequent request uses this cookie to retrieve the
						user&apos;s state
					</>
				),
				title: 'Subsequent requests'
			},
			{
				description: 'State is stored server-side, keyed by session ID',
				title: 'Server-side storage'
			}
		]}
		themeSprings={themeSprings}
	/>
);
