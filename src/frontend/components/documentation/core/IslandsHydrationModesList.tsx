import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const IslandsHydrationModesList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'hydrate immediately after bootstrap.',
				term: 'load'
			},
			{
				description: 'wait for browser idle time.',
				term: 'idle'
			},
			{
				description: 'wait until the island enters the viewport.',
				term: 'visible'
			},
			{
				description: 'render SSR HTML only with no client hydration.',
				term: 'none'
			}
		]}
		themeSprings={themeSprings}
	/>
);
