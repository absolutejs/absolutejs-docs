import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const DevFeaturesList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Hot module replacement for React, Svelte, Vue, Angular, HTML, and HTMX',
				term: 'HMR'
			},
			{
				description: 'Unbundled source serving for fast refresh',
				term: 'Module server'
			},
			{
				description:
					'Compilation and runtime errors displayed in the browser',
				term: 'Error overlay'
			},
			{
				description: 'Automatic rebuild on file changes',
				term: 'File watching'
			}
		]}
		themeSprings={themeSprings}
	/>
);
