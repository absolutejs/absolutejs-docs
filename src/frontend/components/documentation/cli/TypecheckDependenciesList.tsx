import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const TypecheckDependenciesList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: 'required if you have a Vue directory',
				term: 'vue-tsc'
			},
			{
				description: 'required if you have a Svelte directory',
				term: 'svelte-check'
			},
			{
				description: 'always required',
				term: 'typescript'
			}
		]}
		themeSprings={themeSprings}
	/>
);
