import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const ScopingLevelsList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				badge: 'default',
				description:
					'Hooks stay in the current plugin instance and its descendants.',
				term: 'local'
			},
			{
				description:
					'Hooks propagate one level up to the parent instance.',
				term: 'scoped'
			},
			{
				description: 'Hooks apply to all instances everywhere.',
				term: 'global'
			}
		]}
		themeSprings={themeSprings}
	/>
);
