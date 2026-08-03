import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ElysiaOverviewList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'one long-lived Elysia server handles pages, APIs, and background scheduling plugins.',
				term: 'Runtime model'
			},
			{
				description:
					'keep concerns isolated (CORS, auth, cron, networking) using plugin/group scope.',
				term: 'Plugin boundaries'
			},
			{
				description:
					'schemas and route definitions in Elysia drive end-to-end types through handlers and clients.',
				term: 'Type flow'
			},
			{
				description:
					'rendering, build/asset pipeline, and framework host integration layered onto the same server.',
				term: 'AbsoluteJS role'
			}
		]}
		themeSprings={themeSprings}
	/>
);
