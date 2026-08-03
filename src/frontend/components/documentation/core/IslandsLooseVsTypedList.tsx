import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const IslandsLooseVsTypedList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'runtime-safe, flexible, and useful when the framework/component pairing is chosen dynamically.',
				term: 'Loose Island'
			},
			{
				description:
					'exact component names and prop shapes inferred from the registry for that framework.',
				term: 'Typed island wrappers'
			}
		]}
		themeSprings={themeSprings}
	/>
);
