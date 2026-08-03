import { ThemeProps } from '../../../../types/springTypes';
import { StepFlow } from '../../utils/StepFlow';

export const LifecycleHooksList = ({ themeSprings }: ThemeProps) => (
	<StepFlow
		steps={[
			{
				description:
					'Runs first on every request. Minimal context. Best for rate limiting, analytics, and custom headers.',
				title: 'onRequest'
			},
			{
				description:
					'Runs after validation. Return a value to skip the handler. This is your primary auth/access control hook.',
				title: 'onBeforeHandle'
			},
			{
				description: (
					<>
						Like <code>derive</code> but runs after validation, so
						types are guaranteed. Preferred for type-safe context
						values.
					</>
				),
				title: 'resolve'
			},
			{
				description:
					'Inspect or transform the response after the handler runs.',
				title: 'onAfterHandle'
			},
			{
				description:
					'Runs after the response is sent. Use for cleanup and logging.',
				title: 'onAfterResponse'
			}
		]}
		themeSprings={themeSprings}
	/>
);
