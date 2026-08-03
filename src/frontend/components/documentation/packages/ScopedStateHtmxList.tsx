import { ThemeSprings } from '../../../../types/springTypes';
import { StepFlow, StepFlowStep } from '../../utils/StepFlow';

const htmxIsolationSteps: StepFlowStep[] = [
	{
		actor: 'User A',
		description: 'Sees count of 3',
		title: 'Clicks increment 3 times'
	},
	{
		actor: 'User B',
		description: 'Sees count of 0 (their own state)',
		title: 'Visits the same page'
	},
	{
		actor: 'User B',
		description: 'Sees count of 1 (independent from User A)',
		title: 'Clicks increment'
	}
];

type ScopedStateHtmxListProps = {
	themeSprings: ThemeSprings;
};

export const ScopedStateHtmxList = ({
	themeSprings
}: ScopedStateHtmxListProps) => (
	<StepFlow steps={htmxIsolationSteps} themeSprings={themeSprings} />
);
