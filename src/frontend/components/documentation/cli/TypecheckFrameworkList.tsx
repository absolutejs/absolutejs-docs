import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const TypecheckFrameworkList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						<code>vue-tsc</code> (checks <code>.ts</code>,{' '}
						<code>.tsx</code>, and <code>.vue</code> files)
					</>
				),
				term: 'Vue directories'
			},
			{
				description: (
					<>
						<code>svelte-check</code> (checks <code>.svelte</code>{' '}
						files, scoped to the Svelte directory)
					</>
				),
				term: 'Svelte directories'
			},
			{
				description: (
					<>
						<code>tsc</code> (when no Vue directory is configured)
					</>
				),
				term: 'Everything else'
			}
		]}
		themeSprings={themeSprings}
	/>
);
