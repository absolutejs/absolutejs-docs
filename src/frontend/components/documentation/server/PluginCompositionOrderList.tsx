import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const PluginCompositionOrderList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'Plugin behavior applies',
				term: 'Plugin before route'
			},
			{
				description: 'Existing route is unaffected',
				term: 'Plugin after route'
			}
		]}
		themeSprings={themeSprings}
	/>
);
