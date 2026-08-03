import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const StaticGenerationIsrList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'pure SSG: pages are rendered once at build time and never change',
				term: 'Without revalidate'
			},
			{
				description:
					'ISR: stale pages are served immediately while a fresh version renders in the background',
				term: 'With revalidate'
			}
		]}
		themeSprings={themeSprings}
	/>
);
