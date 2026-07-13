import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { Callout } from '../utils/Callout';
import { StepFlow, StepFlowStep } from '../utils/StepFlow';

type MiddlewareChainDiagramProps = {
	themeSprings: ThemeSprings;
};

const steps: StepFlowStep[] = [
	{
		code: 'GET /api/users',
		description: 'HTTP request arrives at your Elysia server',
		title: 'Request'
	},
	{
		code: '.use(cors()).use(staticPlugin())',
		description: 'cors(), static(), swagger() : extend server capabilities',
		title: 'Plugins'
	},
	{
		code: '.guard({ beforeHandle: checkAuth })',
		description:
			'Authentication, rate limiting, validation : protect routes',
		title: 'Guards'
	},
	{
		code: '.derive(() => ({ user: getUser() }))',
		description:
			'Inject user, db connection, utilities : available in handlers',
		title: 'Derive'
	},
	{
		code: '.get("/", ({ user }) => ...)',
		description: 'Your route logic executes with full type safety',
		title: 'Handler'
	}
];

export const MiddlewareChainDiagram = ({
	themeSprings
}: MiddlewareChainDiagramProps) => (
	<div>
		<animated.h3
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '1.1rem',
				fontWeight: 600,
				margin: '1.5rem 0 0'
			}}
		>
			Elysia Middleware Chain
		</animated.h3>
		<StepFlow steps={steps} themeSprings={themeSprings} />
		<Callout themeSprings={themeSprings} title="Types Flow" variant="info">
			Types flow down the chain in the same order: plugins add methods,
			guards add context, and derive adds properties. All derived values
			are fully typed in your handlers.
		</Callout>
	</div>
);
