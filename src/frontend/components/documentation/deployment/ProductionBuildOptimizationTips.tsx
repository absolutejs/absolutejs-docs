import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ProductionBuildOptimizationTips = ({
	themeSprings
}: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'Set NODE_ENV=production to enable optimizations',
				term: 'Environment variables'
			},
			{
				description:
					'Use PM2 or systemd for automatic restarts and logging',
				term: 'Process manager'
			},
			{
				description:
					'Put nginx or Caddy in front for SSL termination and caching',
				term: 'Reverse proxy'
			},
			{
				description:
					'Add a /health endpoint for load balancer health checks',
				term: 'Health checks'
			}
		]}
		themeSprings={themeSprings}
	/>
);
