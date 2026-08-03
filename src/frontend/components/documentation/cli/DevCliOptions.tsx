import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const DevCliOptions = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						Server entry file (defaults to{' '}
						<code>src/backend/server.ts</code>)
					</>
				),
				term: '[entry]'
			},
			{
				description: (
					<>
						Path to <code>absolute.config.ts</code>
					</>
				),
				term: '--config'
			},
			{
				description: (
					<>
						Bind to <code>0.0.0.0</code> and show network address
					</>
				),
				term: '--host'
			}
		]}
		themeSprings={themeSprings}
	/>
);
