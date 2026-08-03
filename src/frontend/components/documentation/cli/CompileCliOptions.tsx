import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const CompileCliOptions = ({ themeSprings }: ThemeProps) => (
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
						Build output directory (defaults to <code>dist</code>)
					</>
				),
				term: '--outdir'
			},
			{
				description: (
					<>
						Compiled binary path (defaults to{' '}
						<code>compiled-server</code>)
					</>
				),
				term: '--outfile'
			},
			{
				description: (
					<>
						Path to <code>absolute.config.ts</code>
					</>
				),
				term: '--config'
			}
		]}
		themeSprings={themeSprings}
	/>
);
