import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ElysiaPageGuideList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'how to structure and scope plugins',
				term: 'Plugin Composition'
			},
			{
				description: 'request/response schemas and guarded routes',
				term: 'Validation'
			},
			{
				description: 'origin policy, credentials, and per-group config',
				term: 'CORS'
			},
			{
				description: (
					<>
						scheduled tasks with <code>@elysiajs/cron</code>
					</>
				),
				term: 'Cron Jobs'
			},
			{
				description: 'hook order and guard strategy',
				term: 'Middleware'
			},
			{
				description: 'startup behavior and host/port exposure',
				term: 'Networking Plugin'
			}
		]}
		themeSprings={themeSprings}
	/>
);
