import { ThemeSprings } from '../../../types/springTypes';
import { StepFlow, StepFlowStep } from '../utils/StepFlow';

type SSRLifecycleDiagramProps = {
	themeSprings: ThemeSprings;
};

const steps: StepFlowStep[] = [
	{
		actor: 'Once',
		description: 'Load config, bundle',
		title: 'prepare()'
	},
	{
		actor: 'Each request',
		code: 'GET /page',
		title: 'Request'
	},
	{
		actor: 'Each request',
		description: 'DB query, auth',
		title: 'Fetch Data'
	},
	{
		actor: 'Each request',
		description: 'Component → HTML',
		title: 'Render'
	},
	{
		actor: 'Each request',
		description: 'Progressive delivery',
		title: 'Stream'
	},
	{
		actor: 'Each request',
		description: 'Interactive on client',
		title: 'Hydrate'
	}
];

export const SSRLifecycleDiagram = ({
	themeSprings
}: SSRLifecycleDiagramProps) => (
	<StepFlow steps={steps} themeSprings={themeSprings} />
);
